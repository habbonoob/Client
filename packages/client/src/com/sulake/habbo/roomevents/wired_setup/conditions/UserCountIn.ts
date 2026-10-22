import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { SliderSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/SliderSection';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { SliderValueEcho } from '@/com/sulake/habbo/roomevents/wired_setup/common/slider_converter/SliderValueEcho';
import { ConditionCodes } from '@/com/sulake/habbo/roomevents/wired_setup/conditions/ConditionCodes';
import { DefaultConditionType } from '@/com/sulake/habbo/roomevents/wired_setup/conditions/DefaultConditionType';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';

export class UserCountIn extends DefaultConditionType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.conditions::UserCountIn'); }

    constructor() {
        super();
    }

    declare private _SafeStr_4857: SliderSection;

    declare private _SafeStr_5308: SliderSection;

    public override get code(): number {
        return ConditionCodes.USER_COUNT_IN;
    }

    public override get negativeCode(): number {
        return ConditionCodes.NOT_USER_COUNT_IN;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        this._SafeStr_4857 = param1.createSliderSection("wiredfurni.params.usercountmin", "value", new SliderValueEcho(), 0, 125, 1, false);
        this._SafeStr_5308 = param1.createSliderSection("wiredfurni.params.usercountmax", "value", new SliderValueEcho(), 0, 125, 1, false);
        param3.addElements(this._SafeStr_4857, this._SafeStr_5308);
    }

    public override onEditStart(param1: Triggerable): void {
        this._SafeStr_4857.value = param1.intParams[0] | 0;
        this._SafeStr_5308.value = param1.intParams[1] | 0;
    }

    public override readIntParamsFromForm(): any[] {
        return [this._SafeStr_4857.value, this._SafeStr_5308.value];
    }
}
