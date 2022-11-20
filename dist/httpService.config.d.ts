import { HttpModuleOptions, HttpModuleOptionsFactory } from '@nestjs/axios';
export declare class HttpConfigService implements HttpModuleOptionsFactory {
    createHttpOptions(): HttpModuleOptions;
}
