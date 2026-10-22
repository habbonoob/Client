import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { SliderSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/SliderSection';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { SliderValueEcho } from '@/com/sulake/habbo/roomevents/wired_setup/common/slider_converter/SliderValueEcho';
import { SliderValuePulses } from '@/com/sulake/habbo/roomevents/wired_setup/common/slider_converter/SliderValuePulses';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { DefaultTriggerConf } from '@/com/sulake/habbo/roomevents/wired_setup/triggerconfs/DefaultTriggerConf';
import { TriggerConfCodes } from '@/com/sulake/habbo/roomevents/wired_setup/triggerconfs/TriggerConfCodes';

export class ClockReachTime extends DefaultTriggerConf {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.triggerconfs::ClockReachTime'); }

    declare private _SafeStr_5348: SliderSection;

    declare private _sliderMinutes: SliderSection;

    constructor() {
        super();
    }

    public override get code(): number {
        return TriggerConfCodes.CLOCK_REACH_TIME;
    }

    public override readIntParamsFromForm(): any[] {
        let _loc3_: number = this._SafeStr_5348.value;
        let _loc1_: number = Math.floor(_loc3_ / 2) | 0;
        let _loc2_: number = _loc3_ % 2 | 0;
        return [_loc1_, this._sliderMinutes.value, _loc2_];
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        this._SafeStr_5348 = param1.createSliderSection("wiredfurni.params.clock_seconds_elapsed", "seconds", new SliderValuePulses(), 0, 119, 1, false);
        this._sliderMinutes = param1.createSliderSection("wiredfurni.params.clock_minutes_elapsed", "minutes", new SliderValueEcho(), 0, 99, 1, false);
        param3.addElements(this._sliderMinutes, this._SafeStr_5348);
    }

    public override onEditStart(param1: Triggerable): void {
        let _loc2_: number = param1.intParams[0] | 0;
        let _loc3_: number = param1.intParams[1] | 0;
        let _loc4_: number = param1.intParams[2] | 0;
        this._SafeStr_5348.value = _loc2_ * 2 + _loc4_;
        this._sliderMinutes.value = _loc3_;
    }
}
