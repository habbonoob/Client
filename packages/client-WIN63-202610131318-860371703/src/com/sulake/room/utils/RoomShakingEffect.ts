import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';

export class RoomShakingEffect {
    static { registerClassName(this, 'com.sulake.room.utils::RoomShakingEffect'); }

    public static readonly STATE_NOT_INITIALIZED: number = 0;
    public static readonly STATE_START_DELAY: number = 1;
    public static readonly STATE_RUNNING: number = 2;
    public static readonly STATE_OVER: number = 3;
    private static _state: number = 0;
    private static _SafeStr_4851: boolean = false;
    private static _SafeStr_5223: number = NaN;
    private static _SafeStr_6284: number = 0;
    private static _SafeStr_4729: number = 20000;
    private static _SafeStr_4977: number = 5000;
    private static _SafeStr_3122: Timer;

    constructor() {
    }

    public static init(param1: number, param2: number): void {
        RoomShakingEffect._SafeStr_5223 = 0;
        RoomShakingEffect._SafeStr_4729 = param1;
        RoomShakingEffect._SafeStr_4977 = param2;
        RoomShakingEffect._SafeStr_6284 = getTimer();
        RoomShakingEffect._state = 1;
    }

    public static turnVisualizationOn(): void {
        if (RoomShakingEffect._state == 0 || RoomShakingEffect._state == 3) {
            return;
        }
        if (RoomShakingEffect._SafeStr_3122 == null || !RoomShakingEffect._SafeStr_3122.running) {
            RoomShakingEffect._SafeStr_3122 = new Timer(RoomShakingEffect._SafeStr_4977, 1);
            RoomShakingEffect._SafeStr_3122.addEventListener("timerComplete", RoomShakingEffect.turnVisualizationOff);
            RoomShakingEffect._SafeStr_3122.start();
        }
        let _loc1_: number = getTimer() - RoomShakingEffect._SafeStr_6284;
        if (_loc1_ > RoomShakingEffect._SafeStr_4729 + RoomShakingEffect._SafeStr_4977) {
            RoomShakingEffect._state = 3;
            return;
        }
        RoomShakingEffect._SafeStr_4851 = true;
        if (_loc1_ < RoomShakingEffect._SafeStr_4729) {
            RoomShakingEffect._state = 1;
            return;
        }
        RoomShakingEffect._state = 2;
        RoomShakingEffect._SafeStr_5223 = (_loc1_ - RoomShakingEffect._SafeStr_4729) / RoomShakingEffect._SafeStr_4977;
    }

    public static turnVisualizationOff(param1: TimerEvent): void {
        RoomShakingEffect._SafeStr_4851 = false;
        RoomShakingEffect._SafeStr_3122.stop();
        RoomShakingEffect._SafeStr_3122.removeEventListener("timerComplete", RoomShakingEffect.turnVisualizationOff);
        RoomShakingEffect._SafeStr_3122 = null;
    }

    public static isVisualizationOn(): boolean {
        return RoomShakingEffect._SafeStr_4851 && RoomShakingEffect.isRunning();
    }

    private static isRunning(): boolean {
        if (RoomShakingEffect._state == 1 || RoomShakingEffect._state == 2) {
            return true;
        }
        return false;
    }
}
