simulation.QxSimulation = function(config)
{
  var that = new simulation.QxSimulationBase(config);
  
  that.errorCount = 0;
  that.warningCount = 0;
   
  /**
   * Formats a message according to the error level, then writes it to the local 
   * log file.
   * 
   * @param text {String} the message to be logged
   * @param level {String?"debug"} The message's error level. One of "debug", 
   *   "info", "warn", "error".
   */
  that.log = function(text, level)
  {
    var msg = text || "";
    var lvl = level || "debug";
      
    if (lvl == "error") {
      this.errorCount++;
    }
    
    if (lvl == "warn") {
      this.warningCount++;
    }
    
    msg = this.sanitize(msg);
    
    this.logger.log(msg, level);
  };
  
  
  /**
   * Logs a debug message
   * 
   * @param logMessage {String} The message to be logged.
   */
  that.debug = function(logMessage)
  {
    this.log(logMessage, "debug");
  };
  
  
  /**
   * Logs an info message
   * 
   * @param logMessage {String} The message to be logged.
   */
  that.info = function(logMessage)
  {
    this.log(logMessage, "info");
  };
  
  
  /**
   * Logs a warning message
   * 
   * @param logMessage {String} The message to be logged.
   */
  that.warn = function(logMessage)
  {
    this.log(logMessage, "warn");
  };
  
  
  /**
   * Logs an error message
   * 
   * @param logMessage {String} The message to be logged.
   */
  that.error = function(logMessage)
  {
    this.log(logMessage, "error");
  };
  
  
  /**
   * Logs information about the test environment.
   */
  that.logEnvironment = function()
  {
    this.info("QxSimulation testing " + this.__config.getSetting("autName", "Unnamed Application") + " using browser: " + this.__config.getSetting("testBrowser"));
    this.info("Application under test: " + this.__config.getSetting("autHost") + unescape(this.__config.getSetting("autPath")));
    this.info("Platform: " + environment["os.name"]);
  };
  
  /**
   * Logs the test browser's user agent string.
   */
  that.logUserAgent = function(){
    var agent = qxSelenium.getEval('navigator.userAgent');
    this.info("User agent: " + agent);
  };
  
  
  /**
   * Logs the amount of time passed since the given start date.
   * 
   * @param sDate {Date} the start date
   * @param desc {String} optional description
   */
  that.logDuration = function(sDate, desc)
  {
    var startDate = sDate || this.startDate;
    var description = desc || "Test run";
    
    var stopDate = new Date();
    var elapsed = stopDate.getTime() - startDate.getTime();
    elapsed = (elapsed / 1000);
    var min = Math.floor(elapsed / 60);
    var sec = Math.round(elapsed % 60);
    if (sec < 10) {
      sec = "0" + sec;
    }
  
    this.info(description + " finished in: " + min + " minutes " + sec + " seconds.");
  };
  
  
  /**
   * Default simulation result logging.
   */
  that.logResults = function()
  {
    if (this.__config.getSetting("disposerDebug", false)) {
      print("disposer debugging");
      var getDisposerDebugLevel = "selenium.qxStoredVars['autWindow'].qx.core.Setting.get('qx.disposerDebugLevel')";
      var disposerDebugLevel = qxSelenium.getEval(getDisposerDebugLevel);
      
      if (parseInt(disposerDebugLevel, 10) > 0 ) {
        //this.logDisposerDebug();
        this.qxShutdown();
      } else { print("debug level too low"); }
    }
    
    if (this.__config.getSetting("applicationLog", false)) {
      this.logRingBufferEntries();
    }
    
    if (!this.testFailed) {
      if (this.__config.getSetting("debug", false)) {
        this.debug("Test run finished successfully.");
      }
      
      var totalIssues = this.errorCount + this.warningCount;
      this.info(this.__config.getSetting("autName", "Unnamed application") + " ended with warnings or errors: " + totalIssues);
    }
    
  };
  
  
  /**
   * Retrieves all messages from the logger created by addRingBuffer and writes 
   * them to the simulation log.
   */
  that.logRingBufferEntries = function()
  {
    var debugLog = qxSelenium.getEval("selenium.qxStoredVars['autWindow'].qx.Simulation.getRingBufferEntries()");
    debugLog = String(debugLog);
    var debugLogArray = debugLog.split("|");
    
    for (var i=0,l=debugLogArray.length; i<l; i++) {
      this.info(debugLogArray[i]);
    }
  };  
  
  
  /**
   * Shuts down the qooxdoo application. Can be used for disposer debug logging.
   */
  that.qxShutdown = function()
  {
    qxSelenium.getEval('selenium.qxStoredVars["autWindow"].qx.core.ObjectRegistry.shutdown()', "Shutting down qooxdoo application");
  };
  
  
  /**
   * Open a URI containing a qooxdoo application and prepare it for testing. If no
   * URI is given, the current AUT is reloaded.
   * 
   * @param {String} uri Optional URI of the qooxdoo application to be loaded.
   */
  that.qxOpen = function(uri)
  {
    var openUri = uri || this.__config.getSetting("autHost") + "" + this.__config.getSetting("autPath");
    qxSelenium.open(openUri);
    this.setupEnvironment();
  };
  
  
  /**
   * Call any QxSelenium method wrapped in a try... catch block so that 
   * exceptions won't cause the test to fail. Exceptions are logged.
   * 
   * @param {String} command The name of a QxSelenium method
   * @param {Array} params Array containing parameters for the QxSelenium method
   * @param {String} description Optional description to be used for logging
   */
  that.runCommand = function(command, params, description)
  {
    var desc = description || "Running QxSelenium command " + command;
    try {
      qxSelenium[command].apply(qxSelenium, params);
    }
    catch(ex) {
      if (ex.javaException) {
        description = description + " Java Exception was: " + ex.javaException;
      }
      this.error("ERROR " + description);
    }
  };
  
  
  return that;
};