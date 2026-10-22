import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { RoomObjectUpdateMessage } from '@/com/sulake/room/messages/RoomObjectUpdateMessage';
import { RoomObjectFurnitureRegionUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectFurnitureRegionUpdateMessage';
import { FurnitureRegionData } from '@/com/sulake/habbo/room/object/data/FurnitureRegionData';
import { FurnitureLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureLogic';

export class _SafeCls_6118 extends FurnitureLogic {
    static { registerClassName(this, 'com.sulake.habbo.room.object.logic.furniture::_SafeCls_6118'); }

    constructor() {
        super();
    }

    public override processUpdateMessage(param1: RoomObjectUpdateMessage): void {
        let _loc2_: FurnitureRegionData = null;
        let _loc3_: RoomObjectFurnitureRegionUpdateMessage = param1 instanceof RoomObjectFurnitureRegionUpdateMessage ? param1 : null;
        if (_loc3_ != null) {
            if (_loc3_.title != null) {
                _loc2_ = new FurnitureRegionData(this.object.getId(), _loc3_.title, _loc3_.description, _loc3_.xOffset, _loc3_.yOffset, _loc3_.minWidth, _loc3_.minHeight, _loc3_.color, _loc3_.areas);
            }
            this.object.getModelController().setObject("furniture_region_data", _loc2_);
            return;
        }
        super.processUpdateMessage(param1);
    }
}
