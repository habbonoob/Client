import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { XML } from '@habbo-pixi/runtime/xml/XML';
import type { XMLList } from '@habbo-pixi/runtime/xml/XMLList';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { AnimationSizeData } from '@/com/sulake/habbo/room/object/visualization/data/AnimationSizeData';
import { XMLValidator } from '@/com/sulake/room/utils/XMLValidator';

export class PetAnimationSizeData extends AnimationSizeData {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.pet::PetAnimationSizeData'); }

    public static readonly _SafeStr_7758: number = -1;
    private _SafeStr_3345: UtilsMap = new UtilsMap();
    private _SafeStr_3247: UtilsMap = new UtilsMap();

    declare private _defaultPosture: string;

    constructor(param1: number, param2: number) {
        super(param1, param2);
    }

    public definePostures(param1: XML): boolean {
        let _loc5_: number = 0;
        let _loc2_: XML = null;
        let _loc6_: string = null;
        let _loc7_: number = 0;
        if (param1 == null) {
            return false;
        }
        if (XMLValidator.checkRequiredAttributes(param1, ["defaultPosture"])) {
            this._defaultPosture = param1.attribute("defaultPosture").toString();
        } else {
            this._defaultPosture = null;
        }
        let _loc3_: any[] = ["id", "animationId"];
        let _loc4_: XMLList = param1.child("posture");
        _loc5_ = 0;
        while (_loc5_ < _loc4_.length()) {
            _loc2_ = _loc4_.item(_loc5_);
            if (!XMLValidator.checkRequiredAttributes(_loc2_, _loc3_)) {
                return false;
            }
            _loc6_ = String(_loc2_.attribute("id"));
            _loc7_ = Number(_loc2_.attribute("animationId")) | 0;
            this._SafeStr_3345.add(_loc6_, _loc7_);
            if (this._defaultPosture == null) {
                this._defaultPosture = _loc6_;
            }
            _loc5_++;
        }
        if (this._SafeStr_3345.getValue(this._defaultPosture) == null) {
            return false;
        }
        return true;
    }

    public defineGestures(param1: XML): boolean {
        let _loc2_: number = 0;
        let _loc7_: XML = null;
        let _loc3_: string = null;
        let _loc5_: number = 0;
        if (param1 == null) {
            return true;
        }
        let _loc4_: any[] = ["id", "animationId"];
        let _loc6_: XMLList = param1.child("gesture");
        _loc2_ = 0;
        while (_loc2_ < _loc6_.length()) {
            _loc7_ = _loc6_.item(_loc2_);
            if (!XMLValidator.checkRequiredAttributes(_loc7_, _loc4_)) {
                return false;
            }
            _loc3_ = String(_loc7_.attribute("id"));
            _loc5_ = Number(_loc7_.attribute("animationId")) | 0;
            this._SafeStr_3247.add(_loc3_, _loc5_);
            _loc2_++;
        }
        return true;
    }

    public getAnimationForPosture(param1: string): number {
        if (this._SafeStr_3345.getValue(param1) == null) {
            param1 = this._defaultPosture;
        }
        return this._SafeStr_3345.getValue(param1) | 0;
    }

    public getGestureDisabled(param1: string): boolean {
        if (param1 == "ded") {
            return true;
        }
        return false;
    }

    public getAnimationForGesture(param1: string): number {
        if (this._SafeStr_3247.getValue(param1) == null) {
            return -1;
        }
        return this._SafeStr_3247.getValue(param1) | 0;
    }

    public getPostureForAnimation(param1: number, param2: boolean): string {
        if (param1 >= 0 && param1 < this._SafeStr_3345.length) {
            return stringOrNull(this._SafeStr_3345.getKey(param1));
        }
        return param2 ? this._defaultPosture : null;
    }

    public getGestureForAnimation(param1: number): string {
        if (param1 >= 0 && param1 < this._SafeStr_3247.length) {
            return stringOrNull(this._SafeStr_3247.getKey(param1));
        }
        return null;
    }

    public getGestureForAnimationId(param1: number): string {
        for (const _loc2_ of this._SafeStr_3247.getKeys() ?? []) {
            if (this._SafeStr_3247.getValue(_loc2_) == param1) {
                return stringOrNull(_loc2_);
            }
        }
        return null;
    }

    public getPostureCount(): number {
        return this._SafeStr_3345.length | 0;
    }

    public getGestureCount(): number {
        return this._SafeStr_3247.length | 0;
    }
}
