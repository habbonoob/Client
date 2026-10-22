import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { Sprite } from '@habbo-pixi/runtime/display/Sprite';
import type { Point } from '@habbo-pixi/runtime/geom/Point';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import type { StyleSheet } from '@habbo-pixi/runtime/text/StyleSheet';
import type { TextFormat } from '@habbo-pixi/runtime/text/TextFormat';

export interface IChatStyleInternal {
    getNewBackgroundSprite(param1?: number): Sprite;
    get textFormat(): TextFormat;
    get styleSheet(): StyleSheet;
    get pointer(): BitmapData;
    get pointerOffsetToBubbleBottom(): number;
    getPointerLeftMargin(param1: number): number;
    getPointerRightMargin(param1: number): number;
    get faceOffset(): Point;
    getEmblem(param1?: boolean): BitmapData;
    getEmblemOffset(param1?: boolean): Point;
    get textFieldMargins(): Rectangle;
    get overlap(): Rectangle;
    get allowHTML(): boolean;
    get isAnonymous(): boolean;
    get isSystemStyle(): boolean;
    get isNotification(): boolean;
}
