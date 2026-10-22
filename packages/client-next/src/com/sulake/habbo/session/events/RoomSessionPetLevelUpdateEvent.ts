import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomSession } from '@/com/sulake/habbo/session/IRoomSession';
import { RoomSessionEvent } from '@/com/sulake/habbo/session/events/RoomSessionEvent';

export class RoomSessionPetLevelUpdateEvent extends RoomSessionEvent {
    static { registerClassName(this, 'com.sulake.habbo.session.events::RoomSessionPetLevelUpdateEvent'); }

    public static readonly PET_LEVEL_UPDATE: string = "RSPLUE_PET_LEVEL_UPDATE";

    declare private _petId: number;
    static { (this.prototype as any)._petId = 0; }

    declare private _level: number;
    static { (this.prototype as any)._level = 0; }

    constructor(param1: IRoomSession, param2: number, param3: number, param4: boolean = false, param5: boolean = false) {
        super("RSPLUE_PET_LEVEL_UPDATE", param1, param4, param5);
        this._petId = param2;
        this._level = param3;
    }

    public get petId(): number {
        return this._petId;
    }

    public get level(): number {
        return this._level;
    }
}
