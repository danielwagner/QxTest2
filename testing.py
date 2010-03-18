#!/usr/bin/env python

import sys, os, re, random, codecs, urllib
import util
import reporting
from log import Logger
from logFormatter import QxLogFormat
from simulationLogParser import SimulationLogParser
from seleniumserver import SeleniumServer
from build import Builder
from lint import Lint
try:
    import json
except ImportError, e:
    try:
        import simplejson as json
    except ImportError, e:
        raise RuntimeError, "No JSON module available"

class TestRun:
    def __init__(self, config, simulate=False):
        logConfig = {}
        if "logDirectory" in config["base"]:
            logConfig["logDirectory"] = config["base"]["logDirectory"] 
        self.log = Logger(logConfig)
        self.simulate = simulate
        self.configuration = config
        self.startDate = util.getTimestamp()
        self.configuration["base"]["testHostName"] = util.getHostName()
        self.log.info("New test run started on %s" %self.startDate)

    
    def getConfigSetting(self, path="", default=False, config=False):
        if not config:
            config = self.configuration
        pathParts = path.split("/")
        dict = config
        while dict:
            for keyName in pathParts:      
              # invalid node name
              if not keyName in dict:
                  return default
              # final search path node, so we've found the right setting
              if keyName == pathParts[len(pathParts) - 1]:
                  return dict[keyName]
              # haven't reached the final step yet, but the current value is no dict so
              # we've nowhere else to look
              if type(dict[keyName]).__name__ != "dict":
                  return default
              # keep looking  
              dict = dict[keyName]
        return default  
    

    def runPackage(self):
        testType = self.getConfigSetting("base/type", "standalone")
        
        self.buildStatus = {}

        if testType == "remote" and "testRun" in self.configuration:
            jUrl = self.configuration["testRun"]["host"]
            jUrl += self.getConfigSetting("testRun/qxPath", "")
            jUrl += "buildStatus.json"
            self.buildStatus = util.getJsonFromUrl(jUrl)
        
        if testType == "local":
            try:
                buildStatusFile = os.path.join(self.config["build"]["stageDir"], "trunk", "qooxdoo", "buildStatus.json")
                self.buildStatus = Builder.getBuildStatusFromFile(buildStatusFile)
            except Exception, e:
                pass  
        
        if "build" in self.configuration:
            buildConfig = self.configuration["build"]
            buildConfig["buildLogDir"] = self.getConfigSetting("base/logDirectory", "") + "/" + buildConfig["buildLogDir"]
            builder = Builder(buildConfig)
            builder.buildAll()
            self.buildStatus = builder.buildStatus          

        if "lint" in self.configuration:
            self.runLint(self.configuration["lint"])
        
        if "generator" in self.configuration:
            self.log.info("Starting Generator test run")
            generatorResults = Builder.testGenerator(self.configuration["generator"])
            reportServer = self.getConfigSetting("reporting/reportServer", False)
            if reportServer:
                self.log.info("Sending Generator test results to report server")
                response = reporting.sendResultToReportServer(reportServer, generatorResults, "generatorRun")
                self.log.info("Report Server response: %s" %response)
        
        if not "testRun" in self.configuration:
            return
        
        if self.getConfigSetting("testRun/updateSimulator", False):
            util.svnUpdate(self.getConfigSetting("testRun/simulatorDirectory", ""))
        
        if "applications" in self.configuration["testRun"]:
            for app in self.configuration["testRun"]["applications"]:
                appConf = self.configuration["testRun"]["applications"][app]
                self.runSimsForApp(app, appConf)
        
        if "collections" in self.configuration["testRun"]:
            for coll in self.configuration["testRun"]["collections"]:
                if coll == "Demos":
                    collConf = self.configuration["testRun"]["collections"][coll]
                    self.runSimsForDemos(coll, collConf, self.configuration["testRun"]["simulatorDirectory"])
    
    
    def runSimsForDemos(self, collection, collConf, simulatorBaseDir):
        seleniumConfig = self.configuration["selenium"]
        simulatorDirectory = os.path.join(simulatorBaseDir, "trunk", "tool", "selenium", "simulation", "demobrowser", "demo")
        print "running simulations for demos: " + repr(collConf)
        
        #testReportFile = self.prepareTestReport(self.getConfigSetting("base/reportDirectory", ""), collection)
        
        startDir = collConf["startDir"]
        demoList = util.locate(startDir, "*.html")
        
        for demoDir in demoList:
            dir, file = os.path.split(demoDir)
            category = os.path.basename(dir) 
            demo, ext = os.path.splitext(file)
            #print category + " - " + demo
            
            scriptFile = os.path.join(simulatorDirectory, category, demo + ".js")
            if os.path.isfile(scriptFile):
                print "got a test script for " + category + "-" + demo

                self.log.info("Running simulations for %s" %category + "." + demo)
                
                for browser in collConf["browsers"]:
                    #seleniumServer = SeleniumServer(seleniumConfig)
                    #seleniumServer.start()
                    simConf = self.getSimulationConfig(collection, "collections", browser)
                    simConf["autPath"] = demoDir
                    simConf["simulationScript"] = scriptFile
                    print repr(simConf)            
                    #sim = Simulation(simConf)
                    #sim.run()
                    #seleniumServer.stop()
            
        
    
    def runSimsForApp(self, app, appConf):
        testReportFile = self.prepareTestReport(self.getConfigSetting("base/reportDirectory", ""), app)
        seleniumConfig = self.configuration["selenium"]        
        
        manageSeleniumServer = self.getConfigSetting("selenium/seleniumServerJar", False)
        individualServer = self.getConfigSetting("individualServer", True, appConf)
        if manageSeleniumServer and not individualServer:
            self.log.info("Using one Selenium server instance for all %s simulations." %app)            
            seleniumOptions = self.getConfigSetting("seleniumServerOptions", None, appConf)
            if seleniumOptions:
                seleniumConfig["options"] = seleniumOptions
            seleniumServer = SeleniumServer(seleniumConfig)
            seleniumServer.start()
      
        if app in self.buildStatus:
            if self.buildStatus[app]["BuildError"]:
                self.sendDummyReport(app, appConf, testReportFile)            
                return
        
        self.log.info("Running simulations for %s" %app)
        
        for browser in appConf["browsers"]:
            if manageSeleniumServer and individualServer:
                seleniumServer = SeleniumServer(seleniumConfig)
                seleniumServer.start()
            simConf = self.getSimulationConfig(app, "applications", browser)
            sim = Simulation(simConf)
            sim.run()
            if manageSeleniumServer and individualServer:
                seleniumServer.stop()
        
        if manageSeleniumServer and not individualServer:
            seleniumServer = SeleniumServer(seleniumConfig)
            seleniumServer.stop()
        
        if self.getConfigSetting("reporting/mailTo", False):
            self.formatLog(simConf["testLogFile"], testReportFile, None)
            self.sendReport(app, testReportFile, self.configuration["reporting"])
    
        reportServer = self.getConfigSetting("reporting/reportServer", False)
        if reportServer:
            reportConf = {
              "autName" : app,
              "autHost" : self.configuration["testRun"]["host"],
              "autQxPath" : self.configuration["testRun"]["qxPath"],
              "autPath" : appConf["path"],
              "startDate" : util.getTimestamp(),
              "testHostName" : self.configuration["base"]["testHostName"],
              "testHostId" : self.configuration["base"]["testHostId"]
            }
            self.reportResults(reportServer, simConf["testLogFile"], reportConf)
    

    def getSimulationConfig(self, autName, configKey, browserConf):
        self.log.info("Getting configuration for %s on %s" %(autName,browserConf["browserId"]))
        currentAppConf = self.configuration["testRun"][configKey][autName]
        simConf = {
          "javaBin" : self.getConfigSetting("base/javaBin", "java"),
          "classPathSeparator" : self.getConfigSetting("base/classPathSeparator", ";"),                 
          "rhinoJar" : self.getConfigSetting("selenium/rhinoJar", None),
          "simulatorSvn" : self.getConfigSetting("testRun/simulatorDirectory", None),
          "autName" : autName,
          "autHost" : self.getConfigSetting("testRun/host", "http://localhost"),
          "browserId" : browserConf["browserId"],
          "browserLauncher" : self.configuration["browsers"][browserConf["browserId"]],
          "simulationScript" : "/home/dwagner/workspace/qooxdoo.contrib/Simulator/trunk/tool/selenium/simulation/portal/test_portal.js"
        }
        
        logDirectory = self.getConfigSetting("base/logDirectory", False)
        if logDirectory:
            simConf["testLogFile"] = "%s/%s/%s.log" %(logDirectory,autName,util.getTimestamp())
         
        seleniumDir = self.getConfigSetting("selenium/seleniumDir", "")        
        seleniumClientDriverJar = self.getConfigSetting("selenium/seleniumClientDriverJar", "")

        seleniumVersion = self.getConfigSetting("seleniumVersion", None, browserConf)
        if not seleniumVersion:
            seleniumVersion = self.getConfigSetting("seleniumVersion", None, currentAppConf)
        if not seleniumVersion:
            seleniumVersion = self.getConfigSetting("testRun/seleniumVersion", "current")
        
        simConf["seleniumClientDriverJar"] = seleniumDir + "/" + seleniumVersion + "/" + seleniumClientDriverJar
        
        autPath = self.getConfigSetting("path", "", currentAppConf)
        autQxPath = self.getConfigSetting("testRun/qxPath", "") 
        simConf["autPath"] = autQxPath + autPath
        
        simulationOptions = self.getConfigSetting("simulationOptions", None, browserConf)
        if not simulationOptions:
            simulationOptions = self.getConfigSetting("simulationOptions", None, currentAppConf)
        if not simulationOptions:
            simulationOptions = self.getConfigSetting("testRun/simulationOptions", None)
        simConf["simulationOptions"] = simulationOptions
        
        simulationScript = self.getConfigSetting("simulationScript", None, browserConf)
        if not simulationScript:
            simulationScript = self.getConfigSetting("simulationScript", None, currentAppConf)
        if not simulationScript:
            simulationScript = self.getConfigSetting("testRun/simulationScript", None)
        simConf["simulationScript"] = simulationScript
        
        return simConf

    
    def sendDummyReport(self, app, appConf, testReportFile):
        self.log.debug("%s built with errors" %app)
        browserList = []
        for browser in appConf["browsers"]:
            browserList.append(browser["browserId"])
        startDate = util.getTimestamp()
        dummyLogFile = self.getDummyLog(self.configuration["base"]["logDirectory"], app, browserList, self.buildStatus[app]["BuildError"])
        
        #TODO: ignore
        ignore = None
        if self.getConfigSetting("reporting/mailTo", False):
            logFormatted = self.formatLog(dummyLogFile, testReportFile, ignore)
            if logFormatted:
                self.sendReport(app, testReportFile, self.configuration["reporting"])
            else:
                self.log.warn("No report HTML to send.")
    
        reportServer = self.getConfigSetting("reporting/reportServer", False)
        if reportServer:
            reportConf = {
              "autName" : app,
              "autHost" : self.configuration["testRun"]["host"],
              "autQxPath" : self.configuration["testRun"]["qxPath"],
              "autPath" : appConf["path"],
              "startDate" : startDate,
              "testHostName" : self.configuration["base"]["testHostName"],
              "testHostId" : self.configuration["base"]["testHostId"]
            }
            self.reportResults(reportServer, dummyLogFile, reportConf)
        

    def prepareTestLog(self, logDir=os.getcwd(), appName="Unknown"):
        logPath = os.path.join(logDir, appName)
        if not os.path.isdir(logPath):
            os.mkdir(logPath)

        return os.path.join(logPath, self.startDate + ".log")
    

    def prepareTestReport(self, reportDir=os.getcwd(), appName="Unknown"):
        reportPath = os.path.join(reportDir, appName)
        if not os.path.isdir(reportPath):
            os.mkdir(reportPath)
        
        return os.path.join( reportPath, self.startDate + '.html')
          
    
    def getDummyLog(self, testLogDir, autName, browserList, buildError):
        self.log.info("Generating dummy log file for %s" %autName)
        dummyLogFile = os.path.join(testLogDir, autName, "DUMMY_%s.log" %(autName + self.startDate))        
        dummyLog = codecs.open(dummyLogFile, "w", "utf-8")
    
        for browser in browserList:
            prefix = "qxSimulator_%s: " %str(random.randint(100000, 999999))
            dummyLog.write(prefix + "<h1>%s results from %s</h1>\n" %(autName, self.startDate))
            platform = util.getOperatingSystemName()
            if platform == "Windows":
                platform = "Win32"
            dummyLog.write(prefix + "<p>Platform: %s</p>\n" %platform)
            dummyLog.write(prefix + "<p>User agent: %s</p>\n" %browser)
            dummyLog.write(prefix + "<div class=\"qxappender\"><div class=\"level-error\">BUILD ERROR: %s</div></div>\n" %buildError)
        dummyLog.close()
        self.log.info("Created dummy log file %s" %dummyLogFile)
        return dummyLogFile
    
    
    def formatLog(self, inputfile=None, reportfile=None, ignore=None):
        class FormatterOpts:
            def __init__(self,logfile,htmlfile,ignore=None):
                self.logfile = logfile
                self.htmlfile = htmlfile
                self.ignore = ignore
    
        if not inputfile:
            raise RuntimeError, "No input file specified!"
        
        if not os.path.isfile(inputfile):
            raise RuntimeError, "%s is not a file!" %inputfile
        
        if os.path.getsize(inputfile) == "0L":
            self.log.warn("log file is empty!")
    
        options = FormatterOpts(inputfile, reportfile, ignore)
    
        if (self.simulate):
            self.log.info("SIMULATION: Formatting log file %s" %inputfile)
        else:
            self.log.info("Formatting log file %s" %inputfile)  
            logformat = QxLogFormat(options)
            logformat.writeHtmlReport()

    
    def sendReport(self, autName, file, mailConf):
        self.log.info("Preparing to send %s report: %s" %(autName, file))
        if ( not(os.path.exists(file)) ):
            self.log.error("Report file %s not found!" %file)
            return
      
        mailConf["subject"] = "[qooxdoo-test] " + autName
      
        reportFile = open(file, 'rb')
        mailConf['html'] = reportFile.read()
        reportFile.seek(0)    
      
        osRe = re.compile('<p>Platform: (.*)</p>')
        failedTestsRe = re.compile('<p class="failedtests">([\d]*)')
        totalErrorsRe = re.compile('<p class="totalerrors">Total errors in report: ([\d]*)</p>')
      
        osystem = ""
        failed = False
        totalE = ""
        for line in reportFile:
            osys = osRe.search(line)
            if (osys):
                osystem = osys.group(1)
                # Some browsers return "Linux i686" as the platform 
                if "Linux" in osystem:
                    osystem = "Linux"
                else:
                    if "Win" in osystem:
                        osystem = "Win32"
        
            failedTests = failedTestsRe.search(line)
            if (failedTests):
                failed = failedTests.group(1)
        
            totalErrors = totalErrorsRe.search(line)
            if (totalErrors):
                totalE = totalErrors.group(1)
      
        mailConf['subject'] += " " + osystem
        
        if ('hostId' in mailConf):
            mailConf['subject'] += " " + mailConf['hostId']
        
        if autName in self.buildStatus:
            branch = "unknown"
            if "branch" in self.buildStatus[autName]:
                branch = self.buildStatus[autName]["branch"]
          
            if "SVNRevision" in self.buildStatus[autName]:
                revision = self.buildStatus[autName]["SVNRevision"]
                mailConf['subject'] += " (%s r%s)" %(branch,revision)

            if (self.buildStatus[autName]["BuildError"]):
                self.mailConf['subject'] += " BUILD ERROR"
        
        if (failed):
            mailConf['subject'] += ": %s test run(s) failed!" %failed
        else:
            mailConf['subject'] += ": %s issues" %totalE    
    
        # Send mail
        if (self.simulate):
            self.log.info("SIMULATION; Prepared report email: Subject: %s Recipient: %s" %(mailConf['subject'], mailConf['mailTo']))    
        if (osystem !=""):
            try:
                util.sendMultipartMail(mailConf)
            except Exception, e:
                self.log.error("Failed to send report email")
                self.log.logError(e)
            else:
                self.log.info("Report email sent successfully")
    
        else:
            self.log.error("Report file seems incomplete, report not sent.")

            
    def reportResults(self, reportServerUrl, logFile, config):        
        if (self.simulate):
            self.log.info("SIMULATION: Getting report data for %s" %config["autName"])
            return
        else:
            self.log.info("Getting report data for %s" %config["autName"])
        
        testRunDict = self.getTestRunDict(config)
        
        slp = SimulationLogParser(logFile)
        simulationData = slp.getSimulationData()
        testRunDict["simulations"] = simulationData
        
        try:
            if simulationData[0]["platform"] != "Unknown":
                testRunDict["test_hostos"] = simulationData[0]["platform"]
        except Exception:
            pass
        
        self.log.info("Report data aggregated, sending request")
        try:
            response = reporting.sendResultToReportServer(reportServerUrl, testRunDict, "testRun")
            self.log.info("Report server response: %s" %response)
        except Exception, e:
            self.log.error("Error sending test report to server")
            self.log.logError(e)
    

    def getTestRunDict(self, config):
        autName = config["autName"]
        if "Source" in config["autName"]:
            autName = config["autName"][0:config["autName"].find("Source")]
        
        testRunDict = {
          "revision" : "",
          "aut_name" : autName,
          "aut_host" : config["autHost"], 
          "aut_qxpath" : "",
          "aut_path" : config["autPath"],
          "test_host" : config["testHostName"],
          "test_hostos" : util.getOperatingSystemName(),
          "test_hostid" : "",
          "start_date" : config["startDate"],
          "end_date" : util.getTimestamp(),
          "simulations": [],
          "dev_run" : False
        }
        
        if config["autName"] in self.buildStatus:
            if "SVNRevision" in self.buildStatus[config["autName"]]:
                revision = self.buildStatus[config["autName"]]["SVNRevision"]
                testRunDict["revision"] = revision
        
        if "autQxPath" in config:
          testRunDict["aut_qxpath"] = config["autQxPath"]
        
        if "testHostId" in config:
          testRunDict["test_hostid"] = config["testHostId"]
        
        if "devRun" in config:
          testRunDict["dev_run"] = config["devRun"]
          
        return testRunDict

    
    def runLint(self, config):
        class LintOptions:
            def __init__(self, workdir = None):
                self.workdir = workdir
            
        for target in config["targets"]:
            options = LintOptions(target["path"])
            if "ignoreClasses" in target:
                setattr(options, "ignoreclasses", target["ignoreClasses"])
            elif "ignoreClasses" in config:
                setattr(options, "ignoreclasses", config["ignoreClasses"])
            if "ignoreMessages" in target:
                setattr(options, "ignoremessages", target["ignoreMessages"])
            elif "ignoreMessages" in config:
                setattr(options, "ignoremessages", config["ignoreMessages"])
            
            lint = Lint(options)
            
            reportServer = self.getConfigSetting("reporting/reportServer", False)
            if reportServer:
                lintResult = lint.getFlatResult()
                lintResult = self.getEnhancedLintResult(lintResult, target)
                self.log.info("Sending Lint results to report server")
                response = reporting.sendResultToReportServer(reportServer, lintResult, "lintRun")
                self.log.info("Report Server response: %s" %response)


    def getEnhancedLintResult(self, lintResult, target):
        for message in lintResult:
            message["target"] = target["name"]
            message["branch"] = "unknown"
            message["revision"] = "unknown"
            if target["name"] in self.buildStatus:
                if "branch" in self.buildStatus[target["name"]]:
                    message["branch"] = self.buildStatus[target["name"]]["branch"]
                if "revision" in self.buildStatus[target["name"]]:
                    message["revision"] = self.buildStatus[target["name"]]["revision"]
            elif "Testrunner" in self.buildStatus:
                if "branch" in self.buildStatus["Testrunner"]:
                    message["branch"] = self.buildStatus["Testrunner"]["branch"]
                if "revision" in self.buildStatus["Testrunner"]:
                    message["revision"] = self.buildStatus["Testrunner"]["revision"]
        return lintResult  


class Simulation:
    def __init__(self, config, simulate=False):
        self.log = Logger()
        self.configuration = config
        self.simulate  = simulate
        self.startCmd = self.getStartCmd()


    def getStartCmd(self):
        conf = self.configuration
        cmd = conf["javaBin"]
        if "rhinoJar" in conf:
            cmd += " -cp %s%s%s" %(conf["seleniumClientDriverJar"], conf["classPathSeparator"], conf["rhinoJar"])
        
        if "rhinoMainClass" in conf:
            cmd += " %s" %conf["rhinoMainClass"]
        else:
            cmd += " org.mozilla.javascript.tools.shell.Main"
        
        cmd += " %s" %conf["simulationScript"]
        cmd += " autHost=%s" %conf["autHost"]
        cmd += " autPath="
        
        # Encode any URL parameters
        autPathList = conf['autPath'].split("?")
        if len(autPathList) == 1:
            cmd += autPathList[0]
        else:
            cmd += autPathList[0] + "%3F" + urllib.quote(autPathList[1])
        
        cmd += " simulatorSvn=%s" %conf['simulatorSvn']
        
        if (util.getOperatingSystemName() == "Windows"):
            cmd += " testBrowser=%s" %conf["browserLauncher"]
        else:
            cmd += " testBrowser='%s'" %conf["browserLauncher"]

        cmd += " browserId=\"%s\"" %conf["browserId"]

        if conf["simulationOptions"]:
          for opt in conf["simulationOptions"]:
            cmd += ' "%s"' %opt
        
        if "testLogFile" in conf:
            cmd += " logFile=%s" %conf["testLogFile"]
            
        return cmd
      
      
    def run(self):
        conf = self.configuration
        logMsg = "Testing %s in %s: %s" %(conf['autName'], conf["browserId"], self.startCmd)
        
        if (self.simulate):
            self.log.info("SIMULATION: %s" %logMsg)
        else:
            self.log.info(logMsg)
            util.invokeExternal(self.startCmd)


if __name__ == "__main__":
    try:
        rc = 0
        configFile = codecs.open(sys.argv[1], "r", "UTF-8")
        config = json.load(configFile)
        testRun = TestRun(config)
        testRun.runPackage()
    except KeyboardInterrupt:
        print
        print "  * Keyboard Interrupt"
        rc = 1
    sys.exit(rc)