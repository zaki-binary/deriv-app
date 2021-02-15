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
/******/ 	return __webpack_require__(__webpack_require__.s = "./Configs/currency-selector-config.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./Configs/currency-selector-config.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _deriv_translations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(\"@deriv/translations\");\n/* harmony import */ var _deriv_translations__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_deriv_translations__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _deriv_shared__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(\"@deriv/shared\");\n/* harmony import */ var _deriv_shared__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_deriv_shared__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _currency_selector_schema__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(\"./Configs/currency-selector-schema.js\");\n\n\n\n\nvar currencySelectorConfig = function currencySelectorConfig(_ref, CurrencySelector) {\n  var real_account_signup_target = _ref.real_account_signup_target;\n  var is_dashboard = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;\n  return {\n    header: {\n      active_title: is_dashboard ? Object(_deriv_translations__WEBPACK_IMPORTED_MODULE_0__[\"localize\"])('Select wallet currency') : Object(_deriv_translations__WEBPACK_IMPORTED_MODULE_0__[\"localize\"])('Please choose your currency'),\n      title: is_dashboard ? Object(_deriv_translations__WEBPACK_IMPORTED_MODULE_0__[\"localize\"])('CURRENCY') : Object(_deriv_translations__WEBPACK_IMPORTED_MODULE_0__[\"localize\"])('Account currency')\n    },\n    body: CurrencySelector,\n    form_value: Object(_deriv_shared__WEBPACK_IMPORTED_MODULE_1__[\"getDefaultFields\"])(real_account_signup_target, _currency_selector_schema__WEBPACK_IMPORTED_MODULE_2__[\"default\"]),\n    props: {\n      validate: Object(_deriv_shared__WEBPACK_IMPORTED_MODULE_1__[\"generateValidationFunction\"])(real_account_signup_target, _currency_selector_schema__WEBPACK_IMPORTED_MODULE_2__[\"default\"])\n    },\n    passthrough: ['legal_allowed_currencies'],\n    icon: 'IcDashboardCurrency'\n  };\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (currencySelectorConfig);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9Db25maWdzL2N1cnJlbmN5LXNlbGVjdG9yLWNvbmZpZy5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovL0BkZXJpdi9hY2NvdW50Ly4vQ29uZmlncy9jdXJyZW5jeS1zZWxlY3Rvci1jb25maWcuanM/YmEzZCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBsb2NhbGl6ZSB9IGZyb20gJ0BkZXJpdi90cmFuc2xhdGlvbnMnO1xuaW1wb3J0IHsgZ2VuZXJhdGVWYWxpZGF0aW9uRnVuY3Rpb24sIGdldERlZmF1bHRGaWVsZHMgfSBmcm9tICdAZGVyaXYvc2hhcmVkJztcbmltcG9ydCBjdXJyZW5jeV9zZWxlY3Rvcl9jb25maWcgZnJvbSAnLi9jdXJyZW5jeS1zZWxlY3Rvci1zY2hlbWEnO1xuXG5jb25zdCBjdXJyZW5jeVNlbGVjdG9yQ29uZmlnID0gKHsgcmVhbF9hY2NvdW50X3NpZ251cF90YXJnZXQgfSwgQ3VycmVuY3lTZWxlY3RvciwgaXNfZGFzaGJvYXJkID0gZmFsc2UpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBoZWFkZXI6IHtcbiAgICAgICAgICAgIGFjdGl2ZV90aXRsZTogaXNfZGFzaGJvYXJkID8gbG9jYWxpemUoJ1NlbGVjdCB3YWxsZXQgY3VycmVuY3knKSA6IGxvY2FsaXplKCdQbGVhc2UgY2hvb3NlIHlvdXIgY3VycmVuY3knKSxcbiAgICAgICAgICAgIHRpdGxlOiBpc19kYXNoYm9hcmQgPyBsb2NhbGl6ZSgnQ1VSUkVOQ1knKSA6IGxvY2FsaXplKCdBY2NvdW50IGN1cnJlbmN5JyksXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEN1cnJlbmN5U2VsZWN0b3IsXG4gICAgICAgIGZvcm1fdmFsdWU6IGdldERlZmF1bHRGaWVsZHMocmVhbF9hY2NvdW50X3NpZ251cF90YXJnZXQsIGN1cnJlbmN5X3NlbGVjdG9yX2NvbmZpZyksXG4gICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgICB2YWxpZGF0ZTogZ2VuZXJhdGVWYWxpZGF0aW9uRnVuY3Rpb24ocmVhbF9hY2NvdW50X3NpZ251cF90YXJnZXQsIGN1cnJlbmN5X3NlbGVjdG9yX2NvbmZpZyksXG4gICAgICAgIH0sXG4gICAgICAgIHBhc3N0aHJvdWdoOiBbJ2xlZ2FsX2FsbG93ZWRfY3VycmVuY2llcyddLFxuICAgICAgICBpY29uOiAnSWNEYXNoYm9hcmRDdXJyZW5jeScsXG4gICAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGN1cnJlbmN5U2VsZWN0b3JDb25maWc7XG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBWEE7QUFhQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./Configs/currency-selector-config.js\n");

/***/ }),

/***/ "./Configs/currency-selector-schema.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _deriv_translations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(\"@deriv/translations\");\n/* harmony import */ var _deriv_translations__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_deriv_translations__WEBPACK_IMPORTED_MODULE_0__);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  currency: {\n    supported_in: ['maltainvest', 'malta', 'svg', 'iom'],\n    default_value: '',\n    rules: [['req', Object(_deriv_translations__WEBPACK_IMPORTED_MODULE_0__[\"localize\"])('Select an item')]]\n  }\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9Db25maWdzL2N1cnJlbmN5LXNlbGVjdG9yLXNjaGVtYS5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovL0BkZXJpdi9hY2NvdW50Ly4vQ29uZmlncy9jdXJyZW5jeS1zZWxlY3Rvci1zY2hlbWEuanM/MGRlZCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBsb2NhbGl6ZSB9IGZyb20gJ0BkZXJpdi90cmFuc2xhdGlvbnMnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgY3VycmVuY3k6IHtcbiAgICAgICAgc3VwcG9ydGVkX2luOiBbJ21hbHRhaW52ZXN0JywgJ21hbHRhJywgJ3N2ZycsICdpb20nXSxcbiAgICAgICAgZGVmYXVsdF92YWx1ZTogJycsXG4gICAgICAgIHJ1bGVzOiBbWydyZXEnLCBsb2NhbGl6ZSgnU2VsZWN0IGFuIGl0ZW0nKV1dLFxuICAgIH0sXG59O1xuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQURBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./Configs/currency-selector-schema.js\n");

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