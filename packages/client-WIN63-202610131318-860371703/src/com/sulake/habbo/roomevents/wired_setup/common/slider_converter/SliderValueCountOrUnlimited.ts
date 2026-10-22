import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { SliderValueConverter } from '@/com/sulake/habbo/roomevents/wired_setup/common/slider_converter/SliderValueConverter';

export class SliderValueCountOrUnlimited implements SliderValueConverter {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.common.slider_converter::SliderValueCountOrUnlimited'); }

    declare private _unlimitedValue: number;
    static { (this.prototype as any)._unlimitedValue = 0; }

    constructor(param1: number) {
        this._unlimitedValue = param1;
    }

    public toIntParam(param1: string): number {
        return Number(param1) | 0;
    }

    public toString(param1: number): string {
        if (param1 == this._unlimitedValue) {
            return "∞";
        }
        return "" + param1;
    }

    public get precision(): number {
        return 0;
    }

    public get endsWithFive(): boolean {
        return false;
    }
}
