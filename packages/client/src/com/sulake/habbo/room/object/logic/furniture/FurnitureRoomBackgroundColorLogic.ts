import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { RoomObjectEvent } from '@/com/sulake/room/events/RoomObjectEvent';
import type { RoomSpriteMouseEvent } from '@/com/sulake/room/events/RoomSpriteMouseEvent';
import type { RoomObjectUpdateMessage } from '@/com/sulake/room/messages/RoomObjectUpdateMessage';
import type { IRoomGeometry } from '@/com/sulake/room/utils/IRoomGeometry';
import { RoomObjectHSLColorEnableEvent } from '@/com/sulake/habbo/room/events/RoomObjectHSLColorEnableEvent';
import { RoomObjectWidgetRequestEvent } from '@/com/sulake/habbo/room/events/RoomObjectWidgetRequestEvent';
import { RoomObjectDataUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectDataUpdateMessage';
import { IntArrayStuffData } from '@/com/sulake/habbo/room/object/data/IntArrayStuffData';
import { FurnitureMultiStateLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureMultiStateLogic';

export class FurnitureRoomBackgroundColorLogic extends FurnitureMultiStateLogic {
    static { registerClassName(this, 'com.sulake.habbo.room.object.logic.furniture::FurnitureRoomBackgroundColorLogic'); }

    constructor() {
        super();
    }

    private _SafeStr_5138: boolean = false;

    public override getEventTypes(): any[] {
        let _loc1_: any[] = ["ROWRE_BACKGROUND_COLOR", "ROHSLCEE_ROOM_BACKGROUND_COLOR"];
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

    public override dispose(): void {
        if (this._SafeStr_5138) {
            if (this.eventDispatcher != null && this.object != null) {
                if (this.object.getModelController().getNumber("furniture_real_room_object") == 1) {
                    this.eventDispatcher.dispatchEvent(new RoomObjectHSLColorEnableEvent("ROHSLCEE_ROOM_BACKGROUND_COLOR", this.object, false, 0, 0, 0));
                }
            }
            this._SafeStr_5138 = false;
        }
        super.dispose();
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
        } else if (this.eventDispatcher != null && this.object != null) {
            _loc3_ = new RoomObjectWidgetRequestEvent("ROWRE_BACKGROUND_COLOR", this.object);
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
        let _loc4_: number = _loc2_.getValue(1);
        let _loc1_: number = _loc2_.getValue(2);
        let _loc3_: number = _loc2_.getValue(3);
        if (_loc5_ > -1 && _loc4_ > -1 && _loc1_ > -1 && _loc3_ > -1) {
            this.object.getModelController().setNumber("furniture_room_background_color_hue", _loc4_);
            this.object.getModelController().setNumber("furniture_room_background_color_saturation", _loc1_);
            this.object.getModelController().setNumber("furniture_room_background_color_lightness", _loc3_);
            this.object.setState(_loc5_, 0);
            if (this.eventDispatcher != null && this.object != null) {
                this.eventDispatcher.dispatchEvent(new RoomObjectHSLColorEnableEvent("ROHSLCEE_ROOM_BACKGROUND_COLOR", this.object, Boolean(_loc5_), _loc4_, _loc1_, _loc3_));
            }
            this._SafeStr_5138 = true;
        }
    }
}
