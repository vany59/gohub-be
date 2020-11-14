require("source-map-support").install();
exports.id = "main";
exports.modules = {

/***/ "./src/service/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\r\n    if (k2 === undefined) k2 = k;\r\n    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });\r\n}) : (function(o, m, k, k2) {\r\n    if (k2 === undefined) k2 = k;\r\n    o[k2] = m[k];\r\n}));\r\nvar __exportStar = (this && this.__exportStar) || function(m, exports) {\r\n    for (var p in m) if (p !== \"default\" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\n__exportStar(__webpack_require__(\"./src/service/password.service.ts\"), exports);\r\n__exportStar(__webpack_require__(\"./src/service/jwt.service.ts\"), exports);\r\n\n\n//# sourceURL=webpack:///./src/service/index.ts?");

/***/ }),

/***/ "./src/service/jwt.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.JwtService = void 0;\r\nvar _environment_1 = __webpack_require__(\"./src/environment/index.ts\");\r\nvar jwt = __webpack_require__(\"jsonwebtoken\");\r\nvar JwtService = /** @class */ (function () {\r\n    function JwtService() {\r\n    }\r\n    JwtService.prototype.sign = function (value) {\r\n        return jwt.sign(value, _environment_1.PRIVATE);\r\n    };\r\n    JwtService.prototype.verify = function (value) {\r\n        try {\r\n            var getToken = value.split(\" \")[1];\r\n            return jwt.verify(getToken, _environment_1.PRIVATE, function (err, decode) {\r\n                if (err)\r\n                    return { error: \"fail\" };\r\n                return decode;\r\n            });\r\n        }\r\n        catch (e) {\r\n            return { error: \"fail\" };\r\n        }\r\n    };\r\n    JwtService.prototype.getToken = function (value) {\r\n        try {\r\n            return value.split(\" \")[1];\r\n        }\r\n        catch (e) {\r\n            return { error: \"fail\" };\r\n        }\r\n    };\r\n    return JwtService;\r\n}());\r\nexports.JwtService = JwtService;\r\n\n\n//# sourceURL=webpack:///./src/service/jwt.service.ts?");

/***/ })

};