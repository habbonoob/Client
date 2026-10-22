import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { OpenConnectionMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/session/OpenConnectionMessageParser';

export class OpenConnectionMessageEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.session::OpenConnectionMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, OpenConnectionMessageParser);
    }

    public getParser(): OpenConnectionMessageParser {
        return this._parser instanceof OpenConnectionMessageParser ? this._parser : null;
    }
}
