import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { SliderSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/SliderSection';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { SliderValueMilliseconds50 } from '@/com/sulake/habbo/roomevents/wired_setup/common/slider_converter/SliderValueMilliseconds50';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { DefaultTriggerConf } from '@/com/sulake/habbo/roomevents/wired_setup/triggerconfs/DefaultTriggerConf';
import { TriggerConfCodes } from '@/com/sulake/habbo/roomevents/wired_setup/triggerconfs/TriggerConfCodes';

export class TriggerPeriodicShort extends DefaultTriggerConf {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.triggerconfs::TriggerPeriodicShort'); }

    constructor() {
        super();
    }

    declare private _SafeStr_4261: SliderSection;

    public override get code(): number {
        return TriggerConfCodes.PERIODIC_SHORT;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override readIntParamsFromForm(): any[] {
        return [this._SafeStr_4261.value];
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        this._SafeStr_4261 = param1.createSliderSection("wiredfurni.params.setshorttime", "ms", new SliderValueMilliseconds50(), 1, 10, 1, false);
        this._SafeStr_4261.value = 1;
        param3.addElements(this._SafeStr_4261);
    }

    public override onEditStart(param1: Triggerable): void {
        this._SafeStr_4261.value = param1.intParams[0] | 0;
    }
}
