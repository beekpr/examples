import { RouterBridge } from "~/types/routerBridge";
import { HttpClient } from "~/types/httpClient";
import { MobileBridge } from "~/types/mobileBridge";

export interface WidgetConfig<
    T extends Record<string, unknown> = Record<string, unknown>,
> {
    mimeType?: string;
    id: string;
    url: string;
    typeName: string;
    properties: T;
}

export interface WidgetDependencies {
    bridge: MobileBridge;
    httpClient: HttpClient;
    routerBridge: RouterBridge;
}

export interface Widget {
    mount(
        el: HTMLElement,
        dependencies: WidgetDependencies,
        config: WidgetConfig,
    ): void;
    unmount(): void;
}
