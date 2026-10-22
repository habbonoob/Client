import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { AvatarImagePreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/AvatarImagePreset';
import type { ButtonPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/ButtonPreset';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { TextInputPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/TextInputPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { AbstractBotAction } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/AbstractBotAction';
import { ActionTypeCodes } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/ActionTypeCodes';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { TextInputParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextInputParam';

export class BotChangeFigure extends AbstractBotAction {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.actiontypes::BotChangeFigure'); }

    private static readonly STRING_PARAM_DELIMITER: string = "\t";
    private _figureString: string = "";

    declare private _botName: TextInputPreset;

    declare private _SafeStr_5045: AvatarImagePreset;

    declare private _SafeStr_6225: ButtonPreset;

    constructor() {
        super();
    }

    public override get code(): number {
        return ActionTypeCodes.BOT_CHANGE_FIGURE;
    }

    public override readStringParamFromForm(): string {
        return this._botName.text + "\t" + this._figureString;
    }

    public override onEditStart(param1: Triggerable): void {
        let _loc3_: any[] = param1.stringParam.split("\t");
        let _loc2_: string = "";
        if (_loc3_.length > 0) {
            _loc2_ = stringOrNull(_loc3_[0]);
        }
        if (_loc3_.length > 1) {
            this._figureString = stringOrNull(_loc3_[1]);
        }
        this._botName.text = _loc2_;
        this._SafeStr_5045.figure = this._figureString;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        this._botName = param1.createTextInput(new TextInputParam("", 32, null, -1, null, true, this.loc("wiredfurni.tooltip.bot.name")));
        let _loc4_: SectionPreset = param1.createSection(this.l("bot.name"), this._botName);
        this._SafeStr_5045 = param1.createAvatarImagePreset();
        this._SafeStr_6225 = param1.createButton(this.l("capture.figure"), this.captureFigure);
        let _loc5_: SectionPreset = param1.createSection(this.l("capture.figure"), param1.createSimpleListView(true, [this._SafeStr_5045.alignCenter(), this._SafeStr_6225]));
        param3.addElements(_loc4_, _loc5_);
    }

    private captureFigure = (): void => {
        this._figureString = this.roomEvents.sessionDataManager.figure;
        this._SafeStr_5045.figure = this._figureString;
    };
}
