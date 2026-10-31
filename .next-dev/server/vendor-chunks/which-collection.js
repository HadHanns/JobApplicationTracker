"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/which-collection";
exports.ids = ["vendor-chunks/which-collection"];
exports.modules = {

/***/ "(ssr)/./node_modules/which-collection/index.js":
/*!************************************************!*\
  !*** ./node_modules/which-collection/index.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\nvar isMap = __webpack_require__(/*! is-map */ \"(ssr)/./node_modules/is-map/index.js\");\nvar isSet = __webpack_require__(/*! is-set */ \"(ssr)/./node_modules/is-set/index.js\");\nvar isWeakMap = __webpack_require__(/*! is-weakmap */ \"(ssr)/./node_modules/is-weakmap/index.js\");\nvar isWeakSet = __webpack_require__(/*! is-weakset */ \"(ssr)/./node_modules/is-weakset/index.js\");\n\n/** @type {import('.')} */\nmodule.exports = function whichCollection(/** @type {unknown} */ value) {\n\tif (value && typeof value === 'object') {\n\t\tif (isMap(value)) {\n\t\t\treturn 'Map';\n\t\t}\n\t\tif (isSet(value)) {\n\t\t\treturn 'Set';\n\t\t}\n\t\tif (isWeakMap(value)) {\n\t\t\treturn 'WeakMap';\n\t\t}\n\t\tif (isWeakSet(value)) {\n\t\t\treturn 'WeakSet';\n\t\t}\n\t}\n\treturn false;\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvd2hpY2gtY29sbGVjdGlvbi9pbmRleC5qcyIsIm1hcHBpbmdzIjoiQUFBYTs7QUFFYixZQUFZLG1CQUFPLENBQUMsb0RBQVE7QUFDNUIsWUFBWSxtQkFBTyxDQUFDLG9EQUFRO0FBQzVCLGdCQUFnQixtQkFBTyxDQUFDLDREQUFZO0FBQ3BDLGdCQUFnQixtQkFBTyxDQUFDLDREQUFZOztBQUVwQyxXQUFXLGFBQWE7QUFDeEIscURBQXFELFNBQVM7QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIi9Vc2Vycy9oYWRkYWRoYW5uYW5zcmcvRG9jdW1lbnRzL0pvYkFwcGxpY2F0aW9uVHJhY2tlci9ub2RlX21vZHVsZXMvd2hpY2gtY29sbGVjdGlvbi9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBpc01hcCA9IHJlcXVpcmUoJ2lzLW1hcCcpO1xudmFyIGlzU2V0ID0gcmVxdWlyZSgnaXMtc2V0Jyk7XG52YXIgaXNXZWFrTWFwID0gcmVxdWlyZSgnaXMtd2Vha21hcCcpO1xudmFyIGlzV2Vha1NldCA9IHJlcXVpcmUoJ2lzLXdlYWtzZXQnKTtcblxuLyoqIEB0eXBlIHtpbXBvcnQoJy4nKX0gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gd2hpY2hDb2xsZWN0aW9uKC8qKiBAdHlwZSB7dW5rbm93bn0gKi8gdmFsdWUpIHtcblx0aWYgKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcblx0XHRpZiAoaXNNYXAodmFsdWUpKSB7XG5cdFx0XHRyZXR1cm4gJ01hcCc7XG5cdFx0fVxuXHRcdGlmIChpc1NldCh2YWx1ZSkpIHtcblx0XHRcdHJldHVybiAnU2V0Jztcblx0XHR9XG5cdFx0aWYgKGlzV2Vha01hcCh2YWx1ZSkpIHtcblx0XHRcdHJldHVybiAnV2Vha01hcCc7XG5cdFx0fVxuXHRcdGlmIChpc1dlYWtTZXQodmFsdWUpKSB7XG5cdFx0XHRyZXR1cm4gJ1dlYWtTZXQnO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gZmFsc2U7XG59O1xuIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6WzBdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/which-collection/index.js\n");

/***/ })

};
;