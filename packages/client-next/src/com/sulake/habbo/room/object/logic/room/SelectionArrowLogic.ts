import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { RoomObjectUpdateMessage } from '@/com/sulake/room/messages/RoomObjectUpdateMessage';
import type { IRoomObjectModelController } from '@/com/sulake/room/object/IRoomObjectModelController';
import type { XML } from '@habbo-pixi/runtime/xml/XML';
import { RoomObjectVisibilityUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectVisibilityUpdateMessage';
import { ObjectLogicBase } from '@/com/sulake/room/object/logic/ObjectLogicBase';

export class SelectionArrowLogic extends ObjectLogicBase {
    static { registerClassName(this, 'com.sulake.habbo.room.object.logic.room::SelectionArrowLogic'); }

    constructor() {
        super();
    }

    public override initialize(param1: XML): void {
        let _loc2_: IRoomObjectModelController = null;
        if (this.object != null) {
            _loc2_ = this.object.getModelController();
            if (_loc2_ != null) {
                _loc2_.setNumber("furniture_alpha_multiplier", 1);
                this.object.setState(1, 0);
            }
        }
    }

    public override processUpdateMessage(param1: RoomObjectUpdateMessage): void {
        super.processUpdateMessage(param1);
        let _loc2_: RoomObjectVisibilityUpdateMessage = param1 instanceof RoomObjectVisibilityUpdateMessage ? param1 : null;
        if (_loc2_ != null) {
            if (_loc2_.type == "ROVUM_ENABLED") {
                if (this.object != null) {
                    this.object.setState(0, 0);
                }
            } else if (_loc2_.type == "ROVUM_DISABLED") {
                if (this.object != null) {
                    this.object.setState(1, 0);
                }
            }
        }
    }
}
