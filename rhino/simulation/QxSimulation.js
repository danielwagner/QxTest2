simulation.QxSimulation = function(config)
{
  // Basic sanity check: No sense in continuing without QxSelenium.
  try {
    importClass(Packages.com.thoughtworks.selenium.QxSelenium);
  }
  catch(ex) {
    throw new Error("Couldn't import QxSelenium class! Make sure the qooxdoo " 
    + "Selenium user extensions are installed in your Selenium client.\n" + ex);
  }
  
  this.selenium = new QxSelenium(config.getSetting("selServer"),config.getSetting("selPort"),
                            config.getSetting("testBrowser"),config.getSetting("autHost"));
  
  this.__config = config;
  this.startDate = new Date();
  this.__logger = this.__getLogger();
  
};

simulation.QxSimulation.prototype.__getLogger = function()
{
  // Create a logger
  var logType = this.__config.getSetting("logger", "console");
  if (logType == "file") {
    // Determine the name for the log file.
    var logFile = this.__config.getSetting("logFile", false);
    if (!logFile) {
      logFile = this.__config.getSetting("autName") + "_" + this.startDate.getTime() + ".log"; 
    }
    
    simulation.loader.loadClass("simulation.logger.File", this.__config.getSetting("basePath"), "");
    return new simulation.logger.File(logFile);
  } 
  if (logType == "console") {
    simulation.loader.loadClass("simulation.logger.Console", this.__config.getSetting("basePath"));
    return new simulation.logger.Console();
  }
};
