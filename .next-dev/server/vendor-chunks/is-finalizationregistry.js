"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/is-finalizationregistry";
exports.ids = ["vendor-chunks/is-finalizationregistry"];
exports.modules = {

/***/ "(ssr)/./node_modules/is-finalizationregistry/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/is-finalizationregistry/index.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\nvar callBound = __webpack_require__(/*! call-bound */ \"(ssr)/./node_modules/call-bound/index.js\");\n\n/** @type {undefined | ((value: ThisParameterType<typeof FinalizationRegistry.prototype.register>, ...args: Parameters<typeof FinalizationRegistry.prototype.register>) => ReturnType<typeof FinalizationRegistry.prototype.register>)} */\nvar $register = callBound('FinalizationRegistry.prototype.register', true);\n\n/** @type {import('.')} */\nmodule.exports = $register\n\t? function isFinalizationRegistry(value) {\n\t\tif (!value || typeof value !== 'object') {\n\t\t\treturn false;\n\t\t}\n\t\ttry {\n\t\t\t// @ts-expect-error TS can't figure out that it's always truthy here\n\t\t\t$register(value, {}, null);\n\t\t\treturn true;\n\t\t} catch (e) {\n\t\t\treturn false;\n\t\t}\n\t}\n\t// @ts-ignore unused var\n\t: function isFinalizationRegistry(value) { // eslint-disable-line no-unused-vars\n\t\treturn false;\n\t};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvaXMtZmluYWxpemF0aW9ucmVnaXN0cnkvaW5kZXguanMiLCJtYXBwaW5ncyI6IkFBQWE7O0FBRWIsZ0JBQWdCLG1CQUFPLENBQUMsNERBQVk7O0FBRXBDLFdBQVcsNk5BQTZOO0FBQ3hPOztBQUVBLFdBQVcsYUFBYTtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QztBQUM1QztBQUNBIiwic291cmNlcyI6WyIvVXNlcnMvaGFkZGFkaGFubmFuc3JnL0RvY3VtZW50cy9Kb2JBcHBsaWNhdGlvblRyYWNrZXIvbm9kZV9tb2R1bGVzL2lzLWZpbmFsaXphdGlvbnJlZ2lzdHJ5L2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIGNhbGxCb3VuZCA9IHJlcXVpcmUoJ2NhbGwtYm91bmQnKTtcblxuLyoqIEB0eXBlIHt1bmRlZmluZWQgfCAoKHZhbHVlOiBUaGlzUGFyYW1ldGVyVHlwZTx0eXBlb2YgRmluYWxpemF0aW9uUmVnaXN0cnkucHJvdG90eXBlLnJlZ2lzdGVyPiwgLi4uYXJnczogUGFyYW1ldGVyczx0eXBlb2YgRmluYWxpemF0aW9uUmVnaXN0cnkucHJvdG90eXBlLnJlZ2lzdGVyPikgPT4gUmV0dXJuVHlwZTx0eXBlb2YgRmluYWxpemF0aW9uUmVnaXN0cnkucHJvdG90eXBlLnJlZ2lzdGVyPil9ICovXG52YXIgJHJlZ2lzdGVyID0gY2FsbEJvdW5kKCdGaW5hbGl6YXRpb25SZWdpc3RyeS5wcm90b3R5cGUucmVnaXN0ZXInLCB0cnVlKTtcblxuLyoqIEB0eXBlIHtpbXBvcnQoJy4nKX0gKi9cbm1vZHVsZS5leHBvcnRzID0gJHJlZ2lzdGVyXG5cdD8gZnVuY3Rpb24gaXNGaW5hbGl6YXRpb25SZWdpc3RyeSh2YWx1ZSkge1xuXHRcdGlmICghdmFsdWUgfHwgdHlwZW9mIHZhbHVlICE9PSAnb2JqZWN0Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0XHR0cnkge1xuXHRcdFx0Ly8gQHRzLWV4cGVjdC1lcnJvciBUUyBjYW4ndCBmaWd1cmUgb3V0IHRoYXQgaXQncyBhbHdheXMgdHJ1dGh5IGhlcmVcblx0XHRcdCRyZWdpc3Rlcih2YWx1ZSwge30sIG51bGwpO1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0fVxuXHQvLyBAdHMtaWdub3JlIHVudXNlZCB2YXJcblx0OiBmdW5jdGlvbiBpc0ZpbmFsaXphdGlvblJlZ2lzdHJ5KHZhbHVlKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH07XG4iXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbMF0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/is-finalizationregistry/index.js\n");

/***/ })

};
;