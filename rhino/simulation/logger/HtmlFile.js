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

simulation.logger.HtmlFile = function(filePath, prefix)
{
  if (!filePath) {
    throw new Error("simulation.logger.File: No log file path specified!");
  }
  this.LOGFILEPATH = filePath || null;
  this.PREFIX = prefix || "";
  this.PREFIX += '<div class="qxappender"><div class="level-';
  this.SUFFIX = '</div></div>';
  
  this.__write = function(msg)
  {
    var logFile = this.__getLogFile(this.LOGFILEPATH);
    logFile.write(msg);
    logFile.newLine();
    logFile.close();
  };
   
  this.log = function(logMessage, level)
  {
    var msg = logMessage ? logMessage : "";
    msg = this.__sanitize(msg);
    var lvl = level ? level : "debug";
    msg = this.PREFIX + lvl + '">' + msg + this.SUFFIX;
    this.__write(msg);
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
  
  /**
   * Removes special and formatting characters from strings so they can be logged.
   * 
   * @param text {String} The string to be sanitized
   * @return {String} The sanitized string
   */
  this.__sanitize = function(text)
  {
    // The message might be a Java object, so cast it as a String just to be sure.
    text = String(text);
    text = text.replace(/\n/g,'<br/>');
    text = text.replace(/\r/g,'<br/>');
    text = text.replace(/'/g, '&quot;');
    text = text.replace(/ä/g, '&auml;');
    text = text.replace(/ö/g, '&ouml;');
    text = text.replace(/ü/g, '&uuml;');
    text = text.replace(/Ä/g, '&Auml;');
    text = text.replace(/Ö/g, '&Ouml;');
    text = text.replace(/Ü/g, '&Uuml;');
    text = text.replace(/ß/g, '&szlig;');
    text = text.replace(/[^\w\d\-_:;\.,\"\!\?\(\)\[\]#$%&= \/\<\> ]?/gi, '');
    return text;
  };  
  
};