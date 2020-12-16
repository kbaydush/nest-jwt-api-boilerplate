'use strict';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserRegisterDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var typeorm_1 = require("typeorm");
var UserRegisterDto = /** @class */ (function () {
    function UserRegisterDto() {
    }
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsNotEmpty(),
        swagger_1.ApiProperty()
    ], UserRegisterDto.prototype, "firstName");
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsNotEmpty(),
        swagger_1.ApiProperty()
    ], UserRegisterDto.prototype, "lastName");
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsEmail(),
        class_validator_1.IsNotEmpty(),
        swagger_1.ApiProperty()
    ], UserRegisterDto.prototype, "email");
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.MinLength(6),
        swagger_1.ApiProperty({ minLength: 6 })
    ], UserRegisterDto.prototype, "password");
    __decorate([
        typeorm_1.Column(),
        class_validator_1.IsPhoneNumber('ZZ'),
        class_validator_1.IsOptional(),
        swagger_1.ApiProperty()
    ], UserRegisterDto.prototype, "phone");
    return UserRegisterDto;
}());
exports.UserRegisterDto = UserRegisterDto;
