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

simulation.loader.require(["simulation.test.TestCase"]);

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