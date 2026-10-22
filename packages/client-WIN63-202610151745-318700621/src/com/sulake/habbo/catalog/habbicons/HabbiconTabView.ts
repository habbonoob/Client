import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ITabButtonWindow } from '@/com/sulake/core/window/components/ITabButtonWindow';
import type { ITabContextWindow } from '@/com/sulake/core/window/components/ITabContextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isITabButtonWindow } from '@/com/sulake/core/window/components/ITabButtonWindow';
import { isITabContextWindow } from '@/com/sulake/core/window/components/ITabContextWindow';

export class HabbiconTabView implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.catalog.habbicons::HabbiconTabView'); }

    declare private _window: IWindowContainer;

    declare private _SafeStr_14904: (...args: any[]) => any;

    declare private _activeMode: string;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    constructor(param1: IWindowContainer, param2: (...args: any[]) => any) {
        this._window = param1;
        this._SafeStr_14904 = param2;
        this.tabAllSets.addEventListener("WE_SELECTED", this.onTabSelected);
        this.tabOwned.addEventListener("WE_SELECTED", this.onTabSelected);
        this.tabFavourited.addEventListener("WE_SELECTED", this.onTabSelected);
    }

    public select(param1: string): void {
        let _loc2_: ITabButtonWindow = this.getTabByMode(param1);
        if (_loc2_ == null) {
            return;
        }
        if (param1 == this._activeMode) {
            return;
        }
        this._activeMode = param1;
        if (this.tabContext.selector.getSelected() != _loc2_) {
            this.tabContext.selector.setSelected(_loc2_);
        }
    }

    private onTabSelected = (param1: WindowEvent): void => {
        let _loc2_: string = this.getModeByTab(param1.target);
        if (_loc2_ == null || _loc2_ == this._activeMode) {
            return;
        }
        this._activeMode = _loc2_;
        this._SafeStr_14904(_loc2_);
    };

    private getModeByTab(param1: IWindow): string {
        switch (param1.name) {
            case "tab_all_sets":
                return "all_sets";
            case "tab_owned":
                return "owned";
            case "tab_favourited":
                return "favourited";
            default:
                return null;
        }
    }

    private getTabByMode(param1: string): ITabButtonWindow {
        switch (param1) {
            case "all_sets":
                return this.tabAllSets;
            case "owned":
                return this.tabOwned;
            case "favourited":
                return this.tabFavourited;
            default:
                return null;
        }
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this.tabAllSets.removeEventListener("WE_SELECTED", this.onTabSelected);
        this.tabOwned.removeEventListener("WE_SELECTED", this.onTabSelected);
        this.tabFavourited.removeEventListener("WE_SELECTED", this.onTabSelected);
        this._SafeStr_14904 = null;
        this._activeMode = null;
        this._window = null;
        this._disposed = true;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    private get tabContext(): ITabContextWindow {
        return asGuarded(this._window.findChildByName("tab_context"), isITabContextWindow);
    }

    private get tabAllSets(): ITabButtonWindow {
        return asGuarded(this._window.findChildByName("tab_all_sets"), isITabButtonWindow);
    }

    private get tabOwned(): ITabButtonWindow {
        return asGuarded(this._window.findChildByName("tab_owned"), isITabButtonWindow);
    }

    private get tabFavourited(): ITabButtonWindow {
        return asGuarded(this._window.findChildByName("tab_favourited"), isITabButtonWindow);
    }

    get [IDisposable](): true {
        return true;
    }
}
