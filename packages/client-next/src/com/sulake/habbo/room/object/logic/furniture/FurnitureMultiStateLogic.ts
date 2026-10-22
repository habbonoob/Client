import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { RoomSpriteMouseEvent } from '@/com/sulake/room/events/RoomSpriteMouseEvent';
import type { IRoomGeometry } from '@/com/sulake/room/utils/IRoomGeometry';
import { RoomObjectFurnitureActionEvent } from '@/com/sulake/habbo/room/events/RoomObjectFurnitureActionEvent';
import { FurnitureLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureLogic';

export class FurnitureMultiStateLogic extends FurnitureLogic {
    static { registerClassName(this, 'com.sulake.habbo.room.object.logic.furniture::FurnitureMultiStateLogic'); }

    constructor() {
        super();
    }

    public override getEventTypes(): any[] {
        let _loc1_: any[] = ["ROFCAE_MOUSE_BUTTON", "ROFCAE_MOUSE_ARROW"];
        return this.getAllEventTypes(super.getEventTypes(), _loc1_);
    }

    public override mouseEvent(param1: RoomSpriteMouseEvent, param2: IRoomGeometry): void {
        if (param1 == null || param2 == null) {
            return;
        }
        if (this.object == null) {
            return;
        }
        switch (param1.type) {
            case "rollOver":
                this.eventDispatcher.dispatchEvent(new RoomObjectFurnitureActionEvent("ROFCAE_MOUSE_BUTTON", this.object));
                break;
            case "rollOut":
                this.eventDispatcher.dispatchEvent(new RoomObjectFurnitureActionEvent("ROFCAE_MOUSE_ARROW", this.object));
        }
        super.mouseEvent(param1, param2);
    }
}
