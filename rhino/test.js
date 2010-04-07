// Required configuration settings. Can't run a test without these.
var required = ['selServer', 'selPort', 'testBrowser', 'autHost', 'autPath'];

// Some default settings.
var defaults = {
  autName : "Unnamed Application"
};



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

var config = new simulation.util.Config(args, required, defaults);

(function() {
  var sim = new simulation.QxSimulation(config);
  
  started = sim.startSession();
  if (!started) {
    print("Session not started!");
    return;
  }
  
  sim.selenium.waitForCondition(simulation.QxSimulation.ISQXAPPREADY, "60000");
  
  sim.addRingBuffer();
  sim.addRingBufferGetter();
    
  sim.addGlobalErrorHandler();
  sim.addGlobalErrorGetter();
  /*
  var test = sim.selenium.getEval("try {selenium.qxStoredVars['autWindow'].qx.core.Init.blarg();} catch(ex) {}");
  print(String(test));  
  var gErrs = sim.getGlobalErrors();
  print("global Errors: " + gErrs);
  */
  
  //Packages.java.lang.Thread.sleep(2000000);
  /*
  sim.selenium.getEval("try { throw new Error('Some dumb error'); } catch(ex) {}");
  
  var gErrors = String(sim.getGlobalErrors());
  print("Global Errors: " + gErrors);
  sim.clearGlobalErrorStore();
  */
  sim.selenium.stop();
})();


//simulation.loader.loadClass("simulation.test.TestSuite", basePath);
//simulation.loader.loadClass("simulation.test.TestCase", basePath);

//simulation.loader.loadClass("simulation.test.TestCase", basePath);

//var suite = new simulation.test.TestSuite(testClasses, testClasspath, baseConf, args);
//suite.runTests();
