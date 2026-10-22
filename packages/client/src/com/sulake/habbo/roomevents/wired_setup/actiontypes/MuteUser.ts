import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { TextInputPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/TextInputPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { ActionTypeCodes } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/ActionTypeCodes';
import { DefaultActionType } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/DefaultActionType';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { TextInputParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextInputParam';
import { SliderSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/SliderSection';

export class MuteUser extends DefaultActionType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.actiontypes::MuteUser'); }

    constructor() {
        super();
    }

    declare private _SafeStr_4501: TextInputPreset;

    declare private _slider: SliderSection;

    public override get code(): number {
        return ActionTypeCodes.MUTE_USER;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override readStringParamFromForm(): string {
        return this._SafeStr_4501.text;
    }

    public override readIntParamsFromForm(): any[] {
        return [this._slider.value];
    }

    public override onEditStart(param1: Triggerable): void {
        this._SafeStr_4501.text = param1.stringParam;
        this._slider.value = param1.intParams[0] | 0;
    }

    public override validate(): string {
        let _loc2_: string = null;
        let _loc1_: number = 100;
        if (this._SafeStr_4501.text.length > _loc1_) {
            _loc2_ = "wiredfurni.chatmsgtoolong";
            return this.roomEvents.localization.getLocalization(_loc2_, _loc2_);
        }
        return null;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        this._SafeStr_4501 = param1.createTextInput(new TextInputParam("", 100));
        let _loc4_: SectionPreset = param1.createSection("${wiredfurni.params.message}", this._SafeStr_4501);
        this._slider = param1.createSliderSection("wiredfurni.params.length.minutes", "minutes", SliderSection.CONVERTER_ECHO, 0, 10, 1);
        this._slider.value = 1;
        param3.addElements(_loc4_, this._slider);
    }
}
