import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';

export class TargetedOfferData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.catalog::TargetedOfferData'); }

    declare protected _id: number;
    static { (this.prototype as any)._id = 0; }

    declare protected _identifier: string;

    declare protected _type: number;
    static { (this.prototype as any)._type = 0; }

    declare protected _title: string;

    declare protected _description: string;

    declare protected _imageUrl: string;

    declare protected _iconImageUrl: string;

    declare protected _productCode: string;

    declare protected _purchaseLimit: number;
    static { (this.prototype as any)._purchaseLimit = 0; }

    declare protected _expirationTime: number;
    static { (this.prototype as any)._expirationTime = 0; }

    declare protected _priceInCredits: number;
    static { (this.prototype as any)._priceInCredits = 0; }

    declare protected _priceInActivityPoints: number;
    static { (this.prototype as any)._priceInActivityPoints = 0; }

    declare protected _activityPointType: number;
    static { (this.prototype as any)._activityPointType = 0; }

    declare protected _subProductCodes: string[];

    declare protected _trackingState: number;
    static { (this.prototype as any)._trackingState = 0; }

    constructor(param1: TargetedOfferData = null) {
        if (param1 != null) {
            this._id = param1.id;
            this._identifier = param1.identifier;
            this._type = param1.type;
            this._title = param1.title;
            this._description = param1.description;
            this._imageUrl = param1.imageUrl;
            this._iconImageUrl = param1.iconImageUrl;
            this._productCode = param1.productCode;
            this._purchaseLimit = param1.purchaseLimit;
            this._expirationTime = param1.expirationTime >>> 0;
            this._priceInCredits = param1.priceInCredits;
            this._priceInActivityPoints = param1.priceInActivityPoints;
            this._activityPointType = param1.activityPointType;
            this._subProductCodes = param1.subProductCodes;
            this._trackingState = param1.trackingState;
        }
    }

    public parse(param1: IMessageDataWrapper): TargetedOfferData {
        let _loc3_: number = 0;
        this._trackingState = param1.readInteger();
        this._id = param1.readInteger();
        this._identifier = param1.readString();
        this._productCode = param1.readString();
        this._priceInCredits = param1.readInteger();
        this._priceInActivityPoints = param1.readInteger();
        this._activityPointType = param1.readInteger();
        this._purchaseLimit = param1.readInteger();
        let _loc2_: number = param1.readInteger();
        this._expirationTime = (_loc2_ > 0 ? _loc2_ * 1000 + getTimer() : 0) >>> 0;
        this._title = param1.readString();
        this._description = param1.readString();
        this._imageUrl = param1.readString();
        this._iconImageUrl = param1.readString();
        this._type = param1.readInteger();
        this._subProductCodes = new Array<string>(0).fill(null);
        let _loc4_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc4_) {
            this._subProductCodes.push(param1.readString());
            _loc3_++;
        }
        return this;
    }

    public purchased(param1: number): void {
        this._purchaseLimit -= param1;
    }

    public get id(): number {
        return this._id;
    }

    public get identifier(): string {
        return this._identifier;
    }

    public get type(): number {
        return this._type;
    }

    public get title(): string {
        return this._title;
    }

    public get description(): string {
        return this._description;
    }

    public get imageUrl(): string {
        return this._imageUrl;
    }

    public get iconImageUrl(): string {
        return this._iconImageUrl;
    }

    public get productCode(): string {
        return this._productCode;
    }

    public get purchaseLimit(): number {
        return this._purchaseLimit;
    }

    public get expirationTime(): number {
        return this._expirationTime | 0;
    }

    public get priceInCredits(): number {
        return this._priceInCredits;
    }

    public get priceInActivityPoints(): number {
        return this._priceInActivityPoints;
    }

    public get activityPointType(): number {
        return this._activityPointType;
    }

    public get subProductCodes(): string[] {
        return this._subProductCodes;
    }

    public get trackingState(): number {
        return this._trackingState;
    }
}
