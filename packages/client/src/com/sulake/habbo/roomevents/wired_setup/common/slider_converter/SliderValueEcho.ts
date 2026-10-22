import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { SliderValueConverter } from '@/com/sulake/habbo/roomevents/wired_setup/common/slider_converter/SliderValueConverter';

export class SliderValueEcho implements SliderValueConverter {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.common.slider_converter::SliderValueEcho'); }

    constructor() {
    }

    public get precision(): number {
        return 0;
    }

    public get endsWithFive(): boolean {
        return false;
    }

    public toIntParam(param1: string): number {
        return Number(param1) | 0;
    }

    public toString(param1: number): string {
        return param1.toString();
    }
}
