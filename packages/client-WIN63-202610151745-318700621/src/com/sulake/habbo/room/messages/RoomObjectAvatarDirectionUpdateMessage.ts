import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IVector3d } from '@/com/sulake/room/utils/IVector3d';
import { RoomObjectUpdateMessage } from '@/com/sulake/room/messages/RoomObjectUpdateMessage';

export class RoomObjectAvatarDirectionUpdateMessage extends RoomObjectUpdateMessage {
    static { registerClassName(this, 'com.sulake.habbo.room.messages::RoomObjectAvatarDirectionUpdateMessage'); }

    declare private _dirHead: number;
    static { (this.prototype as any)._dirHead = 0; }

    constructor(param1: IVector3d, param2: IVector3d, param3: number) {
        super(param1, param2);
        this._dirHead = param3;
    }

    public get dirHead(): number {
        return this._dirHead;
    }
}
