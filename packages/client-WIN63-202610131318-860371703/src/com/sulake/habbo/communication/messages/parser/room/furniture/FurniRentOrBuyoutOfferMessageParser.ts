import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class FurniRentOrBuyoutOfferMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.furniture::FurniRentOrBuyoutOfferMessageParser'); }

    declare private _isWallItem: boolean;
    static { (this.prototype as any)._isWallItem = false; }

    declare private _furniTypeName: string;

    declare private _SafeStr_6740: boolean;
    static { (this.prototype as any)._SafeStr_6740 = false; }

    declare private _priceInCredits: number;
    static { (this.prototype as any)._priceInCredits = 0; }

    declare private _priceInActivityPoints: number;
    static { (this.prototype as any)._priceInActivityPoints = 0; }

    declare private _activityPointType: number;
    static { (this.prototype as any)._activityPointType = 0; }

    constructor() {
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._isWallItem = param1.readBoolean();
        this._furniTypeName = param1.readString();
        this._SafeStr_6740 = param1.readBoolean();
        this._priceInCredits = param1.readInteger();
        this._priceInActivityPoints = param1.readInteger();
        this._activityPointType = param1.readInteger();
        return true;
    }

    public get isWallItem(): boolean {
        return this._isWallItem;
    }

    public get furniTypeName(): string {
        return this._furniTypeName;
    }

    public get buyout(): boolean {
        return this._SafeStr_6740;
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
}
