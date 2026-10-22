import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class RoomTradingLevelEnum {
    static { registerClassName(this, 'com.sulake.habbo.session.enum::RoomTradingLevelEnum'); }

    public static readonly NO_TRADING: number = 0;
    public static readonly ROOM_CONTROLLER_REQUIRED: number = 1;
    public static readonly FREE_TRADING: number = 2;

    constructor() {
    }

    public static getLocalizationKey(param1: number): string {
        switch (param1) {
            case 0:
                return "${trading.mode.not.allowed}";
            case 1:
                return "${trading.mode.controller}";
            case 2:
                return "${trading.mode.free}";
            default:
                return "";
        }
    }
}
