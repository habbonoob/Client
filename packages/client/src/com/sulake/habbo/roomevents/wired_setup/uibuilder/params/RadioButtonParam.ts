import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset';

export class RadioButtonParam {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.params::RadioButtonParam'); }

    constructor(param1: number, param2: string, param3: WiredUIPreset = null, param4: WiredUIPreset = null, param5: boolean = false) {
        this._id = param1;
        this._text = param2;
        this._extra1 = param3;
        this._extra2 = param4;
        this._newLine = param5;
    }

    declare private _id: number;
    static { (this.prototype as any)._id = 0; }

    declare private _newLine: boolean;
    static { (this.prototype as any)._newLine = false; }

    declare private _text: string;

    public get text(): string {
        return this._text;
    }

    declare private _iconAssetName: string;

    public get iconAssetName(): string {
        return this._iconAssetName;
    }

    public set iconAssetName(param1: string) {
        this._iconAssetName = param1;
    }

    declare private _extra1: WiredUIPreset;

    public get extra1(): WiredUIPreset {
        return this._extra1;
    }

    public set extra1(param1: WiredUIPreset) {
        this._extra1 = param1;
    }

    declare private _extra2: WiredUIPreset;

    public get extra2(): WiredUIPreset {
        return this._extra2;
    }

    public set extra2(param1: WiredUIPreset) {
        this._extra2 = param1;
    }

    public get id(): number {
        return this._id;
    }

    public get newLine(): boolean {
        return this._newLine;
    }

    public set newLine(param1: boolean) {
        this._newLine = param1;
    }
}
