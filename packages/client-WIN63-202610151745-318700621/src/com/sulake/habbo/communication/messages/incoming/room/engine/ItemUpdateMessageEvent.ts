import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { ItemUpdateMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/engine/ItemUpdateMessageParser';

export class ItemUpdateMessageEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.engine::ItemUpdateMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, ItemUpdateMessageParser);
    }

    public getParser(): ItemUpdateMessageParser {
        return this._parser instanceof ItemUpdateMessageParser ? this._parser : null;
    }
}
