import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { ConditionCodes } from '@/com/sulake/habbo/roomevents/wired_setup/conditions/ConditionCodes';
import { DefaultConditionType } from '@/com/sulake/habbo/roomevents/wired_setup/conditions/DefaultConditionType';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { SliderSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/SliderSection';

export class TimeElapsedLess extends DefaultConditionType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.conditions::TimeElapsedLess'); }

    declare private _SafeStr_4261: SliderSection;

    constructor() {
        super();
    }

    public override get code(): number {
        return ConditionCodes.TIME_ELAPSED_LESS;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        this._SafeStr_4261 = param1.createSliderSection("wiredfurni.params.allowbefore2", "", SliderSection.CONVERTER_PULSES, 1, 1200, 1);
        this._SafeStr_4261.value = 1;
        param3.addElements(this._SafeStr_4261);
    }

    public override onEditStart(param1: Triggerable): void {
        this._SafeStr_4261.value = param1.intParams[0] - 1 | 0;
    }

    public override readIntParamsFromForm(): any[] {
        return [this._SafeStr_4261.value + 1];
    }
}
