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
  
  this.__config = config;
  this.startDate = new Date();
  this.logger = this.__getLogger();
  
  
  /*
   * Frequently used Javascript code snippets meant to be run in the tested 
   * application's context through the getEval() method. 
   */
  simulation.QxSimulation.SELENIUMWINDOW = 'selenium.qxStoredVars["autWindow"]';
  simulation.QxSimulation.QXAPPINSTANCE = 'qx.core.Init.getApplication()';
  simulation.QxSimulation.ISQXAPPREADY = 'var qxReady = false; try { if (' 
    + simulation.QxSimulation.SELENIUMWINDOW + '.'  
    + simulation.QxSimulation.QXAPPINSTANCE 
    + ') { qxReady = true; } } catch(e) {} qxReady;';
  
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


/**
 * Start the Selenium session and set some basic options.
 * 
 * @return {Boolean} true if the Selenium session started without errors
 */
simulation.QxSimulation.prototype.startSession = function()
{
  if (this.__config.getSetting("debug")) {
    this.debug("Starting " + this.__config.getSetting("autName") + " session with browser " + this.__config.getSetting("testBrowser"));
  }
  
  // Create QxSelenium instance.
  try {
    this.selenium = new QxSelenium(this.__config.getSetting("selServer"),
                                   this.__config.getSetting("selPort"),
                                   this.__config.getSetting("testBrowser"),
                                   this.__config.getSetting("autHost"));
  }
  catch(ex) {
    throw new Error("Unable to create QxSelenium instance: " + ex);
  }

  try {
    this.selenium.start();
    this.selenium.setTimeout(this.__config.getSetting("globalTimeout"));    
    this.selenium.open(this.__config.getSetting("autHost") + "" + this.__config.getSetting("autPath"));
    this.selenium.setSpeed(this.__config.getSetting("stepSpeed"));
    this.setupEnvironment();
  }
  catch (ex) {
    throw new Error("ERROR: Unable to start test session: " + ex);
    return false;
  }
  return true;
};

/**
 * Add some testing utilities to the qooxdoo application. Must be called
 * after the application is (re)loaded.
 */
simulation.QxSimulation.prototype.setupEnvironment = function()
{
  /* 
   * Store the AUT window object to avoid calling 
   * selenium.browserbot.getCurrentWindow() repeatedly.
   */
  this.selenium.getEval('selenium.qxStoredVars = {}');    
  this.storeEval('selenium.browserbot.getCurrentWindow()', 'autWindow');
  
  this.prepareNameSpace();
  this.addSanitizer();
};

/**
 * Attaches a "Simulation" namespace object to the specified window's qx object.
 * This will be used to store custom methods added by addOwnFunction. If no 
 * window is specified, the AUT's window is used.
 * 
 * @param win {String} The name of the target window. Must evaluate to a 
 * JavaScript Window object.
 * @return {void}
 */
simulation.QxSimulation.prototype.prepareNameSpace = function(win)
{
  var targetWin = win || 'selenium.qxStoredVars["autWindow"]';
  var ns = String(this.selenium.getEval(targetWin + '.qx.Simulation'));
  if (ns == "null" || ns == "undefined") {
    this.selenium.getEval(targetWin + '.qx.Simulation = {};');
  }
};

/**
 * Removes special and formatting characters from strings so they can be logged.
 * 
 * @param text {String} The string to be sanitized
 * @return {String} The sanitized string
 */
simulation.QxSimulation.prototype.sanitize = function(text)
{
  // The message might be a Java object, so cast it as a String just to be sure.
  text = String(text);
  text = text.replace(/\n/g,'<br/>');
  text = text.replace(/\r/g,'<br/>');
  text = text.replace(/'/g, '&quot;');
  text = text.replace(/ä/g, '&auml;');
  text = text.replace(/ö/g, '&ouml;');
  text = text.replace(/ü/g, '&uuml;');
  text = text.replace(/Ä/g, '&Auml;');
  text = text.replace(/Ö/g, '&Ouml;');
  text = text.replace(/Ü/g, '&Uuml;');
  text = text.replace(/ß/g, '&szlig;');
  text = text.replace(/[^\w\d\-_:;\.,\"\!\?\(\)\[\]#$%&= \/\<\> ]?/gi, '');
  return text;
};

/**
 * Adds a function <code>qx.Simulation.sanitize</code> to the AUT's 
 * window, which will strip most special characters from a given string. 
 * It's more reliable to do this in this in the browser since some
 * characters will be fubared on the way from the browser to the test
 * script.
 * 
 * The function should be executed through getEval like this:
 * <code>this.getEval('selenium.browserbot.getCurrentWindow().qx.Simulation.sanitize(string)');</code>
 * 
 * @return {void}
 */
simulation.QxSimulation.prototype.addSanitizer = function()
{
  var sanitize = function(text)
  {
    text = text.replace(/'/g, '&quot;');
    text = text.replace(/[^\w\d\-_:;\.,\"\!\?\(\)\[\]#$%&= \/\<\> ]?/gi, ''); 
    return text;
  };
  
  this.addOwnFunction("sanitize", sanitize);
  
};

/**
 * Evaluates a JavaScript snippet and stores the result in the "qxStoredVars" 
 * map attached to the global selenium object.
 * Stored values can be retrieved through getEval:
 * <code>getEval('selenium.qxStoredVars["keyName"]')</code> 
 *
 * @param code {String} JavaScript snippet to be evaluated
 * @param varName {String} The name for the property the eval result will be 
 * stored in
 * @return {void}
 */
simulation.QxSimulation.prototype.storeEval = function(code, keyName)
{
  if (!code) {
    throw new Error("No code specified for storeEval()");
  }
  
  if (!keyName) {
    throw new Error("No key name specified for storeEval()");
  }

  this.selenium.getEval('selenium.qxStoredVars["' + keyName + '"] = ' + String(code));
};

/**
 * Adds a function to the "qx.Simulation" namespace of the application under 
 * test. This function can then be called using 
 * <code>Simulation.getEval("selenium.browserbot.getCurrentWindow().qx.Simulation.funcName();")</code>
 * 
 * @param funcName {String} name of the function to be added
 * @param func {Function} the function to be added
 * @return {void}
 */
simulation.QxSimulation.prototype.addOwnFunction = function(funcName, func)
{  
  if (!funcName) {
    throw new Error("Please choose a name for the function to be added.");
  }
  
  if (!func) {
    throw new Error("No function specified.");
  }
  
  if (typeof func != "string") {
    func = func.toString();    
  }

  func = func.replace(/\n/,'');
  func = func.replace(/\r/,'');
  
  this.selenium.getEval('selenium.browserbot.getCurrentWindow().qx.Simulation.' + funcName + ' = ' + func);
};

/**
 * Creates a new qx.log.appender.RingBuffer in the AUT and registers it. 
 * 
 * @return {void}
 */
simulation.QxSimulation.prototype.addRingBuffer = function(win)
{
  var qxWin = win || "selenium.qxStoredVars['autWindow']";
  var rb = "new " + qxWin + ".qx.log.appender.RingBuffer()";
  this.storeEval(rb, "ringBuffer");  
  var ret = this.selenium.getEval(qxWin + ".qx.log.Logger.register(selenium.qxStoredVars['ringBuffer'])");
};

/**
 * Adds a function to the AUT that retrieves all messages from the logger 
 * created by addRingBuffer.
 * 
 * @return {void}
 */
simulation.QxSimulation.prototype.addRingBufferGetter = function()
{
  var getRingBufferEntries = function(autWin) {
    var targetWin = autWin || selenium.qxStoredVars['autWindow'];
    var entries = selenium.qxStoredVars["ringBuffer"].getAllLogEvents();
    var entryArray = [];
    for (var i=0,l=entries.length; i<l; i++) {
      try {
      var entry = targetWin.qx.log.appender.Util.toText(entries[i]);
      entryArray.push(entry);
      } catch(ex) {
        var entry = entries[i].level + ":";
        for (var j=0,m=entries[i].items.length; j<m; j++) {
          entry += entries[i].items[j].text + " ";
        }
        entryArray.push(entry);
      }
    }
    return entryArray.join("|");
  };
  
  this.addOwnFunction("getRingBufferEntries", getRingBufferEntries);  
};

/**
 * Creates a global error handler that stores JavaScript exceptions that are 
 * thrown in the specified window. Global Error Handling must be enabled in the 
 * AUT.
 * Also adds a simple getter function that returns the contents of the exception
 * store as a string separated by pipe characters ("|");
 *
 * @param win {String} The target window. Must evaluate to a JavaScript Window 
 * object. Default: The AUT's window.
 * @return {void}
 */
simulation.QxSimulation.prototype.addGlobalErrorHandler = function(win)
{
  var qxWin = win || "selenium.qxStoredVars['autWindow']";
  this.selenium.getEval(qxWin + ".qx.Simulation.errorStore = [];");
  
  var addHandler = function(autWin)
  {
    var targetWin = autWin || selenium.qxStoredVars['autWindow'];
    targetWin.qx.event.GlobalError.setErrorHandler(function(ex) {
      var exString = "";
      if (ex instanceof targetWin.qx.core.WindowError) {
        exString = ex.toString() + " in " + ex.getUri() + " line " + ex.getLineNumber();
      }
      else if (ex instanceof targetWin.qx.core.GlobalError) {
        exString = ex.toString();
      }
      else {
        exString = ex.name + ": " + ex.message;
        if (ex.fileName) {
          exString += " in file " + ex.fileName;
        }
        if (ex.lineNumber) {
          exString += " line " + ex.lineNumber;
        }
        if (ex.description) {
          exString += " Description: " + ex.description;
        }
      }
      var sanitizedEx = selenium.qxStoredVars['autWindow'].qx.Simulation.sanitize(exString);
      targetWin.qx.Simulation.errorStore.push(sanitizedEx);
    });
  };
  
  this.addOwnFunction("addGlobalErrorHandler", addHandler);
  this.selenium.getEval("selenium.qxStoredVars['autWindow'].qx.Simulation.addGlobalErrorHandler(" + qxWin + ");");  
};

simulation.QxSimulation.prototype.addGlobalErrorGetter = function(win)
{
  var qxWin = win || "selenium.qxStoredVars['autWindow']";
  var globalErr = function(win)
  {
     var targetWin = win || selenium.qxStoredVars['autWindow'];
     var exceptions = targetWin.qx.Simulation.errorStore;
     var exString = exceptions.join("|");
     return exString;     
  };
  this.addOwnFunction("getGlobalErrors", globalErr);
};

simulation.QxSimulation.prototype.getGlobalErrors = function(win)
{
  var qxWin = win || "selenium.qxStoredVars['autWindow']";
  var exceptions = this.selenium.getEval("selenium.qxStoredVars['autWindow'].qx.Simulation.getGlobalErrors(" + qxWin + ")");
  return String(exceptions);
};

/**
 * Empties the given window's global exception store.
 *
 * @param win {String} The target window. Must evaluate to a JavaScript Window 
 * object. Default: The AUT's window.
 * @return {void}
 */
simulation.QxSimulation.prototype.clearGlobalErrorStore = function(win)
{
  var targetWin = win || "selenium.qxStoredVars['autWindow']";
  this.selenium.getEval(targetWin + ".qx.Simulation.errorStore = [];");
};