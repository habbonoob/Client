import type { IAlertDialog } from '@/com/sulake/core/window/utils/IAlertDialog';

export interface IAlertDialogWithLink extends IAlertDialog {
    set linkTitle(param1: string);
    get linkTitle(): string;
    set linkUrl(param1: string);
    get linkUrl(): string;
}
