/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/lucide-react/dist/esm/createLucideIcon.js":
/*!****************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/createLucideIcon.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createLucideIcon),
/* harmony export */   toKebabCase: () => (/* binding */ toKebabCase)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _defaultAttributes_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./defaultAttributes.js */ "./node_modules/lucide-react/dist/esm/defaultAttributes.js");
/**
 * lucide-react v0.292.0 - ISC
 */




const toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const createLucideIcon = (iconName, iconNode) => {
  const Component = (0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(
    ({ color = "currentColor", size = 24, strokeWidth = 2, absoluteStrokeWidth, children, ...rest }, ref) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(
      "svg",
      {
        ref,
        ..._defaultAttributes_js__WEBPACK_IMPORTED_MODULE_1__["default"],
        width: size,
        height: size,
        stroke: color,
        strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
        className: `lucide lucide-${toKebabCase(iconName)}`,
        ...rest
      },
      [
        ...iconNode.map(([tag, attrs]) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(tag, attrs)),
        ...(Array.isArray(children) ? children : [children]) || []
      ]
    )
  );
  Component.displayName = `${iconName}`;
  return Component;
};


//# sourceMappingURL=createLucideIcon.js.map


/***/ }),

/***/ "./node_modules/lucide-react/dist/esm/defaultAttributes.js":
/*!*****************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/defaultAttributes.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ defaultAttributes)
/* harmony export */ });
/**
 * lucide-react v0.292.0 - ISC
 */

var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};


//# sourceMappingURL=defaultAttributes.js.map


/***/ }),

/***/ "./node_modules/lucide-react/dist/esm/icons/alert-circle.js":
/*!******************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/alert-circle.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AlertCircle)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * lucide-react v0.292.0 - ISC
 */



const AlertCircle = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("AlertCircle", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
]);


//# sourceMappingURL=alert-circle.js.map


/***/ }),

/***/ "./node_modules/lucide-react/dist/esm/icons/check-circle.js":
/*!******************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/check-circle.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CheckCircle)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * lucide-react v0.292.0 - ISC
 */



const CheckCircle = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("CheckCircle", [
  ["path", { d: "M22 11.08V12a10 10 0 1 1-5.93-9.14", key: "g774vq" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
]);


//# sourceMappingURL=check-circle.js.map


/***/ }),

/***/ "./node_modules/lucide-react/dist/esm/icons/eye-off.js":
/*!*************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/eye-off.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EyeOff)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * lucide-react v0.292.0 - ISC
 */



const EyeOff = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("EyeOff", [
  ["path", { d: "M9.88 9.88a3 3 0 1 0 4.24 4.24", key: "1jxqfv" }],
  [
    "path",
    {
      d: "M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68",
      key: "9wicm4"
    }
  ],
  [
    "path",
    {
      d: "M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61",
      key: "1jreej"
    }
  ],
  ["line", { x1: "2", x2: "22", y1: "2", y2: "22", key: "a6p6uj" }]
]);


//# sourceMappingURL=eye-off.js.map


/***/ }),

/***/ "./node_modules/lucide-react/dist/esm/icons/eye.js":
/*!*********************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/eye.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Eye)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * lucide-react v0.292.0 - ISC
 */



const Eye = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("Eye", [
  [
    "path",
    { d: "M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z", key: "rwhkz3" }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
]);


//# sourceMappingURL=eye.js.map


/***/ }),

/***/ "./node_modules/lucide-react/dist/esm/icons/lock.js":
/*!**********************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/lock.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Lock)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * lucide-react v0.292.0 - ISC
 */



const Lock = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("Lock", [
  [
    "rect",
    {
      width: "18",
      height: "11",
      x: "3",
      y: "11",
      rx: "2",
      ry: "2",
      key: "1w4ew1"
    }
  ],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
]);


//# sourceMappingURL=lock.js.map


/***/ }),

/***/ "./node_modules/lucide-react/dist/esm/icons/log-in.js":
/*!************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/log-in.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LogIn)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * lucide-react v0.292.0 - ISC
 */



const LogIn = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("LogIn", [
  ["path", { d: "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4", key: "u53s6r" }],
  ["polyline", { points: "10 17 15 12 10 7", key: "1ail0h" }],
  ["line", { x1: "15", x2: "3", y1: "12", y2: "12", key: "v6grx8" }]
]);


//# sourceMappingURL=log-in.js.map


/***/ }),

/***/ "./node_modules/lucide-react/dist/esm/icons/log-out.js":
/*!*************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/log-out.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LogOut)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * lucide-react v0.292.0 - ISC
 */



const LogOut = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("LogOut", [
  ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }],
  ["polyline", { points: "16 17 21 12 16 7", key: "1gabdz" }],
  ["line", { x1: "21", x2: "9", y1: "12", y2: "12", key: "1uyos4" }]
]);


//# sourceMappingURL=log-out.js.map


/***/ }),

/***/ "./node_modules/lucide-react/dist/esm/icons/mail.js":
/*!**********************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/mail.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Mail)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * lucide-react v0.292.0 - ISC
 */



const Mail = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("Mail", [
  [
    "rect",
    { width: "20", height: "16", x: "2", y: "4", rx: "2", key: "18n3k1" }
  ],
  ["path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7", key: "1ocrg3" }]
]);


//# sourceMappingURL=mail.js.map


/***/ }),

/***/ "./node_modules/lucide-react/dist/esm/icons/rotate-ccw.js":
/*!****************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/rotate-ccw.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RotateCcw)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * lucide-react v0.292.0 - ISC
 */



const RotateCcw = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("RotateCcw", [
  [
    "path",
    { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }
  ],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
]);


//# sourceMappingURL=rotate-ccw.js.map


/***/ }),

/***/ "./node_modules/lucide-react/dist/esm/icons/shield.js":
/*!************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/shield.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Shield)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * lucide-react v0.292.0 - ISC
 */



const Shield = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("Shield", [
  ["path", { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10", key: "1irkt0" }]
]);


//# sourceMappingURL=shield.js.map


/***/ }),

/***/ "./node_modules/lucide-react/dist/esm/icons/user-plus.js":
/*!***************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/user-plus.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UserPlus)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * lucide-react v0.292.0 - ISC
 */



const UserPlus = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("UserPlus", [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["line", { x1: "19", x2: "19", y1: "8", y2: "14", key: "1bvyxn" }],
  ["line", { x1: "22", x2: "16", y1: "11", y2: "11", key: "1shjgl" }]
]);


//# sourceMappingURL=user-plus.js.map


/***/ }),

/***/ "./node_modules/lucide-react/dist/esm/icons/x.js":
/*!*******************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/x.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ X)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * lucide-react v0.292.0 - ISC
 */



const X = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("X", [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
]);


//# sourceMappingURL=x.js.map


/***/ }),

/***/ "./node_modules/react-dom/client.js":
/*!******************************************!*\
  !*** ./node_modules/react-dom/client.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var m = __webpack_require__(/*! react-dom */ "react-dom");
if (false) // removed by dead control flow
{} else {
  var i = m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  exports.createRoot = function(c, o) {
    i.usingClientEntryPoint = true;
    try {
      return m.createRoot(c, o);
    } finally {
      i.usingClientEntryPoint = false;
    }
  };
  exports.hydrateRoot = function(c, h, o) {
    i.usingClientEntryPoint = true;
    try {
      return m.hydrateRoot(c, h, o);
    } finally {
      i.usingClientEntryPoint = false;
    }
  };
}


/***/ }),

/***/ "./src/components/auth/AuthModal.jsx":
/*!*******************************************!*\
  !*** ./src/components/auth/AuthModal.jsx ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/alert-circle.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/check-circle.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/eye-off.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/eye.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/lock.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/log-in.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/mail.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/rotate-ccw.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/user-plus.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/x.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }



// Isolated form component for login
var LoginForm = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().memo(function (_ref) {
  var onSubmit = _ref.onSubmit,
    isLoading = _ref.isLoading,
    error = _ref.error,
    success = _ref.success;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
      email: '',
      password: '',
      rememberMe: false
    }),
    _useState2 = _slicedToArray(_useState, 2),
    formData = _useState2[0],
    setFormData = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    showPassword = _useState4[0],
    setShowPassword = _useState4[1];

  // Load remember me preference on mount
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    var rememberMe = localStorage.getItem('rwp_cct_remember_me') === 'true';
    if (rememberMe) {
      setFormData(function (prev) {
        return _objectSpread(_objectSpread({}, prev), {}, {
          rememberMe: true
        });
      });
    }
  }, []);
  var handleInputChange = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (e) {
    var _e$target = e.target,
      name = _e$target.name,
      value = _e$target.value,
      type = _e$target.type,
      checked = _e$target.checked;
    var newValue = type === 'checkbox' ? checked : value;
    setFormData(function (prevData) {
      return _objectSpread(_objectSpread({}, prevData), {}, _defineProperty({}, name, newValue));
    });
  }, []);
  var handleSubmit = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (e) {
    e.preventDefault();
    onSubmit(formData, 'login');
  }, [formData, onSubmit]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h2", {
    className: "text-2xl font-bold text-white mb-2 text-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_6__["default"], {
    className: "w-6 h-6 inline mr-2"
  }), "Welcome Back"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    className: "text-gray-400 text-center mb-6"
  }, "Sign in to your account"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("form", {
    onSubmit: handleSubmit,
    className: "space-y-4"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", {
    htmlFor: "email",
    className: "block text-sm font-medium text-gray-300 mb-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_7__["default"], {
    className: "w-4 h-4 inline mr-2"
  }), "Email Address"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    key: "login-email",
    type: "email",
    id: "email",
    name: "email",
    value: formData.email,
    onChange: handleInputChange,
    className: "w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
    placeholder: "Enter your email",
    required: true,
    disabled: isLoading
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", {
    htmlFor: "password",
    className: "block text-sm font-medium text-gray-300 mb-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_5__["default"], {
    className: "w-4 h-4 inline mr-2"
  }), "Password"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "relative"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    key: "login-password",
    type: showPassword ? 'text' : 'password',
    id: "password",
    name: "password",
    value: formData.password,
    onChange: handleInputChange,
    className: "w-full px-3 py-2 pr-10 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
    placeholder: "Enter your password",
    required: true,
    disabled: isLoading
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    type: "button",
    onClick: function onClick() {
      return setShowPassword(!showPassword);
    },
    className: "absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white",
    disabled: isLoading
  }, showPassword ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_3__["default"], {
    className: "w-5 h-5"
  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_4__["default"], {
    className: "w-5 h-5"
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", {
    className: "flex items-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    type: "checkbox",
    name: "rememberMe",
    checked: formData.rememberMe,
    onChange: handleInputChange,
    className: "mr-2 rounded border-gray-600 bg-gray-700 text-blue-600"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-sm text-gray-400"
  }, "Remember me"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    type: "submit",
    disabled: isLoading,
    className: "w-full px-4 py-2 rounded-md font-medium transition-colors ".concat(isLoading ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white')
  }, isLoading ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-center justify-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"
  }), "Signing In...") : 'Sign In')));
});

// Isolated form component for registration
var RegisterForm = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().memo(function (_ref2) {
  var onSubmit = _ref2.onSubmit,
    isLoading = _ref2.isLoading,
    error = _ref2.error,
    success = _ref2.success;
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
      email: '',
      password: ''
    }),
    _useState6 = _slicedToArray(_useState5, 2),
    formData = _useState6[0],
    setFormData = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState8 = _slicedToArray(_useState7, 2),
    showPassword = _useState8[0],
    setShowPassword = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
      score: 0,
      level: '',
      feedback: []
    }),
    _useState0 = _slicedToArray(_useState9, 2),
    passwordStrength = _useState0[0],
    setPasswordStrength = _useState0[1];
  var passwordStrengthTimeoutRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  var handleInputChange = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (e) {
    var _e$target2 = e.target,
      name = _e$target2.name,
      value = _e$target2.value;
    setFormData(function (prevData) {
      return _objectSpread(_objectSpread({}, prevData), {}, _defineProperty({}, name, value));
    });

    // Debounced password strength check for registration form
    if (name === 'password') {
      // Clear existing timeout
      if (passwordStrengthTimeoutRef.current) {
        clearTimeout(passwordStrengthTimeoutRef.current);
      }
      if (value) {
        // Debounce password strength check to reduce re-renders
        passwordStrengthTimeoutRef.current = setTimeout(function () {
          checkPasswordStrength(value);
        }, 300);
      } else {
        setPasswordStrength({
          score: 0,
          level: '',
          feedback: []
        });
      }
    }
  }, []);
  var checkPasswordStrength = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(password) {
      var response, data, strength, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            _context.p = 0;
            _context.n = 1;
            return fetch("".concat(window.rwpCctGlobalAuth.apiUrl, "auth/password-strength"), {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'X-WP-Nonce': window.rwpCctGlobalAuth.nonce
              },
              body: JSON.stringify({
                password: password
              })
            });
          case 1:
            response = _context.v;
            if (!response.ok) {
              _context.n = 3;
              break;
            }
            _context.n = 2;
            return response.json();
          case 2:
            data = _context.v;
            setPasswordStrength(data);
          case 3:
            _context.n = 5;
            break;
          case 4:
            _context.p = 4;
            _t = _context.v;
            // Fallback to client-side strength check
            strength = getClientSidePasswordStrength(password);
            setPasswordStrength(strength);
          case 5:
            return _context.a(2);
        }
      }, _callee, null, [[0, 4]]);
    }));
    return function checkPasswordStrength(_x) {
      return _ref3.apply(this, arguments);
    };
  }();
  var getClientSidePasswordStrength = function getClientSidePasswordStrength(password) {
    var score = 0;
    var feedback = [];
    if (password.length >= 8) {
      score++;
    } else {
      feedback.push('Use at least 8 characters');
    }
    if (/[a-z]/.test(password)) {
      score++;
    } else {
      feedback.push('Include lowercase letters');
    }
    if (/[A-Z]/.test(password)) {
      score++;
    } else {
      feedback.push('Include uppercase letters');
    }
    if (/[0-9]/.test(password)) {
      score++;
    } else {
      feedback.push('Include numbers');
    }
    if (/[^A-Za-z0-9]/.test(password)) {
      score++;
    } else {
      feedback.push('Include special characters');
    }
    var levels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
    var level = levels[Math.min(score, 4)];
    return {
      score: score,
      level: level,
      feedback: feedback
    };
  };
  var getPasswordStrengthColor = function getPasswordStrengthColor(score) {
    if (score === 0) return 'bg-gray-600';
    if (score <= 1) return 'bg-red-500';
    if (score <= 2) return 'bg-yellow-500';
    if (score <= 3) return 'bg-blue-500';
    return 'bg-green-500';
  };
  var handleSubmit = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (e) {
    e.preventDefault();
    onSubmit(formData, 'register');
  }, [formData, onSubmit]);

  // Cleanup timeout on unmount
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    return function () {
      if (passwordStrengthTimeoutRef.current) {
        clearTimeout(passwordStrengthTimeoutRef.current);
      }
    };
  }, []);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h2", {
    className: "text-2xl font-bold text-white mb-2 text-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_9__["default"], {
    className: "w-6 h-6 inline mr-2"
  }), "Create Account"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    className: "text-gray-400 text-center mb-6"
  }, "Start creating amazing content today"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("form", {
    onSubmit: handleSubmit,
    className: "space-y-4"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", {
    htmlFor: "email",
    className: "block text-sm font-medium text-gray-300 mb-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_7__["default"], {
    className: "w-4 h-4 inline mr-2"
  }), "Email Address"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    key: "register-email",
    type: "email",
    id: "email",
    name: "email",
    value: formData.email,
    onChange: handleInputChange,
    className: "w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
    placeholder: "Enter your email",
    required: true,
    disabled: isLoading
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", {
    htmlFor: "password",
    className: "block text-sm font-medium text-gray-300 mb-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_5__["default"], {
    className: "w-4 h-4 inline mr-2"
  }), "Password"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "relative"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    key: "register-password",
    type: showPassword ? 'text' : 'password',
    id: "password",
    name: "password",
    value: formData.password,
    onChange: handleInputChange,
    className: "w-full px-3 py-2 pr-10 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
    placeholder: "Create a password (8+ characters)",
    required: true,
    disabled: isLoading
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    type: "button",
    onClick: function onClick() {
      return setShowPassword(!showPassword);
    },
    className: "absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white",
    disabled: isLoading
  }, showPassword ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_3__["default"], {
    className: "w-5 h-5"
  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_4__["default"], {
    className: "w-5 h-5"
  }))), formData.password && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "mt-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex gap-1 mb-2"
  }, _toConsumableArray(Array(5)).map(function (_, index) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      key: index,
      className: "h-1 flex-1 rounded ".concat(index < passwordStrength.score ? getPasswordStrengthColor(passwordStrength.score) : 'bg-gray-600')
    });
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex justify-between items-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-xs ".concat(passwordStrength.score <= 1 ? 'text-red-400' : passwordStrength.score <= 2 ? 'text-yellow-400' : passwordStrength.score <= 3 ? 'text-blue-400' : 'text-green-400')
  }, passwordStrength.level), passwordStrength.feedback.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-xs text-gray-400"
  }, passwordStrength.feedback[0])))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "text-xs text-gray-400"
  }, "By creating an account, you agree to our", ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
    href: "#",
    className: "text-blue-400 hover:text-blue-300"
  }, "Terms of Service"), " and", ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
    href: "#",
    className: "text-blue-400 hover:text-blue-300"
  }, "Privacy Policy")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    type: "submit",
    disabled: isLoading,
    className: "w-full px-4 py-2 rounded-md font-medium transition-colors ".concat(isLoading ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white')
  }, isLoading ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-center justify-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"
  }), "Creating Account...") : 'Create Account')));
});

// Isolated form component for password reset
var ResetForm = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().memo(function (_ref4) {
  var onSubmit = _ref4.onSubmit,
    isLoading = _ref4.isLoading,
    error = _ref4.error,
    success = _ref4.success;
  var _useState1 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState10 = _slicedToArray(_useState1, 2),
    email = _useState10[0],
    setEmail = _useState10[1];
  var handleInputChange = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (e) {
    setEmail(e.target.value);
  }, []);
  var handleSubmit = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (e) {
    e.preventDefault();
    onSubmit({
      email: email
    }, 'reset');
  }, [email, onSubmit]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h2", {
    className: "text-2xl font-bold text-white mb-2 text-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_8__["default"], {
    className: "w-6 h-6 inline mr-2"
  }), "Reset Password"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    className: "text-gray-400 text-center mb-6"
  }, "Enter your email to receive reset instructions"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("form", {
    onSubmit: handleSubmit,
    className: "space-y-4"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", {
    htmlFor: "email",
    className: "block text-sm font-medium text-gray-300 mb-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_7__["default"], {
    className: "w-4 h-4 inline mr-2"
  }), "Email Address"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    key: "reset-email",
    type: "email",
    id: "email",
    name: "email",
    value: email,
    onChange: handleInputChange,
    className: "w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
    placeholder: "Enter your email",
    required: true,
    disabled: isLoading
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    type: "submit",
    disabled: isLoading,
    className: "w-full px-4 py-2 rounded-md font-medium transition-colors ".concat(isLoading ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white')
  }, isLoading ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-center justify-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"
  }), "Sending Email...") : 'Send Reset Email')));
});

// Main AuthModal component - only manages visibility and tab state
var AuthModal = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().memo(function (_ref5) {
  var container = _ref5.container;
  console.log('🟢 AuthModal render (should only happen on visibility/tab changes)');
  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState12 = _slicedToArray(_useState11, 2),
    isVisible = _useState12[0],
    setIsVisible = _useState12[1];
  var _useState13 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('login'),
    _useState14 = _slicedToArray(_useState13, 2),
    activeForm = _useState14[0],
    setActiveForm = _useState14[1];
  var _useState15 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState16 = _slicedToArray(_useState15, 2),
    isLoading = _useState16[0],
    setIsLoading = _useState16[1];
  var _useState17 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState18 = _slicedToArray(_useState17, 2),
    error = _useState18[0],
    setError = _useState18[1];
  var _useState19 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState20 = _slicedToArray(_useState19, 2),
    success = _useState20[0],
    setSuccess = _useState20[1];
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    // Listen for modal open events
    window.addEventListener('rwp-cct-open-auth-modal', handleOpenModal);

    // Listen for ESC key to close modal
    document.addEventListener('keydown', handleKeyDown);
    return function () {
      window.removeEventListener('rwp-cct-open-auth-modal', handleOpenModal);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Update parent container classes when visibility changes
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (container) {
      if (isVisible) {
        container.classList.remove('rwp-cct-modal-hidden');
        container.classList.add('rwp-cct-modal-visible');
      } else {
        container.classList.remove('rwp-cct-modal-visible');
        container.classList.add('rwp-cct-modal-hidden');
      }
    }
  }, [isVisible, container]);
  var handleOpenModal = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (event) {
    console.log('AuthModal: handleOpenModal called', event);
    var _ref6 = event.detail || {},
      formType = _ref6.formType;
    console.log('AuthModal: formType from event:', formType);
    if (formType) {
      setActiveForm(formType);
    }
    setIsVisible(true);
    resetForm();
    console.log('AuthModal: Modal should now be visible, isVisible:', true);
  }, []);
  var handleKeyDown = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (event) {
    if (event.key === 'Escape' && isVisible) {
      closeModal();
    }
  }, [isVisible]);
  var closeModal = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    setIsVisible(false);
    resetForm();
  }, []);
  var resetForm = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    setError('');
    setSuccess('');
    setIsLoading(false);
  }, []);
  var validateForm = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (formData, formType) {
    if (!formData.email || !formData.password) {
      setError('Email and password are required');
      return false;
    }
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      return false;
    }
    if (formType === 'register') {
      if (formData.password.length < 8) {
        setError('Password must be at least 8 characters long');
        return false;
      }

      // Basic strength requirement - at least one letter and one number
      if (!/[A-Za-z]/.test(formData.password) || !/[0-9]/.test(formData.password)) {
        setError('Password must contain at least one letter and one number');
        return false;
      }
    }
    return true;
  }, []);
  var handleFormSubmit = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(/*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(formData, formType) {
      var response, data, endpoint, payload, _response, _data, _t2;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            // Clear errors when user starts typing (only if there is an error)
            if (error) {
              setError('');
            }
            if (!(formType !== 'reset' && !validateForm(formData, formType))) {
              _context2.n = 1;
              break;
            }
            return _context2.a(2);
          case 1:
            setIsLoading(true);
            setError('');
            _context2.p = 2;
            if (!(formType === 'reset')) {
              _context2.n = 5;
              break;
            }
            _context2.n = 3;
            return fetch("".concat(window.rwpCctGlobalAuth.apiUrl, "auth/reset"), {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'X-WP-Nonce': window.rwpCctGlobalAuth.nonce
              },
              body: JSON.stringify({
                email: formData.email
              })
            });
          case 3:
            response = _context2.v;
            _context2.n = 4;
            return response.json();
          case 4:
            data = _context2.v;
            if (response.ok && data.success) {
              setSuccess('Password reset instructions have been sent to your email.');
              // Don't close modal for reset - let user read the message
            } else {
              setError(data.message || 'Failed to send reset email. Please try again.');
            }
            _context2.n = 8;
            break;
          case 5:
            // Handle login/register
            endpoint = formType === 'register' ? 'auth/register' : 'auth/login';
            payload = {
              email: formData.email,
              password: formData.password
            };
            _context2.n = 6;
            return fetch("".concat(window.rwpCctGlobalAuth.apiUrl).concat(endpoint), {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'X-WP-Nonce': window.rwpCctGlobalAuth.nonce
              },
              body: JSON.stringify(payload)
            });
          case 6:
            _response = _context2.v;
            _context2.n = 7;
            return _response.json();
          case 7:
            _data = _context2.v;
            if (_response.ok && _data.success) {
              setSuccess(formType === 'register' ? 'Account created successfully! Welcome!' : 'Welcome back!');

              // Store JWT token
              localStorage.setItem('rwp_cct_token', _data.token);

              // Store remember me preference for login
              if (formType === 'login' && formData.rememberMe) {
                localStorage.setItem('rwp_cct_remember_me', 'true');
              } else {
                localStorage.removeItem('rwp_cct_remember_me');
              }

              // Dispatch auth success event
              window.dispatchEvent(new CustomEvent('rwp-cct-auth-success', {
                detail: {
                  user: _data.user,
                  token: _data.token
                }
              }));

              // Close modal after short delay
              setTimeout(function () {
                closeModal();
              }, 1500);
            } else {
              setError(_data.message || 'Authentication failed. Please try again.');
            }
          case 8:
            _context2.n = 10;
            break;
          case 9:
            _context2.p = 9;
            _t2 = _context2.v;
            console.error('Auth error:', _t2);
            setError('Network error. Please check your connection and try again.');
          case 10:
            _context2.p = 10;
            setIsLoading(false);
            return _context2.f(10);
          case 11:
            return _context2.a(2);
        }
      }, _callee2, null, [[2, 9, 10, 11]]);
    }));
    return function (_x2, _x3) {
      return _ref7.apply(this, arguments);
    };
  }(), [error, validateForm, closeModal]);
  var FormTabs = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "flex space-x-1 bg-gray-800 p-1 rounded-lg mb-6"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
      type: "button",
      onClick: function onClick() {
        return setActiveForm('login');
      },
      className: "flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ".concat(activeForm === 'login' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-700')
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_6__["default"], {
      className: "w-4 h-4 inline mr-2"
    }), "Login"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
      type: "button",
      onClick: function onClick() {
        return setActiveForm('register');
      },
      className: "flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ".concat(activeForm === 'register' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-700')
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_9__["default"], {
      className: "w-4 h-4 inline mr-2"
    }), "Register"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
      type: "button",
      onClick: function onClick() {
        return setActiveForm('reset');
      },
      className: "flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ".concat(activeForm === 'reset' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-700')
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_8__["default"], {
      className: "w-4 h-4 inline mr-2"
    }), "Reset"));
  }, [activeForm]);
  var handleBackdropClick = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (e) {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }, [closeModal]);
  var handleResetLinkClick = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    setActiveForm('reset');
  }, []);
  var handleFormSwitchClick = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (formType) {
    setActiveForm(formType);
  }, []);
  if (!isVisible) {
    return null;
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "absolute inset-0",
    onClick: handleBackdropClick,
    style: {
      background: 'rgba(0, 0, 0, 0.75)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "modal-content"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    onClick: closeModal,
    className: "absolute top-4 right-4 text-gray-400 hover:text-white transition-colors",
    disabled: isLoading
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_10__["default"], {
    className: "w-6 h-6"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(FormTabs, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "space-y-6"
  }, activeForm === 'login' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(LoginForm, {
    onSubmit: handleFormSubmit,
    isLoading: isLoading,
    error: error,
    success: success
  }), activeForm === 'register' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(RegisterForm, {
    onSubmit: handleFormSubmit,
    isLoading: isLoading,
    error: error,
    success: success
  }), activeForm === 'reset' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(ResetForm, {
    onSubmit: handleFormSubmit,
    isLoading: isLoading,
    error: error,
    success: success
  }), error && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-center gap-2 p-3 bg-red-600/20 border border-red-600/30 rounded-md text-red-400"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__["default"], {
    className: "w-5 h-5 flex-shrink-0"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-sm"
  }, error)), success && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-center gap-2 p-3 bg-green-600/20 border border-green-600/30 rounded-md text-green-400"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_2__["default"], {
    className: "w-5 h-5 flex-shrink-0"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-sm"
  }, success)), activeForm === 'login' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "text-center space-y-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    type: "button",
    onClick: handleResetLinkClick,
    className: "text-sm text-blue-400 hover:text-blue-300 block",
    disabled: isLoading
  }, "Forgot password?"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    className: "text-center text-gray-400 text-sm"
  }, "Don't have an account?", ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    type: "button",
    onClick: function onClick() {
      return handleFormSwitchClick('register');
    },
    className: "text-blue-400 hover:text-blue-300",
    disabled: isLoading
  }, "Sign up"))), activeForm === 'register' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    className: "text-center text-gray-400 text-sm"
  }, "Already have an account?", ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    type: "button",
    onClick: function onClick() {
      return handleFormSwitchClick('login');
    },
    className: "text-blue-400 hover:text-blue-300",
    disabled: isLoading
  }, "Sign in")), activeForm === 'reset' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "text-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    type: "button",
    onClick: function onClick() {
      return handleFormSwitchClick('login');
    },
    className: "text-sm text-blue-400 hover:text-blue-300",
    disabled: isLoading
  }, "\u2190 Back to login")))));
});
AuthModal.displayName = 'AuthModal';
LoginForm.displayName = 'LoginForm';
RegisterForm.displayName = 'RegisterForm';
ResetForm.displayName = 'ResetForm';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AuthModal);

/***/ }),

/***/ "./src/components/auth/HeaderUserElement.jsx":
/*!***************************************************!*\
  !*** ./src/components/auth/HeaderUserElement.jsx ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/log-in.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/log-out.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/mail.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/shield.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/user-plus.js");
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }


var HeaderUserElement = function HeaderUserElement(_ref) {
  var container = _ref.container;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    user = _useState2[0],
    setUser = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true),
    _useState4 = _slicedToArray(_useState3, 2),
    isLoading = _useState4[0],
    setIsLoading = _useState4[1];
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    checkAuthStatus();

    // Listen for auth state changes
    window.addEventListener('rwp-cct-auth-success', handleAuthSuccess);
    window.addEventListener('rwp-cct-auth-logout', handleLogout);
    return function () {
      window.removeEventListener('rwp-cct-auth-success', handleAuthSuccess);
      window.removeEventListener('rwp-cct-auth-logout', handleLogout);
    };
  }, []);
  var checkAuthStatus = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var token, response, data, _window$rwpCctGlobalA, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            setIsLoading(true);
            _context.p = 1;
            // First check localStorage for JWT token
            token = localStorage.getItem('rwp_cct_token');
            if (!token) {
              _context.n = 6;
              break;
            }
            _context.n = 2;
            return fetch("".concat(window.rwpCctGlobalAuth.apiUrl, "auth/verify"), {
              method: 'GET',
              headers: {
                'Authorization': "Bearer ".concat(token),
                'Content-Type': 'application/json'
              }
            });
          case 2:
            response = _context.v;
            if (!response.ok) {
              _context.n = 4;
              break;
            }
            _context.n = 3;
            return response.json();
          case 3:
            data = _context.v;
            setUser(data.user);
            _context.n = 5;
            break;
          case 4:
            // Token invalid, remove it
            localStorage.removeItem('rwp_cct_token');
            setUser(null);
          case 5:
            _context.n = 7;
            break;
          case 6:
            // Check if user is logged in via WordPress
            if ((_window$rwpCctGlobalA = window.rwpCctGlobalAuth.currentUser) !== null && _window$rwpCctGlobalA !== void 0 && _window$rwpCctGlobalA.isLoggedIn) {
              setUser(window.rwpCctGlobalAuth.currentUser);
            } else {
              setUser(null);
            }
          case 7:
            _context.n = 9;
            break;
          case 8:
            _context.p = 8;
            _t = _context.v;
            console.error('Auth check failed:', _t);
            setUser(null);
          case 9:
            _context.p = 9;
            setIsLoading(false);
            return _context.f(9);
          case 10:
            return _context.a(2);
        }
      }, _callee, null, [[1, 8, 9, 10]]);
    }));
    return function checkAuthStatus() {
      return _ref2.apply(this, arguments);
    };
  }();
  var handleAuthSuccess = function handleAuthSuccess(event) {
    var _event$detail = event.detail,
      userData = _event$detail.user,
      token = _event$detail.token;
    setUser(userData);

    // Store token in localStorage
    if (token) {
      localStorage.setItem('rwp_cct_token', token);
    }
  };
  var handleLogout = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
      var _window$rwpCctGlobalA2, _t2;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            _context2.p = 0;
            // Clear JWT token
            localStorage.removeItem('rwp_cct_token');

            // If using WordPress session, redirect to logout URL
            if (!((_window$rwpCctGlobalA2 = window.rwpCctGlobalAuth.currentUser) !== null && _window$rwpCctGlobalA2 !== void 0 && _window$rwpCctGlobalA2.isLoggedIn)) {
              _context2.n = 1;
              break;
            }
            window.location.href = window.rwpCctGlobalAuth.logoutUrl;
            return _context2.a(2);
          case 1:
            setUser(null);

            // Dispatch logout event
            window.dispatchEvent(new CustomEvent('rwp-cct-auth-logout'));
            _context2.n = 3;
            break;
          case 2:
            _context2.p = 2;
            _t2 = _context2.v;
            console.error('Logout failed:', _t2);
          case 3:
            return _context2.a(2);
        }
      }, _callee2, null, [[0, 2]]);
    }));
    return function handleLogout() {
      return _ref3.apply(this, arguments);
    };
  }();
  var openModal = function openModal() {
    var formType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'login';
    console.log('openModal called with formType:', formType);
    var event = new CustomEvent('rwp-cct-open-auth-modal', {
      detail: {
        formType: formType
      }
    });
    console.log('Dispatching event:', event);
    window.dispatchEvent(event);
  };
  var getRoleBadgeColor = function getRoleBadgeColor(role) {
    switch (role) {
      case 'administrator':
        return 'bg-red-600 text-white';
      case 'editor':
        return 'bg-purple-600 text-white';
      case 'author':
        return 'bg-green-600 text-white';
      case 'contributor':
        return 'bg-blue-600 text-white';
      case 'subscriber':
      default:
        return 'bg-gray-600 text-white';
    }
  };
  if (isLoading) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "flex items-center text-gray-400"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
      className: "ml-2 text-sm"
    }, "Loading..."));
  }
  if (user) {
    // Authenticated state
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "flex items-center gap-3 text-white"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "flex items-center gap-2"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "flex items-center gap-1"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_3__["default"], {
      className: "w-4 h-4 text-gray-400"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
      className: "text-sm"
    }, user.email)), user.role && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
      className: "px-2 py-1 rounded-full text-xs font-medium ".concat(getRoleBadgeColor(user.role))
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_4__["default"], {
      className: "w-3 h-3 inline mr-1"
    }), user.role)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
      onClick: handleLogout,
      className: "flex items-center gap-1 px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm transition-colors",
      title: "Logout"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_2__["default"], {
      className: "w-4 h-4"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
      className: "hidden sm:inline"
    }, "Logout")));
  }

  // Unauthenticated state
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    onClick: function onClick(e) {
      console.log('Login button clicked', e);
      openModal('login');
    },
    className: "flex items-center gap-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm transition-colors"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__["default"], {
    className: "w-4 h-4"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, "Login")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    onClick: function onClick(e) {
      console.log('Register button clicked', e);
      openModal('register');
    },
    className: "flex items-center gap-1 px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded-md text-sm transition-colors"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_5__["default"], {
    className: "w-4 h-4"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, "Register")));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HeaderUserElement);

/***/ }),

/***/ "./src/styles.css":
/*!************************!*\
  !*** ./src/styles.css ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = React;

/***/ }),

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/***/ ((module) => {

module.exports = ReactDOM;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!****************************!*\
  !*** ./src/global-auth.js ***!
  \****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/client */ "./node_modules/react-dom/client.js");
/* harmony import */ var _components_auth_HeaderUserElement__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/auth/HeaderUserElement */ "./src/components/auth/HeaderUserElement.jsx");
/* harmony import */ var _components_auth_AuthModal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/auth/AuthModal */ "./src/components/auth/AuthModal.jsx");
/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./styles.css */ "./src/styles.css");






// Initialize global auth components when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
  // Initialize Header User Elements
  var headerContainers = document.querySelectorAll('.rwp-cct-user-header');
  headerContainers.forEach(function (container) {
    var root = (0,react_dom_client__WEBPACK_IMPORTED_MODULE_1__.createRoot)(container);
    root.render(/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_auth_HeaderUserElement__WEBPACK_IMPORTED_MODULE_2__["default"], {
      container: container
    }));
  });

  // Initialize Auth Modals
  var modalContainers = document.querySelectorAll('.rwp-cct-auth-modal');
  modalContainers.forEach(function (container) {
    var root = (0,react_dom_client__WEBPACK_IMPORTED_MODULE_1__.createRoot)(container);
    root.render(/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_auth_AuthModal__WEBPACK_IMPORTED_MODULE_3__["default"], {
      container: container
    }));
  });

  // Log initialization for debugging
  if (window.console) {
    console.log('RWP CCT Global Auth initialized:', {
      headerElements: headerContainers.length,
      modalElements: modalContainers.length
    });
  }
});
})();

/******/ })()
;
//# sourceMappingURL=global-auth.js.map