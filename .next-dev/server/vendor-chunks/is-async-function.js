"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/is-async-function";
exports.ids = ["vendor-chunks/is-async-function"];
exports.modules = {

/***/ "(ssr)/./node_modules/is-async-function/index.js":
/*!*************************************************!*\
  !*** ./node_modules/is-async-function/index.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\nvar callBound = __webpack_require__(/*! call-bound */ \"(ssr)/./node_modules/call-bound/index.js\");\nvar safeRegexTest = __webpack_require__(/*! safe-regex-test */ \"(ssr)/./node_modules/safe-regex-test/index.js\");\n\nvar toStr = callBound('Object.prototype.toString');\nvar fnToStr = callBound('Function.prototype.toString');\nvar isFnRegex = safeRegexTest(/^\\s*async(?:\\s+function(?:\\s+|\\()|\\s*\\()/);\n\nvar hasToStringTag = __webpack_require__(/*! has-tostringtag/shams */ \"(ssr)/./node_modules/has-tostringtag/shams.js\")();\nvar getProto = __webpack_require__(/*! get-proto */ \"(ssr)/./node_modules/get-proto/index.js\");\n\nvar getAsyncFunc = __webpack_require__(/*! async-function */ \"(ssr)/./node_modules/async-function/index.js\");\n\n/** @type {import('.')} */\nmodule.exports = function isAsyncFunction(fn) {\n\tif (typeof fn !== 'function') {\n\t\treturn false;\n\t}\n\tif (isFnRegex(fnToStr(fn))) {\n\t\treturn true;\n\t}\n\tif (!hasToStringTag) {\n\t\tvar str = toStr(fn);\n\t\treturn str === '[object AsyncFunction]';\n\t}\n\tif (!getProto) {\n\t\treturn false;\n\t}\n\tvar asyncFunc = getAsyncFunc();\n\treturn asyncFunc && asyncFunc.prototype === getProto(fn);\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvaXMtYXN5bmMtZnVuY3Rpb24vaW5kZXguanMiLCJtYXBwaW5ncyI6IkFBQWE7O0FBRWIsZ0JBQWdCLG1CQUFPLENBQUMsNERBQVk7QUFDcEMsb0JBQW9CLG1CQUFPLENBQUMsc0VBQWlCOztBQUU3QztBQUNBO0FBQ0E7O0FBRUEscUJBQXFCLG1CQUFPLENBQUMsNEVBQXVCO0FBQ3BELGVBQWUsbUJBQU8sQ0FBQywwREFBVzs7QUFFbEMsbUJBQW1CLG1CQUFPLENBQUMsb0VBQWdCOztBQUUzQyxXQUFXLGFBQWE7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsiL1VzZXJzL2hhZGRhZGhhbm5hbnNyZy9Eb2N1bWVudHMvSm9iQXBwbGljYXRpb25UcmFja2VyL25vZGVfbW9kdWxlcy9pcy1hc3luYy1mdW5jdGlvbi9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBjYWxsQm91bmQgPSByZXF1aXJlKCdjYWxsLWJvdW5kJyk7XG52YXIgc2FmZVJlZ2V4VGVzdCA9IHJlcXVpcmUoJ3NhZmUtcmVnZXgtdGVzdCcpO1xuXG52YXIgdG9TdHIgPSBjYWxsQm91bmQoJ09iamVjdC5wcm90b3R5cGUudG9TdHJpbmcnKTtcbnZhciBmblRvU3RyID0gY2FsbEJvdW5kKCdGdW5jdGlvbi5wcm90b3R5cGUudG9TdHJpbmcnKTtcbnZhciBpc0ZuUmVnZXggPSBzYWZlUmVnZXhUZXN0KC9eXFxzKmFzeW5jKD86XFxzK2Z1bmN0aW9uKD86XFxzK3xcXCgpfFxccypcXCgpLyk7XG5cbnZhciBoYXNUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJ2hhcy10b3N0cmluZ3RhZy9zaGFtcycpKCk7XG52YXIgZ2V0UHJvdG8gPSByZXF1aXJlKCdnZXQtcHJvdG8nKTtcblxudmFyIGdldEFzeW5jRnVuYyA9IHJlcXVpcmUoJ2FzeW5jLWZ1bmN0aW9uJyk7XG5cbi8qKiBAdHlwZSB7aW1wb3J0KCcuJyl9ICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQXN5bmNGdW5jdGlvbihmbikge1xuXHRpZiAodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdGlmIChpc0ZuUmVnZXgoZm5Ub1N0cihmbikpKSB7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblx0aWYgKCFoYXNUb1N0cmluZ1RhZykge1xuXHRcdHZhciBzdHIgPSB0b1N0cihmbik7XG5cdFx0cmV0dXJuIHN0ciA9PT0gJ1tvYmplY3QgQXN5bmNGdW5jdGlvbl0nO1xuXHR9XG5cdGlmICghZ2V0UHJvdG8pIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0dmFyIGFzeW5jRnVuYyA9IGdldEFzeW5jRnVuYygpO1xuXHRyZXR1cm4gYXN5bmNGdW5jICYmIGFzeW5jRnVuYy5wcm90b3R5cGUgPT09IGdldFByb3RvKGZuKTtcbn07XG4iXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbMF0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/is-async-function/index.js\n");

/***/ })

};
;