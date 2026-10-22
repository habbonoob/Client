import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import type { IBubbleWindow } from '@/com/sulake/core/window/components/IBubbleWindow';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { IDesktopWindow } from '@/com/sulake/core/window/components/IDesktopWindow';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { IIconWindow } from '@/com/sulake/core/window/components/IIconWindow';
import type { ITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { WiredVariable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/variables/WiredVariable';
import type { WiredUserPermanentVariablesList } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredmenu/variables_management/WiredUserPermanentVariablesList';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { VariableManagementDetailController } from '@/com/sulake/habbo/roomevents/wired_menu/variables_management/detail/VariableManagementDetailController';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { ITableObject } from '@/com/sulake/habbo/window/utils/tableview/ITableObject';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { isIBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import { isIBubbleWindow } from '@/com/sulake/core/window/components/IBubbleWindow';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isIIconWindow } from '@/com/sulake/core/window/components/IIconWindow';
import { isITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { VariableList } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/params/VariableList';
import { WiredGetUserPermanentVariablesComposer } from '@/com/sulake/habbo/communication/messages/outgoing/userdefinedroomevents/wiredmenu/variables_management/WiredGetUserPermanentVariablesComposer';
import { WiredSetUserPermanentVariableComposer } from '@/com/sulake/habbo/communication/messages/outgoing/userdefinedroomevents/wiredmenu/variables_management/WiredSetUserPermanentVariableComposer';
import { Util } from '@/com/sulake/habbo/roomevents/Util';
import { VariableValueTableObject } from '@/com/sulake/habbo/roomevents/wired_menu/tabs/tab_inspection/VariableValueTableObject.group';
import { PermanentVariableHolderPreviewer } from '@/com/sulake/habbo/roomevents/wired_menu/variables_management/detail/PermanentVariableHolderPreviewer';
import { WiredInputSourcePicker } from '@/com/sulake/habbo/roomevents/wired_setup/inputsources/WiredInputSourcePicker';
import { NewVariablePicker } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/newvariablepicker/NewVariablePicker';
import { LoadingIcon } from '@/com/sulake/habbo/utils/LoadingIcon';
import { TableColumn } from '@/com/sulake/habbo/window/utils/tableview/TableColumn';
import { TableView } from '@/com/sulake/habbo/window/utils/tableview/TableView';

export class VariableManagementDetailView implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_menu.variables_management.detail::VariableManagementDetailView'); }

    public static readonly DESKTOP_WINDOW_LAYER: number = 1;
    public static VARIABLES_COLUMN_VARIABLE: string = "variable";
    public static VARIABLES_COLUMN_VALUE: string = "value";

    constructor(param1: VariableManagementDetailController, param2: IHabboWindowManager) {
        this._controller = param1;
        this._windowManager = param2;
        this._window = asGuarded(this._windowManager.buildFromXML(XML.from(this._controller.assets.getAssetByName("variables_management_detail_xml").content), 1), isIFrameWindow);
        this._loadingIcon = new LoadingIcon();
        this._SafeStr_2558 = new TableView(param2, this.variableValuesTableContainer);
        this._SafeStr_3042 = new PermanentVariableHolderPreviewer(this.previewWindow, this._controller.roomEvents.wiredMenu);
        this.createVariableValuesTable();
        this.createCreateVariableBubble();
        this.refreshButton.addEventListener("WME_CLICK", this.onRefreshClick);
        this.closeButton.addEventListener("WME_CLICK", this.onClose);
        this.deleteVariableButton.addEventListener("WME_CLICK", this.onDeleteVariableClicked);
        this.addVariableButton.addEventListener("WME_CLICK", this.onAddVariableClicked);
        this.createVariableButton.addEventListener("WME_CLICK", this.onCreateVariableClicked);
        this._window.procedure = this.windowProcedure;
        this.hide();
    }

    declare private _controller: VariableManagementDetailController;

    declare private _windowManager: IHabboWindowManager;

    declare private _loadingIcon: LoadingIcon;

    declare private _window: IFrameWindow;

    declare private _SafeStr_2558: TableView;

    declare private _SafeStr_3390: NewVariablePicker;

    declare private _SafeStr_3042: PermanentVariableHolderPreviewer;

    private _disposed: boolean = false;

    public get disposed(): boolean {
        return this._disposed;
    }

    private get hasWritePermission(): boolean {
        return this._controller.roomEvents.wiredMenu.hasWritePermission;
    }

    private get closeButton(): IWindow {
        return this._window.findChildByName("header_button_close");
    }

    private get refreshButton(): IButtonWindow {
        return asGuarded(this._window.findChildByName("refresh_btn"), isIButtonWindow);
    }

    private get loadingIconWindow(): IIconWindow {
        return asGuarded(this._window.findChildByName("searching_icon"), isIIconWindow);
    }

    private get previewWindow(): IWindowContainer {
        return asGuarded(this._window.findChildByName("info_box"), isIWindowContainer);
    }

    private get infoBoxText(): ITextFieldWindow {
        return asGuarded(this._window.findChildByName("info_box_text"), isITextFieldWindow);
    }

    private get variableValuesTableContainer(): IWindowContainer {
        return asGuarded(this._window.findChildByName("variable_values_table_container"), isIWindowContainer);
    }

    private get deleteVariableButton(): IButtonWindow {
        return asGuarded(this._window.findChildByName("delete_var_btn"), isIButtonWindow);
    }

    private get addVariableButton(): IButtonWindow {
        return asGuarded(this._window.findChildByName("add_var_btn"), isIButtonWindow);
    }

    private get createVariableBubble(): IBubbleWindow {
        return asGuarded(this._window.findChildByName("create_var_bubble"), isIBubbleWindow);
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

    private get valueSettingContainer(): IWindowContainer {
        return asGuarded(this.createVariableBubble.findChildByName("value_setting"), isIWindowContainer);
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

    public displayNewData(): void {
        let _loc1_: WiredUserPermanentVariablesList = this._controller.data;
        if (_loc1_ == null) {
            return;
        }
        this.updateTableviewUI();
        this.updatePreviewUI();
        this.updateInfoBoxUI();
        this.updateButtonsUI();
        this._loadingIcon.setVisible(this.loadingIconWindow, false);
        this._SafeStr_2558.scrollToTop();
        this._window.activate();
    }

    public updateTableviewUI(): void {
        let _loc6_: WiredVariable = null;
        let _loc5_: boolean = false;
        let _loc4_: WiredUserPermanentVariablesList = this._controller.data;
        let _loc2_: any[] = [];
        let _loc1_: UtilsMap = new UtilsMap();
        for (const _loc7_ of _loc4_.variableStorage ?? []) {
            _loc6_ = this._controller.variablesById.get(_loc7_.variableId);
            if (_loc6_ != null) {
                _loc2_.push(_loc6_);
                _loc1_.add(_loc6_.variableId, _loc7_.value);
            }
        }
        Util.sortVariables(_loc2_);
        let _loc3_: ITableObject[] = [];
        for (_loc6_ of _loc2_ ?? []) {
            if (!_loc6_.isInvisible) {
                _loc5_ = this.hasWritePermission && _loc6_.hasValue && _loc6_.canWriteValue;
                _loc3_.push(new VariableValueTableObject(_loc6_, _loc1_.getValue(_loc6_.variableId) | 0, _loc5_, false, this._controller.roomEvents));
            }
        }
        this._SafeStr_2558.setObjects(_loc3_);
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._SafeStr_3390.dispose();
        this._SafeStr_3390 = null;
        this._loadingIcon.dispose();
        this._loadingIcon = null;
        this._SafeStr_2558.dispose();
        this._SafeStr_2558 = null;
        this._window.dispose();
        this._window = null;
        this._controller = null;
        this._windowManager = null;
        this._SafeStr_3042.dispose();
        this._SafeStr_3042 = null;
        this._disposed = true;
    }

    private onRefreshClick = (param1: WindowMouseEvent): void => {
        let _loc2_: WiredUserPermanentVariablesList = this._controller.data;
        this._controller.send(new WiredGetUserPermanentVariablesComposer(_loc2_.entityType, _loc2_.entityId));
        this._loadingIcon.setVisible(this.loadingIconWindow, true);
    };

    private onClose = (param1: WindowMouseEvent): void => {
        this.hide();
    };

    private createVariableValuesTable(): void {
        let _loc1_: any[] = [new TableColumn(VariableManagementDetailView.VARIABLES_COLUMN_VARIABLE, this._controller.localizationManager.getLocalization("wiredmenu.inspection.variables.variable"), 0.65, "left"), new TableColumn(VariableManagementDetailView.VARIABLES_COLUMN_VALUE, this._controller.localizationManager.getLocalization("wiredmenu.inspection.variables.value"), 0.35, "right")];
        this._SafeStr_2558.initialize(Array.from(_loc1_));
        this._SafeStr_2558.onCellEditCallback = this.onCellEdit;
        this._SafeStr_2558.onRowSelectedCallback = this.onRowSelected;
    }

    private createCreateVariableBubble(): void {
        let _loc1_: HabboUserDefinedRoomEvents = this._controller.roomEvents;
        let _loc3_: PresetManager = _loc1_.wiredCtrl.presetManager;
        let _loc2_: IWindowContainer = asGuarded(_loc3_.createLayout("search_tree_dropdown"), isIWindowContainer);
        this.variablePickerContainer.addChild(_loc2_);
        this._SafeStr_3390 = new NewVariablePicker(this._controller.roomEvents, _loc2_, this.variableFilter, this.onChangeCreateVariable);
        this._SafeStr_3390.width = this.variablePickerContainer.width;
        this.createVariableBubble.visible = false;
    }

    private onChangeCreateVariable = (param1: WiredVariable): void => {
        Util.disableSection(this.valueSettingContainer, param1 != null && !param1.hasValue);
        Util.disableSection(this.createVariableButton, param1 == null);
    };

    private variableFilter = (param1: WiredVariable): boolean => {
        let _loc2_: WiredUserPermanentVariablesList = this._controller.data;
        return param1.canCreateAndDelete && (_loc2_ == null || !(_loc2_.variableIds.has(param1.variableId))) && param1.isPersisted;
    };

    private onCellEdit = (param1: ITableObject, param2: string, param3: string): void => {
        if (param2 != VariableManagementDetailView.VARIABLES_COLUMN_VALUE) {
            return;
        }
        let _loc6_: VariableValueTableObject = param1 instanceof VariableValueTableObject ? param1 : null;
        let _loc5_: WiredVariable = _loc6_.variable;
        if (!this.hasWritePermission || !_loc5_.hasValue || !_loc5_.canWriteValue) {
            return;
        }
        let _loc4_: WiredUserPermanentVariablesList = this._controller.data;
        let _loc7_: number = Util.getIntFromString(param3, -2147483648, true);
        if (_loc7_ != -2147483648) {
            this._controller.send(new WiredSetUserPermanentVariableComposer(_loc4_.entityType, _loc4_.entityId, _loc5_.variableId, _loc7_, 0));
            this._loadingIcon.setVisible(this.loadingIconWindow, true);
        }
    };

    private onAddVariableClicked = (param1: WindowMouseEvent): void => {
        if (this.createVariableBubble.visible) {
            this.createVariableBubble.visible = false;
        } else {
            this._controller.roomEvents.variablesSynchronizer.getAllVariables(this.initializeCreateVariableBubble, true);
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
        this._SafeStr_3390.init(new VariableList(_loc3_), "", WiredInputSourcePicker.USER_SOURCE);
        Util.disableSection(this.createVariableButton, true);
        this.createVariableBubble.visible = true;
    };

    private onDeleteVariableClicked = (param1: WindowMouseEvent): void => {
        if (this._controller.data == null) {
            return;
        }
        let _loc4_: VariableValueTableObject = asInstanceOf(this._SafeStr_2558.selected, VariableValueTableObject);
        if (_loc4_ == null) {
            return;
        }
        let _loc3_: WiredVariable = _loc4_.variable;
        if (!this.hasWritePermission || !_loc3_.canCreateAndDelete) {
            return;
        }
        let _loc2_: WiredUserPermanentVariablesList = this._controller.data;
        this._controller.send(new WiredSetUserPermanentVariableComposer(_loc2_.entityType, _loc2_.entityId, _loc3_.variableId, 0, 2));
        this._loadingIcon.setVisible(this.loadingIconWindow, true);
    };

    private onCreateVariableClicked = (param1: WindowMouseEvent): void => {
        if (this._controller.data == null) {
            return;
        }
        let _loc3_: WiredVariable = this._SafeStr_3390.selected;
        this._SafeStr_3390.finalize();
        let _loc4_: number = 0;
        if (_loc3_.hasValue) {
            _loc4_ = Number(this.valueInput.text) | 0;
        }
        let _loc2_: WiredUserPermanentVariablesList = this._controller.data;
        this._controller.send(new WiredSetUserPermanentVariableComposer(_loc2_.entityType, _loc2_.entityId, _loc3_.variableId, _loc4_, 1));
        this._loadingIcon.setVisible(this.loadingIconWindow, true);
        this.createVariableBubble.visible = false;
        this.valueInput.text = "0";
    };

    private onRowSelected = (param1: VariableValueTableObject): void => {
        this.updateButtonsUI();
    };

    private updateButtonsUI(): void {
        let _loc3_: VariableValueTableObject = null;
        let _loc2_: boolean = false;
        let _loc1_: boolean = false;
        if (this.hasWritePermission) {
            _loc3_ = asInstanceOf(this._SafeStr_2558.selected, VariableValueTableObject);
            if (_loc3_ != null && _loc3_.variable != null && _loc3_.variable.canCreateAndDelete) {
                _loc2_ = true;
            }
            _loc1_ = true;
        }
        Util.disableSection(this.deleteVariableButton, !_loc2_);
        Util.disableSection(this.addVariableButton, !_loc1_);
    }

    private updatePreviewUI(): void {
        let _loc2_: number = 0;
        let _loc1_: WiredUserPermanentVariablesList = this._controller.data;
        if (_loc1_ == null) {
            this._SafeStr_3042.clearPreviewer();
            return;
        }
        if (_loc1_.entityType == 2) {
            this._SafeStr_3042.setPetPreview(_loc1_.entityFigure);
        } else {
            _loc2_ = _loc1_.entityId;
            this._SafeStr_3042.setUserPreview(_loc1_.entityFigure, _loc2_);
        }
    }

    private updateInfoBoxUI(): void {
        let _loc1_: WiredUserPermanentVariablesList = this._controller.data;
        if (_loc1_ == null) {
            this.infoBoxText.text = "";
            return;
        }
        if (_loc1_.entityType == 1) {
            this.infoBoxText.text = this._controller.localizationManager.getLocalizationWithParams("wiredmenu.variable_management_detail.info.user", "", "name", _loc1_.entityName, "id", _loc1_.entityId);
        } else if (_loc1_.entityType == 2) {
            this.infoBoxText.text = this._controller.localizationManager.getLocalizationWithParams("wiredmenu.variable_management_detail.info.pet", "", "name", _loc1_.entityName, "id", _loc1_.entityId, "owner_name", _loc1_.ownerName, "owner_id", _loc1_.ownerId);
        } else if (_loc1_.entityType == 4) {
            this.infoBoxText.text = this._controller.localizationManager.getLocalizationWithParams("wiredmenu.variable_management_detail.info.bot", "", "name", _loc1_.entityName, "id", _loc1_.entityId, "owner_name", _loc1_.ownerName, "owner_id", _loc1_.ownerId);
        }
    }

    get [IDisposable](): true {
        return true;
    }
}
