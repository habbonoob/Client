import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { SliderValueConverter } from '@/com/sulake/habbo/roomevents/wired_setup/common/slider_converter/SliderValueConverter';

export class SliderValueSeconds5 implements SliderValueConverter {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.common.slider_converter::SliderValueSeconds5'); }

    constructor() {
    }

    public toIntParam(param1: string): number {
        return Math.round(Number(param1) / 5) | 0;
    }

    public toString(param1: number): string {
        return String(param1 * 5);
    }

    public get precision(): number {
        return 0;
    }

    public get endsWithFive(): boolean {
        return true;
    }
}
