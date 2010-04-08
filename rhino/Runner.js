var args = arguments ? arguments : "";
var basePath = "";
for (var i=0; i<args.length; i++) {
  keyVal = args[i].split("=");
  if (keyVal[0] == "basePath") {
    basePath = keyVal[1];    
  }
}
load([basePath + "/simulation/Loader.js"]);

simulation.loader.load("simulation.util.Config", basePath);
simulation.loader.load("simulation.qxselenium.QxSelenium", basePath);
simulation.loader.load("simulation.QxSimulation", basePath);
simulation.loader.load("simulation.test.TestCase", basePath);
simulation.loader.load("simulation.test.TestSuite", basePath);

var config = new simulation.util.Config(args);
qxSelenium = simulation.qxselenium.QxSelenium.createQxSelenium(config);

var suite = new simulation.test.TestSuite(config);
suite.runTests();