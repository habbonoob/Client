import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class RoomPlaneBitmapMask {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.room::RoomPlaneBitmapMask'); }

    private _type: string = null;
    private _leftSideLoc: number = 0;
    private _rightSideLoc: number = 0;

    constructor(param1: string, param2: number, param3: number) {
        this._type = param1;
        this._leftSideLoc = param2;
        this._rightSideLoc = param3;
    }

    public get type(): string {
        return this._type;
    }

    public get leftSideLoc(): number {
        return this._leftSideLoc;
    }

    public get rightSideLoc(): number {
        return this._rightSideLoc;
    }
}
