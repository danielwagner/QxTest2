qx.Mixin.define("qx.simulation.MApplicationLogging",
{
  members:
  {
    /**
     * Adds a function to the AUT that retrieves all messages from the logger 
     * created by addRingBuffer.
     */
    _addRingBufferGetter : function()
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
    },

    /**
     * Creates a new qx.log.appender.RingBuffer in the AUT and registers it. This
     * can be used to access the AUT's log messages from the test script.
     * 
     * @param win {String} The target window. Must evaluate to a JavaScript Window 
     * object. Default: The AUT's window.
     */
    _addRingBuffer : function(win)
    {
      var qxWin = win || "selenium.qxStoredVars['autWindow']";
      var rb = "new " + qxWin + ".qx.log.appender.RingBuffer()";
      this.storeEval(rb, "ringBuffer");  
      var ret = qx.simulation.qxSelenium.getEval(qxWin + ".qx.log.Logger.register(selenium.qxStoredVars['ringBuffer'])");
    }

  }
});
