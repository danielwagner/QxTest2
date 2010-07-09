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
  load([basePath + "/simulation/Loader.js"]);
} else {
  load(["simulation/Loader.js"]);
}

simulation.loader.require(
  [
    "simulation.util.Config",
    "simulation.qxselenium.QxSelenium",
    "simulation.log.Logger",
    "simulation.unit.TestSuite"]);

simulation.config = new simulation.util.Config(args);
simulation.qxSelenium = simulation.qxselenium.QxSelenium.createQxSelenium();
var suite = new simulation.unit.TestSuite();
suite.runTests();
