import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { BreedingPetInfo } from '@/com/sulake/habbo/communication/messages/incoming/room/pets/BreedingPetInfo';
import type { IRoomSession } from '@/com/sulake/habbo/session/IRoomSession';
import { RoomSessionEvent } from '@/com/sulake/habbo/session/events/RoomSessionEvent';

export class RoomSessionConfirmPetBreedingEvent extends RoomSessionEvent {
    static { registerClassName(this, 'com.sulake.habbo.session.events::RoomSessionConfirmPetBreedingEvent'); }

    public static readonly CONFIRM_PET_BREEDING: string = "RSPFUE_CONFIRM_PET_BREEDING";

    declare private _nestId: number;
    static { (this.prototype as any)._nestId = 0; }

    declare private _pet1: BreedingPetInfo;

    declare private _pet2: BreedingPetInfo;

    declare private _rarityCategories: any[];

    declare private _resultPetTypeId: number;
    static { (this.prototype as any)._resultPetTypeId = 0; }

    constructor(param1: IRoomSession, param2: number, param3: BreedingPetInfo, param4: BreedingPetInfo, param5: any[], param6: number, param7: boolean = false, param8: boolean = false) {
        super("RSPFUE_CONFIRM_PET_BREEDING", param1, param7, param8);
        this._nestId = param2;
        this._pet1 = param3;
        this._pet2 = param4;
        this._rarityCategories = param5;
        this._resultPetTypeId = param6;
    }

    public get rarityCategories(): any[] {
        return this._rarityCategories;
    }

    public get nestId(): number {
        return this._nestId;
    }

    public get pet1(): BreedingPetInfo {
        return this._pet1;
    }

    public get pet2(): BreedingPetInfo {
        return this._pet2;
    }

    public get resultPetTypeId(): number {
        return this._resultPetTypeId;
    }
}
