import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { RadioGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/RadioGroupPreset';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { ValueOrVariableSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/ValueOrVariableSection';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { WiredVariable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/variables/WiredVariable';
import { VariableExtraSourceTypes } from '@/com/sulake/habbo/roomevents/wired_setup/common/VariableExtraSourceTypes';
import { ConditionCodes } from '@/com/sulake/habbo/roomevents/wired_setup/conditions/ConditionCodes';
import { DefaultConditionType } from '@/com/sulake/habbo/roomevents/wired_setup/conditions/DefaultConditionType';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { WiredInputSourcePicker } from '@/com/sulake/habbo/roomevents/wired_setup/inputsources/WiredInputSourcePicker';
import { RadioButtonParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/RadioButtonParam';

export class ChestHasAmount extends DefaultConditionType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.conditions.chests::ChestHasAmount'); }

    constructor() {
        super();
    }

    declare protected _SafeStr_6018: SectionPreset;

    declare protected _SafeStr_2580: ValueOrVariableSection;

    declare private _compareRadioGroup: RadioGroupPreset;

    public override get code(): number {
        return ConditionCodes.CHEST_HAS_ITEMS;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override get forceHidePickFurniInstructions(): boolean {
        return true;
    }

    public override readIntParamsFromForm(): any[] {
        let _loc1_: any[] = [];
        _loc1_.push(this._SafeStr_2580.numberValue);
        _loc1_.push(this._SafeStr_2580.option);
        _loc1_.push(this._SafeStr_2580.target);
        _loc1_.push(this._compareRadioGroup.selected);
        return _loc1_;
    }

    public override readVariableIdsFromForm(): any[] {
        return [this._SafeStr_2580.finalizeSelection];
    }

    public override onEditStart(param1: Triggerable): void {
        let _loc5_: any[] = param1.intParams;
        let _loc7_: string = stringOrNull(param1.variableIds[0]);
        let _loc3_: number = _loc5_[0] | 0;
        let _loc2_: number = _loc5_[1] | 0;
        let _loc6_: number = _loc5_[2] | 0;
        if (_loc2_ == 0) {
            _loc7_ = WiredVariable._SafeStr_2375;
        } else {
            _loc3_ = 1;
        }
        this._SafeStr_2580.init(param1.wiredContext.roomVariablesList, _loc7_, _loc6_, _loc2_, _loc3_);
        let _loc4_: number = _loc5_[3] | 0;
        this._compareRadioGroup.selected = _loc4_;
    }

    public override onEditInitialized(): void {
        this._SafeStr_2580.onEditInitialized();
    }

    public override isInputSourceDisabled(param1: number, param2: number): boolean {
        if (param2 == WiredInputSourcePicker.MERGED_SOURCE && param1 == 0) {
            return this._SafeStr_2580.isSourcePickingDisabled();
        }
        return false;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        this._compareRadioGroup = param1.createRadioGroup([new RadioButtonParam(2, ">"), new RadioButtonParam(5, "≥"), new RadioButtonParam(1, "="), new RadioButtonParam(3, "≤"), new RadioButtonParam(0, "<"), new RadioButtonParam(4, "≠")], null, 6);
        this._SafeStr_6018 = param1.createSection(this.l("comparison_selection"), this._compareRadioGroup);
        this._SafeStr_2580 = param1.createValueOrVariableSection(0, this.mergedSourceOptions(0), this.l("chest_compare_amount"), 0, 1000000);
        param3.addElements(this._SafeStr_6018, this._SafeStr_2580);
    }

    public override mergedSelectionTitle(param1: number): string {
        return "wiredfurni.params.sources.merged.title.variables_reference";
    }

    public override furniSelectionTitle(param1: number): string {
        return "wiredfurni.params.sources.furni.title.chests";
    }

    public override mergedSelections(): any[] {
        return [[1, 0]];
    }

    public override setMergedType(param1: number, param2: number): void {
        this._SafeStr_2580.target = param2;
    }

    public override getMergedType(param1: number): number {
        return this._SafeStr_2580.target;
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
