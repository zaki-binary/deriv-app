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
		module.exports = factory(require("@deriv/components"), require("@deriv/shared"), require("@deriv/translations"), require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["@deriv/components", "@deriv/shared", "@deriv/translations", "react"], factory);
	else if(typeof exports === 'object')
		exports["@deriv/account"] = factory(require("@deriv/components"), require("@deriv/shared"), require("@deriv/translations"), require("react"));
	else
		root["@deriv/account"] = factory(root["@deriv/components"], root["@deriv/shared"], root["@deriv/translations"], root["react"]);
})(self, function(__WEBPACK_EXTERNAL_MODULE__deriv_components__, __WEBPACK_EXTERNAL_MODULE__deriv_shared__, __WEBPACK_EXTERNAL_MODULE__deriv_translations__, __WEBPACK_EXTERNAL_MODULE_react__) {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./Components/sent-email-modal/index.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("\n// EXPORTS\n__webpack_require__.d(__webpack_exports__, {\n  \"default\": () => (/* binding */ Components_sent_email_modal)\n});\n\n// EXTERNAL MODULE: external \"react\"\nvar external_react_ = __webpack_require__(\"react\");\nvar external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);\n// EXTERNAL MODULE: ../../../node_modules/prop-types/index.js\nvar prop_types = __webpack_require__(\"../../../node_modules/prop-types/index.js\");\nvar prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);\n// EXTERNAL MODULE: external \"@deriv/translations\"\nvar translations_ = __webpack_require__(\"@deriv/translations\");\n// EXTERNAL MODULE: external \"@deriv/components\"\nvar components_ = __webpack_require__(\"@deriv/components\");\n// EXTERNAL MODULE: external \"@deriv/shared\"\nvar shared_ = __webpack_require__(\"@deriv/shared\");\n;// CONCATENATED MODULE: ./Components/sent-email-modal/sent-email-modal.jsx\n\n\n\n\n\n\nvar getNoEmailContentStrings = function getNoEmailContentStrings() {\n  return [{\n    key: 'email_spam',\n    icon: 'IcEmailSpam',\n    content: (0,translations_.localize)('The email is in your spam folder (Sometimes things get lost there).')\n  }, {\n    key: 'wrong_email',\n    icon: 'IcEmail',\n    content: (0,translations_.localize)('You accidentally gave us another email address (Usually a work or a personal one instead of the one you meant).')\n  }, {\n    key: 'email_firewall',\n    icon: 'IcEmailFirewall',\n    content: (0,translations_.localize)('We can’t deliver the email to this address (Usually because of firewalls or filtering).')\n  }];\n};\n\nvar SentEmailModal = function SentEmailModal(_ref) {\n  var identifier_title = _ref.identifier_title,\n      is_open = _ref.is_open,\n      onClose = _ref.onClose,\n      onClickSendEmail = _ref.onClickSendEmail;\n\n  var getSubtitle = function getSubtitle() {\n    var subtitle = '';\n\n    switch (identifier_title) {\n      case 'trading_password':\n        subtitle = (0,translations_.localize)('Please click on the link in the email to reset your trading password.');\n        break;\n\n      case 'Google':\n      case 'Facebook':\n        subtitle = (0,translations_.localize)('Check your {{ identifier_title }} account email and click the link in the email to proceed.', {\n          identifier_title: identifier_title\n        });\n        break;\n\n      default:\n        subtitle = (0,translations_.localize)('Please click on the link in the email to reset your password.');\n        break;\n    }\n\n    return subtitle;\n  };\n\n  var sent_email_template = /*#__PURE__*/external_react_default().createElement(components_.SendEmailTemplate, {\n    className: \"sent-email\",\n    subtitle: getSubtitle(),\n    lbl_no_receive: (0,translations_.localize)(\"Didn't receive the email?\"),\n    txt_resend: (0,translations_.localize)('Resend email'),\n    txt_resend_in: (0,translations_.localize)('Resend email in'),\n    onClickSendEmail: onClickSendEmail\n  }, getNoEmailContentStrings().map(function (item) {\n    return /*#__PURE__*/external_react_default().createElement(\"div\", {\n      className: \"sent-email__content\",\n      key: item.key\n    }, /*#__PURE__*/external_react_default().createElement(components_.Icon, {\n      icon: item.icon,\n      size: 32\n    }), /*#__PURE__*/external_react_default().createElement(components_.Text, {\n      size: \"xxs\",\n      as: \"p\"\n    }, item.content));\n  }));\n\n  if ((0,shared_.isMobile)()) {\n    return /*#__PURE__*/external_react_default().createElement(components_.MobileDialog, {\n      portal_element_id: \"modal_root\",\n      title: (0,translations_.localize)('We’ve sent you an email'),\n      wrapper_classname: \"mt5-email-sent\",\n      visible: is_open,\n      onClose: onClose,\n      has_content_scroll: true\n    }, sent_email_template);\n  }\n\n  return /*#__PURE__*/external_react_default().createElement(components_.Modal, {\n    className: 'sent-email__modal',\n    is_open: is_open,\n    has_close_icon: true,\n    should_header_stick_body: true,\n    title: \"\",\n    toggleModal: onClose,\n    width: \"440px\"\n  }, /*#__PURE__*/external_react_default().createElement(components_.Div100vhContainer, {\n    className: \"account__scrollbars_container-wrapper\",\n    is_disabled: (0,shared_.isDesktop)(),\n    height_offset: \"80px\"\n  }, /*#__PURE__*/external_react_default().createElement(components_.Modal.Body, null, /*#__PURE__*/external_react_default().createElement(\"div\", {\n    onClick: onClose,\n    className: \"sent-email__modal-close\"\n  }, /*#__PURE__*/external_react_default().createElement(components_.Icon, {\n    icon: \"IcCross\"\n  })), sent_email_template)));\n};\n\nSentEmailModal.propTypes = {\n  identifier_title: (prop_types_default()).string,\n  is_open: (prop_types_default()).bool,\n  is_unlink_modal: (prop_types_default()).bool,\n  onClose: (prop_types_default()).func,\n  onClickSendEmail: (prop_types_default()).func\n};\n/* harmony default export */ const sent_email_modal = (SentEmailModal);\n;// CONCATENATED MODULE: ./Components/sent-email-modal/index.js\n\n/* harmony default export */ const Components_sent_email_modal = (sent_email_modal);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9Db21wb25lbnRzL3NlbnQtZW1haWwtbW9kYWwvaW5kZXguanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AZGVyaXYvYWNjb3VudC8uL0NvbXBvbmVudHMvc2VudC1lbWFpbC1tb2RhbC9zZW50LWVtYWlsLW1vZGFsLmpzeD82YjM5Iiwid2VicGFjazovL0BkZXJpdi9hY2NvdW50Ly4vQ29tcG9uZW50cy9zZW50LWVtYWlsLW1vZGFsL2luZGV4LmpzP2Q3MzciXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBsb2NhbGl6ZSB9IGZyb20gJ0BkZXJpdi90cmFuc2xhdGlvbnMnO1xuaW1wb3J0IHsgRGl2MTAwdmhDb250YWluZXIsIEljb24sIE1vYmlsZURpYWxvZywgTW9kYWwsIFNlbmRFbWFpbFRlbXBsYXRlLCBUZXh0IH0gZnJvbSAnQGRlcml2L2NvbXBvbmVudHMnO1xuaW1wb3J0IHsgaXNNb2JpbGUsIGlzRGVza3RvcCB9IGZyb20gJ0BkZXJpdi9zaGFyZWQnO1xuXG5jb25zdCBnZXROb0VtYWlsQ29udGVudFN0cmluZ3MgPSAoKSA9PiB7XG4gICAgcmV0dXJuIFtcbiAgICAgICAge1xuICAgICAgICAgICAga2V5OiAnZW1haWxfc3BhbScsXG4gICAgICAgICAgICBpY29uOiAnSWNFbWFpbFNwYW0nLFxuICAgICAgICAgICAgY29udGVudDogbG9jYWxpemUoJ1RoZSBlbWFpbCBpcyBpbiB5b3VyIHNwYW0gZm9sZGVyIChTb21ldGltZXMgdGhpbmdzIGdldCBsb3N0IHRoZXJlKS4nKSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAga2V5OiAnd3JvbmdfZW1haWwnLFxuICAgICAgICAgICAgaWNvbjogJ0ljRW1haWwnLFxuICAgICAgICAgICAgY29udGVudDogbG9jYWxpemUoXG4gICAgICAgICAgICAgICAgJ1lvdSBhY2NpZGVudGFsbHkgZ2F2ZSB1cyBhbm90aGVyIGVtYWlsIGFkZHJlc3MgKFVzdWFsbHkgYSB3b3JrIG9yIGEgcGVyc29uYWwgb25lIGluc3RlYWQgb2YgdGhlIG9uZSB5b3UgbWVhbnQpLidcbiAgICAgICAgICAgICksXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGtleTogJ2VtYWlsX2ZpcmV3YWxsJyxcbiAgICAgICAgICAgIGljb246ICdJY0VtYWlsRmlyZXdhbGwnLFxuICAgICAgICAgICAgY29udGVudDogbG9jYWxpemUoXG4gICAgICAgICAgICAgICAgJ1dlIGNhbuKAmXQgZGVsaXZlciB0aGUgZW1haWwgdG8gdGhpcyBhZGRyZXNzIChVc3VhbGx5IGJlY2F1c2Ugb2YgZmlyZXdhbGxzIG9yIGZpbHRlcmluZykuJ1xuICAgICAgICAgICAgKSxcbiAgICAgICAgfSxcbiAgICBdO1xufTtcblxuY29uc3QgU2VudEVtYWlsTW9kYWwgPSAoeyBpZGVudGlmaWVyX3RpdGxlLCBpc19vcGVuLCBvbkNsb3NlLCBvbkNsaWNrU2VuZEVtYWlsIH0pID0+IHtcbiAgICBjb25zdCBnZXRTdWJ0aXRsZSA9ICgpID0+IHtcbiAgICAgICAgbGV0IHN1YnRpdGxlID0gJyc7XG4gICAgICAgIHN3aXRjaCAoaWRlbnRpZmllcl90aXRsZSkge1xuICAgICAgICAgICAgY2FzZSAndHJhZGluZ19wYXNzd29yZCc6XG4gICAgICAgICAgICAgICAgc3VidGl0bGUgPSBsb2NhbGl6ZSgnUGxlYXNlIGNsaWNrIG9uIHRoZSBsaW5rIGluIHRoZSBlbWFpbCB0byByZXNldCB5b3VyIHRyYWRpbmcgcGFzc3dvcmQuJyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdHb29nbGUnOlxuICAgICAgICAgICAgY2FzZSAnRmFjZWJvb2snOlxuICAgICAgICAgICAgICAgIHN1YnRpdGxlID0gbG9jYWxpemUoXG4gICAgICAgICAgICAgICAgICAgICdDaGVjayB5b3VyIHt7IGlkZW50aWZpZXJfdGl0bGUgfX0gYWNjb3VudCBlbWFpbCBhbmQgY2xpY2sgdGhlIGxpbmsgaW4gdGhlIGVtYWlsIHRvIHByb2NlZWQuJyxcbiAgICAgICAgICAgICAgICAgICAgeyBpZGVudGlmaWVyX3RpdGxlIH1cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBzdWJ0aXRsZSA9IGxvY2FsaXplKCdQbGVhc2UgY2xpY2sgb24gdGhlIGxpbmsgaW4gdGhlIGVtYWlsIHRvIHJlc2V0IHlvdXIgcGFzc3dvcmQuJyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN1YnRpdGxlO1xuICAgIH07XG5cbiAgICBjb25zdCBzZW50X2VtYWlsX3RlbXBsYXRlID0gKFxuICAgICAgICA8U2VuZEVtYWlsVGVtcGxhdGVcbiAgICAgICAgICAgIGNsYXNzTmFtZT0nc2VudC1lbWFpbCdcbiAgICAgICAgICAgIHN1YnRpdGxlPXtnZXRTdWJ0aXRsZSgpfVxuICAgICAgICAgICAgbGJsX25vX3JlY2VpdmU9e2xvY2FsaXplKFwiRGlkbid0IHJlY2VpdmUgdGhlIGVtYWlsP1wiKX1cbiAgICAgICAgICAgIHR4dF9yZXNlbmQ9e2xvY2FsaXplKCdSZXNlbmQgZW1haWwnKX1cbiAgICAgICAgICAgIHR4dF9yZXNlbmRfaW49e2xvY2FsaXplKCdSZXNlbmQgZW1haWwgaW4nKX1cbiAgICAgICAgICAgIG9uQ2xpY2tTZW5kRW1haWw9e29uQ2xpY2tTZW5kRW1haWx9XG4gICAgICAgID5cbiAgICAgICAgICAgIHtnZXROb0VtYWlsQ29udGVudFN0cmluZ3MoKS5tYXAoaXRlbSA9PiAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3NlbnQtZW1haWxfX2NvbnRlbnQnIGtleT17aXRlbS5rZXl9PlxuICAgICAgICAgICAgICAgICAgICA8SWNvbiBpY29uPXtpdGVtLmljb259IHNpemU9ezMyfSAvPlxuICAgICAgICAgICAgICAgICAgICA8VGV4dCBzaXplPSd4eHMnIGFzPSdwJz5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtpdGVtLmNvbnRlbnR9XG4gICAgICAgICAgICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICkpfVxuICAgICAgICA8L1NlbmRFbWFpbFRlbXBsYXRlPlxuICAgICk7XG5cbiAgICBpZiAoaXNNb2JpbGUoKSkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPE1vYmlsZURpYWxvZ1xuICAgICAgICAgICAgICAgIHBvcnRhbF9lbGVtZW50X2lkPSdtb2RhbF9yb290J1xuICAgICAgICAgICAgICAgIHRpdGxlPXtsb2NhbGl6ZSgnV2XigJl2ZSBzZW50IHlvdSBhbiBlbWFpbCcpfVxuICAgICAgICAgICAgICAgIHdyYXBwZXJfY2xhc3NuYW1lPSdtdDUtZW1haWwtc2VudCdcbiAgICAgICAgICAgICAgICB2aXNpYmxlPXtpc19vcGVufVxuICAgICAgICAgICAgICAgIG9uQ2xvc2U9e29uQ2xvc2V9XG4gICAgICAgICAgICAgICAgaGFzX2NvbnRlbnRfc2Nyb2xsXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge3NlbnRfZW1haWxfdGVtcGxhdGV9XG4gICAgICAgICAgICA8L01vYmlsZURpYWxvZz5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8TW9kYWxcbiAgICAgICAgICAgIGNsYXNzTmFtZT17J3NlbnQtZW1haWxfX21vZGFsJ31cbiAgICAgICAgICAgIGlzX29wZW49e2lzX29wZW59XG4gICAgICAgICAgICBoYXNfY2xvc2VfaWNvblxuICAgICAgICAgICAgc2hvdWxkX2hlYWRlcl9zdGlja19ib2R5XG4gICAgICAgICAgICB0aXRsZT0nJ1xuICAgICAgICAgICAgdG9nZ2xlTW9kYWw9e29uQ2xvc2V9XG4gICAgICAgICAgICB3aWR0aD0nNDQwcHgnXG4gICAgICAgID5cbiAgICAgICAgICAgIDxEaXYxMDB2aENvbnRhaW5lclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0nYWNjb3VudF9fc2Nyb2xsYmFyc19jb250YWluZXItd3JhcHBlcidcbiAgICAgICAgICAgICAgICBpc19kaXNhYmxlZD17aXNEZXNrdG9wKCl9XG4gICAgICAgICAgICAgICAgaGVpZ2h0X29mZnNldD0nODBweCdcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8TW9kYWwuQm9keT5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBvbkNsaWNrPXtvbkNsb3NlfSBjbGFzc05hbWU9J3NlbnQtZW1haWxfX21vZGFsLWNsb3NlJz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxJY29uIGljb249J0ljQ3Jvc3MnIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICB7c2VudF9lbWFpbF90ZW1wbGF0ZX1cbiAgICAgICAgICAgICAgICA8L01vZGFsLkJvZHk+XG4gICAgICAgICAgICA8L0RpdjEwMHZoQ29udGFpbmVyPlxuICAgICAgICA8L01vZGFsPlxuICAgICk7XG59O1xuXG5TZW50RW1haWxNb2RhbC5wcm9wVHlwZXMgPSB7XG4gICAgaWRlbnRpZmllcl90aXRsZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBpc19vcGVuOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBpc191bmxpbmtfbW9kYWw6IFByb3BUeXBlcy5ib29sLFxuICAgIG9uQ2xvc2U6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uQ2xpY2tTZW5kRW1haWw6IFByb3BUeXBlcy5mdW5jLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgU2VudEVtYWlsTW9kYWw7XG4iLCJpbXBvcnQgU2VudEVtYWlsTW9kYWwgZnJvbSAnLi9zZW50LWVtYWlsLW1vZGFsLmpzeCc7XG5cbmV4cG9ydCBkZWZhdWx0IFNlbnRFbWFpbE1vZGFsO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUhBO0FBTUE7QUFDQTtBQUNBO0FBSEE7QUFRQTtBQUNBO0FBQ0E7QUFIQTtBQVFBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFiQTtBQUNBO0FBY0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFOQTtBQVFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBSEE7QUFDQTtBQVVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFOQTtBQVdBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUEE7QUFVQTtBQUNBO0FBQ0E7QUFIQTtBQU1BO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFRQTs7QUN4SEE7QUFFQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./Components/sent-email-modal/index.js\n");

/***/ }),

/***/ "../../../node_modules/prop-types/factoryWithThrowingShims.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("/**\n * Copyright (c) 2013-present, Facebook, Inc.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\n\n\nvar ReactPropTypesSecret = __webpack_require__(\"../../../node_modules/prop-types/lib/ReactPropTypesSecret.js\");\n\nfunction emptyFunction() {}\nfunction emptyFunctionWithReset() {}\nemptyFunctionWithReset.resetWarningCache = emptyFunction;\n\nmodule.exports = function() {\n  function shim(props, propName, componentName, location, propFullName, secret) {\n    if (secret === ReactPropTypesSecret) {\n      // It is still safe when called from React.\n      return;\n    }\n    var err = new Error(\n      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +\n      'Use PropTypes.checkPropTypes() to call them. ' +\n      'Read more at http://fb.me/use-check-prop-types'\n    );\n    err.name = 'Invariant Violation';\n    throw err;\n  };\n  shim.isRequired = shim;\n  function getShim() {\n    return shim;\n  };\n  // Important!\n  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.\n  var ReactPropTypes = {\n    array: shim,\n    bool: shim,\n    func: shim,\n    number: shim,\n    object: shim,\n    string: shim,\n    symbol: shim,\n\n    any: shim,\n    arrayOf: getShim,\n    element: shim,\n    elementType: shim,\n    instanceOf: getShim,\n    node: shim,\n    objectOf: getShim,\n    oneOf: getShim,\n    oneOfType: getShim,\n    shape: getShim,\n    exact: getShim,\n\n    checkPropTypes: emptyFunctionWithReset,\n    resetWarningCache: emptyFunction\n  };\n\n  ReactPropTypes.PropTypes = ReactPropTypes;\n\n  return ReactPropTypes;\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvZmFjdG9yeVdpdGhUaHJvd2luZ1NoaW1zLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vQGRlcml2L2FjY291bnQvLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvZmFjdG9yeVdpdGhUaHJvd2luZ1NoaW1zLmpzP2RjMDciXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdFByb3BUeXBlc1NlY3JldCA9IHJlcXVpcmUoJy4vbGliL1JlYWN0UHJvcFR5cGVzU2VjcmV0Jyk7XG5cbmZ1bmN0aW9uIGVtcHR5RnVuY3Rpb24oKSB7fVxuZnVuY3Rpb24gZW1wdHlGdW5jdGlvbldpdGhSZXNldCgpIHt9XG5lbXB0eUZ1bmN0aW9uV2l0aFJlc2V0LnJlc2V0V2FybmluZ0NhY2hlID0gZW1wdHlGdW5jdGlvbjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgZnVuY3Rpb24gc2hpbShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUsIHNlY3JldCkge1xuICAgIGlmIChzZWNyZXQgPT09IFJlYWN0UHJvcFR5cGVzU2VjcmV0KSB7XG4gICAgICAvLyBJdCBpcyBzdGlsbCBzYWZlIHdoZW4gY2FsbGVkIGZyb20gUmVhY3QuXG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoXG4gICAgICAnQ2FsbGluZyBQcm9wVHlwZXMgdmFsaWRhdG9ycyBkaXJlY3RseSBpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoZSBgcHJvcC10eXBlc2AgcGFja2FnZS4gJyArXG4gICAgICAnVXNlIFByb3BUeXBlcy5jaGVja1Byb3BUeXBlcygpIHRvIGNhbGwgdGhlbS4gJyArXG4gICAgICAnUmVhZCBtb3JlIGF0IGh0dHA6Ly9mYi5tZS91c2UtY2hlY2stcHJvcC10eXBlcydcbiAgICApO1xuICAgIGVyci5uYW1lID0gJ0ludmFyaWFudCBWaW9sYXRpb24nO1xuICAgIHRocm93IGVycjtcbiAgfTtcbiAgc2hpbS5pc1JlcXVpcmVkID0gc2hpbTtcbiAgZnVuY3Rpb24gZ2V0U2hpbSgpIHtcbiAgICByZXR1cm4gc2hpbTtcbiAgfTtcbiAgLy8gSW1wb3J0YW50IVxuICAvLyBLZWVwIHRoaXMgbGlzdCBpbiBzeW5jIHdpdGggcHJvZHVjdGlvbiB2ZXJzaW9uIGluIGAuL2ZhY3RvcnlXaXRoVHlwZUNoZWNrZXJzLmpzYC5cbiAgdmFyIFJlYWN0UHJvcFR5cGVzID0ge1xuICAgIGFycmF5OiBzaGltLFxuICAgIGJvb2w6IHNoaW0sXG4gICAgZnVuYzogc2hpbSxcbiAgICBudW1iZXI6IHNoaW0sXG4gICAgb2JqZWN0OiBzaGltLFxuICAgIHN0cmluZzogc2hpbSxcbiAgICBzeW1ib2w6IHNoaW0sXG5cbiAgICBhbnk6IHNoaW0sXG4gICAgYXJyYXlPZjogZ2V0U2hpbSxcbiAgICBlbGVtZW50OiBzaGltLFxuICAgIGVsZW1lbnRUeXBlOiBzaGltLFxuICAgIGluc3RhbmNlT2Y6IGdldFNoaW0sXG4gICAgbm9kZTogc2hpbSxcbiAgICBvYmplY3RPZjogZ2V0U2hpbSxcbiAgICBvbmVPZjogZ2V0U2hpbSxcbiAgICBvbmVPZlR5cGU6IGdldFNoaW0sXG4gICAgc2hhcGU6IGdldFNoaW0sXG4gICAgZXhhY3Q6IGdldFNoaW0sXG5cbiAgICBjaGVja1Byb3BUeXBlczogZW1wdHlGdW5jdGlvbldpdGhSZXNldCxcbiAgICByZXNldFdhcm5pbmdDYWNoZTogZW1wdHlGdW5jdGlvblxuICB9O1xuXG4gIFJlYWN0UHJvcFR5cGVzLlByb3BUeXBlcyA9IFJlYWN0UHJvcFR5cGVzO1xuXG4gIHJldHVybiBSZWFjdFByb3BUeXBlcztcbn07XG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///../../../node_modules/prop-types/factoryWithThrowingShims.js\n");

/***/ }),

/***/ "../../../node_modules/prop-types/index.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("/**\n * Copyright (c) 2013-present, Facebook, Inc.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\nif (false) { var throwOnDirectAccess, ReactIs; } else {\n  // By explicitly using `prop-types` you are opting into new production behavior.\n  // http://fb.me/prop-types-in-prod\n  module.exports = __webpack_require__(\"../../../node_modules/prop-types/factoryWithThrowingShims.js\")();\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvaW5kZXguanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AZGVyaXYvYWNjb3VudC8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9pbmRleC5qcz83MGQ0Il0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgdmFyIFJlYWN0SXMgPSByZXF1aXJlKCdyZWFjdC1pcycpO1xuXG4gIC8vIEJ5IGV4cGxpY2l0bHkgdXNpbmcgYHByb3AtdHlwZXNgIHlvdSBhcmUgb3B0aW5nIGludG8gbmV3IGRldmVsb3BtZW50IGJlaGF2aW9yLlxuICAvLyBodHRwOi8vZmIubWUvcHJvcC10eXBlcy1pbi1wcm9kXG4gIHZhciB0aHJvd09uRGlyZWN0QWNjZXNzID0gdHJ1ZTtcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2ZhY3RvcnlXaXRoVHlwZUNoZWNrZXJzJykoUmVhY3RJcy5pc0VsZW1lbnQsIHRocm93T25EaXJlY3RBY2Nlc3MpO1xufSBlbHNlIHtcbiAgLy8gQnkgZXhwbGljaXRseSB1c2luZyBgcHJvcC10eXBlc2AgeW91IGFyZSBvcHRpbmcgaW50byBuZXcgcHJvZHVjdGlvbiBiZWhhdmlvci5cbiAgLy8gaHR0cDovL2ZiLm1lL3Byb3AtdHlwZXMtaW4tcHJvZFxuICBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vZmFjdG9yeVdpdGhUaHJvd2luZ1NoaW1zJykoKTtcbn1cbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///../../../node_modules/prop-types/index.js\n");

/***/ }),

/***/ "../../../node_modules/prop-types/lib/ReactPropTypesSecret.js":
/***/ ((module) => {

"use strict";
eval("/**\n * Copyright (c) 2013-present, Facebook, Inc.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\n\n\nvar ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';\n\nmodule.exports = ReactPropTypesSecret;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvbGliL1JlYWN0UHJvcFR5cGVzU2VjcmV0LmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vQGRlcml2L2FjY291bnQvLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvbGliL1JlYWN0UHJvcFR5cGVzU2VjcmV0LmpzP2FkODMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdFByb3BUeXBlc1NlY3JldCA9ICdTRUNSRVRfRE9fTk9UX1BBU1NfVEhJU19PUl9ZT1VfV0lMTF9CRV9GSVJFRCc7XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RQcm9wVHlwZXNTZWNyZXQ7XG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///../../../node_modules/prop-types/lib/ReactPropTypesSecret.js\n");

/***/ }),

/***/ "@deriv/components":
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE__deriv_components__;

/***/ }),

/***/ "@deriv/shared":
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE__deriv_shared__;

/***/ }),

/***/ "@deriv/translations":
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE__deriv_translations__;

/***/ }),

/***/ "react":
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE_react__;

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
/******/ 	var __webpack_exports__ = __webpack_require__("./Components/sent-email-modal/index.js");
/******/ 	__webpack_exports__ = __webpack_exports__.default;
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});