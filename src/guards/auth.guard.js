"use strict";
exports.__esModule = true;
exports.AuthGuard = void 0;
var passport_1 = require("@nestjs/passport");
// This should be used as guard class
// eslint-disable-next-line @typescript-eslint/naming-convention
exports.AuthGuard = passport_1.AuthGuard('jwt');
