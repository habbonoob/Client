import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class ItemData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.engine::ItemData'); }

    private _id: number = 0;

    declare private _itemData: string;

    declare private _state: number;
    static { (this.prototype as any)._state = 0; }

    constructor(param1: number, param2: string) {
        this._id = param1;
        this._itemData = param2;
        let _loc3_: number = parseFloat(this._itemData);
        if (!isNaN(_loc3_)) {
            this._state = Number(this._itemData) | 0;
        }
    }

    public get id(): number {
        return this._id;
    }

    public get itemData(): string {
        return this._itemData;
    }

    public get state(): number {
        return this._state;
    }
}
