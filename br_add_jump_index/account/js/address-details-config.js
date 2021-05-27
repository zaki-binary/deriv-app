/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@deriv/shared"), require("@deriv/translations"));
	else if(typeof define === 'function' && define.amd)
		define(["@deriv/shared", "@deriv/translations"], factory);
	else if(typeof exports === 'object')
		exports["@deriv/account"] = factory(require("@deriv/shared"), require("@deriv/translations"));
	else
		root["@deriv/account"] = factory(root["@deriv/shared"], root["@deriv/translations"]);
})(self, function(__WEBPACK_EXTERNAL_MODULE__deriv_shared__, __WEBPACK_EXTERNAL_MODULE__deriv_translations__) {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./Configs/address-details-config.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _deriv_translations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(\"@deriv/translations\");\n/* harmony import */ var _deriv_translations__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_deriv_translations__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _deriv_shared__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(\"@deriv/shared\");\n/* harmony import */ var _deriv_shared__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_deriv_shared__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nvar address_details_config = function address_details_config(_ref) {\n  var _account_settings$add, _account_settings$add2, _account_settings$add3, _account_settings$add4, _account_settings$add5;\n\n  var account_settings = _ref.account_settings,\n      is_svg = _ref.is_svg;\n\n  if (!account_settings) {\n    return {};\n  }\n\n  return {\n    address_line_1: {\n      supported_in: ['svg', 'iom', 'malta', 'maltainvest'],\n      default_value: (_account_settings$add = account_settings.address_line_1) !== null && _account_settings$add !== void 0 ? _account_settings$add : '',\n      rules: [['req', (0,_deriv_translations__WEBPACK_IMPORTED_MODULE_0__.localize)('First line of address is required')], ['address', (0,_deriv_translations__WEBPACK_IMPORTED_MODULE_0__.localize)('Letters, numbers, spaces, periods, hyphens, apostrophes, commas only')], ['length', (0,_deriv_translations__WEBPACK_IMPORTED_MODULE_0__.localize)('This should not exceed {{max}} characters.', {\n        max: 70\n      }), {\n        max: 70\n      }], ['po_box', (0,_deriv_shared__WEBPACK_IMPORTED_MODULE_1__.getErrorMessages)().po_box()]].filter(function (x) {\n        return is_svg ? x.indexOf('po_box') !== 0 : x;\n      })\n    },\n    address_line_2: {\n      supported_in: ['svg', 'iom', 'malta', 'maltainvest'],\n      default_value: (_account_settings$add2 = account_settings.address_line_2) !== null && _account_settings$add2 !== void 0 ? _account_settings$add2 : '',\n      rules: [['address', (0,_deriv_translations__WEBPACK_IMPORTED_MODULE_0__.localize)('Letters, numbers, spaces, periods, hyphens, apostrophes, commas only')], ['length', (0,_deriv_translations__WEBPACK_IMPORTED_MODULE_0__.localize)('This should not exceed {{max}} characters.', {\n        max: 70\n      }), {\n        max: 70\n      }], ['po_box', (0,_deriv_shared__WEBPACK_IMPORTED_MODULE_1__.getErrorMessages)().po_box()]].filter(function (x) {\n        return is_svg ? x.indexOf('po_box') !== 0 : x;\n      })\n    },\n    address_city: {\n      supported_in: ['svg', 'iom', 'malta', 'maltainvest'],\n      default_value: (_account_settings$add3 = account_settings.address_city) !== null && _account_settings$add3 !== void 0 ? _account_settings$add3 : '',\n      rules: [['req', (0,_deriv_translations__WEBPACK_IMPORTED_MODULE_0__.localize)('City is required')], ['regular', (0,_deriv_translations__WEBPACK_IMPORTED_MODULE_0__.localize)('Letters, numbers, spaces, periods, hyphens, apostrophes only'), {\n        regex: /^[A-Za-z0-9\\s'.-]{1,35}$/\n      }]]\n    },\n    address_state: {\n      supported_in: ['svg', 'iom', 'malta', 'maltainvest'],\n      default_value: (_account_settings$add4 = account_settings.address_state) !== null && _account_settings$add4 !== void 0 ? _account_settings$add4 : '',\n      rules: [['req', (0,_deriv_translations__WEBPACK_IMPORTED_MODULE_0__.localize)('State is required')], ['regular', (0,_deriv_translations__WEBPACK_IMPORTED_MODULE_0__.localize)('State is not in a proper format'), {\n        regex: /^[\\w\\s\\W'.-;,]{0,60}$/\n      }]]\n    },\n    address_postcode: {\n      supported_in: ['svg', 'iom', 'malta', 'maltainvest'],\n      default_value: (_account_settings$add5 = account_settings.address_postcode) !== null && _account_settings$add5 !== void 0 ? _account_settings$add5 : '',\n      rules: [['length', (0,_deriv_translations__WEBPACK_IMPORTED_MODULE_0__.localize)('Please enter a {{field_name}} under {{max_number}} characters.', {\n        field_name: (0,_deriv_translations__WEBPACK_IMPORTED_MODULE_0__.localize)('postal/ZIP code'),\n        max_number: 20,\n        interpolation: {\n          escapeValue: false\n        }\n      }), {\n        min: 0,\n        max: 20\n      }], ['postcode', (0,_deriv_shared__WEBPACK_IMPORTED_MODULE_1__.getErrorMessages)().postcode()]]\n    }\n  };\n};\n\nvar addressDetailsConfig = function addressDetailsConfig(_ref2, AddressDetails) {\n  var upgrade_info = _ref2.upgrade_info,\n      real_account_signup_target = _ref2.real_account_signup_target,\n      residence = _ref2.residence,\n      account_settings = _ref2.account_settings;\n  var is_dashboard = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;\n  var is_svg = (upgrade_info === null || upgrade_info === void 0 ? void 0 : upgrade_info.can_upgrade_to) === 'svg';\n  var config = address_details_config({\n    account_settings: account_settings,\n    is_svg: is_svg\n  });\n  return {\n    header: {\n      active_title: is_dashboard ? (0,_deriv_translations__WEBPACK_IMPORTED_MODULE_0__.localize)('Where do you live?') : (0,_deriv_translations__WEBPACK_IMPORTED_MODULE_0__.localize)('Complete your address details'),\n      title: is_dashboard ? (0,_deriv_translations__WEBPACK_IMPORTED_MODULE_0__.localize)('ADDRESS') : (0,_deriv_translations__WEBPACK_IMPORTED_MODULE_0__.localize)('Address')\n    },\n    body: AddressDetails,\n    form_value: (0,_deriv_shared__WEBPACK_IMPORTED_MODULE_1__.getDefaultFields)(real_account_signup_target, config),\n    props: {\n      validate: (0,_deriv_shared__WEBPACK_IMPORTED_MODULE_1__.generateValidationFunction)(real_account_signup_target, transformConfig(transformForResidence(config, residence), real_account_signup_target)),\n      is_svg: is_svg\n    },\n    passthrough: ['residence_list', 'is_fully_authenticated'],\n    icon: 'IcDashboardAddress'\n  };\n};\n/**\n * Transform general rules based on residence\n *\n * @param {object} rules - Original rules\n * @param {string} residence - Client's residence\n * @return {object} rules - Transformed rules\n */\n\n\nvar transformForResidence = function transformForResidence(rules, residence) {\n  // Isle of Man Clients do not need to fill out state since API states_list is empty.\n  if (residence === 'im') {\n    rules.address_state.rules.shift();\n  } // GB residence are required to fill in the post code.\n\n\n  if (/^(im|gb)$/.test(residence)) {\n    rules.address_postcode.rules.splice(0, 0, ['req', (0,_deriv_translations__WEBPACK_IMPORTED_MODULE_0__.localize)('Postal/ZIP code is required')]);\n  }\n\n  return rules;\n};\n\nvar transformConfig = function transformConfig(config, _ref3) {\n  var real_account_signup_target = _ref3.real_account_signup_target;\n\n  // Remove required rule for svg clients\n  if (!real_account_signup_target || real_account_signup_target === 'svg') {\n    config.address_state.rules.shift();\n  }\n\n  return config;\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (addressDetailsConfig);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9Db25maWdzL2FkZHJlc3MtZGV0YWlscy1jb25maWcuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AZGVyaXYvYWNjb3VudC8uL0NvbmZpZ3MvYWRkcmVzcy1kZXRhaWxzLWNvbmZpZy5qcz8zYWM5Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGxvY2FsaXplIH0gZnJvbSAnQGRlcml2L3RyYW5zbGF0aW9ucyc7XG5pbXBvcnQgeyBnZW5lcmF0ZVZhbGlkYXRpb25GdW5jdGlvbiwgZ2V0RGVmYXVsdEZpZWxkcywgZ2V0RXJyb3JNZXNzYWdlcyB9IGZyb20gJ0BkZXJpdi9zaGFyZWQnO1xuXG5jb25zdCBhZGRyZXNzX2RldGFpbHNfY29uZmlnID0gKHsgYWNjb3VudF9zZXR0aW5ncywgaXNfc3ZnIH0pID0+IHtcbiAgICBpZiAoIWFjY291bnRfc2V0dGluZ3MpIHtcbiAgICAgICAgcmV0dXJuIHt9O1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGFkZHJlc3NfbGluZV8xOiB7XG4gICAgICAgICAgICBzdXBwb3J0ZWRfaW46IFsnc3ZnJywgJ2lvbScsICdtYWx0YScsICdtYWx0YWludmVzdCddLFxuICAgICAgICAgICAgZGVmYXVsdF92YWx1ZTogYWNjb3VudF9zZXR0aW5ncy5hZGRyZXNzX2xpbmVfMSA/PyAnJyxcbiAgICAgICAgICAgIHJ1bGVzOiBbXG4gICAgICAgICAgICAgICAgWydyZXEnLCBsb2NhbGl6ZSgnRmlyc3QgbGluZSBvZiBhZGRyZXNzIGlzIHJlcXVpcmVkJyldLFxuICAgICAgICAgICAgICAgIFsnYWRkcmVzcycsIGxvY2FsaXplKCdMZXR0ZXJzLCBudW1iZXJzLCBzcGFjZXMsIHBlcmlvZHMsIGh5cGhlbnMsIGFwb3N0cm9waGVzLCBjb21tYXMgb25seScpXSxcbiAgICAgICAgICAgICAgICBbJ2xlbmd0aCcsIGxvY2FsaXplKCdUaGlzIHNob3VsZCBub3QgZXhjZWVkIHt7bWF4fX0gY2hhcmFjdGVycy4nLCB7IG1heDogNzAgfSksIHsgbWF4OiA3MCB9XSxcbiAgICAgICAgICAgICAgICBbJ3BvX2JveCcsIGdldEVycm9yTWVzc2FnZXMoKS5wb19ib3goKV0sXG4gICAgICAgICAgICBdLmZpbHRlcih4ID0+IChpc19zdmcgPyB4LmluZGV4T2YoJ3BvX2JveCcpICE9PSAwIDogeCkpLFxuICAgICAgICB9LFxuICAgICAgICBhZGRyZXNzX2xpbmVfMjoge1xuICAgICAgICAgICAgc3VwcG9ydGVkX2luOiBbJ3N2ZycsICdpb20nLCAnbWFsdGEnLCAnbWFsdGFpbnZlc3QnXSxcbiAgICAgICAgICAgIGRlZmF1bHRfdmFsdWU6IGFjY291bnRfc2V0dGluZ3MuYWRkcmVzc19saW5lXzIgPz8gJycsXG4gICAgICAgICAgICBydWxlczogW1xuICAgICAgICAgICAgICAgIFsnYWRkcmVzcycsIGxvY2FsaXplKCdMZXR0ZXJzLCBudW1iZXJzLCBzcGFjZXMsIHBlcmlvZHMsIGh5cGhlbnMsIGFwb3N0cm9waGVzLCBjb21tYXMgb25seScpXSxcbiAgICAgICAgICAgICAgICBbJ2xlbmd0aCcsIGxvY2FsaXplKCdUaGlzIHNob3VsZCBub3QgZXhjZWVkIHt7bWF4fX0gY2hhcmFjdGVycy4nLCB7IG1heDogNzAgfSksIHsgbWF4OiA3MCB9XSxcbiAgICAgICAgICAgICAgICBbJ3BvX2JveCcsIGdldEVycm9yTWVzc2FnZXMoKS5wb19ib3goKV0sXG4gICAgICAgICAgICBdLmZpbHRlcih4ID0+IChpc19zdmcgPyB4LmluZGV4T2YoJ3BvX2JveCcpICE9PSAwIDogeCkpLFxuICAgICAgICB9LFxuICAgICAgICBhZGRyZXNzX2NpdHk6IHtcbiAgICAgICAgICAgIHN1cHBvcnRlZF9pbjogWydzdmcnLCAnaW9tJywgJ21hbHRhJywgJ21hbHRhaW52ZXN0J10sXG4gICAgICAgICAgICBkZWZhdWx0X3ZhbHVlOiBhY2NvdW50X3NldHRpbmdzLmFkZHJlc3NfY2l0eSA/PyAnJyxcbiAgICAgICAgICAgIHJ1bGVzOiBbXG4gICAgICAgICAgICAgICAgWydyZXEnLCBsb2NhbGl6ZSgnQ2l0eSBpcyByZXF1aXJlZCcpXSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICdyZWd1bGFyJyxcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxpemUoJ0xldHRlcnMsIG51bWJlcnMsIHNwYWNlcywgcGVyaW9kcywgaHlwaGVucywgYXBvc3Ryb3BoZXMgb25seScpLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWdleDogL15bQS1aYS16MC05XFxzJy4tXXsxLDM1fSQvLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBdLFxuICAgICAgICB9LFxuICAgICAgICBhZGRyZXNzX3N0YXRlOiB7XG4gICAgICAgICAgICBzdXBwb3J0ZWRfaW46IFsnc3ZnJywgJ2lvbScsICdtYWx0YScsICdtYWx0YWludmVzdCddLFxuICAgICAgICAgICAgZGVmYXVsdF92YWx1ZTogYWNjb3VudF9zZXR0aW5ncy5hZGRyZXNzX3N0YXRlID8/ICcnLFxuICAgICAgICAgICAgcnVsZXM6IFtcbiAgICAgICAgICAgICAgICBbJ3JlcScsIGxvY2FsaXplKCdTdGF0ZSBpcyByZXF1aXJlZCcpXSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICdyZWd1bGFyJyxcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxpemUoJ1N0YXRlIGlzIG5vdCBpbiBhIHByb3BlciBmb3JtYXQnKSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVnZXg6IC9eW1xcd1xcc1xcVycuLTssXXswLDYwfSQvLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBdLFxuICAgICAgICB9LFxuICAgICAgICBhZGRyZXNzX3Bvc3Rjb2RlOiB7XG4gICAgICAgICAgICBzdXBwb3J0ZWRfaW46IFsnc3ZnJywgJ2lvbScsICdtYWx0YScsICdtYWx0YWludmVzdCddLFxuICAgICAgICAgICAgZGVmYXVsdF92YWx1ZTogYWNjb3VudF9zZXR0aW5ncy5hZGRyZXNzX3Bvc3Rjb2RlID8/ICcnLFxuICAgICAgICAgICAgcnVsZXM6IFtcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICdsZW5ndGgnLFxuICAgICAgICAgICAgICAgICAgICBsb2NhbGl6ZSgnUGxlYXNlIGVudGVyIGEge3tmaWVsZF9uYW1lfX0gdW5kZXIge3ttYXhfbnVtYmVyfX0gY2hhcmFjdGVycy4nLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmaWVsZF9uYW1lOiBsb2NhbGl6ZSgncG9zdGFsL1pJUCBjb2RlJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXhfbnVtYmVyOiAyMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGludGVycG9sYXRpb246IHsgZXNjYXBlVmFsdWU6IGZhbHNlIH0sXG4gICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICB7IG1pbjogMCwgbWF4OiAyMCB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgWydwb3N0Y29kZScsIGdldEVycm9yTWVzc2FnZXMoKS5wb3N0Y29kZSgpXSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgIH0sXG4gICAgfTtcbn07XG5cbmNvbnN0IGFkZHJlc3NEZXRhaWxzQ29uZmlnID0gKFxuICAgIHsgdXBncmFkZV9pbmZvLCByZWFsX2FjY291bnRfc2lnbnVwX3RhcmdldCwgcmVzaWRlbmNlLCBhY2NvdW50X3NldHRpbmdzIH0sXG4gICAgQWRkcmVzc0RldGFpbHMsXG4gICAgaXNfZGFzaGJvYXJkID0gZmFsc2VcbikgPT4ge1xuICAgIGNvbnN0IGlzX3N2ZyA9IHVwZ3JhZGVfaW5mbz8uY2FuX3VwZ3JhZGVfdG8gPT09ICdzdmcnO1xuICAgIGNvbnN0IGNvbmZpZyA9IGFkZHJlc3NfZGV0YWlsc19jb25maWcoeyBhY2NvdW50X3NldHRpbmdzLCBpc19zdmcgfSk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgaGVhZGVyOiB7XG4gICAgICAgICAgICBhY3RpdmVfdGl0bGU6IGlzX2Rhc2hib2FyZCA/IGxvY2FsaXplKCdXaGVyZSBkbyB5b3UgbGl2ZT8nKSA6IGxvY2FsaXplKCdDb21wbGV0ZSB5b3VyIGFkZHJlc3MgZGV0YWlscycpLFxuICAgICAgICAgICAgdGl0bGU6IGlzX2Rhc2hib2FyZCA/IGxvY2FsaXplKCdBRERSRVNTJykgOiBsb2NhbGl6ZSgnQWRkcmVzcycpLFxuICAgICAgICB9LFxuICAgICAgICBib2R5OiBBZGRyZXNzRGV0YWlscyxcbiAgICAgICAgZm9ybV92YWx1ZTogZ2V0RGVmYXVsdEZpZWxkcyhyZWFsX2FjY291bnRfc2lnbnVwX3RhcmdldCwgY29uZmlnKSxcbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgIHZhbGlkYXRlOiBnZW5lcmF0ZVZhbGlkYXRpb25GdW5jdGlvbihcbiAgICAgICAgICAgICAgICByZWFsX2FjY291bnRfc2lnbnVwX3RhcmdldCxcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm1Db25maWcodHJhbnNmb3JtRm9yUmVzaWRlbmNlKGNvbmZpZywgcmVzaWRlbmNlKSwgcmVhbF9hY2NvdW50X3NpZ251cF90YXJnZXQpXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgaXNfc3ZnLFxuICAgICAgICB9LFxuICAgICAgICBwYXNzdGhyb3VnaDogWydyZXNpZGVuY2VfbGlzdCcsICdpc19mdWxseV9hdXRoZW50aWNhdGVkJ10sXG4gICAgICAgIGljb246ICdJY0Rhc2hib2FyZEFkZHJlc3MnLFxuICAgIH07XG59O1xuXG4vKipcbiAqIFRyYW5zZm9ybSBnZW5lcmFsIHJ1bGVzIGJhc2VkIG9uIHJlc2lkZW5jZVxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBydWxlcyAtIE9yaWdpbmFsIHJ1bGVzXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVzaWRlbmNlIC0gQ2xpZW50J3MgcmVzaWRlbmNlXG4gKiBAcmV0dXJuIHtvYmplY3R9IHJ1bGVzIC0gVHJhbnNmb3JtZWQgcnVsZXNcbiAqL1xuY29uc3QgdHJhbnNmb3JtRm9yUmVzaWRlbmNlID0gKHJ1bGVzLCByZXNpZGVuY2UpID0+IHtcbiAgICAvLyBJc2xlIG9mIE1hbiBDbGllbnRzIGRvIG5vdCBuZWVkIHRvIGZpbGwgb3V0IHN0YXRlIHNpbmNlIEFQSSBzdGF0ZXNfbGlzdCBpcyBlbXB0eS5cbiAgICBpZiAocmVzaWRlbmNlID09PSAnaW0nKSB7XG4gICAgICAgIHJ1bGVzLmFkZHJlc3Nfc3RhdGUucnVsZXMuc2hpZnQoKTtcbiAgICB9XG4gICAgLy8gR0IgcmVzaWRlbmNlIGFyZSByZXF1aXJlZCB0byBmaWxsIGluIHRoZSBwb3N0IGNvZGUuXG4gICAgaWYgKC9eKGltfGdiKSQvLnRlc3QocmVzaWRlbmNlKSkge1xuICAgICAgICBydWxlcy5hZGRyZXNzX3Bvc3Rjb2RlLnJ1bGVzLnNwbGljZSgwLCAwLCBbJ3JlcScsIGxvY2FsaXplKCdQb3N0YWwvWklQIGNvZGUgaXMgcmVxdWlyZWQnKV0pO1xuICAgIH1cblxuICAgIHJldHVybiBydWxlcztcbn07XG5cbmNvbnN0IHRyYW5zZm9ybUNvbmZpZyA9IChjb25maWcsIHsgcmVhbF9hY2NvdW50X3NpZ251cF90YXJnZXQgfSkgPT4ge1xuICAgIC8vIFJlbW92ZSByZXF1aXJlZCBydWxlIGZvciBzdmcgY2xpZW50c1xuICAgIGlmICghcmVhbF9hY2NvdW50X3NpZ251cF90YXJnZXQgfHwgcmVhbF9hY2NvdW50X3NpZ251cF90YXJnZXQgPT09ICdzdmcnKSB7XG4gICAgICAgIGNvbmZpZy5hZGRyZXNzX3N0YXRlLnJ1bGVzLnNoaWZ0KCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbmZpZztcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGFkZHJlc3NEZXRhaWxzQ29uZmlnO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQUFBO0FBUkE7QUFVQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFBQTtBQVBBO0FBU0E7QUFDQTtBQUNBO0FBQ0E7QUFNQTtBQURBO0FBUkE7QUFjQTtBQUNBO0FBQ0E7QUFDQTtBQU1BO0FBREE7QUFSQTtBQWNBO0FBQ0E7QUFDQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUhBO0FBS0E7QUFBQTtBQUFBO0FBWEE7QUFoREE7QUFpRUE7QUFDQTtBQUNBO0FBSUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFJQTtBQUxBO0FBT0E7QUFDQTtBQWZBO0FBaUJBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./Configs/address-details-config.js\n");

/***/ }),

/***/ "@deriv/shared":
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__deriv_shared__;

/***/ }),

/***/ "@deriv/translations":
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__deriv_translations__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./Configs/address-details-config.js");
/******/ 	__webpack_exports__ = __webpack_exports__.default;
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});