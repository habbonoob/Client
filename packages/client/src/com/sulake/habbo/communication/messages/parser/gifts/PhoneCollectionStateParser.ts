import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class PhoneCollectionStateParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.gifts::PhoneCollectionStateParser'); }

    constructor() {
    }

    declare private _phoneStatusCode: number;
    static { (this.prototype as any)._phoneStatusCode = 0; }

    declare private _collectionStatusCode: number;
    static { (this.prototype as any)._collectionStatusCode = 0; }

    declare private _millisecondsToAllowProcessReset: number;
    static { (this.prototype as any)._millisecondsToAllowProcessReset = 0; }

    public get phoneStatusCode(): number {
        return this._phoneStatusCode;
    }

    public get collectionStatusCode(): number {
        return this._collectionStatusCode;
    }

    public get millisecondsToAllowProcessReset(): number {
        return this._millisecondsToAllowProcessReset;
    }

    public flush(): boolean {
        this._phoneStatusCode = -1;
        this._millisecondsToAllowProcessReset = -1;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._phoneStatusCode = param1.readInteger();
        this._collectionStatusCode = param1.readInteger();
        this._millisecondsToAllowProcessReset = param1.readInteger();
        return true;
    }
}
