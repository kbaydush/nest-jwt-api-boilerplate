"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthUserInterceptor = void 0;
var common_1 = require("@nestjs/common");
var auth_service_1 = require("../modules/auth/auth.service");
var AuthUserInterceptor = /** @class */ (function () {
    function AuthUserInterceptor() {
    }
    AuthUserInterceptor.prototype.intercept = function (context, next) {
        var request = context.switchToHttp().getRequest();
        var user = request.user;
        auth_service_1.AuthService.setAuthUser(user);
        return next.handle();
    };
    AuthUserInterceptor = __decorate([
        common_1.Injectable()
    ], AuthUserInterceptor);
    return AuthUserInterceptor;
}());
exports.AuthUserInterceptor = AuthUserInterceptor;
