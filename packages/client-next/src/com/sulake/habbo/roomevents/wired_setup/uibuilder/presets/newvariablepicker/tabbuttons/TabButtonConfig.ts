import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class TabButtonConfig {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets.newvariablepicker.tabbuttons::TabButtonConfig'); }

    declare private _SafeStr_5991: number;
    static { (this.prototype as any)._SafeStr_5991 = 0; }

    declare private _assetUri: string;

    declare private _tooltipCaption: string;

    declare private _SafeStr_6546: (...args: any[]) => any;

    constructor(param1: number, param2: string, param3: string, param4: (...args: any[]) => any) {
        this._SafeStr_5991 = param1;
        this._assetUri = param2;
        this._tooltipCaption = param3;
        this._SafeStr_6546 = param4;
    }

    public get tabId(): number {
        return this._SafeStr_5991;
    }

    public get assetUri(): string {
        return this._assetUri;
    }

    public get tooltipCaption(): string {
        return this._tooltipCaption;
    }

    public get filteredVariables(): (...args: any[]) => any {
        return this._SafeStr_6546;
    }
}
