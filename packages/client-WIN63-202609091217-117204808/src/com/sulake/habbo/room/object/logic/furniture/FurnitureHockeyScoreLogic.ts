import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { RoomObjectEvent } from '@/com/sulake/room/events/RoomObjectEvent';
import type { RoomSpriteMouseEvent } from '@/com/sulake/room/events/RoomSpriteMouseEvent';
import type { IRoomGeometry } from '@/com/sulake/room/utils/IRoomGeometry';
import { RoomObjectStateChangeEvent } from '@/com/sulake/habbo/room/events/RoomObjectStateChangeEvent';
import { FurnitureLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureLogic';

export class FurnitureHockeyScoreLogic extends FurnitureLogic {
    static { registerClassName(this, 'com.sulake.habbo.room.object.logic.furniture::FurnitureHockeyScoreLogic'); }

    constructor() {
        super();
    }

    public override getEventTypes(): any[] {
        let _loc1_: any[] = ["ROSCE_STATE_CHANGE"];
        return this.getAllEventTypes(super.getEventTypes(), _loc1_);
    }

    public override mouseEvent(param1: RoomSpriteMouseEvent, param2: IRoomGeometry): void {
        let _loc3_: RoomObjectEvent = null;
        if (param1 == null || param2 == null) {
            return;
        }
        if (this.object == null) {
            return;
        }
        switch (param1.type) {
            case "doubleClick":
                let _loc4_: string = param1.spriteTag;
                if ("off" === _loc4_) {
                    _loc3_ = new RoomObjectStateChangeEvent("ROSCE_STATE_CHANGE", this.object, 3);
                }
                break;
            case "click":
                switch (param1.spriteTag) {
                    case "inc":
                        _loc3_ = new RoomObjectStateChangeEvent("ROSCE_STATE_CHANGE", this.object, 2);
                        break;
                    case "dec":
                        _loc3_ = new RoomObjectStateChangeEvent("ROSCE_STATE_CHANGE", this.object, 1);
                }
        }
        if (this.eventDispatcher != null && _loc3_ != null) {
            this.eventDispatcher.dispatchEvent(_loc3_);
        } else {
            super.mouseEvent(param1, param2);
        }
    }

    public override useObject(): void {
        let _loc1_: RoomObjectEvent = null;
        if (this.object != null) {
            _loc1_ = new RoomObjectStateChangeEvent("ROSCE_STATE_CHANGE", this.object, 3);
            if (this.eventDispatcher != null) {
                this.eventDispatcher.dispatchEvent(_loc1_);
            }
        }
    }
}
