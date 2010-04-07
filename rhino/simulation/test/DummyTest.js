simulation.foo.DummyTest = function(config)
{
  var that = new simulation.QxSimulation(config);
  
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