import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class CatalogPageMessageProductData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.catalog::CatalogPageMessageProductData'); }

    public static readonly PRODUCT_TYPE_ITEM: string = "i";
    public static readonly PRODUCT_TYPE_STUFF: string = "s";
    public static readonly PRODUCT_TYPE_EFFECT: string = "e";
    public static readonly PRODUCT_TYPE_BADGE: string = "b";
    public static readonly _SafeStr_8527: string = "cl";

    constructor(param1: IMessageDataWrapper) {
        this._productType = param1.readString();
        let _loc2_: string = this._productType;
        if ("b" !== _loc2_) {
            this._furniClassId = param1.readInteger();
            this._extraParam = param1.readString();
            this._productCount = param1.readInteger();
            this._uniqueLimitedItem = param1.readBoolean();
            if (this._uniqueLimitedItem) {
                this._uniqueLimitedItemSeriesSize = param1.readInteger();
                this._uniqueLimitedItemsLeft = param1.readInteger();
            }
        } else {
            this._extraParam = param1.readString();
            this._productCount = 1;
        }
    }

    declare private _productType: string;

    declare private _furniClassId: number;
    static { (this.prototype as any)._furniClassId = 0; }

    declare private _extraParam: string;

    declare private _productCount: number;
    static { (this.prototype as any)._productCount = 0; }

    declare private _uniqueLimitedItem: boolean;
    static { (this.prototype as any)._uniqueLimitedItem = false; }

    declare private _uniqueLimitedItemSeriesSize: number;
    static { (this.prototype as any)._uniqueLimitedItemSeriesSize = 0; }

    declare private _uniqueLimitedItemsLeft: number;
    static { (this.prototype as any)._uniqueLimitedItemsLeft = 0; }

    public get productType(): string {
        return this._productType;
    }

    public get furniClassId(): number {
        return this._furniClassId;
    }

    public get extraParam(): string {
        return this._extraParam;
    }

    public get productCount(): number {
        return this._productCount;
    }

    public get uniqueLimitedItem(): boolean {
        return this._uniqueLimitedItem;
    }

    public get uniqueLimitedItemSeriesSize(): number {
        return this._uniqueLimitedItemSeriesSize;
    }

    public get uniqueLimitedItemsLeft(): number {
        return this._uniqueLimitedItemsLeft;
    }
}
