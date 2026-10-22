import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { ItemAddMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/engine/ItemAddMessageParser';

export class ItemAddMessageEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.engine::ItemAddMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, ItemAddMessageParser);
    }

    public getParser(): ItemAddMessageParser {
        return this._parser instanceof ItemAddMessageParser ? this._parser : null;
    }
}
