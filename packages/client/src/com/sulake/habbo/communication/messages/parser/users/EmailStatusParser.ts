import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class EmailStatusParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.users::EmailStatusParser'); }

    constructor() {
    }

    declare private _email: string;

    declare private _isVerified: boolean;
    static { (this.prototype as any)._isVerified = false; }

    declare private _allowChange: boolean;
    static { (this.prototype as any)._allowChange = false; }

    public get email(): string {
        return this._email;
    }

    public get isVerified(): boolean {
        return this._isVerified;
    }

    public get allowChange(): boolean {
        return this._allowChange;
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._email = param1.readString();
        this._isVerified = param1.readBoolean();
        this._allowChange = param1.readBoolean();
        return true;
    }
}
