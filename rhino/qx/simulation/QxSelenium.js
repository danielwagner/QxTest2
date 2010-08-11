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
 * Creates and configures a QxSelenium object.
 */
qx.Class.define("qx.simulation.QxSelenium", {

  extend : qx.core.Object,

  statics :
  {
    /**
     * Imports the QxSelenium (Java) class, and creates an instance.
     * 
     * @return {Object} The configured QxSelenium object
     * @lint ignoreUndefined(importClass,QxSelenium)
     */
    create : function()
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
      return new QxSelenium(qx.simulation.config.getSetting("selServer"),
                            qx.simulation.config.getSetting("selPort"),
                            qx.simulation.config.getSetting("testBrowser"),
                            qx.simulation.config.getSetting("autHost"));
    }
  }

});

