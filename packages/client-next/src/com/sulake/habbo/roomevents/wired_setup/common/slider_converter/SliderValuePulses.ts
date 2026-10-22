import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { SliderValueConverter } from '@/com/sulake/habbo/roomevents/wired_setup/common/slider_converter/SliderValueConverter';

export class SliderValuePulses implements SliderValueConverter {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.common.slider_converter::SliderValuePulses'); }

    constructor() {
    }

    public toIntParam(param1: string): number {
        return Math.round(Number(param1) * 2) | 0;
    }

    public toString(param1: number): string {
        let _loc2_: number = Math.floor(param1 / 2) | 0;
        if (param1 % 2 == 0) {
            return "" + _loc2_;
        }
        return _loc2_ + ".5";
    }

    public get precision(): number {
        return 1;
    }

    public get endsWithFive(): boolean {
        return true;
    }
}
