import { asGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { IContainerButtonWindow } from '@/com/sulake/core/window/components/IContainerButtonWindow';
import type { IDesktopWindow } from '@/com/sulake/core/window/components/IDesktopWindow';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { IIconWindow } from '@/com/sulake/core/window/components/IIconWindow';
import type { ITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { WiredTransactionLogsController } from '@/com/sulake/habbo/roomevents/wired_trading/transactions/overview/WiredTransactionLogsController';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { ITableObject } from '@/com/sulake/habbo/window/utils/tableview/ITableObject';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isIContainerButtonWindow } from '@/com/sulake/core/window/components/IContainerButtonWindow';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isIIconWindow } from '@/com/sulake/core/window/components/IIconWindow';
import { isITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { WindowKeyboardEvent } from '@/com/sulake/core/window/events/WindowKeyboardEvent';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { WiredTransactionGetChestLogsMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/userdefinedroomevents/wiredtrading/transactions/WiredTransactionGetChestLogsMessageComposer';
import { WiredTransactionGetRoomLogsMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/userdefinedroomevents/wiredtrading/transactions/WiredTransactionGetRoomLogsMessageComposer';
import { WiredTransactionLogList } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/transactions/WiredTransactionLogList';
import { Util } from '@/com/sulake/habbo/roomevents/Util';
import { TransactionConfig } from '@/com/sulake/habbo/roomevents/wired_trading/transactions/overview/TransactionConfig';
import { TransactionTableObject } from '@/com/sulake/habbo/roomevents/wired_trading/transactions/overview/TransactionTableObject';
import { LoadingIcon } from '@/com/sulake/habbo/utils/LoadingIcon';
import { TableColumn } from '@/com/sulake/habbo/window/utils/tableview/TableColumn';
import { TableView } from '@/com/sulake/habbo/window/utils/tableview/TableView';

export class WiredTransactionLogsView implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_trading.transactions.overview::WiredTransactionLogsView'); }

    public static readonly LOG_COLUMN_TYPE: string = "type";
    public static readonly LOG_COLUMN_TIMESTAMP: string = "timestamp";
    public static readonly LOG_COLUMN_USERNAME: string = "username";
    public static readonly LOG_COLUMN_WITHDRAWS: string = "withdraws";
    public static readonly _SafeStr_6236: string = "deposits";
    public static readonly _SafeStr_8225: string = "chests";
    public static readonly LOG_COLUMN_DETAILS: string = "details";
    public static readonly DESKTOP_WINDOW_LAYER: number = 1;
    public static readonly REQUEST_SAME_PAGE_TIMEOUT: number = 2000;
    public static readonly REQUEST_PAGE_RATELIMIT: number = 280;

    constructor(param1: WiredTransactionLogsController, param2: IHabboWindowManager) {
        this._controller = param1;
        this._windowManager = param2;
        this._window = asGuarded(this._windowManager.buildFromXML(XML.from(this._controller.assets.getAssetByName("transaction_overview_xml").content), 1), isIFrameWindow);
        this._loadingIcon = new LoadingIcon();
        this.pageNumberInput.restrict = "0-9";
        this.createTransactionTable();
        this.firstPageButton.addEventListener("WME_CLICK", this.onFirstPageClick);
        this.previousPageButton.addEventListener("WME_CLICK", this.onPreviousPageClick);
        this.nextPageButton.addEventListener("WME_CLICK", this.onNextPageClick);
        this.lastPageButton.addEventListener("WME_CLICK", this.onLastPageClick);
        this.refreshButton.addEventListener("WME_CLICK", this.onRefreshClick);
        this.pageNumberInput.addEventListener("WKE_KEY_DOWN", this.onPageInputDown);
        this.pageNumberInput.addEventListener("WME_CLICK_AWAY", this.onPageInputClickAway);
        this.closeButton.addEventListener("WME_CLICK", this.onClose);
    }

    declare private _controller: WiredTransactionLogsController;

    declare private _windowManager: IHabboWindowManager;

    declare private _window: IFrameWindow;

    declare private _SafeStr_3775: TableView;

    private _SafeStr_4616: number = -1;
    private _SafeStr_5638: number = 0;

    declare private _loadingIcon: LoadingIcon;

    private _disposed: boolean = false;

    public get disposed(): boolean {
        return this._disposed;
    }

    private get closeButton(): IWindow {
        return this._window.findChildByName("header_button_close");
    }

    private get listTypeValueText(): ITextWindow {
        return asGuarded(this._window.findChildByName("list_type_value"), isITextWindow);
    }

    private get idKeyText(): ITextWindow {
        return asGuarded(this._window.findChildByName("id_key"), isITextWindow);
    }

    private get idValueText(): ITextWindow {
        return asGuarded(this._window.findChildByName("id_value"), isITextWindow);
    }

    private get refreshButton(): IButtonWindow {
        return asGuarded(this._window.findChildByName("refresh_btn"), isIButtonWindow);
    }

    private get loadingIconWindow(): IIconWindow {
        return asGuarded(this._window.findChildByName("searching_icon"), isIIconWindow);
    }

    private get tableView(): IWindowContainer {
        return asGuarded(this._window.findChildByName("table_view"), isIWindowContainer);
    }

    private get firstPageButton(): IContainerButtonWindow {
        return asGuarded(this._window.findChildByName("first_page_btn"), isIContainerButtonWindow);
    }

    private get previousPageButton(): IContainerButtonWindow {
        return asGuarded(this._window.findChildByName("prev_page_btn"), isIContainerButtonWindow);
    }

    private get nextPageButton(): IContainerButtonWindow {
        return asGuarded(this._window.findChildByName("next_page_btn"), isIContainerButtonWindow);
    }

    private get lastPageButton(): IContainerButtonWindow {
        return asGuarded(this._window.findChildByName("last_page_btn"), isIContainerButtonWindow);
    }

    private get pageTextStart(): ITextWindow {
        return asGuarded(this._window.findChildByName("pagina_text_start"), isITextWindow);
    }

    private get pageNumberInput(): ITextFieldWindow {
        return asGuarded(this._window.findChildByName("pagina_number_input"), isITextFieldWindow);
    }

    private get pageTextEnd(): ITextWindow {
        return asGuarded(this._window.findChildByName("pagina_text_end"), isITextWindow);
    }

    public hide(): void {
        let _loc1_: IDesktopWindow = null;
        if (this.isShowing()) {
            _loc1_ = this._windowManager.getDesktop(1);
            if (_loc1_ != null) {
                _loc1_.removeChild(this._window);
            }
        }
    }

    public show(): void {
        let _loc1_: IDesktopWindow = null;
        if (!this.isShowing()) {
            _loc1_ = this._windowManager.getDesktop(1);
            if (_loc1_ != null) {
                _loc1_.addChild(this._window);
                this._window.center();
            }
        }
    }

    public isShowing(): boolean {
        return this._window.parent != null;
    }

    public displayNewPage(): void {
        let _loc5_: string = null;
        let _loc6_: string = null;
        if (this._controller.logs == null) {
            return;
        }
        this._loadingIcon.setVisible(this.loadingIconWindow, false);
        let _loc7_: WiredTransactionLogList = this._controller.logs;
        if (_loc7_.currentPage == this._SafeStr_4616) {
            this._SafeStr_4616 = -1;
        }
        this.listTypeValueText.text = this.loc("wiredchests.logs.type." + _loc7_.logListType);
        if (_loc7_.logListType == WiredTransactionLogList._SafeStr_7323) {
            this.idKeyText.text = this.loc("wiredchests.logs.chest_id");
        } else {
            this.idKeyText.text = this.loc("wiredchests.logs.room_id");
        }
        this.idValueText.text = _loc7_.logListId + "";
        let _loc3_: number = this.calculateLastPage();
        Util.disableSection(this.firstPageButton, _loc7_.currentPage <= 1);
        Util.disableSection(this.previousPageButton, _loc7_.currentPage <= 1);
        Util.disableSection(this.nextPageButton, _loc7_.currentPage >= _loc3_);
        Util.disableSection(this.lastPageButton, _loc7_.currentPage >= _loc3_);
        let _loc4_: string = this.loc("wiredchests.logs.bottom_text");
        let _loc1_: any[] = _loc4_.split("%page%");
        if (_loc1_.length == 2) {
            _loc5_ = stringOrNull(_loc1_[0]);
            _loc6_ = stringOrNull(_loc1_[1]);
            this.pageTextStart.text = _loc5_.replace("%transaction_count%", String(_loc7_.totalLogs));
            this.pageTextEnd.text = _loc6_.replace("%page_count%", String(_loc3_));
            this.pageNumberInput.text = _loc7_.currentPage + "";
        }
        let _loc2_: ITableObject[] = [];
        for (const _loc8_ of _loc7_.logs ?? []) {
            _loc2_.push(new TransactionTableObject(this._controller, _loc8_));
        }
        this._SafeStr_3775.setObjects(_loc2_);
        this._SafeStr_3775.scrollToTop();
        this._window.activate();
    }

    public loc(param1: string): string {
        return this._controller.localizationManager.getLocalization(param1, param1);
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._loadingIcon.dispose();
        this._loadingIcon = null;
        this._SafeStr_3775.dispose();
        this._SafeStr_3775 = null;
        this._window.dispose();
        this._window = null;
        this._controller = null;
        this._windowManager = null;
        this._disposed = true;
    }

    private onClose = (param1: WindowMouseEvent): void => {
        this.hide();
    };

    private createTransactionTable(): void {
        this._SafeStr_3775 = new TableView(this._windowManager, this.tableView, true, true);
        let _loc1_: any[] = [new TableColumn("type", this.loc("wiredchests.logs.col.type"), 0.17), new TableColumn("timestamp", this.loc("wiredchests.logs.col.timestamp"), 0.15), new TableColumn("username", this.loc("wiredchests.logs.col.username"), 0.14), new TableColumn("withdraws", this.loc("wiredchests.logs.col.withdraws"), 0.14), new TableColumn("deposits", this.loc("wiredchests.logs.col.deposits"), 0.14), new TableColumn("chests", this.loc("wiredchests.logs.col.chests"), 0.12), new TableColumn("details", this.loc("wiredchests.logs.col.details"), 0.14)];
        this._SafeStr_3775.initialize(Array.from(_loc1_), true, true);
    }

    private calculateLastPage(): number {
        if (this._controller.logs == null) {
            return 1;
        }
        return Math.max(this._controller.logs.totalLogs - 1, 0) / TransactionConfig.PAGE_SIZE + 1 | 0;
    }

    private onLastPageClick = (param1: WindowMouseEvent): void => {
        if (this._controller.logs == null) {
            return;
        }
        this.requestPage(this.calculateLastPage());
    };

    private onNextPageClick = (param1: WindowMouseEvent): void => {
        if (this._controller.logs == null) {
            return;
        }
        this.requestPage(this._controller.logs.currentPage + 1);
    };

    private onPreviousPageClick = (param1: WindowMouseEvent): void => {
        if (this._controller.logs == null) {
            return;
        }
        this.requestPage(this._controller.logs.currentPage - 1);
    };

    private onFirstPageClick = (param1: WindowMouseEvent): void => {
        if (this._controller.logs == null) {
            return;
        }
        this.requestPage(1);
    };

    private onRefreshClick = (param1: WindowMouseEvent): void => {
        if (this._controller.logs == null) {
            return;
        }
        this.requestPage(this._controller.logs.currentPage);
    };

    private onPageInputClickAway = (param1: WindowMouseEvent): void => {
        this.navigateToInputPage();
    };

    private onPageInputDown = (param1: WindowKeyboardEvent): void => {
        let _loc2_: WindowKeyboardEvent = param1 instanceof WindowKeyboardEvent ? param1 : null;
        if (_loc2_ == null) {
            return;
        }
        if (_loc2_.keyCode == 13) {
            this.navigateToInputPage();
        }
    };

    private navigateToInputPage(): void {
        let _loc2_: any = Number(this.pageNumberInput.text) | 0;
        let _loc1_: number = this.calculateLastPage();
        if (_loc2_ < 1) {
            _loc2_ = 1;
            this.pageNumberInput.text = String(_loc2_);
        } else if (_loc2_ > _loc1_) {
            _loc2_ = _loc1_;
            this.pageNumberInput.text = String(_loc2_);
        }
        if (this._controller.logs == null) {
            return;
        }
        if (_loc2_ != this._controller.logs.currentPage) {
            this.requestPage(_loc2_ | 0);
        }
    }

    private requestPage(param1: number): void {
        let _loc2_: number = getTimer();
        if (this._SafeStr_5638 > _loc2_ - 280) {
            return;
        }
        if (param1 == this._SafeStr_4616 && this._SafeStr_5638 > _loc2_ - 2000) {
            return;
        }
        this._SafeStr_4616 = param1;
        this._SafeStr_5638 = _loc2_;
        if (this._controller.logs.logListType == WiredTransactionLogList._SafeStr_7323) {
            this._controller.send(new WiredTransactionGetChestLogsMessageComposer(this._controller.logs.logListId, TransactionConfig.PAGE_SIZE, param1));
        } else {
            this._controller.send(new WiredTransactionGetRoomLogsMessageComposer(TransactionConfig.PAGE_SIZE, param1));
        }
        this._loadingIcon.setVisible(this.loadingIconWindow, true);
    }

    get [IDisposable](): true {
        return true;
    }
}
