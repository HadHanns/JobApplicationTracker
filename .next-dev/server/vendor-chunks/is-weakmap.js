"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/is-weakmap";
exports.ids = ["vendor-chunks/is-weakmap"];
exports.modules = {

/***/ "(ssr)/./node_modules/is-weakmap/index.js":
/*!******************************************!*\
  !*** ./node_modules/is-weakmap/index.js ***!
  \******************************************/
/***/ ((module) => {

eval("\n\nvar $WeakMap = typeof WeakMap === 'function' && WeakMap.prototype ? WeakMap : null;\nvar $WeakSet = typeof WeakSet === 'function' && WeakSet.prototype ? WeakSet : null;\n\nvar exported;\n\nif (!$WeakMap) {\n\t/** @type {import('.')} */\n\t// eslint-disable-next-line no-unused-vars\n\texported = function isWeakMap(x) {\n\t\t// `WeakMap` is not present in this environment.\n\t\treturn false;\n\t};\n}\n\nvar $mapHas = $WeakMap ? $WeakMap.prototype.has : null;\nvar $setHas = $WeakSet ? $WeakSet.prototype.has : null;\nif (!exported && !$mapHas) {\n\t/** @type {import('.')} */\n\t// eslint-disable-next-line no-unused-vars\n\texported = function isWeakMap(x) {\n\t\t// `WeakMap` does not have a `has` method\n\t\treturn false;\n\t};\n}\n\n/** @type {import('.')} */\nmodule.exports = exported || function isWeakMap(x) {\n\tif (!x || typeof x !== 'object') {\n\t\treturn false;\n\t}\n\ttry {\n\t\t$mapHas.call(x, $mapHas);\n\t\tif ($setHas) {\n\t\t\ttry {\n\t\t\t\t$setHas.call(x, $setHas);\n\t\t\t} catch (e) {\n\t\t\t\treturn true;\n\t\t\t}\n\t\t}\n\t\t// @ts-expect-error TS can't figure out that $WeakMap is always truthy here\n\t\treturn x instanceof $WeakMap; // core-js workaround, pre-v3\n\t} catch (e) {}\n\treturn false;\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvaXMtd2Vha21hcC9pbmRleC5qcyIsIm1hcHBpbmdzIjoiQUFBYTs7QUFFYjtBQUNBOztBQUVBOztBQUVBO0FBQ0EsWUFBWSxhQUFhO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLGFBQWE7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFdBQVcsYUFBYTtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0M7QUFDaEMsR0FBRztBQUNIO0FBQ0EiLCJzb3VyY2VzIjpbIi9Vc2Vycy9oYWRkYWRoYW5uYW5zcmcvRG9jdW1lbnRzL0pvYkFwcGxpY2F0aW9uVHJhY2tlci9ub2RlX21vZHVsZXMvaXMtd2Vha21hcC9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciAkV2Vha01hcCA9IHR5cGVvZiBXZWFrTWFwID09PSAnZnVuY3Rpb24nICYmIFdlYWtNYXAucHJvdG90eXBlID8gV2Vha01hcCA6IG51bGw7XG52YXIgJFdlYWtTZXQgPSB0eXBlb2YgV2Vha1NldCA9PT0gJ2Z1bmN0aW9uJyAmJiBXZWFrU2V0LnByb3RvdHlwZSA/IFdlYWtTZXQgOiBudWxsO1xuXG52YXIgZXhwb3J0ZWQ7XG5cbmlmICghJFdlYWtNYXApIHtcblx0LyoqIEB0eXBlIHtpbXBvcnQoJy4nKX0gKi9cblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG5cdGV4cG9ydGVkID0gZnVuY3Rpb24gaXNXZWFrTWFwKHgpIHtcblx0XHQvLyBgV2Vha01hcGAgaXMgbm90IHByZXNlbnQgaW4gdGhpcyBlbnZpcm9ubWVudC5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH07XG59XG5cbnZhciAkbWFwSGFzID0gJFdlYWtNYXAgPyAkV2Vha01hcC5wcm90b3R5cGUuaGFzIDogbnVsbDtcbnZhciAkc2V0SGFzID0gJFdlYWtTZXQgPyAkV2Vha1NldC5wcm90b3R5cGUuaGFzIDogbnVsbDtcbmlmICghZXhwb3J0ZWQgJiYgISRtYXBIYXMpIHtcblx0LyoqIEB0eXBlIHtpbXBvcnQoJy4nKX0gKi9cblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG5cdGV4cG9ydGVkID0gZnVuY3Rpb24gaXNXZWFrTWFwKHgpIHtcblx0XHQvLyBgV2Vha01hcGAgZG9lcyBub3QgaGF2ZSBhIGBoYXNgIG1ldGhvZFxuXHRcdHJldHVybiBmYWxzZTtcblx0fTtcbn1cblxuLyoqIEB0eXBlIHtpbXBvcnQoJy4nKX0gKi9cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0ZWQgfHwgZnVuY3Rpb24gaXNXZWFrTWFwKHgpIHtcblx0aWYgKCF4IHx8IHR5cGVvZiB4ICE9PSAnb2JqZWN0Jykge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHR0cnkge1xuXHRcdCRtYXBIYXMuY2FsbCh4LCAkbWFwSGFzKTtcblx0XHRpZiAoJHNldEhhcykge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0JHNldEhhcy5jYWxsKHgsICRzZXRIYXMpO1xuXHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHR9XG5cdFx0Ly8gQHRzLWV4cGVjdC1lcnJvciBUUyBjYW4ndCBmaWd1cmUgb3V0IHRoYXQgJFdlYWtNYXAgaXMgYWx3YXlzIHRydXRoeSBoZXJlXG5cdFx0cmV0dXJuIHggaW5zdGFuY2VvZiAkV2Vha01hcDsgLy8gY29yZS1qcyB3b3JrYXJvdW5kLCBwcmUtdjNcblx0fSBjYXRjaCAoZSkge31cblx0cmV0dXJuIGZhbHNlO1xufTtcbiJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOlswXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/is-weakmap/index.js\n");

/***/ })

};
;