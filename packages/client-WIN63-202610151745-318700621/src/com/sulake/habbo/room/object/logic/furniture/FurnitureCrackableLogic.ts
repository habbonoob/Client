import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { RoomObjectUpdateMessage } from '@/com/sulake/room/messages/RoomObjectUpdateMessage';
import { FurnitureLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureLogic';

export class FurnitureCrackableLogic extends FurnitureLogic {
    static { registerClassName(this, 'com.sulake.habbo.room.object.logic.furniture::FurnitureCrackableLogic'); }

    constructor() {
        super();
    }

    public override processUpdateMessage(param1: RoomObjectUpdateMessage): void {
        super.processUpdateMessage(param1);
        if (this.object == null) {
            return;
        }
        if (this.object.getModelController().getNumber("furniture_real_room_object") == 1) {
            this.object.getModelController().setString("RWEIEP_INFOSTAND_EXTRA_PARAM", "RWEIEP_CRACKABLE_FURNI");
        }
    }
}
