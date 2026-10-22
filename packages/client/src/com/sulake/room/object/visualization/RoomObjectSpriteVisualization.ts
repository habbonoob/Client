import { asGuarded, asInstanceOf, castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import type { IRoomObjectSprite } from '@/com/sulake/room/object/visualization/IRoomObjectSprite';
import type { IRoomObjectVisualizationData } from '@/com/sulake/room/object/visualization/IRoomObjectVisualizationData';
import type { IGraphicAssetCollection } from '@/com/sulake/room/object/visualization/utils/IGraphicAssetCollection';
import type { IRoomGeometry } from '@/com/sulake/room/utils/IRoomGeometry';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { ColorTransform } from '@habbo-pixi/runtime/geom/ColorTransform';
import { Matrix } from '@habbo-pixi/runtime/geom/Matrix';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { ArgumentError } from '@habbo-pixi/runtime/lang/ArgumentError';
import { IRoomObjectGraphicVisualization } from '@/com/sulake/room/object/visualization/IRoomObjectGraphicVisualization';
import { isIRoomObjectSprite } from '@/com/sulake/room/object/visualization/IRoomObjectSprite';
import { IRoomObjectSpriteVisualization } from '@/com/sulake/room/object/visualization/IRoomObjectSpriteVisualization';
import { RoomObjectSprite } from '@/com/sulake/room/object/visualization/RoomObjectSprite';
import { ColorConverter } from '@/com/sulake/room/utils/ColorConverter';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class RoomObjectSpriteVisualization implements IRoomObjectSpriteVisualization {
    static { registerClassName(this, 'com.sulake.room.object.visualization::RoomObjectSpriteVisualization'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        RoomObjectSpriteVisualization.#initStatics();
        return RoomObjectSpriteVisualization._log;
    }

    protected static readonly _SafeStr_8295: string = "_";
    protected static readonly ICON_LAYER_ID: string = "_icon_";
    private static _SafeStr_6645: number = 0;

    constructor() {
        this.initInstanceFields();
        this._instanceId = RoomObjectSpriteVisualization._SafeStr_6645++;
        this._sprites = [];
        this._object = null;
        this._assetCollection = null;
    }

    protected _SafeStr_3623: number = -1;
    protected _SafeStr_2366: number = -1;
    protected _SafeStr_2292: number = -1;

    declare private _sprites: any[];

    declare private _object: IRoomObject;

    declare private _assetCollection: IGraphicAssetCollection;

    private _instanceId: number = 0;
    private _SafeStr_2155: number = 0;

    public get assetCollection(): IGraphicAssetCollection {
        return this._assetCollection;
    }

    public set assetCollection(param1: IGraphicAssetCollection) {
        if (this._assetCollection != null) {
            this._assetCollection.removeReference();
        }
        this._assetCollection = param1;
        if (this._assetCollection != null) {
            this._assetCollection.addReference();
        }
    }

    public get spriteCount(): number {
        return this._sprites.length | 0;
    }

    public get object(): IRoomObject {
        return this._object;
    }

    public set object(param1: IRoomObject) {
        this._object = param1;
    }

    public get image(): BitmapData {
        return this.getImage(0, -1);
    }

    public get boundingRectangle(): Rectangle {
        let _loc7_: number = 0;
        let _loc4_: number = 0;
        let _loc3_: number = 0;
        let _loc6_: number = this.spriteCount;
        let _loc1_: IRoomObjectSprite = null;
        let _loc5_: Rectangle = new Rectangle();
        let _loc2_: BitmapData = null;
        _loc7_ = 0;
        while (_loc7_ < _loc6_) {
            _loc1_ = this.getSprite(_loc7_);
            if (_loc1_ != null && _loc1_.visible) {
                _loc2_ = _loc1_.asset;
                if (_loc2_ != null) {
                    _loc4_ = _loc1_.offsetX;
                    _loc3_ = _loc1_.offsetY;
                    if (_loc7_ == 0) {
                        _loc5_.left = _loc4_;
                        _loc5_.top = _loc3_;
                        _loc5_.right = _loc4_ + _loc1_.width;
                        _loc5_.bottom = _loc3_ + _loc1_.height;
                    } else {
                        if (_loc4_ < _loc5_.left) {
                            _loc5_.left = _loc4_;
                        }
                        if (_loc3_ < _loc5_.top) {
                            _loc5_.top = _loc3_;
                        }
                        if (_loc4_ + _loc1_.width > _loc5_.right) {
                            _loc5_.right = _loc4_ + _loc1_.width;
                        }
                        if (_loc3_ + _loc1_.height > _loc5_.bottom) {
                            _loc5_.bottom = _loc3_ + _loc1_.height;
                        }
                    }
                }
            }
            _loc7_++;
        }
        return _loc5_;
    }

    public dispose(): void {
        if (this._sprites != null) {
            for (const _loc1_ of this._sprites ?? []) {
                _loc1_.dispose();
            }
            this._sprites = null;
        }
        this._object = null;
        this.assetCollection = null;
    }

    public setExternalBaseUrls(param1: string, param2: string, param3: boolean): void {
    }

    public getUpdateID(): number {
        return this._SafeStr_2155;
    }

    public getInstanceId(): number {
        return this._instanceId;
    }

    public addSprite(): IRoomObjectSprite {
        return this.addSpriteAt(this._sprites.length | 0);
    }

    public addSpriteAt(param1: number): IRoomObjectSprite {
        let _loc2_: IRoomObjectSprite = new RoomObjectSprite();
        if (param1 >= this._sprites.length) {
            this._sprites.push(_loc2_);
        } else {
            this._sprites.splice(param1, 0, _loc2_);
        }
        return _loc2_;
    }

    public removeSprite(param1: IRoomObjectSprite): void {
        let _loc2_: number = this._sprites.indexOf(param1);
        if (_loc2_ == -1) {
            throw new Error("Trying to remove non-existing sprite!");
        }
        this._sprites.splice(_loc2_, 1);
        castTo(param1, RoomObjectSprite).dispose();
    }

    public getSprite(param1: number): IRoomObjectSprite {
        if (param1 >= 0 && param1 < this._sprites.length) {
            return this._sprites[param1];
        }
        return null;
    }

    public update(param1: IRoomGeometry, param2: number, param3: boolean, param4: boolean): void {
    }

    public getSpriteList(): any[] {
        return null;
    }

    public initialize(param1: IRoomObjectVisualizationData): boolean {
        return false;
    }

    public getImage(param1: number, param2: number): BitmapData {
        let _loc16_: number = NaN;
        let _loc6_: number = 0;
        let _loc15_: any = 0;
        let _loc9_: any = 0;
        let _loc4_: any = 0;
        let _loc7_: number = NaN;
        let _loc14_: number = NaN;
        let _loc17_: number = NaN;
        let _loc8_: Rectangle = this.boundingRectangle;
        if (_loc8_.width * _loc8_.height == 0) {
            return null;
        }
        let _loc10_: number = this.spriteCount;
        let _loc3_: IRoomObjectSprite = null;
        let _loc12_: any[] = [];
        let _loc11_: number = 0;
        let _loc5_: BitmapData = null;
        _loc11_ = 0;
        while (_loc11_ < _loc10_) {
            _loc3_ = this.getSprite(_loc11_);
            if (_loc3_ != null && _loc3_.visible) {
                _loc5_ = _loc3_.asset;
                if (_loc5_ != null) {
                    _loc12_.push(_loc3_);
                }
            }
            _loc11_++;
        }
        if (_loc12_.length > 1) {
            _loc12_.sort((a, b) => a.relativeDepth - b.relativeDepth);
            _loc12_.reverse();
        }
        let _loc18_: BitmapData = null;
        try {
            _loc18_ = new BitmapData(_loc8_.width | 0, _loc8_.height | 0, true, param1 >>> 0);
        } catch ($e) {
            if ($e instanceof ArgumentError) {
                let e: ArgumentError = $e;
                RoomObjectSpriteVisualization._log.warn("Unable to create BitmapData object! " + e);
            } else {
                throw $e;
            }
        }
        if (!_loc18_) {
            return new BitmapData(1, 1, true);
        }
        let _loc13_: Matrix = new Matrix();
        let _loc20_: ColorTransform = new ColorTransform();
        let _loc19_: any = null;
        _loc11_ = 0;
        while (_loc11_ < _loc12_.length) {
            _loc3_ = asGuarded(_loc12_[_loc11_], isIRoomObjectSprite);
            _loc5_ = _loc3_.asset;
            if (_loc5_ != null) {
                _loc6_ = _loc3_.color;
                _loc15_ = _loc6_ >> 16;
                _loc9_ = _loc6_ >> 8 & 0xFF;
                _loc4_ = _loc6_ & 0xFF;
                _loc19_ = null;
                if (_loc15_ < 255 || _loc9_ < 255 || _loc4_ < 255) {
                    _loc7_ = this.normalizeColourComponent(_loc15_ | 0);
                    _loc14_ = this.normalizeColourComponent(_loc9_ | 0);
                    _loc17_ = this.normalizeColourComponent(_loc4_ | 0);
                    _loc16_ = this.normalizeColourComponent(_loc3_.alpha);
                    _loc20_.redMultiplier = _loc7_;
                    _loc20_.greenMultiplier = _loc14_;
                    _loc20_.blueMultiplier = _loc17_;
                    _loc20_.alphaMultiplier = _loc16_;
                    _loc19_ = _loc20_;
                } else if (_loc3_.alpha < 255) {
                    _loc16_ = this.normalizeColourComponent(_loc3_.alpha);
                    _loc20_.redMultiplier = 1;
                    _loc20_.greenMultiplier = 1;
                    _loc20_.blueMultiplier = 1;
                    _loc20_.alphaMultiplier = _loc16_;
                    _loc19_ = _loc20_;
                }
                if (param1 == 0 && _loc3_.blendMode == "add") {
                    _loc5_ = this.extractDarknessToAlpha(_loc5_);
                }
                _loc13_.identity();
                if (_loc3_.flipH) {
                    _loc13_.scale(-1, 1);
                    _loc13_.translate(_loc5_.width, 0);
                }
                if (_loc3_.flipV) {
                    _loc13_.scale(1, -1);
                    _loc13_.translate(0, _loc5_.height);
                }
                _loc13_.translate(_loc3_.offsetX - _loc8_.left, _loc3_.offsetY - _loc8_.top);
                _loc18_.draw(_loc5_, _loc13_, _loc19_, _loc3_.blendMode, null, false);
            }
            _loc11_++;
        }
        return _loc18_;
    }

    protected createSprites(param1: number): void {
        let _loc2_: RoomObjectSprite = null;
        while (this._sprites.length > param1) {
            _loc2_ = asInstanceOf(this._sprites[this._sprites.length - 1], RoomObjectSprite);
            if (_loc2_ != null) {
                _loc2_.dispose();
            }
            this._sprites.pop();
        }
        while (this._sprites.length < param1) {
            _loc2_ = new RoomObjectSprite();
            this._sprites.push(_loc2_);
        }
    }

    protected clearSprites(): void {
        if (this._sprites.length > 0) {
            for (const _loc1_ of this._sprites ?? []) {
                _loc1_.dispose();
            }
            this._sprites = [];
        }
    }

    protected increaseUpdateId(): void {
        this._SafeStr_2155 = this._SafeStr_2155 + 1;
    }

    protected reset(): void {
        this._SafeStr_3623 = 4294967295 | 0;
        this._SafeStr_2366 = 4294967295 | 0;
        this._SafeStr_2292 = -1;
    }

    private normalizeColourComponent(param1: number): number {
        return Math.max(0, Math.min(255, param1)) / 255;
    }

    private extractDarknessToAlpha(param1: BitmapData): BitmapData {
        let _loc8_: number = 0;
        let _loc3_: any = 0;
        let _loc4_: any = 0;
        let _loc11_: any = 0;
        let _loc6_: any = 0;
        let _loc5_: any = 0;
        let _loc9_: any = 0;
        let _loc2_: number = 0;
        let _loc10_: number = NaN;
        let _loc7_: number = NaN;
        let _loc13_: number = NaN;
        let _loc14_: BitmapData = new BitmapData(param1.width, param1.height, true);
        let _loc12_: number[] = param1.getVector(param1.rect);
        _loc8_ = 0;
        while (_loc8_ < _loc12_.length) {
            _loc3_ = _loc12_[_loc8_];
            _loc4_ = (_loc3_ >> 24 & 0xFF) >>> 0;
            _loc11_ = (_loc3_ >> 16 & 0xFF) >>> 0;
            _loc6_ = (_loc3_ >> 8 & 0xFF) >>> 0;
            _loc5_ = (_loc3_ & 0xFF) >>> 0;
            _loc9_ = _loc11_ << 16 | _loc6_ << 8 | _loc5_;
            _loc2_ = ColorConverter.rgbToHSL(_loc9_ >>> 0) | 0;
            _loc10_ = _loc2_ & 0xFF;
            if (_loc10_ <= 128) {
                _loc7_ = _loc2_ >> 16 & 0xFF;
                _loc13_ = _loc2_ >> 8 & 0xFF;
                _loc4_ *= _loc10_ / 128;
                _loc10_ = 128;
                _loc2_ = (_loc7_ << 16) + (_loc13_ << 8) + _loc10_ | 0;
                _loc9_ = ColorConverter.hslToRGB(_loc2_ >>> 0) | 0;
                _loc3_ = (_loc4_ << 24 | _loc9_) >>> 0;
            }
            _loc12_[_loc8_] = _loc3_ >>> 0;
            _loc8_++;
        }
        _loc14_.setVector(_loc14_.rect, _loc12_);
        return _loc14_;
    }

    /** Subclasses whose fields an ancestor constructor can observe initialise them here, first. */
    protected initInstanceFields(): void {
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (RoomObjectSpriteVisualization.#staticsReady) return;
        RoomObjectSpriteVisualization.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(RoomObjectSpriteVisualization, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.room.object.visualization.RoomObjectSpriteVisualization"));
    }

    get [IRoomObjectSpriteVisualization](): true {
        return true;
    }

    get [IRoomObjectGraphicVisualization](): true {
        return true;
    }
}
