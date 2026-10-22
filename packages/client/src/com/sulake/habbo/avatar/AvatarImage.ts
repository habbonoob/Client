import { asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { valuesOf } from '@habbo-pixi/runtime/lang/iterate';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ActionDefinition } from '@/com/sulake/habbo/avatar/actions/ActionDefinition';
import type { IActionDefinition } from '@/com/sulake/habbo/avatar/actions/IActionDefinition';
import type { IActiveActionData } from '@/com/sulake/habbo/avatar/actions/IActiveActionData';
import type { AssetAliasCollection } from '@/com/sulake/habbo/avatar/alias/AssetAliasCollection';
import type { Animation } from '@/com/sulake/habbo/avatar/animation/Animation';
import type { IAnimationLayerData } from '@/com/sulake/habbo/avatar/animation/IAnimationLayerData';
import type { IAvatarDataContainer } from '@/com/sulake/habbo/avatar/animation/IAvatarDataContainer';
import type { ISpriteDataContainer } from '@/com/sulake/habbo/avatar/animation/ISpriteDataContainer';
import type { AvatarImageBodyPartContainer } from '@/com/sulake/habbo/avatar/AvatarImageBodyPartContainer';
import type { AvatarStructure } from '@/com/sulake/habbo/avatar/AvatarStructure';
import type { EffectAssetDownloadManager } from '@/com/sulake/habbo/avatar/EffectAssetDownloadManager';
import type { IAvatarEffectListener } from '@/com/sulake/habbo/avatar/IAvatarEffectListener';
import type { IAvatarFigureContainer } from '@/com/sulake/habbo/avatar/IAvatarFigureContainer';
import type { AvatarCanvas } from '@/com/sulake/habbo/avatar/structure/AvatarCanvas';
import type { IPartColor } from '@/com/sulake/habbo/avatar/structure/figure/IPartColor';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { ColorMatrixFilter } from '@habbo-pixi/runtime/filters/ColorMatrixFilter';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { ActiveActionData } from '@/com/sulake/habbo/avatar/actions/ActiveActionData';
import { AvatarFigureContainer } from '@/com/sulake/habbo/avatar/AvatarFigureContainer';
import { AvatarImageCache } from '@/com/sulake/habbo/avatar/cache/AvatarImageCache';
import { IAvatarImage } from '@/com/sulake/habbo/avatar/IAvatarImage';
import { BitmapHelper } from '@/com/sulake/habbo/utils/BitmapHelper';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class AvatarImage implements IAvatarImage, IDisposable, IAvatarEffectListener {
    static { registerClassName(this, 'com.sulake.habbo.avatar::AvatarImage'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        AvatarImage.#initStatics();
        return AvatarImage._log;
    }

    private static readonly CHANNELS_EQUAL: string = "CHANNELS_EQUAL";
    private static readonly CHANNELS_UNIQUE: string = "CHANNELS_UNIQUE";
    private static readonly CHANNELS_RED: string = "CHANNELS_RED";
    private static readonly CHANNELS_GREEN: string = "CHANNELS_GREEN";
    private static readonly CHANNELS_BLUE: string = "CHANNELS_BLUE";
    private static readonly CHANNELS_SATURATED: string = "CHANNELS_SATURATED";
    private static readonly DEFAULT_ACTION: string = "Default";
    private static readonly DEFAULT_DIR: number = 2;
    private static readonly DEFAULT_AVATAR_SET: string = "full";
    private static readonly MAX_IDLE_FRAMES: any = 8;
    private static readonly MAX_OTHER_FRAMES: any = 4;
    private static readonly DEFAULT_POINT: Point = new Point(0, 0);

    constructor(param1: AvatarStructure, param2: AssetAliasCollection, param3: AvatarFigureContainer, param4: string, param5: EffectAssetDownloadManager, param6: IAvatarEffectListener) {
        this._changes = true;
        this._SafeStr_5944 = param5;
        this._SafeStr_2176 = param1;
        this._assets = param2;
        this._scale = param4;
        this._SafeStr_5566 = param6;
        let _loc7_: boolean = false;
        if (this._scale == null) {
            this._scale = "h";
        } else if (this._scale == "h_50") {
            _loc7_ = true;
            this._scale = "sh";
        }
        if (param3 == null) {
            param3 = new AvatarFigureContainer("hr-893-45.hd-180-2.ch-210-66.lg-270-82.sh-300-91.wa-2007-.ri-1-");
            AvatarImage._log.info("Using default avatar figure");
        }
        this._figure = param3;
        this._cache = new AvatarImageCache(this._SafeStr_2176, this, this._assets, this._scale, _loc7_);
        this.setDirection("full", 2);
        this._SafeStr_2403 = [];
        this._defaultAction = new ActiveActionData("std");
        this._defaultAction.definition = this._SafeStr_2176.getDefaultActionDefinition();
        this._SafeStr_3621 = new ActiveActionData("lay");
        this._SafeStr_3621.definition = this._SafeStr_2176.getDefaultLayActionDefinition();
        this.resetActions();
        this._fullImageCache = new UtilsMap();
    }

    declare protected _SafeStr_2176: AvatarStructure;

    declare protected _scale: string;

    declare protected _SafeStr_2829: number;
    static { (this.prototype as any)._SafeStr_2829 = 0; }

    declare protected _headDirection: number;
    static { (this.prototype as any)._headDirection = 0; }

    declare protected _SafeStr_2277: IActiveActionData;

    declare protected _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    protected _SafeStr_2793: any[] = [];

    declare protected _assets: AssetAliasCollection;

    declare protected _cache: AvatarImageCache;

    declare protected _figure: AvatarFigureContainer;

    declare protected _avatarSpriteData: IAvatarDataContainer;

    protected _SafeStr_2403: any[] = [];

    declare protected _image: BitmapData;

    protected _SafeStr_3244: boolean = false;

    declare private _defaultAction: IActiveActionData;

    declare private _SafeStr_3621: IActiveActionData;

    private _frameCounter: number = 0;
    private _directionOffset: number = 0;

    declare private _changes: boolean;
    static { (this.prototype as any)._changes = false; }

    declare private _sprites: ISpriteDataContainer[];

    declare private _SafeStr_2729: boolean;
    static { (this.prototype as any)._SafeStr_2729 = false; }

    private _animationHasResetOnToggle: boolean = false;
    private _SafeStr_3285: boolean = false;

    declare private _SafeStr_2532: any[];

    declare private _lastActionsStr: string;

    declare private _currentActionsStr: string;

    declare private _fullImageCache: UtilsMap;

    declare private _useFullImageCache: boolean;
    static { (this.prototype as any)._useFullImageCache = false; }

    private _SafeStr_4123: number = -1;

    declare private _SafeStr_6143: number;
    static { (this.prototype as any)._SafeStr_6143 = 0; }

    private _SafeStr_4219: any[] = [];
    private _SafeStr_5480: number = -1;
    private _SafeStr_4799: string = null;
    private _SafeStr_5202: string = null;

    declare private _SafeStr_5944: EffectAssetDownloadManager;

    declare private _SafeStr_5566: IAvatarEffectListener;

    public get disposed(): boolean {
        return this._disposed;
    }

    public get avatarSpriteData(): IAvatarDataContainer {
        return this._avatarSpriteData;
    }

    public get animationHasResetOnToggle(): boolean {
        return this._animationHasResetOnToggle;
    }

    public get mainAction(): string {
        return this._SafeStr_2277.actionType;
    }

    public getServerRenderData(): any[] {
        this.getAvatarPartsForCamera("full");
        return this._cache.getServerRenderData();
    }

    public dispose(): void {
        if (!this._disposed) {
            this._SafeStr_2176 = null;
            this._assets = null;
            this._SafeStr_2277 = null;
            this._figure = null;
            this._avatarSpriteData = null;
            this._SafeStr_2403 = null;
            if (this._image) {
                this._image.dispose();
            }
            if (this._cache) {
                this._cache.dispose();
                this._cache = null;
            }
            if (this._fullImageCache) {
                for (const _loc1_ of valuesOf(this._fullImageCache)) {
                    _loc1_.dispose();
                }
                this._fullImageCache.dispose();
                this._fullImageCache = null;
            }
            this._image = null;
            this._SafeStr_2793 = null;
            this._disposed = true;
        }
    }

    public getFigure(): IAvatarFigureContainer {
        return this._figure;
    }

    public getScale(): string {
        return this._scale;
    }

    public getPartColor(param1: string): IPartColor {
        return this._SafeStr_2176.getPartColor(this._figure, param1);
    }

    public setDirection(param1: string, param2: number): void {
        param2 += this._directionOffset;
        if (param2 < 0) {
            param2 = 7 + (param2 + 1);
        }
        if (param2 > 7) {
            param2 -= 7 + 1;
        }
        if (this._SafeStr_2176.isMainAvatarSet(param1)) {
            this._SafeStr_2829 = param2;
        }
        if (param1 == "head" || param1 == "full") {
            if (param1 == "head" && this.isHeadTurnPreventedByAction()) {
                param2 = this._SafeStr_2829;
            }
            this._headDirection = param2;
        }
        this._cache.setDirection(param1, param2);
        this._changes = true;
    }

    public setDirectionAngle(param1: string, param2: number): void {
        let _loc3_: number = 0;
        _loc3_ = param2 / 45 | 0;
        this.setDirection(param1, _loc3_);
    }

    public getSprites(): ISpriteDataContainer[] {
        return this._sprites;
    }

    public getCanvasOffsets(): any[] {
        return this._SafeStr_2793;
    }

    public getLayerData(param1: ISpriteDataContainer): IAnimationLayerData {
        return this._SafeStr_2176.getBodyPartData(param1.animation.id, this._frameCounter, param1.id);
    }

    public updateAnimationByFrames(param1: number = 1): void {
        this._frameCounter += param1;
        this._changes = true;
    }

    public resetAnimationFrameCounter(): void {
        this._frameCounter = 0;
        this._changes = true;
    }

    public getAvatarPartsForCamera(param1: string): void {
        let _loc4_: string = null;
        let _loc2_: AvatarImageBodyPartContainer = null;
        let _loc6_: number = 0;
        if (this._SafeStr_2277 == null) {
            return;
        }
        let _loc5_: AvatarCanvas = this._SafeStr_2176.getCanvas(this._scale, this._SafeStr_2277.definition.geometryType);
        if (_loc5_ == null) {
            return;
        }
        let _loc3_: any[] = this.getBodyParts(param1, this._SafeStr_2277.definition.geometryType, this._SafeStr_2829);
        _loc6_ = _loc3_.length - 1;
        while (_loc6_ >= 0) {
            _loc4_ = stringOrNull(_loc3_[_loc6_]);
            _loc2_ = this._cache.getImageContainer(_loc4_, this._frameCounter, true);
            _loc6_--;
        }
    }

    public getImage(param1: string, param2: boolean, param3: number = 1): BitmapData {
        let _loc12_: string = null;
        let _loc4_: AvatarImageBodyPartContainer = null;
        let _loc10_: BitmapData = null;
        let _loc8_: Point = null;
        let _loc11_: number = 0;
        let _loc7_: BitmapData = null;
        if (!this._changes) {
            return this._image;
        }
        if (this._SafeStr_2277 == null) {
            return null;
        }
        if (!this._SafeStr_3285) {
            this.endActionAppends();
        }
        let _loc9_: string = this.getFullImageCacheKey();
        if (_loc9_ != null) {
            if (this.getFullImage(_loc9_)) {
                this._changes = false;
                if (param2) {
                    return (asInstanceOf(this.getFullImage(_loc9_), BitmapData)).clone();
                }
                this._image = asInstanceOf(this.getFullImage(_loc9_), BitmapData);
                this._SafeStr_3244 = true;
                return this._image;
            }
        }
        let _loc6_: AvatarCanvas = this._SafeStr_2176.getCanvas(this._scale, this._SafeStr_2277.definition.geometryType);
        if (_loc6_ == null) {
            return null;
        }
        if (this._SafeStr_3244 || this._image == null || (this._image.width != _loc6_.width || this._image.height != _loc6_.height)) {
            if (this._image != null && !this._SafeStr_3244) {
                this._image.dispose();
            }
            this._image = new BitmapData(_loc6_.width, _loc6_.height, true, 0);
            this._SafeStr_3244 = false;
        }
        let _loc5_: any[] = this.getBodyParts(param1, this._SafeStr_2277.definition.geometryType, this._SafeStr_2829);
        this._image.lock();
        this._image.fillRect(this._image.rect, 0);
        let _loc13_: boolean = true;
        _loc11_ = _loc5_.length - 1;
        while (_loc11_ >= 0) {
            _loc12_ = stringOrNull(_loc5_[_loc11_]);
            _loc4_ = this._cache.getImageContainer(_loc12_, this._frameCounter);
            if (_loc4_) {
                _loc13_ &&= _loc4_.isCacheable;
                _loc10_ = _loc4_.image;
                _loc8_ = _loc4_.regPoint.add(_loc6_.offset);
                if (_loc10_ && _loc8_) {
                    _loc8_ = _loc8_.add(_loc6_.regPoint);
                    this._image.copyPixels(_loc10_, _loc10_.rect, _loc8_, null, null, true);
                }
            }
            _loc11_--;
        }
        this._image.unlock();
        this._changes = false;
        if (this._avatarSpriteData != null) {
            if (this._avatarSpriteData.paletteIsGrayscale) {
                _loc7_ = this.convertToGrayscale(this._image);
                if (this._image) {
                    this._image.dispose();
                }
                this._image = _loc7_;
                this._image.paletteMap(this._image, this._image.rect, AvatarImage.DEFAULT_POINT, this._avatarSpriteData.reds, [], []);
            } else {
                this._image.copyChannel(this._image, this._image.rect, AvatarImage.DEFAULT_POINT, 2, 8);
            }
        }
        if (_loc9_ != null && _loc13_) {
            this.cacheFullImage(_loc9_, this._image.clone());
        }
        if (param3 != 1) {
            this._image = BitmapHelper.resampleBitmapData(this._image, param3);
        }
        if (this._image && param2) {
            return this._image.clone();
        }
        return this._image;
    }

    public getHeadRegPoints(param1: string): Point {
        let _loc2_: AvatarImageBodyPartContainer = this._cache.getImageContainer("head", this._frameCounter);
        if (_loc2_ == null) {
            return new Point(0, 0);
        }
        return new Point(_loc2_.regPoint.x, _loc2_.regPoint.y);
    }

    public getFaceOffset(param1: string): Point {
        let _loc2_: AvatarImageBodyPartContainer = this._cache.getImageContainer("head", this._frameCounter);
        if (_loc2_ == null || _loc2_.faceOffset == null) {
            return new Point(0, 0);
        }
        return new Point(_loc2_.faceOffset.x, _loc2_.faceOffset.y);
    }

    public getCroppedImage(param1: string, param2: number = 1): BitmapData {
        let _loc11_: string = null;
        let _loc3_: AvatarImageBodyPartContainer = null;
        let _loc8_: BitmapData = null;
        let _loc7_: Point = null;
        let _loc9_: number = 0;
        if (this._SafeStr_2277 == null) {
            return null;
        }
        if (!this._SafeStr_3285) {
            this.endActionAppends();
        }
        let _loc6_: AvatarCanvas = this._SafeStr_2176.getCanvas(this._scale, this._SafeStr_2277.definition.geometryType);
        if (_loc6_ == null) {
            return null;
        }
        let _loc4_: BitmapData = new BitmapData(_loc6_.width, _loc6_.height, true, 16777215);
        let _loc5_: any[] = this._SafeStr_2176.getBodyParts(param1, this._SafeStr_2277.definition.geometryType, this._SafeStr_2829);
        let _loc10_: Rectangle = null;
        let _loc13_: Rectangle = new Rectangle();
        _loc9_ = _loc5_.length - 1;
        while (_loc9_ >= 0) {
            _loc11_ = stringOrNull(_loc5_[_loc9_]);
            _loc3_ = this._cache.getImageContainer(_loc11_, this._frameCounter);
            if (_loc3_ != null) {
                _loc8_ = _loc3_.image;
                if (_loc8_ == null) {
                    _loc4_.dispose();
                    return null;
                }
                _loc7_ = _loc3_.regPoint;
                _loc4_.copyPixels(_loc8_, _loc8_.rect, _loc7_, null, null, true);
                _loc13_.x = _loc7_.x;
                _loc13_.y = _loc7_.y;
                _loc13_.width = _loc8_.width;
                _loc13_.height = _loc8_.height;
                if (_loc10_ == null) {
                    _loc10_ = _loc13_.clone();
                } else {
                    _loc10_ = _loc10_.union(_loc13_);
                }
            }
            _loc9_--;
        }
        if (_loc10_ == null) {
            _loc10_ = new Rectangle(0, 0, 1, 1);
        }
        let _loc12_: BitmapData = new BitmapData(_loc10_.width | 0, _loc10_.height | 0, true, 16777215);
        _loc12_.copyPixels(_loc4_, _loc10_, AvatarImage.DEFAULT_POINT, null, null, true);
        _loc4_.dispose();
        if (param2 != 1) {
            _loc12_ = BitmapHelper.resampleBitmapData(_loc12_, param2);
        }
        return _loc12_;
    }

    public getAsset(param1: string): BitmapDataAsset {
        return asInstanceOf(this._assets.getAssetByName(param1), BitmapDataAsset);
    }

    public getDirection(): number {
        return this._SafeStr_2829;
    }

    public initActionAppends(): void {
        this._SafeStr_2403 = [];
        this._SafeStr_3285 = false;
        this._currentActionsStr = "";
        this._useFullImageCache = false;
    }

    public endActionAppends(): void {
        let _loc1_: any = null;
        if (this.sortActions()) {
            for (_loc1_ of this._SafeStr_2532 ?? []) {
                if (_loc1_.actionType == "fx") {
                    if (!this._SafeStr_5944.isReady(parseInt(stringOrNull(_loc1_.actionParameter)) | 0)) {
                        this._SafeStr_5944.loadEffectData(parseInt(stringOrNull(_loc1_.actionParameter)) | 0, this);
                    }
                }
            }
            this.resetActions();
            this.setActionsToParts();
        }
    }

    public appendAction(param1: string, ...rest: any[]): boolean {
        let _loc3_: string = null;
        let _loc4_: ActionDefinition = null;
        this._SafeStr_3285 = false;
        if (rest != null && rest.length > 0) {
            _loc3_ = stringOrNull(rest[0]);
        }
        switch (param1) {
            case "posture":
                switch (_loc3_) {
                    case "lay":
                        if (this._SafeStr_2829 == 0) {
                            this.setDirection("full", 4);
                        } else {
                            this.setDirection("full", 2);
                        }
                    case "mv":
                    case "std":
                    case "sit":
                        this._useFullImageCache = true;
                        this.addActionData(_loc3_);
                        break;
                    case "swim":
                    case "float":
                    case "swrun":
                    case "swdiefront":
                    case "swdieback":
                    case "swpick":
                    case "swthrow":
                        this._useFullImageCache = false;
                        this.addActionData(_loc3_);
                        break;
                    default:
                        this.errorThis("appendAction() >> UNKNOWN POSTURE TYPE: " + _loc3_);
                }
                break;
            case "gest":
                switch (_loc3_) {
                    case "agr":
                    case "sad":
                    case "sml":
                    case "srp":
                        this.addActionData(_loc3_);
                        break;
                    default:
                        this.errorThis("appendAction() >> UNKNOWN GESTURE TYPE: " + _loc3_);
                }
                break;
            case "fx":
                if (_loc3_ == "33" || _loc3_ == "34" || _loc3_ == "35" || _loc3_ == "36" || _loc3_ == "38" || _loc3_ == "39") {
                    this._useFullImageCache = true;
                }
            case "dance":
            case "talk":
            case "wave":
            case "Sleep":
            case "sign":
            case "respect":
            case "blow":
            case "laugh":
            case "cry":
            case "idle":
            case "sbollie":
            case "sb360":
            case "ridejump":
                this.addActionData(param1, _loc3_);
                break;
            case "cri":
            case "usei":
                _loc4_ = this._SafeStr_2176.getActionDefinitionWithState(param1);
                if (_loc4_ != null) {
                    this.logThis("appendAction:" + [_loc3_, "->", _loc4_.getParameterValue(_loc3_)]);
                    _loc3_ = _loc4_.getParameterValue(_loc3_);
                }
                this.addActionData(param1, _loc3_);
                break;
            default:
                this.errorThis("appendAction() >> UNKNOWN ACTION TYPE: " + param1);
        }
        return true;
    }

    public isAnimating(): boolean {
        return this._SafeStr_2729 || this._SafeStr_6143 > 1;
    }

    public isPlaceholder(): boolean {
        return false;
    }

    public isBlocked(): boolean {
        return false;
    }

    public forceActionUpdate(): void {
        this._lastActionsStr = "";
    }

    public disposeInactiveActionCache(): void {
        if (this._cache) {
            this._cache.disposeInactiveActions();
        }
    }

    public avatarEffectReady(param1: number): void {
        if (param1 == this._SafeStr_4123) {
            this.resetActions();
            this.setActionsToParts();
            this._animationHasResetOnToggle = true;
            this._changes = true;
            if (this._SafeStr_5566) {
                this._SafeStr_5566.avatarEffectReady(param1);
            }
        }
    }

    public resetCache(): void {
        if (this._cache != null) {
            this._cache.reset();
        }
        if (this._fullImageCache) {
            for (const _loc1_ of valuesOf(this._fullImageCache)) {
                _loc1_.dispose();
            }
            this._fullImageCache.dispose();
            this._fullImageCache = new UtilsMap();
        }
        this._SafeStr_4219 = [];
        this._SafeStr_5480 = -1;
        this._SafeStr_4799 = null;
        this._SafeStr_5202 = null;
        this._lastActionsStr = "";
        this._SafeStr_3285 = false;
        this._changes = true;
        this._SafeStr_3244 = false;
        if (this._image) {
            this._image.dispose();
            this._image = null;
        }
        this._frameCounter = 0;
    }

    protected getFullImage(param1: string): BitmapData {
        return this._fullImageCache[param1];
    }

    protected cacheFullImage(param1: string, param2: BitmapData): void {
        if (this._fullImageCache.getValue(param1)) {
            (asInstanceOf(this._fullImageCache.getValue(param1), BitmapData)).dispose();
            this._fullImageCache.remove(param1);
        }
        this._fullImageCache[param1] = param2;
    }

    protected addActionData = (param1: string, param2: string = ""): void => {
        let _loc4_: ActiveActionData = null;
        let _loc3_: number = 0;
        if (this._SafeStr_2403 == null) {
            this._SafeStr_2403 = [];
        }
        _loc3_ = 0;
        while (_loc3_ < this._SafeStr_2403.length) {
            _loc4_ = this._SafeStr_2403[_loc3_];
            if (_loc4_.actionType == param1 && _loc4_.actionParameter == param2) {
                return;
            }
            _loc3_++;
        }
        this._SafeStr_2403.push(new ActiveActionData(param1, param2, this._frameCounter));
    };

    private getFullImageCacheKey(): string {
        let _loc2_: number = 0;
        let _loc1_: any = null;
        let _loc3_: number = 0;
        if (!this._useFullImageCache) {
            return null;
        }
        if (this._SafeStr_2532.length == 1 && this._SafeStr_2829 == this._headDirection) {
            if (this._currentActionsStr == "std" || this._currentActionsStr == "lay" || this._currentActionsStr == "sit") {
                _loc2_ = this._frameCounter % 8;
            } else {
                _loc2_ = this._frameCounter % 4;
            }
            return this._SafeStr_2829 + this._currentActionsStr + _loc2_;
        }
        if (this._SafeStr_2532.length == 2) {
            for (_loc1_ of this._SafeStr_2532 ?? []) {
                if (_loc1_.actionType == "fx" && (_loc1_.actionParameter == "33" || _loc1_.actionParameter == "34" || _loc1_.actionParameter == "35" || _loc1_.actionParameter == "36")) {
                    return this._SafeStr_2829 + this._currentActionsStr + 0;
                }
                if (_loc1_.actionType == "fx" && (_loc1_.actionParameter == "38" || _loc1_.actionParameter == "39")) {
                    _loc3_ = this._frameCounter % 11;
                    return this._SafeStr_2829 + "_" + this._headDirection + this._currentActionsStr + _loc3_;
                }
            }
        }
        return null;
    }

    private getBodyParts(param1: string, param2: string, param3: number): any[] {
        if (param3 != this._SafeStr_5480 || param2 != this._SafeStr_4799 || param1 != this._SafeStr_5202) {
            this._SafeStr_5480 = param3;
            this._SafeStr_4799 = param2;
            this._SafeStr_5202 = param1;
            this._SafeStr_4219 = this._SafeStr_2176.getBodyParts(param1, param2, param3);
        }
        return this._SafeStr_4219;
    }

    private resetActions(): boolean {
        this._animationHasResetOnToggle = false;
        this._SafeStr_2729 = false;
        this._sprites = new Array<ISpriteDataContainer>(0).fill(null);
        this._avatarSpriteData = null;
        this._directionOffset = 0;
        this._SafeStr_2176.removeDynamicItems(this);
        this._SafeStr_2277 = this._defaultAction;
        this._SafeStr_2277.definition = this._defaultAction.definition;
        this.resetBodyPartCache(this._defaultAction);
        return true;
    }

    private isHeadTurnPreventedByAction(): boolean {
        let _loc2_: IActionDefinition = null;
        let _loc1_: any = null;
        if (this._SafeStr_2532 == null) {
            return false;
        }
        for (_loc1_ of this._SafeStr_2532 ?? []) {
            _loc2_ = this._SafeStr_2176.getActionDefinitionWithState(stringOrNull(_loc1_.actionType));
            if (!(_loc1_.actionType == "Sleep" && this._SafeStr_2277 && this._SafeStr_2277.actionType != "lay")) {
                if (_loc2_ != null && _loc2_.getPreventHeadTurn(stringOrNull(_loc1_.actionParameter))) {
                    return true;
                }
            }
        }
        return false;
    }

    private sortActions(): boolean {
        let _loc5_: boolean = false;
        let _loc1_: boolean = false;
        let _loc4_: any = null;
        let _loc2_: number = 0;
        let _loc3_: boolean = false;
        this._currentActionsStr = "";
        this._SafeStr_2532 = this._SafeStr_2176.sortActions(this._SafeStr_2403);
        this._SafeStr_6143 = this._SafeStr_2176.maxFrames(this._SafeStr_2532);
        if (this._SafeStr_2532 == null) {
            this._SafeStr_2793 = [0, 0, 0];
            if (this._lastActionsStr != "") {
                _loc3_ = true;
                this._lastActionsStr = "";
            }
        } else {
            this._SafeStr_2793 = this._SafeStr_2176.getCanvasOffsets(this._SafeStr_2532, this._scale, this._SafeStr_2829);
            for (_loc4_ of this._SafeStr_2532 ?? []) {
                this._currentActionsStr += _loc4_.actionType + _loc4_.actionParameter;
                if (_loc4_.actionType == "fx") {
                    _loc2_ = parseInt(stringOrNull(_loc4_.actionParameter)) | 0;
                    if (this._SafeStr_4123 != _loc2_) {
                        _loc5_ = true;
                    }
                    this._SafeStr_4123 = _loc2_;
                    _loc1_ = true;
                }
            }
            if (!_loc1_) {
                if (this._SafeStr_4123 > -1) {
                    _loc5_ = true;
                }
                this._SafeStr_4123 = -1;
            }
            if (_loc5_) {
                this._cache.disposeInactiveActions(0);
            }
            if (this._lastActionsStr != this._currentActionsStr) {
                _loc3_ = true;
                this._lastActionsStr = this._currentActionsStr;
            }
        }
        this._SafeStr_3285 = true;
        return _loc3_;
    }

    private setActionsToParts(): void {
        let _loc2_: any = null;
        let _loc6_: Animation = null;
        let _loc1_: any[] = null;
        let _loc4_: any = null;
        let _loc5_: any = undefined;
        if (this._SafeStr_2532 == null) {
            return;
        }
        let _loc3_: number = getTimer();
        let _loc7_: any[] = [];
        for (_loc2_ of this._SafeStr_2532 ?? []) {
            _loc7_.push(_loc2_.actionType);
        }
        for (_loc2_ of this._SafeStr_2532 ?? []) {
            if (_loc2_ && _loc2_.definition && _loc2_.definition.isAnimation) {
                _loc6_ = this._SafeStr_2176.getAnimation(_loc2_.definition.state + "." + _loc2_.actionParameter);
                if (_loc6_ && _loc6_.hasOverriddenActions()) {
                    _loc1_ = _loc6_.overriddenActionNames();
                    if (_loc1_) {
                        for (_loc4_ of _loc1_ ?? []) {
                            if (_loc7_.indexOf(_loc4_) >= 0) {
                                _loc2_.overridingAction = _loc6_.overridingAction(stringOrNull(_loc4_));
                            }
                        }
                    }
                }
                if (_loc6_ && _loc6_.resetOnToggle) {
                    this._animationHasResetOnToggle = true;
                }
            }
        }
        for (_loc2_ of this._SafeStr_2532 ?? []) {
            if (!(!_loc2_ || !_loc2_.definition)) {
                if (_loc2_.definition.isAnimation && _loc2_.actionParameter == "") {
                    _loc2_.actionParameter = "1";
                }
                this.setActionToParts(_loc2_, _loc3_);
                if (_loc2_.definition.isAnimation) {
                    this._SafeStr_2729 = _loc2_.definition.isAnimated(_loc2_.actionParameter);
                    _loc6_ = this._SafeStr_2176.getAnimation(_loc2_.definition.state + "." + _loc2_.actionParameter);
                    if (_loc6_ != null) {
                        _loc5_ = _loc6_.spriteData;
                        if (_loc5_) {
                            this._sprites = this._sprites.concat(_loc5_);
                        }
                        if (_loc6_.hasDirectionData()) {
                            this._directionOffset = _loc6_.directionData.offset;
                        }
                        if (_loc6_.hasAvatarData()) {
                            this._avatarSpriteData = _loc6_.avatarData;
                        }
                    }
                }
            }
        }
    }

    private setActionToParts(param1: IActiveActionData, param2: number): void {
        if (param1 == null || param1.definition == null) {
            return;
        }
        if (param1.definition.assetPartDefinition == "") {
            return;
        }
        if (param1.definition.isMain) {
            this._SafeStr_2277 = param1;
            this._cache.setGeometryType(param1.definition.geometryType);
        }
        this._cache.setAction(param1, param2);
        this._changes = true;
    }

    private resetBodyPartCache(param1: IActiveActionData): void {
        if (param1 == null) {
            return;
        }
        if (param1.definition.assetPartDefinition == "") {
            return;
        }
        if (param1.definition.isMain) {
            this._SafeStr_2277 = param1;
            this._cache.setGeometryType(param1.definition.geometryType);
        }
        this._cache.resetBodyPartCache(param1);
        this._changes = true;
    }

    private convertToGrayscale(param1: BitmapData, param2: string = "CHANNELS_EQUAL"): BitmapData {
        let _loc5_: number = 0.33;
        let _loc8_: number = 0.33;
        let _loc6_: number = 0.33;
        let _loc4_: number = 1;
        switch (param2) {
            case "CHANNELS_UNIQUE":
                _loc5_ = 0.3;
                _loc8_ = 0.59;
                _loc6_ = 0.11;
                break;
            case "CHANNELS_RED":
                _loc5_ = 1;
                _loc8_ = 0;
                _loc6_ = 0;
                break;
            case "CHANNELS_GREEN":
                _loc5_ = 0;
                _loc8_ = 1;
                _loc6_ = 0;
                break;
            case "CHANNELS_BLUE":
                _loc5_ = 0;
                _loc8_ = 0;
                _loc6_ = 1;
                break;
            case "CHANNELS_DESATURATED":
                _loc5_ = 0.3086;
                _loc8_ = 0.6094;
                _loc6_ = 0.082;
        }
        let _loc7_: any[] = [_loc5_, _loc8_, _loc6_, 0, 0, _loc5_, _loc8_, _loc6_, 0, 0, _loc5_, _loc8_, _loc6_, 0, 0, 0, 0, 0, 1, 0];
        let _loc3_: ColorMatrixFilter = new ColorMatrixFilter(_loc7_);
        let _loc9_: BitmapData = new BitmapData(param1.width, param1.height, param1.transparent, 4294967295);
        _loc9_.copyPixels(param1, param1.rect, AvatarImage.DEFAULT_POINT, null, null, false);
        _loc9_.applyFilter(_loc9_, _loc9_.rect, AvatarImage.DEFAULT_POINT, _loc3_);
        return _loc9_;
    }

    private errorThis(param1: string): void {
    }

    private logThis(param1: string): void {
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (AvatarImage.#staticsReady) return;
        AvatarImage.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(AvatarImage, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.habbo.avatar.AvatarImage"));
    }

    get [IAvatarImage](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
