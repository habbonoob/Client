import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { ClaimItem } from '@/com/sulake/habbo/communication/messages/parser/collectibles/ClaimItem';

export class NftClaim {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.collectibles::NftClaim'); }

    constructor(param1: IMessageDataWrapper) {
        this._claimId = param1.readString();
        this._status = param1.readInteger();
        this._claimedAmount = param1.readInteger();
        this._claimLimit = param1.readInteger();
        this._validFrom = param1.readLong();
        this._validTo = param1.readLong();
        this._createdAt = param1.readLong();
        this._updatedAt = param1.readLong();
        this._collection = param1.readString();
        this._productCode = param1.readString();
        this._wallet = param1.readString();
        this._claimItem = new ClaimItem(param1);
    }

    declare private _claimId: string;

    declare private _claimedAmount: number;
    static { (this.prototype as any)._claimedAmount = 0; }

    declare private _claimLimit: number;
    static { (this.prototype as any)._claimLimit = 0; }

    declare private _validFrom: number;
    static { (this.prototype as any)._validFrom = NaN; }

    declare private _validTo: number;
    static { (this.prototype as any)._validTo = NaN; }

    declare private _createdAt: number;
    static { (this.prototype as any)._createdAt = NaN; }

    declare private _updatedAt: number;
    static { (this.prototype as any)._updatedAt = NaN; }

    declare private _collection: string;

    declare private _wallet: string;

    declare private _claimItem: ClaimItem;

    declare private _status: number;
    static { (this.prototype as any)._status = 0; }

    public get status(): number {
        return this._status;
    }

    declare private _productCode: string;

    public get productCode(): string {
        return this._productCode;
    }

    public get claimId(): string {
        return this._claimId;
    }

    public get claimedAmount(): number {
        return this._claimedAmount;
    }

    public get claimLimit(): number {
        return this._claimLimit;
    }

    public get validFrom(): number {
        return this._validFrom;
    }

    public get validTo(): number {
        return this._validTo;
    }

    public get createdAt(): number {
        return this._createdAt;
    }

    public get updatedAt(): number {
        return this._updatedAt;
    }

    public get collection(): string {
        return this._collection;
    }

    public get wallet(): string {
        return this._wallet;
    }

    public get claimItem(): ClaimItem {
        return this._claimItem;
    }
}
