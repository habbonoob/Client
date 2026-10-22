import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { RadioGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/RadioGroupPreset';
import type { SliderSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/SliderSection';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { ActionTypeCodes } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/ActionTypeCodes';
import { DefaultActionType } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/DefaultActionType';
import { SliderValueHundredth } from '@/com/sulake/habbo/roomevents/wired_setup/common/slider_converter/SliderValueHundredth';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { RadioButtonParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/RadioButtonParam';

export class SetFurniAltitude extends DefaultActionType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.actiontypes::SetFurniAltitude'); }

    constructor() {
        super();
    }

    declare private _SafeStr_4297: SliderSection;

    declare private _SafeStr_5052: RadioGroupPreset;

    public override get code(): number {
        return ActionTypeCodes.SET_FURNI_ALTITUDE;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        this._SafeStr_4297 = param1.createSliderSection("wiredfurni.params.setaltitude", "altitude", new SliderValueHundredth(), 0, 8000, 1);
        this._SafeStr_4297.value = 0;
        this._SafeStr_5052 = param1.createRadioGroup([new RadioButtonParam(0, this.l("operator.0")), new RadioButtonParam(1, this.l("operator.1")), new RadioButtonParam(2, this.l("operator.2"))]);
        param3.addElements(param1.createSection(this.l("choose_type"), this._SafeStr_5052), this._SafeStr_4297);
    }

    public override onEditStart(param1: Triggerable): void {
        this._SafeStr_4297.value = param1.intParams[0] | 0;
        this._SafeStr_5052.selected = param1.intParams[1] | 0;
    }

    public override readIntParamsFromForm(): any[] {
        return [this._SafeStr_4297.value, this._SafeStr_5052.selected];
    }
}
