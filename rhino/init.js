// Required configuration settings. Can't run a test without these.
var required = ['selServer', 'selPort', 'testBrowser', 'autHost', 'autPath'];

// Some default settings.
var defaults = {
  debug : false,
  autName : "Unnamed Application",
  selServer : 'localhost',
  selPort : 4444,
  stepSpeed : "250",
  globalTimeout : 120000,
  disposerDebug : false,
  applicationLog : true
};

var args = arguments ? arguments : "";
var basePath = "";
for (var i=0; i<args.length; i++) {
  if (args[i].indexOf('basePath') >= 0) {
    basePath = args[i].substr(args[i].indexOf('basePath=') + 9);
  }
}

load([basePath + "/simulation/Loader.js"]);
simulation.loader.loadClass("simulation.util.Config", basePath);
simulation.loader.loadClass("simulation.QxSimulation", basePath);

var config = new simulation.util.Config(args, defaults, required);
var sim = new simulation.QxSimulation(config);
sim.__logger.info("yoohoo");

//simulation.loader.loadClass("simulation.test.TestSuite", basePath);
//simulation.loader.loadClass("simulation.test.TestCase", basePath);

//simulation.loader.loadClass("simulation.test.TestCase", basePath);

//var suite = new simulation.test.TestSuite(testClasses, testClasspath, baseConf, args);
//suite.runTests();
