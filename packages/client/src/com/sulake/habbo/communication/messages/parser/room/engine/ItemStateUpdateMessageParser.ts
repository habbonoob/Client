import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class ItemStateUpdateMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.engine::ItemStateUpdateMessageParser'); }

    constructor() {
    }

    private _id: number = 0;

    declare private _itemData: string;

    declare private _state: number;
    static { (this.prototype as any)._state = 0; }

    public get id(): number {
        return this._id;
    }

    public get itemData(): string {
        return this._itemData;
    }

    public get state(): number {
        return this._state;
    }

    public flush(): boolean {
        this._id = 0;
        this._itemData = "";
        this._state = 0;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        if (param1 == null) {
            return false;
        }
        this._id = param1.readInteger();
        this._itemData = param1.readString();
        this._state = 0;
        let _loc2_: number = parseFloat(this._itemData);
        if (!isNaN(_loc2_)) {
            this._state = Number(this._itemData) | 0;
        }
        return true;
    }
}
