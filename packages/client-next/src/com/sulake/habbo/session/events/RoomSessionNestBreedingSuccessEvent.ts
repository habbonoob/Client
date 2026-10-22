import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomSession } from '@/com/sulake/habbo/session/IRoomSession';
import { RoomSessionEvent } from '@/com/sulake/habbo/session/events/RoomSessionEvent';

export class RoomSessionNestBreedingSuccessEvent extends RoomSessionEvent {
    static { registerClassName(this, 'com.sulake.habbo.session.events::RoomSessionNestBreedingSuccessEvent'); }

    public static readonly NEST_BREEDING_SUCCESS: string = "RSPFUE_NEST_BREEDING_SUCCESS";

    declare private _rarityCategory: number;
    static { (this.prototype as any)._rarityCategory = 0; }

    declare private _petId: number;
    static { (this.prototype as any)._petId = 0; }

    constructor(param1: IRoomSession, param2: number, param3: number, param4: boolean = false, param5: boolean = false) {
        super("RSPFUE_NEST_BREEDING_SUCCESS", param1, param4, param5);
        this._petId = param2;
        this._rarityCategory = param3;
    }

    public get rarityCategory(): number {
        return this._rarityCategory;
    }

    public get petId(): number {
        return this._petId;
    }
}
