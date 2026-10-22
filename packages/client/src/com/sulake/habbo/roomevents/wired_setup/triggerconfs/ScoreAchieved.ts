import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { RadioGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/RadioGroupPreset';
import type { SliderSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/SliderSection';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { SliderValueEcho } from '@/com/sulake/habbo/roomevents/wired_setup/common/slider_converter/SliderValueEcho';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { DefaultTriggerConf } from '@/com/sulake/habbo/roomevents/wired_setup/triggerconfs/DefaultTriggerConf';
import { TriggerConfCodes } from '@/com/sulake/habbo/roomevents/wired_setup/triggerconfs/TriggerConfCodes';
import { RadioButtonParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/RadioButtonParam';

export class ScoreAchieved extends DefaultTriggerConf {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.triggerconfs::ScoreAchieved'); }

    constructor() {
        super();
    }

    declare private _SafeStr_4307: SliderSection;

    declare private _SafeStr_4946: RadioGroupPreset;

    public override get code(): number {
        return TriggerConfCodes.SCORE_ACHIEVED;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override readIntParamsFromForm(): any[] {
        return [this._SafeStr_4307.value, this._SafeStr_4946.selected];
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        this._SafeStr_4946 = param1.createRadioGroup([new RadioButtonParam(0, this.l("team.any"), null, null, true), new RadioButtonParam(1, this.l("team.1")), new RadioButtonParam(2, this.l("team.2")), new RadioButtonParam(3, this.l("team.3")), new RadioButtonParam(4, this.l("team.4"))], null, 2);
        this._SafeStr_4307 = param1.createSliderSection("wiredfurni.params.setscore2", "points", new SliderValueEcho(), 1, 1000, 1);
        this._SafeStr_4307.value = 1;
        param3.addElements(param1.createSection(this.l("team"), this._SafeStr_4946), this._SafeStr_4307);
    }

    public override onEditStart(param1: Triggerable): void {
        let _loc2_: number = param1.intParams[0] | 0;
        let _loc3_: number = param1.intParams[1] | 0;
        this._SafeStr_4307.value = _loc2_;
        this._SafeStr_4946.selected = _loc3_;
    }
}
