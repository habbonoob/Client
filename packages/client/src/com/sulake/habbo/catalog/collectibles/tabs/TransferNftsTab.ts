import { asGuarded, castGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { IDropMenuWindow } from '@/com/sulake/core/window/components/IDropMenuWindow';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IConfirmDialog } from '@/com/sulake/core/window/utils/IConfirmDialog';
import type { CollectiblesController } from '@/com/sulake/habbo/catalog/collectibles/CollectiblesController';
import type { CollectiblesView } from '@/com/sulake/habbo/catalog/collectibles/CollectiblesView';
import type { NftTransferAssetsResultMessageEventParser } from '@/com/sulake/habbo/communication/messages/parser/collectibles/NftTransferAssetsResultMessageEventParser';
import type { NftTransferFeeMessageEventParser } from '@/com/sulake/habbo/communication/messages/parser/collectibles/NftTransferFeeMessageEventParser';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { IUpdateReceiver } from '@/com/sulake/core/runtime/IUpdateReceiver';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isIDropMenuWindow } from '@/com/sulake/core/window/components/IDropMenuWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { CollectionsTab } from '@/com/sulake/habbo/catalog/collectibles/tabs/CollectionsTab';
import { NftTransferAssetsResultMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/collectibles/NftTransferAssetsResultMessageEvent';
import { NftTransferFeeMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/collectibles/NftTransferFeeMessageEvent';
import { GetNftTransferFeeMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/collectibles/GetNftTransferFeeMessageComposer';
import { NftTransferAssetsMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/collectibles/NftTransferAssetsMessageComposer';

export class TransferNftsTab implements IUpdateReceiver {
    static { registerClassName(this, 'com.sulake.habbo.catalog.collectibles.tabs::TransferNftsTab'); }

    constructor(param1: CollectiblesView, param2: CollectiblesController) {
        this._SafeStr_3090 = param1;
        this._SafeStr_2288 = param2;
        this._SafeStr_2225 = asGuarded(this._SafeStr_3090.window.findChildByName("transferContainer"), isIWindowContainer);
        this._loadingIcon = castGuarded(this._SafeStr_2225.findChildByName("loading_icon"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow");
        this.addMessageEvents();
        this.initializeData();
        this.updateReadyState();
        this.updateTransferButtonState();
        param2.registerUpdateReceiver(this, 1);
        this.transferButton.addEventListener("WME_CLICK", this.onTransferClicked);
        this.transferWalletSelection.addEventListener("WE_SELECTED", this.onSelectWallet);
    }

    declare private _messageEvents: IMessageEvent[];

    declare private _SafeStr_3090: CollectiblesView;

    declare private _SafeStr_2225: IWindowContainer;

    declare private _SafeStr_2288: CollectiblesController;

    declare private _SafeStr_5356: boolean;
    static { (this.prototype as any)._SafeStr_5356 = false; }

    declare private _waitingForAddresses: boolean;
    static { (this.prototype as any)._waitingForAddresses = false; }

    declare private _SafeStr_4571: number;
    static { (this.prototype as any)._SafeStr_4571 = 0; }

    declare private _isTransferring: boolean;
    static { (this.prototype as any)._isTransferring = false; }

    declare private _SafeStr_5285: any[];

    declare private _loadingIcon: IStaticBitmapWrapperWindow;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    public get disposed(): boolean {
        return this._disposed;
    }

    private get selectedWallet(): string {
        if (this._SafeStr_5285 == null) {
            return null;
        }
        let _loc1_: number = this.transferWalletSelection.selection;
        if (_loc1_ < 0 || _loc1_ >= this._SafeStr_5285.length) {
            return null;
        }
        return stringOrNull(this._SafeStr_5285[_loc1_]);
    }

    private get isReady(): boolean {
        return !this._waitingForAddresses && !this._SafeStr_5356;
    }

    private get localization(): IHabboLocalizationManager {
        return this._SafeStr_2288.localizationManager;
    }

    private get loadingContainer(): IWindowContainer {
        return asGuarded(this._SafeStr_2225.findChildByName("loading_contents"), isIWindowContainer);
    }

    private get loadedContainer(): IWindowContainer {
        return asGuarded(this._SafeStr_2225.findChildByName("loaded_content"), isIWindowContainer);
    }

    private get silverFeeText(): ITextWindow {
        return asGuarded(this._SafeStr_2225.findChildByName("transfer_fee_text"), isITextWindow);
    }

    private get transferButton(): IButtonWindow {
        return asGuarded(this._SafeStr_2225.findChildByName("transfer_button"), isIButtonWindow);
    }

    private get transferWalletSelection(): IDropMenuWindow {
        return asGuarded(this._SafeStr_2225.findChildByName("transfer_wallet_selection"), isIDropMenuWindow);
    }

    private get silverIcon(): IStaticBitmapWrapperWindow {
        return asGuarded(this._SafeStr_2225.findChildByName("transfer_fee_icon"), isIStaticBitmapWrapperWindow);
    }

    public onSilverBalanceUpdated(): void {
        this.updateTransferButtonState();
    }

    public onWalletsAddressesUpdated(param1: any[]): void {
        this.initializeTransferWallets(param1);
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._disposed = true;
        this.removeMessageEvents();
        this._SafeStr_2288.removeUpdateReceiver(this);
        throw new TypeError("super.dispose is not a function");
    }

    public update(param1: number): void {
        let _loc2_: number = NaN;
        if (!this.isReady) {
            _loc2_ = CollectionsTab._SafeStr_4583 * (param1 / 1000);
            this._loadingIcon.rotation += _loc2_;
            this._loadingIcon.rotation %= 360;
            this._loadingIcon.invalidate();
        }
    }

    private onSelectWallet = (param1: WindowEvent): void => {
        let _loc2_: string = null;
        let _loc3_: number = this.transferWalletSelection.selection;
        if (_loc3_ >= 0) {
            _loc2_ = stringOrNull(this.transferWalletSelection.enumerateSelection()[_loc3_]);
            if (_loc2_.length > 32) {
                this.transferWalletSelection.caption = _loc2_.substring(0, 32) + "...";
            }
        }
        this.updateReadyState();
    };

    private addMessageEvents(): void {
        if (!this._SafeStr_2288) {
            return;
        }
        this._messageEvents = new Array<IMessageEvent>(0).fill(null);
        this._messageEvents.push(new NftTransferFeeMessageEvent(this.onNftTransferFeeMessage));
        this._messageEvents.push(new NftTransferAssetsResultMessageEvent(this.onNftTransferResultMessage));
        for (const _loc1_ of this._messageEvents ?? []) {
            this._SafeStr_2288.addMessageEvent(_loc1_);
        }
    }

    private onNftTransferFeeMessage = (param1: NftTransferFeeMessageEvent): void => {
        this._SafeStr_5356 = false;
        let _loc2_: NftTransferFeeMessageEventParser = param1.getParser();
        this._SafeStr_4571 = _loc2_.transferFee;
        this.silverFeeText.text = String(this._SafeStr_4571);
        this.silverFeeText.visible = this._SafeStr_4571 > 0;
        this.silverIcon.visible = this._SafeStr_4571 > 0;
        this.updateReadyState();
        this.updateTransferButtonState();
    };

    private updateReadyState(): void {
        this.loadedContainer.visible = this.isReady;
        this.loadingContainer.visible = !this.isReady;
    }

    private updateTransferButtonState(): void {
        let _loc1_: any = this._SafeStr_4571 <= this._SafeStr_2288.catalog.getPurse().silverBalance;
        let _loc2_: boolean = this._SafeStr_3090.stardustWallet != null && this._SafeStr_3090.stardustWallet != "";
        let _loc4_: any = !this._isTransferring;
        let _loc3_: any = this.selectedWallet != null;
        if (_loc1_ && _loc2_ && _loc4_ && _loc3_) {
            this.transferButton.enable();
        } else {
            this.transferButton.disable();
        }
    }

    private onTransferClicked = (param1: WindowMouseEvent): void => {
        this.transferButton.disable();
        let _loc2_: IConfirmDialog = this._SafeStr_2288.windowManager.confirm("${collectibles.transfer}", "${collectibles.transfer.confirm}", 0, this.onTransferConfirm);
        _loc2_.titleBarColor = 2763306;
    };

    private onTransferConfirm = (param1: IConfirmDialog, param2: WindowEvent): void => {
        param1.dispose();
        if (param2.type == "WE_OK") {
            this._isTransferring = true;
            this._SafeStr_2288.send(new NftTransferAssetsMessageComposer(this.selectedWallet));
        }
        this.updateTransferButtonState();
    };

    private onNftTransferResultMessage = (param1: NftTransferAssetsResultMessageEvent): void => {
        let _loc2_: NftTransferAssetsResultMessageEventParser = param1.getParser();
        this._SafeStr_2288.notifications.addItem(_loc2_.success ? this.localization.getLocalization("collectibles.transfer.success") : this.localization.getLocalizationWithParams("collectibles.transfer.error", "", "id", _loc2_.resultCode), "info", "icon_curator_stamp_large_png");
        this._isTransferring = false;
        this.updateTransferButtonState();
    };

    private initializeTransferWallets(param1: any[]): void {
        this.transferWalletSelection.populate(param1);
        this._SafeStr_5285 = param1;
        if (param1.length == 0) {
            this.transferWalletSelection.color = 13421772;
            this.transferWalletSelection.disable();
        } else {
            this.transferWalletSelection.color = 16777215;
            this.transferWalletSelection.enable();
            this.transferWalletSelection.selection = 0;
        }
        this._waitingForAddresses = false;
        this.updateReadyState();
        this.updateTransferButtonState();
    }

    private initializeData(): void {
        this._SafeStr_5356 = true;
        this._SafeStr_2288.send(new GetNftTransferFeeMessageComposer());
        let _loc1_: any[] = this._SafeStr_3090.walletAddresses;
        if (_loc1_) {
            this.initializeTransferWallets(_loc1_);
        }
        this._waitingForAddresses = _loc1_ == null;
    }

    private removeMessageEvents(): void {
        if (!this._SafeStr_2288 || !this._messageEvents) {
            return;
        }
        for (const _loc1_ of this._messageEvents ?? []) {
            this._SafeStr_2288.removeMessageEvent(_loc1_);
            _loc1_.dispose();
        }
        this._messageEvents = null;
    }

    get [IUpdateReceiver](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
