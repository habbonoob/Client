import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class InfoHotelClosedMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.availability::InfoHotelClosedMessageParser'); }

    constructor() {
    }

    declare private _openHour: number;
    static { (this.prototype as any)._openHour = 0; }

    declare private _openMinute: number;
    static { (this.prototype as any)._openMinute = 0; }

    declare private _userThrownOutAtClose: boolean;
    static { (this.prototype as any)._userThrownOutAtClose = false; }

    public get openHour(): number {
        return this._openHour;
    }

    public get openMinute(): number {
        return this._openMinute;
    }

    public get userThrownOutAtClose(): boolean {
        return this._userThrownOutAtClose;
    }

    public flush(): boolean {
        this._openHour = 0;
        this._openMinute = 0;
        this._userThrownOutAtClose = false;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._openHour = param1.readInteger();
        this._openMinute = param1.readInteger();
        this._userThrownOutAtClose = param1.readBoolean();
        return true;
    }
}
