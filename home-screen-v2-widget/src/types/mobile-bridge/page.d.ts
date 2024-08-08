import { Client } from './client';
export declare enum State {
    DEFAULT = "default",
    ERROR = "error"
}
export declare class StateProperties {
    title?: string;
    text?: string;
    reloadButton?: boolean;
    constructor(title?: string, text?: string, reloadButton?: boolean);
}
export declare class PageProvider {
    client: Client;
    constructor(client: Client);
    close(): void;
    setState(state: State, properties?: StateProperties): void;
}
