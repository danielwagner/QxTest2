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

simulation.log.Logger = {
  
  appenders : [],
  
  register : function(appender) {
    simulation.log.Logger.appenders.push(appender);
  },
  
  unregister : function(appender) {
    var found = false;
    for (var i=0, l=simulation.log.Logger.appenders.length; i<l; i++) {
      var registered = simulation.log.Logger.appenders[i];
      if (registered == appender) {
        found = i;
      }
    }
    if (found) {
      simulation.log.Logger.appenders.splice(found,1);
    }
  },
  
  log : function(message, level) {
    if (!message) {
      return;
    }
    var lvl = level || "info";
    for (var i=0, l=simulation.log.Logger.appenders.length; i<l; i++) {
      var appender = simulation.log.Logger.appenders[i];
      appender[lvl](message);
    }
  },
  
  debug : function(message) {
    simulation.log.Logger.log(message, "debug");
  },
  
  info : function(message) {
    simulation.log.Logger.log(message, "info");
  },
  
  warn : function(message) {
    simulation.log.Logger.log(message, "warn");
  },
  
  error : function(message) {
    simulation.log.Logger.log(message, "error");
  }
  
}