import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { RoomObjectEvent } from '@/com/sulake/room/events/RoomObjectEvent';
import type { RoomSpriteMouseEvent } from '@/com/sulake/room/events/RoomSpriteMouseEvent';
import type { IRoomObjectModelController } from '@/com/sulake/room/object/IRoomObjectModelController';
import type { IRoomGeometry } from '@/com/sulake/room/utils/IRoomGeometry';
import type { XML } from '@habbo-pixi/runtime/xml/XML';
import type { XMLList } from '@habbo-pixi/runtime/xml/XMLList';
import { RoomObjectWidgetRequestEvent } from '@/com/sulake/habbo/room/events/RoomObjectWidgetRequestEvent';
import { FurnitureLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureLogic';

export class FurnitureCreditLogic extends FurnitureLogic {
    static { registerClassName(this, 'com.sulake.habbo.room.object.logic.furniture::FurnitureCreditLogic'); }

    constructor() {
        super();
    }

    public override getEventTypes(): any[] {
        let _loc1_: any[] = ["ROWRE__CREDITFURNI"];
        return this.getAllEventTypes(super.getEventTypes(), _loc1_);
    }

    public override dispose(): void {
        super.dispose();
    }

    public override initialize(param1: XML): void {
        let _loc2_: IRoomObjectModelController = null;
        super.initialize(param1);
        if (param1 == null) {
            return;
        }
        let _loc4_: XMLList = param1.child("credits");
        if (_loc4_.length() == 0) {
            return;
        }
        let _loc3_: number = Number(_loc4_.item(0).attribute("value"));
        if (this.object != null) {
            _loc2_ = this.object.getModelController();
            if (_loc2_ != null) {
                _loc2_.setNumber("furniture_credit_value", _loc3_);
            }
        }
    }

    public override mouseEvent(param1: RoomSpriteMouseEvent, param2: IRoomGeometry): void {
        if (param1 == null || param2 == null) {
            return;
        }
        if (this.object == null) {
            return;
        }
        let _loc3_: any = param1.type;
        if ("doubleClick" !== _loc3_) {
            super.mouseEvent(param1, param2);
        } else {
            this.useObject();
        }
    }

    public override useObject(): void {
        let _loc1_: RoomObjectEvent = null;
        if (this.eventDispatcher != null && this.object != null) {
            _loc1_ = new RoomObjectWidgetRequestEvent("ROWRE__CREDITFURNI", this.object);
            this.eventDispatcher.dispatchEvent(_loc1_);
        }
        super.useObject();
    }
}
