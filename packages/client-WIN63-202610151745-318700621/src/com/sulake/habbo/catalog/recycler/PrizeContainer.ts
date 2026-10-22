import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { HabboCatalog } from '@/com/sulake/habbo/catalog/HabboCatalog';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { IFurnitureData } from '@/com/sulake/habbo/session/furniture/IFurnitureData';
import type { IProductData } from '@/com/sulake/habbo/session/product/IProductData';
import { PrizeGridItem } from '@/com/sulake/habbo/catalog/recycler/PrizeGridItem';

export class PrizeContainer extends PrizeGridItem {
    static { registerClassName(this, 'com.sulake.habbo.catalog.recycler::PrizeContainer'); }

    declare private _productItemType: string;

    declare private _productItemTypeId: number;
    static { (this.prototype as any)._productItemTypeId = 0; }

    declare private _oddsLevelId: number;
    static { (this.prototype as any)._oddsLevelId = 0; }

    declare private _furnitureData: IFurnitureData;

    declare private _gridItem: PrizeGridItem;

    constructor(param1: string, param2: number, param3: IFurnitureData, param4: number, param5: HabboCatalog) {
        super(param5);
        this._productItemType = param1;
        this._productItemTypeId = param2;
        this._furnitureData = param3;
        this._oddsLevelId = param4;
    }

    public setIcon(param1: IRoomEngine): void {
        if (param1 == null) {
            return;
        }
        this.initProductIcon(param1, this._productItemType, this._productItemTypeId);
    }

    public get productItemType(): string {
        return this._productItemType;
    }

    public get productItemTypeId(): number {
        return this._productItemTypeId;
    }

    public get gridItem(): PrizeGridItem {
        return this._gridItem;
    }

    public get oddsLevelId(): number {
        return this._oddsLevelId;
    }

    public get title(): string {
        let _loc1_: IProductData = null;
        if (this._furnitureData == null) {
            _loc1_ = null;
            if (this._productItemType == "chat_style") {
                _loc1_ = this.catalog.getProductData("chat_bubble_" + this.productItemTypeId);
            }
            return _loc1_ != null ? _loc1_.name : "";
        }
        return this._furnitureData.localizedName;
    }
}
