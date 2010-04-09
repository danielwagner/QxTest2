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
simulation.loader.load = function(className, basePath)
{
  nameSpace = className.split(".");
  parent = globalObj;
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

simulation.loader.getObjectByName = function(nsArr)
{
  var obj = globalObj;
  for (var i=0; i < nsArr.length; i++) {
    obj = obj[nsArr[i]];
  }
  return obj;
};

simulation.loader.require = function(classNames, basePath)
{
  var basePath = basePath || globalObj.basePath; 
  for (var i=0,l=classNames.length; i<l; i++) { 
    var className = classNames[i];    
    
    try {
      if (!simulation.loader.getObjectByName(className.split(".")) ) {
        simulation.loader.load(className, basePath);
      }
    }
    catch(ex) {
      simulation.loader.load(className, basePath);
    }    
  }
};
