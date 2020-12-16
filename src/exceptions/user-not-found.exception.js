'use strict';
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.UserNotFoundException = void 0;
var common_1 = require("@nestjs/common");
var UserNotFoundException = /** @class */ (function (_super) {
    __extends(UserNotFoundException, _super);
    function UserNotFoundException(error) {
        return _super.call(this, 'error.user_not_found', error) || this;
    }
    return UserNotFoundException;
}(common_1.NotFoundException));
exports.UserNotFoundException = UserNotFoundException;
