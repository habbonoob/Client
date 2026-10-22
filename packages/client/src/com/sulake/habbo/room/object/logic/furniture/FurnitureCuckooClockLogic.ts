import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { RoomObjectUpdateMessage } from '@/com/sulake/room/messages/RoomObjectUpdateMessage';
import type { IVector3d } from '@/com/sulake/room/utils/IVector3d';
import { RoomObjectPlaySoundIdEvent } from '@/com/sulake/habbo/room/events/RoomObjectPlaySoundIdEvent';
import { RoomObjectDataUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectDataUpdateMessage';
import { FurnitureMultiStateLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureMultiStateLogic';

export class FurnitureCuckooClockLogic extends FurnitureMultiStateLogic {
    static { registerClassName(this, 'com.sulake.habbo.room.object.logic.furniture::FurnitureCuckooClockLogic'); }

    constructor() {
        super();
    }

    private _state: number = -1;

    declare private _SafeStr_2291_FurnitureCuckooClockLogic: IVector3d;

    public override getEventTypes(): any[] {
        let _loc1_: any[] = ["ROPSIE_PLAY_SOUND_AT_PITCH"];
        return this.getAllEventTypes(super.getEventTypes(), _loc1_);
    }

    public override processUpdateMessage(param1: RoomObjectUpdateMessage): void {
        super.processUpdateMessage(param1);
        let _loc2_: RoomObjectDataUpdateMessage = param1 instanceof RoomObjectDataUpdateMessage ? param1 : null;
        if (_loc2_ != null) {
            if (this._state != -1 && _loc2_.state != this._state) {
                this.playSoundAt(this._SafeStr_2291_FurnitureCuckooClockLogic.z);
            }
            this._state = _loc2_.state;
        } else {
            this._SafeStr_2291_FurnitureCuckooClockLogic = param1.loc;
        }
    }

    private playSoundAt(param1: number): void {
        let _loc2_: number = Math.pow(2, param1 - 1.2);
        this.eventDispatcher.dispatchEvent(new RoomObjectPlaySoundIdEvent("ROPSIE_PLAY_SOUND_AT_PITCH", this.object, "FURNITURE_cuckoo_clock", _loc2_));
    }
}
