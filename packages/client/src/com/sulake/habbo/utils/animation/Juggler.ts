import { asGuarded, asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { keysOf } from '@habbo-pixi/runtime/lang/iterate';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { EventDispatcher } from '@habbo-pixi/runtime/events/EventDispatcher';
import { ArgumentError } from '@habbo-pixi/runtime/lang/ArgumentError';
import { DelayedCall } from '@/com/sulake/habbo/utils/animation/DelayedCall';
import { IAnimatable, isIAnimatable } from '@/com/sulake/habbo/utils/animation/IAnimatable';
import { Tween } from '@/com/sulake/habbo/utils/animation/Tween';

export class Juggler implements IAnimatable {
    static { registerClassName(this, 'com.sulake.habbo.utils.animation::Juggler'); }

    public static readonly REMOVE_FROM_JUGGLER: string = "REMOVE_FROM_JUGGLER";

    constructor() {
        this.mElapsedTime = 0;
        this._SafeStr_2275 = new Array<IAnimatable>(0).fill(null);
    }

    declare private _SafeStr_2275: IAnimatable[];

    declare private mElapsedTime: number;
    static { (this.prototype as any).mElapsedTime = NaN; }

    public get elapsedTime(): number {
        return this.mElapsedTime;
    }

    protected get objects(): IAnimatable[] {
        return this._SafeStr_2275;
    }

    public add(param1: IAnimatable): void {
        let _loc2_: EventDispatcher = null;
        if (param1 && this._SafeStr_2275.indexOf(param1) == -1) {
            this._SafeStr_2275[this._SafeStr_2275.length] = param1;
            _loc2_ = param1 instanceof EventDispatcher ? param1 : null;
            if (_loc2_) {
                _loc2_.addEventListener("REMOVE_FROM_JUGGLER", this.onRemove);
            }
        }
    }

    public contains(param1: IAnimatable): boolean {
        return this._SafeStr_2275.indexOf(param1) != -1;
    }

    public remove(param1: IAnimatable): void {
        if (param1 == null) {
            return;
        }
        let _loc3_: EventDispatcher = param1 instanceof EventDispatcher ? param1 : null;
        if (_loc3_) {
            _loc3_.removeEventListener("REMOVE_FROM_JUGGLER", this.onRemove);
        }
        let _loc2_: number = this._SafeStr_2275.indexOf(param1);
        if (_loc2_ != -1) {
            this._SafeStr_2275[_loc2_] = null;
        }
    }

    public removeTweens(param1: any): void {
        let _loc3_: number = 0;
        let _loc2_: Tween = null;
        if (param1 == null) {
            return;
        }
        _loc3_ = this._SafeStr_2275.length - 1;
        while (_loc3_ >= 0) {
            _loc2_ = asInstanceOf(this._SafeStr_2275[_loc3_], Tween);
            if (_loc2_ && _loc2_.target == param1) {
                _loc2_.removeEventListener("REMOVE_FROM_JUGGLER", this.onRemove);
                this._SafeStr_2275[_loc3_] = null;
            }
            _loc3_--;
        }
    }

    public containsTweens(param1: any): boolean {
        let _loc3_: number = 0;
        let _loc2_: Tween = null;
        if (param1 == null) {
            return false;
        }
        _loc3_ = this._SafeStr_2275.length - 1;
        while (_loc3_ >= 0) {
            _loc2_ = asInstanceOf(this._SafeStr_2275[_loc3_], Tween);
            if (_loc2_ && _loc2_.target == param1) {
                return true;
            }
            _loc3_--;
        }
        return false;
    }

    public purge(): void {
        let _loc1_: number = 0;
        let _loc2_: EventDispatcher = null;
        _loc1_ = this._SafeStr_2275.length - 1;
        while (_loc1_ >= 0) {
            _loc2_ = asInstanceOf(this._SafeStr_2275[_loc1_], EventDispatcher);
            if (_loc2_) {
                _loc2_.removeEventListener("REMOVE_FROM_JUGGLER", this.onRemove);
            }
            this._SafeStr_2275[_loc1_] = null;
            _loc1_--;
        }
    }

    public delayCall(param1: (...args: any[]) => any, param2: number, ...rest: any[]): IAnimatable {
        if (param1 == null) {
            return null;
        }
        let _loc4_: DelayedCall = DelayedCall.fromPool(param1, param2, rest);
        _loc4_.addEventListener("REMOVE_FROM_JUGGLER", this.onPooledDelayedCallComplete);
        this.add(_loc4_);
        return _loc4_;
    }

    public repeatCall(param1: (...args: any[]) => any, param2: number, param3: number = 0, ...rest: any[]): IAnimatable {
        if (param1 == null) {
            return null;
        }
        let _loc5_: DelayedCall = DelayedCall.fromPool(param1, param2, rest);
        _loc5_.repeatCount = param3;
        _loc5_.addEventListener("REMOVE_FROM_JUGGLER", this.onPooledDelayedCallComplete);
        this.add(_loc5_);
        return _loc5_;
    }

    public tween(param1: any, param2: number, param3: any): IAnimatable {
        let _loc6_: any = null;
        if (param1 == null) {
            throw new ArgumentError("target must not be null");
        }
        let _loc4_: Tween = Tween.fromPool(param1, param2);
        for (const _loc5_ of keysOf(param3)) {
            _loc6_ = param3[_loc5_];
            if (_loc4_.hasOwnProperty(_loc5_)) {
                _loc4_[_loc5_] = _loc6_;
            } else {
                if (!param1.hasOwnProperty(Tween.getPropertyName(stringOrNull(_loc5_)))) {
                    throw new ArgumentError("Invalid property: " + _loc5_);
                }
                _loc4_.animate(stringOrNull(_loc5_), typeof _loc6_ === "number" ? _loc6_ : null);
            }
        }
        _loc4_.addEventListener("REMOVE_FROM_JUGGLER", this.onPooledTweenComplete);
        this.add(_loc4_);
        return _loc4_;
    }

    public advanceTime(param1: number): void {
        let _loc2_: number = 0;
        let _loc5_: IAnimatable = null;
        let _loc4_: number = this._SafeStr_2275.length | 0;
        let _loc3_: number = 0;
        this.mElapsedTime += param1;
        if (_loc4_ == 0) {
            return;
        }
        _loc2_ = 0;
        while (_loc2_ < _loc4_) {
            _loc5_ = this._SafeStr_2275[_loc2_];
            if (_loc5_) {
                if (_loc3_ != _loc2_) {
                    this._SafeStr_2275[_loc3_] = _loc5_;
                    this._SafeStr_2275[_loc2_] = null;
                }
                _loc5_.advanceTime(param1);
                _loc3_++;
            }
            _loc2_++;
        }
        if (_loc3_ != _loc2_) {
            _loc4_ = this._SafeStr_2275.length | 0;
            while (_loc2_ < _loc4_) {
                this._SafeStr_2275[_loc3_++] = this._SafeStr_2275[_loc2_++];
            }
            this._SafeStr_2275.length = _loc3_ >>> 0;
        }
    }

    private onPooledDelayedCallComplete = (param1: Event): void => {
        DelayedCall.toPool(asInstanceOf(param1.target, DelayedCall));
    };

    private onPooledTweenComplete = (param1: Event): void => {
        Tween.toPool(asInstanceOf(param1.target, Tween));
    };

    private onRemove = (param1: Event): void => {
        this.remove(asGuarded(param1.target, isIAnimatable));
        let _loc2_: Tween = asInstanceOf(param1.target, Tween);
        if (_loc2_ && _loc2_.isComplete) {
            this.add(_loc2_.nextTween);
        }
    };

    get [IAnimatable](): true {
        return true;
    }
}
