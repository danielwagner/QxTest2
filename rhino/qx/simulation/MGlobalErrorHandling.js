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
 * Allows GUI tests to access exceptions caught by the tested application's
 * global error handler.
 */

qx.Mixin.define("qx.simulation.MGlobalErrorHandling",
{
  members:
  {
    /**
     * Creates a global error handler that stores JavaScript exceptions that are 
     * thrown in the specified window. Global Error Handling must be enabled in the 
     * AUT.
     *
     * @param win {String} JavaScript snippet that evaluates as a Window object 
     * accessible to the current Selenium instance. Default: The AUT's window.
     * @lint ignoreGlobal(selenium)
     */
    _addGlobalErrorHandler : function(win)
    {
      var qxWin = win || "selenium.qxStoredVars['autWindow']";
      this.qxSelenium.getEval(qxWin + ".qx.Simulation.errorStore = [];");
      
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
      this.qxSelenium.getEval("selenium.qxStoredVars['autWindow'].qx.Simulation.addGlobalErrorHandler(" + qxWin + ");");  
    },
    
    /**
     * Adds a utility function to the AUT window that reads the contents of the
     * global error store and returns them as a pipe-separated string so they can be
     * read by the test script.
     * 
     * @param win {String} JavaScript snippet that evaluates as a Window object 
     * accessible to the current Selenium instance. Default: The AUT's window. 
     */
    _addGlobalErrorGetter : function(win)
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
    },
    
    /**
     * Returns the error messages of any exceptions caught by the AUT's global error
     * handler.
     * 
     * @param win {String} JavaScript snippet that evaluates as a Window object 
     * accessible to the current Selenium instance. Default: The AUT's window. 
     * @return {String[]} A list of error messages
     */
    getGlobalErrors : function(win)
    {
      var qxWin = win || "selenium.qxStoredVars['autWindow']";
      var exceptions = this.qxSelenium.getEval("selenium.qxStoredVars['autWindow'].qx.Simulation.getGlobalErrors(" + qxWin + ")");
      exceptions = String(exceptions);
      if (!exceptions.length > 0) {
        return [];
      }
      var globalErrors = String(exceptions).split("|");
      return globalErrors;
    },

    /**
     * Empties the given window's global exception store.
     *
     * @param win {String} JavaScript snippet that evaluates as a Window object 
     * accessible to the current Selenium instance. Default: The AUT's window.
     */
    clearGlobalErrorStore : function(win)
    {
      var targetWin = win || "selenium.qxStoredVars['autWindow']";
      this.qxSelenium.getEval(targetWin + ".qx.Simulation.errorStore = [];");
      var ex = this.qxSelenium.getEval(targetWin + ".qx.Simulation.errorStore;");
    }
  }
});