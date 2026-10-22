import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class WiredContractUpdateResultMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.userdefinedroomevents.wiredtrading.contracts::WiredContractUpdateResultMessageParser'); }

    constructor() {
    }

    declare private _contractId: number;
    static { (this.prototype as any)._contractId = 0; }

    declare private _isSuccess: boolean;
    static { (this.prototype as any)._isSuccess = false; }

    declare private _failCode: string;

    public get contractId(): number {
        return this._contractId;
    }

    public get isSuccess(): boolean {
        return this._isSuccess;
    }

    public get failCode(): string {
        return this._failCode;
    }

    public flush(): boolean {
        this._contractId = 0;
        this._isSuccess = false;
        this._failCode = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._contractId = param1.readInteger();
        this._isSuccess = param1.readBoolean();
        this._failCode = param1.readString();
        return true;
    }
}
