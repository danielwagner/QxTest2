qx.Mixin.define("qx.simulation.MEventSupport",
{
  members:
  {
    /**
     * Adds utility functions to the AUT that allow attaching and removing event
     * listeners to qooxdoo objects identified by their object registry hash. 
     */
    _addListenerSupport : function()
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
    },

    /**
     * Adds an event listener to a qooxdoo widget in the AUT.
     * 
     * @param {String} locator A (Qx)Selenium locator string that finds a qooxdoo widget
     * @param {String} event Name of the event to listen for
     * @param {Function} callback Javascript code to be executed if the event is fired
     * @return {String} the listener's ID
     */
    addListener : function(locator, event, callback)
    {
      var objectHash = qx.simulation.qxSelenium.getQxObjectHash(locator);
      var callbackName = event + "_" + new Date().getTime(); 
      this.addOwnFunction(callbackName, callback);
      var callbackInContext = 'selenium.qxStoredVars["autWindow"].qx.Simulation["' + callbackName + '"]';  
      var cmd = 'selenium.qxStoredVars["autWindow"].qx.Simulation.addListener("' + objectHash + '", "' + event + '", ' + callbackInContext + ')';
      return qx.simulation.qxSelenium.getEval(cmd);
    },

    /**
     * Removes an event listener from a qooxdoo widget in the AUT.
     * 
     * @param {String} locator A (Qx)Selenium locator string that finds a qooxdoo widget
     * @param {String} listenerId The listener's ID as returned by addListener
     * @return {String} "true" or "false" depending on whether the listener was
     * removed successfully
     */
    removeListenerById : function(locator, listenerId)
    {
      listenerId = String(listenerId).replace(/"/, '\\"');
      var objectHash = qx.simulation.qxSelenium.getQxObjectHash(locator);
      var cmd = 'selenium.qxStoredVars["autWindow"].qx.Simulation.removeListenerById("' + objectHash + '", "' + listenerId + '")';
      return qx.simulation.qxSelenium.getEval(cmd);
    },

    /**
     * Attaches a listener to a qooxdoo object that clones the incoming event and
     * adds it to the event store.
     * 
     * @param {String} locator A (Qx)Selenium locator string that finds a qooxdoo widget
     * @param {String} event The name of the event to listen for
     * @return {String} The listener's ID as returned by addListener
     */
    storeEvent : function(locator, event)
    {
      var callback = function(ev)
      {
        selenium.qxStoredVars["eventStore"].push(ev.clone());
      };
      return this.addListener(locator, event, callback);
    },

    /**
     * Executes a JavaScript snippet on a stored event and returns the result.
     * 
     * @param {Integer} index Index of the event in the store
     * @param {String} detailString Code snippet to execute, e.g. "getTarget().classname" 
     * @return {String} The result of the executed code
     */
    getStoredEventDetail : function(index, detailString)
    {
      var cmd = 'selenium.qxStoredVars["eventStore"][' + index + ']';
      if (detailString[0] != "[" && detailString[0] != ".") {
        cmd += ".";
      }
      cmd += detailString;
      return qx.simulation.qxSelenium.getEval(cmd);
    },

    /**
     * Empties the event store.
     */
    clearEventStore : function()
    {
      qx.simulation.qxSelenium.getEval('selenium.qxStoredVars["eventStore"] = []');
    },

    /**
     * Returns the number of entries in the event store.
     * 
     * @return {Integer} The event count
     */
    getStoredEventCount : function()
    {
      var storedEvents = qx.simulation.qxSelenium.getEval('selenium.qxStoredVars["eventStore"].length');
      return parseInt(storedEvents, 10);
    }
  }
});