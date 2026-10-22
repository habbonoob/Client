import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { ObjectsMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/engine/ObjectsMessageParser';

export class ObjectsMessageEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.engine::ObjectsMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, ObjectsMessageParser);
    }

    public getParser(): ObjectsMessageParser {
        return this._parser instanceof ObjectsMessageParser ? this._parser : null;
    }
}
