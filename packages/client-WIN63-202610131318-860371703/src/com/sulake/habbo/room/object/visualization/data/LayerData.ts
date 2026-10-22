import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class LayerData {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.data::LayerData'); }

    public static readonly DEFAULT_TAG: string = "";
    public static readonly DEFAULT_INK: number = 0;
    public static readonly DEFAULT_ALPHA: number = 255;
    public static readonly DEFAULT_IGNORE_MOUSE: boolean = false;
    public static readonly DEFAULT_X_OFFSET: number = 0;
    public static readonly DEFAULT_Y_OFFSET: number = 0;
    public static readonly DEFAULT_Z_OFFSET: number = 0;
    public static readonly INK_ADD: number = 1;
    public static readonly INK_SUBTRACT: number = 2;
    public static readonly INK_DARKEN: number = 3;
    public static readonly INK_DIFFERENCE: number = 4;
    public static readonly INK_MULTIPLY: number = 5;
    public static readonly INK_INVERT: number = 6;
    public static readonly INK_SCREEN: number = 7;
    private _tag: string = "";
    private _ink: number = 0;
    private _alpha: number = 255;
    private _ignoreMouse: boolean = false;
    private _xOffset: number = 0;
    private _yOffset: number = 0;
    private _zOffset: number = 0;

    constructor() {
    }

    public set tag(param1: string) {
        this._tag = param1;
    }

    public get tag(): string {
        return this._tag;
    }

    public set ink(param1: number) {
        this._ink = param1;
    }

    public get ink(): number {
        return this._ink;
    }

    public set alpha(param1: number) {
        this._alpha = param1;
    }

    public get alpha(): number {
        return this._alpha;
    }

    public set ignoreMouse(param1: boolean) {
        this._ignoreMouse = param1;
    }

    public get ignoreMouse(): boolean {
        return this._ignoreMouse;
    }

    public set xOffset(param1: number) {
        this._xOffset = param1;
    }

    public get xOffset(): number {
        return this._xOffset;
    }

    public set yOffset(param1: number) {
        this._yOffset = param1;
    }

    public get yOffset(): number {
        return this._yOffset;
    }

    public set zOffset(param1: number) {
        this._zOffset = param1;
    }

    public get zOffset(): number {
        return this._zOffset;
    }

    public copyValues(param1: LayerData): void {
        if (param1 != null) {
            this.tag = param1.tag;
            this.ink = param1.ink;
            this.alpha = param1.alpha;
            this.ignoreMouse = param1.ignoreMouse;
            this.xOffset = param1.xOffset;
            this.yOffset = param1.yOffset;
            this.zOffset = param1.zOffset;
        }
    }
}
