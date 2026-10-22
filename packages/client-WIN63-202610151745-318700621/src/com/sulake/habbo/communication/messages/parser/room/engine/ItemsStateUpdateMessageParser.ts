import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { ItemData } from '@/com/sulake/habbo/communication/messages/incoming/room/engine/ItemData';

export class ItemsStateUpdateMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.engine::ItemsStateUpdateMessageParser'); }

    private _items: any[] = [];

    constructor() {
    }

    public get itemCount(): number {
        return this._items.length | 0;
    }

    public getItemData(param1: number): ItemData {
        if (param1 < 0 || param1 >= this.itemCount) {
            return null;
        }
        return this._items[param1];
    }

    public flush(): boolean {
        this._items = [];
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc4_: number = 0;
        let _loc5_: number = 0;
        let _loc2_: string = null;
        if (param1 == null) {
            return false;
        }
        let _loc3_: number = param1.readInteger();
        _loc4_ = 0;
        while (_loc4_ < _loc3_) {
            _loc5_ = param1.readInteger();
            _loc2_ = param1.readString();
            this._items.push(new ItemData(_loc5_, _loc2_));
            _loc4_++;
        }
        return true;
    }
}
