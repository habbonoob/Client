import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { AvatarVisualization } from '@/com/sulake/habbo/room/object/visualization/avatar/AvatarVisualization';
import type { IRoomObjectSprite } from '@/com/sulake/room/object/visualization/IRoomObjectSprite';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { BlurFilter } from '@habbo-pixi/runtime/filters/BlurFilter';
import { ColorTransform } from '@habbo-pixi/runtime/geom/ColorTransform';
import { Matrix } from '@habbo-pixi/runtime/geom/Matrix';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { HabbiconAssetManager } from '@/com/sulake/habbo/habbicons/assets/HabbiconAssetManager';
import { IStackedAvatarAddition } from '@/com/sulake/habbo/room/object/visualization/avatar/additions/IStackedAvatarAddition';

export class HabbiconBubble implements IStackedAvatarAddition {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.avatar.additions::HabbiconBubble'); }

    private static readonly DEFAULT_VISIBLE_DURATION_MS: number = 3000;
    private static readonly INTRO_DURATION_MS: number = 180;
    private static readonly INTRO_START_OFFSET_Y: number = 12;
    private static readonly FADE_IN_DURATION_MS: number = 150;
    private static readonly FADE_OUT_DURATION_MS: number = 350;
    private static readonly BACKGROUND_VISIBLE_DURATION_MS: number = 3350;
    private static readonly BACKGROUND_FADE_OUT_DURATION_MS: number = 530;
    private static readonly ROOM_LARGE_OFFSET_X: number = -20;
    private static readonly ROOM_LARGE_OFFSET_Y: number = -126;
    private static readonly ROOM_SMALL_OFFSET_X: number = -10;
    private static readonly ROOM_SMALL_OFFSET_Y: number = -65;
    private static readonly DEFAULT_RELATIVE_DEPTH: number = -0.2;
    private static readonly _SafeStr_14746: number = 2;
    private static readonly _SafeStr_14747: number = 4294967295;
    private static readonly BACKGROUND_SHADOW_PADDING: number = 5;
    private static readonly BACKGROUND_CONTENT_INSET: number = 7;
    private static readonly BACKGROUND_SHADOW_OFFSET_X: number = 1.5;
    private static readonly BACKGROUND_SHADOW_OFFSET_Y: number = 2;
    private static readonly BACKGROUND_SHADOW_BLUR: number = 6;
    private static readonly BACKGROUND_SHADOW_ALPHA: number = 0.55;
    private static readonly BACKGROUND_SHADOW_QUALITY: number = 2;
    private static readonly BACKGROUND_SHADOW_COLOR: number = 0;

    private static readonly _SafeStr_14748: any = {};

    private static readonly _SafeStr_14749: any = {};

    private static readonly BACKGROUND_SHADOW_BITMAP_CACHE: any = {};

    private _id: number = -1;

    declare private _avatar: AvatarVisualization;

    declare private _SafeStr_14064: number;
    static { (this.prototype as any)._SafeStr_14064 = 0; }

    declare private _scale: number;
    static { (this.prototype as any)._scale = NaN; }

    private _SafeStr_14750: number = 0;
    private _SafeStr_14751: boolean = false;
    private _SafeStr_14752: number = 0;

    declare private _bitmap: BitmapData;

    private _SafeStr_14753: boolean = false;
    private _SafeStr_14754: boolean = false;
    private _SafeStr_14755: number = 0;
    private _SafeStr_14756: boolean = false;
    private _SafeStr_14757: boolean = false;
    private _SafeStr_14758: number = 0;

    declare private _SafeStr_14759: any;

    private _SafeStr_14760: number = 0;
    private _SafeStr_14654: number = 0;
    private _SafeStr_14761: number = 0;
    private _SafeStr_14762: number = 0;
    private _SafeStr_14763: number = 0;
    private _SafeStr_14764: number = 0;
    private _SafeStr_14765: number = -1;
    private _lastComposedSourceAlpha: number = -1;
    private _lastComposedBackgroundAlpha: number = -1;
    private _SafeStr_14766: boolean = false;
    private _initialized: boolean = false;
    private _SafeStr_14767: number = 0;
    private _finished: boolean = false;
    private _relativeDepth: number = -0.2;
    private _SafeStr_14768: boolean = false;
    private _SafeStr_14769: boolean = false;
    private _SafeStr_14652: boolean = false;

    constructor(param1: number, param2: number, param3: number, param4: AvatarVisualization) {
        this._id = param1;
        this._SafeStr_14064 = param2;
        this._SafeStr_14767 = param3;
        this._avatar = param4;
    }

    private static getOutlineBitmap(param1: BitmapData, param2: string): BitmapData {
        let _loc3_: BitmapData = asInstanceOf(HabbiconBubble._SafeStr_14748[param2], BitmapData);
        if (_loc3_ != null) {
            return _loc3_;
        }
        _loc3_ = HabbiconBubble.createOutlineBitmap(param1);
        HabbiconBubble._SafeStr_14748[param2] = _loc3_;
        return _loc3_;
    }

    private static getMirroredBitmap(param1: BitmapData, param2: string): BitmapData {
        let _loc3_: BitmapData = asInstanceOf(HabbiconBubble._SafeStr_14749[param2], BitmapData);
        if (_loc3_ != null) {
            return _loc3_;
        }
        _loc3_ = HabbiconBubble.createMirroredBitmap(param1);
        HabbiconBubble._SafeStr_14749[param2] = _loc3_;
        return _loc3_;
    }

    private static createMirroredBitmap(param1: BitmapData): BitmapData {
        let _loc2_: BitmapData = new BitmapData(param1.width, param1.height, true, 0);
        let _loc3_: Matrix = new Matrix();
        _loc3_.scale(-1, 1);
        _loc3_.translate(param1.width, 0);
        _loc2_.draw(param1, _loc3_, null, null, null, false);
        return _loc2_;
    }

    private static createOutlineBitmap(param1: BitmapData): BitmapData {
        let _loc4_: number = 0;
        let _loc5_: number = 0;
        let _loc2_: BitmapData = new BitmapData(param1.width + 2 * 2, param1.height + 2 * 2, true, 0);
        let _loc3_: BitmapData = new BitmapData(param1.width, param1.height, true, 4294967295);
        let _loc6_: Point = new Point();
        _loc3_.copyChannel(param1, param1.rect, _loc6_, 8, 8);
        _loc5_ = -2;
        while (_loc5_ <= 2) {
            _loc4_ = -2;
            while (_loc4_ <= 2) {
                if (!(_loc4_ == 0 && _loc5_ == 0)) {
                    _loc6_.x = 2 + _loc4_;
                    _loc6_.y = 2 + _loc5_;
                    _loc2_.copyPixels(_loc3_, _loc3_.rect, _loc6_, null, null, true);
                }
                _loc4_++;
            }
            _loc5_++;
        }
        _loc3_.dispose();
        return _loc2_;
    }

    private static getBackgroundShadowBitmap(param1: BitmapData, param2: string): BitmapData {
        let _loc3_: BitmapData = asInstanceOf(HabbiconBubble.BACKGROUND_SHADOW_BITMAP_CACHE[param2], BitmapData);
        if (_loc3_ != null) {
            return _loc3_;
        }
        _loc3_ = HabbiconBubble.createBackgroundShadowBitmap(param1);
        HabbiconBubble.BACKGROUND_SHADOW_BITMAP_CACHE[param2] = _loc3_;
        return _loc3_;
    }

    private static createBackgroundShadowBitmap(param1: BitmapData): BitmapData {
        let _loc2_: BitmapData = new BitmapData(param1.width + 5 * 2, param1.height + 5 * 2, true, 0);
        let _loc4_: BitmapData = new BitmapData(_loc2_.width, _loc2_.height, true, 0);
        let _loc6_: BitmapData = new BitmapData(param1.width, param1.height, true, (0xFF000000 | 0) >>> 0);
        let _loc5_: BlurFilter = new BlurFilter(6, 6, 2);
        let _loc3_: Point = new Point(5 + 1.5, 5 + 2);
        _loc6_.copyChannel(param1, param1.rect, new Point(), 8, 8);
        _loc4_.copyPixels(_loc6_, _loc6_.rect, _loc3_, null, null, true);
        _loc4_.colorTransform(_loc4_.rect, new ColorTransform(1, 1, 1, 0.55));
        _loc2_.applyFilter(_loc4_, _loc4_.rect, new Point(), _loc5_);
        _loc6_.dispose();
        _loc4_.dispose();
        return _loc2_;
    }

    private static drawBitmapLayer(param1: BitmapData, param2: BitmapData, param3: number, param4: number, param5: number): void {
        let _loc6_: Matrix = null;
        if (param5 <= 0) {
            return;
        }
        if (param5 >= 255) {
            param1.copyPixels(param2, param2.rect, new Point(param3, param4), null, null, true);
            return;
        }
        _loc6_ = new Matrix();
        _loc6_.translate(param3, param4);
        param1.draw(param2, _loc6_, new ColorTransform(1, 1, 1, param5 / 255));
    }

    public get id(): number {
        return this._id;
    }

    public get habbiconId(): number {
        return this._SafeStr_14064;
    }

    public get triggerSequence(): number {
        return this._SafeStr_14767;
    }

    public get disposed(): boolean {
        return this._avatar == null;
    }

    public set relativeDepth(param1: number) {
        this._relativeDepth = param1;
    }

    public get isPartOfStack(): boolean {
        return this._SafeStr_14652;
    }

    public set isPartOfStack(param1: boolean) {
        this._SafeStr_14652 = param1;
    }

    public get contributesToStackLayout(): boolean {
        return true;
    }

    public get invisible(): boolean {
        return false;
    }

    public get isFinished(): boolean {
        return false;
    }

    public get requiresAnimationTick(): boolean {
        return true;
    }

    public dispose(): void {
        if (this._bitmap != null && !this._SafeStr_14753) {
            this._bitmap.dispose();
        }
        this._bitmap = null;
        this._SafeStr_14753 = false;
        this._SafeStr_14754 = false;
        this._SafeStr_14755 = 0;
        this._SafeStr_14756 = false;
        this._SafeStr_14757 = false;
        this._SafeStr_14758 = 0;
        this._SafeStr_14762 = 0;
        this._SafeStr_14763 = 0;
        this._SafeStr_14764 = 0;
        this._lastComposedSourceAlpha = -1;
        this._lastComposedBackgroundAlpha = -1;
        this._initialized = false;
        this._finished = false;
        this._SafeStr_14768 = false;
        this._SafeStr_14769 = false;
        this._avatar = null;
    }

    public update(param1: IRoomObjectSprite, param2: number): void {
        let _loc3_: number = 0;
        let _loc5_: number = 0;
        let _loc8_: number = 0;
        let _loc4_: number = 0;
        let _loc7_: number = 64;
        let _loc6_: boolean = !this._initialized;
        if (!param1) {
            return;
        }
        if (this._finished || this._SafeStr_14761 > 0 && getTimer() >= this._SafeStr_14761) {
            this._finished = true;
            param1.alpha = 0;
            param1.visible = false;
            return;
        }
        this._scale = param2;
        if (_loc6_) {
            this._SafeStr_14759 = HabbiconAssetManager.getRuntimeAsset(this._SafeStr_14064);
            this._SafeStr_14766 = this._SafeStr_14759 != null && Boolean(this._SafeStr_14759.animated);
            this._SafeStr_14760 = getTimer();
            this._SafeStr_14765 = this.resolveFrameIndex(0);
            this.configureTiming();
            this.applyFrame(this.resolveBitmap(param2, this.resolveAlpha(this._SafeStr_14760), this.resolveBackgroundAlpha(this._SafeStr_14760)));
            this._initialized = true;
        }
        _loc4_ = getTimer() - this._SafeStr_14760;
        if (param2 < 48) {
            _loc3_ = -10;
            _loc5_ = this._SafeStr_14652 ? 0 : -65;
            _loc7_ = 32;
        } else {
            _loc3_ = -20;
            _loc5_ = this._SafeStr_14652 ? 0 : -126;
        }
        if (!this._SafeStr_14652 && this._avatar.posture == "sit") {
            _loc5_ = _loc5_ + _loc7_ / 2 | 0;
        } else if (!this._SafeStr_14652 && this._avatar.posture == "lay") {
            _loc5_ += _loc7_;
        }
        _loc8_ = this.getIntroOffsetY(_loc4_);
        param1.asset = this._bitmap;
        param1.offsetX = _loc3_ + this.resolveFrameAnchorCompensationX();
        param1.offsetY = _loc5_ + _loc8_ + this.resolveStackAwareFrameAnchorCompensationY();
        param1.relativeDepth = this._relativeDepth;
        if (_loc6_) {
            param1.visible = true;
            param1.alpha = 255;
            this._SafeStr_14750 = 0;
            this._SafeStr_14751 = false;
            this._SafeStr_14752 = 0;
        }
    }

    public animate(param1: IRoomObjectSprite): boolean {
        let _loc3_: number = 0;
        let _loc2_: number = 0;
        let _loc5_: number = 0;
        let _loc9_: number = 0;
        let _loc7_: number = 0;
        let _loc8_: number = 0;
        let _loc10_: number = 0;
        let _loc11_: number = 0;
        let _loc12_: boolean = false;
        let _loc6_: number = 64;
        let _loc4_: boolean = false;
        if (!param1) {
            return false;
        }
        _loc8_ = getTimer();
        _loc2_ = _loc8_ - this._SafeStr_14760;
        this._SafeStr_14759 = HabbiconAssetManager.getRuntimeAsset(this._SafeStr_14064);
        if (this._SafeStr_14759 != null && Boolean(this._SafeStr_14759.animated) != this._SafeStr_14766) {
            this._SafeStr_14766 = Boolean(this._SafeStr_14759.animated);
            this.configureTiming();
        }
        _loc5_ = this.resolveFrameIndex(_loc2_);
        if (this._SafeStr_14759 != null && _loc5_ != this._SafeStr_14765) {
            this._SafeStr_14765 = _loc5_;
            _loc4_ = true;
        }
        _loc10_ = this.resolveAlpha(_loc8_);
        _loc11_ = this.resolveBackgroundAlpha(_loc8_);
        if (_loc10_ != this._lastComposedSourceAlpha || _loc11_ != this._lastComposedBackgroundAlpha) {
            _loc4_ = true;
        }
        if (_loc4_) {
            this.applyFrame(this.resolveBitmap(this._scale, _loc10_, _loc11_));
            _loc12_ = true;
        }
        if (this._bitmap != null) {
            param1.asset = this._bitmap;
        }
        param1.relativeDepth = this._relativeDepth;
        _loc7_ = this._SafeStr_14652 ? 0 : (this._scale < 48 ? -65 : -126);
        if (!this._SafeStr_14652 && this._avatar.posture == "sit") {
            _loc7_ = _loc7_ + _loc6_ / 2 | 0;
        } else if (!this._SafeStr_14652 && this._avatar.posture == "lay") {
            _loc7_ += _loc6_;
        }
        _loc9_ = this.getIntroOffsetY(_loc2_);
        param1.offsetY = _loc7_ + _loc9_ + this.resolveStackAwareFrameAnchorCompensationY();
        param1.offsetX = (this._scale < 48 ? -10 : -20) + this.resolveFrameAnchorCompensationX();
        if (_loc8_ >= this._SafeStr_14761) {
            this._finished = true;
            param1.alpha = 0;
            param1.visible = false;
            return true;
        }
        _loc3_ = Math.max(_loc10_, _loc11_) | 0;
        if (param1.alpha != 255) {
            param1.alpha = 255;
            _loc12_ = true;
        }
        param1.visible = _loc3_ > 0;
        return true;
    }

    private resolveBitmap(param1: number, param2: number = -1, param3: number = -1): BitmapData {
        let _loc5_: BitmapData = null;
        let _loc8_: any[] = null;
        let _loc9_: string = null;
        let _loc7_: BitmapData = null;
        let _loc6_: number = param1 < 48 ? 20 : 40;
        let _loc4_: boolean = param1 < 48;
        if (param2 < 0) {
            param2 = this.resolveAlpha(getTimer());
        }
        if (param3 < 0) {
            param3 = this.resolveBackgroundAlpha(getTimer());
        }
        this._SafeStr_14756 = false;
        this._SafeStr_14757 = false;
        this._SafeStr_14758 = _loc6_;
        if (this._SafeStr_14759 != null && Array.isArray(this._SafeStr_14759.frames) && this._SafeStr_14759.frames.length > 0) {
            _loc8_ = Array.isArray(this._SafeStr_14759.frames) ? this._SafeStr_14759.frames : null;
            if (this._SafeStr_14765 < 0 || this._SafeStr_14765 >= _loc8_.length) {
                this._SafeStr_14765 = 0;
            }
            _loc5_ = _loc4_ ? _loc8_[this._SafeStr_14765].smallBitmap instanceof BitmapData ? _loc8_[this._SafeStr_14765].smallBitmap : null : _loc8_[this._SafeStr_14765].bitmap instanceof BitmapData ? _loc8_[this._SafeStr_14765].bitmap : null;
        } else {
            _loc5_ = HabbiconAssetManager.getPreviewBitmap(this._SafeStr_14064, _loc4_);
        }
        if (_loc5_ != null) {
            this._SafeStr_14756 = false;
            this._SafeStr_14757 = true;
            this._SafeStr_14758 = _loc5_.width + 2 * 2 + 5 * 2;
            this._lastComposedSourceAlpha = param2;
            this._lastComposedBackgroundAlpha = param3;
            _loc9_ = this.createOutlineBitmapCacheKey(_loc4_);
            if (this.shouldMirrorHabbicon()) {
                _loc9_ += ":mirrored";
                _loc5_ = HabbiconBubble.getMirroredBitmap(_loc5_, _loc9_);
            }
            _loc7_ = HabbiconBubble.getOutlineBitmap(_loc5_, _loc9_);
            return this.composeBitmap(_loc5_, _loc7_, HabbiconBubble.getBackgroundShadowBitmap(_loc7_, _loc9_), this._bitmap, param2, param3);
        }
        if (this._bitmap != null && !this._SafeStr_14753 && this._SafeStr_14755 == _loc6_) {
            return this._bitmap;
        }
        return this.createBitmap(_loc6_, this.seededColor(this._SafeStr_14064 * 37));
    }

    private applyFrame(param1: BitmapData): void {
        this.setBitmap(param1, this._SafeStr_14756, this._SafeStr_14758, this._SafeStr_14757);
    }

    private setBitmap(param1: BitmapData, param2: boolean, param3: number, param4: boolean): void {
        if (this._bitmap === param1) {
            this._SafeStr_14753 = param2;
            this._SafeStr_14755 = param3;
            this._SafeStr_14754 = param4;
            return;
        }
        if (this._bitmap != null && !this._SafeStr_14753) {
            this._bitmap.dispose();
        }
        this._bitmap = param1;
        this._SafeStr_14753 = param2;
        this._SafeStr_14755 = param3;
        this._SafeStr_14754 = param4;
    }

    private configureTiming(): void {
        let _loc3_: number = 0;
        let _loc4_: number = 0;
        let _loc2_: number = Math.max(3000, 150 + 350) | 0;
        let _loc1_: number = Math.max(3350, 150 + 530) | 0;
        let _loc5_: number = this._SafeStr_14759 != null ? this._SafeStr_14759.playbackDurationMs | 0 : 0;
        let _loc6_: boolean = false;
        _loc3_ = this._SafeStr_14760 + (_loc6_ ? _loc5_ : _loc2_);
        _loc4_ = _loc6_ ? _loc3_ : _loc3_ - 350;
        this._SafeStr_14762 = _loc3_;
        this._SafeStr_14764 = _loc6_ ? _loc4_ + 530 : this._SafeStr_14760 + _loc1_;
        this._SafeStr_14763 = _loc6_ ? _loc4_ : this._SafeStr_14764 - 530;
        this._SafeStr_14761 = Math.max(_loc3_, this._SafeStr_14764) | 0;
        this._SafeStr_14654 = _loc4_;
    }

    private resolveFrameIndex(param1: number): number {
        let _loc2_: any = this.getCurrentStep(param1);
        if (this._SafeStr_14759 == null || this._SafeStr_14759.frames == null || this._SafeStr_14759.frames.length == 0) {
            return 0;
        }
        if (_loc2_ == null) {
            return 0;
        }
        return Math.max(0, Math.min(_loc2_.sourceFrame | 0, this._SafeStr_14759.frames.length - 1)) | 0;
    }

    private getCurrentStep(param1: number): any {
        let _loc6_: any[] = null;
        let _loc3_: number = 0;
        let _loc5_: any = null;
        let _loc4_: number = 0;
        let _loc2_: number = 0;
        if (this._SafeStr_14759 == null || !(Array.isArray(this._SafeStr_14759.steps)) || this._SafeStr_14759.steps.length == 0) {
            return null;
        }
        _loc6_ = Array.isArray(this._SafeStr_14759.steps) ? this._SafeStr_14759.steps : null;
        if (_loc6_.length == 1) {
            return _loc6_[0];
        }
        for (_loc5_ of _loc6_ ?? []) {
            _loc2_ = _loc2_ + Math.max(1, _loc5_.durationMs | 0) | 0;
        }
        if (_loc2_ <= 0) {
            return _loc6_[0];
        }
        _loc3_ = param1;
        if (this._SafeStr_14759.animated) {
            _loc3_ %= _loc2_;
        } else if (_loc3_ >= _loc2_) {
            return _loc6_[_loc6_.length - 1];
        }
        _loc2_ = 0;
        _loc4_ = 0;
        while (_loc4_ < _loc6_.length) {
            _loc5_ = _loc6_[_loc4_];
            _loc2_ = _loc2_ + Math.max(1, _loc5_.durationMs | 0) | 0;
            if (_loc3_ < _loc2_) {
                return _loc5_;
            }
            _loc4_++;
        }
        return _loc6_[_loc6_.length - 1];
    }

    private getIntroOffsetY(param1: number): number {
        let _loc2_: number = Number(Math.min(1, Math.max(0, param1 / 180)));
        return Math.round((1 - _loc2_) * 12) | 0;
    }

    private resolveAlpha(param1: number): number {
        let _loc3_: number = Number(Math.min(1, Math.max(0, (param1 - this._SafeStr_14760) / 150)));
        let _loc2_: number = param1 < this._SafeStr_14654 ? 1 : 1 - Math.min(1, Math.max(0, (param1 - this._SafeStr_14654) / 350));
        if (this._SafeStr_14762 > 0 && param1 >= this._SafeStr_14762) {
            return 0;
        }
        return Math.round(255 * Math.min(_loc3_, _loc2_)) | 0;
    }

    private resolveBackgroundAlpha(param1: number): number {
        let _loc2_: number = NaN;
        let _loc3_: number = Number(Math.min(1, Math.max(0, (param1 - this._SafeStr_14760) / 150)));
        _loc2_ = param1 < this._SafeStr_14763 ? 1 : 1 - Math.min(1, Math.max(0, (param1 - this._SafeStr_14763) / 530));
        return Math.round(255 * Math.min(_loc3_, _loc2_)) | 0;
    }

    private resolveFrameAnchorCompensationX(): number {
        let _loc1_: number = 0;
        let _loc2_: number = 0;
        if (this._bitmap == null) {
            return 0;
        }
        if (this._SafeStr_14759 == null) {
            return this._SafeStr_14754 ? -7 : 0;
        }
        _loc1_ = this.resolveBaseDimension("baseWidth");
        _loc2_ = this._bitmap.width;
        return Math.round((_loc1_ - _loc2_) * 0.5) | 0;
    }

    private resolveFrameAnchorCompensationY(): number {
        let _loc2_: number = 0;
        let _loc1_: number = 0;
        if (this._bitmap == null) {
            return 0;
        }
        if (this._SafeStr_14759 == null) {
            return this._SafeStr_14754 ? -7 : 0;
        }
        _loc2_ = this.resolveBaseDimension("baseHeight");
        _loc1_ = this._bitmap.height;
        return _loc2_ - _loc1_ + (this._SafeStr_14754 ? 7 : 0);
    }

    private resolveStackAwareFrameAnchorCompensationY(): number {
        return this._SafeStr_14652 ? 0 : this.resolveFrameAnchorCompensationY();
    }

    private resolveBaseDimension(param1: string): number {
        let _loc2_: number = this._SafeStr_14759[param1] | 0;
        if (this._scale < 48) {
            return Math.max(1, Math.round(_loc2_ * 0.5) | 0) | 0;
        }
        return Math.max(1, _loc2_) | 0;
    }

    private createBitmap(param1: number, param2: number): BitmapData {
        let _loc3_: BitmapData = new BitmapData(param1, param1, true, 0);
        let _loc4_: number = Math.max(2, param1 / 8) | 0;
        let _loc5_: number = Math.max(1, param1 / 4) | 0;
        _loc3_.fillRect(_loc3_.rect, 0);
        _loc3_.fillRect(new Rectangle(_loc4_, _loc4_, param1 - _loc4_ * 2, param1 - _loc4_ * 2), (0xFF000000 | param2) >>> 0);
        _loc3_.fillRect(new Rectangle(_loc5_, _loc5_, param1 - _loc5_ * 2, param1 - _loc5_ * 2), 4294967295);
        return _loc3_;
    }

    private createOutlineBitmapCacheKey(param1: boolean): string {
        let _loc2_: boolean = this._SafeStr_14759 != null && Array.isArray(this._SafeStr_14759.frames) && this._SafeStr_14759.frames.length > 0;
        let _loc3_: string = _loc2_ ? (this._SafeStr_14759.animated ? "animated" : "runtime") : "preview";
        return this._SafeStr_14064 + ":" + _loc3_ + ":" + (param1 ? "small" : "large") + ":" + this._SafeStr_14765;
    }

    private shouldMirrorHabbicon(): boolean {
        let _loc2_: number = 0;
        let _loc1_: number = 0;
        if (!this._SafeStr_14768) {
            _loc2_ = this._avatar != null ? this._avatar.habbiconFacingDirection : 0;
            _loc1_ = HabbiconAssetManager.getDirection(this._SafeStr_14064);
            this._SafeStr_14769 = _loc2_ != 0 && _loc1_ != 0 && _loc2_ != _loc1_;
            this._SafeStr_14768 = true;
        }
        return this._SafeStr_14769;
    }

    private composeBitmap(param1: BitmapData, param2: BitmapData, param3: BitmapData, param4: BitmapData, param5: number, param6: number): BitmapData {
        let _loc7_: BitmapData = null;
        if (param4 != null && !this._SafeStr_14753 && param4.width == param3.width && param4.height == param3.height) {
            _loc7_ = param4;
            _loc7_.fillRect(_loc7_.rect, 0);
        } else {
            _loc7_ = new BitmapData(param3.width, param3.height, true, 0);
        }
        HabbiconBubble.drawBitmapLayer(_loc7_, param3, 0, 0, param6);
        HabbiconBubble.drawBitmapLayer(_loc7_, param2, 5, 5, param6);
        HabbiconBubble.drawBitmapLayer(_loc7_, param1, 7, 7, param5);
        return _loc7_;
    }

    private seededColor(param1: number): number {
        switch (param1 % 6) {
            case 0:
                return 16371247;
            case 1:
                return 15964719;
            case 2:
                return 15695663;
            case 3:
                return 9358143;
            case 4:
                return 5095656;
            default:
                return 12813557;
        }
    }

    get [IStackedAvatarAddition](): true {
        return true;
    }
}
