import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WiredMenuController } from '@/com/sulake/habbo/roomevents/wired_menu/WiredMenuController';
import { WiredMenuChestsTab } from '@/com/sulake/habbo/roomevents/wired_menu/tabs/tab_chests/TransactionPreviewTableObject.group';
import { WiredMenuInfoTab } from '@/com/sulake/habbo/roomevents/wired_menu/tabs/tab_info/WiredMenuInfoTab';
import { WiredMenuInspectionTab } from '@/com/sulake/habbo/roomevents/wired_menu/tabs/tab_inspection/VariableValueTableObject.group';
import { WiredMenuMonitorTab } from '@/com/sulake/habbo/roomevents/wired_menu/tabs/tab_monitor/ErrorDataTableObject.group';
import { WiredMenuSettingsTab } from '@/com/sulake/habbo/roomevents/wired_menu/tabs/tab_settings/WiredMenuSettingsTab';
import { WiredMenuOverviewTab } from '@/com/sulake/habbo/roomevents/wired_menu/tabs/tab_variable_overview/PropertyTableObject.group';
import { WiredMenuTabConfig } from '@/com/sulake/habbo/roomevents/wired_menu/tabs/WiredMenuTabConfig';

export class WiredMenuTabConfigs {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_menu.tabs::WiredMenuTabConfigs'); }

    public static TAB_MONITOR_ID: string = "monitor";
    public static TAB_OVERVIEW_ID: string = "variable_overview";
    public static TAB_INSPECTION_ID: string = "inspection";
    public static TAB_CHESTS_ID: string = "chests";
    public static TAB_SETTINGS_ID: string = "settings";
    public static TAB_INFO_ID: string = "info";

    constructor(param1: WiredMenuController) {
        this._menuTabs = Array.from([new WiredMenuTabConfig(WiredMenuTabConfigs.TAB_MONITOR_ID, WiredMenuMonitorTab), new WiredMenuTabConfig(WiredMenuTabConfigs.TAB_OVERVIEW_ID, WiredMenuOverviewTab), new WiredMenuTabConfig(WiredMenuTabConfigs.TAB_INSPECTION_ID, WiredMenuInspectionTab), new WiredMenuTabConfig(WiredMenuTabConfigs.TAB_CHESTS_ID, WiredMenuChestsTab), new WiredMenuTabConfig(WiredMenuTabConfigs.TAB_SETTINGS_ID, WiredMenuSettingsTab), new WiredMenuTabConfig(WiredMenuTabConfigs.TAB_INFO_ID, WiredMenuInfoTab, true, true, false)]);
    }

    declare private _menuTabs: WiredMenuTabConfig[];

    public get menuTabs(): WiredMenuTabConfig[] {
        return this._menuTabs;
    }
}
