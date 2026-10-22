import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { NewVariablePicker } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/newvariablepicker/NewVariablePicker';
import type { VariableNode } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/newvariablepicker/overview/VariableNode';
import type { TabButtonConfig } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/newvariablepicker/tabbuttons/TabButtonConfig';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { VariableNodeListView } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/newvariablepicker/overview/VariableNodeListView.group';
import { TabButtonConfigs } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/newvariablepicker/tabbuttons/TabButtonConfigs';
import { TabButtonView } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/newvariablepicker/tabbuttons/TabButtonView';

export class ExpandedVariablePickerView implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets.newvariablepicker::ExpandedVariablePickerView'); }

    declare private _picker: NewVariablePicker;

    declare private _window: IWindowContainer;

    declare private _SafeStr_4907: IRegionWindow;

    declare private _overviewTemplate: IBorderWindow;

    declare private _tabButtons: TabButtonView[];

    declare private _SafeStr_3869: TabButtonConfigs;

    declare private _SafeStr_2571: TabButtonView;

    declare private _SafeStr_2405: VariableNodeListView;

    private _disposed: boolean = false;

    constructor(param1: NewVariablePicker, param2: IWindowContainer) {
        let _loc7_: number = 0;
        let _loc3_: TabButtonView = null;
        this._picker = param1;
        this._window = param2;
        this._SafeStr_4907 = asGuarded(this.buttonList.removeListItemAt(0), isIRegionWindow);
        this._overviewTemplate = asGuarded(this.contentBox.removeChild(this.contentBox.getChildByName("variable_overview_template")), isIBorderWindow);
        this.contentBox.removeChild(this.contentBox.getChildByName("node_template"));
        this._SafeStr_3869 = new TabButtonConfigs(param1);
        this._tabButtons = [];
        this.expandedWindow.width = param1.window.width;
        let _loc5_: number = (this.expandedWindow.width - 3) / this._SafeStr_3869.tabButtons.length | 0;
        let _loc4_: number = _loc5_ % this._SafeStr_3869.tabButtons.length;
        for (const _loc6_ of this._SafeStr_3869.tabButtons ?? []) {
            _loc7_ = 0;
            if (_loc4_ > 0) {
                _loc7_ += 1;
                _loc4_ -= 1;
            }
            _loc3_ = new TabButtonView(this, _loc6_, _loc5_ + _loc7_);
            this._tabButtons.push(_loc3_);
            this.buttonList.addListItem(_loc3_.window);
        }
    }

    public onHide(): void {
        if (this._SafeStr_2405 != null) {
            this.contentBox.removeChild(this._SafeStr_2405.window);
            this._SafeStr_2405.dispose();
            this._SafeStr_2405 = null;
        }
    }

    public onVisible(): void {
        this.loadTab(this._SafeStr_2571.tabConfig);
    }

    public get roomEvents(): HabboUserDefinedRoomEvents {
        return this._picker.roomEvents;
    }

    public tabById(param1: number): TabButtonView {
        for (const _loc2_ of this._tabButtons ?? []) {
            if (_loc2_.tabConfig.tabId == param1) {
                return _loc2_;
            }
        }
        return null;
    }

    public get selectedTab(): TabButtonView {
        return this._SafeStr_2571;
    }

    public get activeItemsView(): VariableNodeListView {
        return this._SafeStr_2405;
    }

    public selectTab(param1: TabButtonView, param2: boolean = false): void {
        if (this._SafeStr_2571 == param1) {
            if (param2 && this._SafeStr_2571 != null) {
                this.loadTab(this._SafeStr_2571.tabConfig);
            }
            return;
        }
        if (this._SafeStr_2571 != null) {
            this._SafeStr_2571.active = false;
            this._SafeStr_2571 = null;
        }
        if (param1 != null) {
            this._SafeStr_2571 = param1;
            this._SafeStr_2571.active = true;
            this.loadTab(this._SafeStr_2571.tabConfig);
        }
        this._picker.inputField.focus();
    }

    public loadTab(param1: TabButtonConfig): void {
        let _loc2_: any = undefined;
        if (this._SafeStr_2405 != null) {
            this.contentBox.removeChild(this._SafeStr_2405.window);
            this._SafeStr_2405.dispose();
            this._SafeStr_2405 = null;
        }
        let _loc3_: VariableNode = param1.filteredVariables();
        if (_loc3_.childrenCount == 0) {
            this.emptyContainer.visible = true;
            this.contentBox.height = this.emptyContainer.height;
        } else {
            _loc2_ = _loc3_.children;
            this.emptyContainer.visible = false;
            this._SafeStr_2405 = new VariableNodeListView(this._picker, _loc2_, this.contentBox.width, true);
            this.contentBox.addChild(this._SafeStr_2405.window);
            this.contentBox.height = this._SafeStr_2405.window.height;
        }
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this.buttonList.removeListItems();
        for (const _loc1_ of this._tabButtons ?? []) {
            _loc1_.dispose();
        }
        if (this._SafeStr_2405 != null) {
            this._SafeStr_2405.dispose();
            this._SafeStr_2405 = null;
        }
        this._tabButtons = null;
        this._picker = null;
        this._window = null;
        this._SafeStr_4907 = null;
        this._SafeStr_3869 = null;
        this._SafeStr_2571 = null;
        this._disposed = true;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get tabButtonTemplate(): IRegionWindow {
        return this._SafeStr_4907;
    }

    public get overviewTemplate(): IBorderWindow {
        return this._overviewTemplate;
    }

    private get buttonList(): IItemListWindow {
        return asGuarded(this._window.findChildByName("button_list"), isIItemListWindow);
    }

    private get expandedWindow(): IBorderWindow {
        return asGuarded(this._window.findChildByName("expanded_view"), isIBorderWindow);
    }

    private get contentBox(): IWindowContainer {
        return asGuarded(this._window.findChildByName("content_box"), isIWindowContainer);
    }

    private get emptyContainer(): IWindowContainer {
        return asGuarded(this._window.findChildByName("empty_container"), isIWindowContainer);
    }

    public get window(): IWindowContainer {
        return this._window;
    }

    get [IDisposable](): true {
        return true;
    }
}
