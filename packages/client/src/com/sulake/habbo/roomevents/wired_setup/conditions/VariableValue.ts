import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { RadioGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/RadioGroupPreset';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { ValueOrVariableSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/ValueOrVariableSection';
import type { VariablePickerPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/VariablePickerPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { WiredVariable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/variables/WiredVariable';
import { Util } from '@/com/sulake/habbo/roomevents/Util';
import { VariableExtraSourceTypes } from '@/com/sulake/habbo/roomevents/wired_setup/common/VariableExtraSourceTypes';
import { ConditionCodes } from '@/com/sulake/habbo/roomevents/wired_setup/conditions/ConditionCodes';
import { DefaultConditionType } from '@/com/sulake/habbo/roomevents/wired_setup/conditions/DefaultConditionType';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { WiredInputSourcePicker } from '@/com/sulake/habbo/roomevents/wired_setup/inputsources/WiredInputSourcePicker';
import { RadioButtonParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/RadioButtonParam';
import { SectionParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/SectionParam';
import { SourceTypeSelectorParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/SourceTypeSelectorParam';

export class VariableValue extends DefaultConditionType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.conditions::VariableValue'); }

    private static variableSelectionFilter1(param1: WiredVariable): boolean {
        return param1.hasValue;
    }

    constructor() {
        super();
    }

    declare private _picker: VariablePickerPreset;

    declare private _SafeStr_4969: RadioGroupPreset;

    declare private _section1: SectionPreset;

    declare private _section2: SectionPreset;

    declare private _section3: ValueOrVariableSection;

    private _variableTarget: number = 0;

    public override get code(): number {
        return ConditionCodes.VARIABLE_VALUE;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override get forceHidePickFurniInstructions(): boolean {
        return true;
    }

    public override readIntParamsFromForm(): any[] {
        let _loc1_: any[] = [];
        _loc1_.push(this._variableTarget);
        _loc1_.push(this._SafeStr_4969.selected);
        _loc1_.push(this._section3.option);
        Util.pushIntAsLong(_loc1_, this._section3.numberValue);
        _loc1_.push(this._section3.target);
        return _loc1_;
    }

    public override readVariableIdsFromForm(): any[] {
        return [this._picker.finalizeSelection, this._section3.finalizeSelection];
    }

    public override onEditStart(param1: Triggerable): void {
        let _loc4_: any[] = param1.intParams;
        let _loc6_: string = stringOrNull(param1.variableIds[0]);
        let _loc2_: string = stringOrNull(param1.variableIds[1]);
        this._variableTarget = _loc4_[0] | 0;
        let _loc3_: number = _loc4_[1] | 0;
        let _loc5_: number = _loc4_[2] | 0;
        let _loc7_: number = _loc4_[4] | 0;
        let _loc8_: number = _loc4_[5] | 0;
        this._picker.init(param1.wiredContext.roomVariablesList, _loc6_, this._variableTarget);
        this._SafeStr_4969.selected = _loc3_;
        if (_loc5_ == 0) {
            _loc2_ = WiredVariable._SafeStr_2375;
        } else {
            _loc7_ = 0;
        }
        this._section3.init(param1.wiredContext.roomVariablesList, _loc2_, _loc8_, _loc5_, _loc7_);
    }

    public override onEditInitialized(): void {
        this._section1.getSourceTypeSelector().select(this._variableTarget);
        this._section3.onEditInitialized();
    }

    public override isInputSourceDisabled(param1: number, param2: number): boolean {
        if (param2 == WiredInputSourcePicker.MERGED_SOURCE && param1 == 1) {
            return this._section3.isSourcePickingDisabled();
        }
        return false;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        let _loc4_: SourceTypeSelectorParam = new SourceTypeSelectorParam(this.mergedSourceOptions(0), this.createSourceTypeListener(0));
        this._picker = param1.createVariablePicker(VariableValue.variableSelectionFilter1);
        this._section1 = param1.createSection(this.l("variables.variable_selection"), this._picker, new SectionParam(_loc4_));
        this._SafeStr_4969 = param1.createRadioGroup([new RadioButtonParam(2, ">"), new RadioButtonParam(5, "≥"), new RadioButtonParam(1, "="), new RadioButtonParam(3, "≤"), new RadioButtonParam(0, "<"), new RadioButtonParam(4, "≠")], null, 6);
        this._section2 = param1.createSection(this.l("comparison_selection"), this._SafeStr_4969);
        this._section3 = param1.createValueOrVariableSection(1, this.mergedSourceOptions(1), this.l("variables.reference_value"), -2147483648, 2147483647);
        param3.addElements(this._section1, this._section2, this._section3);
    }

    public override mergedSelectionTitle(param1: number): string {
        if (param1 == 0) {
            return "wiredfurni.params.sources.merged.title.variables";
        }
        return "wiredfurni.params.sources.merged.title.variables_reference";
    }

    public override mergedSelections(): any[] {
        return [[0, 0], [1, 1]];
    }

    public override setMergedType(param1: number, param2: number): void {
        if (param1 == 0) {
            this._variableTarget = param2;
            this._picker.variableTarget = this._variableTarget;
        } else {
            this._section3.target = param2;
        }
    }

    public override getMergedType(param1: number): number {
        if (param1 == 0) {
            return this._variableTarget;
        }
        return this._section3.target;
    }

    public override getCustomSourcesForMergedType(param1: number): any[] {
        return [VariableExtraSourceTypes.GLOBAL_SOURCE, VariableExtraSourceTypes.CONTEXT_SOURCE];
    }

    public override hasCustomTypePicker(param1: number): boolean {
        return true;
    }

    public override advancedAlwaysVisible(): boolean {
        return true;
    }
}
