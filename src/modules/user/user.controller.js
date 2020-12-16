'use strict';
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
exports.UserController = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var role_type_1 = require("../../common/constants/role-type");
var auth_user_decorator_1 = require("../../decorators/auth-user.decorator");
var roles_decorator_1 = require("../../decorators/roles.decorator");
var auth_guard_1 = require("../../guards/auth.guard");
var roles_guard_1 = require("../../guards/roles.guard");
var auth_user_interceptor_service_1 = require("../../interceptors/auth-user-interceptor.service");
var UsersPageDto_1 = require("./dto/UsersPageDto");
var UserController = /** @class */ (function () {
    function UserController(_userService, _i18n) {
        this._userService = _userService;
        this._i18n = _i18n;
    }
    UserController.prototype.admin = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var translation;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._i18n.translate('translations.keywords.admin', {
                            lang: 'en'
                        })];
                    case 1:
                        translation = _a.sent();
                        return [2 /*return*/, translation + " " + user.firstName];
                }
            });
        });
    };
    UserController.prototype.getUsers = function (pageOptionsDto) {
        return this._userService.getUsers(pageOptionsDto);
    };
    __decorate([
        common_1.Get('admin'),
        roles_decorator_1.Roles(role_type_1.RoleType.USER),
        common_1.HttpCode(common_1.HttpStatus.OK),
        __param(0, auth_user_decorator_1.AuthUser())
    ], UserController.prototype, "admin");
    __decorate([
        common_1.Get('users'),
        roles_decorator_1.Roles(role_type_1.RoleType.ADMIN),
        common_1.HttpCode(common_1.HttpStatus.OK),
        swagger_1.ApiResponse({
            status: common_1.HttpStatus.OK,
            description: 'Get users list',
            type: UsersPageDto_1.UsersPageDto
        }),
        __param(0, common_1.Query(new common_1.ValidationPipe({ transform: true })))
    ], UserController.prototype, "getUsers");
    UserController = __decorate([
        common_1.Controller('users'),
        swagger_1.ApiTags('users'),
        common_1.UseGuards(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
        common_1.UseInterceptors(auth_user_interceptor_service_1.AuthUserInterceptor),
        swagger_1.ApiBearerAuth()
    ], UserController);
    return UserController;
}());
exports.UserController = UserController;
