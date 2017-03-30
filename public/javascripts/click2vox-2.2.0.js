// Voxbone Click2Vox Widget library
// Version - v2.2.0

/* jshint ignore:start */

/** vim: et:ts=4:sw=4:sts=4
 * @license RequireJS 2.3.2 Copyright jQuery Foundation and other contributors.
 * Released under MIT license, https://github.com/requirejs/requirejs/blob/master/LICENSE
 */
var requirejs,require,define;!function(global,setTimeout){function commentReplace(e,t){return t||""}function isFunction(e){return"[object Function]"===ostring.call(e)}function isArray(e){return"[object Array]"===ostring.call(e)}function each(e,t){if(e){var i;for(i=0;i<e.length&&(!e[i]||!t(e[i],i,e));i+=1);}}function eachReverse(e,t){if(e){var i;for(i=e.length-1;i>-1&&(!e[i]||!t(e[i],i,e));i-=1);}}function hasProp(e,t){return hasOwn.call(e,t)}function getOwn(e,t){return hasProp(e,t)&&e[t]}function eachProp(e,t){var i;for(i in e)if(hasProp(e,i)&&t(e[i],i))break}function mixin(e,t,i,r){return t&&eachProp(t,function(t,n){!i&&hasProp(e,n)||(!r||"object"!=typeof t||!t||isArray(t)||isFunction(t)||t instanceof RegExp?e[n]=t:(e[n]||(e[n]={}),mixin(e[n],t,i,r)))}),e}function bind(e,t){return function(){return t.apply(e,arguments)}}function scripts(){return document.getElementsByTagName("script")}function defaultOnError(e){throw e}function getGlobal(e){if(!e)return e;var t=global;return each(e.split("."),function(e){t=t[e]}),t}function makeError(e,t,i,r){var n=new Error(t+"\nhttp://requirejs.org/docs/errors.html#"+e);return n.requireType=e,n.requireModules=r,i&&(n.originalError=i),n}function newContext(e){function t(e){var t,i;for(t=0;t<e.length;t++)if(i=e[t],"."===i)e.splice(t,1),t-=1;else if(".."===i){if(0===t||1===t&&".."===e[2]||".."===e[t-1])continue;t>0&&(e.splice(t-1,2),t-=2)}}function i(e,i,r){var n,o,a,s,u,c,d,p,f,l,h,m,g=i&&i.split("/"),v=y.map,x=v&&v["*"];if(e&&(e=e.split("/"),d=e.length-1,y.nodeIdCompat&&jsSuffixRegExp.test(e[d])&&(e[d]=e[d].replace(jsSuffixRegExp,"")),"."===e[0].charAt(0)&&g&&(m=g.slice(0,g.length-1),e=m.concat(e)),t(e),e=e.join("/")),r&&v&&(g||x)){a=e.split("/");e:for(s=a.length;s>0;s-=1){if(c=a.slice(0,s).join("/"),g)for(u=g.length;u>0;u-=1)if(o=getOwn(v,g.slice(0,u).join("/")),o&&(o=getOwn(o,c))){p=o,f=s;break e}!l&&x&&getOwn(x,c)&&(l=getOwn(x,c),h=s)}!p&&l&&(p=l,f=h),p&&(a.splice(0,f,p),e=a.join("/"))}return n=getOwn(y.pkgs,e),n?n:e}function r(e){isBrowser&&each(scripts(),function(t){if(t.getAttribute("data-requiremodule")===e&&t.getAttribute("data-requirecontext")===q.contextName)return t.parentNode.removeChild(t),!0})}function n(e){var t=getOwn(y.paths,e);if(t&&isArray(t)&&t.length>1)return t.shift(),q.require.undef(e),q.makeRequire(null,{skipMap:!0})([e]),!0}function o(e){var t,i=e?e.indexOf("!"):-1;return i>-1&&(t=e.substring(0,i),e=e.substring(i+1,e.length)),[t,e]}function a(e,t,r,n){var a,s,u,c,d=null,p=t?t.name:null,f=e,l=!0,h="";return e||(l=!1,e="_@r"+(T+=1)),c=o(e),d=c[0],e=c[1],d&&(d=i(d,p,n),s=getOwn(j,d)),e&&(d?h=s&&s.normalize?s.normalize(e,function(e){return i(e,p,n)}):e.indexOf("!")===-1?i(e,p,n):e:(h=i(e,p,n),c=o(h),d=c[0],h=c[1],r=!0,a=q.nameToUrl(h))),u=!d||s||r?"":"_unnormalized"+(A+=1),{prefix:d,name:h,parentMap:t,unnormalized:!!u,url:a,originalName:f,isDefine:l,id:(d?d+"!"+h:h)+u}}function s(e){var t=e.id,i=getOwn(S,t);return i||(i=S[t]=new q.Module(e)),i}function u(e,t,i){var r=e.id,n=getOwn(S,r);!hasProp(j,r)||n&&!n.defineEmitComplete?(n=s(e),n.error&&"error"===t?i(n.error):n.on(t,i)):"defined"===t&&i(j[r])}function c(e,t){var i=e.requireModules,r=!1;t?t(e):(each(i,function(t){var i=getOwn(S,t);i&&(i.error=e,i.events.error&&(r=!0,i.emit("error",e)))}),r||req.onError(e))}function d(){globalDefQueue.length&&(each(globalDefQueue,function(e){var t=e[0];"string"==typeof t&&(q.defQueueMap[t]=!0),O.push(e)}),globalDefQueue=[])}function p(e){delete S[e],delete k[e]}function f(e,t,i){var r=e.map.id;e.error?e.emit("error",e.error):(t[r]=!0,each(e.depMaps,function(r,n){var o=r.id,a=getOwn(S,o);!a||e.depMatched[n]||i[o]||(getOwn(t,o)?(e.defineDep(n,j[o]),e.check()):f(a,t,i))}),i[r]=!0)}function l(){var e,t,i=1e3*y.waitSeconds,o=i&&q.startTime+i<(new Date).getTime(),a=[],s=[],u=!1,d=!0;if(!x){if(x=!0,eachProp(k,function(e){var i=e.map,c=i.id;if(e.enabled&&(i.isDefine||s.push(e),!e.error))if(!e.inited&&o)n(c)?(t=!0,u=!0):(a.push(c),r(c));else if(!e.inited&&e.fetched&&i.isDefine&&(u=!0,!i.prefix))return d=!1}),o&&a.length)return e=makeError("timeout","Load timeout for modules: "+a,null,a),e.contextName=q.contextName,c(e);d&&each(s,function(e){f(e,{},{})}),o&&!t||!u||!isBrowser&&!isWebWorker||w||(w=setTimeout(function(){w=0,l()},50)),x=!1}}function h(e){hasProp(j,e[0])||s(a(e[0],null,!0)).init(e[1],e[2])}function m(e,t,i,r){e.detachEvent&&!isOpera?r&&e.detachEvent(r,t):e.removeEventListener(i,t,!1)}function g(e){var t=e.currentTarget||e.srcElement;return m(t,q.onScriptLoad,"load","onreadystatechange"),m(t,q.onScriptError,"error"),{node:t,id:t&&t.getAttribute("data-requiremodule")}}function v(){var e;for(d();O.length;){if(e=O.shift(),null===e[0])return c(makeError("mismatch","Mismatched anonymous define() module: "+e[e.length-1]));h(e)}q.defQueueMap={}}var x,b,q,E,w,y={waitSeconds:7,baseUrl:"./",paths:{},bundles:{},pkgs:{},shim:{},config:{}},S={},k={},M={},O=[],j={},P={},R={},T=1,A=1;return E={require:function(e){return e.require?e.require:e.require=q.makeRequire(e.map)},exports:function(e){if(e.usingExports=!0,e.map.isDefine)return e.exports?j[e.map.id]=e.exports:e.exports=j[e.map.id]={}},module:function(e){return e.module?e.module:e.module={id:e.map.id,uri:e.map.url,config:function(){return getOwn(y.config,e.map.id)||{}},exports:e.exports||(e.exports={})}}},b=function(e){this.events=getOwn(M,e.id)||{},this.map=e,this.shim=getOwn(y.shim,e.id),this.depExports=[],this.depMaps=[],this.depMatched=[],this.pluginMaps={},this.depCount=0},b.prototype={init:function(e,t,i,r){r=r||{},this.inited||(this.factory=t,i?this.on("error",i):this.events.error&&(i=bind(this,function(e){this.emit("error",e)})),this.depMaps=e&&e.slice(0),this.errback=i,this.inited=!0,this.ignore=r.ignore,r.enabled||this.enabled?this.enable():this.check())},defineDep:function(e,t){this.depMatched[e]||(this.depMatched[e]=!0,this.depCount-=1,this.depExports[e]=t)},fetch:function(){if(!this.fetched){this.fetched=!0,q.startTime=(new Date).getTime();var e=this.map;return this.shim?void q.makeRequire(this.map,{enableBuildCallback:!0})(this.shim.deps||[],bind(this,function(){return e.prefix?this.callPlugin():this.load()})):e.prefix?this.callPlugin():this.load()}},load:function(){var e=this.map.url;P[e]||(P[e]=!0,q.load(this.map.id,e))},check:function(){if(this.enabled&&!this.enabling){var e,t,i=this.map.id,r=this.depExports,n=this.exports,o=this.factory;if(this.inited){if(this.error)this.emit("error",this.error);else if(!this.defining){if(this.defining=!0,this.depCount<1&&!this.defined){if(isFunction(o)){if(this.events.error&&this.map.isDefine||req.onError!==defaultOnError)try{n=q.execCb(i,o,r,n)}catch(t){e=t}else n=q.execCb(i,o,r,n);if(this.map.isDefine&&void 0===n&&(t=this.module,t?n=t.exports:this.usingExports&&(n=this.exports)),e)return e.requireMap=this.map,e.requireModules=this.map.isDefine?[this.map.id]:null,e.requireType=this.map.isDefine?"define":"require",c(this.error=e)}else n=o;if(this.exports=n,this.map.isDefine&&!this.ignore&&(j[i]=n,req.onResourceLoad)){var a=[];each(this.depMaps,function(e){a.push(e.normalizedMap||e)}),req.onResourceLoad(q,this.map,a)}p(i),this.defined=!0}this.defining=!1,this.defined&&!this.defineEmitted&&(this.defineEmitted=!0,this.emit("defined",this.exports),this.defineEmitComplete=!0)}}else hasProp(q.defQueueMap,i)||this.fetch()}},callPlugin:function(){var e=this.map,t=e.id,r=a(e.prefix);this.depMaps.push(r),u(r,"defined",bind(this,function(r){var n,o,d,f=getOwn(R,this.map.id),l=this.map.name,h=this.map.parentMap?this.map.parentMap.name:null,m=q.makeRequire(e.parentMap,{enableBuildCallback:!0});return this.map.unnormalized?(r.normalize&&(l=r.normalize(l,function(e){return i(e,h,!0)})||""),o=a(e.prefix+"!"+l,this.map.parentMap),u(o,"defined",bind(this,function(e){this.map.normalizedMap=o,this.init([],function(){return e},null,{enabled:!0,ignore:!0})})),d=getOwn(S,o.id),void(d&&(this.depMaps.push(o),this.events.error&&d.on("error",bind(this,function(e){this.emit("error",e)})),d.enable()))):f?(this.map.url=q.nameToUrl(f),void this.load()):(n=bind(this,function(e){this.init([],function(){return e},null,{enabled:!0})}),n.error=bind(this,function(e){this.inited=!0,this.error=e,e.requireModules=[t],eachProp(S,function(e){0===e.map.id.indexOf(t+"_unnormalized")&&p(e.map.id)}),c(e)}),n.fromText=bind(this,function(i,r){var o=e.name,u=a(o),d=useInteractive;r&&(i=r),d&&(useInteractive=!1),s(u),hasProp(y.config,t)&&(y.config[o]=y.config[t]);try{req.exec(i)}catch(e){return c(makeError("fromtexteval","fromText eval for "+t+" failed: "+e,e,[t]))}d&&(useInteractive=!0),this.depMaps.push(u),q.completeLoad(o),m([o],n)}),void r.load(e.name,m,n,y))})),q.enable(r,this),this.pluginMaps[r.id]=r},enable:function(){k[this.map.id]=this,this.enabled=!0,this.enabling=!0,each(this.depMaps,bind(this,function(e,t){var i,r,n;if("string"==typeof e){if(e=a(e,this.map.isDefine?this.map:this.map.parentMap,!1,!this.skipMap),this.depMaps[t]=e,n=getOwn(E,e.id))return void(this.depExports[t]=n(this));this.depCount+=1,u(e,"defined",bind(this,function(e){this.undefed||(this.defineDep(t,e),this.check())})),this.errback?u(e,"error",bind(this,this.errback)):this.events.error&&u(e,"error",bind(this,function(e){this.emit("error",e)}))}i=e.id,r=S[i],hasProp(E,i)||!r||r.enabled||q.enable(e,this)})),eachProp(this.pluginMaps,bind(this,function(e){var t=getOwn(S,e.id);t&&!t.enabled&&q.enable(e,this)})),this.enabling=!1,this.check()},on:function(e,t){var i=this.events[e];i||(i=this.events[e]=[]),i.push(t)},emit:function(e,t){each(this.events[e],function(e){e(t)}),"error"===e&&delete this.events[e]}},q={config:y,contextName:e,registry:S,defined:j,urlFetched:P,defQueue:O,defQueueMap:{},Module:b,makeModuleMap:a,nextTick:req.nextTick,onError:c,configure:function(e){if(e.baseUrl&&"/"!==e.baseUrl.charAt(e.baseUrl.length-1)&&(e.baseUrl+="/"),"string"==typeof e.urlArgs){var t=e.urlArgs;e.urlArgs=function(e,i){return(i.indexOf("?")===-1?"?":"&")+t}}var i=y.shim,r={paths:!0,bundles:!0,config:!0,map:!0};eachProp(e,function(e,t){r[t]?(y[t]||(y[t]={}),mixin(y[t],e,!0,!0)):y[t]=e}),e.bundles&&eachProp(e.bundles,function(e,t){each(e,function(e){e!==t&&(R[e]=t)})}),e.shim&&(eachProp(e.shim,function(e,t){isArray(e)&&(e={deps:e}),!e.exports&&!e.init||e.exportsFn||(e.exportsFn=q.makeShimExports(e)),i[t]=e}),y.shim=i),e.packages&&each(e.packages,function(e){var t,i;e="string"==typeof e?{name:e}:e,i=e.name,t=e.location,t&&(y.paths[i]=e.location),y.pkgs[i]=e.name+"/"+(e.main||"main").replace(currDirRegExp,"").replace(jsSuffixRegExp,"")}),eachProp(S,function(e,t){e.inited||e.map.unnormalized||(e.map=a(t,null,!0))}),(e.deps||e.callback)&&q.require(e.deps||[],e.callback)},makeShimExports:function(e){function t(){var t;return e.init&&(t=e.init.apply(global,arguments)),t||e.exports&&getGlobal(e.exports)}return t},makeRequire:function(t,n){function o(i,r,u){var d,p,f;return n.enableBuildCallback&&r&&isFunction(r)&&(r.__requireJsBuild=!0),"string"==typeof i?isFunction(r)?c(makeError("requireargs","Invalid require call"),u):t&&hasProp(E,i)?E[i](S[t.id]):req.get?req.get(q,i,t,o):(p=a(i,t,!1,!0),d=p.id,hasProp(j,d)?j[d]:c(makeError("notloaded",'Module name "'+d+'" has not been loaded yet for context: '+e+(t?"":". Use require([])")))):(v(),q.nextTick(function(){v(),f=s(a(null,t)),f.skipMap=n.skipMap,f.init(i,r,u,{enabled:!0}),l()}),o)}return n=n||{},mixin(o,{isBrowser:isBrowser,toUrl:function(e){var r,n=e.lastIndexOf("."),o=e.split("/")[0],a="."===o||".."===o;return n!==-1&&(!a||n>1)&&(r=e.substring(n,e.length),e=e.substring(0,n)),q.nameToUrl(i(e,t&&t.id,!0),r,!0)},defined:function(e){return hasProp(j,a(e,t,!1,!0).id)},specified:function(e){return e=a(e,t,!1,!0).id,hasProp(j,e)||hasProp(S,e)}}),t||(o.undef=function(e){d();var i=a(e,t,!0),n=getOwn(S,e);n.undefed=!0,r(e),delete j[e],delete P[i.url],delete M[e],eachReverse(O,function(t,i){t[0]===e&&O.splice(i,1)}),delete q.defQueueMap[e],n&&(n.events.defined&&(M[e]=n.events),p(e))}),o},enable:function(e){var t=getOwn(S,e.id);t&&s(e).enable()},completeLoad:function(e){var t,i,r,o=getOwn(y.shim,e)||{},a=o.exports;for(d();O.length;){if(i=O.shift(),null===i[0]){if(i[0]=e,t)break;t=!0}else i[0]===e&&(t=!0);h(i)}if(q.defQueueMap={},r=getOwn(S,e),!t&&!hasProp(j,e)&&r&&!r.inited){if(!(!y.enforceDefine||a&&getGlobal(a)))return n(e)?void 0:c(makeError("nodefine","No define call for "+e,null,[e]));h([e,o.deps||[],o.exportsFn])}l()},nameToUrl:function(e,t,i){var r,n,o,a,s,u,c,d=getOwn(y.pkgs,e);if(d&&(e=d),c=getOwn(R,e))return q.nameToUrl(c,t,i);if(req.jsExtRegExp.test(e))s=e+(t||"");else{for(r=y.paths,n=e.split("/"),o=n.length;o>0;o-=1)if(a=n.slice(0,o).join("/"),u=getOwn(r,a)){isArray(u)&&(u=u[0]),n.splice(0,o,u);break}s=n.join("/"),s+=t||(/^data\:|^blob\:|\?/.test(s)||i?"":".js"),s=("/"===s.charAt(0)||s.match(/^[\w\+\.\-]+:/)?"":y.baseUrl)+s}return y.urlArgs&&!/^blob\:/.test(s)?s+y.urlArgs(e,s):s},load:function(e,t){req.load(q,e,t)},execCb:function(e,t,i,r){return t.apply(r,i)},onScriptLoad:function(e){if("load"===e.type||readyRegExp.test((e.currentTarget||e.srcElement).readyState)){interactiveScript=null;var t=g(e);q.completeLoad(t.id)}},onScriptError:function(e){var t=g(e);if(!n(t.id)){var i=[];return eachProp(S,function(e,r){0!==r.indexOf("_@r")&&each(e.depMaps,function(e){if(e.id===t.id)return i.push(r),!0})}),c(makeError("scripterror",'Script error for "'+t.id+(i.length?'", needed by: '+i.join(", "):'"'),e,[t.id]))}}},q.require=q.makeRequire(),q}function getInteractiveScript(){return interactiveScript&&"interactive"===interactiveScript.readyState?interactiveScript:(eachReverse(scripts(),function(e){if("interactive"===e.readyState)return interactiveScript=e}),interactiveScript)}var req,s,head,baseElement,dataMain,src,interactiveScript,currentlyAddingScript,mainScript,subPath,version="2.3.2",commentRegExp=/\/\*[\s\S]*?\*\/|([^:"'=]|^)\/\/.*$/gm,cjsRequireRegExp=/[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,jsSuffixRegExp=/\.js$/,currDirRegExp=/^\.\//,op=Object.prototype,ostring=op.toString,hasOwn=op.hasOwnProperty,isBrowser=!("undefined"==typeof window||"undefined"==typeof navigator||!window.document),isWebWorker=!isBrowser&&"undefined"!=typeof importScripts,readyRegExp=isBrowser&&"PLAYSTATION 3"===navigator.platform?/^complete$/:/^(complete|loaded)$/,defContextName="_",isOpera="undefined"!=typeof opera&&"[object Opera]"===opera.toString(),contexts={},cfg={},globalDefQueue=[],useInteractive=!1;if("undefined"==typeof define){if("undefined"!=typeof requirejs){if(isFunction(requirejs))return;cfg=requirejs,requirejs=void 0}"undefined"==typeof require||isFunction(require)||(cfg=require,require=void 0),req=requirejs=function(e,t,i,r){var n,o,a=defContextName;return isArray(e)||"string"==typeof e||(o=e,isArray(t)?(e=t,t=i,i=r):e=[]),o&&o.context&&(a=o.context),n=getOwn(contexts,a),n||(n=contexts[a]=req.s.newContext(a)),o&&n.configure(o),n.require(e,t,i)},req.config=function(e){return req(e)},req.nextTick="undefined"!=typeof setTimeout?function(e){setTimeout(e,4)}:function(e){e()},require||(require=req),req.version=version,req.jsExtRegExp=/^\/|:|\?|\.js$/,req.isBrowser=isBrowser,s=req.s={contexts:contexts,newContext:newContext},req({}),each(["toUrl","undef","defined","specified"],function(e){req[e]=function(){var t=contexts[defContextName];return t.require[e].apply(t,arguments)}}),isBrowser&&(head=s.head=document.getElementsByTagName("head")[0],baseElement=document.getElementsByTagName("base")[0],baseElement&&(head=s.head=baseElement.parentNode)),req.onError=defaultOnError,req.createNode=function(e,t,i){var r=e.xhtml?document.createElementNS("http://www.w3.org/1999/xhtml","html:script"):document.createElement("script");return r.type=e.scriptType||"text/javascript",r.charset="utf-8",r.async=!0,r},req.load=function(e,t,i){var r,n=e&&e.config||{};if(isBrowser)return r=req.createNode(n,t,i),r.setAttribute("data-requirecontext",e.contextName),r.setAttribute("data-requiremodule",t),!r.attachEvent||r.attachEvent.toString&&r.attachEvent.toString().indexOf("[native code")<0||isOpera?(r.addEventListener("load",e.onScriptLoad,!1),r.addEventListener("error",e.onScriptError,!1)):(useInteractive=!0,r.attachEvent("onreadystatechange",e.onScriptLoad)),r.src=i,n.onNodeCreated&&n.onNodeCreated(r,n,t,i),currentlyAddingScript=r,baseElement?head.insertBefore(r,baseElement):head.appendChild(r),currentlyAddingScript=null,r;if(isWebWorker)try{setTimeout(function(){},0),importScripts(i),e.completeLoad(t)}catch(r){e.onError(makeError("importscripts","importScripts failed for "+t+" at "+i,r,[t]))}},isBrowser&&!cfg.skipDataMain&&eachReverse(scripts(),function(e){if(head||(head=e.parentNode),dataMain=e.getAttribute("data-main"))return mainScript=dataMain,cfg.baseUrl||mainScript.indexOf("!")!==-1||(src=mainScript.split("/"),mainScript=src.pop(),subPath=src.length?src.join("/")+"/":"./",cfg.baseUrl=subPath),mainScript=mainScript.replace(jsSuffixRegExp,""),req.jsExtRegExp.test(mainScript)&&(mainScript=dataMain),cfg.deps=cfg.deps?cfg.deps.concat(mainScript):[mainScript],!0}),define=function(e,t,i){var r,n;"string"!=typeof e&&(i=t,t=e,e=null),isArray(t)||(i=t,t=null),!t&&isFunction(i)&&(t=[],i.length&&(i.toString().replace(commentRegExp,commentReplace).replace(cjsRequireRegExp,function(e,i){t.push(i)}),t=(1===i.length?["require"]:["require","exports","module"]).concat(t))),useInteractive&&(r=currentlyAddingScript||getInteractiveScript(),r&&(e||(e=r.getAttribute("data-requiremodule")),n=contexts[r.getAttribute("data-requirecontext")])),n?(n.defQueue.push([e,t,i]),n.defQueueMap[e]=!0):globalDefQueue.push([e,t,i])},define.amd={jQuery:!0},req.exec=function(text){return eval(text)},req(cfg)}}(this,"undefined"==typeof setTimeout?void 0:setTimeout);

/* jshint ignore:end */

requirejs.config({
  paths: {
    draggabilly: [
      "//unpkg.com/draggabilly@2.1/dist/draggabilly.pkgd.min",
      "//cdnjs.cloudflare.com/ajax/libs/draggabilly/2.1.1/draggabilly.pkgd.min"
    ],
    voxbone: "//cdn.voxbone.com/voxbone/voxbone-2.2.min"
  }
});

/* Begin loading draggabilly and assets only if this script didnt execute before*/
if (!voxButtonElements) {
  requirejs(['voxbone'],
    function() {
      loadAssets();
    }
  );
}

var head = document.getElementsByTagName('head')[0];
var infoVoxbone, voxButtonElement, voxButtonElements, audioContext;
var customText = '';

try {
  if (audioContext === undefined)
    audioContext = new AudioContext();
} catch (e) {
  console.log("Web Audio API not supported " + e);
}

voxButtonElements = document.getElementsByClassName('voxButton');
if (voxButtonElements === undefined) {
  voxButtonElements = [];
  voxButtonElements[0] = document.createElement("div");
  voxButtonElements[0].className = "voxButton";
  voxButtonElements[0].dataset.use_default_button_css = false;
  // document.body.appendChild(voxButtonElement);
}

function loadCss(url) {
  var link = document.createElement("link");
  link.type = "text/css";
  link.rel = "stylesheet";
  link.href = url;
  document.getElementsByTagName("head")[0].appendChild(link);
}

var loadAssets = (function() {
  Array.prototype.forEach.call(voxButtonElements, function(voxButtonElement) {
    infoVoxbone = voxButtonElement.dataset;
    infoVoxbone.server_url = (infoVoxbone.server_url === undefined) ? 'https://click2vox.com' : infoVoxbone.server_url;

    if(infoVoxbone.use_default_button_css !== 'false')
      loadCss(infoVoxbone.server_url + '/stylesheets/vxb-button.css');

    renderButton(voxButtonElement);
  });

  voxButtonElement = voxButtonElements[0];
  infoVoxbone = voxButtonElement.dataset;
  loadCss(infoVoxbone.server_url + '/stylesheets/vxb-widget.css');
  renderWidget();

  //Bind click event to rendered buttons
  handleEvent('click', '.vxb-widget-box #launch_call', function (e) {
    voxButtonElement = this.parentElement.parentElement;
    e.preventDefault();
    infoVoxbone = voxButtonElement.dataset;
    customText = '';

    if (infoVoxbone.widget_texts) {
      try {
        customText = JSON.parse(infoVoxbone.widget_texts).custom;
      } catch (error) {}
    }

    if(!isChromeOnHttp()){
      makeCall();
    } else if (!isPopUp() && infoVoxbone.https_popup !== 'false'){
      openPopup();
      return false;
    }

  });

  initVoxbone();
});

var renderButton = (function(voxButtonElement){
  var infoVoxbone = voxButtonElement.dataset;
  var links = '';
  var show_frame = infoVoxbone.show_frame !== 'false';
  var customText = '';

  /*Keep the button hidden until all assets and the call is ready
  to be made. This avoids glitches and prohibits the user to
  click on a non ready button. If the browser doesnt support webrtc
  we don't want to hide the button, since the readyToCall event will
  never fire*/
  if (isWebRTCSupported() && !isChromeOnHttp())
    voxButtonElement.style.display = 'none';

  if (infoVoxbone.widget_texts) {
    try {
      customText = JSON.parse(infoVoxbone.widget_texts).custom;
    } catch (error) {
      console.log(error);
    }
  }

  if (!show_frame) {
    infoVoxbone.div_css_class_name += ' no-frame';
    infoVoxbone.div_css_class_name += ' no-branding';
    infoVoxbone.test_setup = 'false';
    infoVoxbone.show_branding = 'false';
  }

  if (infoVoxbone.test_setup !== 'false') {
    if (customText.test_your_setup) {
      links = '\
      <div class="widget-footer-left">\
        <a class="widget-footer-left-text" href="https://test.webrtc.org/" target="_blank">'+customText.test_your_setup+'</a>\
      </div>\
      ';
    } else {
      links = '\
      <div class="widget-footer-left">\
        <a class="widget-footer-left-text" href="https://test.webrtc.org/" target="_blank">Test your setup</a>\
      </div>\
      ';
    }
  }

  if (infoVoxbone.show_branding !== 'false') {
    if (customText.powered_by){
      links += '\
      <div class="widget-footer-right">\
        <a class="widget-footer-right-text" href="https://voxbone.com" target="_blank">'+ customText.powered_by +'</a>\
      </div> \
      ';
    } else {
      links += '\
      <div class="widget-footer-right">\
        <a class="widget-footer-right-text" href="https://voxbone.com" target="_blank">powered by:</a>\
      </div> \
      ';
    }
  }

  var custom_button_color = '';
  if (infoVoxbone.custom_button_color) {
    custom_button_color = 'style="border: ' + infoVoxbone.custom_button_color + '; background: ' + infoVoxbone.custom_button_color + '"';
  }

  var custom_frame_color = '';
  if (infoVoxbone.custom_frame_color) {
    custom_frame_color = "background:" + infoVoxbone.custom_frame_color;
  }

  if (!isWebRTCSupported() && infoVoxbone.incompatible_browser_configuration === 'hide_widget') {
    custom_frame_color += (isWebRTCSupported() ? '' : '; display: none; ');
  } else if (!isWebRTCSupported() && infoVoxbone.incompatible_browser_configuration === 'show_text_html') {
    voxButtonElement.innerHTML += ' \
    <div style="' + custom_frame_color + '" id="launch_call_div" class="vxb-widget-box ' + (infoVoxbone.div_css_class_name || "style-b") + '">\
      <span>' + unescape(infoVoxbone.text_html) + '</span>\
    </div>\
    ';
  } else {
    voxButtonElement.innerHTML += ' \
    <div style="' + custom_frame_color + '" id="launch_call_div" class="vxb-widget-box ' + (infoVoxbone.div_css_class_name || "style-b") + '">\
      <button id="launch_call" ' + custom_button_color + ' class="vxb-btn-style ' + (infoVoxbone.button_css_class_name) + '"><span>' + unescape(customText.button || infoVoxbone.text) + '</span></button>\
      ' + links + '\
    </div>\
    ';
  }
});

var renderWidget = (function(){
  //If the widget was already rendered, remove it
  var oldAudioTag = document.getElementById("audio-ringback-tone");
  if (oldAudioTag)
    oldAudioTag.parentNode.removeChild(oldAudioTag);
  var oldWrapper = document.getElementsByClassName("vox-widget-wrapper")[0];
  if (oldWrapper)
    oldWrapper.parentNode.removeChild(oldWrapper);


  // Don't load anything if we're not going to show anything
  if (!isWebRTCSupported() && (!infoVoxbone.incompatible_browser_configuration || infoVoxbone.incompatible_browser_configuration === 'hide_widget')) {
    console.log('Not showing the Voxbone Button/Widget');
    return;
  }

  var voxBranding = '\
    <div id="vw-footer" class="vw-footer"> \
      <a class="vw-footer-text" href="https://voxbone.com" target="_blank">powered by:</a> \
    </div>\
  ';

  var voxPopup = ' \
    <audio id="audio-ringback-tone" preload="auto" loop> \
      <source src="https://cdn.voxbone.com/lib/US_ringback_tone.ogg" type="audio/ogg"> \
    </audio> \
    <div style="display: none;" class="vox-widget-wrapper hidden"> \
      <div class="vw-main"> \
        <div class="vw-header"> \
          <div class="vw-title-bar"> \
            <span class="vw-title" id="vw-title">Starting Call</span> \
            <span class="vw-animated-dots">.</span> \
            <span class="vw-animated-dots">.</span> \
            <span class="vw-animated-dots">.</span> \
          </div> \
          <div class="vw-actions"> \
            <a href="#" class="vxb-widget-mic"> \
              <i class="vw-icon vx-icon-mic-dark"></i> \
              <div class="vox-mic-vumeter int-sensor-dark"> \
                <em id="mic5"></em> \
                <em id="mic4"></em> \
                <em id="mic3"></em> \
                <em id="mic2"></em> \
                <em id="mic1"></em> \
              </div> \
            </a> \
            <a href="#" id="full-screen"><i class="vw-icon vx-icon-full-screen-off"></i></a> \
            <a href="#" id="close-screen"><i class="vw-icon vx-icon-close"></i></a> \
          </div> \
        </div> \
        <div id="vw-body" class="vw-body"> \
          <div id="vw-unable-to-acces-mic" class="vw-unable-to-acces-mic hidden"> \
            <p class="vw-unable-to-acces-mic-text" style="color: red;">Oops. It looks like we are unable to use your microphone.</p> \
            <p class="vw-unable-to-acces-mic-text-2" >Please enable microphone access in your browser to allow this call</p> \
          </div> \
          <div id="vw-in-call"> \
            <div id="vw-btn-group" class="vw-btn-group"> \
              <a href="#" class="vxb-widget-mic minimized"> \
                <i class="vw-icon vx-icon-mic"></i> \
                <div class="vox-mic-vumeter int-sensor"> \
                  <em id="mic5"></em> \
                  <em id="mic4"></em> \
                  <em id="mic3"></em> \
                  <em id="mic2"></em> \
                  <em id="mic1"></em> \
                </div> \
              </a> \
              <a href="#" class="hidden"> \
                <i class="vw-icon vx-icon-vol"></i> \
                <div class="vox-audio-vumeter"> \
                  <em id="vol5"></em> \
                  <em id="vol4"></em> \
                  <em id="vol3"></em> \
                  <em id="vol2"></em> \
                  <em id="vol1"></em> \
                </div> \
              </a> \
              <a href="#" id="dialpad"><i class="vw-icon vx-icon-pad"></i></a> \
            </div> \
            <a href="#" id="vw-end-call" class="vw-end-call"><i class="vw-icon vx-icon-phone"></i>End Call</a> \
            <div id="vw-dialpad" class="vw-dialpad"> \
              <ul> \
                <li class="vw-dialpadkey-1 vw-tl">1</li> \
                <li class="vw-dialpadkey-2">2</li> \
                <li class="vw-dialpadkey-3 vw-tr">3</li> \
                <li class="vw-dialpadkey-4">4</li> \
                <li class="vw-dialpadkey-5">5</li> \
                <li class="vw-dialpadkey-6">6</li> \
                <li class="vw-dialpadkey-7">7</li> \
                <li class="vw-dialpadkey-8">8</li> \
                <li class="vw-dialpadkey-9">9</li> \
                <li class="vw-dialpadkey-* vw-bl">*</li> \
                <li class="vw-dialpadkey-0">0</li> \
                <li class="vw-dialpadkey-# vw-br">#</li> \
              </ul> \
            </div> \
          </div> \
          <div id="vw-rating" class="vw-rating hidden"> \
            <form name="rating"> \
              <div id="vw-rating-question" class="vw-question">How was the quality of your call?</div> \
              <div id="vw-rating-stars" class="vw-stars"> \
                <input type="radio" id="vxb-star5" name="vxb-rate" value="5"> \
                <label for="vxb-star5" title="Excellent">5 stars</label> \
                <input type="radio" id="vxb-star4" name="vxb-rate" value="4"> \
                <label for="vxb-star4" title="Very Good">4 stars</label> \
                <input type="radio" id="vxb-star3" name="vxb-rate" value="3"> \
                <label for="vxb-star3" title="Good">3 stars</label> \
                <input type="radio" id="vxb-star2" name="vxb-rate" value="2"> \
                <label for="vxb-star2" title="Poor">2 stars</label> \
                <input type="radio" id="vxb-star1" name="vxb-rate" value="1"> \
                <label for="vxb-star1" title="Unacceptable">1 star</label> \
              </div> \
              <div id="vw-rating-message" class="vw-message">\
                <p id="vw-rating-comment-question" class="vw-rating-question">Any additional feedback?</p> \
                <input type="text" name="rating-message" id="rating-message" placeholder="Optional"" class="form-control"> \
              </div> \
              <div id="vw-rating-button" class="vw-button"> \
                <button class="vxb-btn-style vxb-btn-style-disabled" id="send-rating"> \
                  <span class="send-rating-text">Send</span> \
                </button> \
              </div> \
            </form> \
          </div> \
          <div id="vw-rating-after-message" class="vw-rating hidden"> \
            <p class="vw-rating-after-message-text">Thank you for using our service</p> \
          </div>\
  ';

  // showing voxbone branding
  if (infoVoxbone.show_branding !== 'false')
    voxPopup += voxBranding;

  // let's close the popup markup
  voxPopup += '\
        </div> \
      </div> \
    </div> \
    <div class="vox-widget-draggable" style="position: fixed; width: 100%; bottom: 0; top: 0; left: 0; z-index: -1"></div>\
  ';

  voxButtonElement.insertAdjacentHTML('beforeend', voxPopup);
  editText(customText);

  // Start of Widget Events
  //
  // Click on Send Rating button event
  handleEvent('click', '.vox-widget-wrapper #send-rating', function (e) {
    e.preventDefault();

    var rate = document.querySelector('.vox-widget-wrapper input[name=vxb-rate]:checked');
    if (!rate) return;

    var comment = document.querySelector('.vox-widget-wrapper #rating-message');
    var commentValue = comment ? comment.value : "";

    var data =  { rate: rate.value, comment: commentValue, url: document.URL, token: infoVoxbone.button_id };
    var message = { action: 'rate', data: data };

    sendRate(message.data);

    hideElement(".vox-widget-wrapper #vw-rating");
    showElement(".vox-widget-wrapper #vw-rating-after-message");

    if (isPopUp())
      closePopUp();

  });

  // Click Rating star buttons event
  var starRatingButtons = document.querySelectorAll(".vox-widget-wrapper input[name=vxb-rate]");
  Array.prototype.forEach.call(starRatingButtons, function(el, i) {
    el.addEventListener('click', function (e) {
      var element = document.querySelector(".vox-widget-wrapper #send-rating");
      element.classList.add('vxb-btn-style');
      element.classList.remove('vxb-btn-style-disabled');
    });
  });

  // Click on Pad buttons event
  var padButtons = document.querySelectorAll(".vox-widget-wrapper .vw-dialpad li");
  Array.prototype.forEach.call(padButtons, function(el, i) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      callAction(this.textContent);
    });
  });

  // Get dialpad values from keyboard
  document.body.addEventListener('keydown', function(event){

    // Avoid capturing keys if the focus is in an element which captures keys
    if (['input', 'select'].indexOf(event.target.nodeName.toLowerCase()) > -1)
      return;

    // Only catch 0,1,2,3,4,5,6,7,8,9,*,# keys
    if (!event.key.match(/[0-9\*#]/))
      return;

    // Only catch keys if there is a call on going
    if (!isInCall())
      return;

    var el = document.getElementsByClassName(`vw-dialpadkey-${event.key}`)[0];
    if (el) {
      el.classList.add('active');
    }

    callAction(event.key);
  });

  document.body.addEventListener('keyup', function(event){
    if (!event.key.match(/[0-9\*#]/)) return;

    var el = document.getElementsByClassName(`vw-dialpadkey-${event.key}`)[0];
    if (el)
      el.classList.remove('active');
  });

  // End call button event
  handleEvent('click', '.vox-widget-wrapper .vw-end-call', function (e) {
    e.preventDefault();
    resetWidget(voxButtonElement);
    callAction('hang_up');
  });

  // Close Widget button event
  handleEvent('click', '.vox-widget-wrapper #close-screen i', function (e) {
    e.preventDefault();
    hideElement(".vox-widget-wrapper");

    callAction('hang_up');

    // send "no rating"
    var data =  { rate: 0, comment: 'Closed Without Rating', url: document.URL };
    var message = { action: 'rate', data: data };
    callAction(message);
  });

  // Open Widget button event
  handleEvent('click', '.vox-widget-wrapper #full-screen i', function (e) {
    e.preventDefault();

    var widget_body_selector = ".vox-widget-wrapper #vw-body";
    document.querySelector(widget_body_selector).classList.toggle('hidden');

    var widget_mic_header_selector = ".vox-widget-wrapper .vw-header";

    if (document.querySelector(widget_body_selector + " #vw-in-call").classList.contains('hidden'))
      document.querySelector(widget_mic_header_selector).classList.remove('minimized');
    else
      document.querySelector(widget_mic_header_selector).classList.toggle('minimized');

    this.classList.toggle('vx-icon-full-screen-on');
    this.classList.toggle('vx-icon-full-screen-off');
  });

  // Pad button event
  handleEvent('click', '.vox-widget-wrapper i.vx-icon-pad', function (e) {
    e.preventDefault();
    var element = document.querySelector(".vox-widget-wrapper .vw-dialpad");
    element.classList.toggle('active');
  });

  // Mic button event
  handleEvent('click', '.vox-widget-wrapper .vxb-widget-mic', function (e) {
    e.preventDefault();

    callAction('microphone_mute');
  });

  requirejs(['draggabilly'],
    function(Draggabilly) {
    //Just let the whole widget drag when tapping on Title Bar
      var draggable = new Draggabilly('.vox-widget-wrapper .vw-main', {
        handle: '.vw-title-bar',
        containment: '.vox-widget-draggable'
      });
      var draggableFixed = false;

      draggable.on('dragEnd', function() {
      //modifying the widget position to fixed for containing it inside the screen when expanded
        if (!document.querySelector('.vox-widget-wrapper[class*="vw-top"]') && !draggableFixed) {
          var screen_h = window.innerHeight;
          var widget = document.querySelector(".vox-widget-wrapper .vw-main");
          var measures = widget.getBoundingClientRect();
          widget.style.position = "fixed";
          var measures_after = widget.getBoundingClientRect();
          widget.style.transform = 'translate3D(' + (measures.left-measures_after.left) + 'px, ' + (screen_h-measures.height) + 'px, 0)';
          draggableFixed = true;
        }

      });
    }
  );
  //
  // End of Widget Events
});

var initVoxbone = (function() {
  var autoDialFired = false;

  function getVoxrtcConfig(callback) {
    var request = new XMLHttpRequest();

    var dict = {
      username: infoVoxbone.voxbone_webrtc_username || '',
      secret: infoVoxbone.voxbone_webrtc_password || ''
    };

    var params = voxbone.Request.param(dict);
    var url = infoVoxbone.server_url + '/token_config?' + params;

    request.open('GET', url, true);

    request.onload = function() {
      if (request.status === 200)
        /*jshint evil:true*/
        /*We are skipping this because its unlikely to have code injection
        issues since we are bringing the response from the backend*/
        callback(eval('(' + request.responseText + ')'));
    };

    request.send();
  }

  function sendPostMessage(action, value){
    if (typeof value === 'undefined')
      value = '';

    postMessage({ action: action, value: value }, "*");
  }

  var eventHandlers = {
    'localMediaVolume': function (e) {
      if(voxbone.WebRTC.isMuted) return;
      sendPostMessage('setMicVolume', e.localVolume);
    },

    'remoteMediaVolume': function (e) {
      // sendPostMessage('setRemoteVolume', e.remoteVolume);
    },

    'progress': function (e) {
      console.log('Calling...');
      //- sendPostMessage('setCallCalling');
    },

    'failed': function (e){
      console.log('Failed to connect: ' + e.cause);
      sendPostMessage('setCallFailed', e.cause.substr(0,11));

      if (isPopUp())
        closePopUp();

    },

    'accepted': function (e){
      console.log('Call started');
      sendPostMessage('setInCall');
    },

    'ended': function (e){
      console.log('Call ended');
      sendPostMessage('setCallEnded');

      if (isPopUp() && infoVoxbone.rating === "false")
        closePopUp();

    },

    'getUserMediaFailed': function (e){
      console.log('Cannot get User Media');
      sendPostMessage('setCallFailedUserMedia');
    },

    'getUserMediaAccepted': function(e) {
      sendPostMessage('setCallCalling');
      console.log('local media accepted');
      voxbone.Logger.loginfo("local media accepted");
    },

    'readyToCall': function(e) {
      // When the call is ready to be made, display all the buttons
      var voxButtonElements = document.getElementsByClassName('voxButton');
      Array.prototype.forEach.call(voxButtonElements, function(voxButtonElement) {
        voxButtonElement.style.display = 'block';
      });

      if (infoVoxbone.auto_dial === 'true' && !autoDialFired) {
        autoDialFired = true;
        makeCall();
      }

    },

    'authExpired': function (e){
      console.log('Auth Expired!');
      handleAuth();
    }
  };

  function handleAuth() {
    var basic = (infoVoxbone.basic_auth === 'true');
    var username = infoVoxbone.voxbone_webrtc_username;
    var key = infoVoxbone.voxbone_webrtc_password;
    var serverAuthUrl = infoVoxbone.server_auth_url;

    if (basic && username && key) {
      voxbone.WebRTC.basicAuthInit(username, key);
    } else if (!basic && serverAuthUrl) {
      requirejs([serverAuthUrl],
        function() {
          voxbone.WebRTC.init(voxrtc_config);
        }
      );
    } else {
      voxbone.WebRTC.authServerURL = voxbone.WebRTC.authServerURL || "https://webrtc.voxbone.com/rest/authentication/createToken";

      // NOTE: using `custom_auth_data` makes mandatory handling `authExpired` event separately
      if (infoVoxbone.custom_auth_data) {
        var data = {};
        if (typeof infoVoxbone.custom_auth_data === 'string')
          data = JSON.parse(infoVoxbone.custom_auth_data);
        else
          data = infoVoxbone.custom_auth_data;

        voxbone.WebRTC.init(data);
      } else {
        getVoxrtcConfig(function(data) {
          voxbone.WebRTC.init(data);
        });
      }

    }
  }

  function notifyLoaded() {
    // NOTE: if we plan to support IE -someday- we need to make sure to
    // implement this in a way that works for IE.
    // check this out for reference: http://caniuse.com/#feat=customevent
    var event = new CustomEvent("click2vox-ready", {
      "detail": {
        "infoVoxbone": infoVoxbone,
        "webrtcSupported": isWebRTCSupported()
      }
    });

    // Dispatch/Trigger the event on top of the document
    document.dispatchEvent(event);
  }

  function init() {
    if (isWebRTCSupported() && !isChromeOnHttp()) {
      voxbone.WebRTC.configuration.post_logs = true;
      voxbone.WebRTC.customEventHandler = Object.assign(voxbone.WebRTC.customEventHandler, eventHandlers);
      handleAuth();
    } else if (isChromeOnHttp()) {
      console.log("The call will take place in an https popup. WebRTC doesn't work in Chrome on HTTP -> https://sites.google.com/a/chromium.org/dev/Home/chromium-security/deprecating-powerful-features-on-insecure-origins");
    }
    notifyLoaded();
  }

  window.addEventListener('message', function(event) {
    var message = event.data;
    switch(message.action) {

      case 'setMicVolume':
        clearMicDots();
        if (message.value > 0.01) setMicDot('1');
        if (message.value > 0.05) setMicDot('2');
        if (message.value > 0.10) setMicDot('3');
        if (message.value > 0.20) setMicDot('4');
        if (message.value > 0.30) setMicDot('5');
        break;

      case 'setCallCalling':
        if (infoVoxbone.ringback !== 'false')
          playRingbackTone();

        if (customText.calling)
          setWidgetTitle(customText.calling);
        else
          setWidgetTitle("Calling");
        break;

      case 'setCallFailed':
        pauseRingbackTone();
        if (customText.failed) {
          setWidgetTitle(customText.failed + ': ' + editErrorMessage(message.value, customText));
        } else {
          setWidgetTitle("Call Failed: " + message.value);
        }
        hideAnimatedDots();
        hideElement('.vox-widget-wrapper #vw-in-call');
        showElement(".vox-widget-wrapper #vw-rating-after-message");
        break;

      case 'setInCall':
        pauseRingbackTone();
        if (customText.in_call)
          setWidgetTitle(customText.in_call);
        else
          setWidgetTitle("In Call");
        showAnimatedDots();
        break;

      case 'setCallEnded':
        resetWidget(voxButtonElement);
        if (customText.ended)
          setWidgetTitle(customText.ended);
        else
          setWidgetTitle("Call Ended");
        hideAnimatedDots();
        hideElement('.vox-widget-wrapper #vw-in-call');

        if (infoVoxbone.rating !== "false")
          showElement(".vox-widget-wrapper #vw-rating");
        else
          showElement(".vox-widget-wrapper #vw-rating-after-message");

        callAction('hang_up');
        break;

      case 'setCallFailedUserMedia':
        pauseRingbackTone();
        if (customText.failed)
          setWidgetTitle(customText.failed);
        else
          setWidgetTitle("Call Failed");
        hideAnimatedDots();
        hideElement('.vox-widget-wrapper #vw-in-call');
        showElement(".vox-widget-wrapper #vw-unable-to-acces-mic");
        break;
    }
  });
  init();
});

openPopup = function() {
  var w = 280;
  var h = 220;
  var left = (screen.width/2)-(w/2);
  var top = (screen.height/2)-(h/2);

  var buttonData = document.querySelector('.voxButton').dataset;
  var params = Object.keys(buttonData).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(buttonData[k])}`).join('&');
  var url = infoVoxbone.server_url;

  if (url === 'https://voxbone.com/click2vox')
    url = 'https://www.voxbone.com/click2vox';

  window.open(url + '/widget/portal-widget/get-html?' + params, '_blank', 'width='+w+',height='+h+',resizable=no,toolbar=no,menubar=no,location=no,status=no,top='+top+', left='+left);

  return false;
};

//customize default static text
var editText = function editText (edited_text) {
  var widgetElement = voxButtonElement.querySelector('.vox-widget-wrapper');
  var widgetLaunchCallElement = voxButtonElement.querySelector('#launch_call_div');

  if (edited_text.test_your_setup && infoVoxbone.test_setup !== 'false') widgetLaunchCallElement.querySelector('.widget-footer-left-text').innerHTML = edited_text.test_your_setup;

  if (edited_text.powered_by && infoVoxbone.show_branding !== 'false') {
      widgetLaunchCallElement.querySelector('.widget-footer-right-text').innerHTML = edited_text.powered_by;
      widgetElement.querySelector('.vw-footer-text').innerHTML = edited_text.powered_by;
  }

  if (edited_text.hang_up) widgetElement.querySelector('.vw-end-call').innerHTML = '<i class="vw-icon vx-icon-phone"></i>' + edited_text.hang_up;

  if (edited_text.rating_question) widgetElement.querySelector('#vw-rating-question').innerHTML = edited_text.rating_question;

  if (edited_text.rating_comment) widgetElement.querySelector('#vw-rating-comment-question').innerHTML = edited_text.rating_comment;

  if (edited_text.rating_send_button) widgetElement.querySelector('.send-rating-text').innerHTML = edited_text.rating_send_button;

  if (edited_text.rating_placeholder) widgetElement.querySelector('#rating-message').placeholder = edited_text.rating_placeholder;

  if (edited_text.unable_to_access_mic) widgetElement.querySelector('.vw-unable-to-acces-mic-text').innerHTML = edited_text.unable_to_access_mic;

  if (edited_text.unable_to_access_mic_instructions) widgetElement.querySelector('.vw-unable-to-acces-mic-text-2').innerHTML = edited_text.unable_to_access_mic_instructions;

  if (edited_text.thank_you_after_call) widgetElement.querySelector('.vw-rating-after-message-text').innerHTML = edited_text.thank_you_after_call;

};

function handleEvent (eventName, selector, callback) {
  var elements = document.querySelectorAll(selector);
  Array.prototype.forEach.call(elements, function(element, i) {
    element.addEventListener(eventName, callback);
  });
}

function isChromeOnHttp() {

  if (window.location.protocol !== "http:")
    return false;

  // Get if browser is Chrome/Chromium flavour
  // Based on http://stackoverflow.com/a/13348618/197376
  var isChromium = window.chrome,
    winNav = window.navigator,
    vendorName = winNav.vendor.toLowerCase(),
    isOpera = winNav.userAgent.indexOf("OPR") > -1,
    isIEedge = winNav.userAgent.indexOf("Edge") > -1;

  return (!!isChromium && vendorName === "google inc." && !isOpera && !isIEedge);
  }

function setWidgetTitle(title){
  var el = document.querySelector('.vox-widget-wrapper #vw-title');
  el.innerText = title;
}

function makeCall() {
  if (isInCall()) return;

  if (!isWebRTCSupported() && (infoVoxbone.incompatible_browser_configuration === 'link_button_to_a_page')) {
    var redirect_url = infoVoxbone.redirect_url || 'https://voxbone.com';
    window.open(redirect_url);
    return;
  }

  if (isWebRTCSupported()) {
    renderWidget();
    resetWidget();

    var caller_id = infoVoxbone.caller_id ? infoVoxbone.caller_id : "click2vox";
    voxbone.WebRTC.configuration.uri = (new JsSIP.URI(scheme = "sip", user = (caller_id).replace(/[^a-zA-Z0-9-_]/g, ''), "voxbone.com")).toString();

    if (infoVoxbone.context)
      voxbone.WebRTC.context = infoVoxbone.context;

    if (infoVoxbone.send_digits) {
      var sanitizedDigits = infoVoxbone.send_digits.toString().replace(/ /g, '');

      console.log('Digits to be send: ' + sanitizedDigits);
      voxbone.WebRTC.configuration.dialer_string = sanitizedDigits;
    }

    voxbone.WebRTC.call(infoVoxbone.did);

    window.addEventListener("beforeunload", function() {
      voxbone.WebRTC.unloadHandler();
    });

    if (isPopUp()) {
      var dialPad = document.querySelector(".vox-widget-wrapper .vw-dialpad");
      dialPad.classList.toggle('active');
      var wrapper = document.querySelector(".vox-widget-wrapper .vw-main");
      wrapper.style.margin = 0;
      var header = document.querySelector(".vox-widget-wrapper .vw-main .vw-header");
      header.style.borderRadius = 0;
      hideElement('.voxButton .vxb-widget-box');
      hideElement('.vox-widget-wrapper .vw-main .vw-header .vw-actions');
      window.resizeTo(330, 425);
    }
  }
}

function resetWidget() {

  if (customText.waiting_user_media)
      setWidgetTitle(customText.waiting_user_media);
  else
      setWidgetTitle("Waiting for User Media");

  clearMicDots();

  hideElement(".vox-widget-wrapper #vw-unable-to-acces-mic");
  hideElement(".vox-widget-wrapper #vw-rating-after-message");
  hideElement(".vox-widget-wrapper .vw-rating");

  //Widget placement
  var vox_widget_wrapper = document.querySelector('.vox-widget-wrapper');
  vox_widget_wrapper.classList.remove("vw-top-left", "vw-top-right", "vw-bottom-right", "vw-bottom-left");
  vox_widget_wrapper.classList.add('vw-' + infoVoxbone.placement);

  var widget_mic_header_selector = ".vox-widget-wrapper .vw-header";
  vox_widget_wrapper.querySelector(widget_mic_header_selector).classList.remove('minimized');

  showAnimatedDots();
  showElement(".vox-widget-wrapper #vw-in-call");
  showElement(".vox-widget-wrapper #vw-body");
  showElement(".vox-widget-wrapper");
  document.querySelector(".vox-widget-wrapper").style.display = "block";

  if (infoVoxbone.dial_pad !== "false")
    showElement(".vox-widget-wrapper #dialpad");
  else
    hideElement(".vox-widget-wrapper #dialpad");

  // Reset Rating
  document.querySelector('.vox-widget-wrapper #send-rating').classList.add("vxb-btn-style-disabled");
  document.querySelector('.vox-widget-wrapper #rating-message').value = "";

  var full_screen_icon = document.querySelector('.vox-widget-wrapper #full-screen i');
  full_screen_icon.classList.remove('vx-icon-full-screen-on');
  full_screen_icon.classList.add('vx-icon-full-screen-off');

  var starRatingButtons = document.querySelectorAll(".vox-widget-wrapper input[name=vxb-rate]");
  Array.prototype.forEach.call(starRatingButtons, function(el, i) {
    el.checked = false;
  });
}

function isInCall() {
  return (typeof voxbone.WebRTC.rtcSession.isEstablished === "function") && !voxbone.WebRTC.rtcSession.isEnded();
}

function muteMicDots(){
  setMicDots('off');
}

function clearMicDots(){
  setMicDots('');
}

function setMicDots(className){
  var micDots = document.querySelectorAll('.vox-widget-wrapper .vox-mic-vumeter em');
  Array.prototype.forEach.call(micDots, function(el, i) {
    el.classList = className || "";
  });
}

function setMicDot(dot) {
  var className = 'on';
  if (dot === '5')
    className = 'peak';

  var dots = document.querySelectorAll('.vox-widget-wrapper #mic' + dot);
  Array.prototype.forEach.call(dots, function(el, i) {
    el.classList.add(className);
  });
}

function do_dtmf() {
  setTimeout(do_dtmf2, 100);
}

function do_dtmf2() {
  setTimeout(do_dtmf, 30);
}

function createOscillator(context, freq, gain) {
  var osc = context.createOscillator();
  osc.type = "sine";
  osc.frequency.value = freq;
  osc.connect(gain);

  return osc;
}

function showElement(selector){
  var el = document.querySelector(selector);
  if (el)
    el.classList.remove('hidden');
}

function hideElement(selector){
  var el = document.querySelector(selector);
  if (el)
    el.classList.add('hidden');
}

function showAnimatedDots(){
  var dots = document.querySelectorAll('.vox-widget-wrapper .vw-animated-dots');
  Array.prototype.forEach.call(dots, function(el, i) {
    el.classList.remove('hidden');
  });
}

function hideAnimatedDots(){
  var dots = document.querySelectorAll('.vox-widget-wrapper .vw-animated-dots');
  Array.prototype.forEach.call(dots, function(el, i) {
    el.classList.add('hidden');
  });
}

function getRingbackTone(){
  return document.querySelector('.voxButton #audio-ringback-tone');
}

function pauseRingbackTone(){
  getRingbackTone().pause();
}

function playRingbackTone(){
  var audioEl = getRingbackTone();
  audioEl.currentTime = 0;
  audioEl.play();
}

function callAction(message){
  if (typeof voxbone.WebRTC.rtcSession.isEstablished !== "function" || voxbone.WebRTC.rtcSession.isEnded())
    return;

  switch(message) {
    case 'hang_up':
      voxbone.WebRTC.hangup();
      break;

    case 'microphone_mute':
      if (voxbone.WebRTC.isMuted) {
        voxbone.WebRTC.unmute();
        clearMicDots();
      } else {
        voxbone.WebRTC.mute();
        muteMicDots();
      }
      break;

    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
    case '0':
    case '*':
    case '#':
      playDTMF(message);
      voxbone.WebRTC.sendDTMF(message);
      break;
  }
}

function isPopUp() {
  return infoVoxbone.is_popup === 'true';
}

function isWebRTCSupported() {
  return voxbone.WebRTC.isWebRTCSupported();
}

function playDTMF(tone) {
  var sound = {};

  // create a gain node to control output
  sound.gain1 = audioContext.createGain();
  sound.gain1.gain.value = 1.0;
  sound.gain1.connect(audioContext.destination);

  // create both oscillator sources
  var freqs = getFreqs(tone);
  sound.osc1 = createOscillator(audioContext, freqs[0], sound.gain1);
  sound.osc2 = createOscillator(audioContext, freqs[1], sound.gain1);
  sound.osc1.start(0);
  sound.osc2.start(0);

  // just play 200ms long DTMF tones
  do_dtmf();
  setTimeout(function(){
    sound.osc1.stop(0);sound.osc2.stop(0);
  }, 200);
}

function closePopUp() {
  setTimeout(function () {
    window.close();
  }, 5000);
}

function sendRate(data) {
  var request = new XMLHttpRequest();
  request.open('POST', infoVoxbone.server_url + "/rating", true);
  request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

  request.addEventListener("load", function(responseData, status, xhr) {
    console.log("rating sent!");
  });

  request.addEventListener("error", function(responseData, status, xhr) {
    console.log("rating sending error callback");
  });

  //post rating to kivana
  voxbone.WebRTC.postCallRating(infoVoxbone.did, data.rate, data.comment, data.url);

  request.send(JSON.stringify(data));
}

function getFreqs(tone) {
  var freqs;

  switch(tone) {
    case '1': freqs = [697, 1209]; break;
    case '2': freqs = [697, 1336]; break;
    case '3': freqs = [697, 1477]; break;
    case 'A': freqs = [697, 1633]; break;
    case '4': freqs = [770, 1209]; break;
    case '5': freqs = [770, 1336]; break;
    case '6': freqs = [770, 1477]; break;
    case 'B': freqs = [770, 1633]; break;
    case '7': freqs = [852, 1209]; break;
    case '8': freqs = [852, 1336]; break;
    case '9': freqs = [852, 1477]; break;
    case 'C': freqs = [852, 1633]; break;
    case '*': freqs = [941, 1209]; break;
    case '0': freqs = [941, 1336]; break;
    case '#': freqs = [941, 1477]; break;
    case 'D': freqs = [941, 1633]; break;
  }

  return freqs;
}

//customize default error messages in widget
var editErrorMessage = function editErrorMessage(error, mt) {
  switch(error) {
    case 'Canceled':
      return mt.error_canceled ? mt.error_canceled : error;
    case 'Terminated':
      return mt.error_bye ? mt.error_bye : error;
    case 'WebRTC Error':
      return mt.error_webrtc ? mt.error_webrtc : error;
    case 'No Answer':
      return mt.error_no_answer ? mt.error_no_answer : error;
    case 'Expires':
      return mt.error_expires ? mt.error_expires : error;
    case 'No Ack':
      return mt.error_no_ack ? mt.error_no_ack : error;
    case 'Dialog Error':
      return mt.error_dialog_error ? mt.error_dialog_error : error;
    case 'User Denied Media Access':
      return mt.error_user_denied_media ? mt.error_user_denied_media : error;
    case 'User Denied':
      return mt.error_user_denied_media ? mt.error_user_denied_media : error;
    case 'Bad Media Description':
      return mt.error_bad_media_description ? mt.error_bad_media_description : error;
    case 'RTP Timeout':
      return mt.error_rtp_timeout ? mt.error_rtp_timeout : error;
    case 'Connection Error':
      return mt.error_connection_error ? mt.error_connection_error : error;
    case 'Request Timeout':
      return mt.error_request_timeout ? mt.error_request_timeout : error;
    case 'SIP Failure':
      return mt.error_sip_failure ? mt.error_sip_failure : error;
    case 'Internal Error':
      return mt.error_internal_error ? mt.error_internal_error : error;
    case 'Rejected':
      return mt.error_sip_rejected ? mt.error_sip_rejected : error;
    case 'Busy':
      return mt.error_sip_busy ? mt.error_sip_busy : error;
    case 'Redirect':
      return mt.error_sip_redirected ? mt.error_sip_redirected : error;
    case 'Unavailable':
      return mt.error_sip_unavailable ? mt.error_sip_unavailable : error;
    case 'Address Incomplete':
      return mt.error_sip_address_incomplete ? mt.error_sip_address_incomplete : error;
    case 'Incompatible SDP':
      return mt.error_sip_incompatible_sdp ? mt.error_sip_incompatible_sdp : error;
    case 'Missing SDP':
      return mt.error_sip_missing_sdp ? mt.error_sip_missing_sdp : error;
    case 'Not Found':
      return mt.error_sip_not_found ? mt.error_sip_not_found : error;
    case 'Authentication Error':
      return mt.error_sip_authentication ? mt.error_sip_authentication : error;
    default:
      return error;
  }
};
