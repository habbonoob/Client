import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class SelfDonationResultMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.userdefinedroomevents.wiredtrading.misc::SelfDonationResultMessageParser'); }

    public static readonly _SafeStr_5833: number = 0;
    public static readonly _SafeStr_7895: number = 1;
    public static readonly _SafeStr_8627: number = 2;

    declare private _resultCode: number;
    static { (this.prototype as any)._resultCode = 0; }

    constructor() {
    }

    public get resultCode(): number {
        return this._resultCode;
    }

    public flush(): boolean {
        this._resultCode = -1;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._resultCode = param1.readInteger();
        return true;
    }
}
