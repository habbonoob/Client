import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';

export class FrontPageItem {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.catalog::FrontPageItem'); }

    public static readonly _SafeStr_7825: number = 0;
    public static readonly _SafeStr_7657: number = 1;
    public static readonly _SafeStr_7755: number = 2;

    declare private _type: number;
    static { (this.prototype as any)._type = 0; }

    declare private _position: number;
    static { (this.prototype as any)._position = 0; }

    declare private _itemName: string;

    declare private _itemPromoImage: string;

    declare private _cataloguePageLocation: string;

    declare private _productCode: string;

    declare private _productOfferID: number;
    static { (this.prototype as any)._productOfferID = 0; }

    declare private _expirationTime: number;
    static { (this.prototype as any)._expirationTime = 0; }

    constructor(param1: IMessageDataWrapper) {
        if (!param1) {
            return;
        }
        this._position = param1.readInteger();
        this._itemName = param1.readString();
        this._itemPromoImage = param1.readString();
        this._type = param1.readInteger();
        switch (this._type) {
            case 0:
                this._cataloguePageLocation = param1.readString();
                break;
            case 1:
                this._productOfferID = param1.readInteger();
                break;
            case 2:
                this._productCode = param1.readString();
        }
        let _loc2_: number = param1.readInteger();
        this._expirationTime = _loc2_ > 0 ? _loc2_ * 1000 + getTimer() : 0;
    }

    public get position(): number {
        return this._position;
    }

    public get itemName(): string {
        return this._itemName;
    }

    public get itemPromoImage(): string {
        return this._itemPromoImage;
    }

    public get cataloguePageLocation(): string {
        return this._cataloguePageLocation;
    }

    public get offerExpires(): boolean {
        return this._expirationTime > 0;
    }

    public get secondsToExpiration(): number {
        return this._expirationTime - getTimer();
    }

    public get type(): number {
        return this._type;
    }

    public get productCode(): string {
        return this._productCode;
    }

    public get productOfferID(): number {
        return this._productOfferID;
    }
}
