import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Event } from '@habbo-pixi/runtime/events/Event';
import { EventDispatcher } from '@habbo-pixi/runtime/events/EventDispatcher';
import { IAnimatable } from '@/com/sulake/habbo/utils/animation/IAnimatable';

export class DelayedCall extends EventDispatcher implements IAnimatable {
    static { registerClassName(this, 'com.sulake.habbo.utils.animation::DelayedCall'); }

    private static _SafeStr_5403: DelayedCall[] = new Array<DelayedCall>(0).fill(null);

    public static fromPool(param1: (...args: any[]) => any, param2: number, param3: any[] = null): DelayedCall {
        if (DelayedCall._SafeStr_5403.length) {
            return DelayedCall._SafeStr_5403.pop().reset(param1, param2, param3);
        }
        return new DelayedCall(param1, param2, param3);
    }

    public static toPool(param1: DelayedCall): void {
        param1._SafeStr_5310 = null;
        param1._SafeStr_5341 = null;
        param1.removeEventListeners();
        DelayedCall._SafeStr_5403.push(param1);
    }

    constructor(param1: (...args: any[]) => any, param2: number, param3: any[] = null) {
        super();
        this.reset(param1, param2, param3);
    }

    declare private mCurrentTime: number;
    static { (this.prototype as any).mCurrentTime = NaN; }

    declare private mTotalTime: number;
    static { (this.prototype as any).mTotalTime = NaN; }

    declare private _SafeStr_5310: (...args: any[]) => any;

    declare private _SafeStr_5341: any[];

    declare private _repeatCount: number;
    static { (this.prototype as any)._repeatCount = 0; }

    public get isComplete(): boolean {
        return this._repeatCount == 1 && this.mCurrentTime >= this.mTotalTime;
    }

    public get totalTime(): number {
        return this.mTotalTime;
    }

    public get currentTime(): number {
        return this.mCurrentTime;
    }

    public get repeatCount(): number {
        return this._repeatCount;
    }

    public set repeatCount(param1: number) {
        this._repeatCount = param1;
    }

    public reset(param1: (...args: any[]) => any, param2: number, param3: any[] = null): DelayedCall {
        this.mCurrentTime = 0;
        this.mTotalTime = Math.max(param2, 0.0001);
        this._SafeStr_5310 = param1;
        this._SafeStr_5341 = param3;
        this._repeatCount = 1;
        return this;
    }

    public advanceTime(param1: number): void {
        let _loc2_: (...args: any[]) => any = null;
        let _loc3_: any[] = null;
        let _loc4_: number = this.mCurrentTime;
        this.mCurrentTime += param1;
        if (this.mCurrentTime > this.mTotalTime) {
            this.mCurrentTime = this.mTotalTime;
        }
        if (_loc4_ < this.mTotalTime && this.mCurrentTime >= this.mTotalTime) {
            if (this._repeatCount == 0 || this._repeatCount > 1) {
                Reflect.apply(this._SafeStr_5310, null, this._SafeStr_5341);
                if (this._repeatCount > 0) {
                    this._repeatCount -= 1;
                }
                this.mCurrentTime = 0;
                this.advanceTime(_loc4_ + param1 - this.mTotalTime);
            } else {
                _loc2_ = this._SafeStr_5310;
                _loc3_ = this._SafeStr_5341;
                this.dispatchEvent(new Event("REMOVE_FROM_JUGGLER"));
                Reflect.apply(_loc2_, null, _loc3_);
            }
        }
    }

    public complete(): void {
        let _loc1_: number = this.mTotalTime - this.mCurrentTime;
        if (_loc1_ > 0) {
            this.advanceTime(_loc1_);
        }
    }

    private removeEventListeners(): void {
    }

    get [IAnimatable](): true {
        return true;
    }
}
