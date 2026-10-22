import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { AnimationFrame } from '@/com/sulake/habbo/room/object/visualization/data/AnimationFrame';
import type { AnimationFrameSequenceData } from '@/com/sulake/habbo/room/object/visualization/data/AnimationFrameSequenceData';
import type { XML } from '@habbo-pixi/runtime/xml/XML';
import type { XMLList } from '@habbo-pixi/runtime/xml/XMLList';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { AnimationLayerData } from '@/com/sulake/habbo/room/object/visualization/data/AnimationLayerData';
import { DirectionalOffsetData } from '@/com/sulake/habbo/room/object/visualization/data/DirectionalOffsetData';
import { XMLValidator } from '@/com/sulake/room/utils/XMLValidator';

export class AnimationData {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.data::AnimationData'); }

    public static readonly DEFAULT_FRAME_NUMBER: number = 0;
    private static readonly TRANSITION_TO_ANIMATION_OFFSET: number = 1000000;
    private static readonly TRANSITION_FROM_ANIMATION_OFFSET: number = 2000000;
    private _layers: UtilsMap = null;
    private _frameCount: number = -1;
    private _SafeStr_4889: boolean = false;
    private _immediateChanges: any[] = null;

    constructor() {
        this._layers = new UtilsMap();
    }

    public static getTransitionToAnimationId(param1: number): number {
        return 1000000 + param1;
    }

    public static getTransitionFromAnimationId(param1: number): number {
        return 2000000 + param1;
    }

    public static isTransitionToAnimation(param1: number): boolean {
        return param1 >= 1000000 && param1 < 2000000;
    }

    public static isTransitionFromAnimation(param1: number): boolean {
        return param1 >= 2000000;
    }

    public dispose(): void {
        let _loc1_: number = 0;
        let _loc2_: AnimationLayerData = null;
        if (this._layers != null) {
            _loc1_ = 0;
            while (_loc1_ < this._layers.length) {
                _loc2_ = asInstanceOf(this._layers.getWithIndex(_loc1_), AnimationLayerData);
                if (_loc2_ != null) {
                    _loc2_.dispose();
                }
                _loc1_++;
            }
            this._layers.dispose();
            this._layers = null;
        }
        this._immediateChanges = null;
    }

    public setImmediateChanges(param1: any[]): void {
        this._immediateChanges = param1;
    }

    public isImmediateChange(param1: number): boolean {
        if (this._immediateChanges != null && this._immediateChanges.indexOf(param1) >= 0) {
            return true;
        }
        return false;
    }

    public getStartFrame(param1: number): number {
        if (!this._SafeStr_4889) {
            return 0;
        }
        return Math.random() * this._frameCount | 0;
    }

    public initialize(param1: XML): boolean {
        let _loc8_: number = 0;
        let _loc11_: XML = null;
        let _loc9_: number = 0;
        let _loc5_: number = 0;
        let _loc2_: number = 0;
        let _loc3_: boolean = false;
        let _loc6_: string = null;
        let _loc4_: string = null;
        this._SafeStr_4889 = false;
        if ((Number(param1.attribute("randomStart")) | 0) != 0) {
            this._SafeStr_4889 = true;
        }
        let _loc10_: any[] = ["id"];
        let _loc7_: XMLList = param1.child("animationLayer");
        _loc8_ = 0;
        while (_loc8_ < _loc7_.length()) {
            _loc11_ = _loc7_.item(_loc8_);
            if (!XMLValidator.checkRequiredAttributes(_loc11_, _loc10_)) {
                return false;
            }
            _loc9_ = Number(_loc11_.attribute("id")) | 0;
            _loc5_ = 1;
            _loc2_ = 1;
            _loc3_ = false;
            _loc6_ = _loc11_.attribute("loopCount").toString();
            if (_loc6_.length > 0) {
                _loc5_ = Number(_loc6_) | 0;
            }
            _loc4_ = _loc11_.attribute("frameRepeat").toString();
            if (_loc4_.length > 0) {
                _loc2_ = Number(_loc4_) | 0;
            }
            _loc3_ = (Number(_loc11_.attribute("random")) | 0) != 0;
            if (!this.addLayer(_loc9_, _loc5_, _loc2_, _loc3_, _loc11_)) {
                return false;
            }
            _loc8_++;
        }
        return true;
    }

    private addLayer(param1: number, param2: number, param3: number, param4: boolean, param5: XML): boolean {
        let _loc9_: number = 0;
        let _loc11_: XML = null;
        let _loc8_: number = 0;
        let _loc6_: boolean = false;
        let _loc16_: string = null;
        let _loc14_: AnimationFrameSequenceData = null;
        let _loc12_: XMLList = null;
        let _loc10_: number = 0;
        let _loc23_: XML = null;
        let _loc7_: number = 0;
        let _loc19_: number = 0;
        let _loc20_: number = 0;
        let _loc21_: number = 0;
        let _loc24_: number = 0;
        let _loc17_: DirectionalOffsetData = null;
        let _loc18_: AnimationLayerData = new AnimationLayerData(param2, param3, param4);
        let _loc15_: any[] = ["id"];
        let _loc22_: XMLList = param5.child("frameSequence");
        _loc9_ = 0;
        while (_loc9_ < _loc22_.length()) {
            _loc11_ = _loc22_.item(_loc9_);
            _loc8_ = 1;
            _loc6_ = false;
            _loc16_ = _loc11_.attribute("loopCount").toString();
            if (_loc16_.length > 0) {
                _loc8_ = Number(_loc16_) | 0;
            }
            if ((Number(_loc11_.attribute("random")) | 0) != 0) {
                _loc6_ = true;
            }
            _loc14_ = _loc18_.addFrameSequence(_loc8_, _loc6_);
            _loc12_ = _loc11_.child("frame");
            _loc10_ = 0;
            while (_loc10_ < _loc12_.length()) {
                _loc23_ = _loc12_.item(_loc10_);
                if (!XMLValidator.checkRequiredAttributes(_loc23_, _loc15_)) {
                    _loc18_.dispose();
                    return false;
                }
                _loc7_ = Number(_loc23_.attribute("id")) | 0;
                _loc19_ = Number(_loc23_.attribute("x")) | 0;
                _loc20_ = Number(_loc23_.attribute("y")) | 0;
                _loc21_ = Number(_loc23_.attribute("randomX")) | 0;
                _loc24_ = Number(_loc23_.attribute("randomY")) | 0;
                _loc17_ = this.readDirectionalOffsets(_loc23_);
                _loc14_.addFrame(_loc7_, _loc19_, _loc20_, _loc21_, _loc24_, _loc17_);
                _loc10_++;
            }
            _loc14_.initialize();
            _loc9_++;
        }
        _loc18_.calculateLength();
        this._layers.add(param1, _loc18_);
        let _loc13_: number = _loc18_.frameCount;
        if (_loc13_ > this._frameCount) {
            this._frameCount = _loc13_;
        }
        return true;
    }

    private readDirectionalOffsets(param1: XML): DirectionalOffsetData {
        let _loc7_: any[] = null;
        let _loc5_: XML = null;
        let _loc3_: XMLList = null;
        let _loc9_: number = 0;
        let _loc4_: XML = null;
        let _loc11_: number = 0;
        let _loc8_: number = 0;
        let _loc10_: number = 0;
        let _loc2_: DirectionalOffsetData = null;
        let _loc6_: XMLList = param1.child("offsets");
        if (_loc6_.length() > 0) {
            _loc7_ = ["direction"];
            _loc5_ = _loc6_.item(0);
            _loc3_ = _loc5_.child("offset");
            _loc9_ = 0;
            while (_loc9_ < _loc3_.length()) {
                _loc4_ = _loc3_.item(_loc9_);
                if (XMLValidator.checkRequiredAttributes(_loc4_, _loc7_)) {
                    _loc11_ = Number(_loc4_.attribute("direction")) | 0;
                    _loc8_ = Number(_loc4_.attribute("x")) | 0;
                    _loc10_ = Number(_loc4_.attribute("y")) | 0;
                    if (_loc2_ == null) {
                        _loc2_ = new DirectionalOffsetData();
                    }
                    _loc2_.setOffset(_loc11_, _loc8_, _loc10_);
                }
                _loc9_++;
            }
        }
        return _loc2_;
    }

    public getFrame(param1: number, param2: number, param3: number): AnimationFrame {
        let _loc4_: AnimationLayerData = asInstanceOf(this._layers.getValue(param2), AnimationLayerData);
        if (_loc4_ != null) {
            return _loc4_.getFrame(param1, param3);
        }
        return null;
    }

    public getFrameFromSequence(param1: number, param2: number, param3: number, param4: number, param5: number): AnimationFrame {
        let _loc6_: AnimationLayerData = asInstanceOf(this._layers.getValue(param2), AnimationLayerData);
        if (_loc6_ != null) {
            return _loc6_.getFrameFromSequence(param1, param3, param4, param5);
        }
        return null;
    }
}
