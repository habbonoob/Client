import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomSession } from '@/com/sulake/habbo/session/IRoomSession';
import { RoomSessionEvent } from '@/com/sulake/habbo/session/events/RoomSessionEvent';

export class RoomSessionPetBreedingEvent extends RoomSessionEvent {
    static { registerClassName(this, 'com.sulake.habbo.session.events::RoomSessionPetBreedingEvent'); }

    public static readonly PET_BREEDING: string = "RSPFUE_PET_BREEDING";

    declare private _state: number;
    static { (this.prototype as any)._state = 0; }

    declare private _ownPetId: number;
    static { (this.prototype as any)._ownPetId = 0; }

    declare private _otherPetId: number;
    static { (this.prototype as any)._otherPetId = 0; }

    constructor(param1: IRoomSession, param2: number, param3: number, param4: number, param5: boolean = false, param6: boolean = false) {
        super("RSPFUE_PET_BREEDING", param1, param5, param6);
        this._state = param2;
        this._ownPetId = param3;
        this._otherPetId = param4;
    }

    public get state(): number {
        return this._state;
    }

    public get ownPetId(): number {
        return this._ownPetId;
    }

    public get otherPetId(): number {
        return this._otherPetId;
    }
}
