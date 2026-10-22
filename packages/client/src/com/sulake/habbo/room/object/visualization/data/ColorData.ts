import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class ColorData {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.data::ColorData'); }

    public static readonly DEFAULT_COLOR: number = 16777215;

    constructor(param1: number) {
        let _loc2_: number = 0;
        this._colors = [];
        _loc2_ = 0;
        while (_loc2_ < param1) {
            this._colors.push(16777215);
            _loc2_++;
        }
    }

    declare private _colors: any[];

    public dispose(): void {
        this._colors = null;
    }

    public setColor(param1: number, param2: number): void {
        if (param2 < 0 || param2 >= this._colors.length) {
            return;
        }
        this._colors[param2] = param1;
    }

    public getColor(param1: number): number {
        if (param1 < 0 || param1 >= this._colors.length) {
            return 16777215;
        }
        return this._colors[param1] >>> 0;
    }
}
