"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/is-bigint";
exports.ids = ["vendor-chunks/is-bigint"];
exports.modules = {

/***/ "(ssr)/./node_modules/is-bigint/index.js":
/*!*****************************************!*\
  !*** ./node_modules/is-bigint/index.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\nvar hasBigInts = __webpack_require__(/*! has-bigints */ \"(ssr)/./node_modules/has-bigints/index.js\")();\n\nif (hasBigInts) {\n\tvar bigIntValueOf = BigInt.prototype.valueOf;\n\t/** @type {(value: object) => value is BigInt} */\n\tvar tryBigInt = function tryBigIntObject(value) {\n\t\ttry {\n\t\t\tbigIntValueOf.call(value);\n\t\t\treturn true;\n\t\t} catch (e) {\n\t\t}\n\t\treturn false;\n\t};\n\n\t/** @type {import('.')} */\n\tmodule.exports = function isBigInt(value) {\n\t\tif (\n\t\t\tvalue === null\n\t\t\t|| typeof value === 'undefined'\n\t\t\t|| typeof value === 'boolean'\n\t\t\t|| typeof value === 'string'\n\t\t\t|| typeof value === 'number'\n\t\t\t|| typeof value === 'symbol'\n\t\t\t|| typeof value === 'function'\n\t\t) {\n\t\t\treturn false;\n\t\t}\n\t\tif (typeof value === 'bigint') {\n\t\t\treturn true;\n\t\t}\n\n\t\treturn tryBigInt(value);\n\t};\n} else {\n\t/** @type {import('.')} */\n\tmodule.exports = function isBigInt(value) {\n\t\treturn  false && 0;\n\t};\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvaXMtYmlnaW50L2luZGV4LmpzIiwibWFwcGluZ3MiOiJBQUFhOztBQUViLGlCQUFpQixtQkFBTyxDQUFDLDhEQUFhOztBQUV0QztBQUNBO0FBQ0EsWUFBWSxvQ0FBb0M7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBLFlBQVksYUFBYTtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRixZQUFZLGFBQWE7QUFDekI7QUFDQSxTQUFTLE1BQUssSUFBSSxDQUFLO0FBQ3ZCO0FBQ0EiLCJzb3VyY2VzIjpbIi9Vc2Vycy9oYWRkYWRoYW5uYW5zcmcvRG9jdW1lbnRzL0pvYkFwcGxpY2F0aW9uVHJhY2tlci9ub2RlX21vZHVsZXMvaXMtYmlnaW50L2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIGhhc0JpZ0ludHMgPSByZXF1aXJlKCdoYXMtYmlnaW50cycpKCk7XG5cbmlmIChoYXNCaWdJbnRzKSB7XG5cdHZhciBiaWdJbnRWYWx1ZU9mID0gQmlnSW50LnByb3RvdHlwZS52YWx1ZU9mO1xuXHQvKiogQHR5cGUgeyh2YWx1ZTogb2JqZWN0KSA9PiB2YWx1ZSBpcyBCaWdJbnR9ICovXG5cdHZhciB0cnlCaWdJbnQgPSBmdW5jdGlvbiB0cnlCaWdJbnRPYmplY3QodmFsdWUpIHtcblx0XHR0cnkge1xuXHRcdFx0YmlnSW50VmFsdWVPZi5jYWxsKHZhbHVlKTtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH0gY2F0Y2ggKGUpIHtcblx0XHR9XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9O1xuXG5cdC8qKiBAdHlwZSB7aW1wb3J0KCcuJyl9ICovXG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNCaWdJbnQodmFsdWUpIHtcblx0XHRpZiAoXG5cdFx0XHR2YWx1ZSA9PT0gbnVsbFxuXHRcdFx0fHwgdHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJ1xuXHRcdFx0fHwgdHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbidcblx0XHRcdHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZydcblx0XHRcdHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcidcblx0XHRcdHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ3N5bWJvbCdcblx0XHRcdHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJ1xuXHRcdCkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnYmlnaW50Jykge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRyeUJpZ0ludCh2YWx1ZSk7XG5cdH07XG59IGVsc2Uge1xuXHQvKiogQHR5cGUge2ltcG9ydCgnLicpfSAqL1xuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQmlnSW50KHZhbHVlKSB7XG5cdFx0cmV0dXJuIGZhbHNlICYmIHZhbHVlO1xuXHR9O1xufVxuIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6WzBdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/is-bigint/index.js\n");

/***/ })

};
;