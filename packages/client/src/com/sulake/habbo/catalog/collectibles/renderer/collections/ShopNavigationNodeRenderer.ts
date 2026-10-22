import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { ShopTab } from '@/com/sulake/habbo/catalog/collectibles/tabs/ShopTab';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';

export class ShopNavigationNodeRenderer implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.catalog.collectibles.renderer.collections::ShopNavigationNodeRenderer'); }

    constructor(param1: ShopTab, param2: string) {
        this._SafeStr_4669 = param1;
        this._category = param2;
        this.createWindow();
    }

    declare private _SafeStr_4669: ShopTab;

    declare private _category: string;

    declare private _active: boolean;
    static { (this.prototype as any)._active = false; }

    declare private _itemNormalColor: number;
    static { (this.prototype as any)._itemNormalColor = 0; }

    declare private _itemSelectedEtchingColor: number;
    static { (this.prototype as any)._itemSelectedEtchingColor = 0; }

    private _hovered: boolean = false;

    declare private _window: IWindowContainer;

    public get window(): IWindowContainer {
        return this._window;
    }

    public get disposed(): boolean {
        return this._window == null;
    }

    public get category(): string {
        return this._category;
    }

    public activate(): void {
        this._active = true;
        this.updateLook();
    }

    public deactivate(): void {
        this._active = false;
        this.updateLook();
    }

    public dispose(): void {
        if (this._window == null) {
            return;
        }
        this._window.dispose();
        this._window = null;
    }

    private createWindow(): void {
        this._window = asGuarded(this._SafeStr_4669.navigationItemTemplate.clone(), isIWindowContainer);
        let _loc1_: ITextWindow = asGuarded(this._window.findChildByTag("ITEM_TITLE"), isITextWindow);
        if (_loc1_ != null) {
            _loc1_.caption = this._category;
            this._itemNormalColor = _loc1_.textColor;
            this._itemSelectedEtchingColor = _loc1_.etchingColor;
        }
        let _loc2_: IWindow = this._window.findChildByTag("SELECTION_HILIGHT");
        if (_loc2_) {
            _loc2_.visible = false;
        }
        this._window.addEventListener("WME_CLICK", this.onButtonClicked);
        this._window.addEventListener("WME_OVER", this.onOver);
        this._window.addEventListener("WME_OUT", this.onOut);
    }

    private onOut = (param1: WindowMouseEvent): void => {
        this._hovered = false;
        this.updateLook();
    };

    private onOver = (param1: WindowMouseEvent): void => {
        this._hovered = true;
        this.updateLook();
    };

    private updateLook(): void {
        if (this._active || this._hovered) {
            this.setActiveLook();
        } else {
            this.setInactiveLook();
        }
    }

    private setInactiveLook(): void {
        let _loc1_: ITextWindow = null;
        let _loc2_: IWindow = null;
        if (this._window != null) {
            _loc1_ = asGuarded(this._window.findChildByTag("SELECTION_COLOR"), isITextWindow);
            if (_loc1_ != null) {
                _loc1_.textColor = this._itemNormalColor;
                _loc1_.etchingColor = 0;
            }
            _loc2_ = this._window.findChildByTag("SELECTION_HILIGHT");
            if (_loc2_ != null) {
                _loc2_.visible = false;
            }
        }
    }

    private setActiveLook(): void {
        let _loc1_: ITextWindow = null;
        let _loc2_: IWindowContainer = null;
        if (this._window != null) {
            _loc1_ = asGuarded(this._window.findChildByTag("SELECTION_COLOR"), isITextWindow);
            if (_loc1_ != null) {
                _loc1_.textColor = 4294967295;
                _loc1_.etchingColor = this._itemSelectedEtchingColor;
            }
            _loc2_ = asGuarded(this._window.findChildByTag("SELECTION_HILIGHT"), isIWindowContainer);
            if (_loc2_ != null) {
                _loc2_.visible = true;
            }
        }
    }

    private onButtonClicked = (param1: WindowMouseEvent): void => {
        this._SafeStr_4669.activateCategory(this);
    };

    get [IDisposable](): true {
        return true;
    }
}
