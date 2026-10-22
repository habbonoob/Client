import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IStuffData } from '@/com/sulake/habbo/room/IStuffData';
import type { RoomObjectEvent } from '@/com/sulake/room/events/RoomObjectEvent';
import type { RoomSpriteMouseEvent } from '@/com/sulake/room/events/RoomSpriteMouseEvent';
import type { RoomObjectUpdateMessage } from '@/com/sulake/room/messages/RoomObjectUpdateMessage';
import type { IRoomGeometry } from '@/com/sulake/room/utils/IRoomGeometry';
import type { XML } from '@habbo-pixi/runtime/xml/XML';
import { RoomObjectWidgetRequestEvent } from '@/com/sulake/habbo/room/events/RoomObjectWidgetRequestEvent';
import { RoomObjectDataUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectDataUpdateMessage';
import { FurnitureLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureLogic';

export class FurnitureClothingChangeLogic extends FurnitureLogic {
    static { registerClassName(this, 'com.sulake.habbo.room.object.logic.furniture::FurnitureClothingChangeLogic'); }

    constructor() {
        super();
    }

    public override getEventTypes(): any[] {
        let _loc1_: any[] = ["ROWRE_CLOTHING_CHANGE"];
        return this.getAllEventTypes(super.getEventTypes(), _loc1_);
    }

    public override initialize(param1: XML): void {
        super.initialize(param1);
        if (this.object == null || this.object.getModel() == null) {
            return;
        }
        let _loc2_: string = this.object.getModel().getString("furniture_data");
        this.updateClothingData(_loc2_);
    }

    public override processUpdateMessage(param1: RoomObjectUpdateMessage): void {
        let _loc2_: IStuffData = null;
        super.processUpdateMessage(param1);
        let _loc3_: RoomObjectDataUpdateMessage = param1 instanceof RoomObjectDataUpdateMessage ? param1 : null;
        if (_loc3_ != null) {
            _loc2_ = _loc3_.data;
            if (_loc2_ != null) {
                this.updateClothingData(_loc2_.getLegacyString());
            }
        }
    }

    private updateClothingData(param1: string): void {
        let _loc2_: any[] = null;
        if (param1 != null && param1.length > 0) {
            _loc2_ = param1.split(",");
            if (_loc2_.length > 0) {
                this.object.getModelController().setString("furniture_clothing_boy", stringOrNull(_loc2_[0]));
            }
            if (_loc2_.length > 1) {
                this.object.getModelController().setString("furniture_clothing_girl", stringOrNull(_loc2_[1]));
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
        let _loc3_: string = param1.type;
        if ("doubleClick" !== _loc3_) {
            super.mouseEvent(param1, param2);
        } else {
            this.useObject();
        }
    }

    public override useObject(): void {
        let _loc1_: RoomObjectEvent = null;
        if (this.eventDispatcher != null && this.object != null) {
            _loc1_ = new RoomObjectWidgetRequestEvent("ROWRE_CLOTHING_CHANGE", this.object);
            this.eventDispatcher.dispatchEvent(_loc1_);
        }
    }
}
