import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { RoomObjectUpdateMessage } from '@/com/sulake/room/messages/RoomObjectUpdateMessage';
import { RoomObjectDataUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectDataUpdateMessage';
import { MapStuffData } from '@/com/sulake/habbo/room/object/data/MapStuffData';
import { FurnitureMultiStateLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureMultiStateLogic';

export class _SafeCls_6120 extends FurnitureMultiStateLogic {
    static { registerClassName(this, 'com.sulake.habbo.room.object.logic.furniture::_SafeCls_6120'); }

    constructor() {
        super();
    }

    public override processUpdateMessage(param1: RoomObjectUpdateMessage): void {
        super.processUpdateMessage(param1);
        let _loc4_: RoomObjectDataUpdateMessage = param1 instanceof RoomObjectDataUpdateMessage ? param1 : null;
        if (_loc4_ == null || _loc4_.data == null) {
            return;
        }
        let _loc2_: MapStuffData = asInstanceOf(_loc4_.data, MapStuffData);
        let _loc3_: any = 16777215;
        if (_loc2_ != null) {
            _loc3_ = (this.readChannel(_loc2_, "r") << 16 | this.readChannel(_loc2_, "g") << 8 | this.readChannel(_loc2_, "b")) >>> 0;
        }
        this.object.getModelController().setNumber("furniture_recolorable_color", Number(_loc3_));
    }

    private readChannel(param1: MapStuffData, param2: string): number {
        let _loc3_: string = param1.getValue(param2);
        if (_loc3_ == null || !/^[0-9]{1,3}$/.test(_loc3_) || (Number(_loc3_) | 0) > 255) {
            return 255;
        }
        return Number(_loc3_) | 0;
    }
}
