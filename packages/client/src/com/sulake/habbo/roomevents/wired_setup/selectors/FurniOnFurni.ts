import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { RadioGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/RadioGroupPreset';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { DefaultSelectorType } from '@/com/sulake/habbo/roomevents/wired_setup/selectors/DefaultSelectorType';
import { SelectorCodes } from '@/com/sulake/habbo/roomevents/wired_setup/selectors/SelectorCodes';
import { RadioButtonParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/RadioButtonParam';

export class FurniOnFurni extends DefaultSelectorType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.selectors::FurniOnFurni'); }

    constructor() {
        super();
    }

    declare private _SafeStr_4444: RadioGroupPreset;

    public override get code(): number {
        return SelectorCodes.FURNI_ON_FURNI;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        this._SafeStr_4444 = param1.createRadioGroup([new RadioButtonParam(0, this.l("onfurni.0")), new RadioButtonParam(1, this.l("onfurni.1")), new RadioButtonParam(2, this.l("onfurni.2")), new RadioButtonParam(3, this.l("onfurni.3"))]);
        this._SafeStr_4444.selected = 0;
        let _loc4_: SectionPreset = param1.createSection(this.l("selection_type"), this._SafeStr_4444);
        param3.addElements(_loc4_);
    }

    public override onEditStart(param1: Triggerable): void {
        this._SafeStr_4444.selected = param1.intParams[0] | 0;
    }

    public override readIntParamsFromForm(): any[] {
        return [this._SafeStr_4444.selected];
    }
}
