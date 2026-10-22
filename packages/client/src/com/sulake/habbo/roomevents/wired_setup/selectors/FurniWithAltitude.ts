import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { RadioGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/RadioGroupPreset';
import type { SliderSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/SliderSection';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { SliderValueHundredth } from '@/com/sulake/habbo/roomevents/wired_setup/common/slider_converter/SliderValueHundredth';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { DefaultSelectorType } from '@/com/sulake/habbo/roomevents/wired_setup/selectors/DefaultSelectorType';
import { SelectorCodes } from '@/com/sulake/habbo/roomevents/wired_setup/selectors/SelectorCodes';
import { RadioButtonParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/RadioButtonParam';

export class FurniWithAltitude extends DefaultSelectorType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.selectors::FurniWithAltitude'); }

    constructor() {
        super();
    }

    declare private _SafeStr_4280: SliderSection;

    declare private _SafeStr_4859: RadioGroupPreset;

    public override get code(): number {
        return SelectorCodes.FURNI_WITH_ALTITUDE;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        this._SafeStr_4280 = param1.createSliderSection("wiredfurni.params.setaltitude", "altitude", new SliderValueHundredth(), 0, 8000, 1);
        this._SafeStr_4280.value = 0;
        this._SafeStr_4859 = param1.createRadioGroup([new RadioButtonParam(0, this.l("comparison.0")), new RadioButtonParam(1, this.l("comparison.1")), new RadioButtonParam(2, this.l("comparison.2"))]);
        param3.addElements(param1.createSection(this.l("comparison_selection"), this._SafeStr_4859), this._SafeStr_4280);
    }

    public override onEditStart(param1: Triggerable): void {
        this._SafeStr_4280.value = param1.intParams[0] | 0;
        this._SafeStr_4859.selected = param1.intParams[1] | 0;
    }

    public override readIntParamsFromForm(): any[] {
        return [this._SafeStr_4280.value, this._SafeStr_4859.selected];
    }
}
