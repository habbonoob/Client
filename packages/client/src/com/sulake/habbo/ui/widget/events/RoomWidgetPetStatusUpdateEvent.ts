import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';

export class RoomWidgetPetStatusUpdateEvent extends RoomWidgetUpdateEvent {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.events::RoomWidgetPetStatusUpdateEvent'); }

    public static readonly PET_STATUS_UPDATE: string = "RWPIUE_PET_STATUS_UPDATE";

    constructor(param1: number, param2: boolean, param3: boolean, param4: boolean, param5: boolean, param6: boolean = false, param7: boolean = false) {
        super("RWPIUE_PET_STATUS_UPDATE", param6, param7);
        this._petId = param1;
        this._canBreed = param2;
        this._canHarvest = param3;
        this._canRevive = param4;
        this._hasBreedingPermission = param5;
    }

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
