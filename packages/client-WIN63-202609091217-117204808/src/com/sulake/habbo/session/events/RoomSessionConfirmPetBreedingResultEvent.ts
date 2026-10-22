import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomSession } from '@/com/sulake/habbo/session/IRoomSession';
import { RoomSessionEvent } from '@/com/sulake/habbo/session/events/RoomSessionEvent';

export class RoomSessionConfirmPetBreedingResultEvent extends RoomSessionEvent {
    static { registerClassName(this, 'com.sulake.habbo.session.events::RoomSessionConfirmPetBreedingResultEvent'); }

    public static readonly CONFIRM_PET_BREEDING_RESULT: string = "RSPFUE_CONFIRM_PET_BREEDING_RESULT";

    declare private _breedingNestStuffId: number;
    static { (this.prototype as any)._breedingNestStuffId = 0; }

    declare private _result: number;
    static { (this.prototype as any)._result = 0; }

    constructor(param1: IRoomSession, param2: number, param3: number, param4: boolean = false, param5: boolean = false) {
        super("RSPFUE_CONFIRM_PET_BREEDING_RESULT", param1, param4, param5);
        this._breedingNestStuffId = param2;
        this._result = param3;
    }

    public get breedingNestStuffId(): number {
        return this._breedingNestStuffId;
    }

    public get result(): number {
        return this._result;
    }
}
