import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { ObjectRemoveMultipleMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/engine/ObjectRemoveMultipleMessageParser';

export class ObjectRemoveMultipleMessageEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.engine::ObjectRemoveMultipleMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, ObjectRemoveMultipleMessageParser);
    }

    public getParser(): ObjectRemoveMultipleMessageParser {
        return this._parser instanceof ObjectRemoveMultipleMessageParser ? this._parser : null;
    }
}
