import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ICheckBoxWindow } from '@/com/sulake/core/window/components/ICheckBoxWindow';
import type { IDropMenuWindow } from '@/com/sulake/core/window/components/IDropMenuWindow';
import type { ITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WiredLogPage } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredmenu/roomlogs/WiredLogPage';
import type { WiredRoomLogListController } from '@/com/sulake/habbo/roomevents/wired_menu/roomlogs/WiredRoomLogListController';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { ITableObject } from '@/com/sulake/habbo/window/utils/tableview/ITableObject';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { setTimeout } from '@habbo-pixi/runtime/utils/setTimeout';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { isICheckBoxWindow } from '@/com/sulake/core/window/components/ICheckBoxWindow';
import { isIDropMenuWindow } from '@/com/sulake/core/window/components/IDropMenuWindow';
import { isITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import { WindowKeyboardEvent } from '@/com/sulake/core/window/events/WindowKeyboardEvent';
import { WiredGetRoomLogsComposer } from '@/com/sulake/habbo/communication/messages/outgoing/userdefinedroomevents/wiredmenu/roomlogs/WiredGetRoomLogsComposer';
import { PagedTableView } from '@/com/sulake/habbo/roomevents/common/PagedTableView';
import { WiredRoomLogListTableObject } from '@/com/sulake/habbo/roomevents/wired_menu/roomlogs/WiredRoomLogListTableObject';
import { WiredRoomLogsConfig } from '@/com/sulake/habbo/roomevents/wired_menu/roomlogs/WiredRoomLogsConfig';
import { TableColumn } from '@/com/sulake/habbo/window/utils/tableview/TableColumn';
import { TableView } from '@/com/sulake/habbo/window/utils/tableview/TableView';

export class WiredRoomLogListView extends PagedTableView {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_menu.roomlogs::WiredRoomLogListView'); }

    public static readonly REQUEST_PAGE_RATELIMIT: number = 190;
    public static readonly REFRESH_TIME: number = 2500;
    public static readonly LOG_COLUMN_TIMESTAMP: string = "timestamp";
    public static readonly _SafeStr_7816: string = "source";
    public static readonly _SafeStr_8750: string = "level";
    public static readonly LOG_COLUMN_MESSAGE: string = "message";

    declare private _controller: WiredRoomLogListController;

    declare private _ignoreDropmenuEvents: boolean;

    declare private _SafeStr_3526: Timer;

    constructor(param1: WiredRoomLogListController, param2: IHabboWindowManager) {
        super(param1.assets.getAssetByName("logs_overview_xml"), param2, param1.localizationManager, false);
        this._controller = param1;
        this.logSourceMenu.addEventListener("WE_SELECT", this.onSelectFilter);
        this.logLevelMenu.addEventListener("WE_SELECT", this.onSelectFilter);
        this.logSourceMenu.addEventListener("WE_SELECTED", this.onSelectedFilter);
        this.logLevelMenu.addEventListener("WE_SELECTED", this.onSelectedFilter);
        this.filterInput.addEventListener("WKE_KEY_DOWN", this.onFilterInputDown);
        this.autoRefreshCheckbox.select();
        this.startAutoRefresh();
    }

    private onFilterInputDown(param1: WindowKeyboardEvent): void {
        let _loc2_: WindowKeyboardEvent = param1 instanceof WindowKeyboardEvent ? param1 : null;
        if (_loc2_ == null) {
            return;
        }
        if (_loc2_.keyCode == 13) {
            this.updateFilters();
        }
    }

    private startAutoRefresh(): void {
        if (this._SafeStr_3526 == null) {
            this._SafeStr_3526 = new Timer(2500);
            this._SafeStr_3526.addEventListener("timer", this.onAutoRefresh);
        }
        this._SafeStr_3526.start();
    }

    private onAutoRefresh(param1: TimerEvent): void {
        if (!this.autoRefreshCheckbox.isSelected || !this.isShowing()) {
            return;
        }
        let _loc2_: WiredLogPage = this._controller.page;
        if (_loc2_ != null) {
            this.requestPageWithFilters(_loc2_.currentPage, _loc2_.logSourceFilter, _loc2_.logLevelFilter, _loc2_.query == null ? "" : _loc2_.query, true);
        }
    }

    public displayNewPage(param1: boolean): void {
        if (this._controller.page == null) {
            return;
        }
        let _loc3_: WiredLogPage = this._controller.page;
        if (!param1) {
            this.sourceOption = _loc3_.logSourceFilter;
            this.levelOption = _loc3_.logLevelFilter;
            this.filterInput.text = _loc3_.query;
        }
        this.onPageLoaded();
        let _loc2_: ITableObject[] = [];
        for (const _loc4_ of _loc3_.elements ?? []) {
            _loc2_.push(new WiredRoomLogListTableObject(this._controller, _loc4_));
        }
        this._SafeStr_2737.setObjects(_loc2_);
        if (!param1) {
            this._SafeStr_2737.scrollToTop();
            this._window.activate();
        }
    }

    protected override createTable(): void {
        this._SafeStr_2737 = new TableView(this._windowManager, this.tableViewContainer, true);
        let _loc1_: any[] = [new TableColumn("timestamp", this.loc("wiredmenu.logs_overview.col.timestamp"), 0.2), new TableColumn("source", this.loc("wiredmenu.logs_overview.col.source"), 0.08), new TableColumn("level", this.loc("wiredmenu.logs_overview.col.level"), 0.08), new TableColumn("message", this.loc("wiredmenu.logs_overview.col.message"), 0.64)];
        this._SafeStr_2737.initialize(Array.from(_loc1_), true, true);
    }

    protected override calculateLastPage(): number {
        if (this._controller.page == null) {
            return -1;
        }
        return Math.max(this._controller.page.totalEntries - 1, 0) / WiredRoomLogsConfig.PAGE_SIZE + 1 | 0;
    }

    protected override currentPage(): number {
        if (this._controller.page == null) {
            return -1;
        }
        return this._controller.page.currentPage;
    }

    protected override requestPageRatelimit(): number {
        return 190;
    }

    protected override pagingTextKey(): string {
        return "wiredmenu.logs_overview.bottom_text";
    }

    protected override totalEntries(): number {
        if (this._controller.page == null) {
            return -1;
        }
        return this._controller.page.totalEntries;
    }

    private requestPageWithFilters(param1: number, param2: number, param3: number, param4: string, param5: boolean = false): boolean {
        if (!super.requestPage(param1)) {
            return false;
        }
        let _loc6_: WiredLogPage = this._controller.page;
        if (_loc6_ == null) {
            return false;
        }
        if (param2 == 2147483647) {
            param2 = _loc6_.logSourceFilter;
        }
        if (param3 == 2147483647) {
            param3 = _loc6_.logLevelFilter;
        }
        if (param4 == null) {
            param4 = "";
        }
        this._controller.send(new WiredGetRoomLogsComposer(param1, WiredRoomLogsConfig.PAGE_SIZE, param3, param2, param4), param5);
        this.onPageLoaded();
        return true;
    }

    protected override requestPage(param1: number): boolean {
        return this.requestPageWithFilters(param1, 2147483647, 2147483647, null);
    }

    private onSelectFilter(param1: WindowEvent): void {
        if (this._ignoreDropmenuEvents) {
            return;
        }
        if (!this.canRequestNewPage(false)) {
            param1.preventWindowOperation();
        }
    }

    private onSelectedFilter(param1: WindowEvent): void {
        if (this._ignoreDropmenuEvents) {
            return;
        }
        this.updateFilters();
    }

    private updateFilters(param1: boolean = true): void {
        let firstAttempt: boolean = param1;
        if (!this.canRequestNewPage(false)) {
            if (!firstAttempt) {
                this._SafeStr_3526.reset();
                this._SafeStr_3526.start();
                setTimeout((): void => {
                   this.updateFilters(false);
               }, 190 + 10);
            }
            return;
        }
        this._SafeStr_3526.reset();
        this._SafeStr_3526.start();
        this.requestPageWithFilters(1, this.sourceOption, this.levelOption, this.filterInput.text);
    }

    private set levelOption(param1: number) {
        this._ignoreDropmenuEvents = true;
        this.logLevelMenu.selection = param1 + 1;
        this._ignoreDropmenuEvents = false;
    }

    private get levelOption(): number {
        return this.logLevelMenu.selection - 1;
    }

    private set sourceOption(param1: number) {
        this._ignoreDropmenuEvents = true;
        this.logSourceMenu.selection = param1 + 1;
        this._ignoreDropmenuEvents = false;
    }

    private get sourceOption(): number {
        return this.logSourceMenu.selection - 1;
    }

    public activate(): void {
        this._window.activate();
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        super.dispose();
        this._controller = null;
    }

    private get autoRefreshCheckbox(): ICheckBoxWindow {
        return asGuarded(this._window.findChildByName("auto_refresh_cbx"), isICheckBoxWindow);
    }

    private get logSourceMenu(): IDropMenuWindow {
        return asGuarded(this._window.findChildByName("log_source_menu"), isIDropMenuWindow);
    }

    private get logLevelMenu(): IDropMenuWindow {
        return asGuarded(this._window.findChildByName("log_level_menu"), isIDropMenuWindow);
    }

    private get filterInput(): ITextFieldWindow {
        return asGuarded(this._window.findChildByName("filter_input"), isITextFieldWindow);
    }

    protected override initInstanceFields(): void {
        this.onFilterInputDown = this.onFilterInputDown.bind(this);
        this.onAutoRefresh = this.onAutoRefresh.bind(this);
        this.onSelectFilter = this.onSelectFilter.bind(this);
        this.onSelectedFilter = this.onSelectedFilter.bind(this);
        this._ignoreDropmenuEvents = false;
        super.initInstanceFields();
    }
}
