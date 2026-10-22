import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { WiredVariable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/variables/WiredVariable';
import type { SourceTypePickedListener } from '@/com/sulake/habbo/roomevents/wired_setup/inputsources/SourceTypePickedListener';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { CheckboxGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/CheckboxGroupPreset';
import type { RadioGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/RadioGroupPreset';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { VariablePickerPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/VariablePickerPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { VariableAvailabilityType } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/variables/VariableAvailabilityType';
import { VariableTarget } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/variables/VariableTarget';
import { WiredVariableAvailabilityType } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/variables/WiredVariableAvailabilityType';
import { WiredVariableType } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/variables/WiredVariableType';
import { Util } from '@/com/sulake/habbo/roomevents/Util';
import { VariableExtraSourceTypes } from '@/com/sulake/habbo/roomevents/wired_setup/common/VariableExtraSourceTypes';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { WiredInputSourcePicker } from '@/com/sulake/habbo/roomevents/wired_setup/inputsources/WiredInputSourcePicker';
import { DefaultTriggerConf } from '@/com/sulake/habbo/roomevents/wired_setup/triggerconfs/DefaultTriggerConf';
import { TriggerConfCodes } from '@/com/sulake/habbo/roomevents/wired_setup/triggerconfs/TriggerConfCodes';
import { CheckboxOptionParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/CheckboxOptionParam';
import { RadioButtonParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/RadioButtonParam';
import { SectionParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/SectionParam';
import { SourceTypeSelectorParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/SourceTypeSelectorParam';
import { TextParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextParam';

export class VariableUpdate extends DefaultTriggerConf implements SourceTypePickedListener {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.triggerconfs::VariableUpdate'); }

    private static readonly CREATED_INDEX: number = 0;
    private static readonly _SafeStr_5930: number = 1;
    private static readonly DELETED_INDEX: number = 2;
    private static readonly _SafeStr_14445: number = 3;
    private static readonly _SafeStr_14446: number = 4;
    private static readonly _SafeStr_14447: number = 5;
    private static readonly SINGLE_VARIABLE_MODE: number = 0;
    private static readonly PICKED_VARIABLE_BOXES_MODE: number = 1;
    private static readonly _SafeStr_14448: number = 0;
    private static readonly _SafeStr_14449: number = 1;
    private static readonly _SafeStr_14450: number = 2;
    private static readonly _SafeStr_14451: number = 3;
    private static readonly CHANGE_ORIGIN_OPTIONS: number = 4;
    private static readonly CHANGE_ORIGIN_INFO_INDEXES: any[] = [2, 3];

    declare private _section1: SectionPreset;

    declare private _picker: VariablePickerPreset;

    declare private _optionGroup: CheckboxGroupPreset;

    declare private _subOptionGroup: CheckboxGroupPreset;

    declare private _changeOriginGroup: CheckboxGroupPreset;

    declare private _variableSelectionMode: RadioGroupPreset;

    constructor() {
        super();
    }

    private static variableSelectionFilter(param1: WiredVariable): boolean {
        return param1.canInterceptChanges && !param1.requiresExecutionContext;
    }

    public override get code(): number {
        return TriggerConfCodes.VARIABLE_UPDATE;
    }

    public override onEditStart(param1: Triggerable): void {
        let _loc3_: string = stringOrNull(param1.variableIds[0]);
        let _loc4_: number = WiredInputSourcePicker.USER_SOURCE;
        let _loc2_: WiredVariable = Util.findVariableById(param1.wiredContext.roomVariablesList.variables, _loc3_);
        if (_loc2_ != null) {
            _loc4_ = _loc2_.variableTarget;
        }
        this._section1.getSourceTypeSelector().select(_loc4_);
        this._picker.init(param1.wiredContext.roomVariablesList, _loc3_, _loc4_);
        this.onChangeVariable(this._picker.selected);
        this._optionGroup._SafeStr_2119(0).selected = param1.getBoolean(0);
        this._optionGroup._SafeStr_2119(1).selected = param1.getBoolean(1);
        this._optionGroup._SafeStr_2119(2).selected = param1.getBoolean(2);
        this._subOptionGroup.mask = param1.getInt(3);
        this._changeOriginGroup.mask = param1.intParams.length > 4 ? param1.getInt(4) : -1;
        this._variableSelectionMode.selected = param1.intParams.length > 5 && param1.getInt(5) != 0 ? 1 : 0;
        this.onVariableSelectionModeChange(this._variableSelectionMode.selected);
    }

    private onChangeVariable = (param1: WiredVariable): void => {
        let _loc2_: boolean = param1 == null || param1.canCreateAndDelete;
        let _loc3_: boolean = param1 != null && (param1.variableType == WiredVariableType._SafeStr_7425 || param1.availabilityType == VariableAvailabilityType._SafeStr_7389);
        let _loc7_: boolean = param1 != null && (param1.variableType == WiredVariableType._SafeStr_7415 || param1.variableType == WiredVariableType.INTERNAL);
        let _loc4_: boolean = param1 == null || param1.hasValue;
        this._optionGroup._SafeStr_2119(0).disabled = !_loc2_ && !_loc3_ && !_loc7_;
        this._optionGroup._SafeStr_2119(1).disabled = !_loc4_ && !_loc7_;
        this._optionGroup._SafeStr_2119(2).disabled = !_loc2_ && !_loc3_ && !_loc7_;
        let _loc6_: boolean = param1 != null && param1.variableTarget == VariableTarget._SafeStr_7451;
        let _loc5_: boolean = _loc6_ && (param1.availabilityType == WiredVariableAvailabilityType._SafeStr_6650 || param1.availabilityType == WiredVariableAvailabilityType._SafeStr_7335);
        this._changeOriginGroup._SafeStr_2119(1).disabled = !_loc5_;
        this._changeOriginGroup._SafeStr_2119(3).disabled = param1 == null || !param1.isPersisted;
    };

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        let _loc9_: number = 0;
        let _loc6_: CheckboxOptionParam = null;
        let _loc10_: TextParam = null;
        this._variableSelectionMode = param1.createRadioGroup([new RadioButtonParam(0, this.l("variables.trigger_mode.0")), new RadioButtonParam(1, this.l("variables.trigger_mode.1"))], this.onVariableSelectionModeChange);
        let _loc4_: SectionPreset = param1.createSection(this.l("variables.trigger_mode"), this._variableSelectionMode);
        let _loc7_: SourceTypeSelectorParam = new SourceTypeSelectorParam([WiredInputSourcePicker._SafeStr_2178, WiredInputSourcePicker.USER_SOURCE, VariableExtraSourceTypes.GLOBAL_SOURCE], this);
        this._picker = param1.createVariablePicker(VariableUpdate.variableSelectionFilter, this.onChangeVariable);
        let _loc5_: SectionParam = new SectionParam(_loc7_);
        this._section1 = param1.createSection(this.loc("wiredfurni.params.variables.variable_selection"), this._picker, _loc5_);
        let _loc8_: any[] = [new CheckboxOptionParam(this.l("variables.trigger_options.0"), 0), new CheckboxOptionParam(this.l("variables.trigger_options.1"), 1), new CheckboxOptionParam(this.l("variables.trigger_options.2"), 2)];
        this._subOptionGroup = param1.createCheckboxGroup([new CheckboxOptionParam(this.l("variables.trigger_options.1.0"), 0), new CheckboxOptionParam(this.l("variables.trigger_options.1.1"), 1), new CheckboxOptionParam(this.l("variables.trigger_options.1.2"), 2)]);
        _loc8_[1].extra2 = this._subOptionGroup;
        this._optionGroup = param1.createCheckboxGroup(_loc8_);
        let _loc11_: SectionPreset = param1.createSection(this.l("variables.trigger_options"), this._optionGroup, SectionParam.COLLAPSED);
        _loc8_ = [];
        _loc9_ = 0;
        while (_loc9_ < 4) {
            _loc6_ = new CheckboxOptionParam("${wiredfurni.params.variables.trigger_origin." + _loc9_ + "}");
            if (VariableUpdate.CHANGE_ORIGIN_INFO_INDEXES.indexOf(_loc9_) != -1) {
                _loc10_ = new TextParam(1);
                _loc10_.textColor = param2.softTextColor;
                _loc6_.extra2 = param1.createText("${wiredfurni.params.variables.trigger_origin." + _loc9_ + ".info}", _loc10_);
            }
            _loc8_.push(_loc6_);
            _loc9_ += 1;
        }
        this._changeOriginGroup = param1.createCheckboxGroup(_loc8_);
        let _loc12_: SectionPreset = param1.createSection("${wiredfurni.params.variables.trigger_origin}", this._changeOriginGroup, SectionParam.COLLAPSED);
        param3.addElements(_loc4_, this._section1, _loc11_, _loc12_);
    }

    public override get forceFurniSelection(): boolean {
        return true;
    }

    public override readVariableIdsFromForm(): any[] {
        return [this._picker.finalizeSelection];
    }

    public override readIntParamsFromForm(): any[] {
        let _loc1_: number = this._changeOriginGroup.isAllSelected ? -1 : this._changeOriginGroup.mask;
        return [this._optionGroup._SafeStr_2119(0).selected ? 1 : 0, this._optionGroup._SafeStr_2119(1).selected ? 1 : 0, this._optionGroup._SafeStr_2119(2).selected ? 1 : 0, this._subOptionGroup.mask, _loc1_, this._variableSelectionMode.selected == 1 ? 1 : 0];
    }

    private onVariableSelectionModeChange = (param1: number): void => {
        this._section1.disabled = param1 == 1;
    };

    public set sourceType(param1: number) {
        this._picker.variableTarget = param1;
    }
}
