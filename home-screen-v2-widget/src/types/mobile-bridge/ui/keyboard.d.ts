import { Client } from '../client';
export declare class KeyboardProvider {
    client: Client;
    constructor(client: Client);
    set hideAccessoryBar(toggle: boolean);
}
