import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { DefaultTriggerConf } from '@/com/sulake/habbo/roomevents/wired_setup/triggerconfs/DefaultTriggerConf';
import { TriggerConfCodes } from '@/com/sulake/habbo/roomevents/wired_setup/triggerconfs/TriggerConfCodes';
import { SliderSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/SliderSection';

export class TriggerOnce extends DefaultTriggerConf {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.triggerconfs::TriggerOnce'); }

    public static getSecsFromPulses(param1: number): string {
        let _loc2_: number = Math.floor(param1 / 2) | 0;
        if (param1 % 2 == 0) {
            return "" + _loc2_;
        }
        return _loc2_ + ".5";
    }

    constructor() {
        super();
    }

    declare private _slider: SliderSection;

    public override get code(): number {
        return TriggerConfCodes.TRIGGER_ONCE;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        this._slider = param1.createSliderSection("wiredfurni.params.settime2", "", SliderSection.CONVERTER_PULSES, 1, 1200, 1);
        param3.addElements(this._slider);
    }

    public override onEditStart(param1: Triggerable): void {
        this._slider.value = param1.getInt(0);
    }

    public override readIntParamsFromForm(): any[] {
        return [this._slider.value];
    }
}
