import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IVector3d } from '@/com/sulake/room/utils/IVector3d';
import { RoomObjectUpdateMessage } from '@/com/sulake/room/messages/RoomObjectUpdateMessage';

export class RoomObjectMoveUpdateMessage extends RoomObjectUpdateMessage {
    static { registerClassName(this, 'com.sulake.habbo.room.messages::RoomObjectMoveUpdateMessage'); }

    declare private _SafeStr_2390: IVector3d;

    declare private _isSlideUpdate: boolean;
    static { (this.prototype as any)._isSlideUpdate = false; }

    declare private _animationTime: number;
    static { (this.prototype as any)._animationTime = NaN; }

    declare private _skipPositionUpdate: boolean;
    static { (this.prototype as any)._skipPositionUpdate = false; }

    declare private _overshootAnimationTime: number;
    static { (this.prototype as any)._overshootAnimationTime = NaN; }

    declare private _curveStrength: number;
    static { (this.prototype as any)._curveStrength = NaN; }

    constructor(param1: IVector3d, param2: IVector3d, param3: IVector3d, param4: number = NaN, param5: boolean = false, param6: boolean = false, param7: number = NaN, param8: number = NaN) {
        super(param1, param3);
        this._isSlideUpdate = param5;
        this._SafeStr_2390 = param2;
        this._animationTime = param4;
        this._skipPositionUpdate = param6;
        this._overshootAnimationTime = param7;
        this._curveStrength = param8;
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

    public get isSlideUpdate(): boolean {
        return this._isSlideUpdate;
    }

    public get animationTime(): number {
        return this._animationTime;
    }

    public get skipPositionUpdate(): boolean {
        return this._skipPositionUpdate;
    }

    public get overshootAnimationTime(): number {
        return this._overshootAnimationTime;
    }

    public get curveStrength(): number {
        return this._curveStrength;
    }
}
