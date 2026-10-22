import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class CustomStackingHeightUpdateMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.furniture::CustomStackingHeightUpdateMessageParser'); }

    constructor() {
    }

    declare private _furniId: number;
    static { (this.prototype as any)._furniId = 0; }

    declare private _height: number;
    static { (this.prototype as any)._height = NaN; }

    public get height(): number {
        return this._height;
    }

    public get furniId(): number {
        return this._furniId;
    }

    public flush(): boolean {
        this._furniId = -1;
        this._height = 0;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._furniId = param1.readInteger();
        let _loc2_: number = param1.readInteger();
        this._height = _loc2_ / 100;
        return true;
    }
}
