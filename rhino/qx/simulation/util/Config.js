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

qx.Class.define("qx.simulation.util.Config", {

  extend : qx.core.Object,

  construct : function(args, requiredList, defaultMap)
  {
    this.required = requiredList || ['selServer', 'selPort', 'testBrowser', 'autHost', 'autPath'];
    this.__defaults = defaultMap || {};
    this.__config = this.init(args);
  },

  members :
  {
    __defaults: null,
    __config : null,

    trim : function(stringToTrim) 
    {
      return stringToTrim.replace(/^\s+|\s+$/g,"");
    },

    _getConfigFromArgs : function(args)
    {
      var conf = {}; 
      for (var i in args) {
        if (args[i].indexOf("=") >0) {
          var tempArr = args[i].split("=");
          var key = tempArr[0];
          var value = tempArr[1];
          
          // Value is Boolean
          if (value == "true") {
            conf[key] = true;
          }
          else if (value == "false") {
            conf[key] = false;
          }
          
          // Value is Array
          if (value[0] == "[" && value[value.length - 1] == "]" ) {          
            conf[key] = [];
            var valuesStr = value.substr(1, value.length - 2);
            var valuesArray = valuesStr.split(",");
            for (var i=0; i<valuesArray.length; i++) {
              conf[key].push(this.trim(valuesArray[i]));
            }
          }
          
          else {          
            conf[key] = value; 
          }
        
        }
      }
      return conf;
    },

    /**
     * Initalizes the configuration, sets defaults if necessary and validates the 
     * configuration.
     * 
     * @private
     * @param baseConf {Map} a map of configuration settings
     * @param args {String} optional space-delimited string of 'key=value' pairs
     * @return {Map} the configuration for this Simulation instance
     * @throws an exception if a required setting is missing
     */
    init : function(args)
    {
      /* 
       * If the script was called with any external arguments (e.g. on the Rhino
       * command line), add those settings to the config map, overriding any 
       * properties already defined in baseConf. 
       */
      var conf = this._getConfigFromArgs(args)
       // Set defaults if they're not already set.
      for (var key in this.__defaults) {
        if (!(key in conf)) {
          conf[key] = this.__defaults[key];
        }
      }
      
      // Check if all required keys are set.
      for (var i=0,l=this.required.length; i<l; i++) {
        if (!(this.required[i] in conf)) {
          throw new Error("Required property " + this.required[i] + " not in configuration!");
        }
      }

      return conf;
    },

    /**
     * Accessor for configuration settings.
     * 
     * @param prop {String} the name of a configuration key
     * @param defaultValue {String} Optional value to be returned if the key isn't
     * defined in the configuration
     * @return {String} the value of the requested configuration key
     * @throw an exception if no key was specified or the key doesn't exist in the
     *   configuration map and no default value was specified
     */
    getSetting : function(prop, defaultValue)
    {
      if (!prop) {
        throw new Error("No configuration key specified!");
      }
      
      if (!(prop in this.__config)) {
        if (defaultValue || typeof(defaultValue) == "boolean") {
          return defaultValue;
        }
        else {
          throw new Error("Key " + prop + " not in configuration!");  
        }   
      }
      else {
        return this.__config[prop];
      }   
    }

  }

});

