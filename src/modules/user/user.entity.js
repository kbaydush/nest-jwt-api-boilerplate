"use strict";
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
exports.UserEntity = void 0;
var typeorm_1 = require("typeorm");
var abstract_entity_1 = require("../../common/abstract.entity");
var role_type_1 = require("../../common/constants/role-type");
var UserDto_1 = require("./dto/UserDto");
var UserEntity = /** @class */ (function (_super) {
    __extends(UserEntity, _super);
    function UserEntity() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dtoClass = UserDto_1.UserDto;
        return _this;
    }
    __decorate([
        typeorm_1.Column({ nullable: true })
    ], UserEntity.prototype, "firstName");
    __decorate([
        typeorm_1.Column({ nullable: true })
    ], UserEntity.prototype, "lastName");
    __decorate([
        typeorm_1.Column({ type: 'enum', "enum": role_type_1.RoleType, "default": role_type_1.RoleType.USER })
    ], UserEntity.prototype, "role");
    __decorate([
        typeorm_1.Column({ unique: true, nullable: true })
    ], UserEntity.prototype, "email");
    __decorate([
        typeorm_1.Column({ nullable: true })
    ], UserEntity.prototype, "password");
    __decorate([
        typeorm_1.Column({ nullable: true })
    ], UserEntity.prototype, "phone");
    __decorate([
        typeorm_1.Column({ nullable: true })
    ], UserEntity.prototype, "avatar");
    UserEntity = __decorate([
        typeorm_1.Entity({ name: 'users' })
    ], UserEntity);
    return UserEntity;
}(abstract_entity_1.AbstractEntity));
exports.UserEntity = UserEntity;
