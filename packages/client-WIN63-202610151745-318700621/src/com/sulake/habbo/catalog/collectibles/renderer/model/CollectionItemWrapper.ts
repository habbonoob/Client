import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRenderableCollectibleItem } from '@/com/sulake/habbo/catalog/collectibles/IRenderableCollectibleItem';
import type { CollectibleItem } from '@/com/sulake/habbo/communication/messages/parser/collectibles/CollectibleItem';

export class CollectionItemWrapper implements IRenderableCollectibleItem {
    static { registerClassName(this, 'com.sulake.habbo.catalog.collectibles.renderer.model::CollectionItemWrapper'); }

    declare private _collectionItem: CollectibleItem;

    constructor(param1: CollectibleItem) {
        this._collectionItem = param1;
    }

    public get productTypeId(): number {
        return this._collectionItem.productTypeId;
    }

    public get itemTypeId(): string {
        return this._collectionItem.itemTypeId;
    }

    public get extraData(): string {
        return "";
    }

    public get amount(): number {
        return this._collectionItem.amount;
    }

    public get petFigureString(): string {
        return this._collectionItem.petFigureString;
    }

    public get figureSetIds(): number[] {
        return this._collectionItem.figureSetIds;
    }

    public get collectionItem(): CollectibleItem {
        return this._collectionItem;
    }

    public get botFigureString(): string {
        return "";
    }
}
