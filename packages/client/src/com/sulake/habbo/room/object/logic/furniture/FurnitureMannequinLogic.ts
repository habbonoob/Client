import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { RoomObjectEvent } from '@/com/sulake/room/events/RoomObjectEvent';
import type { RoomSpriteMouseEvent } from '@/com/sulake/room/events/RoomSpriteMouseEvent';
import type { RoomObjectUpdateMessage } from '@/com/sulake/room/messages/RoomObjectUpdateMessage';
import type { IRoomGeometry } from '@/com/sulake/room/utils/IRoomGeometry';
import { RoomObjectWidgetRequestEvent } from '@/com/sulake/habbo/room/events/RoomObjectWidgetRequestEvent';
import { RoomObjectDataUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectDataUpdateMessage';
import { MapStuffData } from '@/com/sulake/habbo/room/object/data/MapStuffData';
import { FurnitureLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureLogic';

export class FurnitureMannequinLogic extends FurnitureLogic {
    static { registerClassName(this, 'com.sulake.habbo.room.object.logic.furniture::FurnitureMannequinLogic'); }

    private static readonly KEY_GENDER: string = "GENDER";
    private static readonly KEY_FIGURE: string = "FIGURE";
    private static readonly KEY_OUTFIT_NAME: string = "OUTFIT_NAME";

    constructor() {
        super();
    }

    public override getEventTypes(): any[] {
        let _loc1_: any[] = ["ROWRE_MANNEQUIN"];
        return this.getAllEventTypes(super.getEventTypes(), _loc1_);
    }

    public override processUpdateMessage(param1: RoomObjectUpdateMessage): void {
        super.processUpdateMessage(param1);
        let _loc2_: RoomObjectDataUpdateMessage = param1 instanceof RoomObjectDataUpdateMessage ? param1 : null;
        if (_loc2_ != null && _loc2_.data != null) {
            _loc2_.data.writeRoomObjectModel(this.object.getModelController());
            this.setObjectVariables();
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
            _loc1_ = new RoomObjectWidgetRequestEvent("ROWRE_MANNEQUIN", this.object);
            this.eventDispatcher.dispatchEvent(_loc1_);
        }
    }

    private setObjectVariables(): void {
        if (this.object == null || this.object.getModelController() == null) {
            return;
        }
        let _loc1_: MapStuffData = new MapStuffData();
        _loc1_.initializeFromRoomObjectModel(this.object.getModel());
        this.object.getModelController().setString("furniture_mannequin_gender", _loc1_.getValue("GENDER"));
        this.object.getModelController().setString("furniture_mannequin_figure", _loc1_.getValue("FIGURE"));
        this.object.getModelController().setString("furniture_mannequin_name", _loc1_.getValue("OUTFIT_NAME"));
    }
}
