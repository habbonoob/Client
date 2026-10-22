import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IVector3d } from '@/com/sulake/room/utils/IVector3d';
import { RoomToObjectEvent } from '@/com/sulake/room/events/RoomToObjectEvent';

export class RoomToObjectOwnAvatarMoveEvent extends RoomToObjectEvent {
    static { registerClassName(this, 'com.sulake.habbo.room.events::RoomToObjectOwnAvatarMoveEvent'); }

    public static readonly MOVE_TO: string = "ROAME_MOVE_TO";

    constructor(param1: string, param2: IVector3d, param3: boolean = false, param4: boolean = false) {
        super(param1, param3, param4);
        this._SafeStr_2390 = param2;
    }

    declare private _SafeStr_2390: IVector3d;

    public get targetLoc(): IVector3d {
        return this._SafeStr_2390;
    }
}
