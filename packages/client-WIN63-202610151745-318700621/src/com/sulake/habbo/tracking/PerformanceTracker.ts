import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { HabboTracking } from '@/com/sulake/habbo/tracking/HabboTracking';
import { ExternalInterface } from '@habbo-pixi/runtime/external/ExternalInterface';
import { Capabilities } from '@habbo-pixi/runtime/system/Capabilities';
import { System } from '@habbo-pixi/runtime/system/System';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { GarbageMonitor } from '@/com/sulake/core/utils/debug/GarbageMonitor';
import { PerformanceLogMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/tracking/PerformanceLogMessageComposer';
import { Logger } from '@/com/sulake/habbo/Logger';
import { GarbageTester } from '@/com/sulake/habbo/tracking/GarbageTester';

export class PerformanceTracker {
    static { registerClassName(this, 'com.sulake.habbo.tracking::PerformanceTracker'); }

    private _counter: number = 0;
    private _averageUpdateInterval: number = 0;
    private _SafeStr_4662: string = "";
    private _flashVersion: string = "";
    private _operatingSystem: string = "";
    private _SafeStr_7483: string = "";
    private _SafeStr_6663: boolean = false;
    private _SafeStr_5750: GarbageMonitor = null;
    private _SafeStr_4275: number = 0;
    private _SafeStr_4312: number = 0;
    private _lastReport: number = 0;
    private _SafeStr_5096: number = 0;
    private _SafeStr_7154: number = 0;

    declare private _habboTracking: HabboTracking;

    constructor(param1: HabboTracking) {
        this._habboTracking = param1;
        this._flashVersion = Capabilities.version;
        this._operatingSystem = Capabilities.os;
        this._SafeStr_6663 = Capabilities.isDebugger;
        try {
            this._SafeStr_4662 = stringOrNull(ExternalInterface.available ? ExternalInterface.call("window.navigator.userAgent.toString") : "unknown");
        } catch (e) {
        }
        if (this._SafeStr_4662 == null) {
            this._SafeStr_4662 = "unknown";
        }
        this._SafeStr_5750 = new GarbageMonitor();
        this.updateGarbageMonitor();
        this._lastReport = getTimer();
    }

    private static differenceInPercents(param1: number, param2: number): number {
        if (param1 == param2) {
            return 0;
        }
        let _loc4_: number = param1;
        let _loc3_: number = param2;
        if (param2 > param1) {
            _loc4_ = param2;
            _loc3_ = param1;
        }
        return 100 * (1 - _loc3_ / _loc4_);
    }

    public get flashVersion(): string {
        return this._flashVersion;
    }

    public get averageUpdateInterval(): number {
        return this._averageUpdateInterval | 0;
    }

    private updateGarbageMonitor(): any {
        let _loc2_: any = null;
        let _loc1_: any[] = this._SafeStr_5750.list;
        if (_loc1_ == null || _loc1_.length == 0) {
            _loc2_ = new GarbageTester("tester");
            this._SafeStr_5750.insert(_loc2_, "tester");
            return _loc2_;
        }
        return null;
    }

    public update(param1: number, param2: number): void {
        let _loc7_: any = null;
        let _loc3_: number = NaN;
        let _loc4_: any = 0;
        let _loc6_: boolean = false;
        let _loc5_: number = NaN;
        if (this.isGarbageMonitored) {
            _loc7_ = this.updateGarbageMonitor();
            if (_loc7_ != null) {
                this._SafeStr_4275 = this._SafeStr_4275 + 1;
                Logger.log("Garbage collection");
            }
        }
        let _loc8_: boolean = false;
        if (param1 > this.slowUpdateLimit) {
            this._SafeStr_4312 = this._SafeStr_4312 + 1;
            _loc8_ = true;
        } else {
            this._counter = this._counter + 1;
            if (this._counter <= 1) {
                this._averageUpdateInterval = param1;
            } else {
                _loc3_ = this._counter;
                this._averageUpdateInterval = this._averageUpdateInterval * (_loc3_ - 1) / _loc3_ + param1 / _loc3_;
            }
        }
        if (param2 - this._lastReport > this.reportInterval * 1000 && this._SafeStr_5096 < this.reportLimit) {
            _loc4_ = System.totalMemory;
            Logger.log("*** Performance tracker: average frame rate " + 1000 / this._averageUpdateInterval + "/s, system memory usage : " + _loc4_ + " bytes");
            _loc6_ = true;
            if (this.useDistribution && this._SafeStr_5096 > 0) {
                _loc5_ = PerformanceTracker.differenceInPercents(this._SafeStr_7154, this._averageUpdateInterval);
                if (_loc5_ < this.meanDevianceLimit) {
                    _loc6_ = false;
                }
            }
            this._lastReport = param2;
            if (_loc6_ || _loc8_) {
                this._SafeStr_7154 = this._averageUpdateInterval;
                this.sendReport(param2);
                this._SafeStr_5096 = this._SafeStr_5096 + 1;
            }
        }
    }

    private sendReport(param1: number): void {
        let _loc4_: number = param1 / 1000 | 0;
        let _loc3_: number = -1;
        let _loc2_: number = System.totalMemory / 1024 | 0;
        this._habboTracking.send(new PerformanceLogMessageComposer(_loc4_, this._SafeStr_4662, this._flashVersion, this._operatingSystem, this._SafeStr_7483, this._SafeStr_6663, _loc2_, _loc3_, this._SafeStr_4275, this._averageUpdateInterval | 0, this._SafeStr_4312));
        this._SafeStr_4275 = 0;
        this._averageUpdateInterval = 0;
        this._counter = 0;
        this._SafeStr_4312 = 0;
    }

    private get isGarbageMonitored(): boolean {
        return this._habboTracking.getBoolean("monitor.garbage.collection");
    }

    private get slowUpdateLimit(): number {
        return this._habboTracking.getInteger("performancetest.slowupdatelimit", 1000);
    }

    private get reportInterval(): number {
        return this._habboTracking.getInteger("performancetest.interval", 60);
    }

    private get reportLimit(): number {
        return this._habboTracking.getInteger("performancetest.reportlimit", 10);
    }

    private get meanDevianceLimit(): number {
        return this._habboTracking.propertyExists("performancetest.distribution.deviancelimit.percent") ? Number(this._habboTracking.getProperty("performancetest.distribution.deviancelimit.percent")) : 10;
    }

    private get useDistribution(): boolean {
        return this._habboTracking.getBoolean("performancetest.distribution.enabled");
    }
}
