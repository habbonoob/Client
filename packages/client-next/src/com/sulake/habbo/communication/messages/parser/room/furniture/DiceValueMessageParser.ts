import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class DiceValueMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.furniture::DiceValueMessageParser'); }

    declare private _id: number;
    static { (this.prototype as any)._id = 0; }

    declare private _value: number;
    static { (this.prototype as any)._value = 0; }

    constructor() {
    }

    public get id(): number {
        return this._id;
    }

    public get value(): number {
        return this._value;
    }

    public flush(): boolean {
        this._id = -1;
        this._value = 0;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        if (param1 == null) {
            return false;
        }
        this._id = param1.readInteger();
        this._value = param1.readInteger();
        return true;
    }
}
