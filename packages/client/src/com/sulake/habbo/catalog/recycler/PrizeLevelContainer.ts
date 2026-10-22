import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { HabboCatalog } from '@/com/sulake/habbo/catalog/HabboCatalog';
import type { PrizeLevelMessageData } from '@/com/sulake/habbo/communication/messages/incoming/recycler/PrizeLevelMessageData';
import type { PrizeMessageData } from '@/com/sulake/habbo/communication/messages/incoming/recycler/PrizeMessageData';
import type { IFurnitureData } from '@/com/sulake/habbo/session/furniture/IFurnitureData';
import { DealPrizeContainer } from '@/com/sulake/habbo/catalog/recycler/DealPrizeContainer';
import { PrizeContainer } from '@/com/sulake/habbo/catalog/recycler/PrizeContainer';

export class PrizeLevelContainer {
    static { registerClassName(this, 'com.sulake.habbo.catalog.recycler::PrizeLevelContainer'); }

    constructor(param1: PrizeLevelMessageData, param2: HabboCatalog) {
        let _loc4_: number = 0;
        let _loc3_: PrizeMessageData = null;
        let _loc6_: PrizeContainer = null;
        let _loc5_: IFurnitureData = null;
        this._prizeLevelId = param1.prizeLevelId;
        this._probabilityDenominator = param1.probabilityDenominator;
        this._prizes = [];
        _loc4_ = 0;
        while (_loc4_ < param1.prizes.length) {
            _loc3_ = param1.prizes[_loc4_];
            if (_loc3_.isDeal) {
                _loc6_ = new DealPrizeContainer(_loc3_.subProducts, this._prizeLevelId, param2);
            } else {
                _loc5_ = param2.getFurnitureData(_loc3_.productItemTypeId, _loc3_.productItemType);
                _loc6_ = new PrizeContainer(_loc3_.productItemType, _loc3_.productItemTypeId, _loc5_, this._prizeLevelId, param2);
            }
            this._prizes.push(_loc6_);
            _loc4_++;
        }
    }

    declare private _prizeLevelId: number;
    static { (this.prototype as any)._prizeLevelId = 0; }

    declare private _probabilityDenominator: number;
    static { (this.prototype as any)._probabilityDenominator = 0; }

    declare private _prizes: any[];

    public get prizes(): any[] {
        return this._prizes;
    }

    public get prizeLevelId(): number {
        return this._prizeLevelId;
    }

    public get probabilityDenominator(): number {
        return this._probabilityDenominator;
    }
}
