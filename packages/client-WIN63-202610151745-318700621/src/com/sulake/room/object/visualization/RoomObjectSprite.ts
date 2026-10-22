import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { RoomObjectSpriteType } from '@/com/sulake/room/object/enum/RoomObjectSpriteType';
import { IRoomObjectSprite } from '@/com/sulake/room/object/visualization/IRoomObjectSprite';

export class RoomObjectSprite implements IRoomObjectSprite {
    static { registerClassName(this, 'com.sulake.room.object.visualization::RoomObjectSprite'); }

    private static _SafeStr_6645: number = 0;
    private _asset: BitmapData = null;
    private _assetName: string = "";
    private _libraryAssetName: string = "";
    private _assetPosture: string = null;
    private _assetGesture: string = null;
    private _visible: boolean = true;
    private _tag: string = "";
    private _alpha: number = 255;
    private _color: number = 16777215;
    private _blendMode: string = "normal";
    private _flipH: boolean = false;
    private _flipV: boolean = false;
    private _direction: number = 0;
    private _offset: Point = new Point(0, 0);
    private _width: number = 0;
    private _height: number = 0;
    private _depth: number = 0;
    private _SafeStr_7141: number = 0;
    private _varyingDepth: boolean = false;
    private _SafeStr_5809: number = 128;
    private _clickHandling: boolean = false;
    private _skipMouseHandling: boolean = false;
    private _SafeStr_2155: number = 0;
    private _instanceId: number = 0;
    private _filters: any[] = null;
    protected _SafeStr_4776: number = RoomObjectSpriteType.DEFAULT;

    declare private _objectType: string;

    constructor() {
        this._instanceId = RoomObjectSprite._SafeStr_6645++;
    }

    public dispose(): void {
        this._asset = null;
        this._width = 0;
        this._height = 0;
    }

    public get asset(): BitmapData {
        return this._asset;
    }

    public get assetName(): string {
        return this._assetName;
    }

    public get assetPosture(): string {
        return this._assetPosture;
    }

    public set assetPosture(param1: string) {
        this._assetPosture = param1;
    }

    public get assetGesture(): string {
        return this._assetGesture;
    }

    public set assetGesture(param1: string) {
        this._assetGesture = param1;
    }

    public get visible(): boolean {
        return this._visible;
    }

    public get tag(): string {
        return this._tag;
    }

    public get alpha(): number {
        return this._alpha;
    }

    public get color(): number {
        return this._color;
    }

    public get blendMode(): string {
        return this._blendMode;
    }

    public get flipV(): boolean {
        return this._flipV;
    }

    public get flipH(): boolean {
        return this._flipH;
    }

    public get direction(): number {
        return this._direction;
    }

    public get offsetX(): number {
        return this._offset.x | 0;
    }

    public get offsetY(): number {
        return this._offset.y | 0;
    }

    public get width(): number {
        return this._width;
    }

    public get height(): number {
        return this._height;
    }

    public get relativeDepth(): number {
        return this._depth;
    }

    public get varyingDepth(): boolean {
        return this._varyingDepth;
    }

    public get clickHandling(): boolean {
        return this._clickHandling;
    }

    public get instanceId(): number {
        return this._instanceId;
    }

    public get updateId(): number {
        return this._SafeStr_2155;
    }

    public get filters(): any[] {
        return this._filters;
    }

    public get spriteType(): number {
        return this._SafeStr_4776;
    }

    public get objectType(): string {
        return this._objectType;
    }

    public set objectType(param1: string) {
        this._objectType = param1;
    }

    public get planeId(): number {
        return this._SafeStr_7141;
    }

    public set planeId(param1: number) {
        this._SafeStr_7141 = param1;
    }

    public set spriteType(param1: number) {
        this._SafeStr_4776 = param1;
    }

    public set asset(param1: BitmapData) {
        if (param1 == this._asset) {
            return;
        }
        if (param1 != null) {
            this._width = param1.width;
            this._height = param1.height;
        }
        this._asset = param1;
        this._SafeStr_2155 = this._SafeStr_2155 + 1;
    }

    public set assetName(param1: string) {
        if (param1 == this._assetName) {
            return;
        }
        this._assetName = param1;
        this._SafeStr_2155 = this._SafeStr_2155 + 1;
    }

    public set visible(param1: boolean) {
        if (param1 == this._visible) {
            return;
        }
        this._visible = param1;
        this._SafeStr_2155 = this._SafeStr_2155 + 1;
    }

    public set tag(param1: string) {
        if (param1 == this._tag) {
            return;
        }
        this._tag = param1;
        this._SafeStr_2155 = this._SafeStr_2155 + 1;
    }

    public set alpha(param1: number) {
        param1 &= 255;
        if (param1 == this._alpha) {
            return;
        }
        this._alpha = param1;
        this._SafeStr_2155 = this._SafeStr_2155 + 1;
    }

    public set color(param1: number) {
        param1 &= 16777215;
        if (param1 == this._color) {
            return;
        }
        this._color = param1;
        this._SafeStr_2155 = this._SafeStr_2155 + 1;
    }

    public set blendMode(param1: string) {
        if (param1 == this._blendMode) {
            return;
        }
        this._blendMode = param1;
        this._SafeStr_2155 = this._SafeStr_2155 + 1;
    }

    public set filters(param1: any[]) {
        if (param1 == this._filters) {
            return;
        }
        this._filters = param1;
        this._SafeStr_2155 = this._SafeStr_2155 + 1;
    }

    public set flipH(param1: boolean) {
        if (param1 == this._flipH) {
            return;
        }
        this._flipH = param1;
        this._SafeStr_2155 = this._SafeStr_2155 + 1;
    }

    public set flipV(param1: boolean) {
        if (param1 == this._flipV) {
            return;
        }
        this._flipV = param1;
        this._SafeStr_2155 = this._SafeStr_2155 + 1;
    }

    public set direction(param1: number) {
        this._direction = param1;
    }

    public set offsetX(param1: number) {
        if (param1 == this._offset.x) {
            return;
        }
        this._offset.x = param1;
        this._SafeStr_2155 = this._SafeStr_2155 + 1;
    }

    public set offsetY(param1: number) {
        if (param1 == this._offset.y) {
            return;
        }
        this._offset.y = param1;
        this._SafeStr_2155 = this._SafeStr_2155 + 1;
    }

    public set relativeDepth(param1: number) {
        if (param1 == this._depth) {
            return;
        }
        this._depth = param1;
        this._SafeStr_2155 = this._SafeStr_2155 + 1;
    }

    public set varyingDepth(param1: boolean) {
        if (param1 == this._varyingDepth) {
            return;
        }
        this._varyingDepth = param1;
        this._SafeStr_2155 = this._SafeStr_2155 + 1;
    }

    public set clickHandling(param1: boolean) {
        if (this._clickHandling == param1) {
            return;
        }
        this._clickHandling = param1;
        this._SafeStr_2155 = this._SafeStr_2155 + 1;
    }

    public get alphaTolerance(): number {
        return this._SafeStr_5809;
    }

    public set alphaTolerance(param1: number) {
        if (this._SafeStr_5809 == param1) {
            return;
        }
        this._SafeStr_5809 = param1;
        this._SafeStr_2155 = this._SafeStr_2155 + 1;
    }

    public get libraryAssetName(): string {
        return this._libraryAssetName;
    }

    public set libraryAssetName(param1: string) {
        this._libraryAssetName = param1;
    }

    public get skipMouseHandling(): boolean {
        return this._skipMouseHandling;
    }

    public set skipMouseHandling(param1: boolean) {
        if (this._skipMouseHandling == param1) {
            return;
        }
        this._skipMouseHandling = param1;
        this._SafeStr_2155 = this._SafeStr_2155 + 1;
    }

    get [IRoomObjectSprite](): true {
        return true;
    }
}
