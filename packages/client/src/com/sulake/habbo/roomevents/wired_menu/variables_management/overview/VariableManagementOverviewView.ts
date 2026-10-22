import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IDropMenuWindow } from '@/com/sulake/core/window/components/IDropMenuWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WiredVariable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/variables/WiredVariable';
import type { WiredUserVariablesPage } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredmenu/variables_management/WiredUserVariablesPage';
import type { VariableManagementOverviewController } from '@/com/sulake/habbo/roomevents/wired_menu/variables_management/overview/VariableManagementOverviewController';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { ITableObject } from '@/com/sulake/habbo/window/utils/tableview/ITableObject';
import { isIDropMenuWindow } from '@/com/sulake/core/window/components/IDropMenuWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { WiredGetVariableOwnersPageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/userdefinedroomevents/wiredmenu/variables_management/WiredGetVariableOwnersPageComposer';
import { PagedTableView } from '@/com/sulake/habbo/roomevents/common/PagedTableView';
import { VariableManagementConfig } from '@/com/sulake/habbo/roomevents/wired_menu/variables_management/overview/VariableManagementConfig';
import { VariableManagementOverviewTableObject } from '@/com/sulake/habbo/roomevents/wired_menu/variables_management/overview/VariableManagementOverviewTableObject';
import { TableColumn } from '@/com/sulake/habbo/window/utils/tableview/TableColumn';
import { TableView } from '@/com/sulake/habbo/window/utils/tableview/TableView';

export class VariableManagementOverviewView extends PagedTableView {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_menu.variables_management.overview::VariableManagementOverviewView'); }

    public static readonly REQUEST_PAGE_RATELIMIT: number = 280;
    public static readonly LOG_COLUMN_USERTYPE: string = "usertype";
    public static readonly LOG_COLUMN_NAME: string = "name";
    public static readonly LOG_COLUMN_CREATION_TIME: string = "creation_time";
    public static readonly LOG_COLUMN_LAST_UPDATE_TIME: string = "last_update_time";
    public static readonly _SafeStr_8157: string = "value";
    public static readonly LOG_COLUMN_MANAGE: string = "manage";

    constructor(param1: VariableManagementOverviewController, param2: IHabboWindowManager) {
        super(param1.assets.getAssetByName("variables_management_overview_xml"), param2, param1.localizationManager);
        this._controller = param1;
        this.userTypeMenu.addEventListener("WE_SELECT", this.onSelectFilter);
        this.sortTypeMenu.addEventListener("WE_SELECT", this.onSelectFilter);
        this.userTypeMenu.addEventListener("WE_SELECTED", this.onSelectedFilter);
        this.sortTypeMenu.addEventListener("WE_SELECTED", this.onSelectedFilter);
    }

    declare private _controller: VariableManagementOverviewController;

    declare private _ignoreDropmenuEvents: boolean;

    private get sortTypeOption(): number {
        return this.sortTypeMenu.selection;
    }

    private set sortTypeOption(param1: number) {
        this._ignoreDropmenuEvents = true;
        this.sortTypeMenu.selection = param1;
        this._ignoreDropmenuEvents = false;
    }

    private get userTypeOption(): number {
        let _loc1_: number = this.userTypeMenu.selection;
        if (_loc1_ == 3) {
            return 4;
        }
        if (_loc1_ == 1 || _loc1_ == 2) {
            return _loc1_;
        }
        return -1;
    }

    private set userTypeOption(param1: number) {
        let _loc2_: any = param1;
        if (_loc2_ == 4) {
            _loc2_ = 3;
        } else if (_loc2_ != 1 && _loc2_ != 2) {
            _loc2_ = 0;
        }
        this._ignoreDropmenuEvents = true;
        this.userTypeMenu.selection = _loc2_ | 0;
        this._ignoreDropmenuEvents = false;
    }

    private get variableNameValue(): ITextWindow {
        return asGuarded(this._window.findChildByName("variable_name_value"), isITextWindow);
    }

    private get userTypeMenu(): IDropMenuWindow {
        return asGuarded(this._window.findChildByName("user_type_menu"), isIDropMenuWindow);
    }

    private get sortTypeMenu(): IDropMenuWindow {
        return asGuarded(this._window.findChildByName("sort_type_menu"), isIDropMenuWindow);
    }

    protected override createTable(): void {
        this._SafeStr_2737 = new TableView(this._windowManager, this.tableViewContainer, true);
        let _loc1_: any[] = [new TableColumn("usertype", this.loc("wiredmenu.variable_management.col.usertype"), 0.1), new TableColumn("name", this.loc("wiredmenu.variable_management.col.name"), 0.18), new TableColumn("creation_time", this.loc("wiredmenu.variable_management.col.creation_time"), 0.21), new TableColumn("last_update_time", this.loc("wiredmenu.variable_management.col.last_update_time"), 0.21), new TableColumn("value", this.loc("wiredmenu.variable_management.col.value"), 0.18), new TableColumn("manage", this.loc("wiredmenu.variable_management.col.manage"), 0.12)];
        this._SafeStr_2737.initialize(Array.from(_loc1_), true, true);
    }

    protected override calculateLastPage(): number {
        if (this._controller.page == null) {
            return -1;
        }
        return Math.max(this._controller.page.totalEntries - 1, 0) / VariableManagementConfig.PAGE_SIZE + 1 | 0;
    }

    protected override currentPage(): number {
        if (this._controller.page == null) {
            return -1;
        }
        return this._controller.page.currentPage;
    }

    protected override requestPageRatelimit(): number {
        return 280;
    }

    protected override pagingTextKey(): string {
        return "wiredmenu.variable_management.bottom_text";
    }

    protected override totalEntries(): number {
        if (this._controller.page == null) {
            return -1;
        }
        return this._controller.page.totalEntries;
    }

    protected override requestPage(param1: number): boolean {
        return this.requestPageWithFilters(param1, 2147483647, 2147483647);
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        super.dispose();
        this._controller = null;
    }

    public displayNewPage(): void {
        if (this._controller.page == null) {
            return;
        }
        let _loc2_: WiredUserVariablesPage = this._controller.page;
        let _loc4_: string = _loc2_.variableId;
        let _loc3_: WiredVariable = this._controller.roomEvents.variablesSynchronizer.getCachedVariableById(_loc4_);
        if (_loc3_ == null) {
            return;
        }
        this.variableNameValue.text = _loc3_.variableName;
        this.userTypeOption = _loc2_.userTypeFilter;
        this.sortTypeOption = _loc2_.sortTypFilter;
        this.onPageLoaded();
        let _loc1_: ITableObject[] = [];
        for (const _loc5_ of _loc2_.elements ?? []) {
            _loc1_.push(new VariableManagementOverviewTableObject(this._controller, _loc5_, _loc3_));
        }
        this._SafeStr_2737.setObjects(_loc1_);
        this._SafeStr_2737.scrollToTop();
        this._window.activate();
    }

    private requestPageWithFilters(param1: number, param2: number, param3: number): boolean {
        if (!super.requestPage(param1)) {
            return false;
        }
        let _loc4_: WiredUserVariablesPage = this._controller.page;
        if (_loc4_ == null) {
            return false;
        }
        if (param2 == 2147483647) {
            param2 = _loc4_.sortTypFilter;
        }
        if (param3 == 2147483647) {
            param3 = _loc4_.userTypeFilter;
        }
        this._controller.send(new WiredGetVariableOwnersPageComposer(_loc4_.variableId, param1, VariableManagementConfig.PAGE_SIZE, param2, param3));
        this.onPageLoaded();
        return true;
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
        if (!this.canRequestNewPage(false)) {
            return;
        }
        this.requestPageWithFilters(1, this.sortTypeOption, this.userTypeOption);
    }

    protected override initInstanceFields(): void {
        this.onSelectFilter = this.onSelectFilter.bind(this);
        this.onSelectedFilter = this.onSelectedFilter.bind(this);
        this._ignoreDropmenuEvents = false;
        super.initInstanceFields();
    }
}
