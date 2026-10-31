"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/is-boolean-object";
exports.ids = ["vendor-chunks/is-boolean-object"];
exports.modules = {

/***/ "(ssr)/./node_modules/is-boolean-object/index.js":
/*!*************************************************!*\
  !*** ./node_modules/is-boolean-object/index.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\nvar callBound = __webpack_require__(/*! call-bound */ \"(ssr)/./node_modules/call-bound/index.js\");\nvar $boolToStr = callBound('Boolean.prototype.toString');\nvar $toString = callBound('Object.prototype.toString');\n\n/** @type {import('.')} */\nvar tryBooleanObject = function booleanBrandCheck(value) {\n\ttry {\n\t\t$boolToStr(value);\n\t\treturn true;\n\t} catch (e) {\n\t\treturn false;\n\t}\n};\nvar boolClass = '[object Boolean]';\nvar hasToStringTag = __webpack_require__(/*! has-tostringtag/shams */ \"(ssr)/./node_modules/has-tostringtag/shams.js\")();\n\n/** @type {import('.')} */\nmodule.exports = function isBoolean(value) {\n\tif (typeof value === 'boolean') {\n\t\treturn true;\n\t}\n\tif (value === null || typeof value !== 'object') {\n\t\treturn false;\n\t}\n\treturn hasToStringTag ? tryBooleanObject(value) : $toString(value) === boolClass;\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvaXMtYm9vbGVhbi1vYmplY3QvaW5kZXguanMiLCJtYXBwaW5ncyI6IkFBQWE7O0FBRWIsZ0JBQWdCLG1CQUFPLENBQUMsNERBQVk7QUFDcEM7QUFDQTs7QUFFQSxXQUFXLGFBQWE7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsbUJBQU8sQ0FBQyw0RUFBdUI7O0FBRXBELFdBQVcsYUFBYTtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIi9Vc2Vycy9oYWRkYWRoYW5uYW5zcmcvRG9jdW1lbnRzL0pvYkFwcGxpY2F0aW9uVHJhY2tlci9ub2RlX21vZHVsZXMvaXMtYm9vbGVhbi1vYmplY3QvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY2FsbEJvdW5kID0gcmVxdWlyZSgnY2FsbC1ib3VuZCcpO1xudmFyICRib29sVG9TdHIgPSBjYWxsQm91bmQoJ0Jvb2xlYW4ucHJvdG90eXBlLnRvU3RyaW5nJyk7XG52YXIgJHRvU3RyaW5nID0gY2FsbEJvdW5kKCdPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nJyk7XG5cbi8qKiBAdHlwZSB7aW1wb3J0KCcuJyl9ICovXG52YXIgdHJ5Qm9vbGVhbk9iamVjdCA9IGZ1bmN0aW9uIGJvb2xlYW5CcmFuZENoZWNrKHZhbHVlKSB7XG5cdHRyeSB7XG5cdFx0JGJvb2xUb1N0cih2YWx1ZSk7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cbn07XG52YXIgYm9vbENsYXNzID0gJ1tvYmplY3QgQm9vbGVhbl0nO1xudmFyIGhhc1RvU3RyaW5nVGFnID0gcmVxdWlyZSgnaGFzLXRvc3RyaW5ndGFnL3NoYW1zJykoKTtcblxuLyoqIEB0eXBlIHtpbXBvcnQoJy4nKX0gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNCb29sZWFuKHZhbHVlKSB7XG5cdGlmICh0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJykge1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cdGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB0eXBlb2YgdmFsdWUgIT09ICdvYmplY3QnKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdHJldHVybiBoYXNUb1N0cmluZ1RhZyA/IHRyeUJvb2xlYW5PYmplY3QodmFsdWUpIDogJHRvU3RyaW5nKHZhbHVlKSA9PT0gYm9vbENsYXNzO1xufTtcbiJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOlswXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/is-boolean-object/index.js\n");

/***/ })

};
;