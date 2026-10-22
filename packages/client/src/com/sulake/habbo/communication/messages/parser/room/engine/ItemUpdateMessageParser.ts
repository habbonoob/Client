import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import type { ItemMessageData } from '@/com/sulake/habbo/communication/messages/incoming/room/engine/ItemMessageData';
import { ItemDataParser } from '@/com/sulake/habbo/communication/messages/parser/room/engine/ItemDataParser';

export class ItemUpdateMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.engine::ItemUpdateMessageParser'); }

    constructor() {
    }

    private _item: ItemMessageData = null;

    public get data(): ItemMessageData {
        let _loc1_: ItemMessageData = this._item;
        if (_loc1_ != null) {
            _loc1_.setReadOnly();
        }
        return _loc1_;
    }

    public flush(): boolean {
        this._item = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        if (param1 == null) {
            return false;
        }
        this._item = ItemDataParser.parseItemData(param1);
        return true;
    }
}
