import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IDesktopWindow } from '@/com/sulake/core/window/components/IDesktopWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IConfirmDialog } from '@/com/sulake/core/window/utils/IConfirmDialog';
import type { InputSourcesConf } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/InputSourcesConf';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { AllVariablesInRoom } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/params/AllVariablesInRoom';
import type { WiredVariable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/variables/WiredVariable';
import type { GuildMembershipsMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/users/GuildMembershipsMessageEvent';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { ActionType } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/ActionType';
import type { Element } from '@/com/sulake/habbo/roomevents/wired_setup/Element';
import type { ElementTypeHolder } from '@/com/sulake/habbo/roomevents/wired_setup/ElementTypeHolder';
import type { IWiredCtrl } from '@/com/sulake/habbo/roomevents/wired_setup/IWiredCtrl';
import type { CheckboxGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/CheckboxGroupPreset';
import type { AdvancedSettingsWrapperPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/main_layout/AdvancedSettingsWrapperPreset';
import type { FooterPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/main_layout/FooterPreset';
import type { FramePreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/main_layout/FramePreset';
import type { HeaderPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/main_layout/HeaderPreset';
import type { InputSourceSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/main_layout/InputSourceSection';
import type { RadioGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/RadioGroupPreset';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { VariableType } from '@/com/sulake/habbo/roomevents/wired_setup/variables/VariableType';
import type { WiredVariablesSynchronizer } from '@/com/sulake/habbo/roomevents/WiredVariablesSynchronizer';
import type { IFurnitureData } from '@/com/sulake/habbo/session/furniture/IFurnitureData';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import type { IRoomObjectModel } from '@/com/sulake/room/object/IRoomObjectModel';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { ActionDefinition } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/ActionDefinition';
import { AddonDefinition } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/AddonDefinition';
import { ConditionDefinition } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/ConditionDefinition';
import { QuantifierType } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/QuantifierType';
import { SelectorDefinition } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/SelectorDefinition';
import { TriggerDefinition } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/TriggerDefinition';
import { VariableDefinition } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/VariableDefinition';
import { ApplySnapshotMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/userdefinedroomevents/ApplySnapshotMessageComposer';
import { UpdateActionMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/userdefinedroomevents/UpdateActionMessageComposer';
import { UpdateAddonMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/userdefinedroomevents/UpdateAddonMessageComposer';
import { UpdateConditionMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/userdefinedroomevents/UpdateConditionMessageComposer';
import { UpdateSelectorMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/userdefinedroomevents/UpdateSelectorMessageComposer';
import { UpdateTriggerMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/userdefinedroomevents/UpdateTriggerMessageComposer';
import { UpdateVariableMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/userdefinedroomevents/UpdateVariableMessageComposer';
import { isActionType } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/ActionType';
import { ActionTypes } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/ActionTypes';
import { WriteToLogs } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/WriteToLogs';
import { AddonTypes } from '@/com/sulake/habbo/roomevents/wired_setup/addons/AddonTypes';
import { ClipboardWiredEntry } from '@/com/sulake/habbo/roomevents/wired_setup/ClipboardWiredEntry';
import { ConditionTypes } from '@/com/sulake/habbo/roomevents/wired_setup/conditions/ConditionTypes';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { WiredInputSourcePicker } from '@/com/sulake/habbo/roomevents/wired_setup/inputsources/WiredInputSourcePicker';
import { RoomObjectHighLighter } from '@/com/sulake/habbo/roomevents/wired_setup/RoomObjectHighLighter';
import { SelectorTypes } from '@/com/sulake/habbo/roomevents/wired_setup/selectors/SelectorTypes';
import { TriggerConfs } from '@/com/sulake/habbo/roomevents/wired_setup/triggerconfs/TriggerConfs';
import { CheckboxOptionParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/CheckboxOptionParam';
import { RadioButtonParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/RadioButtonParam';
import { TextParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextParam';
import { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import { SliderSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/SliderSection';
import { IlluminaWiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/IlluminaWiredStyle';
import { UbuntuWiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/UbuntuWiredStyle';
import { VolterBlueWiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/VolterBlueWiredStyle';
import { VolterGreenWiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/VolterGreenWiredStyle';
import { VolterWiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/VolterWiredStyle';
import { VolterYellowWiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/VolterYellowWiredStyle';
import { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { isVariableType } from '@/com/sulake/habbo/roomevents/wired_setup/variables/VariableType';
import { VariableTypes } from '@/com/sulake/habbo/roomevents/wired_setup/variables/VariableTypes';
import { WiredConfigurationCache } from '@/com/sulake/habbo/roomevents/wired_setup/WiredConfigurationCache';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class UserDefinedRoomEventsCtrl implements IWiredCtrl {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup::UserDefinedRoomEventsCtrl'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        UserDefinedRoomEventsCtrl.#initStatics();
        return UserDefinedRoomEventsCtrl._log;
    }

    public static readonly STYLE_DEFAULT: string = "illumina";
    public static readonly UPDATE_MODE_NORMAL: number = 0;
    public static readonly _SafeStr_7921: number = 1;
    public static readonly UPDATE_MODE_SAVE_INTO_OTHER: number = 2;
    public static readonly STYLE_OPTIONS: any[] = ["illumina", "volter"];

    constructor(param1: HabboUserDefinedRoomEvents) {
        this._roomEvents = param1;
        this._SafeStr_2855 = new RoomObjectHighLighter(param1);
        this._presetManager = new PresetManager(param1);
        this._wiredStyles = new UtilsMap();
        this._wiredStyles.add("volter", new VolterWiredStyle(param1));
        this._wiredStyles.add("illumina", new IlluminaWiredStyle(param1));
        this._wiredStyles.add("volter_yellow", new VolterYellowWiredStyle(param1));
        this._wiredStyles.add("volter_blue", new VolterBlueWiredStyle(param1));
        this._wiredStyles.add("volter_green", new VolterGreenWiredStyle(param1));
        this._wiredStyles.add("ubuntu", new UbuntuWiredStyle(param1));
        this._SafeStr_4331 = this._wiredStyles["illumina"];
        this._SafeStr_3700 = this._wiredStyles.getValue("volter");
    }

    declare private _roomEvents: HabboUserDefinedRoomEvents;

    private _SafeStr_6640: TriggerConfs = new TriggerConfs();
    private _actionTypes: ActionTypes = new ActionTypes();
    private _conditionTypes: ConditionTypes = new ConditionTypes();
    private _addonTypes: AddonTypes = new AddonTypes();
    private _selectorTypes: SelectorTypes = new SelectorTypes();
    private _variableTypes: VariableTypes = new VariableTypes();
    private _SafeStr_3564: boolean = false;
    private _activeFurniPicks: number = 1;
    private _stuffs1: Map<any, any> = new Dictionary();
    private _stuffs2: Map<any, any> = new Dictionary();

    declare private _SafeStr_2122: Triggerable;

    declare private _SafeStr_2150: Element;

    declare private _SafeStr_2855: RoomObjectHighLighter;

    private _SafeStr_6665: boolean = false;
    private _variablesCallback: (...args: any[]) => any = null;

    declare private _wiredStyles: UtilsMap;

    declare private _SafeStr_3700: WiredStyle;

    declare private _SafeStr_4331: WiredStyle;

    declare private _presetManager: PresetManager;

    private _configurationCache: Map<any, any> = new Dictionary();
    private _SafeStr_5081: Map<any, any> = new Dictionary();
    private _updateMode: number = 0;
    private _SafeStr_5622: number = -2147483648;
    private _SafeStr_6824: number = -2147483648;

    declare private _frame: FramePreset;

    declare private _headerPreset: HeaderPreset;

    declare private _selectorOptionsPreset: CheckboxGroupPreset;

    declare private _furniPicksSectionPreset: SectionPreset;

    declare private _delayPreset: SliderSection;

    declare private _initialWidth: number;
    static { (this.prototype as any)._initialWidth = 0; }

    declare private _advancedSettingsWrapperPreset: AdvancedSettingsWrapperPreset;

    declare private _conditionQuantifierOptions: RadioGroupPreset;

    declare private _inputSourcePresets: InputSourceSection[];

    declare private _footerPreset: FooterPreset;

    public get hidePickFurniInstructions(): boolean {
        if (this._SafeStr_2122 == null) {
            return false;
        }
        if (this._SafeStr_2150.forceHidePickFurniInstructions) {
            return true;
        }
        return !this._SafeStr_2122.inputSourcesConf.isFurniSelectionDefault() && !this._SafeStr_2150.forceFurniSelection;
    }

    public get activeFurniPicks(): number {
        return this._activeFurniPicks;
    }

    public set activeFurniPicks(param1: number) {
        this._activeFurniPicks = param1;
        if (this._inputSourcePresets != null) {
            for (const _loc2_ of this._inputSourcePresets ?? []) {
                _loc2_.activeFurniPicksChanged();
            }
        }
    }

    public get isUsingAdvancedSettings(): boolean {
        return !!(this._SafeStr_2122 && (this._SafeStr_2122.usingCustomInputSources || this._SafeStr_2150.usingCustomAdvancedSettings));
    }

    public get wiredStyle(): WiredStyle {
        return this._SafeStr_3700;
    }

    public get presetManager(): PresetManager {
        return this._presetManager;
    }

    private get activeStuffsDictionary(): Map<any, any> {
        if (!this._SafeStr_3564 || this._activeFurniPicks == 1) {
            return this._stuffs1;
        }
        return this._stuffs2;
    }

    private get activeStuffsArray(): any[] {
        if (!this._SafeStr_3564 || this._activeFurniPicks == 1) {
            return this.getStuffIds();
        }
        return this.getStuffIds2();
    }

    private get isResizeEnabled(): boolean {
        return false;
    }

    private get useCache(): boolean {
        return true;
    }

    public stuffAdded(param1: number): void {
        if (this.activeStuffsDictionary.get(param1)) {
            this._SafeStr_2855.show(param1, this._SafeStr_3564, this._activeFurniPicks);
        }
    }

    public stuffSelected(param1: number): void {
        if (this._frame == null || this._SafeStr_2122 == null) {
            return;
        }
        if (this._frame.isCopyingIntoMode) {
            return;
        }
        if (!this.isStuffSelectionMode() || !this._SafeStr_2122.allowWallFurni && param1 < 0) {
            return;
        }
        if (this.activeStuffsDictionary.get(param1)) {
            this.activeStuffsDictionary.delete(param1);
            this._SafeStr_2855.hide(param1, this._SafeStr_3564, this._activeFurniPicks);
        } else if (this.activeStuffsArray.length < this._SafeStr_2122.furniLimit) {
            this.activeStuffsDictionary.set(param1, true);
            this._SafeStr_2855.show(param1, this._SafeStr_3564, this._activeFurniPicks);
        }
        this.onStuffsChanged();
    }

    public getStyleByName(param1: string): WiredStyle {
        return this._wiredStyles[param1];
    }

    public resizeFrame(): void {
        this._frame.resizeToWidth(this._SafeStr_2150.widthModifier * this._initialWidth | 0);
    }

    public close = (): void => {
        if (this._SafeStr_2122 != null) {
            this._SafeStr_2855.unhighlightActiveWired(this._SafeStr_2122.id);
            this._SafeStr_2150.onEditEnd();
            this._SafeStr_2122 = null;
            this._SafeStr_2150 = null;
        }
        this.hideFurniHighlights();
        this._stuffs1 = new Dictionary();
        this._stuffs2 = new Dictionary();
        if (this._frame) {
            this.savePosition();
            this.hideFrame();
            this._headerPreset = null;
            this._selectorOptionsPreset = null;
            this._furniPicksSectionPreset = null;
            this._delayPreset = null;
            this._footerPreset = null;
            this._conditionQuantifierOptions = null;
            this._advancedSettingsWrapperPreset = null;
            this._inputSourcePresets = null;
            this._initialWidth = -1;
            if (!this.useCache) {
                this._frame.dispose();
            }
            this._frame = null;
        }
        if (this._variablesCallback != null) {
            this._roomEvents.variablesSynchronizer.removeListener(this._variablesCallback);
            this._variablesCallback = null;
        }
    };

    public prepareForUpdate(param1: Triggerable): void {
        let _loc3_: ElementTypeHolder = null;
        let _loc5_: Element = null;
        if (this._frame != null && this._SafeStr_2150 != null && this._frame.isCopyingIntoMode) {
            _loc3_ = this.resolveHolderFor(param1);
            _loc5_ = _loc3_.getElementByCode(param1.code);
            if (_loc5_ == this._SafeStr_2150) {
                this.update(2, param1.id);
            } else {
                this._roomEvents.notifications.addItem("${notification.wired.pasted_into_fail}", "wired");
            }
            return;
        }
        if (this.synchronizeTriggerable(param1)) {
            return;
        }
        if (this._frame) {
            this.close();
        }
        this._SafeStr_2122 = param1;
        this._SafeStr_3564 = param1.inputSourcesConf.isDualFurniPickingMode();
        this._activeFurniPicks = 1;
        this._SafeStr_2150 = this.resolveHolder().getElementByCode(this._SafeStr_2122.code);
        this._SafeStr_3700 = this.determineActiveWiredStyle();
        if (!this.createWindow()) {
            this._SafeStr_2122 = null;
            this._SafeStr_2150 = null;
            return;
        }
        UserDefinedRoomEventsCtrl._log.info("Received: " + this._SafeStr_2122 + ", " + param1.code);
        this._SafeStr_2855.highlightActiveWired(this._SafeStr_2122.id);
        this.hideFurniHighlights();
        this._stuffs1 = new Dictionary();
        this._stuffs2 = new Dictionary();
        for (const _loc2_ of this._SafeStr_2122.stuffIds ?? []) {
            this._stuffs1.set(_loc2_, true);
        }
        for (const _loc4_ of this._SafeStr_2122.stuffIds2 ?? []) {
            this._stuffs2.set(_loc4_, true);
        }
        this._SafeStr_2150.onEditStart(this._SafeStr_2122);
        if (this._SafeStr_3564) {
            this._SafeStr_2855.showAll(this._stuffs1, true, 1);
            this._SafeStr_2855.showAll(this._stuffs2, true, 2);
        } else {
            this._SafeStr_2855.showAll(this._stuffs1, false, 0);
        }
        this.onEditStartUpdateCommonUI();
        this._SafeStr_2150.onEditInitialized();
        this.restorePositionAndActivate();
    }

    public stuffRemoved(param1: number): void {
        if (this._frame == null || this._SafeStr_2122 == null) {
            return;
        }
        if (this._SafeStr_2122.id == param1) {
            this.close();
            return;
        }
        let _loc2_: boolean = false;
        if (this._stuffs1.get(param1)) {
            this._stuffs1.delete(param1);
            _loc2_ = true;
        }
        if (this._stuffs2.get(param1)) {
            this._stuffs2.delete(param1);
            _loc2_ = true;
        }
        if (_loc2_) {
            this.onStuffsChanged();
        }
    }

    public clearStuffPicks(): void {
        this.hideFurniHighlights();
        this._stuffs1 = new Dictionary();
        this._stuffs2 = new Dictionary();
        this.onStuffsChanged();
    }

    public resetToDefault(): void {
        let _loc2_: number = 0;
        this.savePosition();
        this._SafeStr_2122.intParams = this._SafeStr_2122.defaultIntParams.concat();
        this._SafeStr_2122.stringParam = "";
        let _loc5_: any[] = [];
        _loc2_ = 0;
        while (_loc2_ < (this._SafeStr_2122.variableIds as unknown as number)) {
            _loc5_.push(0);
            _loc2_ += 1;
        }
        this._SafeStr_2122.variableIds = _loc5_;
        this._SafeStr_2122.stuffIds = [];
        this._SafeStr_2122.stuffIds2 = [];
        this._SafeStr_2122.furniSourceTypes = this._SafeStr_2122.inputSourcesConf.defaultFurniSources.concat();
        this._SafeStr_2122.userSourceTypes = this._SafeStr_2122.inputSourcesConf.defaultUserSources.concat();
        let _loc3_: ActionDefinition = this._SafeStr_2122 instanceof ActionDefinition ? this._SafeStr_2122 : null;
        let _loc1_: ConditionDefinition = this._SafeStr_2122 instanceof ConditionDefinition ? this._SafeStr_2122 : null;
        let _loc4_: SelectorDefinition = this._SafeStr_2122 instanceof SelectorDefinition ? this._SafeStr_2122 : null;
        if (_loc3_ != null) {
            _loc3_.delayInPulses = 0;
        }
        if (_loc1_ != null) {
            _loc1_.quantifierCode = 0;
        }
        if (_loc4_ != null) {
            _loc4_.isFilter = false;
            _loc4_.isInvert = false;
        }
        this.prepareForUpdate(this._SafeStr_2122);
        this.restorePositionAndActivate();
    }

    public createClipboardCopy(): void {
        let _loc1_: ElementTypeHolder = this.resolveHolder();
        if (_loc1_ == null) {
            return;
        }
        let _loc3_: string = _loc1_.getKey() + "-" + this._SafeStr_2150.code;
        let _loc2_: ClipboardWiredEntry = new ClipboardWiredEntry(this._SafeStr_2150.readIntParamsFromForm(), this._SafeStr_2150.readStringParamFromForm(), this._SafeStr_2150.readVariableIdsFromForm(), this.getStuffIds(), this.getStuffIds2(), this._SafeStr_2122.furniSourceTypes.concat(), this._SafeStr_2122.userSourceTypes.concat());
        if (this._SafeStr_2122 instanceof ActionDefinition) {
            _loc2_.delayInPulses = this.getActionDelay();
        }
        if (this._SafeStr_2122 instanceof ConditionDefinition) {
            _loc2_.quantifierCode = this.resolveQuantifier();
        }
        if (this._SafeStr_2122 instanceof SelectorDefinition) {
            _loc2_.isFilter = this.isSelectorFilter();
            _loc2_.isInvert = this.isSelectorInvert();
        }
        this._SafeStr_5081.set(_loc3_, _loc2_);
        this._frame.updateButtonDisabledStates();
        this._roomEvents.notifications.addItem("${notification.wired.copied}", "wired");
    }

    public pasteFromClipboard(): void {
        let _loc3_: ElementTypeHolder = this.resolveHolder();
        if (_loc3_ == null) {
            return;
        }
        let _loc6_: string = _loc3_.getKey() + "-" + this._SafeStr_2150.code;
        let _loc5_: ClipboardWiredEntry = this._SafeStr_5081.get(_loc6_);
        if (_loc5_ == null) {
            return;
        }
        this.savePosition();
        this._SafeStr_2122.intParams = _loc5_.intParams.concat();
        this._SafeStr_2122.stringParam = _loc5_.stringParam.concat();
        this._SafeStr_2122.variableIds = _loc5_.variableIds.concat();
        this._SafeStr_2122.stuffIds = _loc5_.stuffIds.concat();
        this._SafeStr_2122.stuffIds2 = _loc5_.stuffIds2.concat();
        this._SafeStr_2122.furniSourceTypes = _loc5_.furniSourceTypes.concat();
        this._SafeStr_2122.userSourceTypes = _loc5_.userSourceTypes.concat();
        let _loc2_: ActionDefinition = this._SafeStr_2122 instanceof ActionDefinition ? this._SafeStr_2122 : null;
        let _loc1_: ConditionDefinition = this._SafeStr_2122 instanceof ConditionDefinition ? this._SafeStr_2122 : null;
        let _loc4_: SelectorDefinition = this._SafeStr_2122 instanceof SelectorDefinition ? this._SafeStr_2122 : null;
        if (_loc2_ != null) {
            _loc2_.delayInPulses = _loc5_.delayInPulses;
        }
        if (_loc1_ != null) {
            _loc1_.quantifierCode = _loc5_.quantifierCode;
        }
        if (_loc4_ != null) {
            _loc4_.isFilter = _loc5_.isFilter;
            _loc4_.isInvert = _loc5_.isInvert;
        }
        this.prepareForUpdate(this._SafeStr_2122);
        this.restorePositionAndActivate();
    }

    public hasCurrentElementInClipboard(): boolean {
        let _loc1_: string = this.resolveHolder().getKey() + "-" + this._SafeStr_2150.code;
        return this._SafeStr_5081.has(_loc1_);
    }

    public onSaveFailure(): void {
        if (this._updateMode == 1) {
            this._updateMode = 0;
        }
    }

    public onSaveSuccess(): void {
        if (this._updateMode == 0) {
            this.close();
        } else if (this._updateMode == 1) {
            this._roomEvents.notifications.addItem("${notification.wired.saved}", "wired");
        } else if (this._updateMode == 2) {
            this._roomEvents.notifications.addItem("${notification.wired.pasted_into}", "wired");
        }
        this._updateMode = 0;
    }

    public update(param1: number = 0, param2: number = -1): void {
        let _loc3_: string = this._SafeStr_2150.validate();
        if (_loc3_ != null) {
            this._roomEvents.windowManager.alert("${wiredfurni.error.title}", _loc3_, 0, null);
            return;
        }
        this._updateMode = param1;
        if (param2 == -1) {
            param2 = this._SafeStr_2122.id;
        }
        if ((this._SafeStr_2122 instanceof TriggerDefinition ? this._SafeStr_2122 : null) != null) {
            this._roomEvents.send(new UpdateTriggerMessageComposer(param2, this.resolveIntParams(), this.resolveVariableIds(), this.resolveStringParam(), this.getStuffIds(), this.getStuffIds2(), this.resolveFurniSources(), this.resolveUserSources()));
        } else if ((this._SafeStr_2122 instanceof ActionDefinition ? this._SafeStr_2122 : null) != null) {
            this._roomEvents.send(new UpdateActionMessageComposer(param2, this.resolveIntParams(), this.resolveVariableIds(), this.resolveStringParam(), this.getStuffIds(), this.getStuffIds2(), this.getActionDelay(), this.resolveFurniSources(), this.resolveUserSources()));
        } else if ((this._SafeStr_2122 instanceof ConditionDefinition ? this._SafeStr_2122 : null) != null) {
            this._roomEvents.send(new UpdateConditionMessageComposer(param2, this.resolveIntParams(), this.resolveVariableIds(), this.resolveStringParam(), this.getStuffIds(), this.getStuffIds2(), this.resolveQuantifier(), this.resolveFurniSources(), this.resolveUserSources()));
        } else if ((this._SafeStr_2122 instanceof AddonDefinition ? this._SafeStr_2122 : null) != null) {
            this._roomEvents.send(new UpdateAddonMessageComposer(param2, this.resolveIntParams(), this.resolveVariableIds(), this.resolveStringParam(), this.getStuffIds(), this.getStuffIds2(), this.resolveFurniSources(), this.resolveUserSources()));
        } else if ((this._SafeStr_2122 instanceof SelectorDefinition ? this._SafeStr_2122 : null) != null) {
            this._roomEvents.send(new UpdateSelectorMessageComposer(param2, this.resolveIntParams(), this.resolveVariableIds(), this.resolveStringParam(), this.getStuffIds(), this.getStuffIds2(), this.resolveFilterField(), this.resolveInverseField(), this.resolveFurniSources(), this.resolveUserSources()));
        } else if ((this._SafeStr_2122 instanceof VariableDefinition ? this._SafeStr_2122 : null) != null) {
            this._roomEvents.send(new UpdateVariableMessageComposer(param2, this.resolveIntParams(), this.resolveVariableIds(), this.resolveStringParam(), this.getStuffIds(), this.getStuffIds2(), this.resolveFurniSources(), this.resolveUserSources()));
        }
    }

    public getActionDelay(): number {
        if (this._delayPreset == null) {
            return 0;
        }
        return this._delayPreset.value;
    }

    public getStuffIds(): any[] {
        let _loc2_: any[] = [];
        for (const _loc1_ of this._stuffs1?.keys() ?? []) {
            _loc2_.push(_loc1_ | 0);
        }
        return _loc2_;
    }

    public getStuffIds2(): any[] {
        let _loc1_: any[] = [];
        for (const _loc2_ of this._stuffs2?.keys() ?? []) {
            _loc1_.push(_loc2_ | 0);
        }
        return _loc1_;
    }

    public resolveQuantifier(): number {
        if (this._conditionQuantifierOptions == null) {
            return 0;
        }
        return this._conditionQuantifierOptions.selected;
    }

    public resolveFilterField(): boolean {
        return this.isSelectorFilter();
    }

    public resolveInverseField(): boolean {
        return this.isSelectorInvert();
    }

    public onGuildMemberships(param1: GuildMembershipsMessageEvent): void {
        if (this._SafeStr_2150 != null) {
            this._SafeStr_2150.onGuildMemberships(param1);
        }
    }

    public updateSourceContainer(param1: number, param2: number): void {
        if (this._inputSourcePresets != null) {
            for (const _loc3_ of this._inputSourcePresets ?? []) {
                if (_loc3_.baseSourceType == param1 && _loc3_.id == param2) {
                    _loc3_.refresh(this._SafeStr_2122, this._SafeStr_2150);
                }
            }
        }
    }

    public setMergedSourceType(param1: number, param2: number): void {
        if (this._inputSourcePresets != null) {
            for (const _loc3_ of this._inputSourcePresets ?? []) {
                if (_loc3_.id == param1 && _loc3_.baseSourceType == WiredInputSourcePicker.MERGED_SOURCE) {
                    _loc3_.sourceType = param2;
                }
            }
        }
    }

    public setPreferredWiredStyleByName(param1: string): void {
        if (param1 == this._SafeStr_4331.name) {
            return;
        }
        let _loc2_: WiredStyle = this._wiredStyles[param1];
        if (_loc2_ == null) {
            return;
        }
        this.clearCache();
        this._SafeStr_4331 = _loc2_;
    }

    public clearCache(): void {
        this.close();
        for (const _loc1_ of this._configurationCache?.values() ?? []) {
            _loc1_.frame.dispose();
        }
        this._configurationCache = new Dictionary();
    }

    public hasUIOpen(): boolean {
        return this._SafeStr_2122 != null && this._SafeStr_2150 != null && this._frame != null && this._frame.window.parent != null;
    }

    private isStuffSelectionMode(): boolean {
        return !!(this._SafeStr_2122 && (this._SafeStr_2122.inputSourcesConf.allowFurniSelection() || this._SafeStr_2150.forceFurniSelection));
    }

    private resolveHolder(): ElementTypeHolder {
        return this.resolveHolderFor(this._SafeStr_2122);
    }

    private resolveHolderFor(param1: Triggerable): ElementTypeHolder {
        if ((param1 instanceof TriggerDefinition ? param1 : null) != null) {
            return this._SafeStr_6640;
        }
        if ((param1 instanceof ActionDefinition ? param1 : null) != null) {
            return this._actionTypes;
        }
        if ((param1 instanceof ConditionDefinition ? param1 : null) != null) {
            return this._conditionTypes;
        }
        if ((param1 instanceof AddonDefinition ? param1 : null) != null) {
            return this._addonTypes;
        }
        if ((param1 instanceof SelectorDefinition ? param1 : null) != null) {
            return this._selectorTypes;
        }
        if ((param1 instanceof VariableDefinition ? param1 : null) != null) {
            return this._variableTypes;
        }
        return null;
    }

    private determineActiveWiredStyle(): WiredStyle {
        let _loc1_: string = null;
        if (this._SafeStr_2122 == null || this._SafeStr_2150 == null) {
            return this._wiredStyles["volter"];
        }
        let _loc2_: IFurnitureData = this._roomEvents.sessionDataManager.getFloorItemData(this._SafeStr_2122.stuffTypeId);
        if (_loc2_ != null) {
            _loc1_ = _loc2_.className;
            if (_loc1_ == "wf_ltdproto_act_toggle_state") {
                return this._wiredStyles.getValue("volter_yellow");
            }
            if (_loc1_ == "wf_proto_trg_at_given_time") {
                return this._wiredStyles.getValue("volter_blue");
            }
            if (_loc1_ == "wf_proto_cnd_trggrer_on_frn") {
                return this._wiredStyles.getValue("volter_green");
            }
        }
        return this._SafeStr_4331;
    }

    private getCacheKey(param1: ElementTypeHolder, param2: Triggerable): string {
        return param1.getKey() + "-" + this._SafeStr_3700.name + "-" + param1.getElementByCode(param2.code).code;
    }

    private loadFromCache(param1: ElementTypeHolder, param2: Triggerable): boolean {
        let _loc3_: WiredConfigurationCache = null;
        let _loc4_: string = this.getCacheKey(param1, param2);
        if (this._configurationCache.has(_loc4_)) {
            _loc3_ = this._configurationCache.get(_loc4_);
            this._frame = _loc3_.frame;
            this._headerPreset = _loc3_.headerPreset;
            this._selectorOptionsPreset = _loc3_.selectorOptionsPreset;
            this._furniPicksSectionPreset = _loc3_.furniPicksSectionPreset;
            this._delayPreset = _loc3_.delayPreset;
            this._advancedSettingsWrapperPreset = _loc3_.advancedSettingsWrapperPreset;
            this._conditionQuantifierOptions = _loc3_.conditionQuantifierOptions;
            this._inputSourcePresets = _loc3_.inputSourcePresets;
            this._footerPreset = _loc3_.footerPreset;
            this._initialWidth = _loc3_.initialWidth;
            return true;
        }
        return false;
    }

    private storeInCache(param1: ElementTypeHolder, param2: Triggerable): void {
        let _loc4_: string = this.getCacheKey(param1, param2);
        let _loc3_: WiredConfigurationCache = new WiredConfigurationCache(this._frame, this._headerPreset, this._selectorOptionsPreset, this._furniPicksSectionPreset, this._delayPreset, this._advancedSettingsWrapperPreset, this._conditionQuantifierOptions, this._inputSourcePresets, this._footerPreset, this._initialWidth);
        this._configurationCache.set(_loc4_, _loc3_);
    }

    private createWindow(): boolean {
        if (this._frame != null) {
            return false;
        }
        let _loc2_: ElementTypeHolder = this.resolveHolder();
        if (_loc2_ == null || this._SafeStr_2122 == null || this._SafeStr_2150 == null) {
            return false;
        }
        if (this.useCache && this.loadFromCache(_loc2_, this._SafeStr_2122)) {
            this.showFrame();
            return true;
        }
        let _loc1_: WiredUIBuilder = new WiredUIBuilder(this._presetManager, this.close, _loc2_.getKey(), this._SafeStr_2150.code, this.isResizeEnabled);
        this.createHeader(this._SafeStr_2122, _loc2_, this._SafeStr_2150, _loc1_);
        this.createInputs(this._SafeStr_2122, _loc2_, this._SafeStr_2150, false, _loc1_);
        this.createSelectorOptions(this._SafeStr_2122, _loc2_, this._SafeStr_2150, _loc1_);
        this.createFurniPicks(this._SafeStr_2122, _loc2_, this._SafeStr_2150, _loc1_);
        this.createDelaySection(this._SafeStr_2122, _loc2_, this._SafeStr_2150, _loc1_);
        this.createAdvancedSections(this._SafeStr_2122, _loc2_, this._SafeStr_2150, _loc1_);
        this.createFooter(this._SafeStr_2122, _loc2_, this._SafeStr_2150, _loc1_);
        _loc1_.build(this._SafeStr_2150.widthModifier);
        this._frame = _loc1_.frame;
        this._initialWidth = _loc1_.initialWidth;
        this._SafeStr_2150.onInit(this._roomEvents);
        this.showFrame();
        if (this.useCache) {
            this.storeInCache(_loc2_, this._SafeStr_2122);
        }
        return true;
    }

    private showFrame(): void {
        let _loc1_: IDesktopWindow = this._roomEvents.windowManager.getDesktop(1);
        if (_loc1_ != null) {
            _loc1_.addChild(this._frame.window);
        }
        this._frame.window.center();
        this._frame.window.activate();
    }

    private hideFrame(): void {
        let _loc1_: IDesktopWindow = null;
        if (this._frame != null) {
            _loc1_ = this._roomEvents.windowManager.getDesktop(1);
            if (_loc1_ != null) {
                _loc1_.removeChild(this._frame.window);
            }
        }
    }

    private createHeader(param1: Triggerable, param2: ElementTypeHolder, param3: Element, param4: WiredUIBuilder): void {
        let _loc6_: number = 0;
        if (param3.hasStateSnapshot) {
            _loc6_ = 1;
        }
        let _loc5_: VariableType = isVariableType(param3) ? param3 : null;
        if (this._roomEvents.wiredMenu.isEnabled && _loc5_ != null) {
            _loc6_ = 2;
        }
        if (param3 instanceof WriteToLogs) {
            _loc6_ = 3;
        }
        this._headerPreset = this._presetManager.createHeaderPreset(this.getElementName(this._SafeStr_2122.stuffTypeId), param2, _loc6_, this.applySnapshot, this.viewVariableInMenu, this.viewLogs);
        param4.addElements(this._headerPreset);
    }

    private createInputs(param1: Triggerable, param2: ElementTypeHolder, param3: Element, param4: boolean, param5: WiredUIBuilder): void {
        let _loc6_: number = param3.inputMode;
        if (_loc6_ == DefaultElement.INPUTS_TYPE_UI_BUILDER) {
            param3.setRoomEvents(this._roomEvents);
            param3.buildInputs(this._presetManager, this._SafeStr_3700, param5);
        }
    }

    private createSelectorOptions(param1: Triggerable, param2: ElementTypeHolder, param3: Element, param4: WiredUIBuilder): void {
        let _loc6_: SelectorDefinition = param1 instanceof SelectorDefinition ? param1 : null;
        let _loc5_: any = _loc6_ != null;
        if (!_loc5_) {
            return;
        }
        this._selectorOptionsPreset = this._presetManager.createCheckboxGroup([new CheckboxOptionParam("${wiredfurni.params.selector_option.0}"), new CheckboxOptionParam("${wiredfurni.params.selector_option.1}")]);
        let _loc7_: SectionPreset = this._presetManager.createSection("${wiredfurni.params.selector_options_selector}", this._selectorOptionsPreset);
        param4.addElements(_loc7_);
    }

    private createFurniPicks(param1: Triggerable, param2: ElementTypeHolder, param3: Element, param4: WiredUIBuilder): void {
        if (!this.isStuffSelectionMode() || this.hidePickFurniInstructions) {
            return;
        }
        let _loc5_: TextParam = new TextParam(1, false);
        _loc5_.textColor = this._SafeStr_3700.softTextColor;
        this._furniPicksSectionPreset = this._presetManager.createSection("${wiredfurni.pickfurnis.caption}", this._presetManager.createText("${wiredfurni.pickfurnis.desc}", _loc5_));
        param4.addElements(this._furniPicksSectionPreset);
    }

    private createDelaySection(param1: Triggerable, param2: ElementTypeHolder, param3: Element, param4: WiredUIBuilder): void {
        let _loc6_: ActionDefinition = param1 instanceof ActionDefinition ? param1 : null;
        let _loc5_: ActionType = isActionType(param3) ? param3 : null;
        if (_loc6_ == null || _loc5_ == null || !_loc5_.allowDelaying) {
            return;
        }
        this._delayPreset = this._presetManager.createSliderSection("wiredfurni.params.delay", "seconds", SliderSection.CONVERTER_PULSES, 0, 20, 1, false);
        param4.addElements(this._delayPreset);
    }

    private getQuantifierKey(param1: ConditionDefinition): string {
        let _loc2_: number = param1.quantifierType;
        let _loc3_: string = "wiredfurni.params.quantifier.";
        let _loc4_: string = _loc2_ == QuantifierType._SafeStr_7506 ? "furni" : (_loc2_ == QuantifierType._SafeStr_7462 ? "users" : (_loc2_ == QuantifierType._SafeStr_7449 ? "variables" : ""));
        _loc4_ = _loc4_ + (param1.isInvert ? ".neg." : ".");
        return _loc3_ + _loc4_;
    }

    private createAdvancedSections(param1: Triggerable, param2: ElementTypeHolder, param3: Element, param4: WiredUIBuilder): void {
        let _loc6_: any = null;
        let _loc15_: string = null;
        let _loc11_: SectionPreset = null;
        let _loc7_: InputSourcesConf = param1.inputSourcesConf;
        let _loc5_: any = _loc7_.amountFurniSelections > 0;
        let _loc14_: any = _loc7_.amountUserSelections > 0;
        let _loc12_: ConditionDefinition = param1 instanceof ConditionDefinition ? param1 : null;
        let _loc9_: boolean = _loc12_ != null && _loc12_.quantifierType != QuantifierType._SafeStr_7375;
        let _loc13_: boolean = !!(param1.advancedMode && (_loc5_ || _loc14_ || _loc9_));
        if (!_loc13_) {
            return;
        }
        let _loc8_: any[] = [];
        if (_loc9_) {
            _loc15_ = this.getQuantifierKey(_loc12_);
            this._conditionQuantifierOptions = this._presetManager.createRadioGroup([new RadioButtonParam(0, "${" + _loc15_ + 0 + "}"), new RadioButtonParam(1, "${" + _loc15_ + 1 + "}")]);
            _loc11_ = this._presetManager.createSection("${wiredfurni.params.quantifier_selection}", this._conditionQuantifierOptions);
            _loc8_.push(_loc11_);
        }
        this.createAdvancedInputSources(param1, param2, param3);
        for (_loc6_ of this._inputSourcePresets ?? []) {
            _loc8_.push(_loc6_);
        }
        let _loc10_: boolean = param3.advancedAlwaysVisible();
        this._advancedSettingsWrapperPreset = this._presetManager.createAdvancedSettingsWrapperPreset(_loc8_, _loc10_);
        param4.addElements(this._advancedSettingsWrapperPreset);
    }

    private createAdvancedInputSources(param1: Triggerable, param2: ElementTypeHolder, param3: Element): void {
        let _loc9_: number = 0;
        let _loc10_: InputSourceSection = null;
        let _loc11_: string = null;
        let _loc5_: InputSourcesConf = param1.inputSourcesConf;
        this._inputSourcePresets = [];
        let _loc7_: any[] = param3.mergedSelections();
        let _loc4_: any[] = [];
        let _loc6_: any[] = [];
        for (const _loc8_ of _loc7_ ?? []) {
            _loc4_.push(_loc8_[0]);
            _loc6_.push(_loc8_[1]);
        }
        _loc9_ = 0;
        while (_loc9_ < _loc5_.amountFurniSelections) {
            if (_loc4_.indexOf(_loc9_) == -1) {
                _loc11_ = "${" + param3.furniSelectionTitle(_loc9_) + "}";
                _loc10_ = this._presetManager.createInputSourceSection(_loc11_, WiredInputSourcePicker._SafeStr_2178, _loc9_, null, false, param1.inputSourcesConf.isDualFurniPickingMode());
                this._inputSourcePresets.push(_loc10_);
            }
            _loc9_++;
        }
        _loc9_ = 0;
        while (_loc9_ < _loc5_.amountUserSelections) {
            if (_loc6_.indexOf(_loc9_) == -1) {
                _loc11_ = "${" + param3.userSelectionTitle(_loc9_) + "}";
                _loc10_ = this._presetManager.createInputSourceSection(_loc11_, WiredInputSourcePicker.USER_SOURCE, _loc9_);
                this._inputSourcePresets.push(_loc10_);
            }
            _loc9_++;
        }
        _loc9_ = 0;
        while (_loc9_ < _loc7_.length) {
            _loc11_ = "${" + param3.mergedSelectionTitle(_loc9_) + "}";
            _loc10_ = this._presetManager.createInputSourceSection(_loc11_, WiredInputSourcePicker.MERGED_SOURCE, _loc9_, param3.mergedSourceOptions(_loc9_), param3.hasCustomTypePicker(_loc9_), param1.inputSourcesConf.isDualFurniPickingMode());
            this._inputSourcePresets.push(_loc10_);
            _loc9_++;
        }
    }

    private createFooter(param1: Triggerable, param2: ElementTypeHolder, param3: Element, param4: WiredUIBuilder): void {
        this._footerPreset = this._presetManager.createFooterPreset(this.save, this.close);
        param4.addElements(this._footerPreset);
    }

    private fixQuantifierNames(): void {
        let _loc1_: ConditionDefinition = null;
        let _loc2_: string = null;
        if (this._conditionQuantifierOptions != null) {
            _loc1_ = this._SafeStr_2122 instanceof ConditionDefinition ? this._SafeStr_2122 : null;
            if (_loc1_ == null) {
                return;
            }
            _loc2_ = this.getQuantifierKey(_loc1_);
            this._conditionQuantifierOptions._SafeStr_2119(0).text = "${" + _loc2_ + 0 + "}";
            this._conditionQuantifierOptions._SafeStr_2119(1).text = "${" + _loc2_ + 1 + "}";
        }
    }

    private onEditStartUpdateCommonUI(): void {
        this._headerPreset.updateName(this.getElementName(this._SafeStr_2122.stuffTypeId));
        let _loc1_: SelectorDefinition = this._SafeStr_2122 instanceof SelectorDefinition ? this._SafeStr_2122 : null;
        if (this._selectorOptionsPreset != null && _loc1_ != null) {
            this._selectorOptionsPreset._SafeStr_2119(0).selected = _loc1_.isFilter;
            this._selectorOptionsPreset._SafeStr_2119(1).selected = _loc1_.isInvert;
        }
        let _loc3_: VariableType = isVariableType(this._SafeStr_2150) ? this._SafeStr_2150 : null;
        if (_loc3_ != null && this._roomEvents.wiredMenu.isEnabled) {
            this._headerPreset.buttonVisible = _loc3_.initialVariableName.length > 0;
        }
        this.onStuffsChanged();
        let _loc4_: ActionDefinition = this._SafeStr_2122 instanceof ActionDefinition ? this._SafeStr_2122 : null;
        if (this._delayPreset != null && _loc4_ != null) {
            this._delayPreset.value = _loc4_.delayInPulses;
        }
        let _loc2_: boolean = this._SafeStr_2122.advancedMode && (this.isUsingAdvancedSettings || this._SafeStr_2150.advancedAlwaysVisible());
        if (this._advancedSettingsWrapperPreset != null) {
            this._advancedSettingsWrapperPreset.expanded = _loc2_;
        }
        let _loc6_: ConditionDefinition = this._SafeStr_2122 instanceof ConditionDefinition ? this._SafeStr_2122 : null;
        if (_loc6_ != null && _loc6_.quantifierType != QuantifierType._SafeStr_7375 && this._conditionQuantifierOptions != null) {
            this._conditionQuantifierOptions.selected = _loc6_.quantifierCode;
            this.fixQuantifierNames();
        }
        if (this._inputSourcePresets != null) {
            for (const _loc5_ of this._inputSourcePresets ?? []) {
                _loc5_.refresh(this._SafeStr_2122, this._SafeStr_2150);
                if (_loc5_.baseSourceType == WiredInputSourcePicker.MERGED_SOURCE) {
                    _loc5_.sourceType = this._SafeStr_2150.getMergedType(_loc5_.id);
                }
            }
        }
        this._footerPreset.saveButtonDisabled = !this._roomEvents.wiredMenu.hasWritePermission;
        this._frame.refreshForNewTriggerable();
    }

    private hideFurniHighlights(): void {
        this._SafeStr_2855.hideAll(this._stuffs1, true, 1);
        this._SafeStr_2855.hideAll(this._stuffs2, true, 2);
    }

    private synchronizeTriggerable(param1: Triggerable): boolean {
        let synchronizer: WiredVariablesSynchronizer;
        let updated: Triggerable = param1;
        let variablesList: AllVariablesInRoom = updated.wiredContext.roomVariablesList;
        if (variablesList != null && variablesList.needsSynchronize) {
            synchronizer = this._roomEvents.variablesSynchronizer;
            if (this._variablesCallback != null) {
                synchronizer.removeListener(this._variablesCallback);
            }
            this._variablesCallback = (param1: WiredVariable[]): void => {
                    this._variablesCallback = null;
                    updated.wiredContext.roomVariablesList.synchronize(param1);
                    this.prepareForUpdate(updated);
                };
            synchronizer.getAllVariables(this._variablesCallback, true, variablesList.hash);
            return true;
        }
        return false;
    }

    private savePosition(): void {
        if (this._frame == null) {
            return;
        }
        this._SafeStr_5622 = this._frame.window.x;
        this._SafeStr_6824 = this._frame.window.y;
    }

    private restorePositionAndActivate(): void {
        if (this._frame == null) {
            return;
        }
        if (this._SafeStr_5622 == -2147483648) {
            this._frame.window.center();
        } else {
            this._frame.window.x = this._SafeStr_5622;
            this._frame.window.y = this._SafeStr_6824;
        }
        this._frame.window.activate();
    }

    private onStuffsChanged(): void {
        if (this._SafeStr_2122 == null || this._frame == null) {
            return;
        }
        let _loc3_: number = this.getStuffIds().length | 0;
        let _loc1_: number = this._SafeStr_2122.furniLimit;
        this._roomEvents.localization.registerParameter("wiredfurni.pickfurnis.caption", "count", "" + _loc3_);
        this._roomEvents.localization.registerParameter("wiredfurni.pickfurnis.caption", "limit", "" + _loc1_);
        if (this._inputSourcePresets != null) {
            for (const _loc2_ of this._inputSourcePresets ?? []) {
                _loc2_.refresh(this._SafeStr_2122, this._SafeStr_2150);
            }
        }
        this._frame.updateButtonDisabledStates();
    }

    private save = (): void => {
        let _loc1_: any = null;
        if (this._SafeStr_2122 == null || this._frame == null) {
            return;
        }
        if ((this._SafeStr_2122 instanceof SelectorDefinition ? this._SafeStr_2122 : null) != null && this.isSelectorInvert() && !this.isSelectorFilter()) {
            this._roomEvents.windowManager.confirm("${wiredfurni.danger.1.change.confirm.title}", "${wiredfurni.danger.1.change.confirm.body}", 0, this.confirmCallback);
        } else if (!this.isOwner(this._SafeStr_2122.id) && !this._SafeStr_6665) {
            this._roomEvents.windowManager.confirm("${wiredfurni.nonowner.change.confirm.title}", "${wiredfurni.nonowner.change.confirm.body}", 0, this.confirmCallback);
        } else {
            _loc1_ = this._SafeStr_2150.requireConfirmation;
            if (_loc1_ != null) {
                this._roomEvents.windowManager.confirm(stringOrNull(_loc1_.title), stringOrNull(_loc1_.body), 0, this.confirmCallback);
            } else {
                this.update();
            }
        }
    };

    private isSelectorFilter(): boolean {
        return this._selectorOptionsPreset != null && this._selectorOptionsPreset._SafeStr_2119(0).selected;
    }

    private isSelectorInvert(): boolean {
        return this._selectorOptionsPreset != null && this._selectorOptionsPreset._SafeStr_2119(1).selected;
    }

    private isEditing(): boolean {
        return this._SafeStr_2150 != null && this._SafeStr_2122 != null && this._frame != null;
    }

    private confirmCallback = (param1: IConfirmDialog, param2: WindowEvent): void => {
        param1.dispose();
        if (param2.type == "WE_OK") {
            this._SafeStr_6665 = true;
            if (this.isEditing()) {
                this.update();
            }
        }
    };

    private applySnapshot = (): void => {
        this._roomEvents.send(new ApplySnapshotMessageComposer(this._SafeStr_2122.id));
    };

    private viewVariableInMenu = (): void => {
        let _loc1_: VariableType = isVariableType(this._SafeStr_2150) ? this._SafeStr_2150 : null;
        if (_loc1_ == null || _loc1_.initialVariableName.length == 0) {
            return;
        }
        this._roomEvents.context.createLinkEvent("wiredmenu/open/variable_overview/" + _loc1_.initialVariableName);
    };

    private viewLogs = (): void => {
        this._roomEvents.context.createLinkEvent("wiredmenu/logs");
    };

    private resolveIntParams(): any[] {
        return this._SafeStr_2150.readIntParamsFromForm();
    }

    private resolveVariableIds(): any[] {
        return this._SafeStr_2150.readVariableIdsFromForm();
    }

    private resolveStringParam(): string {
        return this._SafeStr_2150.readStringParamFromForm();
    }

    private resolveFurniSources(): any[] {
        return this._SafeStr_2122.furniSourceTypes;
    }

    private resolveUserSources(): any[] {
        return this._SafeStr_2122.userSourceTypes;
    }

    private getElementName(param1: number): string {
        let _loc2_: IFurnitureData = this._roomEvents.sessionDataManager.getFloorItemData(param1);
        if (_loc2_ == null) {
            UserDefinedRoomEventsCtrl._log.warn("COULD NOT FIND FURNIDATA FOR " + param1);
            return "NAME: " + param1;
        }
        return _loc2_.localizedName;
    }

    private isOwner(param1: number): boolean {
        let _loc4_: IRoomObject = this._roomEvents.roomEngine.getRoomObject(this._roomEvents.roomId, param1, 10);
        if (_loc4_ == null) {
            return false;
        }
        let _loc3_: IRoomObjectModel = _loc4_.getModel();
        if (_loc3_ == null) {
            return false;
        }
        let _loc2_: number = _loc4_.getModel().getNumber("furniture_owner_id");
        return _loc2_ == this._roomEvents.sessionDataManager.userId;
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (UserDefinedRoomEventsCtrl.#staticsReady) return;
        UserDefinedRoomEventsCtrl.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(UserDefinedRoomEventsCtrl, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.habbo.roomevents.wired_setup.UserDefinedRoomEventsCtrl"));
    }
}
