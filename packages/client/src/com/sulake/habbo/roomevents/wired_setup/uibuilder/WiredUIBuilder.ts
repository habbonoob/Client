import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { FramePreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/main_layout/FramePreset';

export class WiredUIBuilder {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder::WiredUIBuilder'); }

    constructor(param1: PresetManager, param2: (...args: any[]) => any, param3: string, param4: number, param5: boolean = false) {
        this._presetManager = param1;
        this._SafeStr_4343 = param2;
        this._SafeStr_6133 = param5;
        this._holderKey = param3;
        this._code = param4;
        this._SafeStr_4555 = [];
    }

    declare protected _SafeStr_4555: any[];

    declare private _presetManager: PresetManager;

    declare private _SafeStr_4343: (...args: any[]) => any;

    declare private _holderKey: string;

    declare private _code: number;
    static { (this.prototype as any)._code = 0; }

    declare private _SafeStr_6133: boolean;
    static { (this.prototype as any)._SafeStr_6133 = false; }

    declare private _frame: FramePreset;

    public get frame(): FramePreset {
        return this._frame;
    }

    declare private _initialWidth: number;
    static { (this.prototype as any)._initialWidth = 0; }

    public get initialWidth(): number {
        return this._initialWidth;
    }

    public addElements(...rest: any[]): void {
        for (const _loc2_ of rest ?? []) {
            this._SafeStr_4555.push(_loc2_);
        }
    }

    public build(param1: number = 1): void {
        this._frame = this._presetManager.createFramePreset(this._SafeStr_4555, this._SafeStr_4343, this._holderKey, this._code, this._SafeStr_6133, true);
        this._SafeStr_4555 = null;
        this._initialWidth = this._frame.window.width;
        this._frame.resizeToWidth(this._initialWidth * param1 | 0);
    }
}
