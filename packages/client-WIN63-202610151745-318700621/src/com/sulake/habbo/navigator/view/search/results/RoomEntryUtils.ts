import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class RoomEntryUtils {
    static { registerClassName(this, 'com.sulake.habbo.navigator.view.search.results::RoomEntryUtils'); }

    constructor() {
    }

    public static getDoorModeIconAsset(param1: number): string {
        switch (param1 - 1) {
            case 0:
                return "newnavigator_doormode_doorbell_small";
            case 1:
                return "newnavigator_doormode_password_small";
            case 2:
                return "newnavigator_doormode_invisible_small";
            default:
                return "";
        }
    }

    public static getModulatedBackgroundColor(param1: number, param2: number): number {
        if (param1 == -1) {
            return param2;
        }
        let _loc5_: number = (((0xFF0000 & param2) >> 16) >>> 0) / 255;
        let _loc9_: number = (((0xFF00 & param2) >> 8) >>> 0) / 255;
        let _loc6_: number = ((0xFF & param2) >>> 0) / 255;
        let _loc10_: number = (((0xFF0000 & param1) >> 16) >>> 0) / 255;
        let _loc7_: number = (((0xFF00 & param1) >> 8) >>> 0) / 255;
        let _loc11_: number = ((0xFF & param1) >>> 0) / 255;
        let _loc3_: number = _loc5_ * Math.min(1, _loc10_ * 1.5);
        let _loc8_: number = _loc9_ * Math.min(1, _loc7_ * 1.5);
        let _loc4_: number = _loc6_ * Math.min(1, _loc11_ * 1.5);
        return (_loc3_ * 255 >>> 0 << 16) + (_loc8_ * 255 >>> 0 << 8) + (_loc4_ * 255 >>> 0) + 4278190080 >>> 0;
    }

    public static getFavoriteIcon(param1: boolean): string {
        return "newnavigator_icon_fav_" + (param1 ? "yes" : "no");
    }
}
