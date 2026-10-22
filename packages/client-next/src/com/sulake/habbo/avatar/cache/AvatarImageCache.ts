import { asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { valuesOf } from '@habbo-pixi/runtime/lang/iterate';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IActiveActionData } from '@/com/sulake/habbo/avatar/actions/IActiveActionData';
import type { AssetAliasCollection } from '@/com/sulake/habbo/avatar/alias/AssetAliasCollection';
import type { Animation } from '@/com/sulake/habbo/avatar/animation/Animation';
import type { AnimationLayerData } from '@/com/sulake/habbo/avatar/animation/AnimationLayerData';
import type { AvatarStructure } from '@/com/sulake/habbo/avatar/AvatarStructure';
import type { IAvatarImage } from '@/com/sulake/habbo/avatar/IAvatarImage';
import type { AnimationFrame } from '@/com/sulake/habbo/avatar/structure/animation/AnimationFrame';
import type { AvatarCanvas } from '@/com/sulake/habbo/avatar/structure/AvatarCanvas';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { ColorTransform } from '@habbo-pixi/runtime/geom/ColorTransform';
import { Matrix } from '@habbo-pixi/runtime/geom/Matrix';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { AvatarImageBodyPartContainer } from '@/com/sulake/habbo/avatar/AvatarImageBodyPartContainer';
import { AvatarImagePartContainer } from '@/com/sulake/habbo/avatar/AvatarImagePartContainer';
import { AvatarImageActionCache } from '@/com/sulake/habbo/avatar/cache/AvatarImageActionCache';
import { AvatarImageBodyPartCache } from '@/com/sulake/habbo/avatar/cache/AvatarImageBodyPartCache';
import { AvatarImageDirectionCache } from '@/com/sulake/habbo/avatar/cache/AvatarImageDirectionCache';
import { ImageData } from '@/com/sulake/habbo/avatar/cache/ImageData';
import { AvatarDirectionAngle } from '@/com/sulake/habbo/avatar/enum/AvatarDirectionAngle';
import { BitmapHelper } from '@/com/sulake/habbo/utils/BitmapHelper';
import { StringBuffer } from '@/com/sulake/habbo/utils/StringBuffer';
import { RoomObjectSpriteData } from '@/com/sulake/room/data/RoomObjectSpriteData';

export class AvatarImageCache {
    static { registerClassName(this, 'com.sulake.habbo.avatar.cache::AvatarImageCache'); }

    private static readonly DEFAULT_MAX_CACHE_STORAGE_TIME_MS: number = 60000;
    private static readonly _SafeStr_8295: string = "_";
    private static readonly DEF_SEPARATOR: string = ".";
    private static readonly BASE_ACTION: string = "std";
    private static readonly LAY_BASE_ACTION: string = "lay";
    private static readonly PART_FACE: string = "fc";
    private static readonly PART_EYES: string = "ey";
    private static readonly PART_RIGHT_ITEM: string = "ri";
    private static readonly ACTION_WAVE: string = "wav";
    private static readonly ACTION_DRINK: string = "drk";
    private static readonly ACTION_BLOW: string = "blw";
    private static readonly ACTION_SIGN: string = "sig";
    private static readonly ACTION_RESPECT: string = "respect";
    private static _SafeStr_3561: StringBuffer;
    private static _partNameArray: any[];
    private static _SafeStr_2979: any[];

    declare private _SafeStr_2176: AvatarStructure;

    declare private _avatar: IAvatarImage;

    declare private _assets: AssetAliasCollection;

    declare private _scale: string;

    declare private _cache: UtilsMap;

    declare private _canvas: AvatarCanvas;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    declare private _geometryType: string;

    declare private _unionImages: any[];

    declare private _colorTransform: ColorTransform;

    declare private _SafeStr_2189: Matrix;

    declare private _SafeStr_4009: any[];

    private _largeScaledSmall: boolean = false;
    private _SafeStr_4215: string = "std";

    declare private _cachedPartName: string;

    declare private _cachedAsset: BitmapDataAsset;

    constructor(param1: AvatarStructure, param2: IAvatarImage, param3: AssetAliasCollection, param4: string, param5: boolean) {
        let _loc6_: number = 0;
        this._unionImages = [];
        this._colorTransform = new ColorTransform();
        this._SafeStr_2189 = new Matrix();
        this._SafeStr_4009 = [];
        this._SafeStr_2176 = param1;
        this._avatar = param2;
        this._assets = param3;
        this._scale = param4;
        this._cache = new UtilsMap();
        this._largeScaledSmall = param5;
        if (!AvatarImageCache._SafeStr_3561) {
            AvatarImageCache._SafeStr_3561 = new StringBuffer();
        }
        if (!AvatarImageCache._partNameArray) {
            AvatarImageCache._partNameArray = [null, "_", null, "_", null, "_", null, "_", null, "_", null];
        }
        if (!AvatarImageCache._SafeStr_2979) {
            AvatarImageCache._SafeStr_2979 = [];
            _loc6_ = 0;
            while (_loc6_ < 10000) {
                AvatarImageCache._SafeStr_2979.push(_loc6_.toString());
                _loc6_++;
            }
        }
    }

    private static convertColorToHex(param1: number): string {
        let _loc2_: string = (param1 * 255).toString(16);
        if (_loc2_.length < 2) {
            _loc2_ = "0" + _loc2_;
        }
        return _loc2_;
    }

    public dispose(): void {
        let _loc2_: AvatarImageBodyPartCache = null;
        let _loc1_: any[] = null;
        let _loc3_: any = null;
        if (this._disposed) {
            return;
        }
        this._SafeStr_2176 = null;
        this._avatar = null;
        this._assets = null;
        if (this._cache != null) {
            _loc1_ = this._cache.getKeys();
            for (_loc3_ of _loc1_ ?? []) {
                _loc2_ = asInstanceOf(this._cache.getValue(_loc3_), AvatarImageBodyPartCache);
                if (_loc2_ != null) {
                    _loc2_.dispose();
                }
            }
            this._cache.dispose();
            this._cache = null;
        }
        this._canvas = null;
        this._disposed = true;
    }

    public reset(): void {
        let _loc2_: AvatarImageBodyPartCache = null;
        let _loc1_: any[] = null;
        if (this._cache != null) {
            _loc1_ = this._cache.getKeys();
            for (const _loc3_ of _loc1_ ?? []) {
                _loc2_ = asInstanceOf(this._cache.getValue(_loc3_), AvatarImageBodyPartCache);
                if (_loc2_ != null) {
                    _loc2_.dispose();
                }
            }
            this._cache.reset();
        }
        this._canvas = null;
        this._SafeStr_4215 = "std";
    }

    public disposeInactiveActions(param1: number = 60000): void {
        let _loc4_: AvatarImageBodyPartCache = null;
        let _loc5_: any = null;
        let _loc3_: number = getTimer();
        let _loc2_: any[] = this._cache.getKeys();
        for (_loc5_ of _loc2_ ?? []) {
            _loc4_ = asInstanceOf(this._cache.getValue(_loc5_), AvatarImageBodyPartCache);
            if (_loc4_ != null) {
                _loc4_.disposeActions(param1, _loc3_);
            }
        }
    }

    public resetBodyPartCache(param1: IActiveActionData): void {
        let _loc2_: any = null;
        for (_loc2_ of valuesOf(this._cache)) {
            if (_loc2_ != null) {
                _loc2_.setAction(param1, 0);
            }
        }
    }

    public setDirection(param1: string, param2: number): void {
        let _loc5_: AvatarImageBodyPartCache = null;
        let _loc3_: any[] = this._SafeStr_2176.getBodyPartsUnordered(param1);
        for (const _loc4_ of _loc3_ ?? []) {
            _loc5_ = this.getBodyPartCache(stringOrNull(_loc4_));
            if (_loc5_ != null) {
                _loc5_.setDirection(param2);
            }
        }
    }

    public setAction(param1: IActiveActionData, param2: number): void {
        let _loc4_: any = null;
        let _loc5_: AvatarImageBodyPartCache = null;
        let _loc3_: any[] = this._SafeStr_2176.getActiveBodyPartIds(param1, this._avatar);
        for (_loc4_ of _loc3_ ?? []) {
            _loc5_ = this.getBodyPartCache(stringOrNull(_loc4_));
            if (_loc5_ != null) {
                _loc5_.setAction(param1, param2);
            }
        }
    }

    public setGeometryType(param1: string): void {
        if (this._geometryType == param1) {
            return;
        }
        if (this._geometryType == "sitting" && param1 == "vertical" || this._geometryType == "vertical" && param1 == "sitting" || (this._geometryType == "swhorizontal" || param1 == "swhorizontal")) {
            this._geometryType = param1;
            this._canvas = null;
            this._SafeStr_4215 = this.getDefaultActionFromGeometryType(this._geometryType);
            return;
        }
        this.disposeInactiveActions(0);
        this._geometryType = param1;
        this._canvas = null;
        this._SafeStr_4215 = this.getDefaultActionFromGeometryType(this._geometryType);
    }

    public getImageContainer(param1: string, param2: number, param3: boolean = false): AvatarImageBodyPartContainer {
        let _loc7_: number = 0;
        let _loc14_: Animation = null;
        let _loc17_: number = 0;
        let _loc13_: AnimationLayerData = null;
        let _loc20_: any = undefined;
        let _loc18_: any = undefined;
        let _loc10_: AvatarImageBodyPartCache = this.getBodyPartCache(param1);
        if (_loc10_ == null) {
            _loc10_ = new AvatarImageBodyPartCache();
            this._cache.add(param1, _loc10_);
        }
        let _loc11_: number = _loc10_.getDirection();
        let _loc9_: number = param2;
        let _loc15_: IActiveActionData = _loc10_.getAction();
        if (_loc15_ && _loc15_.definition.startFromFrameZero) {
            _loc9_ -= _loc15_.startFrame;
        }
        let _loc8_: IActiveActionData = _loc15_;
        let _loc4_: any[] = [];
        let _loc16_: UtilsMap = new UtilsMap();
        let _loc12_: Point = new Point();
        if (!_loc15_ || !_loc15_.definition) {
            this.debugInfo("Action not found!");
            return null;
        }
        if (_loc15_.definition.isAnimation) {
            _loc7_ = _loc11_;
            _loc14_ = this._SafeStr_2176.getAnimation(_loc15_.definition.state + "." + _loc15_.actionParameter);
            _loc17_ = param2 - _loc15_.startFrame;
            if (_loc14_ != null) {
                _loc13_ = _loc14_.getLayerData(_loc17_, param1, _loc15_.overridingAction);
                if (_loc13_ != null) {
                    _loc7_ = _loc11_ + _loc13_.directionOffset;
                    if (_loc13_.directionOffset < 0) {
                        if (_loc7_ < 0) {
                            _loc7_ = 8 + _loc7_;
                        } else if (_loc7_ > 7) {
                            _loc7_ = 8 - _loc7_;
                        }
                    } else if (_loc7_ < 0) {
                        _loc7_ += 8;
                    } else if (_loc7_ > 7) {
                        _loc7_ -= 8;
                    }
                    if (this._scale == "h") {
                        _loc12_.x = _loc13_.dx;
                        _loc12_.y = _loc13_.dy;
                    } else {
                        _loc12_.x = _loc13_.dx / 2;
                        _loc12_.y = _loc13_.dy / 2;
                    }
                    _loc9_ = _loc13_.animationFrame;
                    if (_loc13_.action != null) {
                        _loc15_ = _loc13_.action;
                    }
                    if (_loc13_.type == "bodypart") {
                        if (_loc13_.action != null) {
                            _loc8_ = _loc13_.action;
                        }
                        _loc11_ = _loc7_;
                    } else if (_loc13_.type == "fx") {
                        _loc11_ = _loc7_;
                    }
                    _loc16_ = _loc13_.items;
                }
                _loc4_ = _loc14_.removeData;
            }
        }
        let _loc19_: AvatarImageActionCache = _loc10_.getActionCache(_loc8_);
        if (_loc19_ == null || param3) {
            this.debugInfo("[CacheMiss (bodyPartCache.getActionCache)] [AvatarImageCache.getImageContainer] action.id: " + [param1, _loc8_.id]);
            _loc19_ = new AvatarImageActionCache();
            _loc10_.updateActionCache(_loc8_, _loc19_);
        }
        let _loc5_: AvatarImageDirectionCache = _loc19_.getDirectionCache(_loc11_);
        if (_loc5_ == null || param3) {
            this.debugInfo("[CacheMiss (actionCache.getDirectionCache)] [AvatarImageCache.getImageContainer] direction: " + [param1, _loc11_]);
            _loc20_ = this._SafeStr_2176.getParts(param1, this._avatar.getFigure(), _loc8_, this._geometryType, _loc11_, _loc4_, this._avatar, _loc16_);
            if (!_loc20_) {
                return null;
            }
            _loc5_ = new AvatarImageDirectionCache(_loc20_);
            _loc19_.updateDirectionCache(_loc11_, _loc5_);
        }
        let _loc6_: AvatarImageBodyPartContainer = _loc5_.getImageContainer(_loc9_);
        if (_loc6_ == null || param3) {
            _loc18_ = _loc5_.getPartList();
            _loc6_ = this.renderBodyPart(_loc11_, _loc18_, _loc9_, _loc15_, param3);
            if (!(_loc6_ != null && !param3)) {
                return null;
            }
            if (_loc6_.isCacheable) {
                _loc5_.updateImageContainer(_loc6_, _loc9_);
            }
        }
        _loc6_.offset = _loc12_.add(this._SafeStr_2176.getFrameBodyPartOffset(_loc8_, _loc11_, _loc9_, param1));
        return _loc6_;
    }

    public getServerRenderData(): any[] {
        let _loc1_: any[] = this._SafeStr_4009;
        this._SafeStr_4009 = [];
        return _loc1_;
    }

    public getBodyPartCache(param1: string): AvatarImageBodyPartCache {
        let _loc2_: AvatarImageBodyPartCache = asInstanceOf(this._cache.getValue(param1), AvatarImageBodyPartCache);
        if (_loc2_ == null) {
            _loc2_ = new AvatarImageBodyPartCache();
            this._cache.add(param1, _loc2_);
        }
        return _loc2_;
    }

    private renderBodyPart(param1: number, param2: AvatarImagePartContainer[], param3: number, param4: IActiveActionData, param5: boolean = false): AvatarImageBodyPartContainer {
        let _loc12_: boolean = false;
        let _loc25_: number = 0;
        let _loc8_: AvatarImagePartContainer = null;
        let _loc18_: string = null;
        let _loc6_: string = null;
        let _loc15_: AnimationFrame = null;
        let _loc27_: number = 0;
        let _loc31_: BitmapDataAsset = null;
        let _loc10_: string = null;
        let _loc30_: BitmapData = null;
        let _loc21_: boolean = false;
        let _loc17_: ColorTransform = null;
        let _loc19_: Point = null;
        let _loc11_: ColorTransform = null;
        let _loc28_: RoomObjectSpriteData = null;
        let _loc9_: ImageData = null;
        if (param2 == null) {
            return null;
        }
        if (param2.length == 0) {
            return null;
        }
        if (!this.ensureCanvas()) {
            return null;
        }
        let _loc24_: number = param1;
        let _loc26_: boolean = Boolean(AvatarDirectionAngle._SafeStr_7019[param1]);
        let _loc32_: string = param4.definition.assetPartDefinition;
        let _loc13_: boolean = true;
        let _loc23_: Point = null;
        let _loc20_: number = 0;
        _loc25_ = _loc20_ = param2.length - 1;
        while (_loc25_ >= 0) {
            _loc8_ = asInstanceOf(param2[_loc25_], AvatarImagePartContainer);
            if (!(param1 == 7 && (_loc8_.partType == "fc" || _loc8_.partType == "ey"))) {
                if (!(_loc8_.partType == "ri" && _loc8_.partId == null)) {
                    _loc18_ = _loc8_.partType;
                    _loc6_ = _loc8_.partId;
                    _loc15_ = _loc8_.getFrameDefinition(param3);
                    if (_loc15_) {
                        _loc27_ = _loc15_.number;
                        if (_loc15_.assetPartDefinition && _loc15_.assetPartDefinition.length > 0) {
                            _loc32_ = _loc15_.assetPartDefinition;
                        }
                    } else {
                        _loc27_ = _loc8_.getFrameIndex(param3);
                    }
                    _loc24_ = param1;
                    _loc12_ = false;
                    if (_loc26_) {
                        if (_loc32_ == "wav" && (_loc18_ == "lh" || _loc18_ == "ls" || _loc18_ == "lc" || _loc18_ == "mcl")) {
                            _loc12_ = true;
                        } else if (_loc32_ == "drk" && (_loc18_ == "rh" || _loc18_ == "rs" || _loc18_ == "rc" || _loc18_ == "mcr")) {
                            _loc12_ = true;
                        } else if (_loc32_ == "blw" && _loc18_ == "rh") {
                            _loc12_ = true;
                        } else if (_loc32_ == "sig" && _loc18_ == "lh") {
                            _loc12_ = true;
                        } else if (_loc32_ == "respect" && _loc18_ == "lh") {
                            _loc12_ = true;
                        } else if (_loc18_ == "ri") {
                            _loc12_ = true;
                        } else if (_loc18_ == "li") {
                            _loc12_ = true;
                        } else if (_loc18_ == "cp") {
                            _loc12_ = true;
                        } else {
                            if (param1 == 4) {
                                _loc24_ = 2;
                            } else if (param1 == 5) {
                                _loc24_ = 1;
                            } else if (param1 == 6) {
                                _loc24_ = 0;
                            }
                            if (_loc8_.flippedPartType != _loc18_) {
                                _loc18_ = _loc8_.flippedPartType;
                            }
                        }
                    }
                    AvatarImageCache._SafeStr_3561.length = 0;
                    AvatarImageCache._partNameArray[0] = this._largeScaledSmall ? "h" : this._scale;
                    AvatarImageCache._partNameArray[2] = _loc32_;
                    AvatarImageCache._partNameArray[4] = _loc18_;
                    AvatarImageCache._partNameArray[6] = _loc6_;
                    AvatarImageCache._partNameArray[8] = AvatarImageCache._SafeStr_2979[_loc24_];
                    AvatarImageCache._partNameArray[10] = AvatarImageCache._SafeStr_2979[_loc27_];
                    AvatarImageCache._SafeStr_3561.appendStringArray(AvatarImageCache._partNameArray);
                    _loc31_ = this.tryResolveAsset(_loc32_, _loc18_, _loc6_, _loc24_, _loc27_);
                    _loc10_ = this._cachedPartName;
                    if (_loc31_) {
                        _loc30_ = asInstanceOf(_loc31_.content, BitmapData);
                        if (_loc30_ == null) {
                            _loc13_ = false;
                        } else {
                            _loc21_ = false;
                            if (_loc8_.isColorable && _loc8_.color != null) {
                                _loc17_ = _loc8_.color.colorTransform;
                                this._colorTransform.redMultiplier = _loc17_.redMultiplier;
                                this._colorTransform.greenMultiplier = _loc17_.greenMultiplier;
                                this._colorTransform.blueMultiplier = _loc17_.blueMultiplier;
                                this._colorTransform.alphaMultiplier = _loc17_.alphaMultiplier;
                                _loc21_ = true;
                            } else {
                                this._colorTransform.redMultiplier = this._colorTransform.greenMultiplier = this._colorTransform.blueMultiplier = this._colorTransform.alphaMultiplier = 1;
                            }
                            if (_loc8_.isBlendable) {
                                this._colorTransform.concat(_loc8_.blendTransform);
                                _loc21_ = true;
                            }
                            _loc19_ = _loc31_.offset.clone();
                            if (_loc12_) {
                                _loc19_.x += this._scale == "h" ? 65 : 31;
                            }
                            _loc11_ = null;
                            if (_loc21_) {
                                _loc11_ = new ColorTransform();
                                _loc11_.concat(this._colorTransform);
                            }
                            if (param5) {
                                _loc28_ = new RoomObjectSpriteData();
                                _loc28_.name = this._assets.getAssetName(_loc10_);
                                _loc28_.x = -_loc19_.x - 33 | 0;
                                _loc28_.y = -_loc19_.y | 0;
                                _loc28_.z = this._SafeStr_4009.length * -0.0001;
                                _loc28_.width = _loc31_.rectangle.width | 0;
                                _loc28_.height = _loc31_.rectangle.height | 0;
                                _loc28_.flipH = _loc12_;
                                if (_loc32_ == "lay") {
                                    _loc28_.x += 53;
                                }
                                if (_loc26_) {
                                    _loc28_.flipH = !_loc28_.flipH;
                                    if (_loc28_.flipH) {
                                        _loc28_.x = -_loc28_.x - _loc30_.width;
                                    } else {
                                        _loc28_.x += 65;
                                    }
                                }
                                if (_loc8_.isColorable && _loc11_) {
                                    _loc28_.color = "0x" + AvatarImageCache.convertColorToHex(_loc11_.redMultiplier) + AvatarImageCache.convertColorToHex(_loc11_.greenMultiplier) + AvatarImageCache.convertColorToHex(_loc11_.blueMultiplier);
                                }
                                this._SafeStr_4009.push(_loc28_);
                            }
                            if (_loc8_.partType == "fc") {
                                _loc23_ = _loc19_;
                            }
                            this._unionImages.push(new ImageData(_loc30_, _loc31_.rectangle, _loc19_, _loc12_, _loc11_));
                        }
                    }
                }
            }
            _loc25_--;
        }
        if (this._unionImages.length == 0) {
            return null;
        }
        let _loc16_: ImageData = this.createUnionImage(this._unionImages, _loc26_);
        if (!this.ensureCanvas()) {
            return null;
        }
        let _loc14_: number = this._scale == "h" ? this._canvas.height - 16 : this._canvas.height - 8;
        let _loc22_: Point = _loc16_.regPoint;
        if (this._largeScaledSmall) {
            _loc22_ = new Point(_loc22_.x / 2, _loc22_.y / 2);
        }
        let _loc7_: Point = new Point(-_loc22_.x, _loc14_ - _loc22_.y);
        if (_loc26_ && _loc32_ != "lay") {
            _loc7_.x += this._scale == "h" ? 67 : 31;
        }
        _loc25_ = this._unionImages.length - 1;
        while (_loc25_ >= 0) {
            _loc9_ = this._unionImages.pop();
            if (_loc9_) {
                _loc9_.dispose();
            }
            _loc25_--;
        }
        let _loc29_: BitmapData = _loc16_.bitmap;
        if (this._largeScaledSmall) {
            _loc29_ = BitmapHelper.resampleBitmapData(_loc29_, 0.5);
        }
        return new AvatarImageBodyPartContainer(_loc29_, _loc7_, _loc13_, _loc23_);
    }

    private ensureCanvas(): boolean {
        if (!this._canvas) {
            this._canvas = this._SafeStr_2176.getCanvas(this._scale, this._geometryType);
            if (!this._canvas) {
                return false;
            }
        }
        return true;
    }

    private tryResolveAsset(param1: string, param2: string, param3: string, param4: number, param5: number): BitmapDataAsset {
        let _loc6_: string = this._largeScaledSmall ? "h" : this._scale;
        AvatarImageCache._partNameArray[0] = _loc6_;
        AvatarImageCache._partNameArray[2] = param1;
        AvatarImageCache._partNameArray[4] = param2;
        AvatarImageCache._partNameArray[6] = param3;
        AvatarImageCache._partNameArray[8] = AvatarImageCache._SafeStr_2979[param4];
        AvatarImageCache._partNameArray[10] = AvatarImageCache._SafeStr_2979[param5];
        if (this.tryGetAssetWithArray(AvatarImageCache._partNameArray)) {
            return this._cachedAsset;
        }
        AvatarImageCache._partNameArray[10] = AvatarImageCache._SafeStr_2979[0];
        if (this.tryGetAssetWithArray(AvatarImageCache._partNameArray)) {
            return this._cachedAsset;
        }
        AvatarImageCache._partNameArray[2] = this._SafeStr_4215;
        AvatarImageCache._partNameArray[10] = AvatarImageCache._SafeStr_2979[param5];
        if (this.tryGetAssetWithArray(AvatarImageCache._partNameArray)) {
            return this._cachedAsset;
        }
        AvatarImageCache._partNameArray[10] = AvatarImageCache._SafeStr_2979[0];
        if (this.tryGetAssetWithArray(AvatarImageCache._partNameArray)) {
            return this._cachedAsset;
        }
        return null;
    }

    private tryGetAssetWithArray(param1: any[]): boolean {
        AvatarImageCache._SafeStr_3561.length = 0;
        AvatarImageCache._SafeStr_3561.appendStringArray(param1);
        this._cachedPartName = AvatarImageCache._SafeStr_3561.toString();
        this._cachedAsset = asInstanceOf(this._assets.getAssetByName(this._cachedPartName), BitmapDataAsset);
        return this._cachedAsset != null;
    }

    private getDefaultActionFromGeometryType(param1: string): string {
        return param1 == "horizontal" ? "lay" : "std";
    }

    private createUnionImage(param1: any[], param2: boolean): ImageData {
        let _loc4_: any = null;
        let _loc7_: Point = null;
        let _loc5_: Point = null;
        let _loc6_: BitmapData = null;
        let _loc8_: boolean = false;
        let _loc3_: Rectangle = null;
        _loc3_ = new Rectangle();
        for (_loc4_ of param1 ?? []) {
            _loc3_ = _loc3_.union(_loc4_.offsetRect);
        }
        _loc5_ = new Point(-_loc3_.left, -_loc3_.top);
        _loc6_ = new BitmapData(_loc3_.width | 0, _loc3_.height | 0, true, 16777215);
        for (_loc4_ of param1 ?? []) {
            _loc7_ = _loc5_.subtract(_loc4_.regPoint);
            if (param2) {
                _loc7_.x = _loc6_.width - (_loc7_.x + _loc4_.rect.width);
            }
            _loc8_ = !!(!(param2 && _loc4_.flipH) && (param2 || _loc4_.flipH));
            if (_loc8_) {
                this._SafeStr_2189.a = -1;
                this._SafeStr_2189.tx = Number(_loc4_.rect.x + _loc4_.rect.width + _loc7_.x);
                this._SafeStr_2189.ty = _loc7_.y - _loc4_.rect.y;
                _loc3_.x = _loc7_.x;
                _loc3_.y = _loc7_.y;
                _loc3_.width = Number(_loc4_.rect.width);
                _loc3_.height = Number(_loc4_.rect.height);
                _loc6_.draw(_loc4_.bitmap, this._SafeStr_2189, _loc4_.colorTransform, null, _loc3_);
            } else if (_loc4_.colorTransform) {
                this._SafeStr_2189.a = 1;
                this._SafeStr_2189.tx = _loc7_.x - _loc4_.rect.x;
                this._SafeStr_2189.ty = _loc7_.y - _loc4_.rect.y;
                _loc3_.x = _loc7_.x;
                _loc3_.y = _loc7_.y;
                _loc3_.width = Number(_loc4_.rect.width);
                _loc3_.height = Number(_loc4_.rect.height);
                _loc6_.draw(_loc4_.bitmap, this._SafeStr_2189, _loc4_.colorTransform, null, _loc3_);
            } else {
                _loc6_.copyPixels(_loc4_.bitmap, _loc4_.rect, _loc7_, null, null, true);
            }
        }
        return new ImageData(_loc6_, _loc6_.rect, _loc5_, param2, null);
    }

    private drawBorders(param1: BitmapData, param2: Rectangle, param3: number): void {
        let _loc4_: number = 0;
        let _loc5_: number = param2.bottom - 1 | 0;
        _loc4_ = param2.left | 0;
        while (_loc4_ < param2.right - 1) {
            param1.setPixel32(_loc4_, 0, param3);
            param1.setPixel32(_loc4_, _loc5_, param3);
            _loc4_++;
        }
        _loc5_ = param2.top | 0;
        while (_loc5_ < param2.bottom - 1) {
            param1.setPixel32(0, _loc5_, param3);
            param1.setPixel32(_loc4_, _loc5_, param3);
            _loc5_++;
        }
    }

    private debugInfo(param1: string): void {
    }
}
