import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WiredTransactionInfo } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/transactions/WiredTransactionInfo';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { WiredTransactionLogsController } from '@/com/sulake/habbo/roomevents/wired_trading/transactions/overview/WiredTransactionLogsController';
import type { ITableObject } from '@/com/sulake/habbo/window/utils/tableview/ITableObject';
import { WiredTransactionGetLogDetailsMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/userdefinedroomevents/wiredtrading/transactions/WiredTransactionGetLogDetailsMessageComposer';
import { GetExtendedProfileMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/GetExtendedProfileMessageComposer';
import { TableCell } from '@/com/sulake/habbo/window/utils/tableview/TableCell';

export class TransactionTableObject implements ITableObject {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_trading.transactions.overview::TransactionTableObject'); }

    declare private _controller: WiredTransactionLogsController;

    declare private _transactionInfo: WiredTransactionInfo;

    constructor(param1: WiredTransactionLogsController, param2: WiredTransactionInfo) {
        this._controller = param1;
        this._transactionInfo = param2;
    }

    public get identifier(): string {
        return this._transactionInfo.transactionId + "";
    }

    public getTableCell(param1: string): TableCell {
        switch (param1) {
            case "type":
                return new TableCell(TableCell._SafeStr_2166, this.localize("wired_transactions.type." + this._transactionInfo.transactionType));
            case "timestamp":
                return new TableCell(TableCell._SafeStr_2166, this._transactionInfo.readableTimestamp);
            case "username":
                return new TableCell(TableCell._SafeStr_3709, this._transactionInfo.userName, false, true, null, this.onClickUsername);
            case "deposits":
                return new TableCell(TableCell._SafeStr_2166, this.summarize(this._transactionInfo.depositFurniCount, this._transactionInfo.depositCoinsCount));
            case "withdraws":
                return new TableCell(TableCell._SafeStr_2166, this.summarize(this._transactionInfo.withdrawFurniCount, this._transactionInfo.withdrawCoinsCount));
            case "chests":
                return new TableCell(TableCell._SafeStr_2166, this._transactionInfo.chestCount + "");
            case "details":
                return new TableCell(TableCell._SafeStr_3709, this.localize("wiredchests.logs.details_text"), false, false, null, this.onClickDetails);
            default:
                return null;
        }
    }

    private onClickUsername = (): void => {
        this._controller.send(new GetExtendedProfileMessageComposer(this._transactionInfo.userId, true));
    };

    private onClickDetails = (): void => {
        this._controller.send(new WiredTransactionGetLogDetailsMessageComposer(this._transactionInfo.transactionId));
    };

    private localize(param1: string): string {
        return this.localization.getLocalization(param1);
    }

    private summarize(param1: number, param2: number): string {
        if (param1 <= 0 && param2 <= 0) {
            return "-";
        }
        if (param1 > 0 && param2 == 0) {
            return this.localization.getLocalizationWithParams("wiredchests.logs.only_furni", "", "amount", param1);
        }
        if (param1 == 0 && param2 > 0) {
            return this.localization.getLocalizationWithParams("wiredchests.logs.only_coins", "", "amount", param2);
        }
        return this.localization.getLocalizationWithParams("wiredchests.logs.furni_and_coins", "", "amount", param1, "amount2", param2);
    }

    private get localization(): IHabboLocalizationManager {
        return this._controller.localizationManager;
    }

    public isPropertyUpdated(param1: string, param2: any): boolean {
        return false;
    }

    public isUpdated(param1: any): boolean {
        return false;
    }
}
