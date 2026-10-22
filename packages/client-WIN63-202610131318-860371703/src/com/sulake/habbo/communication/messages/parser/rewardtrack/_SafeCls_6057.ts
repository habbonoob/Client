import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class _SafeCls_6057 {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.rewardtrack::_SafeCls_6057'); }

    declare private _id: string;

    declare private _SafeStr_14096: number;
    static { (this.prototype as any)._SafeStr_14096 = 0; }

    declare private _productItemTypeId: number;
    static { (this.prototype as any)._productItemTypeId = 0; }

    declare private _SafeStr_7136: string;

    declare private _extraParams: string;

    declare private _rewardAmount: number;
    static { (this.prototype as any)._rewardAmount = 0; }

    declare private _SafeStr_14092: boolean;
    static { (this.prototype as any)._SafeStr_14092 = false; }

    declare private _SafeStr_4012: boolean;
    static { (this.prototype as any)._SafeStr_4012 = false; }

    declare private _SafeStr_14097: boolean;
    static { (this.prototype as any)._SafeStr_14097 = false; }

    constructor(param1: IMessageDataWrapper) {
        this._id = param1.readString();
        this._SafeStr_14096 = param1.readInteger();
        this._productItemTypeId = param1.readShort();
        this._SafeStr_7136 = param1.readString();
        this._extraParams = param1.readString();
        this._rewardAmount = param1.readInteger();
        this._SafeStr_14092 = param1.readBoolean();
        this._SafeStr_4012 = param1.readBoolean();
        this._SafeStr_14097 = param1.readBoolean();
    }

    public get id(): string {
        return this._id;
    }

    public get requiredPoints(): number {
        return this._SafeStr_14096;
    }

    public get productItemTypeId(): number {
        return this._productItemTypeId;
    }

    public get rewardTypeId(): string {
        return this._SafeStr_7136;
    }

    public get extraParams(): string {
        return this._extraParams;
    }

    public get rewardAmount(): number {
        return this._rewardAmount;
    }

    public get premium(): boolean {
        return this._SafeStr_14092;
    }

    public get available(): boolean {
        return this._SafeStr_4012;
    }

    public get claimed(): boolean {
        return this._SafeStr_14097;
    }
}
