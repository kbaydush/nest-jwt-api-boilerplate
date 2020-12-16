"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.AuthController = void 0;
var common_1 = require("@nestjs/common");
var platform_express_1 = require("@nestjs/platform-express");
var swagger_1 = require("@nestjs/swagger");
var auth_user_decorator_1 = require("../../decorators/auth-user.decorator");
var swagger_schema_1 = require("../../decorators/swagger.schema");
var auth_guard_1 = require("../../guards/auth.guard");
var auth_user_interceptor_service_1 = require("../../interceptors/auth-user-interceptor.service");
var UserDto_1 = require("../user/dto/UserDto");
var LoginPayloadDto_1 = require("./dto/LoginPayloadDto");
var AuthController = /** @class */ (function () {
    function AuthController(userService, authService) {
        this.userService = userService;
        this.authService = authService;
    }
    AuthController.prototype.userLogin = function (userLoginDto) {
        return __awaiter(this, void 0, void 0, function () {
            var userEntity, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.authService.validateUser(userLoginDto)];
                    case 1:
                        userEntity = _a.sent();
                        return [4 /*yield*/, this.authService.createToken(userEntity)];
                    case 2:
                        token = _a.sent();
                        return [2 /*return*/, new LoginPayloadDto_1.LoginPayloadDto(userEntity.toDto(), token)];
                }
            });
        });
    };
    AuthController.prototype.userRegister = function (userRegisterDto, file) {
        return __awaiter(this, void 0, void 0, function () {
            var createdUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userService.createUser(userRegisterDto, file)];
                    case 1:
                        createdUser = _a.sent();
                        return [2 /*return*/, createdUser.toDto()];
                }
            });
        });
    };
    AuthController.prototype.getCurrentUser = function (user) {
        return user.toDto();
    };
    __decorate([
        common_1.Post('login'),
        common_1.HttpCode(common_1.HttpStatus.OK),
        swagger_1.ApiOkResponse({
            type: LoginPayloadDto_1.LoginPayloadDto,
            description: 'User info with access token'
        }),
        __param(0, common_1.Body())
    ], AuthController.prototype, "userLogin");
    __decorate([
        common_1.Post('register'),
        common_1.HttpCode(common_1.HttpStatus.OK),
        swagger_1.ApiOkResponse({ type: UserDto_1.UserDto, description: 'Successfully Registered' }),
        swagger_1.ApiConsumes('multipart/form-data'),
        swagger_schema_1.ApiFile('avatar'),
        common_1.UseInterceptors(platform_express_1.FileInterceptor('avatar')),
        __param(0, common_1.Body()),
        __param(1, common_1.UploadedFile())
    ], AuthController.prototype, "userRegister");
    __decorate([
        common_1.Get('me'),
        common_1.HttpCode(common_1.HttpStatus.OK),
        common_1.UseGuards(auth_guard_1.AuthGuard),
        common_1.UseInterceptors(auth_user_interceptor_service_1.AuthUserInterceptor),
        swagger_1.ApiBearerAuth(),
        swagger_1.ApiOkResponse({ type: UserDto_1.UserDto, description: 'current user info' }),
        __param(0, auth_user_decorator_1.AuthUser())
    ], AuthController.prototype, "getCurrentUser");
    AuthController = __decorate([
        common_1.Controller('auth'),
        swagger_1.ApiTags('auth')
    ], AuthController);
    return AuthController;
}());
exports.AuthController = AuthController;
