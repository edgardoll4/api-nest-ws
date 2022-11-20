"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsModule = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const whatsapp_service_1 = require("./whatsapp.service");
const whatsapp_controller_1 = require("./whatsapp.controller");
const chat_entity_1 = require("./entities/chat.entity");
const axios_1 = require("@nestjs/axios");
const httpService_config_1 = require("../httpService.config");
const webhooks_controller_1 = require("./webhooks.controller");
const api_ws_entity_1 = require("./entities/api_ws.entity");
const log_fail_entity_1 = require("./entities/log-fail.entity");
let ProductsModule = class ProductsModule {
};
ProductsModule = __decorate([
    (0, common_1.Module)({
        controllers: [whatsapp_controller_1.WhatsappController, webhooks_controller_1.Webhookontroller],
        providers: [whatsapp_service_1.WhatsappService],
        imports: [axios_1.HttpModule.registerAsync({
                useClass: httpService_config_1.HttpConfigService,
            }),
            typeorm_1.TypeOrmModule.forFeature([chat_entity_1.Chat, api_ws_entity_1.Apiws, log_fail_entity_1.LogFail])
        ]
    })
], ProductsModule);
exports.ProductsModule = ProductsModule;
//# sourceMappingURL=whastapp.module.js.map