import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { ClaimItem } from '@/com/sulake/habbo/communication/messages/parser/collectibles/ClaimItem';

export class NftClaim {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.collectibles::NftClaim'); }

    declare private _claimId: string;

    declare private _status: number;
    static { (this.prototype as any)._status = 0; }

    declare private _claimedAmount: number;
    static { (this.prototype as any)._claimedAmount = 0; }

    declare private _SafeStr_6270: number;
    static { (this.prototype as any)._SafeStr_6270 = 0; }

    declare private _SafeStr_7176: number;
    static { (this.prototype as any)._SafeStr_7176 = NaN; }

    declare private _SafeStr_6235: number;
    static { (this.prototype as any)._SafeStr_6235 = NaN; }

    declare private _createdAt: number;
    static { (this.prototype as any)._createdAt = NaN; }

    declare private _SafeStr_7208: number;
    static { (this.prototype as any)._SafeStr_7208 = NaN; }

    declare private _SafeStr_6816: string;

    declare private _productCode: string;

    declare private _wallet: string;

    declare private _claimItem: ClaimItem;

    constructor(param1: IMessageDataWrapper) {
        this._claimId = param1.readString();
        this._status = param1.readInteger();
        this._claimedAmount = param1.readInteger();
        this._SafeStr_6270 = param1.readInteger();
        this._SafeStr_7176 = param1.readLong();
        this._SafeStr_6235 = param1.readLong();
        this._createdAt = param1.readLong();
        this._SafeStr_7208 = param1.readLong();
        this._SafeStr_6816 = param1.readString();
        this._productCode = param1.readString();
        this._wallet = param1.readString();
        this._claimItem = new ClaimItem(param1);
    }

    public get claimId(): string {
        return this._claimId;
    }

    public get status(): number {
        return this._status;
    }

    public get claimedAmount(): number {
        return this._claimedAmount;
    }

    public get claimLimit(): number {
        return this._SafeStr_6270;
    }

    public get validFrom(): number {
        return this._SafeStr_7176;
    }

    public get validTo(): number {
        return this._SafeStr_6235;
    }

    public get createdAt(): number {
        return this._createdAt;
    }

    public get updatedAt(): number {
        return this._SafeStr_7208;
    }

    public get collection(): string {
        return this._SafeStr_6816;
    }

    public get productCode(): string {
        return this._productCode;
    }

    public get wallet(): string {
        return this._wallet;
    }

    public get claimItem(): ClaimItem {
        return this._claimItem;
    }
}
