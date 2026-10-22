import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class WiredMenuErrorMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.userdefinedroomevents.wiredmenu::WiredMenuErrorMessageParser'); }

    public static _SafeStr_7544: number = 0;
    public static _SafeStr_8384: number = 1;
    public static _SafeStr_7955: number = 2;

    constructor() {
    }

    declare private _errorCode: number;
    static { (this.prototype as any)._errorCode = 0; }

    public get errorCode(): number {
        return this._errorCode;
    }

    public flush(): boolean {
        this._errorCode = 0;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._errorCode = param1.readShort();
        return true;
    }
}
