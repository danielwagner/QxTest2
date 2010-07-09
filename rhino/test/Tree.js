demobrowser.demo.widget.Tree = function()
{
  var superInst = new simulation.QxSimulation();
  
  function Impl() {
    
    this.main = function()
    {
      this.startSession();
      //this.logEnvironment();
      //this.logUserAgent();
      
      //try {
        this.runTests();
      /*
      } catch(ex) {
        this.testFailed = true;
        this.error("Unexpected error while running the tests: " + ex.javaException);
      }
      */
      
      this.logResults();
      this.logDuration();
      qxSelenium.stop();
    };
    
    this.runTests = function()
    {
      var feedsLoaded = this.testFeedsLoaded();
      if (!feedsLoaded) {
        this.warn("Feed(s) not loaded after 30 seconds, clicking reload.");
        this.runCommand("qxClick", [this.locators.reloadButton], "Clicking reload button");
      }
      var feedsLoaded = this.testFeedsLoaded();
      if (!feedsLoaded) {
        this.error("Feed(s) not loaded after reload!");
        this.logInvalidFeeds();
      }
      else {
        this.info("All feeds loaded.");
      }
     
      this.testSelectArticle();
      this.testLanguageSwitch();
      this.testAddFeed();
      
    };
    
  }
  
  Impl.prototype = superInst;
  return new Impl();
};
