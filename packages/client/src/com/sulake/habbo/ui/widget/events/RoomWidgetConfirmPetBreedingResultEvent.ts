import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';

export class RoomWidgetConfirmPetBreedingResultEvent extends RoomWidgetUpdateEvent {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.events::RoomWidgetConfirmPetBreedingResultEvent'); }

    public static readonly CONFIRM_PET_BREEDING_RESULT: string = "RWPPBE_CONFIRM_PET_BREEDING_RESULT";
    public static readonly SUCCESS: number = 0;
    public static readonly NO_NEST_FOUND: number = 1;
    public static readonly PETS_MISSING: number = 2;
    public static readonly INVALID_NAME: number = 3;

    constructor(param1: number, param2: number, param3: boolean = false, param4: boolean = false) {
        super("RWPPBE_CONFIRM_PET_BREEDING_RESULT", param3, param4);
        this._breedingNestStuffId = param1;
        this._result = param2;
    }

    declare private _breedingNestStuffId: number;
    static { (this.prototype as any)._breedingNestStuffId = 0; }

    declare private _result: number;
    static { (this.prototype as any)._result = 0; }

    public get breedingNestStuffId(): number {
        return this._breedingNestStuffId;
    }

    public get result(): number {
        return this._result;
    }
}
