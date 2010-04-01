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
simulation.loader.loadClass = function(className, basePath)
{
  nameSpace = className.split(".");
  parent = globalObj;
  var classPath = "";
  // create the namespace object hierarchy
  for (var i=0,l=nameSpace.length; i<l-1; i++) {
    if (!parent[nameSpace[i]]) {
      parent[nameSpace[i]] = {};
    }
    classPath += "/" + nameSpace[i];
    parent = parent[nameSpace[i]];
  }
  
  // load the class
  var className = nameSpace[nameSpace.length-1];
  
  if (parent[className]) {
    print("Warning: " + className + " is already defined!");
  }
  
  var classFile = basePath + classPath + "/" + className + ".js";
  load([classFile]);
  
  if (!typeof parent[className] === "function") {
    throw new Error("Couldn't load class " + className);    
  }
};
