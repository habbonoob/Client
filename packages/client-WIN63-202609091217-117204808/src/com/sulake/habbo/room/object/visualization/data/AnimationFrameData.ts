import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class AnimationFrameData {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.data::AnimationFrameData'); }

    private _id: number = 0;
    private _SafeStr_2126: number = 0;
    private _y: number = 0;
    private _randomX: number = 0;
    private _randomY: number = 0;
    private _repeats: number = 1;

    constructor(param1: number, param2: number, param3: number, param4: number, param5: number, param6: number) {
        this._id = param1;
        this._SafeStr_2126 = param2;
        this._y = param3;
        this._randomX = param4;
        this._randomY = param5;
        this._repeats = param6;
    }

    public get id(): number {
        return this._id;
    }

    public hasDirectionalOffsets(): boolean {
        return false;
    }

    public getX(param1: number): number {
        return this._SafeStr_2126;
    }

    public getY(param1: number): number {
        return this._y;
    }

    public get x(): number {
        return this._SafeStr_2126;
    }

    public get y(): number {
        return this._SafeStr_2126;
    }

    public get randomX(): number {
        return this._randomX;
    }

    public get randomY(): number {
        return this._randomY;
    }

    public get repeats(): number {
        return this._repeats;
    }
}
