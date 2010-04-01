simulation.test.DummyTest = function(baseConf, args)
{
  var that = new simulation.test.TestCase(baseConf, args);
  
  that.setUp = function() {
    this.debug("Setting up a test from test.DummyTest");
  };
  
  
  that.testSomething = function()
  {
    this.debug("Testing something");
  }
  
  that.testSomethingElse = function()
  {
    this.debug("Testing something else");
  };
  
  
  that.tearDown = function() {
    this.debug("Tearing down a test from test.DummyTest");
  };
  
  return that;  
};