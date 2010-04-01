#! /usr/bin/env python

conf = {
  "base" : {
    "type" : "standalone",
    "classPathSeparator" : ":"
  },
  
  "selenium" : {
    "seleniumHost" : "http://localhost",
    "seleniumPort" : 4444,
    "rhinoJar" : "/home/dwagner/workspace/qooxdoo-schlund/project/testing/rhino/current/js.jar",
    "seleniumDir" : "/home/dwagner/workspace/qooxdoo-schlund/project/testing/selenium",
    "seleniumClientDriverJar" : "selenium-java-client-driver.jar"
  },
  
  "browsers" : {
    "Browser" : "*firefox3 /usr/lib/firefox-3.6/firefox-bin"              
  },
  
  "testRun" : {
    "simulatorDirectory" : "/home/dwagner/workspace/qooxdoo.contrib/Simulator",
    "host" : "http://localhost",
    "applications" : {
      "APPNAMEGOESHERE" : {
        "path"                  : "/~dwagner/workspace/qooxdoo.trunk/application/feedreader/source/index.html",
        "simulationScript"      : "/home/dwagner/workspace/qooxdoo.contrib/Simulator/trunk/tool/selenium/simulation/feedreader/test_feedreader.js",
        "browsers" : [
          {
          "browserId" : "Browser"
          }
        ] 
      }
    }
  }
}

import testing
tr = testing.TestRun(conf)
tr.runPackage()