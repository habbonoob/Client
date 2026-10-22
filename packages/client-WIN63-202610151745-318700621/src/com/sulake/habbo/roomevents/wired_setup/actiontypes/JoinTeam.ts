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

export class JoinTeam extends DefaultActionType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.actiontypes::JoinTeam'); }

    declare private _SafeStr_4946: RadioGroupPreset;

    declare private _SafeStr_4444: RadioGroupPreset;

    constructor() {
        super();
    }

    public override get code(): number {
        return ActionTypeCodes.JOIN_TEAM;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        this._SafeStr_4946 = param1.createRadioGroup([new RadioButtonParam(1, this.l("team.1")), new RadioButtonParam(2, this.l("team.2")), new RadioButtonParam(3, this.l("team.3")), new RadioButtonParam(4, this.l("team.4"))], null, 2);
        let _loc4_: SectionPreset = param1.createSection(this.l("team"), this._SafeStr_4946);
        this._SafeStr_4444 = param1.createRadioGroup([new RadioButtonParam(0, this.l("team_type.0")), new RadioButtonParam(1, this.l("team_type.1")), new RadioButtonParam(2, this.l("team_type.2"))]);
        let _loc5_: SectionPreset = param1.createSection(this.l("choose_type"), this._SafeStr_4444);
        param3.addElements(_loc4_, _loc5_);
    }

    public override onEditStart(param1: Triggerable): void {
        this._SafeStr_4946.selected = param1.intParams[0] | 0;
        this._SafeStr_4444.selected = param1.intParams[1] | 0;
    }

    public override readIntParamsFromForm(): any[] {
        return [this._SafeStr_4946.selected, this._SafeStr_4444.selected];
    }
}
