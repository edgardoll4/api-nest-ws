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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateConfirmationDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateConfirmationDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Carlos Lopez',
        description: 'Nombre del cliente',
    }),
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    __metadata("design:type", String)
], CreateConfirmationDto.prototype, "customerName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '12-09-2022 a las 10:45',
        description: 'Fecha de la reserva',
    }),
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateConfirmationDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Roslin SPA',
        description: 'Nombre del Negocio',
    }),
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    __metadata("design:type", String)
], CreateConfirmationDto.prototype, "businessName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'ac4a596180c08d5b4a025e14a871fb440e47c325ef07ff20f2b56ef2f029d3c3',
        description: 'Token para confirmar cita',
    }),
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    __metadata("design:type", String)
], CreateConfirmationDto.prototype, "confirmToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'e2d2319bd4d76175270ee0c8925999bd44d745f9693eff264453c6b243f5e267',
        description: 'Token para cancelar cita',
    }),
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    __metadata("design:type", String)
], CreateConfirmationDto.prototype, "cancelToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '56957858732',
        description: 'Número de whatsapp del cliente',
    }),
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    __metadata("design:type", String)
], CreateConfirmationDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'business/roslin-spa',
        description: 'Nombre slug del negocio con el prefijo business',
    }),
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    __metadata("design:type", String)
], CreateConfirmationDto.prototype, "slug", void 0);
exports.CreateConfirmationDto = CreateConfirmationDto;
//# sourceMappingURL=confirmation.dto.js.map