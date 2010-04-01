simulation.util.Config = function(args, defaultMap, requiredList)
{
  var defaults = defaultMap ? defaultMap : {};
  var required = requiredList ? requiredList : [];
  
  function getConfigFromArgs(args)
  {
    var conf = {}; 
    for (var i in args) {
      if (args[i].indexOf("=") >0) {
        var tempArr = args[i].split("=");
        if (tempArr[1] == "true") {
          conf[tempArr[0]] = true;
        }
        else if (tempArr[1] == "false") {
          conf[tempArr[0]] = false;
        }
        else {
          conf[tempArr[0]] = tempArr[1]; 
        }
      }
    }
    return conf;
  };
  
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
  function initConfig(args)
  {
    /* 
     * If the script was called with any external arguments (e.g. on the Rhino
     * command line), add those settings to the config map, overriding any 
     * properties already defined in baseConf. 
     */
    
    var conf = getConfigFromArgs(args)
     // Set defaults if they're not already set.
    for (var key in defaults) {
      if (!(key in conf)) {
        conf[key] = defaults[key];
      }
    }
    
    // Check if all required keys are set.
    for (var i=0,l=required.length; i<l; i++) {
      if (!(required[i] in conf)) {
        throw new Error("Required property " + required[i] + " not in configuration!");
      }
    }

    return conf;
  }
  
  var __config = initConfig(args);
    
  
  /**
   * Public getter for configuration settings.
   * 
   * @param prop {String} the name of a configuration key
   * @param defaultValue {String} Optional value to be returned if the key isn't
   * defined in the configuration
   * @return {String} the value of the requested configuration key
   * @throw an exception if no key was specified or the key doesn't exist in the
   *   configuration map and no default value was specified
   */
  this.getSetting = function(prop, defaultValue)
  {
    if (!prop) {
      throw new Error("No configuration key specified!");
    }
    
    if (!(prop in __config)) {
      if (defaultValue || typeof(defaultValue) == "boolean") {
        return defaultValue;
      }
      else {
        throw new Error("Key " + prop + " not in configuration!");  
      }   
    }
    else {
      return __config[prop];
    }   
  };
  
};