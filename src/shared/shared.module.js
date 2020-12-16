"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.SharedModule = void 0;
var common_1 = require("@nestjs/common");
var jwt_1 = require("@nestjs/jwt");
var aws_s3_service_1 = require("./services/aws-s3.service");
var config_service_1 = require("./services/config.service");
var generator_service_1 = require("./services/generator.service");
var validator_service_1 = require("./services/validator.service");
var providers = [
    config_service_1.ConfigService,
    validator_service_1.ValidatorService,
    aws_s3_service_1.AwsS3Service,
    generator_service_1.GeneratorService,
];
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        common_1.Global(),
        common_1.Module({
            providers: providers,
            imports: [
                common_1.HttpModule,
                jwt_1.JwtModule.registerAsync({
                    useFactory: function (configService) { return ({
                        secretOrPrivateKey: configService.get('JWT_SECRET_KEY')
                    }); },
                    inject: [config_service_1.ConfigService]
                }),
            ],
            exports: __spreadArrays(providers, [common_1.HttpModule, jwt_1.JwtModule])
        })
    ], SharedModule);
    return SharedModule;
}());
exports.SharedModule = SharedModule;
