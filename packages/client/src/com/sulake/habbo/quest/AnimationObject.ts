import type { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { Point } from '@habbo-pixi/runtime/geom/Point';

export interface AnimationObject extends IDisposable {
    getPosition(param1: number): Point;
    getBitmap(param1: number): BitmapData;
    isFinished(param1: number): boolean;
    onAnimationStart(): void;
}
