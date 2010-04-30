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

if (!simulation.logger) {
  simulation.logger = {}
}

simulation.logger.File = function(filePath, prefix)
{
  if (!filePath) {
    throw new Error("simulation.logger.File: No log file path specified!");
  }
  this.LOGFILEPATH = filePath || null;
  this.PREFIX = prefix || "";
  
  this.log = function(logMessage, level)
  {
    var msg = logMessage ? logMessage : "";
    var lvl = level ? level : "debug";
  
    var logFile = this.__getLogFile(this.LOGFILEPATH);
    logFile.write(this.PREFIX + " " + msg);
    logFile.newLine();
    logFile.close();
  };
  
  this.debug = function(logMessage)
  {
    if (logMessage) {
      this.log(logMessage, "debug");
    }
  };
  
  this.info = function(logMessage)
  {
    if (logMessage) {
      this.log(logMessage, "info");
    }
  };
  
  this.warn = function(logMessage)
  {
    if (logMessage) {
      this.log(logMessage, "warn");
    }
  };
  
  this.error = function(logMessage)
  {
    if (logMessage) {
      this.log(logMessage, "error");
    }
  };
  
  this.__getLogFile = function(filePath)
  {
    var fstream = new java.io.FileWriter(filePath, true);
    var out = new java.io.BufferedWriter(fstream);
    return out;
  };
};