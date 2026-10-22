import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class RoomPlaneMaskData {
    static { registerClassName(this, 'com.sulake.habbo.room.object::RoomPlaneMaskData'); }

    private _leftSideLoc: number = 0;
    private _rightSideLoc: number = 0;
    private _leftSideLength: number = 0;
    private _rightSideLength: number = 0;

    constructor(param1: number, param2: number, param3: number, param4: number) {
        this._leftSideLoc = param1;
        this._rightSideLoc = param2;
        this._leftSideLength = param3;
        this._rightSideLength = param4;
    }

    public get leftSideLoc(): number {
        return this._leftSideLoc;
    }

    public get rightSideLoc(): number {
        return this._rightSideLoc;
    }

    public get leftSideLength(): number {
        return this._leftSideLength;
    }

    public get rightSideLength(): number {
        return this._rightSideLength;
    }
}
