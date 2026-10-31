"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/has-bigints";
exports.ids = ["vendor-chunks/has-bigints"];
exports.modules = {

/***/ "(ssr)/./node_modules/has-bigints/index.js":
/*!*******************************************!*\
  !*** ./node_modules/has-bigints/index.js ***!
  \*******************************************/
/***/ ((module) => {

eval("\n\nvar $BigInt = typeof BigInt !== 'undefined' && BigInt;\n\n/** @type {import('.')} */\nmodule.exports = function hasNativeBigInts() {\n\treturn typeof $BigInt === 'function'\n\t\t&& typeof BigInt === 'function'\n\t\t&& typeof $BigInt(42) === 'bigint' // eslint-disable-line no-magic-numbers\n\t\t&& typeof BigInt(42) === 'bigint'; // eslint-disable-line no-magic-numbers\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvaGFzLWJpZ2ludHMvaW5kZXguanMiLCJtYXBwaW5ncyI6IkFBQWE7O0FBRWI7O0FBRUEsV0FBVyxhQUFhO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDO0FBQ3JDIiwic291cmNlcyI6WyIvVXNlcnMvaGFkZGFkaGFubmFuc3JnL0RvY3VtZW50cy9Kb2JBcHBsaWNhdGlvblRyYWNrZXIvbm9kZV9tb2R1bGVzL2hhcy1iaWdpbnRzL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyICRCaWdJbnQgPSB0eXBlb2YgQmlnSW50ICE9PSAndW5kZWZpbmVkJyAmJiBCaWdJbnQ7XG5cbi8qKiBAdHlwZSB7aW1wb3J0KCcuJyl9ICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGhhc05hdGl2ZUJpZ0ludHMoKSB7XG5cdHJldHVybiB0eXBlb2YgJEJpZ0ludCA9PT0gJ2Z1bmN0aW9uJ1xuXHRcdCYmIHR5cGVvZiBCaWdJbnQgPT09ICdmdW5jdGlvbidcblx0XHQmJiB0eXBlb2YgJEJpZ0ludCg0MikgPT09ICdiaWdpbnQnIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbWFnaWMtbnVtYmVyc1xuXHRcdCYmIHR5cGVvZiBCaWdJbnQoNDIpID09PSAnYmlnaW50JzsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1tYWdpYy1udW1iZXJzXG59O1xuIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6WzBdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/has-bigints/index.js\n");

/***/ })

};
;