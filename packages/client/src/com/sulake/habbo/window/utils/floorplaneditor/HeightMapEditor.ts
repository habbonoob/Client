import { castTo } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { embedBitmap } from '@habbo-pixi/runtime/embed/embed';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { BCFloorPlanEditor } from '@/com/sulake/habbo/window/utils/floorplaneditor/BCFloorPlanEditor';
import type { FloorPlanCache } from '@/com/sulake/habbo/window/utils/floorplaneditor/FloorPlanCache';
import { Bitmap } from '@habbo-pixi/runtime/display/Bitmap';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { ColorTransform } from '@habbo-pixi/runtime/geom/ColorTransform';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import { GridLineInterpolation } from '@/com/sulake/room/utils/GridLineInterpolation';

const floor_editor_tile_base_pngAsset = embedBitmap("shared/floor_editor_tile_base.png");
const HeightMapEditor_floor_editor_tile_entry_pngAsset = embedBitmap("window/HeightMapEditor_floor_editor_tile_entry.png");
const floor_editor_tile_base_large_pngAsset = embedBitmap("window/floor_editor_tile_base_large.png");
const floor_editor_tile_entry_large_pngAsset = embedBitmap("window/floor_editor_tile_entry_large.png");

export class HeightMapEditor {
    static { registerClassName(this, 'com.sulake.habbo.window.utils.floorplaneditor::HeightMapEditor'); }

    public static readonly LEVELS: number = 30;

    public static floor_editor_tile_base = floor_editor_tile_base_pngAsset;

    public static floor_editor_tile_entry = HeightMapEditor_floor_editor_tile_entry_pngAsset;

    public static floor_editor_tile_base_large = floor_editor_tile_base_large_pngAsset;

    public static floor_editor_tile_entry_large = floor_editor_tile_entry_large_pngAsset;

    public static hslToRgb(param1: number, param2: number, param3: number): any[] {
        let g: number = NaN;
        let b: number = NaN;
        let r: number = NaN;
        let hue2rgb: any;
        let q: number = NaN;
        let p: number = NaN;
        let h: number = param1;
        let s: number = param2;
        let l: number = param3;
        if (s == 0) {
            r = g = b = l;
        } else {
            hue2rgb = (param1: number, param2: number, param3: number): number => {
                    if (param3 < 0) {
                        param3 += 1;
                    }
                    if (param3 > 1) {
                        param3 -= 1;
                    }
                    if (param3 < 0.16666666666666666) {
                        return param1 + (param2 - param1) * 6 * param3;
                    }
                    if (param3 < 0.5) {
                        return param2;
                    }
                    if (param3 < 0.6666666666666666) {
                        return param1 + (param2 - param1) * (0.6666666666666666 - param3) * 6;
                    }
                    return param1;
                };
            q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            p = 2 * l - q;
            r = Number(hue2rgb(p, q, h + 0.3333333333333333));
            g = Number(hue2rgb(p, q, h));
            b = Number(hue2rgb(p, q, h - 0.3333333333333333));
        }
        return [r, g, b];
    }

    constructor(param1: BCFloorPlanEditor) {
        let _loc2_: number = 0;
        let _loc3_: number = NaN;
        this._lastDrawAddress = new Point(-1000, -1000);
        this._selectionStartPoint = new Point(-1000, -1000);
        this._bcFloorPlanEditor = param1;
        this._bcFloorPlanEditor.heightMapBitmapElement.procedure = this.editorWindowProcedure;
        this._floorPlan = param1.floorPlanCache;
        this._tileImageBase = castTo(new HeightMapEditor.floor_editor_tile_base(), Bitmap).bitmapData;
        this._tileImageEntry = castTo(new HeightMapEditor.floor_editor_tile_entry(), Bitmap).bitmapData;
        this._tileImageBaseLarge = castTo(new HeightMapEditor.floor_editor_tile_base_large(), Bitmap).bitmapData;
        this._tileImageEntryLarge = castTo(new HeightMapEditor.floor_editor_tile_entry_large(), Bitmap).bitmapData;
        this._heigthColorMap = [];
        this._occupiedHeigthColorMap = [];
        this._coloredOccupiedTiles = new Dictionary();
        this._coloredTiles = new Dictionary();
        this._coloredTilesLarge = new Dictionary();
        this._coloredOccupiedTilesLarge = new Dictionary();
        _loc2_ = 0;
        while (_loc2_ < 30) {
            _loc3_ = 0.6 - _loc2_ / 30 * 0.85;
            if (_loc3_ < 0) {
                _loc3_ = 1 + _loc3_;
            }
            this._heigthColorMap.push(HeightMapEditor.hslToRgb(_loc3_, 1, 0.5));
            this._occupiedHeigthColorMap.push(HeightMapEditor.hslToRgb(_loc3_, 0.33, 0.4));
            _loc2_++;
        }
    }

    declare private _bcFloorPlanEditor: BCFloorPlanEditor;

    declare private _tileImageBase: BitmapData;

    declare private _tileImageEntry: BitmapData;

    declare private _tileImageBaseLarge: BitmapData;

    declare private _tileImageEntryLarge: BitmapData;

    declare private _occupiedHeigthColorMap: any[][];

    declare private _bitmapElement: IBitmapWrapperWindow;

    declare private _lastDrawAddress: Point;

    declare private _floorPlan: FloorPlanCache;

    declare private _coloredTiles: Map<any, any>;

    declare private _coloredOccupiedTiles: Map<any, any>;

    declare private _coloredTilesLarge: Map<any, any>;

    declare private _coloredOccupiedTilesLarge: Map<any, any>;

    declare private _selectionStartPoint: Point;

    private _isRectSelect: boolean = false;
    private _drawing: boolean = false;

    public set drawing(param1: boolean) {
        this._drawing = param1;
    }

    private _drawingHeight: number = 0;

    public get drawingHeight(): number {
        return this._drawingHeight;
    }

    public set drawingHeight(param1: number) {
        this._drawingHeight = Math.min(30, Math.max(0, param1)) | 0;
    }

    declare private _heigthColorMap: any[][];

    public get heigthColorMap(): any[][] {
        return this._heigthColorMap;
    }

    private _colorPickMode: boolean = false;

    public get colorPickMode(): boolean {
        return this._colorPickMode;
    }

    public set colorPickMode(param1: boolean) {
        this._colorPickMode = param1;
    }

    private _zoomLevel: number = 1;

    public get zoomLevel(): number {
        return this._zoomLevel;
    }

    public set zoomLevel(param1: number) {
        if (param1 < 1 || param1 > 2) {
            return;
        }
        this._zoomLevel = param1;
    }

    public refreshFromCache(): void {
        this._bitmapElement = this._bcFloorPlanEditor.heightMapBitmapElement;
        this._lastDrawAddress = new Point(-1000, -1000);
        this.updateView();
    }

    private editorWindowProcedure = (param1: WindowEvent, param2: IWindow): void => {
        let _loc10_: number = 0;
        let _loc9_: number = 0;
        let _loc3_: Point = null;
        let _loc14_: number = 0;
        let _loc8_: number = 0;
        let _loc13_: number = 0;
        let _loc7_: number = 0;
        let _loc6_: boolean = false;
        let _loc4_: boolean = false;
        let _loc11_: any = 0;
        let _loc12_: any = 0;
        let _loc5_: any = null;
        if (this._colorPickMode) {
            if (param1.type == "WME_CLICK") {
                _loc10_ = this._bcFloorPlanEditor.heightMapBitmapElement.width / 2 - this._bcFloorPlanEditor.heightMapBitmapElement.bitmap.width / 2 | 0;
                _loc9_ = this._bcFloorPlanEditor.heightMapBitmapElement.height / 2 - this._bcFloorPlanEditor.heightMapBitmapElement.bitmap.height / 2 | 0;
                _loc3_ = this.transformFromScreenSpace(castTo(param1, WindowMouseEvent).localX - _loc10_ | 0, castTo(param1, WindowMouseEvent).localY - _loc9_ | 0);
                this._drawingHeight = this._bcFloorPlanEditor.floorPlanCache.getHeightAt(_loc3_.x | 0, _loc3_.y | 0);
                this._bcFloorPlanEditor.updateColorSliderTrack(this._drawingHeight >>> 0);
            }
        } else if (param1.type == "WME_UP" || param1.type == "WME_UP_OUTSIDE" || param1.type == "WME_DOWN" || this._drawing && param1.type == "WME_MOVE") {
            _loc10_ = this._bcFloorPlanEditor.heightMapBitmapElement.width / 2 - this._bcFloorPlanEditor.heightMapBitmapElement.bitmap.width / 2 | 0;
            _loc9_ = this._bcFloorPlanEditor.heightMapBitmapElement.height / 2 - this._bcFloorPlanEditor.heightMapBitmapElement.bitmap.height / 2 | 0;
            _loc3_ = this.transformFromScreenSpace(castTo(param1, WindowMouseEvent).localX - _loc10_ | 0, castTo(param1, WindowMouseEvent).localY - _loc9_ | 0);
            if (param1.type == "WME_UP" || param1.type == "WME_UP_OUTSIDE") {
                this._drawing = false;
                if (this._isRectSelect) {
                    this._isRectSelect = false;
                    this._bcFloorPlanEditor.floorPlanCache.submitTemporaryCache();
                }
            }
            if (param1.type == "WME_DOWN") {
                this._drawing = true;
                this._lastDrawAddress = new Point(-1000, -1000);
                if (castTo(param1, WindowMouseEvent).shiftKey) {
                    this._isRectSelect = true;
                    this._selectionStartPoint = _loc3_;
                    this._bcFloorPlanEditor.floorPlanCache.initTemporaryCache();
                }
                this.applyDraw(_loc3_.x | 0, _loc3_.y | 0);
                this.updateView();
                this._lastDrawAddress = _loc3_;
            }
            if (this._drawing && param1.type == "WME_MOVE") {
                if (this._isRectSelect) {
                    _loc14_ = Math.min(this._selectionStartPoint.x, _loc3_.x) | 0;
                    _loc8_ = Math.max(this._selectionStartPoint.x, _loc3_.x) | 0;
                    _loc13_ = Math.min(this._selectionStartPoint.y, _loc3_.y) | 0;
                    _loc7_ = Math.max(this._selectionStartPoint.y, _loc3_.y) | 0;
                    _loc6_ = this._bcFloorPlanEditor.floorPlanCache.attemptExpandColumns(_loc8_);
                    _loc4_ = this._bcFloorPlanEditor.floorPlanCache.attemptExpandRows(_loc7_);
                    if (!_loc6_ && !_loc4_) {
                        return;
                    }
                    while (_loc7_ >= _loc13_ && !_loc4_) {
                        _loc7_ -= 1;
                        _loc4_ = this._bcFloorPlanEditor.floorPlanCache.attemptExpandRows(_loc7_);
                    }
                    while (_loc8_ >= _loc14_ && !_loc6_) {
                        _loc8_ -= 1;
                        _loc6_ = this._bcFloorPlanEditor.floorPlanCache.attemptExpandColumns(_loc8_);
                    }
                    if (!_loc6_ || !_loc4_) {
                        return;
                    }
                    this._bcFloorPlanEditor.floorPlanCache.clearTemporaryCache();
                    this._bcFloorPlanEditor.floorPlanCache.attemptExpandRows(_loc7_);
                    this._bcFloorPlanEditor.floorPlanCache.attemptExpandColumns(_loc8_);
                    _loc11_ = _loc14_;
                    while (_loc11_ <= _loc8_) {
                        _loc12_ = _loc13_;
                        while (_loc12_ <= _loc7_) {
                            this.applyDraw(_loc11_ | 0, _loc12_ | 0);
                            _loc12_++;
                        }
                        _loc11_++;
                    }
                    this.updateView();
                } else if (param1.type == "WME_MOVE") {
                    if (this._lastDrawAddress.x != _loc3_.x || this._lastDrawAddress.y != _loc3_.y) {
                        this.applyDraw(_loc3_.x | 0, _loc3_.y | 0);
                    }
                    _loc5_ = this.interpolateBetweenLastPointAndDrawPoint(_loc3_);
                    if (Math.abs(Number(_loc5_.x)) > 0 || Math.abs(Number(_loc5_.y)) > 0) {
                        this.updateView();
                    }
                }
                this._lastDrawAddress = _loc3_;
            }
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

    private applyDraw(param1: number, param2: number): void {
        let _loc3_: number = 0;
        switch (this._bcFloorPlanEditor.drawMode) {
            case this._bcFloorPlanEditor.drawModes[0]:
                this._bcFloorPlanEditor.floorPlanCache.setHeightAt(param1, param2, this._drawingHeight);
                break;
            case this._bcFloorPlanEditor.drawModes[1]:
                this._bcFloorPlanEditor.floorPlanCache.setHeightAt(param1, param2, -1);
                break;
            case this._bcFloorPlanEditor.drawModes[2]:
                _loc3_ = this._bcFloorPlanEditor.floorPlanCache.getHeightAt(param1, param2);
                if (_loc3_ >= 0) {
                    this._bcFloorPlanEditor.floorPlanCache.setHeightAt(param1, param2, Math.min(30 - 1, _loc3_ + 1) | 0);
                }
                break;
            case this._bcFloorPlanEditor.drawModes[3]:
                _loc3_ = this._bcFloorPlanEditor.floorPlanCache.getHeightAt(param1, param2);
                if (_loc3_ >= 0) {
                    this._bcFloorPlanEditor.floorPlanCache.setHeightAt(param1, param2, Math.max(0, _loc3_ - 1) | 0);
                }
                break;
            case this._bcFloorPlanEditor.drawModes[4]:
                _loc3_ = this._bcFloorPlanEditor.floorPlanCache.getHeightAt(param1, param2);
                if (_loc3_ >= 0) {
                    this._bcFloorPlanEditor.floorPlanCache.entryPoint = new Point(param1, param2);
                }
        }
    }

    private updateView(): void {
        let _loc11_: number = 0;
        let _loc12_: number = 0;
        let _loc5_: BitmapData = null;
        let _loc6_: Point = null;
        let _loc13_: number = 0;
        let _loc7_: any[] = [];
        let _loc9_: number = 2147483647;
        let _loc8_: number = 2147483647;
        let _loc2_: number = -2147483648;
        let _loc1_: number = -2147483648;
        _loc12_ = 0;
        while (_loc12_ < this._floorPlan.floorHeight) {
            _loc11_ = 0;
            while (_loc11_ < this._floorPlan.floorWidth) {
                _loc6_ = this.transformToScreenSpace(_loc11_, _loc12_);
                _loc9_ = Math.min(_loc9_, _loc6_.x) | 0;
                _loc8_ = Math.min(_loc8_, _loc6_.y) | 0;
                _loc2_ = Math.max(_loc2_, _loc6_.x) | 0;
                _loc1_ = Math.max(_loc1_, _loc6_.y) | 0;
                if (this._floorPlan.isEntryPoint(_loc11_, _loc12_)) {
                    _loc5_ = this.getEntryTile();
                    _loc7_.push({ "point": _loc6_, "image": _loc5_ });
                } else {
                    _loc13_ = Math.min(this._floorPlan.getHeightAt(_loc11_, _loc12_), 30 - 1) | 0;
                    if (_loc13_ >= 0) {
                        _loc5_ = this.getColoredTile(_loc13_, this._floorPlan.isTileReserved(_loc11_, _loc12_));
                        _loc7_.push({ "point": _loc6_, "image": _loc5_ });
                    }
                }
                _loc11_++;
            }
            _loc12_++;
        }
        let _loc10_: BitmapData = new BitmapData(_loc2_ - _loc9_ + 18, _loc1_ - _loc8_ + 27, false, 0);
        let _loc3_: Point = new Point(-_loc9_, -_loc8_);
        for (const _loc4_ of _loc7_ ?? []) {
            _loc10_.copyPixels(_loc4_.image, _loc4_.image.rect, _loc4_.point.add(_loc3_));
        }
        this._bcFloorPlanEditor.heightMapBitmapElement.bitmap = _loc10_;
    }

    private getColoredTile(param1: number, param2: boolean): BitmapData {
        let _loc4_: Map<any, any> = param2 ? (this._zoomLevel == 1 ? this._coloredOccupiedTiles : this._coloredOccupiedTilesLarge) : (this._zoomLevel == 1 ? this._coloredTiles : this._coloredTilesLarge);
        if (_loc4_.get(param1) != null) {
            return _loc4_.get(param1);
        }
        let _loc5_: any[] = param2 ? this._occupiedHeigthColorMap[param1] : this._heigthColorMap[param1];
        let _loc3_: BitmapData = (this._zoomLevel == 1 ? this._tileImageBase : this._tileImageBaseLarge).clone();
        _loc3_.colorTransform(_loc3_.rect, new ColorTransform(Number(_loc5_[0]), Number(_loc5_[1]), Number(_loc5_[2])));
        _loc4_.set(param1, _loc3_);
        return _loc3_;
    }

    private getEntryTile(): BitmapData {
        return this._zoomLevel == 1 ? this._tileImageEntry : this._tileImageEntryLarge;
    }

    private transformFromScreenSpace(param1: number, param2: number): Point {
        let _loc3_: number = param1 / 16 / this._zoomLevel;
        let _loc5_: number = param2 / 8 / this._zoomLevel;
        let _loc7_: number = this._floorPlan.floorHeight;
        let _loc4_: number = _loc5_ + (_loc3_ - _loc7_ / 2) | 0;
        let _loc6_: number = _loc5_ - (_loc3_ - _loc7_ / 2) | 0;
        return new Point(_loc4_, _loc6_);
    }

    private transformToScreenSpace(param1: number, param2: number): Point {
        return new Point(this._zoomLevel * 8 * (param1 - param2), this._zoomLevel * 4 * (param1 + param2));
    }
}
