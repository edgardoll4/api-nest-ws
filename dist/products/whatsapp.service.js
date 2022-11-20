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
exports.WhatsappService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const chat_entity_1 = require("./entities/chat.entity");
const uuid_1 = require("uuid");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const dayjs = require("dayjs");
const api_ws_entity_1 = require("./entities/api_ws.entity");
const log_fail_entity_1 = require("./entities/log-fail.entity");
let WhatsappService = class WhatsappService {
    constructor(chatRepository, httpService, apiWsRepository, logFailRepository) {
        this.chatRepository = chatRepository;
        this.httpService = httpService;
        this.apiWsRepository = apiWsRepository;
        this.logFailRepository = logFailRepository;
        this.logger = new common_1.Logger('WhatsappService');
        this.baseUrl = process.env.BASE_URL_PROD;
        this.urlPlanner = process.env.URLPLANNER;
        this.request = {
            "messaging_product": "whatsapp",
            "preview_url": true,
            "recipient_type": "individual",
            "to": "56957858732",
            "type": "text",
            "text": {
                "body": "para mensajes"
            }
        };
    }
    async CreateRegisterApiWs(createApiWsDot) {
        try {
            const apiWs = this.apiWsRepository.create(createApiWsDot);
            apiWs.create_data = Date.now().toString();
            await this.apiWsRepository.save(apiWs);
            console.log(apiWs);
            return { apiWs };
        }
        catch (error) {
            this.handleDBExceptions(error);
        }
    }
    async CreateRegisterLogFail(createLogFaileDto) {
        try {
            console.log('Ingresa a guardar error');
            const logFail = this.logFailRepository.create(createLogFaileDto);
            logFail.create_data = Date.now().toString();
            await this.logFailRepository.save(logFail);
            console.log('Datos del error guardados');
        }
        catch (error) {
            this.handleDBExceptions(error);
        }
    }
    async sendMessage(request) {
        const { data } = await (0, rxjs_1.firstValueFrom)(this.httpService.post(this.baseUrl, request));
        console.log(data);
        return data;
    }
    async updateReservation(token, phone_number, text_message) {
        console.log("token recibido ", token);
        this.request.to = phone_number;
        let body = {
            date: dayjs().format("YYYY-MM-DD HH:mm")
        };
        console.log("body ", body);
        let data;
        try {
            this.httpService.put(`${this.urlPlanner}${token}`, body).subscribe(data => {
                console.log("####################### Respuesta exitosa de planner");
                let retMessage = data.data.retMessage;
                let retCode = data.data.retCode;
                let retObject = data.data.retObject;
                console.log("########### Status: ", data.status);
                console.log("########### StatusText: ", data.statusText);
                console.log("########### retMessage: ", retMessage);
                console.log("########### retCode: ", retCode);
                console.log("########### retObject: ", retObject);
                if (data.statusText === "OK" && retMessage === "1") {
                    this.request.text.body = "Su reserva ha sido confirmada con éxito. Gracias por su respuesta.";
                    console.log("########### Respuesta de planner OK: Accept => ", token);
                }
                if (data.statusText === "OK" && retMessage === "3") {
                    this.request.text.body = "Su reserva ha sido cancelada con éxito. Gracias por su respuesta.";
                    console.log("########### Respuesta de planner OK: Cancel => ", token);
                }
                if (data.statusText === "Bad Request" && retMessage === "9") {
                    this.request.text.body = 'Lo sentimos pero ya no puede cancelar la reserva, debido a que el tiempo de cancelación es de ', retObject.time, ' horas antes.';
                    console.log("########### Respuesta de planner OK: Cancel => ", token);
                }
                this.httpService.post(this.baseUrl, this.request).subscribe(res => {
                    console.log("########### Respuesta exitosa del whatsapp", res.statusText);
                }, (error) => {
                    console.log("########### Ocurrio un error al enviar el mensaje por whatsapp ", error);
                });
            }, async (error) => {
                let errorResponse = error.response;
                console.log("####################### Error de solicitud ###################### ");
                if (errorResponse.status === 401 && errorResponse.statusText === "Unauthorized") {
                    console.log("########## Error de solicitud: Unauthorized => ", token);
                    this.request.text.body = "Su solicitud no puede ser procesada. Por usar un token invalido. ";
                }
                if (errorResponse.status === 401 && errorResponse.statusText === "Not Acceptable") {
                    console.log("########## Error de solicitud! Not Acceptable: Token => ", token);
                    this.request.text.body = "Su solicitud no ha sido procesada. Su reserva ya ha pasado.";
                }
                if (errorResponse.statusText === "Not Found" && errorResponse.status === 404) {
                    console.log("########## Error de solicitud! Not Found Token => ", token);
                    this.request.text.body = "Lo sentimos esta accion ya no valida.";
                }
                if (errorResponse.statusText === "Bad Request" && errorResponse.data.retMessage === "9") {
                    console.log("########## Respuesta de planner OK: Cancel => ", token);
                    this.request.text.body = 'Lo sentimos pero ya no puede cancelar la reserva, debido a que el tiempo de cancelación es de ' + errorResponse.data.retObject.time + ' horas antes.';
                }
                console.log("######## Status: ", errorResponse.status.toString());
                console.log("######## Data: ", JSON.stringify(errorResponse.data));
                console.log("######## Status Text: ", errorResponse.statusText);
                console.log("######## ConfigMethod: ", errorResponse.config.method);
                console.log("######## ConfigURL: ", errorResponse.config.url);
                console.log("######## ConfigData: (body date) ", JSON.stringify(errorResponse.config.data));
                console.log("######## Texto recibido: ", text_message);
                const logFail = {
                    "status_code": errorResponse.status.toString(),
                    "status_text": errorResponse.statusText,
                    "response": JSON.stringify(errorResponse.data),
                    "token": token,
                    "text_message": text_message,
                    "phone_number": phone_number.toString(),
                    "config_method": errorResponse.config.method,
                    "config_data": errorResponse.config.data,
                };
                await this.CreateRegisterLogFail(logFail);
                await this.sendEmailError(logFail);
                this.httpService.post(this.baseUrl, this.request).subscribe(res => {
                    console.log("respuesta exitosa del whatsapp", res.statusText);
                }, (error) => {
                    console.log("ocurrio un error al enviar el mensaje por whatsapp ", error);
                });
            });
        }
        catch (error) {
            throw new common_1.BadRequestException();
        }
        return data;
    }
    async sendEmailError(data) {
        const ret = (JSON.parse(data.response)) ? JSON.parse(data.response) : data.response;
        const notFounf = "Dato no recibido";
        const anho = new Date().getFullYear();
        const emailMessage = `
      <div style="margin: 0 0 7px border-radius: 15px 50px 30px border: 1px solid transparent; ">
        <table style="max-width: 800px; padding: 10px; margin:0 auto; border-collapse: collapse; border-radius: 8px;">
    
          <tr>
            <td style="padding: 0">
              <img style="padding: 0; display: block; object-fit:cover; object-position: 50% 50%" src="https://ithemes.com/wp-content/uploads/2022/08/There-Has-Been-a-Critical-Error-on-Your-Website-1024x537.png" width="100%">
            </td>
          </tr>
          
          <tr>
            <td style="background-color: #f3f3f3">
              <div style="color: #1a1a1a; margin: 4% 10% 2%; font-family: sans-serif">
                <h2 style="color: #e67e22; margin: 0 0 7px">¡Datos del error!</h2>
                <p style="margin: 2px; font-size: 15px">Ha ocurrido un error al enviar el token a la API de planner.</p><br>

                <p style="margin: 2px; font-size: 15px"><h3>Los siguientes datos han sido guardados en la bade de datos:</h3></p>
                <p style="margin: 2px; font-size: 15px"><strong>Status: </strong> ${data.status_code} </p>
                <p style="margin: 2px; font-size: 15px"><strong>Status Message: </strong> ${data.status_text} </p>

                <p style="margin: 2px; font-size: 15px"> <h3 style="color: #e67e22; margin: 0 0 7px"><strong>Mensaje enviado por el usuario.</strong></h3> </p>

                <ul style="font-size: 15px;  margin: 10px 0">
                  <li><strong> Texto recibido: </strong> ${data.text_message || notFounf} </li>
                  <li><strong> Token recibido: </strong> ${data.token || notFounf} </li>
                </ul>

                <p style="margin: 2px; font-size: 15px"> <h3 style="color: #e67e22; margin: 0 0 7px"><strong>Respuesta de petición a Planner.</strong></h3> </p>
                
                <ul style="font-size: 15px;  margin: 10px 0">

                  <li><strong> retCode: </strong> ${ret.retCode || notFounf} </li>
                  <li><strong> retMessage: </strong> ${ret.retMessage || notFounf} </li>
                  <li><strong> retObject: </strong> ${JSON.stringify(ret.retObject) || notFounf} </li>
                </ul>

                <p style="margin: 2px; font-size: 15px"><strong>Token: </strong> ${data.token} </p>
                <p style="margin: 2px; font-size: 15px"><strong>Phone Number: </strong> +${data.phone_number} </p>
                <p style="margin: 2px; font-size: 15px"><strong>Method: </strong> ${data.config_method} </p>
                <p style="margin: 2px; font-size: 15px"><strong>Date (UTC+0): </strong> ${JSON.parse(data.config_data).date} </p>
                <p style="color: #b3b3b3; font-size: 12px; text-align: center;margin: 30px 0 0">API-Email & API-Ws &copy; ${anho}</p>
              </div>
            </td>
          </tr>
        </table>
      </div>
    `;
        const emailRemitente = {
            "to": process.env.EMAIL_TO,
            "subject": "Error de solicitud token: " + data.token,
            "html": emailMessage
        };
        try {
            const response = await this.httpService.post(process.env.EMAIL_URL, emailRemitente).subscribe(res => {
                console.log("Response of Api email: ", res.data);
            }, (error) => {
                console.log("Ocurrio un error con la peticion a la Api email: ", error);
            });
        }
        catch (error) {
            throw new common_1.BadRequestException();
        }
    }
    async create(createProductDto) {
        try {
            const product = this.chatRepository.create(createProductDto);
            await this.chatRepository.save(product);
            return product;
        }
        catch (error) {
            this.handleDBExceptions(error);
        }
    }
    async createWebhook(createProductDto) {
        try {
            let product = await this.chatRepository.findOneBy({ watsapp_id: createProductDto.watsapp_id });
            console.log("Se encontro una coincidencia: ", product);
            if (!product) {
                product = this.chatRepository.create(createProductDto);
                await this.chatRepository.save(product);
                return product;
            }
        }
        catch (error) {
            this.handleDBExceptions(error);
        }
    }
    async findLengthMessages() {
        const messagesLength = await this.chatRepository.count();
        return await messagesLength;
    }
    async findAll(paginationDto) {
        const { limit, offset } = paginationDto;
        const messages = await this.chatRepository.find({
            take: limit,
            skip: offset,
        });
        return messages.map(chatMessges => ({
            ...chatMessges,
        }));
    }
    async findOne(term) {
        let product;
        if ((0, uuid_1.validate)(term)) {
            product = await this.chatRepository.findOneBy({ id: term });
        }
        else {
            const queryBuilder = this.chatRepository.createQueryBuilder();
            product = await queryBuilder
                .where('UPPER(title) =:title or slug =:slug', {
                title: term.toUpperCase(),
                slug: term.toLowerCase(),
            }).getOne();
        }
        if (!product)
            throw new common_1.NotFoundException(`Product with ${term} not found`);
        return product;
    }
    async update(id, updateProductDto) {
        const product = await this.chatRepository.preload({
            id: id,
            ...updateProductDto
        });
        if (!product)
            throw new common_1.NotFoundException(`Product with id: ${id} not found`);
        try {
            await this.chatRepository.save(product);
            return product;
        }
        catch (error) {
            this.handleDBExceptions(error);
        }
    }
    async remove(id) {
        const product = await this.findOne(id);
        await this.chatRepository.remove(product);
    }
    handleDBExceptions(error) {
        if (error.code === '23505')
            throw new common_1.BadRequestException(error.detail);
        this.logger.error(error);
        throw new common_1.InternalServerErrorException('Unexpected error, check server logs');
    }
};
WhatsappService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(chat_entity_1.Chat)),
    __param(2, (0, typeorm_1.InjectRepository)(api_ws_entity_1.Apiws)),
    __param(3, (0, typeorm_1.InjectRepository)(log_fail_entity_1.LogFail)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        axios_1.HttpService,
        typeorm_2.Repository,
        typeorm_2.Repository])
], WhatsappService);
exports.WhatsappService = WhatsappService;
//# sourceMappingURL=whatsapp.service.js.map