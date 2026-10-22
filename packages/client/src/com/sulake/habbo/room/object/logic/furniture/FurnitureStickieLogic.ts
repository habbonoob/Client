import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { RoomObjectEvent } from '@/com/sulake/room/events/RoomObjectEvent';
import type { RoomSpriteMouseEvent } from '@/com/sulake/room/events/RoomSpriteMouseEvent';
import type { RoomObjectUpdateMessage } from '@/com/sulake/room/messages/RoomObjectUpdateMessage';
import type { IRoomGeometry } from '@/com/sulake/room/utils/IRoomGeometry';
import type { XML } from '@habbo-pixi/runtime/xml/XML';
import { RoomObjectFurnitureActionEvent } from '@/com/sulake/habbo/room/events/RoomObjectFurnitureActionEvent';
import { RoomObjectWidgetRequestEvent } from '@/com/sulake/habbo/room/events/RoomObjectWidgetRequestEvent';
import { RoomObjectItemDataUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectItemDataUpdateMessage';
import { FurnitureLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureLogic';

export class FurnitureStickieLogic extends FurnitureLogic {
    static { registerClassName(this, 'com.sulake.habbo.room.object.logic.furniture::FurnitureStickieLogic'); }

    constructor() {
        super();
    }

    public override getEventTypes(): any[] {
        let _loc1_: any[] = ["ROWRE__STICKIE", "ROFCAE_STICKIE"];
        return this.getAllEventTypes(super.getEventTypes(), _loc1_);
    }

    public override initialize(param1: XML): void {
        super.initialize(param1);
        this.setColorIndexFromItemData();
        if (this.object != null) {
            this.object.getModelController().setString("furniture_is_stickie", "");
        }
    }

    public override processUpdateMessage(param1: RoomObjectUpdateMessage): void {
        let _loc2_: RoomObjectWidgetRequestEvent = null;
        super.processUpdateMessage(param1);
        if (param1 instanceof RoomObjectItemDataUpdateMessage) {
            _loc2_ = new RoomObjectWidgetRequestEvent("ROWRE__STICKIE", this.object);
            if (_loc2_ != null) {
                this.eventDispatcher.dispatchEvent(_loc2_);
            }
        }
        this.setColorIndexFromItemData();
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
            _loc1_ = new RoomObjectFurnitureActionEvent("ROFCAE_STICKIE", this.object);
            this.eventDispatcher.dispatchEvent(_loc1_);
        }
    }

    protected setColorIndexFromItemData(): void {
        let _loc3_: string = null;
        let _loc1_: any[] = null;
        let _loc2_: number = 0;
        if (this.object != null) {
            _loc3_ = this.object.getModel().getString("furniture_data");
            _loc1_ = ["9CCEFF", "FF9CFF", "9CFF9C", "FFFF33"];
            _loc2_ = _loc1_.indexOf(_loc3_);
            if (_loc2_ < 0) {
                _loc2_ = 3;
            }
            this.object.getModelController().setNumber("furniture_color", _loc2_ + 1);
        }
    }
}
