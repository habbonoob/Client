import type { IAlertDialog } from '@/com/sulake/core/window/utils/IAlertDialog';

export interface IAlertDialogWithLink extends IAlertDialog {
    get linkTitle(): string;
    set linkTitle(param1: string);
    get linkUrl(): string;
    set linkUrl(param1: string);
}
