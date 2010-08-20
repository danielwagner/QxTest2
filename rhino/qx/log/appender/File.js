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
 * Writes log messages to a file.
 */

qx.Class.define("qx.log.appender.File", {

  extend : qx.core.Object,
  
  statics :
  {
    LOGFILEPATH : "log.txt",

    /**
     * Process a log entry object from qooxdoo's logging system.
     * 
     * @param entry {Map} Log entry object
     */
    process : function(entry)
    {
      var fstream = new java.io.FileWriter(qx.log.appender.File.LOGFILEPATH, true);
      var buffer = new java.io.BufferedWriter(fstream);
      for (var prop in entry) {
        if (prop == "items") {
          var items = entry[prop];
          for (var p in items) {
            var item = items[p];
            buffer.write(item.text);
            buffer.newLine();
          }
        }
      }
      buffer.close();
    }
    
  }
  
});
