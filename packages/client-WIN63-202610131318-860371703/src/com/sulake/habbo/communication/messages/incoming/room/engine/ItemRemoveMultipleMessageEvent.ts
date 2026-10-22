import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { ItemRemoveMultipleMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/engine/ItemRemoveMultipleMessageParser';

export class ItemRemoveMultipleMessageEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.engine::ItemRemoveMultipleMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, ItemRemoveMultipleMessageParser);
    }

    public getParser(): ItemRemoveMultipleMessageParser {
        return this._parser instanceof ItemRemoveMultipleMessageParser ? this._parser : null;
    }
}
