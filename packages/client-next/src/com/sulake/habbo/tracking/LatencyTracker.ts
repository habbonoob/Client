import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { LatencyPingResponseMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/tracking/LatencyPingResponseMessageEvent';
import type { LatencyPingResponseMessageParser } from '@/com/sulake/habbo/communication/messages/parser/tracking/LatencyPingResponseMessageParser';
import type { HabboTracking } from '@/com/sulake/habbo/tracking/HabboTracking';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { LatencyPingReportMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/tracking/LatencyPingReportMessageComposer';
import { LatencyPingRequestMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/tracking/LatencyPingRequestMessageComposer';

export class LatencyTracker implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.tracking::LatencyTracker'); }

    private _state: boolean = false;
    private _SafeStr_4862: number = 0;
    private _SafeStr_5907: number = 0;
    private _SafeStr_5547: number = 0;
    private _SafeStr_7214: number = 0;
    private _lastTestTime: number = 0;
    private _SafeStr_5731: number = 0;
    private _SafeStr_14712: number = -1;

    declare private _latencyValues: any[];

    declare private _SafeStr_3236: UtilsMap;

    declare private _habboTracking: HabboTracking;

    constructor(param1: HabboTracking) {
        this._habboTracking = param1;
    }

    public dispose(): void {
        if (this.disposed) {
            return;
        }
        this._state = false;
        if (this._SafeStr_3236 != null) {
            this._SafeStr_3236.dispose();
            this._SafeStr_3236 = null;
        }
        this._latencyValues = null;
        this._habboTracking = null;
    }

    public init(): void {
        this._SafeStr_5907 = this._habboTracking.getInteger("latencytest.interval", 20000);
        this._SafeStr_5547 = this._habboTracking.getInteger("latencytest.report.index", 100);
        this._SafeStr_7214 = this._habboTracking.getInteger("latencytest.report.delta", 3);
        if (this._SafeStr_5907 < 1) {
            return;
        }
        this._SafeStr_3236 = new UtilsMap();
        this._latencyValues = [];
        this._state = true;
    }

    public update(param1: number, param2: number): void {
        if (!this._state) {
            return;
        }
        if (param2 - this._lastTestTime > this._SafeStr_5907) {
            this.testLatency();
        }
    }

    private testLatency(): void {
        this._lastTestTime = getTimer();
        this._SafeStr_3236.add(this._SafeStr_4862, this._lastTestTime);
        this._habboTracking.send(new LatencyPingRequestMessageComposer(this._SafeStr_4862));
        this._SafeStr_4862 = this._SafeStr_4862 + 1;
    }

    public onPingResponse(param1: LatencyPingResponseMessageEvent): void {
        let _loc7_: number = 0;
        let _loc2_: number = 0;
        let _loc10_: number = 0;
        let _loc8_: number = 0;
        let _loc5_: number = 0;
        let _loc3_: number = 0;
        let _loc11_: LatencyPingReportMessageComposer = null;
        if (this._SafeStr_3236 == null || this._latencyValues == null) {
            return;
        }
        let _loc4_: LatencyPingResponseMessageParser = param1.getParser();
        let _loc9_: number = this._SafeStr_3236.getValue(_loc4_.requestId) | 0;
        this._SafeStr_3236.remove(_loc4_.requestId);
        this._latencyValues.push(this._SafeStr_14712 = getTimer() - _loc9_);
        if (this._latencyValues.length == this._SafeStr_5547 && this._SafeStr_5547 > 0) {
            _loc7_ = 0;
            _loc2_ = 0;
            _loc10_ = 0;
            _loc8_ = 0;
            while (_loc8_ < this._latencyValues.length) {
                _loc7_ = _loc7_ + this._latencyValues[_loc8_] | 0;
                _loc8_++;
            }
            _loc5_ = _loc7_ / this._latencyValues.length | 0;
            _loc8_ = 0;
            while (_loc8_ < this._latencyValues.length) {
                if (this._latencyValues[_loc8_] < _loc5_ * 2) {
                    _loc2_ = _loc2_ + this._latencyValues[_loc8_] | 0;
                    _loc10_++;
                }
                _loc8_++;
            }
            if (_loc10_ == 0) {
                this._latencyValues = [];
                return;
            }
            _loc3_ = _loc2_ / _loc10_ | 0;
            if (Math.abs(_loc5_ - this._SafeStr_5731) > this._SafeStr_7214 || this._SafeStr_5731 == 0) {
                this._SafeStr_5731 = _loc5_;
                _loc11_ = new LatencyPingReportMessageComposer(_loc5_, _loc3_, this._latencyValues.length | 0);
                this._habboTracking.send(_loc11_);
            }
            this._latencyValues = [];
        }
    }

    public get disposed(): boolean {
        return this._habboTracking == null;
    }

    public get latestLatency(): number {
        return this._SafeStr_14712;
    }

    get [IDisposable](): true {
        return true;
    }
}
