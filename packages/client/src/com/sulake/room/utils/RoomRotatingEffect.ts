import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';

export class RoomRotatingEffect {
    static { registerClassName(this, 'com.sulake.room.utils::RoomRotatingEffect'); }

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

    public static init(param1: number, param2: number): void {
        RoomRotatingEffect._SafeStr_5223 = 0;
        RoomRotatingEffect._SafeStr_4729 = param1;
        RoomRotatingEffect._SafeStr_4977 = param2;
        RoomRotatingEffect._SafeStr_6284 = getTimer();
        RoomRotatingEffect._state = 1;
    }

    public static turnVisualizationOn(): void {
        if (RoomRotatingEffect._state == 0 || RoomRotatingEffect._state == 3) {
            return;
        }
        if (RoomRotatingEffect._SafeStr_3122 == null || !RoomRotatingEffect._SafeStr_3122.running) {
            RoomRotatingEffect._SafeStr_3122 = new Timer(RoomRotatingEffect._SafeStr_4977, 1);
            RoomRotatingEffect._SafeStr_3122.addEventListener("timerComplete", RoomRotatingEffect.turnVisualizationOff);
            RoomRotatingEffect._SafeStr_3122.start();
        }
        let _loc1_: number = getTimer() - RoomRotatingEffect._SafeStr_6284;
        if (_loc1_ > RoomRotatingEffect._SafeStr_4729 + RoomRotatingEffect._SafeStr_4977) {
            RoomRotatingEffect._state = 3;
            return;
        }
        RoomRotatingEffect._SafeStr_4851 = true;
        if (_loc1_ < RoomRotatingEffect._SafeStr_4729) {
            RoomRotatingEffect._state = 1;
            return;
        }
        RoomRotatingEffect._state = 2;
        RoomRotatingEffect._SafeStr_5223 = (_loc1_ - RoomRotatingEffect._SafeStr_4729) / RoomRotatingEffect._SafeStr_4977;
    }

    public static isVisualizationOn(): boolean {
        return RoomRotatingEffect._SafeStr_4851 && RoomRotatingEffect.isRunning();
    }

    private static isRunning(): boolean {
        if (RoomRotatingEffect._state == 1 || RoomRotatingEffect._state == 2) {
            return true;
        }
        return false;
    }

    constructor() {
    }

    public static turnVisualizationOff(param1: TimerEvent): void {
        RoomRotatingEffect._SafeStr_4851 = false;
        RoomRotatingEffect._SafeStr_3122.stop();
        RoomRotatingEffect._SafeStr_3122.removeEventListener("timerComplete", RoomRotatingEffect.turnVisualizationOff);
        RoomRotatingEffect._SafeStr_3122 = null;
    }
}
