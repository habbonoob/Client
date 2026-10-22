import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { SliderValueConverter } from '@/com/sulake/habbo/roomevents/wired_setup/common/slider_converter/SliderValueConverter';

export class SliderValueMilliseconds50 implements SliderValueConverter {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.common.slider_converter::SliderValueMilliseconds50'); }

    constructor() {
    }

    public get precision(): number {
        return -1;
    }

    public get endsWithFive(): boolean {
        return true;
    }

    public toIntParam(param1: string): number {
        return Number(param1) / 50 | 0;
    }

    public toString(param1: number): string {
        return "" + param1 * 50;
    }
}
