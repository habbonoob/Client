import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBubbleWindow } from '@/com/sulake/core/window/components/IBubbleWindow';
import type { IDesktopWindow } from '@/com/sulake/core/window/components/IDesktopWindow';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { IIconWindow } from '@/com/sulake/core/window/components/IIconWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { WiredTransactionDetails } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/transactions/WiredTransactionDetails';
import type { WiredTransactionInfo } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/transactions/WiredTransactionInfo';
import type { WiredTransactionDetailsController } from '@/com/sulake/habbo/roomevents/wired_trading/transactions/details/WiredTransactionDetailsController';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIBubbleWindow } from '@/com/sulake/core/window/components/IBubbleWindow';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isIIconWindow } from '@/com/sulake/core/window/components/IIconWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { WiredChestWrapperView } from '@/com/sulake/habbo/roomevents/wired_trading/chests/WiredChestWrapperView';
import { TransactionOverviewView } from '@/com/sulake/habbo/roomevents/wired_trading/transactions/details/furni_overview/TransactionOverviewView';

export class WiredTransactionDetailsView implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_trading.transactions.details::WiredTransactionDetailsView'); }

    private static readonly PROPERTY_TRANSACTION_TYPE: string = "transaction_type";
    private static readonly PROPERTY_TIMESTAMP: string = "timestamp";
    private static readonly PROPERTY_ROOM_ID: string = "room_id";
    private static readonly PROPERTY_CHEST_IDS: string = "chest_ids";
    private static readonly PROPERTY_USERNAME: string = "username";
    private static readonly PROPERTY_FURNI_TRANSACTIONS: string = "furni_transactions";
    private static readonly PROPERTY_EXTRA: string = "extra";
    public static readonly DESKTOP_WINDOW_LAYER: number = 1;
    private _disposed: boolean = false;

    declare private _controller: WiredTransactionDetailsController;

    declare private _windowManager: IHabboWindowManager;

    declare private _SafeStr_3943: TransactionOverviewView;

    declare private _SafeStr_3879: TransactionOverviewView;

    declare private _window: IFrameWindow;

    declare private _SafeStr_2806: IBubbleWindow;

    constructor(param1: WiredTransactionDetailsController, param2: IHabboWindowManager) {
        this._controller = param1;
        this._windowManager = param2;
        this._window = asGuarded(this._windowManager.buildFromXML(XML.from(this._controller.assets.getAssetByName("transaction_details_xml").content), 1), isIFrameWindow);
        this.closeButton.addEventListener("WME_CLICK", this.onClose);
        this.extraInfoButton.addEventListener("WME_CLICK", this.onExtraButtonClick);
        this._SafeStr_3943 = new TransactionOverviewView(param1, this.withdrawalsContainer);
        this._SafeStr_3879 = new TransactionOverviewView(param1, this.depositsContainer);
        this._SafeStr_2806 = asGuarded(this._window.findChildByName("extra_info_bubble"), isIBubbleWindow);
        this._window.desktop.addChild(this._SafeStr_2806);
        this._SafeStr_2806.visible = false;
        this._SafeStr_2806.addEventListener("WE_DEACTIVATED", this.onExtraInfoBubbleDeactivates);
    }

    private onClose = (param1: WindowMouseEvent): void => {
        this.hide();
    };

    public hide(): void {
        let _loc1_: IDesktopWindow = null;
        if (this.isShowing()) {
            _loc1_ = this._windowManager.getDesktop(1);
            if (_loc1_ != null) {
                _loc1_.removeChild(this._window);
            }
            this.clear();
        }
    }

    public show(): void {
        let _loc1_: IDesktopWindow = null;
        if (!this.isShowing()) {
            _loc1_ = this._windowManager.getDesktop(1);
            if (_loc1_ != null) {
                _loc1_.addChild(this._window);
                this._window.center();
            }
        }
    }

    public clear(): void {
        this._SafeStr_2806.visible = false;
        this._SafeStr_3943.clear();
        this._SafeStr_3879.clear();
    }

    public isShowing(): boolean {
        return this._window.parent != null;
    }

    public updateUI(): void {
        if (this._controller.details == null) {
            return;
        }
        let _loc1_: WiredTransactionDetails = this._controller.details;
        let _loc2_: WiredTransactionInfo = _loc1_.transactionInfo;
        this.getValueWindow("transaction_type").text = this.loc("wired_transactions.type." + _loc2_.transactionType);
        this.getValueWindow("timestamp").text = _loc2_.readableTimestamp;
        this.getValueWindow("room_id").text = String(_loc2_.flatId);
        this.getValueWindow("chest_ids").text = _loc1_.chestIds.join(", ");
        this.getValueWindow("username").text = _loc2_.userName;
        this.getValueWindow("extra").text = _loc2_.transactionDefinitionInfo == "" ? "-" : _loc2_.transactionDefinitionInfo;
        this._SafeStr_3943.itemsInitialize(_loc2_.withdrawCoinsCount, _loc1_.withdrawnFurnis, _loc2_.withdrawFurniCount, _loc1_.isIncompleteData);
        this._SafeStr_3879.itemsInitialize(_loc2_.depositCoinsCount, _loc1_.depositedFurnis, _loc2_.depositFurniCount, _loc1_.isIncompleteData);
        this._SafeStr_2806.visible = false;
        this._window.activate();
    }

    public loc(param1: string): string {
        return this._controller.localizationManager.getLocalization(param1, param1);
    }

    private onExtraInfoBubbleDeactivates = (param1: WindowEvent): void => {
        this._SafeStr_2806.visible = false;
    };

    private onExtraButtonClick = (param1: WindowMouseEvent): void => {
        this._SafeStr_2806.visible = true;
        WiredChestWrapperView.relocateBubbleFocus(this._SafeStr_2806, this.extraInfoButton);
    };

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._SafeStr_2806.dispose();
        this._SafeStr_2806 = null;
        this._SafeStr_3943.dispose();
        this._SafeStr_3879.dispose();
        this._SafeStr_3943 = null;
        this._SafeStr_3879 = null;
        this._window.dispose();
        this._window = null;
        this._controller = null;
        this._windowManager = null;
        this._disposed = true;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    private get closeButton(): IWindow {
        return this._window.findChildByName("header_button_close");
    }

    private getPairWindow(param1: string): IItemListWindow {
        return asGuarded(this._window.findChildByName(param1 + "_pair"), isIItemListWindow);
    }

    private getKeyWindow(param1: string): ITextWindow {
        return asGuarded(this.getPairWindow(param1).getListItemAt(0), isITextWindow);
    }

    private getValueWindow(param1: string): ITextWindow {
        return asGuarded(this.getPairWindow(param1).getListItemAt(1), isITextWindow);
    }

    private getIconWindow(param1: string): IIconWindow {
        return asGuarded(this.getPairWindow(param1).getListItemAt(2), isIIconWindow);
    }

    private get withdrawalsContainer(): IWindowContainer {
        return asGuarded(this._window.findChildByName("withdrawals_container"), isIWindowContainer);
    }

    private get depositsContainer(): IWindowContainer {
        return asGuarded(this._window.findChildByName("deposits_container"), isIWindowContainer);
    }

    private get extraInfoButton(): IRegionWindow {
        return asGuarded(this._window.findChildByName("extra_info_button"), isIRegionWindow);
    }

    get [IDisposable](): true {
        return true;
    }
}
