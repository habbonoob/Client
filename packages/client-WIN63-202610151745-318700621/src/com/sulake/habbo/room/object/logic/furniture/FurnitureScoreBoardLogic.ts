import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { RoomObjectUpdateMessage } from '@/com/sulake/room/messages/RoomObjectUpdateMessage';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { RoomObjectDataUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectDataUpdateMessage';
import { FurnitureLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureLogic';

export class FurnitureScoreBoardLogic extends FurnitureLogic {
    static { registerClassName(this, 'com.sulake.habbo.room.object.logic.furniture::FurnitureScoreBoardLogic'); }

    private static readonly UPDATE_INTERVAL: number = 50;
    private static readonly MAX_UPDATE_TIME: number = 3000;
    private _score: number = 0;
    private _lastUpdate: number = 0;
    private _SafeStr_4104_FurnitureScoreBoardLogic: number = 50;

    constructor() {
        super();
    }

    public override processUpdateMessage(param1: RoomObjectUpdateMessage): void {
        let _loc2_: RoomObjectDataUpdateMessage = param1 instanceof RoomObjectDataUpdateMessage ? param1 : null;
        if (_loc2_ != null) {
            this.updateScore(_loc2_.state);
            return;
        }
        super.processUpdateMessage(param1);
    }

    private updateScore(param1: number): void {
        let _loc3_: number = 0;
        this._score = param1;
        let _loc2_: number = this.object.getState(0);
        if (this._score != _loc2_) {
            _loc3_ = this._score - _loc2_;
            if (_loc3_ < 0) {
                _loc3_ = -_loc3_;
            }
            if (_loc3_ * 50 > 3000) {
                this._SafeStr_4104_FurnitureScoreBoardLogic = 3000 / _loc3_ | 0;
            } else {
                this._SafeStr_4104_FurnitureScoreBoardLogic = 50;
            }
            this._lastUpdate = getTimer();
        }
    }

    public override update(param1: number): void {
        let _loc2_: number = 0;
        let _loc3_: number = 0;
        let _loc4_: number = 0;
        let _loc5_: number = 0;
        super.update(param1);
        if (this.object != null) {
            _loc2_ = this.object.getState(0);
            if (_loc2_ != this._score && param1 >= this._lastUpdate + this._SafeStr_4104_FurnitureScoreBoardLogic) {
                _loc3_ = param1 - this._lastUpdate;
                _loc4_ = _loc3_ / this._SafeStr_4104_FurnitureScoreBoardLogic | 0;
                _loc5_ = 1;
                if (this._score < _loc2_) {
                    _loc5_ = -1;
                }
                if (_loc4_ > _loc5_ * (this._score - _loc2_)) {
                    _loc4_ = _loc5_ * (this._score - _loc2_);
                }
                this.object.setState(_loc2_ + _loc5_ * _loc4_, 0);
                this._lastUpdate = param1 - (_loc3_ - _loc4_ * this._SafeStr_4104_FurnitureScoreBoardLogic);
            }
        }
    }
}
