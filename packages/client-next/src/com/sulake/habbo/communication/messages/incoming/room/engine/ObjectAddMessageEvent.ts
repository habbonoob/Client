import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { ObjectAddMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/engine/ObjectAddMessageParser';

export class ObjectAddMessageEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.engine::ObjectAddMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, ObjectAddMessageParser);
    }

    public getParser(): ObjectAddMessageParser {
        return this._parser instanceof ObjectAddMessageParser ? this._parser : null;
    }
}
