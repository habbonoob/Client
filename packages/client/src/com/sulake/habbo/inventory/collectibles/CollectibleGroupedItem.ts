import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { TradeNftItem } from '@/com/sulake/habbo/communication/messages/parser/collectibles/trading/TradeNftItem';
import type { CollectiblesModel } from '@/com/sulake/habbo/inventory/collectibles/CollectiblesModel';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { RenderableTradeNftItem } from '@/com/sulake/habbo/inventory/collectibles/RenderableTradeNftItem';
import { isIProductIconWidget } from '@/com/sulake/habbo/window/widgets/IProductIconWidget';

export class CollectibleGroupedItem {
    static { registerClassName(this, 'com.sulake.habbo.inventory.collectibles::CollectibleGroupedItem'); }

    private static readonly THUMB_COLOR_NORMAL: number = 13421772;
    private static readonly THUMB_COLOR_UNSEEN: number = 10275685;

    constructor(param1: TradeNftItem, param2: number[], param3: CollectiblesModel) {
        this._renderableItem = new RenderableTradeNftItem(param1);
        this._SafeStr_2303 = new UtilsMap();
        for (const _loc4_ of param2 ?? []) {
            this._SafeStr_2303.add(_loc4_, false);
        }
        this._SafeStr_2134 = param3;
        this._isUnseen = false;
        this.isSelected = false;
        let _loc5_: XmlAsset = asInstanceOf(this._SafeStr_2134.controller.assets.getAssetByName("inventory_thumb_nft_xml"), XmlAsset);
        if (_loc5_ == null || _loc5_.content == null) {
            return;
        }
        this._window = asGuarded(this._SafeStr_2134.controller.windowManager.buildFromXML(asInstanceOf(_loc5_.content, XML)), isIWindowContainer);
        this._window.procedure = this.itemEventProc;
        this._SafeStr_3024 = this._window.findChildByTag("BG_COLOR");
        this._name = this._SafeStr_2134.controller.catalog.collectorHub.getProductName(this._renderableItem);
        this.unlockedAssetCountChanged();
    }

    private _isInitialized: boolean = false;

    declare private _renderableItem: RenderableTradeNftItem;

    declare private _SafeStr_2303: UtilsMap;

    declare private _isSelected: boolean;
    static { (this.prototype as any)._isSelected = false; }

    declare private _SafeStr_3024: IWindow;

    declare private _SafeStr_2134: CollectiblesModel;

    declare private _window: IWindowContainer;

    public get window(): IWindowContainer {
        return this._window;
    }

    declare private _isUnseen: boolean;
    static { (this.prototype as any)._isUnseen = false; }

    public set isUnseen(param1: boolean) {
        if (this._isUnseen != param1) {
            this._isUnseen = param1;
            this.isSelected = this._isSelected;
        }
    }

    declare private _name: string;

    public get name(): string {
        return this._name;
    }

    public get isInitialized(): boolean {
        return this._isInitialized;
    }

    public get item(): TradeNftItem {
        return this._renderableItem.item;
    }

    public get assetIds(): any[] {
        return this._SafeStr_2303.getKeys();
    }

    public get amount(): number {
        return this._SafeStr_2303.length | 0;
    }

    public get unlockedAssetCount(): number {
        let _loc1_: number = 0;
        for (const _loc2_ of this._SafeStr_2303.getValues() ?? []) {
            if (!_loc2_) {
                _loc1_ += 1;
            }
        }
        return _loc1_;
    }

    public get isSelected(): boolean {
        return this._isSelected;
    }

    public set isSelected(param1: boolean) {
        this._isSelected = param1;
        if (this._SafeStr_3024 == null || this._window == null) {
            return;
        }
        this._SafeStr_3024.color = (this._isUnseen ? 10275685 : 13421772) >>> 0;
        this._window.findChildByName("outline").visible = param1;
    }

    public get renderableItem(): RenderableTradeNftItem {
        return this._renderableItem;
    }

    protected get nftIconWidget(): IWidgetWindow {
        return asGuarded(this._window.findChildByName("nft_icon"), isIWidgetWindow);
    }

    protected get numberContainer(): IWindowContainer {
        return asGuarded(this._window.findChildByName("number_container"), isIWindowContainer);
    }

    protected get numberText(): ITextWindow {
        return asGuarded(this._window.findChildByName("number"), isITextWindow);
    }

    public initializeImage(): void {
        (asGuarded(this.nftIconWidget.widget, isIProductIconWidget)).productInfo = this._renderableItem;
        this._isInitialized = true;
    }

    public addAssetId(param1: number): void {
        this._SafeStr_2303.add(param1, false);
        this.unlockedAssetCountChanged();
    }

    public pop(param1: number): number[] {
        let _loc2_: boolean = false;
        let _loc3_: number[] = [];
        for (const _loc4_ of this._SafeStr_2303.getKeys() ?? []) {
            _loc2_ = this._SafeStr_2303.getValue(_loc4_);
            if (!_loc2_) {
                _loc3_.push(Number(_loc4_));
            }
            if (_loc3_.length >= param1) {
                break;
            }
        }
        return _loc3_;
    }

    public removeAssetId(param1: number): boolean {
        if (this._SafeStr_2303.hasKey(param1)) {
            this._SafeStr_2303.remove(param1);
            this.unlockedAssetCountChanged();
            return true;
        }
        return false;
    }

    public hasAsset(param1: number, param2: boolean = false): boolean {
        let _loc3_: boolean = false;
        if (this._SafeStr_2303.hasKey(param1)) {
            _loc3_ = this._SafeStr_2303.getValue(param1);
            return _loc3_ == param2;
        }
        return false;
    }

    public lockAsset(param1: number, param2: boolean = false): boolean {
        if (!this._SafeStr_2303.hasKey(param1)) {
            return false;
        }
        let _loc3_: boolean = this._SafeStr_2303.getValue(param1);
        if (_loc3_ && param2) {
            this._SafeStr_2303.remove(param1);
            this._SafeStr_2303.add(param1, false);
            this.unlockedAssetCountChanged();
            return true;
        }
        if (!_loc3_ && !param2) {
            this._SafeStr_2303.remove(param1);
            this._SafeStr_2303.add(param1, true);
            this.unlockedAssetCountChanged();
            return true;
        }
        return false;
    }

    public unlockAll(): void {
        let _loc2_: boolean = false;
        for (const _loc1_ of this._SafeStr_2303.getKeys() ?? []) {
            if (this._SafeStr_2303.getValue(_loc1_)) {
                this._SafeStr_2303.remove(_loc1_);
                this._SafeStr_2303.add(_loc1_, false);
                _loc2_ = true;
            }
        }
        if (_loc2_) {
            this.unlockedAssetCountChanged();
        }
    }

    public dispose(): void {
        if (this._isSelected) {
            this._SafeStr_2134.setSelected(null);
        }
        if (this._window != null) {
            this._window.dispose();
            this._window = null;
        }
    }

    public removeIntervalProcedure(): void {
        if (this._window) {
            this._window.procedure = null;
        }
    }

    private unlockedAssetCountChanged(): void {
        let _loc2_: number = this.unlockedAssetCount;
        this.numberContainer.visible = _loc2_ > 1;
        this.numberText.caption = String(_loc2_);
        let _loc1_: number = _loc2_ == 0 ? 0.2 : 1;
        (asGuarded(this.nftIconWidget.widget, isIProductIconWidget)).blend = _loc1_;
    }

    private itemEventProc = (param1: WindowEvent, param2: IWindow): void => {
        switch (param1.type) {
            case "WME_CLICK":
                this._SafeStr_2134.setSelected(this);
                break;
            case "WME_DOUBLE_CLICK":
                this._SafeStr_2134.requestAddTrading(this, 1);
        }
    };
}
