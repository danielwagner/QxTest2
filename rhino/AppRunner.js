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

var config = new simulation.util.Config(args);
qxSelenium = simulation.qxselenium.QxSelenium.createQxSelenium(config);

var sim = new simulation.QxSimulation(config);
sim.startSession();
sim.logEnvironment();
sim.logUserAgent();
sim.runCommand("qxClick", ["noLocator"], "bum click");
sim.logResults();
sim.logDuration();
qxSelenium.stop();