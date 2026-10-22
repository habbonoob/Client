import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomEngineEvent } from '@/com/sulake/habbo/room/events/RoomEngineEvent';

export class RoomEngineObjectEvent extends RoomEngineEvent {
    static { registerClassName(this, 'com.sulake.habbo.room.events::RoomEngineObjectEvent'); }

    public static readonly _SafeStr_7530: string = "REOE_SELECTED";
    public static readonly DESELECTED: string = "REOE_DESELECTED";
    public static readonly ADDED: string = "REOE_ADDED";
    public static readonly REMOVED: string = "REOE_REMOVED";
    public static readonly _SafeStr_7470: string = "REOE_UPDATED";
    public static readonly PLACED: string = "REOE_PLACED";
    public static readonly PLACED_ON_USER: string = "REOE_PLACED_ON_USER";
    public static readonly CONTENT_UPDATED: string = "REOE_CONTENT_UPDATED";
    public static readonly REQUEST_MOVE: string = "REOE_REQUEST_MOVE";
    public static readonly REQUEST_ROTATE: string = "REOE_REQUEST_ROTATE";
    public static readonly REQUEST_PICKUP: string = "REOE_REQUEST_PICKUP";
    public static readonly MOUSE_ENTER: string = "REOE_MOUSE_ENTER";
    public static readonly MOUSE_LEAVE: string = "REOE_MOUSE_LEAVE";

    declare private _objectId: number;
    static { (this.prototype as any)._objectId = 0; }

    declare private _category: number;
    static { (this.prototype as any)._category = 0; }

    declare private _modifierKey: boolean;
    static { (this.prototype as any)._modifierKey = false; }

    constructor(param1: string, param2: number, param3: number, param4: number, param5: boolean = false, param6: boolean = false, param7: boolean = false) {
        super(param1, param2, param5, param6);
        this._objectId = param3;
        this._category = param4;
        this._modifierKey = param7;
    }

    public get objectId(): number {
        return this._objectId;
    }

    public get category(): number {
        return this._category;
    }

    public get modifierKey(): boolean {
        return this._modifierKey;
    }
}
