import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomObjectModel } from '@/com/sulake/room/object/IRoomObjectModel';
import { RoomObjectDataRequestEvent } from '@/com/sulake/habbo/room/events/RoomObjectDataRequestEvent';
import { FurnitureLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureLogic';

export class FurnitureRentableSpaceLogic extends FurnitureLogic {
    static { registerClassName(this, 'com.sulake.habbo.room.object.logic.furniture::FurnitureRentableSpaceLogic'); }

    constructor() {
        super();
    }

    public override get widget(): string {
        return "RWE_RENTABLESPACE";
    }

    public override getEventTypes(): any[] {
        return this.getAllEventTypes(super.getEventTypes(), ["RODRE_CURRENT_USER_ID"]);
    }

    public override update(param1: number): void {
        super.update(param1);
        if (!this.object.getModel().hasNumber("session_current_user_id")) {
            this.eventDispatcher.dispatchEvent(new RoomObjectDataRequestEvent("RODRE_CURRENT_USER_ID", this.object));
        }
        let _loc4_: IRoomObjectModel = this.object.getModel();
        let _loc2_: string = stringOrNull(_loc4_.getStringToStringMap("furniture_data").getValue("renterId"));
        let _loc3_: number = _loc4_.getNumber("session_current_user_id");
        if (_loc2_ != null) {
            if (Number(_loc2_) == _loc3_) {
                this.object.setState(2, 0);
            } else {
                this.object.setState(1, 0);
            }
        } else {
            this.object.setState(0, 0);
        }
    }
}
