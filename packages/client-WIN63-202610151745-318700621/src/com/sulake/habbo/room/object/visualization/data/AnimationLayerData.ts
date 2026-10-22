import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { AnimationFrameData } from '@/com/sulake/habbo/room/object/visualization/data/AnimationFrameData';
import { AnimationFrame } from '@/com/sulake/habbo/room/object/visualization/data/AnimationFrame';
import { AnimationFrameSequenceData } from '@/com/sulake/habbo/room/object/visualization/data/AnimationFrameSequenceData';

export class AnimationLayerData {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.data::AnimationLayerData'); }

    private _frameSequences: any[] = [];
    private _frameCount: number = -1;
    private _SafeStr_4920: number = 1;
    private _frameRepeat: number = 1;
    private _isRandom: boolean = false;

    constructor(param1: number, param2: number, param3: boolean) {
        if (param1 < 0) {
            param1 = 0;
        }
        if (param2 < 1) {
            param2 = 1;
        }
        this._SafeStr_4920 = param1;
        this._frameRepeat = param2;
        this._isRandom = param3;
    }

    public get frameCount(): number {
        if (this._frameCount < 0) {
            this.calculateLength();
        }
        return this._frameCount;
    }

    public dispose(): void {
        let _loc2_: number = 0;
        let _loc1_: AnimationFrameSequenceData = null;
        _loc2_ = 0;
        while (_loc2_ < this._frameSequences.length) {
            _loc1_ = asInstanceOf(this._frameSequences[_loc2_], AnimationFrameSequenceData);
            if (_loc1_ != null) {
                _loc1_.dispose();
            }
            _loc2_++;
        }
        this._frameSequences = [];
    }

    public addFrameSequence(param1: number, param2: boolean): AnimationFrameSequenceData {
        let _loc3_: AnimationFrameSequenceData = new AnimationFrameSequenceData(param1, param2);
        this._frameSequences.push(_loc3_);
        return _loc3_;
    }

    public calculateLength(): void {
        let _loc2_: number = 0;
        let _loc1_: AnimationFrameSequenceData = null;
        this._frameCount = 0;
        _loc2_ = 0;
        while (_loc2_ < this._frameSequences.length) {
            _loc1_ = asInstanceOf(this._frameSequences[_loc2_], AnimationFrameSequenceData);
            if (_loc1_ != null) {
                this._frameCount += _loc1_.frameCount;
            }
            _loc2_++;
        }
    }

    public getFrame(param1: number, param2: number): AnimationFrame {
        let _loc7_: number = 0;
        let _loc6_: number = 0;
        if (this._frameCount < 1) {
            return null;
        }
        let _loc4_: AnimationFrameSequenceData = null;
        param2 = param2 / this._frameRepeat | 0;
        let _loc5_: boolean = false;
        let _loc3_: number = 0;
        if (!this._isRandom) {
            _loc7_ = param2 / this._frameCount | 0;
            param2 %= this._frameCount;
            if (this._SafeStr_4920 > 0 && _loc7_ >= this._SafeStr_4920 || this._SafeStr_4920 <= 0 && this._frameCount == 1) {
                param2 = this._frameCount - 1;
                _loc5_ = true;
            }
            _loc6_ = 0;
            _loc3_ = 0;
            while (_loc3_ < this._frameSequences.length) {
                _loc4_ = asInstanceOf(this._frameSequences[_loc3_], AnimationFrameSequenceData);
                if (_loc4_ != null) {
                    if (param2 < _loc6_ + _loc4_.frameCount) {
                        break;
                    }
                    _loc6_ += _loc4_.frameCount;
                }
                _loc3_++;
            }
            return this.getFrameFromSpecificSequence(param1, _loc4_, _loc3_, param2 - _loc6_, _loc5_);
        }
        _loc3_ = this._frameSequences.length * Math.random() | 0;
        _loc4_ = asInstanceOf(this._frameSequences[_loc3_], AnimationFrameSequenceData);
        if (_loc4_.frameCount < 1) {
            return null;
        }
        param2 = 0;
        return this.getFrameFromSpecificSequence(param1, _loc4_, _loc3_, param2, false);
    }

    public getFrameFromSequence(param1: number, param2: number, param3: number, param4: number): AnimationFrame {
        if (param2 < 0 || param2 >= this._frameSequences.length) {
            return null;
        }
        let _loc5_: AnimationFrameSequenceData = asInstanceOf(this._frameSequences[param2], AnimationFrameSequenceData);
        if (_loc5_ != null) {
            if (param3 >= _loc5_.frameCount) {
                return this.getFrame(param1, param4);
            }
            return this.getFrameFromSpecificSequence(param1, _loc5_, param2, param3, false);
        }
        return null;
    }

    private getFrameFromSpecificSequence(param1: number, param2: AnimationFrameSequenceData, param3: number, param4: number, param5: boolean): AnimationFrame {
        let _loc10_: number = 0;
        let _loc8_: AnimationFrameData = null;
        let _loc11_: number = 0;
        let _loc12_: number = 0;
        let _loc13_: number = 0;
        let _loc14_: number = 0;
        let _loc7_: number = 0;
        let _loc6_: number = 0;
        let _loc9_: boolean = false;
        let _loc15_: any = null;
        if (param2 != null) {
            _loc10_ = param2.getFrameIndex(param4);
            _loc8_ = param2.getFrame(_loc10_);
            if (_loc8_ == null) {
                return null;
            }
            _loc11_ = _loc8_.getX(param1);
            _loc12_ = _loc8_.getY(param1);
            _loc13_ = _loc8_.randomX;
            _loc14_ = _loc8_.randomY;
            if (_loc13_ != 0) {
                _loc11_ = _loc11_ + _loc13_ * Math.random() | 0;
            }
            if (_loc14_ != 0) {
                _loc12_ = _loc12_ + _loc14_ * Math.random() | 0;
            }
            _loc7_ = _loc8_.repeats;
            if (_loc7_ > 1) {
                _loc7_ = param2.getRepeats(_loc10_);
            }
            _loc6_ = this._frameRepeat * _loc7_;
            if (param5) {
                _loc6_ = -1;
            }
            _loc9_ = false;
            if (!this._isRandom && !param2.isRandom) {
                if (param3 == this._frameSequences.length - 1 && param4 == param2.frameCount - 1) {
                    _loc9_ = true;
                }
            }
            return AnimationFrame.allocate(_loc8_.id, _loc11_, _loc12_, _loc7_, _loc6_, _loc9_, param3, param4);
        }
        return null;
    }
}
