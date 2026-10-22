import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { AvatarInfoWidget } from '@/com/sulake/habbo/ui/widget/avatarinfo/AvatarInfoWidget';
import type { BotSkillConfigurationView } from '@/com/sulake/habbo/ui/widget/avatarinfo/botskills/BotSkillConfigurationView';
import type { Point } from '@habbo-pixi/runtime/geom/Point';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { BotCommandConfigurationEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/bots/BotCommandConfigurationEvent';
import { GetBotCommandConfigurationDataComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/bots/GetBotCommandConfigurationDataComposer';

export class BotSkillConfigurationViewBase implements BotSkillConfigurationView {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.avatarinfo.botskills::BotSkillConfigurationViewBase'); }

    constructor(param1: AvatarInfoWidget) {
        this._widget = param1;
    }

    declare protected _widget: AvatarInfoWidget;

    declare protected _window: IWindowContainer;

    declare protected _botId: number;
    static { (this.prototype as any)._botId = 0; }

    declare private _SafeStr_3783: IMessageEvent;

    public get disposed(): boolean {
        return this._widget == null;
    }

    protected get windowAssetName(): string {
        return "";
    }

    protected get skillType(): number {
        return -1;
    }

    public dispose(): void {
        if (this._window) {
            this._window.dispose();
            this._window = null;
        }
        if (this._widget) {
            if (this._widget.handler.container.connection && this._SafeStr_3783) {
                this._widget.handler.container.connection.removeMessageEvent(this._SafeStr_3783);
                this._SafeStr_3783 = null;
            }
            this._widget = null;
        }
        this._botId = -1;
    }

    public open(param1: number, param2: Point = null): void {
        let _loc3_: XML = null;
        let _loc4_: Rectangle = null;
        this._botId = param1;
        if (!this._SafeStr_3783) {
            this._SafeStr_3783 = new BotCommandConfigurationEvent(this.onBotCommandConfigurationEvent);
            this._widget.handler.container.connection.addMessageEvent(this._SafeStr_3783);
        }
        this._widget.handler.container.connection.send(new GetBotCommandConfigurationDataComposer(this._botId, this.skillType));
        if (!this._window) {
            _loc3_ = asInstanceOf(this._widget.assets.getAssetByName(this.windowAssetName).content, XML);
            this._window = asGuarded(this._widget.windowManager.buildFromXML(_loc3_, 1), isIWindowContainer);
        }
        if (param2) {
            _loc4_ = this._window.rectangle;
            this._window.x = param2.x - _loc4_.width / 2 | 0;
            this._window.y = param2.y - _loc4_.height | 0;
        }
        this.fitToScreen();
        this._window.visible = true;
        this.deactivateInputs();
    }

    public close(): void {
        if (this._window) {
            this._window.dispose();
            this._window = null;
        }
    }

    public parseConfiguration(param1: string): void {
    }

    protected deactivateInputs(): void {
    }

    private onBotCommandConfigurationEvent = (param1: BotCommandConfigurationEvent): void => {
        if (param1.getParser().botId == this._botId && param1.getParser().commandId == this.skillType) {
            this.parseConfiguration(param1.getParser().data);
        }
    };

    private fitToScreen(): void {
        let _loc1_: Rectangle = new Rectangle();
        this._window.getGlobalRectangle(_loc1_);
        if (_loc1_.top < 0) {
            this._window.y += -_loc1_.top;
        }
        if (_loc1_.left < 0) {
            this._window.x += -_loc1_.left;
        }
        if (_loc1_.right > this._window.desktop.width) {
            this._window.x -= _loc1_.right - this._window.desktop.width;
        }
        if (_loc1_.bottom > this._window.desktop.height) {
            this._window.y -= _loc1_.bottom - this._window.desktop.height;
        }
    }

    get [IDisposable](): true {
        return true;
    }
}
