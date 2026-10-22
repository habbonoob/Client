import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IVector3d } from '@/com/sulake/room/utils/IVector3d';
import { RoomObjectMoveUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectMoveUpdateMessage';

export class RoomObjectAvatarUpdateMessage extends RoomObjectMoveUpdateMessage {
    static { registerClassName(this, 'com.sulake.habbo.room.messages::RoomObjectAvatarUpdateMessage'); }

    declare private _dirHead: number;
    static { (this.prototype as any)._dirHead = 0; }

    declare private _SafeStr_14185: boolean;
    static { (this.prototype as any)._SafeStr_14185 = false; }

    declare private _baseY: number;
    static { (this.prototype as any)._baseY = NaN; }

    declare private _SafeStr_14186: number;
    static { (this.prototype as any)._SafeStr_14186 = NaN; }

    constructor(param1: IVector3d, param2: IVector3d, param3: IVector3d, param4: number, param5: boolean, param6: number, param7: number = NaN, param8: any = false, param9: number = NaN) {
        super(param1, param2, param3, param7, false, param8);
        this._dirHead = param4;
        this._SafeStr_14185 = param5;
        this._baseY = param6;
        this._SafeStr_14186 = param9;
    }

    public get dirHead(): number {
        return this._dirHead;
    }

    public get canStandUp(): boolean {
        return this._SafeStr_14185;
    }

    public get baseY(): number {
        return this._baseY;
    }

    public get jumpingPower(): number {
        return this._SafeStr_14186;
    }
}
