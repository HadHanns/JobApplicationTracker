"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/is-generator-function";
exports.ids = ["vendor-chunks/is-generator-function"];
exports.modules = {

/***/ "(ssr)/./node_modules/is-generator-function/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/is-generator-function/index.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\nvar callBound = __webpack_require__(/*! call-bound */ \"(ssr)/./node_modules/call-bound/index.js\");\nvar safeRegexTest = __webpack_require__(/*! safe-regex-test */ \"(ssr)/./node_modules/safe-regex-test/index.js\");\nvar isFnRegex = safeRegexTest(/^\\s*(?:function)?\\*/);\nvar hasToStringTag = __webpack_require__(/*! has-tostringtag/shams */ \"(ssr)/./node_modules/has-tostringtag/shams.js\")();\nvar getProto = __webpack_require__(/*! get-proto */ \"(ssr)/./node_modules/get-proto/index.js\");\n\nvar toStr = callBound('Object.prototype.toString');\nvar fnToStr = callBound('Function.prototype.toString');\n\nvar getGeneratorFunction = __webpack_require__(/*! generator-function */ \"(ssr)/./node_modules/generator-function/index.js\");\n\n/** @type {import('.')} */\nmodule.exports = function isGeneratorFunction(fn) {\n\tif (typeof fn !== 'function') {\n\t\treturn false;\n\t}\n\tif (isFnRegex(fnToStr(fn))) {\n\t\treturn true;\n\t}\n\tif (!hasToStringTag) {\n\t\tvar str = toStr(fn);\n\t\treturn str === '[object GeneratorFunction]';\n\t}\n\tif (!getProto) {\n\t\treturn false;\n\t}\n\tvar GeneratorFunction = getGeneratorFunction();\n\treturn GeneratorFunction && getProto(fn) === GeneratorFunction.prototype;\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvaXMtZ2VuZXJhdG9yLWZ1bmN0aW9uL2luZGV4LmpzIiwibWFwcGluZ3MiOiJBQUFhOztBQUViLGdCQUFnQixtQkFBTyxDQUFDLDREQUFZO0FBQ3BDLG9CQUFvQixtQkFBTyxDQUFDLHNFQUFpQjtBQUM3QztBQUNBLHFCQUFxQixtQkFBTyxDQUFDLDRFQUF1QjtBQUNwRCxlQUFlLG1CQUFPLENBQUMsMERBQVc7O0FBRWxDO0FBQ0E7O0FBRUEsMkJBQTJCLG1CQUFPLENBQUMsNEVBQW9COztBQUV2RCxXQUFXLGFBQWE7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsiL1VzZXJzL2hhZGRhZGhhbm5hbnNyZy9Eb2N1bWVudHMvSm9iQXBwbGljYXRpb25UcmFja2VyL25vZGVfbW9kdWxlcy9pcy1nZW5lcmF0b3ItZnVuY3Rpb24vaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY2FsbEJvdW5kID0gcmVxdWlyZSgnY2FsbC1ib3VuZCcpO1xudmFyIHNhZmVSZWdleFRlc3QgPSByZXF1aXJlKCdzYWZlLXJlZ2V4LXRlc3QnKTtcbnZhciBpc0ZuUmVnZXggPSBzYWZlUmVnZXhUZXN0KC9eXFxzKig/OmZ1bmN0aW9uKT9cXCovKTtcbnZhciBoYXNUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJ2hhcy10b3N0cmluZ3RhZy9zaGFtcycpKCk7XG52YXIgZ2V0UHJvdG8gPSByZXF1aXJlKCdnZXQtcHJvdG8nKTtcblxudmFyIHRvU3RyID0gY2FsbEJvdW5kKCdPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nJyk7XG52YXIgZm5Ub1N0ciA9IGNhbGxCb3VuZCgnRnVuY3Rpb24ucHJvdG90eXBlLnRvU3RyaW5nJyk7XG5cbnZhciBnZXRHZW5lcmF0b3JGdW5jdGlvbiA9IHJlcXVpcmUoJ2dlbmVyYXRvci1mdW5jdGlvbicpO1xuXG4vKiogQHR5cGUge2ltcG9ydCgnLicpfSAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0dlbmVyYXRvckZ1bmN0aW9uKGZuKSB7XG5cdGlmICh0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0aWYgKGlzRm5SZWdleChmblRvU3RyKGZuKSkpIHtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXHRpZiAoIWhhc1RvU3RyaW5nVGFnKSB7XG5cdFx0dmFyIHN0ciA9IHRvU3RyKGZuKTtcblx0XHRyZXR1cm4gc3RyID09PSAnW29iamVjdCBHZW5lcmF0b3JGdW5jdGlvbl0nO1xuXHR9XG5cdGlmICghZ2V0UHJvdG8pIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0dmFyIEdlbmVyYXRvckZ1bmN0aW9uID0gZ2V0R2VuZXJhdG9yRnVuY3Rpb24oKTtcblx0cmV0dXJuIEdlbmVyYXRvckZ1bmN0aW9uICYmIGdldFByb3RvKGZuKSA9PT0gR2VuZXJhdG9yRnVuY3Rpb24ucHJvdG90eXBlO1xufTtcbiJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOlswXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/is-generator-function/index.js\n");

/***/ })

};
;