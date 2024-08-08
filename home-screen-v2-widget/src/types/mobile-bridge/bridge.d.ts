import { Client } from './client';
import { UIProvider } from './ui';
import { TenantProvider } from './tenant';
import { AnalyticsProvider } from './analytics';
import { PageProvider } from './page';
import { User } from './user';
import { Platform } from './platform';
import { AuthenticationProvider } from './authentication';
export declare class MobileBridge {
    auth: AuthenticationProvider;
    client: Client;
    ui: UIProvider;
    tenant: TenantProvider;
    page: PageProvider;
    analytics: AnalyticsProvider;
    platform: Platform;
    private _user;
    private _api;
    private _events;
    constructor(client: Client, platform: Platform);
    setup(): Promise<void>;
    get version(): string;
    get sdk(): SDKInformation;
    get user(): User | null;
    get available(): boolean;
    private setupUserAndTenant;
}
declare type SDKInformation = {
    version: string;
    platform: string;
    bundleId: string;
};
export {};
