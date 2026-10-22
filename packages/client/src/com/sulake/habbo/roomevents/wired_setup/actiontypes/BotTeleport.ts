import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { TextInputPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/TextInputPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { AbstractBotAction } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/AbstractBotAction';
import { ActionTypeCodes } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/ActionTypeCodes';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { TextInputParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextInputParam';

export class BotTeleport extends AbstractBotAction {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.actiontypes::BotTeleport'); }

    constructor() {
        super();
    }

    declare private _botName: TextInputPreset;

    public override get code(): number {
        return ActionTypeCodes.BOT_TELEPORT;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override readStringParamFromForm(): string {
        return this._botName.text;
    }

    public override onEditStart(param1: Triggerable): void {
        this._botName.text = param1.stringParam;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        this._botName = param1.createTextInput(new TextInputParam("", 32, null, -1, null, true, this.loc("wiredfurni.tooltip.bot.name")));
        let _loc4_: SectionPreset = param1.createSection(this.l("bot.name"), this._botName);
        param3.addElements(_loc4_);
    }
}
