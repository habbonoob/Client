import { asGuarded, isFunction, isNumber } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Event } from '@habbo-pixi/runtime/events/Event';
import { EventDispatcher } from '@habbo-pixi/runtime/events/EventDispatcher';
import { ArgumentError } from '@habbo-pixi/runtime/lang/ArgumentError';
import { IAnimatable } from '@/com/sulake/habbo/utils/animation/IAnimatable';
import { Transitions } from '@/com/sulake/habbo/utils/animation/Transitions';

export class Tween extends EventDispatcher implements IAnimatable {
    static { registerClassName(this, 'com.sulake.habbo.utils.animation::Tween'); }

    private static readonly HINT_MARKER: string = "#";
    private static _SafeStr_5200: Tween[] = new Array<Tween>(0).fill(null);

    declare private _target: any;

    declare private _transitionFunc: (...args: any[]) => any;

    declare private mTransitionName: string;

    declare private mProperties: string[];

    declare private mStartValues: number[];

    declare private mEndValues: number[];

    declare private _SafeStr_4615: ((...args: any[]) => any)[];

    declare private _onStart: (...args: any[]) => any;

    declare private mOnUpdate: (...args: any[]) => any;

    declare private mOnRepeat: (...args: any[]) => any;

    declare private _onComplete: (...args: any[]) => any;

    declare private _onStartArgs: any[];

    declare private _onUpdateArgs: any[];

    declare private _onRepeatArgs: any[];

    declare private _onCompleteArgs: any[];

    declare private mTotalTime: number;
    static { (this.prototype as any).mTotalTime = NaN; }

    declare private mCurrentTime: number;
    static { (this.prototype as any).mCurrentTime = NaN; }

    declare private mProgress: number;
    static { (this.prototype as any).mProgress = NaN; }

    declare private _SafeStr_4429: number;
    static { (this.prototype as any)._SafeStr_4429 = NaN; }

    declare private _roundToInt: boolean;
    static { (this.prototype as any)._roundToInt = false; }

    declare private mNextTween: Tween;

    declare private _repeatCount: number;
    static { (this.prototype as any)._repeatCount = 0; }

    declare private _repeatDelay: number;
    static { (this.prototype as any)._repeatDelay = NaN; }

    declare private _reverse: boolean;
    static { (this.prototype as any)._reverse = false; }

    declare private _SafeStr_3139: number;
    static { (this.prototype as any)._SafeStr_3139 = 0; }

    private readonly REMOVE_FROM_JUGGLER: string = "REMOVE_FROM_JUGGLER";

    constructor(param1: any, param2: number, param3: any = "linear") {
        super();
        this.reset(param1, param2, param3);
    }

    public static getPropertyHint(param1: string): string {
        if (param1.indexOf("color") != -1 || param1.indexOf("Color") != -1) {
            return "rgb";
        }
        let _loc2_: number = param1.indexOf("#");
        if (_loc2_ != -1) {
            return param1.substr(_loc2_ + 1);
        }
        return null;
    }

    public static getPropertyName(param1: string): string {
        let _loc2_: number = param1.indexOf("#");
        if (_loc2_ != -1) {
            return param1.substring(0, _loc2_);
        }
        return param1;
    }

    public static fromPool(param1: any, param2: number, param3: any = "linear"): Tween {
        if (Tween._SafeStr_5200.length) {
            return Tween._SafeStr_5200.pop().reset(param1, param2, param3);
        }
        return new Tween(param1, param2, param3);
    }

    public static toPool(param1: Tween): void {
        param1._onStart = param1.mOnUpdate = param1.mOnRepeat = param1._onComplete = null;
        param1._onStartArgs = param1._onUpdateArgs = param1._onRepeatArgs = param1._onCompleteArgs = null;
        param1._target = null;
        param1._transitionFunc = null;
        Tween._SafeStr_5200.push(param1);
    }

    public reset(param1: any, param2: number, param3: any = "linear"): Tween {
        this._target = param1;
        this.mCurrentTime = 0;
        this.mTotalTime = Math.max(0.0001, param2);
        this.mProgress = 0;
        this._SafeStr_4429 = this._repeatDelay = 0;
        this._onStart = this.mOnUpdate = this.mOnRepeat = this._onComplete = null;
        this._onStartArgs = this._onUpdateArgs = this._onRepeatArgs = this._onCompleteArgs = null;
        this._roundToInt = this._reverse = false;
        this._repeatCount = 1;
        this._SafeStr_3139 = -1;
        this.mNextTween = null;
        if (typeof param3 === "string") {
            this.transition = typeof param3 === "string" ? param3 : null;
        } else {
            if (!(typeof param3 === "function")) {
                throw new ArgumentError("Transition must be either a string or a function");
            }
            this.transitionFunc = typeof param3 === "function" ? param3 : null;
        }
        if (this.mProperties) {
            this.mProperties.length = 0;
        } else {
            this.mProperties = new Array<string>(0).fill(null);
        }
        if (this.mStartValues) {
            this.mStartValues.length = 0;
        } else {
            this.mStartValues = new Array<number>(0).fill(NaN);
        }
        if (this.mEndValues) {
            this.mEndValues.length = 0;
        } else {
            this.mEndValues = new Array<number>(0).fill(NaN);
        }
        if (this._SafeStr_4615) {
            this._SafeStr_4615.length = 0;
        } else {
            this._SafeStr_4615 = new Array<(...args: any[]) => any>(0).fill(null);
        }
        return this;
    }

    public animate(param1: string, param2: number): void {
        if (this._target == null) {
            return;
        }
        let _loc3_: number = this.mProperties.length | 0;
        let _loc4_: (...args: any[]) => any = this.getUpdateFuncFromProperty(param1);
        this.mProperties[_loc3_] = Tween.getPropertyName(param1);
        this.mStartValues[_loc3_] = NaN;
        this.mEndValues[_loc3_] = param2;
        this._SafeStr_4615[_loc3_] = _loc4_;
    }

    public scaleTo(param1: number): void {
        this.animate("scaleX", param1);
        this.animate("scaleY", param1);
    }

    public moveTo(param1: number, param2: number): void {
        this.animate("x", param1);
        this.animate("y", param2);
    }

    public fadeTo(param1: number): void {
        this.animate("alpha", param1);
    }

    public rotateTo(param1: number, param2: string = "rad"): void {
        this.animate("rotation#" + param2, param1);
    }

    public advanceTime(param1: number): void {
        let _loc6_: number = 0;
        let _loc7_: (...args: any[]) => any = null;
        let _loc5_: (...args: any[]) => any = null;
        let _loc8_: any[] = null;
        if (param1 == 0 || this._repeatCount == 1 && this.mCurrentTime == this.mTotalTime) {
            return;
        }
        let _loc3_: number = this.mCurrentTime;
        let _loc2_: number = this.mTotalTime - this.mCurrentTime;
        let _loc10_: number = param1 > _loc2_ ? param1 - _loc2_ : 0;
        this.mCurrentTime += param1;
        if (this.mCurrentTime <= 0) {
            return;
        }
        if (this.mCurrentTime > this.mTotalTime) {
            this.mCurrentTime = this.mTotalTime;
        }
        if (this._SafeStr_3139 < 0 && _loc3_ <= 0 && this.mCurrentTime > 0) {
            this._SafeStr_3139 = this._SafeStr_3139 + 1;
            if (this._onStart != null) {
                Reflect.apply(this._onStart, this, this._onStartArgs);
            }
        }
        let _loc11_: number = this.mCurrentTime / this.mTotalTime;
        let _loc9_: boolean = this._reverse && this._SafeStr_3139 % 2 == 1;
        let _loc4_: number = this.mStartValues.length | 0;
        this.mProgress = Number(_loc9_ ? this._transitionFunc(1 - _loc11_) : this._transitionFunc(_loc11_));
        _loc6_ = 0;
        while (_loc6_ < _loc4_) {
            if (this.mStartValues[_loc6_] != this.mStartValues[_loc6_]) {
                this.mStartValues[_loc6_] = asGuarded(this._target[this.mProperties[_loc6_]], isNumber);
            }
            _loc7_ = asGuarded(this._SafeStr_4615[_loc6_], isFunction);
            _loc7_(this.mProperties[_loc6_], this.mStartValues[_loc6_], this.mEndValues[_loc6_]);
            _loc6_++;
        }
        if (this.mOnUpdate != null) {
            Reflect.apply(this.mOnUpdate, this, this._onUpdateArgs);
        }
        if (_loc3_ < this.mTotalTime && this.mCurrentTime >= this.mTotalTime) {
            if (this._repeatCount == 0 || this._repeatCount > 1) {
                this.mCurrentTime = -this._repeatDelay;
                this._SafeStr_3139 = this._SafeStr_3139 + 1;
                if (this._repeatCount > 1) {
                    this._repeatCount = this._repeatCount - 1;
                }
                if (this.mOnRepeat != null) {
                    Reflect.apply(this.mOnRepeat, this, this._onRepeatArgs);
                }
            } else {
                _loc5_ = this._onComplete;
                _loc8_ = this._onCompleteArgs;
                this.dispatchEvent(new Event("REMOVE_FROM_JUGGLER"));
                if (_loc5_ != null) {
                    Reflect.apply(_loc5_, this, _loc8_);
                }
                if (this.mCurrentTime == 0) {
                    _loc10_ = 0;
                }
            }
        }
        if (_loc10_) {
            this.advanceTime(_loc10_);
        }
    }

    private getUpdateFuncFromProperty(param1: string): (...args: any[]) => any {
        let _loc3_: (...args: any[]) => any = null;
        let _loc2_: string = Tween.getPropertyHint(param1);
        switch (_loc2_) {
            case null:
                _loc3_ = this.updateStandard;
                break;
            case "rgb":
                _loc3_ = this.updateRgb;
                break;
            case "rad":
                _loc3_ = this.updateRad;
                break;
            case "deg":
                _loc3_ = this.updateDeg;
                break;
            default:
                _loc3_ = this.updateStandard;
        }
        return _loc3_;
    }

    private updateStandard = (param1: string, param2: number, param3: number): void => {
        let _loc4_: number = param2 + this.mProgress * (param3 - param2);
        if (this._roundToInt) {
            _loc4_ = Number(Math.round(_loc4_));
        }
        this._target[param1] = _loc4_;
    };

    private updateRgb = (param1: string, param2: number, param3: number): void => {
        let _loc11_: number = param2 >>> 0;
        let _loc6_: number = param3 >>> 0;
        let _loc13_: number = (_loc11_ >> 24 & 0xFF) >>> 0;
        let _loc17_: number = (_loc11_ >> 16 & 0xFF) >>> 0;
        let _loc7_: number = (_loc11_ >> 8 & 0xFF) >>> 0;
        let _loc10_: number = (_loc11_ & 0xFF) >>> 0;
        let _loc9_: number = (_loc6_ >> 24 & 0xFF) >>> 0;
        let _loc16_: number = (_loc6_ >> 16 & 0xFF) >>> 0;
        let _loc5_: number = (_loc6_ >> 8 & 0xFF) >>> 0;
        let _loc8_: number = (_loc6_ & 0xFF) >>> 0;
        let _loc14_: number = _loc13_ + (_loc9_ - _loc13_) * this.mProgress >>> 0;
        let _loc4_: number = _loc17_ + (_loc16_ - _loc17_) * this.mProgress >>> 0;
        let _loc15_: number = _loc7_ + (_loc5_ - _loc7_) * this.mProgress >>> 0;
        let _loc12_: number = _loc10_ + (_loc8_ - _loc10_) * this.mProgress >>> 0;
        this._target[param1] = _loc14_ << 24 | _loc4_ << 16 | _loc15_ << 8 | _loc12_;
    };

    private updateRad = (param1: string, param2: number, param3: number): void => {
        this.updateAngle(3.141592653589793, param1, param2, param3);
    };

    private updateDeg = (param1: string, param2: number, param3: number): void => {
        this.updateAngle(180, param1, param2, param3);
    };

    private updateAngle(param1: number, param2: string, param3: number, param4: number): void {
        while (Math.abs(param4 - param3) > param1) {
            if (param3 < param4) {
                param4 -= 2 * param1;
            } else {
                param4 += 2 * param1;
            }
        }
        this.updateStandard(param2, param3, param4);
    }

    public getEndValue(param1: string): number {
        let _loc2_: number = this.mProperties.indexOf(param1);
        if (_loc2_ == -1) {
            throw new ArgumentError("The property \'" + param1 + "\' is not animated");
        }
        return asGuarded(this.mEndValues[_loc2_], isNumber);
    }

    public get isComplete(): boolean {
        return this.mCurrentTime >= this.mTotalTime && this._repeatCount == 1;
    }

    public get target(): any {
        return this._target;
    }

    public get transition(): string {
        return this.mTransitionName;
    }

    public set transition(param1: string) {
        this.mTransitionName = param1;
        this._transitionFunc = Transitions.getTransition(param1);
        if (this._transitionFunc == null) {
            throw new ArgumentError("Invalid transiton: " + param1);
        }
    }

    public get transitionFunc(): (...args: any[]) => any {
        return this._transitionFunc;
    }

    public set transitionFunc(param1: (...args: any[]) => any) {
        this.mTransitionName = "custom";
        this._transitionFunc = param1;
    }

    public get totalTime(): number {
        return this.mTotalTime;
    }

    public get currentTime(): number {
        return this.mCurrentTime;
    }

    public get progress(): number {
        return this.mProgress;
    }

    public get delay(): number {
        return this._SafeStr_4429;
    }

    public set delay(param1: number) {
        this.mCurrentTime = this.mCurrentTime + this._SafeStr_4429 - param1;
        this._SafeStr_4429 = param1;
    }

    public get repeatCount(): number {
        return this._repeatCount;
    }

    public set repeatCount(param1: number) {
        this._repeatCount = param1;
    }

    public get repeatDelay(): number {
        return this._repeatDelay;
    }

    public set repeatDelay(param1: number) {
        this._repeatDelay = param1;
    }

    public get reverse(): boolean {
        return this._reverse;
    }

    public set reverse(param1: boolean) {
        this._reverse = param1;
    }

    public get roundToInt(): boolean {
        return this._roundToInt;
    }

    public set roundToInt(param1: boolean) {
        this._roundToInt = param1;
    }

    public get onStart(): (...args: any[]) => any {
        return this._onStart;
    }

    public set onStart(param1: (...args: any[]) => any) {
        this._onStart = param1;
    }

    public get onUpdate(): (...args: any[]) => any {
        return this.mOnUpdate;
    }

    public set onUpdate(param1: (...args: any[]) => any) {
        this.mOnUpdate = param1;
    }

    public get onRepeat(): (...args: any[]) => any {
        return this.mOnRepeat;
    }

    public set onRepeat(param1: (...args: any[]) => any) {
        this.mOnRepeat = param1;
    }

    public get onComplete(): (...args: any[]) => any {
        return this._onComplete;
    }

    public set onComplete(param1: (...args: any[]) => any) {
        this._onComplete = param1;
    }

    public get onStartArgs(): any[] {
        return this._onStartArgs;
    }

    public set onStartArgs(param1: any[]) {
        this._onStartArgs = param1;
    }

    public get onUpdateArgs(): any[] {
        return this._onUpdateArgs;
    }

    public set onUpdateArgs(param1: any[]) {
        this._onUpdateArgs = param1;
    }

    public get onRepeatArgs(): any[] {
        return this._onRepeatArgs;
    }

    public set onRepeatArgs(param1: any[]) {
        this._onRepeatArgs = param1;
    }

    public get onCompleteArgs(): any[] {
        return this._onCompleteArgs;
    }

    public set onCompleteArgs(param1: any[]) {
        this._onCompleteArgs = param1;
    }

    public get nextTween(): Tween {
        return this.mNextTween;
    }

    public set nextTween(param1: Tween) {
        this.mNextTween = param1;
    }

    get [IAnimatable](): true {
        return true;
    }
}
