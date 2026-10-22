import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { RoomObjectUpdateMessage } from '@/com/sulake/room/messages/RoomObjectUpdateMessage';
import type { IVector3d } from '@/com/sulake/room/utils/IVector3d';
import { RoomObjectDataUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectDataUpdateMessage';
import { RoomObjectMoveUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectMoveUpdateMessage';
import { LegacyStuffData } from '@/com/sulake/habbo/room/object/data/LegacyStuffData';
import { FurnitureMultiStateLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureMultiStateLogic';
import { Vector3d } from '@/com/sulake/room/utils/Vector3d';

export class FurniturePushableLogic extends FurnitureMultiStateLogic {
    static { registerClassName(this, 'com.sulake.habbo.room.object.logic.furniture::FurniturePushableLogic'); }

    private static readonly ANIMATION_NOT_MOVING: number = 0;
    private static readonly ANIMATION_MOVING: number = 1;
    private static readonly MAX_ANIMATION_COUNT: number = 10;
    private _SafeStr_5755: Vector3d = null;

    constructor() {
        super();
        this.setMoveUpdateInterval(500);
        this._SafeStr_5755 = new Vector3d();
    }

    public override processUpdateMessage(param1: RoomObjectUpdateMessage): void {
        let _loc3_: IVector3d = null;
        let _loc5_: IVector3d = null;
        let _loc6_: IVector3d = null;
        if (param1 == null) {
            return;
        }
        let _loc4_: RoomObjectMoveUpdateMessage = param1 instanceof RoomObjectMoveUpdateMessage ? param1 : null;
        if (this.object != null && _loc4_ == null) {
            if (param1.loc != null) {
                _loc3_ = this.object.getLocation();
                _loc5_ = Vector3d.dif(param1.loc, _loc3_);
                if (_loc5_ != null) {
                    if (Math.abs(_loc5_.x) < 2 && Math.abs(_loc5_.y) < 2) {
                        _loc6_ = _loc3_;
                        if (Math.abs(_loc5_.x) > 1 || Math.abs(_loc5_.y) > 1) {
                            _loc6_ = Vector3d.sum(_loc3_, Vector3d.product(_loc5_, 0.5));
                        }
                        _loc4_ = new RoomObjectMoveUpdateMessage(_loc6_, param1.loc, param1.dir);
                        super.processUpdateMessage(_loc4_);
                        return;
                    }
                }
            }
        }
        if (param1.loc != null && _loc4_ == null) {
            _loc4_ = new RoomObjectMoveUpdateMessage(param1.loc, param1.loc, param1.dir);
            super.processUpdateMessage(_loc4_);
        }
        let _loc2_: number = Number(_loc4_ == null || isNaN(_loc4_.animationTime) ? 500 : _loc4_.animationTime);
        let _loc7_: RoomObjectDataUpdateMessage = param1 instanceof RoomObjectDataUpdateMessage ? param1 : null;
        if (_loc7_ != null) {
            if (_loc7_.state > 0) {
                this.setMoveUpdateInterval(_loc2_ / this.getUpdateIntervalValue(_loc7_.state) | 0);
            } else {
                this.setMoveUpdateInterval(1);
            }
            this.handleDataUpdateMessage_FurniturePushableLogic(_loc7_);
            return;
        }
        super.processUpdateMessage(param1);
    }

    protected getUpdateIntervalValue(param1: number): number {
        return param1 / 10 | 0;
    }

    protected getAnimationValue(param1: number): number {
        return param1 % 10;
    }

    private handleDataUpdateMessage_FurniturePushableLogic(param1: RoomObjectDataUpdateMessage): void {
        let _loc2_: LegacyStuffData = null;
        let _loc3_: number = this.getAnimationValue(param1.state);
        if (_loc3_ != param1.state) {
            _loc2_ = new LegacyStuffData();
            _loc2_.setString(String(_loc3_));
            param1 = new RoomObjectDataUpdateMessage(_loc3_, _loc2_, param1.extra);
        }
        super.processUpdateMessage(param1);
    }

    public override update(param1: number): void {
        if (this.object != null) {
            this._SafeStr_5755.assign(this.object.getLocation());
            super.update(param1);
            if (Vector3d.dif(this.object.getLocation(), this._SafeStr_5755).length == 0) {
                if (this.object.getState(0) != 0) {
                    this.object.setState(0, 0);
                }
            }
        }
    }
}
