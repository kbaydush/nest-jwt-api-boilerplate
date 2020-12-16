'use strict';
exports.__esModule = true;
exports.AbstractDto = void 0;
var AbstractDto = /** @class */ (function () {
    function AbstractDto(entity) {
        this.id = entity.id;
        this.createdAt = entity.createdAt;
        this.updatedAt = entity.updatedAt;
    }
    return AbstractDto;
}());
exports.AbstractDto = AbstractDto;
