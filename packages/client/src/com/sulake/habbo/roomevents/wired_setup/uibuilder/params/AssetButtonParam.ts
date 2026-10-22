import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class AssetButtonParam {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.params::AssetButtonParam'); }

    constructor(param1: string, param2: string, param3: (...args: any[]) => any, param4: boolean = false, param5: boolean = false) {
        this._assetName = param1;
        this._tooltip = param2;
        this._onClick = param3;
        this._isFollowedBySplitter = param4;
        this._alignRight = param5;
    }

    declare private _tooltip: string;

    declare private _onClick: (...args: any[]) => any;

    declare private _isFollowedBySplitter: boolean;
    static { (this.prototype as any)._isFollowedBySplitter = false; }

    declare private _assetName: string;

    public get assetName(): string {
        return this._assetName;
    }

    declare private _alignRight: boolean;
    static { (this.prototype as any)._alignRight = false; }

    public get alignRight(): boolean {
        return this._alignRight;
    }

    public get tooltip(): string {
        return this._tooltip;
    }

    public get onClick(): (...args: any[]) => any {
        return this._onClick;
    }

    public get isFollowedBySplitter(): boolean {
        return this._isFollowedBySplitter;
    }
}
