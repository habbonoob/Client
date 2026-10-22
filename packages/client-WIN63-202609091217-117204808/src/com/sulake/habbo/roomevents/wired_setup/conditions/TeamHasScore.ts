import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { RadioGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/RadioGroupPreset';
import type { SliderSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/SliderSection';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { SliderValueEcho } from '@/com/sulake/habbo/roomevents/wired_setup/common/slider_converter/SliderValueEcho';
import { ConditionCodes } from '@/com/sulake/habbo/roomevents/wired_setup/conditions/ConditionCodes';
import { DefaultConditionType } from '@/com/sulake/habbo/roomevents/wired_setup/conditions/DefaultConditionType';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { RadioButtonParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/RadioButtonParam';

export class TeamHasScore extends DefaultConditionType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.conditions::TeamHasScore'); }

    declare private _SafeStr_4946: RadioGroupPreset;

    declare private _SafeStr_4859: RadioGroupPreset;

    declare private _SafeStr_4307: SliderSection;

    constructor() {
        super();
    }

    public override get code(): number {
        return ConditionCodes.TEAM_HAS_SCORE;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        this._SafeStr_4946 = param1.createRadioGroup([new RadioButtonParam(0, this.l("team.triggerer"), null, null, true), new RadioButtonParam(1, this.l("team.1")), new RadioButtonParam(2, this.l("team.2")), new RadioButtonParam(3, this.l("team.3")), new RadioButtonParam(4, this.l("team.4"))], null, 2);
        this._SafeStr_4859 = param1.createRadioGroup([new RadioButtonParam(0, this.l("comparison.0")), new RadioButtonParam(1, this.l("comparison.1")), new RadioButtonParam(2, this.l("comparison.2"))]);
        this._SafeStr_4307 = param1.createSliderSection("wiredfurni.params.setscore2", "points", new SliderValueEcho(), 0, 1000, 1);
        this._SafeStr_4307.value = 1;
        param3.addElements(param1.createSection(this.l("team"), this._SafeStr_4946), param1.createSection(this.l("comparison_selection"), this._SafeStr_4859), this._SafeStr_4307);
    }

    public override onEditStart(param1: Triggerable): void {
        this._SafeStr_4946.selected = param1.intParams[0] | 0;
        this._SafeStr_4307.value = param1.intParams[1] | 0;
        this._SafeStr_4859.selected = param1.intParams[2] | 0;
    }

    public override readIntParamsFromForm(): any[] {
        return [this._SafeStr_4946.selected, this._SafeStr_4307.value, this._SafeStr_4859.selected];
    }
}
