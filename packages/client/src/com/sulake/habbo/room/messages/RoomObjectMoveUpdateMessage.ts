import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IVector3d } from '@/com/sulake/room/utils/IVector3d';
import { RoomObjectUpdateMessage } from '@/com/sulake/room/messages/RoomObjectUpdateMessage';

export class RoomObjectMoveUpdateMessage extends RoomObjectUpdateMessage {
    static { registerClassName(this, 'com.sulake.habbo.room.messages::RoomObjectMoveUpdateMessage'); }

    constructor(param1: IVector3d, param2: IVector3d, param3: IVector3d, param4: number = NaN, param5: boolean = false, param6: boolean = false) {
        super(param1, param3);
        this._isSlideUpdate = param5;
        this._SafeStr_2390 = param2;
        this._animationTime = param4;
        this._skipPositionUpdate = param6;
    }

    declare private _SafeStr_2390: IVector3d;

    declare private _isSlideUpdate: boolean;
    static { (this.prototype as any)._isSlideUpdate = false; }

    public get isSlideUpdate(): boolean {
        return this._isSlideUpdate;
    }

    declare private _animationTime: number;
    static { (this.prototype as any)._animationTime = NaN; }

    public get animationTime(): number {
        return this._animationTime;
    }

    declare private _skipPositionUpdate: boolean;
    static { (this.prototype as any)._skipPositionUpdate = false; }

    public get skipPositionUpdate(): boolean {
        return this._skipPositionUpdate;
    }

    public get targetLoc(): IVector3d {
        if (this._SafeStr_2390 == null) {
            return this.loc;
        }
        return this._SafeStr_2390;
    }

    public get realTargetLoc(): IVector3d {
        return this._SafeStr_2390;
    }
}
