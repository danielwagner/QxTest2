(function(){ 

if (!this.window) window = this;

if (!window.navigator) window.navigator = {userAgent: "", product: "", cpuClass: ""}; 

if (!window.qx) window.qx = {};
  
if (!this.qxsettings) qxsettings = {};
var settings = {"qx.globalErrorHandling":"off"};
for (var k in settings) qxsettings[k] = settings[k];

qx.$$packageData = {};
qx.$$loader = {};
})();

qx.$$packageData['c5018536f354']={"locales":{},"resources":{},"translations":{}};
if(!window.qx){window.qx={};
}qx.Bootstrap={genericToString:function(){return "[Class "+this.classname+"]";
},createNamespace:function(name,object){var splits=name.split(".");
var parent=window;
var part=splits[0];

for(var i=0,len=splits.length-1;i<len;i++,part=splits[i]){if(!parent[part]){parent=parent[part]={};
}else{parent=parent[part];
}}parent[part]=object;
return part;
},setDisplayName:function(fcn,classname,name){fcn.displayName=classname+"."+name+"()";
},setDisplayNames:function(functionMap,classname){for(var name in functionMap){var value=functionMap[name];

if(value instanceof Function){value.displayName=classname+"."+name+"()";
}}},define:function(name,config){if(!config){var config={statics:{}};
}var clazz;
var proto=null;
qx.Bootstrap.setDisplayNames(config.statics,name);

if(config.members||config.extend){qx.Bootstrap.setDisplayNames(config.members,name+".prototype");
clazz=config.construct||new Function;

if(config.extend){this.extendClass(clazz,clazz,config.extend,name,basename);
}var statics=config.statics||{};
for(var i=0,keys=qx.Bootstrap.getKeys(statics),l=keys.length;i<l;i++){var key=keys[i];
clazz[key]=statics[key];
}proto=clazz.prototype;
var members=config.members||{};
for(var i=0,keys=qx.Bootstrap.getKeys(members),l=keys.length;i<l;i++){var key=keys[i];
proto[key]=members[key];
}}else{clazz=config.statics||{};
}var basename=this.createNamespace(name,clazz);
clazz.name=clazz.classname=name;
clazz.basename=basename;
clazz.$$type="Class";
if(!clazz.hasOwnProperty("toString")){clazz.toString=this.genericToString;
}if(config.defer){config.defer(clazz,proto);
}qx.Bootstrap.$$registry[name]=config.statics;
return clazz;
}};
qx.Bootstrap.define("qx.Bootstrap",{statics:{LOADSTART:qx.$$start||new Date(),createNamespace:qx.Bootstrap.createNamespace,define:qx.Bootstrap.define,setDisplayName:qx.Bootstrap.setDisplayName,setDisplayNames:qx.Bootstrap.setDisplayNames,genericToString:qx.Bootstrap.genericToString,extendClass:function(clazz,construct,superClass,name,basename){var superproto=superClass.prototype;
var helper=new Function;
helper.prototype=superproto;
var proto=new helper;
clazz.prototype=proto;
proto.name=proto.classname=name;
proto.basename=basename;
construct.base=clazz.superclass=superClass;
construct.self=clazz.constructor=proto.constructor=clazz;
},getByName:function(name){return qx.Bootstrap.$$registry[name];
},$$registry:{},objectGetLength:({"count":function(map){return map.__count__;
},"default":function(map){var length=0;

for(var key in map){length++;
}return length;
}})[(({}).__count__==0)?"count":"default"],objectMergeWith:function(target,source,overwrite){if(overwrite===undefined){overwrite=true;
}
for(var key in source){if(overwrite||target[key]===undefined){target[key]=source[key];
}}return target;
},__shadowedKeys:["isPrototypeOf","hasOwnProperty","toLocaleString","toString","valueOf","constructor"],getKeys:({"ES5":Object.keys,"BROKEN_IE":function(map){var arr=[];
var hasOwnProperty=Object.prototype.hasOwnProperty;

for(var key in map){if(hasOwnProperty.call(map,key)){arr.push(key);
}}var shadowedKeys=qx.Bootstrap.__shadowedKeys;

for(var i=0,a=shadowedKeys,l=a.length;i<l;i++){if(hasOwnProperty.call(map,a[i])){arr.push(a[i]);
}}return arr;
},"default":function(map){var arr=[];
var hasOwnProperty=Object.prototype.hasOwnProperty;

for(var key in map){if(hasOwnProperty.call(map,key)){arr.push(key);
}}return arr;
}})[typeof (Object.keys)==
"function"?"ES5":
(function(){for(var key in {toString:1}){return key;
}})()!=="toString"?"BROKEN_IE":"default"],getKeysAsString:function(map){var keys=qx.Bootstrap.getKeys(map);

if(keys.length==0){return "";
}return '"'+keys.join('\", "')+'"';
},__classToTypeMap:{"[object String]":"String","[object Array]":"Array","[object Object]":"Object","[object RegExp]":"RegExp","[object Number]":"Number","[object Boolean]":"Boolean","[object Date]":"Date","[object Function]":"Function","[object Error]":"Error"},bind:function(func,self,varargs){var fixedArgs=Array.prototype.slice.call(arguments,2,arguments.length);
return function(){var args=Array.prototype.slice.call(arguments,0,arguments.length);
return func.apply(self,fixedArgs.concat(args));
};
},firstUp:function(str){return str.charAt(0).toUpperCase()+str.substr(1);
},firstLow:function(str){return str.charAt(0).toLowerCase()+str.substr(1);
},getClass:function(value){var classString=Object.prototype.toString.call(value);
return (qx.Bootstrap.__classToTypeMap[classString]||classString.slice(8,-1));
},isString:function(value){return (value!==null&&(typeof value==="string"||qx.Bootstrap.getClass(value)=="String"||value instanceof String||(!!value&&!!value.$$isString)));
},isArray:function(value){return (value!==null&&(value instanceof Array||(value&&qx.data&&qx.data.IListData&&qx.Bootstrap.hasInterface(value.constructor,qx.data.IListData))||qx.Bootstrap.getClass(value)=="Array"||(!!value&&!!value.$$isArray)));
},isObject:function(value){return (value!==undefined&&value!==null&&qx.Bootstrap.getClass(value)=="Object");
},isFunction:function(value){return qx.Bootstrap.getClass(value)=="Function";
},classIsDefined:function(name){return qx.Bootstrap.getByName(name)!==undefined;
},getPropertyDefinition:function(clazz,name){while(clazz){if(clazz.$$properties&&clazz.$$properties[name]){return clazz.$$properties[name];
}clazz=clazz.superclass;
}return null;
},hasProperty:function(clazz,name){return !!qx.Bootstrap.getPropertyDefinition(clazz,name);
},getEventType:function(clazz,name){var clazz=clazz.constructor;

while(clazz.superclass){if(clazz.$$events&&clazz.$$events[name]!==undefined){return clazz.$$events[name];
}clazz=clazz.superclass;
}return null;
},supportsEvent:function(clazz,name){return !!qx.Bootstrap.getEventType(clazz,name);
},getByInterface:function(clazz,iface){var list,i,l;

while(clazz){if(clazz.$$implements){list=clazz.$$flatImplements;

for(i=0,l=list.length;i<l;i++){if(list[i]===iface){return clazz;
}}}clazz=clazz.superclass;
}return null;
},hasInterface:function(clazz,iface){return !!qx.Bootstrap.getByInterface(clazz,iface);
},getMixins:function(clazz){var list=[];

while(clazz){if(clazz.$$includes){list.push.apply(list,clazz.$$flatIncludes);
}clazz=clazz.superclass;
}return list;
},$$logs:[],debug:function(object,message){qx.Bootstrap.$$logs.push(["debug",arguments]);
},info:function(object,message){qx.Bootstrap.$$logs.push(["info",arguments]);
},warn:function(object,message){qx.Bootstrap.$$logs.push(["warn",arguments]);
},error:function(object,message){qx.Bootstrap.$$logs.push(["error",arguments]);
},trace:function(object){}}});
qx.Bootstrap.define("qx.core.Setting",{statics:{__settings:{},define:function(key,defaultValue){if(defaultValue===undefined){throw new Error('Default value of setting "'+key+'" must be defined!');
}
if(!this.__settings[key]){this.__settings[key]={};
}else if(this.__settings[key].defaultValue!==undefined){throw new Error('Setting "'+key+'" is already defined!');
}this.__settings[key].defaultValue=defaultValue;
},get:function(key){var cache=this.__settings[key];

if(cache===undefined){throw new Error('Setting "'+key+'" is not defined.');
}
if(cache.value!==undefined){return cache.value;
}return cache.defaultValue;
},set:function(key,value){if((key.split(".")).length<2){throw new Error('Malformed settings key "'+key+'". Must be following the schema "namespace.key".');
}
if(!this.__settings[key]){this.__settings[key]={};
}this.__settings[key].value=value;
},__init:function(){if(window.qxsettings){for(var key in window.qxsettings){this.set(key,window.qxsettings[key]);
}window.qxsettings=undefined;

try{delete window.qxsettings;
}catch(ex){}this.__loadUrlSettings();
}},__loadUrlSettings:function(){if(this.get("qx.allowUrlSettings")!=true){return;
}var urlSettings=document.location.search.slice(1).split("&");

for(var i=0;i<urlSettings.length;i++){var setting=urlSettings[i].split(":");

if(setting.length!=3||setting[0]!="qxsetting"){continue;
}this.set(setting[1],decodeURIComponent(setting[2]));
}}},defer:function(statics){statics.define("qx.allowUrlSettings",false);
statics.define("qx.allowUrlVariants",false);
statics.define("qx.propertyDebugLevel",0);
statics.__init();
}});
qx.Bootstrap.define("qx.Interface",{statics:{define:function(name,config){if(config){if(config.extend&&!(config.extend instanceof Array)){config.extend=[config.extend];
}{};
var iface=config.statics?config.statics:{};
if(config.extend){iface.$$extends=config.extend;
}
if(config.properties){iface.$$properties=config.properties;
}
if(config.members){iface.$$members=config.members;
}
if(config.events){iface.$$events=config.events;
}}else{var iface={};
}iface.$$type="Interface";
iface.name=name;
iface.toString=this.genericToString;
iface.basename=qx.Bootstrap.createNamespace(name,iface);
qx.Interface.$$registry[name]=iface;
return iface;
},getByName:function(name){return this.$$registry[name];
},isDefined:function(name){return this.getByName(name)!==undefined;
},getTotalNumber:function(){return qx.Bootstrap.objectGetLength(this.$$registry);
},flatten:function(ifaces){if(!ifaces){return [];
}var list=ifaces.concat();

for(var i=0,l=ifaces.length;i<l;i++){if(ifaces[i].$$extends){list.push.apply(list,this.flatten(ifaces[i].$$extends));
}}return list;
},__assertMembers:function(object,clazz,iface,wrap){var members=iface.$$members;

if(members){for(var key in members){if(qx.Bootstrap.isFunction(members[key])){var isPropertyMethod=this.__isPropertyMethod(clazz,key);
var hasMemberFunction=isPropertyMethod||qx.Bootstrap.isFunction(object[key]);

if(!hasMemberFunction){throw new Error('Implementation of method "'+key+'" is missing in class "'+clazz.classname+'" required by interface "'+iface.name+'"');
}var shouldWrapFunction=wrap===true&&!isPropertyMethod&&!qx.Bootstrap.hasInterface(clazz,iface);

if(shouldWrapFunction){object[key]=this.__wrapInterfaceMember(iface,object[key],key,members[key]);
}}else{if(typeof object[key]===undefined){if(typeof object[key]!=="function"){throw new Error('Implementation of member "'+key+'" is missing in class "'+clazz.classname+'" required by interface "'+iface.name+'"');
}}}}}},__isPropertyMethod:function(clazz,methodName){var match=methodName.match(/^(is|toggle|get|set|reset)(.*)$/);

if(!match){return false;
}var propertyName=qx.Bootstrap.firstLow(match[2]);
var isPropertyMethod=qx.Bootstrap.getPropertyDefinition(clazz,propertyName);

if(!isPropertyMethod){return false;
}var isBoolean=match[0]=="is"||match[0]=="toggle";

if(isBoolean){return qx.Bootstrap.getPropertyDefinition(clazz,propertyName).check=="Boolean";
}return true;
},__assertProperties:function(clazz,iface){if(iface.$$properties){for(var key in iface.$$properties){if(!qx.Bootstrap.getPropertyDefinition(clazz,key)){throw new Error('The property "'+key+'" is not supported by Class "'+clazz.classname+'"!');
}}}},__assertEvents:function(clazz,iface){if(iface.$$events){for(var key in iface.$$events){if(!qx.Bootstrap.supportsEvent(clazz,key)){throw new Error('The event "'+key+'" is not supported by Class "'+clazz.classname+'"!');
}}}},assertObject:function(object,iface){var clazz=object.constructor;
this.__assertMembers(object,clazz,iface,false);
this.__assertProperties(clazz,iface);
this.__assertEvents(clazz,iface);
var extend=iface.$$extends;

if(extend){for(var i=0,l=extend.length;i<l;i++){this.assertObject(object,extend[i]);
}}},assert:function(clazz,iface,wrap){this.__assertMembers(clazz.prototype,clazz,iface,wrap);
this.__assertProperties(clazz,iface);
this.__assertEvents(clazz,iface);
var extend=iface.$$extends;

if(extend){for(var i=0,l=extend.length;i<l;i++){this.assert(clazz,extend[i],wrap);
}}},genericToString:function(){return "[Interface "+this.name+"]";
},$$registry:{},__wrapInterfaceMember:function(){},__allowedKeys:null,__validateConfig:function(){}}});
qx.Bootstrap.define("qx.Mixin",{statics:{define:function(name,config){if(config){if(config.include&&!(config.include instanceof Array)){config.include=[config.include];
}{};
var mixin=config.statics?config.statics:{};
qx.Bootstrap.setDisplayNames(mixin,name);

for(var key in mixin){if(mixin[key] instanceof Function){mixin[key].$$mixin=mixin;
}}if(config.construct){mixin.$$constructor=config.construct;
qx.Bootstrap.setDisplayName(config.construct,name,"constructor");
}
if(config.include){mixin.$$includes=config.include;
}
if(config.properties){mixin.$$properties=config.properties;
}
if(config.members){mixin.$$members=config.members;
qx.Bootstrap.setDisplayNames(config.members,name+".prototype");
}
for(var key in mixin.$$members){if(mixin.$$members[key] instanceof Function){mixin.$$members[key].$$mixin=mixin;
}}
if(config.events){mixin.$$events=config.events;
}
if(config.destruct){mixin.$$destructor=config.destruct;
qx.Bootstrap.setDisplayName(config.destruct,name,"destruct");
}}else{var mixin={};
}mixin.$$type="Mixin";
mixin.name=name;
mixin.toString=this.genericToString;
mixin.basename=qx.Bootstrap.createNamespace(name,mixin);
this.$$registry[name]=mixin;
return mixin;
},checkCompatibility:function(mixins){var list=this.flatten(mixins);
var len=list.length;

if(len<2){return true;
}var properties={};
var members={};
var events={};
var mixin;

for(var i=0;i<len;i++){mixin=list[i];

for(var key in mixin.events){if(events[key]){throw new Error('Conflict between mixin "'+mixin.name+'" and "'+events[key]+'" in member "'+key+'"!');
}events[key]=mixin.name;
}
for(var key in mixin.properties){if(properties[key]){throw new Error('Conflict between mixin "'+mixin.name+'" and "'+properties[key]+'" in property "'+key+'"!');
}properties[key]=mixin.name;
}
for(var key in mixin.members){if(members[key]){throw new Error('Conflict between mixin "'+mixin.name+'" and "'+members[key]+'" in member "'+key+'"!');
}members[key]=mixin.name;
}}return true;
},isCompatible:function(mixin,clazz){var list=qx.Bootstrap.getMixins(clazz);
list.push(mixin);
return qx.Mixin.checkCompatibility(list);
},getByName:function(name){return this.$$registry[name];
},isDefined:function(name){return this.getByName(name)!==undefined;
},getTotalNumber:function(){return qx.Bootstrap.objectGetLength(this.$$registry);
},flatten:function(mixins){if(!mixins){return [];
}var list=mixins.concat();

for(var i=0,l=mixins.length;i<l;i++){if(mixins[i].$$includes){list.push.apply(list,this.flatten(mixins[i].$$includes));
}}return list;
},genericToString:function(){return "[Mixin "+this.name+"]";
},$$registry:{},__allowedKeys:null,__validateConfig:function(){}}});
qx.Bootstrap.define("qx.core.Property",{statics:{__checks:{"Boolean":'qx.core.Assert.assertBoolean(value, msg) || true',"String":'qx.core.Assert.assertString(value, msg) || true',"Number":'qx.core.Assert.assertNumber(value, msg) || true',"Integer":'qx.core.Assert.assertInteger(value, msg) || true',"PositiveNumber":'qx.core.Assert.assertPositiveNumber(value, msg) || true',"PositiveInteger":'qx.core.Assert.assertPositiveInteger(value, msg) || true',"Error":'qx.core.Assert.assertInstance(value, Error, msg) || true',"RegExp":'qx.core.Assert.assertInstance(value, RegExp, msg) || true',"Object":'qx.core.Assert.assertObject(value, msg) || true',"Array":'qx.core.Assert.assertArray(value, msg) || true',"Map":'qx.core.Assert.assertMap(value, msg) || true',"Function":'qx.core.Assert.assertFunction(value, msg) || true',"Date":'qx.core.Assert.assertInstance(value, Date, msg) || true',"Node":'value !== null && value.nodeType !== undefined',"Element":'value !== null && value.nodeType === 1 && value.attributes',"Document":'value !== null && value.nodeType === 9 && value.documentElement',"Window":'value !== null && value.document',"Event":'value !== null && value.type !== undefined',"Class":'value !== null && value.$$type === "Class"',"Mixin":'value !== null && value.$$type === "Mixin"',"Interface":'value !== null && value.$$type === "Interface"',"Theme":'value !== null && value.$$type === "Theme"',"Color":'qx.lang.Type.isString(value) && qx.util.ColorUtil.isValidPropertyValue(value)',"Decorator":'value !== null && qx.theme.manager.Decoration.getInstance().isValidPropertyValue(value)',"Font":'value !== null && qx.theme.manager.Font.getInstance().isDynamic(value)'},__dereference:{"Node":true,"Element":true,"Document":true,"Window":true,"Event":true},$$inherit:"inherit",$$store:{runtime:{},user:{},theme:{},inherit:{},init:{},useinit:{}},$$method:{get:{},set:{},reset:{},init:{},refresh:{},setRuntime:{},resetRuntime:{},setThemed:{},resetThemed:{}},$$allowedKeys:{name:"string",dereference:"boolean",inheritable:"boolean",nullable:"boolean",themeable:"boolean",refine:"boolean",init:null,apply:"string",event:"string",check:null,transform:"string",deferredInit:"boolean",validate:null},$$allowedGroupKeys:{name:"string",group:"object",mode:"string",themeable:"boolean"},$$inheritable:{},__executeOptimizedRefresh:function(clazz){var inheritables=this.__getInheritablesOfClass(clazz);

if(!inheritables.length){var refresher=qx.lang.Function.empty;
}else{refresher=this.__createRefresher(inheritables);
}clazz.prototype.$$refreshInheritables=refresher;
},__getInheritablesOfClass:function(clazz){var inheritable=[];

while(clazz){var properties=clazz.$$properties;

if(properties){for(var name in this.$$inheritable){if(properties[name]&&properties[name].inheritable){inheritable.push(name);
}}}clazz=clazz.superclass;
}return inheritable;
},__createRefresher:function(inheritables){var inherit=this.$$store.inherit;
var init=this.$$store.init;
var refresh=this.$$method.refresh;
var code=["var parent = this.getLayoutParent();","if (!parent) return;"];

for(var i=0,l=inheritables.length;i<l;i++){var name=inheritables[i];
code.push("var value = parent.",inherit[name],";","if (value===undefined) value = parent.",init[name],";","this.",refresh[name],"(value);");
}return new Function(code.join(""));
},attachRefreshInheritables:function(clazz){clazz.prototype.$$refreshInheritables=function(){qx.core.Property.__executeOptimizedRefresh(clazz);
return this.$$refreshInheritables();
};
},attachMethods:function(clazz,name,config){config.group?this.__attachGroupMethods(clazz,config,name):this.__attachPropertyMethods(clazz,config,name);
},__attachGroupMethods:function(clazz,config,name){var upname=qx.Bootstrap.firstUp(name);
var members=clazz.prototype;
var themeable=config.themeable===true;
{};
var setter=[];
var resetter=[];

if(themeable){var styler=[];
var unstyler=[];
}var argHandler="var a=arguments[0] instanceof Array?arguments[0]:arguments;";
setter.push(argHandler);

if(themeable){styler.push(argHandler);
}
if(config.mode=="shorthand"){var shorthand="a=qx.lang.Array.fromShortHand(qx.lang.Array.fromArguments(a));";
setter.push(shorthand);

if(themeable){styler.push(shorthand);
}}
for(var i=0,a=config.group,l=a.length;i<l;i++){{};
setter.push("this.",this.$$method.set[a[i]],"(a[",i,"]);");
resetter.push("this.",this.$$method.reset[a[i]],"();");

if(themeable){{};
styler.push("this.",this.$$method.setThemed[a[i]],"(a[",i,"]);");
unstyler.push("this.",this.$$method.resetThemed[a[i]],"();");
}}this.$$method.set[name]="set"+upname;
members[this.$$method.set[name]]=new Function(setter.join(""));
this.$$method.reset[name]="reset"+upname;
members[this.$$method.reset[name]]=new Function(resetter.join(""));

if(themeable){this.$$method.setThemed[name]="setThemed"+upname;
members[this.$$method.setThemed[name]]=new Function(styler.join(""));
this.$$method.resetThemed[name]="resetThemed"+upname;
members[this.$$method.resetThemed[name]]=new Function(unstyler.join(""));
}},__attachPropertyMethods:function(clazz,config,name){var upname=qx.Bootstrap.firstUp(name);
var members=clazz.prototype;
{};
if(config.dereference===undefined&&typeof config.check==="string"){config.dereference=this.__shouldBeDereferenced(config.check);
}var method=this.$$method;
var store=this.$$store;
store.runtime[name]="$$runtime_"+name;
store.user[name]="$$user_"+name;
store.theme[name]="$$theme_"+name;
store.init[name]="$$init_"+name;
store.inherit[name]="$$inherit_"+name;
store.useinit[name]="$$useinit_"+name;
method.get[name]="get"+upname;
members[method.get[name]]=function(){return qx.core.Property.executeOptimizedGetter(this,clazz,name,"get");
};
method.set[name]="set"+upname;
members[method.set[name]]=function(value){return qx.core.Property.executeOptimizedSetter(this,clazz,name,"set",arguments);
};
method.reset[name]="reset"+upname;
members[method.reset[name]]=function(){return qx.core.Property.executeOptimizedSetter(this,clazz,name,"reset");
};

if(config.inheritable||config.apply||config.event||config.deferredInit){method.init[name]="init"+upname;
members[method.init[name]]=function(value){return qx.core.Property.executeOptimizedSetter(this,clazz,name,"init",arguments);
};
}
if(config.inheritable){method.refresh[name]="refresh"+upname;
members[method.refresh[name]]=function(value){return qx.core.Property.executeOptimizedSetter(this,clazz,name,"refresh",arguments);
};
}method.setRuntime[name]="setRuntime"+upname;
members[method.setRuntime[name]]=function(value){return qx.core.Property.executeOptimizedSetter(this,clazz,name,"setRuntime",arguments);
};
method.resetRuntime[name]="resetRuntime"+upname;
members[method.resetRuntime[name]]=function(){return qx.core.Property.executeOptimizedSetter(this,clazz,name,"resetRuntime");
};

if(config.themeable){method.setThemed[name]="setThemed"+upname;
members[method.setThemed[name]]=function(value){return qx.core.Property.executeOptimizedSetter(this,clazz,name,"setThemed",arguments);
};
method.resetThemed[name]="resetThemed"+upname;
members[method.resetThemed[name]]=function(){return qx.core.Property.executeOptimizedSetter(this,clazz,name,"resetThemed");
};
}
if(config.check==="Boolean"){members["toggle"+upname]=new Function("return this."+method.set[name]+"(!this."+method.get[name]+"())");
members["is"+upname]=new Function("return this."+method.get[name]+"()");
}},__shouldBeDereferenced:function(check){return !!this.__dereference[check];
},__shouldBeDereferencedOld:function(check){return this.__dereference[check]||qx.Bootstrap.classIsDefined(check)||(qx.Interface&&qx.Interface.isDefined(check));
},__errors:{0:'Could not change or apply init value after constructing phase!',1:'Requires exactly one argument!',2:'Undefined value is not allowed!',3:'Does not allow any arguments!',4:'Null value is not allowed!',5:'Is invalid!'},error:function(obj,id,property,variant,value){var classname=obj.constructor.classname;
var msg="Error in property "+property+" of class "+classname+" in method "+this.$$method[variant][property]+" with incoming value '"+value+"': ";
throw new Error(msg+(this.__errors[id]||"Unknown reason: "+id));
},__unwrapFunctionFromCode:function(instance,members,name,variant,code,args){var store=this.$$method[variant][name];
{members[store]=new Function("value",code.join(""));
};
{};
qx.Bootstrap.setDisplayName(members[store],instance.classname+".prototype",store);
if(args===undefined){return instance[store]();
}else{return instance[store](args[0]);
}},executeOptimizedGetter:function(instance,clazz,name,variant){var config=clazz.$$properties[name];
var members=clazz.prototype;
var code=[];
var store=this.$$store;
code.push('if(this.',store.runtime[name],'!==undefined)');
code.push('return this.',store.runtime[name],';');

if(config.inheritable){code.push('else if(this.',store.inherit[name],'!==undefined)');
code.push('return this.',store.inherit[name],';');
code.push('else ');
}code.push('if(this.',store.user[name],'!==undefined)');
code.push('return this.',store.user[name],';');

if(config.themeable){code.push('else if(this.',store.theme[name],'!==undefined)');
code.push('return this.',store.theme[name],';');
}
if(config.deferredInit&&config.init===undefined){code.push('else if(this.',store.init[name],'!==undefined)');
code.push('return this.',store.init[name],';');
}code.push('else ');

if(config.init!==undefined){if(config.inheritable){code.push('var init=this.',store.init[name],';');

if(config.nullable){code.push('if(init==qx.core.Property.$$inherit)init=null;');
}else if(config.init!==undefined){code.push('return this.',store.init[name],';');
}else{code.push('if(init==qx.core.Property.$$inherit)throw new Error("Inheritable property ',name,' of an instance of ',clazz.classname,' is not (yet) ready!");');
}code.push('return init;');
}else{code.push('return this.',store.init[name],';');
}}else if(config.inheritable||config.nullable){code.push('return null;');
}else{code.push('throw new Error("Property ',name,' of an instance of ',clazz.classname,' is not (yet) ready!");');
}return this.__unwrapFunctionFromCode(instance,members,name,variant,code);
},executeOptimizedSetter:function(instance,clazz,name,variant,args){var config=clazz.$$properties[name];
var members=clazz.prototype;
var code=[];
var incomingValue=variant==="set"||variant==="setThemed"||variant==="setRuntime"||(variant==="init"&&config.init===undefined);
var hasCallback=config.apply||config.event||config.inheritable;
var store=this.__getStore(variant,name);
this.__emitSetterPreConditions(code,config,name,variant,incomingValue);

if(incomingValue){this.__emitIncomingValueTransformation(code,clazz,config,name);
}
if(hasCallback){this.__emitOldNewComparison(code,incomingValue,store,variant);
}
if(config.inheritable){code.push('var inherit=prop.$$inherit;');
}{};

if(!hasCallback){this.__emitStoreValue(code,name,variant,incomingValue);
}else{this.__emitStoreComputedAndOldValue(code,config,name,variant,incomingValue);
}
if(config.inheritable){this.__emitStoreInheritedPropertyValue(code,config,name,variant);
}else if(hasCallback){this.__emitNormalizeUndefinedValues(code,config,name,variant);
}
if(hasCallback){this.__emitCallCallback(code,config,name);
if(config.inheritable&&members._getChildren){this.__emitRefreshChildrenValue(code,name);
}}if(incomingValue){code.push('return value;');
}return this.__unwrapFunctionFromCode(instance,members,name,variant,code,args);
},__getStore:function(variant,name){if(variant==="setRuntime"||variant==="resetRuntime"){var store=this.$$store.runtime[name];
}else if(variant==="setThemed"||variant==="resetThemed"){store=this.$$store.theme[name];
}else if(variant==="init"){store=this.$$store.init[name];
}else{store=this.$$store.user[name];
}return store;
},__emitSetterPreConditions:function(code,config,name,variant,incomingValue){{if(!config.nullable||config.check||config.inheritable){code.push('var prop=qx.core.Property;');
}if(variant==="set"){code.push('if(value===undefined)prop.error(this,2,"',name,'","',variant,'",value);');
}};
},__emitIncomingValueTransformation:function(code,clazz,config,name){if(config.transform){code.push('value=this.',config.transform,'(value);');
}if(config.validate){if(typeof config.validate==="string"){code.push('this.',config.validate,'(value);');
}else if(config.validate instanceof Function){code.push(clazz.classname,'.$$properties.',name);
code.push('.validate.call(this, value);');
}}},__emitOldNewComparison:function(code,incomingValue,store,variant){var resetValue=(variant==="reset"||variant==="resetThemed"||variant==="resetRuntime");

if(incomingValue){code.push('if(this.',store,'===value)return value;');
}else if(resetValue){code.push('if(this.',store,'===undefined)return;');
}},__emitIncomingValueValidation:undefined,__emitStoreValue:function(code,name,variant,incomingValue){if(variant==="setRuntime"){code.push('this.',this.$$store.runtime[name],'=value;');
}else if(variant==="resetRuntime"){code.push('if(this.',this.$$store.runtime[name],'!==undefined)');
code.push('delete this.',this.$$store.runtime[name],';');
}else if(variant==="set"){code.push('this.',this.$$store.user[name],'=value;');
}else if(variant==="reset"){code.push('if(this.',this.$$store.user[name],'!==undefined)');
code.push('delete this.',this.$$store.user[name],';');
}else if(variant==="setThemed"){code.push('this.',this.$$store.theme[name],'=value;');
}else if(variant==="resetThemed"){code.push('if(this.',this.$$store.theme[name],'!==undefined)');
code.push('delete this.',this.$$store.theme[name],';');
}else if(variant==="init"&&incomingValue){code.push('this.',this.$$store.init[name],'=value;');
}},__emitStoreComputedAndOldValue:function(code,config,name,variant,incomingValue){if(config.inheritable){code.push('var computed, old=this.',this.$$store.inherit[name],';');
}else{code.push('var computed, old;');
}code.push('if(this.',this.$$store.runtime[name],'!==undefined){');

if(variant==="setRuntime"){code.push('computed=this.',this.$$store.runtime[name],'=value;');
}else if(variant==="resetRuntime"){code.push('delete this.',this.$$store.runtime[name],';');
code.push('if(this.',this.$$store.user[name],'!==undefined)');
code.push('computed=this.',this.$$store.user[name],';');
code.push('else if(this.',this.$$store.theme[name],'!==undefined)');
code.push('computed=this.',this.$$store.theme[name],';');
code.push('else if(this.',this.$$store.init[name],'!==undefined){');
code.push('computed=this.',this.$$store.init[name],';');
code.push('this.',this.$$store.useinit[name],'=true;');
code.push('}');
}else{code.push('old=computed=this.',this.$$store.runtime[name],';');
if(variant==="set"){code.push('this.',this.$$store.user[name],'=value;');
}else if(variant==="reset"){code.push('delete this.',this.$$store.user[name],';');
}else if(variant==="setThemed"){code.push('this.',this.$$store.theme[name],'=value;');
}else if(variant==="resetThemed"){code.push('delete this.',this.$$store.theme[name],';');
}else if(variant==="init"&&incomingValue){code.push('this.',this.$$store.init[name],'=value;');
}}code.push('}');
code.push('else if(this.',this.$$store.user[name],'!==undefined){');

if(variant==="set"){if(!config.inheritable){code.push('old=this.',this.$$store.user[name],';');
}code.push('computed=this.',this.$$store.user[name],'=value;');
}else if(variant==="reset"){if(!config.inheritable){code.push('old=this.',this.$$store.user[name],';');
}code.push('delete this.',this.$$store.user[name],';');
code.push('if(this.',this.$$store.runtime[name],'!==undefined)');
code.push('computed=this.',this.$$store.runtime[name],';');
code.push('if(this.',this.$$store.theme[name],'!==undefined)');
code.push('computed=this.',this.$$store.theme[name],';');
code.push('else if(this.',this.$$store.init[name],'!==undefined){');
code.push('computed=this.',this.$$store.init[name],';');
code.push('this.',this.$$store.useinit[name],'=true;');
code.push('}');
}else{if(variant==="setRuntime"){code.push('computed=this.',this.$$store.runtime[name],'=value;');
}else if(config.inheritable){code.push('computed=this.',this.$$store.user[name],';');
}else{code.push('old=computed=this.',this.$$store.user[name],';');
}if(variant==="setThemed"){code.push('this.',this.$$store.theme[name],'=value;');
}else if(variant==="resetThemed"){code.push('delete this.',this.$$store.theme[name],';');
}else if(variant==="init"&&incomingValue){code.push('this.',this.$$store.init[name],'=value;');
}}code.push('}');
if(config.themeable){code.push('else if(this.',this.$$store.theme[name],'!==undefined){');

if(!config.inheritable){code.push('old=this.',this.$$store.theme[name],';');
}
if(variant==="setRuntime"){code.push('computed=this.',this.$$store.runtime[name],'=value;');
}else if(variant==="set"){code.push('computed=this.',this.$$store.user[name],'=value;');
}else if(variant==="setThemed"){code.push('computed=this.',this.$$store.theme[name],'=value;');
}else if(variant==="resetThemed"){code.push('delete this.',this.$$store.theme[name],';');
code.push('if(this.',this.$$store.init[name],'!==undefined){');
code.push('computed=this.',this.$$store.init[name],';');
code.push('this.',this.$$store.useinit[name],'=true;');
code.push('}');
}else if(variant==="init"){if(incomingValue){code.push('this.',this.$$store.init[name],'=value;');
}code.push('computed=this.',this.$$store.theme[name],';');
}else if(variant==="refresh"){code.push('computed=this.',this.$$store.theme[name],';');
}code.push('}');
}code.push('else if(this.',this.$$store.useinit[name],'){');

if(!config.inheritable){code.push('old=this.',this.$$store.init[name],';');
}
if(variant==="init"){if(incomingValue){code.push('computed=this.',this.$$store.init[name],'=value;');
}else{code.push('computed=this.',this.$$store.init[name],';');
}}else if(variant==="set"||variant==="setRuntime"||variant==="setThemed"||variant==="refresh"){code.push('delete this.',this.$$store.useinit[name],';');

if(variant==="setRuntime"){code.push('computed=this.',this.$$store.runtime[name],'=value;');
}else if(variant==="set"){code.push('computed=this.',this.$$store.user[name],'=value;');
}else if(variant==="setThemed"){code.push('computed=this.',this.$$store.theme[name],'=value;');
}else if(variant==="refresh"){code.push('computed=this.',this.$$store.init[name],';');
}}code.push('}');
if(variant==="set"||variant==="setRuntime"||variant==="setThemed"||variant==="init"){code.push('else{');

if(variant==="setRuntime"){code.push('computed=this.',this.$$store.runtime[name],'=value;');
}else if(variant==="set"){code.push('computed=this.',this.$$store.user[name],'=value;');
}else if(variant==="setThemed"){code.push('computed=this.',this.$$store.theme[name],'=value;');
}else if(variant==="init"){if(incomingValue){code.push('computed=this.',this.$$store.init[name],'=value;');
}else{code.push('computed=this.',this.$$store.init[name],';');
}code.push('this.',this.$$store.useinit[name],'=true;');
}code.push('}');
}},__emitStoreInheritedPropertyValue:function(code,config,name,variant){code.push('if(computed===undefined||computed===inherit){');

if(variant==="refresh"){code.push('computed=value;');
}else{code.push('var pa=this.getLayoutParent();if(pa)computed=pa.',this.$$store.inherit[name],';');
}code.push('if((computed===undefined||computed===inherit)&&');
code.push('this.',this.$$store.init[name],'!==undefined&&');
code.push('this.',this.$$store.init[name],'!==inherit){');
code.push('computed=this.',this.$$store.init[name],';');
code.push('this.',this.$$store.useinit[name],'=true;');
code.push('}else{');
code.push('delete this.',this.$$store.useinit[name],';}');
code.push('}');
code.push('if(old===computed)return value;');
code.push('if(computed===inherit){');
code.push('computed=undefined;delete this.',this.$$store.inherit[name],';');
code.push('}');
code.push('else if(computed===undefined)');
code.push('delete this.',this.$$store.inherit[name],';');
code.push('else this.',this.$$store.inherit[name],'=computed;');
code.push('var backup=computed;');
if(config.init!==undefined&&variant!=="init"){code.push('if(old===undefined)old=this.',this.$$store.init[name],";");
}else{code.push('if(old===undefined)old=null;');
}code.push('if(computed===undefined||computed==inherit)computed=null;');
},__emitNormalizeUndefinedValues:function(code,config,name,variant){if(variant!=="set"&&variant!=="setRuntime"&&variant!=="setThemed"){code.push('if(computed===undefined)computed=null;');
}code.push('if(old===computed)return value;');
if(config.init!==undefined&&variant!=="init"){code.push('if(old===undefined)old=this.',this.$$store.init[name],";");
}else{code.push('if(old===undefined)old=null;');
}},__emitCallCallback:function(code,config,name){if(config.apply){code.push('this.',config.apply,'(computed, old, "',name,'");');
}if(config.event){code.push("var reg=qx.event.Registration;","if(reg.hasListener(this, '",config.event,"')){","reg.fireEvent(this, '",config.event,"', qx.event.type.Data, [computed, old]",")}");
}},__emitRefreshChildrenValue:function(code,name){code.push('var a=this._getChildren();if(a)for(var i=0,l=a.length;i<l;i++){');
code.push('if(a[i].',this.$$method.refresh[name],')a[i].',this.$$method.refresh[name],'(backup);');
code.push('}');
}},defer:function(statics){var ie6=navigator.userAgent.indexOf("MSIE 6.0")!=-1;
var ff2=navigator.userAgent.indexOf("rv:1.8.1")!=-1;
if(ie6||ff2){statics.__shouldBeDereferenced=statics.__shouldBeDereferencedOld;
}}});
qx.Bootstrap.define("qx.lang.Core",{statics:{errorToString:{"native":Error.prototype.toString,"emulated":function(){return this.message;
}}[(!Error.prototype.toString||Error.prototype.toString()=="[object Error]")?"emulated":"native"],arrayIndexOf:{"native":Array.prototype.indexOf,"emulated":function(searchElement,fromIndex){if(fromIndex==null){fromIndex=0;
}else if(fromIndex<0){fromIndex=Math.max(0,this.length+fromIndex);
}
for(var i=fromIndex;i<this.length;i++){if(this[i]===searchElement){return i;
}}return -1;
}}[Array.prototype.indexOf?"native":"emulated"],arrayLastIndexOf:{"native":Array.prototype.lastIndexOf,"emulated":function(searchElement,fromIndex){if(fromIndex==null){fromIndex=this.length-1;
}else if(fromIndex<0){fromIndex=Math.max(0,this.length+fromIndex);
}
for(var i=fromIndex;i>=0;i--){if(this[i]===searchElement){return i;
}}return -1;
}}[Array.prototype.lastIndexOf?"native":"emulated"],arrayForEach:{"native":Array.prototype.forEach,"emulated":function(callback,obj){var l=this.length;

for(var i=0;i<l;i++){var value=this[i];

if(value!==undefined){callback.call(obj||window,value,i,this);
}}}}[Array.prototype.forEach?"native":"emulated"],arrayFilter:{"native":Array.prototype.filter,"emulated":function(callback,obj){var res=[];
var l=this.length;

for(var i=0;i<l;i++){var value=this[i];

if(value!==undefined){if(callback.call(obj||window,value,i,this)){res.push(this[i]);
}}}return res;
}}[Array.prototype.filter?"native":"emulated"],arrayMap:{"native":Array.prototype.map,"emulated":function(callback,obj){var res=[];
var l=this.length;

for(var i=0;i<l;i++){var value=this[i];

if(value!==undefined){res[i]=callback.call(obj||window,value,i,this);
}}return res;
}}[Array.prototype.map?"native":"emulated"],arraySome:{"native":Array.prototype.some,"emulated":function(callback,obj){var l=this.length;

for(var i=0;i<l;i++){var value=this[i];

if(value!==undefined){if(callback.call(obj||window,value,i,this)){return true;
}}}return false;
}}[Array.prototype.some?"native":"emulated"],arrayEvery:{"native":Array.prototype.every,"emulated":function(callback,obj){var l=this.length;

for(var i=0;i<l;i++){var value=this[i];

if(value!==undefined){if(!callback.call(obj||window,value,i,this)){return false;
}}}return true;
}}[Array.prototype.every?"native":"emulated"],stringQuote:{"native":String.prototype.quote,"emulated":function(){return '"'+this.replace(/\\/g,"\\\\").replace(/\"/g,"\\\"")+'"';
}}[String.prototype.quote?"native":"emulated"]}});
Error.prototype.toString=qx.lang.Core.errorToString;
Array.prototype.indexOf=qx.lang.Core.arrayIndexOf;
Array.prototype.lastIndexOf=qx.lang.Core.arrayLastIndexOf;
Array.prototype.forEach=qx.lang.Core.arrayForEach;
Array.prototype.filter=qx.lang.Core.arrayFilter;
Array.prototype.map=qx.lang.Core.arrayMap;
Array.prototype.some=qx.lang.Core.arraySome;
Array.prototype.every=qx.lang.Core.arrayEvery;
String.prototype.quote=qx.lang.Core.stringQuote;
qx.Bootstrap.define("qx.Class",{statics:{define:function(name,config){if(!config){var config={};
}if(config.include&&!(config.include instanceof Array)){config.include=[config.include];
}if(config.implement&&!(config.implement instanceof Array)){config.implement=[config.implement];
}var implicitType=false;

if(!config.hasOwnProperty("extend")&&!config.type){config.type="static";
implicitType=true;
}{};
var clazz=this.__createClass(name,config.type,config.extend,config.statics,config.construct,config.destruct,config.include);
if(config.extend){if(config.properties){this.__addProperties(clazz,config.properties,true);
}if(config.members){this.__addMembers(clazz,config.members,true,true,false);
}if(config.events){this.__addEvents(clazz,config.events,true);
}if(config.include){for(var i=0,l=config.include.length;i<l;i++){this.__addMixin(clazz,config.include[i],false);
}}}if(config.settings){for(var key in config.settings){qx.core.Setting.define(key,config.settings[key]);
}}if(config.variants){for(var key in config.variants){qx.core.Variant.define(key,config.variants[key].allowedValues,config.variants[key].defaultValue);
}}if(config.implement){for(var i=0,l=config.implement.length;i<l;i++){this.__addInterface(clazz,config.implement[i]);
}}{};
if(config.defer){config.defer.self=clazz;
config.defer(clazz,clazz.prototype,{add:function(name,config){var properties={};
properties[name]=config;
qx.Class.__addProperties(clazz,properties,true);
}});
}return clazz;
},undefine:function(name){delete this.$$registry[name];
var ns=name.split(".");
var objects=[window];

for(var i=0;i<ns.length;i++){objects.push(objects[i][ns[i]]);
}for(var i=objects.length-1;i>=1;i--){var last=objects[i];
var parent=objects[i-1];

if(qx.Bootstrap.isFunction(last)||qx.Bootstrap.objectGetLength(last)===0){delete parent[ns[i-1]];
}else{break;
}}},isDefined:qx.Bootstrap.classIsDefined,getTotalNumber:function(){return qx.Bootstrap.objectGetLength(this.$$registry);
},getByName:qx.Bootstrap.getByName,include:function(clazz,mixin){{};
qx.Class.__addMixin(clazz,mixin,false);
},patch:function(clazz,mixin){{};
qx.Class.__addMixin(clazz,mixin,true);
},isSubClassOf:function(clazz,superClass){if(!clazz){return false;
}
if(clazz==superClass){return true;
}
if(clazz.prototype instanceof superClass){return true;
}return false;
},getPropertyDefinition:qx.Bootstrap.getPropertyDefinition,getProperties:function(clazz){var list=[];

while(clazz){if(clazz.$$properties){list.push.apply(list,qx.Bootstrap.getKeys(clazz.$$properties));
}clazz=clazz.superclass;
}return list;
},getByProperty:function(clazz,name){while(clazz){if(clazz.$$properties&&clazz.$$properties[name]){return clazz;
}clazz=clazz.superclass;
}return null;
},hasProperty:qx.Bootstrap.hasProperty,getEventType:qx.Bootstrap.getEventType,supportsEvent:qx.Bootstrap.supportsEvent,hasOwnMixin:function(clazz,mixin){return clazz.$$includes&&clazz.$$includes.indexOf(mixin)!==-1;
},getByMixin:function(clazz,mixin){var list,i,l;

while(clazz){if(clazz.$$includes){list=clazz.$$flatIncludes;

for(i=0,l=list.length;i<l;i++){if(list[i]===mixin){return clazz;
}}}clazz=clazz.superclass;
}return null;
},getMixins:qx.Bootstrap.getMixins,hasMixin:function(clazz,mixin){return !!this.getByMixin(clazz,mixin);
},hasOwnInterface:function(clazz,iface){return clazz.$$implements&&clazz.$$implements.indexOf(iface)!==-1;
},getByInterface:qx.Bootstrap.getByInterface,getInterfaces:function(clazz){var list=[];

while(clazz){if(clazz.$$implements){list.push.apply(list,clazz.$$flatImplements);
}clazz=clazz.superclass;
}return list;
},hasInterface:qx.Bootstrap.hasInterface,implementsInterface:function(obj,iface){var clazz=obj.constructor;

if(this.hasInterface(clazz,iface)){return true;
}
try{qx.Interface.assertObject(obj,iface);
return true;
}catch(ex){}
try{qx.Interface.assert(clazz,iface,false);
return true;
}catch(ex){}return false;
},getInstance:function(){if(!this.$$instance){this.$$allowconstruct=true;
this.$$instance=new this;
delete this.$$allowconstruct;
}return this.$$instance;
},genericToString:function(){return "[Class "+this.classname+"]";
},$$registry:qx.Bootstrap.$$registry,__allowedKeys:null,__staticAllowedKeys:null,__validateConfig:function(){},__validateAbstractInterfaces:function(){},__createClass:function(name,type,extend,statics,construct,destruct,mixins){var clazz;

if(!extend&&true){clazz=statics||{};
qx.Bootstrap.setDisplayNames(clazz,name);
}else{var clazz={};

if(extend){if(!construct){construct=this.__createDefaultConstructor();
}
if(this.__needsConstructorWrapper(extend,mixins)){clazz=this.__wrapConstructor(construct,name,type);
}else{clazz=construct;
}if(type==="singleton"){clazz.getInstance=this.getInstance;
}qx.Bootstrap.setDisplayName(construct,name,"constructor");
}if(statics){qx.Bootstrap.setDisplayNames(statics,name);
var key;

for(var i=0,a=qx.Bootstrap.getKeys(statics),l=a.length;i<l;i++){key=a[i];
var staticValue=statics[key];
{clazz[key]=staticValue;
};
}}}var basename=qx.Bootstrap.createNamespace(name,clazz);
clazz.name=clazz.classname=name;
clazz.basename=basename;
clazz.$$type="Class";

if(type){clazz.$$classtype=type;
}if(!clazz.hasOwnProperty("toString")){clazz.toString=this.genericToString;
}
if(extend){qx.Bootstrap.extendClass(clazz,construct,extend,name,basename);
if(destruct){{};
clazz.$$destructor=destruct;
qx.Bootstrap.setDisplayName(destruct,name,"destruct");
}}this.$$registry[name]=clazz;
return clazz;
},__addEvents:function(clazz,events,patch){var key,key;
{};

if(clazz.$$events){for(var key in events){clazz.$$events[key]=events[key];
}}else{clazz.$$events=events;
}},__addProperties:function(clazz,properties,patch){var config;

if(patch===undefined){patch=false;
}var proto=clazz.prototype;

for(var name in properties){config=properties[name];
{};
config.name=name;
if(!config.refine){if(clazz.$$properties===undefined){clazz.$$properties={};
}clazz.$$properties[name]=config;
}if(config.init!==undefined){clazz.prototype["$$init_"+name]=config.init;
}if(config.event!==undefined){var event={};
event[config.event]="qx.event.type.Data";
this.__addEvents(clazz,event,patch);
}if(config.inheritable){qx.core.Property.$$inheritable[name]=true;

if(!proto.$$refreshInheritables){qx.core.Property.attachRefreshInheritables(clazz);
}}
if(!config.refine){qx.core.Property.attachMethods(clazz,name,config);
}}},__validateProperty:null,__addMembers:function(clazz,members,patch,base,wrap){var proto=clazz.prototype;
var key,member;
qx.Bootstrap.setDisplayNames(members,clazz.classname+".prototype");

for(var i=0,a=qx.Bootstrap.getKeys(members),l=a.length;i<l;i++){key=a[i];
member=members[key];
{};
if(base!==false&&member instanceof Function&&member.$$type==null){if(wrap==true){member=this.__mixinMemberWrapper(member,proto[key]);
}else{if(proto[key]){member.base=proto[key];
}member.self=clazz;
}{};
}proto[key]=member;
}},__mixinMemberWrapper:function(member,base){if(base){return function(){var oldBase=member.base;
member.base=base;
var retval=member.apply(this,arguments);
member.base=oldBase;
return retval;
};
}else{return member;
}},__addInterface:function(clazz,iface){{};
var list=qx.Interface.flatten([iface]);

if(clazz.$$implements){clazz.$$implements.push(iface);
clazz.$$flatImplements.push.apply(clazz.$$flatImplements,list);
}else{clazz.$$implements=[iface];
clazz.$$flatImplements=list;
}},__retrospectWrapConstruct:function(clazz){var name=clazz.classname;
var wrapper=this.__wrapConstructor(clazz,name,clazz.$$classtype);
for(var i=0,a=qx.Bootstrap.getKeys(clazz),l=a.length;i<l;i++){key=a[i];
wrapper[key]=clazz[key];
}wrapper.prototype=clazz.prototype;
var members=clazz.prototype;

for(var i=0,a=qx.Bootstrap.getKeys(members),l=a.length;i<l;i++){key=a[i];
var method=members[key];
if(method&&method.self==clazz){method.self=wrapper;
}}for(var key in this.$$registry){var construct=this.$$registry[key];

if(!construct){continue;
}
if(construct.base==clazz){construct.base=wrapper;
}
if(construct.superclass==clazz){construct.superclass=wrapper;
}
if(construct.$$original){if(construct.$$original.base==clazz){construct.$$original.base=wrapper;
}
if(construct.$$original.superclass==clazz){construct.$$original.superclass=wrapper;
}}}qx.Bootstrap.createNamespace(name,wrapper);
this.$$registry[name]=wrapper;
return wrapper;
},__addMixin:function(clazz,mixin,patch){{};

if(this.hasMixin(clazz,mixin)){return;
}var isConstructorWrapped=clazz.$$original;

if(mixin.$$constructor&&!isConstructorWrapped){clazz=this.__retrospectWrapConstruct(clazz);
}var list=qx.Mixin.flatten([mixin]);
var entry;

for(var i=0,l=list.length;i<l;i++){entry=list[i];
if(entry.$$events){this.__addEvents(clazz,entry.$$events,patch);
}if(entry.$$properties){this.__addProperties(clazz,entry.$$properties,patch);
}if(entry.$$members){this.__addMembers(clazz,entry.$$members,patch,patch,patch);
}}if(clazz.$$includes){clazz.$$includes.push(mixin);
clazz.$$flatIncludes.push.apply(clazz.$$flatIncludes,list);
}else{clazz.$$includes=[mixin];
clazz.$$flatIncludes=list;
}},__createDefaultConstructor:function(){function defaultConstructor(){defaultConstructor.base.apply(this,arguments);
}return defaultConstructor;
},__createEmptyFunction:function(){return function(){};
},__needsConstructorWrapper:function(base,mixins){{};
if(base&&base.$$includes){var baseMixins=base.$$flatIncludes;

for(var i=0,l=baseMixins.length;i<l;i++){if(baseMixins[i].$$constructor){return true;
}}}if(mixins){var flatMixins=qx.Mixin.flatten(mixins);

for(var i=0,l=flatMixins.length;i<l;i++){if(flatMixins[i].$$constructor){return true;
}}}return false;
},__wrapConstructor:function(construct,name,type){var aspectWrapper;
var wrapper=function(){var clazz=wrapper;
{};
var retval=clazz.$$original.apply(this,arguments);
if(clazz.$$includes){var mixins=clazz.$$flatIncludes;

for(var i=0,l=mixins.length;i<l;i++){if(mixins[i].$$constructor){mixins[i].$$constructor.apply(this,arguments);
}}}{};
return retval;
};
{};
wrapper.$$original=construct;
construct.wrapper=wrapper;
return wrapper;
}},defer:function(){var classname,statics,key;
{};
}});
qx.Class.define("qx.core.ObjectRegistry",{statics:{inShutDown:false,__registry:{},__nextHash:0,__freeHashes:[],register:function(obj){var registry=this.__registry;

if(!registry){return;
}var hash=obj.$$hash;

if(hash==null){var cache=this.__freeHashes;

if(cache.length>0){hash=cache.pop();
}else{hash=(this.__nextHash++)+"";
}obj.$$hash=hash;
}{};
registry[hash]=obj;
},unregister:function(obj){var hash=obj.$$hash;

if(hash==null){return;
}var registry=this.__registry;

if(registry&&registry[hash]){delete registry[hash];
this.__freeHashes.push(hash);
}try{delete obj.$$hash;
}catch(ex){if(obj.removeAttribute){obj.removeAttribute("$$hash");
}}},toHashCode:function(obj){{};
var hash=obj.$$hash;

if(hash!=null){return hash;
}var cache=this.__freeHashes;

if(cache.length>0){hash=cache.pop();
}else{hash=(this.__nextHash++)+"";
}return obj.$$hash=hash;
},clearHashCode:function(obj){{};
var hash=obj.$$hash;

if(hash!=null){this.__freeHashes.push(hash);
try{delete obj.$$hash;
}catch(ex){if(obj.removeAttribute){obj.removeAttribute("$$hash");
}}}},fromHashCode:function(hash){return this.__registry[hash]||null;
},shutdown:function(){this.inShutDown=true;
var registry=this.__registry;
var hashes=[];

for(var hash in registry){hashes.push(hash);
}hashes.sort(function(a,b){return parseInt(b)-parseInt(a);
});
var obj,i=0,l=hashes.length;

while(true){try{for(;i<l;i++){hash=hashes[i];
obj=registry[hash];

if(obj&&obj.dispose){obj.dispose();
}}}catch(ex){qx.Bootstrap.error(this,"Could not dispose object "+obj.toString()+": "+ex);

if(i!==l){i++;
continue;
}}break;
}qx.Bootstrap.debug(this,"Disposed "+l+" objects");
delete this.__registry;
},getRegistry:function(){return this.__registry;
}}});
qx.Mixin.define("qx.data.MBinding",{members:{bind:function(sourcePropertyChain,targetObject,targetProperty,options){return qx.data.SingleValueBinding.bind(this,sourcePropertyChain,targetObject,targetProperty,options);
},removeBinding:function(id){qx.data.SingleValueBinding.removeBindingFromObject(this,id);
},removeAllBindings:function(){qx.data.SingleValueBinding.removeAllBindingsForObject(this);
},getBindings:function(){return qx.data.SingleValueBinding.getAllBindingsForObject(this);
}}});
qx.Bootstrap.define("qx.bom.client.Engine",{statics:{NAME:"",FULLVERSION:"0.0.0",VERSION:0.0,OPERA:false,WEBKIT:false,GECKO:false,MSHTML:false,UNKNOWN_ENGINE:false,UNKNOWN_VERSION:false,DOCUMENT_MODE:null,__init:function(){var engine="unknown";
var version="0.0.0";
var agent=window.navigator.userAgent;
var unknownEngine=false;
var unknownVersion=false;

if(window.opera&&Object.prototype.toString.call(window.opera)=="[object Opera]"){engine="opera";
this.OPERA=true;
if(/Opera[\s\/]([0-9]+)\.([0-9])([0-9]*)/.test(agent)){version=RegExp.$1+"."+RegExp.$2;

if(RegExp.$3!=""){version+="."+RegExp.$3;
}}else{unknownVersion=true;
version="9.6.0";
}}else if(window.navigator.userAgent.indexOf("AppleWebKit/")!=-1){engine="webkit";
this.WEBKIT=true;

if(/AppleWebKit\/([^ ]+)/.test(agent)){version=RegExp.$1;
var invalidCharacter=RegExp("[^\\.0-9]").exec(version);

if(invalidCharacter){version=version.slice(0,invalidCharacter.index);
}}else{unknownVersion=true;
version="525.26";
}}else if(window.controllers&&window.navigator.product==="Gecko"){engine="gecko";
this.GECKO=true;
if(/rv\:([^\);]+)(\)|;)/.test(agent)){version=RegExp.$1;
}else{unknownVersion=true;
version="1.9.0.0";
}}else if(window.navigator.cpuClass&&/MSIE\s+([^\);]+)(\)|;)/.test(agent)){engine="mshtml";
version=RegExp.$1;

if(document.documentMode){this.DOCUMENT_MODE=document.documentMode;
}if(version<8&&/Trident\/([^\);]+)(\)|;)/.test(agent)){if(RegExp.$1==="4.0"){version="8.0";
}}this.MSHTML=true;
}else{var failFunction=window.qxFail;

if(failFunction&&typeof failFunction==="function"){var engine=failFunction();

if(engine.NAME&&engine.FULLVERSION){engine=engine.NAME;
this[engine.toUpperCase()]=true;
version=engine.FULLVERSION;
}}else{unknownEngine=true;
unknownVersion=true;
version="1.9.0.0";
engine="gecko";
this.GECKO=true;
qx.Bootstrap.warn("Unsupported client: "+agent+"! Assumed gecko version 1.9.0.0 (Firefox 3.0).");
}}this.UNKNOWN_ENGINE=unknownEngine;
this.UNKNOWN_VERSION=unknownVersion;
this.NAME=engine;
this.FULLVERSION=version;
this.VERSION=parseFloat(version);
}},defer:function(statics){statics.__init();
}});
qx.Bootstrap.define("qx.core.Variant",{statics:{__variants:{},__cache:{},compilerIsSet:function(){return true;
},define:function(key,allowedValues,defaultValue){{};

if(!this.__variants[key]){this.__variants[key]={};
}else{}this.__variants[key].allowedValues=allowedValues;
this.__variants[key].defaultValue=defaultValue;
},get:function(key){var data=this.__variants[key];
{};

if(data.value!==undefined){return data.value;
}return data.defaultValue;
},__init:function(){if(window.qxvariants){for(var key in qxvariants){{};

if(!this.__variants[key]){this.__variants[key]={};
}this.__variants[key].value=qxvariants[key];
}window.qxvariants=undefined;

try{delete window.qxvariants;
}catch(ex){}this.__loadUrlVariants(this.__variants);
}},__loadUrlVariants:function(){if(qx.core.Setting.get("qx.allowUrlVariants")!=true){return;
}var urlVariants=document.location.search.slice(1).split("&");

for(var i=0;i<urlVariants.length;i++){var variant=urlVariants[i].split(":");

if(variant.length!=3||variant[0]!="qxvariant"){continue;
}var key=variant[1];

if(!this.__variants[key]){this.__variants[key]={};
}this.__variants[key].value=decodeURIComponent(variant[2]);
}},select:function(key,variantFunctionMap){{};

for(var variant in variantFunctionMap){if(this.isSet(key,variant)){return variantFunctionMap[variant];
}}
if(variantFunctionMap["default"]!==undefined){return variantFunctionMap["default"];
}{};
},isSet:function(key,variants){var access=key+"$"+variants;

if(this.__cache[access]!==undefined){return this.__cache[access];
}var retval=false;
if(variants.indexOf("|")<0){retval=this.get(key)===variants;
}else{var keyParts=variants.split("|");

for(var i=0,l=keyParts.length;i<l;i++){if(this.get(key)===keyParts[i]){retval=true;
break;
}}}this.__cache[access]=retval;
return retval;
},__isValidArray:function(v){return typeof v==="object"&&v!==null&&v instanceof Array;
},__isValidObject:function(v){return typeof v==="object"&&v!==null&&!(v instanceof Array);
},__arrayContains:function(arr,obj){for(var i=0,l=arr.length;i<l;i++){if(arr[i]==obj){return true;
}}return false;
}},defer:function(statics){statics.define("qx.client",["gecko","mshtml","opera","webkit"],qx.bom.client.Engine.NAME);
statics.define("qx.debug",["on","off"],"on");
statics.define("qx.aspects",["on","off"],"off");
statics.define("qx.dynlocale",["on","off"],"on");
statics.__init();
}});
qx.Class.define("qx.bom.Event",{statics:{addNativeListener:qx.core.Variant.select("qx.client",{"mshtml":function(target,type,listener){target.attachEvent("on"+type,listener);
},"default":function(target,type,listener){target.addEventListener(type,listener,false);
}}),removeNativeListener:qx.core.Variant.select("qx.client",{"mshtml":function(target,type,listener){try{target.detachEvent("on"+type,listener);
}catch(e){if(e.number!==-2146828218){throw e;
}}},"default":function(target,type,listener){target.removeEventListener(type,listener,false);
}}),getTarget:function(e){return e.target||e.srcElement;
},getRelatedTarget:qx.core.Variant.select("qx.client",{"mshtml":function(e){if(e.type==="mouseover"){return e.fromEvent;
}else{return e.toElement;
}},"gecko":function(e){try{e.relatedTarget&&e.relatedTarget.nodeType;
}catch(e){return null;
}return e.relatedTarget;
},"default":function(e){return e.relatedTarget;
}}),preventDefault:qx.core.Variant.select("qx.client",{"gecko":function(e){if(qx.bom.client.Engine.VERSION>=1.9&&e.type=="mousedown"&&e.button==2){return;
}e.preventDefault();
if(qx.bom.client.Engine.VERSION<1.9){try{e.keyCode=0;
}catch(ex){}}},"mshtml":function(e){try{e.keyCode=0;
}catch(ex){}e.returnValue=false;
},"default":function(e){e.preventDefault();
}}),stopPropagation:function(e){if(e.stopPropagation){e.stopPropagation();
}e.cancelBubble=true;
},fire:function(target,type){if(document.createEventObject){var evt=document.createEventObject();
return target.fireEvent("on"+type,evt);
}else{var evt=document.createEvent("HTMLEvents");
evt.initEvent(type,true,true);
return !target.dispatchEvent(evt);
}},supportsEvent:qx.core.Variant.select("qx.client",{"webkit":function(target,type){return target.hasOwnProperty("on"+type);
},"default":function(target,type){var eventName="on"+type;
var supportsEvent=(eventName in target);

if(!supportsEvent){supportsEvent=typeof target[eventName]=="function";

if(!supportsEvent&&target.setAttribute){target.setAttribute(eventName,"return;");
supportsEvent=typeof target[eventName]=="function";
target.removeAttribute(eventName);
}}return supportsEvent;
}})}});
qx.Class.define("qx.event.Manager",{extend:Object,construct:function(win,registration){this.__window=win;
this.__windowId=qx.core.ObjectRegistry.toHashCode(win);
this.__registration=registration;
if(win.qx!==qx){var self=this;
qx.bom.Event.addNativeListener(win,"unload",qx.event.GlobalError.observeMethod(function(){qx.bom.Event.removeNativeListener(win,"unload",arguments.callee);
self.dispose();
}));
}this.__listeners={};
this.__handlers={};
this.__dispatchers={};
this.__handlerCache={};
},statics:{__lastUnique:0,getNextUniqueId:function(){return (this.__lastUnique++)+"";
}},members:{__registration:null,__listeners:null,__dispatchers:null,__disposeWrapper:null,__handlers:null,__handlerCache:null,__window:null,__windowId:null,getWindow:function(){return this.__window;
},getWindowId:function(){return this.__windowId;
},getHandler:function(clazz){var handler=this.__handlers[clazz.classname];

if(handler){return handler;
}return this.__handlers[clazz.classname]=new clazz(this);
},getDispatcher:function(clazz){var dispatcher=this.__dispatchers[clazz.classname];

if(dispatcher){return dispatcher;
}return this.__dispatchers[clazz.classname]=new clazz(this,this.__registration);
},getListeners:function(target,type,capture){var targetKey=target.$$hash||qx.core.ObjectRegistry.toHashCode(target);
var targetMap=this.__listeners[targetKey];

if(!targetMap){return null;
}var entryKey=type+(capture?"|capture":"|bubble");
var entryList=targetMap[entryKey];
return entryList?entryList.concat():null;
},serializeListeners:function(target){var targetKey=target.$$hash||qx.core.ObjectRegistry.toHashCode(target);
var targetMap=this.__listeners[targetKey];
var result=[];

if(targetMap){var indexOf,type,capture,entryList,entry;

for(var entryKey in targetMap){indexOf=entryKey.indexOf("|");
type=entryKey.substring(0,indexOf);
capture=entryKey.charAt(indexOf+1)=="c";
entryList=targetMap[entryKey];

for(var i=0,l=entryList.length;i<l;i++){entry=entryList[i];
result.push({self:entry.context,handler:entry.handler,type:type,capture:capture});
}}}return result;
},toggleAttachedEvents:function(target,enable){var targetKey=target.$$hash||qx.core.ObjectRegistry.toHashCode(target);
var targetMap=this.__listeners[targetKey];

if(targetMap){var indexOf,type,capture,entryList;

for(var entryKey in targetMap){indexOf=entryKey.indexOf("|");
type=entryKey.substring(0,indexOf);
capture=entryKey.charCodeAt(indexOf+1)===99;
entryList=targetMap[entryKey];

if(enable){this.__registerAtHandler(target,type,capture);
}else{this.__unregisterAtHandler(target,type,capture);
}}}},hasListener:function(target,type,capture){{};
var targetKey=target.$$hash||qx.core.ObjectRegistry.toHashCode(target);
var targetMap=this.__listeners[targetKey];

if(!targetMap){return false;
}var entryKey=type+(capture?"|capture":"|bubble");
var entryList=targetMap[entryKey];
return entryList&&entryList.length>0;
},importListeners:function(target,list){{};
var targetKey=target.$$hash||qx.core.ObjectRegistry.toHashCode(target);
var targetMap=this.__listeners[targetKey]={};
var clazz=qx.event.Manager;

for(var listKey in list){var item=list[listKey];
var entryKey=item.type+(item.capture?"|capture":"|bubble");
var entryList=targetMap[entryKey];

if(!entryList){entryList=targetMap[entryKey]=[];
this.__registerAtHandler(target,item.type,item.capture);
}entryList.push({handler:item.listener,context:item.self,unique:item.unique||(clazz.__lastUnique++)+""});
}},addListener:function(target,type,listener,self,capture){var msg;
{};
var targetKey=target.$$hash||qx.core.ObjectRegistry.toHashCode(target);
var targetMap=this.__listeners[targetKey];

if(!targetMap){targetMap=this.__listeners[targetKey]={};
}var entryKey=type+(capture?"|capture":"|bubble");
var entryList=targetMap[entryKey];

if(!entryList){entryList=targetMap[entryKey]=[];
}if(entryList.length===0){this.__registerAtHandler(target,type,capture);
}var unique=(qx.event.Manager.__lastUnique++)+"";
var entry={handler:listener,context:self,unique:unique};
entryList.push(entry);
return entryKey+"|"+unique;
},findHandler:function(target,type){var isDomNode=false,isWindow=false,isObject=false;
var key;

if(target.nodeType===1){isDomNode=true;
key="DOM_"+target.tagName.toLowerCase()+"_"+type;
}else if(target==this.__window){isWindow=true;
key="WIN_"+type;
}else if(target.classname){isObject=true;
key="QX_"+target.classname+"_"+type;
}else{key="UNKNOWN_"+target+"_"+type;
}var cache=this.__handlerCache;

if(cache[key]){return cache[key];
}var classes=this.__registration.getHandlers();
var IEventHandler=qx.event.IEventHandler;
var clazz,instance,supportedTypes,targetCheck;

for(var i=0,l=classes.length;i<l;i++){clazz=classes[i];
supportedTypes=clazz.SUPPORTED_TYPES;

if(supportedTypes&&!supportedTypes[type]){continue;
}targetCheck=clazz.TARGET_CHECK;

if(targetCheck){if(!isDomNode&&targetCheck===IEventHandler.TARGET_DOMNODE){continue;
}else if(!isWindow&&targetCheck===IEventHandler.TARGET_WINDOW){continue;
}else if(!isObject&&targetCheck===IEventHandler.TARGET_OBJECT){continue;
}}instance=this.getHandler(classes[i]);

if(clazz.IGNORE_CAN_HANDLE||instance.canHandleEvent(target,type)){cache[key]=instance;
return instance;
}}return null;
},__registerAtHandler:function(target,type,capture){var handler=this.findHandler(target,type);

if(handler){handler.registerEvent(target,type,capture);
return;
}{};
},removeListener:function(target,type,listener,self,capture){var msg;
{};
var targetKey=target.$$hash||qx.core.ObjectRegistry.toHashCode(target);
var targetMap=this.__listeners[targetKey];

if(!targetMap){return false;
}var entryKey=type+(capture?"|capture":"|bubble");
var entryList=targetMap[entryKey];

if(!entryList){return false;
}var entry;

for(var i=0,l=entryList.length;i<l;i++){entry=entryList[i];

if(entry.handler===listener&&entry.context===self){qx.lang.Array.removeAt(entryList,i);

if(entryList.length==0){this.__unregisterAtHandler(target,type,capture);
}return true;
}}return false;
},removeListenerById:function(target,id){var msg;
{};
var split=id.split("|");
var type=split[0];
var capture=split[1].charCodeAt(0)==99;
var unique=split[2];
var targetKey=target.$$hash||qx.core.ObjectRegistry.toHashCode(target);
var targetMap=this.__listeners[targetKey];

if(!targetMap){return false;
}var entryKey=type+(capture?"|capture":"|bubble");
var entryList=targetMap[entryKey];

if(!entryList){return false;
}var entry;

for(var i=0,l=entryList.length;i<l;i++){entry=entryList[i];

if(entry.unique===unique){qx.lang.Array.removeAt(entryList,i);

if(entryList.length==0){this.__unregisterAtHandler(target,type,capture);
}return true;
}}return false;
},removeAllListeners:function(target){var targetKey=target.$$hash||qx.core.ObjectRegistry.toHashCode(target);
var targetMap=this.__listeners[targetKey];

if(!targetMap){return false;
}var split,type,capture;

for(var entryKey in targetMap){if(targetMap[entryKey].length>0){split=entryKey.split("|");
type=split[0];
capture=split[1]==="capture";
this.__unregisterAtHandler(target,type,capture);
}}delete this.__listeners[targetKey];
return true;
},deleteAllListeners:function(targetKey){delete this.__listeners[targetKey];
},__unregisterAtHandler:function(target,type,capture){var handler=this.findHandler(target,type);

if(handler){handler.unregisterEvent(target,type,capture);
return;
}{};
},dispatchEvent:function(target,event){var msg;
{};
var type=event.getType();

if(!event.getBubbles()&&!this.hasListener(target,type)){qx.event.Pool.getInstance().poolObject(event);
return true;
}
if(!event.getTarget()){event.setTarget(target);
}var classes=this.__registration.getDispatchers();
var instance;
var dispatched=false;

for(var i=0,l=classes.length;i<l;i++){instance=this.getDispatcher(classes[i]);
if(instance.canDispatchEvent(target,event,type)){instance.dispatchEvent(target,event,type);
dispatched=true;
break;
}}
if(!dispatched){{};
return true;
}var preventDefault=event.getDefaultPrevented();
qx.event.Pool.getInstance().poolObject(event);
return !preventDefault;
},dispose:function(){this.__registration.removeManager(this);
qx.util.DisposeUtil.disposeMap(this,"__handlers");
qx.util.DisposeUtil.disposeMap(this,"__dispatchers");
this.__listeners=this.__window=this.__disposeWrapper=null;
this.__registration=this.__handlerCache=null;
}}});
qx.Class.define("qx.dom.Node",{statics:{ELEMENT:1,ATTRIBUTE:2,TEXT:3,CDATA_SECTION:4,ENTITY_REFERENCE:5,ENTITY:6,PROCESSING_INSTRUCTION:7,COMMENT:8,DOCUMENT:9,DOCUMENT_TYPE:10,DOCUMENT_FRAGMENT:11,NOTATION:12,getDocument:function(node){return node.nodeType===
this.DOCUMENT?node:
node.ownerDocument||node.document;
},getWindow:qx.core.Variant.select("qx.client",{"mshtml":function(node){if(node.nodeType==null){return node;
}if(node.nodeType!==this.DOCUMENT){node=node.ownerDocument;
}return node.parentWindow;
},"default":function(node){if(node.nodeType==null){return node;
}if(node.nodeType!==this.DOCUMENT){node=node.ownerDocument;
}return node.defaultView;
}}),getDocumentElement:function(node){return this.getDocument(node).documentElement;
},getBodyElement:function(node){return this.getDocument(node).body;
},isNode:function(node){return !!(node&&node.nodeType!=null);
},isElement:function(node){return !!(node&&node.nodeType===this.ELEMENT);
},isDocument:function(node){return !!(node&&node.nodeType===this.DOCUMENT);
},isText:function(node){return !!(node&&node.nodeType===this.TEXT);
},isWindow:function(obj){return !!(obj&&obj.history&&obj.location&&obj.document);
},isNodeName:function(node,nodeName){if(!nodeName||!node||!node.nodeName){return false;
}return nodeName.toLowerCase()==qx.dom.Node.getName(node);
},getName:function(node){if(!node||!node.nodeName){return null;
}return node.nodeName.toLowerCase();
},getText:function(node){if(!node||!node.nodeType){return null;
}
switch(node.nodeType){case 1:var i,a=[],nodes=node.childNodes,length=nodes.length;

for(i=0;i<length;i++){a[i]=this.getText(nodes[i]);
}return a.join("");
case 2:return node.nodeValue;
break;
case 3:return node.nodeValue;
break;
}return null;
}}});
qx.Class.define("qx.lang.Array",{statics:{toArray:function(object,offset){return this.cast(object,Array,offset);
},cast:function(object,constructor,offset){if(object.constructor===constructor){return object;
}
if(qx.Class.hasInterface(object,qx.data.IListData)){var object=object.toArray();
}var ret=new constructor;
if(qx.core.Variant.isSet("qx.client","mshtml")){if(object.item){for(var i=offset||0,l=object.length;i<l;i++){ret.push(object[i]);
}return ret;
}}if(Object.prototype.toString.call(object)==="[object Array]"&&offset==null){ret.push.apply(ret,object);
}else{ret.push.apply(ret,Array.prototype.slice.call(object,offset||0));
}return ret;
},fromArguments:function(args,offset){return Array.prototype.slice.call(args,offset||0);
},fromCollection:function(coll){if(qx.core.Variant.isSet("qx.client","mshtml")){if(coll.item){var arr=[];

for(var i=0,l=coll.length;i<l;i++){arr[i]=coll[i];
}return arr;
}}return Array.prototype.slice.call(coll,0);
},fromShortHand:function(input){var len=input.length;
var result=qx.lang.Array.clone(input);
switch(len){case 1:result[1]=result[2]=result[3]=result[0];
break;
case 2:result[2]=result[0];
case 3:result[3]=result[1];
}return result;
},clone:function(arr){return arr.concat();
},insertAt:function(arr,obj,i){arr.splice(i,0,obj);
return arr;
},insertBefore:function(arr,obj,obj2){var i=arr.indexOf(obj2);

if(i==-1){arr.push(obj);
}else{arr.splice(i,0,obj);
}return arr;
},insertAfter:function(arr,obj,obj2){var i=arr.indexOf(obj2);

if(i==-1||i==(arr.length-1)){arr.push(obj);
}else{arr.splice(i+1,0,obj);
}return arr;
},removeAt:function(arr,i){return arr.splice(i,1)[0];
},removeAll:function(arr){arr.length=0;
return this;
},append:function(arr1,arr2){{};
Array.prototype.push.apply(arr1,arr2);
return arr1;
},exclude:function(arr1,arr2){{};

for(var i=0,il=arr2.length,index;i<il;i++){index=arr1.indexOf(arr2[i]);

if(index!=-1){arr1.splice(index,1);
}}return arr1;
},remove:function(arr,obj){var i=arr.indexOf(obj);

if(i!=-1){arr.splice(i,1);
return obj;
}},contains:function(arr,obj){return arr.indexOf(obj)!==-1;
},equals:function(arr1,arr2){var length=arr1.length;

if(length!==arr2.length){return false;
}
for(var i=0;i<length;i++){if(arr1[i]!==arr2[i]){return false;
}}return true;
},sum:function(arr){var result=0;

for(var i=0,l=arr.length;i<l;i++){result+=arr[i];
}return result;
},max:function(arr){{};
var i,len=arr.length,result=arr[0];

for(i=1;i<len;i++){if(arr[i]>result){result=arr[i];
}}return result===undefined?null:result;
},min:function(arr){{};
var i,len=arr.length,result=arr[0];

for(i=1;i<len;i++){if(arr[i]<result){result=arr[i];
}}return result===undefined?null:result;
},unique:function(arr){var ret=[],doneStrings={},doneNumbers={},doneObjects={};
var value,count=0;
var key="qx"+qx.lang.Date.now();
var hasNull=false,hasFalse=false,hasTrue=false;
for(var i=0,len=arr.length;i<len;i++){value=arr[i];
if(value===null){if(!hasNull){hasNull=true;
ret.push(value);
}}else if(value===undefined){}else if(value===false){if(!hasFalse){hasFalse=true;
ret.push(value);
}}else if(value===true){if(!hasTrue){hasTrue=true;
ret.push(value);
}}else if(typeof value==="string"){if(!doneStrings[value]){doneStrings[value]=1;
ret.push(value);
}}else if(typeof value==="number"){if(!doneNumbers[value]){doneNumbers[value]=1;
ret.push(value);
}}else{hash=value[key];

if(hash==null){hash=value[key]=count++;
}
if(!doneObjects[hash]){doneObjects[hash]=value;
ret.push(value);
}}}for(var hash in doneObjects){try{delete doneObjects[hash][key];
}catch(ex){try{doneObjects[hash][key]=null;
}catch(ex){throw new Error("Cannot clean-up map entry doneObjects["+hash+"]["+key+"]");
}}}return ret;
}}});
qx.Class.define("qx.lang.Function",{statics:{getCaller:function(args){return args.caller?args.caller.callee:args.callee.caller;
},getName:function(fcn){if(fcn.displayName){return fcn.displayName;
}
if(fcn.$$original||fcn.wrapper||fcn.classname){return fcn.classname+".constructor()";
}
if(fcn.$$mixin){for(var key in fcn.$$mixin.$$members){if(fcn.$$mixin.$$members[key]==fcn){return fcn.$$mixin.name+".prototype."+key+"()";
}}for(var key in fcn.$$mixin){if(fcn.$$mixin[key]==fcn){return fcn.$$mixin.name+"."+key+"()";
}}}
if(fcn.self){var clazz=fcn.self.constructor;

if(clazz){for(var key in clazz.prototype){if(clazz.prototype[key]==fcn){return clazz.classname+".prototype."+key+"()";
}}for(var key in clazz){if(clazz[key]==fcn){return clazz.classname+"."+key+"()";
}}}}var fcnReResult=fcn.toString().match(/function\s*(\w*)\s*\(.*/);

if(fcnReResult&&fcnReResult.length>=1&&fcnReResult[1]){return fcnReResult[1]+"()";
}return 'anonymous()';
},globalEval:function(data){if(window.execScript){return window.execScript(data);
}else{return eval.call(window,data);
}},empty:function(){},returnTrue:function(){return true;
},returnFalse:function(){return false;
},returnNull:function(){return null;
},returnThis:function(){return this;
},returnZero:function(){return 0;
},create:function(func,options){{};
if(!options){return func;
}if(!(options.self||options.args||options.delay!=null||options.periodical!=null||options.attempt)){return func;
}return function(event){{};
var args=qx.lang.Array.fromArguments(arguments);
if(options.args){args=options.args.concat(args);
}
if(options.delay||options.periodical){var returns=qx.event.GlobalError.observeMethod(function(){return func.apply(options.self||this,args);
});

if(options.delay){return window.setTimeout(returns,options.delay);
}
if(options.periodical){return window.setInterval(returns,options.periodical);
}}else if(options.attempt){var ret=false;

try{ret=func.apply(options.self||this,args);
}catch(ex){}return ret;
}else{return func.apply(options.self||this,args);
}};
},bind:function(func,self,varargs){return this.create(func,{self:self,args:arguments.length>2?qx.lang.Array.fromArguments(arguments,2):null});
},curry:function(func,varargs){return this.create(func,{args:arguments.length>1?qx.lang.Array.fromArguments(arguments,1):null});
},listener:function(func,self,varargs){if(arguments.length<3){return function(event){return func.call(self||this,event||window.event);
};
}else{var optargs=qx.lang.Array.fromArguments(arguments,2);
return function(event){var args=[event||window.event];
args.push.apply(args,optargs);
func.apply(self||this,args);
};
}},attempt:function(func,self,varargs){return this.create(func,{self:self,attempt:true,args:arguments.length>2?qx.lang.Array.fromArguments(arguments,2):null})();
},delay:function(func,delay,self,varargs){return this.create(func,{delay:delay,self:self,args:arguments.length>3?qx.lang.Array.fromArguments(arguments,3):null})();
},periodical:function(func,interval,self,varargs){return this.create(func,{periodical:interval,self:self,args:arguments.length>3?qx.lang.Array.fromArguments(arguments,3):null})();
}}});
qx.Class.define("qx.event.Registration",{statics:{__managers:{},getManager:function(target){if(target==null){{};
target=window;
}else if(target.nodeType){target=qx.dom.Node.getWindow(target);
}else if(!qx.dom.Node.isWindow(target)){target=window;
}var hash=target.$$hash||qx.core.ObjectRegistry.toHashCode(target);
var manager=this.__managers[hash];

if(!manager){manager=new qx.event.Manager(target,this);
this.__managers[hash]=manager;
}return manager;
},removeManager:function(mgr){var id=mgr.getWindowId();
delete this.__managers[id];
},addListener:function(target,type,listener,self,capture){return this.getManager(target).addListener(target,type,listener,self,capture);
},removeListener:function(target,type,listener,self,capture){return this.getManager(target).removeListener(target,type,listener,self,capture);
},removeListenerById:function(target,id){return this.getManager(target).removeListenerById(target,id);
},removeAllListeners:function(target){return this.getManager(target).removeAllListeners(target);
},deleteAllListeners:function(target){var targetKey=target.$$hash;

if(targetKey){this.getManager(target).deleteAllListeners(targetKey);
}},hasListener:function(target,type,capture){return this.getManager(target).hasListener(target,type,capture);
},serializeListeners:function(target){return this.getManager(target).serializeListeners(target);
},createEvent:function(type,clazz,args){{};
if(clazz==null){clazz=qx.event.type.Event;
}var obj=qx.event.Pool.getInstance().getObject(clazz);
args?obj.init.apply(obj,args):obj.init();
if(type){obj.setType(type);
}return obj;
},dispatchEvent:function(target,event){return this.getManager(target).dispatchEvent(target,event);
},fireEvent:function(target,type,clazz,args){var msg;
{};
var evt=this.createEvent(type,clazz||null,args);
return this.getManager(target).dispatchEvent(target,evt);
},fireNonBubblingEvent:function(target,type,clazz,args){{};
var mgr=this.getManager(target);

if(!mgr.hasListener(target,type,false)){return true;
}var evt=this.createEvent(type,clazz||null,args);
return mgr.dispatchEvent(target,evt);
},PRIORITY_FIRST:-32000,PRIORITY_NORMAL:0,PRIORITY_LAST:32000,__handlers:[],addHandler:function(handler){{};
this.__handlers.push(handler);
this.__handlers.sort(function(a,b){return a.PRIORITY-b.PRIORITY;
});
},getHandlers:function(){return this.__handlers;
},__dispatchers:[],addDispatcher:function(dispatcher,priority){{};
this.__dispatchers.push(dispatcher);
this.__dispatchers.sort(function(a,b){return a.PRIORITY-b.PRIORITY;
});
},getDispatchers:function(){return this.__dispatchers;
}}});
qx.Class.define("qx.dev.StackTrace",{statics:{getStackTrace:qx.core.Variant.select("qx.client",{"gecko":function(){try{throw new Error();
}catch(ex){var errorTrace=this.getStackTraceFromError(ex);
qx.lang.Array.removeAt(errorTrace,0);
var callerTrace=this.getStackTraceFromCaller(arguments);
var trace=callerTrace.length>errorTrace.length?callerTrace:errorTrace;

for(var i=0;i<Math.min(callerTrace.length,errorTrace.length);i++){var callerCall=callerTrace[i];

if(callerCall.indexOf("anonymous")>=0){continue;
}var callerArr=callerCall.split(":");

if(callerArr.length!=2){continue;
}var callerClassName=callerArr[0];
var methodName=callerArr[1];
var errorCall=errorTrace[i];
var errorArr=errorCall.split(":");
var errorClassName=errorArr[0];
var lineNumber=errorArr[1];

if(qx.Class.getByName(errorClassName)){var className=errorClassName;
}else{className=callerClassName;
}var line=className+":";

if(methodName){line+=methodName+":";
}line+=lineNumber;
trace[i]=line;
}return trace;
}},"mshtml|webkit":function(){return this.getStackTraceFromCaller(arguments);
},"opera":function(){var foo;

try{foo.bar();
}catch(ex){var trace=this.getStackTraceFromError(ex);
qx.lang.Array.removeAt(trace,0);
return trace;
}return [];
}}),getStackTraceFromCaller:qx.core.Variant.select("qx.client",{"opera":function(args){return [];
},"default":function(args){var trace=[];
var fcn=qx.lang.Function.getCaller(args);
var knownFunction={};

while(fcn){var fcnName=qx.lang.Function.getName(fcn);
trace.push(fcnName);

try{fcn=fcn.caller;
}catch(ex){break;
}
if(!fcn){break;
}var hash=qx.core.ObjectRegistry.toHashCode(fcn);

if(knownFunction[hash]){trace.push("...");
break;
}knownFunction[hash]=fcn;
}return trace;
}}),getStackTraceFromError:qx.core.Variant.select("qx.client",{"gecko":function(error){if(!error.stack){return [];
}var lineRe=/@(.+):(\d+)$/gm;
var hit;
var trace=[];

while((hit=lineRe.exec(error.stack))!=null){var url=hit[1];
var lineNumber=hit[2];
var className=this.__fileNameToClassName(url);
trace.push(className+":"+lineNumber);
}return trace;
},"webkit":function(error){if(error.sourceURL&&error.line){return [this.__fileNameToClassName(error.sourceURL)+":"+error.line];
}else{return [];
}},"opera":function(error){if(error.message.indexOf("Backtrace:")<0){return [];
}var trace=[];
var traceString=qx.lang.String.trim(error.message.split("Backtrace:")[1]);
var lines=traceString.split("\n");

for(var i=0;i<lines.length;i++){var reResult=lines[i].match(/\s*Line ([0-9]+) of.* (\S.*)/);

if(reResult&&reResult.length>=2){var lineNumber=reResult[1];
var fileName=this.__fileNameToClassName(reResult[2]);
trace.push(fileName+":"+lineNumber);
}}return trace;
},"default":function(){return [];
}}),__fileNameToClassName:function(fileName){var scriptDir="/source/class/";
var jsPos=fileName.indexOf(scriptDir);
var className=(jsPos==-1)?fileName:fileName.substring(jsPos+scriptDir.length).replace(/\//g,".").replace(/\.js$/,"");
return className;
}}});
qx.Class.define("qx.lang.RingBuffer",{extend:Object,construct:function(maxEntries){this.setMaxEntries(maxEntries||50);
},members:{__nextIndexToStoreTo:0,__entriesStored:0,__isMarkActive:false,__entriesStoredSinceMark:0,__entries:null,__maxEntries:null,setMaxEntries:function(maxEntries){this.__maxEntries=maxEntries;
this.clear();
},getMaxEntries:function(){return this.__maxEntries;
},addEntry:function(entry){this.__entries[this.__nextIndexToStoreTo]=entry;
this.__nextIndexToStoreTo=this.__addToIndex(this.__nextIndexToStoreTo,1);
var max=this.getMaxEntries();

if(this.__entriesStored<max){this.__entriesStored++;
}if(this.__isMarkActive&&(this.__entriesStoredSinceMark<max)){this.__entriesStoredSinceMark++;
}},mark:function(){this.__isMarkActive=true;
this.__entriesStoredSinceMark=0;
},clearMark:function(){this.__isMarkActive=false;
},getAllEntries:function(){return this.getEntries(this.getMaxEntries(),false);
},getEntries:function(count,startingFromMark){if(count>this.__entriesStored){count=this.__entriesStored;
}if(startingFromMark&&this.__isMarkActive&&(count>this.__entriesStoredSinceMark)){count=this.__entriesStoredSinceMark;
}
if(count>0){var indexOfYoungestElementInHistory=this.__addToIndex(this.__nextIndexToStoreTo,-1);
var startIndex=this.__addToIndex(indexOfYoungestElementInHistory,-count+1);
var result;

if(startIndex<=indexOfYoungestElementInHistory){result=this.__entries.slice(startIndex,indexOfYoungestElementInHistory+1);
}else{result=this.__entries.slice(startIndex,this.__entriesStored).concat(this.__entries.slice(0,indexOfYoungestElementInHistory+1));
}}else{result=[];
}return result;
},clear:function(){this.__entries=new Array(this.getMaxEntries());
this.__entriesStored=0;
this.__entriesStoredSinceMark=0;
this.__nextIndexToStoreTo=0;
},__addToIndex:function(idx,addMe){var max=this.getMaxEntries();
var result=(idx+addMe)%max;
if(result<0){result+=max;
}return result;
}}});
qx.Class.define("qx.log.appender.RingBuffer",{extend:qx.lang.RingBuffer,construct:function(maxMessages){this.setMaxMessages(maxMessages||50);
},members:{setMaxMessages:function(maxMessages){this.setMaxEntries(maxMessages);
},getMaxMessages:function(){return this.getMaxEntries();
},process:function(entry){this.addEntry(entry);
},getAllLogEvents:function(){return this.getAllEntries();
},retrieveLogEvents:function(count,startingFromMark){return this.getEntries(count,startingFromMark);
},clearHistory:function(){this.clear();
}}});
qx.Class.define("qx.log.Logger",{statics:{__level:"debug",setLevel:function(value){this.__level=value;
},getLevel:function(){return this.__level;
},setTreshold:function(value){this.__buffer.setMaxMessages(value);
},getTreshold:function(){return this.__buffer.getMaxMessages();
},__appender:{},__id:0,register:function(appender){if(appender.$$id){return;
}var id=this.__id++;
this.__appender[id]=appender;
appender.$$id=id;
var entries=this.__buffer.getAllLogEvents();

for(var i=0,l=entries.length;i<l;i++){appender.process(entries[i]);
}},unregister:function(appender){var id=appender.$$id;

if(id==null){return;
}delete this.__appender[id];
delete appender.$$id;
},debug:function(object,message){qx.log.Logger.__log("debug",arguments);
},info:function(object,message){qx.log.Logger.__log("info",arguments);
},warn:function(object,message){qx.log.Logger.__log("warn",arguments);
},error:function(object,message){qx.log.Logger.__log("error",arguments);
},trace:function(object){qx.log.Logger.__log("info",[object,qx.dev.StackTrace.getStackTrace().join("\n")]);
},deprecatedMethodWarning:function(fcn,msg){var functionName;
{};
},deprecatedClassWarning:function(clazz,msg){var className;
{};
},deprecatedEventWarning:function(clazz,event,msg){var className;
{};
},deprecatedMixinWarning:function(clazz,msg){var mixinName;
{};
},deprecatedConstantWarning:function(clazz,constant,msg){var self,constantValue;
{};
},deprecateMethodOverriding:function(object,baseclass,methodName,msg){var clazz;
{};
},clear:function(){this.__buffer.clearHistory();
},__buffer:new qx.log.appender.RingBuffer(50),__levels:{debug:0,info:1,warn:2,error:3},__log:function(level,args){var levels=this.__levels;

if(levels[level]<levels[this.__level]){return;
}var object=args.length<2?null:args[0];
var start=object?1:0;
var items=[];

for(var i=start,l=args.length;i<l;i++){items.push(this.__serialize(args[i],true));
}var time=new Date;
var entry={time:time,offset:time-qx.Bootstrap.LOADSTART,level:level,items:items,win:window};
if(object){if(object instanceof qx.core.Object){entry.object=object.$$hash;
}else if(object.$$type){entry.clazz=object;
}}this.__buffer.process(entry);
var appender=this.__appender;

for(var id in appender){appender[id].process(entry);
}},__detect:function(value){if(value===undefined){return "undefined";
}else if(value===null){return "null";
}
if(value.$$type){return "class";
}var type=typeof value;

if(type==="function"||type=="string"||type==="number"||type==="boolean"){return type;
}else if(type==="object"){if(value.nodeType){return "node";
}else if(value.classname){return "instance";
}else if(value instanceof Array){return "array";
}else if(value instanceof Error){return "error";
}else{return "map";
}}
if(value.toString){return "stringify";
}return "unknown";
},__serialize:function(value,deep){var type=this.__detect(value);
var text="unknown";
var trace=[];

switch(type){case "null":case "undefined":text=type;
break;
case "string":case "number":case "boolean":text=value;
break;
case "node":if(value.nodeType===9){text="document";
}else if(value.nodeType===3){text="text["+value.nodeValue+"]";
}else if(value.nodeType===1){text=value.nodeName.toLowerCase();

if(value.id){text+="#"+value.id;
}}else{text="node";
}break;
case "function":text=qx.lang.Function.getName(value)||type;
break;
case "instance":text=value.basename+"["+value.$$hash+"]";
break;
case "class":case "stringify":text=value.toString();
break;
case "error":trace=qx.dev.StackTrace.getStackTraceFromError(value);
text=value.toString();
break;
case "array":if(deep){text=[];

for(var i=0,l=value.length;i<l;i++){if(text.length>20){text.push("...(+"+(l-i)+")");
break;
}text.push(this.__serialize(value[i],false));
}}else{text="[...("+value.length+")]";
}break;
case "map":if(deep){var temp;
var sorted=[];

for(var key in value){sorted.push(key);
}sorted.sort();
text=[];

for(var i=0,l=sorted.length;i<l;i++){if(text.length>20){text.push("...(+"+(l-i)+")");
break;
}key=sorted[i];
temp=this.__serialize(value[key],false);
temp.key=key;
text.push(temp);
}}else{var number=0;

for(var key in value){number++;
}text="{...("+number+")}";
}break;
}return {type:type,text:text,trace:trace};
}},defer:function(statics){var logs=qx.Bootstrap.$$logs;

for(var i=0;i<logs.length;i++){statics.__log(logs[i][0],logs[i][1]);
}qx.Bootstrap.debug=statics.debug;
qx.Bootstrap.info=statics.info;
qx.Bootstrap.warn=statics.warn;
qx.Bootstrap.error=statics.error;
qx.Bootstrap.trace=statics.trace;
}});
qx.Class.define("qx.core.Object",{extend:Object,include:[qx.data.MBinding],construct:function(){qx.core.ObjectRegistry.register(this);
},statics:{$$type:"Object"},members:{toHashCode:function(){return this.$$hash;
},toString:function(){return this.classname+"["+this.$$hash+"]";
},base:function(args,varags){{};

if(arguments.length===1){return args.callee.base.call(this);
}else{return args.callee.base.apply(this,Array.prototype.slice.call(arguments,1));
}},self:function(args){return args.callee.self;
},clone:function(){var clazz=this.constructor;
var clone=new clazz;
var props=qx.Class.getProperties(clazz);
var user=qx.core.Property.$$store.user;
var setter=qx.core.Property.$$method.set;
var name;
for(var i=0,l=props.length;i<l;i++){name=props[i];

if(this.hasOwnProperty(user[name])){clone[setter[name]](this[user[name]]);
}}return clone;
},set:function(data,value){var setter=qx.core.Property.$$method.set;

if(qx.Bootstrap.isString(data)){if(!this[setter[data]]){if(this["set"+qx.Bootstrap.firstUp(data)]!=undefined){this["set"+qx.Bootstrap.firstUp(data)](value);
return this;
}{};
}return this[setter[data]](value);
}else{for(var prop in data){if(!this[setter[prop]]){if(this["set"+qx.Bootstrap.firstUp(prop)]!=undefined){this["set"+qx.Bootstrap.firstUp(prop)](data[prop]);
continue;
}{};
}this[setter[prop]](data[prop]);
}return this;
}},get:function(prop){var getter=qx.core.Property.$$method.get;

if(!this[getter[prop]]){if(this["get"+qx.Bootstrap.firstUp(prop)]!=undefined){return this["get"+qx.Bootstrap.firstUp(prop)]();
}{};
}return this[getter[prop]]();
},reset:function(prop){var resetter=qx.core.Property.$$method.reset;

if(!this[resetter[prop]]){if(this["reset"+qx.Bootstrap.firstUp(prop)]!=undefined){this["reset"+qx.Bootstrap.firstUp(prop)]();
return;
}{};
}this[resetter[prop]]();
},__Registration:qx.event.Registration,addListener:function(type,listener,self,capture){if(!this.$$disposed){return this.__Registration.addListener(this,type,listener,self,capture);
}return null;
},addListenerOnce:function(type,listener,self,capture){var callback=function(e){listener.call(self||this,e);
this.removeListener(type,callback,this,capture);
};
return this.addListener(type,callback,this,capture);
},removeListener:function(type,listener,self,capture){if(!this.$$disposed){return this.__Registration.removeListener(this,type,listener,self,capture);
}return false;
},removeListenerById:function(id){if(!this.$$disposed){return this.__Registration.removeListenerById(this,id);
}return false;
},hasListener:function(type,capture){return this.__Registration.hasListener(this,type,capture);
},dispatchEvent:function(evt){if(!this.$$disposed){return this.__Registration.dispatchEvent(this,evt);
}return true;
},fireEvent:function(type,clazz,args){if(!this.$$disposed){return this.__Registration.fireEvent(this,type,clazz,args);
}return true;
},fireNonBubblingEvent:function(type,clazz,args){if(!this.$$disposed){return this.__Registration.fireNonBubblingEvent(this,type,clazz,args);
}return true;
},fireDataEvent:function(type,data,oldData,cancelable){if(!this.$$disposed){if(oldData===undefined){oldData=null;
}return this.__Registration.fireNonBubblingEvent(this,type,qx.event.type.Data,[data,oldData,!!cancelable]);
}return true;
},__userData:null,setUserData:function(key,value){if(!this.__userData){this.__userData={};
}this.__userData[key]=value;
},getUserData:function(key){if(!this.__userData){return null;
}var data=this.__userData[key];
return data===undefined?null:data;
},__Logger:qx.log.Logger,debug:function(msg){this.__Logger.debug(this,msg);
},info:function(msg){this.__Logger.info(this,msg);
},warn:function(msg){this.__Logger.warn(this,msg);
},error:function(msg){this.__Logger.error(this,msg);
},trace:function(){this.__Logger.trace(this);
},isDisposed:function(){return this.$$disposed||false;
},dispose:function(){var key,value,ff2,ie6;
if(this.$$disposed){return;
}this.$$disposed=true;
this.$$instance=null;
this.$$allowconstruct=null;
{};
var clazz=this.constructor;
var mixins;

while(clazz.superclass){if(clazz.$$destructor){clazz.$$destructor.call(this);
}if(clazz.$$includes){mixins=clazz.$$flatIncludes;

for(var i=0,l=mixins.length;i<l;i++){if(mixins[i].$$destructor){mixins[i].$$destructor.call(this);
}}}clazz=clazz.superclass;
}if(this.__removePropertyReferences){this.__removePropertyReferences();
}{};
},__removePropertyReferences:null,__removePropertyReferencesOld:function(){var properties=qx.Class.getProperties(this.constructor);

for(var i=0,l=properties.length;i<l;i++){delete this["$$user_"+properties[i]];
}},_disposeObjects:function(varargs){qx.util.DisposeUtil.disposeObjects(this,arguments);
},_disposeSingletonObjects:function(varargs){qx.util.DisposeUtil.disposeObjects(this,arguments,true);
},_disposeArray:function(field){qx.util.DisposeUtil.disposeArray(this,field);
},_disposeMap:function(field){qx.util.DisposeUtil.disposeMap(this,field);
}},settings:{"qx.disposerDebugLevel":0},defer:function(statics,members){{};
var ie6=navigator.userAgent.indexOf("MSIE 6.0")!=-1;
var ff2=navigator.userAgent.indexOf("rv:1.8.1")!=-1;
if(ie6||ff2){members.__removePropertyReferences=members.__removePropertyReferencesOld;
}},destruct:function(){if(!qx.core.ObjectRegistry.inShutDown){qx.event.Registration.removeAllListeners(this);
}else{qx.event.Registration.deleteAllListeners(this);
}qx.core.ObjectRegistry.unregister(this);
this.__userData=null;
var clazz=this.constructor;
var properties;
var store=qx.core.Property.$$store;
var storeUser=store.user;
var storeTheme=store.theme;
var storeInherit=store.inherit;
var storeUseinit=store.useinit;
var storeInit=store.init;

while(clazz){properties=clazz.$$properties;

if(properties){for(var name in properties){if(properties[name].dereference){this[storeUser[name]]=this[storeTheme[name]]=this[storeInherit[name]]=this[storeUseinit[name]]=this[storeInit[name]]=undefined;
}}}clazz=clazz.superclass;
}}});
qx.Class.define("qx.event.type.Event",{extend:qx.core.Object,statics:{CAPTURING_PHASE:1,AT_TARGET:2,BUBBLING_PHASE:3},members:{init:function(canBubble,cancelable){{};
this._type=null;
this._target=null;
this._currentTarget=null;
this._relatedTarget=null;
this._originalTarget=null;
this._stopPropagation=false;
this._preventDefault=false;
this._bubbles=!!canBubble;
this._cancelable=!!cancelable;
this._timeStamp=(new Date()).getTime();
this._eventPhase=null;
return this;
},clone:function(embryo){if(embryo){var clone=embryo;
}else{var clone=qx.event.Pool.getInstance().getObject(this.constructor);
}clone._type=this._type;
clone._target=this._target;
clone._currentTarget=this._currentTarget;
clone._relatedTarget=this._relatedTarget;
clone._originalTarget=this._originalTarget;
clone._stopPropagation=this._stopPropagation;
clone._bubbles=this._bubbles;
clone._preventDefault=this._preventDefault;
clone._cancelable=this._cancelable;
return clone;
},stop:function(){if(this._bubbles){this.stopPropagation();
}
if(this._cancelable){this.preventDefault();
}},stopPropagation:function(){{};
this._stopPropagation=true;
},getPropagationStopped:function(){return !!this._stopPropagation;
},preventDefault:function(){{};
this._preventDefault=true;
},getDefaultPrevented:function(){return !!this._preventDefault;
},getType:function(){return this._type;
},setType:function(type){this._type=type;
},getEventPhase:function(){return this._eventPhase;
},setEventPhase:function(eventPhase){this._eventPhase=eventPhase;
},getTimeStamp:function(){return this._timeStamp;
},getTarget:function(){return this._target;
},setTarget:function(target){this._target=target;
},getCurrentTarget:function(){return this._currentTarget||this._target;
},setCurrentTarget:function(currentTarget){this._currentTarget=currentTarget;
},getRelatedTarget:function(){return this._relatedTarget;
},setRelatedTarget:function(relatedTarget){this._relatedTarget=relatedTarget;
},getOriginalTarget:function(){return this._originalTarget;
},setOriginalTarget:function(originalTarget){this._originalTarget=originalTarget;
},getBubbles:function(){return this._bubbles;
},setBubbles:function(bubbles){this._bubbles=bubbles;
},isCancelable:function(){return this._cancelable;
},setCancelable:function(cancelable){this._cancelable=cancelable;
}},destruct:function(){this._target=this._currentTarget=this._relatedTarget=this._originalTarget=null;
}});
qx.Class.define("qx.event.type.Data",{extend:qx.event.type.Event,members:{__data:null,__old:null,init:function(data,old,cancelable){this.base(arguments,false,cancelable);
this.__data=data;
this.__old=old;
return this;
},clone:function(embryo){var clone=this.base(arguments,embryo);
clone.__data=this.__data;
clone.__old=this.__old;
return clone;
},getData:function(){return this.__data;
},getOldData:function(){return this.__old;
}},destruct:function(){this.__data=this.__old=null;
}});
qx.Class.define("qx.data.SingleValueBinding",{statics:{DEBUG_ON:false,__bindings:{},bind:function(sourceObject,sourcePropertyChain,targetObject,targetPropertyChain,options){var targetListenerMap=this.__setUpTargetBinding(sourceObject,sourcePropertyChain,targetObject,targetPropertyChain,options);
var propertyNames=sourcePropertyChain.split(".");
var arrayIndexValues=this.__checkForArrayInPropertyChain(propertyNames);
var sources=[];
var listeners=[];
var listenerIds=[];
var eventNames=[];
var source=sourceObject;
for(var i=0;i<propertyNames.length;i++){if(arrayIndexValues[i]!==""){eventNames.push("change");
}else{eventNames.push(this.__getEventNameForProperty(source,propertyNames[i]));
}sources[i]=source;
if(i==propertyNames.length-1){if(arrayIndexValues[i]!==""){var itemIndex=arrayIndexValues[i]==="last"?source.length-1:arrayIndexValues[i];
var currentValue=source.getItem(itemIndex);
this.__setInitialValue(currentValue,targetObject,targetPropertyChain,options,sourceObject);
listenerIds[i]=this.__bindEventToProperty(source,eventNames[i],targetObject,targetPropertyChain,options,arrayIndexValues[i]);
}else{if(propertyNames[i]!=null&&source["get"+qx.lang.String.firstUp(propertyNames[i])]!=null){var currentValue=source["get"+qx.lang.String.firstUp(propertyNames[i])]();
this.__setInitialValue(currentValue,targetObject,targetPropertyChain,options,sourceObject);
}listenerIds[i]=this.__bindEventToProperty(source,eventNames[i],targetObject,targetPropertyChain,options);
}}else{var context={index:i,propertyNames:propertyNames,sources:sources,listenerIds:listenerIds,arrayIndexValues:arrayIndexValues,targetObject:targetObject,targetPropertyChain:targetPropertyChain,options:options,listeners:listeners};
var listener=qx.lang.Function.bind(this.__chainListener,this,context);
listeners.push(listener);
listenerIds[i]=source.addListener(eventNames[i],listener);
}if(source["get"+qx.lang.String.firstUp(propertyNames[i])]==null){source=null;
}else if(arrayIndexValues[i]!==""){source=source["get"+qx.lang.String.firstUp(propertyNames[i])](arrayIndexValues[i]);
}else{source=source["get"+qx.lang.String.firstUp(propertyNames[i])]();
}
if(!source){break;
}}var id={type:"deepBinding",listenerIds:listenerIds,sources:sources,targetListenerIds:targetListenerMap.listenerIds,targets:targetListenerMap.targets};
this.__storeBinding(id,sourceObject,sourcePropertyChain,targetObject,targetPropertyChain);
return id;
},__chainListener:function(context){if(context.options&&context.options.onUpdate){context.options.onUpdate(context.sources[context.index],context.targetObject);
}for(var j=context.index+1;j<context.propertyNames.length;j++){var source=context.sources[j];
context.sources[j]=null;

if(!source){continue;
}source.removeListenerById(context.listenerIds[j]);
}var source=context.sources[context.index];
for(var j=context.index+1;j<context.propertyNames.length;j++){if(context.arrayIndexValues[j-1]!==""){source=source["get"+qx.lang.String.firstUp(context.propertyNames[j-1])](context.arrayIndexValues[j-1]);
}else{source=source["get"+qx.lang.String.firstUp(context.propertyNames[j-1])]();
}context.sources[j]=source;
if(!source){this.__resetTargetValue(context.targetObject,context.targetPropertyChain);
break;
}if(j==context.propertyNames.length-1){if(qx.Class.implementsInterface(source,qx.data.IListData)){var itemIndex=context.arrayIndexValues[j]==="last"?source.length-1:context.arrayIndexValues[j];
var currentValue=source.getItem(itemIndex);
this.__setInitialValue(currentValue,context.targetObject,context.targetPropertyChain,context.options,context.sources[context.index]);
context.listenerIds[j]=this.__bindEventToProperty(source,"change",context.targetObject,context.targetPropertyChain,context.options,context.arrayIndexValues[j]);
}else{if(context.propertyNames[j]!=null&&source["get"+qx.lang.String.firstUp(context.propertyNames[j])]!=null){var currentValue=source["get"+qx.lang.String.firstUp(context.propertyNames[j])]();
this.__setInitialValue(currentValue,context.targetObject,context.targetPropertyChain,context.options,context.sources[context.index]);
}var eventName=this.__getEventNameForProperty(source,context.propertyNames[j]);
context.listenerIds[j]=this.__bindEventToProperty(source,eventName,context.targetObject,context.targetPropertyChain,context.options);
}}else{if(context.listeners[j]==null){var listener=qx.lang.Function.bind(this.__chainListener,this,context);
context.listeners.push(listener);
}if(qx.Class.implementsInterface(source,qx.data.IListData)){var eventName="change";
}else{var eventName=this.__getEventNameForProperty(source,context.propertyNames[j]);
}context.listenerIds[j]=source.addListener(eventName,context.listeners[j]);
}}},__setUpTargetBinding:function(sourceObject,sourcePropertyChain,targetObject,targetPropertyChain,options){var propertyNames=targetPropertyChain.split(".");
var arrayIndexValues=this.__checkForArrayInPropertyChain(propertyNames);
var targets=[];
var listeners=[];
var listenerIds=[];
var eventNames=[];
var target=targetObject;
for(var i=0;i<propertyNames.length-1;i++){if(arrayIndexValues[i]!==""){eventNames.push("change");
}else{try{eventNames.push(this.__getEventNameForProperty(target,propertyNames[i]));
}catch(e){break;
}}targets[i]=target;
var listener=function(){for(var j=i+1;j<propertyNames.length-1;j++){var target=targets[j];
targets[j]=null;

if(!target){continue;
}target.removeListenerById(listenerIds[j]);
}var target=targets[i];
for(var j=i+1;j<propertyNames.length-1;j++){var firstUpPropName=qx.lang.String.firstUp(propertyNames[j-1]);
if(arrayIndexValues[j-1]!==""){var currentIndex=arrayIndexValues[j-1]==="last"?target.getLength()-1:arrayIndexValues[j-1];
target=target["get"+firstUpPropName](currentIndex);
}else{target=target["get"+firstUpPropName]();
}targets[j]=target;
if(listeners[j]==null){listeners.push(listener);
}if(qx.Class.implementsInterface(target,qx.data.IListData)){var eventName="change";
}else{try{var eventName=qx.data.SingleValueBinding.__getEventNameForProperty(target,propertyNames[j]);
}catch(e){break;
}}listenerIds[j]=target.addListener(eventName,listeners[j]);
}qx.data.SingleValueBinding.__updateTarget(sourceObject,sourcePropertyChain,targetObject,targetPropertyChain,options);
};
listeners.push(listener);
listenerIds[i]=target.addListener(eventNames[i],listener);
var firstUpPropName=qx.lang.String.firstUp(propertyNames[i]);
if(target["get"+firstUpPropName]==null){target=null;
}else if(arrayIndexValues[i]!==""){target=target["get"+firstUpPropName](arrayIndexValues[i]);
}else{target=target["get"+firstUpPropName]();
}
if(!target){break;
}}return {listenerIds:listenerIds,targets:targets};
},__updateTarget:function(sourceObject,sourcePropertyChain,targetObject,targetPropertyChain,options){var source=this.__getTargetFromChain(sourceObject,sourcePropertyChain);

if(source!=null){var lastProperty=sourcePropertyChain.substring(sourcePropertyChain.lastIndexOf(".")+1,sourcePropertyChain.length);
if(lastProperty.charAt(lastProperty.length-1)=="]"){var index=lastProperty.substring(lastProperty.lastIndexOf("[")+1,lastProperty.length-1);
var prop=lastProperty.substring(0,lastProperty.lastIndexOf("["));
var sourceArray=source["get"+qx.lang.String.firstUp(prop)]();

if(index=="last"){index=sourceArray.length-1;
}
if(sourceArray!=null){var value=sourceArray.getItem(index);
}}else{var value=source["get"+qx.lang.String.firstUp(lastProperty)]();
}}value=qx.data.SingleValueBinding.__convertValue(value,targetObject,targetPropertyChain,options);
this.__setTargetValue(targetObject,targetPropertyChain,value);
},__getEventNameForProperty:function(source,propertyname){var eventName=this.__getEventForProperty(source,propertyname);
if(eventName==null){if(qx.Class.supportsEvent(source.constructor,propertyname)){eventName=propertyname;
}else if(qx.Class.supportsEvent(source.constructor,"change"+qx.lang.String.firstUp(propertyname))){eventName="change"+qx.lang.String.firstUp(propertyname);
}else{throw new qx.core.AssertionError("No event could be found for the property",propertyname);
}}return eventName;
},__resetTargetValue:function(targetObject,targetPropertyChain){var target=this.__getTargetFromChain(targetObject,targetPropertyChain);

if(target!=null){var lastProperty=targetPropertyChain.substring(targetPropertyChain.lastIndexOf(".")+1,targetPropertyChain.length);
if(lastProperty.charAt(lastProperty.length-1)=="]"){this.__setTargetValue(targetObject,targetPropertyChain,null);
return;
}if(target["reset"+qx.lang.String.firstUp(lastProperty)]!=undefined){target["reset"+qx.lang.String.firstUp(lastProperty)]();
}else{target["set"+qx.lang.String.firstUp(lastProperty)](null);
}}},__setTargetValue:function(targetObject,targetPropertyChain,value){var target=this.__getTargetFromChain(targetObject,targetPropertyChain);

if(target!=null){var lastProperty=targetPropertyChain.substring(targetPropertyChain.lastIndexOf(".")+1,targetPropertyChain.length);
if(lastProperty.charAt(lastProperty.length-1)=="]"){var index=lastProperty.substring(lastProperty.lastIndexOf("[")+1,lastProperty.length-1);
var prop=lastProperty.substring(0,lastProperty.lastIndexOf("["));
var targetArray=target["get"+qx.lang.String.firstUp(prop)]();

if(index=="last"){index=targetArray.length-1;
}
if(targetArray!=null){targetArray.setItem(index,value);
}}else{target["set"+qx.lang.String.firstUp(lastProperty)](value);
}}},__getTargetFromChain:function(targetObject,targetPropertyChain){var properties=targetPropertyChain.split(".");
var target=targetObject;
for(var i=0;i<properties.length-1;i++){try{var property=properties[i];
if(property.indexOf("]")==property.length-1){var index=property.substring(property.indexOf("[")+1,property.length-1);
property=property.substring(0,property.indexOf("["));
}target=target["get"+qx.lang.String.firstUp(property)]();

if(index!=null){if(index=="last"){index=target.length-1;
}target=target.getItem(index);
index=null;
}}catch(ex){return null;
}}return target;
},__setInitialValue:function(value,targetObject,targetPropertyChain,options,sourceObject){value=this.__convertValue(value,targetObject,targetPropertyChain,options);
if(value==null){this.__resetTargetValue(targetObject,targetPropertyChain);
}if(value!=undefined){try{this.__setTargetValue(targetObject,targetPropertyChain,value);
if(options&&options.onUpdate){options.onUpdate(sourceObject,targetObject,value);
}}catch(e){if(!(e instanceof qx.core.ValidationError)){throw e;
}
if(options&&options.onSetFail){options.onSetFail(e);
}else{this.warn("Failed so set value "+value+" on "+targetObject+". Error message: "+e);
}}}},__checkForArrayInPropertyChain:function(propertyNames){var arrayIndexValues=[];
for(var i=0;i<propertyNames.length;i++){var name=propertyNames[i];
if(qx.lang.String.endsWith(name,"]")){var arrayIndex=name.substring(name.indexOf("[")+1,name.indexOf("]"));
if(name.indexOf("]")!=name.length-1){throw new Error("Please use only one array at a time: "+name+" does not work.");
}
if(arrayIndex!=="last"){if(arrayIndex==""||isNaN(parseInt(arrayIndex))){throw new Error("No number or 'last' value hast been given"+" in a array binding: "+name+" does not work.");
}}if(name.indexOf("[")!=0){propertyNames[i]=name.substring(0,name.indexOf("["));
arrayIndexValues[i]="";
arrayIndexValues[i+1]=arrayIndex;
propertyNames.splice(i+1,0,"item");
i++;
}else{arrayIndexValues[i]=arrayIndex;
propertyNames.splice(i,1,"item");
}}else{arrayIndexValues[i]="";
}}return arrayIndexValues;
},__bindEventToProperty:function(sourceObject,sourceEvent,targetObject,targetProperty,options,arrayIndex){var eventType;
{};
var bindListener=function(arrayIndex,e){if(arrayIndex!==""){if(arrayIndex==="last"){arrayIndex=sourceObject.length-1;
}var data=sourceObject.getItem(arrayIndex);
if(data==undefined){qx.data.SingleValueBinding.__resetTargetValue(targetObject,targetProperty);
}var start=e.getData().start;
var end=e.getData().end;

if(arrayIndex<start||arrayIndex>end){return;
}}else{var data=e.getData();
}if(qx.data.SingleValueBinding.DEBUG_ON){qx.log.Logger.debug("Binding executed from "+sourceObject+" by "+sourceEvent+" to "+targetObject+" ("+targetProperty+")");
qx.log.Logger.debug("Data before conversion: "+data);
}data=qx.data.SingleValueBinding.__convertValue(data,targetObject,targetProperty,options);
if(qx.data.SingleValueBinding.DEBUG_ON){qx.log.Logger.debug("Data after conversion: "+data);
}try{if(data!=undefined){qx.data.SingleValueBinding.__setTargetValue(targetObject,targetProperty,data);
}else{qx.data.SingleValueBinding.__resetTargetValue(targetObject,targetProperty);
}if(options&&options.onUpdate){options.onUpdate(sourceObject,targetObject,data);
}}catch(e){if(!(e instanceof qx.core.ValidationError)){throw e;
}
if(options&&options.onSetFail){options.onSetFail(e);
}else{this.warn("Failed so set value "+data+" on "+targetObject+". Error message: "+e);
}}};
if(!arrayIndex){arrayIndex="";
}bindListener=qx.lang.Function.bind(bindListener,sourceObject,arrayIndex);
var id=sourceObject.addListener(sourceEvent,bindListener);
return id;
},__storeBinding:function(id,sourceObject,sourceEvent,targetObject,targetProperty){if(this.__bindings[sourceObject.toHashCode()]===undefined){this.__bindings[sourceObject.toHashCode()]=[];
}this.__bindings[sourceObject.toHashCode()].push([id,sourceObject,sourceEvent,targetObject,targetProperty]);
},__convertValue:function(value,targetObject,targetPropertyChain,options){if(options&&options.converter){var model;

if(targetObject.getModel){model=targetObject.getModel();
}return options.converter(value,model);
}else{var target=this.__getTargetFromChain(targetObject,targetPropertyChain);
var lastProperty=targetPropertyChain.substring(targetPropertyChain.lastIndexOf(".")+1,targetPropertyChain.length);
if(target==null){return value;
}var propertieDefinition=qx.Class.getPropertyDefinition(target.constructor,lastProperty);
var check=propertieDefinition==null?"":propertieDefinition.check;
return this.__defaultConversion(value,check);
}},__getEventForProperty:function(sourceObject,sourceProperty){var propertieDefinition=qx.Class.getPropertyDefinition(sourceObject.constructor,sourceProperty);

if(propertieDefinition==null){return null;
}return propertieDefinition.event;
},__defaultConversion:function(data,targetCheck){var dataType=qx.lang.Type.getClass(data);
if((dataType=="Number"||dataType=="String")&&(targetCheck=="Integer"||targetCheck=="PositiveInteger")){data=parseInt(data);
}if((dataType=="Boolean"||dataType=="Number"||dataType=="Date")&&targetCheck=="String"){data=data+"";
}if((dataType=="Number"||dataType=="String")&&(targetCheck=="Number"||targetCheck=="PositiveNumber")){data=parseFloat(data);
}return data;
},removeBindingFromObject:function(sourceObject,id){if(id.type=="deepBinding"){for(var i=0;i<id.sources.length;i++){if(id.sources[i]){id.sources[i].removeListenerById(id.listenerIds[i]);
}}for(var i=0;i<id.targets.length;i++){if(id.targets[i]){id.targets[i].removeListenerById(id.targetListenerIds[i]);
}}}else{sourceObject.removeListenerById(id);
}var bindings=this.__bindings[sourceObject.toHashCode()];
if(bindings!=undefined){for(var i=0;i<bindings.length;i++){if(bindings[i][0]==id){qx.lang.Array.remove(bindings,bindings[i]);
return;
}}}throw new Error("Binding could not be found!");
},removeAllBindingsForObject:function(object){{};
var bindings=this.__bindings[object.toHashCode()];

if(bindings!=undefined){for(var i=bindings.length-1;i>=0;i--){this.removeBindingFromObject(object,bindings[i][0]);
}}},getAllBindingsForObject:function(object){if(this.__bindings[object.toHashCode()]===undefined){this.__bindings[object.toHashCode()]=[];
}return this.__bindings[object.toHashCode()];
},removeAllBindings:function(){for(var hash in this.__bindings){var object=qx.core.ObjectRegistry.fromHashCode(hash);
if(object==null){delete this.__bindings[hash];
continue;
}this.removeAllBindingsForObject(object);
}this.__bindings={};
},getAllBindings:function(){return this.__bindings;
},showBindingInLog:function(object,id){var binding;
for(var i=0;i<this.__bindings[object.toHashCode()].length;i++){if(this.__bindings[object.toHashCode()][i][0]==id){binding=this.__bindings[object.toHashCode()][i];
break;
}}
if(binding===undefined){var message="Binding does not exist!";
}else{var message="Binding from '"+binding[1]+"' ("+binding[2]+") to the object '"+binding[3]+"' ("+binding[4]+").";
}qx.log.Logger.debug(message);
},showAllBindingsInLog:function(){for(var hash in this.__bindings){var object=qx.core.ObjectRegistry.fromHashCode(hash);

for(var i=0;i<this.__bindings[hash].length;i++){this.showBindingInLog(object,this.__bindings[hash][i][0]);
}}}}});
qx.Class.define("qx.lang.String",{statics:{camelCase:function(str){return str.replace(/\-([a-z])/g,function(match,chr){return chr.toUpperCase();
});
},hyphenate:function(str){return str.replace(/[A-Z]/g,function(match){return ('-'+match.charAt(0).toLowerCase());
});
},capitalize:function(str){return str.replace(/\b[a-z]/g,function(match){return match.toUpperCase();
});
},clean:function(str){return this.trim(str.replace(/\s+/g,' '));
},trimLeft:function(str){return str.replace(/^\s+/,"");
},trimRight:function(str){return str.replace(/\s+$/,"");
},trim:function(str){return str.replace(/^\s+|\s+$/g,"");
},startsWith:function(fullstr,substr){return fullstr.indexOf(substr)===0;
},endsWith:function(fullstr,substr){return fullstr.substring(fullstr.length-substr.length,fullstr.length)===substr;
},repeat:function(str,times){return str.length>0?new Array(times+1).join(str):"";
},pad:function(str,length,ch){var padLength=length-str.length;

if(padLength>0){if(typeof ch==="undefined"){ch="0";
}return this.repeat(ch,padLength)+str;
}else{return str;
}},firstUp:qx.Bootstrap.firstUp,firstLow:qx.Bootstrap.firstLow,contains:function(str,substring){return str.indexOf(substring)!=-1;
},format:function(pattern,args){var str=pattern;

for(var i=0;i<args.length;i++){str=str.replace(new RegExp("%"+(i+1),"g"),args[i]+"");
}return str;
},escapeRegexpChars:function(str){return str.replace(/([.*+?^${}()|[\]\/\\])/g,'\\$1');
},toArray:function(str){return str.split(/\B|\b/g);
},stripTags:function(str){return str.replace(/<\/?[^>]+>/gi,"");
},stripScripts:function(str,exec){var scripts="";
var text=str.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi,function(){scripts+=arguments[1]+'\n';
return "";
});

if(exec===true){qx.lang.Function.globalEval(scripts);
}return text;
}}});
qx.Interface.define("qx.data.IListData",{events:{"change":"qx.event.type.Data","changeLength":"qx.event.type.Event"},members:{getItem:function(index){},setItem:function(index,item){},splice:function(startIndex,amount,varargs){},contains:function(item){},getLength:function(){},toArray:function(){}}});
qx.Class.define("qx.lang.Date",{statics:{now:function(){return +new Date;
}}});
qx.Class.define("qx.type.BaseError",{extend:Error,construct:function(comment,failMessage){Error.call(this,failMessage);
this.__comment=comment||"";
this.message=failMessage||qx.type.BaseError.DEFAULTMESSAGE;
},statics:{DEFAULTMESSAGE:"error"},members:{__comment:null,message:null,getComment:function(){return this.__comment;
},toString:function(){return this.__comment+": "+this.message;
}}});
qx.Class.define("qx.core.AssertionError",{extend:qx.type.BaseError,construct:function(comment,failMessage){qx.type.BaseError.call(this,comment,failMessage);
this.__trace=qx.dev.StackTrace.getStackTrace();
},members:{__trace:null,getStackTrace:function(){return this.__trace;
}}});
qx.Class.define("qx.core.ValidationError",{extend:qx.type.BaseError});
qx.Class.define("qx.lang.Type",{statics:{getClass:qx.Bootstrap.getClass,isString:qx.Bootstrap.isString,isArray:qx.Bootstrap.isArray,isObject:qx.Bootstrap.isObject,isFunction:qx.Bootstrap.isFunction,isRegExp:function(value){return this.getClass(value)=="RegExp";
},isNumber:function(value){return (value!==null&&(this.getClass(value)=="Number"||value instanceof Number));
},isBoolean:function(value){return (value!==null&&(this.getClass(value)=="Boolean"||value instanceof Boolean));
},isDate:function(value){return (value!==null&&(this.getClass(value)=="Date"||value instanceof Date));
},isError:function(value){return (value!==null&&(this.getClass(value)=="Error"||value instanceof Error));
}}});
qx.Interface.define("qx.event.IEventHandler",{statics:{TARGET_DOMNODE:1,TARGET_WINDOW:2,TARGET_OBJECT:3},members:{canHandleEvent:function(target,type){},registerEvent:function(target,type,capture){},unregisterEvent:function(target,type,capture){}}});
qx.Class.define("qx.util.ObjectPool",{extend:qx.core.Object,construct:function(size){this.base(arguments);
this.__pool={};

if(size!=null){this.setSize(size);
}},properties:{size:{check:"Integer",init:Infinity}},members:{__pool:null,getObject:function(clazz){if(this.$$disposed){return new clazz;
}
if(!clazz){throw new Error("Class needs to be defined!");
}var obj=null;
var pool=this.__pool[clazz.classname];

if(pool){obj=pool.pop();
}
if(obj){obj.$$pooled=false;
}else{obj=new clazz;
}return obj;
},poolObject:function(obj){if(!this.__pool){return;
}var classname=obj.classname;
var pool=this.__pool[classname];

if(obj.$$pooled){throw new Error("Object is already pooled: "+obj);
}
if(!pool){this.__pool[classname]=pool=[];
}if(pool.length>this.getSize()){if(obj.destroy){obj.destroy();
}else{obj.dispose();
}return;
}obj.$$pooled=true;
pool.push(obj);
}},destruct:function(){var pool=this.__pool;
var classname,list,i,l;

for(classname in pool){list=pool[classname];

for(i=0,l=list.length;i<l;i++){list[i].dispose();
}}delete this.__pool;
}});
qx.Class.define("qx.event.Pool",{extend:qx.util.ObjectPool,type:"singleton",construct:function(){this.base(arguments,30);
}});
qx.Class.define("qx.util.DisposeUtil",{statics:{disposeObjects:function(obj,arr,disposeSingletons){var name;

for(var i=0,l=arr.length;i<l;i++){name=arr[i];

if(obj[name]==null||!obj.hasOwnProperty(name)){continue;
}
if(!qx.core.ObjectRegistry.inShutDown){if(obj[name].dispose){if(!disposeSingletons&&obj[name].constructor.$$instance){throw new Error("The object stored in key "+name+" is a singleton! Please use disposeSingleton instead.");
}else{obj[name].dispose();
}}else{throw new Error("Has no disposable object under key: "+name+"!");
}}obj[name]=null;
}},disposeArray:function(obj,field){var data=obj[field];

if(!data){return;
}if(qx.core.ObjectRegistry.inShutDown){obj[field]=null;
return;
}try{var entry;

for(var i=data.length-1;i>=0;i--){entry=data[i];

if(entry){entry.dispose();
}}}catch(ex){throw new Error("The array field: "+field+" of object: "+obj+" has non disposable entries: "+ex);
}data.length=0;
obj[field]=null;
},disposeMap:function(obj,field){var data=obj[field];

if(!data){return;
}if(qx.core.ObjectRegistry.inShutDown){obj[field]=null;
return;
}try{for(var key in data){if(data.hasOwnProperty(key)){data[key].dispose();
}}}catch(ex){throw new Error("The map field: "+field+" of object: "+obj+" has non disposable entries: "+ex);
}obj[field]=null;
},disposeTriggeredBy:function(disposeMe,trigger){var triggerDispose=trigger.dispose;
trigger.dispose=function(){triggerDispose.call(trigger);
disposeMe.dispose();
};
}}});
qx.Interface.define("qx.event.IEventDispatcher",{members:{canDispatchEvent:function(target,event,type){this.assertInstance(event,qx.event.type.Event);
this.assertString(type);
},dispatchEvent:function(target,event,type){this.assertInstance(event,qx.event.type.Event);
this.assertString(type);
}}});
qx.Class.define("qx.event.dispatch.Direct",{extend:qx.core.Object,implement:qx.event.IEventDispatcher,construct:function(manager){this._manager=manager;
},statics:{PRIORITY:qx.event.Registration.PRIORITY_LAST},members:{canDispatchEvent:function(target,event,type){return !event.getBubbles();
},dispatchEvent:function(target,event,type){var expectedEventClassName,expectedEventClass;
{};
event.setEventPhase(qx.event.type.Event.AT_TARGET);
var listeners=this._manager.getListeners(target,type,false);

if(listeners){for(var i=0,l=listeners.length;i<l;i++){var context=listeners[i].context||target;
listeners[i].handler.call(context,event);
}}}},defer:function(statics){qx.event.Registration.addDispatcher(statics);
}});
qx.Class.define("qx.event.handler.Object",{extend:qx.core.Object,implement:qx.event.IEventHandler,statics:{PRIORITY:qx.event.Registration.PRIORITY_LAST,SUPPORTED_TYPES:null,TARGET_CHECK:qx.event.IEventHandler.TARGET_OBJECT,IGNORE_CAN_HANDLE:false},members:{canHandleEvent:function(target,type){return qx.Class.supportsEvent(target.constructor,type);
},registerEvent:function(target,type,capture){},unregisterEvent:function(target,type,capture){}},defer:function(statics){qx.event.Registration.addHandler(statics);
}});
qx.Class.define("qx.lang.Generics",{statics:{__map:{"Array":["join","reverse","sort","push","pop","shift","unshift","splice","concat","slice","indexOf","lastIndexOf","forEach","map","filter","some","every"],"String":["quote","substring","toLowerCase","toUpperCase","charAt","charCodeAt","indexOf","lastIndexOf","toLocaleLowerCase","toLocaleUpperCase","localeCompare","match","search","replace","split","substr","concat","slice"]},__wrap:function(obj,func){return function(s){return obj.prototype[func].apply(s,Array.prototype.slice.call(arguments,1));
};
},__init:function(){var map=qx.lang.Generics.__map;

for(var key in map){var obj=window[key];
var arr=map[key];

for(var i=0,l=arr.length;i<l;i++){var func=arr[i];

if(!obj[func]){obj[func]=qx.lang.Generics.__wrap(obj,func);
}}}}},defer:function(statics){statics.__init();
}});

