import { castGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ICheckBoxWindow } from '@/com/sulake/core/window/components/ICheckBoxWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { AvatarInfoWidget } from '@/com/sulake/habbo/ui/widget/avatarinfo/AvatarInfoWidget';
import type { Point } from '@habbo-pixi/runtime/geom/Point';
import { isICheckBoxWindow } from '@/com/sulake/core/window/components/ICheckBoxWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { CommandBotComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/bots/CommandBotComposer';
import { BotSkillConfigurationViewBase } from '@/com/sulake/habbo/ui/widget/avatarinfo/botskills/BotSkillConfigurationViewBase';
import { HabboWebTools } from '@/com/sulake/habbo/utils/HabboWebTools';

export class BotChatterMarkovConfiguration extends BotSkillConfigurationViewBase {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.avatarinfo.botskills::BotChatterMarkovConfiguration'); }

    private static sanitizeBotChatString(param1: string): string {
        let _loc2_: any = param1;
        return stringOrNull(_loc2_.replace(/;#;/g, " "));
    }

    constructor(param1: AvatarInfoWidget) {
        super(param1);
    }

    protected override get windowAssetName(): string {
        return "chatter_configuration_xml";
    }

    protected override get skillType(): number {
        return 2;
    }

    private get text(): string {
        return castGuarded(this._window.findChildByName("chat_text"), isITextWindow, "com.sulake.core.window.components.ITextWindow").text;
    }

    private set text(param1: string) {
        let _loc2_: ITextWindow = castGuarded(this._window.findChildByName("chat_text"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
        _loc2_.text = param1;
        _loc2_.activate();
    }

    private get autoChat(): boolean {
        return castGuarded(this._window.findChildByName("auto_chat_checkbox"), isICheckBoxWindow, "com.sulake.core.window.components.ICheckBoxWindow").isSelected;
    }

    private set autoChat(param1: boolean) {
        let _loc2_: ICheckBoxWindow = castGuarded(this._window.findChildByName("auto_chat_checkbox"), isICheckBoxWindow, "com.sulake.core.window.components.ICheckBoxWindow");
        _loc2_.isSelected = param1;
        _loc2_.activate();
    }

    private get markovEnabled(): boolean {
        return castGuarded(this._window.findChildByName("markov_checkbox"), isICheckBoxWindow, "com.sulake.core.window.components.ICheckBoxWindow").isSelected;
    }

    private set markovEnabled(param1: boolean) {
        let _loc2_: ICheckBoxWindow = castGuarded(this._window.findChildByName("markov_checkbox"), isICheckBoxWindow, "com.sulake.core.window.components.ICheckBoxWindow");
        _loc2_.isSelected = param1;
        _loc2_.activate();
    }

    private get chatDelay(): number {
        return Number(castGuarded(this._window.findChildByName("chat_delay_text"), isITextWindow, "com.sulake.core.window.components.ITextWindow").text) | 0;
    }

    private set chatDelay(param1: number) {
        let _loc2_: ITextWindow = castGuarded(this._window.findChildByName("chat_delay_text"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
        _loc2_.text = param1.toString();
        _loc2_.activate();
    }

    private get botCommandString(): string {
        return BotChatterMarkovConfiguration.sanitizeBotChatString(this.text) + ";#;" + this.autoChat + ";#;" + this.chatDelay + ";#;" + this.markovEnabled;
    }

    public override dispose(): void {
        this.close();
        super.dispose();
    }

    public override open(param1: number, param2: Point = null): void {
        super.open(param1, param2);
        this._window.procedure = this.procedure;
    }

    public override parseConfiguration(param1: string): void {
        let _loc2_: any[] = null;
        if (param1.indexOf(";#;") == -1) {
            _loc2_ = param1.split(";");
        } else {
            _loc2_ = param1.split(";#;");
        }
        if (_loc2_.length == 3 && this._window) {
            this.text = stringOrNull(_loc2_[0]);
            this.autoChat = String(_loc2_[1]).toLowerCase() == "true" || _loc2_[1] == "1";
            this.chatDelay = _loc2_[2] | 0;
            this.markovEnabled = false;
        } else if (_loc2_.length == 4 && this._window) {
            this.text = stringOrNull(_loc2_[0]);
            this.autoChat = String(_loc2_[1]).toLowerCase() == "true" || _loc2_[1] == "1";
            this.chatDelay = _loc2_[2] | 0;
            this.markovEnabled = String(_loc2_[3]).toLowerCase() == "true" || _loc2_[3] == "1";
        }
    }

    protected override deactivateInputs(): void {
        this._window.findChildByName("chat_text").deactivate();
        this._window.findChildByName("auto_chat_checkbox").deactivate();
        this._window.findChildByName("markov_checkbox").deactivate();
        this._window.findChildByName("chat_delay_text").deactivate();
    }

    private procedure = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK") {
            switch (param2.name) {
                case "save_button":
                    this._widget.handler.container.connection.send(new CommandBotComposer(this._botId, 2, this.botCommandString));
                    this.close();
                    break;
                case "cancel_button":
                    this.close();
                    break;
                case "help_link":
                    HabboWebTools.navigateToURL(this._widget.configuration.getProperty("link.format.bots.help"), "habboMain");
            }
        }
    };
}
