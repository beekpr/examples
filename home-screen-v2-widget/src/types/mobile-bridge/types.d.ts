export interface AndroidBridge {
    get: (key: string) => unknown;
    [key: string]: (name: string, data: unknown) => unknown;
}
export interface AndroidWindow extends Window {
    BeekeeperBridge: AndroidBridge;
}
declare type BridgeMessageOperation = 'set' | 'call';
export interface BridgeMessage {
    operation: BridgeMessageOperation;
    name: string;
    value: unknown;
}
export interface IOSBridge {
    [key: string]: unknown;
}
export interface IOSWindow extends Window {
    webkit: {
        messageHandlers: {
            beekeeper: {
                postMessage: (message: BridgeMessage) => void;
            };
        };
    };
    BeekeeperBridge: IOSBridge;
}
/** Interface that a bridge aware web app needs to provide at window.BeekeeperBridge */
export interface WebBridge {
    /**
     * A marker property that indicates that it's a web bridge. Must contain the litera
     * value of `true`.
     */
    isWebBridge: true;
    /** The name of the platform providing the bridge (e.g. `app-web` or `dashboard-web`).  */
    platform: string;
    /**
     * Called to retrieve the value of a key. Return `undefined`
     * to indicate that the property does not exist.
     */
    get(key: string): unknown | undefined;
    /**
     * Called when the web app sends a message to the bridge. See the "Defined messages" section
     * of the bridge for available messages. Throw a `NotSupportedError` if the message is not
     * supported.
     *
     * @param message
     */
    send(message: BridgeMessage): void;
}
export interface WebBridgeWindow extends Window {
    BeekeeperBridge: WebBridge;
}
export declare enum BridgeEventType {
    USER_INPUT = "user_input"
}
export interface BridgeEvent {
    id: string;
    type: BridgeEventType;
    data?: Record<string, unknown> | null;
}
export interface BridgeEventsRecipient {
    push(event: BridgeEvent): void;
}
declare global {
    interface Window {
        BeekeeperBridgeEvents?: BridgeEventsRecipient | BridgeEvent[];
    }
}
export {};
