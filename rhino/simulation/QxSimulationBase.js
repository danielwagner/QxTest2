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

simulation.QxSimulationBase = function()
{
  this.startDate = new Date();  
  
  /*
   * Frequently used Javascript code snippets meant to be run in the tested 
   * application's context through the getEval() method. 
   */
  simulation.QxSimulationBase.SELENIUMWINDOW = 'selenium.qxStoredVars["autWindow"]';
  simulation.QxSimulationBase.QXAPPINSTANCE = 'qx.core.Init.getApplication()';
  simulation.QxSimulationBase.ISQXAPPREADY = 'var qxReady = false; try { if (' 
    + simulation.QxSimulationBase.SELENIUMWINDOW + '.'  
    + simulation.QxSimulationBase.QXAPPINSTANCE 
    + ') { qxReady = true; } } catch(e) {} qxReady;';
  
};


/**
 * Start the Selenium session, load the AUT and set some basic options.
 */
simulation.QxSimulationBase.prototype.startSession = function()
{
  simulation.qxSelenium.start();
  simulation.qxSelenium.setTimeout(simulation.config.getSetting("globalTimeout", 120000));
  simulation.qxSelenium.open(simulation.config.getSetting("autHost") + "" + simulation.config.getSetting("autPath"));
  simulation.qxSelenium.setSpeed(simulation.config.getSetting("stepSpeed", "250"));
  this.setupEnvironment();
};

/**
 * Add some testing utilities to the qooxdoo application. Must be called
 * whenever a qooxdoo application is loaded.
 */
simulation.QxSimulationBase.prototype.setupEnvironment = function()
{
  /* 
   * Store the AUT window object to avoid calling 
   * selenium.browserbot.getCurrentWindow() repeatedly.
   */
  simulation.qxSelenium.getEval('selenium.qxStoredVars = {}');    
  this.storeEval('selenium.browserbot.getCurrentWindow()', 'autWindow');
  
  this.prepareNameSpace();
};

/**
 * Attaches a "Simulation" namespace object to the specified window's qx object.
 * This will be used to store custom methods added by addOwnFunction. If no 
 * window is specified, the AUT's window is used.
 * 
 * @param win {String} The name of the target window. Must evaluate to a 
 * JavaScript Window object.
 */
simulation.QxSimulationBase.prototype.prepareNameSpace = function(win)
{
  var targetWin = win || 'selenium.qxStoredVars["autWindow"]';
  var ns = String(simulation.qxSelenium.getEval(targetWin + '.qx.Simulation'));
  if (ns == "null" || ns == "undefined") {
    simulation.qxSelenium.getEval(targetWin + '.qx.Simulation = {};');
  }
};

/**
 * Evaluates a JavaScript snippet and stores the result in the "qxStoredVars" 
 * map attached to the global selenium object.
 * Stored values can be retrieved through getEval:
 * <code>getEval('selenium.qxStoredVars["keyName"]')</code> 
 *
 * @param code {String} JavaScript snippet to be evaluated
 * @param varName {String} The name for the property the eval result will be 
 * stored in.
 */
simulation.QxSimulationBase.prototype.storeEval = function(code, keyName)
{
  if (!code) {
    throw new Error("No code specified for storeEval()");
  }
  
  if (!keyName) {
    throw new Error("No key name specified for storeEval()");
  }

  simulation.qxSelenium.getEval('selenium.qxStoredVars["' + keyName + '"] = ' + String(code));
};

/**
 * Adds a function to the "qx.Simulation" namespace of the application under 
 * test. This function can then be called using 
 * <code>selenium.getEval("selenium.browserbot.getCurrentWindow().qx.Simulation.funcName();")</code>
 * 
 * @param funcName {String} name of the function to be added
 * @param func {Function} the function to be added
 */
simulation.QxSimulationBase.prototype.addOwnFunction = function(funcName, func)
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
  
  simulation.qxSelenium.getEval('selenium.browserbot.getCurrentWindow().qx.Simulation.' + funcName + ' = ' + func);
};

/**
 * Creates a new qx.log.appender.RingBuffer in the AUT and registers it. This
 * can be used to access the AUT's log messages from the test script.
 * 
 * @param win {String} The target window. Must evaluate to a JavaScript Window 
 * object. Default: The AUT's window.
 */
simulation.QxSimulationBase.prototype._addRingBuffer = function(win)
{
  var qxWin = win || "selenium.qxStoredVars['autWindow']";
  var rb = "new " + qxWin + ".qx.log.appender.RingBuffer()";
  this.storeEval(rb, "ringBuffer");  
  var ret = simulation.qxSelenium.getEval(qxWin + ".qx.log.Logger.register(selenium.qxStoredVars['ringBuffer'])");
};

/**
 * Adds a function to the AUT that retrieves all messages from the logger 
 * created by addRingBuffer.
 */
simulation.QxSimulationBase.prototype._addRingBufferGetter = function()
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
 *
 * @param win {String} The target window. Must evaluate to a JavaScript Window 
 * object. Default: The AUT's window.
 */
simulation.QxSimulationBase.prototype._addGlobalErrorHandler = function(win)
{
  var qxWin = win || "selenium.qxStoredVars['autWindow']";
  simulation.qxSelenium.getEval(qxWin + ".qx.Simulation.errorStore = [];");
  
  var addHandler = function(autWin)
  {
    var targetWin = autWin || selenium.qxStoredVars['autWindow'];
    targetWin.qx.event.GlobalError.setErrorHandler(function(ex) {
      var exString = "";
      if (ex instanceof targetWin.qx.core.GlobalError) {
        ex = ex.getSourceException();
      }
      if (ex instanceof targetWin.qx.core.WindowError) {
        exString = ex.toString() + " in " + ex.getUri() + " line " + ex.getLineNumber();
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
        if (ex.stack) {
          exString += " Stack: " + ex.stack;
        }
      }
      
      targetWin.qx.Simulation.errorStore.push(exString);
    });
  };
  
  this.addOwnFunction("addGlobalErrorHandler", addHandler);
  simulation.qxSelenium.getEval("selenium.qxStoredVars['autWindow'].qx.Simulation.addGlobalErrorHandler(" + qxWin + ");");  
};

/**
 * Adds a utility function to the AUT window that reads the contents of the
 * global error store and returns them as a pipe-separated string so they can be
 * read by the test script.
 * 
 * @param win {String} The target window. Must evaluate to a JavaScript Window 
 * object. Default: The AUT's window. 
 */
simulation.QxSimulationBase.prototype._addGlobalErrorGetter = function(win)
{
  var qxWin = win || "selenium.qxStoredVars['autWindow']";
  var getGlobalErrors = function(win)
  {
     var targetWin = win || selenium.qxStoredVars['autWindow'];
     var exceptions = targetWin.qx.Simulation.errorStore;
     var exString = exceptions.join("|");
     return exString;     
  };
  this.addOwnFunction("getGlobalErrors", getGlobalErrors);
};

/**
 * Returns the error messages of any exceptions caught by the AUT's global error
 * handler.
 * 
 * @param win {String} The target window. Must evaluate to a JavaScript Window 
 * object. Default: The AUT's window. 
 * @return {Array} A list of error messages
 */
simulation.QxSimulationBase.prototype.getGlobalErrors = function(win)
{
  var qxWin = win || "selenium.qxStoredVars['autWindow']";
  var exceptions = simulation.qxSelenium.getEval("selenium.qxStoredVars['autWindow'].qx.Simulation.getGlobalErrors(" + qxWin + ")");
  exceptions = String(exceptions);
  if (!exceptions.length > 0) {
    return [];
  }
  var globalErrors = String(exceptions).split("|");
  return globalErrors;
};

/**
 * Empties the given window's global exception store.
 *
 * @param win {String} The target window. Must evaluate to a JavaScript Window 
 * object. Default: The AUT's window.
 */
simulation.QxSimulationBase.prototype.clearGlobalErrorStore = function(win)
{
  var targetWin = win || "selenium.qxStoredVars['autWindow']";
  simulation.qxSelenium.getEval(targetWin + ".qx.Simulation.errorStore = [];");
  var ex = simulation.qxSelenium.getEval(targetWin + ".qx.Simulation.errorStore;");
};

/**
 * Adds utility functions to the AUT that allow attaching and removing event
 * listeners to qooxdoo objects identified by their object registry hash. 
 */
simulation.QxSimulationBase.prototype._addListenerSupport = function()
{
  var addListener = function(objectHash, event, callback, context) {
    var context = context || selenium.qxStoredVars["autWindow"].qx.core.Init.getApplication();
    return selenium.qxStoredVars["autWindow"].qx.core.ObjectRegistry.fromHashCode(objectHash).addListener(event, callback, context);
  };
  this.addOwnFunction("addListener", addListener);
  
  var removeListenerById = function(objectHash, listenerId) {
    return selenium.qxStoredVars["autWindow"].qx.core.ObjectRegistry.fromHashCode(objectHash).removeListenerById(listenerId);
  };
  this.addOwnFunction("removeListenerById", removeListenerById);
};

/**
 * Adds an event listener to a qooxdoo widget in the AUT.
 * 
 * @param {String} locator A (Qx)Selenium locator string that finds a qooxdoo widget
 * @param {String} event Name of the event to listen for
 * @param {Function} callback Javascript code to be executed if the event is fired
 * @return {String} the listener's ID
 */
simulation.QxSimulationBase.prototype.addListener = function(locator, event, callback)
{
  var objectHash = simulation.qxSelenium.getQxObjectHash(locator);
  var callbackName = event + "_bla"; 
  this.addOwnFunction(callbackName, callback);
  var callbackInContext = 'selenium.qxStoredVars["autWindow"].qx.Simulation["' + callbackName + '"]';  
  var cmd = 'selenium.qxStoredVars["autWindow"].qx.Simulation.addListener("' + objectHash + '", "' + event + '", ' + callbackInContext + ')';
  return simulation.qxSelenium.getEval(cmd);
};

/**
 * Removes an event listener from a qooxdoo widget in the AUT.
 * 
 * @param {String} locator A (Qx)Selenium locator string that finds a qooxdoo widget
 * @param {String} listenerId The listener's ID as returned by addListener
 * @return {String} "true" or "false" depending on whether the listener was
 * removed successfully
 */
simulation.QxSimulationBase.prototype.removeListenerById = function(locator, listenerId)
{
  listenerId = String(listenerId).replace(/"/, '\\"');
  var objectHash = simulation.qxSelenium.getQxObjectHash(locator);
  var cmd = 'selenium.qxStoredVars["autWindow"].qx.Simulation.removeListenerById("' + objectHash + '", "' + listenerId + '")';
  return simulation.qxSelenium.getEval(cmd);
};

/**
 * Attaches a listener to a qooxdoo object that clones the incoming event and
 * adds it to the event store.
 * 
 * @param {String} locator A (Qx)Selenium locator string that finds a qooxdoo widget
 * @param {String} event The name of the event to listen for
 * @return {String} The listener's ID as returned by addListener
 */
simulation.QxSimulationBase.prototype.storeEvent = function(locator, event)
{
  var callback = function(ev)
  {
    selenium.qxStoredVars["eventStore"].push(ev.clone());
  };
  return this.addListener(locator, event, callback);
};

/**
 * Executes a JavaScript snippet on a stored event and returns the result.
 * 
 * @param {Integer} index Index of the event in the store
 * @param {String} detailString Code snippet to execute, e.g. "getTarget().classname" 
 * @return {String} The result of the executed code
 */
simulation.QxSimulationBase.prototype.getStoredEventDetail = function(index, detailString)
{
  var cmd = 'selenium.qxStoredVars["eventStore"][' + index + ']';
  if (detailString[0] != "[" && detailString[0] != ".") {
    cmd += ".";
  }
  cmd += detailString;
  return simulation.qxSelenium.getEval(cmd);
};

/**
 * Empties the event store.
 */
simulation.QxSimulationBase.prototype.clearEventStore = function()
{
  simulation.qxSelenium.getEval('selenium.qxStoredVars["eventStore"] = []');
};

/**
 * Returns the number of entries in the event store.
 * 
 * @return {Integer} The event count
 */
simulation.QxSimulationBase.prototype.getStoredEventCount = function()
{
  var storedEvents = simulation.qxSelenium.getEval('selenium.qxStoredVars["eventStore"].length');
  return parseInt(storedEvents, 10);
};
