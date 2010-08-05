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

qx.Loader.require(["qx.simulation.QxSimulation"]);

qx.Class.define("qx.simulation.unit.TestCase", {

  extend : qx.simulation.QxSimulation,

  construct : function()
  {
    this._testCount = 0;
    this._testsFailed = 0;
  },

  members:
  {   
    _getTestList : function()
    {
      var testList = [];
      for (prop in this) {
        if (prop.indexOf("test") == 0 && typeof this[prop] == "function") {
          this._testCount++;
          testList.push(prop);
        }
      }
      return testList;
    },

    runTests : function()
    {
      var testList = this._getTestList();
      this.startSession();
      this.info("Running " + this._testCount + " tests from " + this.classname);
          
      for (var i=0,l=testList.length; i<l; i++) {
        var testFunc = testList[i];
        var testFullName = this.classname + "." + testFunc;
          
        if (this.setUp) {
          try {
            this.setUp();
          } catch(ex) {
            this._testsFailed++;
            this.error("Error setting up " + testFullName + ": " + ex);
            continue;
          }
        }
        
        try {
          this[testFunc]();
          this.info("Test " + testFullName + " successful");
        } catch(ex) {
          this._testsFailed++;
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
      this.info(this._testsFailed + " failed tests out of " + this._testCount + " total");
      qx.simulation.qxSelenium.stop();
    }
  }
});

