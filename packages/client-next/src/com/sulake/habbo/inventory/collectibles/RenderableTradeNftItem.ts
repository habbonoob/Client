import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { TradeNftItem } from '@/com/sulake/habbo/communication/messages/parser/collectibles/trading/TradeNftItem';
import type { IProductDisplayInfo } from '@/com/sulake/habbo/window/widgets/IProductDisplayInfo';

export class RenderableTradeNftItem implements IProductDisplayInfo {
    static { registerClassName(this, 'com.sulake.habbo.inventory.collectibles::RenderableTradeNftItem'); }

    declare private _item: TradeNftItem;

    constructor(param1: TradeNftItem) {
        this._item = param1;
    }

    public get item(): TradeNftItem {
        return this._item;
    }

    public get productTypeId(): number {
        return this._item.productTypeId;
    }

    public get itemTypeId(): string {
        return this._item.itemTypeId;
    }

    public get extraData(): string {
        return "";
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
}
