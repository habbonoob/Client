import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { IHTMLTextWindow } from '@/com/sulake/core/window/components/IHTMLTextWindow';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { WiredErrorData } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredmenu/WiredErrorData';
import type { WiredRoomStatsData } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredmenu/WiredRoomStatsData';
import type { WiredMenuController } from '@/com/sulake/habbo/roomevents/wired_menu/WiredMenuController';
import type { ITableObject } from '@/com/sulake/habbo/window/utils/tableview/ITableObject';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { setTimeout } from '@habbo-pixi/runtime/utils/setTimeout';
import { IUpdateReceiver } from '@/com/sulake/core/runtime/IUpdateReceiver';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isIHTMLTextWindow } from '@/com/sulake/core/window/components/IHTMLTextWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { WiredErrorLogsEvent } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredmenu/WiredErrorLogsEvent';
import { WiredRoomStatsEvent } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredmenu/WiredRoomStatsEvent';
import { ProgressTreasureHuntMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/treasurehunt/ProgressTreasureHuntMessageComposer';
import { WiredGetRoomLogsComposer } from '@/com/sulake/habbo/communication/messages/outgoing/userdefinedroomevents/wiredmenu/roomlogs/WiredGetRoomLogsComposer';
import { WiredClearErrorLogsMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/userdefinedroomevents/wiredmenu/WiredClearErrorLogsMessageComposer';
import { WiredGetErrorLogsMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/userdefinedroomevents/wiredmenu/WiredGetErrorLogsMessageComposer';
import { WiredGetRoomStatsMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/userdefinedroomevents/wiredmenu/WiredGetRoomStatsMessageComposer';
import { Util } from '@/com/sulake/habbo/roomevents/Util';
import { WiredRoomLogsConfig } from '@/com/sulake/habbo/roomevents/wired_menu/roomlogs/WiredRoomLogsConfig';
import { ErrorDataTableObject } from '@/com/sulake/habbo/roomevents/wired_menu/tabs/tab_monitor/ErrorDataTableObject.group';
import { WiredErrorInfoView } from '@/com/sulake/habbo/roomevents/wired_menu/tabs/tab_monitor/WiredErrorInfoView';
import { WiredMenuDefaultTab } from '@/com/sulake/habbo/roomevents/wired_menu/tabs/WiredMenuDefaultTab';
import { TableColumn } from '@/com/sulake/habbo/window/utils/tableview/TableColumn';
import { TableView } from '@/com/sulake/habbo/window/utils/tableview/TableView';

export class WiredMenuMonitorTab extends WiredMenuDefaultTab implements IUpdateReceiver {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_menu.tabs.tab_monitor::WiredMenuMonitorTab'); }

    private static POLL_MONITOR_MS: number = 500;
    private static CLEAR_LOGS_TIMEOUT: number = 4000;
    private static COLOR_RED: string = "ff5733";
    private static COLOR_ORANGE: string = "BD7800";
    private static COLOR_GREEN: string = "008000";
    private static THRESHOLD_USAGE_1: number = 0.3;
    private static THRESHOLD_USAGE_2: number = 0.7;
    private static THRESHOLD_FURNI_1: number = 0.6;
    private static THRESHOLD_FURNI_2: number = 0.85;
    private static THRESHOLD_VARS_1: number = 0.5;
    private static THRESHOLD_VARS_2: number = 0.8;
    public static LOG_COLUMN_TYPE: string = "type";
    public static _SafeStr_7383: string = "category";
    public static _SafeStr_6468: string = "quantity";
    public static LOG_COLUMN_LATEST: string = "latest";

    declare private _SafeStr_4245: TableView;

    private _SafeStr_6283: number = 0;
    private _SafeStr_3415: WiredErrorInfoView = null;
    private _SafeStr_6450: number = 0;
    private _SafeStr_3396: WiredErrorData[] = null;
    private _roomStats: WiredRoomStatsData = null;

    constructor(param1: WiredMenuController, param2: IWindowContainer) {
        super(param1, param2);
        this.createLogTable();
        this.addMessageEvent(new WiredRoomStatsEvent(this.onRoomStatsEvent));
        this.addMessageEvent(new WiredErrorLogsEvent(this.onErrorLogsEvent));
        this.clearButton.addEventListener("WME_CLICK", this.onClearButtonClicked);
        this.logOverviewButton.addEventListener("WME_CLICK", this.onLogOverviewButtonClicked);
        this.monitorImage2.addEventListener("WME_CLICK", this.onClickMonitor);
    }

    private static colorize(param1: number, param2: number, param3: number, param4: number, param5: number): string {
        let _loc6_: number = (param1 - param2) / (param3 - param2);
        if (_loc6_ < param4) {
            return WiredMenuMonitorTab.COLOR_GREEN;
        }
        if (_loc6_ < param5) {
            return WiredMenuMonitorTab.COLOR_ORANGE;
        }
        return WiredMenuMonitorTab.COLOR_RED;
    }

    private createLogTable(): void {
        this._SafeStr_4245 = new TableView(this.controller.windowManager, this.logTableContainer);
        let _loc1_: any[] = [new TableColumn(WiredMenuMonitorTab.LOG_COLUMN_TYPE, this.loc("wiredmenu.monitor.column.type"), 0.33), new TableColumn(WiredMenuMonitorTab._SafeStr_7383, this.loc("wiredmenu.monitor.column.category"), 0.22), new TableColumn(WiredMenuMonitorTab._SafeStr_6468, this.loc("wiredmenu.monitor.column.occurrences"), 0.15), new TableColumn(WiredMenuMonitorTab.LOG_COLUMN_LATEST, this.loc("wiredmenu.monitor.column.latest"), 0.3)];
        this._SafeStr_4245.initialize(Array.from(_loc1_));
    }

    public override startViewing(): void {
        super.startViewing();
        this.clearData();
        this.updateLoadingState();
        this.requestData();
    }

    protected override isDataReady(): boolean {
        return this._SafeStr_3396 != null && this._roomStats != null;
    }

    private clearData(): void {
        this._SafeStr_3396 = null;
        this._roomStats = null;
    }

    private requestData(): void {
        this._SafeStr_6283 = getTimer();
        this.controller.send(new WiredGetRoomStatsMessageComposer());
        this.controller.send(new WiredGetErrorLogsMessageComposer());
    }

    private onRoomStatsEvent = (param1: WiredRoomStatsEvent): void => {
        this._roomStats = param1.getParser().roomStats;
        if (this.isLoading) {
            this.updateLoadingState();
        } else {
            this.updateRoomStatsUI();
            this.updateImageUI();
        }
    };

    private onErrorLogsEvent = (param1: WiredErrorLogsEvent): void => {
        this._SafeStr_3396 = param1.getParser().errors;
        if (this.isLoading) {
            this.updateLoadingState();
        } else {
            this.updateErrorLogsUI();
            this.updateButtonsUI();
            this.updateImageUI();
        }
    };

    private onClearButtonClicked = (param1: WindowMouseEvent): void => {
        this.clearButton.disable();
        this.controller.send(new WiredClearErrorLogsMessageComposer());
        this._SafeStr_6450 = getTimer();
        setTimeout(this.updateButtonsUI, WiredMenuMonitorTab.CLEAR_LOGS_TIMEOUT + 500);
    };

    private onLogOverviewButtonClicked = (param1: WindowMouseEvent): void => {
        this.controller.roomLogListController.send(new WiredGetRoomLogsComposer(1, WiredRoomLogsConfig.PAGE_SIZE, -1, -1, ""));
    };

    protected override initializeInterface(): void {
        this.updateRoomStatsUI();
        this.updateErrorLogsUI();
        this.updateButtonsUI();
        this.updateImageUI();
    }

    private updateRoomStatsUI(): void {
        this.statWiredUsageHtml.caption = this.localization.getLocalizationWithParams("wiredmenu.monitor.statistics.usage", "", "color", this.usageStatColor, "amount", this._roomStats.executionCost.toFixed(0), "limit", this._roomStats.executionCostCap.toFixed(0));
        this.statHeavyHtml.caption = this.localization.getLocalizationWithParams("wiredmenu.monitor.statistics.is_heavy", "", "color", this._roomStats.isHeavy ? WiredMenuMonitorTab.COLOR_ORANGE : WiredMenuMonitorTab.COLOR_GREEN, "bool", this._roomStats.isHeavy ? this.localization.getLocalization("wiredmenu.bool.yes") : this.localization.getLocalization("wiredmenu.bool.no"));
        this.statFloorCountHtml.caption = this.localization.getLocalizationWithParams("wiredmenu.monitor.statistics.floorfurni", "", "color", this.floorItemStatColor, "amount", this._roomStats.floorItemCount, "limit", this._roomStats.floorItemCap);
        this.statWallCountHtml.caption = this.localization.getLocalizationWithParams("wiredmenu.monitor.statistics.wallfurni", "", "color", this.wallItemStatColor, "amount", this._roomStats.wallItemCount, "limit", this._roomStats.wallItemCap);
        this.statPermFurniVarsHtml.caption = this.localization.getLocalizationWithParams("wiredmenu.monitor.statistics.perm_furni_vars", "", "color", this.varLimitColor(this._roomStats.permanentFurniVariables, this._roomStats.maxPermanentFurniVariables), "amount", this._roomStats.permanentFurniVariables, "limit", this._roomStats.maxPermanentFurniVariables);
        this.statPermUserVarsHtml.caption = this.localization.getLocalizationWithParams("wiredmenu.monitor.statistics.perm_user_vars", "", "color", this.varLimitColor(this._roomStats.permanentUserVariables, this._roomStats.maxPermanentUserVariables), "amount", this._roomStats.permanentUserVariables, "limit", this._roomStats.maxPermanentUserVariables);
        this.statPermGlobalVarsHtml.caption = this.localization.getLocalizationWithParams("wiredmenu.monitor.statistics.perm_global_vars", "", "color", this.varLimitColor(this._roomStats.permanentGlobalVariables, this._roomStats.maxPermanentGlobalVariables), "amount", this._roomStats.permanentGlobalVariables, "limit", this._roomStats.maxPermanentGlobalVariables);
    }

    private get usageStatColor(): string {
        return WiredMenuMonitorTab.colorize(this._roomStats.executionCost | 0, 0, this._roomStats.executionCostCap | 0, WiredMenuMonitorTab.THRESHOLD_USAGE_1, WiredMenuMonitorTab.THRESHOLD_USAGE_2);
    }

    private get floorItemStatColor(): string {
        return WiredMenuMonitorTab.colorize(this._roomStats.floorItemCount, 0, this._roomStats.floorItemCap, WiredMenuMonitorTab.THRESHOLD_FURNI_1, WiredMenuMonitorTab.THRESHOLD_FURNI_2);
    }

    private get wallItemStatColor(): string {
        return WiredMenuMonitorTab.colorize(this._roomStats.wallItemCount, 0, this._roomStats.wallItemCap, WiredMenuMonitorTab.THRESHOLD_FURNI_1, WiredMenuMonitorTab.THRESHOLD_FURNI_2);
    }

    private varLimitColor(param1: number, param2: number): string {
        return WiredMenuMonitorTab.colorize(param1, 0, param2, WiredMenuMonitorTab.THRESHOLD_VARS_1, WiredMenuMonitorTab.THRESHOLD_VARS_2);
    }

    private updateErrorLogsUI(): void {
        let _loc1_: ITableObject[] = [];
        for (const _loc2_ of this._SafeStr_3396 ?? []) {
            _loc1_.push(new ErrorDataTableObject(this, _loc2_, this.localization));
        }
        this._SafeStr_4245.setObjects(_loc1_);
    }

    private updateImageUI(): void {
        let _loc1_: boolean = this.isFrankPanicking;
        this.monitorImage1.visible = !_loc1_;
        this.monitorImage2.visible = _loc1_;
    }

    private get isFrankPanicking(): boolean {
        if (this._roomStats.isHeavy) {
            return true;
        }
        if (this.usageStatColor != WiredMenuMonitorTab.COLOR_GREEN || this.floorItemStatColor != WiredMenuMonitorTab.COLOR_GREEN || this.wallItemStatColor != WiredMenuMonitorTab.COLOR_GREEN) {
            return true;
        }
        return this.hasErrors;
    }

    public onErrorLinkClicked(param1: WiredErrorData): void {
        if (this._SafeStr_3415 == null) {
            this._SafeStr_3415 = new WiredErrorInfoView(this.controller);
        }
        this._SafeStr_3415.initialize(param1);
        this._SafeStr_3415.show();
    }

    private updateButtonsUI = (): void => {
        Util.disableSection(this.logOverviewButton, !this.controller.hasReadPermission);
        let _loc1_: boolean = getTimer() < this._SafeStr_6450 + WiredMenuMonitorTab.CLEAR_LOGS_TIMEOUT;
        Util.disableSection(this.clearButton, !this.controller.hasWritePermission || _loc1_);
    };

    private get hasErrors(): boolean {
        for (const _loc1_ of this._SafeStr_3396 ?? []) {
            if (_loc1_.throwCount > 0) {
                return true;
            }
        }
        return false;
    }

    public override permissionsUpdated(): void {
        this.updateButtonsUI();
    }

    private onClickMonitor = (param1: WindowMouseEvent): void => {
        if (param1.localX < 14 || param1.localX > 61 || param1.localY < 45 || param1.localY > 107) {
            return;
        }
        this.controller.send(new ProgressTreasureHuntMessageComposer("wf15", (asGuarded(param1.window, isIStaticBitmapWrapperWindow)).assetUri));
    };

    public update(param1: number): void {
        if (!this.isViewing) {
            return;
        }
        let _loc2_: number = getTimer();
        if (this._SafeStr_6283 < _loc2_ - WiredMenuMonitorTab.POLL_MONITOR_MS) {
            this.requestData();
        }
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        if (this._SafeStr_3415 != null) {
            this._SafeStr_3415.dispose();
            this._SafeStr_3415 = null;
        }
        this._SafeStr_4245.dispose();
        this._SafeStr_4245 = null;
        this._SafeStr_3396 = null;
        this._roomStats = null;
        super.dispose();
    }

    private get statWiredUsageHtml(): IHTMLTextWindow {
        return asGuarded(this.container.findChildByName("statistics_usage_html"), isIHTMLTextWindow);
    }

    private get statHeavyHtml(): IHTMLTextWindow {
        return asGuarded(this.container.findChildByName("statistics_heavy_html"), isIHTMLTextWindow);
    }

    private get statFloorCountHtml(): IHTMLTextWindow {
        return asGuarded(this.container.findChildByName("statistics_floorfurni_html"), isIHTMLTextWindow);
    }

    private get statWallCountHtml(): IHTMLTextWindow {
        return asGuarded(this.container.findChildByName("statistics_wallfurni_html"), isIHTMLTextWindow);
    }

    private get statPermFurniVarsHtml(): IHTMLTextWindow {
        return asGuarded(this.container.findChildByName("statistics_perm_vars_furni_html"), isIHTMLTextWindow);
    }

    private get statPermUserVarsHtml(): IHTMLTextWindow {
        return asGuarded(this.container.findChildByName("statistics_perm_vars_user_html"), isIHTMLTextWindow);
    }

    private get statPermGlobalVarsHtml(): IHTMLTextWindow {
        return asGuarded(this.container.findChildByName("statistics_perm_vars_global_html"), isIHTMLTextWindow);
    }

    private get logTableContainer(): IWindowContainer {
        return asGuarded(this.container.findChildByName("log_table_container"), isIWindowContainer);
    }

    private get clearButton(): IButtonWindow {
        return asGuarded(this.container.findChildByName("clear_log_btn"), isIButtonWindow);
    }

    private get logOverviewButton(): IButtonWindow {
        return asGuarded(this.container.findChildByName("log_overview_btn"), isIButtonWindow);
    }

    private get monitorImage1(): IStaticBitmapWrapperWindow {
        return asGuarded(this.container.findChildByName("monitor_image_1"), isIStaticBitmapWrapperWindow);
    }

    private get monitorImage2(): IStaticBitmapWrapperWindow {
        return asGuarded(this.container.findChildByName("monitor_image_2"), isIStaticBitmapWrapperWindow);
    }

    get [IUpdateReceiver](): true {
        return true;
    }
}
