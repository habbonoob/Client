import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { RadioGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/RadioGroupPreset';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { SimpleListViewPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SimpleListViewPreset';
import type { TextInputPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/TextInputPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { AbstractBotAction } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/AbstractBotAction';
import { ActionTypeCodes } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/ActionTypeCodes';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { RadioButtonParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/RadioButtonParam';
import { TextInputParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextInputParam';

export class BotFollowAvatar extends AbstractBotAction {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.actiontypes::BotFollowAvatar'); }

    constructor() {
        super();
    }

    declare private _botName: TextInputPreset;

    declare private _SafeStr_4444: RadioGroupPreset;

    public override get code(): number {
        return ActionTypeCodes.BOT_FOLLOW_AVATAR;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override readStringParamFromForm(): string {
        return this._botName.text;
    }

    public override readIntParamsFromForm(): any[] {
        return [this._SafeStr_4444.selected];
    }

    public override onEditStart(param1: Triggerable): void {
        this._botName.text = param1.stringParam;
        this._SafeStr_4444.selected = param1.intParams[0] | 0;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        this._botName = param1.createTextInput(new TextInputParam("", 32, null, -1, null, true, this.loc("wiredfurni.tooltip.bot.name")));
        this._SafeStr_4444 = param1.createRadioGroup([new RadioButtonParam(1, this.l("start.following")), new RadioButtonParam(0, this.l("stop.following"))]);
        let _loc5_: SimpleListViewPreset = param1.createSimpleListView(true, [this._botName, this._SafeStr_4444]);
        let _loc4_: SectionPreset = param1.createSection(this.l("bot.name"), _loc5_);
        param3.addElements(_loc4_);
    }
}
