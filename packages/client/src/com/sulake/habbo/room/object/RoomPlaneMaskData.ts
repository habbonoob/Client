import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class RoomPlaneMaskData {
    static { registerClassName(this, 'com.sulake.habbo.room.object::RoomPlaneMaskData'); }

    constructor(param1: number, param2: number, param3: number, param4: number) {
        this._leftSideLoc = param1;
        this._rightSideLoc = param2;
        this._leftSideLength = param3;
        this._rightSideLength = param4;
    }

    private _leftSideLoc: number = 0;

    public get leftSideLoc(): number {
        return this._leftSideLoc;
    }

    private _rightSideLoc: number = 0;

    public get rightSideLoc(): number {
        return this._rightSideLoc;
    }

    private _leftSideLength: number = 0;

    public get leftSideLength(): number {
        return this._leftSideLength;
    }

    private _rightSideLength: number = 0;

    public get rightSideLength(): number {
        return this._rightSideLength;
    }
}
