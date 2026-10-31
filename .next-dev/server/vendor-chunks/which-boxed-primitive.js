"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/which-boxed-primitive";
exports.ids = ["vendor-chunks/which-boxed-primitive"];
exports.modules = {

/***/ "(ssr)/./node_modules/which-boxed-primitive/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/which-boxed-primitive/index.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\nvar isString = __webpack_require__(/*! is-string */ \"(ssr)/./node_modules/is-string/index.js\");\nvar isNumber = __webpack_require__(/*! is-number-object */ \"(ssr)/./node_modules/is-number-object/index.js\");\nvar isBoolean = __webpack_require__(/*! is-boolean-object */ \"(ssr)/./node_modules/is-boolean-object/index.js\");\nvar isSymbol = __webpack_require__(/*! is-symbol */ \"(ssr)/./node_modules/is-symbol/index.js\");\nvar isBigInt = __webpack_require__(/*! is-bigint */ \"(ssr)/./node_modules/is-bigint/index.js\");\n\n/** @type {import('.')} */\n// eslint-disable-next-line consistent-return\nmodule.exports = function whichBoxedPrimitive(value) {\n\t// eslint-disable-next-line eqeqeq\n\tif (value == null || (typeof value !== 'object' && typeof value !== 'function')) {\n\t\treturn null;\n\t}\n\tif (isString(value)) {\n\t\treturn 'String';\n\t}\n\tif (isNumber(value)) {\n\t\treturn 'Number';\n\t}\n\tif (isBoolean(value)) {\n\t\treturn 'Boolean';\n\t}\n\tif (isSymbol(value)) {\n\t\treturn 'Symbol';\n\t}\n\tif (isBigInt(value)) {\n\t\treturn 'BigInt';\n\t}\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvd2hpY2gtYm94ZWQtcHJpbWl0aXZlL2luZGV4LmpzIiwibWFwcGluZ3MiOiJBQUFhOztBQUViLGVBQWUsbUJBQU8sQ0FBQywwREFBVztBQUNsQyxlQUFlLG1CQUFPLENBQUMsd0VBQWtCO0FBQ3pDLGdCQUFnQixtQkFBTyxDQUFDLDBFQUFtQjtBQUMzQyxlQUFlLG1CQUFPLENBQUMsMERBQVc7QUFDbEMsZUFBZSxtQkFBTyxDQUFDLDBEQUFXOztBQUVsQyxXQUFXLGFBQWE7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIi9Vc2Vycy9oYWRkYWRoYW5uYW5zcmcvRG9jdW1lbnRzL0pvYkFwcGxpY2F0aW9uVHJhY2tlci9ub2RlX21vZHVsZXMvd2hpY2gtYm94ZWQtcHJpbWl0aXZlL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIGlzU3RyaW5nID0gcmVxdWlyZSgnaXMtc3RyaW5nJyk7XG52YXIgaXNOdW1iZXIgPSByZXF1aXJlKCdpcy1udW1iZXItb2JqZWN0Jyk7XG52YXIgaXNCb29sZWFuID0gcmVxdWlyZSgnaXMtYm9vbGVhbi1vYmplY3QnKTtcbnZhciBpc1N5bWJvbCA9IHJlcXVpcmUoJ2lzLXN5bWJvbCcpO1xudmFyIGlzQmlnSW50ID0gcmVxdWlyZSgnaXMtYmlnaW50Jyk7XG5cbi8qKiBAdHlwZSB7aW1wb3J0KCcuJyl9ICovXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29uc2lzdGVudC1yZXR1cm5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gd2hpY2hCb3hlZFByaW1pdGl2ZSh2YWx1ZSkge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXFlcWVxXG5cdGlmICh2YWx1ZSA9PSBudWxsIHx8ICh0eXBlb2YgdmFsdWUgIT09ICdvYmplY3QnICYmIHR5cGVvZiB2YWx1ZSAhPT0gJ2Z1bmN0aW9uJykpIHtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXHRpZiAoaXNTdHJpbmcodmFsdWUpKSB7XG5cdFx0cmV0dXJuICdTdHJpbmcnO1xuXHR9XG5cdGlmIChpc051bWJlcih2YWx1ZSkpIHtcblx0XHRyZXR1cm4gJ051bWJlcic7XG5cdH1cblx0aWYgKGlzQm9vbGVhbih2YWx1ZSkpIHtcblx0XHRyZXR1cm4gJ0Jvb2xlYW4nO1xuXHR9XG5cdGlmIChpc1N5bWJvbCh2YWx1ZSkpIHtcblx0XHRyZXR1cm4gJ1N5bWJvbCc7XG5cdH1cblx0aWYgKGlzQmlnSW50KHZhbHVlKSkge1xuXHRcdHJldHVybiAnQmlnSW50Jztcblx0fVxufTtcbiJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOlswXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/which-boxed-primitive/index.js\n");

/***/ })

};
;