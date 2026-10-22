import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Vector3d } from '@/com/sulake/room/utils/Vector3d';

export class WiredFurniMoveMessageData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.engine::WiredFurniMoveMessageData'); }

    declare private _furniId: number;
    static { (this.prototype as any)._furniId = 0; }

    declare private _SafeStr_6282: Vector3d;

    declare private _target: Vector3d;

    declare private _animationTime: number;
    static { (this.prototype as any)._animationTime = NaN; }

    declare private _rotation: number;
    static { (this.prototype as any)._rotation = NaN; }

    declare private _SafeStr_14169: number;
    static { (this.prototype as any)._SafeStr_14169 = NaN; }

    declare private _curveStrength: number;
    static { (this.prototype as any)._curveStrength = NaN; }

    constructor(param1: number, param2: Vector3d, param3: Vector3d, param4: number, param5: number, param6: number, param7: number) {
        this._furniId = param1;
        this._SafeStr_6282 = param2;
        this._target = param3;
        this._animationTime = param4;
        this._rotation = param5;
        this._SafeStr_14169 = param6;
        this._curveStrength = param7;
    }

    public get furniId(): number {
        return this._furniId;
    }

    public get source(): Vector3d {
        return this._SafeStr_6282;
    }

    public get target(): Vector3d {
        return this._target;
    }

    public get animationTime(): number {
        return this._animationTime;
    }

    public get rotation(): number {
        return this._rotation;
    }

    public get overshootingDistance(): number {
        return this._SafeStr_14169;
    }

    public get curveStrength(): number {
        return this._curveStrength;
    }
}
