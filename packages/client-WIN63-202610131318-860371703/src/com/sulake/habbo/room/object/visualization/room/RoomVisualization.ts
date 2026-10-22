import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import type { IRoomObjectModel } from '@/com/sulake/room/object/IRoomObjectModel';
import type { IRoomObjectSprite } from '@/com/sulake/room/object/visualization/IRoomObjectSprite';
import type { IRoomObjectVisualizationData } from '@/com/sulake/room/object/visualization/IRoomObjectVisualizationData';
import type { IRoomPlane } from '@/com/sulake/room/object/visualization/IRoomPlane';
import type { IRoomGeometry } from '@/com/sulake/room/utils/IRoomGeometry';
import type { IVector3d } from '@/com/sulake/room/utils/IVector3d';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { Point } from '@habbo-pixi/runtime/geom/Point';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { AssetLibrary } from '@/com/sulake/core/runtime/Component.group';
import { RoomPlaneBitmapMaskParser } from '@/com/sulake/habbo/room/object/RoomPlaneBitmapMaskParser';
import { RoomPlaneParser } from '@/com/sulake/habbo/room/object/RoomPlaneParser';
import { RoomPlane } from '@/com/sulake/habbo/room/object/visualization/room/RoomPlane';
import { RoomVisualizationData } from '@/com/sulake/habbo/room/object/visualization/room/RoomVisualizationData';
import { RoomObjectSpriteType } from '@/com/sulake/room/object/enum/RoomObjectSpriteType';
import { IPlaneVisualization } from '@/com/sulake/room/object/visualization/IPlaneVisualization';
import { RoomObjectSpriteVisualization } from '@/com/sulake/room/object/visualization/RoomObjectSpriteVisualization';
import { Vector3d } from '@/com/sulake/room/utils/Vector3d';

export class RoomVisualization extends RoomObjectSpriteVisualization implements IPlaneVisualization {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.room::RoomVisualization'); }

    public static readonly _SafeStr_7723: number = 16777215;
    public static readonly _SafeStr_8428: number = 14540253;
    public static readonly FLOOR_COLOR_RIGHT: number = 12303291;
    private static readonly _SafeStr_7768: number = 16777215;
    private static readonly WALL_COLOR_SIDE: number = 13421772;
    private static readonly WALL_COLOR_BOTTOM: number = 10066329;
    private static readonly WALL_COLOR_BORDER: number = 10066329;
    public static readonly LANDSCAPE_COLOR_TOP: number = 16777215;
    public static readonly LANDSCAPE_COLOR_SIDE: number = 13421772;
    public static readonly LANDSCAPE_COLOR_BOTTOM: number = 10066329;
    private static readonly ROOM_DEPTH_OFFSET: number = 1000;
    protected _data: RoomVisualizationData = null;
    private _SafeStr_3052: AssetLibrary = null;
    private _SafeStr_2206: RoomPlaneParser = null;
    private _planes: any[] = [];
    private _SafeStr_3212: Map<any, any> = new Dictionary();
    private _SafeStr_5301: boolean = false;
    private _visiblePlanes: any[] = [];
    private _visiblePlaneSpriteNumbers: any[] = [];
    private _boundingRectangle: Rectangle = null;
    private _SafeStr_3079: RoomPlaneBitmapMaskParser = null;
    private _wallType: string = null;
    private _floorType: string = null;
    private _landscapeType: string = null;
    private _floorThicknessMultiplier: number = NaN;
    private _wallThicknessMultiplier: number = NaN;
    private _floorHoleUpdateTime: number = NaN;
    private _SafeStr_4882: string = null;
    private _backgroundColor: number = 16777215;
    private _backgroundRed: number = 255;
    private _backgroundGreen: number = 255;
    private _backgroundBlue: number = 255;
    private _SafeStr_4070: number = 0;
    private _lastUpdateTime: number = -1000;
    private readonly _SafeStr_8070: number = 250;
    private _geometryUpdateId: number = -1;
    private _SafeStr_4436: number = 0;
    private _SafeStr_6470: number = 0;
    private _SafeStr_6940: number = 0;
    private _SafeStr_5486: number = 0;
    private _planeTypeVisibilities: any[] = [];
    private _highlightAreaX: number = 0;
    private _highlightAreaY: number = 0;
    private _highlightAreaWidth: number = 0;
    private _highlightAreaHeight: number = 0;

    declare private _highlightFilter: any[];

    constructor() {
        super();
        this._SafeStr_3052 = new AssetLibrary("room visualization");
        this._SafeStr_2206 = new RoomPlaneParser();
        this._SafeStr_3079 = new RoomPlaneBitmapMaskParser();
        this._planeTypeVisibilities[0] = false;
        this._planeTypeVisibilities[2] = true;
        this._planeTypeVisibilities[1] = true;
        this._planeTypeVisibilities[3] = true;
    }

    public get floorRelativeDepth(): number {
        return 1000 + 0.1;
    }

    public get wallRelativeDepth(): number {
        return 1000 + 0.5;
    }

    public get wallAdRelativeDepth(): number {
        return 1000 + 0.49;
    }

    public get planeCount(): number {
        return this._planes.length | 0;
    }

    public override dispose(): void {
        let _loc1_: number = 0;
        let _loc2_: IAsset = null;
        super.dispose();
        if (this._SafeStr_3052 != null) {
            _loc1_ = 0;
            while (_loc1_ < this._SafeStr_3052.numAssets) {
                _loc2_ = this._SafeStr_3052.getAssetByIndex(_loc1_ >>> 0);
                if (_loc2_ != null) {
                    _loc2_.dispose();
                }
                _loc1_++;
            }
            this._SafeStr_3052.dispose();
            this._SafeStr_3052 = null;
        }
        this.resetRoomPlanes();
        this._planes = null;
        this._SafeStr_3212 = null;
        this._visiblePlanes = null;
        this._visiblePlaneSpriteNumbers = null;
        if (this._SafeStr_2206 != null) {
            this._SafeStr_2206.dispose();
            this._SafeStr_2206 = null;
        }
        if (this._SafeStr_3079 != null) {
            this._SafeStr_3079.dispose();
            this._SafeStr_3079 = null;
        }
        if (this._data != null) {
            this._data.clearCache();
            this._data = null;
        }
    }

    private resetRoomPlanes(): void {
        let _loc2_: number = 0;
        let _loc1_: RoomPlane = null;
        if (this._planes != null) {
            _loc2_ = 0;
            while (_loc2_ < this._planes.length) {
                _loc1_ = asInstanceOf(this._planes[_loc2_], RoomPlane);
                if (_loc1_ != null) {
                    _loc1_.dispose();
                }
                _loc2_++;
            }
            this._planes = [];
            this._SafeStr_3212 = new Dictionary();
        }
        this._SafeStr_5301 = false;
        this._SafeStr_4070 += 1;
        this.reset();
    }

    protected override reset(): void {
        super.reset();
        this._wallType = null;
        this._floorType = null;
        this._landscapeType = null;
        this._SafeStr_4882 = null;
        this._geometryUpdateId = -1;
        this._SafeStr_5486 = 0;
    }

    public override get boundingRectangle(): Rectangle {
        if (this._boundingRectangle == null) {
            this._boundingRectangle = super.boundingRectangle;
        }
        return new Rectangle(this._boundingRectangle.x, this._boundingRectangle.y, this._boundingRectangle.width, this._boundingRectangle.height);
    }

    public override initialize(param1: IRoomObjectVisualizationData): boolean {
        this.reset();
        if (param1 == null || !(param1 instanceof RoomVisualizationData)) {
            return false;
        }
        this._data = param1 instanceof RoomVisualizationData ? param1 : null;
        this._data.initializeAssetCollection(this.assetCollection);
        return true;
    }

    protected defineSprites(param1: number = 0): void {
        let _loc4_: number = 0;
        let _loc2_: RoomPlane = null;
        let _loc3_: IRoomObjectSprite = null;
        let _loc5_: number = this._planes.length | 0;
        this.createSprites(_loc5_);
        _loc4_ = param1;
        while (_loc4_ < _loc5_) {
            _loc2_ = asInstanceOf(this._planes[_loc4_], RoomPlane);
            _loc3_ = this.getSprite(_loc4_);
            if (_loc3_ != null && _loc2_ != null && _loc2_.leftSide != null && _loc2_.rightSide != null) {
                if (_loc2_.type == 1 && (_loc2_.leftSide.length < 1 || _loc2_.rightSide.length < 1)) {
                    _loc3_.alphaTolerance = 256;
                } else {
                    _loc3_.alphaTolerance = 128;
                }
                if (_loc2_.type == 1) {
                    _loc3_.tag = "plane.wall@" + (_loc4_ + 1);
                } else if (_loc2_.type == 2) {
                    _loc3_.tag = "plane.floor@" + (_loc4_ + 1);
                } else {
                    _loc3_.tag = "plane@" + (_loc4_ + 1);
                }
                _loc3_.spriteType = RoomObjectSpriteType.ROOM_PLANE;
                if (this._SafeStr_2206.isPlaneTemporaryHighlighter(_loc4_)) {
                    _loc3_.filters = this._highlightFilter;
                    _loc3_.skipMouseHandling = true;
                    _loc2_.extraDepth = -100;
                    _loc2_.isHighlighter = true;
                } else {
                    _loc3_.filters = [];
                    _loc3_.skipMouseHandling = false;
                    _loc2_.extraDepth = 0;
                    _loc2_.isHighlighter = false;
                }
            }
            _loc4_++;
        }
    }

    protected initializeRoomPlanes(): void {
        if (this._SafeStr_5301) {
            return;
        }
        let _loc1_: IRoomObject = this.object;
        if (_loc1_ == null) {
            return;
        }
        if (!isNaN(this._floorThicknessMultiplier)) {
            this._SafeStr_2206.floorThicknessMultiplier = this._floorThicknessMultiplier;
        }
        if (!isNaN(this._wallThicknessMultiplier)) {
            this._SafeStr_2206.wallThicknessMultiplier = this._wallThicknessMultiplier;
        }
        let _loc2_: string = _loc1_.getModel().getString("room_plane_xml");
        this._SafeStr_2206.clearHighlightArea();
        if (!this._SafeStr_2206.initializeFromXML(new XML(_loc2_))) {
            return;
        }
        this._SafeStr_2206.initializeHighlightArea(this._highlightAreaX, this._highlightAreaY, this._highlightAreaWidth, this._highlightAreaHeight);
        this.createPlanesAndSprites();
    }

    private createPlanesAndSprites(param1: number = 0): void {
        let _loc8_: number = 0;
        let _loc4_: IVector3d = null;
        let _loc18_: IVector3d = null;
        let _loc11_: IVector3d = null;
        let _loc7_: any[] = null;
        let _loc12_: number = 0;
        let _loc2_: RoomPlane = null;
        let _loc5_: IVector3d = null;
        let _loc19_: number = NaN;
        let _loc21_: number = NaN;
        let _loc13_: number = NaN;
        let _loc14_: number = NaN;
        let _loc10_: number = 0;
        let _loc6_: number = NaN;
        let _loc3_: number = NaN;
        let _loc15_: number = NaN;
        let _loc9_: number = NaN;
        let _loc23_: number = this.getLandscapeWidth();
        let _loc17_: number = this.getLandscapeHeight();
        let _loc22_: number = 0;
        let _loc20_: IRoomObject = this.object;
        let _loc16_: number = _loc20_.getModel().getNumber("room_random_seed") | 0;
        _loc8_ = param1;
        while (_loc8_ < this._SafeStr_2206.planeCount) {
            this._SafeStr_3212.set(_loc8_, -1);
            _loc4_ = this._SafeStr_2206.getPlaneLocation(_loc8_);
            _loc18_ = this._SafeStr_2206.getPlaneLeftSide(_loc8_);
            _loc11_ = this._SafeStr_2206.getPlaneRightSide(_loc8_);
            _loc7_ = this._SafeStr_2206.getPlaneSecondaryNormals(_loc8_);
            _loc12_ = this._SafeStr_2206.getPlaneType(_loc8_);
            _loc2_ = null;
            if (!(_loc4_ != null && _loc18_ != null && _loc11_ != null)) {
                return;
            }
            _loc5_ = Vector3d.crossProduct(_loc18_, _loc11_);
            _loc16_ = _loc16_ * 7613 + 517;
            _loc2_ = null;
            if (_loc12_ == 1) {
                _loc19_ = _loc4_.x + _loc18_.x + 0.5;
                _loc21_ = _loc4_.y + _loc11_.y + 0.5;
                _loc13_ = (_loc19_ | 0) - _loc19_;
                _loc14_ = (_loc21_ | 0) - _loc21_;
                _loc2_ = new RoomPlane(_loc20_.getLocation(), _loc4_, _loc18_, _loc11_, 2, true, _loc7_, _loc16_, -_loc13_, -_loc14_);
                if (_loc5_.z != 0) {
                    _loc2_.color = 16777215;
                } else {
                    _loc2_.color = (_loc5_.x != 0 ? 12303291 : 14540253) >>> 0;
                }
                if (this._data != null) {
                    _loc2_.rasterizer = this._data.floorRasterizer;
                }
            } else if (_loc12_ == 2) {
                _loc2_ = new RoomPlane(_loc20_.getLocation(), _loc4_, _loc18_, _loc11_, 1, true, _loc7_, _loc16_);
                if (_loc18_.length < 1 || _loc11_.length < 1) {
                    _loc2_.hasTexture = false;
                }
                if (_loc5_.x == 0 && _loc5_.y == 0) {
                    _loc2_.color = 10066329;
                } else if (_loc5_.y > 0) {
                    _loc2_.color = 16777215;
                } else if (_loc5_.y == 0) {
                    _loc2_.color = 13421772;
                } else {
                    _loc2_.color = 10066329;
                }
                if (this._data != null) {
                    _loc2_.rasterizer = this._data.wallRasterizer;
                }
            } else if (_loc12_ == 3) {
                _loc2_ = new RoomPlane(_loc20_.getLocation(), _loc4_, _loc18_, _loc11_, 3, true, _loc7_, _loc16_, _loc22_, 0, _loc23_, _loc17_);
                if (_loc5_.y > 0) {
                    _loc2_.color = 16777215;
                } else if (_loc5_.y == 0) {
                    _loc2_.color = 13421772;
                } else {
                    _loc2_.color = 10066329;
                }
                if (this._data != null) {
                    _loc2_.rasterizer = this._data.landscapeRasterizer;
                }
                _loc22_ += _loc18_.length;
            } else if (_loc12_ == 4) {
                _loc2_ = new RoomPlane(_loc20_.getLocation(), _loc4_, _loc18_, _loc11_, 1, true, _loc7_, _loc16_);
                if (_loc18_.length < 1 || _loc11_.length < 1) {
                    _loc2_.hasTexture = false;
                }
                if (_loc5_.x == 0 && _loc5_.y == 0) {
                    _loc2_.color = 10066329;
                } else if (_loc5_.y > 0) {
                    _loc2_.color = 16777215;
                } else if (_loc5_.y == 0) {
                    _loc2_.color = 13421772;
                } else {
                    _loc2_.color = 10066329;
                }
                if (this._data != null) {
                    _loc2_.rasterizer = this._data.wallAdRasterizr;
                }
            }
            if (_loc2_ != null) {
                _loc2_.maskManager = this._data.maskManager;
                _loc10_ = 0;
                while (_loc10_ < this._SafeStr_2206.getPlaneMaskCount(_loc8_)) {
                    _loc6_ = this._SafeStr_2206.getPlaneMaskLeftSideLoc(_loc8_, _loc10_);
                    _loc3_ = this._SafeStr_2206.getPlaneMaskRightSideLoc(_loc8_, _loc10_);
                    _loc15_ = this._SafeStr_2206.getPlaneMaskLeftSideLength(_loc8_, _loc10_);
                    _loc9_ = this._SafeStr_2206.getPlaneMaskRightSideLength(_loc8_, _loc10_);
                    _loc2_.addRectangleMask(_loc6_, _loc3_, _loc15_, _loc9_);
                    _loc10_++;
                }
                this._SafeStr_3212.set(_loc8_, this._planes.length);
                this._planes.push(_loc2_);
            }
            _loc8_++;
        }
        this._SafeStr_5301 = true;
        this.defineSprites(param1);
    }

    public initializeHighlightArea(param1: number, param2: number, param3: number, param4: number, param5: any[]): void {
        this.clearHighlightArea();
        this._highlightAreaX = param1;
        this._highlightAreaY = param2;
        this._highlightAreaWidth = param3;
        this._highlightAreaHeight = param4;
        this._highlightFilter = param5;
        this._SafeStr_2206.initializeHighlightArea(param1, param2, param3, param4);
        this.createPlanesAndSprites(this._planes.length | 0);
        this.reset();
    }

    public clearHighlightArea(): void {
        let _loc1_: number = 0;
        let _loc2_: number = 0;
        this._highlightAreaX = 0;
        this._highlightAreaY = 0;
        this._highlightAreaWidth = 0;
        this._highlightAreaHeight = 0;
        let _loc3_: number = this._SafeStr_2206.clearHighlightArea();
        let _loc4_: number = 0;
        _loc1_ = this._SafeStr_2206.planeCount;
        while (_loc1_ < this._SafeStr_2206.planeCount + _loc3_) {
            _loc2_ = this._SafeStr_3212.get(_loc1_) | 0;
            if (_loc2_ != -1) {
                _loc4_ += 1;
                this._SafeStr_3212.set(_loc1_, -1);
            }
            _loc1_ += 1;
        }
        this._planes = this._planes.slice(0, this._planes.length - _loc4_);
        this.createSprites(this._planes.length | 0);
        this.reset();
    }

    private getLandscapeWidth(): number {
        let _loc2_: number = 0;
        let _loc3_: number = 0;
        let _loc1_: IVector3d = null;
        let _loc4_: number = 0;
        _loc2_ = 0;
        while (_loc2_ < this._SafeStr_2206.planeCount) {
            _loc3_ = this._SafeStr_2206.getPlaneType(_loc2_);
            if (_loc3_ == 3) {
                _loc1_ = this._SafeStr_2206.getPlaneLeftSide(_loc2_);
                _loc4_ += _loc1_.length;
            }
            _loc2_++;
        }
        return _loc4_;
    }

    private getLandscapeHeight(): number {
        let _loc2_: number = 0;
        let _loc4_: number = 0;
        let _loc3_: IVector3d = null;
        let _loc1_: number = 0;
        _loc2_ = 0;
        while (_loc2_ < this._SafeStr_2206.planeCount) {
            _loc4_ = this._SafeStr_2206.getPlaneType(_loc2_);
            if (_loc4_ == 3) {
                _loc3_ = this._SafeStr_2206.getPlaneRightSide(_loc2_);
                if (_loc3_.length > _loc1_) {
                    _loc1_ = _loc3_.length;
                }
            }
            _loc2_++;
        }
        if (_loc1_ > 5) {
            _loc1_ = 5;
        }
        return _loc1_;
    }

    public override update(param1: IRoomGeometry, param2: number, param3: boolean, param4: boolean): void {
        let _loc8_: number = 0;
        let _loc16_: number = 0;
        let _loc14_: IRoomObjectSprite = null;
        let _loc5_: RoomPlane = null;
        let _loc7_: any = 0;
        let _loc11_: any = 0;
        let _loc6_: any = 0;
        let _loc10_: any = 0;
        let _loc13_: any = 0;
        let _loc12_: IRoomObject = this.object;
        if (_loc12_ == null) {
            return;
        }
        if (param1 == null) {
            return;
        }
        let _loc9_: boolean = this.updateGeometry(param1);
        let _loc15_: IRoomObjectModel = _loc12_.getModel();
        let _loc18_: boolean = false;
        if (this.updatePlaneThicknesses(_loc15_)) {
            _loc18_ = true;
        }
        if (this.updateFloorHoles(_loc15_)) {
            _loc18_ = true;
        }
        this.initializeRoomPlanes();
        _loc18_ = this.updateMasksAndColors(_loc15_);
        let _loc17_: number = param2;
        if (_loc17_ < this._lastUpdateTime + 250 && !_loc9_ && !_loc18_) {
            return;
        }
        if (this.updatePlaneTexturesAndVisibilities(_loc15_)) {
            if (!_loc18_) {
                _loc18_ = true;
            }
        }
        if (this.updatePlanes(param1, _loc9_, param2)) {
            if (!_loc18_) {
                _loc18_ = true;
            }
        }
        if (_loc18_) {
            _loc8_ = 0;
            while (_loc8_ < this._visiblePlanes.length) {
                _loc16_ = this._visiblePlaneSpriteNumbers[_loc8_] | 0;
                _loc14_ = this.getSprite(_loc16_);
                _loc5_ = asInstanceOf(this._visiblePlanes[_loc8_], RoomPlane);
                if (_loc14_ != null && _loc5_ != null && _loc5_.type != 3) {
                    _loc7_ = _loc5_.color;
                    _loc11_ = (_loc7_ & 0xFF) * this._backgroundBlue / 255 >>> 0;
                    _loc6_ = (_loc7_ >> 8 & 0xFF) * this._backgroundGreen / 255 >>> 0;
                    _loc10_ = (_loc7_ >> 16 & 0xFF) * this._backgroundRed / 255 >>> 0;
                    _loc13_ = (_loc7_ >> 24) >>> 0;
                    _loc7_ = (_loc13_ << 24) + (_loc10_ << 16) + (_loc6_ << 8) + _loc11_ >>> 0;
                    _loc14_.color = _loc7_ | 0;
                }
                _loc8_++;
            }
            this.increaseUpdateId();
        }
        this._SafeStr_2366 = _loc15_.getUpdateID();
        this._lastUpdateTime = _loc17_;
    }

    private updateGeometry(param1: IRoomGeometry): boolean {
        let _loc2_: IVector3d = null;
        let _loc3_: boolean = false;
        if (param1.updateId != this._geometryUpdateId) {
            this._geometryUpdateId = param1.updateId;
            this._boundingRectangle = null;
            _loc2_ = param1.direction;
            if (_loc2_ != null && (_loc2_.x != this._SafeStr_4436 || _loc2_.y != this._SafeStr_6470 || _loc2_.z != this._SafeStr_6940 || param1.scale != this._SafeStr_5486)) {
                this._SafeStr_4436 = _loc2_.x;
                this._SafeStr_6470 = _loc2_.y;
                this._SafeStr_6940 = _loc2_.z;
                this._SafeStr_5486 = param1.scale;
                _loc3_ = true;
            }
        }
        return _loc3_;
    }

    private updateMasksAndColors(param1: IRoomObjectModel): boolean {
        let _loc2_: string = null;
        let _loc3_: any = 0;
        let _loc4_: boolean = false;
        if (this._SafeStr_2366 != param1.getUpdateID()) {
            _loc2_ = param1.getString("room_plane_mask_xml");
            if (_loc2_ != this._SafeStr_4882) {
                this.updatePlaneMasks(_loc2_);
                this._SafeStr_4882 = _loc2_;
                _loc4_ = true;
            }
            _loc3_ = param1.getNumber("room_background_color") >>> 0;
            if (_loc3_ != this._backgroundColor) {
                this._backgroundColor = _loc3_ >>> 0;
                this._backgroundBlue = this._backgroundColor & 0xFF;
                this._backgroundGreen = this._backgroundColor >> 8 & 0xFF;
                this._backgroundRed = this._backgroundColor >> 16 & 0xFF;
                _loc4_ = true;
            }
        }
        return _loc4_;
    }

    private updatePlaneTexturesAndVisibilities(param1: IRoomObjectModel): boolean {
        let _loc5_: string = null;
        let _loc6_: string = null;
        let _loc2_: string = null;
        let _loc3_: boolean = false;
        let _loc7_: boolean = false;
        let _loc4_: boolean = false;
        if (this._SafeStr_2366 != param1.getUpdateID()) {
            _loc5_ = param1.getString("room_wall_type");
            _loc6_ = param1.getString("room_floor_type");
            _loc2_ = param1.getString("room_landscape_type");
            this.updatePlaneTextureTypes(_loc6_, _loc5_, _loc2_);
            _loc3_ = Boolean(param1.getNumber("room_floor_visibility"));
            _loc7_ = Boolean(param1.getNumber("room_wall_visibility"));
            _loc4_ = Boolean(param1.getNumber("room_landscape_visibility"));
            this.updatePlaneTypeVisibilities(_loc3_, _loc7_, _loc4_);
            return true;
        }
        return false;
    }

    private updatePlaneThicknesses(param1: IRoomObjectModel): boolean {
        let _loc3_: number = NaN;
        let _loc2_: number = NaN;
        if (this._SafeStr_2366 != param1.getUpdateID()) {
            _loc3_ = param1.getNumber("room_floor_thickness");
            _loc2_ = param1.getNumber("room_wall_thickness");
            if (!isNaN(_loc3_) && !isNaN(_loc2_) && (_loc3_ != this._floorThicknessMultiplier || _loc2_ != this._wallThicknessMultiplier)) {
                this._floorThicknessMultiplier = _loc3_;
                this._wallThicknessMultiplier = _loc2_;
                this.resetRoomPlanes();
                return true;
            }
        }
        return false;
    }

    private updateFloorHoles(param1: IRoomObjectModel): boolean {
        let _loc2_: number = NaN;
        if (this._SafeStr_2366 != param1.getUpdateID()) {
            _loc2_ = param1.getNumber("room_floor_hole_update_time");
            if (!isNaN(_loc2_) && _loc2_ != this._floorHoleUpdateTime) {
                this._floorHoleUpdateTime = _loc2_;
                this.resetRoomPlanes();
                return true;
            }
        }
        return false;
    }

    protected updatePlaneTextureTypes(param1: string, param2: string, param3: string): boolean {
        let _loc5_: number = 0;
        let _loc4_: RoomPlane = null;
        if (param1 != this._floorType) {
            this._floorType = param1;
        } else {
            param1 = null;
        }
        if (param2 != this._wallType) {
            this._wallType = param2;
        } else {
            param2 = null;
        }
        if (param3 != this._landscapeType) {
            this._landscapeType = param3;
        } else {
            param3 = null;
        }
        if (param1 == null && param2 == null && param3 == null) {
            return false;
        }
        _loc5_ = 0;
        while (_loc5_ < this._planes.length) {
            _loc4_ = asInstanceOf(this._planes[_loc5_], RoomPlane);
            if (_loc4_ != null) {
                if (_loc4_.type == 2 && param1 != null) {
                    _loc4_.id = param1;
                } else if (_loc4_.type == 1 && param2 != null) {
                    _loc4_.id = param2;
                } else if (_loc4_.type == 3 && param3 != null) {
                    _loc4_.id = param3;
                }
            }
            _loc5_++;
        }
        return true;
    }

    private updatePlaneTypeVisibilities(param1: boolean, param2: boolean, param3: boolean): void {
        if (param1 != this._planeTypeVisibilities[2] || param2 != this._planeTypeVisibilities[1] || param3 != this._planeTypeVisibilities[3]) {
            this._planeTypeVisibilities[2] = param1;
            this._planeTypeVisibilities[1] = param2;
            this._planeTypeVisibilities[3] = param3;
            this._visiblePlanes = [];
            this._visiblePlaneSpriteNumbers = [];
        }
    }

    protected updatePlanes(param1: IRoomGeometry, param2: boolean, param3: number): boolean {
        let _loc8_: number = 0;
        let _loc9_: number = 0;
        let _loc12_: IRoomObjectSprite = null;
        let _loc4_: RoomPlane = null;
        let _loc10_: number = NaN;
        let _loc13_: string = null;
        let _loc11_: IRoomObject = this.object;
        if (_loc11_ == null) {
            return false;
        }
        if (param1 == null) {
            return false;
        }
        this._SafeStr_4070 = this._SafeStr_4070 + 1;
        if (param2) {
            this._visiblePlanes = [];
            this._visiblePlaneSpriteNumbers = [];
        }
        let _loc5_: number = param3;
        let _loc6_: any[] = this._visiblePlanes;
        if (this._visiblePlanes.length == 0) {
            _loc6_ = this._planes;
        }
        let _loc14_: boolean = false;
        let _loc7_: boolean = this._visiblePlanes.length > 0;
        _loc8_ = 0;
        while (_loc8_ < _loc6_.length) {
            _loc9_ = _loc8_;
            if (_loc7_) {
                _loc9_ = this._visiblePlaneSpriteNumbers[_loc8_] | 0;
            }
            _loc12_ = this.getSprite(_loc9_);
            if (_loc12_ != null) {
                _loc4_ = asInstanceOf(_loc6_[_loc8_], RoomPlane);
                if (_loc4_ != null) {
                    _loc12_.planeId = _loc4_.uniqueId;
                    if (_loc4_.update(param1, _loc5_)) {
                        if (_loc4_.visible) {
                            _loc10_ = _loc4_.relativeDepth + this.floorRelativeDepth + _loc9_ / 1000;
                            if (_loc4_.type != 2) {
                                _loc10_ = _loc4_.relativeDepth + this.wallRelativeDepth + _loc9_ / 1000;
                                if (_loc4_.leftSide.length < 1 || _loc4_.rightSide.length < 1) {
                                    _loc10_ += 1000 * 0.5;
                                }
                            }
                            _loc13_ = "plane " + _loc9_ + " " + param1.scale;
                            this.updateSprite(_loc12_, _loc4_, _loc13_, _loc10_);
                        }
                        _loc14_ = true;
                    }
                    if (_loc12_.visible != (_loc4_.visible && this._planeTypeVisibilities[_loc4_.type])) {
                        _loc12_.visible = !_loc12_.visible;
                        _loc14_ = true;
                    }
                    if (_loc12_.visible) {
                        if (!_loc7_) {
                            this._visiblePlanes.push(_loc4_);
                            this._visiblePlaneSpriteNumbers.push(_loc8_);
                        }
                    }
                } else {
                    _loc12_.planeId = 0;
                    if (_loc12_.visible) {
                        _loc12_.visible = false;
                        _loc14_ = true;
                    }
                }
            }
            _loc8_++;
        }
        return _loc14_;
    }

    private updateSprite(param1: IRoomObjectSprite, param2: RoomPlane, param3: string, param4: number): void {
        let _loc5_: Point = param2.offset;
        param1.offsetX = -_loc5_.x | 0;
        param1.offsetY = -_loc5_.y | 0;
        param1.relativeDepth = param4;
        param1.color = param2.color | 0;
        param1.asset = this.getPlaneBitmap(param2, param3);
        param1.assetName = param3 + "_" + this._SafeStr_4070;
    }

    private getPlaneBitmap(param1: RoomPlane, param2: string): BitmapData {
        let _loc5_: BitmapData = null;
        let _loc4_: BitmapDataAsset = asInstanceOf(this._SafeStr_3052.getAssetByName(param2), BitmapDataAsset);
        if (_loc4_ == null) {
            _loc4_ = new BitmapDataAsset(this._SafeStr_3052.getAssetTypeDeclarationByClass(BitmapDataAsset));
            this._SafeStr_3052.setAsset(param2, _loc4_);
        }
        let _loc3_: BitmapData = param1.cloneBitmapData();
        if (_loc3_ != null) {
            _loc5_ = asInstanceOf(_loc4_.content, BitmapData);
            if (_loc5_ != null) {
                _loc5_.dispose();
            }
            _loc4_.setUnknownContent(_loc3_);
        }
        return _loc3_;
    }

    protected updatePlaneMasks(param1: string): void {
        let _loc10_: number = 0;
        let _loc11_: number = 0;
        let _loc7_: string = null;
        let _loc9_: IVector3d = null;
        let _loc12_: string = null;
        let _loc13_: number = 0;
        let _loc18_: IVector3d = null;
        let _loc8_: number = NaN;
        let _loc5_: number = NaN;
        let _loc3_: number = NaN;
        let _loc15_: number = 0;
        let _loc4_: number = 0;
        if (param1 == null) {
            return;
        }
        let _loc17_: XML = XML.from(param1);
        this._SafeStr_3079.initialize(_loc17_);
        let _loc2_: RoomPlane = null;
        let _loc14_: any[] = [];
        let _loc16_: any[] = [];
        let _loc6_: boolean = false;
        _loc10_ = 0;
        while (_loc10_ < this._planes.length) {
            _loc2_ = asInstanceOf(this._planes[_loc10_], RoomPlane);
            if (_loc2_ != null) {
                _loc2_.resetBitmapMasks();
                if (_loc2_.type == 3) {
                    _loc14_.push(_loc10_);
                }
            }
            _loc10_++;
        }
        _loc11_ = 0;
        while (_loc11_ < this._SafeStr_3079.maskCount) {
            _loc7_ = this._SafeStr_3079.getMaskType(_loc11_);
            _loc9_ = this._SafeStr_3079.getMaskLocation(_loc11_);
            _loc12_ = this._SafeStr_3079.getMaskCategory(_loc11_);
            if (_loc9_ != null) {
                _loc13_ = 0;
                while (_loc13_ < this._planes.length) {
                    _loc2_ = asInstanceOf(this._planes[_loc13_], RoomPlane);
                    if (_loc2_.type == 1 || _loc2_.type == 3) {
                        if (_loc2_ != null && _loc2_.location != null && _loc2_.normal != null) {
                            _loc18_ = Vector3d.dif(_loc9_, _loc2_.location);
                            _loc8_ = Number(Math.abs(Vector3d.scalarProjection(_loc18_, _loc2_.normal)));
                            if (_loc8_ < 0.01) {
                                if (_loc2_.leftSide != null && _loc2_.rightSide != null) {
                                    _loc5_ = Vector3d.scalarProjection(_loc18_, _loc2_.leftSide);
                                    _loc3_ = Vector3d.scalarProjection(_loc18_, _loc2_.rightSide);
                                    if (_loc2_.type == 1 || _loc2_.type == 3 && _loc12_ == "hole") {
                                        _loc2_.addBitmapMask(_loc7_, _loc5_, _loc3_);
                                    } else if (_loc2_.type == 3) {
                                        if (!_loc2_.canBeVisible) {
                                            _loc6_ = true;
                                        }
                                        _loc2_.canBeVisible = true;
                                        _loc16_.push(_loc13_);
                                    }
                                }
                            }
                        }
                    }
                    _loc13_++;
                }
            }
            _loc11_++;
        }
        _loc15_ = 0;
        while (_loc15_ < _loc14_.length) {
            _loc4_ = _loc14_[_loc15_] | 0;
            if (_loc16_.indexOf(_loc4_) < 0) {
                _loc2_ = asInstanceOf(this._planes[_loc4_], RoomPlane);
                _loc2_.canBeVisible = false;
                _loc6_ = true;
            }
            _loc15_++;
        }
        if (_loc6_) {
            this._visiblePlanes = [];
            this._visiblePlaneSpriteNumbers = [];
        }
    }

    public get planes(): IRoomPlane[] {
        let _loc2_: IRoomPlane[] = new Array<IRoomPlane>(0).fill(null);
        for (const _loc1_ of this._visiblePlanes ?? []) {
            _loc2_.push(_loc1_);
        }
        return _loc2_;
    }

    get [IPlaneVisualization](): true {
        return true;
    }
}
