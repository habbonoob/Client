import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { RoomObjectEvent } from '@/com/sulake/room/events/RoomObjectEvent';
import type { RoomObjectUpdateMessage } from '@/com/sulake/room/messages/RoomObjectUpdateMessage';
import { RoomObjectDimmerStateUpdateEvent } from '@/com/sulake/habbo/room/events/RoomObjectDimmerStateUpdateEvent';
import { RoomObjectWidgetRequestEvent } from '@/com/sulake/habbo/room/events/RoomObjectWidgetRequestEvent';
import { RoomObjectDataUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectDataUpdateMessage';
import { FurnitureLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureLogic';

export class FurnitureRoomDimmerLogic extends FurnitureLogic {
    static { registerClassName(this, 'com.sulake.habbo.room.object.logic.furniture::FurnitureRoomDimmerLogic'); }

    constructor() {
        super();
    }

    private _SafeStr_5138: boolean = false;

    public override getEventTypes(): any[] {
        let _loc1_: any[] = ["ROWRE_DIMMER", "ROWRE_WIDGET_REMOVE_DIMMER", "RODSUE_DIMMER_STATE"];
        return this.getAllEventTypes(super.getEventTypes(), _loc1_);
    }

    public override useObject(): void {
        let _loc1_: RoomObjectEvent = null;
        if (this.eventDispatcher != null && this.object != null) {
            _loc1_ = new RoomObjectWidgetRequestEvent("ROWRE_DIMMER", this.object);
            this.eventDispatcher.dispatchEvent(_loc1_);
        }
    }

    public override dispose(): void {
        let _loc3_: RoomObjectDimmerStateUpdateEvent = null;
        let _loc1_: any = 0;
        let _loc2_: number = 0;
        let _loc4_: RoomObjectEvent = null;
        if (this._SafeStr_5138) {
            if (this.eventDispatcher != null && this.object != null) {
                if (this.object.getModelController().getNumber("furniture_real_room_object") == 1) {
                    _loc1_ = 16777215;
                    _loc2_ = 255;
                    _loc3_ = new RoomObjectDimmerStateUpdateEvent(this.object, 0, 1, 1, _loc1_ >>> 0, _loc2_);
                    this.eventDispatcher.dispatchEvent(_loc3_);
                    _loc4_ = new RoomObjectWidgetRequestEvent("ROWRE_WIDGET_REMOVE_DIMMER", this.object);
                    this.eventDispatcher.dispatchEvent(_loc4_);
                }
                this._SafeStr_5138 = false;
            }
        }
        super.dispose();
    }

    public override processUpdateMessage(param1: RoomObjectUpdateMessage): void {
        let _loc2_: number = 0;
        let _loc3_: RoomObjectDataUpdateMessage = param1 instanceof RoomObjectDataUpdateMessage ? param1 : null;
        if (_loc3_ != null) {
            if (_loc3_.data != null) {
                if (this.object.getModelController().getNumber("furniture_real_room_object") == 1) {
                    this.dispatchColorUpdateEvent(_loc3_.data.getLegacyString());
                }
                _loc2_ = this.readState(_loc3_.data.getLegacyString());
                _loc3_ = new RoomObjectDataUpdateMessage(_loc2_, _loc3_.data);
                super.processUpdateMessage(_loc3_);
            }
            return;
        }
        super.processUpdateMessage(param1);
    }

    public override update(param1: number): void {
        let _loc2_: string = null;
        super.update(param1);
        if (this.object != null && this.object.getModelController() != null) {
            if (this.object.getModelController().getNumber("furniture_real_room_object") == 1) {
                _loc2_ = this.object.getModelController().getString("furniture_data");
                if (_loc2_ != null && _loc2_.length > 0) {
                    this.object.getModelController().setString("furniture_data", "");
                    this.dispatchColorUpdateEvent(_loc2_);
                }
            }
        }
    }

    private dispatchColorUpdateEvent(param1: string): void {
        let _loc6_: number = 0;
        let _loc9_: number = 0;
        let _loc2_: number = 0;
        let _loc5_: string = null;
        let _loc3_: any = 0;
        let _loc4_: number = 0;
        let _loc8_: RoomObjectDimmerStateUpdateEvent = null;
        if (param1 == null) {
            return;
        }
        let _loc7_: any[] = param1.split(",");
        if (_loc7_.length >= 5) {
            _loc6_ = this.readState(param1);
            _loc9_ = parseInt(stringOrNull(_loc7_[1])) | 0;
            _loc2_ = parseInt(stringOrNull(_loc7_[2])) | 0;
            _loc5_ = stringOrNull(_loc7_[3]);
            _loc3_ = parseInt(_loc5_.substr(1), 16);
            _loc4_ = parseInt(stringOrNull(_loc7_[4])) | 0;
            if (_loc6_ == 0) {
                _loc3_ = 16777215;
                _loc4_ = 255;
            }
            if (this.eventDispatcher != null && this.object != null) {
                _loc8_ = new RoomObjectDimmerStateUpdateEvent(this.object, _loc6_, _loc9_, _loc2_, _loc3_ >>> 0, _loc4_);
                this.eventDispatcher.dispatchEvent(_loc8_);
                this._SafeStr_5138 = true;
            }
        }
    }

    private readState(param1: string): number {
        let _loc2_: number = 0;
        if (param1 == null) {
            return 0;
        }
        let _loc3_: any[] = param1.split(",");
        if (_loc3_.length >= 5) {
            return parseInt(stringOrNull(_loc3_[0])) - 1 | 0;
        }
        return 0;
    }
}
