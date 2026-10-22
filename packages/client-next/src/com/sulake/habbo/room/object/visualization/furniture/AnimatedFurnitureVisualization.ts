import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { AnimationFrame } from '@/com/sulake/habbo/room/object/visualization/data/AnimationFrame';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import type { IRoomObjectModel } from '@/com/sulake/room/object/IRoomObjectModel';
import type { IRoomObjectVisualizationData } from '@/com/sulake/room/object/visualization/IRoomObjectVisualizationData';
import { AnimationData } from '@/com/sulake/habbo/room/object/visualization/data/AnimationData';
import { AnimationStateData } from '@/com/sulake/habbo/room/object/visualization/data/AnimationStateData';
import { AnimatedFurnitureVisualizationData } from '@/com/sulake/habbo/room/object/visualization/furniture/AnimatedFurnitureVisualizationData';
import { FurnitureVisualization } from '@/com/sulake/habbo/room/object/visualization/furniture/FurnitureVisualization';

export class AnimatedFurnitureVisualization extends FurnitureVisualization {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.furniture::AnimatedFurnitureVisualization'); }

    public static readonly DEFAULT_ANIMATION_ID: number = 0;

    declare private _SafeStr_2337: AnimatedFurnitureVisualizationData;

    declare private _state: number;

    declare private _SafeStr_2330: AnimationStateData;

    declare private _animationChangeTime: number;

    declare private _frameIncrease: number;

    declare private _SafeStr_3053: number;

    declare private _animatedLayerCount: number;

    declare protected _SafeStr_3698: boolean;

    constructor() {
        super();
        this._SafeStr_2330 = new AnimationStateData();
    }

    protected get animatedLayerCount(): number {
        return this._animatedLayerCount;
    }

    protected get frameIncrease(): number {
        return this._frameIncrease;
    }

    public override dispose(): void {
        super.dispose();
        this._SafeStr_2337 = null;
        if (this._SafeStr_2330 != null) {
            this._SafeStr_2330.dispose();
            this._SafeStr_2330 = null;
        }
    }

    public get animationId(): number {
        return this._SafeStr_2330.animationId;
    }

    protected getAnimationId(param1: AnimationStateData): number {
        let _loc2_: number = this.animationId;
        if (_loc2_ != 0 && this._SafeStr_2337.hasAnimation(this._SafeStr_3053 | 0, _loc2_)) {
            return _loc2_;
        }
        return 0;
    }

    public override initialize(param1: IRoomObjectVisualizationData): boolean {
        if (!(param1 instanceof AnimatedFurnitureVisualizationData)) {
            return false;
        }
        this._SafeStr_2337 = param1 instanceof AnimatedFurnitureVisualizationData ? param1 : null;
        return super.initialize(param1);
    }

    protected override updateObject(param1: number, param2: number): boolean {
        let _loc3_: IRoomObject = null;
        let _loc6_: number = 0;
        let _loc4_: IRoomObjectModel = null;
        let _loc5_: number = 0;
        if (super.updateObject(param1, param2)) {
            _loc3_ = this.object;
            if (_loc3_ == null) {
                return false;
            }
            _loc6_ = _loc3_.getState(0);
            if (_loc6_ != this._state) {
                this.setAnimation(_loc6_);
                this._state = _loc6_;
                _loc4_ = _loc3_.getModel();
                if (_loc4_ != null) {
                    this._animationChangeTime = _loc5_ = _loc4_.getNumber("furniture_state_update_time") | 0;
                }
            }
            return true;
        }
        return false;
    }

    protected override updateModel(param1: number): boolean {
        let _loc2_: IRoomObject = null;
        let _loc4_: IRoomObjectModel = null;
        let _loc5_: number = 0;
        let _loc3_: number = NaN;
        let _loc6_: number = 0;
        if (super.updateModel(param1)) {
            _loc2_ = this.object;
            if (_loc2_ != null) {
                _loc4_ = _loc2_.getModel();
                if (_loc4_ != null) {
                    if (this.usesAnimationResetting()) {
                        _loc5_ = _loc4_.getNumber("furniture_state_update_time") | 0;
                        if (_loc5_ > this._animationChangeTime) {
                            this._animationChangeTime = _loc5_;
                            this.setAnimation(this._state);
                        }
                    }
                    _loc3_ = _loc4_.getNumber("furniture_automatic_state_index");
                    if (!isNaN(_loc3_)) {
                        _loc6_ = this._SafeStr_2337.getAnimationId(this._SafeStr_3053 | 0, _loc3_ | 0);
                        this.setAnimation(_loc6_);
                    }
                }
            }
            return true;
        }
        return false;
    }

    private isPlayingTransition(param1: AnimationStateData, param2: number): boolean {
        let _loc3_: number = param1.animationId;
        if (AnimationData.isTransitionFromAnimation(_loc3_) || AnimationData.isTransitionToAnimation(_loc3_)) {
            if (param2 == param1.animationAfterTransitionId) {
                if (!param1.animationOver) {
                    return true;
                }
            }
        }
        return false;
    }

    private getCurrentState(param1: AnimationStateData): number {
        let _loc2_: number = param1.animationId;
        if (AnimationData.isTransitionFromAnimation(_loc2_) || AnimationData.isTransitionToAnimation(_loc2_)) {
            return param1.animationAfterTransitionId;
        }
        return _loc2_;
    }

    protected setAnimation(param1: number): void {
        if (this._SafeStr_2337 != null) {
            this.setSubAnimation(this._SafeStr_2330, param1, this._state >= 0);
        }
    }

    protected setSubAnimation(param1: AnimationStateData, param2: number, param3: boolean = true): boolean {
        let _loc5_: number = 0;
        let _loc6_: number = 0;
        let _loc4_: number = param1.animationId;
        if (param3) {
            if (this.isPlayingTransition(param1, param2)) {
                return false;
            }
            _loc5_ = this.getCurrentState(param1);
            if (param2 != _loc5_) {
                if (!this._SafeStr_2337.isImmediateChange(this._SafeStr_3053 | 0, param2, _loc5_)) {
                    _loc6_ = AnimationData.getTransitionFromAnimationId(_loc5_);
                    if (this._SafeStr_2337.hasAnimation(this._SafeStr_3053 | 0, _loc6_)) {
                        param1.animationAfterTransitionId = param2;
                        param2 = _loc6_;
                    } else {
                        _loc6_ = AnimationData.getTransitionToAnimationId(param2);
                        if (this._SafeStr_2337.hasAnimation(this._SafeStr_3053 | 0, _loc6_)) {
                            param1.animationAfterTransitionId = param2;
                            param2 = _loc6_;
                        }
                    }
                }
            } else if (AnimationData.isTransitionFromAnimation(_loc4_)) {
                _loc6_ = AnimationData.getTransitionToAnimationId(param2);
                if (this._SafeStr_2337.hasAnimation(this._SafeStr_3053 | 0, _loc6_)) {
                    param1.animationAfterTransitionId = param2;
                    param2 = _loc6_;
                }
            } else if (!AnimationData.isTransitionToAnimation(_loc4_)) {
                if (this.usesAnimationResetting()) {
                    _loc6_ = AnimationData.getTransitionFromAnimationId(_loc5_);
                    if (this._SafeStr_2337.hasAnimation(this._SafeStr_3053 | 0, _loc6_)) {
                        param1.animationAfterTransitionId = param2;
                        param2 = _loc6_;
                    } else {
                        _loc6_ = AnimationData.getTransitionToAnimationId(param2);
                        if (this._SafeStr_2337.hasAnimation(this._SafeStr_3053 | 0, _loc6_)) {
                            param1.animationAfterTransitionId = param2;
                            param2 = _loc6_;
                        }
                    }
                }
            }
        }
        if (_loc4_ != param2) {
            param1.animationId = param2;
            return true;
        }
        return false;
    }

    protected getLastFramePlayed(param1: number): boolean {
        return this._SafeStr_2330.getLastFramePlayed(param1);
    }

    protected resetAllAnimationFrames(): void {
        if (this._SafeStr_2330 != null) {
            this._SafeStr_2330.setLayerCount(this._animatedLayerCount);
        }
    }

    protected override updateAnimation(param1: number): number {
        if (this._SafeStr_2337 == null) {
            return 0;
        }
        if (param1 != this._SafeStr_3053) {
            this._SafeStr_3053 = param1;
            this._animatedLayerCount = this._SafeStr_2337.getLayerCount(param1 | 0);
            this.resetAllAnimationFrames();
        }
        let _loc2_: number = this.updateAnimations(param1);
        this._SafeStr_3698 = false;
        return _loc2_;
    }

    protected updateAnimations(param1: number): number {
        let _loc2_: number = 0;
        if (!this._SafeStr_2330.animationOver || this._SafeStr_3698) {
            _loc2_ = this.updateFramesForAnimation(this._SafeStr_2330, param1);
            if (this._SafeStr_2330.animationOver) {
                if (AnimationData.isTransitionFromAnimation(this._SafeStr_2330.animationId) || AnimationData.isTransitionToAnimation(this._SafeStr_2330.animationId)) {
                    this.setAnimation(this._SafeStr_2330.animationAfterTransitionId);
                    this._SafeStr_2330.animationOver = false;
                }
            }
        }
        return _loc2_;
    }

    protected updateFramesForAnimation(param1: AnimationStateData, param2: number): number {
        let _loc7_: number = 0;
        let _loc5_: boolean = false;
        let _loc6_: boolean = false;
        let _loc11_: AnimationFrame = null;
        let _loc3_: number = 0;
        if (param1.animationOver && !this._SafeStr_3698) {
            return 0;
        }
        let _loc4_: number = param1.frameCounter;
        let _loc8_: number = this.getAnimationId(param1);
        if (_loc4_ == 0) {
            _loc4_ = this._SafeStr_2337.getStartFrame(param2 | 0, _loc8_, this.direction);
        }
        _loc4_ += this.frameIncrease;
        param1.frameCounter = _loc4_;
        let _loc9_: number = 0;
        param1.animationOver = true;
        let _loc10_: number = 1 << this._animatedLayerCount - 1;
        _loc7_ = this._animatedLayerCount - 1;
        while (_loc7_ >= 0) {
            _loc5_ = param1.getAnimationPlayed(_loc7_);
            if (!_loc5_ || this._SafeStr_3698) {
                _loc6_ = param1.getLastFramePlayed(_loc7_);
                _loc11_ = param1.getFrame(_loc7_);
                if (_loc11_ != null) {
                    if (_loc11_.isLastFrame && _loc11_.remainingFrameRepeats <= this.frameIncrease) {
                        _loc6_ = true;
                    }
                }
                if (this._SafeStr_3698 || _loc11_ == null || _loc11_.remainingFrameRepeats >= 0 && (_loc11_.remainingFrameRepeats -= this.frameIncrease) <= 0) {
                    _loc3_ = -1;
                    if (_loc11_ != null) {
                        _loc3_ = _loc11_.activeSequence;
                    }
                    if (_loc3_ == -1) {
                        _loc11_ = this._SafeStr_2337.getFrame(param2 | 0, _loc8_, this.direction, _loc7_, _loc4_);
                    } else {
                        _loc11_ = this._SafeStr_2337.getFrameFromSequence(param2 | 0, _loc8_, this.direction, _loc7_, _loc3_, _loc11_.activeSequenceOffset + _loc11_.repeats, _loc4_);
                    }
                    param1.setFrame(_loc7_, _loc11_);
                    _loc9_ |= _loc10_;
                }
                if (_loc11_ == null || _loc11_.remainingFrameRepeats == -1) {
                    _loc6_ = true;
                    _loc5_ = true;
                } else {
                    param1.animationOver = false;
                }
                param1.setLastFramePlayed(_loc7_, _loc6_);
                param1.setAnimationPlayed(_loc7_, _loc5_);
            }
            _loc10_ >>= 1;
            _loc7_--;
        }
        return _loc9_;
    }

    protected override getFrameNumber(param1: number, param2: number): number {
        let _loc3_: AnimationFrame = this._SafeStr_2330.getFrame(param2);
        if (_loc3_ != null) {
            return _loc3_.id;
        }
        return super.getFrameNumber(param1, param2);
    }

    protected override getSpriteXOffset(param1: number, param2: number, param3: number): number {
        let _loc4_: number = super.getSpriteXOffset(param1, param2, param3);
        let _loc5_: AnimationFrame = this._SafeStr_2330.getFrame(param3);
        if (_loc5_ != null) {
            _loc4_ += _loc5_.x;
        }
        return _loc4_;
    }

    protected override getSpriteYOffset(param1: number, param2: number, param3: number): number {
        let _loc4_: number = super.getSpriteYOffset(param1, param2, param3);
        let _loc5_: AnimationFrame = this._SafeStr_2330.getFrame(param3);
        if (_loc5_ != null) {
            _loc4_ += _loc5_.y;
        }
        return _loc4_;
    }

    protected usesAnimationResetting(): boolean {
        return false;
    }

    protected override initInstanceFields(): void {
        this._SafeStr_2337 = null;
        this._state = -1;
        this._animationChangeTime = 0;
        this._frameIncrease = 1;
        this._SafeStr_3053 = 0;
        this._animatedLayerCount = 0;
        this._SafeStr_3698 = false;
        super.initInstanceFields();
    }
}
