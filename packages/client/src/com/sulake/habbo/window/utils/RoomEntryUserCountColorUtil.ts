import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class RoomEntryUserCountColorUtil {
    static { registerClassName(this, 'com.sulake.habbo.window.utils::RoomEntryUserCountColorUtil'); }

    public static getUserCountColor(param1: number, param2: number): number {
        let _loc3_: number = 100 * (param1 / param2) | 0;
        if (_loc3_ >= 92) {
            return 4290917164;
        }
        if (_loc3_ >= 80) {
            return 4294947099;
        }
        if (_loc3_ >= 50) {
            return 4294947099;
        }
        if (param1 > 0) {
            return 4284723554;
        }
        return 4291545793;
    }
}
