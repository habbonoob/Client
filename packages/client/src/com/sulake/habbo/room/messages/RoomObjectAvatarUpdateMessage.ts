import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IVector3d } from '@/com/sulake/room/utils/IVector3d';
import { RoomObjectMoveUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectMoveUpdateMessage';

export class RoomObjectAvatarUpdateMessage extends RoomObjectMoveUpdateMessage {
    static { registerClassName(this, 'com.sulake.habbo.room.messages::RoomObjectAvatarUpdateMessage'); }

    constructor(param1: IVector3d, param2: IVector3d, param3: IVector3d, param4: number, param5: boolean, param6: number, param7: number = NaN, param8: any = false) {
        super(param1, param2, param3, param7, false, param8);
        this._dirHead = param4;
        this._canStandUp = param5;
        this._baseY = param6;
    }

    declare private _dirHead: number;
    static { (this.prototype as any)._dirHead = 0; }

    declare private _canStandUp: boolean;
    static { (this.prototype as any)._canStandUp = false; }

    declare private _baseY: number;
    static { (this.prototype as any)._baseY = NaN; }

    public get dirHead(): number {
        return this._dirHead;
    }

    public get canStandUp(): boolean {
        return this._canStandUp;
    }

    public get baseY(): number {
        return this._baseY;
    }
}
