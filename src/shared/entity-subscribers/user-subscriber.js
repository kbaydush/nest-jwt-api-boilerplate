"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserSubscriber = void 0;
var typeorm_1 = require("typeorm");
var user_entity_1 = require("../../modules/user/user.entity");
var utils_service_1 = require("../../providers/utils.service");
var UserSubscriber = /** @class */ (function () {
    function UserSubscriber() {
    }
    UserSubscriber.prototype.listenTo = function () {
        return user_entity_1.UserEntity;
    };
    UserSubscriber.prototype.beforeInsert = function (event) {
        if (event.entity.password) {
            event.entity.password = utils_service_1.UtilsService.generateHash(event.entity.password);
        }
    };
    UserSubscriber.prototype.beforeUpdate = function (event) {
        if (event.entity.password !== event.databaseEntity.password) {
            event.entity.password = utils_service_1.UtilsService.generateHash(event.entity.password);
        }
    };
    UserSubscriber = __decorate([
        typeorm_1.EventSubscriber()
    ], UserSubscriber);
    return UserSubscriber;
}());
exports.UserSubscriber = UserSubscriber;
