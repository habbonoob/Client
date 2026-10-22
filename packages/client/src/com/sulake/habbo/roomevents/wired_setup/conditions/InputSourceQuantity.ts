import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { RadioGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/RadioGroupPreset';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { SliderSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/SliderSection';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { SliderValueEcho } from '@/com/sulake/habbo/roomevents/wired_setup/common/slider_converter/SliderValueEcho';
import { ConditionCodes } from '@/com/sulake/habbo/roomevents/wired_setup/conditions/ConditionCodes';
import { DefaultConditionType } from '@/com/sulake/habbo/roomevents/wired_setup/conditions/DefaultConditionType';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { WiredInputSourcePicker } from '@/com/sulake/habbo/roomevents/wired_setup/inputsources/WiredInputSourcePicker';
import { RadioButtonParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/RadioButtonParam';

export class InputSourceQuantity extends DefaultConditionType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.conditions::InputSourceQuantity'); }

    constructor() {
        super();
    }

    declare private _SafeStr_4782: SliderSection;

    declare private _SafeStr_4859: RadioGroupPreset;

    declare private _SafeStr_4260: boolean;
    static { (this.prototype as any)._SafeStr_4260 = false; }

    public override get code(): number {
        return ConditionCodes.INPUT_SOURCE_QUANTITY;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        this._SafeStr_4859 = param1.createRadioGroup([new RadioButtonParam(0, this.l("comparison.0")), new RadioButtonParam(1, this.l("comparison.1")), new RadioButtonParam(2, this.l("comparison.2"))]);
        let _loc4_: SectionPreset = param1.createSection(this.l("comparison_selection"), this._SafeStr_4859);
        this._SafeStr_4782 = param1.createSliderSection("wiredfurni.params.setamount2", "", new SliderValueEcho(), 0, 100, 1);
        param3.addElements(_loc4_, this._SafeStr_4782);
    }

    public override onEditStart(param1: Triggerable): void {
        this._SafeStr_4260 = param1.getBoolean(0);
        this._SafeStr_4782.value = param1.intParams[1] | 0;
        this._SafeStr_4859.selected = param1.intParams[2] | 0;
    }

    public override readIntParamsFromForm(): any[] {
        return [this._SafeStr_4260 ? 1 : 0, this._SafeStr_4782.value, this._SafeStr_4859.selected];
    }

    public override mergedSelections(): any[] {
        return [[0, 0]];
    }

    public override setMergedType(param1: number, param2: number): void {
        this._SafeStr_4260 = param2 == WiredInputSourcePicker.USER_SOURCE;
    }

    public override getMergedType(param1: number): number {
        return this._SafeStr_4260 ? WiredInputSourcePicker.USER_SOURCE : WiredInputSourcePicker._SafeStr_2178;
    }

    public override advancedAlwaysVisible(): boolean {
        return true;
    }
}
