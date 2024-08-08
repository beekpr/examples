import { Client } from '../client';
import { BridgeEvents } from '../events';
import { KeyboardProvider } from './keyboard';
import { ToolbarProvider } from './toolbar';
import { MenuItem, MenuResponse } from './menu';
import { ConfirmationDialogResponse, DialogButton } from './dialog';
export declare type Styling = {
    color: string;
    colorContrast: string;
    /**
     * @deprecated
     */
    colorBackground: string;
    colorLink: string;
    colorLinkContrast: string;
};
export declare enum ToastType {
    SUCCESS = "success",
    WARNING = "warning",
    INFORMATION = "information",
    ERROR = "error"
}
export declare class UIProvider {
    client: Client;
    keyboard: KeyboardProvider;
    toolbar: ToolbarProvider;
    private _bridgeEvents;
    private _nextId;
    constructor(client: Client, bridgeEvents: BridgeEvents);
    private _waitForBridgeResponse;
    set title(title: string);
    get styling(): Styling;
    get locale(): string;
    /**
     * Displays a toast or snackbar popup with a short message, e.g. to signal to the user that an
     * action they invoked was successful.
     *
     * @param text The text to display in the toast / snackbar.
     * @param type The type of the toast
     */
    showToast(text: string, type?: ToastType): void;
    /**
     * Display a menu with multiple options for the user to select from. Selecting an option
     * will resolve into a `MenuItemResponse`, with the selected `MenuItem` attached. If
     * the menu was dismissed without making a selection, the returned promise resolves to
     * a `MenuCancelResponse`. Use `isMenuCancelResponse()` to determine whether the response
     * was a cancellation.
     *
     * @param items The items that can be chosen from.
     * @param title Title of the selection menu.
     */
    showSelection<T>(items: MenuItem<T>[], title?: string): Promise<MenuResponse<T>>;
    /**
     * Displays an alert dialog with one "OK" button, a text message and a title.
     * Clicking the button closes the dialog.
     * Canceling the dialog (e.g. via physical back button or clicking outside) also
     * closes the dialog.
     *
     * @param message The message to display on the dialog
     * @param title The title to display above the dialog
     */
    showAlertDialog(message: string, title?: string): void;
    /**
     * Displays a confirmation dialog with one positive/confirm button and a negative/cancel button,
     * a text message and a title.
     * Clicking either button closes the dialog.
     * Canceling the dialog (e.g. via physical back button or clicking outside) also
     * closes the dialog.
     * The cancel button will always read "Cancel", the positive/confirm button can be renamed.
     *
     * @param message The message to display on the dialog
     * @param confirmButton The positive/confirm button settings.
     * @param title The title to display above the dialog
     */
    showConfirmDialog(message: string, confirmButton: DialogButton, title?: string): Promise<ConfirmationDialogResponse>;
}
