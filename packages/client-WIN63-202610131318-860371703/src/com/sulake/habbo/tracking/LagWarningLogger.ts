import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { HabboTracking } from '@/com/sulake/habbo/tracking/HabboTracking';
import { LagWarningReportMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/tracking/LagWarningReportMessageComposer';

export class LagWarningLogger {
    static { registerClassName(this, 'com.sulake.habbo.tracking::LagWarningLogger'); }

    declare private _SafeStr_5846: number;
    static { (this.prototype as any)._SafeStr_5846 = 0; }

    declare private _SafeStr_4005: number;
    static { (this.prototype as any)._SafeStr_4005 = 0; }

    declare private _habboTracking: HabboTracking;

    constructor(param1: HabboTracking) {
        this._habboTracking = param1;
    }

    public chatLagDetected(param1: number): void {
        if (!this.enabled || this.warningInterval <= 0) {
            return;
        }
        this._SafeStr_4005 = this._SafeStr_4005 + 1;
        this.reportWarningsAsNeeded(param1);
    }

    public update(param1: number): void {
        this.reportWarningsAsNeeded(param1);
    }

    private reportWarningsAsNeeded(param1: number): void {
        let _loc2_: LagWarningReportMessageComposer = null;
        if (this._SafeStr_4005 == 0) {
            return;
        }
        if (this._SafeStr_5846 == 0 || param1 - this._SafeStr_5846 > this.warningInterval) {
            _loc2_ = new LagWarningReportMessageComposer(this._SafeStr_4005);
            this._habboTracking.send(_loc2_);
            this._SafeStr_5846 = param1;
            this._SafeStr_4005 = 0;
        }
    }

    private get enabled(): boolean {
        return this._habboTracking.getBoolean("lagWarningLog.enabled");
    }

    private get warningInterval(): number {
        return this._habboTracking.getInteger("lagWarningLog.interval.seconds", 10) * 1000;
    }
}
