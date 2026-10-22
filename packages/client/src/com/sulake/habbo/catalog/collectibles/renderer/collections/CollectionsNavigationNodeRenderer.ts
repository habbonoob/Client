import { asGuarded, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { CollectionsTab } from '@/com/sulake/habbo/catalog/collectibles/tabs/CollectionsTab';
import type { NftCollection } from '@/com/sulake/habbo/communication/messages/parser/collectibles/NftCollection';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { CollectionProgressColorUtil } from '@/com/sulake/habbo/catalog/collectibles/renderer/collections/CollectionProgressColorUtil';

export class CollectionsNavigationNodeRenderer implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.catalog.collectibles.renderer.collections::CollectionsNavigationNodeRenderer'); }

    constructor(param1: CollectionsTab, param2: NftCollection) {
        this._collectionsWidget = param1;
        this._nftCollection = param2;
        this.createWindow();
    }

    declare private _collectionsWidget: CollectionsTab;

    declare private _nftCollection: NftCollection;

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

    public get nftCollection(): NftCollection {
        return this._nftCollection;
    }

    public get disposed(): boolean {
        return this._window == null;
    }

    private get progressContainer(): IWindowContainer {
        return castGuarded(this._window.findChildByName("progress_container"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
    }

    private get progressColor(): IBorderWindow {
        return castGuarded(this.progressContainer.getChildByName("progress_color"), isIBorderWindow, "com.sulake.core.window.components.IBorderWindow");
    }

    private get progressText(): ITextWindow {
        return castGuarded(this.progressContainer.getChildByName("progress_text"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
    }

    private get progressColorHint(): IWindowContainer {
        return castGuarded(this._window.findChildByName("progress_color_hint"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
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
        this._window = asGuarded(this._collectionsWidget.navigationItemTemplate.clone(), isIWindowContainer);
        let _loc1_: ITextWindow = asGuarded(this._window.findChildByTag("ITEM_TITLE"), isITextWindow);
        if (_loc1_ != null) {
            _loc1_.caption = this._collectionsWidget.controller.localizationManager.getLocalization("collectibles.set." + this._nftCollection.collectionId, this.nftCollection.collectionName);
            this._itemNormalColor = _loc1_.textColor;
            this._itemSelectedEtchingColor = _loc1_.etchingColor;
        }
        let _loc2_: IWindow = this._window.findChildByTag("SELECTION_HILIGHT");
        if (_loc2_) {
            _loc2_.visible = false;
        }
        this.setProgressLook(false);
        this._window.addEventListener("WME_CLICK", this.onButtonClicked);
        this._window.addEventListener("WME_OVER", this.onOver);
        this._window.addEventListener("WME_OUT", this.onOut);
    }

    private setProgressLook(param1: boolean = false): void {
        let _loc4_: any = 0;
        let _loc5_: number = 0;
        let _loc2_: number = this._nftCollection.collectedItemCount;
        let _loc3_: number = this._nftCollection.totalItemCount;
        this.progressContainer.visible = _loc2_ > 0 && param1;
        this.progressColorHint.visible = _loc2_ > 0;
        if (_loc2_ > 0) {
            _loc4_ = CollectionProgressColorUtil.getColor(_loc2_, _loc3_);
            this.progressColorHint.color = (_loc4_ | 0xFF000000) >>> 0;
            if (param1) {
                _loc5_ = this._nftCollection.collectedItemCount * 100 / this._nftCollection.totalItemCount | 0;
                this.progressColor.color = _loc4_ >>> 0;
                this.progressText.caption = _loc5_ + "%";
            }
        }
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
        this.setProgressLook(this._hovered);
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
        this._collectionsWidget.activateCollection(this);
    };

    get [IDisposable](): true {
        return true;
    }
}
