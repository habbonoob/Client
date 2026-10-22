import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRenderableCollectibleItem } from '@/com/sulake/habbo/catalog/collectibles/IRenderableCollectibleItem';
import type { CollectiblesProductItem } from '@/com/sulake/habbo/communication/messages/parser/collectibles/CollectiblesProductItem';

export class MintableItemWrapper implements IRenderableCollectibleItem {
    static { registerClassName(this, 'com.sulake.habbo.catalog.collectibles.renderer.model::MintableItemWrapper'); }

    constructor(param1: CollectiblesProductItem, param2: number) {
        this._productItem = param1;
        this._amount = param2;
    }

    declare private _productItem: CollectiblesProductItem;

    declare private _amount: number;
    static { (this.prototype as any)._amount = 0; }

    public get amount(): number {
        return this._amount;
    }

    public set amount(param1: number) {
        this._amount = param1;
    }

    public get productTypeId(): number {
        switch (this._productItem.itemType) {
            case "i":
                return 0;
            case "s":
                return 1;
            case "cl":
                return 11;
            default:
                return -1;
        }
    }

    public get itemTypeId(): string {
        return String(this._productItem.itemTypeId);
    }

    public get extraData(): string {
        return "";
    }

    public get petFigureString(): string {
        return "";
    }

    public get figureSetIds(): number[] {
        return [];
    }

    public get productItem(): CollectiblesProductItem {
        return this._productItem;
    }
}
