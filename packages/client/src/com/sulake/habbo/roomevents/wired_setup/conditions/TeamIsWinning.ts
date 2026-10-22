import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { RadioGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/RadioGroupPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { ConditionCodes } from '@/com/sulake/habbo/roomevents/wired_setup/conditions/ConditionCodes';
import { DefaultConditionType } from '@/com/sulake/habbo/roomevents/wired_setup/conditions/DefaultConditionType';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { RadioButtonParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/RadioButtonParam';

export class TeamIsWinning extends DefaultConditionType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.conditions::TeamIsWinning'); }

    constructor() {
        super();
    }

    declare private _SafeStr_4946: RadioGroupPreset;

    declare private _SafeStr_5507: RadioGroupPreset;

    public override get code(): number {
        return ConditionCodes.TEAM_IS_WINNING;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        this._SafeStr_4946 = param1.createRadioGroup([new RadioButtonParam(0, this.l("team.triggerer"), null, null, true), new RadioButtonParam(1, this.l("team.1")), new RadioButtonParam(2, this.l("team.2")), new RadioButtonParam(3, this.l("team.3")), new RadioButtonParam(4, this.l("team.4"))], null, 2);
        this._SafeStr_5507 = param1.createRadioGroup([new RadioButtonParam(0, this.l("placement.1")), new RadioButtonParam(1, this.l("placement.2")), new RadioButtonParam(2, this.l("placement.3")), new RadioButtonParam(3, this.l("placement.4"))], null, 4);
        param3.addElements(param1.createSection(this.l("team"), this._SafeStr_4946), param1.createSection(this.l("placement_selection"), this._SafeStr_5507));
    }

    public override onEditStart(param1: Triggerable): void {
        this._SafeStr_4946.selected = param1.intParams[0] | 0;
        this._SafeStr_5507.selected = param1.intParams[1] | 0;
    }

    public override readIntParamsFromForm(): any[] {
        return [this._SafeStr_4946.selected, this._SafeStr_5507.selected];
    }
}
