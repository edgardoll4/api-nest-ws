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
exports.WhatsappController = void 0;
const common_1 = require("@nestjs/common");
const whatsapp_service_1 = require("./whatsapp.service");
const pagination_dto_1 = require("../common/dtos/pagination.dto");
const whatsapp_cloud_api_request_dto_1 = require("../common/whatsapp-cloud-api-request.dto");
const swagger_1 = require("@nestjs/swagger");
const confirmation_dto_1 = require("./dto/confirmation.dto");
const notification_dto_1 = require("./dto/notification.dto");
const create_api_ws_dto_1 = require("./dto/create-api-ws.dto");
let WhatsappController = class WhatsappController {
    constructor(chatService) {
        this.chatService = chatService;
    }
    notificationsWhatsapp(request, response) {
        const { phoneNumber, slug, date, businessName } = request;
        let first_chart = slug.slice(0, 1);
        let templateWhatsappApiRequest;
        templateWhatsappApiRequest = whatsapp_cloud_api_request_dto_1.dataNotificationApiRequest;
        templateWhatsappApiRequest.template.name = process.env.TEMPLATE_RESERVATION_NOTIFICATION;
        templateWhatsappApiRequest.to = phoneNumber;
        templateWhatsappApiRequest.template.components[0].parameters[0].text = date;
        templateWhatsappApiRequest.template.components[0].parameters[1].text = businessName;
        templateWhatsappApiRequest.template.components[1].parameters[0].text = (first_chart == '/') ? slug.slice(1) : slug;
        this.chatService.sendMessage(templateWhatsappApiRequest).then(res => {
            response.status(common_1.HttpStatus.CREATED).json(res);
        }).catch((err) => {
            response.status(common_1.HttpStatus.BAD_REQUEST).json(err);
        });
    }
    confirmationsWhatsapp(request, response) {
        const { phoneNumber, customerName, date, businessName, confirmToken, cancelToken, slug } = request;
        let templateWhatsappApiRequest;
        templateWhatsappApiRequest = whatsapp_cloud_api_request_dto_1.dataApiRequest;
        templateWhatsappApiRequest.template.name = process.env.TEMPLATE_RESERVATION_CONFIRMATION;
        templateWhatsappApiRequest.to = phoneNumber;
        templateWhatsappApiRequest.template.components[0].parameters[0].text = customerName;
        templateWhatsappApiRequest.template.components[0].parameters[1].text = date;
        templateWhatsappApiRequest.template.components[0].parameters[2].text = businessName;
        templateWhatsappApiRequest.template.components[1].parameters[0].payload = confirmToken;
        templateWhatsappApiRequest.template.components[2].parameters[0].payload = cancelToken;
        console.log("wsApiReques ", whatsapp_cloud_api_request_dto_1.dataApiRequest);
        console.log("link para reagendar ", slug);
        this.chatService.sendMessage(templateWhatsappApiRequest).then(res => {
            response.status(common_1.HttpStatus.CREATED).json(res);
        }).catch((err) => {
            response.status(common_1.HttpStatus.BAD_REQUEST).json(err);
        });
    }
    createRegisterApiWsDB(createRegisterApiWs) {
        return this.chatService.CreateRegisterApiWs(createRegisterApiWs);
    }
    findAll(paginationDto) {
        return this.chatService.findAll(paginationDto);
    }
    count(paginationDto) {
        return this.chatService.findLengthMessages();
    }
};
__decorate([
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Creado con éxito.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden. Token related.' }),
    (0, common_1.Post)('notificationsws'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [notification_dto_1.CreateNotificationDto, Object]),
    __metadata("design:returntype", void 0)
], WhatsappController.prototype, "notificationsWhatsapp", null);
__decorate([
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Creado con éxito.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden. Token related.' }),
    (0, common_1.Post)('confirmationsws'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [confirmation_dto_1.CreateConfirmationDto, Object]),
    __metadata("design:returntype", void 0)
], WhatsappController.prototype, "confirmationsWhatsapp", null);
__decorate([
    (0, common_1.Post)('registerapiwsclient'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_api_ws_dto_1.CreateApiWSDto]),
    __metadata("design:returntype", void 0)
], WhatsappController.prototype, "createRegisterApiWsDB", null);
__decorate([
    (0, common_1.Get)('list-messages'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], WhatsappController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('length-messages'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], WhatsappController.prototype, "count", null);
WhatsappController = __decorate([
    (0, swagger_1.ApiTags)('Chats'),
    (0, common_1.Controller)('chat'),
    __metadata("design:paramtypes", [whatsapp_service_1.WhatsappService])
], WhatsappController);
exports.WhatsappController = WhatsappController;
//# sourceMappingURL=whatsapp.controller.js.map