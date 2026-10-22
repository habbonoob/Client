import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import type { ItemMessageData } from '@/com/sulake/habbo/communication/messages/incoming/room/engine/ItemMessageData';
import { _SafeCls_2063 } from '@/com/sulake/habbo/communication/messages/parser/room/engine/_SafeCls_2063';

export class ItemUpdateMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.engine::ItemUpdateMessageParser'); }

    private _item: ItemMessageData = null;

    constructor() {
    }

    public flush(): boolean {
        this._item = null;
        return true;
    }

    public get data(): ItemMessageData {
        let _loc1_: ItemMessageData = this._item;
        if (_loc1_ != null) {
            _loc1_.setReadOnly();
        }
        return _loc1_;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        if (param1 == null) {
            return false;
        }
        this._item = _SafeCls_2063.parseItemData(param1);
        return true;
    }
}
