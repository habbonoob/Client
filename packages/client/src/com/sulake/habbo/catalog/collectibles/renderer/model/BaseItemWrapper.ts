import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRenderableCollectibleItem } from '@/com/sulake/habbo/catalog/collectibles/IRenderableCollectibleItem';
import type { CollectibleBaseItem } from '@/com/sulake/habbo/communication/messages/parser/collectibles/CollectibleBaseItem';

export class BaseItemWrapper implements IRenderableCollectibleItem {
    static { registerClassName(this, 'com.sulake.habbo.catalog.collectibles.renderer.model::BaseItemWrapper'); }

    constructor(param1: CollectibleBaseItem) {
        this._baseItem = param1;
    }

    declare private _baseItem: CollectibleBaseItem;

    public get productTypeId(): number {
        return this._baseItem.productTypeId;
    }

    public get itemTypeId(): string {
        return this._baseItem.itemTypeId;
    }

    public get petFigureString(): string {
        return this._baseItem.petFigureString;
    }

    public get figureSetIds(): number[] {
        return this._baseItem.figureSetIds;
    }

    public get baseItem(): CollectibleBaseItem {
        return this._baseItem;
    }

    public get amount(): number {
        return 0;
    }

    public get extraData(): string {
        return "";
    }
}
