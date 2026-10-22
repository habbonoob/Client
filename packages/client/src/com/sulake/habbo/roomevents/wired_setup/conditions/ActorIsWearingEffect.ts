import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { NumberInputPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/NumberInputPreset';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { ConditionCodes } from '@/com/sulake/habbo/roomevents/wired_setup/conditions/ConditionCodes';
import { DefaultConditionType } from '@/com/sulake/habbo/roomevents/wired_setup/conditions/DefaultConditionType';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { NumberInputParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/NumberInputParam';

export class ActorIsWearingEffect extends DefaultConditionType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.conditions::ActorIsWearingEffect'); }

    constructor() {
        super();
    }

    declare private _SafeStr_5491: NumberInputPreset;

    public override get code(): number {
        return ConditionCodes.ACTOR_IS_WEARING_EFFECT;
    }

    public override get negativeCode(): number {
        return ConditionCodes.NOT_ACTOR_IS_WEARING_EFFECT;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        this._SafeStr_5491 = param1.createNumberInput(new NumberInputParam(0, -2147483648, 2147483647, 200, 0, false, false, this.loc("wiredfurni.tooltip.effectid")));
        let _loc4_: SectionPreset = param1.createSection(this.l("effectid"), this._SafeStr_5491);
        param3.addElements(_loc4_);
    }

    public override readIntParamsFromForm(): any[] {
        return [this._SafeStr_5491.value];
    }

    public override onEditStart(param1: Triggerable): void {
        this._SafeStr_5491.value = param1.intParams[0] | 0;
    }
}
