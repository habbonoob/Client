import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { ObjectUpdateMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/engine/ObjectUpdateMessageParser';

export class ObjectUpdateMessageEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.engine::ObjectUpdateMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, ObjectUpdateMessageParser);
    }

    public getParser(): ObjectUpdateMessageParser {
        return this._parser instanceof ObjectUpdateMessageParser ? this._parser : null;
    }
}
