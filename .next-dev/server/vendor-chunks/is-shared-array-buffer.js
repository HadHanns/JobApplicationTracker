"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/is-shared-array-buffer";
exports.ids = ["vendor-chunks/is-shared-array-buffer"];
exports.modules = {

/***/ "(ssr)/./node_modules/is-shared-array-buffer/index.js":
/*!******************************************************!*\
  !*** ./node_modules/is-shared-array-buffer/index.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\nvar callBound = __webpack_require__(/*! call-bound */ \"(ssr)/./node_modules/call-bound/index.js\");\n\n/** @type {undefined | ((thisArg: SharedArrayBuffer) => number)} */\nvar $byteLength = callBound('SharedArrayBuffer.prototype.byteLength', true);\n\n/** @type {import('.')} */\nmodule.exports = $byteLength\n\t? function isSharedArrayBuffer(obj) {\n\t\tif (!obj || typeof obj !== 'object') {\n\t\t\treturn false;\n\t\t}\n\t\ttry {\n\t\t\t// @ts-expect-error TS can't figure out this closed-over variable is non-nullable, and it's fine that `obj` might not be a SAB\n\t\t\t$byteLength(obj);\n\t\t\treturn true;\n\t\t} catch (e) {\n\t\t\treturn false;\n\t\t}\n\t}\n\t: function isSharedArrayBuffer(_obj) { // eslint-disable-line no-unused-vars\n\t\treturn false;\n\t};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvaXMtc2hhcmVkLWFycmF5LWJ1ZmZlci9pbmRleC5qcyIsIm1hcHBpbmdzIjoiQUFBYTs7QUFFYixnQkFBZ0IsbUJBQU8sQ0FBQyw0REFBWTs7QUFFcEMsV0FBVyxzREFBc0Q7QUFDakU7O0FBRUEsV0FBVyxhQUFhO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0M7QUFDeEM7QUFDQSIsInNvdXJjZXMiOlsiL1VzZXJzL2hhZGRhZGhhbm5hbnNyZy9Eb2N1bWVudHMvSm9iQXBwbGljYXRpb25UcmFja2VyL25vZGVfbW9kdWxlcy9pcy1zaGFyZWQtYXJyYXktYnVmZmVyL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIGNhbGxCb3VuZCA9IHJlcXVpcmUoJ2NhbGwtYm91bmQnKTtcblxuLyoqIEB0eXBlIHt1bmRlZmluZWQgfCAoKHRoaXNBcmc6IFNoYXJlZEFycmF5QnVmZmVyKSA9PiBudW1iZXIpfSAqL1xudmFyICRieXRlTGVuZ3RoID0gY2FsbEJvdW5kKCdTaGFyZWRBcnJheUJ1ZmZlci5wcm90b3R5cGUuYnl0ZUxlbmd0aCcsIHRydWUpO1xuXG4vKiogQHR5cGUge2ltcG9ydCgnLicpfSAqL1xubW9kdWxlLmV4cG9ydHMgPSAkYnl0ZUxlbmd0aFxuXHQ/IGZ1bmN0aW9uIGlzU2hhcmVkQXJyYXlCdWZmZXIob2JqKSB7XG5cdFx0aWYgKCFvYmogfHwgdHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdFx0dHJ5IHtcblx0XHRcdC8vIEB0cy1leHBlY3QtZXJyb3IgVFMgY2FuJ3QgZmlndXJlIG91dCB0aGlzIGNsb3NlZC1vdmVyIHZhcmlhYmxlIGlzIG5vbi1udWxsYWJsZSwgYW5kIGl0J3MgZmluZSB0aGF0IGBvYmpgIG1pZ2h0IG5vdCBiZSBhIFNBQlxuXHRcdFx0JGJ5dGVMZW5ndGgob2JqKTtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdH1cblx0OiBmdW5jdGlvbiBpc1NoYXJlZEFycmF5QnVmZmVyKF9vYmopIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuXHRcdHJldHVybiBmYWxzZTtcblx0fTtcbiJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOlswXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/is-shared-array-buffer/index.js\n");

/***/ })

};
;