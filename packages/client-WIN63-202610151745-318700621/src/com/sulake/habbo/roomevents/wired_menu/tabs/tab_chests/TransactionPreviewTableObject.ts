import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WiredTransactionInfo } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/transactions/WiredTransactionInfo';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { ITableObject } from '@/com/sulake/habbo/window/utils/tableview/ITableObject';
import { GetExtendedProfileMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/GetExtendedProfileMessageComposer';
import { WiredMenuChestsTab } from '@/com/sulake/habbo/roomevents/wired_menu/tabs/tab_chests/TransactionPreviewTableObject.group';
import { TableCell } from '@/com/sulake/habbo/window/utils/tableview/TableCell';

export class TransactionPreviewTableObject implements ITableObject {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_menu.tabs.tab_chests::TransactionPreviewTableObject'); }

    declare private _chestsTab: WiredMenuChestsTab;

    declare private _transactionInfo: WiredTransactionInfo;

    constructor(param1: WiredMenuChestsTab, param2: WiredTransactionInfo) {
        this._chestsTab = param1;
        this._transactionInfo = param2;
    }

    public get identifier(): string {
        return this._transactionInfo.transactionId + "";
    }

    public getTableCell(param1: string): TableCell {
        switch (param1) {
            case WiredMenuChestsTab.LOG_COLUMN_TYPE:
                return new TableCell(TableCell._SafeStr_2166, this.localize("transaction.type." + this._transactionInfo.transactionType));
            case WiredMenuChestsTab.LOG_COLUMN_USERNAME:
                return new TableCell(TableCell._SafeStr_3709, this._transactionInfo.userName, false, true, null, this.onClickUsername);
            case WiredMenuChestsTab._SafeStr_6236:
                return new TableCell(TableCell._SafeStr_2166, this.summarize(this._transactionInfo.depositFurniCount, this._transactionInfo.depositCoinsCount));
            case WiredMenuChestsTab.LOG_COLUMN_WITHDRAWS:
                return new TableCell(TableCell._SafeStr_2166, this.summarize(this._transactionInfo.withdrawFurniCount, this._transactionInfo.withdrawCoinsCount));
            default:
                return null;
        }
    }

    private summarize(param1: number, param2: number): string {
        if (param1 <= 0 && param2 <= 0) {
            return "-";
        }
        if (param1 > 0 && param2 == 0) {
            return this.localization.getLocalizationWithParams("wiredmenu.chests.room_logs.only_furni", "", "amount", param1);
        }
        if (param1 == 0 && param2 > 0) {
            return this.localization.getLocalizationWithParams("wiredmenu.chests.room_logs.only_coins", "", "amount", param2);
        }
        return this.localization.getLocalizationWithParams("wiredmenu.chests.room_logs.furni_and_coins", "", "amount", param1, "amount2", param2);
    }

    private onClickUsername = (): void => {
        this._chestsTab.controller.send(new GetExtendedProfileMessageComposer(this._transactionInfo.userId, true));
    };

    private localize(param1: string): string {
        return this._chestsTab.controller.localizationManager.getLocalization("wiredmenu.chests." + param1);
    }

    private get localization(): IHabboLocalizationManager {
        return this._chestsTab.controller.localizationManager;
    }

    public isPropertyUpdated(param1: string, param2: any): boolean {
        return false;
    }

    public isUpdated(param1: any): boolean {
        return false;
    }
}
