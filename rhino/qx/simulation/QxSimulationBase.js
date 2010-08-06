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

qx.Loader.require(["qx.simulation.qxselenium.QxSelenium"]);

qx.Class.define("qx.simulation.QxSimulationBase", {
  
  extend : qx.core.Object,

  construct : function()
  {
    this.startDate = new Date();
  },

  members :
  {

    /**
     * Start the Selenium session, load the AUT and set some basic options.
     */
    startSeleniumSession : function()
    {
      if (!qx.simulation.qxSelenium) {
        qx.simulation.qxSelenium = qx.simulation.qxselenium.QxSelenium.createQxSelenium();
      }
      qx.simulation.qxSelenium.start();
      qx.simulation.qxSelenium.setTimeout(qx.simulation.config.getSetting("globalTimeout", 120000));
      qx.simulation.qxSelenium.open(qx.simulation.config.getSetting("autHost") + "" + qx.simulation.config.getSetting("autPath"));
      qx.simulation.qxSelenium.setSpeed(qx.simulation.config.getSetting("stepSpeed", "250"));
      this.setupEnvironment();
    },

    /**
     * Add some testing utilities to the qooxdoo application. Must be called
     * whenever a qooxdoo application is loaded.
     */
    setupEnvironment : function()
    {
      /* 
       * Store the AUT window object to avoid calling 
       * selenium.browserbot.getCurrentWindow() repeatedly.
       */
      qx.simulation.qxSelenium.getEval('selenium.qxStoredVars = {}');    
      this.storeEval('selenium.browserbot.getCurrentWindow()', 'autWindow');
      
      this.prepareNameSpace();
    },

    /**
     * Attaches a "Simulation" namespace object to the specified window's qx object.
     * This will be used to store custom methods added by addOwnFunction. If no 
     * window is specified, the AUT's window is used.
     * 
     * @param win {String} The name of the target window. Must evaluate to a 
     * JavaScript Window object.
     */
    prepareNameSpace : function(win)
    {
      var targetWin = win || 'selenium.qxStoredVars["autWindow"]';
      var ns = String(qx.simulation.qxSelenium.getEval(targetWin + '.qx.Simulation'));
      if (ns == "null" || ns == "undefined") {
        qx.simulation.qxSelenium.getEval(targetWin + '.qx.Simulation = {};');
      }
    },

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
    storeEval : function(code, keyName)
    {
      if (!code) {
        throw new Error("No code specified for storeEval()");
      }
      
      if (!keyName) {
        throw new Error("No key name specified for storeEval()");
      }

      qx.simulation.qxSelenium.getEval('selenium.qxStoredVars["' + keyName + '"] = ' + String(code));
    },

    /**
     * Adds a function to the "qx.Simulation" namespace of the application under 
     * test. This function can then be called using 
     * <code>selenium.getEval("selenium.browserbot.getCurrentWindow().qx.Simulation.funcName();")</code>
     * 
     * @param funcName {String} name of the function to be added
     * @param func {Function} the function to be added
     */
    addOwnFunction : function(funcName, func)
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
      
      qx.simulation.qxSelenium.getEval('selenium.browserbot.getCurrentWindow().qx.Simulation.' + funcName + ' = ' + func);
    }

  }

});

