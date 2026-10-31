"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/safe-regex-test";
exports.ids = ["vendor-chunks/safe-regex-test"];
exports.modules = {

/***/ "(ssr)/./node_modules/safe-regex-test/index.js":
/*!***********************************************!*\
  !*** ./node_modules/safe-regex-test/index.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\nvar callBound = __webpack_require__(/*! call-bound */ \"(ssr)/./node_modules/call-bound/index.js\");\nvar isRegex = __webpack_require__(/*! is-regex */ \"(ssr)/./node_modules/is-regex/index.js\");\n\nvar $exec = callBound('RegExp.prototype.exec');\nvar $TypeError = __webpack_require__(/*! es-errors/type */ \"(ssr)/./node_modules/es-errors/type.js\");\n\n/** @type {import('.')} */\nmodule.exports = function regexTester(regex) {\n\tif (!isRegex(regex)) {\n\t\tthrow new $TypeError('`regex` must be a RegExp');\n\t}\n\treturn function test(s) {\n\t\treturn $exec(regex, s) !== null;\n\t};\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvc2FmZS1yZWdleC10ZXN0L2luZGV4LmpzIiwibWFwcGluZ3MiOiJBQUFhOztBQUViLGdCQUFnQixtQkFBTyxDQUFDLDREQUFZO0FBQ3BDLGNBQWMsbUJBQU8sQ0FBQyx3REFBVTs7QUFFaEM7QUFDQSxpQkFBaUIsbUJBQU8sQ0FBQyw4REFBZ0I7O0FBRXpDLFdBQVcsYUFBYTtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyIvVXNlcnMvaGFkZGFkaGFubmFuc3JnL0RvY3VtZW50cy9Kb2JBcHBsaWNhdGlvblRyYWNrZXIvbm9kZV9tb2R1bGVzL3NhZmUtcmVnZXgtdGVzdC9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBjYWxsQm91bmQgPSByZXF1aXJlKCdjYWxsLWJvdW5kJyk7XG52YXIgaXNSZWdleCA9IHJlcXVpcmUoJ2lzLXJlZ2V4Jyk7XG5cbnZhciAkZXhlYyA9IGNhbGxCb3VuZCgnUmVnRXhwLnByb3RvdHlwZS5leGVjJyk7XG52YXIgJFR5cGVFcnJvciA9IHJlcXVpcmUoJ2VzLWVycm9ycy90eXBlJyk7XG5cbi8qKiBAdHlwZSB7aW1wb3J0KCcuJyl9ICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHJlZ2V4VGVzdGVyKHJlZ2V4KSB7XG5cdGlmICghaXNSZWdleChyZWdleCkpIHtcblx0XHR0aHJvdyBuZXcgJFR5cGVFcnJvcignYHJlZ2V4YCBtdXN0IGJlIGEgUmVnRXhwJyk7XG5cdH1cblx0cmV0dXJuIGZ1bmN0aW9uIHRlc3Qocykge1xuXHRcdHJldHVybiAkZXhlYyhyZWdleCwgcykgIT09IG51bGw7XG5cdH07XG59O1xuIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6WzBdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/safe-regex-test/index.js\n");

/***/ })

};
;