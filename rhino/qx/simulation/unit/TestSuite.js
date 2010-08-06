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
qx.Loader.require(["qx.simulation.unit.TestCase"]);

qx.Class.define("qx.simulation.unit.TestSuite", {

  extend : qx.core.Object,

  construct : function()
  {
    var testClassList = qx.simulation.config.getSetting("testClasses");
    var basePath = qx.simulation.config.getSetting("testClassPath");
    this.testClasses = [];

    for (var i=0,l=testClassList.length; i<l; i++) {
      qx.Loader.load(testClassList[i], basePath);
          
      // Create the test class instance
      var testClassArray = testClassList[i].split(".");
      var testClass = qx.Loader.getObjectByName(testClassArray);
      var testInst = new testClass();
      testInst.classname = testClassList[i];
      this.testClasses.push(testInst);
    }
  },

  members :
  {

    runTests : function() {
      for (var i=0,l=this.testClasses.length; i<l; i++) {
        var testClass = this.testClasses[i];
        /*
        try {
          testClass.runTests();
        }
        catch(ex) {
          print("Unexpected error while running " + testClass.classname + ": " + ex.javaException);
        }
        */
        testClass.runTests();
      }
    }

  }
});

