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

/**
 * This class represents automated interaction tests ("Simulations") of 
 * qooxdoo-based applications. It contains generic functionality such as 
 * logging and error handling that is reused across multiple Simulations.
 *
 * Actual Simulations should extend this class with their own methods containing
 * code specific to the application to be tested, such as simulated user 
 * interaction using qooxdoo locators[1].
 * 
 * This code is intended to be run through Mozilla Rhino as described in the
 * Simulator manual[2].
 * 
 * [1] http://qooxdoo.org/contrib/project/simulator/selenium-user-extension
 * [2] http://qooxdoo.org/contrib/project/simulator#javascript
 * 
 * @constructor
 * @param baseConf {Map} basic configuration settings for this Simulation
 * @param args {String} optional Rhino command line arguments 
 */
simulation.Simulation2 = function(baseConf, args)
{
  // Basic sanity check: No sense in continuing without QxSelenium.
  try {
    importClass(Packages.com.thoughtworks.selenium.QxSelenium);
  }
  catch(ex) {
    throw new Error("Couldn't import QxSelenium class! Make sure the qooxdoo " 
    + "Selenium user extensions are installed in your Selenium client.\n" + ex);
  }
  
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
    applicationLog : true,
    logger : "file"
  };
  
  /*
   * Frequently used Javascript code snippets meant to be run in the tested 
   * application's context through the getEval() method. 
   */
  simulation.Simulation2.SELENIUMWINDOW = 'selenium.qxStoredVars["autWindow"]';
  simulation.Simulation2.QXAPPINSTANCE = 'qx.core.Init.getApplication()';
  simulation.Simulation2.ISQXAPPREADY = 'var qxReady = false; try { if (' 
    + simulation.Simulation2.SELENIUMWINDOW + '.'  
    + simulation.Simulation2.QXAPPINSTANCE 
    + ') { qxReady = true; } } catch(e) {} qxReady;';


  var __totalErrorsLogged = 0;
  var __totalWarningsLogged = 0;
  
  this.testFailed = false;
  
  /**
   * Sets the total number of errors logged.
   * 
   * @private
   * @param errors {Integer} The new error count
   * @return {void}
   */
  this.setTotalErrorsLogged = function(errors) 
  {
    __totalErrorsLogged = errors;
  };
  
  /**
   * Sets the total number of warnings logged.
   * 
   * @private
   * @param warnings {Integer} The new warning count
   * @return {void}
   */
  this.setTotalWarningsLogged = function(warnings) 
  {
    __totalWarningsLogged = warnings;
  };

  /**
   * Returns the total number of errors logged by the {@link #log} method.
   * 
   * @return {Integer} Number of errors logged so far in the current Simulation
   */
  this.getTotalErrorsLogged = function()
  {
    return __totalErrorsLogged;
  };


  /**
   * Returns the total number of warnings logged by the {@link #log} method.
   * 
   * @return {Integer} Number of warnings logged so far in the current Simulation
   */
  this.getTotalWarningsLogged = function()
  {
    return __totalWarningsLogged;
  };

  /**
   * Initalizes the configuration, sets defaults if necessary and validates the 
   * configuration.
   * 
   * @private
   * @param baseConf {Map} a map of configuration settings
   * @param args {String} optional space-delimited string of 'key=value' pairs
   * @return {Map} the configuration for this Simulation instance
   * @throws an exception if a required setting is missing
   */    
  function initConfig(baseConf, args)
  {
    /* 
     * If the script was called with any external arguments (e.g. on the Rhino
     * command line), add those settings to the config map, overriding any 
     * properties already defined in baseConf. 
     */
    
    var conf = baseConf || {};
    if (args) {      
      var argConf = getConfigFromArgs(args);
      for (var prop in argConf) {
        conf[prop] = argConf[prop];
      }
    }

     // Set defaults if they're not already set.
    for (var key in defaults) {
      if (!(key in conf)) {
        conf[key] = defaults[key];
      }
    }
    
    // Check if all required keys are set.
    for (var i=0,l=required.length; i<l; i++) {
      if (!(required[i] in conf)) {
        throw new Error("Required property " + required[i] + " not in configuration!");
      }
    }

    return conf;
  }
  
  var __config = initConfig(baseConf || false, args || false);
  
  /**
   * Split an array of 'key=value' strings (e.g. Rhino's arguments property) and 
   * store them in a map.
   * 
   * @private
   * @param args {String} a space-delimited string of 'key=value' pairs
   * @return {Map} a map of key-value pairs
   */
  function getConfigFromArgs(args)
  {
    var conf = {}; 
    for (var i in args) {
      if (args[i].indexOf("=") >0) {
        var tempArr = args[i].split("=");
        if (tempArr[1] == "true") {
          conf[tempArr[0]] = true;
        }
        else if (tempArr[1] == "false") {
          conf[tempArr[0]] = false;
        }
        else {
          conf[tempArr[0]] = tempArr[1]; 
        }
      }
    }
    return conf;
  }
  
  /**
   * Public getter for configuration settings.
   * 
   * @param prop {String} the name of a configuration key
   * @param defaultValue {String} Optional value to be returned if the key isn't
   * defined in the configuration
   * @return {String} the value of the requested configuration key
   * @throw an exception if no key was specified or the key doesn't exist in the
   *   configuration map and no default value was specified
   */
  this.getConfigSetting = function(prop, defaultValue)
  {
    if (!prop) {
      throw new Error("No configuration key specified!");
    }
    
    if (!(prop in __config)) {
      if (defaultValue || typeof(defaultValue) == "boolean") {
        return defaultValue;
      }
      else {
        throw new Error("Key " + prop + " not in configuration!");  
      }   
    }
    else {
      return __config[prop];
    }   
  };
  
  function addZero(val)
  {
    if (val < 10) {
      val = "0" + val;
    }
    return val;
  }

  this.startDate = new Date();
  
  this.startDateString = this.startDate.getFullYear() + "-";
  
  var month = this.startDate.getMonth() + 1;  
  this.startDateString += addZero(month) + "-";
  
  var day = this.startDate.getDate();  
  this.startDateString += addZero(day) + " ";
  
  var hours = this.startDate.getHours();  
  this.startDateString += addZero(hours) + ":";
  
  var minutes = this.startDate.getMinutes();
  this.startDateString += addZero(minutes) + ":";
  
  var seconds = this.startDate.getSeconds();
  this.startDateString += addZero(seconds);
  
  // Create a logger
  if (__config.logger == "file") {
    // Determine the name for the log file.
    if (!("logFile" in __config)) {
      __config.logFile = __config.autName + "_" + this.startDate.getTime() + ".log"; 
    }
    
    //load([__config.simulatorSvn + "/trunk/tool/selenium/simulation/logger/File.js"]);
    simulation.loader.load("simulation.logger.File", __config.simulatorSvn);
    var logPrefix = "qxSimulator_" + this.startDate.getTime();
    this.__logger = new simulation.logger.File(__config.logFile, logPrefix);
  } 
  else if (__config.logger == "console") {
    //load([__config.simulatorSvn + "/trunk/tool/selenium/simulation/logger/Console.js"]);
    simulation.loader.load("simulation.logger.Console", __config.simulatorSvn);
    this.__logger = new simulation.logger.Console();
  }

};

/**
 * Increments the number of total errors logged by one
 * 
 * @return {void}
 */
simulation.Simulation2.prototype.incrementTotalErrorsLogged = function()
{
  var oldCount = this.getTotalErrorsLogged();
  var newCount = oldCount + 1;
  this.setTotalErrorsLogged(newCount);  
};

/**
 * Increments the number of total warnings logged by one
 * 
 * @return {void}
 */
simulation.Simulation2.prototype.incrementTotalWarningsLogged = function()
{
  var oldCount = this.getTotalWarningsLogged();
  var newCount = oldCount + 1;
  this.setTotalWarningsLogged(newCount);  
};

/**
 * Start the Selenium session and set some basic options.
 * 
 * @return {Boolean} true if the Selenium session started without errors
 */
simulation.Simulation2.prototype.startSession = function()
{
  if (this.getConfigSetting("debug")) {
    this.debug("Starting " + this.getConfigSetting("autName") + " session with browser " + this.getConfigSetting("testBrowser"));
  }
  
  // Create QxSelenium instance.
  try {
    this.__sel = new QxSelenium(this.getConfigSetting("selServer"),this.getConfigSetting("selPort"),
                                this.getConfigSetting("testBrowser"),this.getConfigSetting("autHost"));
  }
  catch(ex) {
    throw new Error("Unable to create QxSelenium instance: " + ex);
  }

  try {
    this.__sel.start();
    this.__sel.setTimeout(this.getConfigSetting("globalTimeout"));    
    this.__sel.open(this.getConfigSetting("autHost") + "" + this.getConfigSetting("autPath"));
    this.__sel.setSpeed(this.getConfigSetting("stepSpeed"));
    this.setupEnvironment();
    this.logEnvironment();
    this.logUserAgent();
  }
  catch (ex) {
    this.logEnvironment();
    var msg = "ERROR: Unable to start test session: " + ex;
    this.error(msg);
    return false;
  }
  return true;
};

/**
 * Add some testing utilities to the qooxdoo application. Must be called
 * after the application is (re)loaded.
 */
simulation.Simulation2.prototype.setupEnvironment = function()
{
  try {
    /* 
     * Store the AUT window object to avoid calling 
     * selenium.browserbot.getCurrentWindow() repeatedly.
     */
    this.__sel.getEval('selenium.qxStoredVars = {}');    
    this.storeEval('selenium.browserbot.getCurrentWindow()', 'autWindow');

    this.prepareNameSpace();
    this.addSanitizer();
    if (this.getConfigSetting("applicationLog")) {
      this.addRingBuffer();
      this.addRingBufferGetter();
    }
  }
  catch(ex) {
    this.error("Error while setting up test environment: " + ex);
  }
};

/**
 * Open a URI containing a qooxdoo application and prepare it for testing. If no
 * URI is given, the current AUT is reloaded.
 * 
 * @param {String} uri Optional URI of the qooxdoo application to be loaded.
 */
simulation.Simulation2.prototype.qxOpen = function(uri)
{
  var openUri = uri || this.getConfigSetting("autHost") + "" + this.getConfigSetting("autPath");
  this.__sel.open(openUri);
  this.setupEnvironment();
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
simulation.Simulation2.prototype.prepareNameSpace = function(win)
{
  var targetWin = win || 'selenium.qxStoredVars["autWindow"]';
  var ns = String(this.getEval(targetWin + '.qx.Simulation', 'Checking for qx.Simulation namespace'));
  if (ns == "null" || ns == "undefined") {
    this.getEval(targetWin + '.qx.Simulation = {};', 'Creating qx.Simulation namespace');
  }
};

/**
 * Wrapper around Selenium's <code>getEval</code> that catches and logs any exceptions so 
 * they won't cause the entire test to fail.
 * 
 * @param code {String} JavaScript code to be evaluated
 * @param description {String} optional description that will be logged if there
 *   was an exception during evaluation 
 * @throw an exception if no code was specified
 * @return the results of the evaluation
 */
simulation.Simulation2.prototype.getEval = function(code, description)
{
  if (!code) {
    throw new Error("No code specified for getEval()");
  }
  
  if (this.getConfigSetting("debug") && description) {
    this.debug(description);
  }

  var desc = description ? description : "Evaluating script";

  var ret = false;
  try {
    ret = this.__sel.getEval(code);
  }
  catch(ex) {
    this.error("ERROR: " + desc + ": " + ex);
  }

  return ret;
};

/**
 * Wrapper around Selenium's <code>runScript</code> that catches and logs any exceptions so 
 * they won't cause the entire test to fail.
 * 
 * @param code {String} JavaScript code to be evaluated
 * @param description {String} optional description that will be logged if there
 *   was an exception during evaluation
 * @throw an exception if no code was specified
 * @return {void}
 */
simulation.Simulation2.prototype.runScript = function(code, description)
{
  if (!code) {
    throw new Error("No code specified for runScript()");
  }

  var desc = description ? description : "Running script";

  if (this.getConfigSetting("debug")) {
    this.debug(desc);
  }

  try {
    this.__sel.runScript(code);
  }
  catch(ex) {
    this.error("ERROR: " + desc + ": " + ex);
  }

  return;
};

/**
 * Wrapper around QxSelenium's qxClick method that catches and logs any 
 * exceptions so they won't cause the Simulation to fail.
 * 
 * @param locator {String} Selenium locator identifying the element that should 
 *   receive the click event
 * @param description {String} optional description that will be logged if there
 *   was an exception during evaluation
 * @throw an exception if no locator was specified
 * @return {void}
 */
simulation.Simulation2.prototype.qxClick = function(locator, options, description)
{
  if (!locator) {
    throw new Error("No locator specified for qxClick()");
  }

  var desc = description ? description : "Executing qxClick";

  if (this.getConfigSetting("debug")) {
    this.debug(desc);
  }

  try {
    this.__sel.qxClick(locator, options);
  }
  catch(ex) {
    this.debug("ERROR: " + desc + ": " + ex);
  }

  return;
};

/**
 * Wrapper around QxSelenium's qxType() that catches and logs any exceptions so 
 * they won't cause the entire test to fail.
 * 
 * @param locator {String} Selenium locator identifying the element that should
 *   receive the keydown/keyup/keypress events 
 * @param text {String} the text to be typed
 * @param keys {Boolean} use Selenium's "typeKeys" instead of "type" if true
 * @throw an exception if no locator or text were specified
 * @return {void}
 */
simulation.Simulation2.prototype.qxType = function(locator, text, keys)
{
  if (!locator) {
    throw new Error("No locator specified for type()");
  }
  
  if (typeof(text) != "string") {
    throw new Error("No text specified for type()");
  }

  if (this.getConfigSetting("debug")) {
    this.debug("Typing: " + text);
  }
  
  var qxSelCmd = keys ? "qxTypeKeys" : "qxType"; 

  try {
    this.__sel[qxSelCmd](locator, text);
  }
  catch(ex) {
    this.error("Unable to enter text: " + ex + " \nText:\n  " + text);
  }
};

/**
 * Wrapper around QxSelenium's qxTypeKeys() that catches and logs any exceptions 
 * so they won't cause the entire test to fail.
 * 
 * @param locator {String} Selenium locator identifying the element that should
 *   receive the keydown/keyup/keypress events 
 * @param text {String} the text to be typed
 * @throw an exception if no locator or text were specified
 * @return {void}
 */
simulation.Simulation2.prototype.qxTypeKeys = function(locator, text)
{
  this.qxType(locator, text, true);
};

/**
 * Wrapper around QxSelenium's qxTableClick() that catches and logs any 
 * exceptions so they won't cause the entire test to fail.
 * 
 * @param locator {String} Selenium locator identifying a qooxdoo table object
 * @param options {String} Options for the command, e.g 
 *  "row=4,column=3,button=right"
 * @throw an exception if no locator was specified
 * @return {void}
 */
simulation.Simulation2.prototype.qxTableClick = function(locator, options)
{
  if (!locator) {
    throw new Error("No locator specified for qxTableClick()");
  }
  
  try {
    this.__sel.qxTableClick(locator, options);
  }
  catch(ex) {
    this.error("ERROR: qxTableClick " + ex);
  }
};

/**
 * Wrapper around QxSelenium's qxDragAndDropToObject() that catches and logs any 
 * exceptions so they won't cause the entire test to fail.
 * 
 * @param dragLocator {String} Selenium locator identifying the drag target
 * @param dropLocator {String} Selenium locator identifying the drop target
 * @throw an exception if no locators were specified
 * @return {void}
 */
simulation.Simulation2.prototype.qxDragAndDropToObject = function(dragLocator, dropLocator)
{
  if (!dragLocator) {
    throw new Error("No drag target locator specified for qxDragAndDropToObject()");
  }
  if (!dropLocator) {
    throw new Error("No drop target locator specified for qxDragAndDropToObject()");
  }
  
  try {
    this.__sel.qxDragAndDropToObject(dragLocator, dropLocator);
  }
  catch(ex) {
    this.error("ERROR: qxDragAndDropToObject " + ex);
  }  
};

/**
 * Formats a message according to the error level, then writes it to the local 
 * log file.
 * 
 * @param text {String} the message to be logged
 * @param level {String?"debug"} The message's error level. One of "debug", 
 *   "info", "warn", "error".
 * @return {void}
 */
simulation.Simulation2.prototype.log = function(text, level)
{
  var msg = text ? text : "";
  var lvl = level ? level : "debug";

  if (lvl == "error") {
    this.incrementTotalErrorsLogged();
  }
  
  if (lvl == "warn") {
    this.incrementTotalWarningsLogged();
  }
  
  msg = this.sanitize(msg);
  
  // Format non-HTML messages
  if (this.getConfigSetting("logger") == "file" && msg.substr(0,1) !== "<") {
    msg = '<div class="qxappender"><div class="level-' + lvl + '"><p>' + msg + "</p></div></div>";
  }
  
  this.__logger.log(msg, level);
};

/**
 * Logs a debug message
 * 
 * @param logMessage {String} The message to be logged.
 */
simulation.Simulation2.prototype.debug = function(logMessage)
{
  this.log(logMessage, "debug");
};


/**
 * Logs an info message
 * 
 * @param logMessage {String} The message to be logged.
 */
simulation.Simulation2.prototype.info = function(logMessage)
{
  this.log(logMessage, "info");
};

/**
 * Logs a warning message
 * 
 * @param logMessage {String} The message to be logged.
 */
simulation.Simulation2.prototype.warn = function(logMessage)
{
  this.log(logMessage, "warn");
};

/**
 * Logs an error message
 * 
 * @param logMessage {String} The message to be logged.
 */
simulation.Simulation2.prototype.error = function(logMessage)
{
  this.log(logMessage, "error");
};



/**
 * Removes special and formatting characters from strings so they can be logged.
 * 
 * @param text {String} The string to be sanitized
 * @return {String} The sanitized string
 */
simulation.Simulation2.prototype.sanitize = function(text)
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
 * Logs information about the test environment.
 * 
 * @return {void}
 */
simulation.Simulation2.prototype.logEnvironment = function()
{
  this.log("<h1>" + this.getConfigSetting("autName") + " results from " + this.startDateString + "</h1>", "none");
  this.log("<p>Application under test: <a href=\"" + this.getConfigSetting("autHost") + unescape(this.getConfigSetting("autPath")) + "\">" + this.getConfigSetting("autHost") + unescape(this.getConfigSetting("autPath")) + "</a></p>", "none");
  this.log("Platform: " + environment["os.name"], "none");
};

/**
 * Logs the test browser's user agent string.
 * 
 * @return {void}
 */
simulation.Simulation2.prototype.logUserAgent = function(){
  var agent = this.getEval('navigator.userAgent', "Getting user agent from browser");
  this.log("User agent: " + agent, "none");
};

/**
 * Wrapper around Selenium's waitForCondition() function. Logs any exceptions
 * (e.g. because the timeout was reached) along with an optional description.
 * 
 * @param condition {String} a JavaScript expression that will be evaluated
 * @param timeout {Integer} timeout in milliseconds
 * @param description {String} optional description that will be logged if there
 *   was an exception during evaluation
 * @param loglevel {String} The level of the message to log if the command timed
 * out. One of "debug", "info", "warn", "error". Default is "error".
 * @throw an exception if no condition or timeout were specified
 * @return {Boolean} true if the condition was met before the timeout
 */
simulation.Simulation2.prototype.waitForCondition = function(condition, timeout, 
                                                            description, loglevel)
{
  if (!condition) {
    throw new Error("No condition to wait for specified.");
  }
  
  if (!timeout) {
    throw new Error("No timeout specified for waitForCondition()");
  }

  var desc = description ? description : "Waiting for condition";   

  if (this.getConfigSetting("debug")) {
    this.debug(desc);
  }
  
  var level = loglevel || "error";

  try {
    this.__sel.waitForCondition(condition, timeout.toString());
    return true;
  }
  catch(ex) {
    if (this.getConfigSetting("debug")) {
      this.error(ex);
    }
    this.log(desc, level);
    return false;
  }
};

/**
 * Logs the amount of time passed since the given start date.
 * 
 * @param sDate {Date} the start date
 * @param desc {String} optional description
 * 
 * @return {void}
 */
simulation.Simulation2.prototype.logTestDuration = function(sDate, desc)
{
  var startDate = sDate ? sDate : this.startDate;
  var description = desc ? desc : "Test run";
  
  var stopDate = new Date();
  var elapsed = stopDate.getTime() - startDate.getTime();
  elapsed = (elapsed / 1000);
  var min = Math.floor(elapsed / 60);
  var sec = Math.round(elapsed % 60);
  if (sec < 10) {
    sec = "0" + sec;
  }

  this.info(description + " finished in: " + min + " minutes " + sec + " seconds.", "info");
};

/**
 * Evaluates a JavaScript snippet and stores the result in the global selenium
 * object's qxStoredVars property. Stored variables can be retrieved through
 * getEval: <code>getEval('selenium.qxStoredVars["varName"]')</code> 
 *
 * @param code {String} JavaScript snippet to be evaluated
 * @param varName {String} The name for the property the eval result will be 
 * stored in
 * @return {void}
 */
simulation.Simulation2.prototype.storeEval = function(code, varName)
{
  if (!code) {
    throw new Error("No code specified for storeEval()");
  }

  this.__sel.getEval('selenium.qxStoredVars["' + varName + '"] = ' + code);
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
simulation.Simulation2.prototype.addOwnFunction = function(funcName, func)
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
  //func = func.replace(/'/, '\'');
  
  this.getEval('selenium.browserbot.getCurrentWindow().qx.Simulation.' + funcName + ' = ' + func, 'Adding function ' + funcName);
};

/**
 * Dismisses any alert or dialog boxes currently open in the application under 
 * test.
 * 
 * @return {Map|false} a map containing the text content of any closed boxes in the 
 *   'alert' and 'confirmation' keys or false if no boxes were dismissed
 */
simulation.Simulation2.prototype.killBoxes = function()
{
  var retVal = {
    'alert' : false,
    'confirmation' : false
  };

  try {
    if (this.__sel.isAlertPresent()) {
      var al = this.__sel.getAlert();
      retVal.alert = String(al);
      this.info("Dismissed alert box: " + al);
    }
  }
  catch(ex) {
    this.error("ERROR while checking for alert box: " + ex);
  }

  // Ditto for confirmation dialogs.
  try {
    if (this.__sel.isConfirmationPresent()) {
      this.__sel.chooseCancelOnNextConfirmation();
      var con = this.__sel.getConfirmation();
      retVal.confirmation = String(con);
      this.info("Dismissed confirmation dialog " + con);
    }
  }
  catch(ex) {
    this.error("ERROR while checking for dialog box: " + ex);
  }

  if (retVal.alert || retVal.confirmation) {
    return retVal;  
  }

  else {
    return false;
  }

};

/**
 * Adds a function <code>qx.Simulation.getObjectByClassname</code> to the AUT's 
 * window. This function takes two arguments: A parent object and a qooxdoo 
 * class name string.
 * It will search all properties of the parent object until it finds one with
 * a classname property matching the class name string; this object is then
 * returned.
 * 
 * The function should be executed through getEval like this:
 * <code>this.getEval('selenium.browserbot.getCurrentWindow().qx.Simulation.getObjectByClassname(selenium.browserbot.getCurrentWindow().qx.core.Init.getApplication(), "qx.ui.tree.Tree")';</code>
 * 
 * TODO: Return an array of *all* objects that are instances of the wanted class
 * 
 * @return {void}
 */
simulation.Simulation2.prototype.addObjectGetter = function()
{
  var getObjectByClassname = function(parent, searchterm)
  {
    var obj = null;
    for (var prop in parent) {
      var property = parent[prop];
      try {
        if (typeof property == "object") {
          if (property.classname == searchterm) {
            obj = property;
          }  
        }
      }
      catch(ex) {}
    }
    return obj;
  };
  
  this.addOwnFunction("getObjectByClassname", getObjectByClassname);
  
};

/**
 * Adds a function <code>qx.Simulation.getChildrenByClassname</code> to the AUT's 
 * window. This function takes two arguments: A parent object and a qooxdoo 
 * class name string.
 * It will return an array containing any children of the parent object with a 
 * classname property matching the class name string.
 * 
 * The function should be executed through getEval like this:
 * <code>this.getEval('selenium.browserbot.getCurrentWindow().qx.Simulation.getChildrenByClassname(selenium.browserbot.getCurrentWindow().qx.core.Init.getApplication(), "qx.ui.tree.Tree")';</code>
 * 
 * @return {void}
 */
simulation.Simulation2.prototype.addChildrenGetter = function()
{
  var getChildrenByClassname = function(parent, searchterm)
  {
    var foundKids = [];
    var kids = parent.getChildren();
    for (var i=0,l=kids.length;i<l; i++) {    
      if (kids[i].classname == searchterm) {
        foundKids.push(kids[i]);
      }
    }
    return foundKids;
  };
  
  this.addOwnFunction("getChildrenByClassname", getChildrenByClassname);
  
};

/**
 * Adds a function <code>qx.Simulation.sanitize</code> to the AUT's 
 * window, which will strip most special characters from a given string. 
 * It's more reliable to do this in this in the browser since some
 * characters will be fubared on the way from the browser to the test
 * script.
 * 
 * The function should be executed through getEval like this:
 * <code>this.getEval('selenium.browserbot.getCurrentWindow().qx.Simulation.sanitize(string)';</code>
 * 
 * @return {void}
 */
simulation.Simulation2.prototype.addSanitizer = function()
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
 * Call Selenium's stop method, which *should* also close the browser. This 
 * won't work in older versions of Firefox (<=2.0.0).
 * 
 * @return {void}
 */
simulation.Simulation2.prototype.stop = function()
{  
  this.__sel.stop();
  if (this.getConfigSetting("debug")) {
    this.debug("Simulation finished.");
  }
};

/**
 * Default simulation result logging: Logs any disposer debug messages, the 
 * total number of issues (= warnings + errors) that occurred during the 
 * simulation and the elapsed time. 
 * 
 * @return {void}
 */
simulation.Simulation2.prototype.logResults = function()
{
  if (this.getConfigSetting("disposerDebug")) {
    var getDisposerDebugLevel = "selenium.qxStoredVars['autWindow'].qx.core.Setting.get('qx.disposerDebugLevel')";
    var disposerDebugLevel = this.getEval(getDisposerDebugLevel, "Getting qx.disposerDebugLevel");
    
    if (parseInt(disposerDebugLevel, 10) > 0 ) {
      //this.logDisposerDebug();
      this.qxShutdown();
    }
  }
  
  if (this.getConfigSetting("applicationLog")) {
    this.logRingBufferEntries();
  }
  
  if (!this.testFailed) {
    if (this.getConfigSetting("debug")) {
      this.debug("Test run finished successfully.");
    }
    
    var totalIssues = this.getTotalErrorsLogged() + this.getTotalWarningsLogged();
    this.info(this.getConfigSetting("autName") + " ended with warnings or errors: " + totalIssues);
  }
  
  this.logTestDuration();
};

/**
 * Creates a new qx.log.appender.RingBuffer in the AUT and registers it. 
 * 
 * @return {void}
 */
simulation.Simulation2.prototype.addRingBuffer = function()
{
  var rb = "new selenium.qxStoredVars['autWindow'].qx.log.appender.RingBuffer()";
  this.storeEval(rb, "ringBuffer");  
  this.getEval("selenium.qxStoredVars['autWindow'].qx.log.Logger.register(selenium.qxStoredVars['ringBuffer'])", "Registering log appender");
};

/**
 * Adds a function to the AUT that retrieves all messages from the logger 
 * created by addRingBuffer.
 * 
 * @return {void}
 */
simulation.Simulation2.prototype.addRingBufferGetter = function()
{
  var getRingBufferEntries = function() {
    var entries = selenium.qxStoredVars["ringBuffer"].getAllLogEvents();
    var entryArray = [];
    for (var i=0,l=entries.length; i<l; i++) {
      try {
      var entry = selenium.qxStoredVars['autWindow'].qx.log.appender.Util.toText(entries[i]);
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
 * Retrieves all messages from the logger created by addRingBuffer and writes 
 * them to the simulation log.
 * 
 * @return {void}
 */
simulation.Simulation2.prototype.logRingBufferEntries = function()
{
  var debugLog = this.getEval("selenium.qxStoredVars['autWindow'].qx.Simulation.getRingBufferEntries()", "Retrieving log messages");
  debugLog = String(debugLog);
  var debugLogArray = debugLog.split("|");
  
  for (var i=0,l=debugLogArray.length; i<l; i++) {
    this.info(debugLogArray[i]);
  }
};

/**
 * "Manually" shuts down the qooxdoo application. Can be used for disposer debug
 * logging.
 * 
 * @return {void}
 */
simulation.Simulation2.prototype.qxShutdown = function()
{
  this.getEval('selenium.qxStoredVars["autWindow"].qx.core.ObjectRegistry.shutdown()', "Shutting down qooxdoo application");
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
simulation.Simulation2.prototype.addGlobalErrorHandler = function(win)
{
  var qxWin = win || "selenium.qxStoredVars['autWindow']";
  this.prepareNameSpace(qxWin);
  this.getEval(qxWin + ".qx.Simulation.errorStore = [];", "Adding errorStore");
  
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
      //sanitizedEx = sanitizedEx.replace(/\n/g,"<br/>");
      //sanitizedEx = sanitizedEx.replace(/\r/g,"<br/>");      
      targetWin.qx.Simulation.errorStore.push(sanitizedEx);
    });
  };
  
  this.addOwnFunction("addGlobalErrorHandler", addHandler);
  this.getEval("selenium.qxStoredVars['autWindow'].qx.Simulation.addGlobalErrorHandler(" + qxWin + ");", "Adding error handler");
  
  var globalErr = function(win)
  {
     var targetWin = win || selenium.qxStoredVars['autWindow'];
     var exceptions = targetWin.qx.Simulation.errorStore;
     var exString = exceptions.join("|");
     return exString;     
  };
  this.addOwnFunction("getGlobalErrors", globalErr);
  
};

/**
 * Logs the contents of the given window's global exception store.
 *
 * @param win {String} The target window. Must evaluate to a JavaScript Window 
 * object. Default: The AUT's window.
 * @return {Integer} The number of global errors.
 */
simulation.Simulation2.prototype.logGlobalErrors = function(win)
{
  var targetWin = win || "";
  var exceptions = this.getEval("selenium.qxStoredVars['autWindow'].qx.Simulation.getGlobalErrors(" + targetWin + ")", "Retrieving global error store");
  var ex = String(exceptions);
  if (ex.length > 0) {
    var exArr = ex.split("|");
    for (var i = 0; i < exArr.length; i++) {
      this.error("Global Error Handler caught exception: " + exArr[i]);
    }
  }
  return ex.length;
};

/**
 * Empties the given window's global exception store.
 *
 * @param win {String} The target window. Must evaluate to a JavaScript Window 
 * object. Default: The AUT's window.
 * @return {void}
 */
simulation.Simulation2.prototype.clearGlobalErrorStore = function(win)
{
  var targetWin = win || "selenium.qxStoredVars['autWindow']";
  this.getEval(targetWin + ".qx.Simulation.errorStore = [];", "Clearing errorStore");
};