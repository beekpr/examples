import { AndroidBridge, AndroidWindow } from '../types';
import { MobileClient } from './mobile';
import { Client, ValueLike } from './types';
export declare class AndroidClient extends MobileClient implements Client {
    getRaw(property: string): unknown;
    invoke(operation: string, name: string, value: ValueLike): void;
    get bridge(): AndroidBridge;
    get window(): AndroidWindow;
}
