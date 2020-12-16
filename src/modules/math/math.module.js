"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MathModule = void 0;
var common_1 = require("@nestjs/common");
var math_controller_1 = require("./math.controller");
var MathModule = /** @class */ (function () {
    function MathModule() {
    }
    MathModule = __decorate([
        common_1.Module({
            controllers: [math_controller_1.MathController]
        })
    ], MathModule);
    return MathModule;
}());
exports.MathModule = MathModule;
