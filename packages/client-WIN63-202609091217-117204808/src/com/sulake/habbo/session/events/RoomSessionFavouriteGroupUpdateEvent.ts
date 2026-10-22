import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomSession } from '@/com/sulake/habbo/session/IRoomSession';
import { RoomSessionEvent } from '@/com/sulake/habbo/session/events/RoomSessionEvent';

export class RoomSessionFavouriteGroupUpdateEvent extends RoomSessionEvent {
    static { registerClassName(this, 'com.sulake.habbo.session.events::RoomSessionFavouriteGroupUpdateEvent'); }

    public static readonly _SafeStr_7916: string = "rsfgue_favourite_group_update";

    declare private _roomIndex: number;
    static { (this.prototype as any)._roomIndex = 0; }

    declare private _habboGroupId: number;
    static { (this.prototype as any)._habboGroupId = 0; }

    declare private _habboGroupName: string;

    declare private _status: number;
    static { (this.prototype as any)._status = 0; }

    constructor(param1: IRoomSession, param2: number, param3: number, param4: number, param5: string, param6: boolean = false, param7: boolean = false) {
        super("rsfgue_favourite_group_update", param1, param6, param7);
        this._roomIndex = param2;
        this._habboGroupId = param3;
        this._habboGroupName = param5;
        this._status = param4;
    }

    public get roomIndex(): number {
        return this._roomIndex;
    }

    public get habboGroupId(): number {
        return this._habboGroupId;
    }

    public get habboGroupName(): string {
        return this._habboGroupName;
    }

    public get status(): number {
        return this._status;
    }
}
