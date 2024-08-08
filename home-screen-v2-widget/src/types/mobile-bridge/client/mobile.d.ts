import { ValueLike } from './types';
export declare enum Operation {
    SET = "set",
    CALL = "call"
}
export declare abstract class MobileClient {
    get(property: string, defaultValue?: ValueLike): ValueLike | undefined;
    set(property: string, value: ValueLike): void;
    call(methodName: string, parameter: ValueLike): void;
    abstract invoke(operation: Operation, name: string, value: ValueLike): void;
    abstract getRaw(property: string): unknown;
}
