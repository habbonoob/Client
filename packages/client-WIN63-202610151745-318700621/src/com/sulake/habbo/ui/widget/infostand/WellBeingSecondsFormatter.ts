import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class WellBeingSecondsFormatter {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.infostand::WellBeingSecondsFormatter'); }

    constructor() {
    }

    public static formatSeconds(param1: number): string {
        let _loc3_: number = Math.floor(param1) >>> 0;
        let _loc4_: number = Math.floor(_loc3_ / 3600) >>> 0;
        let _loc7_: number = _loc4_ * 3600;
        let _loc6_: number = (_loc3_ - _loc7_) / 60 >>> 0;
        let _loc5_: number = _loc3_ - _loc7_ - _loc6_ * 60 >>> 0;
        let _loc8_: string = _loc4_ + ":";
        let _loc9_: string = (_loc6_ < 10 ? "0" : "") + _loc6_ + ":";
        let _loc2_: string = (_loc5_ < 10 ? "0" : "") + _loc5_;
        return _loc8_ + _loc9_ + _loc2_;
    }
}
