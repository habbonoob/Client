import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IConfirmDialog } from '@/com/sulake/core/window/utils/IConfirmDialog';
import type { WiredTransactionInfo } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/transactions/WiredTransactionInfo';
import type { WiredMenuController } from '@/com/sulake/habbo/roomevents/wired_menu/WiredMenuController';
import type { ITableObject } from '@/com/sulake/habbo/window/utils/tableview/ITableObject';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { IUpdateReceiver } from '@/com/sulake/core/runtime/IUpdateReceiver';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { WiredTransactionLogListMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredtrading/transactions/WiredTransactionLogListMessageEvent';
import { LockAllChestsMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/userdefinedroomevents/wiredtrading/chests/LockAllChestsMessageComposer';
import { WiredTransactionGetRoomLogsMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/userdefinedroomevents/wiredtrading/transactions/WiredTransactionGetRoomLogsMessageComposer';
import { WiredTransactionLogList } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/transactions/WiredTransactionLogList';
import { Util } from '@/com/sulake/habbo/roomevents/Util';
import { TransactionPreviewTableObject } from '@/com/sulake/habbo/roomevents/wired_menu/tabs/tab_chests/TransactionPreviewTableObject.group';
import { WiredMenuDefaultTab } from '@/com/sulake/habbo/roomevents/wired_menu/tabs/WiredMenuDefaultTab';
import { TransactionConfig } from '@/com/sulake/habbo/roomevents/wired_trading/transactions/overview/TransactionConfig';
import { TableColumn } from '@/com/sulake/habbo/window/utils/tableview/TableColumn';
import { TableView } from '@/com/sulake/habbo/window/utils/tableview/TableView';

export class WiredMenuChestsTab extends WiredMenuDefaultTab implements IUpdateReceiver {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_menu.tabs.tab_chests::WiredMenuChestsTab'); }

    public static LOG_COLUMN_TYPE: string = "type";
    public static LOG_COLUMN_USERNAME: string = "username";
    public static LOG_COLUMN_WITHDRAWS: string = "withdraws";
    public static _SafeStr_6236: string = "deposits";
    public static TRANSACTIONS_PREVIEW_AMOUNT: number = 10;
    public static TRANSACTIONS_FIRST_PAGE: number = 1;
    private static POLL_PREVIEW_MS: number = 20000;
    private static _SafeStr_7448: number = 500;

    constructor(param1: WiredMenuController, param2: IWindowContainer) {
        super(param1, param2);
        this.createTransactionTable();
        this.addMessageEvent(new WiredTransactionLogListMessageEvent(this.onLogListResults));
        this.lockYourChestsButton.addEventListener("WME_CLICK", this.onLockChestsClick);
        this.unlockYourChestsButton.addEventListener("WME_CLICK", this.onUnlockChestsClick);
        this.lockAllChestsButton.addEventListener("WME_CLICK", this.onLockAllChestsClick);
        this.viewInDetailButton.addEventListener("WME_CLICK", this.onViewInDetailClick);
    }

    declare private _SafeStr_3775: TableView;

    private _SafeStr_6031: number = 0;
    private _SafeStr_3809: boolean = false;
    private _SafeStr_6283: number = 0;
    private _SafeStr_3453: WiredTransactionInfo[] = null;

    private get lockYourChestsButton(): IButtonWindow {
        return asGuarded(this.container.findChildByName("lock_own_button"), isIButtonWindow);
    }

    private get unlockYourChestsButton(): IButtonWindow {
        return asGuarded(this.container.findChildByName("unlock_own_button"), isIButtonWindow);
    }

    private get lockAllChestsButton(): IButtonWindow {
        return asGuarded(this.container.findChildByName("lock_all_button"), isIButtonWindow);
    }

    private get transactionsTableViewContainer(): IWindowContainer {
        return asGuarded(this.container.findChildByName("logs_table_container"), isIWindowContainer);
    }

    private get viewInDetailButton(): IButtonWindow {
        return asGuarded(this.container.findChildByName("view_in_detail_button"), isIButtonWindow);
    }

    public override startViewing(): void {
        super.startViewing();
        this.clearData();
        this.updateLoadingState();
        this.requestData();
    }

    protected override isDataReady(): boolean {
        return this._SafeStr_3453 != null;
    }

    protected override initializeInterface(): void {
        this.updateTransactionLogsUI();
        this.updateButtonsUI();
    }

    public override permissionsUpdated(): void {
        this.updateButtonsUI();
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        this._SafeStr_3775.dispose();
        this._SafeStr_3775 = null;
        this._SafeStr_3453 = null;
        super.dispose();
    }

    public update(param1: number): void {
        if (!this.isViewing) {
            return;
        }
        let _loc2_: number = getTimer();
        if (this._SafeStr_6283 < _loc2_ - WiredMenuChestsTab.POLL_PREVIEW_MS) {
            this.requestData();
        }
        if (!this.isLoading && this._SafeStr_3809 && this._SafeStr_6031 < _loc2_ - WiredMenuChestsTab._SafeStr_7448) {
            this._SafeStr_3809 = false;
            this.updateButtonsUI();
        }
    }

    private onLogListResults = (param1: WiredTransactionLogListMessageEvent): void => {
        let _loc2_: WiredTransactionLogList = param1.getParser().logs;
        if (_loc2_.amount == WiredMenuChestsTab.TRANSACTIONS_PREVIEW_AMOUNT && _loc2_.currentPage == WiredMenuChestsTab.TRANSACTIONS_FIRST_PAGE && _loc2_.logListType == WiredTransactionLogList._SafeStr_7523) {
            this._SafeStr_3453 = _loc2_.logs;
            if (this.isLoading) {
                this.updateLoadingState();
            } else {
                this.updateTransactionLogsUI();
            }
        }
    };

    private createTransactionTable(): void {
        this._SafeStr_3775 = new TableView(this.controller.windowManager, this.transactionsTableViewContainer);
        let _loc1_: any[] = [new TableColumn(WiredMenuChestsTab.LOG_COLUMN_TYPE, this.loc("wiredmenu.chests.room_logs.column.type"), 0.28), new TableColumn(WiredMenuChestsTab.LOG_COLUMN_USERNAME, this.loc("wiredmenu.chests.room_logs.column.username"), 0.24), new TableColumn(WiredMenuChestsTab.LOG_COLUMN_WITHDRAWS, this.loc("wiredmenu.chests.room_logs.column.withdraws"), 0.24), new TableColumn(WiredMenuChestsTab._SafeStr_6236, this.loc("wiredmenu.chests.room_logs.column.deposits"), 0.24)];
        this._SafeStr_3775.initialize(Array.from(_loc1_));
    }

    private clearData(): void {
        this._SafeStr_3453 = null;
    }

    private updateButtonsUI(): void {
        Util.disableSection(this.lockYourChestsButton, !this.controller.hasWritePermission || this._SafeStr_3809);
        Util.disableSection(this.unlockYourChestsButton, !this.controller.hasWritePermission || this._SafeStr_3809);
        Util.disableSection(this.lockAllChestsButton, !this.controller.isRoomOwnerOrStaff() || this._SafeStr_3809);
    }

    private updateTransactionLogsUI(): void {
        Util.disableSection(this.transactionsTableViewContainer, this._SafeStr_3453.length == 0);
        let _loc1_: ITableObject[] = [];
        for (const _loc2_ of this._SafeStr_3453 ?? []) {
            _loc1_.push(new TransactionPreviewTableObject(this, _loc2_));
        }
        this._SafeStr_3775.setObjects(_loc1_);
    }

    private requestData(): void {
        this._SafeStr_6283 = getTimer();
        this.controller.send(new WiredTransactionGetRoomLogsMessageComposer(WiredMenuChestsTab.TRANSACTIONS_PREVIEW_AMOUNT, WiredMenuChestsTab.TRANSACTIONS_FIRST_PAGE));
    }

    private onLockChestsClick = (param1: WindowMouseEvent): void => {
        this.controller.send(new LockAllChestsMessageComposer(true, false));
        this.startLockTimeout();
    };

    private onUnlockChestsClick = (param1: WindowMouseEvent): void => {
        this.controller.send(new LockAllChestsMessageComposer(false, false));
        this.startLockTimeout();
    };

    private onLockAllChestsClick = (param1: WindowMouseEvent): void => {
        this.controller.roomEvents.windowManager.confirm("${wiredmenu.chests.chest_control.lock_all.warning.title}", "${wiredmenu.chests.chest_control.lock_all.warning.desc}", 0, this.onConfirmLockAllChest);
    };

    private onConfirmLockAllChest = (param1: IConfirmDialog, param2: WindowEvent): void => {
        param1.dispose();
        if (param2.type == "WE_OK") {
            this.controller.send(new LockAllChestsMessageComposer(true, true));
            this.startLockTimeout();
        }
    };

    private startLockTimeout(): void {
        this._SafeStr_3809 = true;
        this._SafeStr_6031 = getTimer();
        if (!this.isLoading) {
            this.updateButtonsUI();
        }
    }

    private onViewInDetailClick = (param1: WindowMouseEvent): void => {
        this.controller.send(new WiredTransactionGetRoomLogsMessageComposer(TransactionConfig.PAGE_SIZE, 1));
    };

    get [IUpdateReceiver](): true {
        return true;
    }
}
