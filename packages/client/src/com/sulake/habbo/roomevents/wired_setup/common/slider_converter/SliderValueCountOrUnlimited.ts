import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { SliderValueConverter } from '@/com/sulake/habbo/roomevents/wired_setup/common/slider_converter/SliderValueConverter';

export class SliderValueCountOrUnlimited implements SliderValueConverter {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.common.slider_converter::SliderValueCountOrUnlimited'); }

    constructor(param1: number) {
        this._SafeStr_6160 = param1;
    }

    declare private _SafeStr_6160: number;
    static { (this.prototype as any)._SafeStr_6160 = 0; }

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
        if (param1 == this._SafeStr_6160) {
            return "∞";
        }
        return "" + param1;
    }
}
