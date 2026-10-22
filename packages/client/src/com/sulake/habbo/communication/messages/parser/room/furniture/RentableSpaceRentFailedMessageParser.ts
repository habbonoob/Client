import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class RentableSpaceRentFailedMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.furniture::RentableSpaceRentFailedMessageParser'); }

    constructor() {
    }

    declare private _reason: number;
    static { (this.prototype as any)._reason = 0; }

    public get reason(): number {
        return this._reason;
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._reason = param1.readInteger();
        return true;
    }
}
