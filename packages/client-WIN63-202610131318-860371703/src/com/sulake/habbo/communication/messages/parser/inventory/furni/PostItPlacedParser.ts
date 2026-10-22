import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class PostItPlacedParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.inventory.furni::PostItPlacedParser'); }

    declare private _id: number;
    static { (this.prototype as any)._id = 0; }

    declare private _itemsLeft: number;
    static { (this.prototype as any)._itemsLeft = 0; }

    constructor() {
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._id = param1.readInteger();
        this._itemsLeft = param1.readInteger();
        return true;
    }

    public flush(): boolean {
        return true;
    }

    public get id(): number {
        return this._id;
    }

    public get itemsLeft(): number {
        return this._itemsLeft;
    }
}
