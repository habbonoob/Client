import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { PetBreedingResultData } from '@/com/sulake/habbo/communication/messages/incoming/room/pets/PetBreedingResultData';
import type { IRoomSession } from '@/com/sulake/habbo/session/IRoomSession';
import { RoomSessionEvent } from '@/com/sulake/habbo/session/events/RoomSessionEvent';

export class RoomSessionPetBreedingResultEvent extends RoomSessionEvent {
    static { registerClassName(this, 'com.sulake.habbo.session.events::RoomSessionPetBreedingResultEvent'); }

    public static readonly PET_BREEDING_RESULT: string = "RSPFUE_PET_BREEDING_RESULT";

    declare private _resultData: PetBreedingResultData;

    declare private _otherResultData: PetBreedingResultData;

    constructor(param1: IRoomSession, param2: PetBreedingResultData, param3: PetBreedingResultData, param4: boolean = false, param5: boolean = false) {
        super("RSPFUE_PET_BREEDING_RESULT", param1, param4, param5);
        this._resultData = param2;
        this._otherResultData = param3;
    }

    public get resultData(): PetBreedingResultData {
        return this._resultData;
    }

    public get otherResultData(): PetBreedingResultData {
        return this._otherResultData;
    }
}
