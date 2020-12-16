'use strict';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoginPayloadDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var UserDto_1 = require("../../user/dto/UserDto");
var TokenPayloadDto_1 = require("./TokenPayloadDto");
var LoginPayloadDto = /** @class */ (function () {
    function LoginPayloadDto(user, token) {
        this.user = user;
        this.token = token;
    }
    __decorate([
        swagger_1.ApiProperty({ type: UserDto_1.UserDto })
    ], LoginPayloadDto.prototype, "user");
    __decorate([
        swagger_1.ApiProperty({ type: TokenPayloadDto_1.TokenPayloadDto })
    ], LoginPayloadDto.prototype, "token");
    return LoginPayloadDto;
}());
exports.LoginPayloadDto = LoginPayloadDto;
