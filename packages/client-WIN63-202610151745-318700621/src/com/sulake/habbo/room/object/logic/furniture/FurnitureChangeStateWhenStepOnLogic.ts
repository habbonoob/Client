import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { RoomToObjectOwnAvatarMoveEvent } from '@/com/sulake/habbo/room/events/RoomToObjectOwnAvatarMoveEvent';
import type { IVector3d } from '@/com/sulake/room/utils/IVector3d';
import type { XML } from '@habbo-pixi/runtime/xml/XML';
import { FurnitureLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureLogic';

export class FurnitureChangeStateWhenStepOnLogic extends FurnitureLogic {
    static { registerClassName(this, 'com.sulake.habbo.room.object.logic.furniture::FurnitureChangeStateWhenStepOnLogic'); }

    constructor() {
        super();
    }

    public override initialize(param1: XML): void {
        super.initialize(param1);
        this.eventDispatcher.addEventListener("ROAME_MOVE_TO", this.onOwnAvatarMove);
    }

    public override tearDown(): void {
        this.eventDispatcher.removeEventListener("ROAME_MOVE_TO", this.onOwnAvatarMove);
        super.tearDown();
    }

    private onOwnAvatarMove = (param1: RoomToObjectOwnAvatarMoveEvent): void => {
        let _loc6_: number = 0;
        let _loc5_: number = 0;
        let _loc7_: IVector3d = null;
        let _loc3_: number = 0;
        let _loc4_: number = 0;
        if (this.object == null) {
            return;
        }
        let _loc2_: IVector3d = this.object.getLocation();
        if (param1.targetLoc) {
            _loc6_ = this.object.getModel().getNumber("furniture_size_x") | 0;
            _loc5_ = this.object.getModel().getNumber("furniture_size_y") | 0;
            _loc7_ = this.object.getDirection();
            _loc3_ = 0;
            _loc4_ = (_loc7_.x + 45 | 0) % 360 / 90 | 0;
            if (_loc4_ == 1 || _loc4_ == 3) {
                _loc3_ = _loc6_;
                _loc6_ = _loc5_;
                _loc5_ = _loc3_;
            }
            if (param1.targetLoc.x >= _loc2_.x && param1.targetLoc.x < _loc2_.x + _loc6_ && (param1.targetLoc.y >= _loc2_.y && param1.targetLoc.y < _loc2_.y + _loc5_)) {
                this.object.setState(1, 0);
            } else {
                this.object.setState(0, 0);
            }
        }
    };
}
