import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { AnimationFrame } from '@/com/sulake/habbo/room/object/visualization/data/AnimationFrame';
import type { XML } from '@habbo-pixi/runtime/xml/XML';
import type { XMLList } from '@habbo-pixi/runtime/xml/XMLList';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { AnimationData } from '@/com/sulake/habbo/room/object/visualization/data/AnimationData';
import { SizeData } from '@/com/sulake/habbo/room/object/visualization/data/SizeData';
import { XMLValidator } from '@/com/sulake/room/utils/XMLValidator';

export class AnimationSizeData extends SizeData {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.data::AnimationSizeData'); }

    constructor(param1: number, param2: number) {
        super(param1, param2);
        this._animations = new UtilsMap();
    }

    private _animations: UtilsMap = null;
    private _SafeStr_5057: any[] = [];

    public override dispose(): void {
        let _loc1_: number = 0;
        let _loc2_: AnimationData = null;
        super.dispose();
        if (this._animations != null) {
            _loc1_ = 0;
            while (_loc1_ < this._animations.length) {
                _loc2_ = asInstanceOf(this._animations.getWithIndex(_loc1_), AnimationData);
                if (_loc2_ != null) {
                    _loc2_.dispose();
                }
                _loc1_++;
            }
            this._animations.dispose();
            this._animations = null;
        }
    }

    public defineAnimations(param1: XML): boolean {
        let _loc15_: any;
        let _loc6_: number = 0;
        let _loc10_: XML = null;
        let _loc14_: number = 0;
        let _loc13_: boolean = false;
        let _loc5_: string = null;
        let _loc3_: number = 0;
        let _loc12_: number = 0;
        let _loc2_: AnimationData = null;
        let _loc8_: any[] = null;
        let _loc11_: any[] = null;
        let _loc4_: number = 0;
        if (param1 == null) {
            return true;
        }
        let _loc7_: any[] = ["id"];
        let _loc9_: XMLList = param1.child("animation");
        _loc6_ = 0;
        while (_loc6_ < _loc9_.length()) {
            _loc10_ = _loc9_.item(_loc6_);
            if (!XMLValidator.checkRequiredAttributes(_loc10_, _loc7_)) {
                return false;
            }
            _loc14_ = Number(_loc10_.attribute("id")) | 0;
            _loc13_ = false;
            _loc5_ = _loc10_.attribute("transitionTo").toString();
            if (_loc5_.length > 0) {
                _loc3_ = Number(_loc5_) | 0;
                _loc14_ = AnimationData.getTransitionToAnimationId(_loc3_);
                _loc13_ = true;
            }
            _loc5_ = _loc10_.attribute("transitionFrom").toString();
            if (_loc5_.length > 0) {
                _loc12_ = Number(_loc5_) | 0;
                _loc14_ = AnimationData.getTransitionFromAnimationId(_loc12_);
                _loc13_ = true;
            }
            _loc2_ = this.createAnimationData();
            if (!_loc2_.initialize(_loc10_)) {
                _loc2_.dispose();
                return false;
            }
            _loc5_ = _loc10_.attribute("immediateChangeFrom").toString();
            if (_loc5_.length > 0) {
                _loc8_ = _loc5_.split(",");
                _loc11_ = [];
                for (_loc15_ of _loc8_ ?? []) {
                    _loc4_ = _loc15_ | 0;
                    if (_loc11_.indexOf(_loc4_) < 0) {
                        _loc11_.push(_loc4_);
                    }
                }
                _loc2_.setImmediateChanges(_loc11_);
            }
            this._animations.add(_loc14_, _loc2_);
            if (!_loc13_) {
                this._SafeStr_5057.push(_loc14_);
            }
            _loc6_++;
        }
        return true;
    }

    public hasAnimation(param1: number): boolean {
        if (this._animations.getValue(param1) != null) {
            return true;
        }
        return false;
    }

    public getAnimationCount(): number {
        return this._SafeStr_5057.length | 0;
    }

    public getAnimationId(param1: number): number {
        let _loc2_: number = this.getAnimationCount();
        if (param1 >= 0 && _loc2_ > 0) {
            return this._SafeStr_5057[param1 % _loc2_] | 0;
        }
        return 0;
    }

    public isImmediateChange(param1: number, param2: number): boolean {
        let _loc3_: AnimationData = asInstanceOf(this._animations.getValue(param1), AnimationData);
        if (_loc3_ != null) {
            return _loc3_.isImmediateChange(param2);
        }
        return false;
    }

    public getStartFrame(param1: number, param2: number): number {
        let _loc3_: AnimationData = asInstanceOf(this._animations.getValue(param1), AnimationData);
        if (_loc3_ != null) {
            return _loc3_.getStartFrame(param2);
        }
        return 0;
    }

    public getFrame(param1: number, param2: number, param3: number, param4: number): AnimationFrame {
        let _loc6_: any = null;
        let _loc5_: AnimationData = asInstanceOf(this._animations.getValue(param1), AnimationData);
        if (_loc5_ != null) {
            return _loc5_.getFrame(param2, param3, param4);
        }
        return null;
    }

    public getFrameFromSequence(param1: number, param2: number, param3: number, param4: number, param5: number, param6: number): AnimationFrame {
        let _loc8_: any = null;
        let _loc7_: AnimationData = asInstanceOf(this._animations.getValue(param1), AnimationData);
        if (_loc7_ != null) {
            return _loc7_.getFrameFromSequence(param2, param3, param4, param5, param6);
        }
        return null;
    }

    protected createAnimationData(): AnimationData {
        return new AnimationData();
    }
}
