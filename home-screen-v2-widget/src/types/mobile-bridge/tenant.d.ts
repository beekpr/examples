import { Client } from './client';
export declare class TenantProvider {
    client: Client;
    private _config;
    constructor(client: Client);
    get config(): Config | null;
    set config(config: Config | null);
    hasFeature(featureFlagName: string): boolean | null;
}
export declare type Config = {
    max_file_size: number;
    feature_flags: Record<string, boolean>;
    max_files_on_post: number;
    max_video_size_for_admins: number;
    max_voice_recording_length: number;
    styling: {
        color_contrast: string;
        color_link: string;
        color: string;
        favicon: string;
        logo: string;
        color_link_contrast: string;
        color_background: string;
        appicon: string;
        color_background_contrast: string;
    };
    general: {
        company_account: string;
        name: string;
        url: string;
        tagline: string;
        fqdn: string;
        support_email: string;
        timezone: string;
        subdomain: string;
        created: string;
        id: number;
    };
};
