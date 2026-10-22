import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { TraxSample } from '@/com/sulake/habbo/sound/trax/TraxSample';

export class TraxChannelSample {
    static { registerClassName(this, 'com.sulake.habbo.sound.trax::TraxChannelSample'); }

    constructor(param1: TraxSample, param2: number) {
        this._SafeStr_5781 = param1;
        this._offset = param2;
    }

    private _SafeStr_5781: TraxSample = null;
    private _offset: number = 0;

    public setSample(param1: number[], param2: number, param3: number): void {
        this._offset = this._SafeStr_5781.setSample(param1, param2, param3, this._offset);
    }

    public addSample(param1: number[], param2: number, param3: number): void {
        this._offset = this._SafeStr_5781.addSample(param1, param2, param3, this._offset);
    }
}
