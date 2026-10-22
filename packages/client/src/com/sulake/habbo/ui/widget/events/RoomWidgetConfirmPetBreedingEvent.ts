import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ConfirmPetBreedingPetData } from '@/com/sulake/habbo/ui/widget/events/ConfirmPetBreedingPetData';
import { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';

export class RoomWidgetConfirmPetBreedingEvent extends RoomWidgetUpdateEvent {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.events::RoomWidgetConfirmPetBreedingEvent'); }

    public static readonly CONFIRM_PET_BREEDING: string = "RWPPBE_CONFIRM_PET_BREEDING_";

    constructor(param1: number, param2: ConfirmPetBreedingPetData, param3: ConfirmPetBreedingPetData, param4: any[], param5: number, param6: boolean = false, param7: boolean = false) {
        super("RWPPBE_CONFIRM_PET_BREEDING_", param6, param7);
        this._nestId = param1;
        this._pet1 = param2;
        this._pet2 = param3;
        this._rarityCategories = param4;
        this._resultPetTypeId = param5;
    }

    declare private _nestId: number;
    static { (this.prototype as any)._nestId = 0; }

    declare private _resultPetTypeId: number;
    static { (this.prototype as any)._resultPetTypeId = 0; }

    declare private _pet1: ConfirmPetBreedingPetData;

    public get pet1(): ConfirmPetBreedingPetData {
        return this._pet1;
    }

    declare private _pet2: ConfirmPetBreedingPetData;

    public get pet2(): ConfirmPetBreedingPetData {
        return this._pet2;
    }

    declare private _rarityCategories: any[];

    public get rarityCategories(): any[] {
        return this._rarityCategories;
    }

    public get nestId(): number {
        return this._nestId;
    }

    public get resultPetTypeId(): number {
        return this._resultPetTypeId;
    }
}
