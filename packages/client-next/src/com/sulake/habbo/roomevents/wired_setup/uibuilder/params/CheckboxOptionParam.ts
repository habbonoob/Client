import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset';

export class CheckboxOptionParam {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.params::CheckboxOptionParam'); }

    declare private _text: string;

    private _id: number = -1;

    declare private _iconAssetName: string;

    declare private _extra1: WiredUIPreset;

    declare private _extra2: WiredUIPreset;

    constructor(param1: string, param2: number = -1, param3: WiredUIPreset = null, param4: WiredUIPreset = null) {
        this._text = param1;
        this._id = param2;
        this._extra1 = param3;
        this._extra2 = param4;
    }

    public get text(): string {
        return this._text;
    }

    public get iconAssetName(): string {
        return this._iconAssetName;
    }

    public set iconAssetName(param1: string) {
        this._iconAssetName = param1;
    }

    public get extra1(): WiredUIPreset {
        return this._extra1;
    }

    public set extra1(param1: WiredUIPreset) {
        this._extra1 = param1;
    }

    public get extra2(): WiredUIPreset {
        return this._extra2;
    }

    public set extra2(param1: WiredUIPreset) {
        this._extra2 = param1;
    }

    public get id(): number {
        return this._id;
    }

    public set id(param1: number) {
        this._id = param1;
    }
}
