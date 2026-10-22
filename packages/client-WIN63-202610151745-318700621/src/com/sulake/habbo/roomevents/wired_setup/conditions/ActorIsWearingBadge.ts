import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { TextInputPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/TextInputPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { ConditionCodes } from '@/com/sulake/habbo/roomevents/wired_setup/conditions/ConditionCodes';
import { DefaultConditionType } from '@/com/sulake/habbo/roomevents/wired_setup/conditions/DefaultConditionType';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { TextInputParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextInputParam';

export class ActorIsWearingBadge extends DefaultConditionType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.conditions::ActorIsWearingBadge'); }

    declare private _SafeStr_5102: TextInputPreset;

    constructor() {
        super();
    }

    public override get code(): number {
        return ConditionCodes.ACTOR_IS_WEARING_BADGE;
    }

    public override get negativeCode(): number {
        return ConditionCodes.NOT_ACTOR_IS_WEARING_BADGE;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        this._SafeStr_5102 = param1.createTextInput(new TextInputParam("", 1000, null, -1, null, true, this.loc("wiredfurni.tooltip.badgecode")));
        let _loc4_: SectionPreset = param1.createSection(this.l("badgecode"), this._SafeStr_5102);
        param3.addElements(_loc4_);
    }

    public override readStringParamFromForm(): string {
        return this._SafeStr_5102.text;
    }

    public override onEditStart(param1: Triggerable): void {
        this._SafeStr_5102.text = param1.stringParam;
    }
}
