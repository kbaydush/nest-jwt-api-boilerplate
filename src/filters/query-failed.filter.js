"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.QueryFailedFilter = void 0;
var common_1 = require("@nestjs/common");
var http_1 = require("http");
var typeorm_1 = require("typeorm");
var constraint_errors_1 = require("./constraint-errors");
var QueryFailedFilter = /** @class */ (function () {
    function QueryFailedFilter(reflector) {
        this.reflector = reflector;
    }
    QueryFailedFilter.prototype["catch"] = function (exception, host) {
        var ctx = host.switchToHttp();
        var response = ctx.getResponse();
        var errorMessage = constraint_errors_1.constraintErrors[exception.constraint];
        var status = exception.constraint && exception.constraint.startsWith('UQ')
            ? common_1.HttpStatus.CONFLICT
            : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        response.status(status).json({
            statusCode: status,
            error: http_1.STATUS_CODES[status],
            message: errorMessage
        });
    };
    QueryFailedFilter = __decorate([
        common_1.Catch(typeorm_1.QueryFailedError)
    ], QueryFailedFilter);
    return QueryFailedFilter;
}());
exports.QueryFailedFilter = QueryFailedFilter;
