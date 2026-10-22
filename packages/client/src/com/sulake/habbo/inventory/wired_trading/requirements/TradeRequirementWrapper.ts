import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ChestItemType } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/chests/storage/ChestItemType';
import type { TradeRequirement } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/trade/requirements/TradeRequirement';
import type { FurnitureItem } from '@/com/sulake/habbo/inventory/items/FurnitureItem';
import type { GroupItem } from '@/com/sulake/habbo/inventory/items/GroupItem';
import { TradeRequirementNode } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/trade/requirements/rules/nodes/TradeRequirementNode';

export class TradeRequirementWrapper {
    static { registerClassName(this, 'com.sulake.habbo.inventory.wired_trading.requirements::TradeRequirementWrapper'); }

    constructor(param1: TradeRequirement) {
        let _loc2_: any;
        let _loc3_: ChestItemType = null;
        this._requirements = param1;
        if (this._requirements.rules != null && this._requirements.rules.youGiveRule != null) {
            this._SafeStr_5450 = new Dictionary();
            this._SafeStr_5466 = new Dictionary();
            this._SafeStr_4980 = new Dictionary();
            for (const _loc4_ of this._requirements.rules.youGiveRule ?? []) {
                for (_loc2_ of _loc4_.nodes ?? []) {
                    if (_loc2_.type == TradeRequirementNode.TYPE_COIN) {
                        this._SafeStr_6923 = true;
                    } else if (_loc2_.type == TradeRequirementNode.TYPE_FURNI) {
                        _loc3_ = _loc2_.itemType;
                        if (!_loc3_.isWallItem) {
                            this._SafeStr_5466.set(_loc3_.typeId, true);
                        } else {
                            if (_loc3_.legacyPosterId.length > 0) {
                                this._SafeStr_4980.set(_loc3_.legacyPosterId, true);
                            }
                            this._SafeStr_5450.set(_loc3_.typeId, true);
                        }
                    }
                }
            }
        }
    }

    declare private _requirements: TradeRequirement;

    private _SafeStr_6923: boolean = false;
    private _SafeStr_5450: Map<any, any> = null;
    private _SafeStr_5466: Map<any, any> = null;
    private _SafeStr_4980: Map<any, any> = null;

    public get type(): number {
        return this._requirements.type;
    }

    public get requirements(): TradeRequirement {
        return this._requirements;
    }

    public canOfferCreditFurni(): boolean {
        return this._SafeStr_6923;
    }

    public canOfferNormalFurni(param1: GroupItem): boolean {
        if (this._SafeStr_5450 == null || this._SafeStr_5466 == null || this._SafeStr_4980 == null) {
            return false;
        }
        let _loc2_: FurnitureItem = param1.peek();
        if (_loc2_ == null) {
            return false;
        }
        if (!_loc2_.isWallItem) {
            return this._SafeStr_5466.has(_loc2_.type);
        }
        if (_loc2_.category == 6 && !(this._SafeStr_4980.has(_loc2_.stuffData.getLegacyString()))) {
            return false;
        }
        return this._SafeStr_5450.has(_loc2_.type);
    }
}
