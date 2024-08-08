import { Client } from './client';
export declare class UserProvider {
    client: Client;
    private _user;
    constructor(client: Client);
    get user(): User | null;
    set user(user: User | null);
}
export declare type User = {
    id: string;
    profile: string;
    email?: string;
    mobile?: string;
    display_name: string;
    display_name_extension?: string;
    avatar: string;
};
