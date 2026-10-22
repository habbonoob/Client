import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { WiredVariable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/variables/WiredVariable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { NamedNumberInputPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/combinations/NamedNumberInputPreset';
import type { DropdownPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/DropdownPreset';
import type { RadioGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/RadioGroupPreset';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { SimpleListViewPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SimpleListViewPreset';
import type { SpacingPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SpacingPreset';
import type { VariablePickerPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/VariablePickerPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { Util } from '@/com/sulake/habbo/roomevents/Util';
import { ExpandableDropdownOption } from '@/com/sulake/habbo/roomevents/wired_setup/common/advanced_dropdown/ExpandableDropdownOption';
import { VariableExtraSourceTypes } from '@/com/sulake/habbo/roomevents/wired_setup/common/VariableExtraSourceTypes';
import { ConditionCodes } from '@/com/sulake/habbo/roomevents/wired_setup/conditions/ConditionCodes';
import { DefaultConditionType } from '@/com/sulake/habbo/roomevents/wired_setup/conditions/DefaultConditionType';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { DropdownParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/DropdownParam';
import { NumberInputParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/NumberInputParam';
import { RadioButtonParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/RadioButtonParam';
import { SectionParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/SectionParam';
import { SourceTypeSelectorParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/SourceTypeSelectorParam';

export class VariableAge extends DefaultConditionType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.conditions::VariableAge'); }

    private static variableSelectionFilter(param1: WiredVariable): boolean {
        return param1.canReadCreationTime || param1.canReadLastUpdateTime;
    }

    constructor() {
        super();
    }

    declare private _section1: SectionPreset;

    declare private _picker: VariablePickerPreset;

    declare private _SafeStr_5199: RadioGroupPreset;

    declare private _SafeStr_3020: RadioGroupPreset;

    declare private _SafeStr_5469: NamedNumberInputPreset;

    declare private _timeUnit: DropdownPreset;

    private _variableTarget: number = 0;

    public override get code(): number {
        return ConditionCodes.VARIABLE_AGE;
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
        _loc1_.push(this._SafeStr_5199.selected);
        _loc1_.push(this._SafeStr_3020.selected);
        Util.pushIntAsLong(_loc1_, this._SafeStr_5469.value);
        _loc1_.push(this._timeUnit.selectedId);
        return _loc1_;
    }

    public override readVariableIdsFromForm(): any[] {
        return [this._picker.finalizeSelection];
    }

    public override onEditStart(param1: Triggerable): void {
        let _loc3_: any[] = param1.intParams;
        let _loc5_: string = stringOrNull(param1.variableIds[0]);
        this._variableTarget = _loc3_[0] | 0;
        this._picker.init(param1.wiredContext.roomVariablesList, _loc5_, this._variableTarget);
        let _loc2_: number = _loc3_[1] | 0;
        let _loc6_: number = _loc3_[2] | 0;
        let _loc7_: number = _loc3_[4] | 0;
        let _loc4_: number = _loc3_[5] | 0;
        this._SafeStr_5199.selected = _loc2_;
        this._SafeStr_3020.selected = _loc6_;
        this._SafeStr_5469.value = _loc7_;
        this._timeUnit.selectedId = _loc4_;
        this.updateAgeOptions(this._picker.selected);
    }

    public override onEditInitialized(): void {
        this._section1.getSourceTypeSelector().select(this._variableTarget);
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        let _loc6_: SourceTypeSelectorParam = new SourceTypeSelectorParam(this.mergedSourceOptions(0), this.createSourceTypeListener(0));
        this._picker = param1.createVariablePicker(VariableAge.variableSelectionFilter, this.updateAgeOptions);
        let _loc4_: SectionParam = new SectionParam(_loc6_);
        this._section1 = param1.createSection(this.l("variables.variable_selection"), this._picker, _loc4_);
        this._SafeStr_3020 = param1.createRadioGroup([new RadioButtonParam(0, this.l("variables.compare_value.0")), new RadioButtonParam(1, this.l("variables.compare_value.1"))]);
        let _loc8_: SectionPreset = param1.createSection(this.l("variables.compare_value"), this._SafeStr_3020);
        this._SafeStr_5199 = param1.createRadioGroup([new RadioButtonParam(0, this.l("comparison.0")), new RadioButtonParam(2, this.l("comparison.2"))]);
        let _loc9_: SectionPreset = param1.createSection(this.l("comparison_selection"), this._SafeStr_5199);
        this._SafeStr_5469 = param1.createNamedNumberInput(new NumberInputParam(0, -2147483648, 2147483647), this.l("variables.duration"));
        this._timeUnit = param1.createDropdown(new DropdownParam("", Array.from([new ExpandableDropdownOption(0, this.l("variables.duration.0")), new ExpandableDropdownOption(1, this.l("variables.duration.1")), new ExpandableDropdownOption(2, this.l("variables.duration.2")), new ExpandableDropdownOption(3, this.l("variables.duration.3")), new ExpandableDropdownOption(4, this.l("variables.duration.4")), new ExpandableDropdownOption(5, this.l("variables.duration.5")), new ExpandableDropdownOption(6, this.l("variables.duration.6")), new ExpandableDropdownOption(7, this.l("variables.duration.7"))])));
        let _loc5_: SpacingPreset = param1.createSpacing(false, 5);
        let _loc7_: SimpleListViewPreset = param1.createSimpleListView(false, [this._SafeStr_5469, _loc5_, this._timeUnit], true);
        let _loc10_: SectionPreset = param1.createSection(this.l("variables.time_selection"), _loc7_);
        param3.addElements(this._section1, _loc8_, _loc9_, _loc10_);
    }

    public override hasCustomTypePicker(param1: number): boolean {
        return true;
    }

    public override mergedSelectionTitle(param1: number): string {
        return "wiredfurni.params.sources.merged.title.variables";
    }

    public override mergedSelections(): any[] {
        return [[0, 0]];
    }

    public override setMergedType(param1: number, param2: number): void {
        this._variableTarget = param2;
        this._picker.variableTarget = this._variableTarget;
    }

    public override getMergedType(param1: number): number {
        return this._variableTarget;
    }

    public override getCustomSourcesForMergedType(param1: number): any[] {
        return [VariableExtraSourceTypes.GLOBAL_SOURCE, VariableExtraSourceTypes.CONTEXT_SOURCE];
    }

    public override advancedAlwaysVisible(): boolean {
        return true;
    }

    private updateAgeOptions = (param1: WiredVariable): void => {
        this._SafeStr_3020.setOptionDisabled(0, false);
        this._SafeStr_3020.setOptionDisabled(1, false);
        if (param1 == null) {
            return;
        }
        if (!param1.canReadCreationTime) {
            this._SafeStr_3020.setOptionDisabled(0, true);
            this._SafeStr_3020.selected = 1;
        } else if (!param1.canReadLastUpdateTime) {
            this._SafeStr_3020.setOptionDisabled(1, true);
            this._SafeStr_3020.selected = 0;
        }
    };
}
