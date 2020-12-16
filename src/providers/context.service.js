"use strict";
exports.__esModule = true;
exports.ContextService = void 0;
var requestContext = require("request-context");
var ContextService = /** @class */ (function () {
    function ContextService() {
    }
    ContextService.get = function (key) {
        return requestContext.get(ContextService._getKeyWithNamespace(key));
    };
    ContextService.set = function (key, value) {
        requestContext.set(ContextService._getKeyWithNamespace(key), value);
    };
    ContextService._getKeyWithNamespace = function (key) {
        return ContextService._nameSpace + "." + key;
    };
    ContextService._nameSpace = 'request';
    return ContextService;
}());
exports.ContextService = ContextService;
