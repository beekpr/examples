import { MenuItem } from './menu';
import { Client } from '../client';
import { BridgeEvents } from '../events';
export declare type TitleBarContextMenuHandler<T> = (menuItem: MenuItem<T>) => void;
export declare type TitleBarContextMenuCleanup = () => void;
export declare class ToolbarProvider {
    client: Client;
    private _bridgeEvents;
    constructor(client: Client, bridgeEvents: BridgeEvents);
    set showToolbarShadow(toggle: boolean);
    /**
     * Add a title bar context menu with the given menu options. The handler is called whenever
     * a context menu item has been tapped.
     *
     * **NOTE**: Please make sure to call the returned cleanup function when the context menu is
     * not needed anymore. That will clear the event listener and tells the native app to hide
     * the button in the title bar again.
     *
     * @param items Menu items to show.
     * @param handler Called when a menu item has been tapped. It will receive the item in `items`
     *                that was tapped.
     * @return A cleanup functions to signal that the context menu is not needed anymore.
     *         It **must** be called before navigating away from the screen.
     */
    showTitleBarContextMenu<T>(items: MenuItem<T>[], handler: TitleBarContextMenuHandler<T>): TitleBarContextMenuCleanup;
}
