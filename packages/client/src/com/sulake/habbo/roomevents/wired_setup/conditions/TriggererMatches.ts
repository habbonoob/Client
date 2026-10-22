import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { RadioGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/RadioGroupPreset';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { TextInputPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/TextInputPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { ConditionCodes } from '@/com/sulake/habbo/roomevents/wired_setup/conditions/ConditionCodes';
import { DefaultConditionType } from '@/com/sulake/habbo/roomevents/wired_setup/conditions/DefaultConditionType';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { RadioButtonParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/RadioButtonParam';
import { TextInputParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextInputParam';

export class TriggererMatches extends DefaultConditionType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.conditions::TriggererMatches'); }

    constructor() {
        super();
    }

    declare private _SafeStr_4617: RadioGroupPreset;

    declare private _SafeStr_4691: RadioGroupPreset;

    declare private _SafeStr_4543: TextInputPreset;

    public override get code(): number {
        return ConditionCodes.TRIGGERER_MATCHES;
    }

    public override get negativeCode(): number {
        return ConditionCodes.NOT_TRIGGERER_MATCHES;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        this._SafeStr_4617 = param1.createRadioGroup([new RadioButtonParam(1, this.l("usertype.1")), new RadioButtonParam(2, this.l("usertype.2")), new RadioButtonParam(4, this.l("usertype.4"))]);
        let _loc4_: SectionPreset = param1.createSection(this.l("usertype"), this._SafeStr_4617);
        this._SafeStr_4543 = param1.createTextInput(new TextInputParam("", 32, null, -1, null, true, this.loc("wiredfurni.tooltip.avatarname")));
        this._SafeStr_4691 = param1.createRadioGroup([new RadioButtonParam(0, this.l("anyavatar")), new RadioButtonParam(1, this.l("certainavatar"), null, this._SafeStr_4543)]);
        let _loc5_: SectionPreset = param1.createSection(this.l("picktriggerer"), this._SafeStr_4691);
        param3.addElements(_loc4_, _loc5_);
    }

    public override onEditStart(param1: Triggerable): void {
        this._SafeStr_4617.selected = param1.intParams[0] | 0;
        if (param1.stringParam != "") {
            this._SafeStr_4691.selected = 1;
            this._SafeStr_4543.text = param1.stringParam;
        } else {
            this._SafeStr_4691.selected = 0;
            this._SafeStr_4543.text = "";
        }
    }

    public override readIntParamsFromForm(): any[] {
        return [this._SafeStr_4617.selected];
    }

    public override readStringParamFromForm(): string {
        return this._SafeStr_4691.selected == 1 ? this._SafeStr_4543.text : "";
    }

    public override userSelectionTitle(param1: number): string {
        return "wiredfurni.params.sources.users.title.match." + param1;
    }
}
