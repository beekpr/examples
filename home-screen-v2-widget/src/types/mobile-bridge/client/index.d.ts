import { AndroidClient } from './android';
import { IOSClient } from './ios';
import { Platform } from '../platform';
import { Client } from './types';
import { DevClient } from './dev';
import { WebClient } from './web';
export interface ClientFactory {
    make(): Client;
}
export declare class ClientFactoryImpl implements ClientFactory {
    platform: Platform;
    constructor(platform: Platform);
    make(): Client;
}
export { IOSClient };
export { AndroidClient };
export { WebClient };
export { DevClient };
export { Client } from './types';
export { NOOPClient } from './noop';
