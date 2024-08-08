import { IOSWindow, IOSBridge } from '../types';
import { MobileClient, Operation } from './mobile';
import { Client, ValueLike } from './types';
export declare class IOSClient extends MobileClient implements Client {
    getRaw(property: string): unknown;
    invoke(operation: Operation, name: string, value: ValueLike): void;
    get bridge(): IOSBridge;
    get window(): IOSWindow;
}
