import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { CheckboxGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/CheckboxGroupPreset';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { VariableNameSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/VariableNameSection';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { VariableTarget } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/variables/VariableTarget';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { CheckboxOptionParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/CheckboxOptionParam';
import { NewDefaultVariableType } from '@/com/sulake/habbo/roomevents/wired_setup/variables/NewDefaultVariableType';
import { VariableCodes } from '@/com/sulake/habbo/roomevents/wired_setup/variables/VariableCodes';

export class ContextVariable extends NewDefaultVariableType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.variables::ContextVariable'); }

    declare private _variableName: VariableNameSection;

    declare private _SafeStr_4975: CheckboxGroupPreset;

    constructor() {
        super();
    }

    public override get code(): number {
        return VariableCodes.CONTEXT_VARIABLE;
    }

    public override readIntParamsFromForm(): any[] {
        let _loc1_: any[] = [];
        _loc1_.push(this._SafeStr_4975._SafeStr_2119(0).selected ? 1 : 0);
        return _loc1_;
    }

    public override onEditStart(param1: Triggerable): void {
        super.onEditStart(param1);
        let _loc2_: boolean = param1.intParams[0] != 0;
        this._SafeStr_4975._SafeStr_2119(0).selected = _loc2_;
        this.initialVariableName = param1.stringParam;
    }

    public override readStringParamFromForm(): string {
        return this._variableName.variableName;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        this._variableName = param1.createVariableNameSection();
        this._SafeStr_4975 = param1.createCheckboxGroup([new CheckboxOptionParam(this.l("variables.settings.has_value"))]);
        let _loc4_: SectionPreset = param1.createSection(this.l("variables.settings"), this._SafeStr_4975);
        param3.addElements(this._variableName, _loc4_);
    }

    public override variableType(): number {
        return VariableTarget._SafeStr_7556;
    }

    protected override get variableNameSection(): VariableNameSection {
        return this._variableName;
    }
}
