import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { CheckboxGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/CheckboxGroupPreset';
import type { CheckboxOptionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/CheckboxOptionPreset';
import type { RadioGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/RadioGroupPreset';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { ValueOrVariableSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/ValueOrVariableSection';
import type { VariablePickerPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/VariablePickerPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { WiredVariable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/variables/WiredVariable';
import { Util } from '@/com/sulake/habbo/roomevents/Util';
import { VariableExtraSourceTypes } from '@/com/sulake/habbo/roomevents/wired_setup/common/VariableExtraSourceTypes';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { WiredInputSourcePicker } from '@/com/sulake/habbo/roomevents/wired_setup/inputsources/WiredInputSourcePicker';
import { DefaultSelectorType } from '@/com/sulake/habbo/roomevents/wired_setup/selectors/DefaultSelectorType';
import { CheckboxOptionParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/CheckboxOptionParam';
import { RadioButtonParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/RadioButtonParam';

export class WithVariable extends DefaultSelectorType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.selectors::WithVariable'); }

    private static variableSelectionFilter1(param1: WiredVariable): boolean {
        return true;
    }

    constructor() {
        super();
    }

    declare private _section1: SectionPreset;

    declare private _picker: VariablePickerPreset;

    declare private _section2: SectionPreset;

    declare private _SafeStr_3335: CheckboxOptionPreset;

    declare private _section3: SectionPreset;

    declare private _SafeStr_4969: RadioGroupPreset;

    declare private _section4: ValueOrVariableSection;

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override get forceHidePickFurniInstructions(): boolean {
        return true;
    }

    protected get variableSource(): number {
        return -1;
    }

    public override readIntParamsFromForm(): any[] {
        let _loc1_: any[] = [];
        _loc1_.push(this._SafeStr_4969.selected);
        _loc1_.push(this._SafeStr_3335.selected ? this._section4.option + 1 : 0);
        Util.pushIntAsLong(_loc1_, this._section4.numberValue);
        _loc1_.push(this._section4.target);
        return _loc1_;
    }

    public override readVariableIdsFromForm(): any[] {
        return [this._picker.finalizeSelection, this._section4.finalizeSelection];
    }

    public override onEditStart(param1: Triggerable): void {
        let _loc4_: any[] = param1.intParams;
        let _loc6_: string = stringOrNull(param1.variableIds[0]);
        let _loc2_: string = stringOrNull(param1.variableIds[1]);
        let _loc3_: number = _loc4_[0] | 0;
        let _loc5_: number = _loc4_[1] | 0;
        let _loc7_: number = _loc4_[3] | 0;
        let _loc8_: number = _loc4_[4] | 0;
        this._picker.init(param1.wiredContext.roomVariablesList, _loc6_, this.variableSource);
        this._SafeStr_4969.selected = _loc3_;
        if (_loc5_ == 0 || this._picker.selected == null || !this._picker.selected.hasValue) {
            _loc2_ = WiredVariable._SafeStr_2375;
            _loc7_ = 0;
            _loc5_ = 0;
            this._SafeStr_3335.selected = false;
        } else if (_loc5_ == 1) {
            _loc2_ = WiredVariable._SafeStr_2375;
            this._SafeStr_3335.selected = true;
        } else {
            _loc7_ = 0;
            this._SafeStr_3335.selected = true;
        }
        this._section4.init(param1.wiredContext.roomVariablesList, _loc2_, _loc8_, _loc5_ - 1, _loc7_);
        this.setValueSelectionVisibility(this._picker.selected != null && this._picker.selected.hasValue && _loc5_ > 0);
        this.onVariableSelected(this._picker.selected);
    }

    public override onEditInitialized(): void {
        this._section4.onEditInitialized();
    }

    public override isInputSourceDisabled(param1: number, param2: number): boolean {
        if (param2 == WiredInputSourcePicker.MERGED_SOURCE && param1 == 0) {
            return this._section2.disabled || !this._SafeStr_3335.selected || this._section4.isSourcePickingDisabled();
        }
        return false;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        this._picker = param1.createVariablePicker(WithVariable.variableSelectionFilter1, this.onVariableSelected);
        this._section1 = param1.createSection(this.l("variables.variable_selection"), this._picker);
        let _loc4_: CheckboxGroupPreset = param1.createCheckboxGroup([new CheckboxOptionParam(this.l("variables.value_settings.select_by_value"))], this.onSelectByValueChange);
        this._SafeStr_3335 = _loc4_._SafeStr_2119(0);
        this._section2 = param1.createSection(this.l("choose_type"), this._SafeStr_3335);
        this._SafeStr_4969 = param1.createRadioGroup([new RadioButtonParam(2, ">"), new RadioButtonParam(5, "≥"), new RadioButtonParam(1, "="), new RadioButtonParam(3, "≤"), new RadioButtonParam(0, "<"), new RadioButtonParam(4, "≠")], null, 6);
        this._section3 = param1.createSection(this.l("comparison_selection"), this._SafeStr_4969);
        this._section4 = param1.createValueOrVariableSection(0, this.mergedSourceOptions(0), this.l("variables.reference_value"), -2147483648, 2147483647);
        param3.addElements(this._section1, this._section2, this._section3, this._section4);
    }

    public override mergedSelectionTitle(param1: number): string {
        return "wiredfurni.params.sources.merged.title.variables_reference";
    }

    public override mergedSelections(): any[] {
        return [[0, 0]];
    }

    public override setMergedType(param1: number, param2: number): void {
        this._section4.target = param2;
    }

    public override getMergedType(param1: number): number {
        return this._section4.target;
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

    private onVariableSelected = (param1: WiredVariable): void => {
        let _loc2_: boolean = param1 != null && param1.hasValue;
        this._section2.disabled = !_loc2_;
        this.setValueSelectionVisibility(_loc2_ && this._SafeStr_3335.selected);
    };

    private setValueSelectionVisibility(param1: boolean): void {
        this._section3.disabled = !param1;
        this._section4.disabled = !param1;
        this.roomEvents.wiredCtrl.updateSourceContainer(WiredInputSourcePicker.MERGED_SOURCE, 0);
    }

    private onSelectByValueChange = (param1: number, param2: boolean): void => {
        this.setValueSelectionVisibility(param2);
    };
}
