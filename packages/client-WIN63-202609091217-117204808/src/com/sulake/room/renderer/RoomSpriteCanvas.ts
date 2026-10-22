import { asGuarded, asInstanceOf, isString, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { RoomObjectSpriteData } from '@/com/sulake/room/data/RoomObjectSpriteData';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import type { IRoomObjectMouseHandler } from '@/com/sulake/room/object/logic/IRoomObjectMouseHandler';
import type { IRoomObjectSprite } from '@/com/sulake/room/object/visualization/IRoomObjectSprite';
import type { IRoomObjectSpriteVisualization } from '@/com/sulake/room/object/visualization/IRoomObjectSpriteVisualization';
import type { RoomObjectCacheItem } from '@/com/sulake/room/renderer/cache/RoomObjectCacheItem';
import type { RoomObjectLocationCacheItem } from '@/com/sulake/room/renderer/cache/RoomObjectLocationCacheItem';
import type { RoomObjectSortableSpriteCacheItem } from '@/com/sulake/room/renderer/cache/RoomObjectSortableSpriteCacheItem';
import type { IRoomRenderingCanvasMouseListener } from '@/com/sulake/room/renderer/IRoomRenderingCanvasMouseListener';
import type { IRoomSpriteCanvasContainer } from '@/com/sulake/room/renderer/IRoomSpriteCanvasContainer';
import type { IRoomGeometry } from '@/com/sulake/room/utils/IRoomGeometry';
import type { IVector3d } from '@/com/sulake/room/utils/IVector3d';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { DisplayObject } from '@habbo-pixi/runtime/display/DisplayObject';
import { Sprite } from '@habbo-pixi/runtime/display/Sprite';
import type { MouseEvent } from '@habbo-pixi/runtime/events/MouseEvent';
import { ColorTransform } from '@habbo-pixi/runtime/geom/ColorTransform';
import { Matrix } from '@habbo-pixi/runtime/geom/Matrix';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { TextField } from '@habbo-pixi/runtime/text/TextField';
import { TextFormat } from '@habbo-pixi/runtime/text/TextFormat';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { Logger } from '@/com/sulake/habbo/Logger';
import { RoomSpriteMouseEvent } from '@/com/sulake/room/events/RoomSpriteMouseEvent';
import { RoomObjectSpriteType } from '@/com/sulake/room/object/enum/RoomObjectSpriteType';
import { isIRoomObjectSpriteVisualization } from '@/com/sulake/room/object/visualization/IRoomObjectSpriteVisualization';
import { BitmapDataCache } from '@/com/sulake/room/renderer/cache/BitmapDataCache';
import { RoomObjectCache } from '@/com/sulake/room/renderer/cache/RoomObjectCache';
import { IRoomRenderingCanvas } from '@/com/sulake/room/renderer/IRoomRenderingCanvas';
import { ExtendedBitmapData } from '@/com/sulake/room/renderer/utils/ExtendedBitmapData';
import { ExtendedSprite } from '@/com/sulake/room/renderer/utils/ExtendedSprite';
import { ObjectMouseData } from '@/com/sulake/room/renderer/utils/ObjectMouseData';
import { SortableSprite } from '@/com/sulake/room/renderer/utils/SortableSprite';
import { RoomEnterEffect } from '@/com/sulake/room/utils/RoomEnterEffect';
import { RoomGeometry } from '@/com/sulake/room/utils/RoomGeometry';
import { Vector3d } from '@/com/sulake/room/utils/Vector3d';

export class RoomSpriteCanvas implements IRoomRenderingCanvas {
    static { registerClassName(this, 'com.sulake.room.renderer::RoomSpriteCanvas'); }

    private static readonly SKIP_FRAME_COUNT_FOR_UPDATE_INTERVAL: number = 50;
    private static readonly FRAME_COUNT_FOR_UPDATE_INTERVAL: number = 50;
    private static readonly SLOW_FRAME_UPDATE_INTERVAL: number = 60;
    private static readonly FAST_FRAME_UPDATE_INTERVAL: number = 50;
    private static readonly ZERO_POINT: Point = new Point(0, 0);

    declare private _container: IRoomSpriteCanvasContainer;

    declare private _geometry: RoomGeometry;

    private _bgColor: number = 0;

    declare private _SafeStr_2282: Sprite;

    declare private _SafeStr_2340: Sprite;

    declare private _display: Sprite;

    private _SafeStr_3202: UtilsMap = new UtilsMap();
    private _SafeStr_3222: Point = new Point();

    declare private _bitmapDataCache: BitmapDataCache;

    declare private _roomObjectCache: RoomObjectCache;

    private _SafeStr_2739: any[] = [];
    private _SafeStr_3161: any[] = [];
    private _mouseListener: IRoomRenderingCanvasMouseListener = null;

    declare private _id: number;
    static { (this.prototype as any)._id = 0; }

    private _eventCache: UtilsMap = null;
    private _SafeStr_5881: number = 0;

    declare private _SafeStr_3225: number;
    static { (this.prototype as any)._SafeStr_3225 = 0; }

    declare private _SafeStr_3189: number;
    static { (this.prototype as any)._SafeStr_3189 = 0; }

    private _screenOffsetX: number = 0;
    private _screenOffsetY: number = 0;

    declare private _SafeStr_6409: number;
    static { (this.prototype as any)._SafeStr_6409 = 0; }

    declare private _SafeStr_6946: number;
    static { (this.prototype as any)._SafeStr_6946 = 0; }

    private _SafeStr_4279: number = -1;
    private _SafeStr_6113: number = -10000000;
    private _SafeStr_6942: number = -10000000;
    private _SafeStr_3911: number = 0;
    private _mouseSpriteWasHit: boolean = false;
    private _SafeStr_3672: boolean = false;

    declare private _colorTransform: ColorTransform;

    declare private _SafeStr_3281: Matrix;

    private _averageUpdateInterval: number = 0;
    private _SafeStr_3538: number = 0;
    private _SafeStr_14778: number = 0;
    private _SafeStr_14779: number = 0;
    private _SafeStr_14780: number = 0;
    private _runningSlow: boolean = false;
    private _skipObjectUpdate: boolean = false;
    private _SafeStr_4090: number = 0;
    private _usesExclusionRectangles: boolean = false;
    private _excludedRectangles: any[] = [];
    private _activeSpriteCount: number = 0;
    private _SafeStr_3855: number = 0;
    private _SafeStr_7368: number = 0;
    private _SafeStr_4556: number = 0;
    private _SafeStr_14781: number = -1;
    private _scale: number = 1;
    private _SafeStr_14782: boolean = false;

    declare private _SafeStr_3521: boolean;
    static { (this.prototype as any)._SafeStr_3521 = false; }

    declare private _SafeStr_6259: boolean;
    static { (this.prototype as any)._SafeStr_6259 = false; }

    private _SafeStr_2603: TextField = new TextField();

    constructor(param1: IRoomSpriteCanvasContainer, param2: number, param3: number, param4: number, param5: number) {
        this.initInstanceFields();
        this._container = param1;
        this._id = param2;
        this._SafeStr_2282 = new Sprite();
        this._SafeStr_2282.mouseEnabled = false;
        this._display = new Sprite();
        this._display.name = "canvas";
        this._display.mouseEnabled = false;
        this._SafeStr_2282.addChild(this._display);
        this._display.mouseEnabled = true;
        this._display.doubleClickEnabled = true;
        this._display.addEventListener("click", this.clickHandler);
        this._display.addEventListener("doubleClick", this.clickHandler);
        let _loc7_: TextFormat = new TextFormat();
        _loc7_.color = 16733440;
        _loc7_.font = "Verdana";
        _loc7_.size = 9;
        _loc7_.align = "right";
        this._SafeStr_2603.defaultTextFormat = _loc7_;
        this._SafeStr_2603.background = false;
        this._SafeStr_2603.backgroundColor = 0;
        this._SafeStr_2603.multiline = true;
        this._SafeStr_2603.mouseEnabled = false;
        this._SafeStr_2603.selectable = false;
        this._SafeStr_2603.tabEnabled = false;
        this._SafeStr_2603.width = 100;
        this._SafeStr_2603.height = 60;
        if (!this._SafeStr_3672) {
            this._SafeStr_2282.addChild(this._SafeStr_2603);
        }
        this._geometry = new RoomGeometry(param5, new Vector3d(-135, 30, 0), new Vector3d(11, 11, 5), new Vector3d(-135, 0.5, 0));
        this._bitmapDataCache = new BitmapDataCache(16, 32, 1);
        let _loc6_: string = null;
        if (this._container != null) {
            _loc6_ = this._container.roomObjectVariableAccurateZ;
        }
        this._eventCache = new UtilsMap();
        this._roomObjectCache = new RoomObjectCache(_loc6_);
        this._colorTransform = new ColorTransform();
        this._SafeStr_3281 = new Matrix();
        this.initialize(param3, param4);
    }

    protected get container(): IRoomSpriteCanvasContainer {
        return this._container;
    }

    protected get activeSpriteCount(): number {
        return this._activeSpriteCount;
    }

    public get width(): number {
        return this._SafeStr_3225 * this._scale | 0;
    }

    public get height(): number {
        return this._SafeStr_3189 * this._scale | 0;
    }

    public set screenOffsetX(param1: number) {
        this._screenOffsetX = param1;
    }

    public set screenOffsetY(param1: number) {
        this._screenOffsetY = param1;
    }

    public get screenOffsetX(): number {
        return this._screenOffsetX;
    }

    public get screenOffsetY(): number {
        return this._screenOffsetY;
    }

    public get displayObject(): DisplayObject {
        return this._SafeStr_2282;
    }

    public get geometry(): IRoomGeometry {
        return this._geometry;
    }

    public set mouseListener(param1: IRoomRenderingCanvasMouseListener) {
        this._mouseListener = param1;
    }

    public set useMask(param1: boolean) {
        if (param1 && !this._SafeStr_3672) {
            this._SafeStr_3672 = true;
            if (this._SafeStr_2340 != null && !this._SafeStr_2282.contains(this._SafeStr_2340)) {
                this._SafeStr_2282.addChild(this._SafeStr_2340);
                this._display.mask = this._SafeStr_2340;
            }
            if (this._SafeStr_2282.contains(this._SafeStr_2603)) {
                this._SafeStr_2282.removeChild(this._SafeStr_2603);
            }
        } else if (!param1 && this._SafeStr_3672) {
            this._SafeStr_3672 = false;
            if (this._SafeStr_2340 != null && this._SafeStr_2282.contains(this._SafeStr_2340)) {
                this._SafeStr_2282.removeChild(this._SafeStr_2340);
                this._display.mask = null;
            }
        }
    }

    public getSortableSpriteList(): RoomObjectSpriteData[] {
        return this._roomObjectCache.getSortableSpriteList();
    }

    public getPlaneSortableSprites(): any[] {
        return this._roomObjectCache.getPlaneSortableSprites();
    }

    public setScale(param1: number, param2: Point = null, param3: Point = null, param4: boolean = false): void {
        this.setTransform(Math.abs(param1), this._SafeStr_14782, param2, param3);
    }

    public get scale(): number {
        return this._scale;
    }

    public setFlip(param1: boolean, param2: Point = null, param3: Point = null): void {
        this.setTransform(this._scale, param1, param2, param3);
    }

    public get isFlipped(): boolean {
        return this._SafeStr_14782;
    }

    private setTransform(param1: number, param2: boolean, param3: Point, param4: Point): void {
        if (!this._SafeStr_2282 || !this._display) {
            return;
        }
        if (param3 == null) {
            param3 = new Point(this._SafeStr_3225 / 2, this._SafeStr_3189 / 2);
        }
        if (param4 == null) {
            param4 = param3;
        }
        let _loc5_: Point = new Point((param3.x - this._screenOffsetX) / this.displayScale, (param3.y - this._screenOffsetY) / this.displayScale);
        this._scale = param1;
        this._SafeStr_14782 = param2;
        this.screenOffsetX = param4.x - _loc5_.x * this.displayScale;
        this.screenOffsetY = param4.y - _loc5_.y * this.displayScale;
    }

    private get displayScale(): number {
        return this._SafeStr_14782 ? -this._scale : this._scale;
    }

    public takeScreenShot(): BitmapData {
        this._SafeStr_3521 = true;
        let _loc5_: number = this._scale;
        let _loc2_: number = this._screenOffsetX;
        let _loc1_: number = this._screenOffsetY;
        let _loc6_: string = this._display.stage.quality;
        this.setScale(1);
        this._screenOffsetX = 0;
        this._screenOffsetY = 0;
        this._display.stage.quality = "low";
        this.render(-1, true);
        let _loc3_: BitmapData = new BitmapData(this._display.width | 0, this._display.height | 0, true, 0);
        let _loc4_: Rectangle = this._display.getBounds(this._display);
        _loc3_.draw(this._display, new Matrix(1, 0, 0, 1, -_loc4_.x, -_loc4_.y));
        this._SafeStr_3521 = false;
        this.setScale(_loc5_);
        this._screenOffsetX = _loc2_;
        this._screenOffsetY = _loc1_;
        this._display.stage.quality = _loc6_;
        return _loc3_;
    }

    public skipSpriteVisibilityChecking(): void {
        this._SafeStr_3521 = true;
        this.render(-1, true);
    }

    public set fpsCounterEnabled(param1: boolean) {
        this._SafeStr_6259 = param1;
        if (!param1) {
            this._SafeStr_2603.text = "";
        }
    }

    public set pingMs(param1: number) {
        this._SafeStr_14781 = param1;
    }

    public resumeSpriteVisibilityChecking(): void {
        this._SafeStr_3521 = false;
    }

    public dispose(): void {
        this.cleanSprites(0, true);
        if (this._geometry != null) {
            this._geometry.dispose();
            this._geometry = null;
        }
        if (this._SafeStr_2340 != null) {
            this._SafeStr_2340 = null;
        }
        if (this._bitmapDataCache != null) {
            this._bitmapDataCache.dispose();
            this._bitmapDataCache = null;
        }
        if (this._roomObjectCache != null) {
            this._roomObjectCache.dispose();
            this._roomObjectCache = null;
        }
        this._container = null;
        if (this._SafeStr_2282 != null) {
            while (this._SafeStr_2282.numChildren > 0) {
                this._SafeStr_2282.removeChildAt(0);
            }
            this._SafeStr_2282 = null;
        }
        this._display = null;
        this._SafeStr_2340 = null;
        this._SafeStr_2739 = [];
        if (this._SafeStr_3202 != null) {
            this._SafeStr_3202.dispose();
            this._SafeStr_3202 = null;
        }
        let _loc1_: number = 0;
        if (this._SafeStr_3161 != null) {
            _loc1_ = 0;
            while (_loc1_ < this._SafeStr_3161.length) {
                this.cleanSprite(asInstanceOf(this._SafeStr_3161[_loc1_], ExtendedSprite), true);
                _loc1_++;
            }
            this._SafeStr_3161 = [];
        }
        if (this._eventCache != null) {
            this._eventCache.dispose();
            this._eventCache = null;
        }
        this._mouseListener = null;
        this._colorTransform = null;
        this._SafeStr_3281 = null;
    }

    public initialize(param1: number, param2: number): void {
        if (param1 < 1) {
            param1 = 1;
        }
        if (param2 < 1) {
            param2 = 1;
        }
        if (this._SafeStr_2340 != null) {
            this._SafeStr_2340.graphics.clear();
        } else {
            this._SafeStr_2340 = new Sprite();
            this._SafeStr_2340.name = "mask";
            if (this._SafeStr_3672) {
                this._SafeStr_2282.addChild(this._SafeStr_2340);
                this._display.mask = this._SafeStr_2340;
            }
        }
        this._SafeStr_2340.graphics.beginFill(0);
        this._SafeStr_2340.graphics.drawRect(0, 0, param1, param2);
        this._SafeStr_3225 = param1;
        this._SafeStr_3189 = param2;
        this._SafeStr_2603.x = param1 - (this._SafeStr_2603.width + 20);
        this._SafeStr_2603.y = param2 - (this._SafeStr_2603.height + 60);
    }

    public roomObjectRemoved(param1: string): void {
        this._roomObjectCache.removeObjectCache(param1);
    }

    public render(param1: number, param2: boolean = false): void {
        if (param1 == -1) {
            param1 = this._SafeStr_4279 + 1;
        }
        this._skipObjectUpdate = !this._skipObjectUpdate;
        let _loc6_: number = getTimer();
        if (this._container == null || this._geometry == null) {
            return;
        }
        if (param1 == this._SafeStr_4279) {
            return;
        }
        if (this._bitmapDataCache.memUsage > this._bitmapDataCache.memLimit) {
            this._bitmapDataCache.compress();
        }
        let _loc7_: number = this._container.getRoomObjectCount();
        let _loc4_: number = 0;
        let _loc5_: number = 0;
        let _loc9_: string = "";
        let _loc10_: IRoomObject = null;
        if (this._SafeStr_3225 != this._SafeStr_6409 || this._SafeStr_3189 != this._SafeStr_6946) {
            param2 = true;
        }
        if (this._display.x != this._screenOffsetX || this._display.y != this._screenOffsetY || this._display.scaleX != this.displayScale) {
            this._display.x = this._screenOffsetX;
            this._display.y = this._screenOffsetY;
            this._display.scaleX = this.displayScale;
            this._display.scaleY = this.displayScale;
            param2 = true;
        }
        _loc4_ = 0;
        while (_loc4_ < _loc7_) {
            _loc10_ = this._container.getRoomObjectWithIndex(_loc4_);
            if (_loc10_ != null) {
                _loc9_ = this._container.getRoomObjectIdWithIndex(_loc4_);
                _loc5_ += this.renderObject(_loc10_, _loc9_, param1, param2, _loc5_);
            }
            _loc4_++;
        }
        if (this._SafeStr_2739.length > 1) {
            this._SafeStr_2739.sort((a, b) => a.z - b.z);
            this._SafeStr_2739.reverse();
        }
        if (_loc5_ < this._SafeStr_2739.length) {
            this._SafeStr_2739.splice(_loc5_);
        }
        let _loc3_: SortableSprite = null;
        _loc4_ = 0;
        while (_loc4_ < _loc5_) {
            _loc3_ = asInstanceOf(this._SafeStr_2739[_loc4_], SortableSprite);
            if (_loc3_ != null) {
                this.updateSprite(_loc4_, _loc3_);
            }
            _loc4_++;
        }
        this.cleanSprites(_loc5_);
        let _loc8_: number = getTimer();
        this._SafeStr_7368 = _loc8_ - _loc6_;
        this.calculateUpdateInterval(param1);
        this._SafeStr_4279 = param1;
        this._SafeStr_6409 = this._SafeStr_3225;
        this._SafeStr_6946 = this._SafeStr_3189;
    }

    private calculateUpdateInterval(param1: number): void {
        let _loc2_: string = null;
        let _loc5_: string = null;
        let _loc4_: string = null;
        if (this._SafeStr_4279 <= 0) {
            return;
        }
        let _loc3_: number = param1 - this._SafeStr_4279;
        if (_loc3_ <= 0) {
            return;
        }
        if (_loc3_ > 60 * 3) {
            Logger.log("Really slow frame update " + _loc3_ + "ms");
            this._SafeStr_4556 = _loc3_;
        }
        this._SafeStr_3538 = this._SafeStr_3538 + 1;
        if (this._SafeStr_3538 <= 50) {
            return;
        }
        this._SafeStr_14778 = this._SafeStr_14778 + 1;
        this._SafeStr_14779 += _loc3_;
        this._SafeStr_14780 += this._SafeStr_7368;
        if (this._SafeStr_14778 < 50) {
            return;
        }
        this._averageUpdateInterval = this._SafeStr_14779 / this._SafeStr_14778;
        this._SafeStr_3855 = this._SafeStr_14780 / this._SafeStr_14778;
        this._SafeStr_14778 = 0;
        this._SafeStr_14779 = 0;
        this._SafeStr_14780 = 0;
        if (!this._runningSlow && this._averageUpdateInterval > 60) {
            this._runningSlow = true;
            Logger.log("Room canvas updating really slow - now entering frame skipping mode...");
        } else if (this._runningSlow && this._averageUpdateInterval < 50) {
            this._runningSlow = false;
            Logger.log("Room canvas updating fast again - now entering normal frame mode...");
        }
        if (this._SafeStr_6259) {
            _loc2_ = (1000 / this._averageUpdateInterval).toFixed(1);
            _loc5_ = this._SafeStr_3855 < 1 ? "<1.0" : this._SafeStr_3855.toFixed(1);
            _loc4_ = "";
            if (this._SafeStr_14781 >= 0) {
                _loc4_ += "ping: " + this._SafeStr_14781 + "ms\n";
            }
            _loc4_ += "fps: " + _loc2_ + "\n" + "frame time: " + _loc5_ + "ms";
            if (this._SafeStr_4556 > 0) {
                _loc4_ += "\nhalted " + this._SafeStr_4556 + "ms";
            }
            this._SafeStr_2603.text = _loc4_;
        }
        this._SafeStr_4556 = 0;
    }

    protected getRoomObjectCacheItem(param1: string): RoomObjectCacheItem {
        return this._roomObjectCache.getObjectCache(param1);
    }

    private renderObject(param1: IRoomObject, param2: string, param3: number, param4: boolean, param5: number): number {
        let _loc16_: number = 0;
        let _loc13_: BitmapData = null;
        let _loc8_: IRoomObjectSpriteVisualization = asGuarded(param1.getVisualization(), isIRoomObjectSpriteVisualization);
        if (_loc8_ == null) {
            this._roomObjectCache.removeObjectCache(param2);
            return 0;
        }
        let _loc9_: RoomObjectCacheItem = this.getRoomObjectCacheItem(param2);
        _loc9_.objectId = param1.getId();
        let _loc22_: RoomObjectLocationCacheItem = _loc9_.location;
        let _loc7_: RoomObjectSortableSpriteCacheItem = _loc9_.sprites;
        let _loc11_: IVector3d = _loc22_.getScreenLocation(param1, this._geometry);
        if (_loc11_ == null) {
            this._roomObjectCache.removeObjectCache(param2);
            return 0;
        }
        _loc8_.update(this._geometry, param3, !_loc7_.isEmpty || param4, this._skipObjectUpdate && this._runningSlow);
        let _loc19_: boolean = _loc22_.locationChanged;
        if (_loc19_) {
            param4 = true;
        }
        if (!_loc7_.needsUpdate(_loc8_.getInstanceId(), _loc8_.getUpdateID()) && !param4) {
            return _loc7_.spriteCount;
        }
        let _loc14_: number = _loc8_.spriteCount;
        let _loc18_: number = _loc11_.x;
        let _loc17_: number = _loc11_.y;
        let _loc15_: number = _loc11_.z;
        if (_loc18_ > 0) {
            _loc15_ += _loc18_ * 1.2e-7;
        } else {
            _loc15_ += -_loc18_ * 1.2e-7;
        }
        _loc18_ += this._SafeStr_3225 / 2 | 0;
        _loc17_ += this._SafeStr_3189 / 2 | 0;
        let _loc21_: number = 0;
        let _loc20_: SortableSprite = null;
        let _loc6_: IRoomObjectSprite = null;
        let _loc23_: number = 0;
        let _loc24_: number = 0;
        let _loc10_: number = 0;
        let _loc12_: number = 0;
        _loc16_ = 0;
        while (_loc16_ < _loc14_) {
            _loc6_ = _loc8_.getSprite(_loc16_);
            if (_loc6_ != null && _loc6_.visible) {
                _loc13_ = _loc6_.asset;
                if (_loc13_ != null) {
                    _loc10_ = this.snapSpriteCoordinate(_loc18_ + _loc6_.offsetX, this._screenOffsetX);
                    _loc12_ = this.snapSpriteCoordinate(_loc17_ + _loc6_.offsetY, this._screenOffsetY);
                    _loc23_ = _loc10_ + this._screenOffsetX;
                    _loc24_ = _loc12_ + this._screenOffsetY;
                    if (this.rectangleVisible(_loc23_, _loc24_, _loc13_.width, _loc13_.height)) {
                        _loc20_ = _loc7_.getSprite(_loc21_);
                        if (_loc20_ == null) {
                            _loc20_ = new SortableSprite();
                            _loc7_.addSprite(_loc20_);
                            this._SafeStr_2739.push(_loc20_);
                            _loc20_.name = param2;
                        }
                        _loc20_.sprite = _loc6_;
                        if (_loc6_.spriteType == RoomObjectSpriteType.AVATAR || _loc6_.spriteType == RoomObjectSpriteType._SafeStr_7153) {
                            _loc20_.sprite.libraryAssetName = param1.getAvatarLibraryAssetName();
                        }
                        _loc20_.x = _loc10_;
                        _loc20_.y = _loc12_;
                        _loc20_.z = _loc15_ + _loc6_.relativeDepth + 3.7e-11 * param5;
                        _loc21_++;
                        param5++;
                    }
                }
            }
            _loc16_++;
        }
        _loc7_.setSpriteCount(_loc21_);
        return _loc21_;
    }

    private snapSpriteCoordinate(param1: number, param2: number): number {
        if (this._scale == 0.5) {
            return param1;
        }
        return (Math.round(param2 + param1 * this.displayScale) - param2) / this.displayScale;
    }

    private rectangleVisible(param1: number, param2: number, param3: number, param4: number): boolean {
        if (this._SafeStr_3521) {
            return true;
        }
        if (this.displayScale != 1) {
            param1 = (param1 - this._screenOffsetX) * this.displayScale + this._screenOffsetX;
            param2 = (param2 - this._screenOffsetY) * this.displayScale + this._screenOffsetY;
            param3 *= this.displayScale;
            param4 *= this.displayScale;
            if (param3 < 0) {
                param1 += param3;
                param3 = -param3;
            }
            if (param4 < 0) {
                param2 += param4;
                param4 = -param4;
            }
        }
        if (param1 < this._SafeStr_3225 && param1 + param3 >= 0 && (param2 < this._SafeStr_3189 && param2 + param4 >= 0)) {
            if (!this._usesExclusionRectangles) {
                return true;
            }
            return this.rectangleVisibleWithExclusion(param1, param2, param3, param4);
        }
        return false;
    }

    private rectangleVisibleWithExclusion(param1: number, param2: number, param3: number, param4: number): boolean {
        if (param1 < 0) {
            param3 += param1;
            param1 = 0;
        }
        if (param2 < 0) {
            param4 += param2;
            param2 = 0;
        }
        if (param1 + param3 >= this._SafeStr_3225) {
            param3 -= this._SafeStr_3225 + 1 - (param1 + param3);
        }
        if (param2 + param4 >= this._SafeStr_3189) {
            param4 -= this._SafeStr_3189 + 1 - (param2 + param4);
        }
        for (const _loc5_ of this._excludedRectangles ?? []) {
            if (param1 >= _loc5_.left && param1 + param3 < _loc5_.right && param2 >= _loc5_.top && param2 + param4 < _loc5_.bottom) {
                return false;
            }
        }
        return true;
    }

    protected getSprite(param1: number): ExtendedSprite {
        if (param1 < 0 || param1 >= this._SafeStr_4090) {
            return null;
        }
        return asInstanceOf(this._display.getChildAt(param1), ExtendedSprite);
    }

    private createSprite(param1: SortableSprite, param2: number = -1): void {
        let _loc4_: ExtendedSprite = null;
        let _loc3_: IRoomObjectSprite = param1.sprite;
        if (this._SafeStr_3161.length > 0) {
            _loc4_ = asInstanceOf(this._SafeStr_3161.pop(), ExtendedSprite);
        }
        if (_loc4_ == null) {
            _loc4_ = new ExtendedSprite();
        }
        _loc4_.x = param1.x;
        _loc4_.y = param1.y;
        _loc4_.offsetRefX = _loc3_.offsetX;
        _loc4_.offsetRefY = _loc3_.offsetY;
        _loc4_.identifier = param1.name;
        _loc4_.alpha = _loc3_.alpha / 255;
        _loc4_.tag = _loc3_.tag;
        _loc4_.blendMode = _loc3_.blendMode;
        _loc4_.filters = _loc3_.filters;
        _loc4_.varyingDepth = _loc3_.varyingDepth;
        _loc4_.clickHandling = _loc3_.clickHandling;
        _loc4_.skipMouseHandling = _loc3_.skipMouseHandling;
        _loc4_.smoothing = false;
        _loc4_.pixelSnapping = "always";
        _loc4_.bitmapData = this.getBitmapData(_loc3_.asset, _loc3_.assetName, _loc3_.flipH, _loc3_.flipV, _loc3_.color);
        this.updateEnterRoomEffect(_loc4_, _loc3_, RoomEnterEffect.isVisualizationOn());
        _loc4_.alphaTolerance = _loc3_.alphaTolerance;
        if (param2 < 0 || param2 >= this._SafeStr_4090) {
            this._display.addChild(_loc4_);
            this._SafeStr_4090 = this._SafeStr_4090 + 1;
        } else {
            this._display.addChildAt(_loc4_, param2);
        }
        this._activeSpriteCount = this._activeSpriteCount + 1;
    }

    private updateSprite(param1: number, param2: SortableSprite): boolean {
        let _loc7_: boolean = false;
        let _loc5_: number = NaN;
        let _loc4_: BitmapData = null;
        if (param1 >= this._SafeStr_4090) {
            this.createSprite(param2);
            return true;
        }
        let _loc3_: IRoomObjectSprite = param2.sprite;
        let _loc6_: ExtendedSprite = this.getSprite(param1);
        if (_loc6_ != null) {
            if (_loc6_.varyingDepth != _loc3_.varyingDepth) {
                if (_loc6_.varyingDepth && !_loc3_.varyingDepth) {
                    this._display.removeChildAt(param1);
                    this._SafeStr_3161.push(_loc6_);
                    return this.updateSprite(param1, param2);
                }
                this.createSprite(param2, param1);
                return true;
            }
            _loc7_ = RoomEnterEffect.isVisualizationOn();
            if (_loc6_.needsUpdate(_loc3_.instanceId, _loc3_.updateId) || _loc7_) {
                if (_loc6_.alphaTolerance != _loc3_.alphaTolerance) {
                    _loc6_.alphaTolerance = _loc3_.alphaTolerance;
                }
                _loc5_ = _loc3_.alpha / 255;
                if (_loc6_.alpha != _loc5_) {
                    _loc6_.alpha = _loc5_;
                }
                if (_loc6_.identifier != param2.name) {
                    _loc6_.identifier = param2.name;
                }
                if (_loc6_.tag != _loc3_.tag) {
                    _loc6_.tag = _loc3_.tag;
                }
                if (_loc6_.varyingDepth != _loc3_.varyingDepth) {
                    _loc6_.varyingDepth = _loc3_.varyingDepth;
                }
                if (_loc6_.blendMode != _loc3_.blendMode) {
                    _loc6_.blendMode = _loc3_.blendMode;
                }
                if (_loc6_.clickHandling != _loc3_.clickHandling) {
                    _loc6_.clickHandling = _loc3_.clickHandling;
                }
                if (_loc6_.skipMouseHandling != _loc3_.skipMouseHandling) {
                    _loc6_.skipMouseHandling = _loc3_.skipMouseHandling;
                }
                _loc6_.filters = _loc3_.filters;
                _loc4_ = this.getBitmapData(_loc3_.asset, _loc3_.assetName, _loc3_.flipH, _loc3_.flipV, _loc3_.color);
                if (_loc6_.bitmapData != _loc4_) {
                    _loc6_.bitmapData = _loc4_;
                }
                this.updateEnterRoomEffect(_loc6_, _loc3_, _loc7_);
            }
            if (_loc6_.x != param2.x) {
                _loc6_.x = param2.x;
            }
            if (_loc6_.y != param2.y) {
                _loc6_.y = param2.y;
            }
            if (_loc6_.offsetRefX != _loc3_.offsetX) {
                _loc6_.offsetRefX = _loc3_.offsetX;
            }
            if (_loc6_.offsetRefY != _loc3_.offsetY) {
                _loc6_.offsetRefY = _loc3_.offsetY;
            }
            return true;
        }
        return false;
    }

    private updateEnterRoomEffect(param1: ExtendedSprite, param2: IRoomObjectSprite, param3: boolean): void {
        if (!param3 || param1.bitmapData == null || param2 == null) {
            return;
        }
        switch (param2.spriteType) {
            case RoomObjectSpriteType._SafeStr_7153:
                break;
            case RoomObjectSpriteType.ROOM_PLANE:
                param1.alpha = RoomEnterEffect.getDelta(0.9);
                break;
            case RoomObjectSpriteType.AVATAR:
                param1.alpha = RoomEnterEffect.getDelta(0.5);
                break;
            default:
                param1.alpha = RoomEnterEffect.getDelta(0.1);
        }
    }

    private cleanSprites(param1: number, param2: boolean = false): void {
        let _loc4_: number = 0;
        if (this._display == null) {
            return;
        }
        if (param1 < 0) {
            param1 = 0;
        }
        let _loc3_: ExtendedSprite = null;
        if (param1 < this._activeSpriteCount || this._activeSpriteCount == 0) {
            _loc4_ = this._SafeStr_4090 - 1;
            while (_loc4_ >= param1) {
                _loc3_ = this.getSprite(_loc4_);
                this.cleanSprite(_loc3_, param2);
                _loc4_--;
            }
        }
        this._activeSpriteCount = param1;
    }

    private cleanSprite(param1: ExtendedSprite, param2: boolean): void {
        if (param1 != null) {
            if (!param2) {
                param1.bitmapData = null;
            } else {
                param1.dispose();
            }
        }
    }

    private getSortableSprite(param1: number): SortableSprite {
        if (param1 < 0 || param1 >= this._SafeStr_2739.length) {
            return null;
        }
        return asInstanceOf(this._SafeStr_2739[param1], SortableSprite);
    }

    private getBitmapData(param1: BitmapData, param2: string, param3: boolean, param4: boolean, param5: number): BitmapData {
        param5 &= 16777215;
        if (!param3 && !param4 && param5 == 16777215) {
            return param1;
        }
        let _loc7_: ExtendedBitmapData = null;
        let _loc6_: string = "";
        if ((param3 || param4) && param5 != 16777215) {
            _loc6_ = param2 + " " + param5 + (param3 ? " FH" : "") + (param4 ? " FV" : "");
            if (param2.length > 0) {
                _loc7_ = this._bitmapDataCache.getBitmapData(_loc6_);
            }
            if (_loc7_ == null) {
                _loc7_ = this.getColoredBitmapData(param1, param2, param5);
                if (_loc7_ != null) {
                    _loc7_ = this.getFlippedBitmapData(_loc7_, param2, true, param3, param4);
                    if (param2.length > 0) {
                        this._bitmapDataCache.addBitmapData(_loc6_, _loc7_);
                    }
                    return _loc7_;
                }
                _loc7_ = this.getFlippedBitmapData(param1, param2, true, param3, param4);
                if (_loc7_ != null) {
                    _loc7_ = this.getColoredBitmapData(_loc7_, "", param5, true);
                    if (param2.length > 0) {
                        this._bitmapDataCache.addBitmapData(_loc6_, _loc7_);
                    }
                    return _loc7_;
                }
                _loc7_ = this.getColoredBitmapData(param1, param2, param5, true);
                _loc7_ = this.getFlippedBitmapData(_loc7_, param2, true, param3, param4);
                if (param2.length > 0) {
                    this._bitmapDataCache.addBitmapData(_loc6_, _loc7_);
                }
            }
        } else if (param3 || param4) {
            _loc7_ = this.getFlippedBitmapData(param1, param2, true, param3, param4);
        } else {
            if (param5 == 16777215) {
                return param1;
            }
            _loc7_ = this.getColoredBitmapData(param1, param2, param5, true);
        }
        return _loc7_;
    }

    private getFlippedBitmapData(param1: BitmapData, param2: string, param3: boolean = false, param4: boolean = true, param5: boolean = false): ExtendedBitmapData {
        let _loc6_: string = param2 + (param4 ? " FH" : "") + (param5 ? " FV" : "");
        let _loc7_: ExtendedBitmapData = null;
        if (param2.length > 0) {
            _loc7_ = this._bitmapDataCache.getBitmapData(_loc6_);
            if (!param3) {
                return _loc7_;
            }
        }
        if (_loc7_ == null) {
            try {
                _loc7_ = new ExtendedBitmapData(param1.width, param1.height, true, 16777215);
            } catch (e) {
                _loc7_ = new ExtendedBitmapData(1, 1, true, 16777215);
            }
            this._SafeStr_3281.identity();
            if (param4) {
                this._SafeStr_3281.scale(-1, 1);
                this._SafeStr_3281.translate(param1.width, 0);
            }
            if (param5) {
                this._SafeStr_3281.scale(1, -1);
                this._SafeStr_3281.translate(0, param1.height);
            }
            _loc7_.draw(param1, this._SafeStr_3281);
            if (param2.length > 0) {
                this._bitmapDataCache.addBitmapData(_loc6_, _loc7_);
            }
        }
        return _loc7_;
    }

    private getColoredBitmapData(param1: BitmapData, param2: string, param3: number, param4: boolean = false): ExtendedBitmapData {
        let _loc5_: number = 0;
        let _loc10_: number = 0;
        let _loc6_: number = 0;
        let _loc11_: number = NaN;
        let _loc8_: number = NaN;
        let _loc12_: number = NaN;
        let _loc7_: string = param2 + " " + param3;
        let _loc9_: ExtendedBitmapData = null;
        if (param2.length > 0) {
            _loc9_ = this._bitmapDataCache.getBitmapData(_loc7_);
            if (!param4) {
                return _loc9_;
            }
        }
        if (_loc9_ == null) {
            _loc5_ = param3 >> 16 & 0xFF;
            _loc10_ = param3 >> 8 & 0xFF;
            _loc6_ = param3 & 0xFF;
            _loc11_ = _loc5_ / 255;
            _loc8_ = _loc10_ / 255;
            _loc12_ = _loc6_ / 255;
            try {
                _loc9_ = new ExtendedBitmapData(param1.width, param1.height, true, 16777215);
                _loc9_.copyPixels(param1, param1.rect, RoomSpriteCanvas.ZERO_POINT);
            } catch (e) {
                _loc9_ = new ExtendedBitmapData(1, 1, true, 16777215);
            }
            this._colorTransform.redMultiplier = _loc11_;
            this._colorTransform.greenMultiplier = _loc8_;
            this._colorTransform.blueMultiplier = _loc12_;
            _loc9_.colorTransform(_loc9_.rect, this._colorTransform);
            if (param2.length > 0) {
                this._bitmapDataCache.addBitmapData(_loc7_, _loc9_);
            }
        }
        return _loc9_;
    }

    protected getObjectId(param1: ExtendedSprite): string {
        let _loc2_: any = null;
        if (param1 != null) {
            return param1.identifier;
        }
        return "";
    }

    public handleMouseEvent(param1: number, param2: number, param3: string, param4: boolean, param5: boolean, param6: boolean, param7: boolean): boolean {
        let _loc9_: number = param1 - this._screenOffsetX;
        let _loc8_: number = param2 - this._screenOffsetY;
        this._SafeStr_3222.x = param1;
        this._SafeStr_3222.y = param2;
        if (this._SafeStr_3911 > 0 && param3 == "mouseMove") {
            return this._mouseSpriteWasHit;
        }
        this._mouseSpriteWasHit = this.checkMouseHits(_loc9_ / this.displayScale, _loc8_ / this.displayScale, param3, param4, param5, param6, param7);
        this._SafeStr_3911 = this._SafeStr_3911 + 1;
        return this._mouseSpriteWasHit;
    }

    protected createMouseEvent(param1: number, param2: number, param3: number, param4: number, param5: string, param6: string, param7: boolean, param8: boolean, param9: boolean, param10: boolean): RoomSpriteMouseEvent {
        let _loc13_: number = param1 - this._SafeStr_3225 / 2;
        let _loc14_: number = param2 - this._SafeStr_3189 / 2;
        let _loc11_: string = "canvas_" + this._id;
        let _loc12_: RoomSpriteMouseEvent = null;
        return new RoomSpriteMouseEvent(param5, _loc11_ + "_" + this._SafeStr_5881, _loc11_, param6, _loc13_, _loc14_, param3, param4, param8, param7, param9, param10);
    }

    private checkMouseClickHits(param1: number, param2: number, param3: boolean, param4: boolean = false, param5: boolean = false, param6: boolean = false, param7: boolean = false): boolean {
        let _loc10_: string = null;
        let _loc11_: boolean = false;
        let _loc15_: string = "";
        let _loc12_: ExtendedSprite = null;
        let _loc14_: RoomSpriteMouseEvent = null;
        let _loc9_: string = "click";
        if (param3) {
            _loc9_ = "doubleClick";
        }
        let _loc13_: any[] = [];
        let _loc8_: number = 0;
        _loc8_ = this.activeSpriteCount - 1;
        while (_loc8_ >= 0) {
            _loc12_ = this.getSprite(_loc8_);
            if (_loc12_ != null && _loc12_.clickHandling) {
                if (_loc12_.hitTest(param1 - _loc12_.x, param2 - _loc12_.y)) {
                    _loc15_ = this.getObjectId(_loc12_);
                    if (_loc13_.indexOf(_loc15_) < 0) {
                        _loc10_ = _loc12_.tag;
                        _loc14_ = this.createMouseEvent(param1, param2, param1 - _loc12_.x, param2 - _loc12_.y, _loc9_, _loc10_, param4, param5, param6, param7);
                        this.bufferMouseEvent(_loc14_, _loc15_);
                        _loc13_.push(_loc15_);
                    }
                }
                _loc11_ = true;
            }
            _loc8_--;
        }
        this.processMouseEvents();
        return _loc11_;
    }

    private checkMouseHits(param1: number, param2: number, param3: string, param4: boolean = false, param5: boolean = false, param6: boolean = false, param7: boolean = false): boolean {
        let _loc12_: string = null;
        let _loc16_: string = null;
        let _loc11_: number = 0;
        let _loc13_: boolean = false;
        let _loc18_: string = "";
        let _loc14_: ExtendedSprite = null;
        let _loc17_: RoomSpriteMouseEvent = null;
        let _loc15_: any[] = [];
        let _loc8_: ObjectMouseData = null;
        let _loc10_: number = 0;
        _loc10_ = this.activeSpriteCount - 1;
        while (_loc10_ >= 0) {
            _loc14_ = asInstanceOf(this.getSprite(_loc10_), ExtendedSprite);
            if (_loc14_ != null && _loc14_.hitTestPoint(param1 - _loc14_.x, param2 - _loc14_.y)) {
                if (!_loc14_.skipMouseHandling) {
                    if (!(_loc14_.clickHandling && (param3 == "click" || param3 == "doubleClick"))) {
                        _loc18_ = this.getObjectId(_loc14_);
                        if (_loc15_.indexOf(_loc18_) < 0) {
                            _loc12_ = _loc14_.tag;
                            _loc8_ = asInstanceOf(this._SafeStr_3202.getValue(_loc18_), ObjectMouseData);
                            if (_loc8_ != null) {
                                if (_loc8_.spriteTag != _loc12_) {
                                    _loc17_ = this.createMouseEvent(0, 0, 0, 0, "rollOut", _loc8_.spriteTag, param4, param5, param6, param7);
                                    this.bufferMouseEvent(_loc17_, _loc18_);
                                }
                            }
                            if (param3 == "mouseMove" && (_loc8_ == null || _loc8_.spriteTag != _loc12_)) {
                                _loc17_ = this.createMouseEvent(param1, param2, param1 - _loc14_.x, param2 - _loc14_.y, "rollOver", _loc12_, param4, param5, param6, param7);
                            } else {
                                _loc17_ = this.createMouseEvent(param1, param2, param1 - _loc14_.x, param2 - _loc14_.y, param3, _loc12_, param4, param5, param6, param7);
                                _loc17_.spriteOffsetX = _loc14_.offsetRefX;
                                _loc17_.spriteOffsetY = _loc14_.offsetRefY;
                            }
                            if (_loc8_ == null) {
                                _loc8_ = new ObjectMouseData();
                                _loc8_.objectId = _loc18_;
                                this._SafeStr_3202.add(_loc18_, _loc8_);
                            }
                            _loc8_.spriteTag = _loc12_;
                            if (param3 != "mouseMove" || param1 != this._SafeStr_6113 || param2 != this._SafeStr_6942) {
                                this.bufferMouseEvent(_loc17_, _loc18_);
                            }
                            _loc15_.push(_loc18_);
                        }
                        _loc13_ = true;
                    }
                }
            }
            _loc10_--;
        }
        let _loc9_: any[] = this._SafeStr_3202.getKeys();
        _loc10_ = 0;
        while (_loc10_ < _loc9_.length) {
            _loc16_ = asGuarded(_loc9_[_loc10_], isString);
            _loc11_ = _loc15_.indexOf(_loc16_);
            if (_loc11_ >= 0) {
                _loc9_[_loc10_] = null;
            }
            _loc10_++;
        }
        _loc10_ = 0;
        while (_loc10_ < _loc9_.length) {
            _loc18_ = asGuarded(_loc9_[_loc10_], isString);
            if (_loc18_ != null) {
                _loc8_ = asInstanceOf(this._SafeStr_3202.remove(_loc18_), ObjectMouseData);
                if (_loc8_ != null) {
                    _loc17_ = this.createMouseEvent(0, 0, 0, 0, "rollOut", _loc8_.spriteTag, param4, param5, param6, param7);
                    this.bufferMouseEvent(_loc17_, _loc18_);
                }
            }
            _loc10_++;
        }
        this.processMouseEvents();
        this._SafeStr_6113 = param1;
        this._SafeStr_6942 = param2;
        return _loc13_;
    }

    protected bufferMouseEvent(param1: RoomSpriteMouseEvent, param2: string): void {
        if (this._eventCache != null && param1 != null) {
            this._eventCache.remove(param2);
            this._eventCache.add(param2, param1);
        }
    }

    protected processMouseEvents(): void {
        let _loc3_: number = 0;
        let _loc5_: string = null;
        let _loc4_: RoomSpriteMouseEvent = null;
        let _loc6_: IRoomObject = null;
        let _loc1_: IRoomObjectMouseHandler = null;
        if (this._container == null || this._eventCache == null) {
            return;
        }
        let _loc2_: number = this._eventCache.length | 0;
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            if (this._eventCache == null) {
                return;
            }
            _loc5_ = stringOrNull(this._eventCache.getKey(_loc3_));
            _loc4_ = this._eventCache.getWithIndex(_loc3_);
            if (_loc5_ != null && _loc4_ != null) {
                _loc6_ = this._container.getRoomObject(_loc5_);
                if (_loc6_ != null) {
                    if (this._mouseListener != null) {
                        this._mouseListener.processRoomCanvasMouseEvent(_loc4_, _loc6_, this.geometry);
                    } else {
                        _loc1_ = _loc6_.getMouseHandler();
                        if (_loc1_ != null) {
                            _loc1_.mouseEvent(_loc4_, this._geometry);
                        }
                    }
                }
            }
            _loc3_++;
        }
        if (this._eventCache) {
            this._eventCache.reset();
        }
    }

    public update(): void {
        let _loc2_: number = NaN;
        let _loc1_: number = NaN;
        if (this._SafeStr_3911 == 0) {
            _loc2_ = this._SafeStr_3222.x - this._screenOffsetX;
            _loc1_ = this._SafeStr_3222.y - this._screenOffsetY;
            this.checkMouseHits(_loc2_ / this.displayScale, _loc1_ / this.displayScale, "mouseMove");
        }
        this._SafeStr_3911 = 0;
        this._SafeStr_5881 = this._SafeStr_5881 + 1;
    }

    private clickHandler = (param1: MouseEvent): void => {
        let _loc2_: boolean = false;
        if (param1.type == "click" || param1.type == "doubleClick") {
            _loc2_ = param1.type == "doubleClick";
            this.checkMouseClickHits(param1.localX, param1.localY, _loc2_, param1.altKey, param1.ctrlKey, param1.shiftKey, param1.buttonDown);
        }
    };

    public getId(): number {
        return this._id;
    }

    /** Subclasses whose fields an ancestor constructor can observe initialise them here, first. */
    protected initInstanceFields(): void {
    }

    get [IRoomRenderingCanvas](): true {
        return true;
    }
}
