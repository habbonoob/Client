import { asGuarded, asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { valuesOf } from '@habbo-pixi/runtime/lang/iterate';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { PlaneMask } from '@/com/sulake/habbo/room/object/visualization/room/mask/PlaneMask';
import type { PlaneMaskManager } from '@/com/sulake/habbo/room/object/visualization/room/mask/PlaneMaskManager';
import type { PlaneMaterialCellMatrix } from '@/com/sulake/habbo/room/object/visualization/room/rasterizer/basic/PlaneMaterialCellMatrix';
import type { IPlaneRasterizer } from '@/com/sulake/habbo/room/object/visualization/room/rasterizer/IPlaneRasterizer';
import type { IRoomPlane } from '@/com/sulake/room/object/visualization/IRoomPlane';
import type { IGraphicAsset } from '@/com/sulake/room/object/visualization/utils/IGraphicAsset';
import type { IRoomGeometry } from '@/com/sulake/room/utils/IRoomGeometry';
import type { IVector3d } from '@/com/sulake/room/utils/IVector3d';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Matrix } from '@habbo-pixi/runtime/geom/Matrix';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { SharedBitmapData } from '@/com/sulake/core/utils/memory/SharedBitmapData';
import { Logger } from '@/com/sulake/habbo/Logger';
import { PlaneDrawingData } from '@/com/sulake/habbo/room/object/visualization/room/PlaneDrawingData';
import { PlaneVisualizationLayer } from '@/com/sulake/habbo/room/object/visualization/room/rasterizer/basic/PlaneVisualizationLayer';
import { RoomPlaneBitmapMask } from '@/com/sulake/habbo/room/object/visualization/room/RoomPlaneBitmapMask';
import { RoomPlaneRectangleMask } from '@/com/sulake/habbo/room/object/visualization/room/RoomPlaneRectangleMask';
import { PlaneBitmapData } from '@/com/sulake/habbo/room/object/visualization/room/utils/PlaneBitmapData';
import { Randomizer } from '@/com/sulake/habbo/room/object/visualization/room/utils/Randomizer';
import { Canvas } from '@/com/sulake/habbo/utils/Canvas';
import { isIVector3d } from '@/com/sulake/room/utils/IVector3d';
import { Vector3d } from '@/com/sulake/room/utils/Vector3d';

export class RoomPlane implements IRoomPlane {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.room::RoomPlane'); }

    public static readonly _SafeStr_8513: number = 0;
    public static readonly _SafeStr_7475: number = 1;
    public static readonly _SafeStr_7439: number = 2;
    public static readonly TYPE_LANDSCAPE: number = 3;
    private static _SafeStr_7228: number = 1;
    private static readonly ZERO_POINT: Point = new Point(0, 0);
    private _disposed: boolean = false;
    private _SafeStr_5879: number = 0;
    private _origin: Vector3d = null;
    private _SafeStr_2291: Vector3d = null;
    private _leftSide: Vector3d = null;
    private _rightSide: Vector3d = null;
    private _normal: Vector3d = null;

    declare private _secondaryNormals: any[];

    private _geometryUpdateId: number = -1;
    private _type: number = 0;
    private _SafeStr_3209: boolean = false;
    private _bitmapData: BitmapData = null;
    private _hasTexture: boolean = true;
    private _offset: Point = null;
    private _relativeDepth: number = 0;
    private _color: number = 0;
    private _rasterizer: IPlaneRasterizer = null;
    private _maskManager: PlaneMaskManager = null;
    private _id: string = null;
    private _uniqueId: number = 0;
    private _SafeStr_6304: number = 0;
    private _SafeStr_6037: number = 0;
    private _SafeStr_6579: number = 0;
    private _SafeStr_7209: number = 0;
    private _textures: UtilsMap = null;
    private _SafeStr_2624: PlaneBitmapData = null;
    private _SafeStr_3672: boolean = false;

    declare private _SafeStr_2447: any[];

    declare private _SafeStr_2707: any[];

    private _SafeStr_2430: boolean = false;
    private _SafeStr_2208: BitmapData = null;
    private _SafeStr_2344: BitmapData = null;

    declare private _SafeStr_3645: any[];

    declare private _SafeStr_4749: any[];

    private _SafeStr_2386: Vector3d = null;
    private _SafeStr_2339: Vector3d = null;
    private _SafeStr_2269: Vector3d = null;
    private _SafeStr_2332: Vector3d = null;
    private _width: number = 0;
    private _height: number = 0;
    private _SafeStr_3590: boolean = true;
    private _extraDepth: number = 0;
    private _SafeStr_7215: boolean = false;

    constructor(param1: IVector3d, param2: IVector3d, param3: IVector3d, param4: IVector3d, param5: number, param6: boolean, param7: any[], param8: number, param9: number = 0, param10: number = 0, param11: number = 0, param12: number = 0) {
        let _loc14_: number = 0;
        let _loc15_: IVector3d = null;
        let _loc13_: Vector3d = null;
        this._secondaryNormals = [];
        this._SafeStr_2447 = [];
        this._SafeStr_2707 = [];
        this._SafeStr_3645 = [];
        this._SafeStr_4749 = [];
        this._SafeStr_5879 = param8;
        this._origin = new Vector3d();
        this._origin.assign(param1);
        this._SafeStr_2291 = new Vector3d();
        this._SafeStr_2291.assign(param2);
        this._leftSide = new Vector3d();
        this._leftSide.assign(param3);
        this._rightSide = new Vector3d();
        this._rightSide.assign(param4);
        this._normal = Vector3d.crossProduct(this._leftSide, this._rightSide);
        if (this._normal.length > 0) {
            this._normal.mul(1 / this._normal.length);
        }
        if (param7 != null) {
            _loc14_ = 0;
            while (_loc14_ < param7.length) {
                _loc15_ = asGuarded(param7[_loc14_], isIVector3d);
                if (_loc15_ != null) {
                    _loc13_ = new Vector3d();
                    _loc13_.assign(_loc15_);
                    this._secondaryNormals.push(_loc13_);
                }
                _loc14_++;
            }
        }
        this._offset = new Point();
        this._type = param5;
        this._textures = new UtilsMap();
        this._SafeStr_2386 = new Vector3d();
        this._SafeStr_2339 = new Vector3d();
        this._SafeStr_2269 = new Vector3d();
        this._SafeStr_2332 = new Vector3d();
        this._SafeStr_6304 = param9;
        this._SafeStr_6037 = param10;
        this._SafeStr_6579 = param11;
        this._SafeStr_7209 = param12;
        this._SafeStr_3672 = param6;
        this._uniqueId = RoomPlane._SafeStr_7228++;
    }

    private static blend(param1: number, param2: number): number {
        return (Canvas.colorize(param2, (param1 | 0xFF000000) >>> 0) & 0xFFFFFF) >>> 0;
    }

    public set canBeVisible(param1: boolean) {
        if (param1 != this._SafeStr_3590) {
            if (!this._SafeStr_3590) {
                this.resetTextureCache();
            }
            this._SafeStr_3590 = param1;
        }
    }

    public get canBeVisible(): boolean {
        return this._SafeStr_3590;
    }

    public cloneBitmapData(): BitmapData {
        let _loc1_: BitmapData = null;
        if (this.visible) {
            if (this._bitmapData != null) {
                try {
                    _loc1_ = this._bitmapData.clone();
                } catch (e) {
                    return null;
                }
            }
        }
        return _loc1_;
    }

    public get visible(): boolean {
        return this._SafeStr_3209 && this._SafeStr_3590;
    }

    public get offset(): Point {
        return this._offset;
    }

    public get relativeDepth(): number {
        return this._relativeDepth + this._extraDepth;
    }

    public set extraDepth(param1: number) {
        this._extraDepth = param1;
    }

    public get color(): number {
        return this._color;
    }

    public set color(param1: number) {
        this._color = param1;
    }

    public get type(): number {
        return this._type;
    }

    public get leftSide(): IVector3d {
        return this._leftSide;
    }

    public get rightSide(): IVector3d {
        return this._rightSide;
    }

    public get location(): IVector3d {
        return this._SafeStr_2291;
    }

    public get normal(): IVector3d {
        return this._normal;
    }

    public get hasTexture(): boolean {
        return this._hasTexture;
    }

    public set hasTexture(param1: boolean) {
        this._hasTexture = param1;
    }

    public set rasterizer(param1: IPlaneRasterizer) {
        this._rasterizer = param1;
    }

    public set maskManager(param1: PlaneMaskManager) {
        this._maskManager = param1;
    }

    public set id(param1: string) {
        if (param1 != this._id) {
            this.resetTextureCache();
            this._id = param1;
        }
    }

    public get uniqueId(): number {
        return this._uniqueId;
    }

    public dispose(): void {
        let _loc2_: number = 0;
        let _loc1_: PlaneBitmapData = null;
        if (this._bitmapData != null) {
            this._bitmapData.dispose();
            this._bitmapData = null;
        }
        if (this._textures != null) {
            _loc2_ = 0;
            while (_loc2_ < this._textures.length) {
                _loc1_ = asInstanceOf(this._textures.getWithIndex(_loc2_), PlaneBitmapData);
                if (_loc1_ != null) {
                    if (_loc1_.bitmap != null) {
                        _loc1_.bitmap.dispose();
                    }
                    _loc1_.dispose();
                }
                _loc2_++;
            }
            this._textures.dispose();
            this._textures = null;
        }
        this._SafeStr_2624 = null;
        this._SafeStr_2291 = null;
        this._origin = null;
        this._leftSide = null;
        this._rightSide = null;
        this._normal = null;
        this._rasterizer = null;
        this._SafeStr_2386 = null;
        this._SafeStr_2339 = null;
        this._SafeStr_2269 = null;
        this._SafeStr_2332 = null;
        this._SafeStr_2447 = null;
        this._SafeStr_2707 = null;
        if (this._SafeStr_2208 != null) {
            this._SafeStr_2208.dispose();
            this._SafeStr_2208 = null;
        }
        if (this._SafeStr_2344 != null) {
            this._SafeStr_2344.dispose();
            this._SafeStr_2344 = null;
        }
        this._disposed = true;
    }

    public copyBitmapData(param1: BitmapData): BitmapData {
        if (this.visible) {
            if (this._bitmapData != null && param1 != null) {
                if (this._bitmapData.width == param1.width && this._bitmapData.height == param1.height) {
                    param1.copyPixels(this._bitmapData, this._bitmapData.rect, RoomPlane.ZERO_POINT);
                    return param1;
                }
            }
        }
        return null;
    }

    private cacheTexture(param1: string, param2: PlaneBitmapData): boolean {
        let _loc3_: PlaneBitmapData = asInstanceOf(this._textures.remove(param1), PlaneBitmapData);
        if (_loc3_ != null) {
            if (param2 != null && param2.bitmap != _loc3_.bitmap) {
                _loc3_.bitmap.dispose();
            }
            _loc3_.dispose();
        }
        this._SafeStr_2624 = param2;
        this._textures.add(param1, param2);
        return true;
    }

    private resetTextureCache(param1: BitmapData = null): void {
        let _loc3_: number = 0;
        let _loc2_: PlaneBitmapData = null;
        if (this._textures != null) {
            _loc3_ = 0;
            while (_loc3_ < this._textures.length) {
                _loc2_ = asInstanceOf(this._textures.getWithIndex(_loc3_), PlaneBitmapData);
                if (_loc2_ != null) {
                    if (_loc2_.bitmap != null && _loc2_.bitmap != param1) {
                        _loc2_.bitmap.dispose();
                    }
                    _loc2_.dispose();
                }
                _loc3_++;
            }
            this._textures.reset();
        }
        this._SafeStr_2624 = null;
    }

    private getTextureIdentifier(param1: number): string {
        if (this._rasterizer != null) {
            return this._rasterizer.getTextureIdentifier(param1, this.normal);
        }
        return String(param1);
    }

    private needsNewTexture(param1: IRoomGeometry, param2: number): boolean {
        let _loc3_: string = null;
        if (param1 == null) {
            return false;
        }
        let _loc4_: PlaneBitmapData = this._SafeStr_2624;
        if (_loc4_ == null) {
            _loc3_ = this.getTextureIdentifier(param1.scale);
            _loc4_ = asInstanceOf(this._textures.getValue(_loc3_), PlaneBitmapData);
        }
        this.updateMaskChangeStatus();
        if (this._SafeStr_3590 && (_loc4_ == null || _loc4_.timeStamp >= 0 && param2 > _loc4_.timeStamp || this._SafeStr_2430)) {
            return true;
        }
        return false;
    }

    private getTexture(param1: IRoomGeometry, param2: number): BitmapData {
        let _loc8_: number = NaN;
        let _loc9_: number = NaN;
        let _loc4_: IVector3d = null;
        let _loc6_: BitmapData = null;
        let _loc5_: BitmapData = null;
        if (param1 == null) {
            return null;
        }
        let _loc7_: PlaneBitmapData = null;
        let _loc3_: string = null;
        if (this.needsNewTexture(param1, param2)) {
            _loc8_ = this._leftSide.length * param1.scale;
            _loc9_ = this._rightSide.length * param1.scale;
            _loc4_ = param1.getCoordinatePosition(this._normal);
            _loc3_ = this.getTextureIdentifier(param1.scale);
            if (this._SafeStr_2624 != null) {
                _loc7_ = this._SafeStr_2624;
            } else {
                _loc7_ = asInstanceOf(this._textures.getValue(_loc3_), PlaneBitmapData);
            }
            _loc6_ = null;
            if (_loc7_ != null) {
                _loc6_ = _loc7_.bitmap;
            }
            if (this._rasterizer != null) {
                _loc7_ = this._rasterizer.render(_loc6_, this._id, _loc8_, _loc9_, param1.scale, _loc4_, this._hasTexture, this._SafeStr_6304, this._SafeStr_6037, this._SafeStr_6579, this._SafeStr_7209, param2);
                if (_loc7_ != null) {
                    if (_loc6_ != null && _loc7_.bitmap != _loc6_) {
                        _loc6_.dispose();
                    }
                }
            } else {
                _loc5_ = new BitmapData(_loc8_ | 0, _loc9_ | 0, true, (0xFF000000 | this._color) >>> 0);
                _loc7_ = new PlaneBitmapData(_loc5_, -1);
            }
            if (_loc7_ != null) {
                this.updateMask(_loc7_.bitmap, param1);
                this.cacheTexture(_loc3_, _loc7_);
            }
        } else if (this._SafeStr_2624 != null) {
            _loc7_ = this._SafeStr_2624;
        } else {
            _loc3_ = this.getTextureIdentifier(param1.scale);
            _loc7_ = asInstanceOf(this._textures.getValue(_loc3_), PlaneBitmapData);
        }
        if (_loc7_ != null) {
            this._SafeStr_2624 = _loc7_;
            return _loc7_.bitmap;
        }
        return null;
    }

    private resolveMasks(param1: IRoomGeometry): PlaneDrawingData {
        let _loc8_: number = 0;
        let _loc10_: PlaneMask = null;
        let _loc5_: string = null;
        let _loc4_: IVector3d = null;
        let _loc11_: IGraphicAsset = null;
        let _loc9_: Point = null;
        if (!this._SafeStr_3672) {
            return null;
        }
        let _loc7_: RoomPlaneBitmapMask = null;
        let _loc2_: number = 0;
        let _loc3_: number = 0;
        let _loc6_: PlaneDrawingData = new PlaneDrawingData();
        _loc8_ = 0;
        while (_loc8_ < this._SafeStr_2447.length) {
            _loc7_ = asInstanceOf(this._SafeStr_2447[_loc8_], RoomPlaneBitmapMask);
            if (_loc7_ != null) {
                _loc10_ = this._maskManager.getMask(_loc7_.type);
                if (_loc10_ != null) {
                    _loc5_ = _loc10_.getAssetName(param1.scale | 0);
                    if (_loc5_ != null) {
                        _loc4_ = param1.getCoordinatePosition(this._normal);
                        _loc11_ = _loc10_.getGraphicAsset(param1.scale, _loc4_);
                        if (_loc11_ != null) {
                            _loc2_ = this._SafeStr_2208.width * (1 - _loc7_.leftSideLoc / this._leftSide.length) | 0;
                            _loc3_ = this._SafeStr_2208.height * (1 - _loc7_.rightSideLoc / this._rightSide.length) | 0;
                            _loc9_ = new Point(_loc2_ + _loc11_.offsetX, _loc3_ + _loc11_.offsetY);
                            _loc6_.addMask(_loc5_, _loc9_, _loc11_.flipH, _loc11_.flipV);
                        }
                    }
                }
            }
            _loc8_++;
        }
        return _loc6_;
    }

    private screenWidth(param1: IRoomGeometry): number {
        let _loc2_: Point = param1.getScreenPoint(new Vector3d(0, 0, 0));
        let _loc3_: Point = param1.getScreenPoint(new Vector3d(0, 1, 0));
        return Math.round(this._leftSide.length * Math.abs(_loc2_.x - _loc3_.x)) | 0;
    }

    public getDrawingDatas(param1: IRoomGeometry): any[] {
        let _loc6_: any;
        let _loc9_: any;
        let _loc5_: PlaneDrawingData = null;
        let _loc4_: PlaneDrawingData = null;
        let _loc11_: any[] = null;
        let _loc10_: PlaneVisualizationLayer = null;
        let _loc7_: number = 0;
        let _loc2_: IVector3d = null;
        let _loc8_: PlaneMaterialCellMatrix = null;
        let _loc3_: any[] = null;
        let _loc12_: string = null;
        let _loc13_: any[] = [];
        if (this._SafeStr_3209) {
            _loc5_ = null;
            try {
                _loc5_ = this.resolveMasks(param1);
                _loc11_ = this._rasterizer.getLayers(this._id);
                _loc7_ = 0;
                while (_loc7_ < _loc11_.length) {
                    _loc10_ = asInstanceOf(_loc11_[_loc7_], PlaneVisualizationLayer);
                    if (_loc10_ != null) {
                        if (this._hasTexture && _loc10_.getMaterial() != null) {
                            _loc2_ = param1.getCoordinatePosition(this._normal);
                            _loc8_ = _loc10_.getMaterial().getMaterialCellMatrix(_loc2_);
                            _loc4_ = new PlaneDrawingData(_loc5_, RoomPlane.blend(this._color, _loc10_.getColor()), _loc8_.isBottomAligned());
                            Randomizer.setSeed(this._SafeStr_5879);
                            for (_loc6_ of _loc8_.getColumns(this.screenWidth(param1)) ?? []) {
                                _loc3_ = [];
                                for (_loc9_ of valuesOf(_loc6_.getCells())) {
                                    _loc12_ = stringOrNull(_loc9_.getAssetName(_loc2_));
                                    if (_loc12_ != null) {
                                        _loc3_.push(_loc12_);
                                    }
                                }
                                if (_loc3_.length > 0) {
                                    if (!_loc6_.isRepeated()) {
                                        _loc3_.push("");
                                    }
                                    _loc4_.addAssetColumn(_loc3_);
                                }
                            }
                            if (_loc4_.assetNameColumns.length > 0) {
                                _loc13_.push(_loc4_);
                            }
                        } else {
                            _loc4_ = new PlaneDrawingData(_loc5_, RoomPlane.blend(this._color, _loc10_.getColor()));
                            _loc13_.push(_loc4_);
                        }
                    }
                    _loc7_++;
                }
            } catch (e) {
                Logger.log("Error in getting RoomPlane drawing data.", e);
            }
            if (_loc13_.length == 0) {
                _loc13_.push(new PlaneDrawingData(_loc5_, this._color));
            }
        }
        return _loc13_;
    }

    private addOutlines(param1: PlaneBitmapData): void {
    }

    public update(param1: IRoomGeometry, param2: number): boolean {
        let _loc3_: number = NaN;
        let _loc8_: number = 0;
        let _loc4_: IVector3d = null;
        let _loc5_: number = NaN;
        let _loc6_: number = NaN;
        let _loc7_: BitmapData = null;
        if (param1 == null || this._disposed) {
            return false;
        }
        let _loc9_: boolean = false;
        if (this._geometryUpdateId != param1.updateId) {
            _loc9_ = true;
        }
        if (!_loc9_ || !this._SafeStr_3590) {
            if (!this.visible) {
                return false;
            }
        }
        if (_loc9_) {
            this._SafeStr_2624 = null;
            _loc3_ = 0;
            _loc3_ = Vector3d.cosAngle(param1.directionAxis, this.normal);
            if (_loc3_ > -0.001) {
                if (this._SafeStr_3209) {
                    this._SafeStr_3209 = false;
                    return true;
                }
                return false;
            }
            _loc8_ = 0;
            while (_loc8_ < this._secondaryNormals.length) {
                _loc3_ = Vector3d.cosAngle(param1.directionAxis, this._secondaryNormals[_loc8_]);
                if (_loc3_ > -0.001) {
                    if (this._SafeStr_3209) {
                        this._SafeStr_3209 = false;
                        return true;
                    }
                    return false;
                }
                _loc8_++;
            }
            this.updateCorners(param1);
            _loc4_ = param1.getScreenPosition(this._origin);
            _loc5_ = _loc4_.z;
            _loc6_ = Math.max(this._SafeStr_2386.z, this._SafeStr_2339.z, this._SafeStr_2269.z, this._SafeStr_2332.z) - _loc5_;
            if (this._type == 2) {
                _loc6_ -= (this._SafeStr_2291.z + Math.min(0, this._leftSide.z, this._rightSide.z)) * 8;
            }
            if (this._type == 3) {
                _loc6_ += 0.02;
            }
            this._relativeDepth = _loc6_;
            this._SafeStr_3209 = true;
            this._geometryUpdateId = param1.updateId;
        }
        if (_loc9_ || this.needsNewTexture(param1, param2)) {
            if (this._bitmapData == null || this._width != this._bitmapData.width || this._height != this._bitmapData.height) {
                if (this._bitmapData != null) {
                    this._bitmapData.dispose();
                    this._bitmapData = null;
                    if (this._width < 1 || this._height < 1) {
                        return true;
                    }
                } else if (this._width < 1 || this._height < 1) {
                    return false;
                }
                try {
                    this._bitmapData = new SharedBitmapData(this._width | 0, this._height | 0, true, 16777215, false);
                } catch (e) {
                    this._bitmapData = null;
                    this.dispose();
                }
                if (this._bitmapData == null) {
                    return false;
                }
                this._bitmapData.lock();
            } else {
                this._bitmapData.lock();
                this._bitmapData.fillRect(this._bitmapData.rect, 16777215);
            }
            Randomizer.setSeed(this._SafeStr_5879);
            _loc7_ = this.getTexture(param1, param2);
            if (_loc7_ != null) {
                this.renderTexture(param1, _loc7_);
                this._bitmapData.unlock();
                return !!(_loc7_ || _loc9_);
            }
            this.dispose();
            return false;
        }
        return false;
    }

    private updateCorners(param1: IRoomGeometry): void {
        this._SafeStr_2386.assign(param1.getScreenPosition(this._SafeStr_2291));
        this._SafeStr_2339.assign(param1.getScreenPosition(Vector3d.sum(this._SafeStr_2291, this._rightSide)));
        this._SafeStr_2269.assign(param1.getScreenPosition(Vector3d.sum(Vector3d.sum(this._SafeStr_2291, this._leftSide), this._rightSide)));
        this._SafeStr_2332.assign(param1.getScreenPosition(Vector3d.sum(this._SafeStr_2291, this._leftSide)));
        this._offset = param1.getScreenPoint(this._origin);
        this._SafeStr_2386.x = Math.round(this._SafeStr_2386.x);
        this._SafeStr_2386.y = Math.round(this._SafeStr_2386.y);
        this._SafeStr_2339.x = Math.round(this._SafeStr_2339.x);
        this._SafeStr_2339.y = Math.round(this._SafeStr_2339.y);
        this._SafeStr_2269.x = Math.round(this._SafeStr_2269.x);
        this._SafeStr_2269.y = Math.round(this._SafeStr_2269.y);
        this._SafeStr_2332.x = Math.round(this._SafeStr_2332.x);
        this._SafeStr_2332.y = Math.round(this._SafeStr_2332.y);
        this._offset.x = Math.round(this._offset.x);
        this._offset.y = Math.round(this._offset.y);
        let _loc3_: number = Math.min(this._SafeStr_2386.x, this._SafeStr_2339.x, this._SafeStr_2269.x, this._SafeStr_2332.x);
        let _loc5_: number = Math.max(this._SafeStr_2386.x, this._SafeStr_2339.x, this._SafeStr_2269.x, this._SafeStr_2332.x);
        let _loc2_: number = Math.min(this._SafeStr_2386.y, this._SafeStr_2339.y, this._SafeStr_2269.y, this._SafeStr_2332.y);
        let _loc4_: number = Math.max(this._SafeStr_2386.y, this._SafeStr_2339.y, this._SafeStr_2269.y, this._SafeStr_2332.y);
        _loc5_ -= _loc3_;
        this._offset.x -= _loc3_;
        this._SafeStr_2386.x -= _loc3_;
        this._SafeStr_2339.x -= _loc3_;
        this._SafeStr_2269.x -= _loc3_;
        this._SafeStr_2332.x -= _loc3_;
        _loc4_ -= _loc2_;
        this._offset.y -= _loc2_;
        this._SafeStr_2386.y -= _loc2_;
        this._SafeStr_2339.y -= _loc2_;
        this._SafeStr_2269.y -= _loc2_;
        this._SafeStr_2332.y -= _loc2_;
        this._width = _loc5_;
        this._height = _loc4_;
    }

    private renderTexture(param1: IRoomGeometry, param2: BitmapData): void {
        if (this._SafeStr_2386 == null || this._SafeStr_2339 == null || this._SafeStr_2269 == null || this._SafeStr_2332 == null || param2 == null || this._bitmapData == null) {
            return;
        }
        let _loc8_: number = this._SafeStr_2332.x - this._SafeStr_2269.x;
        let _loc10_: number = this._SafeStr_2332.y - this._SafeStr_2269.y;
        let _loc4_: number = this._SafeStr_2339.x - this._SafeStr_2269.x;
        let _loc3_: number = this._SafeStr_2339.y - this._SafeStr_2269.y;
        if (this._type == 1 || this._type == 3) {
            if (Math.abs(_loc4_ - param2.width) <= 1) {
                _loc4_ = param2.width;
            }
            if (Math.abs(_loc3_ - param2.width) <= 1) {
                _loc3_ = param2.width;
            }
            if (Math.abs(_loc8_ - param2.height) <= 1) {
                _loc8_ = param2.height;
            }
            if (Math.abs(_loc10_ - param2.height) <= 1) {
                _loc10_ = param2.height;
            }
        }
        let _loc5_: number = _loc4_ / param2.width;
        let _loc6_: number = _loc3_ / param2.width;
        let _loc7_: number = _loc8_ / param2.height;
        let _loc9_: number = _loc10_ / param2.height;
        let _loc11_: Matrix = new Matrix();
        _loc11_.a = _loc5_;
        _loc11_.b = _loc6_;
        _loc11_.c = _loc7_;
        _loc11_.d = _loc9_;
        _loc11_.translate(this._SafeStr_2269.x, this._SafeStr_2269.y);
        this.draw(param2, _loc11_);
    }

    private draw(param1: BitmapData, param2: Matrix): void {
        let _loc4_: number = 0;
        let _loc7_: any = 0;
        let _loc3_: number = NaN;
        let _loc6_: number = 0;
        let _loc5_: number = 0;
        if (this._bitmapData != null) {
            if (param2.a == 1 && param2.d == 1 && param2.c == 0 && param2.b != 0 && Math.abs(param2.b) <= 1 && (this._type == 1 || this._type == 3)) {
                _loc4_ = 0;
                _loc7_ = 0;
                _loc3_ = 0;
                _loc6_ = 0;
                if (param2.b > 0) {
                    param2.ty++;
                }
                _loc5_ = 0;
                while (_loc4_ < param1.width) {
                    _loc4_++;
                    _loc3_ += Math.abs(param2.b);
                    if (_loc3_ >= 1) {
                        this._bitmapData.copyPixels(param1, new Rectangle(Number(_loc7_ + _loc6_), 0, _loc4_ - _loc7_, param1.height), new Point(Number(param2.tx + _loc7_), param2.ty + _loc5_), null, null, true);
                        _loc7_ = _loc4_;
                        if (param2.b > 0) {
                            _loc5_++;
                        } else {
                            _loc5_--;
                        }
                        _loc3_ = 0;
                    }
                }
                if (_loc3_ > 0) {
                    this._bitmapData.copyPixels(param1, new Rectangle(Number(_loc7_), 0, _loc4_ - _loc7_, param1.height), new Point(Number(param2.tx + _loc7_), param2.ty + _loc5_), null, null, true);
                }
                return;
            }
            this._bitmapData.draw(param1, param2, null, null, null, false);
        }
    }

    public resetBitmapMasks(): void {
        if (this._disposed) {
            return;
        }
        if (this._SafeStr_3672) {
            if (this._SafeStr_2447.length == 0) {
                return;
            }
            this._SafeStr_2430 = true;
            this._SafeStr_2447 = [];
        }
    }

    public addBitmapMask(param1: string, param2: number, param3: number): boolean {
        let _loc5_: RoomPlaneBitmapMask = null;
        let _loc4_: number = 0;
        if (this._SafeStr_3672) {
            _loc5_ = null;
            _loc4_ = 0;
            while (_loc4_ < this._SafeStr_2447.length) {
                _loc5_ = asInstanceOf(this._SafeStr_2447[_loc4_], RoomPlaneBitmapMask);
                if (_loc5_ != null) {
                    if (_loc5_.type == param1 && _loc5_.leftSideLoc == param2 && _loc5_.rightSideLoc == param3) {
                        return false;
                    }
                }
                _loc4_++;
            }
            _loc5_ = new RoomPlaneBitmapMask(param1, param2, param3);
            this._SafeStr_2447.push(_loc5_);
            this._SafeStr_2430 = true;
            return true;
        }
        return false;
    }

    public resetRectangleMasks(): void {
        if (this._SafeStr_3672) {
            if (this._SafeStr_2707.length == 0) {
                return;
            }
            this._SafeStr_2430 = true;
            this._SafeStr_2707 = [];
        }
    }

    public addRectangleMask(param1: number, param2: number, param3: number, param4: number): boolean {
        let _loc6_: RoomPlaneRectangleMask = null;
        let _loc5_: number = 0;
        if (this._SafeStr_3672) {
            _loc6_ = null;
            _loc5_ = 0;
            while (_loc5_ < this._SafeStr_2707.length) {
                _loc6_ = asInstanceOf(this._SafeStr_2707[_loc5_], RoomPlaneRectangleMask);
                if (_loc6_ != null) {
                    if (_loc6_.leftSideLoc == param1 && _loc6_.rightSideLoc == param2 && _loc6_.leftSideLength == param3 && _loc6_.rightSideLength == param4) {
                        return false;
                    }
                }
                _loc5_++;
            }
            _loc6_ = new RoomPlaneRectangleMask(param1, param2, param3, param4);
            this._SafeStr_2707.push(_loc6_);
            this._SafeStr_2430 = true;
            return true;
        }
        return false;
    }

    private updateMaskChangeStatus(): void {
        let _loc2_: boolean = false;
        let _loc3_: RoomPlaneBitmapMask = null;
        if (!this._SafeStr_2430) {
            return;
        }
        let _loc4_: number = 0;
        let _loc6_: number = 0;
        let _loc5_: boolean = true;
        let _loc7_: RoomPlaneBitmapMask = null;
        let _loc1_: RoomPlaneRectangleMask = null;
        if (this._SafeStr_2447.length == this._SafeStr_3645.length) {
            _loc4_;
            while (_loc4_ < this._SafeStr_2447.length) {
                _loc7_ = asInstanceOf(this._SafeStr_2447[_loc4_], RoomPlaneBitmapMask);
                if (_loc7_ != null) {
                    _loc2_ = false;
                    _loc6_;
                    while (_loc6_ < this._SafeStr_3645.length) {
                        _loc3_ = asInstanceOf(this._SafeStr_3645[_loc6_], RoomPlaneBitmapMask);
                        if (_loc3_ != null) {
                            if (_loc3_.type == _loc7_.type && _loc3_.leftSideLoc == _loc7_.leftSideLoc && _loc3_.rightSideLoc == _loc7_.rightSideLoc) {
                                _loc2_ = true;
                                break;
                            }
                        }
                        _loc6_++;
                    }
                    if (!_loc2_) {
                        _loc5_ = false;
                        break;
                    }
                }
                _loc4_++;
            }
        } else {
            _loc5_ = false;
        }
        if (this._SafeStr_2707.length > this._SafeStr_4749.length) {
            _loc5_ = false;
        }
        if (_loc5_) {
            this._SafeStr_2430 = false;
        }
    }

    private updateMask(param1: BitmapData, param2: IRoomGeometry): void {
        let _loc3_: IVector3d = null;
        let _loc10_: number = 0;
        let _loc11_: number = 0;
        let _loc7_: string = null;
        let _loc9_: number = 0;
        let _loc8_: number = 0;
        if (!this._SafeStr_3672 || this._SafeStr_2447.length == 0 && this._SafeStr_2707.length == 0 && !this._SafeStr_2430 || this._maskManager == null) {
            return;
        }
        if (param1 == null || param2 == null) {
            return;
        }
        let _loc13_: RoomPlaneBitmapMask = null;
        let _loc4_: RoomPlaneRectangleMask = null;
        let _loc5_: number = 0;
        let _loc6_: number = 0;
        this.updateMaskChangeStatus();
        let _loc12_: number = param1.width;
        let _loc14_: number = param1.height;
        if (this._SafeStr_2208 == null || this._SafeStr_2208.width != _loc12_ || this._SafeStr_2208.height != _loc14_) {
            if (this._SafeStr_2208 != null) {
                this._SafeStr_2208.dispose();
                this._SafeStr_2208 = null;
            }
            try {
                this._SafeStr_2208 = new BitmapData(_loc12_ | 0, _loc14_ | 0, true, 16777215);
            } catch (e) {
                this._SafeStr_2208 = null;
                return;
            }
            this._SafeStr_2430 = true;
        }
        if (this._SafeStr_2430) {
            this._SafeStr_3645 = [];
            this._SafeStr_4749 = [];
            if (this._SafeStr_2208 != null) {
                this._SafeStr_2208.fillRect(this._SafeStr_2208.rect, 16777215);
            }
            this.resetTextureCache(param1);
            _loc3_ = param2.getCoordinatePosition(this._normal);
            _loc10_ = 0;
            _loc11_ = 0;
            _loc5_ = 0;
            while (_loc5_ < this._SafeStr_2447.length) {
                _loc13_ = asInstanceOf(this._SafeStr_2447[_loc5_], RoomPlaneBitmapMask);
                if (_loc13_ != null) {
                    _loc10_ = this._SafeStr_2208.width - this._SafeStr_2208.width * _loc13_.leftSideLoc / this._leftSide.length | 0;
                    _loc11_ = this._SafeStr_2208.height - this._SafeStr_2208.height * _loc13_.rightSideLoc / this._rightSide.length | 0;
                    _loc7_ = _loc13_.type;
                    this._maskManager.updateMask(this._SafeStr_2208, _loc7_, param2.scale, _loc3_, _loc10_, _loc11_);
                    this._SafeStr_3645.push(new RoomPlaneBitmapMask(_loc7_, _loc13_.leftSideLoc, _loc13_.rightSideLoc));
                }
                _loc5_++;
            }
            _loc6_ = 0;
            while (_loc6_ < this._SafeStr_2707.length) {
                _loc4_ = asInstanceOf(this._SafeStr_2707[_loc6_], RoomPlaneRectangleMask);
                if (_loc4_ != null) {
                    _loc10_ = this._SafeStr_2208.width - this._SafeStr_2208.width * _loc4_.leftSideLoc / this._leftSide.length | 0;
                    _loc11_ = this._SafeStr_2208.height - this._SafeStr_2208.height * _loc4_.rightSideLoc / this._rightSide.length | 0;
                    _loc9_ = this._SafeStr_2208.width * _loc4_.leftSideLength / this._leftSide.length | 0;
                    _loc8_ = this._SafeStr_2208.height * _loc4_.rightSideLength / this._rightSide.length | 0;
                    this._SafeStr_2208.fillRect(new Rectangle(_loc10_ - _loc9_, _loc11_ - _loc8_, _loc9_, _loc8_), 4278190080);
                    this._SafeStr_4749.push(new RoomPlaneRectangleMask(_loc4_.leftSideLength, _loc4_.rightSideLoc, _loc4_.leftSideLength, _loc4_.rightSideLength));
                }
                _loc6_++;
            }
            this._SafeStr_2430 = false;
        }
        this.combineTextureMask(param1, this._SafeStr_2208);
    }

    private combineTextureMask(param1: BitmapData, param2: BitmapData): void {
        if (param1 == null || param2 == null) {
            return;
        }
        if (this._SafeStr_2344 != null && (this._SafeStr_2344.width != param1.width || this._SafeStr_2344.height != param1.height)) {
            this._SafeStr_2344.dispose();
            this._SafeStr_2344 = null;
        }
        if (this._SafeStr_2344 == null) {
            try {
                this._SafeStr_2344 = new BitmapData(param1.width, param1.height, true, 4294967295);
            } catch (e) {
                if (this._SafeStr_2344) {
                    this._SafeStr_2344.dispose();
                }
                this._SafeStr_2344 = null;
                return;
            }
        }
        this._SafeStr_2344.copyChannel(param1, param1.rect, RoomPlane.ZERO_POINT, 8, 1);
        this._SafeStr_2344.draw(param2, null, null, "darken");
        param1.copyChannel(this._SafeStr_2344, this._SafeStr_2344.rect, RoomPlane.ZERO_POINT, 1, 8);
    }

    public get isHighlighter(): boolean {
        return this._SafeStr_7215;
    }

    public set isHighlighter(param1: boolean) {
        this._SafeStr_7215 = param1;
    }
}
