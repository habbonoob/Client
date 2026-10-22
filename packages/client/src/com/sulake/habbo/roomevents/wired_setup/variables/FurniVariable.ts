import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { CheckboxGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/CheckboxGroupPreset';
import type { RadioGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/RadioGroupPreset';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { VariableNameSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/VariableNameSection';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { VariableTarget } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/variables/VariableTarget';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { CheckboxOptionParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/CheckboxOptionParam';
import { RadioButtonParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/RadioButtonParam';
import { NewDefaultVariableType } from '@/com/sulake/habbo/roomevents/wired_setup/variables/NewDefaultVariableType';
import { VariableCodes } from '@/com/sulake/habbo/roomevents/wired_setup/variables/VariableCodes';

export class FurniVariable extends NewDefaultVariableType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.variables::FurniVariable'); }

    constructor() {
        super();
    }

    declare private _variableName: VariableNameSection;

    declare private _SafeStr_4557: RadioGroupPreset;

    declare private _SafeStr_4975: CheckboxGroupPreset;

    public override get code(): number {
        return VariableCodes._SafeStr_7501;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    protected override get variableNameSection(): VariableNameSection {
        return this._variableName;
    }

    public override readIntParamsFromForm(): any[] {
        let _loc1_: any[] = [];
        _loc1_.push(this._SafeStr_4975._SafeStr_2119(0).selected ? 1 : 0);
        _loc1_.push(this._SafeStr_4557.selected);
        return _loc1_;
    }

    public override onEditStart(param1: Triggerable): void {
        super.onEditStart(param1);
        let _loc3_: any = param1.intParams[0] != 0;
        let _loc2_: number = param1.intParams[1] | 0;
        this._SafeStr_4975._SafeStr_2119(0).selected = _loc3_;
        this._SafeStr_4557.selected = _loc2_;
        this.initialVariableName = param1.stringParam;
    }

    public override readStringParamFromForm(): string {
        return this._variableName.variableName;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        this._variableName = param1.createVariableNameSection();
        this._SafeStr_4975 = param1.createCheckboxGroup([new CheckboxOptionParam(this.l("variables.settings.has_value"))]);
        let _loc4_: SectionPreset = param1.createSection(this.l("variables.settings"), this._SafeStr_4975);
        this._SafeStr_4557 = param1.createRadioGroup([new RadioButtonParam(1, this.l("variables.availability.1")), new RadioButtonParam(10, this.l("variables.availability.10"))]);
        let _loc5_: SectionPreset = param1.createSection(this.l("variables.availability"), this._SafeStr_4557);
        param3.addElements(this._variableName, _loc4_, _loc5_);
    }

    public override variableType(): number {
        return VariableTarget.FURNI;
    }
}
