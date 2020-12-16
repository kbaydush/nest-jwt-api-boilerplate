"use strict";
exports.__esModule = true;
exports.ApiFile = void 0;
/* eslint-disable @typescript-eslint/naming-convention */
var swagger_1 = require("@nestjs/swagger");
exports.ApiFile = function (fileName, options) {
    if (fileName === void 0) { fileName = 'file'; }
    if (options === void 0) { options = {}; }
    return function (target, propertyKey, descriptor) {
        var _a;
        var _b = options.isRequired, isRequired = _b === void 0 ? false : _b, _c = options.isArray, isArray = _c === void 0 ? false : _c;
        var fileSchema = {
            type: 'string',
            format: 'binary'
        };
        if (isArray) {
            fileSchema = {
                type: 'array',
                items: fileSchema
            };
        }
        return swagger_1.ApiBody({
            required: isRequired,
            schema: {
                type: 'object',
                properties: (_a = {},
                    _a[fileName] = fileSchema,
                    _a)
            }
        })(target, propertyKey, descriptor);
    };
};
