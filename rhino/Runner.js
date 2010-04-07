var args = arguments ? arguments : "";
var basePath = "";
for (var i=0; i<args.length; i++) {
  keyVal = args[i].split("=");
  if (keyVal[0] == "basePath") {
    basePath = keyVal[1];    
  }
}
load([basePath + "/simulation/Loader.js"]);

simulation.loader.loadClass("simulation.util.Config", basePath);
simulation.loader.loadClass("simulation.QxSimulation", basePath);
simulation.loader.loadClass("simulation.test.TestCase", basePath);
simulation.loader.loadClass("simulation.test.TestSuite", basePath);

var config = new simulation.util.Config(args);
var suite = new simulation.test.TestSuite(config);
suite.runTests();