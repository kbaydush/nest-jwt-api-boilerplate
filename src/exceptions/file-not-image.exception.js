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
exports.FileNotImageException = void 0;
var common_1 = require("@nestjs/common");
var FileNotImageException = /** @class */ (function (_super) {
    __extends(FileNotImageException, _super);
    function FileNotImageException(message, error) {
        var _this = this;
        if (message) {
            _this = _super.call(this, message, error) || this;
        }
        else {
            _this = _super.call(this, 'error.file.not_image') || this;
        }
        return _this;
    }
    return FileNotImageException;
}(common_1.BadRequestException));
exports.FileNotImageException = FileNotImageException;
