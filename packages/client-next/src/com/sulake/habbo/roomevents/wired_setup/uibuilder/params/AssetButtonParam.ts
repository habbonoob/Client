import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class AssetButtonParam {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.params::AssetButtonParam'); }

    declare private _assetName: string;

    declare private _tooltip: string;

    declare private _onClick: (...args: any[]) => any;

    declare private _SafeStr_5977: boolean;
    static { (this.prototype as any)._SafeStr_5977 = false; }

    declare private _alignRight: boolean;
    static { (this.prototype as any)._alignRight = false; }

    constructor(param1: string, param2: string, param3: (...args: any[]) => any, param4: boolean = false, param5: boolean = false) {
        this._assetName = param1;
        this._tooltip = param2;
        this._onClick = param3;
        this._SafeStr_5977 = param4;
        this._alignRight = param5;
    }

    public get assetName(): string {
        return this._assetName;
    }

    public get tooltip(): string {
        return this._tooltip;
    }

    public get onClick(): (...args: any[]) => any {
        return this._onClick;
    }

    public get isFollowedBySplitter(): boolean {
        return this._SafeStr_5977;
    }

    public get alignRight(): boolean {
        return this._alignRight;
    }
}
