import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';

export class RoomWidgetPetLevelUpdateEvent extends RoomWidgetUpdateEvent {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.events::RoomWidgetPetLevelUpdateEvent'); }

    public static readonly PET_LEVEL_UPDATE: string = "RWPLUE_PET_LEVEL_UPDATE";

    constructor(param1: number, param2: number, param3: boolean = false, param4: boolean = false) {
        super("RWPLUE_PET_LEVEL_UPDATE", param3, param4);
        this._petId = param1;
        this._level = param2;
    }

    declare private _petId: number;
    static { (this.prototype as any)._petId = 0; }

    declare private _level: number;
    static { (this.prototype as any)._level = 0; }

    public get petId(): number {
        return this._petId;
    }

    public get level(): number {
        return this._level;
    }
}
