import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { RoomObjectUpdateMessage } from '@/com/sulake/room/messages/RoomObjectUpdateMessage';
import { RoomObjectFurnitureLabelUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectFurnitureLabelUpdateMessage';
import { FurnitureLabelData } from '@/com/sulake/habbo/room/object/data/FurnitureLabelData';
import { FurnitureLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureLogic';

export class _SafeCls_6132 extends FurnitureLogic {
    static { registerClassName(this, 'com.sulake.habbo.room.object.logic.furniture::_SafeCls_6132'); }

    constructor() {
        super();
    }

    public override processUpdateMessage(param1: RoomObjectUpdateMessage): void {
        let _loc2_: FurnitureLabelData = null;
        let _loc3_: RoomObjectFurnitureLabelUpdateMessage = param1 instanceof RoomObjectFurnitureLabelUpdateMessage ? param1 : null;
        if (_loc3_ != null) {
            _loc2_ = _loc3_.text == null ? null : new FurnitureLabelData(this.object.getId(), _loc3_.text, 0, _loc3_.bubbleColor, _loc3_.visibility, _loc3_.alwaysOpen);
            this.object.getModelController().setObject("furniture_label_data", _loc2_);
            return;
        }
        super.processUpdateMessage(param1);
    }
}
