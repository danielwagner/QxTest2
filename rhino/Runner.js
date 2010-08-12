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

qx = {};
// root directory of qooxdoo's Rhino classes
qx.$$basePath = "";
// command-line arguments
qx.$$args = arguments ? arguments : "";

(function() {
  for (var i=0; i<qx.$$args.length; i++) {
    var keyVal = qx.$$args[i].split("=");
    if (keyVal[0] == "qxPath") {
      qx.$$path = keyVal[1];
      qx.$$basePath = keyVal[1] + "/tool/rhino";
      break;
    }
  }

  if (qx.$$basePath !== "") {
    load([qx.$$basePath + "/qx-oo.js"]);
    load([qx.$$basePath + "/qx/Loader.js"]);
  } else {
    load(["qx-oo.js"]);
    load(["qx/Loader.js"]);
  }
  
  qx.Loader.require(["qx.simulation.util.Config","qx.log.appender.RhinoConsole"]);  
  qx.log.Logger.register(qx.log.appender.RhinoConsole);
  qx.simulation.config = new qx.simulation.util.Config(qx.$$args);
  
  if (qx.simulation.config.getSetting("testClasses", false)) {
    // JUnit-style test
    qx.Loader.require(["qx.simulation.unit.TestSuite"]);
    var suite = new qx.simulation.unit.TestSuite();
    suite.runTests();  
  }
  else if (qx.simulation.config.getSetting("application", false)) {
    // Standalone application
    var classPath = qx.simulation.config.getSetting("classPath", "");
    var appClass = qx.simulation.config.getSetting("application", false);
    qx.Loader.require(["qx.simulation.QxSimulation"]);
    qx.Loader.require([appClass], classPath);
    var appClassArray = appClass.split(".");
    var appClass = qx.Loader.getObjectByName(appClassArray);
    var inst = new appClass();
    inst.main();
  }
  else {
    this.error("No application class or list of test classes defined");
  }
})();
