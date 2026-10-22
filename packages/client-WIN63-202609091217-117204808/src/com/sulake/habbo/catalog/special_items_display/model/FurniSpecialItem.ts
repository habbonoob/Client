import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { SpecialItemsController } from '@/com/sulake/habbo/catalog/special_items_display/SpecialItemsController';
import type { IFurnitureData } from '@/com/sulake/habbo/session/furniture/IFurnitureData';
import { AbstractSpecialItem } from '@/com/sulake/habbo/catalog/special_items_display/model/AbstractSpecialItem';

export class FurniSpecialItem extends AbstractSpecialItem {
    static { registerClassName(this, 'com.sulake.habbo.catalog.special_items_display.model::FurniSpecialItem'); }

    private _typeId: number = -1;
    private _furniName: string = "";

    constructor(param1: number, param2: string, param3: string, param4: SpecialItemsController, param5: string) {
        super(param1, param2, param3, param4);
        let _loc6_: IFurnitureData = param4.sessionDataManager.getFloorItemDataByName(param5);
        if (_loc6_ != null) {
            this._typeId = _loc6_.id;
            this._furniName = _loc6_.localizedName;
        }
    }

    public override get productTypeId(): number {
        return 1;
    }

    public override get itemTypeId(): string {
        return String(this._typeId);
    }

    public override get isValid(): boolean {
        return this._typeId != -1;
    }

    public override get name(): string {
        let _loc1_: string = super.name;
        if (_loc1_ != null && _loc1_.length > 0) {
            return _loc1_;
        }
        return this._furniName;
    }
}
