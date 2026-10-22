import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { ItemsChestContentsChunkMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/chests/ItemsChestContentsChunkMessageParser';

export class ItemsChestContentsChunkMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.userdefinedroomevents.wiredtrading.chests::ItemsChestContentsChunkMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, ItemsChestContentsChunkMessageParser);
    }

    public getParser(): ItemsChestContentsChunkMessageParser {
        return this._parser instanceof ItemsChestContentsChunkMessageParser ? this._parser : null;
    }
}
