import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { RadioGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/RadioGroupPreset';
import type { SliderSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/SliderSection';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { SliderValueEcho } from '@/com/sulake/habbo/roomevents/wired_setup/common/slider_converter/SliderValueEcho';
import { SliderValuePulses } from '@/com/sulake/habbo/roomevents/wired_setup/common/slider_converter/SliderValuePulses';
import { ConditionCodes } from '@/com/sulake/habbo/roomevents/wired_setup/conditions/ConditionCodes';
import { DefaultConditionType } from '@/com/sulake/habbo/roomevents/wired_setup/conditions/DefaultConditionType';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { RadioButtonParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/RadioButtonParam';

export class ClockTimeMatches extends DefaultConditionType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.conditions::ClockTimeMatches'); }

    declare private _SafeStr_5264: SliderSection;

    declare private _SafeStr_4869: SliderSection;

    declare private _SafeStr_4859: RadioGroupPreset;

    constructor() {
        super();
    }

    public override get code(): number {
        return ConditionCodes.CLOCK_TIME_MATCHES;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        this._SafeStr_5264 = param1.createSliderSection("wiredfurni.params.clock_seconds_elapsed", "seconds", new SliderValuePulses(), 0, 119, 1, false);
        this._SafeStr_4869 = param1.createSliderSection("wiredfurni.params.clock_minutes_elapsed", "minutes", new SliderValueEcho(), 0, 99, 1, false);
        this._SafeStr_4859 = param1.createRadioGroup([new RadioButtonParam(0, this.l("comparison.0")), new RadioButtonParam(1, this.l("comparison.1")), new RadioButtonParam(2, this.l("comparison.2"))]);
        param3.addElements(param1.createSection(this.l("comparison_selection"), this._SafeStr_4859), this._SafeStr_4869, this._SafeStr_5264);
    }

    public override onEditStart(param1: Triggerable): void {
        let _loc2_: number = param1.intParams[0] | 0;
        let _loc3_: number = param1.intParams[1] | 0;
        let _loc4_: number = param1.intParams[2] | 0;
        this._SafeStr_5264.value = _loc2_ * 2 + _loc4_;
        this._SafeStr_4869.value = _loc3_;
        this._SafeStr_4859.selected = param1.intParams[3] | 0;
    }

    public override readIntParamsFromForm(): any[] {
        let _loc3_: number = this._SafeStr_5264.value;
        let _loc1_: number = Math.floor(_loc3_ / 2) | 0;
        let _loc2_: number = _loc3_ % 2 | 0;
        return [_loc1_, this._SafeStr_4869.value, _loc2_, this._SafeStr_4859.selected];
    }
}
