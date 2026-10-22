import { castTo, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { embedBitmap } from '@habbo-pixi/runtime/embed/embed';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { BitmapViewPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/BitmapViewPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { Bitmap } from '@habbo-pixi/runtime/display/Bitmap';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { ColorTransform } from '@habbo-pixi/runtime/geom/ColorTransform';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import { NeighborhoodFloor } from '@/com/sulake/habbo/roomevents/wired_setup/common/NeighborhoodFloor';
import { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset.group';
import { GridLineInterpolation } from '@/com/sulake/room/utils/GridLineInterpolation';

const floor_editor_tile_base_pngAsset = embedBitmap("shared/floor_editor_tile_base.png");
const FloorDrawingPreset_floor_editor_tile_entry_pngAsset = embedBitmap("roomevents/FloorDrawingPreset_floor_editor_tile_entry.png");
const floor_editor_border_N_pngAsset = embedBitmap("roomevents/floor_editor_border_N.png");
const floor_editor_border_NE_pngAsset = embedBitmap("roomevents/floor_editor_border_NE.png");
const floor_editor_border_E_pngAsset = embedBitmap("roomevents/floor_editor_border_E.png");
const floor_editor_border_SE_pngAsset = embedBitmap("roomevents/floor_editor_border_SE.png");
const floor_editor_border_S_pngAsset = embedBitmap("roomevents/floor_editor_border_S.png");
const floor_editor_border_SW_pngAsset = embedBitmap("roomevents/floor_editor_border_SW.png");
const floor_editor_border_W_pngAsset = embedBitmap("roomevents/floor_editor_border_W.png");
const floor_editor_border_NW_pngAsset = embedBitmap("roomevents/floor_editor_border_NW.png");

export class FloorDrawingPreset extends WiredUIPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets.applications::FloorDrawingPreset'); }

    static #staticsReady = false;

    public static floor_editor_tile_base = floor_editor_tile_base_pngAsset;

    public static floor_editor_tile_entry = FloorDrawingPreset_floor_editor_tile_entry_pngAsset;

    public static floor_editor_border_N = floor_editor_border_N_pngAsset;

    public static floor_editor_border_NE = floor_editor_border_NE_pngAsset;

    public static floor_editor_border_E = floor_editor_border_E_pngAsset;

    public static floor_editor_border_SE = floor_editor_border_SE_pngAsset;

    public static floor_editor_border_S = floor_editor_border_S_pngAsset;

    public static floor_editor_border_SW = floor_editor_border_SW_pngAsset;

    public static floor_editor_border_W = floor_editor_border_W_pngAsset;

    public static floor_editor_border_NW = floor_editor_border_NW_pngAsset;

    private static get FLOOR_EDITOR_BORDERS(): any[] {
        FloorDrawingPreset.#initStatics();
        return FloorDrawingPreset.FLOOR_EDITOR_BORDERS;
    }
    private static set FLOOR_EDITOR_BORDERS(value: any[]) {
        FloorDrawingPreset.#initStatics();
        FloorDrawingPreset.FLOOR_EDITOR_BORDERS = value;
    }

    private static TAKEN_TILE_RGB: any[] = [0, 0.4, 0.8];
    private static UNTAKEN_TILE_RGB: any[] = [0.2, 0.2, 0.2];
    private static DRAW_MODES: any[] = ["add_tile", "remove_tile", "set_root_tile"];

    private static transformFromScreenSpace(param1: number, param2: number): Point {
        let _loc3_: number = param1 / 16;
        let _loc5_: number = param2 / 8;
        let _loc4_: number = _loc5_ + _loc3_ - 1 | 0;
        let _loc6_: number = _loc5_ - _loc3_ - 1 | 0;
        return new Point(_loc4_, _loc6_);
    }

    private static transformToScreenSpace(param1: number, param2: number): Point {
        return new Point(8 * (param1 - param2 + 1), 4 * (param1 + param2 + 1));
    }

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: (...args: any[]) => any) {
        super(param1, param2, param3);
        this._SafeStr_4721 = param4;
        this._bitmapPreset = param2.createBitmapViewPreset();
        this._bitmapPreset.bitmapWindow.procedure = this.editorWindowProcedure;
        this._tileTaken = this._tileImageBase.clone();
        this._tileTaken.colorTransform(this._tileImageBase.rect, new ColorTransform(Number(FloorDrawingPreset.TAKEN_TILE_RGB[0]), Number(FloorDrawingPreset.TAKEN_TILE_RGB[1]), Number(FloorDrawingPreset.TAKEN_TILE_RGB[2])));
        this._tileUntaken = this._tileImageBase.clone();
        this._tileUntaken.colorTransform(this._tileImageBase.rect, new ColorTransform(Number(FloorDrawingPreset.UNTAKEN_TILE_RGB[0]), Number(FloorDrawingPreset.UNTAKEN_TILE_RGB[1]), Number(FloorDrawingPreset.UNTAKEN_TILE_RGB[2])));
    }

    declare private _bitmapPreset: BitmapViewPreset;

    declare private _SafeStr_4721: (...args: any[]) => any;

    private _tileImageBase: BitmapData = castTo(new FloorDrawingPreset.floor_editor_tile_base(), Bitmap).bitmapData;
    private _tileImageEntry: BitmapData = castTo(new FloorDrawingPreset.floor_editor_tile_entry(), Bitmap).bitmapData;

    declare private _tileTaken: BitmapData;

    declare private _tileUntaken: BitmapData;

    private _drawing: boolean = false;
    private _lastDrawAddress: Point = new Point(-1000, -1000);
    private _selectionStartPoint: Point = new Point(-1000, -1000);

    declare private _isRectSelect: boolean;
    static { (this.prototype as any)._isRectSelect = false; }

    private _drawMode: string = stringOrNull(FloorDrawingPreset.DRAW_MODES[0]);
    private _SafeStr_2655: Point = new Point(0, 0);

    declare private _floor: NeighborhoodFloor;

    public override get window(): IWindow {
        return this._bitmapPreset.window;
    }

    public override get staticWidth(): number {
        return this._bitmapPreset.staticWidth;
    }

    protected override get childPresets(): any[] {
        return [this._bitmapPreset];
    }

    private get bitmapWindow(): IBitmapWrapperWindow {
        return this._bitmapPreset != null ? this._bitmapPreset.bitmapWindow : null;
    }

    public override resizeToWidth(param1: number): void {
        super.resizeToWidth(param1);
        this._bitmapPreset.resizeToWidth(param1);
    }

    public override hasStaticWidth(): boolean {
        return this._bitmapPreset.hasStaticWidth();
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        super.dispose();
        this._bitmapPreset = null;
        this._SafeStr_4721 = null;
        this._floor = null;
    }

    public setFloor(param1: NeighborhoodFloor): void {
        this._floor = param1;
        this.updateView();
    }

    public setRootTile(param1: number, param2: number): void {
        this._SafeStr_2655.x = param1;
        this._SafeStr_2655.y = param2;
        this.updateView();
    }

    public setMode(param1: string): void {
        this._drawMode = param1;
    }

    private editorWindowProcedure = (param1: WindowEvent, param2: IWindow): void => {
        let _loc13_: number = 0;
        let _loc7_: number = 0;
        let _loc12_: number = 0;
        let _loc6_: number = 0;
        let _loc10_: any = 0;
        let _loc11_: any = 0;
        let _loc5_: any = null;
        if (this.bitmapWindow == null || this._floor == null) {
            return;
        }
        if (param1.type != "WME_UP" && param1.type != "WME_UP_OUTSIDE" && param1.type != "WME_DOWN" && !(this._drawing && param1.type == "WME_MOVE")) {
            return;
        }
        let _loc4_: boolean = false;
        let _loc9_: number = this.bitmapWindow.width / 2 | 0;
        let _loc8_: number = this.bitmapWindow.height / 2 - this.bitmapWindow.bitmap.height / 2 | 0;
        let _loc3_: Point = FloorDrawingPreset.transformFromScreenSpace(castTo(param1, WindowMouseEvent).localX - _loc9_ | 0, castTo(param1, WindowMouseEvent).localY - _loc8_ | 0);
        if (param1.type == "WME_UP" || param1.type == "WME_UP_OUTSIDE") {
            this._drawing = false;
            if (this._isRectSelect) {
                this._isRectSelect = false;
                this._floor.submitTemporaryCache();
            }
        }
        if (param1.type == "WME_DOWN") {
            this._drawing = true;
            this._lastDrawAddress = new Point(-1000, -1000);
            if (castTo(param1, WindowMouseEvent).shiftKey) {
                this._isRectSelect = true;
                this._selectionStartPoint = _loc3_;
                this._floor.initTemporaryCache();
            }
            this.applyDraw(_loc3_.x | 0, _loc3_.y | 0);
            _loc4_ = true;
            this.updateView();
            this._lastDrawAddress = _loc3_;
        }
        if (this._drawing && param1.type == "WME_MOVE") {
            if (this._isRectSelect && this._drawMode != FloorDrawingPreset.DRAW_MODES[2]) {
                _loc13_ = Math.min(this._selectionStartPoint.x, _loc3_.x) | 0;
                _loc7_ = Math.max(this._selectionStartPoint.x, _loc3_.x) | 0;
                _loc12_ = Math.min(this._selectionStartPoint.y, _loc3_.y) | 0;
                _loc6_ = Math.max(this._selectionStartPoint.y, _loc3_.y) | 0;
                this._floor.clearTemporaryCache();
                _loc10_ = _loc13_;
                while (_loc10_ <= _loc7_) {
                    _loc11_ = _loc12_;
                    while (_loc11_ <= _loc6_) {
                        this.applyDraw(_loc10_ | 0, _loc11_ | 0);
                        _loc4_ = true;
                        _loc11_++;
                    }
                    _loc10_++;
                }
                this.updateView();
            } else if (param1.type == "WME_MOVE") {
                if (this._lastDrawAddress.x != _loc3_.x || this._lastDrawAddress.y != _loc3_.y) {
                    this.applyDraw(_loc3_.x | 0, _loc3_.y | 0);
                    _loc4_ = true;
                }
                _loc5_ = this.interpolateBetweenLastPointAndDrawPoint(_loc3_);
                if (Math.abs(Number(_loc5_.x)) > 0 || Math.abs(Number(_loc5_.y)) > 0) {
                    this.updateView();
                }
            }
            this._lastDrawAddress = _loc3_;
        }
        if (_loc4_) {
            this._floor.occupationHasChanged();
        }
    };

    private interpolateBetweenLastPointAndDrawPoint(param1: Point): any {
        if (this._lastDrawAddress.x == -1000 && this._lastDrawAddress.y == -1000) {
            this._lastDrawAddress.x = param1.x;
            this._lastDrawAddress.y = param1.y;
        }
        let _loc3_: number = param1.x - this._lastDrawAddress.x | 0;
        let _loc4_: number = param1.y - this._lastDrawAddress.y | 0;
        let _loc2_: any[] = GridLineInterpolation.interpolationPoints(this._lastDrawAddress.x | 0, this._lastDrawAddress.y | 0, param1.x | 0, param1.y | 0);
        for (const _loc5_ of _loc2_ ?? []) {
            if (!(this._lastDrawAddress.x == _loc5_.x && this._lastDrawAddress.y == _loc5_.y || param1.x == _loc5_.x && param1.y == _loc5_.y)) {
                this.applyDraw(_loc5_.x | 0, _loc5_.y | 0);
            }
        }
        return { "x": _loc3_, "y": _loc4_ };
    }

    private applyDraw(param1: number, param2: number): boolean {
        if (!this.allowDraw(param1, param2)) {
            return false;
        }
        let _loc3_: number = NeighborhoodFloor.RADIUS - this._floor.visualizingRadius;
        switch (this._drawMode) {
            case FloorDrawingPreset.DRAW_MODES[0]:
                this._floor.setOccupied(param1 + _loc3_, param2 + _loc3_, true);
                break;
            case FloorDrawingPreset.DRAW_MODES[1]:
                this._floor.setOccupied(param1 + _loc3_, param2 + _loc3_, false);
                break;
            case FloorDrawingPreset.DRAW_MODES[2]:
                this.setRootTileInternal(param1 - this._floor.visualizingRadius, param2 - this._floor.visualizingRadius);
                if (this._SafeStr_4721 != null) {
                    this._SafeStr_4721(this._SafeStr_2655.x, this._SafeStr_2655.y);
                }
        }
        return true;
    }

    private setRootTileInternal(param1: number, param2: number): void {
        this._SafeStr_2655.x = param1;
        this._SafeStr_2655.y = param2;
    }

    private allowDraw(param1: number, param2: number): boolean {
        return param1 >= 0 && param2 >= 0 && param1 < this._floor.visualizingDimension && param2 < this._floor.visualizingDimension;
    }

    private updateView(): void {
        let _loc14_: number = 0;
        let _loc15_: number = 0;
        let _loc7_: BitmapData = null;
        let _loc8_: Point = null;
        let _loc10_: Point = null;
        let _loc6_: Rectangle = null;
        if (this.bitmapWindow == null || this._floor == null) {
            return;
        }
        let _loc9_: any[] = [];
        let _loc1_: number = NeighborhoodFloor.RADIUS - this._floor.visualizingRadius;
        _loc15_ = 0;
        while (_loc15_ < this._floor.visualizingDimension) {
            _loc14_ = 0;
            while (_loc14_ < this._floor.visualizingDimension) {
                _loc8_ = FloorDrawingPreset.transformToScreenSpace(_loc14_, _loc15_);
                _loc7_ = this._floor.isOccupied(_loc14_ + _loc1_, _loc15_ + _loc1_) ? this._tileTaken : this._tileUntaken;
                _loc9_.push({ "point": _loc8_, "image": _loc7_ });
                _loc14_++;
            }
            _loc15_++;
        }
        if (this._SafeStr_2655.x >= -this._floor.visualizingRadius && this._SafeStr_2655.x <= this._floor.visualizingRadius && this._SafeStr_2655.y >= -this._floor.visualizingRadius && this._SafeStr_2655.y <= this._floor.visualizingRadius) {
            _loc9_.push({ "point": FloorDrawingPreset.transformToScreenSpace(this._SafeStr_2655.x + this._floor.visualizingRadius | 0, this._SafeStr_2655.y + this._floor.visualizingRadius | 0), "image": this._tileImageEntry });
        }
        _loc14_ = 0;
        while (_loc14_ < this._floor.visualizingDimension) {
            _loc9_.push({ "point": FloorDrawingPreset.transformToScreenSpace(_loc14_, -1), "image": FloorDrawingPreset.FLOOR_EDITOR_BORDERS[0] });
            _loc9_.push({ "point": FloorDrawingPreset.transformToScreenSpace(_loc14_, this._floor.visualizingDimension), "image": FloorDrawingPreset.FLOOR_EDITOR_BORDERS[4] });
            _loc14_++;
        }
        _loc15_ = 0;
        while (_loc15_ < this._floor.visualizingDimension) {
            _loc9_.push({ "point": FloorDrawingPreset.transformToScreenSpace(-1, _loc15_), "image": FloorDrawingPreset.FLOOR_EDITOR_BORDERS[6] });
            _loc9_.push({ "point": FloorDrawingPreset.transformToScreenSpace(this._floor.visualizingDimension, _loc15_), "image": FloorDrawingPreset.FLOOR_EDITOR_BORDERS[2] });
            _loc15_++;
        }
        _loc9_.push({ "point": FloorDrawingPreset.transformToScreenSpace(-1, -1), "image": FloorDrawingPreset.FLOOR_EDITOR_BORDERS[7] });
        _loc9_.push({ "point": FloorDrawingPreset.transformToScreenSpace(this._floor.visualizingDimension, -1), "image": FloorDrawingPreset.FLOOR_EDITOR_BORDERS[1] });
        _loc9_.push({ "point": FloorDrawingPreset.transformToScreenSpace(this._floor.visualizingDimension, this._floor.visualizingDimension), "image": FloorDrawingPreset.FLOOR_EDITOR_BORDERS[3] });
        _loc9_.push({ "point": FloorDrawingPreset.transformToScreenSpace(-1, this._floor.visualizingDimension), "image": FloorDrawingPreset.FLOOR_EDITOR_BORDERS[5] });
        let _loc12_: number = 2147483647;
        let _loc11_: number = 2147483647;
        let _loc3_: number = -2147483648;
        let _loc2_: number = -2147483648;
        for (const _loc16_ of _loc9_ ?? []) {
            _loc10_ = _loc16_.point instanceof Point ? _loc16_.point : null;
            _loc6_ = _loc16_.image.rect;
            _loc12_ = Math.min(_loc12_, _loc10_.x) | 0;
            _loc11_ = Math.min(_loc11_, _loc10_.y) | 0;
            _loc3_ = Math.max(_loc3_, _loc10_.x + _loc6_.width) | 0;
            _loc2_ = Math.max(_loc2_, _loc10_.y + _loc6_.height) | 0;
        }
        let _loc13_: BitmapData = new BitmapData(_loc3_ - _loc12_, _loc2_ - _loc11_, false, this._SafeStr_2144.advancedBackgroundColor);
        let _loc4_: Point = new Point(-_loc12_, -_loc11_);
        for (const _loc5_ of _loc9_ ?? []) {
            _loc13_.copyPixels(_loc5_.image, _loc5_.image.rect, _loc5_.point.add(_loc4_));
        }
        this.bitmapWindow.bitmap = _loc13_;
        this._bitmapPreset.setBitmapSize(_loc13_.width, _loc13_.height);
        this.resize();
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (FloorDrawingPreset.#staticsReady) return;
        FloorDrawingPreset.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(FloorDrawingPreset, name, { value, writable: true, configurable: true, enumerable: true });
        set("FLOOR_EDITOR_BORDERS", null);
        set("FLOOR_EDITOR_BORDERS", [castTo(new FloorDrawingPreset.floor_editor_border_N(), Bitmap).bitmapData, castTo(new FloorDrawingPreset.floor_editor_border_NE(), Bitmap).bitmapData, castTo(new FloorDrawingPreset.floor_editor_border_E(), Bitmap).bitmapData, castTo(new FloorDrawingPreset.floor_editor_border_SE(), Bitmap).bitmapData, castTo(new FloorDrawingPreset.floor_editor_border_S(), Bitmap).bitmapData, castTo(new FloorDrawingPreset.floor_editor_border_SW(), Bitmap).bitmapData, castTo(new FloorDrawingPreset.floor_editor_border_W(), Bitmap).bitmapData, castTo(new FloorDrawingPreset.floor_editor_border_NW(), Bitmap).bitmapData]);
    }
}
