import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { RoomObjectUpdateMessage } from '@/com/sulake/room/messages/RoomObjectUpdateMessage';
import { RoomObjectDataUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectDataUpdateMessage';
import { LegacyStuffData } from '@/com/sulake/habbo/room/object/data/LegacyStuffData';
import { FurnitureMultiStateLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureMultiStateLogic';

export class FurnitureIceStormLogic extends FurnitureMultiStateLogic {
    static { registerClassName(this, 'com.sulake.habbo.room.object.logic.furniture::FurnitureIceStormLogic'); }

    constructor() {
        super();
    }

    private _SafeStr_5894: number = 0;
    private _SafeStr_6001: number = 0;
    private _SafeStr_3619: number = 0;

    public override processUpdateMessage(param1: RoomObjectUpdateMessage): void {
        if (param1 == null) {
            return;
        }
        let _loc2_: RoomObjectDataUpdateMessage = param1 instanceof RoomObjectDataUpdateMessage ? param1 : null;
        if (_loc2_ != null) {
            this.handleDataUpdateMessage_FurnitureIceStormLogic(_loc2_);
            return;
        }
        super.processUpdateMessage(param1);
    }

    public override update(param1: number): void {
        let _loc2_: LegacyStuffData = null;
        let _loc3_: RoomObjectDataUpdateMessage = null;
        if (this._SafeStr_3619 > 0 && param1 >= this._SafeStr_3619) {
            this._SafeStr_3619 = 0;
            _loc2_ = new LegacyStuffData();
            _loc2_.setString(String(this._SafeStr_5894));
            _loc3_ = new RoomObjectDataUpdateMessage(this._SafeStr_5894, _loc2_, this._SafeStr_6001);
            super.processUpdateMessage(_loc3_);
        }
        super.update(param1);
    }

    private handleDataUpdateMessage_FurnitureIceStormLogic(param1: RoomObjectDataUpdateMessage): void {
        let _loc3_: LegacyStuffData = null;
        let _loc4_: number = param1.state / 1000 | 0;
        let _loc2_: number = param1.state % 1000;
        if (_loc2_ == 0) {
            this._SafeStr_3619 = 0;
            _loc3_ = new LegacyStuffData();
            _loc3_.setString(String(_loc4_));
            param1 = new RoomObjectDataUpdateMessage(_loc4_, _loc3_, param1.extra);
            super.processUpdateMessage(param1);
        } else {
            this._SafeStr_5894 = _loc4_;
            this._SafeStr_6001 = param1.extra;
            this._SafeStr_3619 = this.lastUpdateTime + _loc2_;
        }
    }
}
