import { asGuarded, asInstanceOf, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { ICatalogNavigator } from '@/com/sulake/habbo/catalog/navigation/ICatalogNavigator';
import type { ICatalogNode } from '@/com/sulake/habbo/catalog/navigation/ICatalogNode';
import type { NodeData } from '@/com/sulake/habbo/communication/messages/incoming/catalog/NodeData';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { CatalogNode } from '@/com/sulake/habbo/catalog/navigation/CatalogNode';

export class CatalogNodeRenderable extends CatalogNode {
    static { registerClassName(this, 'com.sulake.habbo.catalog.navigation::CatalogNodeRenderable'); }

    private static readonly ITEM_SELECTION_COLOR: number = 4294967295;

    constructor(param1: ICatalogNavigator, param2: NodeData, param3: number, param4: ICatalogNode) {
        super(param1, param2, param3, param4);
    }

    declare private _SafeStr_2218: IItemListWindow;

    declare private _active: boolean;
    static { (this.prototype as any)._active = false; }

    declare private _itemNormalColor: number;
    static { (this.prototype as any)._itemNormalColor = 0; }

    declare private _itemSelectedEtchingColor: number;
    static { (this.prototype as any)._itemSelectedEtchingColor = 0; }

    private _isOpen: boolean = false;

    public override get isOpen(): boolean {
        return this._isOpen;
    }

    public override get visible(): boolean {
        return true;
    }

    public override get offsetV(): number {
        return this._window.y + 21;
    }

    declare private _window: IWindowContainer;

    public get window(): IWindowContainer {
        return this._window;
    }

    public override dispose(): void {
        if (this._isOpen) {
            this.close();
            this.deactivate();
        }
        this._window = null;
        this._SafeStr_2218 = null;
        super.dispose();
    }

    public override activate(): void {
        this.setActiveLook();
        this._active = true;
    }

    public override deactivate(): void {
        this.setInactiveLook();
        this._active = false;
    }

    public override open(): void {
        let _loc1_: IWindow = null;
        this.showChildren();
        this._isOpen = true;
        if (this.isBranch && this._window != null) {
            _loc1_ = this._window.findChildByTag("DOWNBTN");
            if (_loc1_ != null) {
                _loc1_.style = 7;
            }
        }
    }

    public override close(): void {
        let _loc1_: IWindow = null;
        this.removeChildren();
        this._isOpen = false;
        if (this.isBranch && this._window != null) {
            _loc1_ = this._window.findChildByTag("DOWNBTN");
            if (_loc1_ != null) {
                _loc1_.style = 5;
            }
        }
    }

    public addToList(param1: IItemListWindow, param2: boolean = true): void {
        if (this._window == null) {
            this.createWindow();
            this.setInactiveLook();
        }
        param1.addListItem(this._window);
        if (this.isBranch) {
            if (this._SafeStr_2218 == null) {
                this.createChildList();
            }
            param1.addListItem(this._SafeStr_2218);
            this.refreshChildren();
        }
        param1.arrangeListItems();
    }

    public removeFromList(param1: IItemListWindow): void {
        param1.removeListItem(this._window);
        if (this.isBranch) {
            param1.removeListItem(this._SafeStr_2218);
        }
    }

    public updateChildListHeight(): void {
        let _loc2_: number = 0;
        if (this._SafeStr_2218 == null) {
            return;
        }
        this._SafeStr_2218.height = 0;
        if (this._SafeStr_2218 != null) {
            _loc2_ = 0;
            while (_loc2_ < this._SafeStr_2218.numListItems) {
                if (this._SafeStr_2218.getListItemAt(_loc2_ >>> 0).visible) {
                    this._SafeStr_2218.height += this._SafeStr_2218.getListItemAt(_loc2_ >>> 0).height;
                }
                _loc2_++;
            }
        }
        let _loc1_: CatalogNodeRenderable = asInstanceOf(this.parent, CatalogNodeRenderable);
        if (_loc1_) {
            _loc1_.updateChildListHeight();
        }
    }

    private refreshChildren(): void {
        let _loc1_: CatalogNodeRenderable = null;
        if (this._SafeStr_2218 == null) {
            return;
        }
        for (const _loc2_ of this.children ?? []) {
            _loc1_ = _loc2_ instanceof CatalogNodeRenderable ? _loc2_ : null;
            if (_loc1_ != null) {
                if (_loc1_.visible) {
                    _loc1_.addToList(this._SafeStr_2218);
                    _loc1_.setInactiveLook();
                } else {
                    _loc1_.removeFromList(this._SafeStr_2218);
                }
            }
        }
        this._SafeStr_2218.arrangeListItems();
    }

    private showChildren(): void {
        let _loc1_: number = 0;
        let _loc2_: number = 0;
        if (this._SafeStr_2218 == null) {
            this.createChildList();
        }
        for (const _loc3_ of this.children ?? []) {
            if (_loc3_.visible) {
                (_loc3_ instanceof CatalogNodeRenderable ? _loc3_ : null).addToList(this._SafeStr_2218);
            }
        }
        if (this._SafeStr_2218 != null) {
            this._SafeStr_2218.visible = true;
            _loc1_ = 0;
            _loc2_ = 0;
            while (_loc2_ < this._SafeStr_2218.numListItems) {
                if (this._SafeStr_2218.getListItemAt(_loc2_ >>> 0).visible) {
                    _loc1_++;
                }
                _loc2_++;
            }
            this._SafeStr_2218.height = _loc1_ * 21;
        }
    }

    private removeChildren(): void {
        for (const _loc1_ of this.children ?? []) {
            if (_loc1_.visible) {
                (_loc1_ instanceof CatalogNodeRenderable ? _loc1_ : null).removeFromList(this._SafeStr_2218);
            }
        }
        if (this._SafeStr_2218 != null) {
            this._SafeStr_2218.height = 0;
            this._SafeStr_2218.visible = false;
            this._SafeStr_2218.x = 0;
        }
    }

    private createChildList(): void {
        this._SafeStr_2218 = asGuarded(this.navigator.listTemplate.clone(), isIItemListWindow);
        this.removeChildren();
    }

    private createWindow(): void {
        this._window = asGuarded(this.navigator.getItemTemplate(this.depth).clone(), isIWindowContainer);
        let _loc2_: ITextWindow = asGuarded(this._window.findChildByTag("ITEM_TITLE"), isITextWindow);
        let _loc1_: IWindow = this._window.findChildByTag("DOWNBTN");
        if (_loc2_ != null) {
            _loc2_.caption = this.localization;
            this._itemNormalColor = _loc2_.textColor;
            this._itemSelectedEtchingColor = _loc2_.etchingColor;
        }
        let _loc3_: IWindow = this._window.findChildByTag("SELECTION_HILIGHT");
        if (_loc3_) {
            _loc3_.visible = false;
        }
        if (_loc1_ != null) {
            _loc1_.visible = !this.isLeaf;
        }
        castGuarded(this._window.findChildByName("icon"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow").assetUri = this.navigator.catalog.imageGalleryHost + this.iconName + ".png";
        if (this.navigator.isDeepHierarchy) {
            if (this.depth == 1) {
                this._window.findChildByName("icon").visible = false;
                this._window.findChildByTag("ITEM_TITLE").x = 0;
            }
            if (this.depth > 3) {
                this._window.findChildByName("icon").visible = true;
                this._window.findChildByName("icon").x = 15 + 6 * (this.depth - 3);
                this._window.findChildByTag("ITEM_TITLE").x = 42 + 6 * (this.depth - 3);
            }
        }
        this._window.addEventListener("WME_CLICK", this.onButtonClicked);
        this._window.addEventListener("WME_OVER", this.onOver);
        this._window.addEventListener("WME_OUT", this.onOut);
        if (_loc1_ != null) {
            _loc1_.addEventListener("WME_CLICK", this.onButtonClicked);
        }
    }

    private onOut = (param1: WindowMouseEvent): void => {
        if (!this._active) {
            this.setInactiveLook();
        }
    };

    private onOver = (param1: WindowMouseEvent): void => {
        if (!this._active) {
            this.setActiveLook();
        }
    };

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
        this.navigator.activateNode(this);
    };
}
