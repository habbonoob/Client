import { asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { AnimationFrame } from '@/com/sulake/habbo/room/object/visualization/data/AnimationFrame';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import type { IRoomObjectModel } from '@/com/sulake/room/object/IRoomObjectModel';
import type { IRoomObjectSprite } from '@/com/sulake/room/object/visualization/IRoomObjectSprite';
import type { IRoomObjectVisualizationData } from '@/com/sulake/room/object/visualization/IRoomObjectVisualizationData';
import type { IGraphicAsset } from '@/com/sulake/room/object/visualization/utils/IGraphicAsset';
import type { IRoomGeometry } from '@/com/sulake/room/utils/IRoomGeometry';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { AnimationData } from '@/com/sulake/habbo/room/object/visualization/data/AnimationData';
import { AnimationStateData } from '@/com/sulake/habbo/room/object/visualization/data/AnimationStateData';
import { AnimatedFurnitureVisualization } from '@/com/sulake/habbo/room/object/visualization/furniture/AnimatedFurnitureVisualization';
import { FurnitureVisualizationData } from '@/com/sulake/habbo/room/object/visualization/furniture/FurnitureVisualizationData';
import { AnimatedPetVisualizationData } from '@/com/sulake/habbo/room/object/visualization/pet/AnimatedPetVisualizationData';
import { ExperienceData } from '@/com/sulake/habbo/room/object/visualization/pet/ExperienceData';

export class AnimatedPetVisualization extends AnimatedFurnitureVisualization {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.pet::AnimatedPetVisualization'); }

    private static readonly HEAD_SPRITE_TAG: string = "head";
    private static readonly SADDLE_SPRITE_TAG: string = "saddle";
    private static readonly HAIR_SPRITE_TAG: string = "hair";
    private static readonly ADDITIONAL_SPRITE_COUNT: number = 1;
    private static readonly EXPERIENCE_BUBBLE_VISIBLE_IN_MS: number = 1000;
    private static readonly EXPERIENCE_BUBBLE_ASSET_NAME: string = "pet_experience_bubble_png";
    private static readonly POSTURE_ANIMATION_INDEX: number = 0;
    private static readonly GESTURE_ANIMATION_INDEX: number = 1;
    private static readonly _SafeStr_8437: number = 2;

    declare private _posture: string;

    declare private _gesture: string;

    declare private _isSleeping: boolean;

    declare private _headDirection: number;

    declare private _SafeStr_2762: ExperienceData;

    declare private _SafeStr_4515: number;

    declare private _experience: number;

    declare private _SafeStr_2337_AnimatedPetVisualization: AnimatedPetVisualizationData;

    declare private _paletteName: string;

    declare private _SafeStr_5882: number;

    declare private _customLayerIds: any[];

    declare private _customPartIds: any[];

    declare private _customPaletteIds: any[];

    declare private _color: number;

    declare private _headOnly: boolean;

    declare private _isRiding: boolean;

    declare private _animationStates: any[];

    declare private _animationOver: boolean;

    declare private _headSprites: any[];

    declare private _nonHeadSprites: any[];

    declare private _saddleSprites: any[];

    declare private _SafeStr_6167: number;

    constructor() {
        super();
        while (this._animationStates.length < 2) {
            this._animationStates.push(new AnimationStateData());
        }
    }

    public override dispose(): void {
        let _loc2_: number = 0;
        let _loc1_: AnimationStateData = null;
        super.dispose();
        if (this._animationStates != null) {
            _loc2_ = 0;
            while (_loc2_ < this._animationStates.length) {
                _loc1_ = asInstanceOf(this._animationStates[_loc2_], AnimationStateData);
                if (_loc1_ != null) {
                    _loc1_.dispose();
                }
                _loc2_++;
            }
            this._animationStates = null;
        }
        if (this._SafeStr_2762) {
            this._SafeStr_2762.dispose();
            this._SafeStr_2762 = null;
        }
    }

    protected override getAnimationId(param1: AnimationStateData): number {
        return param1.animationId;
    }

    public override initialize(param1: IRoomObjectVisualizationData): boolean {
        let _loc2_: BitmapDataAsset = null;
        if (!(param1 instanceof AnimatedPetVisualizationData)) {
            return false;
        }
        this._SafeStr_2337_AnimatedPetVisualization = param1 instanceof AnimatedPetVisualizationData ? param1 : null;
        let _loc3_: BitmapData = null;
        if (this._SafeStr_2337_AnimatedPetVisualization.commonAssets != null) {
            _loc2_ = asInstanceOf(this._SafeStr_2337_AnimatedPetVisualization.commonAssets.getAssetByName("pet_experience_bubble_png"), BitmapDataAsset);
            if (_loc2_ != null) {
                _loc3_ = (asInstanceOf(_loc2_.content, BitmapData)).clone();
                this._SafeStr_2762 = new ExperienceData(_loc3_);
            }
        }
        if (super.initialize(param1)) {
            return true;
        }
        return false;
    }

    protected override set direction(param1: number) {
        if (super.direction != param1) {
            super.direction = param1;
            this._SafeStr_3698 = true;
        }
    }

    public override update(param1: IRoomGeometry, param2: number, param3: boolean, param4: boolean): void {
        super.update(param1, param2, param3, param4);
        this.updateExperienceBubble(param2);
    }

    protected override updateAnimation(param1: number): number {
        let _loc3_: number = 0;
        let _loc2_: IRoomObject = this.object;
        if (_loc2_ != null) {
            _loc3_ = _loc2_.getDirection().x | 0;
            if (_loc3_ != this._SafeStr_6167) {
                this._SafeStr_6167 = _loc3_;
                this.resetAllAnimationFrames();
            }
        }
        return super.updateAnimation(param1);
    }

    protected override updateModel(param1: number): boolean {
        let _loc5_: string = null;
        let _loc10_: string = null;
        let _loc12_: number = NaN;
        let _loc7_: number = 0;
        let _loc2_: number = NaN;
        let _loc6_: number = 0;
        let _loc8_: number = NaN;
        let _loc4_: number = NaN;
        let _loc17_: number = 0;
        let _loc16_: any[] = null;
        let _loc13_: any[] = null;
        let _loc18_: any[] = null;
        let _loc9_: number = 0;
        let _loc3_: number = NaN;
        let _loc14_: IRoomObject = this.object;
        if (_loc14_ == null) {
            return false;
        }
        let _loc15_: IRoomObjectModel = _loc14_.getModel();
        if (_loc15_ == null) {
            return false;
        }
        let _loc11_: boolean = _loc15_.getUpdateID() != this._SafeStr_2366;
        if (_loc11_) {
            _loc5_ = _loc15_.getString("figure_posture");
            _loc10_ = _loc15_.getString("figure_gesture");
            _loc12_ = _loc15_.getNumber("figure_posture");
            if (!isNaN(_loc12_)) {
                _loc7_ = this._SafeStr_2337_AnimatedPetVisualization.getPostureCount(this._SafeStr_2292);
                if (_loc7_ > 0) {
                    _loc5_ = this._SafeStr_2337_AnimatedPetVisualization.getPostureForAnimation(this._SafeStr_2292, _loc12_ % _loc7_ | 0, true);
                    _loc10_ = null;
                }
            }
            _loc2_ = _loc15_.getNumber("figure_gesture");
            if (!isNaN(_loc2_)) {
                _loc6_ = this._SafeStr_2337_AnimatedPetVisualization.getGestureCount(this._SafeStr_2292);
                if (_loc6_ > 0) {
                    _loc10_ = this._SafeStr_2337_AnimatedPetVisualization.getGestureForAnimation(this._SafeStr_2292, _loc2_ % _loc6_ | 0);
                }
            }
            this.validateActions(_loc5_, _loc10_);
            _loc8_ = _loc15_.getNumber("furniture_alpha_multiplier");
            if (isNaN(_loc8_)) {
                _loc8_ = 1;
            }
            if (_loc8_ != this._alphaMultiplier) {
                this._alphaMultiplier = _loc8_;
                this._SafeStr_3262 = true;
            }
            this._isSleeping = _loc15_.getNumber("figure_sleep") > 0;
            _loc4_ = _loc15_.getNumber("head_direction");
            if (!isNaN(_loc4_) && this._SafeStr_2337_AnimatedPetVisualization.isAllowedToTurnHead) {
                this._headDirection = _loc4_ | 0;
            } else {
                this._headDirection = _loc14_.getDirection().x | 0;
            }
            this._SafeStr_4515 = _loc15_.getNumber("figure_experience_timestamp") | 0;
            this._experience = _loc15_.getNumber("figure_gained_experience") | 0;
            _loc17_ = _loc15_.getNumber("pet_palette_index") | 0;
            if (_loc17_ != this._SafeStr_5882) {
                this._SafeStr_5882 = _loc17_;
                this._paletteName = this._SafeStr_5882.toString();
            }
            _loc16_ = _loc15_.getNumberArray("pet_custom_layer_ids");
            this._customLayerIds = _loc16_ != null ? _loc16_ : [];
            _loc13_ = _loc15_.getNumberArray("pet_custom_part_ids");
            this._customPartIds = _loc13_ != null ? _loc13_ : [];
            _loc18_ = _loc15_.getNumberArray("pet_custom_palette_ids");
            this._customPaletteIds = _loc18_ != null ? _loc18_ : [];
            _loc9_ = _loc15_.getNumber("pet_is_riding") | 0;
            this._isRiding = !isNaN(_loc9_) && _loc9_ > 0;
            _loc3_ = _loc15_.getNumber("pet_color");
            if (!isNaN(_loc3_) && _loc3_ != this._color) {
                this._color = _loc3_ | 0;
            }
            this._headOnly = _loc15_.getNumber("pet_head_only") > 0;
        }
        return super.updateModel(param1);
    }

    private updateExperienceBubble(param1: number): void {
        let _loc2_: number = 0;
        let _loc3_: IRoomObjectSprite = null;
        if (this._SafeStr_2762 != null) {
            this._SafeStr_2762.alpha = 0;
            if (this._SafeStr_4515 > 0) {
                _loc2_ = param1 - this._SafeStr_4515;
                if (_loc2_ < 1000) {
                    this._SafeStr_2762.alpha = Math.sin(_loc2_ / 1000 * 3.141592653589793) * 255 | 0;
                    this._SafeStr_2762.setExperience(this._experience);
                } else {
                    this._SafeStr_4515 = 0;
                }
                _loc3_ = this.getSprite(this.spriteCount - 1);
                if (_loc3_ != null) {
                    if (this._SafeStr_2762.alpha > 0) {
                        _loc3_.asset = this._SafeStr_2762.image;
                        _loc3_.offsetX = -20;
                        _loc3_.offsetY = -80;
                        _loc3_.alpha = this._SafeStr_2762.alpha;
                        _loc3_.visible = true;
                    } else {
                        _loc3_.asset = null;
                        _loc3_.visible = false;
                    }
                }
            }
        }
    }

    private validateActions(param1: string, param2: string): void {
        let _loc3_: number = 0;
        if (param1 != this._posture) {
            this._posture = param1;
            _loc3_ = this._SafeStr_2337_AnimatedPetVisualization.getAnimationForPosture(this._SafeStr_2292, param1);
            this.setAnimationForIndex(0, _loc3_);
        }
        if (this._SafeStr_2337_AnimatedPetVisualization.getGestureDisabled(this._SafeStr_2292, param1)) {
            param2 = null;
        }
        if (param2 != this._gesture) {
            this._gesture = param2;
            _loc3_ = this._SafeStr_2337_AnimatedPetVisualization.getAnimationForGesture(this._SafeStr_2292, param2);
            this.setAnimationForIndex(1, _loc3_);
        }
    }

    protected override updateLayerCount(param1: number, param2: number): void {
        super.updateLayerCount(param1, param2);
        this._headSprites = [];
    }

    protected override getAdditionalSpriteCount(param1: number): number {
        return super.getAdditionalSpriteCount(param1) + 1;
    }

    protected override setAnimation(param1: number): void {
    }

    private getAnimationStateData(param1: number): AnimationStateData {
        let _loc2_: any = null;
        if (param1 >= 0 && param1 < this._animationStates.length) {
            return this._animationStates[param1];
        }
        return null;
    }

    private setAnimationForIndex(param1: number, param2: number): void {
        let _loc3_: AnimationStateData = this.getAnimationStateData(param1);
        if (_loc3_ != null) {
            if (this.setSubAnimation(_loc3_, param2)) {
                this._animationOver = false;
            }
        }
    }

    protected override resetAllAnimationFrames(): void {
        let _loc2_: number = 0;
        let _loc1_: AnimationStateData = null;
        this._animationOver = false;
        _loc2_ = this._animationStates.length - 1;
        while (_loc2_ >= 0) {
            _loc1_ = this._animationStates[_loc2_];
            if (_loc1_ != null) {
                _loc1_.setLayerCount(this.animatedLayerCount);
            }
            _loc2_--;
        }
    }

    protected override updateAnimations(param1: number): number {
        let _loc5_: number = 0;
        let _loc4_: AnimationStateData = null;
        let _loc6_: number = 0;
        if (this._animationOver) {
            return 0;
        }
        let _loc3_: boolean = true;
        let _loc2_: number = 0;
        _loc5_ = 0;
        while (_loc5_ < this._animationStates.length) {
            _loc4_ = this._animationStates[_loc5_];
            if (_loc4_ != null) {
                if (!_loc4_.animationOver) {
                    _loc6_ = this.updateFramesForAnimation(_loc4_, param1);
                    _loc2_ |= _loc6_;
                    if (!_loc4_.animationOver) {
                        _loc3_ = false;
                    } else if (AnimationData.isTransitionFromAnimation(_loc4_.animationId) || AnimationData.isTransitionToAnimation(_loc4_.animationId)) {
                        this.setAnimationForIndex(_loc5_, _loc4_.animationAfterTransitionId);
                        _loc3_ = false;
                    }
                }
            }
            _loc5_++;
        }
        this._animationOver = _loc3_;
        return _loc2_;
    }

    protected override getFrameNumber(param1: number, param2: number): number {
        let _loc4_: number = 0;
        let _loc3_: AnimationStateData = null;
        let _loc5_: AnimationFrame = null;
        _loc4_ = this._animationStates.length - 1;
        while (_loc4_ >= 0) {
            _loc3_ = this._animationStates[_loc4_];
            if (_loc3_ != null) {
                _loc5_ = _loc3_.getFrame(param2);
                if (_loc5_ != null) {
                    return _loc5_.id;
                }
            }
            _loc4_--;
        }
        return super.getFrameNumber(param1, param2);
    }

    protected override getPostureForAssetFile(param1: number, param2: string): string {
        let _loc5_: number = 0;
        let _loc6_: string = null;
        let _loc4_: any[] = param2.split("_");
        let _loc3_: number = _loc4_.length | 0;
        _loc5_ = 0;
        while (_loc5_ < _loc4_.length) {
            if (_loc4_[_loc5_] == "64" || _loc4_[_loc5_] == "32") {
                _loc3_ = _loc5_ + 3;
                break;
            }
            _loc5_++;
        }
        let _loc7_: string = null;
        if (_loc3_ < _loc4_.length) {
            _loc6_ = stringOrNull(_loc4_[_loc3_]);
            _loc6_ = stringOrNull(_loc6_.split("@")[0]);
            _loc7_ = this._SafeStr_2337_AnimatedPetVisualization.getPostureForAnimation(param1, (Number(_loc6_) | 0) / 100 | 0, false);
            if (_loc7_ == null) {
                _loc7_ = this._SafeStr_2337_AnimatedPetVisualization.getGestureForAnimationId(param1, (Number(_loc6_) | 0) / 100 | 0);
            }
        }
        return _loc7_;
    }

    protected override getSpriteXOffset(param1: number, param2: number, param3: number): number {
        let _loc6_: number = 0;
        let _loc5_: AnimationStateData = null;
        let _loc7_: AnimationFrame = null;
        let _loc4_: number = super.getSpriteXOffset(param1, param2, param3);
        _loc6_ = this._animationStates.length - 1;
        while (_loc6_ >= 0) {
            _loc5_ = this._animationStates[_loc6_];
            if (_loc5_ != null) {
                _loc7_ = _loc5_.getFrame(param3);
                if (_loc7_ != null) {
                    _loc4_ += _loc7_.x;
                }
            }
            _loc6_--;
        }
        return _loc4_;
    }

    protected override getSpriteYOffset(param1: number, param2: number, param3: number): number {
        let _loc6_: number = 0;
        let _loc5_: AnimationStateData = null;
        let _loc7_: AnimationFrame = null;
        let _loc4_: number = super.getSpriteYOffset(param1, param2, param3);
        _loc6_ = this._animationStates.length - 1;
        while (_loc6_ >= 0) {
            _loc5_ = this._animationStates[_loc6_];
            if (_loc5_ != null) {
                _loc7_ = _loc5_.getFrame(param3);
                if (_loc7_ != null) {
                    _loc4_ += _loc7_.y;
                }
            }
            _loc6_--;
        }
        return _loc4_;
    }

    protected override getAsset(param1: string, param2: number = -1): IGraphicAsset {
        let _loc3_: number = 0;
        let _loc5_: string = null;
        let _loc6_: number = 0;
        let _loc7_: number = 0;
        let _loc4_: any = null;
        if (this.assetCollection != null) {
            _loc3_ = this._customLayerIds.indexOf(param2);
            _loc5_ = this._paletteName;
            _loc6_ = -1;
            _loc7_ = -1;
            if (_loc3_ > -1) {
                _loc6_ = this._customPartIds[_loc3_] | 0;
                _loc7_ = this._customPaletteIds[_loc3_] | 0;
                _loc5_ = _loc7_ > -1 ? String(_loc7_) : this._paletteName;
            }
            if (!isNaN(_loc6_) && _loc6_ > -1) {
                param1 += "_" + _loc6_;
            }
            return this.assetCollection.getAssetWithPalette(param1, _loc5_);
        }
        return null;
    }

    protected override getSpriteZOffset(param1: number, param2: number, param3: number): number {
        if (this._SafeStr_2337_AnimatedPetVisualization == null) {
            return 0;
        }
        return this._SafeStr_2337_AnimatedPetVisualization.getZOffset(param1, this.getDirection(param1, param3), param3);
    }

    protected override getSpriteAssetName(param1: number, param2: number): string {
        let _loc3_: number = 0;
        let _loc5_: string = null;
        if (this._headOnly && this.isNonHeadSprite(param2)) {
            return null;
        }
        if (this._isRiding && this.isSaddleSprite(param2)) {
            return null;
        }
        let _loc4_: number = this.spriteCount;
        if (param2 < _loc4_ - 1) {
            _loc3_ = this.getSize(param1);
            if (param2 < _loc4_ - (1 + 1)) {
                if (param2 >= FurnitureVisualizationData.LAYER_NAMES.length) {
                    return null;
                }
                _loc5_ = stringOrNull(FurnitureVisualizationData.LAYER_NAMES[param2]);
                if (_loc3_ == 1) {
                    return this.type + "_icon_" + _loc5_;
                }
                return this.type + "_" + _loc3_ + "_" + _loc5_ + "_" + this.getDirection(param1, param2) + "_" + this.getFrameNumber(_loc3_, param2);
            }
            return this.type + "_" + _loc3_ + "_sd_" + this.getDirection(param1, param2) + "_0";
        }
        return null;
    }

    protected override getSpriteColor(param1: number, param2: number, param3: number): number {
        if (param2 < this.spriteCount - 1) {
            return this._color;
        }
        return 16777215;
    }

    private getDirection(param1: number, param2: number): number {
        if (this.isHeadSprite(param2)) {
            return this._SafeStr_2337_AnimatedPetVisualization.getDirectionValue(param1, this._headDirection);
        }
        return this.direction;
    }

    private isHeadSprite(param1: number): boolean {
        let _loc3_: boolean = false;
        let _loc2_: boolean = false;
        if (this._headSprites[param1] == null) {
            _loc3_ = this._SafeStr_2337_AnimatedPetVisualization.getTag(this._SafeStr_2292, -1, param1) == "head";
            _loc2_ = this._SafeStr_2337_AnimatedPetVisualization.getTag(this._SafeStr_2292, -1, param1) == "hair";
            if (_loc3_ || _loc2_) {
                this._headSprites[param1] = true;
            } else {
                this._headSprites[param1] = false;
            }
        }
        return this._headSprites[param1];
    }

    private isNonHeadSprite(param1: number): boolean {
        let _loc2_: string = null;
        if (this._nonHeadSprites[param1] == null) {
            if (param1 < this.spriteCount - (1 + 1)) {
                _loc2_ = this._SafeStr_2337_AnimatedPetVisualization.getTag(this._SafeStr_2292, -1, param1);
                if (_loc2_ != null && _loc2_.length > 0 && _loc2_ != "head" && _loc2_ != "hair") {
                    this._nonHeadSprites[param1] = true;
                } else {
                    this._nonHeadSprites[param1] = false;
                }
            } else {
                this._nonHeadSprites[param1] = true;
            }
        }
        return this._nonHeadSprites[param1];
    }

    private isSaddleSprite(param1: number): boolean {
        if (this._saddleSprites[param1] == null) {
            if (this._SafeStr_2337_AnimatedPetVisualization.getTag(this._SafeStr_2292, -1, param1) == "saddle") {
                this._saddleSprites[param1] = true;
            } else {
                this._saddleSprites[param1] = false;
            }
        }
        return this._saddleSprites[param1];
    }

    protected override initInstanceFields(): void {
        this._posture = "";
        this._gesture = "";
        this._isSleeping = false;
        this._headDirection = 0;
        this._SafeStr_4515 = 0;
        this._experience = 0;
        this._SafeStr_2337_AnimatedPetVisualization = null;
        this._paletteName = "";
        this._SafeStr_5882 = -1;
        this._customLayerIds = [];
        this._customPartIds = [];
        this._customPaletteIds = [];
        this._color = 16777215;
        this._headOnly = false;
        this._isRiding = false;
        this._animationStates = [];
        this._animationOver = false;
        this._headSprites = [];
        this._nonHeadSprites = [];
        this._saddleSprites = [];
        this._SafeStr_6167 = -1;
        super.initInstanceFields();
    }

    protected override get direction(): number {
        return super.direction;
    }
}
