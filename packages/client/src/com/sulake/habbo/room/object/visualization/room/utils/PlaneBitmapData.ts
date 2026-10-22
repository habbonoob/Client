import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';

export class PlaneBitmapData {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.room.utils::PlaneBitmapData'); }

    constructor(param1: BitmapData, param2: number) {
        this._bitmap = param1;
        this._timeStamp = param2;
    }

    private _timeStamp: number = 0;
    private _bitmap: BitmapData = null;

    public get bitmap(): BitmapData {
        return this._bitmap;
    }

    public get timeStamp(): number {
        return this._timeStamp;
    }

    public dispose(): void {
        this._bitmap = null;
    }
}
