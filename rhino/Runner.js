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
simulation.loader.load("simulation.QxSimulationBase", basePath);
simulation.loader.load("simulation.QxSimulation", basePath);
simulation.loader.load("simulation.test.TestCase", basePath);
simulation.loader.load("simulation.test.TestSuite", basePath);

var config = new simulation.util.Config(args);
qxSelenium = simulation.qxselenium.QxSelenium.createQxSelenium(config);

//var suite = new simulation.test.TestSuite(config);
//suite.runTests();

var sim = new simulation.QxSimulation(config);

sim.startSession();

sim.addGlobalErrorHandler();
sim.addGlobalErrorGetter();
sim.addRingBuffer();
sim.addRingBufferGetter();
sim.logEnvironment();
sim.logUserAgent();

//sim.runCommand("qxClick", ["noLocator"], "bum click");
sim.runCommand("waitForCondition", [simulation.QxSimulationBase.ISQXAPPREADY, 30000], "Waiting for qooxdoo application");
sim.logResults();
sim.logDuration();