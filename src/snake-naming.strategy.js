"use strict";
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
exports.SnakeNamingStrategy = void 0;
var typeorm_1 = require("typeorm");
var StringUtils_1 = require("typeorm/util/StringUtils");
var SnakeNamingStrategy = /** @class */ (function (_super) {
    __extends(SnakeNamingStrategy, _super);
    function SnakeNamingStrategy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SnakeNamingStrategy.prototype.tableName = function (className, customName) {
        return customName ? customName : StringUtils_1.snakeCase(className);
    };
    SnakeNamingStrategy.prototype.columnName = function (propertyName, customName, embeddedPrefixes) {
        return (StringUtils_1.snakeCase(embeddedPrefixes.join('_')) +
            (customName ? customName : StringUtils_1.snakeCase(propertyName)));
    };
    SnakeNamingStrategy.prototype.relationName = function (propertyName) {
        return StringUtils_1.snakeCase(propertyName);
    };
    SnakeNamingStrategy.prototype.joinColumnName = function (relationName, referencedColumnName) {
        return StringUtils_1.snakeCase(relationName + '_' + referencedColumnName);
    };
    SnakeNamingStrategy.prototype.joinTableName = function (firstTableName, secondTableName, firstPropertyName, _secondPropertyName) {
        return StringUtils_1.snakeCase(firstTableName +
            '_' +
            firstPropertyName.replace(/\./gi, '_') +
            '_' +
            secondTableName);
    };
    SnakeNamingStrategy.prototype.joinTableColumnName = function (tableName, propertyName, columnName) {
        return StringUtils_1.snakeCase(tableName + '_' + (columnName ? columnName : propertyName));
    };
    SnakeNamingStrategy.prototype.classTableInheritanceParentColumnName = function (parentTableName, parentTableIdPropertyName) {
        return StringUtils_1.snakeCase(parentTableName + "_" + parentTableIdPropertyName);
    };
    return SnakeNamingStrategy;
}(typeorm_1.DefaultNamingStrategy));
exports.SnakeNamingStrategy = SnakeNamingStrategy;
