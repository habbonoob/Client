import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';

export class RoomWidgetChatTypingMessage extends RoomWidgetMessage {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.messages::RoomWidgetChatTypingMessage'); }

    public static readonly TYPING_STATUS: string = "RWCTM_TYPING_STATUS";

    constructor(param1: boolean) {
        super("RWCTM_TYPING_STATUS");
        this._isTyping = param1;
    }

    declare private _isTyping: boolean;
    static { (this.prototype as any)._isTyping = false; }

    public get isTyping(): boolean {
        return this._isTyping;
    }
}
