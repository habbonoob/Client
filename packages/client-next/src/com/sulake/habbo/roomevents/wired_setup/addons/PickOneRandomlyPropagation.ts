import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { AddonCodes } from '@/com/sulake/habbo/roomevents/wired_setup/addons/AddonCodes';
import { DefaultAddonType } from '@/com/sulake/habbo/roomevents/wired_setup/addons/DefaultAddonType';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { SliderSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/SliderSection';

export class PickOneRandomlyPropagation extends DefaultAddonType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.addons::PickOneRandomlyPropagation'); }

    declare private _SafeStr_5047: SliderSection;

    declare private _SafeStr_5479: SliderSection;

    constructor() {
        super();
    }

    public override get code(): number {
        return AddonCodes._SafeStr_7579;
    }

    public override readIntParamsFromForm(): any[] {
        return [this._SafeStr_5479.value, this._SafeStr_5047.value];
    }

    public override onEditStart(param1: Triggerable): void {
        this._SafeStr_5479.value = param1.intParams[0] | 0;
        this._SafeStr_5047.value = param1.intParams[1] | 0;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        this._SafeStr_5479 = param1.createSliderSection("wiredfurni.params.skipactions", "skips", SliderSection.CONVERTER_ECHO, 0, 100, 1, false);
        this._SafeStr_5047 = param1.createSliderSection("wiredfurni.params.pickamount", "picks", SliderSection.CONVERTER_ECHO, 1, 100, 1, false);
        param3.addElements(this._SafeStr_5047, this._SafeStr_5479);
    }
}
