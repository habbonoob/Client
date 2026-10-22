import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { HabboTracking } from '@/com/sulake/habbo/tracking/HabboTracking';

export class FramerateTracker {
    static { registerClassName(this, 'com.sulake.habbo.tracking::FramerateTracker'); }

    declare private _lastReport: number;
    static { (this.prototype as any)._lastReport = 0; }

    declare private _SafeStr_3538: number;
    static { (this.prototype as any)._SafeStr_3538 = 0; }

    declare private _averageUpdateInterval: number;
    static { (this.prototype as any)._averageUpdateInterval = NaN; }

    declare private _SafeStr_5896: number;
    static { (this.prototype as any)._SafeStr_5896 = 0; }

    declare private _habboTracking: HabboTracking;

    constructor(param1: HabboTracking) {
        this._habboTracking = param1;
    }

    public get frameRate(): number {
        return Math.round(1000 / this._averageUpdateInterval) | 0;
    }

    public trackUpdate(param1: number, param2: number): void {
        let _loc3_: number = NaN;
        this._SafeStr_3538 = this._SafeStr_3538 + 1;
        if (this._SafeStr_3538 == 1) {
            this._averageUpdateInterval = param1;
            this._lastReport = param2;
        } else {
            _loc3_ = this._SafeStr_3538;
            this._averageUpdateInterval = this._averageUpdateInterval * (_loc3_ - 1) / _loc3_ + param1 / _loc3_;
        }
        if (param2 - this._lastReport >= this._habboTracking.getInteger("tracking.framerate.reportInterval.seconds", 300) * 1000) {
            this._SafeStr_3538 = 0;
            if (this._SafeStr_5896 < this._habboTracking.getInteger("tracking.framerate.maximumEvents", 5)) {
                this._habboTracking.trackGoogle("performance", "averageFramerate", this.frameRate);
                this._SafeStr_5896 = this._SafeStr_5896 + 1;
                this._lastReport = param2;
            }
        }
    }
}
