import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class InfoHotelClosingMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.availability::InfoHotelClosingMessageParser'); }

    declare private _minutesUntilClosing: number;
    static { (this.prototype as any)._minutesUntilClosing = 0; }

    constructor() {
    }

    public get minutesUntilClosing(): number {
        return this._minutesUntilClosing;
    }

    public flush(): boolean {
        this._minutesUntilClosing = 0;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._minutesUntilClosing = param1.readInteger();
        return true;
    }
}
