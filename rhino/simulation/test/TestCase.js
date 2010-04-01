/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2006-2010 1&1 Internet AG, Germany, http://www.1and1.org

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Daniel Wagner (d_wagner)

************************************************************************ */

simulation.test.TestCase = function(baseConf, args)
{
  var that = new simulation.Simulation2(baseConf, args);
  
  var sessionStarted = that.startSession();
  if (!sessionStarted) {
    throw new Error("Couldn't start test session");
  }

  var isAppReady = that.waitForCondition(simulation.Simulation2.ISQXAPPREADY, 60000, 
                                          "Waiting for qooxdoo application");

  if (!isAppReady) {
    that.testFailed = true;
    that.stop();
    return;
  }
  
    
  that.nameSpace = "";
  that.runTests = function() {
    for (prop in this) {
      if (prop != "testFailed" && prop.indexOf("test") == 0) {
        var testFullName = this.nameSpace + "." + prop;
        
        if (this.setUp) {
          try {
            this.setUp();
          } catch(ex) {
            this.error("Error setting up " + testFullName + ": " + ex);
            continue;
          }
        }
        
        try {
          this[prop]();
          this.info("Test " + testFullName + " successful");
        } catch(ex) {
          this.error("Test " + testFullName + " failed: " + ex);
        }
        
        if (this.tearDown) {
          try {
            this.tearDown();
          } catch(ex) {
            this.error("Error tearing down " + testFullName + ": " + ex);
          }
        } 
        
      }
    }
    this.stop();
  };
  
  return that;
};