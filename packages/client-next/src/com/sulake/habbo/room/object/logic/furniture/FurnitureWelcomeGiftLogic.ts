import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { RoomSpriteMouseEvent } from '@/com/sulake/room/events/RoomSpriteMouseEvent';
import type { IRoomGeometry } from '@/com/sulake/room/utils/IRoomGeometry';
import { RoomObjectStateChangeEvent } from '@/com/sulake/habbo/room/events/RoomObjectStateChangeEvent';
import { FurnitureMultiStateLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureMultiStateLogic';

export class FurnitureWelcomeGiftLogic extends FurnitureMultiStateLogic {
    static { registerClassName(this, 'com.sulake.habbo.room.object.logic.furniture::FurnitureWelcomeGiftLogic'); }

    constructor() {
        super();
    }

    public override mouseEvent(param1: RoomSpriteMouseEvent, param2: IRoomGeometry): void {
        if (param1 == null || param2 == null) {
            return;
        }
        if (this.object == null) {
            return;
        }
        let _loc3_: string = param1.type;
        if ("doubleClick" === _loc3_) {
            if (this.eventDispatcher != null) {
                this.eventDispatcher.dispatchEvent(new RoomObjectStateChangeEvent("ROSCE_STATE_CHANGE", this.object));
            }
        }
        super.mouseEvent(param1, param2);
    }
}
