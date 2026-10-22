import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { RoomObjectUpdateMessage } from '@/com/sulake/room/messages/RoomObjectUpdateMessage';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { RoomObjectDataUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectDataUpdateMessage';
import { MapStuffData } from '@/com/sulake/habbo/room/object/data/MapStuffData';
import { FurnitureLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureLogic';

export class FurnitureChestLogic extends FurnitureLogic {
    static { registerClassName(this, 'com.sulake.habbo.room.object.logic.furniture::FurnitureChestLogic'); }

    private static readonly IS_WIRED_ENABLED_KEY: string = "is_wired_enabled";
    private _SafeStr_6556: boolean = false;

    constructor() {
        super();
    }

    public override processUpdateMessage(param1: RoomObjectUpdateMessage): void {
        let _loc2_: MapStuffData = null;
        let _loc4_: boolean = false;
        super.processUpdateMessage(param1);
        let _loc3_: RoomObjectDataUpdateMessage = param1 instanceof RoomObjectDataUpdateMessage ? param1 : null;
        if (_loc3_ != null) {
            _loc2_ = asInstanceOf(_loc3_.data, MapStuffData);
            if (_loc2_ != null) {
                _loc4_ = _loc2_.getValue("is_wired_enabled") == "1";
                if (_loc4_ != this._SafeStr_6556) {
                    this._SafeStr_6556 = _loc4_;
                    this.object.getModelController().setNumber("furniture_chest_is_wired_enabled", _loc4_ ? 1 : 0);
                    this.update(getTimer());
                }
            }
        }
    }
}
