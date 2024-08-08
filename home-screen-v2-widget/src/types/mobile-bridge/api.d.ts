import type { Config } from './tenant';
import type { User } from './user';
export declare type ClientConfigResponse = {
    tenant: Config;
    user: User;
};
export declare class API {
    protected token: string;
    constructor(token: string);
    fetchClientConfig(): Promise<ClientConfigResponse>;
}
