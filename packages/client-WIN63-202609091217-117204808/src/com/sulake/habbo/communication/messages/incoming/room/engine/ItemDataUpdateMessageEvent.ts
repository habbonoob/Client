import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { ItemDataUpdateMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/engine/ItemDataUpdateMessageParser';

export class ItemDataUpdateMessageEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.engine::ItemDataUpdateMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, ItemDataUpdateMessageParser);
    }

    public getParser(): ItemDataUpdateMessageParser {
        return this._parser instanceof ItemDataUpdateMessageParser ? this._parser : null;
    }
}
