import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { CloseConnectionMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/session/CloseConnectionMessageParser';

export class CloseConnectionMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.session::CloseConnectionMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, CloseConnectionMessageParser);
    }

    public getParser(): CloseConnectionMessageParser {
        return this._parser instanceof CloseConnectionMessageParser ? this._parser : null;
    }
}
