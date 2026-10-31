"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/is-weakref";
exports.ids = ["vendor-chunks/is-weakref"];
exports.modules = {

/***/ "(ssr)/./node_modules/is-weakref/index.js":
/*!******************************************!*\
  !*** ./node_modules/is-weakref/index.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\nvar callBound = __webpack_require__(/*! call-bound */ \"(ssr)/./node_modules/call-bound/index.js\");\n\n// eslint-disable-next-line no-extra-parens\nvar $deref = /** @type {<T extends WeakKey>(thisArg: WeakRef<T>) => T | undefined} */ (callBound('WeakRef.prototype.deref', true));\n\n/** @type {import('.')} */\nmodule.exports = typeof WeakRef === 'undefined'\n\t? function isWeakRef(_value) { // eslint-disable-line no-unused-vars\n\t\treturn false;\n\t}\n\t: function isWeakRef(value) {\n\t\tif (!value || typeof value !== 'object') {\n\t\t\treturn false;\n\t\t}\n\t\ttry {\n\t\t\t// @ts-expect-error\n\t\t\t$deref(value);\n\t\t\treturn true;\n\t\t} catch (e) {\n\t\t\treturn false;\n\t\t}\n\t};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvaXMtd2Vha3JlZi9pbmRleC5qcyIsIm1hcHBpbmdzIjoiQUFBYTs7QUFFYixnQkFBZ0IsbUJBQU8sQ0FBQyw0REFBWTs7QUFFcEM7QUFDQSx3QkFBd0IsMkRBQTJEOztBQUVuRixXQUFXLGFBQWE7QUFDeEI7QUFDQSxnQ0FBZ0M7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBIiwic291cmNlcyI6WyIvVXNlcnMvaGFkZGFkaGFubmFuc3JnL0RvY3VtZW50cy9Kb2JBcHBsaWNhdGlvblRyYWNrZXIvbm9kZV9tb2R1bGVzL2lzLXdlYWtyZWYvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY2FsbEJvdW5kID0gcmVxdWlyZSgnY2FsbC1ib3VuZCcpO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tZXh0cmEtcGFyZW5zXG52YXIgJGRlcmVmID0gLyoqIEB0eXBlIHs8VCBleHRlbmRzIFdlYWtLZXk+KHRoaXNBcmc6IFdlYWtSZWY8VD4pID0+IFQgfCB1bmRlZmluZWR9ICovIChjYWxsQm91bmQoJ1dlYWtSZWYucHJvdG90eXBlLmRlcmVmJywgdHJ1ZSkpO1xuXG4vKiogQHR5cGUge2ltcG9ydCgnLicpfSAqL1xubW9kdWxlLmV4cG9ydHMgPSB0eXBlb2YgV2Vha1JlZiA9PT0gJ3VuZGVmaW5lZCdcblx0PyBmdW5jdGlvbiBpc1dlYWtSZWYoX3ZhbHVlKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0OiBmdW5jdGlvbiBpc1dlYWtSZWYodmFsdWUpIHtcblx0XHRpZiAoIXZhbHVlIHx8IHR5cGVvZiB2YWx1ZSAhPT0gJ29iamVjdCcpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdFx0dHJ5IHtcblx0XHRcdC8vIEB0cy1leHBlY3QtZXJyb3Jcblx0XHRcdCRkZXJlZih2YWx1ZSk7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHR9O1xuIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6WzBdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/is-weakref/index.js\n");

/***/ })

};
;