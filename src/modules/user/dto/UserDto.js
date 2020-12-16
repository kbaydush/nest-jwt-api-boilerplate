'use strict';
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var role_type_1 = require("../../../common/constants/role-type");
var AbstractDto_1 = require("../../../common/dto/AbstractDto");
var UserDto = /** @class */ (function (_super) {
    __extends(UserDto, _super);
    function UserDto(user) {
        var _this = _super.call(this, user) || this;
        _this.firstName = user.firstName;
        _this.lastName = user.lastName;
        _this.role = user.role;
        _this.email = user.email;
        _this.avatar = user.avatar;
        _this.phone = user.phone;
        return _this;
    }
    __decorate([
        swagger_1.ApiPropertyOptional()
    ], UserDto.prototype, "firstName");
    __decorate([
        swagger_1.ApiPropertyOptional()
    ], UserDto.prototype, "lastName");
    __decorate([
        swagger_1.ApiPropertyOptional()
    ], UserDto.prototype, "username");
    __decorate([
        swagger_1.ApiPropertyOptional({ "enum": role_type_1.RoleType })
    ], UserDto.prototype, "role");
    __decorate([
        swagger_1.ApiPropertyOptional()
    ], UserDto.prototype, "email");
    __decorate([
        swagger_1.ApiPropertyOptional()
    ], UserDto.prototype, "avatar");
    __decorate([
        swagger_1.ApiPropertyOptional()
    ], UserDto.prototype, "phone");
    return UserDto;
}(AbstractDto_1.AbstractDto));
exports.UserDto = UserDto;
