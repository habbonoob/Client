import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { RoomObjectUpdateMessage } from '@/com/sulake/room/messages/RoomObjectUpdateMessage';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import type { IRoomObjectModel } from '@/com/sulake/room/object/IRoomObjectModel';
import type { IVector3d } from '@/com/sulake/room/utils/IVector3d';
import { RoomObjectFloorHoleEvent } from '@/com/sulake/habbo/room/events/RoomObjectFloorHoleEvent';
import { RoomObjectDataUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectDataUpdateMessage';
import { FurnitureMultiStateLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureMultiStateLogic';
import { Vector3d } from '@/com/sulake/room/utils/Vector3d';

export class FurnitureFloorHoleLogic extends FurnitureMultiStateLogic {
    static { registerClassName(this, 'com.sulake.habbo.room.object.logic.furniture::FurnitureFloorHoleLogic'); }

    private static readonly STATE_HOLE: number = 0;

    constructor() {
        super();
    }

    private _SafeStr_3894: number = -1;
    private _location: Vector3d = null;

    public override dispose(): void {
        if (this._SafeStr_3894 == 0) {
            this.eventDispatcher.dispatchEvent(new RoomObjectFloorHoleEvent("ROFHO_REMOVE_HOLE", this.object));
        }
        super.dispose();
    }

    public override getEventTypes(): any[] {
        let _loc1_: any[] = ["ROFHO_ADD_HOLE", "ROFHO_REMOVE_HOLE"];
        return this.getAllEventTypes(super.getEventTypes(), _loc1_);
    }

    public override processUpdateMessage(param1: RoomObjectUpdateMessage): void {
        let _loc4_: RoomObjectDataUpdateMessage = null;
        let _loc3_: number = 0;
        let _loc2_: IVector3d = null;
        super.processUpdateMessage(param1);
        if (this.object != null) {
            _loc4_ = param1 instanceof RoomObjectDataUpdateMessage ? param1 : null;
            if (_loc4_ != null) {
                _loc3_ = this.object.getState(0);
                this.handleStateUpdate(_loc3_);
            }
            _loc2_ = this.object.getLocation();
            if (this._location == null) {
                this._location = new Vector3d();
            } else if (_loc2_.x != this._location.x || _loc2_.y != this._location.y) {
                if (this._SafeStr_3894 == 0) {
                    if (this.eventDispatcher != null) {
                        this.eventDispatcher.dispatchEvent(new RoomObjectFloorHoleEvent("ROFHO_ADD_HOLE", this.object));
                    }
                }
            }
            this._location.assign(_loc2_);
        }
    }

    public override update(param1: number): void {
        super.update(param1);
        this.handleAutomaticStateUpdate();
    }

    private handleStateUpdate(param1: number): void {
        if (param1 != this._SafeStr_3894) {
            if (this.eventDispatcher != null) {
                if (param1 == 0) {
                    this.eventDispatcher.dispatchEvent(new RoomObjectFloorHoleEvent("ROFHO_ADD_HOLE", this.object));
                } else if (this._SafeStr_3894 == 0) {
                    this.eventDispatcher.dispatchEvent(new RoomObjectFloorHoleEvent("ROFHO_REMOVE_HOLE", this.object));
                }
            }
            this._SafeStr_3894 = param1;
        }
    }

    private handleAutomaticStateUpdate(): void {
        let _loc3_: IRoomObjectModel = null;
        let _loc2_: number = NaN;
        let _loc4_: number = 0;
        let _loc1_: IRoomObject = this.object;
        if (_loc1_ != null) {
            _loc3_ = _loc1_.getModel();
            if (_loc3_ != null) {
                _loc2_ = _loc3_.getNumber("furniture_automatic_state_index");
                if (!isNaN(_loc2_)) {
                    _loc4_ = _loc2_ | 0;
                    _loc4_ = _loc4_ % 2;
                    this.handleStateUpdate(_loc4_);
                }
            }
        }
    }
}
