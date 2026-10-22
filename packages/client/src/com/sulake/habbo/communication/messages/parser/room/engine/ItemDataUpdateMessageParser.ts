import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class ItemDataUpdateMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.engine::ItemDataUpdateMessageParser'); }

    constructor() {
    }

    private _id: number = 0;

    declare private _itemData: string;

    public get id(): number {
        return this._id;
    }

    public get itemData(): string {
        return this._itemData;
    }

    public flush(): boolean {
        this._id = 0;
        this._itemData = "";
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        if (param1 == null) {
            return false;
        }
        let _loc2_: string = param1.readString();
        this._id = Number(_loc2_) | 0;
        this._itemData = param1.readString();
        return true;
    }
}
