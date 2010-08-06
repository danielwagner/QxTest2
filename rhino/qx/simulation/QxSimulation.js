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

qx.Loader.require(["qx.simulation.QxSimulationBase"]);

qx.Class.define("qx.simulation.QxSimulation", {

  extend : qx.simulation.QxSimulationBase,

  construct : function()
  {
    this.testFailed = false;
    this.errorCount = 0;
    this.warningCount = 0;
  },
  
  statics :
  {
    AUTWINDOW : 'selenium.qxStoredVars["autWindow"]',
    QXAPPLICATION : 'qx.core.Init.getApplication()'
  },

  members :
  {

    /**
     * Starts the QxSelenium session. Also makes the necessary preparations to 
     * enable global error logging and/or application log extraction if these
     * options are configured.
     */
    startSession : function()
    {
      this.startSeleniumSession();
      var qxAppReady = 'var qxReady = false; try { if (' + 
                  qx.simulation.QxSimulation.AUTWINDOW + '.' + 
                  qx.simulation.QxSimulation.QXAPPLICATION + 
                  ') { qxReady = true; } } catch(e) {} qxReady;';
      
      this.runCommand("waitForCondition", 
                      [qxAppReady, 30000], 
                      "Waiting for qooxdoo application");
      
      if (qx.simulation.config.getSetting("globalErrorLogging", false) || qx.simulation.config.getSetting("testEvents", false)) {
        this._addGlobalErrorHandler();
        this._addGlobalErrorGetter();        
      }
      
      if (qx.simulation.config.getSetting("applicationLog", false) || qx.simulation.config.getSetting("disposerDebug", false)) {
        this._addRingBuffer();
        this._addRingBufferGetter();
      }
      
      if (qx.simulation.config.getSetting("testEvents", false)) {
        this._addListenerSupport();
        qx.simulation.qxSelenium.getEval('selenium.qxStoredVars["eventStore"] = [];');
      }

    },    
    
    /**
     * Logs information about the test environment.
     */
    logEnvironment : function()
    {
      this.info(qx.simulation.config.getSetting("autName", "Unnamed Application") + " results from " + this.startDate.toUTCString());
      this.info("Application under test: " + qx.simulation.config.getSetting("autHost") + unescape(qx.simulation.config.getSetting("autPath")));
      this.info("Platform: " + environment["os.name"]);
    },
    
    /**
     * Logs the test browser's user agent string.
     */
    logUserAgent : function(){
      var agent = qx.simulation.qxSelenium.getEval('navigator.userAgent');
      this.info("User agent: " + agent);
    },

    /**
     * Logs the amount of time passed since the given start date.
     * 
     * @param sDate {Date} the start date
     * @param desc {String} optional description
     */
    logDuration : function(sDate, desc)
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
    },

    /**
     * Default simulation result logging.
     */
    logResults : function()
    {
      if (qx.simulation.config.getSetting("disposerDebug", false)) {
        var getDisposerDebugLevel = qx.simulation.QxSimulation.AUTWINDOW + ".qx.core.Setting.get('qx.disposerDebugLevel')";
        var disposerDebugLevel = qx.simulation.qxSelenium.getEval(getDisposerDebugLevel);
        
        if (parseInt(disposerDebugLevel, 10) > 0 ) {
          this.qxShutdown();
        } 
        else { 
          this.warn("Dispose logging is active but the application's disposer debug level is 0!"); 
        }
      }
      
      if (qx.simulation.config.getSetting("globalErrorLogging", false)) {
        this.logGlobalErrors();
      }
      
      if (qx.simulation.config.getSetting("applicationLog", false) || qx.simulation.config.getSetting("disposerDebug", false)) {
        this.logRingBufferEntries();
      }
      
      if (!this.testFailed) {
        if (qx.simulation.config.getSetting("debug", false)) {
          this.debug("Test run finished successfully.");
        }
        
        this.info(qx.simulation.config.getSetting("autName", "Unnamed application") + " results: " + this.errorCount + " errors, " + this.warningCount + " warnings");
      }
      
    },

    /**
     * Retrieves all messages from the logger created by addRingBuffer and writes 
     * them to the simulation log.
     */
    logRingBufferEntries : function()
    {
      var debugLog = qx.simulation.qxSelenium.getEval(qx.simulation.QxSimulation.AUTWINDOW + ".qx.Simulation.getRingBufferEntries()");
      debugLog = String(debugLog);
      var debugLogArray = debugLog.split("|");
      
      for (var i=0,l=debugLogArray.length; i<l; i++) {
        this.info(debugLogArray[i]);
      }
    },

    /**
     * Retrieves all exceptions caught by the global error handling and logs them.
     */
    logGlobalErrors : function()
    {
      var globalErrors = this.getGlobalErrors();
      
      for (var i=0,l=globalErrors.length; i<l; i++) {
        if (globalErrors[i].length > 0) {
          this.error(globalErrors[i]);
        }
      }
    },
    
    /**
     * Pause script execution for a given amount of time.
     * 
     * @param interval {Integer} Time (in milliseconds) to wait.
     */
    wait : function(interval)
    {
      Packages.java.lang.Thread.sleep(interval);
    },
    
    
    /**
     * Shuts down the qooxdoo application. Can be used for disposer debug logging.
     */
    qxShutdown : function()
    {
      simulation.qxSelenium.getEval(qx.simulation.QxSimulation.AUTWINDOW + '.qx.core.ObjectRegistry.shutdown()', "Shutting down qooxdoo application");
    },
    
    /**
     * Open a URI containing a qooxdoo application and prepare it for testing. If no
     * URI is given, the current AUT is reloaded.
     * 
     * @param {String} uri Optional URI of the qooxdoo application to be loaded.
     */
    qxOpen : function(uri)
    {
      var openUri = uri || qx.simulation.config.getSetting("autHost") + "" + qx.simulation.config.getSetting("autPath");
      qx.simulation.qxSelenium.open(openUri);
      this.setupEnvironment();
    },
    
    
    /**
     * Call any QxSelenium method wrapped in a try... catch block so that 
     * exceptions won't cause the test to fail. Exceptions are logged.
     * 
     * @param {String} command The name of a QxSelenium method
     * @param {Array} params Array containing parameters for the QxSelenium method
     * @param {String} description Optional description to be used for logging
     */
    runCommand : function(command, params, description)
    {
      var result = null;    
      var desc = description || "Running QxSelenium command " + command;
      try {
        result = qx.simulation.qxSelenium[command].apply(qx.simulation.qxSelenium, params);
      }
      catch(ex) {
        if (ex.javaException) {
          description = description + " Java Exception was: " + ex.javaException;
        }
        if (ex.rhinoException) {
          description = description + " Rhino Exception was: " + ex.rhinoException;
        }
        this.error("ERROR " + description);
      }
      return result;
    }

  }  

});

