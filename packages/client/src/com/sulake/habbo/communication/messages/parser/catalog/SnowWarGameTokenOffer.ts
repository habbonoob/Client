import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class SnowWarGameTokenOffer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.catalog::SnowWarGameTokenOffer'); }

    constructor(param1: IMessageDataWrapper) {
        this._offerId = param1.readInteger();
        this._localizationId = param1.readString();
        this._priceInCredits = param1.readInteger();
        this._priceInActivityPoints = param1.readInteger();
        this._activityPointType = param1.readInteger();
        this._SafeStr_5614 = false;
    }

    declare private _localizationId: string;

    declare private _priceInCredits: number;
    static { (this.prototype as any)._priceInCredits = 0; }

    declare private _priceInActivityPoints: number;
    static { (this.prototype as any)._priceInActivityPoints = 0; }

    declare private _activityPointType: number;
    static { (this.prototype as any)._activityPointType = 0; }

    declare private _clubLevel: number;
    static { (this.prototype as any)._clubLevel = 0; }

    declare private _SafeStr_5614: boolean;
    static { (this.prototype as any)._SafeStr_5614 = false; }

    declare private _offerId: number;
    static { (this.prototype as any)._offerId = 0; }

    public get offerId(): number {
        return this._offerId;
    }

    public get localizationId(): string {
        return this._localizationId;
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

    public get clubLevel(): number {
        return this._clubLevel;
    }

    public get giftable(): boolean {
        return this._SafeStr_5614;
    }
}
