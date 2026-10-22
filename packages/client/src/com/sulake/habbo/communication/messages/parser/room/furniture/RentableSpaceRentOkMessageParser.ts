import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class RentableSpaceRentOkMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.furniture::RentableSpaceRentOkMessageParser'); }

    constructor() {
    }

    declare private _expiryTime: number;
    static { (this.prototype as any)._expiryTime = 0; }

    public get expiryTime(): number {
        return this._expiryTime;
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._expiryTime = param1.readInteger();
        return true;
    }
}
