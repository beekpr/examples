export declare enum MenuItemStyle {
    DEFAULT = "default",
    DESTRUCTIVE = "destructive"
}
/**
 * Represents a menu item for either a selection menu or the title bar context menu.
 * `data` can be populated to hold information about the action that should happen
 * when the menu item is selected.
 */
export interface MenuItem<ItemInfoType = undefined> {
    /** The menu item's title. */
    text: string;
    /** The menu item's presentation style. */
    style?: MenuItemStyle;
    /** Space to hold additional data about the menu item that can be used to act on it. */
    itemInfo?: ItemInfoType;
}
/** Response when the selection menu was dismissed my selecting a menu item. */
export interface MenuItemResponse<ItemInfoType = undefined> {
    isCancel: false;
    menuItem: MenuItem<ItemInfoType>;
}
/** Response when the selection menu was dismissed without making a selection. */
export interface MenuCancelResponse {
    isCancel: true;
}
/** Represent the result of showing a selection menu. */
export declare type MenuResponse<ItemInfoType = undefined> = MenuItemResponse<ItemInfoType> | MenuCancelResponse;
/**
 * Check if the given `MenuResponse` represent a cancellation. This can also be
 * used as a type guard in TypeScript.
 */
export declare function isMenuCancelResponse(response: MenuResponse): response is MenuCancelResponse;
