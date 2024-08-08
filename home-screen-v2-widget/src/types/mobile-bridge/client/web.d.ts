import { WebBridgeWindow } from '../types';
import { Client, ValueLike } from './types';
export declare class WebClient implements Client {
    call(methodName: string, parameter?: ValueLike | null): void;
    get(property: string, defaultValue?: ValueLike): ValueLike | undefined;
    set(property: string, value: ValueLike | null): void;
    get window(): WebBridgeWindow;
}
