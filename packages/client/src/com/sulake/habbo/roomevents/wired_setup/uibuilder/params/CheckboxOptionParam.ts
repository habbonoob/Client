import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset';

export class CheckboxOptionParam {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.params::CheckboxOptionParam'); }

    constructor(param1: string, param2: number = -1) {
        this._text = param1;
        this._id = param2;
    }

    private _id: number = -1;

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

    public set id(param1: number) {
        this._id = param1;
    }
}
