export declare enum DialogButtonStyle {
    DEFAULT = "default",
    DESTRUCTIVE = "destructive"
}
export interface DialogButton {
    text: string;
    style?: DialogButtonStyle;
}
export interface ConfirmationDialogResponse {
    isConfirming: boolean;
}
export declare function isConfirmation(response: ConfirmationDialogResponse): boolean;
