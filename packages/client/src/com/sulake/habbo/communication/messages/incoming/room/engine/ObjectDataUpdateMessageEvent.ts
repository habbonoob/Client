import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { ObjectDataUpdateMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/engine/ObjectDataUpdateMessageParser';

export class ObjectDataUpdateMessageEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.engine::ObjectDataUpdateMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, ObjectDataUpdateMessageParser);
    }

    public getParser(): ObjectDataUpdateMessageParser {
        return this._parser instanceof ObjectDataUpdateMessageParser ? this._parser : null;
    }
}
