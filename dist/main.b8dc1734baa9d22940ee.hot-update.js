require("source-map-support").install();
exports.id = "main";
exports.modules = {

/***/ "./src/guard/auth.guard.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.AuthGuard = void 0;\r\nvar common_1 = __webpack_require__(\"@nestjs/common\");\r\nvar _service_1 = __webpack_require__(\"./src/service/index.ts\");\r\nvar AuthGuard = /** @class */ (function () {\r\n    function AuthGuard() {\r\n    }\r\n    AuthGuard.prototype.canActivate = function (context) {\r\n        try {\r\n            var request = context.switchToHttp().getRequest();\r\n            var verifyToken = _service_1.JwtService.prototype.verify(request.headers.authorization);\r\n            if (verifyToken.error) {\r\n                return new HttpException({\r\n                    code: 401,\r\n                    message: message,\r\n                    data: null\r\n                }, HttpStatus.OK);\r\n            }\r\n            request.username = verifyToken.username;\r\n            return true;\r\n        }\r\n        catch (e) {\r\n            return new HttpException({\r\n                code: 401,\r\n                message: message,\r\n                data: null\r\n            }, HttpStatus.OK);\r\n        }\r\n    };\r\n    AuthGuard = __decorate([\r\n        common_1.Injectable()\r\n    ], AuthGuard);\r\n    return AuthGuard;\r\n}());\r\nexports.AuthGuard = AuthGuard;\r\n\n\n//# sourceURL=webpack:///./src/guard/auth.guard.ts?");

/***/ }),

/***/ "./src/guard/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\r\n    if (k2 === undefined) k2 = k;\r\n    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });\r\n}) : (function(o, m, k, k2) {\r\n    if (k2 === undefined) k2 = k;\r\n    o[k2] = m[k];\r\n}));\r\nvar __exportStar = (this && this.__exportStar) || function(m, exports) {\r\n    for (var p in m) if (p !== \"default\" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\n__exportStar(__webpack_require__(\"./src/guard/auth.guard.ts\"), exports);\r\n__exportStar(__webpack_require__(\"./src/guard/role.guard.ts\"), exports);\r\n\n\n//# sourceURL=webpack:///./src/guard/index.ts?");

/***/ })

};