import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { ItemRemoveMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/engine/ItemRemoveMessageParser';

export class ItemRemoveMessageEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.engine::ItemRemoveMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, ItemRemoveMessageParser);
    }

    public getParser(): ItemRemoveMessageParser {
        return this._parser instanceof ItemRemoveMessageParser ? this._parser : null;
    }
}
