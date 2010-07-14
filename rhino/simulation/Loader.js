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

// Create the simulation namespace if it doesn't exist
simulation = {}; 
simulation.loader = {};
var globalObj = this;

/**
 * Loads JavaScript code from a file. Package names are interpreted as 
 * directories below basePath while Class names (starting with a capital letter)
 * are treated as *.js files. Example: load("bar.Baz", "./foo") loads the file 
 * ./foo/bar/Baz.js
 * 
 * @param {String} className The full name of the class to be loaded
 * @param {String} basePath File system base path
 */
simulation.loader.load = function(className, basePath)
{
  var nameSpace = className.split(".");
  var parent = globalObj;
  var classPath = "";
  // create the namespace object hierarchy
  for (var i=0,l=nameSpace.length; i<l; i++) {
    var fragment = nameSpace[i];
    classPath += "/" + fragment;
    if (!parent[fragment]) {
      parent[fragment] = {};
      
      // if it starts with a capital letter, treat it as a class (file)
      if (fragment[0] == fragment[0].toUpperCase()) {
        var classFile = basePath + classPath + ".js";
        load([classFile]);
      }
    
    }
    
    parent = parent[fragment];
  }

};

/**
 * Reads a JavaScript file and returns the contents as a string.
 * 
 * @param {String} className The file's namespace
 * @param {String} basePath File system base path
 * @return {String} The file's contents
 */
simulation.loader.readClassFile = function(className, basePath)
{
  var nameSpace = className.split(".");
  var parent = globalObj;
  var classPath = "";
  // create the namespace object hierarchy
  for (var i=0,l=nameSpace.length; i<l; i++) {
    var fragment = nameSpace[i];
    classPath += "/" + fragment;
    if (!parent[fragment]) {
      parent[fragment] = {};
      
      // if it starts with a capital letter, treat it as a class (file)
      if (fragment[0] == fragment[0].toUpperCase()) {
        var classFile = basePath + classPath + ".js";
        return readFile(classFile);
      }
    
    }
    
    parent = parent[fragment];
  }

};

/**
 * Utility function that returns an object identified by a path, e.g.
 * ["foo", "bar", "baz"] => foo.bar.baz
 * 
 * @param {} nsArr
 * @return {}
 */
simulation.loader.getObjectByName = function(nsArr)
{
  var obj = globalObj;
  for (var i=0; i < nsArr.length; i++) {
    obj = obj[nsArr[i]];
  }
  return obj;
};

/**
 * Takes a list of class names and loads them if they're not already defined.
 * 
 * @param {Array} classNames List of classes, e.g. ["foo.Bar", "foo.Baz"]
 * @param {String} basePath Directory in which the source files are located
 */
simulation.loader.require = function(classNames, basePath)
{
  var basePath = basePath || globalObj.basePath; 
  for (var i=0,l=classNames.length; i<l; i++) { 
    var className = classNames[i];    
    
    try {
      if (!simulation.loader.getObjectByName(className.split(".")) ) {
        // class object doesn't exist, load the file
        simulation.loader.load(className, basePath);
      }
    }
    catch(ex) {
      // parent namespace doesn't exist
      simulation.loader.load(className, basePath);
    }    
  }
};

/**
 * Adds the properties of a mixin to a given class. The mixin can either be an
 * object or the name of a file to be loaded using 
 * simulation.loader.readClassFile
 * 
 * @param {Function} includeIn The class to which mixin code should be added
 * @param {Object|String} mixin Object containing mixin code or namespace array
 * referencing a mixin file
 * @param {String?} basePath base directory for mixin file
 */
simulation.loader.include = function(includeIn, mixin, basePath)
{
  if (!includeIn) {
    throw new Error("simulation.loader.include: No class to include into!");
  }
 
  var basePath = basePath || globalObj.basePath;
  
  if (typeof mixin == "string") {
    var mixinStr = simulation.loader.readClassFile(mixin, basePath);
    eval("simulation.loader.__tempObj = " + mixinStr);
    mixin = simulation.loader.__tempObj;
  }
  
  if (!typeof mixin == "object") {
    throw new Error("simulation.loader.include: Invalid mixin");
  }
  
  for (var prop in mixin) {
    if (typeof mixin[prop] == "function") {
      includeIn.prototype[prop] = mixin[prop];
    }
  }
};
