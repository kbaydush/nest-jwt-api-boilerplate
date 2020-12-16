"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
require("./boilerplate.polyfill");
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var nestjs_i18n_1 = require("nestjs-i18n");
var path = require("path");
var middlewares_1 = require("./middlewares");
var auth_module_1 = require("./modules/auth/auth.module");
var math_module_1 = require("./modules/math/math.module");
var user_module_1 = require("./modules/user/user.module");
var config_service_1 = require("./shared/services/config.service");
var shared_module_1 = require("./shared/shared.module");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule.prototype.configure = function (consumer) {
        consumer.apply(middlewares_1.contextMiddleware).forRoutes('*');
    };
    AppModule = __decorate([
        common_1.Module({
            imports: [
                auth_module_1.AuthModule,
                user_module_1.UserModule,
                math_module_1.MathModule,
                typeorm_1.TypeOrmModule.forRootAsync({
                    imports: [shared_module_1.SharedModule],
                    useFactory: function (configService) {
                        return configService.typeOrmConfig;
                    },
                    inject: [config_service_1.ConfigService]
                }),
                nestjs_i18n_1.I18nModule.forRootAsync({
                    useFactory: function (configService) { return ({
                        fallbackLanguage: configService.fallbackLanguage,
                        parserOptions: {
                            path: path.join(__dirname, '/i18n/'),
                            watch: configService.isDevelopment
                        }
                    }); },
                    imports: [shared_module_1.SharedModule],
                    parser: nestjs_i18n_1.I18nJsonParser,
                    inject: [config_service_1.ConfigService]
                }),
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
