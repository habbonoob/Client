import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IChatStyleInternal } from '@/com/sulake/habbo/freeflowchat/viewer/visualization/style/IChatStyleInternal';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Sprite } from '@habbo-pixi/runtime/display/Sprite';
import type { Point } from '@habbo-pixi/runtime/geom/Point';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import type { StyleSheet } from '@habbo-pixi/runtime/text/StyleSheet';
import { TextFormat } from '@habbo-pixi/runtime/text/TextFormat';

export class BlankStyle implements IChatStyleInternal {
    static { registerClassName(this, 'com.sulake.habbo.freeflowchat.viewer.simulation::BlankStyle'); }

    constructor() {
    }

    public get textFormat(): TextFormat {
        return new TextFormat();
    }

    public get styleSheet(): StyleSheet {
        return null;
    }

    public get pointer(): BitmapData {
        return new BitmapData(1, 10, true, 0);
    }

    public get pointerOffsetToBubbleBottom(): number {
        return 19;
    }

    public get faceOffset(): Point {
        return null;
    }

    public get isAnonymous(): boolean {
        return true;
    }

    public get isSystemStyle(): boolean {
        return true;
    }

    public get textFieldMargins(): Rectangle {
        return new Rectangle(0, 0, 0, 0);
    }

    public get overlap(): Rectangle {
        return new Rectangle(0, 0, 0, 0);
    }

    public get allowHTML(): boolean {
        return false;
    }

    public get isNotification(): boolean {
        return false;
    }

    public getNewBackgroundSprite(param1: number = 16777215): Sprite {
        let _loc2_: Sprite = new Sprite();
        _loc2_.graphics.clear();
        _loc2_.graphics.beginFill(0, 0);
        _loc2_.graphics.drawRect(0, 0, 20, 19 + 10);
        _loc2_.graphics.endFill();
        return _loc2_;
    }

    public getPointerLeftMargin(param1: number): number {
        return param1;
    }

    public getPointerRightMargin(param1: number): number {
        return param1;
    }
}
