import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { RoomObjectEvent } from '@/com/sulake/room/events/RoomObjectEvent';
import type { RoomSpriteMouseEvent } from '@/com/sulake/room/events/RoomSpriteMouseEvent';
import type { RoomObjectUpdateMessage } from '@/com/sulake/room/messages/RoomObjectUpdateMessage';
import type { IRoomGeometry } from '@/com/sulake/room/utils/IRoomGeometry';
import { RoomObjectStateChangeEvent } from '@/com/sulake/habbo/room/events/RoomObjectStateChangeEvent';
import { RoomObjectWidgetRequestEvent } from '@/com/sulake/habbo/room/events/RoomObjectWidgetRequestEvent';
import { RoomObjectDataUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectDataUpdateMessage';
import { IntArrayStuffData } from '@/com/sulake/habbo/room/object/data/IntArrayStuffData';
import { FurnitureMultiStateLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureMultiStateLogic';

export class FurnitureAreaHideLogic extends FurnitureMultiStateLogic {
    static { registerClassName(this, 'com.sulake.habbo.room.object.logic.furniture::FurnitureAreaHideLogic'); }

    constructor() {
        super();
    }

    public override getEventTypes(): any[] {
        let _loc1_: any[] = ["ROWRE_HIDE_AREA"];
        return this.getAllEventTypes(super.getEventTypes(), _loc1_);
    }

    public override processUpdateMessage(param1: RoomObjectUpdateMessage): void {
        super.processUpdateMessage(param1);
        let _loc2_: RoomObjectDataUpdateMessage = param1 instanceof RoomObjectDataUpdateMessage ? param1 : null;
        if (_loc2_ != null && _loc2_.data != null) {
            _loc2_.data.writeRoomObjectModel(this.object.getModelController());
            if (this.object.getModelController().getNumber("furniture_real_room_object") == 1) {
                this.setupObject();
            }
        }
    }

    public override useObject(): void {
        let _loc1_: RoomObjectEvent = null;
        if (this.eventDispatcher != null && this.object != null) {
            _loc1_ = new RoomObjectWidgetRequestEvent("ROWRE_HIDE_AREA", this.object);
            this.eventDispatcher.dispatchEvent(_loc1_);
        }
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
        if ("doubleClick" !== _loc4_) {
            super.mouseEvent(param1, param2);
        } else {
            if (param1.spriteTag == "turn_on" || param1.spriteTag == "turn_off") {
                _loc3_ = new RoomObjectStateChangeEvent("ROSCE_STATE_CHANGE", this.object);
            } else if (this.eventDispatcher != null && this.object != null) {
                _loc3_ = new RoomObjectWidgetRequestEvent("ROWRE_HIDE_AREA", this.object);
            }
            this.eventDispatcher.dispatchEvent(_loc3_);
        }
    }

    private setupObject(): void {
        if (this.object == null || this.object.getModelController() == null) {
            return;
        }
        let _loc2_: IntArrayStuffData = new IntArrayStuffData();
        _loc2_.initializeFromRoomObjectModel(this.object.getModel());
        let _loc5_: number = _loc2_.getValue(0);
        let _loc6_: number = _loc2_.getValue(1);
        let _loc7_: number = _loc2_.getValue(2);
        let _loc4_: number = _loc2_.getValue(3);
        let _loc8_: number = _loc2_.getValue(4);
        let _loc9_: any = _loc2_.getValue(5) == 1;
        let _loc3_: any = _loc2_.getValue(6) == 1;
        let _loc1_: any = _loc2_.getValue(7) == 1;
        this.object.getModelController().setNumber("furniture_area_hide_root_x", _loc6_);
        this.object.getModelController().setNumber("furniture_area_hide_root_y", _loc7_);
        this.object.getModelController().setNumber("furniture_area_hide_width", _loc4_);
        this.object.getModelController().setNumber("furniture_area_hide_length", _loc8_);
        this.object.getModelController().setNumber("furniture_area_hide_invisibility", _loc9_ ? 1 : 0);
        this.object.getModelController().setNumber("furniture_area_hide_wallitems", _loc3_ ? 1 : 0);
        this.object.getModelController().setNumber("furniture_area_hide_invert", _loc1_ ? 1 : 0);
        this.object.setState(_loc5_, 0);
    }
}
