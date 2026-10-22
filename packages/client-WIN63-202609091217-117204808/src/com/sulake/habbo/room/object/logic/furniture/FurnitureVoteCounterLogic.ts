import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { RoomObjectUpdateMessage } from '@/com/sulake/room/messages/RoomObjectUpdateMessage';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { RoomObjectDataUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectDataUpdateMessage';
import { VoteResultStuffData } from '@/com/sulake/habbo/room/object/data/VoteResultStuffData';
import { FurnitureMultiStateLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureMultiStateLogic';

export class FurnitureVoteCounterLogic extends FurnitureMultiStateLogic {
    static { registerClassName(this, 'com.sulake.habbo.room.object.logic.furniture::FurnitureVoteCounterLogic'); }

    private static readonly UPDATE_INTERVAL: number = 33;
    private static readonly MAX_UPDATE_TIME: number = 1000;
    private _total: number = 0;
    private _lastUpdate: number = 0;
    private _SafeStr_4104_FurnitureVoteCounterLogic: number = 33;

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
                this.updateTotal(_loc2_.result);
            }
        }
    }

    private get currentTotal(): number {
        return this.object.getModelController().getNumber("furniture_vote_counter_count") | 0;
    }

    private updateTotal(param1: number): void {
        let _loc2_: number = 0;
        this._total = param1;
        if (this._lastUpdate == 0) {
            this.object.getModelController().setNumber("furniture_vote_counter_count", param1);
            this._lastUpdate = getTimer();
            return;
        }
        if (this._total != this.currentTotal) {
            _loc2_ = Math.abs(this._total - this.currentTotal) | 0;
            if (_loc2_ * 33 > 1000) {
                this._SafeStr_4104_FurnitureVoteCounterLogic = 1000 / _loc2_ | 0;
            } else {
                this._SafeStr_4104_FurnitureVoteCounterLogic = 33;
            }
            this._lastUpdate = getTimer();
        }
    }

    public override update(param1: number): void {
        let _loc2_: number = 0;
        let _loc3_: number = 0;
        let _loc4_: number = 0;
        super.update(param1);
        if (this.object != null) {
            if (this.currentTotal != this._total && param1 >= this._lastUpdate + this._SafeStr_4104_FurnitureVoteCounterLogic) {
                _loc2_ = param1 - this._lastUpdate;
                _loc3_ = _loc2_ / this._SafeStr_4104_FurnitureVoteCounterLogic | 0;
                _loc4_ = 1;
                if (this._total < this.currentTotal) {
                    _loc4_ = -1;
                }
                if (_loc3_ > _loc4_ * (this._total - this.currentTotal)) {
                    _loc3_ = _loc4_ * (this._total - this.currentTotal);
                }
                this.object.getModelController().setNumber("furniture_vote_counter_count", this.currentTotal + _loc4_ * _loc3_);
                this._lastUpdate = param1 - (_loc2_ - _loc3_ * this._SafeStr_4104_FurnitureVoteCounterLogic);
            }
        }
    }
}
