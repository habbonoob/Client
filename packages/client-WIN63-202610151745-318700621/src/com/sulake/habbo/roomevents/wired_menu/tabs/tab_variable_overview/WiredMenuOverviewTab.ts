import { asGuarded, castTo, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { IContainerButtonWindow } from '@/com/sulake/core/window/components/IContainerButtonWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IConfirmDialog } from '@/com/sulake/core/window/utils/IConfirmDialog';
import type { ObjectIdAndValuePair } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/variables/ObjectIdAndValuePair';
import type { WiredVariable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/variables/WiredVariable';
import type { WiredAllVariableHoldersMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredmenu/WiredAllVariableHoldersMessageParser';
import type { WiredMenuController } from '@/com/sulake/habbo/roomevents/wired_menu/WiredMenuController';
import type { ITableObject } from '@/com/sulake/habbo/window/utils/tableview/ITableObject';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { IUpdateReceiver } from '@/com/sulake/core/runtime/IUpdateReceiver';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isIContainerButtonWindow } from '@/com/sulake/core/window/components/IContainerButtonWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { VariableTarget } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/variables/VariableTarget';
import { WiredVariableType } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/variables/WiredVariableType';
import { WiredAllVariableHoldersEvent } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredmenu/WiredAllVariableHoldersEvent';
import { WiredGetVariableOwnersPageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/userdefinedroomevents/wiredmenu/variables_management/WiredGetVariableOwnersPageComposer';
import { WiredDeleteAllVariableHoldersMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/userdefinedroomevents/wiredmenu/WiredDeleteAllVariableHoldersMessageComposer';
import { WiredGetAllVariableHoldersMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/userdefinedroomevents/wiredmenu/WiredGetAllVariableHoldersMessageComposer';
import { Util } from '@/com/sulake/habbo/roomevents/Util';
import { VariableTypePicker } from '@/com/sulake/habbo/roomevents/wired_menu/tabs/common/VariableTypePicker';
import { PropertyTableObject, TextTableObject, VariableTableObject } from '@/com/sulake/habbo/roomevents/wired_menu/tabs/tab_variable_overview/PropertyTableObject.group';
import { VariableHoldersHighlighter } from '@/com/sulake/habbo/roomevents/wired_menu/tabs/tab_variable_overview/VariableHoldersHighlighter';
import { WiredMenuDefaultTab } from '@/com/sulake/habbo/roomevents/wired_menu/tabs/WiredMenuDefaultTab';
import { VariableManagementConfig } from '@/com/sulake/habbo/roomevents/wired_menu/variables_management/overview/VariableManagementConfig';
import { VariableExtraSourceTypes } from '@/com/sulake/habbo/roomevents/wired_setup/common/VariableExtraSourceTypes';
import { WiredInputSourcePicker } from '@/com/sulake/habbo/roomevents/wired_setup/inputsources/WiredInputSourcePicker';
import { TableColumn } from '@/com/sulake/habbo/window/utils/tableview/TableColumn';
import { TableView } from '@/com/sulake/habbo/window/utils/tableview/TableView';

export class WiredMenuOverviewTab extends WiredMenuDefaultTab implements IUpdateReceiver {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_menu.tabs.tab_variable_overview::WiredMenuOverviewTab'); }

    private static POLL_MS: number = 500;
    private static MAX_HIGHLIGHTS: number = 1000;
    private static MAX_HIGHLIGHTS_WITH_VALUE: number = 400;
    private static MAX_TEXT_CONNECTIONS: number = 400;
    public static LIST_COLUMN_NAME: string = "variable";
    public static PROPERTIES_COLUMN_PROPERTY: string = "property";
    public static PROPERTIES_COLUMN_VALUE: string = "value";
    public static _SafeStr_7427: string = "value";
    public static _SafeStr_6806: string = "text";

    declare private _SafeStr_2443: TableView;

    declare private _SafeStr_3485: TableView;

    declare private _SafeStr_3162: TableView;

    declare private _SafeStr_2460: VariableTypePicker;

    declare private _highlighter: VariableHoldersHighlighter;

    declare private _highlightEnabled: boolean;
    static { (this.prototype as any)._highlightEnabled = false; }

    private _SafeStr_6283: number = 0;
    private _SafeStr_6457: number = 0;

    declare private _allVariables: WiredVariable[];

    private _SafeStr_4270: string = null;
    private _jumpToVariable: WiredVariable = null;

    constructor(param1: WiredMenuController, param2: IWindowContainer) {
        super(param1, param2);
        this._highlighter = new VariableHoldersHighlighter(param1.roomEvents);
        this._SafeStr_2443 = new TableView(param1.windowManager, this.variableListContainer);
        this._SafeStr_3485 = new TableView(param1.windowManager, this.propertiesTableContainer);
        this._SafeStr_3162 = new TableView(param1.windowManager, this.textsTableContainer);
        this._SafeStr_2460 = new VariableTypePicker(this.typePickerContainer, this.onSelectVariableType);
        this.createVariableList();
        this.createPropertiesTable();
        this.createTextTable();
        this.addMessageEvent(new WiredAllVariableHoldersEvent(this.onAllVariableHolders));
        this.highlightHoldersButton.addEventListener("WME_CLICK", this.onHighlightClick);
        this.manageButton.addEventListener("WME_CLICK", this.onManageClick);
        this.deleteButton.addEventListener("WME_CLICK", this.onDeleteClick);
    }

    private createVariableList(): void {
        let _loc1_: any[] = [new TableColumn(WiredMenuOverviewTab.LIST_COLUMN_NAME, "", 1, "left")];
        this._SafeStr_2443.initialize(Array.from(_loc1_), false);
        this._SafeStr_2443.onRowSelectedCallback = this.onSelectVariable;
    }

    private createPropertiesTable(): void {
        let _loc1_: any[] = [new TableColumn(WiredMenuOverviewTab.PROPERTIES_COLUMN_PROPERTY, this.loc("wiredmenu.variable_overview.properties.column.property"), 0.52, "left"), new TableColumn(WiredMenuOverviewTab.PROPERTIES_COLUMN_VALUE, this.loc("wiredmenu.variable_overview.properties.column.value"), 0.48, "left")];
        this._SafeStr_3485.initialize(Array.from(_loc1_));
    }

    private createTextTable(): void {
        let _loc1_: any[] = [new TableColumn(WiredMenuOverviewTab._SafeStr_7427, this.loc("wiredmenu.variable_overview.text.column.value"), 0.2, "left"), new TableColumn(WiredMenuOverviewTab._SafeStr_6806, this.loc("wiredmenu.variable_overview.text.column.text"), 0.8, "right")];
        this._SafeStr_3162.initialize(Array.from(_loc1_));
    }

    public override startViewing(): void {
        super.startViewing();
        this.clearData();
        this.updateLoadingState();
        this.requestData();
    }

    protected override isDataReady(): boolean {
        return this._allVariables != null;
    }

    private clearData(): void {
        this._allVariables = null;
    }

    private requestData(): void {
        this._SafeStr_6283 = getTimer();
        this.controller.variablesSynchronizer.getAllVariables(this.onAllVariables);
    }

    private requestHolders(): void {
        this._SafeStr_6457 = getTimer();
        this.controller.send(new WiredGetAllVariableHoldersMessageComposer(this.selectedVariableId));
    }

    private onAllVariables = (param1: WiredVariable[]): void => {
        this._allVariables = param1;
        if (this.isLoading) {
            this.updateLoadingState();
        } else {
            this.initializeInterface();
        }
    };

    private onAllVariableHolders = (param1: WiredAllVariableHoldersEvent): void => {
        let _loc9_: number = 0;
        let _loc8_: number = NaN;
        if (!this._highlightEnabled || !this.isViewing) {
            return;
        }
        let _loc2_: WiredAllVariableHoldersMessageParser = param1.getParser();
        let _loc4_: ObjectIdAndValuePair[] = _loc2_.variableInfoAndHolders.holders;
        let _loc6_: WiredVariable = _loc2_.variableInfoAndHolders.variable;
        if (_loc6_.variableId != this.selectedVariableId) {
            return;
        }
        if (!_loc6_.hasValue && _loc4_.length > WiredMenuOverviewTab.MAX_HIGHLIGHTS || _loc6_.hasValue && _loc4_.length > WiredMenuOverviewTab.MAX_HIGHLIGHTS_WITH_VALUE) {
            this.controller.roomEvents.notifications.addItem(this.loc("wiredmenu.variable_overview.highlight.error.too_many"), "info", "icon_wired_notification_png");
            this.stopHighlight();
            return;
        }
        let _loc5_: Map<any, any> = new Dictionary();
        let _loc3_: Map<any, any> = new Dictionary();
        for (const _loc7_ of _loc4_ ?? []) {
            _loc9_ = _loc7_.objectId;
            _loc8_ = _loc6_.hasValue ? _loc7_.value : NaN;
            if (_loc6_.variableTarget == WiredInputSourcePicker._SafeStr_2178) {
                this._highlighter.highlightObject(_loc9_, Util.variableValueWithString(_loc6_, _loc8_ | 0));
                _loc5_.set(_loc9_, true);
            } else if (_loc6_.variableTarget == WiredInputSourcePicker.USER_SOURCE) {
                this._highlighter.highlightUser(_loc9_, Util.variableValueWithString(_loc6_, _loc8_ | 0));
                _loc3_.set(_loc9_, true);
            }
        }
        this._highlighter.removeRemovedHolders(_loc5_, _loc3_);
    };

    private get selectedVariableId(): string {
        let _loc1_: WiredVariable = this.selectedVariable;
        return _loc1_?.variableId;
    }

    private get selectedVariable(): WiredVariable {
        if (this._SafeStr_2443.selected == null) {
            return null;
        }
        return castTo(this._SafeStr_2443.selected, VariableTableObject).variable;
    }

    protected override initializeInterface(): void {
        if (this._SafeStr_4270 != null) {
            this.findFocusVariable(this._SafeStr_4270);
            this._SafeStr_4270 = null;
        }
        this.updateVariableListUI();
        this.updatePropertiesTableUI();
        this.updateTextTableUI();
        this.updateButtonsUI();
    }

    private updateVariableListUI(): void {
        let _loc5_: ITableObject = null;
        let _loc1_: ITableObject = this._SafeStr_2443.selected;
        let _loc3_: ITableObject[] = [];
        let _loc2_: ITableObject = null;
        for (const _loc4_ of this._allVariables ?? []) {
            if (!_loc4_.isInvisible) {
                if (_loc4_.variableTarget == this._SafeStr_2460.selectedType) {
                    _loc5_ = new VariableTableObject(_loc4_, this.controller.roomEvents);
                    if (_loc4_ == this._jumpToVariable) {
                        _loc2_ = _loc5_;
                    }
                    _loc3_.push(_loc5_);
                }
            }
        }
        this._SafeStr_2443.setObjects(_loc3_);
        if (_loc2_ != null) {
            this._SafeStr_2443.trySelect(_loc2_);
        } else if (_loc1_ == null && _loc3_.length > 0) {
            this._SafeStr_2443.trySelect(_loc3_[0]);
        } else if (_loc1_ != null) {
            if (this._SafeStr_2443.selected == null) {
                this._SafeStr_2443.trySelect(_loc3_[0]);
            }
        }
        this._jumpToVariable = null;
    }

    private updateButtonsUI(): void {
        Util.disableSection(this.highlightHoldersButton, !this.canHighlightCurrentVariable);
        Util.disableSection(this.manageButton, !this.canManageCurrentVariable);
        Util.disableSection(this.deleteButton, !this.canDeleteCurrentVariable);
    }

    private onSelectVariable = (param1: VariableTableObject): void => {
        this._SafeStr_3162.resetScrollingNextUpdate();
        this.updatePropertiesTableUI();
        this.updateTextTableUI();
        if (this._highlightEnabled) {
            this._highlighter.clear();
            if (this.canHighlightCurrentVariable) {
                this.requestHolders();
            }
        }
        this.updateButtonsUI();
    };

    private get canHighlightCurrentVariable(): boolean {
        let _loc1_: WiredVariable = this.getSelectedVariable();
        return _loc1_ != null && !_loc1_.requiresExecutionContext && _loc1_.variableType != WiredVariableType.INTERNAL && (_loc1_.variableTarget == WiredInputSourcePicker.USER_SOURCE || _loc1_.variableTarget == WiredInputSourcePicker._SafeStr_2178);
    }

    private get canManageCurrentVariable(): boolean {
        let _loc1_: WiredVariable = this.getSelectedVariable();
        return _loc1_ != null && !_loc1_.requiresExecutionContext && _loc1_.variableTarget == WiredInputSourcePicker.USER_SOURCE && _loc1_.isPersisted;
    }

    private get canDeleteCurrentVariable(): boolean {
        if (!this.controller.hasWritePermission) {
            return false;
        }
        let _loc1_: WiredVariable = this.getSelectedVariable();
        return _loc1_ != null && _loc1_.canCreateAndDelete && _loc1_.isPersisted && (_loc1_.variableTarget == VariableTarget.FURNI || _loc1_.variableTarget == VariableTarget.USER) && _loc1_.variableType == WiredVariableType._SafeStr_7398;
    }

    private onHighlightClick = (param1: WindowMouseEvent): void => {
        if (this._highlightEnabled) {
            this.stopHighlight();
        } else {
            this.startHighlight();
        }
    };

    private onManageClick = (param1: WindowMouseEvent): void => {
        let _loc2_: WiredVariable = this.getSelectedVariable();
        if (!this.canManageCurrentVariable) {
            return;
        }
        this.controller.send(new WiredGetVariableOwnersPageComposer(_loc2_.variableId, 1, VariableManagementConfig.PAGE_SIZE, 0, -1));
    };

    private onDeleteClick = (param1: WindowMouseEvent): void => {
        if (!this.canDeleteCurrentVariable) {
            return;
        }
        this.controller.windowManager.confirm("${wiredmenu.variable_overview.delete_all.title}", "${wiredmenu.variable_overview.delete_all.desc}", 0, this.onDeleteConfirmed).titleBarColor = 13909337;
    };

    private onDeleteConfirmed = (param1: IConfirmDialog, param2: WindowEvent): void => {
        param1.dispose();
        if (param2.type != "WE_OK" || !this.canDeleteCurrentVariable) {
            return;
        }
        this.stopHighlight();
        this.controller.send(new WiredDeleteAllVariableHoldersMessageComposer(this.getSelectedVariable().variableId));
    };

    private startHighlight(): void {
        this._highlightEnabled = true;
        this.highlightHoldersButton.caption = this.loc("wiredmenu.variable_overview.unhighlight_holders");
        this.requestHolders();
    }

    private stopHighlight(): void {
        this._highlightEnabled = false;
        this.highlightHoldersButton.caption = this.loc("wiredmenu.variable_overview.highlight_holders");
        this._highlighter.clear();
    }

    private onSelectVariableType = (param1: number): void => {
        this._SafeStr_2443.resetScrollingNextUpdate();
        this.initializeInterface();
    };

    private updatePropertiesTableUI(): void {
        let _loc2_: WiredVariable = this.getSelectedVariable();
        if (_loc2_ == null) {
            this._SafeStr_3485.clear();
            return;
        }
        let _loc1_: ITableObject[] = [];
        _loc1_.push(new PropertyTableObject("name", _loc2_.variableName, this.localization, true));
        _loc1_.push(new PropertyTableObject("type", this.getTypeString(_loc2_), this.localization));
        _loc1_.push(new PropertyTableObject("target", this.getTargetString(_loc2_), this.localization));
        _loc1_.push(new PropertyTableObject("availability", this.getAvailabilityString(_loc2_), this.localization));
        _loc1_.push(new PropertyTableObject("has_value", _loc2_.hasValue, this.localization));
        _loc1_.push(new PropertyTableObject("can_write_to", _loc2_.canWriteValue, this.localization));
        _loc1_.push(new PropertyTableObject("can_create_delete", _loc2_.canCreateAndDelete, this.localization));
        _loc1_.push(new PropertyTableObject("can_intercept", _loc2_.canInterceptChanges, this.localization));
        _loc1_.push(new PropertyTableObject("is_always_available", _loc2_.alwaysAvailable, this.localization));
        _loc1_.push(new PropertyTableObject("can_read_creation_time", _loc2_.canReadCreationTime, this.localization));
        _loc1_.push(new PropertyTableObject("can_read_last_update_time", _loc2_.canReadLastUpdateTime, this.localization));
        _loc1_.push(new PropertyTableObject("is_text_connected", _loc2_.hasTextConnector, this.localization));
        this._SafeStr_3485.setObjects(_loc1_);
    }

    private getTypeString(param1: WiredVariable): string {
        return this.loc("wiredfurni.params.variables.idtype." + param1.variableType);
    }

    private getTargetString(param1: WiredVariable): string {
        switch (param1.variableTarget) {
            case WiredInputSourcePicker._SafeStr_2178:
                return this.loc("wiredfurni.params.sourcetype.furni");
            case WiredInputSourcePicker.USER_SOURCE:
                return this.loc("wiredfurni.params.sourcetype.users");
            case VariableExtraSourceTypes.GLOBAL_SOURCE:
                return this.loc("wiredfurni.params.sourcetype.global");
            case VariableExtraSourceTypes.CONTEXT_SOURCE:
                return this.loc("wiredfurni.params.sourcetype.context");
            default:
                return "";
        }
    }

    private getAvailabilityString(param1: WiredVariable): string {
        return this.localization.getLocalization("wiredfurni.params.variables.availability." + param1.availabilityType, this.loc("wiredfurni.params.variables.availability.misc"));
    }

    private updateTextTableUI(): void {
        let _loc4_: string = null;
        let _loc6_: WiredVariable = this.getSelectedVariable();
        let _loc3_: boolean = _loc6_ == null || !_loc6_.hasTextConnector;
        if (_loc3_) {
            this._SafeStr_3162.clear();
            Util.disableSection(this.textsTableContainer);
            return;
        }
        if (!this.textsTableContainer.isEnabled()) {
            Util.disableSection(this.textsTableContainer, false);
        }
        let _loc5_: UtilsMap = _loc6_.textConnector;
        let _loc2_: any[] = _loc5_.getKeys();
        _loc2_.sort((a, b) => a - b);
        let _loc1_: ITableObject[] = [];
        if (_loc2_.length <= WiredMenuOverviewTab.MAX_TEXT_CONNECTIONS) {
            for (const _loc7_ of _loc2_ ?? []) {
                _loc4_ = stringOrNull(_loc5_.getValue(_loc7_));
                _loc1_.push(new TextTableObject(String(_loc7_), _loc4_));
            }
        }
        if (_loc6_.hasTextConnectorFallback) {
            _loc1_.push(new TextTableObject("_", _loc6_.textConnectorFallback));
        }
        this._SafeStr_3162.setObjects(_loc1_);
    }

    private getSelectedVariable(): WiredVariable {
        let _loc1_: ITableObject = this._SafeStr_2443.selected;
        if (_loc1_ == null) {
            return null;
        }
        return (_loc1_ instanceof VariableTableObject ? _loc1_ : null).variable;
    }

    public override stopViewing(): void {
        super.stopViewing();
        if (this._highlightEnabled) {
            this._highlighter.clear();
        }
    }

    public jumpToVariableByName(param1: string): void {
        if (this.isDataReady()) {
            this.findFocusVariable(param1);
            this.initializeInterface();
        } else {
            this._SafeStr_4270 = param1;
        }
    }

    private findFocusVariable(param1: string): void {
        let _loc2_: WiredVariable = this.getVariableByNameOrPrefix(param1);
        if (_loc2_ == null) {
            return;
        }
        this._SafeStr_2460.selectedType = _loc2_.variableTarget;
        this._jumpToVariable = _loc2_;
    }

    private getVariableByNameOrPrefix(param1: string): WiredVariable {
        let _loc2_: WiredVariable = null;
        for (const _loc3_ of this._allVariables ?? []) {
            if (!_loc3_.isInvisible) {
                if (_loc3_.variableName == param1) {
                    return _loc3_;
                }
                if (_loc2_ == null && _loc3_.variableName.indexOf(param1 + ".") == 0) {
                    _loc2_ = _loc3_;
                }
            }
        }
        return _loc2_;
    }

    public update(param1: number): void {
        if (!this.isViewing) {
            return;
        }
        this._SafeStr_2460.update(param1);
        let _loc2_: number = getTimer();
        if (this._SafeStr_6283 < _loc2_ - WiredMenuOverviewTab.POLL_MS) {
            this.requestData();
        }
        if (this.canHighlightCurrentVariable && this._highlightEnabled && this._SafeStr_6457 < _loc2_ - WiredMenuOverviewTab.POLL_MS) {
            this.requestHolders();
        }
        this._highlighter.update(param1);
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        let _loc1_: IButtonWindow = this.highlightHoldersButton;
        if (_loc1_ != null) {
            _loc1_.removeEventListener("WME_CLICK", this.onHighlightClick);
        }
        let _loc2_: IButtonWindow = this.manageButton;
        if (_loc2_ != null) {
            _loc2_.removeEventListener("WME_CLICK", this.onManageClick);
        }
        let _loc3_: IWindow = this.deleteButton;
        if (_loc3_ != null) {
            _loc3_.removeEventListener("WME_CLICK", this.onDeleteClick);
        }
        if (this.controller != null && this.controller.variablesSynchronizer != null) {
            this.controller.variablesSynchronizer.removeListener(this.onAllVariables);
        }
        if (this._SafeStr_2460 != null) {
            this._SafeStr_2460.dispose();
        }
        this._SafeStr_2460 = null;
        if (this._SafeStr_2443 != null) {
            this._SafeStr_2443.dispose();
        }
        this._SafeStr_2443 = null;
        if (this._SafeStr_3485 != null) {
            this._SafeStr_3485.dispose();
        }
        this._SafeStr_3485 = null;
        if (this._SafeStr_3162 != null) {
            this._SafeStr_3162.dispose();
        }
        this._SafeStr_3162 = null;
        this._allVariables = null;
        if (this._highlighter != null) {
            this._highlighter.dispose();
        }
        this._highlighter = null;
        super.dispose();
    }

    private get variableListContainer(): IWindowContainer {
        return asGuarded(this.container.findChildByName("variable_list_container"), isIWindowContainer);
    }

    private get propertiesTableContainer(): IWindowContainer {
        return asGuarded(this.container.findChildByName("variable_properties_table_container"), isIWindowContainer);
    }

    private get textsTableContainer(): IWindowContainer {
        return asGuarded(this.container.findChildByName("variable_texts_table_container"), isIWindowContainer);
    }

    private get highlightHoldersButton(): IButtonWindow {
        return asGuarded(this.container.findChildByName("highlight_holders_button"), isIButtonWindow);
    }

    private get manageButton(): IButtonWindow {
        return asGuarded(this.container.findChildByName("manage_button"), isIButtonWindow);
    }

    private get deleteButton(): IContainerButtonWindow {
        return asGuarded(this.container.findChildByName("delete_button"), isIContainerButtonWindow);
    }

    private get typePickerContainer(): IWindowContainer {
        return asGuarded(this.container.findChildByName("type_picker_container"), isIWindowContainer);
    }

    get [IUpdateReceiver](): true {
        return true;
    }
}
