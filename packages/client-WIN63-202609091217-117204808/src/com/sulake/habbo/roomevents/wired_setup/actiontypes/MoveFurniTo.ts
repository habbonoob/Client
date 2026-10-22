import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { RadioGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/RadioGroupPreset';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { ActionTypeCodes } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/ActionTypeCodes';
import { DefaultActionType } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/DefaultActionType';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { RadioButtonParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/RadioButtonParam';
import { SliderSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/SliderSection';

export class MoveFurniTo extends DefaultActionType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.actiontypes::MoveFurniTo'); }

    declare private _SafeStr_4637: RadioGroupPreset;

    declare private _slider: SliderSection;

    constructor() {
        super();
    }

    public override get code(): number {
        return ActionTypeCodes.MOVE_FURNI_TO;
    }

    public override readIntParamsFromForm(): any[] {
        return [this._SafeStr_4637.selected, this._slider.value];
    }

    public override onEditStart(param1: Triggerable): void {
        this._SafeStr_4637.selected = param1.intParams[0] | 0;
        this._slider.value = param1.intParams[1] | 0;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        this._SafeStr_4637 = param1.createRadioGroup([new RadioButtonParam(0, this.l("movefurni.0")), new RadioButtonParam(2, this.l("movefurni.2")), new RadioButtonParam(4, this.l("movefurni.4")), new RadioButtonParam(6, this.l("movefurni.6"))]);
        this._SafeStr_4637.selected = 0;
        let _loc4_: SectionPreset = param1.createSection(this.l("movefurni"), this._SafeStr_4637);
        this._slider = param1.createSliderSection("wiredfurni.params.emptytiles", "tiles", SliderSection.CONVERTER_ECHO, 1, 5, 1);
        this._slider.value = 1;
        param3.addElements(_loc4_, this._slider);
    }

    public override furniSelectionTitle(param1: number): string {
        return "wiredfurni.params.sources.furni.title.mv." + param1;
    }
}
