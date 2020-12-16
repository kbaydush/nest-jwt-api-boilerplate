"use strict";
exports.__esModule = true;
exports.setupSwagger = void 0;
var swagger_1 = require("@nestjs/swagger");
function setupSwagger(app) {
    var options = new swagger_1.DocumentBuilder()
        .setTitle('API')
        .setVersion('0.0.1')
        .addBearerAuth()
        .build();
    var document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('documentation', app, document);
}
exports.setupSwagger = setupSwagger;
