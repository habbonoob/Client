import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { ObjectRemoveConfirmMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/engine/ObjectRemoveConfirmMessageParser';

export class ObjectRemoveConfirmMessageEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.engine::ObjectRemoveConfirmMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, ObjectRemoveConfirmMessageParser);
    }

    public getParser(): ObjectRemoveConfirmMessageParser {
        return this._parser instanceof ObjectRemoveConfirmMessageParser ? this._parser : null;
    }
}
