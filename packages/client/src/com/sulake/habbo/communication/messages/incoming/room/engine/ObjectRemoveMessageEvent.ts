import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { ObjectRemoveMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/engine/ObjectRemoveMessageParser';

export class ObjectRemoveMessageEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.engine::ObjectRemoveMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, ObjectRemoveMessageParser);
    }

    public getParser(): ObjectRemoveMessageParser {
        return this._parser instanceof ObjectRemoveMessageParser ? this._parser : null;
    }
}
