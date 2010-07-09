test.Event = function()
{
  var superInst = new simulation.QxSimulation();
  
  function Impl() {
    
    this.main = function()
    {
      this.startSession();
      this.logEnvironment();
      this.logUserAgent();
      
      this.testEvent();
      
      this.logResults();
      this.logDuration();
      simulation.qxSelenium.stop();
    };
    
    this.testEvent = function()
    {
      var locator = "qxh=qx.ui.form.Button";
      var callback = function(ev) {
        this.assertEquals(ev.getType(), "bla");
      };
      var listenerId = this.addListener(locator, "execute", callback);
      simulation.qxSelenium.qxClick(locator);
      Packages.java.lang.Thread.sleep(2000);
      this.removeListenerById(locator, listenerId);
    };
    
  }
  
  Impl.prototype = superInst;
  return new Impl();
};
