import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class OneWayDoorStatusMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.furniture::OneWayDoorStatusMessageParser'); }

    constructor() {
    }

    declare private _id: number;
    static { (this.prototype as any)._id = 0; }

    declare private _status: number;
    static { (this.prototype as any)._status = 0; }

    public get status(): number {
        return this._status;
    }

    public get id(): number {
        return this._id;
    }

    public flush(): boolean {
        this._id = -1;
        this._status = 0;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        if (param1 == null) {
            return false;
        }
        this._id = param1.readInteger();
        this._status = param1.readInteger();
        return true;
    }
}
