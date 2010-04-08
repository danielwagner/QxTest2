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

simulation.test.TestSuite = function(config) 
{
  var testClassList = config.getSetting("testClasses");
  var basePath = config.getSetting("testClassPath");
  this.testClasses = [];

  function getObjectByNamespace(nsArr) {
    var obj = this;
    for (var i=0; i < nsArr.length; i++) {
      obj = obj[nsArr[i]];
    }
    return obj;
  }
  
  for (var i=0,l=testClassList.length; i<l; i++) {
    simulation.loader.load(testClassList[i], basePath);
        
    // Create the test class instance
    var testNamespace = testClassList[i].split(".");
    var testClass = getObjectByNamespace(testNamespace);
    var testInst = new testClass(config);
    testInst.classname = testClassList[i];
    this.testClasses.push(testInst);
  }
  
  this.runTests = function() {
    for (var i=0,l=this.testClasses.length; i<l; i++) {
      var testClass = this.testClasses[i];
      try {
        testClass.runTests();
      }
      catch(ex) {
        print("Unexpected error while running " + testClass.classname + ": " + ex.javaException);
      }
    }
  };  
};