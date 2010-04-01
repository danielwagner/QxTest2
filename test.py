#!/usr/bin/env python
import util
import log
import seleniumserver
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
        "seleniumVersion"       : "1.0.1",
        "browsers" : [
          {
            "browserId"             : "Firefox 3.5",
            "seleniumVersion"       : "current",
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

#myLog = log.Logger({"logFileName" : "dummy.log"})


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

#tr = testing.TestRun(conf)
#tr.runPackage()

htmlContent = """<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en"><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>qooxdoo Test Report</title><style type="text/css">
body{font-family:Arial,sans-serif}h1{font-size:18px}h1,h2,h3,td,p{padding:8px}h1,h2,h3,td,p,.testResult h3{margin:0}h2{font-size:16px}h3{font-size:14px}.jump{border-collapse:collapse;margin-bottom:25px}.jump td,.jump th{border:1px solid black}.jump th{background:black;color:white}.jump th,td,p{font-size:12px}.jump th,.qxappender .type-array,.qxappender .type-map,.qxappender .type-class,.qxappender .type-instance,.qxappender .type-stringify,.totalerrors,.testResult h3{font-weight:bold}.qxappender{font:11px consolas,"bitstream vera sans mono","courier new",monospace}.qxappender .level-debug{background:white}.qxappender .level-info{background:#deedfa}.qxappender .level-warn{background:#fff7d5}.qxappender .level-error{background:#ffe2d5}.qxappender .level-user{background:#e3efe9}.qxappender .type-string{color:black}.qxappender .type-string,.qxappender .type-number,.qxappender .type-boolean{font-weight:normal}.qxappender .type-number{color:#155791}.qxappender .type-boolean{color:#15bc91}.qxappender .type-array,.qxappender .type-map{color:#cc3e8a}.qxappender .type-key,.qxappender .type-instance,.qxappender .type-stringify{color:#565656}.qxappender .type-key{font-style:italic}.qxappender .type-class{color:#5f3e8a}.qxappender .noerror{background:#a9ff93}.testResult,#sessionlog{font:11px "consolas","courier new",monospace}.testResult{background:lime;padding-top:4px}.testResult,.level-error,.level-warn,.level-info,.level-debug{margin:4px}.testResult h3{font-size:11px;color:#134275;padding-left:4px}.failure,.error{background:#fef4f4;border-left:3px solid #9d1111}.success{background:#faffed;border-left:3px solid #deff83}
</style></head><body>
    <table class="jump">
    <tr>
    <th>App under test</th>
    <th>Browser</th>
    <th>Test host</th>
    <th>Date</th>
    <th>Test duration</th>    
    <th>Test result</th>
    </tr><tr><td><a href="#t_1268994600247">Portal</a></td><td>Firefox 3.6 on Linux</td><td>127.0.0.1</td><td>2010-03-19 11:30:00</td><td>0 minutes 19 seconds.</td><td style="align:center; background-color: #00FF00">0 warnings/errors</td></tr></table><div id="t_1268994600247">  <h1>Portal results from 2010-03-19 11:30:00</h1>
  <p>Application under test: <a href="http://172.17.12.142/qx/trunk/qooxdoo/application/portal/build/index.html">http://172.17.12.142/qx/trunk/qooxdoo/application/portal/build/index.html</a></p>
  <p>Platform: Linux</p>
  <p>User agent: Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.2) Gecko/20100115 Firefox/3.6</p>
  <div class="qxappender"><div class="level-info"><p>debug:Load runtime: 117ms </p></div></div>
  <div class="qxappender"><div class="level-info"><p>debug:Main runtime: 15ms </p></div></div>
  <div class="qxappender"><div class="level-info"><p>debug:Finalize runtime: 0ms </p></div></div>
  <div class="qxappender"><div class="level-info"><p>Portal ended with warnings or errors: 0</p></div></div>
  <div class="qxappender"><div class="level-info"><p>Test run finished in: 0 minutes 19 seconds.</p></div></div>
</div><p class="totalerrors">Total errors in report: 0</p>
  </body></html>"""

import smtplib
from email.MIMEMultipart import MIMEMultipart
from email.MIMEText import MIMEText
msg = MIMEMultipart()
mailFrom = "testing@qooxdoo.org"
mailTo = "daniel.wagner@1und1.de"
msg['From'] = mailFrom
msg['To'] = mailTo
msg['Subject'] = "Mail test"
msg.preamble = 'Test Results'

msgText = MIMEText(htmlContent, 'html')
msg.attach(msgText)

mailServer = smtplib.SMTP("smtp.1und1.de", 587)  
mailServer.ehlo()
mailServer.starttls()
mailServer.ehlo()
mailServer.sendmail(mailFrom, mailTo, msg.as_string())
mailServer.close()
    