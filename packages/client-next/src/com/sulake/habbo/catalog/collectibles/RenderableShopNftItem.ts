import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { CollectibleBaseItem } from '@/com/sulake/habbo/communication/messages/parser/collectibles/CollectibleBaseItem';
import type { IProductDisplayInfo } from '@/com/sulake/habbo/window/widgets/IProductDisplayInfo';

export class RenderableShopNftItem implements IProductDisplayInfo {
    static { registerClassName(this, 'com.sulake.habbo.catalog.collectibles::RenderableShopNftItem'); }

    declare private _item: CollectibleBaseItem;

    constructor(param1: CollectibleBaseItem) {
        this._item = param1;
    }

    public get item(): CollectibleBaseItem {
        return this._item;
    }

    public get productTypeId(): number {
        return this._item.productTypeId;
    }

    public get itemTypeId(): string {
        return this._item.itemTypeId;
    }

    public get petFigureString(): string {
        return this._item.petFigureString;
    }

    public get botFigureString(): string {
        return "";
    }

    public get figureSetIds(): number[] {
        return this._item.figureSetIds;
    }

    public get extraData(): string {
        return "";
    }
}
