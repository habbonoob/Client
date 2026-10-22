import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import type { IBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import type { IBubbleWindow } from '@/com/sulake/core/window/components/IBubbleWindow';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { ICheckBoxWindow } from '@/com/sulake/core/window/components/ICheckBoxWindow';
import type { IContainerButtonWindow } from '@/com/sulake/core/window/components/IContainerButtonWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { WiredVariable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/variables/WiredVariable';
import type { WiredObjectInspectionData } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredmenu/WiredObjectInspectionData';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { WiredMenuController } from '@/com/sulake/habbo/roomevents/wired_menu/WiredMenuController';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { ITableObject } from '@/com/sulake/habbo/window/utils/tableview/ITableObject';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { IUpdateReceiver } from '@/com/sulake/core/runtime/IUpdateReceiver';
import { isIBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import { isIBubbleWindow } from '@/com/sulake/core/window/components/IBubbleWindow';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isICheckBoxWindow } from '@/com/sulake/core/window/components/ICheckBoxWindow';
import { isIContainerButtonWindow } from '@/com/sulake/core/window/components/IContainerButtonWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { VariableList } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/params/VariableList';
import { WiredMenuErrorEvent } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredmenu/WiredMenuErrorEvent';
import { WiredVariablesForObjectEvent } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredmenu/WiredVariablesForObjectEvent';
import { WiredGetVariablesForObjectMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/userdefinedroomevents/wiredmenu/WiredGetVariablesForObjectMessageComposer';
import { WiredSetObjectVariableValueMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/userdefinedroomevents/wiredmenu/WiredSetObjectVariableValueMessageComposer';
import { WiredMenuErrorMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredmenu/WiredMenuErrorMessageParser';
import { Util } from '@/com/sulake/habbo/roomevents/Util';
import { VariableTypePicker } from '@/com/sulake/habbo/roomevents/wired_menu/tabs/common/VariableTypePicker';
import { VariableHolderPreviewer } from '@/com/sulake/habbo/roomevents/wired_menu/tabs/tab_inspection/VariableHolderPreviewer';
import { VariableValueTableObject } from '@/com/sulake/habbo/roomevents/wired_menu/tabs/tab_inspection/VariableValueTableObject.group';
import { VariableHoldersHighlighter } from '@/com/sulake/habbo/roomevents/wired_menu/tabs/tab_variable_overview/VariableHoldersHighlighter';
import { WiredMenuDefaultTab } from '@/com/sulake/habbo/roomevents/wired_menu/tabs/WiredMenuDefaultTab';
import { VariableExtraSourceTypes } from '@/com/sulake/habbo/roomevents/wired_setup/common/VariableExtraSourceTypes';
import { WiredInputSourcePicker } from '@/com/sulake/habbo/roomevents/wired_setup/inputsources/WiredInputSourcePicker';
import { NewVariablePicker } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/newvariablepicker/NewVariablePicker';
import { TableColumn } from '@/com/sulake/habbo/window/utils/tableview/TableColumn';
import { TableView } from '@/com/sulake/habbo/window/utils/tableview/TableView';

export class WiredMenuInspectionTab extends WiredMenuDefaultTab implements IUpdateReceiver {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_menu.tabs.tab_inspection::WiredMenuInspectionTab'); }

    private static POLL_VARIABLES_MS: number = 500;
    private static STATE_NOTHING: number = 0;
    private static STATE_FETCHING_HOLDING_VARIABLES: number = 1;
    private static STATE_AWAITING_VARIABLES: number = 2;
    private static STATE_DISPLAYING: number = 3;
    public static VARIABLES_COLUMN_VARIABLE: string = "variable";
    public static VARIABLES_COLUMN_VALUE: string = "value";

    declare private _SafeStr_2558: TableView;

    declare private _SafeStr_2460: VariableTypePicker;

    declare private _SafeStr_3042: VariableHolderPreviewer;

    private _state: number = WiredMenuInspectionTab.STATE_NOTHING;
    private _SafeStr_6283: number = 0;
    private _variablesById: Map<any, any> = new Dictionary();
    private _data: WiredObjectInspectionData = null;
    private _SafeStr_7187: number = -1;
    private _SafeStr_6832: number = 0;
    private _highlightingForFurni: number = -1;

    declare private _highlighter: VariableHoldersHighlighter;

    private _removedVariable: number = -1;

    declare private _SafeStr_3390: NewVariablePicker;

    constructor(param1: WiredMenuController, param2: IWindowContainer) {
        super(param1, param2);
        this._highlighter = new VariableHoldersHighlighter(param1.roomEvents);
        this._SafeStr_2558 = new TableView(param1.windowManager, this.variableValuesTableContainer);
        this._SafeStr_2460 = new VariableTypePicker(this.typePickerContainer, this.onSelectVariableType);
        this._SafeStr_3042 = new VariableHolderPreviewer(this.previewContainer, param1);
        this.createVariableValuesTable();
        this.createCreateVariableBubble();
        this.updateTableUI();
        this.updatePreviewUI();
        this.addMessageEvent(new WiredVariablesForObjectEvent(this.onWiredVariablesForObject));
        this.addMessageEvent(new WiredMenuErrorEvent(this.onWiredMenuError));
        this.highlightWiredButton.addEventListener("WME_CLICK", this.onHighlightWiredsClicked);
        this.deleteVariableButton.addEventListener("WME_CLICK", this.onDeleteVariableClicked);
        this.addVariableButton.addEventListener("WME_CLICK", this.onAddVariableClicked);
        this.createVariableButton.addEventListener("WME_CLICK", this.onCreateVariableClicked);
        param2.procedure = this.windowProcedure;
    }

    private createVariableValuesTable(): void {
        let _loc1_: any[] = [new TableColumn(WiredMenuInspectionTab.VARIABLES_COLUMN_VARIABLE, this.loc("wiredmenu.inspection.variables.variable"), 0.65, "left"), new TableColumn(WiredMenuInspectionTab.VARIABLES_COLUMN_VALUE, this.loc("wiredmenu.inspection.variables.value"), 0.35, "right")];
        this._SafeStr_2558.initialize(Array.from(_loc1_));
        this._SafeStr_2558.onCellEditCallback = this.onCellEdit;
        this._SafeStr_2558.onRowSelectedCallback = this.onRowSelected;
    }

    private createCreateVariableBubble(): void {
        let _loc1_: HabboUserDefinedRoomEvents = this.controller.roomEvents;
        let _loc3_: PresetManager = _loc1_.wiredCtrl.presetManager;
        let _loc2_: IWindowContainer = asGuarded(_loc3_.createLayout("search_tree_dropdown"), isIWindowContainer);
        this.variablePickerContainer.addChild(_loc2_);
        this._SafeStr_3390 = new NewVariablePicker(this.controller.roomEvents, _loc2_, this.variableFilter, this.onChangeCreateVariable);
        this._SafeStr_3390.width = this.variablePickerContainer.width;
        this.createVariableBubble.visible = false;
    }

    private onChangeCreateVariable = (param1: WiredVariable): void => {
        Util.disableSection(this.valueSettingContainer, param1 != null && !param1.hasValue);
        Util.disableSection(this.createVariableButton, param1 == null);
    };

    private variableFilter = (param1: WiredVariable): boolean => {
        return param1.canCreateAndDelete && (this._data == null || !this._data.variableValues.hasKey(param1.variableId));
    };

    public override startViewing(): void {
        super.startViewing();
        this.maybePollNewVariables(false);
    }

    private maybePollNewVariables(param1: boolean = true): void {
        if (this._state == WiredMenuInspectionTab.STATE_DISPLAYING) {
            if (!param1) {
                this._state = WiredMenuInspectionTab.STATE_FETCHING_HOLDING_VARIABLES;
                this.updateLoadingState();
            }
            this.requestVariablesForObject(this._data.type, this.getObjectIdForType());
        }
    }

    private getObjectIdForType(): number {
        if (this._data.type == WiredInputSourcePicker.USER_SOURCE) {
            return this._data.userIndex;
        }
        if (this._data.type == WiredInputSourcePicker._SafeStr_2178) {
            return this._data.objectId;
        }
        return 0;
    }

    protected override isDataReady(): boolean {
        return this._state == WiredMenuInspectionTab.STATE_NOTHING || this._state == WiredMenuInspectionTab.STATE_DISPLAYING;
    }

    private clearDataAndState(): void {
        this._state = WiredMenuInspectionTab.STATE_NOTHING;
        let _loc1_: WiredObjectInspectionData = this._data;
        this._data = null;
        this.onDataChanged(_loc1_, null);
        this.updateTableUI();
    }

    private onCellEdit = (param1: ITableObject, param2: string, param3: string): void => {
        if (param2 != WiredMenuInspectionTab.VARIABLES_COLUMN_VALUE) {
            return;
        }
        let _loc5_: VariableValueTableObject = param1 instanceof VariableValueTableObject ? param1 : null;
        let _loc4_: WiredVariable = _loc5_.variable;
        if (!this.controller.hasWritePermission || !_loc4_.hasValue || !_loc4_.canWriteValue) {
            return;
        }
        let _loc6_: number = Util.getIntFromString(param3, -2147483648, true);
        if (_loc6_ != -2147483648) {
            this.controller.send(new WiredSetObjectVariableValueMessageComposer(_loc4_.variableTarget, this.getObjectIdForType(), _loc4_.variableId, _loc6_, 0));
        }
    };

    private onAddVariableClicked = (param1: WindowMouseEvent): void => {
        if (this.createVariableBubble.visible) {
            this.createVariableBubble.visible = false;
        } else {
            this.controller.roomEvents.variablesSynchronizer.getAllVariables(this.initializeCreateVariableBubble, true);
        }
    };

    private windowProcedure = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK" && Boolean(this.createVariableBubble.visible)) {
            if (param2.name != "add_var_btn" && !this.createVariableBubble.windowIsChild(param2)) {
                this.createVariableBubble.visible = false;
            }
        }
    };

    private initializeCreateVariableBubble = (param1: WiredVariable[]): void => {
        let _loc3_: any[] = [];
        for (const _loc2_ of param1 ?? []) {
            _loc3_.push(_loc2_);
        }
        this._SafeStr_3390.init(new VariableList(_loc3_), "", this._SafeStr_2460.selectedType);
        Util.disableSection(this.createVariableButton, true);
        this.createVariableBubble.visible = true;
    };

    private onDeleteVariableClicked = (param1: WindowMouseEvent): void => {
        if (this._data == null) {
            return;
        }
        let _loc3_: VariableValueTableObject = asInstanceOf(this._SafeStr_2558.selected, VariableValueTableObject);
        if (_loc3_ == null) {
            return;
        }
        let _loc2_: WiredVariable = _loc3_.variable;
        if (!this.controller.hasWritePermission || !_loc2_.canCreateAndDelete) {
            return;
        }
        this._removedVariable = this._SafeStr_2558.getIndexOfObject(_loc3_);
        this.controller.send(new WiredSetObjectVariableValueMessageComposer(_loc2_.variableTarget, this.getObjectIdForType(), _loc2_.variableId, 0, 2));
    };

    private onCreateVariableClicked = (param1: WindowMouseEvent): void => {
        if (this._data == null) {
            return;
        }
        let _loc2_: WiredVariable = this._SafeStr_3390.selected;
        this._SafeStr_3390.finalize();
        let _loc3_: number = 0;
        if (_loc2_.hasValue) {
            _loc3_ = Number(this.valueInput.text) | 0;
        }
        this.controller.send(new WiredSetObjectVariableValueMessageComposer(_loc2_.variableTarget, this.getObjectIdForType(), _loc2_.variableId, _loc3_, 1));
        this.createVariableBubble.visible = false;
        this.valueInput.text = "0";
    };

    private onWiredVariablesForObject = (param1: WiredVariablesForObjectEvent): void => {
        if (this._state != WiredMenuInspectionTab.STATE_FETCHING_HOLDING_VARIABLES && this._state != WiredMenuInspectionTab.STATE_DISPLAYING) {
            return;
        }
        let _loc3_: WiredObjectInspectionData = param1.getParser().data;
        if (_loc3_.type != this._SafeStr_2460.selectedType) {
            return;
        }
        let _loc2_: WiredObjectInspectionData = this._data;
        this._data = _loc3_;
        this.onDataChanged(_loc2_, this._data);
        this._state = WiredMenuInspectionTab.STATE_AWAITING_VARIABLES;
        if (!this.controller.variablesSynchronizer.getAllVariables(this.onAllVariables, !this.allVariablesAvailable)) {
            this.updateLoadingState();
        }
    };

    private onWiredMenuError = (param1: WiredMenuErrorEvent): void => {
        let _loc2_: WiredMenuErrorMessageParser = param1.getParser();
        if (_loc2_.errorCode == WiredMenuErrorMessageParser._SafeStr_7544) {
            if (this._state != WiredMenuInspectionTab.STATE_DISPLAYING) {
                this.clearDataAndState();
                this.updatePreviewUI();
                this.updateLoadingState();
            }
        }
    };

    private get allVariablesAvailable(): boolean {
        for (const _loc1_ of this._data.variableValues.getKeys() ?? []) {
            if (!(this._variablesById.has(_loc1_))) {
                return false;
            }
        }
        return true;
    }

    private updatePreviewUI(): void {
        let _loc1_: boolean = this._SafeStr_2460.selectedType == VariableExtraSourceTypes.GLOBAL_SOURCE;
        Util.disableSection(this.pinContainer, _loc1_);
        let _loc2_: boolean = this._SafeStr_2460.selectedType == WiredInputSourcePicker._SafeStr_2178;
        let _loc3_: boolean = this._SafeStr_2460.selectedType == WiredInputSourcePicker.USER_SOURCE;
        Util.disableSection(this.highlightWiredButton, this._data == null || this._data.type != WiredInputSourcePicker._SafeStr_2178 || this._data.configuredInWireds == null || this._data.configuredInWireds.length == 0);
        this.highlightWiredButton.visible = _loc2_;
        if (_loc1_) {
            this._SafeStr_3042.setGlobalPlaceholder();
            return;
        }
        if (!_loc2_ && !_loc3_) {
            this._SafeStr_3042.clearPreviewer();
            return;
        }
        if (this._state == WiredMenuInspectionTab.STATE_NOTHING) {
            if (_loc2_) {
                this._SafeStr_3042.setFurniInstructions();
            } else if (_loc3_) {
                this._SafeStr_3042.setUserInstructions();
            }
        } else if (this._state == WiredMenuInspectionTab.STATE_DISPLAYING) {
            if (_loc2_) {
                this._SafeStr_3042.setFurniByObjectId(this._data.objectId);
            } else if (_loc3_) {
                this._SafeStr_3042.setPreviewByUserIndex(this._data.userIndex);
            }
        }
    }

    private onHighlightWiredsClicked = (param1: WindowMouseEvent): void => {
        this._highlighter.clear();
        if (this._highlightingForFurni == -1 && this._data != null && this._data.configuredInWireds != null && this._data.configuredInWireds.length > 0) {
            for (const _loc2_ of this._data.configuredInWireds ?? []) {
                this._highlighter.highlightObject(_loc2_, null);
            }
            this._highlightingForFurni = this._data.objectId;
        } else {
            this._highlightingForFurni = -1;
        }
    };

    private onDataChanged(param1: WiredObjectInspectionData, param2: WiredObjectInspectionData): void {
        if (param2 == null) {
            this.clearHighlights();
        }
        if (param2 != null && this._highlightingForFurni != -1 && (param2.type != WiredInputSourcePicker._SafeStr_2178 || param2.objectId != this._highlightingForFurni)) {
            this.clearHighlights();
        }
        if (param1 == null || param2 == null || param1.type != param2.type || param1.objectId != param2.objectId || param1.userIndex != param2.userIndex) {
            this.createVariableBubble.visible = false;
        }
    }

    private clearHighlights(): void {
        this._highlighter.clear();
        this._highlightingForFurni = -1;
    }

    public override stopViewing(): void {
        super.stopViewing();
        this.clearHighlights();
        this.createVariableBubble.visible = false;
    }

    private updateTableUI(): void {
        let _loc4_: WiredVariable = null;
        let _loc5_: UtilsMap = null;
        let _loc1_: any[] = null;
        let _loc3_: boolean = false;
        let _loc2_: any = undefined;
        if (this._state == WiredMenuInspectionTab.STATE_NOTHING) {
            this._SafeStr_2558.clear();
            Util.disableSection(this.variableValuesTableContainer);
        } else if (this._state == WiredMenuInspectionTab.STATE_DISPLAYING) {
            if (!this.variableValuesTableContainer.isEnabled()) {
                Util.disableSection(this.variableValuesTableContainer, false);
            }
            _loc5_ = this._data.variableValues;
            _loc1_ = [];
            for (const _loc6_ of _loc5_.getKeys() ?? []) {
                _loc4_ = this._variablesById.get(_loc6_);
                if (_loc4_ != null) {
                    _loc1_.push(_loc4_);
                }
            }
            Util.sortVariables(_loc1_);
            _loc3_ = this.getObjectIdForType() == this._SafeStr_6832 && this._data.type == this._SafeStr_7187;
            _loc2_ = [];
            for (_loc4_ of _loc1_ ?? []) {
                if (!_loc4_.isInvisible) {
                    _loc2_.push(new VariableValueTableObject(_loc4_, _loc5_.getValue(_loc4_.variableId) | 0, this.controller.hasWritePermission, _loc3_, this.controller.roomEvents));
                }
            }
            this._SafeStr_2558.setObjects(_loc2_);
            this._SafeStr_6832 = this.getObjectIdForType();
            this._SafeStr_7187 = this._data.type;
        }
        this.updateButtonsUI();
    }

    private updateButtonsUI(): void {
        let _loc3_: VariableValueTableObject = null;
        let _loc2_: boolean = false;
        let _loc1_: boolean = false;
        if (this.controller.hasWritePermission) {
            _loc3_ = asInstanceOf(this._SafeStr_2558.selected, VariableValueTableObject);
            if (this._data != null && this._data.type != VariableExtraSourceTypes.GLOBAL_SOURCE) {
                if (_loc3_ != null && _loc3_.variable != null && _loc3_.variable.canCreateAndDelete) {
                    _loc2_ = true;
                }
                _loc1_ = true;
            }
        }
        Util.disableSection(this.deleteVariableButton, !_loc2_);
        Util.disableSection(this.addVariableButton, !_loc1_);
    }

    private onRowSelected = (param1: VariableValueTableObject): void => {
        let _loc2_: VariableValueTableObject = null;
        this.updateButtonsUI();
        if (param1 == null && this._removedVariable != -1) {
            _loc2_ = asInstanceOf(this._SafeStr_2558.getObjectByIndex(this._removedVariable), VariableValueTableObject);
            this._SafeStr_2558.trySelect(_loc2_);
            this._removedVariable = -1;
        }
    };

    private onAllVariables = (param1: WiredVariable[]): void => {
        this._variablesById = new Dictionary();
        for (const _loc2_ of param1 ?? []) {
            this._variablesById.set(_loc2_.variableId, _loc2_);
        }
        if (this._state != WiredMenuInspectionTab.STATE_AWAITING_VARIABLES) {
            return;
        }
        this._state = WiredMenuInspectionTab.STATE_DISPLAYING;
        this.updateTableUI();
        this.updateLoadingState();
        this.updatePreviewUI();
    };

    private onSelectVariableType = (param1: number): void => {
        this.clearDataAndState();
        this.initializeInterface();
        if (param1 == VariableExtraSourceTypes.GLOBAL_SOURCE) {
            this._state = WiredMenuInspectionTab.STATE_FETCHING_HOLDING_VARIABLES;
            this.requestVariablesForObject(param1, 0);
            this.updateLoadingState();
        }
        this.updatePreviewUI();
        this.updateButtonsUI();
    };

    private requestVariablesForObject(param1: number, param2: number): void {
        this._SafeStr_6283 = getTimer();
        this.controller.send(new WiredGetVariablesForObjectMessageComposer(param1, param2));
    }

    public inspectFurni(param1: number, param2: boolean = false): void {
        if (!this.isViewing) {
            return;
        }
        if (this.pinCheckbox.isSelected && this._state == WiredMenuInspectionTab.STATE_DISPLAYING && !param2) {
            return;
        }
        if (param2) {
            this.pinCheckbox.select();
        }
        let _loc3_: boolean = this._SafeStr_2460.selectedType == WiredInputSourcePicker._SafeStr_2178;
        if (param2 && !_loc3_) {
            this._SafeStr_2460.selectedType = WiredInputSourcePicker._SafeStr_2178;
            this.updatePreviewUI();
        } else if (!_loc3_) {
            return;
        }
        if (this._SafeStr_2460.selectedType == WiredInputSourcePicker._SafeStr_2178) {
            if (this._data != null && this._data.type == WiredInputSourcePicker._SafeStr_2178 && this._data.objectId == param1) {
                return;
            }
            this._state = WiredMenuInspectionTab.STATE_FETCHING_HOLDING_VARIABLES;
            this.updateLoadingState();
            this.requestVariablesForObject(WiredInputSourcePicker._SafeStr_2178, param1);
        }
    }

    public inspectUser(param1: number, param2: boolean = false): void {
        if (!this.isViewing) {
            return;
        }
        if (this.pinCheckbox.isSelected && this._state == WiredMenuInspectionTab.STATE_DISPLAYING && !param2) {
            return;
        }
        if (param2) {
            this.pinCheckbox.select();
        }
        let _loc3_: boolean = this._SafeStr_2460.selectedType == WiredInputSourcePicker.USER_SOURCE;
        if (param2 && !_loc3_) {
            this._SafeStr_2460.selectedType = WiredInputSourcePicker.USER_SOURCE;
            this.updatePreviewUI();
        } else if (!_loc3_) {
            return;
        }
        if (this._SafeStr_2460.selectedType == WiredInputSourcePicker.USER_SOURCE) {
            if (this._data != null && this._data.type == WiredInputSourcePicker.USER_SOURCE && this._data.userIndex == param1) {
                return;
            }
            this._state = WiredMenuInspectionTab.STATE_FETCHING_HOLDING_VARIABLES;
            this.updateLoadingState();
            this.requestVariablesForObject(WiredInputSourcePicker.USER_SOURCE, param1);
        }
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        if (this.controller != null && this.controller.variablesSynchronizer != null) {
            this.controller.variablesSynchronizer.removeListener(this.onAllVariables);
        }
        this._SafeStr_2460.dispose();
        this._SafeStr_2460 = null;
        this._SafeStr_2558.dispose();
        this._SafeStr_2558 = null;
        this._state = WiredMenuInspectionTab.STATE_NOTHING;
        this._variablesById = null;
        this._data = null;
        this._SafeStr_3042.dispose();
        this._SafeStr_3042 = null;
        this._highlighter.dispose();
        this._highlighter = null;
        super.dispose();
    }

    public update(param1: number): void {
        if (!this.isViewing) {
            return;
        }
        this._SafeStr_2460.update(param1);
        let _loc2_: number = getTimer();
        if (this._SafeStr_6283 < _loc2_ - WiredMenuInspectionTab.POLL_VARIABLES_MS && this.isDataReady()) {
            this.maybePollNewVariables();
        }
        this._highlighter.update(param1);
    }

    private get variableValuesTableContainer(): IWindowContainer {
        return asGuarded(this.container.findChildByName("variable_values_table_container"), isIWindowContainer);
    }

    private get typePickerContainer(): IWindowContainer {
        return asGuarded(this.container.findChildByName("type_picker_container"), isIWindowContainer);
    }

    private get previewContainer(): IWindowContainer {
        return asGuarded(this.container.findChildByName("preview_container"), isIWindowContainer);
    }

    private get pinContainer(): IWindowContainer {
        return asGuarded(this.container.findChildByName("pin_option_container"), isIWindowContainer);
    }

    private get pinCheckbox(): ICheckBoxWindow {
        return asGuarded(this.container.findChildByName("pin_checkbox"), isICheckBoxWindow);
    }

    private get highlightWiredButton(): IContainerButtonWindow {
        return asGuarded(this.container.findChildByName("highlight_wired_btn"), isIContainerButtonWindow);
    }

    private get deleteVariableButton(): IButtonWindow {
        return asGuarded(this.container.findChildByName("delete_var_btn"), isIButtonWindow);
    }

    private get addVariableButton(): IButtonWindow {
        return asGuarded(this.container.findChildByName("add_var_btn"), isIButtonWindow);
    }

    private get createVariableBubble(): IBubbleWindow {
        return asGuarded(this.container.findChildByName("create_var_bubble"), isIBubbleWindow);
    }

    private get variablePickerContainer(): IWindowContainer {
        return asGuarded(this.createVariableBubble.findChildByName("var_picker_container"), isIWindowContainer);
    }

    private get valueInputBorder(): IBorderWindow {
        return asGuarded(this.createVariableBubble.findChildByName("value_input_border"), isIBorderWindow);
    }

    private get valueInput(): ITextWindow {
        return asGuarded(this.createVariableBubble.findChildByName("value_input"), isITextWindow);
    }

    private get createVariableButton(): IButtonWindow {
        return asGuarded(this.createVariableBubble.findChildByName("create_var_btn"), isIButtonWindow);
    }

    private get variableSettingContainer(): IWindowContainer {
        return asGuarded(this.createVariableBubble.findChildByName("variable_setting"), isIWindowContainer);
    }

    private get valueSettingContainer(): IWindowContainer {
        return asGuarded(this.createVariableBubble.findChildByName("value_setting"), isIWindowContainer);
    }

    get [IUpdateReceiver](): true {
        return true;
    }
}
