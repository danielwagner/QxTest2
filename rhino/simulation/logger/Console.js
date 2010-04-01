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

simulation.logger.Console = function()
{
  this.__out = java.lang.System.out;
  this.__err = java.lang.System.err;
  
  this.log = function(logMessage, level)
  {
    if (level == "error") {
      this.__err.println(logMessage);
    } else {
      this.__out.println(logMessage);
    }
  };
  
  this.debug = function(logMessage)
  {
    this.log(logMessage, "debug");
  };
  
  this.info = function(logMessage)
  {
    this.log(logMessage, "info");
  };
  
  this.warn = function(logMessage)
  {
    this.log(logMessage, "warn");
  };
  
  this.error = function(logMessage)
  {
    this.log(logMessage, "error");
  };
  
};