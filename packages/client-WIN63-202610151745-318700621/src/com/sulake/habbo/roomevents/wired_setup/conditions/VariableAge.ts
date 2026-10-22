import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { DropdownPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/DropdownPreset';
import type { RadioGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/RadioGroupPreset';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { ValueOrVariableSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/ValueOrVariableSection';
import type { SimpleListViewPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SimpleListViewPreset';
import type { VariablePickerPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/VariablePickerPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { WiredVariable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/variables/WiredVariable';
import { Util } from '@/com/sulake/habbo/roomevents/Util';
import { ExpandableDropdownOption } from '@/com/sulake/habbo/roomevents/wired_setup/common/advanced_dropdown/ExpandableDropdownOption';
import { VariableExtraSourceTypes } from '@/com/sulake/habbo/roomevents/wired_setup/common/VariableExtraSourceTypes';
import { ConditionCodes } from '@/com/sulake/habbo/roomevents/wired_setup/conditions/ConditionCodes';
import { DefaultConditionType } from '@/com/sulake/habbo/roomevents/wired_setup/conditions/DefaultConditionType';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { DropdownParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/DropdownParam';
import { RadioButtonParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/RadioButtonParam';
import { SectionParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/SectionParam';
import { SourceTypeSelectorParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/SourceTypeSelectorParam';

export class VariableAge extends DefaultConditionType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.conditions::VariableAge'); }

    declare private _section1: SectionPreset;

    declare private _picker: VariablePickerPreset;

    declare private _SafeStr_5199: RadioGroupPreset;

    declare private _SafeStr_3020: RadioGroupPreset;

    declare private _SafeStr_14457: ValueOrVariableSection;

    declare private _timeUnit: DropdownPreset;

    private _variableTarget: number = 0;

    constructor() {
        super();
    }

    private static variableSelectionFilter(param1: WiredVariable): boolean {
        return param1.canReadCreationTime || param1.canReadLastUpdateTime;
    }

    public override get code(): number {
        return ConditionCodes.VARIABLE_AGE;
    }

    public override readIntParamsFromForm(): any[] {
        let _loc1_: any[] = [];
        _loc1_.push(this._variableTarget);
        _loc1_.push(this._SafeStr_5199.selected);
        _loc1_.push(this._SafeStr_3020.selected);
        Util.pushIntAsLong(_loc1_, this._SafeStr_14457.numberValue);
        _loc1_.push(this._timeUnit.selectedId);
        _loc1_.push(this._SafeStr_14457.option);
        _loc1_.push(this._SafeStr_14457.target);
        return _loc1_;
    }

    public override readVariableIdsFromForm(): any[] {
        return [this._picker.finalizeSelection, this._SafeStr_14457.finalizeSelection];
    }

    public override onEditStart(param1: Triggerable): void {
        let _loc4_: any[] = param1.intParams;
        let _loc8_: string = stringOrNull(param1.variableIds[0]);
        this._variableTarget = _loc4_[0] | 0;
        this._picker.init(param1.wiredContext.roomVariablesList, _loc8_, this._variableTarget);
        let _loc3_: number = _loc4_[1] | 0;
        let _loc9_: number = _loc4_[2] | 0;
        let _loc10_: number = _loc4_[4] | 0;
        let _loc5_: number = _loc4_[5] | 0;
        let _loc6_: number = _loc4_[6] | 0;
        let _loc7_: number = _loc4_[7] | 0;
        let _loc2_: string = stringOrNull(param1.variableIds[1]);
        this._SafeStr_5199.selected = _loc3_;
        this._SafeStr_3020.selected = _loc9_;
        this._timeUnit.selectedId = _loc5_;
        this._SafeStr_14457.init(param1.wiredContext.roomVariablesList, _loc6_ == 0 ? WiredVariable._SafeStr_2375 : _loc2_, _loc7_, _loc6_, _loc10_);
        this.updateAgeOptions(this._picker.selected);
    }

    public override onEditInitialized(): void {
        this._section1.getSourceTypeSelector().select(this._variableTarget);
        this._SafeStr_14457.onEditInitialized();
    }

    private updateAgeOptions = (param1: WiredVariable): void => {
        this._SafeStr_3020.setOptionDisabled(0, false);
        this._SafeStr_3020.setOptionDisabled(1, false);
        if (param1 == null) {
            return;
        }
        if (!param1.canReadCreationTime) {
            this._SafeStr_3020.setOptionDisabled(0, true);
        } else if (!param1.canReadLastUpdateTime) {
            this._SafeStr_3020.setOptionDisabled(1, true);
        }
    };

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override get widthModifier(): number {
        return 1.4;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        let _loc5_: SourceTypeSelectorParam = new SourceTypeSelectorParam(this.mergedSourceOptions(0), this.createSourceTypeListener(0));
        this._picker = param1.createVariablePicker(VariableAge.variableSelectionFilter, this.updateAgeOptions);
        let _loc4_: SectionParam = new SectionParam(_loc5_);
        this._section1 = param1.createSection(this.l("variables.variable_selection"), this._picker, _loc4_);
        this._SafeStr_3020 = param1.createRadioGroup([new RadioButtonParam(0, this.l("variables.compare_value.0")), new RadioButtonParam(1, this.l("variables.compare_value.1"))], null, 2);
        let _loc7_: SectionPreset = param1.createSection(this.l("variables.compare_value"), this._SafeStr_3020);
        this._SafeStr_5199 = param1.createRadioGroup([new RadioButtonParam(0, this.l("comparison.0")), new RadioButtonParam(2, this.l("comparison.2"))], null, 2);
        let _loc8_: SectionPreset = param1.createSection(this.l("comparison_selection"), this._SafeStr_5199);
        this._SafeStr_14457 = param1.createValueOrVariableSection(1, this.mergedSourceOptions(1), null, -2147483648, 2147483647, false, 0);
        this._timeUnit = param1.createDropdown(new DropdownParam("", Array.from([new ExpandableDropdownOption(0, this.l("variables.duration.0")), new ExpandableDropdownOption(1, this.l("variables.duration.1")), new ExpandableDropdownOption(2, this.l("variables.duration.2")), new ExpandableDropdownOption(3, this.l("variables.duration.3")), new ExpandableDropdownOption(4, this.l("variables.duration.4")), new ExpandableDropdownOption(5, this.l("variables.duration.5")), new ExpandableDropdownOption(6, this.l("variables.duration.6")), new ExpandableDropdownOption(7, this.l("variables.duration.7"))]), null, "", 90));
        let _loc6_: SimpleListViewPreset = param1.createSimpleListView(false, [this._SafeStr_14457, this._timeUnit], true);
        let _loc9_: SectionPreset = param1.createSection(this.l("variables.time_selection"), _loc6_);
        param3.addElements(this._section1, _loc7_, _loc8_, _loc9_);
    }

    public override hasCustomTypePicker(param1: number): boolean {
        return true;
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
            this._SafeStr_14457.target = param2;
        }
    }

    public override getMergedType(param1: number): number {
        if (param1 == 0) {
            return this._variableTarget;
        }
        return this._SafeStr_14457.target;
    }

    public override getCustomSourcesForMergedType(param1: number): any[] {
        return [VariableExtraSourceTypes.GLOBAL_SOURCE, VariableExtraSourceTypes.CONTEXT_SOURCE];
    }

    public override advancedAlwaysVisible(): boolean {
        return true;
    }

    public override get forceHidePickFurniInstructions(): boolean {
        return true;
    }
}
