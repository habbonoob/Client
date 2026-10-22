import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { _SafeCls_6080 } from '@/com/sulake/habbo/room/object/visualization/variablefx/_SafeCls_6080';
import { AnimatedColor } from '@/com/sulake/habbo/room/object/visualization/variablefx/animation/AnimatedColor';

export class AnimatedPaintColor {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.variablefx.animation::AnimatedPaintColor'); }

    declare private _color: AnimatedColor;

    private _SafeStr_14512: any = null;
    private _SafeStr_14513: number = -1;
    private _SafeStr_14514: number = 0;

    constructor(param1: number) {
        this._color = new AnimatedColor(param1);
    }

    private static sign(param1: number): number {
        if (param1 > 0) {
            return 1;
        }
        if (param1 < 0) {
            return -1;
        }
        return 0;
    }

    public get value(): number {
        return this._color.value;
    }

    public get argb(): number {
        return (0xFF000000 | this._color.value) >>> 0;
    }

    public snapTo(param1: any, param2: number): void {
        let _loc3_: any = this.resolvePaintColor(param1);
        let _loc4_: number = (_loc3_.rgb & 0xFFFFFF) >>> 0;
        this._color.snapTo(_loc4_, param2);
        this._SafeStr_14512 = _loc3_.dynamicBandIndex == null ? null : _loc3_.dynamicBandIndex;
        this._SafeStr_14513 = _loc4_ | 0;
        this._SafeStr_14514 = 0;
    }

    public setTarget(param1: any, param2: number): void {
        this.syncTarget(param1, param2);
    }

    public needsUpdate(param1: number): boolean {
        return this._color.needsUpdate(param1);
    }

    public update(param1: any, param2: number): boolean {
        let _loc3_: boolean = this.syncTarget(param1, param2);
        let _loc4_: boolean = this._color.update(param2);
        let _loc5_: boolean = this.syncTarget(param1, param2);
        return _loc3_ || _loc4_ || _loc5_;
    }

    private syncTarget(param1: any, param2: number): boolean {
        let _loc3_: any = null;
        let _loc5_: number = 0;
        let _loc6_: any = null;
        let _loc4_: any = this.resolvePaintColor(param1);
        if (_loc4_.snapTransition == true) {
            return this.snapColorTarget(_loc4_.rgb >>> 0, null, param2);
        }
        _loc3_ = _loc4_.dynamicBandIndex == null ? null : _loc4_.dynamicBandIndex;
        if (_loc3_ == null) {
            return this.setColorTarget(_loc4_.rgb >>> 0, null, param2);
        }
        _loc5_ = this.resolveNextDynamicBandIndex(_loc3_ | 0);
        _loc6_ = _SafeCls_6080.resolveDynamicPaintBandRgb(stringOrNull(param1.color), _loc5_);
        return this.setColorTarget(Number(_loc6_ == null ? _loc4_.rgb : _loc6_ >>> 0) >>> 0, _loc5_, param2);
    }

    private setColorTarget(param1: number, param2: any, param3: number): boolean {
        let _loc4_: any = null;
        let _loc5_: number = (param1 & 0xFFFFFF) >>> 0;
        if (this._SafeStr_14513 == _loc5_ && this._SafeStr_14512 == param2) {
            return false;
        }
        _loc4_ = this._SafeStr_14512;
        this._color.setTarget(_loc5_, param3);
        this._SafeStr_14512 = param2;
        this._SafeStr_14513 = _loc5_ | 0;
        this._SafeStr_14514 = _loc4_ != null && param2 != null ? AnimatedPaintColor.sign((param2 | 0) - (_loc4_ | 0)) : 0;
        return true;
    }

    private snapColorTarget(param1: number, param2: any, param3: number): boolean {
        let _loc4_: number = (param1 & 0xFFFFFF) >>> 0;
        if (this._SafeStr_14513 == _loc4_ && this._SafeStr_14512 == param2 && this._color.value == _loc4_) {
            return false;
        }
        this._color.snapTo(_loc4_, param3);
        this._SafeStr_14512 = param2;
        this._SafeStr_14513 = _loc4_ | 0;
        this._SafeStr_14514 = 0;
        return true;
    }

    private resolveNextDynamicBandIndex(param1: number): number {
        let _loc2_: number = 0;
        if (this._SafeStr_14512 == null) {
            return param1;
        }
        if (param1 == (this._SafeStr_14512 | 0)) {
            return this._SafeStr_14512 | 0;
        }
        _loc2_ = AnimatedPaintColor.sign(param1 - (this._SafeStr_14512 | 0));
        if (!this.isAtTarget() && _loc2_ == this._SafeStr_14514) {
            return this._SafeStr_14512 | 0;
        }
        if (!this.isAtTarget()) {
            return param1;
        }
        return (this._SafeStr_14512 | 0) + _loc2_;
    }

    private isAtTarget(): boolean {
        return this._color.value == this._SafeStr_14513;
    }

    private resolvePaintColor(param1: any): any {
        return _SafeCls_6080.resolveTargetPaintColor(stringOrNull(param1.color), param1.extra, Number(param1.progress), param1.statusExtra);
    }
}
