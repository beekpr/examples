import { Client, ValueLike } from './types';
export declare class NOOPClient implements Client {
    get(_property: string, _defaultValue?: ValueLike): ValueLike | undefined;
    set(_property: string, _value: ValueLike): void;
    call(_methodName: string, _parameter?: ValueLike): void;
}
