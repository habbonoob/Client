import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';

export class RoomWidgetPetBreedingEvent extends RoomWidgetUpdateEvent {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.events::RoomWidgetPetBreedingEvent'); }

    public static readonly _SafeStr_8439: number = 0;
    public static readonly _SafeStr_8326: number = 1;
    public static readonly TYPE_ACCEPT: number = 2;
    public static readonly TYPE_REQUEST: number = 3;
    public static readonly PET_BREEDING: string = "RWPPBE_PET_BREEDING_";

    constructor(param1: boolean = false, param2: boolean = false) {
        super("RWPPBE_PET_BREEDING_", param1, param2);
    }

    declare private _state: number;
    static { (this.prototype as any)._state = 0; }

    declare private _ownPetId: number;
    static { (this.prototype as any)._ownPetId = 0; }

    declare private _otherPetId: number;
    static { (this.prototype as any)._otherPetId = 0; }

    public get state(): number {
        return this._state;
    }

    public set state(param1: number) {
        this._state = param1;
    }

    public get ownPetId(): number {
        return this._ownPetId;
    }

    public set ownPetId(param1: number) {
        this._ownPetId = param1;
    }

    public get otherPetId(): number {
        return this._otherPetId;
    }

    public set otherPetId(param1: number) {
        this._otherPetId = param1;
    }
}
