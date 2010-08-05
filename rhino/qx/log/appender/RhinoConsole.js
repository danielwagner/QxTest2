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

qx.Class.define("qx.log.appender.RhinoConsole", {

  statics:
  {
    __OUT : java.lang.System.out,
    __ERR : java.lang.System.err,

    log : function(logMessage, level)
    {
      if (level == "error") {
        this.__ERR.println(logMessage);
      } else {
        this.__OUT.println(logMessage);
      }
    },

    debug : function(logMessage)
    {
      this.log(logMessage, "debug");
    },
    
    info : function(logMessage)
    {
      this.log(logMessage, "info");
    },
    
    warn : function(logMessage)
    {
      this.log(logMessage, "warn");
    },
    
    error : function(logMessage)
    {
      this.log(logMessage, "error");
    },

    process : function(entry)
    {
      var level = entry.level || "info";
      for (var prop in entry) {
        if (prop == "items") {
          var items = entry[prop];
          for (var p in items) {
            var item = items[p];
            this[level](item.text);            
          }
        }
      }
    }

  }

});

