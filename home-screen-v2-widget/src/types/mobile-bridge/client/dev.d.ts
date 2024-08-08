import { Client, ValueLike } from './types';
export declare class DevClient implements Client {
    get(property: string, defaultValue?: ValueLike): ValueLike | undefined;
    set(property: string, value: ValueLike): void;
    call(methodName: string, parameter?: ValueLike): void;
    private getLocalStorageItem;
    private setLocalStorageItem;
    private getLocalStorageKeyName;
}
