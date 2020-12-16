"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HttpExceptionFilter = void 0;
var common_1 = require("@nestjs/common");
var class_validator_1 = require("class-validator");
var http_1 = require("http");
var _ = require("lodash");
var HttpExceptionFilter = /** @class */ (function () {
    function HttpExceptionFilter(reflector) {
        this.reflector = reflector;
    }
    HttpExceptionFilter.prototype["catch"] = function (exception, host) {
        var ctx = host.switchToHttp();
        var response = ctx.getResponse();
        var statusCode = exception.getStatus();
        var r = exception.getResponse();
        if (_.isArray(r.message) && r.message[0] instanceof class_validator_1.ValidationError) {
            statusCode = common_1.HttpStatus.UNPROCESSABLE_ENTITY;
            var validationErrors = r.message;
            this._validationFilter(validationErrors);
        }
        r.statusCode = statusCode;
        r.error = http_1.STATUS_CODES[statusCode];
        response.status(statusCode).json(r);
    };
    HttpExceptionFilter.prototype._validationFilter = function (validationErrors) {
        for (var _i = 0, validationErrors_1 = validationErrors; _i < validationErrors_1.length; _i++) {
            var validationError = validationErrors_1[_i];
            for (var _a = 0, _b = Object.entries(validationError.constraints); _a < _b.length; _a++) {
                var _c = _b[_a], constraintKey = _c[0], constraint = _c[1];
                if (!constraint) {
                    // convert error message to error.fields.{key} syntax for i18n translation
                    validationError.constraints[constraintKey] =
                        'error.fields.' + _.snakeCase(constraintKey);
                }
            }
            if (!_.isEmpty(validationError.children)) {
                this._validationFilter(validationError.children);
            }
        }
    };
    HttpExceptionFilter = __decorate([
        common_1.Catch(common_1.BadRequestException)
    ], HttpExceptionFilter);
    return HttpExceptionFilter;
}());
exports.HttpExceptionFilter = HttpExceptionFilter;
