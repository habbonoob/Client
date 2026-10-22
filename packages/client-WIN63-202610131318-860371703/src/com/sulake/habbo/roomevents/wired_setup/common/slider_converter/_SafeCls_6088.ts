import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { SliderValueConverter } from '@/com/sulake/habbo/roomevents/wired_setup/common/slider_converter/SliderValueConverter';

export class _SafeCls_6088 implements SliderValueConverter {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.common.slider_converter::_SafeCls_6088'); }

    constructor() {
    }

    public toIntParam(param1: string): number {
        return Math.round(Number(param1) * 20) | 0;
    }

    public toString(param1: number): string {
        let _loc2_: number = param1 * 50;
        let _loc3_: number = _loc2_ / 1000 | 0;
        let _loc4_: number = _loc2_ % 1000;
        if (_loc4_ == 0) {
            return String(_loc3_);
        }
        let _loc5_: string = _loc4_ % 100 == 0 ? String(_loc4_ / 100) : (_loc4_ < 100 ? "0" : "") + String(_loc4_ / 10);
        return _loc3_ + "." + _loc5_;
    }

    public get precision(): number {
        return 2;
    }

    public get endsWithFive(): boolean {
        return true;
    }
}
