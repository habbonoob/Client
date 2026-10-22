import { castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { AvatarInfoWidget } from '@/com/sulake/habbo/ui/widget/avatarinfo/AvatarInfoWidget';
import type { Point } from '@habbo-pixi/runtime/geom/Point';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { CommandBotComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/bots/CommandBotComposer';
import { BotSkillConfigurationViewBase } from '@/com/sulake/habbo/ui/widget/avatarinfo/botskills/BotSkillConfigurationViewBase';

export class BotChangeNameConfiguration extends BotSkillConfigurationViewBase {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.avatarinfo.botskills::BotChangeNameConfiguration'); }

    constructor(param1: AvatarInfoWidget) {
        super(param1);
    }

    private _newName: string = "";

    protected override get windowAssetName(): string {
        return "name_configuration_xml";
    }

    protected override get skillType(): number {
        return 5;
    }

    private set nameInput(param1: string) {
        this._newName = param1;
        let _loc2_: ITextWindow = castGuarded(this._window.findChildByName("name_input"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
        _loc2_.text = this._newName;
        _loc2_.activate();
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
        this.nameInput = param1;
    }

    protected override deactivateInputs(): void {
        this._window.findChildByName("name_input").deactivate();
    }

    private procedure = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK") {
            switch (param2.name) {
                case "save_button":
                    this._widget.handler.container.connection.send(new CommandBotComposer(this._botId, 5, this._newName));
                    this.close();
                    break;
                case "cancel_button":
                    this.close();
            }
        }
        if (param1.type == "WKE_KEY_UP") {
            this._newName = castGuarded(this._window.findChildByName("name_input"), isITextWindow, "com.sulake.core.window.components.ITextWindow").text;
        }
    };
}
