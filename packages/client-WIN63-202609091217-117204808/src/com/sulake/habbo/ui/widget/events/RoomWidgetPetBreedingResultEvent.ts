import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { PetBreedingResultEventData } from '@/com/sulake/habbo/ui/widget/events/PetBreedingResultEventData';
import { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';

export class RoomWidgetPetBreedingResultEvent extends RoomWidgetUpdateEvent {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.events::RoomWidgetPetBreedingResultEvent'); }

    public static readonly PET_BREEDING_RESULT: string = "RWPBRE_PET_BREEDING_RESULT";

    declare private _resultData: PetBreedingResultEventData;

    declare private _resultData2: PetBreedingResultEventData;

    constructor(param1: PetBreedingResultEventData, param2: PetBreedingResultEventData, param3: boolean = false, param4: boolean = false) {
        super("RWPBRE_PET_BREEDING_RESULT", param3, param4);
        this._resultData = param1;
        this._resultData2 = param2;
    }

    public get resultData(): PetBreedingResultEventData {
        return this._resultData;
    }

    public get resultData2(): PetBreedingResultEventData {
        return this._resultData2;
    }
}
