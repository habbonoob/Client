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
import type { ChestItemType } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/chests/storage/ChestItemType';
import type { ChestBasedItemGroupView } from '@/com/sulake/habbo/roomevents/wired_trading/chests/subcontrollers/views/ChestBasedItemGroupView';
import type { WiredTransactionDetailsController } from '@/com/sulake/habbo/roomevents/wired_trading/transactions/details/WiredTransactionDetailsController';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { FurniChestItemView } from '@/com/sulake/habbo/roomevents/wired_trading/chests/subcontrollers/views/FurniChestItemView';
import { FurniChestView } from '@/com/sulake/habbo/roomevents/wired_trading/chests/subcontrollers/views/FurniChestView';
import { TransactionChestItemWrapper } from '@/com/sulake/habbo/roomevents/wired_trading/transactions/details/furni_overview/TransactionChestItemWrapper';

export class TransactionItemView implements IDisposable, ChestBasedItemGroupView {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_trading.transactions.details.furni_overview::TransactionItemView'); }

    public static readonly TYPE_FURNI: number = 0;
    public static readonly _SafeStr_8312: number = 1;
    public static readonly TYPE_INCOMPLETE_DATA: number = 2;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    declare private _controller: WiredTransactionDetailsController;

    declare private _count: number;
    static { (this.prototype as any)._count = 0; }

    declare private _type: number;
    static { (this.prototype as any)._type = 0; }

    declare private _itemType: ChestItemType;

    declare private _chestBasedItemSample: ChestBasedItem;

    private _hovered: boolean = false;

    declare private _window: IRegionWindow;

    constructor(param1: IRegionWindow, param2: WiredTransactionDetailsController) {
        this._window = asGuarded(param1.clone(), isIRegionWindow);
        this._controller = param2;
        this._window.addEventListener("WME_OVER", this.onOver);
        this._window.addEventListener("WME_OUT", this.onOut);
    }

    public get window(): IRegionWindow {
        return this._window;
    }

    public initialize(param1: number, param2: number, param3: ChestItemType): void {
        this._count = param1;
        this._type = param2;
        this._itemType = param3;
        if (param3 == null) {
            this._chestBasedItemSample = null;
        } else {
            this._chestBasedItemSample = new TransactionChestItemWrapper(param3);
        }
        let _loc4_: string = "";
        if (this._type == 0) {
            _loc4_ = FurniChestView.getChestBasedItemName(this._chestBasedItemSample, this._controller.localizationManager, this._controller.sessionDataManager);
        } else if (this._type == 1) {
            _loc4_ = "${wiredcontracts.element.type.0}";
        } else if (this._type == 2) {
            _loc4_ = "${wiredchests.log_details.incomplete_data}";
        }
        this._window.toolTipCaption = _loc4_;
        this.initializeUI();
    }

    public get numItems(): number {
        return this._count;
    }

    private initializeUI(): void {
        FurniChestItemView.initChestBasedIconUI(this, this._chestBasedItemSample);
        this.coinsIcon.visible = this._type == 1;
        this.incompleteText.visible = this._type == 2;
        this.updateUI();
        this.updateColoring();
    }

    public updateUI(): void {
        if (this._type == 2) {
            this.numberContainer.visible = false;
            this.incompleteText.fontSize = (this.numItems >= 1000 ? 12 : 16) >>> 0;
            this.incompleteText.text = "+" + this.numItems;
        } else if (this.numItems > 1) {
            this.numberContainer.visible = true;
            this.furniQuantity.text = String(this.numItems);
        } else {
            this.numberContainer.visible = false;
        }
    }

    public updateColoring(): void {
        this.focusOutline.visible = false;
        this.border.color = this._hovered ? FurniChestItemView._SafeStr_7385 : FurniChestItemView.NOT_HOVERED_COLOR;
    }

    private onOut = (param1: WindowMouseEvent): void => {
        this._hovered = false;
        this.updateColoring();
    };

    private onOver = (param1: WindowMouseEvent): void => {
        this._hovered = true;
        this.updateColoring();
    };

    public recycle(): void {
        this._hovered = false;
        this._count = 0;
        this._itemType = null;
    }

    public get chestBasedItemSample(): ChestBasedItem {
        return this._chestBasedItemSample;
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._window.dispose();
        this._window = null;
        this._hovered = false;
        this._count = 0;
        this._itemType = null;
        this._disposed = true;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    private get border(): IBorderWindow {
        return asGuarded(this._window.findChildByName("border"), isIBorderWindow);
    }

    private get focusOutline(): IStaticBitmapWrapperWindow {
        return asGuarded(this._window.findChildByName("outline_focus"), isIStaticBitmapWrapperWindow);
    }

    public get ltdBackgroundBitmap(): IStaticBitmapWrapperWindow {
        return asGuarded(this._window.findChildByName("unique_item_background_bitmap"), isIStaticBitmapWrapperWindow);
    }

    public get coinsIcon(): IStaticBitmapWrapperWindow {
        return asGuarded(this._window.findChildByName("coins_icon"), isIStaticBitmapWrapperWindow);
    }

    public get incompleteText(): ITextWindow {
        return asGuarded(this._window.findChildByName("incomplete_text"), isITextWindow);
    }

    public get furniIcon(): IWidgetWindow {
        return asGuarded(this._window.findChildByName("furni_icon"), isIWidgetWindow);
    }

    private get numberContainer(): IWindowContainer {
        return asGuarded(this._window.findChildByName("number_container"), isIWindowContainer);
    }

    private get furniQuantity(): ITextWindow {
        return asGuarded(this._window.findChildByName("furni_quantity"), isITextWindow);
    }

    public get ltdOverlayWidget(): IWidgetWindow {
        return asGuarded(this._window.findChildByName("unique_item_overlay_container"), isIWidgetWindow);
    }

    public get rarityOverlayWidget(): IWidgetWindow {
        return asGuarded(this._window.findChildByName("rarity_item_overlay_container"), isIWidgetWindow);
    }

    get [IDisposable](): true {
        return true;
    }
}
