import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import type { XML } from '@habbo-pixi/runtime/xml/XML';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { AnimationActionPart } from '@/com/sulake/habbo/avatar/structure/animation/AnimationActionPart';

export class AnimationAction {
    static { registerClassName(this, 'com.sulake.habbo.avatar.structure.animation::AnimationAction'); }

    public static readonly DEFAULT_OFFSET: Point = new Point(0, 0);

    declare private _id: string;

    declare private _parts: Map<any, any>;

    declare private _SafeStr_5927: UtilsMap;

    declare private _frameCount: number;
    static { (this.prototype as any)._frameCount = 0; }

    declare private _frameIndexes: any[];

    constructor(param1: XML) {
        let _loc9_: any;
        let _loc7_: any;
        let _loc10_: AnimationActionPart = null;
        let _loc5_: number = 0;
        let _loc12_: UtilsMap = null;
        let _loc6_: number = 0;
        let _loc4_: UtilsMap = null;
        let _loc11_: string = null;
        let _loc13_: number = 0;
        let _loc14_: number = 0;
        let _loc3_: number = 0;
        this._SafeStr_5927 = new UtilsMap();
        this._id = String(param1.attribute("id"));
        this._parts = new Dictionary();
        for (const _loc8_ of param1.child("part") ?? []) {
            _loc10_ = new AnimationActionPart(_loc8_);
            this._parts.set(String(_loc8_.attribute("set-type")), _loc10_);
            this._frameCount = Math.max(this._frameCount, _loc10_.frames.length) | 0;
        }
        this._frameIndexes = [];
        for (const _loc2_ of param1.child("offsets").child("frame") ?? []) {
            _loc5_ = parseInt(_loc2_.attribute("id").toString()) | 0;
            this._frameCount = Math.max(this._frameCount, _loc5_) | 0;
            _loc12_ = new UtilsMap();
            this._SafeStr_5927[_loc5_] = _loc12_;
            for (_loc9_ of _loc2_.child("directions").child("direction") ?? []) {
                _loc6_ = parseInt(_loc9_.attribute("id").toString()) | 0;
                _loc4_ = new UtilsMap();
                _loc12_[_loc6_] = _loc4_;
                for (_loc7_ of _loc9_.child("bodypart") ?? []) {
                    _loc11_ = String(_loc7_.attribute("id"));
                    _loc13_ = (_loc7_.hasOwnProperty("@dx") ? parseInt(_loc7_.attribute("dx").toString()) : 0) | 0;
                    _loc14_ = (_loc7_.hasOwnProperty("@dy") ? parseInt(_loc7_.attribute("dy").toString()) : 0) | 0;
                    _loc4_[_loc11_] = new Point(_loc13_, _loc14_);
                }
            }
            this._frameIndexes.push(_loc5_);
            _loc3_ = parseInt(_loc2_.attribute("repeats").toString()) | 0;
            if (_loc3_ > 1) {
                while (--_loc3_ > 0) {
                    this._frameIndexes.push(_loc5_);
                }
            }
        }
    }

    public getPart(param1: string): AnimationActionPart {
        return asInstanceOf(this._parts.get(param1), AnimationActionPart);
    }

    public get id(): string {
        return this._id;
    }

    public get parts(): Map<any, any> {
        return this._parts;
    }

    public get frameCount(): number {
        return this._frameCount;
    }

    public getFrameBodyPartOffset(param1: number, param2: number, param3: string): Point {
        let _loc8_: Point = null;
        let _loc6_: UtilsMap = null;
        let _loc7_: number = param2 % this._frameIndexes.length;
        let _loc4_: number = this._frameIndexes[_loc7_] | 0;
        let _loc5_: UtilsMap = this._SafeStr_5927[_loc4_];
        if (_loc5_) {
            _loc6_ = _loc5_[param1];
            if (_loc6_) {
                _loc8_ = _loc6_[param3];
            }
        }
        return _loc8_ ?? AnimationAction.DEFAULT_OFFSET;
    }
}
