import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class CreditVaultStatusMessageEventParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.vault::CreditVaultStatusMessageEventParser'); }

    declare private _isUnlocked: boolean;
    static { (this.prototype as any)._isUnlocked = false; }

    declare private _totalBalance: number;
    static { (this.prototype as any)._totalBalance = 0; }

    declare private _withdrawBalance: number;
    static { (this.prototype as any)._withdrawBalance = 0; }

    constructor() {
    }

    public get isUnlocked(): boolean {
        return this._isUnlocked;
    }

    public get totalBalance(): number {
        return this._totalBalance;
    }

    public get withdrawBalance(): number {
        return this._withdrawBalance;
    }

    public flush(): boolean {
        this._isUnlocked = false;
        this._totalBalance = 0;
        this._withdrawBalance = 0;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._isUnlocked = param1.readBoolean();
        this._totalBalance = param1.readInteger();
        this._withdrawBalance = param1.readInteger();
        return true;
    }
}
