import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { ILinkEventTracker } from '@/com/sulake/core/runtime/events/ILinkEventTracker';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import type { _SafeCls_6079 } from '@/com/sulake/habbo/catalog/habbicons/_SafeCls_6079';
import type { HabbiconEntryModel } from '@/com/sulake/habbo/catalog/habbicons/HabbiconEntryModel';
import type { HabbiconSetModel } from '@/com/sulake/habbo/catalog/habbicons/HabbiconSetModel';
import type { IHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import type { _SafeCls_6048 } from '@/com/sulake/habbo/communication/messages/parser/habbicons/_SafeCls_6048';
import type { _SafeCls_6051 } from '@/com/sulake/habbo/communication/messages/parser/habbicons/_SafeCls_6051';
import type { _SafeCls_6052 } from '@/com/sulake/habbo/communication/messages/parser/habbicons/_SafeCls_6052';
import type { _SafeCls_6054 } from '@/com/sulake/habbo/communication/messages/parser/habbicons/_SafeCls_6054';
import type { _SafeCls_6012 } from '@/com/sulake/habbo/communication/messages/parser/room/engine/_SafeCls_6012';
import type { IHabboConfigurationManager } from '@/com/sulake/habbo/configuration/IHabboConfigurationManager';
import type { IHabboInventory } from '@/com/sulake/habbo/inventory/IHabboInventory';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IHabboNotifications } from '@/com/sulake/habbo/notifications/IHabboNotifications';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { EventDispatcher } from '@habbo-pixi/runtime/events/EventDispatcher';
import { Component } from '@/com/sulake/core/runtime/Component.group';
import { ComponentDependency } from '@/com/sulake/core/runtime/ComponentDependency';
import { HabbiconControllerEvent } from '@/com/sulake/habbo/catalog/habbicons/HabbiconControllerEvent';
import { HabbiconPurchaseConfirmationView } from '@/com/sulake/habbo/catalog/habbicons/HabbiconPurchaseConfirmationView';
import { HabbiconView } from '@/com/sulake/habbo/catalog/habbicons/HabbiconView';
import { PurchaseErrorMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/catalog/PurchaseErrorMessageEvent';
import { PurchaseNotAllowedMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/catalog/PurchaseNotAllowedMessageEvent';
import { PurchaseOKMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/catalog/PurchaseOKMessageEvent';
import { _SafeCls_6049 } from '@/com/sulake/habbo/communication/messages/incoming/habbicons/_SafeCls_6049';
import { _SafeCls_6050 } from '@/com/sulake/habbo/communication/messages/incoming/habbicons/_SafeCls_6050';
import { _SafeCls_6053 } from '@/com/sulake/habbo/communication/messages/incoming/habbicons/_SafeCls_6053';
import { HabbiconInfoEvent } from '@/com/sulake/habbo/communication/messages/incoming/habbicons/HabbiconInfoEvent';
import { HabbiconShopDataEvent } from '@/com/sulake/habbo/communication/messages/incoming/habbicons/HabbiconShopDataEvent';
import { UserHabbiconsEvent } from '@/com/sulake/habbo/communication/messages/incoming/habbicons/UserHabbiconsEvent';
import { UserHabbiconStatusChangedEvent } from '@/com/sulake/habbo/communication/messages/incoming/habbicons/UserHabbiconStatusChangedEvent';
import { RoomUseHabbiconEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/engine/RoomUseHabbiconEvent';
import { BuyHabbiconCollectionMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/habbicons/BuyHabbiconCollectionMessageComposer';
import { BuyHabbiconMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/habbicons/BuyHabbiconMessageComposer';
import { ClaimHabbiconMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/habbicons/ClaimHabbiconMessageComposer';
import { FavoriteHabbiconMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/habbicons/FavoriteHabbiconMessageComposer';
import { GetHabbiconInfoMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/habbicons/GetHabbiconInfoMessageComposer';
import { GetHabbiconShopDataMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/habbicons/GetHabbiconShopDataMessageComposer';
import { UnfavoriteHabbiconMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/habbicons/UnfavoriteHabbiconMessageComposer';
import { HabbiconAssetManager } from '@/com/sulake/habbo/habbicons/assets/HabbiconAssetManager';
import { IIDHabboCommunicationManager } from '@/com/sulake/iid/IIDHabboCommunicationManager';
import { IIDHabboConfigurationManager } from '@/com/sulake/iid/IIDHabboConfigurationManager';
import { IIDHabboInventory } from '@/com/sulake/iid/IIDHabboInventory';
import { IIDHabboLocalizationManager } from '@/com/sulake/iid/IIDHabboLocalizationManager';
import { IIDHabboNotifications } from '@/com/sulake/iid/IIDHabboNotifications';
import { IIDHabboWindowManager } from '@/com/sulake/iid/IIDHabboWindowManager';

export class HabbiconController extends Component implements ILinkEventTracker, _SafeCls_6079 {
    static { registerClassName(this, 'com.sulake.habbo.catalog.habbicons::HabbiconController'); }

    private static readonly RECENT_HABBICON_LIMIT: number = 10;

    declare private _communicationManager: IHabboCommunicationManager;

    declare private _configurationManager: IHabboConfigurationManager;

    declare private _inventory: IHabboInventory;

    declare private _localizationManager: IHabboLocalizationManager;

    declare private _notifications: IHabboNotifications;

    declare private _windowManager: IHabboWindowManager;

    declare private _view: HabbiconView;

    declare private _SafeStr_14870: HabbiconPurchaseConfirmationView;

    declare private _messageEvents: IMessageEvent[];

    declare private _SafeStr_2546: EventDispatcher;

    declare private _SafeStr_14871: Map<any, any>;

    declare private _SafeStr_14119: any[];

    declare private _SafeStr_14872: Map<any, any>;

    declare private _SafeStr_14873: Map<any, any>;

    declare private _SafeStr_14874: _SafeCls_6053[];

    declare private _hasLoadedOwnedHabbicons: boolean;

    declare private _SafeStr_14875: boolean;

    declare private _SafeStr_14876: boolean;

    declare private _SafeStr_14877: boolean;

    declare private _pendingPurchaseRefresh: boolean;

    constructor(param1: IContext, param2: number = 0, param3: IAssetLibrary = null) {
        super(param1, param2, param3);
    }

    protected override get dependencies(): ComponentDependency[] {
        return super.dependencies.concat([new ComponentDependency(new IIDHabboCommunicationManager(), (param1: IHabboCommunicationManager): void => {
             this._communicationManager = param1;
         }, true), new ComponentDependency(new IIDHabboConfigurationManager(), (param1: IHabboConfigurationManager): void => {
             this._configurationManager = param1;
         }, true), new ComponentDependency(new IIDHabboInventory(), (param1: IHabboInventory): void => {
             this._inventory = param1;
         }, false), new ComponentDependency(new IIDHabboLocalizationManager(), (param1: IHabboLocalizationManager): void => {
             this._localizationManager = param1;
         }, true), new ComponentDependency(new IIDHabboNotifications(), (param1: IHabboNotifications): void => {
             this._notifications = param1;
         }, false), new ComponentDependency(new IIDHabboWindowManager(), (param1: IHabboWindowManager): void => {
             this._windowManager = param1;
         })]);
    }

    protected override initComponent(): void {
        this._messageEvents = new Array<IMessageEvent>(0).fill(null);
        this._SafeStr_2546 = new EventDispatcher();
        this._SafeStr_14871 = new Dictionary();
        this._SafeStr_14119 = [];
        this._SafeStr_14872 = new Dictionary();
        this._SafeStr_14873 = new Dictionary();
        this._SafeStr_14874 = new Array<_SafeCls_6053>(0).fill(null);
        if (!this.habbiconsEnabled()) {
            return;
        }
        this.context.addLinkEventTracker(this);
        this.addMessageEvent(new UserHabbiconsEvent(this.onUserHabbicons));
        this.addMessageEvent(new UserHabbiconStatusChangedEvent(this.onUserHabbiconStatusChanged));
        this.addMessageEvent(new HabbiconShopDataEvent(this.onHabbiconShopData));
        this.addMessageEvent(new HabbiconInfoEvent(this.onHabbiconInfo));
        this.addMessageEvent(new RoomUseHabbiconEvent(this.onRoomUseHabbicon));
        this.addMessageEvent(new PurchaseOKMessageEvent(this.onPurchaseOk));
        this.addMessageEvent(new PurchaseErrorMessageEvent(this.onPurchaseFailed));
        this.addMessageEvent(new PurchaseNotAllowedMessageEvent(this.onPurchaseFailed));
        HabbiconAssetManager.configure(this._configurationManager);
        HabbiconAssetManager.addEventListener("habbicon_assets_loaded", this.onHabbiconAssetsLoaded);
        HabbiconAssetManager.preload();
    }

    public get linkPattern(): string {
        return "habbicons/";
    }

    public get configuration(): IHabboConfigurationManager {
        return this._configurationManager;
    }

    public linkReceived(param1: string): void {
        if (!this.habbiconsEnabled()) {
            return;
        }
        let _loc2_: any[] = param1.split("/");
        if (_loc2_.length < 2) {
            return;
        }
        if (_loc2_[1] == "open") {
            this.openHabbiconHub();
        }
    }

    public openHabbiconHub(): void {
        if (!this.habbiconsEnabled()) {
            return;
        }
        this.resetUnseenHabbicons();
        if (!this._view || this._view.disposed) {
            this._view = new HabbiconView(this, this._windowManager);
        }
        this._view.showWindow();
    }

    public get hasLoadedOwnedHabbicons(): boolean {
        return this._hasLoadedOwnedHabbicons;
    }

    public get hasLoadedShopData(): boolean {
        return this._SafeStr_14875;
    }

    public get ownedHabbicons(): any[] {
        let _loc1_: any[] = [];
        for (const _loc2_ of this._SafeStr_14871?.values() ?? []) {
            _loc1_.push(_loc2_);
        }
        return _loc1_;
    }

    public get recentHabbiconIds(): any[] {
        return this._SafeStr_14119.concat();
    }

    public get shopCollections(): _SafeCls_6053[] {
        return this._SafeStr_14874.concat();
    }

    public get unseenHabbiconCount(): number {
        if (this._inventory == null || this._inventory.unseenItemTracker == null) {
            return 0;
        }
        return this._inventory.unseenItemTracker.getCount(8);
    }

    public get localizationManager(): IHabboLocalizationManager {
        return this._localizationManager;
    }

    public addEventListener(param1: string, param2: (...args: any[]) => any): void {
        this._SafeStr_2546.addEventListener(param1, param2);
    }

    public removeEventListener(param1: string, param2: (...args: any[]) => any): void {
        this._SafeStr_2546.removeEventListener(param1, param2);
    }

    public getShopData(param1: boolean = false): void {
        if (!this.habbiconsEnabled()) {
            return;
        }
        if (this._SafeStr_14875 && !param1) {
            this._SafeStr_2546.dispatchEvent(new HabbiconControllerEvent("hce_shop_data_updated"));
            return;
        }
        if (this._SafeStr_14877) {
            return;
        }
        this._SafeStr_14877 = this.send(new GetHabbiconShopDataMessageComposer());
    }

    public getHabbiconInfo(param1: number): void {
        if (!this.habbiconsEnabled()) {
            return;
        }
        this.send(new GetHabbiconInfoMessageComposer(param1));
    }

    public noteHabbiconUsed(param1: number): void {
        if (!this.habbiconsEnabled() || param1 <= 0) {
            return;
        }
        this.addRecentHabbiconId(param1);
        this._SafeStr_2546.dispatchEvent(new HabbiconControllerEvent("hce_recent_habbicons_updated", param1));
    }

    public isUnseenHabbicon(param1: number): boolean {
        return this._inventory != null && this._inventory.unseenItemTracker != null && this._inventory.unseenItemTracker.isUnseen(8, param1);
    }

    public removeUnseenHabbicon(param1: number): void {
        if (this._inventory == null || this._inventory.unseenItemTracker == null) {
            return;
        }
        this._inventory.unseenItemTracker.removeUnseen(8, param1);
        this._inventory.unseenItemTracker.resetCategoryIfEmpty(8);
    }

    public resetUnseenHabbicons(): void {
        if (this._inventory == null || this._inventory.unseenItemTracker == null) {
            return;
        }
        this._inventory.unseenItemTracker.resetCategory(8);
    }

    public buyHabbicon(param1: number): void {
        if (!this.habbiconsEnabled()) {
            return;
        }
        this._pendingPurchaseRefresh = true;
        this.send(new BuyHabbiconMessageComposer(param1));
    }

    public buyHabbiconCollection(param1: number): void {
        if (!this.habbiconsEnabled()) {
            return;
        }
        this._pendingPurchaseRefresh = true;
        this.send(new BuyHabbiconCollectionMessageComposer(param1));
    }

    public openHabbiconPurchaseConfirmation(param1: HabbiconEntryModel): void {
        if (!this.habbiconsEnabled() || param1 == null || !param1.purchasable) {
            return;
        }
        this.closeHabbiconPurchaseConfirmation();
        this._SafeStr_14870 = new HabbiconPurchaseConfirmationView(this, this._windowManager);
        this._SafeStr_14870.initializeForHabbicon(param1);
        this._SafeStr_14870.show();
    }

    public openHabbiconSetPurchaseConfirmation(param1: HabbiconSetModel): void {
        if (!this.habbiconsEnabled() || param1 == null || !param1.canBuy) {
            return;
        }
        this.closeHabbiconPurchaseConfirmation();
        this._SafeStr_14870 = new HabbiconPurchaseConfirmationView(this, this._windowManager);
        this._SafeStr_14870.initializeForSet(param1);
        this._SafeStr_14870.show();
    }

    public closeHabbiconPurchaseConfirmation(): void {
        if (this._SafeStr_14870 == null) {
            return;
        }
        this._SafeStr_14870.dispose();
        this._SafeStr_14870 = null;
    }

    public claimHabbicon(param1: number): void {
        if (!this.habbiconsEnabled()) {
            return;
        }
        this._pendingPurchaseRefresh = true;
        this.send(new ClaimHabbiconMessageComposer(param1));
    }

    public favoriteHabbicon(param1: number): void {
        if (!this.habbiconsEnabled()) {
            return;
        }
        this.send(new FavoriteHabbiconMessageComposer(param1));
    }

    public unfavoriteHabbicon(param1: number): void {
        if (!this.habbiconsEnabled()) {
            return;
        }
        this.send(new UnfavoriteHabbiconMessageComposer(param1));
    }

    public tryGetOwnedHabbicon(param1: number): _SafeCls_6050 {
        return asInstanceOf(this._SafeStr_14871.get(param1), _SafeCls_6050);
    }

    public tryGetShopItem(param1: number): _SafeCls_6049 {
        return asInstanceOf(this._SafeStr_14873.get(param1), _SafeCls_6049);
    }

    private addMessageEvent(param1: IMessageEvent): void {
        if (this._communicationManager == null) {
            return;
        }
        this._messageEvents.push(this._communicationManager.addHabboConnectionMessageEvent(param1));
    }

    private removeMessageEvent(param1: IMessageEvent): void {
        if (this._communicationManager == null) {
            return;
        }
        this._communicationManager.removeHabboConnectionMessageEvent(param1);
    }

    private send(param1: any): boolean {
        if (this._communicationManager == null || this._communicationManager.connection == null) {
            return false;
        }
        this._communicationManager.connection.send(param1);
        return true;
    }

    private onUserHabbicons(param1: UserHabbiconsEvent): void {
        let _loc6_: number = 0;
        let _loc4_: _SafeCls_6050 = null;
        let _loc8_: _SafeCls_6050 = null;
        let _loc3_: _SafeCls_6052 = param1.getParser();
        let _loc2_: any[] = _loc3_.habbicons;
        let _loc5_: boolean = this._hasLoadedOwnedHabbicons;
        let _loc7_: Map<any, any> = this._SafeStr_14871;
        this._SafeStr_14871 = new Dictionary();
        _loc6_ = 0;
        while (_loc6_ < _loc2_.length) {
            _loc4_ = asInstanceOf(_loc2_[_loc6_], _SafeCls_6050);
            if (_loc4_ != null) {
                _loc8_ = asInstanceOf(_loc7_.get(_loc4_.habbiconId), _SafeCls_6050);
                this._SafeStr_14871.set(_loc4_.habbiconId, _loc4_);
                if (_loc5_ && this.isStoredUserState(_loc4_.habbiconState) && (_loc8_ == null || this.isClaimedRewardTransition(_loc8_.habbiconState, _loc4_.habbiconState))) {
                    this.handleNewOwnedHabbicon(_loc4_.habbiconId);
                }
            }
            _loc6_++;
        }
        this.setRecentHabbiconIds(_loc3_.recentHabbiconIds);
        this._hasLoadedOwnedHabbicons = true;
        this._SafeStr_14876 = false;
        this._SafeStr_2546.dispatchEvent(new HabbiconControllerEvent("hce_owned_habbicons_updated"));
        this._SafeStr_2546.dispatchEvent(new HabbiconControllerEvent("hce_shop_data_updated"));
    }

    private onUserHabbiconStatusChanged(param1: UserHabbiconStatusChangedEvent): void {
        let _loc4_: _SafeCls_6050 = null;
        let _loc3_: _SafeCls_6051 = param1.getParser();
        let _loc6_: number = _loc3_.habbiconState;
        let _loc2_: number = _loc3_.habbiconId;
        let _loc5_: number = 0;
        if (this.isStoredUserState(_loc6_)) {
            _loc4_ = asInstanceOf(this._SafeStr_14871.get(_loc2_), _SafeCls_6050);
            if (_loc4_ == null) {
                _loc4_ = new _SafeCls_6050();
                _loc4_.habbiconId = _loc2_;
                this._SafeStr_14871.set(_loc2_, _loc4_);
                this.handleNewOwnedHabbicon(_loc2_);
            } else {
                _loc5_ = _loc4_.habbiconState;
            }
            _loc4_.habbiconState = _loc6_;
            if (this.isClaimedRewardTransition(_loc5_, _loc6_)) {
                this.handleNewOwnedHabbicon(_loc2_);
            }
        } else {
            this._SafeStr_14871.delete(_loc2_);
        }
        this.updateCachedShopItemState(_loc2_, _loc6_, null);
        this._SafeStr_2546.dispatchEvent(new HabbiconControllerEvent("hce_habbicon_status_changed", _loc2_));
        this._SafeStr_2546.dispatchEvent(new HabbiconControllerEvent("hce_owned_habbicons_updated", _loc2_));
        this._SafeStr_2546.dispatchEvent(new HabbiconControllerEvent("hce_shop_data_updated", _loc2_));
    }

    private onHabbiconShopData(param1: HabbiconShopDataEvent): void {
        let _loc8_: _SafeCls_6053 = null;
        let _loc2_: any[] = null;
        let _loc5_: _SafeCls_6049 = null;
        let _loc6_: number = 0;
        let _loc7_: number = 0;
        let _loc3_: _SafeCls_6048 = param1.getParser();
        let _loc4_: any[] = _loc3_.collections;
        this._SafeStr_14872 = new Dictionary();
        this._SafeStr_14873 = new Dictionary();
        this._SafeStr_14874 = new Array<_SafeCls_6053>(0).fill(null);
        _loc6_ = 0;
        while (_loc6_ < _loc4_.length) {
            _loc8_ = asInstanceOf(_loc4_[_loc6_], _SafeCls_6053);
            if (_loc8_ != null) {
                this._SafeStr_14872.set(_loc8_.collectionId, _loc8_);
                this._SafeStr_14874.push(_loc8_);
                _loc2_ = _loc8_.habbicons;
                if (_loc2_ != null) {
                    _loc7_ = 0;
                    while (_loc7_ < _loc2_.length) {
                        _loc5_ = asInstanceOf(_loc2_[_loc7_], _SafeCls_6049);
                        if (_loc5_ != null) {
                            this._SafeStr_14873.set(_loc5_.habbiconId, _loc5_);
                        }
                        _loc7_++;
                    }
                }
            }
            _loc6_++;
        }
        this._SafeStr_14875 = true;
        this._SafeStr_14877 = false;
        this._SafeStr_2546.dispatchEvent(new HabbiconControllerEvent("hce_shop_data_updated"));
    }

    private onHabbiconInfo(param1: HabbiconInfoEvent): void {
        let _loc2_: _SafeCls_6054 = param1.getParser();
        let _loc3_: _SafeCls_6049 = asInstanceOf(_loc2_.habbicon, _SafeCls_6049);
        if (_loc3_ == null) {
            return;
        }
        this._SafeStr_14873.set(_loc3_.habbiconId, _loc3_);
        this.updateCachedShopItemState(_loc3_.habbiconId, _loc3_.state, _loc3_);
        this._SafeStr_2546.dispatchEvent(new HabbiconControllerEvent("hce_shop_data_updated", _loc3_.habbiconId, _loc3_.collectionId));
    }

    private onRoomUseHabbicon(param1: RoomUseHabbiconEvent): void {
        if (!this.habbiconsEnabled()) {
            return;
        }
        let _loc2_: _SafeCls_6012 = param1.getParser();
        this._SafeStr_2546.dispatchEvent(new HabbiconControllerEvent("hce_room_use_habbicon", _loc2_.habbiconId, 0, _loc2_.roomIndex));
    }

    private onPurchaseOk(param1: PurchaseOKMessageEvent): void {
        if (!this._pendingPurchaseRefresh) {
            return;
        }
        this._pendingPurchaseRefresh = false;
        this.closeHabbiconPurchaseConfirmation();
        this.getShopData(true);
    }

    private onPurchaseFailed(param1: IMessageEvent): void {
        if (!this._pendingPurchaseRefresh) {
            return;
        }
        this._pendingPurchaseRefresh = false;
        if (this._SafeStr_14870 != null) {
            this._SafeStr_14870.purchaseFailed();
        }
    }

    private onHabbiconAssetsLoaded(param1: Event): void {
        if (!this.habbiconsEnabled()) {
            return;
        }
        this._SafeStr_2546.dispatchEvent(new HabbiconControllerEvent("hce_owned_habbicons_updated"));
        this._SafeStr_2546.dispatchEvent(new HabbiconControllerEvent("hce_shop_data_updated"));
    }

    private handleNewOwnedHabbicon(param1: number): void {
        if (this._inventory != null && this._inventory.unseenItemTracker != null) {
            this._inventory.unseenItemTracker.setUnseenItem(8, param1);
        }
        this.showNewHabbiconNotification(param1);
    }

    private showNewHabbiconNotification(param1: number): void {
        if (this._notifications == null || this._localizationManager == null) {
            return;
        }
        let _loc3_: string = this.resolveHabbiconDisplayName(param1);
        this._localizationManager.registerParameter("notification.new.habbicon", "habbicon_name", _loc3_);
        let _loc2_: string = this._localizationManager.getLocalization("notification.new.habbicon");
        this._notifications.addItemWithBitmap(_loc2_, "habbicon_received", this.createHabbiconNotificationIcon(param1), "habbicons/open");
    }

    private resolveHabbiconDisplayName(param1: number): string {
        let _loc2_: string = HabbiconAssetManager.getHabbiconNameKey(param1);
        if (_loc2_ != null && _loc2_.length > 0) {
            return this._localizationManager.getLocalization("habbicon_" + _loc2_ + "_name", _loc2_);
        }
        return param1.toString();
    }

    private createHabbiconNotificationIcon(param1: number): BitmapData {
        let _loc2_: BitmapData = HabbiconAssetManager.getPreviewBitmap(param1, false);
        return _loc2_ != null ? _loc2_.clone() : null;
    }

    private habbiconsEnabled(): boolean {
        return this._configurationManager != null && Boolean(this._configurationManager.getBoolean("habbicons.enabled"));
    }

    private updateCachedShopItemState(param1: number, param2: number, param3: _SafeCls_6049 = null): void {
        let _loc5_: number = 0;
        let _loc4_: _SafeCls_6049 = null;
        if (this.updateCachedRewardState(param1, param2)) {
            return;
        }
        if (param3 != null) {
            this._SafeStr_14873.set(param1, param3);
        } else {
            param3 = asInstanceOf(this._SafeStr_14873.get(param1), _SafeCls_6049);
            if (param3 == null) {
                return;
            }
        }
        param3.state = param2;
        let _loc6_: _SafeCls_6053 = asInstanceOf(this._SafeStr_14872.get(param3.collectionId), _SafeCls_6053);
        if (_loc6_ == null || _loc6_.habbicons == null) {
            return;
        }
        _loc5_ = 0;
        while (_loc5_ < _loc6_.habbicons.length) {
            _loc4_ = asInstanceOf(_loc6_.habbicons[_loc5_], _SafeCls_6049);
            if (!(_loc4_ == null || _loc4_.habbiconId != param1)) {
                _loc6_.habbicons[_loc5_] = param3;
                break;
            }
            _loc5_++;
        }
        _loc6_.completed = this.isCollectionCompleted(_loc6_);
        if (_loc6_.completed) {
            this.markCollectionRewardClaimable(_loc6_);
        }
    }

    private updateCachedRewardState(param1: number, param2: number): boolean {
        for (const _loc3_ of this._SafeStr_14874 ?? []) {
            if (!(_loc3_ == null || _loc3_._SafeStr_14086 != param1)) {
                _loc3_._SafeStr_14087 = param2;
                return true;
            }
        }
        return false;
    }

    private markCollectionRewardClaimable(param1: _SafeCls_6053): void {
        let _loc2_: _SafeCls_6050 = null;
        if (param1 == null || param1._SafeStr_14086 <= 0) {
            return;
        }
        if (param1._SafeStr_14087 == 2 || param1._SafeStr_14087 == 3) {
            return;
        }
        param1._SafeStr_14087 = 1;
        _loc2_ = asInstanceOf(this._SafeStr_14871.get(param1._SafeStr_14086), _SafeCls_6050);
        if (_loc2_ == null) {
            _loc2_ = new _SafeCls_6050();
            _loc2_.habbiconId = param1._SafeStr_14086;
            this._SafeStr_14871.set(param1._SafeStr_14086, _loc2_);
        }
        _loc2_.habbiconState = 1;
    }

    private isStoredUserState(param1: number): boolean {
        return param1 == 1 || param1 == 2 || param1 == 3;
    }

    private isClaimedRewardTransition(param1: number, param2: number): boolean {
        return param1 == 1 && (param2 == 2 || param2 == 3);
    }

    private isCollectionCompleted(param1: _SafeCls_6053): boolean {
        let _loc2_: any[] = null;
        let _loc3_: any = null;
        if (param1 == null || param1.habbicons == null || param1.habbicons.length == 0) {
            return false;
        }
        _loc2_ = param1.habbicons;
        for (_loc3_ of _loc2_ ?? []) {
            if (_loc3_ == null || !this.isStoredUserState(_loc3_.state | 0)) {
                return false;
            }
        }
        return true;
    }

    private setRecentHabbiconIds(param1: any[]): void {
        this._SafeStr_14119 = [];
        if (param1 == null) {
            return;
        }
        for (const _loc2_ of param1 ?? []) {
            this._SafeStr_14119.push(_loc2_);
        }
    }

    private addRecentHabbiconId(param1: number): void {
        if (param1 <= 0) {
            return;
        }
        let _loc2_: number = this._SafeStr_14119.indexOf(param1);
        if (_loc2_ >= 0) {
            this._SafeStr_14119.splice(_loc2_, 1);
        }
        this._SafeStr_14119.unshift(param1);
        if (this._SafeStr_14119.length > 10) {
            this._SafeStr_14119.length = 10;
        }
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        for (const _loc1_ of this._messageEvents ?? []) {
            this.removeMessageEvent(_loc1_);
        }
        if (this._view) {
            this._view.dispose();
            this._view = null;
        }
        this.closeHabbiconPurchaseConfirmation();
        HabbiconAssetManager.removeEventListener("habbicon_assets_loaded", this.onHabbiconAssetsLoaded);
        this._messageEvents = null;
        this._SafeStr_2546 = null;
        this._SafeStr_14871 = null;
        this._SafeStr_14119 = null;
        this._SafeStr_14872 = null;
        this._SafeStr_14873 = null;
        this._SafeStr_14874 = null;
        this._communicationManager = null;
        this._configurationManager = null;
        this._localizationManager = null;
        this._windowManager = null;
        super.dispose();
    }

    protected override initInstanceFields(): void {
        this.onUserHabbicons = this.onUserHabbicons.bind(this);
        this.onUserHabbiconStatusChanged = this.onUserHabbiconStatusChanged.bind(this);
        this.onHabbiconShopData = this.onHabbiconShopData.bind(this);
        this.onHabbiconInfo = this.onHabbiconInfo.bind(this);
        this.onRoomUseHabbicon = this.onRoomUseHabbicon.bind(this);
        this.onPurchaseOk = this.onPurchaseOk.bind(this);
        this.onPurchaseFailed = this.onPurchaseFailed.bind(this);
        this.onHabbiconAssetsLoaded = this.onHabbiconAssetsLoaded.bind(this);
        this._hasLoadedOwnedHabbicons = false;
        this._SafeStr_14875 = false;
        this._SafeStr_14876 = false;
        this._SafeStr_14877 = false;
        this._pendingPurchaseRefresh = false;
        super.initInstanceFields();
    }
}
