#! /usr/bin/env python
#import simplejson as json

conf = {
  "base": {
    "type"               : "local",
    "testHostId"         : "",
    "logDirectory"       : "/home/dwagner/workspace/qooxdoo-schlund/project/testing/devlogs",
    "reportDirectory"    : "/home/dwagner/workspace/qooxdoo-schlund/project/testing/reports",
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
    'Firefox 1.5'       : '*firefox /usr/lib/firefox-1.5/firefox-bin',
    'Firefox 2.0'       : '*firefox2 /usr/lib/firefox-2.0/firefox-bin',
    'Firefox 3.0'       : '*firefox3 /usr/lib/firefox-3.0/firefox',
    'Firefox 3.5'       : '*firefox3 /usr/lib/firefox-3.5/firefox-bin',
    'Firefox 3.6'       : '*firefox3 /usr/lib/firefox-3.6/firefox-bin',
    'Opera 9.64'        : '*opera',
    'Chrome 4b'         : '*googlechrome /opt/google/chrome/google-chrome'
  },
    
  "testRun" : {
    "simulatorDirectory"    : "/home/dwagner/workspace/qooxdoo.contrib/Simulator",
    "updateSimulator"       : False,
    "host"                  : "http://172.17.12.142",
    "qxPath"                : "/qx/trunk/qooxdoo",    
    "XXXapplications" : {
                      
#      "API" : {
#        "path"                  : "/framework/api/index.html",
#        "simulationScript"      : "/home/dwagner/workspace/qooxdoo.contrib/Simulator/trunk/tool/selenium/simulation/api/test_api.js",
#        "browsers" : [
#          {
#            "browserId"             : "Firefox 3.5"
#          }
#        ] 
#      },
      
#      "APIViewer" : {
#        "path"                  : "/framework/api/index.html",
#        "simulationScript"      : "/home/dwagner/workspace/qooxdoo.contrib/Simulator/trunk/tool/selenium/simulation/apiviewer/test_apiviewer.js",
#        "browsers" : [
#          {
#            "browserId"             : "Firefox 3.5"
#          }
#        ] 
#      },
      
#      "Demobrowser" : {
#        "path"                  : "/application/demobrowser/build/index.html",
#        "simulationScript"      : "/home/dwagner/workspace/qooxdoo.contrib/Simulator/trunk/tool/selenium/simulation/demobrowser/test_demobrowser.js",
#        "browsers" : [
#          {
#            "browserId"             : "Firefox 3.5"
#          }
#        ] 
#      },

#      "Feedreader" : {
#        "path"                  : "/application/feedreader/build/index.html",
#        "simulationScript"      : "/home/dwagner/workspace/qooxdoo.contrib/Simulator/trunk/tool/selenium/simulation/feedreader/test_feedreader.js",
#        "browsers" : [
#          {
#            "browserId"             : "Firefox 3.5"
#          }
#        ] 
#      },

#      "Inspector" : {
#        "path"                  : "/component/inspector/build/index.html",
#        "simulationScript"      : "/home/dwagner/workspace/qooxdoo.contrib/Simulator/trunk/tool/selenium/simulation/inspector/test_inspector.js",
#        'options' : ['inspectedApplication=/qx/trunk/qooxdoo/application/feedreader/build/'],
#        "browsers" : [
#          {
#            "browserId"             : "Firefox 3.5"
#          }
#        ] 
#      },
      
#      "Playground" : {
#        "path"                  : "/application/playground/build/index.html",
#        "simulationScript"      : "/home/dwagner/workspace/qooxdoo.contrib/Simulator/trunk/tool/selenium/simulation/playground/test_playground.js",
#        "browsers" : [
#          {
#            "browserId"             : "Firefox 3.5"
#          }
#        ] 
#      },

#      "Portal" : {
#        "path"                  : "/application/portal/build/index.html",
#        "simulationScript"      : "/home/dwagner/workspace/qooxdoo.contrib/Simulator/trunk/tool/selenium/simulation/portal/test_portal.js",
#        "browsers" : [
#          {
#            "browserId"             : "Firefox 3.5"
#          }
#        ] 
#      },
      
#      "Showcase" : {
#        "path"                  : "/application/showcase/build/index.html",
#        "simulationScript"      : "/home/dwagner/workspace/qooxdoo.contrib/Simulator/trunk/tool/selenium/simulation/showcase/test_showcase.js",
#        "browsers" : [
#          {
#            "browserId"             : "Firefox 3.5"
#          }
#        ] 
#      },
                      
#      "Testrunner" : {
#        "path"                  : "/framework/test/index.html",
#        "simulationScript"      : "/home/dwagner/workspace/qooxdoo.contrib/Simulator/trunk/tool/selenium/simulation/testrunner/test_testrunner.js",
#        "browsers" : [
#          {
#            "browserId"             : "Firefox 3.5"
#          }
#        ] 
#      }
    
    },
    
    "collections" : {
       "Demos" : {
         "path" : "/application/demobrowser/build/demo",
         "startDir" : "/var/www/qx/trunk/qooxdoo/application/demobrowser/build/demo", 
         "simulationScript" : "/home/dwagner/workspace/qooxdoo.contrib/Simulator/trunk/tool/selenium/simulation/demobrowser/demo",
         "browsers" : [
           {
             "browserId"             : "Firefox 3.5"
           }
         ]
       }
    }
    
  },
  
  "buildXXX" : {
    "svnRevert"     : True,
    "svnUpdate"     : True,
    'stageDir'      : '/var/www/qx',
    'buildLogDir'   : 'build',
    'buildLogLevel' : 'error',
    'batbuild'      : '/home/dwagner/workspace/qooxdoo.trunk/tool/admin/app/batserver/batbuild.py',
    'targets' : {
      'Testrunner'  : '-z -C -p framework -g test -n',
      #'Demobrowser' : '-z -C -p application/demobrowser -g build -n',
      'Showcase'    : '-z -C -p application/showcase -g build -n',
      'Feedreader'  : '-z -C -p application/feedreader -g build -n',
      'Playground'  : '-z -C -p application/playground -g build -n',
      'Portal'      : '-z -C -p application/portal -g build -n',
      'APIViewer'   : '-z -p framework -g api -n',
      'Inspector'   : '-z -C -p component/inspector -g build -n'
    }
  },
  
  "lintXXX" : {
    "ignoreMessages" : ["Use of deprecated global identifier", "Multiply declared identifier", "Protected data field"],
    "targets" : [
      {
        "name" : "APIViewer", 
        "path" : "/var/www/qx/trunk/qooxdoo/component/apiviewer"
      },
      {
        "name" : "Demobrowser", 
        "path" : "/var/www/qx/trunk/qooxdoo/application/demobrowser"
      },
      {
        "name" : "Feedreader", 
        "path" : "/var/www/qx/trunk/qooxdoo/application/feedreader"
      },
      {
        "name" : "Framework", 
        "path" : "/var/www/qx/trunk/qooxdoo/framework",
        "ignoreClasses" : ["qx.bom.Selector"]
      },
      {
        "name" : "Inspector", 
        "path" : "/var/www/qx/trunk/qooxdoo/component/inspector"
      },
      {
        "name" : "Playground", 
        "path" : "/var/www/qx/trunk/qooxdoo/application/playground"
      },
      {
        "name" : "Portal", 
        "path" : "/var/www/qx/trunk/qooxdoo/application/portal"
      },
      {
        "name" : "Showcase", 
        "path" : "/var/www/qx/trunk/qooxdoo/application/showcase"
      },
      {
        "name" : "Testrunner", 
        "path" : "/var/www/qx/trunk/qooxdoo/component/testrunner"
      }
    ]
  }
}

import testing
tr = testing.TestRun(conf)
tr.runPackage()