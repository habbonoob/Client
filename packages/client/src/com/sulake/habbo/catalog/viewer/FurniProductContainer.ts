import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { HabboCatalog } from '@/com/sulake/habbo/catalog/HabboCatalog';
import type { IPurchasableOffer } from '@/com/sulake/habbo/catalog/IPurchasableOffer';
import type { IProduct } from '@/com/sulake/habbo/catalog/viewer/IProduct';
import type { ImageResult } from '@/com/sulake/habbo/room/ImageResult';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { IStuffData } from '@/com/sulake/habbo/room/IStuffData';
import type { IFurnitureData } from '@/com/sulake/habbo/session/furniture/IFurnitureData';
import { ProductContainer } from '@/com/sulake/habbo/catalog/viewer/ProductContainer.group';

export class FurniProductContainer extends ProductContainer {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer::FurniProductContainer'); }

    constructor(param1: IPurchasableOffer, param2: IProduct[], param3: HabboCatalog, param4: IFurnitureData) {
        super(param1, param2, param3);
        this._furnitureData = param4;
    }

    declare private _furnitureData: IFurnitureData;

    public override get isLazy(): boolean {
        return true;
    }

    public override initProductIcon(param1: IRoomEngine, param2: IStuffData = null): void {
        let _loc3_: ImageResult = null;
        switch (this._furnitureData.type) {
            case "s":
                _loc3_ = this.catalog.roomEngine.getFurnitureIcon(this._furnitureData.id, this);
                break;
            case "i":
                _loc3_ = this.catalog.roomEngine.getWallItemIcon(this._furnitureData.id, this);
        }
        if (_loc3_) {
            this.setIconImage(_loc3_.data, true);
        }
    }

    public override activate(): void {
        super.activate();
        if (this._furnitureData.rentOfferId > -1 && this.catalog.catalogType != "BUILDERS_CLUB") {
            this.catalog.sendGetProductOffer(this._furnitureData.rentOfferId);
        } else {
            this.catalog.sendGetProductOffer(this._furnitureData.purchaseOfferId);
        }
    }
}
