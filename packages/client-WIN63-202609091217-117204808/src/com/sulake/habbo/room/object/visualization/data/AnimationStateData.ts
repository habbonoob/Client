import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { AnimationFrame } from '@/com/sulake/habbo/room/object/visualization/data/AnimationFrame';

export class AnimationStateData {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.data::AnimationStateData'); }

    private _animationId: number = -1;
    private _animationAfterTransitionId: number = 0;
    private _animationOver: boolean = false;
    private _frameCounter: number = 0;
    private _frames: any[] = [];
    private _SafeStr_3489: any[] = [];
    private _SafeStr_3358: any[] = [];
    private _layerCount: number = 0;

    constructor() {
    }

    public get animationOver(): boolean {
        return this._animationOver;
    }

    public set animationOver(param1: boolean) {
        this._animationOver = param1;
    }

    public get frameCounter(): number {
        return this._frameCounter;
    }

    public set frameCounter(param1: number) {
        this._frameCounter = param1;
    }

    public get animationId(): number {
        return this._animationId;
    }

    public set animationId(param1: number) {
        if (param1 != this._animationId) {
            this._animationId = param1;
            this.resetAnimationFrames(false);
        }
    }

    public get animationAfterTransitionId(): number {
        return this._animationAfterTransitionId;
    }

    public set animationAfterTransitionId(param1: number) {
        this._animationAfterTransitionId = param1;
    }

    public dispose(): void {
        this.recycleFrames();
        this._frames = null;
        this._SafeStr_3489 = null;
        this._SafeStr_3358 = null;
    }

    public setLayerCount(param1: number): void {
        this._layerCount = param1;
        this.resetAnimationFrames();
    }

    public resetAnimationFrames(param1: boolean = true): void {
        let _loc2_: number = 0;
        let _loc3_: AnimationFrame = null;
        if (param1 || this._frames == null) {
            this.recycleFrames();
            this._frames = [];
        }
        this._SafeStr_3489 = [];
        this._SafeStr_3358 = [];
        this._animationOver = false;
        this._frameCounter = 0;
        _loc2_ = 0;
        while (_loc2_ < this._layerCount) {
            if (param1 || this._frames.length <= _loc2_) {
                this._frames[_loc2_] = null;
            } else {
                _loc3_ = this._frames[_loc2_];
                if (_loc3_ != null) {
                    _loc3_.recycle();
                    this._frames[_loc2_] = AnimationFrame.allocate(_loc3_.id, _loc3_.x, _loc3_.y, _loc3_.repeats, 0, _loc3_.isLastFrame);
                }
            }
            this._SafeStr_3489[_loc2_] = false;
            this._SafeStr_3358[_loc2_] = false;
            _loc2_++;
        }
    }

    private recycleFrames(): void {
        if (this._frames != null) {
            for (const _loc1_ of this._frames ?? []) {
                if (_loc1_ != null) {
                    _loc1_.recycle();
                }
            }
        }
    }

    public getFrame(param1: number): AnimationFrame {
        if (param1 >= 0 && param1 < this._layerCount) {
            return this._frames[param1];
        }
        return null;
    }

    public setFrame(param1: number, param2: AnimationFrame): void {
        let _loc3_: AnimationFrame = null;
        if (param1 >= 0 && param1 < this._layerCount) {
            _loc3_ = this._frames[param1];
            if (_loc3_ != null) {
                _loc3_.recycle();
            }
            this._frames[param1] = param2;
        }
    }

    public getAnimationPlayed(param1: number): boolean {
        if (param1 >= 0 && param1 < this._layerCount) {
            return this._SafeStr_3358[param1];
        }
        return true;
    }

    public setAnimationPlayed(param1: number, param2: boolean): void {
        if (param1 >= 0 && param1 < this._layerCount) {
            this._SafeStr_3358[param1] = param2;
        }
    }

    public getLastFramePlayed(param1: number): boolean {
        if (param1 >= 0 && param1 < this._layerCount) {
            return this._SafeStr_3489[param1];
        }
        return true;
    }

    public setLastFramePlayed(param1: number, param2: boolean): void {
        if (param1 >= 0 && param1 < this._layerCount) {
            this._SafeStr_3489[param1] = param2;
        }
    }
}
