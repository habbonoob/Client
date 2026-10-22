import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { RoomObjectUpdateMessage } from '@/com/sulake/room/messages/RoomObjectUpdateMessage';
import { FurnitureLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureLogic';

export class FurnitureSongDiskLogic extends FurnitureLogic {
    static { registerClassName(this, 'com.sulake.habbo.room.object.logic.furniture::FurnitureSongDiskLogic'); }

    constructor() {
        super();
    }

    public override processUpdateMessage(param1: RoomObjectUpdateMessage): void {
        let _loc2_: string = null;
        let _loc3_: number = 0;
        super.processUpdateMessage(param1);
        if (this.object == null) {
            return;
        }
        if (this.object.getModelController().getNumber("furniture_real_room_object") == 1) {
            _loc2_ = this.object.getModelController().getString("furniture_extras");
            _loc3_ = Number(_loc2_) | 0;
            this.object.getModelController().setString("RWEIEP_INFOSTAND_EXTRA_PARAM", "RWEIEP_SONGDISK" + _loc3_);
        }
    }
}
