require("source-map-support").install();
exports.id = "main";
exports.modules = {

/***/ "./src/guard/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\r\n    if (k2 === undefined) k2 = k;\r\n    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });\r\n}) : (function(o, m, k, k2) {\r\n    if (k2 === undefined) k2 = k;\r\n    o[k2] = m[k];\r\n}));\r\nvar __exportStar = (this && this.__exportStar) || function(m, exports) {\r\n    for (var p in m) if (p !== \"default\" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\n__exportStar(__webpack_require__(\"./src/guard/auth.guard.ts\"), exports);\r\n__exportStar(__webpack_require__(\"./src/guard/role.guard.ts\"), exports);\r\n\n\n//# sourceURL=webpack:///./src/guard/index.ts?");

/***/ }),

/***/ "./src/guard/role.guard.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nvar __generator = (this && this.__generator) || function (thisArg, body) {\r\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\r\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\r\n    function verb(n) { return function (v) { return step([n, v]); }; }\r\n    function step(op) {\r\n        if (f) throw new TypeError(\"Generator is already executing.\");\r\n        while (_) try {\r\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\r\n            if (y = 0, t) op = [op[0] & 2, t.value];\r\n            switch (op[0]) {\r\n                case 0: case 1: t = op; break;\r\n                case 4: _.label++; return { value: op[1], done: false };\r\n                case 5: _.label++; y = op[1]; op = [0]; continue;\r\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\r\n                default:\r\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\r\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\r\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\r\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\r\n                    if (t[2]) _.ops.pop();\r\n                    _.trys.pop(); continue;\r\n            }\r\n            op = body.call(thisArg, _);\r\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\r\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\r\n    }\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.RoleGuard = void 0;\r\nvar _models_1 = __webpack_require__(\"./src/models/index.ts\");\r\nvar common_1 = __webpack_require__(\"@nestjs/common\");\r\nvar _res_1 = __webpack_require__(\"./src/res/index.ts\");\r\nvar _service_1 = __webpack_require__(\"./src/service/index.ts\");\r\nvar typeorm_1 = __webpack_require__(\"typeorm\");\r\nvar _utils_1 = __webpack_require__(\"./src/utils/index.ts\");\r\nvar Mission = /** @class */ (function () {\r\n    function Mission() {\r\n    }\r\n    return Mission;\r\n}());\r\nvar RoleGuard = /** @class */ (function () {\r\n    function RoleGuard(missions) {\r\n        this.missions = missions;\r\n    }\r\n    RoleGuard.prototype.canActivate = function (context) {\r\n        return __awaiter(this, void 0, void 0, function () {\r\n            var request, verifyToken, username, userModel, roleModel, user, role, isRoot, userRoles, missions, session, isNext, e_1;\r\n            return __generator(this, function (_a) {\r\n                switch (_a.label) {\r\n                    case 0:\r\n                        _a.trys.push([0, 3, , 4]);\r\n                        request = context.switchToHttp().getRequest();\r\n                        verifyToken = _service_1.JwtService.prototype.verify(request.headers.authorization);\r\n                        if (verifyToken.error) {\r\n                            console.log(\"token\", verifyToken);\r\n                            throw new HttpException({\r\n                                code: 401,\r\n                                message: \"Unauthrized\",\r\n                                data: null\r\n                            }, HttpStatus.OK);\r\n                        }\r\n                        username = verifyToken.username;\r\n                        request.username = username;\r\n                        userModel = typeorm_1.getMongoRepository(_models_1.User);\r\n                        roleModel = typeorm_1.getMongoRepository(_models_1.Role);\r\n                        return [4 /*yield*/, userModel.findOne({ username: username })];\r\n                    case 1:\r\n                        user = _a.sent();\r\n                        role = user.role, isRoot = user.isRoot;\r\n                        if (isRoot) {\r\n                            return [2 /*return*/, true];\r\n                        }\r\n                        return [4 /*yield*/, roleModel.findOne({ _id: role })];\r\n                    case 2:\r\n                        userRoles = _a.sent();\r\n                        missions = userRoles.missions;\r\n                        session = {\r\n                            isRoot: isRoot,\r\n                            missions: missions\r\n                        };\r\n                        isNext = _utils_1.CheckMission(session, this.missions);\r\n                        console.log(\"check \", isNext);\r\n                        isNext ? true : _res_1.UNAUTH(\"Permission denied\");\r\n                        return [3 /*break*/, 4];\r\n                    case 3:\r\n                        e_1 = _a.sent();\r\n                        console.log(e_1);\r\n                        throw new HttpException({\r\n                            code: 401,\r\n                            message: \"Unauthrized\",\r\n                            data: null\r\n                        }, HttpStatus.OK);\r\n                    case 4: return [2 /*return*/];\r\n                }\r\n            });\r\n        });\r\n    };\r\n    RoleGuard = __decorate([\r\n        common_1.Injectable(),\r\n        __metadata(\"design:paramtypes\", [Array])\r\n    ], RoleGuard);\r\n    return RoleGuard;\r\n}());\r\nexports.RoleGuard = RoleGuard;\r\n\n\n//# sourceURL=webpack:///./src/guard/role.guard.ts?");

/***/ })

};