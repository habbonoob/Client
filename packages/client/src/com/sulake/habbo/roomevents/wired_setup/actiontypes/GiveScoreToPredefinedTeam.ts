import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { RadioGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/RadioGroupPreset';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { ActionTypeCodes } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/ActionTypeCodes';
import { GiveScore } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/GiveScore';
import { RadioButtonParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/RadioButtonParam';

export class GiveScoreToPredefinedTeam extends GiveScore {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.actiontypes::GiveScoreToPredefinedTeam'); }

    constructor() {
        super();
    }

    declare private _SafeStr_4946: RadioGroupPreset;

    public override get code(): number {
        return ActionTypeCodes.GIVE_SCORE_TO_PREDEFINED_TEAM;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        super.buildInputs(param1, param2, param3);
        this._SafeStr_4946 = param1.createRadioGroup([new RadioButtonParam(1, this.l("team.1")), new RadioButtonParam(2, this.l("team.2")), new RadioButtonParam(3, this.l("team.3")), new RadioButtonParam(4, this.l("team.4"))], null, 2);
        let _loc4_: SectionPreset = param1.createSection(this.l("team"), this._SafeStr_4946);
        param3.addElements(_loc4_);
    }

    public override onEditStart(param1: Triggerable): void {
        super.onEditStart(param1);
        let _loc2_: number = param1.intParams[2] | 0;
        this._SafeStr_4946.selected = _loc2_;
    }

    public override readIntParamsFromForm(): any[] {
        let _loc1_: any[] = super.readIntParamsFromForm();
        _loc1_.push(this._SafeStr_4946.selected);
        return _loc1_;
    }
}
