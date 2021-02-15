(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@deriv/shared"), require("@deriv/translations"));
	else if(typeof define === 'function' && define.amd)
		define(["@deriv/shared", "@deriv/translations"], factory);
	else if(typeof exports === 'object')
		exports["@deriv/account"] = factory(require("@deriv/shared"), require("@deriv/translations"));
	else
		root["@deriv/account"] = factory(root["@deriv/shared"], root["@deriv/translations"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE__deriv_shared__, __WEBPACK_EXTERNAL_MODULE__deriv_translations__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./Configs/terms-of-use-config.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./Configs/terms-of-use-config.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _deriv_shared__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(\"@deriv/shared\");\n/* harmony import */ var _deriv_shared__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_deriv_shared__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _deriv_translations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(\"@deriv/translations\");\n/* harmony import */ var _deriv_translations__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_deriv_translations__WEBPACK_IMPORTED_MODULE_1__);\n\n\nvar terms_of_use_config = {\n  agreed_tos: {\n    supported_in: ['svg', 'iom'],\n    default_value: false\n  },\n  agreed_tnc: {\n    supported_in: ['svg', 'iom'],\n    default_value: false\n  }\n};\n\nvar termsOfUseConfig = function termsOfUseConfig(_ref, TermsOfUse) {\n  var real_account_signup_target = _ref.real_account_signup_target;\n  var is_dashboard = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;\n  var active_title = is_dashboard ? Object(_deriv_translations__WEBPACK_IMPORTED_MODULE_1__[\"localize\"])('Our terms of use') : Object(_deriv_translations__WEBPACK_IMPORTED_MODULE_1__[\"localize\"])('Terms of use');\n  return {\n    header: {\n      active_title: Object(_deriv_shared__WEBPACK_IMPORTED_MODULE_0__[\"isDesktop\"])() ? active_title : null,\n      title: is_dashboard ? Object(_deriv_translations__WEBPACK_IMPORTED_MODULE_1__[\"localize\"])('TERMS OF USE') : Object(_deriv_translations__WEBPACK_IMPORTED_MODULE_1__[\"localize\"])('Terms of use')\n    },\n    body: TermsOfUse,\n    form_value: Object(_deriv_shared__WEBPACK_IMPORTED_MODULE_0__[\"getDefaultFields\"])(real_account_signup_target, terms_of_use_config),\n    props: {\n      real_account_signup_target: real_account_signup_target\n    },\n    icon: 'IcDashboardTermsOfUse'\n  };\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (termsOfUseConfig);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9Db25maWdzL3Rlcm1zLW9mLXVzZS1jb25maWcuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AZGVyaXYvYWNjb3VudC8uL0NvbmZpZ3MvdGVybXMtb2YtdXNlLWNvbmZpZy5qcz8yZDhjIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGlzRGVza3RvcCwgZ2V0RGVmYXVsdEZpZWxkcyB9IGZyb20gJ0BkZXJpdi9zaGFyZWQnO1xuaW1wb3J0IHsgbG9jYWxpemUgfSBmcm9tICdAZGVyaXYvdHJhbnNsYXRpb25zJztcblxuY29uc3QgdGVybXNfb2ZfdXNlX2NvbmZpZyA9IHtcbiAgICBhZ3JlZWRfdG9zOiB7XG4gICAgICAgIHN1cHBvcnRlZF9pbjogWydzdmcnLCAnaW9tJ10sXG4gICAgICAgIGRlZmF1bHRfdmFsdWU6IGZhbHNlLFxuICAgIH0sXG4gICAgYWdyZWVkX3RuYzoge1xuICAgICAgICBzdXBwb3J0ZWRfaW46IFsnc3ZnJywgJ2lvbSddLFxuICAgICAgICBkZWZhdWx0X3ZhbHVlOiBmYWxzZSxcbiAgICB9LFxufTtcblxuY29uc3QgdGVybXNPZlVzZUNvbmZpZyA9ICh7IHJlYWxfYWNjb3VudF9zaWdudXBfdGFyZ2V0IH0sIFRlcm1zT2ZVc2UsIGlzX2Rhc2hib2FyZCA9IGZhbHNlKSA9PiB7XG4gICAgY29uc3QgYWN0aXZlX3RpdGxlID0gaXNfZGFzaGJvYXJkID8gbG9jYWxpemUoJ091ciB0ZXJtcyBvZiB1c2UnKSA6IGxvY2FsaXplKCdUZXJtcyBvZiB1c2UnKTtcbiAgICByZXR1cm4ge1xuICAgICAgICBoZWFkZXI6IHtcbiAgICAgICAgICAgIGFjdGl2ZV90aXRsZTogaXNEZXNrdG9wKCkgPyBhY3RpdmVfdGl0bGUgOiBudWxsLFxuICAgICAgICAgICAgdGl0bGU6IGlzX2Rhc2hib2FyZCA/IGxvY2FsaXplKCdURVJNUyBPRiBVU0UnKSA6IGxvY2FsaXplKCdUZXJtcyBvZiB1c2UnKSxcbiAgICAgICAgfSxcbiAgICAgICAgYm9keTogVGVybXNPZlVzZSxcbiAgICAgICAgZm9ybV92YWx1ZTogZ2V0RGVmYXVsdEZpZWxkcyhyZWFsX2FjY291bnRfc2lnbnVwX3RhcmdldCwgdGVybXNfb2ZfdXNlX2NvbmZpZyksXG4gICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgICByZWFsX2FjY291bnRfc2lnbnVwX3RhcmdldCxcbiAgICAgICAgfSxcbiAgICAgICAgaWNvbjogJ0ljRGFzaGJvYXJkVGVybXNPZlVzZScsXG4gICAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHRlcm1zT2ZVc2VDb25maWc7XG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUZBO0FBTEE7QUFDQTtBQVVBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQVZBO0FBWUE7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./Configs/terms-of-use-config.js\n");

/***/ }),

/***/ "@deriv/shared":
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE__deriv_shared__;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQGRlcml2L3NoYXJlZC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovL0BkZXJpdi9hY2NvdW50L2V4dGVybmFsIFwiQGRlcml2L3NoYXJlZFwiPzEzOTQiXSwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX19kZXJpdl9zaGFyZWRfXzsiXSwibWFwcGluZ3MiOiJBQUFBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///@deriv/shared\n");

/***/ }),

/***/ "@deriv/translations":
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE__deriv_translations__;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQGRlcml2L3RyYW5zbGF0aW9ucy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovL0BkZXJpdi9hY2NvdW50L2V4dGVybmFsIFwiQGRlcml2L3RyYW5zbGF0aW9uc1wiPzI0MjYiXSwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX19kZXJpdl90cmFuc2xhdGlvbnNfXzsiXSwibWFwcGluZ3MiOiJBQUFBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///@deriv/translations\n");

/***/ })

/******/ })["default"];
});