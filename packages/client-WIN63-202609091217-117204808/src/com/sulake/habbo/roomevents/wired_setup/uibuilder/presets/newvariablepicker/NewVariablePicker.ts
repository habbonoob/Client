import { asGuarded, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { ITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowKeyboardEvent } from '@/com/sulake/core/window/events/WindowKeyboardEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { _SafeCls_1969 } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/params/_SafeCls_1969';
import type { WiredVariable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/variables/WiredVariable';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { VariableNode } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/newvariablepicker/overview/VariableNode';
import type { VariableNodeListView } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/newvariablepicker/overview/VariableNodeListView';
import type { TabButtonView } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/newvariablepicker/tabbuttons/TabButtonView';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { WiredVariableType } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/variables/WiredVariableType';
import { ExpandedVariablePickerView } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/newvariablepicker/ExpandedVariablePickerView';
import { TabButtonConfigs } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/newvariablepicker/tabbuttons/TabButtonConfigs';

export class NewVariablePicker implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets.newvariablepicker::NewVariablePicker'); }

    public static UNSPECIFIED_TYPE: number = 2147483647;
    private _disposed: boolean = false;

    declare private _roomEvents: HabboUserDefinedRoomEvents;

    declare private _container: IWindowContainer;

    declare private _expandedWindowWrapper: IWindowContainer;

    declare private _inputFieldRegion: IRegionWindow;

    private _isExpanded: boolean = false;

    declare private _variableFilter: (...args: any[]) => any;

    declare private _SafeStr_5880: (...args: any[]) => any;

    private _showFilteredVariables: boolean = true;

    declare private _allVariables: _SafeCls_1969;

    declare private _filteredVariables: WiredVariable[];

    declare private _selected: WiredVariable;

    declare private _variableTarget: number;
    static { (this.prototype as any)._variableTarget = 0; }

    declare private _SafeStr_4095: Map<any, any>;

    declare private _SafeStr_7146: string;

    declare private _SafeStr_2970: boolean;
    static { (this.prototype as any)._SafeStr_2970 = false; }

    private _expandedView: ExpandedVariablePickerView = null;

    constructor(param1: HabboUserDefinedRoomEvents, param2: IWindowContainer, param3: (...args: any[]) => any = null, param4: (...args: any[]) => any = null, param5: WiredStyle = null) {
        this._roomEvents = param1;
        this._container = param2;
        this._variableFilter = param3;
        this._SafeStr_5880 = param4;
        this._SafeStr_4095 = new Dictionary();
        this._inputFieldRegion = asGuarded(this._container.findChildByName("input_field_region"), isIRegionWindow);
        this._expandedWindowWrapper = asGuarded(this._container.findChildByName("expanded_view_wrapper"), isIWindowContainer);
        this._expandedWindowWrapper.desktop.addChild(this._expandedWindowWrapper);
        this._expandedWindowWrapper.visible = false;
        this.setWiredStyle(param5);
        this.inputFieldRegion.addEventListener("WME_CLICK", this.onTextRegionClick);
        this.inputField.addEventListener("WME_CLICK", this.onTextRegionClick);
        this.cancelSearchButton.addEventListener("WME_CLICK", this.onCancelSearch);
        this.inputField.addEventListener("WE_CHANGE", this.onChangeQuery);
        this.inputField.addEventListener("WKE_KEY_UP", this.onKeyUp);
        this.inputPlaceholderText.visible = true;
        this.expandedWindowWrapper.setParamFlag(16, false);
        this.expandedWindowWrapper.addEventListener("WE_DEACTIVATED", this.onDeactivate);
        this.collapseView(true);
    }

    private setWiredStyle(param1: WiredStyle): void {
        if (param1 == null) {
            return;
        }
        if (param1.name == "illumina") {
            this.collapsedView.style = 105;
            this._expandedWindowWrapper.findChildByName("expanded_view").style = 105;
        }
    }

    public init(param1: _SafeCls_1969, param2: string, param3: number): void {
        this._allVariables = param1;
        this._variableTarget = param3;
        this._SafeStr_7146 = param2;
        this._SafeStr_2970 = false;
        this._SafeStr_4095 = new Dictionary();
        this._filteredVariables = this.filteredAllVariables;
        this.select(this.findVariableById(param2), true);
        if (this._expandedView != null) {
            this._expandedView.selectTab(this._expandedView.tabById(this.determineInitialTab()));
        }
    }

    public set variableTarget(param1: number) {
        if (param1 == this._variableTarget) {
            return;
        }
        this.collapseView();
        this.updateSelected();
        this._variableTarget = param1;
        this._filteredVariables = this.filteredAllVariables;
        if (this._SafeStr_4095.has(param1)) {
            this.select(this._SafeStr_4095.get(param1));
        } else {
            this.select(null);
        }
    }

    public get variableTarget(): number {
        return this._variableTarget;
    }

    private findVariableById(param1: string): WiredVariable {
        for (const _loc2_ of this._filteredVariables ?? []) {
            if (_loc2_.variableId == param1) {
                return _loc2_;
            }
        }
        return null;
    }

    public get filteredVariables(): WiredVariable[] {
        return this._filteredVariables;
    }

    public filteredVariableById(param1: string): WiredVariable {
        for (const _loc2_ of this._filteredVariables ?? []) {
            if (_loc2_.variableId == param1) {
                return _loc2_;
            }
        }
        return null;
    }

    private get filteredAllVariables(): WiredVariable[] {
        if (this._allVariables == null || this._allVariables.variables == null) {
            return [];
        }
        let _loc1_: WiredVariable[] = [];
        for (const _loc2_ of this._allVariables.variables ?? []) {
            if ((this._variableFilter == null || this._showFilteredVariables || this._variableFilter(_loc2_)) && _loc2_.variableName != "" && (_loc2_.variableTarget == this._variableTarget || this._variableTarget == NewVariablePicker.UNSPECIFIED_TYPE)) {
                if (!(_loc2_.isInvisible && this._SafeStr_7146 != _loc2_.variableId)) {
                    _loc1_.push(_loc2_);
                }
            }
        }
        return _loc1_;
    }

    public select(param1: WiredVariable, param2: boolean = false): void {
        this.collapseView();
        this._SafeStr_4095.set(this._variableTarget, param1);
        this._selected = param1;
        this.inputField.text = param1?.variableName;
        this.updatePlaceholder();
        if (!param2 && this._SafeStr_5880 != null) {
            this._SafeStr_5880(param1);
        }
        this._SafeStr_2970 = false;
    }

    public get expandedView(): ExpandedVariablePickerView {
        return this._expandedView;
    }

    private updateSelected(): void {
        let _loc1_: WiredVariable = this.filteredVariableByDisplayName(this.inputField.text);
        if (_loc1_ != null && this._selected != _loc1_) {
            this.select(_loc1_);
        }
        if (this.inputField.text == "" && this._selected != null) {
            this.select(null);
        }
    }

    public get selected(): WiredVariable {
        this.updateSelected();
        return this._selected;
    }

    public finalize(): void {
        this.updateSelected();
        if (this._selected != null) {
            this._roomEvents.variablePickerHelper.addToHistory(this._selected);
        }
    }

    private collapseView(param1: boolean = false): void {
        if (!this._isExpanded && !param1) {
            return;
        }
        this._isExpanded = false;
        this.collapsedView.visible = true;
        this.expandedWindowWrapper.visible = false;
        this.expandedWindowWrapper.deactivate();
        this.moveInputField(this.searchWrapperCollapsed);
        if (this._expandedView != null) {
            this._expandedView.onHide();
        }
    }

    private expandView(): void {
        if (this._isExpanded) {
            return;
        }
        this._isExpanded = true;
        this.collapsedView.visible = false;
        let _loc1_: Point = new Point();
        this._container.getGlobalPosition(_loc1_);
        _loc1_.y -= this.searchWrapperExpanded.y;
        this.expandedWindowWrapper.setGlobalPosition(_loc1_);
        this.expandedWindowWrapper.visible = true;
        this.expandedWindowWrapper.activate();
        this.moveInputField(this.searchWrapperExpanded);
        this.inputField.focus();
        this.showExpand();
        this._SafeStr_2970 = false;
    }

    private showExpand(): void {
        if (this._expandedView != null) {
            this._expandedView.onVisible();
            return;
        }
        this._expandedView = new ExpandedVariablePickerView(this, this.expandedWindowWrapper);
        this._expandedView.selectTab(this._expandedView.tabById(this.determineInitialTab()));
    }

    private determineInitialTab(): number {
        if (this._selected == null) {
            return TabButtonConfigs.USER_CREATED_TAB_ID;
        }
        if (this._selected.variableType == WiredVariableType._SafeStr_7415) {
            return TabButtonConfigs.DYNAMIC_TAB_ID;
        }
        if (this._selected.variableType == WiredVariableType.INTERNAL) {
            return TabButtonConfigs.INTERNAL_TAB_ID;
        }
        return TabButtonConfigs.USER_CREATED_TAB_ID;
    }

    private moveInputField(param1: IWindowContainer): void {
        castGuarded(this.inputFieldRegion.parent, isIWindowContainer, "com.sulake.core.window.IWindowContainer").removeChild(this.inputFieldRegion);
        param1.addChild(this.inputFieldRegion);
        this.inputFieldRegion.width = param1.width;
        this.inputFieldRegion.height = param1.height;
    }

    private onDeactivate = (param1: WindowEvent): void => {
        let _loc2_: WiredVariable = null;
        if (this._SafeStr_2970) {
            _loc2_ = this.filteredVariableByDisplayName(this.inputField.text);
            if (_loc2_ != null) {
                this.select(_loc2_);
            } else {
                this.select(this._selected);
            }
            this._SafeStr_2970 = false;
        }
        this.collapseView();
    };

    private filteredVariableByDisplayName(param1: string): WiredVariable {
        let _loc2_: string = null;
        for (const _loc3_ of this._filteredVariables ?? []) {
            if (!(this._variableFilter != null && !this._variableFilter(_loc3_))) {
                if (_loc3_.variableName.toLowerCase() == param1.toLowerCase()) {
                    return _loc3_;
                }
                _loc2_ = _loc3_.variableName;
                if (param1.toLowerCase() == _loc2_.toLowerCase()) {
                    return _loc3_;
                }
            }
        }
        return null;
    }

    private onKeyUp = (param1: WindowKeyboardEvent): void => {
        let _loc4_: WiredVariable = null;
        let _loc3_: TabButtonView = null;
        let _loc5_: VariableNodeListView = null;
        let _loc2_: VariableNode = null;
        if (param1.keyCode == 27) {
            this.collapseView();
        } else if (param1.keyCode == 13) {
            _loc4_ = this.filteredVariableByDisplayName(this.inputField.text);
            if (_loc4_ != null) {
                this.select(_loc4_);
                return;
            }
            if (this.inputField.text == "") {
                this.select(null);
                return;
            }
            if (this._expandedView != null && this._isExpanded) {
                _loc3_ = this._expandedView.selectedTab;
                if (_loc3_ != null && _loc3_.tabConfig.tabId == TabButtonConfigs._SafeStr_6424) {
                    _loc5_ = this._expandedView.activeItemsView;
                    if (_loc5_ != null && _loc5_.childNodes.length >= 1) {
                        _loc2_ = _loc5_.childNodes[0].variableNode;
                        if (_loc2_.variable != null && _loc2_.canBeSelected(this)) {
                            this.select(_loc2_.variable);
                        }
                    } else {
                        this.select(null);
                    }
                }
            }
        }
    };

    private onChangeQuery = (param1: WindowEvent): void => {
        if (this._isExpanded && this._expandedView != null) {
            this._expandedView.selectTab(this._expandedView.tabById(TabButtonConfigs._SafeStr_6424), true);
        }
        this.updatePlaceholder();
        this._SafeStr_2970 = true;
    };

    private updatePlaceholder(): void {
        this.cancelSearchButton.visible = this.inputField.text.length > 0;
        this.inputPlaceholderText.visible = this.inputField.text.length == 0;
    }

    private onTextRegionClick = (param1: WindowMouseEvent): void => {
        this.inputField.focus();
        this.expandView();
    };

    private onCancelSearch = (param1: WindowMouseEvent): void => {
        this.inputField.text = "";
        this.select(null);
        this.updatePlaceholder();
        this.inputField.focus();
        this.expandView();
    };

    public get showFilteredVariables(): boolean {
        return this._showFilteredVariables;
    }

    public get variableFilter(): (...args: any[]) => any {
        return this._variableFilter;
    }

    public get roomEvents(): HabboUserDefinedRoomEvents {
        return this._roomEvents;
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        if (this._expandedView != null) {
            this._expandedWindowWrapper.desktop.removeChild(this._expandedWindowWrapper);
            this._expandedView.dispose();
            this._expandedView = null;
        }
        this._container = null;
        this._disposed = true;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public set width(param1: number) {
        this._container.width = param1;
    }

    public get window(): IWindowContainer {
        return this._container;
    }

    private get collapsedView(): IBorderWindow {
        return asGuarded(this._container.findChildByName("collapsed_view"), isIBorderWindow);
    }

    private get expandedWindowWrapper(): IWindowContainer {
        return this._expandedWindowWrapper;
    }

    private get inputFieldRegion(): IRegionWindow {
        return this._inputFieldRegion;
    }

    private get inputPlaceholderText(): ITextWindow {
        return asGuarded(this._inputFieldRegion.findChildByName("input_placeholder_text"), isITextWindow);
    }

    public get inputField(): ITextFieldWindow {
        return asGuarded(this._inputFieldRegion.findChildByName("input_field"), isITextFieldWindow);
    }

    private get searchWrapperCollapsed(): IWindowContainer {
        return asGuarded(this._container.findChildByName("search_wrapper_collapsed"), isIWindowContainer);
    }

    private get searchWrapperExpanded(): IWindowContainer {
        return asGuarded(this._expandedWindowWrapper.findChildByName("search_wrapper_expanded"), isIWindowContainer);
    }

    private get cancelSearchButton(): IRegionWindow {
        return asGuarded(this._expandedWindowWrapper.findChildByName("cancel_search"), isIRegionWindow);
    }

    get [IDisposable](): true {
        return true;
    }
}
