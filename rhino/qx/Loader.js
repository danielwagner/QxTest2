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

var globalObj = this;

/**
 * Loads JavaScript code from the file system.
 */

qx.Class.define("qx.Loader", {

  extend : qx.core.Object,

  statics :
  {

    /**
     * Loads JavaScript code from a file. Package names are interpreted as 
     * directories below basePath while Class names (starting with a capital letter)
     * are treated as *.js files. Example: load("bar.Baz", "./foo") loads the file 
     * ./foo/bar/Baz.js
     * 
     * @param className {String} The full name of the class to be loaded
     * @param basePath {String} File system base path
     * 
     * @lint ignoreUndefined(globalObj,load)
     */
    load : function(className, basePath)
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

    },

    /**
     * Reads a JavaScript file and returns the contents as a string.
     * 
     * @param className {String} The file's namespace
     * @param basePath {String} File system base path
     * @return {String} The file's contents
     * 
     * @lint ignoreUndefined(readFile,globalObj)
     */
    readClassFile : function(className, basePath)
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

    },

    /**
     * Utility function that returns an object identified by a path, e.g.
     * ["foo", "bar", "baz"] => foo.bar.baz
     * 
     * @param nsArr {String[]} Array containing path information
     * @return {Object} The found object
     * 
     * @lint ignoreUndefined(globalObj)
     */
    getObjectByName : function(nsArr)
    {
      var obj = globalObj;
      for (var i=0; i < nsArr.length; i++) {
        obj = obj[nsArr[i]];
      }
      return obj;
    },

    /**
     * Takes a list of class names and loads them if they're not already defined.
     * 
     * @param classNames{Array} List of classes, e.g. ["foo.Bar", "foo.Baz"]
     * @param basePath {String} Directory in which the source files are located
     * 
     * @lint ignoreUndefined(globalObj)
     */
    require : function(classNames, basePath)
    {
      var basePath = basePath || globalObj.basePath; 
      for (var i=0,l=classNames.length; i<l; i++) { 
        var className = classNames[i];
        
        try {
          var clazz = qx.Loader.getObjectByName(className.split("."));
          if (!clazz) {
            // class object doesn't exist, load the file
            qx.Loader.load(className, basePath);
          } else { 
            print("Class " + className + " already loaded."); 
          }
        }
        catch(ex) {
          // parent namespace doesn't exist
          qx.Loader.load(className, basePath);
        }    
      }
    }
  }
});
