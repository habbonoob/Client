import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { RoomObjectUpdateMessage } from '@/com/sulake/room/messages/RoomObjectUpdateMessage';
import { RoomObjectDataUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectDataUpdateMessage';
import { VoteResultStuffData } from '@/com/sulake/habbo/room/object/data/VoteResultStuffData';
import { FurnitureMultiStateLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureMultiStateLogic';

export class FurnitureVoteMajorityLogic extends FurnitureMultiStateLogic {
    static { registerClassName(this, 'com.sulake.habbo.room.object.logic.furniture::FurnitureVoteMajorityLogic'); }

    constructor() {
        super();
    }

    public override processUpdateMessage(param1: RoomObjectUpdateMessage): void {
        let _loc2_: VoteResultStuffData = null;
        super.processUpdateMessage(param1);
        let _loc3_: RoomObjectDataUpdateMessage = param1 instanceof RoomObjectDataUpdateMessage ? param1 : null;
        if (_loc3_ != null) {
            _loc2_ = asInstanceOf(_loc3_.data, VoteResultStuffData);
            if (_loc2_ != null) {
                this.object.getModelController().setNumber("furniture_vote_majority_result", _loc2_.result);
            }
        }
    }
}
