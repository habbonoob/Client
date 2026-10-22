import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { FlatAccessibleMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/session/FlatAccessibleMessageParser';

export class FlatAccessibleMessageEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.session::FlatAccessibleMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, FlatAccessibleMessageParser);
    }

    public getParser(): FlatAccessibleMessageParser {
        return this._parser instanceof FlatAccessibleMessageParser ? this._parser : null;
    }
}
