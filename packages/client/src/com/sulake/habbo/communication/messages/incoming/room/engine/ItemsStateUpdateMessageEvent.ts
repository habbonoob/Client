import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { ItemsStateUpdateMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/engine/ItemsStateUpdateMessageParser';

export class ItemsStateUpdateMessageEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.engine::ItemsStateUpdateMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, ItemsStateUpdateMessageParser);
    }

    public getParser(): ItemsStateUpdateMessageParser {
        return this._parser instanceof ItemsStateUpdateMessageParser ? this._parser : null;
    }
}
