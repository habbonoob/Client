import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';

export class RoomWidgetChatMessage extends RoomWidgetMessage {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.messages::RoomWidgetChatMessage'); }

    public static readonly WIDGET_MESSAGE_CHAT: string = "RWCM_MESSAGE_CHAT";
    public static readonly CHAT_TYPE_SPEAK: number = 0;
    public static readonly CHAT_TYPE_WHISPER: number = 1;
    public static readonly CHAT_TYPE_SHOUT: number = 2;
    private _chatType: number = 0;
    private _text: string = "";
    private _recipientName: string = "";

    declare private _styleId: number;
    static { (this.prototype as any)._styleId = 0; }

    constructor(param1: string, param2: string, param3: number = 0, param4: string = "", param5: number = 0) {
        super(param1);
        this._text = param2;
        this._chatType = param3;
        this._recipientName = param4;
        this._styleId = param5;
    }

    public get chatType(): number {
        return this._chatType;
    }

    public get text(): string {
        return this._text;
    }

    public get recipientName(): string {
        return this._recipientName;
    }

    public get styleId(): number {
        return this._styleId;
    }
}
