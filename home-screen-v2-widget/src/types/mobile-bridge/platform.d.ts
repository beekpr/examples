export declare enum Platform {
    ANDROID = "android",
    IOS = "ios",
    WEB = "web",
    UNKNOWN = "unknown"
}
export declare function isIos(): boolean;
export declare function isAndroid(): boolean;
export declare function isBridgeAwareWebClient(): boolean;
export declare function detectPlatform(globalObject: typeof window): Platform;
