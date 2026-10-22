import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class CollectibleItemClaim {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.collectibles::CollectibleItemClaim'); }

    public static _SafeStr_7386: number = 0;
    public static _SafeStr_8305: number = 1;

    declare private _claimId: string;

    declare private _claimedAmount: number;
    static { (this.prototype as any)._claimedAmount = 0; }

    declare private _SafeStr_6270: number;
    static { (this.prototype as any)._SafeStr_6270 = 0; }

    declare private _status: number;
    static { (this.prototype as any)._status = 0; }

    constructor(param1: IMessageDataWrapper) {
        this._claimId = param1.readString();
        this._claimedAmount = param1.readInteger();
        this._SafeStr_6270 = param1.readInteger();
        this._status = param1.readShort();
    }

    public get claimId(): string {
        return this._claimId;
    }

    public get claimedAmount(): number {
        return this._claimedAmount;
    }

    public set claimedAmount(param1: number) {
        this._claimedAmount = param1;
    }

    public get claimLimit(): number {
        return this._SafeStr_6270;
    }

    public get status(): number {
        return this._status;
    }
}
