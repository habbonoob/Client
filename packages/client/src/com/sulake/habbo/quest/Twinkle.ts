import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { AnimationObject } from '@/com/sulake/habbo/quest/AnimationObject';
import type { TwinkleImages } from '@/com/sulake/habbo/quest/TwinkleImages';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export class Twinkle implements AnimationObject, IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.quest::Twinkle'); }

    private static readonly FRAME_DURATION_IN_MSECS: number = 100;
    private static readonly FRAME_NOT_STARTED: number = -1;
    private static readonly FRAME_FINISHED: number = -2;
    private static readonly FRAME_SEQUENCE: any[] = [1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1];
    private static readonly _SafeStr_5878: Point = new Point(44, 44);

    constructor(param1: TwinkleImages, param2: number) {
        this._twinkleImages = param1;
        this._SafeStr_6542 = param2;
    }

    declare private _twinkleImages: TwinkleImages;

    declare private _SafeStr_6542: number;
    static { (this.prototype as any)._SafeStr_6542 = 0; }

    declare private _position: Point;

    public get disposed(): boolean {
        return this._twinkleImages == null;
    }

    public dispose(): void {
        this._twinkleImages = null;
        this._position = null;
    }

    public onAnimationStart(): void {
        this._position = new Point(Math.round(Math.random() * Twinkle._SafeStr_5878.x), Math.round(Math.random() * Twinkle._SafeStr_5878.y));
    }

    public getPosition(param1: number): Point {
        return this._position;
    }

    public isFinished(param1: number): boolean {
        return this.getFrame(param1) == -2;
    }

    public getBitmap(param1: number): BitmapData {
        let _loc3_: number = this.getFrame(param1);
        return this._twinkleImages.getImage(Twinkle.FRAME_SEQUENCE[_loc3_] | 0);
    }

    private getFrame(param1: number): number {
        let _loc2_: number = param1 - this._SafeStr_6542;
        if (_loc2_ < 0) {
            return -1;
        }
        let _loc3_: number = Math.floor(_loc2_ / 100) | 0;
        if (_loc3_ >= Twinkle.FRAME_SEQUENCE.length) {
            return -2;
        }
        return _loc3_;
    }

    get [IDisposable](): true {
        return true;
    }
}
