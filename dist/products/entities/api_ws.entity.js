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
exports.Apiws = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
let Apiws = class Apiws {
};
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'cd533345-f1f3-48c9-a62e-7dc2da50c8f8',
        description: 'Product ID',
        uniqueItems: true
    }),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Apiws.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        unique: true,
    }),
    __metadata("design:type", String)
], Apiws.prototype, "slug_businnes", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        unique: true
    }),
    __metadata("design:type", String)
], Apiws.prototype, "id_api_ws", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text'
    }),
    __metadata("design:type", String)
], Apiws.prototype, "type_app", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text'
    }),
    __metadata("design:type", String)
], Apiws.prototype, "ver_app", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        unique: true
    }),
    __metadata("design:type", String)
], Apiws.prototype, "token_app", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        unique: true
    }),
    __metadata("design:type", String)
], Apiws.prototype, "phone_api", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        unique: true
    }),
    __metadata("design:type", String)
], Apiws.prototype, "id_phone_app", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        unique: true
    }),
    __metadata("design:type", String)
], Apiws.prototype, "id_cuenta_business", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        unique: true
    }),
    __metadata("design:type", String)
], Apiws.prototype, "create_data", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        nullable: true
    }),
    __metadata("design:type", String)
], Apiws.prototype, "update_data", void 0);
Apiws = __decorate([
    (0, typeorm_1.Entity)({ name: 'apis_ws' })
], Apiws);
exports.Apiws = Apiws;
//# sourceMappingURL=api_ws.entity.js.map