import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { CollectibleBaseItem } from '@/com/sulake/habbo/communication/messages/parser/collectibles/CollectibleBaseItem';

export class NftStoreOffer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.collectibles::NftStoreOffer'); }

    constructor(param1: IMessageDataWrapper) {
        this._productCode = param1.readString();
        this._emeraldPrice = param1.readInteger();
        this._isFeatured = param1.readBoolean();
        this._isLimited = param1.readBoolean();
        this._mintLimit = param1.readInteger();
        this._mintedCount = param1.readInteger();
        this._productInfo = new CollectibleBaseItem(param1);
    }

    declare private _emeraldPrice: number;
    static { (this.prototype as any)._emeraldPrice = 0; }

    declare private _isFeatured: boolean;
    static { (this.prototype as any)._isFeatured = false; }

    declare private _isLimited: boolean;
    static { (this.prototype as any)._isLimited = false; }

    declare private _mintLimit: number;
    static { (this.prototype as any)._mintLimit = 0; }

    declare private _mintedCount: number;
    static { (this.prototype as any)._mintedCount = 0; }

    declare private _productInfo: CollectibleBaseItem;

    declare private _productCode: string;

    public get productCode(): string {
        return this._productCode;
    }

    public get emeraldPrice(): number {
        return this._emeraldPrice;
    }

    public get isFeatured(): boolean {
        return this._isFeatured;
    }

    public get isLimited(): boolean {
        return this._isLimited;
    }

    public get mintLimit(): number {
        return this._mintLimit;
    }

    public get mintedCount(): number {
        return this._mintedCount;
    }

    public get productInfo(): CollectibleBaseItem {
        return this._productInfo;
    }
}
