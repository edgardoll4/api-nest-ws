"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Webhookontroller = void 0;
const common_1 = require("@nestjs/common");
const whatsapp_service_1 = require("./whatsapp.service");
const create_chat_dto_1 = require("./dto/create-chat.dto");
const swagger_1 = require("@nestjs/swagger");
let Webhookontroller = class Webhookontroller {
    constructor(chatService) {
        this.chatService = chatService;
    }
    createWebhook(data) {
        console.log("este es el objeto", JSON.stringify(data));
        let createProductDto = new create_chat_dto_1.CreateChatDto();
        if (data.object) {
            if (data.entry &&
                data.entry[0].changes &&
                data.entry[0].changes[0] &&
                data.entry[0].changes[0].value.messages &&
                data.entry[0].changes[0].value.messages[0]) {
                console.log("entro en el if");
                let phone_number_id = data.entry[0].changes[0].value.metadata.phone_number_id;
                let from = data.entry[0].changes[0].value.messages[0].from;
                let type = data.entry[0].changes[0].value.messages[0].type;
                let name = data.entry[0].changes[0].value.contacts[0].profile.name;
                let timestamp = data.entry[0].changes[0].value.messages[0].timestamp;
                let watsapp_id = data.entry[0].changes[0].value.messages[0].id;
                if (type == "text")
                    createProductDto.text = data.entry[0].changes[0].value.messages[0].text.body;
                if (type == "button") {
                    console.log("la data es ", JSON.stringify(data));
                    createProductDto.text = data.entry[0].changes[0].value.messages[0].button.text;
                    createProductDto.payload = data.entry[0].changes[0].value.messages[0].button.payload;
                    this.chatService.updateReservation(createProductDto.payload, from, createProductDto.text);
                }
                createProductDto.from = from;
                createProductDto.phone_number_id = phone_number_id;
                createProductDto.name = name;
                createProductDto.type = type;
                createProductDto.timestamp = timestamp;
                createProductDto.watsapp_id = watsapp_id;
                console.log(" ########### Se guarada el objeto ", JSON.stringify(createProductDto));
                return this.chatService.createWebhook(createProductDto);
            }
        }
        return;
    }
    authWebhook(res, mode, token, challenge) {
        console.log("datos por parametro ", mode, token, challenge);
        const verify_token = process.env.VERIFY_TOKEN;
        if (mode && token) {
            if (mode === "subscribe" && token === verify_token) {
                console.log("WEBHOOK_VERIFIED");
                res.status(200).send(challenge);
            }
            else {
                throw new common_1.ForbiddenException();
            }
        }
        res.status(400).send("Los datos no son validos");
    }
    testUpdate(res, token, body) {
        console.log("datos por parametro: ", token);
        console.log("datos por body: ", body);
        let response = this.chatService.updateReservation(token, body.phone_number, body.text);
        console.log(response);
        res.status(201).send(response);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], Webhookontroller.prototype, "createWebhook", null);
__decorate([
    (0, common_1.Get)('webhook'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('hub.mode')),
    __param(2, (0, common_1.Query)('hub.verify_token')),
    __param(3, (0, common_1.Query)('hub.challenge')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", void 0)
], Webhookontroller.prototype, "authWebhook", null);
__decorate([
    (0, common_1.Post)('test'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('token')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], Webhookontroller.prototype, "testUpdate", null);
Webhookontroller = __decorate([
    (0, swagger_1.ApiTags)('Webhooks'),
    (0, common_1.Controller)('webhook'),
    __metadata("design:paramtypes", [whatsapp_service_1.WhatsappService])
], Webhookontroller);
exports.Webhookontroller = Webhookontroller;
//# sourceMappingURL=webhooks.controller.js.map