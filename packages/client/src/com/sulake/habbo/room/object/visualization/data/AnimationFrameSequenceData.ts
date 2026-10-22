import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { DirectionalOffsetData } from '@/com/sulake/habbo/room/object/visualization/data/DirectionalOffsetData';
import { AnimationFrameData } from '@/com/sulake/habbo/room/object/visualization/data/AnimationFrameData';
import { AnimationFrameDirectionalData } from '@/com/sulake/habbo/room/object/visualization/data/AnimationFrameDirectionalData';

export class AnimationFrameSequenceData {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.data::AnimationFrameSequenceData'); }

    constructor(param1: number, param2: boolean) {
        if (param1 < 1) {
            param1 = 1;
        }
        this._SafeStr_4920 = param1;
        this._isRandom = param2;
    }

    private _frames: any[] = [];
    private _frameIndexes: any[] = [];
    private _frameRepeats: any[] = [];
    private _isRandom: boolean = false;
    private _SafeStr_4920: number = 1;

    public get isRandom(): boolean {
        return this._isRandom;
    }

    public get frameCount(): number {
        return this._frameIndexes.length * this._SafeStr_4920;
    }

    public dispose(): void {
        this._frames = [];
    }

    public initialize(): void {
        let _loc3_: number = 0;
        let _loc1_: number = 1;
        let _loc2_: number = -1;
        _loc3_ = this._frameIndexes.length - 1;
        while (_loc3_ >= 0) {
            if (this._frameIndexes[_loc3_] == _loc2_) {
                _loc1_++;
            } else {
                _loc2_ = this._frameIndexes[_loc3_] | 0;
                _loc1_ = 1;
            }
            this._frameRepeats[_loc3_] = _loc1_;
            _loc3_--;
        }
    }

    public addFrame(param1: number, param2: number, param3: number, param4: number, param5: number, param6: DirectionalOffsetData): void {
        let _loc8_: AnimationFrameData = null;
        let _loc7_: number = 1;
        if (this._frames.length > 0) {
            _loc8_ = this._frames[this._frames.length - 1];
            if (_loc8_.id == param1 && !_loc8_.hasDirectionalOffsets() && _loc8_.x == param2 && _loc8_.y == param3 && _loc8_.randomX == param4 && param4 == 0 && _loc8_.randomY == param5 && param5 == 0) {
                _loc7_ += _loc8_.repeats;
                this._frames.pop();
            }
        }
        let _loc9_: AnimationFrameData = null;
        if (param6 == null) {
            _loc9_ = new AnimationFrameData(param1, param2, param3, param4, param5, _loc7_);
        } else {
            _loc9_ = new AnimationFrameDirectionalData(param1, param2, param3, param4, param5, param6, _loc7_);
        }
        this._frames.push(_loc9_);
        this._frameIndexes.push(this._frames.length - 1);
        this._frameRepeats.push(1);
    }

    public getFrame(param1: number): AnimationFrameData {
        if (this._frames.length == 0 || param1 < 0 || param1 >= this.frameCount) {
            return null;
        }
        param1 = this._frameIndexes[param1 % this._frameIndexes.length] | 0;
        return asInstanceOf(this._frames[param1], AnimationFrameData);
    }

    public getFrameIndex(param1: number): number {
        if (param1 < 0 || param1 >= this.frameCount) {
            return -1;
        }
        if (this._isRandom) {
            param1 = Math.random() * this._frameIndexes.length | 0;
            if (param1 == this._frameIndexes.length) {
                param1--;
            }
        }
        return param1;
    }

    public getRepeats(param1: number): number {
        if (param1 < 0 || param1 >= this.frameCount) {
            return 0;
        }
        return this._frameRepeats[param1 % this._frameRepeats.length] | 0;
    }
}
