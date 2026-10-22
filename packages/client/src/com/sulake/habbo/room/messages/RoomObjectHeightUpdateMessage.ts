import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IVector3d } from '@/com/sulake/room/utils/IVector3d';
import { RoomObjectUpdateMessage } from '@/com/sulake/room/messages/RoomObjectUpdateMessage';

export class RoomObjectHeightUpdateMessage extends RoomObjectUpdateMessage {
    static { registerClassName(this, 'com.sulake.habbo.room.messages::RoomObjectHeightUpdateMessage'); }

    constructor(param1: IVector3d, param2: IVector3d, param3: number) {
        super(param1, param2);
        this._height = param3;
    }

    declare private _height: number;
    static { (this.prototype as any)._height = NaN; }

    public get height(): number {
        return this._height;
    }
}
