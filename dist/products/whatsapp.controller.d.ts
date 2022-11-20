import { WhatsappService } from './whatsapp.service';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { CreateConfirmationDto } from './dto/confirmation.dto';
import { CreateNotificationDto } from './dto/notification.dto';
import { CreateApiWSDto } from './dto/create-api-ws.dto';
export declare class WhatsappController {
    private readonly chatService;
    constructor(chatService: WhatsappService);
    notificationsWhatsapp(request: CreateNotificationDto, response: any): void;
    confirmationsWhatsapp(request: CreateConfirmationDto, response: any): void;
    createRegisterApiWsDB(createRegisterApiWs: CreateApiWSDto): Promise<{
        apiWs: import("./entities/api_ws.entity").Apiws;
    }>;
    findAll(paginationDto: PaginationDto): Promise<{
        id: string;
        text: string;
        name: string;
        type: string;
        payload?: string;
        timestamp: string;
        watsapp_id: string;
        from: string;
        phone_number_id: string;
    }[]>;
    count(paginationDto: PaginationDto): Promise<number>;
}
