import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { SliderValueConverter } from '@/com/sulake/habbo/roomevents/wired_setup/common/slider_converter/SliderValueConverter';

export class SliderValueHundredth implements SliderValueConverter {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.common.slider_converter::SliderValueHundredth'); }

    constructor() {
    }

    public toIntParam(param1: string): number {
        return Math.round(Number(param1) * 100) | 0;
    }

    public toString(param1: number): string {
        return (param1 / 100).toFixed(2);
    }

    public get precision(): number {
        return 2;
    }

    public get endsWithFive(): boolean {
        return false;
    }
}
