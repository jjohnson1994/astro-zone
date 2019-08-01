/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./dist/";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./webpack.config.prod.js","vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/fsevents sync recursive":
/*!************************************!*\
  !*** ./node_modules/fsevents sync ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function webpackEmptyContext(req) {\n\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\te.code = 'MODULE_NOT_FOUND';\n\tthrow e;\n}\nwebpackEmptyContext.keys = function() { return []; };\nwebpackEmptyContext.resolve = webpackEmptyContext;\nmodule.exports = webpackEmptyContext;\nwebpackEmptyContext.id = \"./node_modules/fsevents sync recursive\";\n\n//# sourceURL=webpack:///./node_modules/fsevents_sync?");

/***/ }),

/***/ "./node_modules/fsevents/node_modules/node-pre-gyp/lib sync recursive":
/*!******************************************************************!*\
  !*** ./node_modules/fsevents/node_modules/node-pre-gyp/lib sync ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function webpackEmptyContext(req) {\n\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\te.code = 'MODULE_NOT_FOUND';\n\tthrow e;\n}\nwebpackEmptyContext.keys = function() { return []; };\nwebpackEmptyContext.resolve = webpackEmptyContext;\nmodule.exports = webpackEmptyContext;\nwebpackEmptyContext.id = \"./node_modules/fsevents/node_modules/node-pre-gyp/lib sync recursive\";\n\n//# sourceURL=webpack:///./node_modules/fsevents/node_modules/node-pre-gyp/lib_sync?");

/***/ }),

/***/ "./node_modules/fsevents/node_modules/node-pre-gyp/lib sync recursive ^\\.\\/.*$":
/*!***************************************************************************!*\
  !*** ./node_modules/fsevents/node_modules/node-pre-gyp/lib sync ^\.\/.*$ ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var map = {\n\t\"./build\": \"./node_modules/fsevents/node_modules/node-pre-gyp/lib/build.js\",\n\t\"./build.js\": \"./node_modules/fsevents/node_modules/node-pre-gyp/lib/build.js\",\n\t\"./clean\": \"./node_modules/fsevents/node_modules/node-pre-gyp/lib/clean.js\",\n\t\"./clean.js\": \"./node_modules/fsevents/node_modules/node-pre-gyp/lib/clean.js\",\n\t\"./configure\": \"./node_modules/fsevents/node_modules/node-pre-gyp/lib/configure.js\",\n\t\"./configure.js\": \"./node_modules/fsevents/node_modules/node-pre-gyp/lib/configure.js\",\n\t\"./info\": \"./node_modules/fsevents/node_modules/node-pre-gyp/lib/info.js\",\n\t\"./info.js\": \"./node_modules/fsevents/node_modules/node-pre-gyp/lib/info.js\",\n\t\"./install\": \"./node_modules/fsevents/node_modules/node-pre-gyp/lib/install.js\",\n\t\"./install.js\": \"./node_modules/fsevents/node_modules/node-pre-gyp/lib/install.js\",\n\t\"./node-pre-gyp\": \"./node_modules/fsevents/node_modules/node-pre-gyp/lib/node-pre-gyp.js\",\n\t\"./node-pre-gyp.js\": \"./node_modules/fsevents/node_modules/node-pre-gyp/lib/node-pre-gyp.js\",\n\t\"./package\": \"./node_modules/fsevents/node_modules/node-pre-gyp/lib/package.js\",\n\t\"./package.js\": \"./node_modules/fsevents/node_modules/node-pre-gyp/lib/package.js\",\n\t\"./pre-binding\": \"./node_modules/fsevents/node_modules/node-pre-gyp/lib/pre-binding.js\",\n\t\"./pre-binding.js\": \"./node_modules/fsevents/node_modules/node-pre-gyp/lib/pre-binding.js\",\n\t\"./publish\": \"./node_modules/fsevents/node_modules/node-pre-gyp/lib/publish.js\",\n\t\"./publish.js\": \"./node_modules/fsevents/node_modules/node-pre-gyp/lib/publish.js\",\n\t\"./rebuild\": \"./node_modules/fsevents/node_modules/node-pre-gyp/lib/rebuild.js\",\n\t\"./rebuild.js\": \"./node_modules/fsevents/node_modules/node-pre-gyp/lib/rebuild.js\",\n\t\"./reinstall\": \"./node_modules/fsevents/node_modules/node-pre-gyp/lib/reinstall.js\",\n\t\"./reinstall.js\": \"./node_modules/fsevents/node_modules/node-pre-gyp/lib/reinstall.js\",\n\t\"./reveal\": \"./node_modules/fsevents/node_modules/node-pre-gyp/lib/reveal.js\",\n\t\"./reveal.js\": \"./node_modules/fsevents/node_modules/node-pre-gyp/lib/reveal.js\",\n\t\"./testbinary\": \"./node_modules/fsevents/node_modules/node-pre-gyp/lib/testbinary.js\",\n\t\"./testbinary.js\": \"./node_modules/fsevents/node_modules/node-pre-gyp/lib/testbinary.js\",\n\t\"./testpackage\": \"./node_modules/fsevents/node_modules/node-pre-gyp/lib/testpackage.js\",\n\t\"./testpackage.js\": \"./node_modules/fsevents/node_modules/node-pre-gyp/lib/testpackage.js\",\n\t\"./unpublish\": \"./node_modules/fsevents/node_modules/node-pre-gyp/lib/unpublish.js\",\n\t\"./unpublish.js\": \"./node_modules/fsevents/node_modules/node-pre-gyp/lib/unpublish.js\",\n\t\"./util/abi_crosswalk\": \"./node_modules/fsevents/node_modules/node-pre-gyp/lib/util/abi_crosswalk.json\",\n\t\"./util/abi_crosswalk.json\": \"./node_modules/fsevents/node_modules/node-pre-gyp/lib/util/abi_crosswalk.json\",\n\t\"./util/compile\": \"./node_modules/fsevents/node_modules/node-pre-gyp/lib/util/compile.js\",\n\t\"./util/compile.js\": \"./node_modules/fsevents/node_modules/node-pre-gyp/lib/util/compile.js\",\n\t\"./util/handle_gyp_opts\": \"./node_modules/fsevents/node_modules/node-pre-gyp/lib/util/handle_gyp_opts.js\",\n\t\"./util/handle_gyp_opts.js\": \"./node_modules/fsevents/node_modules/node-pre-gyp/lib/util/handle_gyp_opts.js\",\n\t\"./util/napi\": \"./node_modules/fsevents/node_modules/node-pre-gyp/lib/util/napi.js\",\n\t\"./util/napi.js\": \"./node_modules/fsevents/node_modules/node-pre-gyp/lib/util/napi.js\",\n\t\"./util/nw-pre-gyp/index.html\": \"./node_modules/fsevents/node_modules/node-pre-gyp/lib/util/nw-pre-gyp/index.html\",\n\t\"./util/nw-pre-gyp/package\": \"./node_modules/fsevents/node_modules/node-pre-gyp/lib/util/nw-pre-gyp/package.json\",\n\t\"./util/nw-pre-gyp/package.json\": \"./node_modules/fsevents/node_modules/node-pre-gyp/lib/util/nw-pre-gyp/package.json\",\n\t\"./util/s3_setup\": \"./node_modules/fsevents/node_modules/node-pre-gyp/lib/util/s3_setup.js\",\n\t\"./util/s3_setup.js\": \"./node_modules/fsevents/node_modules/node-pre-gyp/lib/util/s3_setup.js\",\n\t\"./util/versioning\": \"./node_modules/fsevents/node_modules/node-pre-gyp/lib/util/versioning.js\",\n\t\"./util/versioning.js\": \"./node_modules/fsevents/node_modules/node-pre-gyp/lib/util/versioning.js\"\n};\n\n\nfunction webpackContext(req) {\n\tvar id = webpackContextResolve(req);\n\treturn __webpack_require__(id);\n}\nfunction webpackContextResolve(req) {\n\tvar id = map[req];\n\tif(!(id + 1)) { // check for number or string\n\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\te.code = 'MODULE_NOT_FOUND';\n\t\tthrow e;\n\t}\n\treturn id;\n}\nwebpackContext.keys = function webpackContextKeys() {\n\treturn Object.keys(map);\n};\nwebpackContext.resolve = webpackContextResolve;\nmodule.exports = webpackContext;\nwebpackContext.id = \"./node_modules/fsevents/node_modules/node-pre-gyp/lib sync recursive ^\\\\.\\\\/.*$\";\n\n//# sourceURL=webpack:///./node_modules/fsevents/node_modules/node-pre-gyp/lib_sync_^\\.\\/.*$?");

/***/ }),

/***/ "./node_modules/fsevents/node_modules/node-pre-gyp/lib/util sync recursive":
/*!***********************************************************************!*\
  !*** ./node_modules/fsevents/node_modules/node-pre-gyp/lib/util sync ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function webpackEmptyContext(req) {\n\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\te.code = 'MODULE_NOT_FOUND';\n\tthrow e;\n}\nwebpackEmptyContext.keys = function() { return []; };\nwebpackEmptyContext.resolve = webpackEmptyContext;\nmodule.exports = webpackEmptyContext;\nwebpackEmptyContext.id = \"./node_modules/fsevents/node_modules/node-pre-gyp/lib/util sync recursive\";\n\n//# sourceURL=webpack:///./node_modules/fsevents/node_modules/node-pre-gyp/lib/util_sync?");

/***/ }),

/***/ "./node_modules/loader-runner/lib lazy recursive":
/*!**************************************************************!*\
  !*** ./node_modules/loader-runner/lib lazy namespace object ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function webpackEmptyAsyncContext(req) {\n\t// Here Promise.resolve().then() is used instead of new Promise() to prevent\n\t// uncaught exception popping up in devtools\n\treturn Promise.resolve().then(function() {\n\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\te.code = 'MODULE_NOT_FOUND';\n\t\tthrow e;\n\t});\n}\nwebpackEmptyAsyncContext.keys = function() { return []; };\nwebpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;\nmodule.exports = webpackEmptyAsyncContext;\nwebpackEmptyAsyncContext.id = \"./node_modules/loader-runner/lib lazy recursive\";\n\n//# sourceURL=webpack:///./node_modules/loader-runner/lib_lazy_namespace_object?");

/***/ }),

/***/ "./node_modules/node-libs-browser/mock sync recursive ^\\.\\/.*$":
/*!***********************************************************!*\
  !*** ./node_modules/node-libs-browser/mock sync ^\.\/.*$ ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var map = {\n\t\"./buffer\": \"./node_modules/node-libs-browser/mock/buffer.js\",\n\t\"./buffer.js\": \"./node_modules/node-libs-browser/mock/buffer.js\",\n\t\"./console\": \"./node_modules/node-libs-browser/mock/console.js\",\n\t\"./console.js\": \"./node_modules/node-libs-browser/mock/console.js\",\n\t\"./dns\": \"./node_modules/node-libs-browser/mock/dns.js\",\n\t\"./dns.js\": \"./node_modules/node-libs-browser/mock/dns.js\",\n\t\"./empty\": \"./node_modules/node-libs-browser/mock/empty.js\",\n\t\"./empty.js\": \"./node_modules/node-libs-browser/mock/empty.js\",\n\t\"./net\": \"./node_modules/node-libs-browser/mock/net.js\",\n\t\"./net.js\": \"./node_modules/node-libs-browser/mock/net.js\",\n\t\"./process\": \"./node_modules/node-libs-browser/mock/process.js\",\n\t\"./process.js\": \"./node_modules/node-libs-browser/mock/process.js\",\n\t\"./punycode\": \"./node_modules/node-libs-browser/mock/punycode.js\",\n\t\"./punycode.js\": \"./node_modules/node-libs-browser/mock/punycode.js\",\n\t\"./tls\": \"./node_modules/node-libs-browser/mock/tls.js\",\n\t\"./tls.js\": \"./node_modules/node-libs-browser/mock/tls.js\",\n\t\"./tty\": \"./node_modules/node-libs-browser/mock/tty.js\",\n\t\"./tty.js\": \"./node_modules/node-libs-browser/mock/tty.js\"\n};\n\n\nfunction webpackContext(req) {\n\tvar id = webpackContextResolve(req);\n\treturn __webpack_require__(id);\n}\nfunction webpackContextResolve(req) {\n\tvar id = map[req];\n\tif(!(id + 1)) { // check for number or string\n\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\te.code = 'MODULE_NOT_FOUND';\n\t\tthrow e;\n\t}\n\treturn id;\n}\nwebpackContext.keys = function webpackContextKeys() {\n\treturn Object.keys(map);\n};\nwebpackContext.resolve = webpackContextResolve;\nmodule.exports = webpackContext;\nwebpackContext.id = \"./node_modules/node-libs-browser/mock sync recursive ^\\\\.\\\\/.*$\";\n\n//# sourceURL=webpack:///./node_modules/node-libs-browser/mock_sync_^\\.\\/.*$?");

/***/ }),

/***/ "./node_modules/uglify-es/tools sync recursive":
/*!*******************************************!*\
  !*** ./node_modules/uglify-es/tools sync ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function webpackEmptyContext(req) {\n\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\te.code = 'MODULE_NOT_FOUND';\n\tthrow e;\n}\nwebpackEmptyContext.keys = function() { return []; };\nwebpackEmptyContext.resolve = webpackEmptyContext;\nmodule.exports = webpackEmptyContext;\nwebpackEmptyContext.id = \"./node_modules/uglify-es/tools sync recursive\";\n\n//# sourceURL=webpack:///./node_modules/uglify-es/tools_sync?");

/***/ }),

/***/ "./node_modules/uglifyjs-webpack-plugin/dist/uglify sync recursive":
/*!***************************************************************!*\
  !*** ./node_modules/uglifyjs-webpack-plugin/dist/uglify sync ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function webpackEmptyContext(req) {\n\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\te.code = 'MODULE_NOT_FOUND';\n\tthrow e;\n}\nwebpackEmptyContext.keys = function() { return []; };\nwebpackEmptyContext.resolve = webpackEmptyContext;\nmodule.exports = webpackEmptyContext;\nwebpackEmptyContext.id = \"./node_modules/uglifyjs-webpack-plugin/dist/uglify sync recursive\";\n\n//# sourceURL=webpack:///./node_modules/uglifyjs-webpack-plugin/dist/uglify_sync?");

/***/ }),

/***/ "./node_modules/webpack/lib/node sync recursive ^\\.\\/.*$":
/*!****************************************!*\
  !*** (webpack)/lib/node sync ^\.\/.*$ ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var map = {\n\t\"./NodeChunkTemplatePlugin\": \"./node_modules/webpack/lib/node/NodeChunkTemplatePlugin.js\",\n\t\"./NodeChunkTemplatePlugin.js\": \"./node_modules/webpack/lib/node/NodeChunkTemplatePlugin.js\",\n\t\"./NodeEnvironmentPlugin\": \"./node_modules/webpack/lib/node/NodeEnvironmentPlugin.js\",\n\t\"./NodeEnvironmentPlugin.js\": \"./node_modules/webpack/lib/node/NodeEnvironmentPlugin.js\",\n\t\"./NodeHotUpdateChunkTemplatePlugin\": \"./node_modules/webpack/lib/node/NodeHotUpdateChunkTemplatePlugin.js\",\n\t\"./NodeHotUpdateChunkTemplatePlugin.js\": \"./node_modules/webpack/lib/node/NodeHotUpdateChunkTemplatePlugin.js\",\n\t\"./NodeMainTemplate.runtime\": \"./node_modules/webpack/lib/node/NodeMainTemplate.runtime.js\",\n\t\"./NodeMainTemplate.runtime.js\": \"./node_modules/webpack/lib/node/NodeMainTemplate.runtime.js\",\n\t\"./NodeMainTemplateAsync.runtime\": \"./node_modules/webpack/lib/node/NodeMainTemplateAsync.runtime.js\",\n\t\"./NodeMainTemplateAsync.runtime.js\": \"./node_modules/webpack/lib/node/NodeMainTemplateAsync.runtime.js\",\n\t\"./NodeMainTemplatePlugin\": \"./node_modules/webpack/lib/node/NodeMainTemplatePlugin.js\",\n\t\"./NodeMainTemplatePlugin.js\": \"./node_modules/webpack/lib/node/NodeMainTemplatePlugin.js\",\n\t\"./NodeOutputFileSystem\": \"./node_modules/webpack/lib/node/NodeOutputFileSystem.js\",\n\t\"./NodeOutputFileSystem.js\": \"./node_modules/webpack/lib/node/NodeOutputFileSystem.js\",\n\t\"./NodeSourcePlugin\": \"./node_modules/webpack/lib/node/NodeSourcePlugin.js\",\n\t\"./NodeSourcePlugin.js\": \"./node_modules/webpack/lib/node/NodeSourcePlugin.js\",\n\t\"./NodeTargetPlugin\": \"./node_modules/webpack/lib/node/NodeTargetPlugin.js\",\n\t\"./NodeTargetPlugin.js\": \"./node_modules/webpack/lib/node/NodeTargetPlugin.js\",\n\t\"./NodeTemplatePlugin\": \"./node_modules/webpack/lib/node/NodeTemplatePlugin.js\",\n\t\"./NodeTemplatePlugin.js\": \"./node_modules/webpack/lib/node/NodeTemplatePlugin.js\",\n\t\"./NodeWatchFileSystem\": \"./node_modules/webpack/lib/node/NodeWatchFileSystem.js\",\n\t\"./NodeWatchFileSystem.js\": \"./node_modules/webpack/lib/node/NodeWatchFileSystem.js\",\n\t\"./ReadFileCompileWasmTemplatePlugin\": \"./node_modules/webpack/lib/node/ReadFileCompileWasmTemplatePlugin.js\",\n\t\"./ReadFileCompileWasmTemplatePlugin.js\": \"./node_modules/webpack/lib/node/ReadFileCompileWasmTemplatePlugin.js\"\n};\n\n\nfunction webpackContext(req) {\n\tvar id = webpackContextResolve(req);\n\treturn __webpack_require__(id);\n}\nfunction webpackContextResolve(req) {\n\tvar id = map[req];\n\tif(!(id + 1)) { // check for number or string\n\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\te.code = 'MODULE_NOT_FOUND';\n\t\tthrow e;\n\t}\n\treturn id;\n}\nwebpackContext.keys = function webpackContextKeys() {\n\treturn Object.keys(map);\n};\nwebpackContext.resolve = webpackContextResolve;\nmodule.exports = webpackContext;\nwebpackContext.id = \"./node_modules/webpack/lib/node sync recursive ^\\\\.\\\\/.*$\";\n\n//# sourceURL=webpack:///(webpack)/lib/node_sync_^\\.\\/.*$?");

/***/ }),

/***/ "./node_modules/worker-farm/lib/child sync recursive":
/*!*************************************************!*\
  !*** ./node_modules/worker-farm/lib/child sync ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function webpackEmptyContext(req) {\n\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\te.code = 'MODULE_NOT_FOUND';\n\tthrow e;\n}\nwebpackEmptyContext.keys = function() { return []; };\nwebpackEmptyContext.resolve = webpackEmptyContext;\nmodule.exports = webpackEmptyContext;\nwebpackEmptyContext.id = \"./node_modules/worker-farm/lib/child sync recursive\";\n\n//# sourceURL=webpack:///./node_modules/worker-farm/lib/child_sync?");

/***/ }),

/***/ "./webpack.config.prod.js":
/*!********************************!*\
  !*** ./webpack.config.prod.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(__dirname, process) {var path = __webpack_require__(/*! path */ \"./node_modules/path-browserify/index.js\")\nvar webpack = __webpack_require__(/*! webpack */ \"./node_modules/webpack/lib/webpack.js\")\nvar BrowserSyncPlugin = __webpack_require__(/*! browser-sync-webpack-plugin */ \"./node_modules/browser-sync-webpack-plugin/index.js\")\n\nmodule.exports = {\n  entry: {\n    app: [path.resolve(__dirname, 'src/main.js')],\n    vendor: ['phaser']\n  },\n  mode: 'development',\n  output: {\n    pathinfo: true,\n    path: path.resolve(__dirname, 'dist'),\n    publicPath: './dist/',\n    filename: 'bundle.js'\n  },\n  plugins: [\n    new webpack.DefinePlugin({\n      CANVAS_RENDERER: JSON.stringify(true),\n      WEBGL_RENDERER: JSON.stringify(true)\n    }),\n    new BrowserSyncPlugin({\n      host: process.env.IP || 'localhost',\n      port: process.env.PORT || 3000,\n      server: {\n        baseDir: ['./', './build']\n      }\n    })\n  ],\n  module: {\n    rules: [\n      {\n        test: /\\.js$/,\n        use: ['babel-loader'],\n        include: path.join(__dirname, 'src')\n      }\n    ]\n  },\n  optimization: {\n    splitChunks: {\n      name: 'vendor',\n      chunks: 'all'\n    }\n  }\n}\n\n/* WEBPACK VAR INJECTION */}.call(this, \"/\", __webpack_require__(/*! ./node_modules/process/browser.js */ \"./node_modules/process/browser.js\")))\n\n//# sourceURL=webpack:///./webpack.config.prod.js?");

/***/ }),

/***/ 0:
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* (ignored) */\n\n//# sourceURL=webpack:///util_(ignored)?");

/***/ }),

/***/ 1:
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* (ignored) */\n\n//# sourceURL=webpack:///util_(ignored)?");

/***/ }),

/***/ 2:
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* (ignored) */\n\n//# sourceURL=webpack:///buffer_(ignored)?");

/***/ }),

/***/ 3:
/*!************************!*\
  !*** crypto (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* (ignored) */\n\n//# sourceURL=webpack:///crypto_(ignored)?");

/***/ }),

/***/ 4:
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* (ignored) */\n\n//# sourceURL=webpack:///util_(ignored)?");

/***/ }),

/***/ 5:
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* (ignored) */\n\n//# sourceURL=webpack:///util_(ignored)?");

/***/ }),

/***/ 6:
/*!***************************!*\
  !*** ./streams (ignored) ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* (ignored) */\n\n//# sourceURL=webpack:///./streams_(ignored)?");

/***/ }),

/***/ 7:
/*!*******************************!*\
  !*** ./extend-node (ignored) ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* (ignored) */\n\n//# sourceURL=webpack:///./extend-node_(ignored)?");

/***/ }),

/***/ 8:
/*!********************!*\
  !*** fs (ignored) ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* (ignored) */\n\n//# sourceURL=webpack:///fs_(ignored)?");

/***/ })

/******/ });