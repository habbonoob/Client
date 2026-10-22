import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class DirectionalOffsetData {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.data::DirectionalOffsetData'); }

    private _offsetX: Map<any, any> = new Dictionary();
    private _offsetY: Map<any, any> = new Dictionary();

    constructor() {
    }

    public getOffsetX(param1: number, param2: number): number {
        if (this._offsetX.get(param1) == null) {
            return param2;
        }
        return this._offsetX.get(param1) | 0;
    }

    public getOffsetY(param1: number, param2: number): number {
        if (this._offsetY.get(param1) == null) {
            return param2;
        }
        return this._offsetY.get(param1) | 0;
    }

    public setOffset(param1: number, param2: number, param3: number): void {
        this._offsetX.set(param1, param2);
        this._offsetY.set(param1, param3);
    }
}
