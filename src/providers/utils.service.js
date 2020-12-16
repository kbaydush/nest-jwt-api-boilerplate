"use strict";
exports.__esModule = true;
exports.UtilsService = void 0;
var bcrypt = require("bcrypt");
var _ = require("lodash");
var UtilsService = /** @class */ (function () {
    function UtilsService() {
    }
    UtilsService.toDto = function (model, entity, options) {
        if (_.isArray(entity)) {
            return entity.map(function (u) { return new model(u, options); });
        }
        return new model(entity, options);
    };
    /**
     * generate hash from password or string
     * @param {string} password
     * @returns {string}
     */
    UtilsService.generateHash = function (password) {
        return bcrypt.hashSync(password, 10);
    };
    /**
     * generate random string
     * @param length
     */
    UtilsService.generateRandomString = function (length) {
        return Math.random()
            .toString(36)
            .replace(/[^a-zA-Z0-9]+/g, '')
            .substr(0, length);
    };
    /**
     * validate text with hash
     * @param {string} password
     * @param {string} hash
     * @returns {Promise<boolean>}
     */
    UtilsService.validateHash = function (password, hash) {
        return bcrypt.compare(password, hash || '');
    };
    return UtilsService;
}());
exports.UtilsService = UtilsService;
