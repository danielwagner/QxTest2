#!/usr/bin/env python
import util
import log
import selenium
#from lint import Lint
import testing
import build


conf = {
  "base": {
    "type"               : "local",
    "testHostId"         : "",
    "logDirectory"       : "/tmp/testLogs",
    "reportDirectory"    : "/tmp/testReports",
    "javaBin"            : "java",
    "classPathSeparator" : ":" 
  },
  
  "reporting" : {
    "mailFrom"            : "testing@qooxdoo.org",
    "mailTo"              : "daniel.wagner@1und1.de",
    "smtpHost"            : "smtp.1und1.de",
    "smtpPort"            : 587,
    "reportServer"        : "http://172.17.12.142/reports/testing/insertJson"
  },
  
  "selenium" : {
    "seleniumDir"             : "/home/dwagner/workspace/qooxdoo-schlund/project/testing/selenium",
    "seleniumVersion"         : "current",
    "seleniumServerJar"       : "selenium-server.jar",
    "seleniumClientDriverJar" : "selenium-java-client-driver.jar",
    "rhinoJar"                : "/home/dwagner/workspace/qooxdoo-schlund/project/testing/rhino/current/js.jar",
    "seleniumHost"            : "http://localhost",
    "seleniumPort"            : 4444,
    "killSelenium"            : "wscript ../../tool/killselenium.vbs"            
  },
  
  "browsers" : {
    'Firefox 3.5' : '*firefox3 /usr/lib/firefox-3.5/firefox-bin'
  },
    
  "testRun" : {
    "simulatorDirectory"    : "/home/dwagner/workspace/qooxdoo.contrib/Simulator",
    "updateSimulator"       : True,
    "host"                  : "http://172.17.12.142",
    "qxPath"                : "/qx/trunk/qooxdoo",
    "seleniumVersion"       : "0.9.2",
    "seleniumServerOptions" : "-singleWindow",
    
    "applications" : {
      "Testrunner" : {
        "individualServer"      : True,
        "seleniumServerOptions" : "-singleWindow",
        "path"                  : "/framework/test",
        "simulationScript"      : "/home/dwagner/workspace/qooxdoo.contrib/Simulator/trunk/tool/selenium/simulation/testrunner/test_testrunner.js",
        "seleniumVersion"       : "current",
        "browsers" : [
          {
            "browserId"             : "Firefox 3.5",
            "seleniumVersion"       : "0.9.2",
            "seleniumServerOptions" : "-singleWindow",
            "simulationOptions"     : ["include=qx.test.ui"]
          }
        ] 
      }
    }
  },
  
  "build" : {
    "svnRevert"     : False,
    "svnUpdate"     : False,
    'stageDir'      : '/var/www/qx',
    'buildLogDir'   : 'build',
    'buildLogLevel' : 'error',
    'batbuild'      : '/home/dwagner/workspace/qooxdoo.trunk/tool/admin/app/batserver/batbuild.py',
    'targets' : {
      #'Testrunner'  : '-z -C -p framework -g test -n',
      #'Demobrowser' : '-z -C -p application/demobrowser -g build -n',
      #'Showcase'    : '-z -C -p application/showcase -g build -n',
      #'Feedreader'  : '-z -C -p application/feedreader -g build -n',
      #'Playground'  : '-z -C -p application/playground -g build -n',
      'Portal'      : '-z -C -p application/portal -g build -n',
      #'APIViewer'   : '-z -p framework -g api -n',
      #'Inspector'   : '-z -C -p component/inspector -g build -n'
    }
  },
  
  "lint" : {
    "ignoreClasses"  : ["qx.lint.Config"],
    "ignoreMessages" : ["Message defined in lint"],
    "targets" : [
      {
        "name"           : "Portal", 
        "path"           : "/home/dwagner/workspace/qooxdoo.trunk/application/portal",
        "ignoreClasses"  : ["qx.lint.portal.Config"],
        "ignoreMessages" : ["Message defined in portal"]
      }
    ]
  }
}

myLog = log.Logger({"logFileName" : "dummy.log"})


#sel = selenium.SeleniumServer(testPackageConfig["selenium"])

"""
simConf = {
  "javaBin" : "java",
  "classPathSeparator" : ":",
  "seleniumClientDriverJar" : "/home/dwagner/workspace/qooxdoo-schlund/project/testing/selenium/current/selenium-java-client-driver.jar",
  "rhinoJar" : "/home/dwagner/workspace/qooxdoo-schlund/project/testing/rhino/current/js.jar",
  
  "simulatorSvn" : "/home/dwagner/workspace/qooxdoo.contrib/Simulator",
  "testLogFile" : "/tmp/testLogs/Portal/2010-01-14_14-16-33.log",
  "testReportDir" : "/tmp/testLogs/reports",
  
  "autName" : "Portal",
  "autHost" : "http://172.17.12.142",
  "autPath" : "/qx/trunk/qooxdoo/application/portal/build/index.html",
  "browserId" : "Firefox 3.5",
  "browserLauncher" : "*firefox3 /usr/lib/firefox-3.5/firefox-bin",
  "simulationOptions" : ["schni=schna", "bla=blubb"],
  "simulationScript" : "/home/dwagner/workspace/qooxdoo.contrib/Simulator/trunk/tool/selenium/simulation/portal/test_portal.js"
}
"""
#tr = testing.TestRun({})
#tr.prepareTestLog("/tmp/testLogs", "Portal")
#tr.prepareTestReport("/tmp/testReports", "Portal")
#print tr.getTrunkRevision("/var/www/qx/trunk/qooxdoo/revision.txt", "local")
#bs = tr.getBuildStatus("/var/www/qx/trunk/qooxdoo/buildStatus.json", "local")
#print repr(bs)
#tr.getDummyLog("/tmp/testLogs", "Portal", ["Opera 10.10", "Firefox 3.5"], "Some dumb error")
#tr.runSimulation(simConf)
#tr.formatLog("/tmp/testLogs/Portal/2010-01-14_14-16-33.log", "/tmp/testLogs/reports/Portal/2010-01-14_14-16-33.html")
#tr.sendReport("Portal", "/tmp/testLogs/reports/Portal/2010-01-14_14-16-33.html", mailConf)

#tr.reportResults("http://172.17.12.142/reports/testing/insertJson", "/home/dwagner/workspace/qooxdoo-schlund/project/testing/logs/Playground/2010-01-18_07-01-53.log", reportConf)

#builder = build.Builder(conf["build"])
#builder.buildApp("Portal")
#builder.buildAll()

tr = testing.TestRun(conf)
tr.runPackage()

