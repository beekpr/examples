import { Client } from './client';
export declare class AuthenticationProvider {
    client: Client;
    constructor(client: Client);
    get token(): string;
    injectCookie(window: globalThis.Window): void;
    private static isSecureProtocol;
}
