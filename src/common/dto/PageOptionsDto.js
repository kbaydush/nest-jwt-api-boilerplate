"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PageOptionsDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var order_1 = require("../constants/order");
var PageOptionsDto = /** @class */ (function () {
    function PageOptionsDto() {
        this.order = order_1.Order.ASC;
        this.page = 1;
        this.take = 10;
    }
    Object.defineProperty(PageOptionsDto.prototype, "skip", {
        get: function () {
            return (this.page - 1) * this.take;
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        swagger_1.ApiPropertyOptional({
            "enum": order_1.Order,
            "default": order_1.Order.ASC
        }),
        class_validator_1.IsEnum(order_1.Order),
        class_validator_1.IsOptional()
    ], PageOptionsDto.prototype, "order");
    __decorate([
        swagger_1.ApiPropertyOptional({
            minimum: 1,
            "default": 1
        }),
        class_transformer_1.Type(function () { return Number; }),
        class_validator_1.IsInt(),
        class_validator_1.Min(1),
        class_validator_1.IsOptional()
    ], PageOptionsDto.prototype, "page");
    __decorate([
        swagger_1.ApiPropertyOptional({
            minimum: 1,
            maximum: 50,
            "default": 10
        }),
        class_transformer_1.Type(function () { return Number; }),
        class_validator_1.IsInt(),
        class_validator_1.Min(10),
        class_validator_1.Max(50),
        class_validator_1.IsOptional()
    ], PageOptionsDto.prototype, "take");
    __decorate([
        swagger_1.ApiPropertyOptional(),
        class_validator_1.IsString(),
        class_validator_1.IsNotEmpty(),
        class_validator_1.IsOptional()
    ], PageOptionsDto.prototype, "q");
    return PageOptionsDto;
}());
exports.PageOptionsDto = PageOptionsDto;
