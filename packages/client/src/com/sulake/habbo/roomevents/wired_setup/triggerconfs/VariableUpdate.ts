import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { WiredVariable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/variables/WiredVariable';
import type { SourceTypePickedListener } from '@/com/sulake/habbo/roomevents/wired_setup/inputsources/SourceTypePickedListener';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { CheckboxGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/CheckboxGroupPreset';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { VariablePickerPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/VariablePickerPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { VariableAvailabilityType } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/variables/VariableAvailabilityType';
import { WiredVariableType } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/variables/WiredVariableType';
import { Util } from '@/com/sulake/habbo/roomevents/Util';
import { VariableExtraSourceTypes } from '@/com/sulake/habbo/roomevents/wired_setup/common/VariableExtraSourceTypes';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { WiredInputSourcePicker } from '@/com/sulake/habbo/roomevents/wired_setup/inputsources/WiredInputSourcePicker';
import { DefaultTriggerConf } from '@/com/sulake/habbo/roomevents/wired_setup/triggerconfs/DefaultTriggerConf';
import { TriggerConfCodes } from '@/com/sulake/habbo/roomevents/wired_setup/triggerconfs/TriggerConfCodes';
import { CheckboxOptionParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/CheckboxOptionParam';
import { SectionParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/SectionParam';
import { SourceTypeSelectorParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/SourceTypeSelectorParam';

export class VariableUpdate extends DefaultTriggerConf implements SourceTypePickedListener {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.triggerconfs::VariableUpdate'); }

    private static CREATED_INDEX: number = 0;
    private static _SafeStr_5930: number = 1;
    private static DELETED_INDEX: number = 2;

    private static variableSelectionFilter(param1: WiredVariable): boolean {
        return param1.canInterceptChanges;
    }

    constructor() {
        super();
    }

    declare private _section1: SectionPreset;

    declare private _picker: VariablePickerPreset;

    declare private _optionGroup: CheckboxGroupPreset;

    declare private _subOptionGroup: CheckboxGroupPreset;

    public override get code(): number {
        return TriggerConfCodes.VARIABLE_UPDATE;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public set sourceType(param1: number) {
        this._picker.variableTarget = param1;
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
        this._optionGroup._SafeStr_2119(VariableUpdate.CREATED_INDEX).selected = param1.getBoolean(0);
        this._optionGroup._SafeStr_2119(VariableUpdate._SafeStr_5930).selected = param1.getBoolean(1);
        this._optionGroup._SafeStr_2119(VariableUpdate.DELETED_INDEX).selected = param1.getBoolean(2);
        this._subOptionGroup.mask = param1.getInt(3);
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        let _loc5_: SourceTypeSelectorParam = new SourceTypeSelectorParam([WiredInputSourcePicker._SafeStr_2178, WiredInputSourcePicker.USER_SOURCE, VariableExtraSourceTypes.GLOBAL_SOURCE], this);
        this._picker = param1.createVariablePicker(VariableUpdate.variableSelectionFilter, this.onChangeVariable);
        let _loc4_: SectionParam = new SectionParam(_loc5_);
        this._section1 = param1.createSection(this.loc("wiredfurni.params.variables.variable_selection"), this._picker, _loc4_);
        let _loc6_: any[] = [new CheckboxOptionParam(this.l("variables.trigger_options.0"), VariableUpdate.CREATED_INDEX), new CheckboxOptionParam(this.l("variables.trigger_options.1"), VariableUpdate._SafeStr_5930), new CheckboxOptionParam(this.l("variables.trigger_options.2"), VariableUpdate.DELETED_INDEX)];
        this._subOptionGroup = param1.createCheckboxGroup([new CheckboxOptionParam(this.l("variables.trigger_options.1.0"), 0), new CheckboxOptionParam(this.l("variables.trigger_options.1.1"), 1), new CheckboxOptionParam(this.l("variables.trigger_options.1.2"), 2)]);
        _loc6_[1].extra2 = this._subOptionGroup;
        this._optionGroup = param1.createCheckboxGroup(_loc6_);
        let _loc7_: SectionPreset = param1.createSection(this.l("variables.trigger_options"), this._optionGroup);
        param3.addElements(this._section1, _loc7_);
    }

    public override readVariableIdsFromForm(): any[] {
        return [this._picker.finalizeSelection];
    }

    public override readIntParamsFromForm(): any[] {
        let _loc1_: any[] = [];
        _loc1_.push(this._optionGroup._SafeStr_2119(VariableUpdate.CREATED_INDEX).selected ? 1 : 0);
        _loc1_.push(this._optionGroup._SafeStr_2119(VariableUpdate._SafeStr_5930).selected ? 1 : 0);
        _loc1_.push(this._optionGroup._SafeStr_2119(VariableUpdate.DELETED_INDEX).selected ? 1 : 0);
        _loc1_.push(this._subOptionGroup.mask);
        return _loc1_;
    }

    private onChangeVariable = (param1: WiredVariable): void => {
        let _loc2_: boolean = param1 == null || param1.canCreateAndDelete;
        let _loc3_: boolean = param1 != null && (param1.variableType == WiredVariableType._SafeStr_7425 || param1.availabilityType == VariableAvailabilityType._SafeStr_7389);
        let _loc4_: boolean = param1 == null || param1.hasValue;
        this._optionGroup._SafeStr_2119(VariableUpdate.CREATED_INDEX).disabled = !_loc2_ && !_loc3_;
        this._optionGroup._SafeStr_2119(VariableUpdate._SafeStr_5930).disabled = !_loc4_;
        this._optionGroup._SafeStr_2119(VariableUpdate.DELETED_INDEX).disabled = !_loc2_ && !_loc3_;
    };
}
