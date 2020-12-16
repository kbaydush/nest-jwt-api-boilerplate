"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MathController = void 0;
var common_1 = require("@nestjs/common");
var microservices_1 = require("@nestjs/microservices");
var MathController = /** @class */ (function () {
    function MathController() {
    }
    MathController.prototype.call = function () {
        var pattern = { cmd: 'sum' };
        var data = [1, 2, 3, 4, 5];
        return this.client.send(pattern, data);
    };
    MathController.prototype.sum = function (data) {
        return (data || []).reduce(function (a, b) { return a + b; });
    };
    __decorate([
        microservices_1.Client({ transport: microservices_1.Transport.TCP, options: { port: 4000 } })
    ], MathController.prototype, "client");
    __decorate([
        common_1.Get('sum')
    ], MathController.prototype, "call");
    __decorate([
        microservices_1.MessagePattern({ cmd: 'sum' })
    ], MathController.prototype, "sum");
    MathController = __decorate([
        common_1.Controller('math')
    ], MathController);
    return MathController;
}());
exports.MathController = MathController;
