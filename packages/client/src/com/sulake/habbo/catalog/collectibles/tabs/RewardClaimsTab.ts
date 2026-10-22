import { asGuarded, castGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { CollectiblesController } from '@/com/sulake/habbo/catalog/collectibles/CollectiblesController';
import type { CollectiblesView } from '@/com/sulake/habbo/catalog/collectibles/CollectiblesView';
import type { NftClaim } from '@/com/sulake/habbo/communication/messages/parser/collectibles/NftClaim';
import type { NftClaimResultMessageEventParser } from '@/com/sulake/habbo/communication/messages/parser/collectibles/NftClaimResultMessageEventParser';
import type { NftClaimsMessageEventParser } from '@/com/sulake/habbo/communication/messages/parser/collectibles/NftClaimsMessageEventParser';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { DateTimeFormatter } from '@habbo-pixi/runtime/globalization/DateTimeFormatter';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { IUpdateReceiver } from '@/com/sulake/core/runtime/IUpdateReceiver';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { RewardCollectibleItemRenderer } from '@/com/sulake/habbo/catalog/collectibles/renderer/RewardCollectibleItemRenderer';
import { CollectionsTab } from '@/com/sulake/habbo/catalog/collectibles/tabs/CollectionsTab';
import { NftClaimResultMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/collectibles/NftClaimResultMessageEvent';
import { NftClaimsMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/collectibles/NftClaimsMessageEvent';
import { ClaimNftClaimsMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/collectibles/ClaimNftClaimsMessageComposer';
import { GetNftClaimsMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/collectibles/GetNftClaimsMessageComposer';

export class RewardClaimsTab implements IUpdateReceiver {
    static { registerClassName(this, 'com.sulake.habbo.catalog.collectibles.tabs::RewardClaimsTab'); }

    constructor(param1: CollectiblesView, param2: CollectiblesController) {
        this._SafeStr_3090 = param1;
        this._SafeStr_2288 = param2;
        this._SafeStr_4438 = new DateTimeFormatter("i-default");
        this._SafeStr_4438.setDateTimePattern("dd/MM/yyyy");
        this._SafeStr_4162 = new Timer(600);
        this._SafeStr_4162.addEventListener("timer", this.processNextRequest);
        this._SafeStr_2225 = asGuarded(this._SafeStr_3090.window.findChildByName("rewardsContainer"), isIWindowContainer);
        this._loadingIcon = castGuarded(this._SafeStr_2225.findChildByName("loading_icon"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow");
        this._SafeStr_3000 = castGuarded(this._SafeStr_2225.findChildByName("itemlist"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow");
        this._rewardTemplate = this._SafeStr_3000.removeListItem(this._SafeStr_3000.getListItemByName("item_template"));
        this._listItems = [];
        this.setReady(false);
        this.addMessageEvents();
        this.updateClaimButtonState();
        param2.registerUpdateReceiver(this, 1);
        this.claimButton.addEventListener("WME_CLICK", this.onClaimClicked);
    }

    declare private _messageEvents: IMessageEvent[];

    declare private _SafeStr_3090: CollectiblesView;

    declare private _SafeStr_2225: IWindowContainer;

    declare private _SafeStr_2288: CollectiblesController;

    declare private _SafeStr_3000: IItemListWindow;

    declare private _listItems: RewardCollectibleItemRenderer[];

    declare private _rewardTemplate: IWindow;

    declare private _SafeStr_4438: DateTimeFormatter;

    declare private _isReady: boolean;
    static { (this.prototype as any)._isReady = false; }

    declare private _SafeStr_5493: boolean;
    static { (this.prototype as any)._SafeStr_5493 = false; }

    private _SafeStr_4306: any[] = [];

    declare private _SafeStr_4162: Timer;

    private _isRequestInProgress: boolean = false;

    declare private _loadingIcon: IStaticBitmapWrapperWindow;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    public get disposed(): boolean {
        return this._disposed;
    }

    private get isReady(): boolean {
        return this._isReady;
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

    private get noContentContainer(): IWindowContainer {
        return asGuarded(this._SafeStr_2225.findChildByName("no_content_container"), isIWindowContainer);
    }

    private get claimButton(): IButtonWindow {
        return asGuarded(this._SafeStr_2225.findChildByName("claim_button"), isIButtonWindow);
    }

    public onWalletsAddressesUpdated(param1: any[]): void {
        this.requestRewardClaims(param1);
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._disposed = true;
        this.clearItems();
        this._SafeStr_4162.removeEventListener("timer", this.processNextRequest);
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

    private addMessageEvents(): void {
        if (!this._SafeStr_2288) {
            return;
        }
        this._messageEvents = new Array<IMessageEvent>(0).fill(null);
        this._messageEvents.push(new NftClaimsMessageEvent(this.onNftClaimsMessage));
        this._messageEvents.push(new NftClaimResultMessageEvent(this.onNftClaimResultMessage));
        for (const _loc1_ of this._messageEvents ?? []) {
            this._SafeStr_2288.addMessageEvent(_loc1_);
        }
    }

    private requestRewardClaims(param1: any[]): void {
        let _loc2_: number = 0;
        _loc2_ = 0;
        while (_loc2_ < param1.length) {
            this.requestClaimsForWallet(stringOrNull(param1[_loc2_]));
            _loc2_++;
        }
    }

    private requestClaimsForWallet(param1: string): void {
        this._SafeStr_4306.push(param1);
        if (!this._SafeStr_4162.running) {
            this._SafeStr_4162.start();
        }
    }

    private updateClaimButtonState(): void {
        let _loc1_: boolean = this._SafeStr_3000 != null && this._SafeStr_3000.numListItems > 0;
        let _loc2_: boolean = !this._SafeStr_5493 && !this._isRequestInProgress;
        if (_loc1_ && _loc2_) {
            this.claimButton.enable();
        } else {
            this.claimButton.disable();
        }
    }

    private onClaimClicked = (param1: WindowMouseEvent): void => {
        this.claimButton.disable();
        this._SafeStr_5493 = true;
        this._SafeStr_2288.send(new ClaimNftClaimsMessageComposer());
        this.setReady(false);
    };

    private onNftClaimsMessage = (param1: NftClaimsMessageEvent): void => {
        let _loc3_: NftClaimsMessageEventParser = param1.getParser();
        for (const _loc2_ of _loc3_.nftClaims ?? []) {
            if (_loc2_.claimedAmount < _loc2_.claimLimit) {
                this.createRewardItem(_loc2_);
            }
        }
        this._isRequestInProgress = false;
        if (this._SafeStr_4306.length == 0) {
            this._SafeStr_4162.stop();
            this.setReady(true);
            this.updateClaimButtonState();
        }
    };

    private onNftClaimResultMessage = (param1: NftClaimResultMessageEvent): void => {
        let _loc2_: NftClaimResultMessageEventParser = param1.getParser();
        this._SafeStr_2288.notifications.addItem(_loc2_.success ? this.localization.getLocalization("collectibles.claiming.success") : this.localization.getLocalizationWithParams("collectibles.claiming.failed", "", "id", _loc2_.resultCode), "info", "icon_curator_stamp_large_png");
        if (_loc2_.success) {
            this.clearItems();
        }
        this._SafeStr_5493 = false;
        this.updateClaimButtonState();
        this.setReady(true);
    };

    private createRewardItem(param1: NftClaim): void {
        if (param1 == null) {
            return;
        }
        let _loc3_: IWindowContainer = asGuarded(this._rewardTemplate.clone(), isIWindowContainer);
        let _loc2_: RewardCollectibleItemRenderer = new RewardCollectibleItemRenderer(this._SafeStr_2288, param1, _loc3_, this);
        this._listItems.push(_loc2_);
        this._SafeStr_3000.addListItem(_loc3_);
        _loc2_.updateVisuals();
        _loc2_.updateExpiresText(this._SafeStr_4438.format(new Date(param1.validTo)));
    }

    private setReady(param1: boolean): void {
        let _loc2_: boolean = this._SafeStr_3000 != null && this._SafeStr_3000.numListItems > 0;
        this.loadedContainer.visible = param1 && _loc2_;
        this.noContentContainer.visible = param1 && !_loc2_;
        this.loadingContainer.visible = !param1;
        this._isReady = param1;
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

    private clearItems(): void {
        if (this._listItems) {
            for (const _loc1_ of this._listItems ?? []) {
                _loc1_.dispose();
            }
            this._listItems.length = 0;
        }
        if (this._SafeStr_3000) {
            this._SafeStr_3000.destroyListItems();
        }
    }

    private processNextRequest = (param1: TimerEvent): void => {
        if (this._isRequestInProgress || this._SafeStr_4306.length == 0) {
            return;
        }
        let _loc2_: string = stringOrNull(this._SafeStr_4306.shift());
        this._SafeStr_2288.send(new GetNftClaimsMessageComposer(_loc2_));
        this._isRequestInProgress = true;
    };

    get [IUpdateReceiver](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
