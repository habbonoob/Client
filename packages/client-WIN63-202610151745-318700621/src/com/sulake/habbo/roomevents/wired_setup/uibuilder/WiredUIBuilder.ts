import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { _SafeCls_6086 } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/interfaces/_SafeCls_6086';
import type { IInputSourceClaimOwner } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/interfaces/IInputSourceClaimOwner';
import type { FramePreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/main_layout/FramePreset';
import { Capabilities } from '@habbo-pixi/runtime/system/Capabilities';
import { ListScrollParams } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/ListScrollParams';

export class WiredUIBuilder {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder::WiredUIBuilder'); }

    declare private _presetManager: PresetManager;

    declare private _SafeStr_4343: (...args: any[]) => any;

    declare private _holderKey: string;

    declare private _code: number;
    static { (this.prototype as any)._code = 0; }

    declare private _frame: FramePreset;

    declare protected _SafeStr_4555: any[];

    declare private _SafeStr_6133: boolean;
    static { (this.prototype as any)._SafeStr_6133 = false; }

    declare private _initialWidth: number;
    static { (this.prototype as any)._initialWidth = 0; }

    constructor(param1: PresetManager, param2: (...args: any[]) => any, param3: string, param4: number, param5: boolean = false) {
        this._presetManager = param1;
        this._SafeStr_4343 = param2;
        this._SafeStr_6133 = param5;
        this._holderKey = param3;
        this._code = param4;
        this._SafeStr_4555 = [];
    }

    public addElements(...rest: any[]): void {
        for (const _loc2_ of rest ?? []) {
            this._SafeStr_4555.push(_loc2_);
        }
    }

    public get frame(): FramePreset {
        return this._frame;
    }

    public get inputSourceClaimOwners(): IInputSourceClaimOwner[] {
        let _loc1_: IInputSourceClaimOwner[] = [];
        if (this._SafeStr_4555 != null) {
            for (const _loc2_ of this._SafeStr_4555 ?? []) {
                _loc2_.collectInputSourceClaimOwners(_loc1_);
            }
        }
        return _loc1_;
    }

    public get formValidationSources(): _SafeCls_6086[] {
        let _loc1_: _SafeCls_6086[] = [];
        if (this._SafeStr_4555 != null) {
            for (const _loc2_ of this._SafeStr_4555 ?? []) {
                _loc2_.collectFormValidationSources(_loc1_);
            }
        }
        return _loc1_;
    }

    public build(param1: number = 1, param2: boolean = false): void {
        let _loc3_: ListScrollParams = null;
        if (param2) {
            _loc3_ = new ListScrollParams(false, 0, Capabilities.screenResolutionY / 1.8 | 0, true, true);
        }
        this._frame = this._presetManager.createFramePreset(this._SafeStr_4555, this._SafeStr_4343, this._holderKey, this._code, this._SafeStr_6133, true, _loc3_);
        this._SafeStr_4555 = null;
        this._initialWidth = this._frame.window.width;
        this._frame.resizeToWidth(this._initialWidth * param1 | 0);
    }

    public get initialWidth(): number {
        return this._initialWidth;
    }
}
