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

var args = arguments ? arguments : "";
var basePath = "";
for (var i=0; i<args.length; i++) {
  keyVal = args[i].split("=");
  if (keyVal[0] == "basePath") {
    basePath = keyVal[1];
    break;
  }
}


if (basePath !== "") {
  load([basePath + "/qx-oo.js"]);
  load([basePath + "/qx/Loader.js"]);
} else {
  load(["qx-oo.js"]);
  load(["qx/Loader.js"]);
}

qx.Loader.require(
  [
    "qx.simulation.util.Config",
    "qx.log.appender.RhinoConsole",
    "qx.simulation.unit.TestSuite"
    //"qx.simulation.qxselenium.QxSelenium"
  ]);

qx.log.Logger.register(qx.log.appender.RhinoConsole);
qx.simulation.config = new qx.simulation.util.Config(args);

var suite = new qx.simulation.unit.TestSuite();
suite.runTests();

