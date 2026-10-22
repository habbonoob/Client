import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IVector3d } from '@/com/sulake/room/utils/IVector3d';

export class RoomObjectUpdateMessage {
    static { registerClassName(this, 'com.sulake.room.messages::RoomObjectUpdateMessage'); }

    constructor(param1: IVector3d, param2: IVector3d) {
        this._SafeStr_2291 = param1;
        this._dir = param2;
    }

    declare protected _SafeStr_2291: IVector3d;

    declare protected _dir: IVector3d;

    public get loc(): IVector3d {
        return this._SafeStr_2291;
    }

    public get dir(): IVector3d {
        return this._dir;
    }
}
