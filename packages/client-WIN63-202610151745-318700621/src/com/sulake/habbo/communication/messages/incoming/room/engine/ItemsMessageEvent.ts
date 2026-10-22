import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { ItemsMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/engine/ItemsMessageParser';

export class ItemsMessageEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.engine::ItemsMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, ItemsMessageParser);
    }

    public getParser(): ItemsMessageParser {
        return this._parser instanceof ItemsMessageParser ? this._parser : null;
    }
}
