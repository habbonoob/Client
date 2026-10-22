import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import { RoomObjectEvent } from '@/com/sulake/room/events/RoomObjectEvent';

export class RoomObjectBadgeAssetEvent extends RoomObjectEvent {
    static { registerClassName(this, 'com.sulake.habbo.room.events::RoomObjectBadgeAssetEvent'); }

    public static readonly LOAD_BADGE: string = "ROGBE_LOAD_BADGE";

    constructor(param1: string, param2: IRoomObject, param3: string, param4: boolean = true, param5: boolean = false, param6: boolean = false) {
        super(param1, param2, param5, param6);
        this._badgeId = param3;
        this._groupBadge = param4;
    }

    declare private _badgeId: string;

    declare private _groupBadge: boolean;
    static { (this.prototype as any)._groupBadge = false; }

    public get badgeId(): string {
        return this._badgeId;
    }

    public get groupBadge(): boolean {
        return this._groupBadge;
    }
}
