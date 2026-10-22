import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';

export class RoomEnterEffect {
    static { registerClassName(this, 'com.sulake.room.utils::RoomEnterEffect'); }

    public static readonly STATE_NOT_INITIALIZED: number = 0;
    public static readonly STATE_START_DELAY: number = 1;
    public static readonly STATE_RUNNING: number = 2;
    public static readonly STATE_OVER: number = 3;
    private static _state: number = 0;
    private static _SafeStr_4851: boolean = false;
    private static _SafeStr_5223: number = NaN;
    private static _SafeStr_6284: number = 0;
    private static _SafeStr_4729: number = 20000;
    private static _SafeStr_4977: number = 2000;

    constructor() {
    }

    public static init(param1: number, param2: number): void {
        RoomEnterEffect._SafeStr_5223 = 0;
        RoomEnterEffect._SafeStr_4729 = param1;
        RoomEnterEffect._SafeStr_4977 = param2;
        RoomEnterEffect._SafeStr_6284 = getTimer();
        RoomEnterEffect._state = 1;
    }

    public static turnVisualizationOn(): void {
        if (RoomEnterEffect._state == 0 || RoomEnterEffect._state == 3) {
            return;
        }
        let _loc1_: number = getTimer() - RoomEnterEffect._SafeStr_6284;
        if (_loc1_ > RoomEnterEffect._SafeStr_4729 + RoomEnterEffect._SafeStr_4977) {
            RoomEnterEffect._state = 3;
            return;
        }
        RoomEnterEffect._SafeStr_4851 = true;
        if (_loc1_ < RoomEnterEffect._SafeStr_4729) {
            RoomEnterEffect._state = 1;
            return;
        }
        RoomEnterEffect._state = 2;
        RoomEnterEffect._SafeStr_5223 = (_loc1_ - RoomEnterEffect._SafeStr_4729) / RoomEnterEffect._SafeStr_4977;
    }

    public static turnVisualizationOff(): void {
        RoomEnterEffect._SafeStr_4851 = false;
    }

    public static isVisualizationOn(): boolean {
        return RoomEnterEffect._SafeStr_4851 && RoomEnterEffect.isRunning();
    }

    public static isRunning(): boolean {
        if (RoomEnterEffect._state == 1 || RoomEnterEffect._state == 2) {
            return true;
        }
        return false;
    }

    public static getDelta(param1: number = 0, param2: number = 1): number {
        return Math.min(Math.max(RoomEnterEffect._SafeStr_5223, param1), param2);
    }

    public static get totalRunningTime(): number {
        return RoomEnterEffect._SafeStr_4729 + RoomEnterEffect._SafeStr_4977;
    }
}
