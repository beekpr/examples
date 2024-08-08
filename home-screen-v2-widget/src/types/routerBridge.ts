/**
 * Definition of a MicroFrontend route.
 */
export interface RouteDefinition {
    /**
     * Mapping of the route (e.g. '/forms/:formId').
     *
     * The path parameters must be prefixed by a colon and the names
     * of the parameters will be used as keys in Route.params.
     */
    mapping: string;
    /**
     * Name of the MicroFrontend module mapped to this route (e.g. './formsView').
     *
     * Note that this has to match the Module Federation configuration name.
     */
    moduleName: string;
    /**
     * Unique name of the route. This can be used to uniquely
     * identify routes within the application.
     *
     * This library offers helpers to auto generate names if needed.
     */
    name: string;
    /**
     * If true, this route will always be fully re-rendered.
     *
     * By default, when navigating from this route to another version of
     * this route (e.g. with different path parameters), the router will no re-render
     * as the application is expected to listen to the parameter changes and update itself
     * efficiently.
     *
     * However this option can be used to disable that default behavior and always re-render.
     */
    forceReRender?: boolean;
}

/**
 * Instance of a URL route
 */
export interface Route {
    /**
     * Full path of this route.
     */
    path: string;
    /**
     * Path parameters of this route. The key names match
     * the names used in the RouteDefinition.
     *
     * e.g.
     * When the mapping is: `/forms/:formId`
     * And the path is: `/forms/foobar`
     * Then params is: `{ formId: 'foobar' }`
     */
    params: Record<string, string>;
    /**
     * Object containing the query parameters of this route.
     */
    query: URLSearchParams;
    /**
     * Reference to the corresponding Route Definition that matches
     * this route.
     */
    route: RouteDefinition;
}

/**
 * Function that determines how to resolve a routing change.
 * It can be called with either:
 * - next()       : The navigation is validated and either the next hook is called or the navigation is allowed to proceed.
 * - next(false)  : Prevent the routing. The URL won't change and no re-rending will be executed, no additional hooks will be called.
 * - next('/path'): Prevent the routing and instead redirect to the given path. No additional hooks will be called.
 */
export declare type NextFunction = (res?: false | string) => void;

export interface ListenerReference {
    /**
     * Unregister the router hook mapped to this reference.
     */
    stop(): void;
}

export declare type RouterBridgeVersion = '2.0.0';

export interface NavigationOptions {
    /**
     * If set, external URLs will be opened in a new tab.
     *
     * @see RouterBridge.isInternalUrl
     */
    openExternalUrlInNewTab?: boolean;
}

export interface RouterBridge {
    /**
     * Semantical version of the specification supported by this implementation.
     */
    version: RouterBridgeVersion;
    /**
     * Instructs the router to navigate to the given path.
     *
     * @param path Path (absolute or relative) to navigate to.
     * @param options.openExternalUrlInNewTab If set, external URLs will be opened in a new tab
     */
    push(path: string, options?: NavigationOptions): void;
    /**
     * Similar as push, but this doesn't add an entry to the History.
     *
     * @param path Path to navigate to.
     */
    replace(path: string): void;
    /**
     * Navigate through the browser History.
     *
     * @param n History steps to navigate. Can be negative (e.g. -1).
     */
    go(n: number): void;
    /**
     * Check if a given path is internal or not.
     * A path is considered internal if this router implementation can navigate to it.
     *
     * This is only true if the path has the correct domain (in case of absolute URLs) and the
     * path points to a valid, routable view.
     *
     * @param path Path (absolute or relative) to check
     */
    isInternalUrl(path: string): boolean;
    /**
     * Register a hook that allows to listen for route changes.
     *
     * This hook will be scoped to the MicroFrontend application, meaning it will only
     * be called for route changes where either (or both) `from` and `to` map to a route
     * declared by this MicroFrontend.
     *
     * If multiple hooks are registered, they will be called in the order they were registered.
     *
     * Important: The next function has to be called exactly once no matter the circumstances.
     *
     * @param hook Hook called whenever the route changes.
     *
     * @returns A reference to the hook that can be used to unregister it.
     *
     * @see NextFunction
     */
    onBeforeRouteUpdate(hook: (to: Route, from: Route, next: NextFunction) => void): ListenerReference;
    /**
     * Register a hook that is triggered after a successful navigation change.
     *
     * This hook will be scoped to the MicroFrontend application, meaning it will only
     * be called for route changes where either (or both) `from` and `to` map to a route
     * declared by this MicroFrontend.
     *
     * @param hook Hook called after the route changes.
     *
     * @returns A reference to the hook that can be used to unregister it.
     */
    onAfterRouterUpdate(hook: (to: Route, from: Route) => void): ListenerReference;
    /**
     * Get the current route.
     */
    currentRoute(): Route;
}
