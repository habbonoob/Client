import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomSession } from '@/com/sulake/habbo/session/IRoomSession';
import { RoomSessionEvent } from '@/com/sulake/habbo/session/events/RoomSessionEvent';

export class RoomSessionPetStatusUpdateEvent extends RoomSessionEvent {
    static { registerClassName(this, 'com.sulake.habbo.session.events::RoomSessionPetStatusUpdateEvent'); }

    public static readonly PET_STATUS_UPDATE: string = "RSPFUE_PET_STATUS_UPDATE";

    declare private _petId: number;
    static { (this.prototype as any)._petId = 0; }

    declare private _canBreed: boolean;
    static { (this.prototype as any)._canBreed = false; }

    declare private _canHarvest: boolean;
    static { (this.prototype as any)._canHarvest = false; }

    declare private _canRevive: boolean;
    static { (this.prototype as any)._canRevive = false; }

    declare private _hasBreedingPermission: boolean;
    static { (this.prototype as any)._hasBreedingPermission = false; }

    constructor(param1: IRoomSession, param2: number, param3: boolean, param4: boolean, param5: boolean, param6: boolean, param7: boolean = false, param8: boolean = false) {
        super("RSPFUE_PET_STATUS_UPDATE", param1, param7, param8);
        this._petId = param2;
        this._canBreed = param3;
        this._canHarvest = param4;
        this._canRevive = param5;
        this._hasBreedingPermission = param6;
    }

    public get petId(): number {
        return this._petId;
    }

    public get canBreed(): boolean {
        return this._canBreed;
    }

    public get canHarvest(): boolean {
        return this._canHarvest;
    }

    public get canRevive(): boolean {
        return this._canRevive;
    }

    public get hasBreedingPermission(): boolean {
        return this._hasBreedingPermission;
    }
}
