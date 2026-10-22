import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { SliderSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/SliderSection';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { SliderValueSeconds5 } from '@/com/sulake/habbo/roomevents/wired_setup/common/slider_converter/SliderValueSeconds5';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { TriggerConfCodes } from '@/com/sulake/habbo/roomevents/wired_setup/triggerconfs/TriggerConfCodes';
import { TriggerPeriodically } from '@/com/sulake/habbo/roomevents/wired_setup/triggerconfs/TriggerPeriodically';

export class TriggerPeriodicLong extends TriggerPeriodically {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.triggerconfs::TriggerPeriodicLong'); }

    declare private _SafeStr_4261_TriggerPeriodicLong: SliderSection;

    constructor() {
        super();
    }

    public override get code(): number {
        return TriggerConfCodes.PERIODIC_LONG;
    }

    public override readIntParamsFromForm(): any[] {
        return [this._SafeStr_4261_TriggerPeriodicLong.value];
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        this._SafeStr_4261_TriggerPeriodicLong = param1.createSliderSection("wiredfurni.params.settime3", "", new SliderValueSeconds5(), 1, 120, 1);
        this._SafeStr_4261_TriggerPeriodicLong.value = 1;
        param3.addElements(this._SafeStr_4261_TriggerPeriodicLong);
    }

    public override onEditStart(param1: Triggerable): void {
        this._SafeStr_4261_TriggerPeriodicLong.value = param1.intParams[0] | 0;
    }
}
