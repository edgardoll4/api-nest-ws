import { CreateApiWSDto } from './dto/create-api-ws.dto';
import { Repository } from 'typeorm';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { CreateLogFailDto } from './dto/create-log-fail.dto';
import { Chat } from './entities/chat.entity';
import { HttpService } from '@nestjs/axios';
import { WhatsappCloudApiRequest } from 'src/common/whatsapp-cloud-api-request.dto';
import { WhatsappCloudAPIResponse } from 'src/common/whatsapp-cloud-api-response.dto';
import { AxiosResponse } from 'axios';
import { Apiws } from './entities/api_ws.entity';
import { LogFail } from './entities/log-fail.entity';
export declare class WhatsappService {
    private readonly chatRepository;
    private readonly httpService;
    private readonly apiWsRepository;
    private readonly logFailRepository;
    private readonly logger;
    baseUrl: string;
    urlPlanner: string;
    request: {
        messaging_product: string;
        preview_url: boolean;
        recipient_type: string;
        to: string;
        type: string;
        text: {
            body: string;
        };
    };
    constructor(chatRepository: Repository<Chat>, httpService: HttpService, apiWsRepository: Repository<Apiws>, logFailRepository: Repository<LogFail>);
    CreateRegisterApiWs(createApiWsDot: CreateApiWSDto): Promise<{
        apiWs: Apiws;
    }>;
    CreateRegisterLogFail(createLogFaileDto: CreateLogFailDto): Promise<void>;
    sendMessage(request: WhatsappCloudApiRequest): Promise<AxiosResponse<WhatsappCloudAPIResponse>>;
    updateReservation(token: string, phone_number: string, text_message: string): Promise<AxiosResponse<WhatsappCloudAPIResponse>>;
    sendEmailError(data: any): Promise<void>;
    create(createProductDto: CreateChatDto): Promise<Chat>;
    createWebhook(createProductDto: CreateChatDto): Promise<Chat>;
    findLengthMessages(): Promise<number>;
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
    findOne(term: string): Promise<Chat>;
    update(id: string, updateProductDto: UpdateChatDto): Promise<Chat>;
    remove(id: string): Promise<void>;
    private handleDBExceptions;
}
