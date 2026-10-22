import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { RoomObjectEvent } from '@/com/sulake/room/events/RoomObjectEvent';
import type { RoomSpriteMouseEvent } from '@/com/sulake/room/events/RoomSpriteMouseEvent';
import type { IRoomObjectModelController } from '@/com/sulake/room/object/IRoomObjectModelController';
import type { IRoomGeometry } from '@/com/sulake/room/utils/IRoomGeometry';
import type { XML } from '@habbo-pixi/runtime/xml/XML';
import type { XMLList } from '@habbo-pixi/runtime/xml/XMLList';
import { RoomObjectStateChangeEvent } from '@/com/sulake/habbo/room/events/RoomObjectStateChangeEvent';
import { FurnitureLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureLogic';

export class FurnitureFireworksLogic extends FurnitureLogic {
    static { registerClassName(this, 'com.sulake.habbo.room.object.logic.furniture::FurnitureFireworksLogic'); }

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
        let _loc4_: any = param1.type;
        if ("doubleClick" === _loc4_) {
            switch (param1.spriteTag) {
                case "start_stop":
                    _loc3_ = new RoomObjectStateChangeEvent("ROSCE_STATE_CHANGE", this.object, 1);
                    break;
                case "reset":
                    _loc3_ = new RoomObjectStateChangeEvent("ROSCE_STATE_CHANGE", this.object, 2);
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
            _loc1_ = new RoomObjectStateChangeEvent("ROSCE_STATE_CHANGE", this.object, 0);
            if (this.eventDispatcher != null) {
                this.eventDispatcher.dispatchEvent(_loc1_);
            }
        }
    }

    public override initialize(param1: XML): void {
        let _loc3_: IRoomObjectModelController = null;
        super.initialize(param1);
        if (param1 == null) {
            return;
        }
        let _loc2_: XMLList = param1.child("particlesystems");
        if (_loc2_.length() == 0) {
            return;
        }
        if (this.object != null) {
            _loc3_ = this.object.getModelController();
            if (_loc3_ != null) {
                _loc3_.setString("furniture_fireworks_data", String(_loc2_));
            }
        }
    }
}
