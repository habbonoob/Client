import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class WiredTransactionInfo {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.userdefinedroomevents.wiredtrading.transactions::WiredTransactionInfo'); }

    public static _SafeStr_8354: number = 0;
    public static _SafeStr_7781: number = 1;
    public static _SafeStr_8774: number = 2;
    public static _SafeStr_8724: number = 3;
    public static _SafeStr_8038: number = 4;

    declare private _transactionId: number;
    static { (this.prototype as any)._transactionId = NaN; }

    declare private _flatId: number;
    static { (this.prototype as any)._flatId = 0; }

    declare private _SafeStr_6272: number;
    static { (this.prototype as any)._SafeStr_6272 = 0; }

    declare private _SafeStr_5972: string;

    declare private _userId: number;
    static { (this.prototype as any)._userId = 0; }

    declare private _userName: string;

    declare private _SafeStr_5424: number;
    static { (this.prototype as any)._SafeStr_5424 = NaN; }

    declare private _readableTimestamp: string;

    declare private _chestCount: number;
    static { (this.prototype as any)._chestCount = 0; }

    declare private _withdrawFurniCount: number;
    static { (this.prototype as any)._withdrawFurniCount = 0; }

    declare private _depositFurniCount: number;
    static { (this.prototype as any)._depositFurniCount = 0; }

    declare private _withdrawCoinsCount: number;
    static { (this.prototype as any)._withdrawCoinsCount = 0; }

    declare private _depositCoinsCount: number;
    static { (this.prototype as any)._depositCoinsCount = 0; }

    constructor(param1: IMessageDataWrapper) {
        this._transactionId = param1.readLong();
        this._flatId = param1.readInteger();
        this._SafeStr_6272 = param1.readInteger();
        this._SafeStr_5972 = param1.readString();
        this._userId = param1.readInteger();
        this._userName = param1.readString();
        this._SafeStr_5424 = param1.readLong();
        this._readableTimestamp = param1.readString();
        this._chestCount = param1.readInteger();
        this._withdrawFurniCount = param1.readInteger();
        this._depositFurniCount = param1.readInteger();
        this._withdrawCoinsCount = param1.readInteger();
        this._depositCoinsCount = param1.readInteger();
    }

    public get transactionId(): number {
        return this._transactionId;
    }

    public get flatId(): number {
        return this._flatId;
    }

    public get transactionType(): number {
        return this._SafeStr_6272;
    }

    public get transactionDefinitionInfo(): string {
        return this._SafeStr_5972;
    }

    public get userId(): number {
        return this._userId;
    }

    public get userName(): string {
        return this._userName;
    }

    public get timestamp(): number {
        return this._SafeStr_5424;
    }

    public get readableTimestamp(): string {
        return this._readableTimestamp;
    }

    public get chestCount(): number {
        return this._chestCount;
    }

    public get withdrawFurniCount(): number {
        return this._withdrawFurniCount;
    }

    public get depositFurniCount(): number {
        return this._depositFurniCount;
    }

    public get withdrawCoinsCount(): number {
        return this._withdrawCoinsCount;
    }

    public get depositCoinsCount(): number {
        return this._depositCoinsCount;
    }
}
