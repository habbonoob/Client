import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { System } from '@habbo-pixi/runtime/system/System';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { setTimeout } from '@habbo-pixi/runtime/utils/setTimeout';
import { Core } from '@/com/sulake/core/runtime/Component.group';
import { Player } from '@/com/sulake/core/utils/Player';

export class PurgeTrigger {
    static { registerClassName(this, 'com.sulake.core.utils::PurgeTrigger'); }

    private static _softPurgeTriggerMegaBytes: number = 300;
    private static _hardPurgeTriggerMegaBytes: number = 400;
    private static _frequencyMilliSeconds: number = 60000;
    private static _running: boolean = false;

    constructor() {
    }

    public static get softPurgeTriggerMegaBytes(): number {
        return PurgeTrigger._softPurgeTriggerMegaBytes;
    }

    public static set softPurgeTriggerMegaBytes(param1: number) {
        PurgeTrigger._softPurgeTriggerMegaBytes = param1;
    }

    public static get hardPurgeTriggerMegaBytes(): number {
        return PurgeTrigger._hardPurgeTriggerMegaBytes;
    }

    public static set hardPurgeTriggerMegaBytes(param1: number) {
        PurgeTrigger._hardPurgeTriggerMegaBytes = Math.max(param1, PurgeTrigger._softPurgeTriggerMegaBytes) >>> 0;
    }

    public static get frequencyMilliSeconds(): number {
        return PurgeTrigger._frequencyMilliSeconds;
    }

    public static set frequencyMilliSeconds(param1: number) {
        PurgeTrigger._frequencyMilliSeconds = param1;
    }

    public static get isRunning(): boolean {
        return PurgeTrigger._running;
    }

    protected static get isMemoryDataAvailable(): boolean {
        return Player.majorVersion > 10 || Player.majorVersion == 10 && Player.majorRevision >= 1;
    }

    public static start(): void {
        if (!PurgeTrigger._running) {
            if (!PurgeTrigger.isMemoryDataAvailable) {
                PurgeTrigger._frequencyMilliSeconds *= 2;
                PurgeTrigger._softPurgeTriggerMegaBytes = 0;
                PurgeTrigger._hardPurgeTriggerMegaBytes = 2147483647;
            }
            setTimeout(PurgeTrigger.onInterval, PurgeTrigger._frequencyMilliSeconds);
            PurgeTrigger._running = true;
        }
    }

    public static stop(): void {
        if (PurgeTrigger._running) {
            PurgeTrigger._running = false;
        }
    }

    public static trigger(): void {
        let _loc2_: number = 0;
        let _loc3_: number = NaN;
        let _loc1_: any = System;
        let _loc4_: number = PurgeTrigger.isMemoryDataAvailable ? (_loc1_.totalMemory - _loc1_.freeMemory) / 1024 / 1024 : PurgeTrigger.softPurgeTriggerMegaBytes + 1;
        if (_loc4_ > PurgeTrigger.softPurgeTriggerMegaBytes) {
            _loc2_ = getTimer();
            Core.purge();
            _loc3_ = PurgeTrigger.isMemoryDataAvailable ? (_loc1_.totalMemory - _loc1_.freeMemory) / 1024 / 1024 : 0;
            if (_loc3_ > PurgeTrigger._hardPurgeTriggerMegaBytes) {
                PurgeTrigger.triggerGC();
            }
        }
    }

    public static triggerGC(): void {
        System.pauseForGCIfCollectionImminent(0.25);
    }

    private static onInterval(): void {
        if (PurgeTrigger._running) {
            PurgeTrigger.trigger();
            setTimeout(PurgeTrigger.onInterval, PurgeTrigger._frequencyMilliSeconds);
        }
    }
}
