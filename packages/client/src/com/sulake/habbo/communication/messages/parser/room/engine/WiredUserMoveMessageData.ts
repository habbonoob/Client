import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Vector3d } from '@/com/sulake/room/utils/Vector3d';

export class WiredUserMoveMessageData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.engine::WiredUserMoveMessageData'); }

    constructor(param1: number, param2: Vector3d, param3: Vector3d, param4: string, param5: number, param6: number, param7: number) {
        this._userIndex = param1;
        this._source = param2;
        this._target = param3;
        this._moveType = param4;
        this._animationTime = param5;
        this._bodyDirection = param6;
        this._headDirection = param7;
    }

    declare private _userIndex: number;
    static { (this.prototype as any)._userIndex = 0; }

    declare private _source: Vector3d;

    declare private _target: Vector3d;

    declare private _moveType: string;

    declare private _bodyDirection: number;
    static { (this.prototype as any)._bodyDirection = NaN; }

    declare private _animationTime: number;
    static { (this.prototype as any)._animationTime = NaN; }

    public get animationTime(): number {
        return this._animationTime;
    }

    declare private _headDirection: number;
    static { (this.prototype as any)._headDirection = NaN; }

    public get headDirection(): number {
        return this._headDirection;
    }

    public get userIndex(): number {
        return this._userIndex;
    }

    public get source(): Vector3d {
        return this._source;
    }

    public get target(): Vector3d {
        return this._target;
    }

    public get moveType(): string {
        return this._moveType;
    }

    public get bodyDirection(): number {
        return this._bodyDirection;
    }
}
