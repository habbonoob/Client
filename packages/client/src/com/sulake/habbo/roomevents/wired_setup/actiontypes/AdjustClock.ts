import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { RadioGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/RadioGroupPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { ActionTypeCodes } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/ActionTypeCodes';
import { DefaultActionType } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/DefaultActionType';
import { SliderValuePulses } from '@/com/sulake/habbo/roomevents/wired_setup/common/slider_converter/SliderValuePulses';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { RadioButtonParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/RadioButtonParam';
import { SliderSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/SliderSection';

export class AdjustClock extends DefaultActionType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.actiontypes::AdjustClock'); }

    constructor() {
        super();
    }

    declare private _SafeStr_5473: SliderSection;

    declare private _SafeStr_5055: SliderSection;

    declare private _SafeStr_5052: RadioGroupPreset;

    public override get code(): number {
        return ActionTypeCodes.ADJUST_CLOCK;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        this._SafeStr_5473 = param1.createSliderSection("wiredfurni.params.clock_seconds", "seconds", new SliderValuePulses(), 0, 119, 1, false);
        this._SafeStr_5055 = param1.createSliderSection("wiredfurni.params.clock_minutes", "minutes", SliderSection.CONVERTER_ECHO, 0, 99, 1, false);
        this._SafeStr_5052 = param1.createRadioGroup([new RadioButtonParam(0, this.l("operator.0")), new RadioButtonParam(1, this.l("operator.1")), new RadioButtonParam(2, this.l("operator.2"))]);
        param3.addElements(param1.createSection(this.l("choose_type"), this._SafeStr_5052), this._SafeStr_5055, this._SafeStr_5473);
    }

    public override onEditStart(param1: Triggerable): void {
        let _loc2_: number = param1.intParams[0] | 0;
        let _loc3_: number = param1.intParams[1] | 0;
        let _loc4_: number = param1.intParams[2] | 0;
        this._SafeStr_5473.value = _loc2_ * 2 + _loc4_;
        this._SafeStr_5055.value = _loc3_;
        this._SafeStr_5052.selected = param1.intParams[3] | 0;
    }

    public override readIntParamsFromForm(): any[] {
        let _loc3_: number = this._SafeStr_5473.value;
        let _loc1_: number = Math.floor(_loc3_ / 2) | 0;
        let _loc2_: number = _loc3_ % 2;
        return [_loc1_, this._SafeStr_5055.value, _loc2_, this._SafeStr_5052.selected];
    }
}
