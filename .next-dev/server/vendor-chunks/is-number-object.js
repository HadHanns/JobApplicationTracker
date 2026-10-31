"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/is-number-object";
exports.ids = ["vendor-chunks/is-number-object"];
exports.modules = {

/***/ "(ssr)/./node_modules/is-number-object/index.js":
/*!************************************************!*\
  !*** ./node_modules/is-number-object/index.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\nvar callBound = __webpack_require__(/*! call-bound */ \"(ssr)/./node_modules/call-bound/index.js\");\n\nvar $numToStr = callBound('Number.prototype.toString');\n\n/** @type {import('.')} */\nvar tryNumberObject = function tryNumberObject(value) {\n\ttry {\n\t\t$numToStr(value);\n\t\treturn true;\n\t} catch (e) {\n\t\treturn false;\n\t}\n};\nvar $toString = callBound('Object.prototype.toString');\nvar numClass = '[object Number]';\nvar hasToStringTag = __webpack_require__(/*! has-tostringtag/shams */ \"(ssr)/./node_modules/has-tostringtag/shams.js\")();\n\n/** @type {import('.')} */\nmodule.exports = function isNumberObject(value) {\n\tif (typeof value === 'number') {\n\t\treturn true;\n\t}\n\tif (!value || typeof value !== 'object') {\n\t\treturn false;\n\t}\n\treturn hasToStringTag ? tryNumberObject(value) : $toString(value) === numClass;\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvaXMtbnVtYmVyLW9iamVjdC9pbmRleC5qcyIsIm1hcHBpbmdzIjoiQUFBYTs7QUFFYixnQkFBZ0IsbUJBQU8sQ0FBQyw0REFBWTs7QUFFcEM7O0FBRUEsV0FBVyxhQUFhO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsbUJBQU8sQ0FBQyw0RUFBdUI7O0FBRXBELFdBQVcsYUFBYTtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIi9Vc2Vycy9oYWRkYWRoYW5uYW5zcmcvRG9jdW1lbnRzL0pvYkFwcGxpY2F0aW9uVHJhY2tlci9ub2RlX21vZHVsZXMvaXMtbnVtYmVyLW9iamVjdC9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBjYWxsQm91bmQgPSByZXF1aXJlKCdjYWxsLWJvdW5kJyk7XG5cbnZhciAkbnVtVG9TdHIgPSBjYWxsQm91bmQoJ051bWJlci5wcm90b3R5cGUudG9TdHJpbmcnKTtcblxuLyoqIEB0eXBlIHtpbXBvcnQoJy4nKX0gKi9cbnZhciB0cnlOdW1iZXJPYmplY3QgPSBmdW5jdGlvbiB0cnlOdW1iZXJPYmplY3QodmFsdWUpIHtcblx0dHJ5IHtcblx0XHQkbnVtVG9TdHIodmFsdWUpO1xuXHRcdHJldHVybiB0cnVlO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG59O1xudmFyICR0b1N0cmluZyA9IGNhbGxCb3VuZCgnT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZycpO1xudmFyIG51bUNsYXNzID0gJ1tvYmplY3QgTnVtYmVyXSc7XG52YXIgaGFzVG9TdHJpbmdUYWcgPSByZXF1aXJlKCdoYXMtdG9zdHJpbmd0YWcvc2hhbXMnKSgpO1xuXG4vKiogQHR5cGUge2ltcG9ydCgnLicpfSAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc051bWJlck9iamVjdCh2YWx1ZSkge1xuXHRpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cdGlmICghdmFsdWUgfHwgdHlwZW9mIHZhbHVlICE9PSAnb2JqZWN0Jykge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRyZXR1cm4gaGFzVG9TdHJpbmdUYWcgPyB0cnlOdW1iZXJPYmplY3QodmFsdWUpIDogJHRvU3RyaW5nKHZhbHVlKSA9PT0gbnVtQ2xhc3M7XG59O1xuIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6WzBdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/is-number-object/index.js\n");

/***/ })

};
;