"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/is-map";
exports.ids = ["vendor-chunks/is-map"];
exports.modules = {

/***/ "(ssr)/./node_modules/is-map/index.js":
/*!**************************************!*\
  !*** ./node_modules/is-map/index.js ***!
  \**************************************/
/***/ ((module) => {

eval("\n\n/** @const */\nvar $Map = typeof Map === 'function' && Map.prototype ? Map : null;\nvar $Set = typeof Set === 'function' && Set.prototype ? Set : null;\n\nvar exported;\n\nif (!$Map) {\n\t/** @type {import('.')} */\n\t// eslint-disable-next-line no-unused-vars\n\texported = function isMap(x) {\n\t\t// `Map` is not present in this environment.\n\t\treturn false;\n\t};\n}\n\nvar $mapHas = $Map ? Map.prototype.has : null;\nvar $setHas = $Set ? Set.prototype.has : null;\nif (!exported && !$mapHas) {\n\t/** @type {import('.')} */\n\t// eslint-disable-next-line no-unused-vars\n\texported = function isMap(x) {\n\t\t// `Map` does not have a `has` method\n\t\treturn false;\n\t};\n}\n\n/** @type {import('.')} */\nmodule.exports = exported || function isMap(x) {\n\tif (!x || typeof x !== 'object') {\n\t\treturn false;\n\t}\n\ttry {\n\t\t$mapHas.call(x);\n\t\tif ($setHas) {\n\t\t\ttry {\n\t\t\t\t$setHas.call(x);\n\t\t\t} catch (e) {\n\t\t\t\treturn true;\n\t\t\t}\n\t\t}\n\t\t// @ts-expect-error TS can't figure out that $Map is always truthy here\n\t\treturn x instanceof $Map; // core-js workaround, pre-v2.5.0\n\t} catch (e) {}\n\treturn false;\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvaXMtbWFwL2luZGV4LmpzIiwibWFwcGluZ3MiOiJBQUFhOztBQUViO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLFlBQVksYUFBYTtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBWSxhQUFhO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxXQUFXLGFBQWE7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCO0FBQzVCLEdBQUc7QUFDSDtBQUNBIiwic291cmNlcyI6WyIvVXNlcnMvaGFkZGFkaGFubmFuc3JnL0RvY3VtZW50cy9Kb2JBcHBsaWNhdGlvblRyYWNrZXIvbm9kZV9tb2R1bGVzL2lzLW1hcC9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbi8qKiBAY29uc3QgKi9cbnZhciAkTWFwID0gdHlwZW9mIE1hcCA9PT0gJ2Z1bmN0aW9uJyAmJiBNYXAucHJvdG90eXBlID8gTWFwIDogbnVsbDtcbnZhciAkU2V0ID0gdHlwZW9mIFNldCA9PT0gJ2Z1bmN0aW9uJyAmJiBTZXQucHJvdG90eXBlID8gU2V0IDogbnVsbDtcblxudmFyIGV4cG9ydGVkO1xuXG5pZiAoISRNYXApIHtcblx0LyoqIEB0eXBlIHtpbXBvcnQoJy4nKX0gKi9cblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG5cdGV4cG9ydGVkID0gZnVuY3Rpb24gaXNNYXAoeCkge1xuXHRcdC8vIGBNYXBgIGlzIG5vdCBwcmVzZW50IGluIHRoaXMgZW52aXJvbm1lbnQuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9O1xufVxuXG52YXIgJG1hcEhhcyA9ICRNYXAgPyBNYXAucHJvdG90eXBlLmhhcyA6IG51bGw7XG52YXIgJHNldEhhcyA9ICRTZXQgPyBTZXQucHJvdG90eXBlLmhhcyA6IG51bGw7XG5pZiAoIWV4cG9ydGVkICYmICEkbWFwSGFzKSB7XG5cdC8qKiBAdHlwZSB7aW1wb3J0KCcuJyl9ICovXG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuXHRleHBvcnRlZCA9IGZ1bmN0aW9uIGlzTWFwKHgpIHtcblx0XHQvLyBgTWFwYCBkb2VzIG5vdCBoYXZlIGEgYGhhc2AgbWV0aG9kXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9O1xufVxuXG4vKiogQHR5cGUge2ltcG9ydCgnLicpfSAqL1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRlZCB8fCBmdW5jdGlvbiBpc01hcCh4KSB7XG5cdGlmICgheCB8fCB0eXBlb2YgeCAhPT0gJ29iamVjdCcpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0dHJ5IHtcblx0XHQkbWFwSGFzLmNhbGwoeCk7XG5cdFx0aWYgKCRzZXRIYXMpIHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdCRzZXRIYXMuY2FsbCh4KTtcblx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdC8vIEB0cy1leHBlY3QtZXJyb3IgVFMgY2FuJ3QgZmlndXJlIG91dCB0aGF0ICRNYXAgaXMgYWx3YXlzIHRydXRoeSBoZXJlXG5cdFx0cmV0dXJuIHggaW5zdGFuY2VvZiAkTWFwOyAvLyBjb3JlLWpzIHdvcmthcm91bmQsIHByZS12Mi41LjBcblx0fSBjYXRjaCAoZSkge31cblx0cmV0dXJuIGZhbHNlO1xufTtcbiJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOlswXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/is-map/index.js\n");

/***/ })

};
;