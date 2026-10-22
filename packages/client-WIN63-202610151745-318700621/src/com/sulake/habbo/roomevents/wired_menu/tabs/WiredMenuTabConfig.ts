import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { WiredMenuTabView } from '@/com/sulake/habbo/roomevents/wired_menu/tabs/WiredMenuTabView';
import type { WiredMenuController } from '@/com/sulake/habbo/roomevents/wired_menu/WiredMenuController';

export class WiredMenuTabConfig {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_menu.tabs::WiredMenuTabConfig'); }

    declare private _id: string;

    declare private _SafeStr_5937: any;

    declare private _isCreateImmediately: boolean;
    static { (this.prototype as any)._isCreateImmediately = false; }

    declare private _isReusable: boolean;
    static { (this.prototype as any)._isReusable = false; }

    declare private _isEnabled: boolean;
    static { (this.prototype as any)._isEnabled = false; }

    constructor(param1: string, param2: any, param3: boolean = true, param4: boolean = true, param5: boolean = true) {
        this._id = param1;
        this._SafeStr_5937 = param2;
        this._isCreateImmediately = param3;
        this._isReusable = param4;
        this._isEnabled = param5;
    }

    public get id(): string {
        return this._id;
    }

    public get tabButtonName(): string {
        return "top_view_" + this._id + "_button";
    }

    public get containerName(): string {
        return this._id + "_container";
    }

    public get titleLocalizationKey(): string {
        return "wiredmenu." + this._id + ".title";
    }

    public createTab(param1: WiredMenuController, param2: IWindowContainer): WiredMenuTabView {
        return new this._SafeStr_5937(param1, param2);
    }

    public get isCreateImmediately(): boolean {
        return this._isCreateImmediately;
    }

    public get isReusable(): boolean {
        return this._isReusable;
    }

    public get isEnabled(): boolean {
        return this._isEnabled;
    }
}
