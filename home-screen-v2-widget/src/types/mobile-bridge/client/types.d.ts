export interface Client {
    get(property: string, defaultValue?: ValueLike): ValueLike | undefined;
    set(property: string, value: ValueLike | null): void;
    call(methodName: string, parameter?: ValueLike | null): void;
}
export declare type ValueLike = string | number | Record<string, unknown>;
