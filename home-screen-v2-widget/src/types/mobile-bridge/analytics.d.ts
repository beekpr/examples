import { Client } from './client';
export declare class AnalyticsProvider {
    client: Client;
    constructor(client: Client);
    track(eventOrEventType: string | Record<string, unknown>, properties?: Record<string, unknown>): void;
}
