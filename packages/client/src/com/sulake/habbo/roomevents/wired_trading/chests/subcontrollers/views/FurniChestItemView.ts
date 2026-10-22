import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { ChestBasedItem } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/chests/storage/ChestBasedItem';
import type { ChestStorage } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/chests/storage/ChestStorage';
import type { IStuffData } from '@/com/sulake/habbo/room/IStuffData';
import type { ChestBasedItemGroupView } from '@/com/sulake/habbo/roomevents/wired_trading/chests/subcontrollers/views/ChestBasedItemGroupView';
import type { FurniChestView } from '@/com/sulake/habbo/roomevents/wired_trading/chests/subcontrollers/views/FurniChestView';
import type { ILimitedItemGridOverlayWidget } from '@/com/sulake/habbo/window/widgets/ILimitedItemGridOverlayWidget';
import type { IProductIconWidget } from '@/com/sulake/habbo/window/widgets/IProductIconWidget';
import type { IRarityItemGridOverlayWidget } from '@/com/sulake/habbo/window/widgets/IRarityItemGridOverlayWidget';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { ChestItemTypeRenderableWrapper } from '@/com/sulake/habbo/roomevents/wired_trading/chests/subcontrollers/views/ChestItemTypeRenderableWrapper';
import { isILimitedItemGridOverlayWidget } from '@/com/sulake/habbo/window/widgets/ILimitedItemGridOverlayWidget';
import { isIProductIconWidget } from '@/com/sulake/habbo/window/widgets/IProductIconWidget';
import { isIRarityItemGridOverlayWidget } from '@/com/sulake/habbo/window/widgets/IRarityItemGridOverlayWidget';

export class FurniChestItemView implements IDisposable, ChestBasedItemGroupView {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_trading.chests.subcontrollers.views::FurniChestItemView'); }

    public static NOT_HOVERED_COLOR: number = 13355979;
    public static _SafeStr_7385: number = 14079702;

    public static initChestBasedIconUI(param1: ChestBasedItemGroupView, param2: ChestBasedItem): void {
        let _loc5_: ILimitedItemGridOverlayWidget = null;
        let _loc7_: number = 0;
        let _loc4_: IRarityItemGridOverlayWidget = null;
        if (param2 == null) {
            param1.ltdBackgroundBitmap.visible = false;
            param1.ltdOverlayWidget.visible = false;
            param1.rarityOverlayWidget.visible = false;
            param1.furniIcon.visible = false;
            return;
        }
        param1.furniIcon.visible = true;
        let _loc6_: IStuffData = param2.stuffData;
        let _loc8_: any = _loc6_.uniqueSerialNumber > 0;
        param1.ltdBackgroundBitmap.visible = _loc8_;
        param1.ltdOverlayWidget.visible = _loc8_;
        if (_loc8_) {
            _loc5_ = asGuarded(param1.ltdOverlayWidget.widget, isILimitedItemGridOverlayWidget);
            _loc5_.serialNumber = _loc6_.uniqueSerialNumber;
            _loc5_.seriesSize = _loc6_.uniqueSeriesSize;
        }
        let _loc3_: any = param2.specialType == 19;
        param1.rarityOverlayWidget.visible = _loc3_;
        if (_loc3_) {
            _loc7_ = _loc6_.rarityLevel;
            _loc4_ = asGuarded(param1.rarityOverlayWidget.widget, isIRarityItemGridOverlayWidget);
            _loc4_.rarityLevel = _loc7_;
        }
        let _loc9_: IProductIconWidget = asGuarded(param1.furniIcon.widget, isIProductIconWidget);
        _loc9_.productInfo = new ChestItemTypeRenderableWrapper(param2.type);
    }

    constructor(param1: IRegionWindow) {
        this._window = asGuarded(param1.clone(), isIRegionWindow);
        this._window.addEventListener("WME_CLICK", this.onClick);
        this._window.addEventListener("WME_OVER", this.onOver);
        this._window.addEventListener("WME_OUT", this.onOut);
    }

    declare private _storages: ChestStorage[];

    declare private _SafeStr_3643: FurniChestView;

    private _active: boolean = false;
    private _hovered: boolean = false;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    public get disposed(): boolean {
        return this._disposed;
    }

    declare private _window: IRegionWindow;

    public get window(): IRegionWindow {
        return this._window;
    }

    public get numItems(): number {
        return (this._storages.length == 0 ? 0 : this._storages.length) | 0;
    }

    public get chestBasedItemSample(): ChestBasedItem {
        return this.peek();
    }

    public get ltdBackgroundBitmap(): IStaticBitmapWrapperWindow {
        return asGuarded(this._window.findChildByName("unique_item_background_bitmap"), isIStaticBitmapWrapperWindow);
    }

    public get furniIcon(): IWidgetWindow {
        return asGuarded(this._window.findChildByName("furni_icon"), isIWidgetWindow);
    }

    public get ltdOverlayWidget(): IWidgetWindow {
        return asGuarded(this._window.findChildByName("unique_item_overlay_container"), isIWidgetWindow);
    }

    public get rarityOverlayWidget(): IWidgetWindow {
        return asGuarded(this._window.findChildByName("rarity_item_overlay_container"), isIWidgetWindow);
    }

    private get border(): IBorderWindow {
        return asGuarded(this._window.findChildByName("border"), isIBorderWindow);
    }

    private get focusOutline(): IStaticBitmapWrapperWindow {
        return asGuarded(this._window.findChildByName("outline_focus"), isIStaticBitmapWrapperWindow);
    }

    private get numberContainer(): IWindowContainer {
        return asGuarded(this._window.findChildByName("number_container"), isIWindowContainer);
    }

    private get furniQuantity(): ITextWindow {
        return asGuarded(this._window.findChildByName("furni_quantity"), isITextWindow);
    }

    public initialize(param1: FurniChestView, param2: ChestStorage[]): void {
        this._SafeStr_3643 = param1;
        this._storages = param2;
        this.initializeUI();
    }

    public peek(): ChestStorage {
        return this._storages.length == 0 ? null : this._storages[0];
    }

    public remove(param1: ChestStorage): void {
        let _loc2_: number = this._storages.indexOf(param1);
        if (_loc2_ != -1) {
            this._storages.splice(_loc2_, 1)[0];
        }
        this.updateUI();
    }

    public add(param1: ChestStorage): void {
        this._storages.push(param1);
        this.updateUI();
    }

    public updateUI(): void {
        if (this.numItems > 1) {
            this.numberContainer.visible = true;
            this.furniQuantity.text = String(this.numItems);
        } else {
            this.numberContainer.visible = false;
        }
    }

    public updateColoring(): void {
        this.focusOutline.visible = this._active;
        this.border.color = this._hovered ? FurniChestItemView._SafeStr_7385 : FurniChestItemView.NOT_HOVERED_COLOR;
    }

    public activate(): void {
        this._active = true;
        this.updateColoring();
    }

    public deactivate(): void {
        this._active = false;
        this.updateColoring();
    }

    public recycle(): void {
        this._storages = null;
        this._active = false;
        this._hovered = false;
        this._SafeStr_3643 = null;
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._storages = null;
        this._window.dispose();
        this._window = null;
        this._active = false;
        this._hovered = false;
        this._SafeStr_3643 = null;
        this._disposed = true;
    }

    private initializeUI(): void {
        let _loc1_: ChestStorage = this.peek();
        if (_loc1_ == null) {
            return;
        }
        FurniChestItemView.initChestBasedIconUI(this, _loc1_);
        this.updateUI();
        this.updateColoring();
    }

    private onOut = (param1: WindowMouseEvent): void => {
        this._hovered = false;
        this.updateColoring();
    };

    private onOver = (param1: WindowMouseEvent): void => {
        this._hovered = true;
        this.updateColoring();
    };

    private onClick = (param1: WindowMouseEvent): void => {
        if (this._SafeStr_3643 != null) {
            this._SafeStr_3643.selectItemView(this);
        }
    };

    get [IDisposable](): true {
        return true;
    }
}
