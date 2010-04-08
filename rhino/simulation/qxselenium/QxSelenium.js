simulation.qxselenium.QxSelenium.createQxSelenium = function(config)
{
  // Basic sanity check: No sense in continuing without QxSelenium.
  try {
    importClass(Packages.com.thoughtworks.selenium.QxSelenium);
  }
  catch(ex) {
    throw new Error("Couldn't import QxSelenium class! Make sure the qooxdoo " 
    + "Selenium user extensions are installed in your Selenium client.\n" + ex);
  }
  
  // Create and configure QxSelenium instance
  var qxSelenium = new QxSelenium(config.getSetting("selServer"),
                                        config.getSetting("selPort"),
                                        config.getSetting("testBrowser"),
                                        config.getSetting("autHost"));
  
  return qxSelenium;
}