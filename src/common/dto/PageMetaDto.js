"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PageMetaDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var PageMetaDto = /** @class */ (function () {
    function PageMetaDto(_a) {
        var pageOptionsDto = _a.pageOptionsDto, itemCount = _a.itemCount;
        this.page = pageOptionsDto.page;
        this.take = pageOptionsDto.take;
        this.itemCount = itemCount;
        this.pageCount = Math.ceil(this.itemCount / this.take);
        this.hasPreviousPage = this.page > 1;
        this.hasNextPage = this.page < this.pageCount;
    }
    __decorate([
        swagger_1.ApiProperty()
    ], PageMetaDto.prototype, "page");
    __decorate([
        swagger_1.ApiProperty()
    ], PageMetaDto.prototype, "take");
    __decorate([
        swagger_1.ApiProperty()
    ], PageMetaDto.prototype, "itemCount");
    __decorate([
        swagger_1.ApiProperty()
    ], PageMetaDto.prototype, "pageCount");
    __decorate([
        swagger_1.ApiProperty()
    ], PageMetaDto.prototype, "hasPreviousPage");
    __decorate([
        swagger_1.ApiProperty()
    ], PageMetaDto.prototype, "hasNextPage");
    return PageMetaDto;
}());
exports.PageMetaDto = PageMetaDto;
