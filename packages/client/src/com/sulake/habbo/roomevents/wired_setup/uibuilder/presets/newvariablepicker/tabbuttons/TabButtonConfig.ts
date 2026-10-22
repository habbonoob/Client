import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class TabButtonConfig {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets.newvariablepicker.tabbuttons::TabButtonConfig'); }

    constructor(param1: number, param2: string, param3: string, param4: (...args: any[]) => any) {
        this._tabId = param1;
        this._assetUri = param2;
        this._tooltipCaption = param3;
        this._SafeStr_6546 = param4;
    }

    declare private _tabId: number;
    static { (this.prototype as any)._tabId = 0; }

    declare private _tooltipCaption: string;

    declare private _SafeStr_6546: (...args: any[]) => any;

    declare private _assetUri: string;

    public get assetUri(): string {
        return this._assetUri;
    }

    public get tabId(): number {
        return this._tabId;
    }

    public get tooltipCaption(): string {
        return this._tooltipCaption;
    }

    public get filteredVariables(): (...args: any[]) => any {
        return this._SafeStr_6546;
    }
}
