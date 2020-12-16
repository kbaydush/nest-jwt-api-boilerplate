"use strict";
exports.__esModule = true;
exports.contextMiddleware = void 0;
var requestContext = require("request-context");
exports.contextMiddleware = requestContext.middleware('request');
