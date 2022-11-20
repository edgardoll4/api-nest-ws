import { WhatsappService } from './whatsapp.service';
export declare class Webhookontroller {
    private readonly chatService;
    constructor(chatService: WhatsappService);
    createWebhook(data: any): Promise<import("./entities/chat.entity").Chat>;
    authWebhook(res: any, mode: string, token: string, challenge: string): void;
    testUpdate(res: any, token: string, body: any): void;
}
