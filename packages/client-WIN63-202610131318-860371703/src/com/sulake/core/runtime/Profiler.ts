import { castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import type { IUpdateReceiver } from '@/com/sulake/core/runtime/IUpdateReceiver';
import { Event } from '@habbo-pixi/runtime/events/Event';
import { System } from '@habbo-pixi/runtime/system/System';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { AssetLibrary, Component } from '@/com/sulake/core/runtime/Component.group';
import { isIDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { IProfiler } from '@/com/sulake/core/runtime/IProfiler';
import { isIUpdateReceiver } from '@/com/sulake/core/runtime/IUpdateReceiver';
import { ProfilerAgent } from '@/com/sulake/core/utils/profiler/ProfilerAgent';
import { TrackedBitmapData } from '@/com/sulake/core/utils/profiler/tracking/TrackedBitmapData';

export class Profiler extends Component implements IProfiler {
    static { registerClassName(this, 'com.sulake.core.runtime::Profiler'); }

    public static readonly PROFILER_START: string = "PROFILER_START";
    public static readonly PROFILER_STOP: string = "PROFILER_STOP";
    private _SafeStr_2831: Map<any, any> = new Dictionary();

    declare private _startTime: number;
    static { (this.prototype as any)._startTime = 0; }

    declare private _roundTime: number;
    static { (this.prototype as any)._roundTime = 0; }

    constructor(param1: IContext) {
        super(param1, 0, null);
    }

    public get numAssetLibraryInstances(): number {
        return AssetLibrary.numAssetLibraryInstances;
    }

    public get numBitmapAssetInstances(): number {
        return BitmapDataAsset.instances;
    }

    public get numAllocatedBitmapDataBytes(): number {
        return BitmapDataAsset.allocatedByteCount;
    }

    public get numTrackedBitmapDataInstances(): number {
        return TrackedBitmapData.numInstances;
    }

    public get numTrackedBitmapDataBytes(): number {
        return TrackedBitmapData.allocatedByteCount;
    }

    public override dispose(): void {
        let _loc1_: any = null;
        if (!this.disposed) {
            for (_loc1_ of this._SafeStr_2831?.keys() ?? []) {
                castGuarded(this._SafeStr_2831.get(_loc1_), isIDisposable, "com.sulake.core.runtime.IDisposable").dispose();
                this._SafeStr_2831.delete(_loc1_);
            }
            super.dispose();
        }
    }

    public gc(): void {
        System.pauseForGCIfCollectionImminent(0.25);
    }

    public start(): void {
        this.events.dispatchEvent(new Event("PROFILER_START", false, false));
        this._startTime = getTimer();
    }

    public stop(): void {
        this._roundTime = getTimer() - this._startTime;
        this.events.dispatchEvent(new Event("PROFILER_STOP", false, false));
    }

    public update(param1: IUpdateReceiver, param2: number): void {
        this.getProfilerAgentForReceiver(param1).update(param2 | 0);
    }

    public get numProfilerAgents(): number {
        let _loc1_: number = 0;
        for (const _loc2_ of this._SafeStr_2831?.keys() ?? []) {
            if (!castGuarded(_loc2_, isIDisposable, "com.sulake.core.runtime.IDisposable").disposed) {
                _loc1_++;
            }
        }
        return _loc1_;
    }

    public getProfilerAgentsInArray(): any[] {
        let _loc2_: IUpdateReceiver = null;
        let _loc1_: any[] = [];
        for (const _loc3_ of this._SafeStr_2831?.keys() ?? []) {
            _loc2_ = isIUpdateReceiver(_loc3_) ? _loc3_ : null;
            if (castGuarded(_loc3_, isIDisposable, "com.sulake.core.runtime.IDisposable").disposed) {
                castGuarded(this._SafeStr_2831.get(_loc3_), isIDisposable, "com.sulake.core.runtime.IDisposable").dispose();
                this._SafeStr_2831.delete(_loc3_);
            } else {
                _loc1_.push(this._SafeStr_2831.get(_loc3_));
            }
        }
        return _loc1_;
    }

    public getProfilerAgentForReceiver(param1: IUpdateReceiver): ProfilerAgent {
        let _loc2_: ProfilerAgent = this._SafeStr_2831.get(param1);
        return _loc2_ ?? this.addProfilerAgentForReceiver(param1);
    }

    public addProfilerAgentForReceiver(param1: IUpdateReceiver): ProfilerAgent {
        if (this._SafeStr_2831.get(param1) != null) {
            throw new Error("Profiler for receiver already exists!");
        }
        let _loc2_: ProfilerAgent = new ProfilerAgent(param1);
        this._SafeStr_2831.set(param1, _loc2_);
        return _loc2_;
    }

    public addStartEventListener(param1: (...args: any[]) => any): void {
        this.events.addEventListener("PROFILER_START", param1);
    }

    public addStopEventListener(param1: (...args: any[]) => any): void {
        this.events.addEventListener("PROFILER_STOP", param1);
    }

    public removeStartEventListener(param1: (...args: any[]) => any): void {
        this.events.removeEventListener("PROFILER_START", param1);
    }

    public removeStopEventListener(param1: (...args: any[]) => any): void {
        this.events.removeEventListener("PROFILER_STOP", param1);
    }

    get [IProfiler](): true {
        return true;
    }
}
