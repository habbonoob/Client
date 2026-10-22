import { asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { keysOf } from '@habbo-pixi/runtime/lang/iterate';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import type { IAvatarRenderManager } from '@/com/sulake/habbo/avatar/IAvatarRenderManager';
import type { CatalogEvent } from '@/com/sulake/habbo/catalog/event/CatalogEvent';
import type { IHabboCatalog } from '@/com/sulake/habbo/catalog/IHabboCatalog';
import type { IHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import type { IHabboFreeFlowChat } from '@/com/sulake/habbo/freeflowchat/IHabboFreeFlowChat';
import type { IHabboFriendList } from '@/com/sulake/habbo/friendlist/IHabboFriendList';
import type { IHabboHelp } from '@/com/sulake/habbo/help/IHabboHelp';
import type { IHabboInventory } from '@/com/sulake/habbo/inventory/IHabboInventory';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { NotificationController } from '@/com/sulake/habbo/notifications/feed/NotificationController';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { IRoomSessionManager } from '@/com/sulake/habbo/session/IRoomSessionManager';
import type { ISessionDataManager } from '@/com/sulake/habbo/session/ISessionDataManager';
import type { IHabboToolbar } from '@/com/sulake/habbo/toolbar/IHabboToolbar';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { JSONDecoder } from '@habbo-pixi/runtime/json/JSONDecoder';
import { Component } from '@/com/sulake/core/runtime/Component.group';
import { ComponentDependency } from '@/com/sulake/core/runtime/ComponentDependency';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { GetMOTDMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/GetMOTDMessageComposer';
import { IHabboNotifications } from '@/com/sulake/habbo/notifications/IHabboNotifications';
import { IncomingMessages } from '@/com/sulake/habbo/notifications/IncomingMessages';
import { NotificationPopup } from '@/com/sulake/habbo/notifications/NotificationPopup';
import { SingularNotificationController } from '@/com/sulake/habbo/notifications/singular/SingularNotificationController';
import { PetImageUtility } from '@/com/sulake/habbo/notifications/utils/PetImageUtility';
import { ProductImageUtility } from '@/com/sulake/habbo/notifications/utils/ProductImageUtility';
import { IIDAvatarRenderManager } from '@/com/sulake/iid/IIDAvatarRenderManager';
import { IIDHabboCatalog } from '@/com/sulake/iid/IIDHabboCatalog';
import { IIDHabboCommunicationManager } from '@/com/sulake/iid/IIDHabboCommunicationManager';
import { IIDHabboFreeFlowChat } from '@/com/sulake/iid/IIDHabboFreeFlowChat';
import { IIDHabboFriendList } from '@/com/sulake/iid/IIDHabboFriendList';
import { IIDHabboHelp } from '@/com/sulake/iid/IIDHabboHelp';
import { IIDHabboInventory } from '@/com/sulake/iid/IIDHabboInventory';
import { IIDHabboLocalizationManager } from '@/com/sulake/iid/IIDHabboLocalizationManager';
import { IIDHabboRoomSessionManager } from '@/com/sulake/iid/IIDHabboRoomSessionManager';
import { IIDHabboToolbar } from '@/com/sulake/iid/IIDHabboToolbar';
import { IIDHabboWindowManager } from '@/com/sulake/iid/IIDHabboWindowManager';
import { IIDRoomEngine } from '@/com/sulake/iid/IIDRoomEngine';
import { IIDSessionDataManager } from '@/com/sulake/iid/IIDSessionDataManager';

export class HabboNotifications extends Component implements IHabboNotifications {
    static { registerClassName(this, 'com.sulake.habbo.notifications::HabboNotifications'); }

    declare private _communication: IHabboCommunicationManager;

    declare private _sessionDataManager: ISessionDataManager;

    declare private _windowManager: IHabboWindowManager;

    declare private _localization: IHabboLocalizationManager;

    declare private _inventory: IHabboInventory;

    declare private _friendList: IHabboFriendList;

    declare private _roomEngine: IRoomEngine;

    declare private _catalog: IHabboCatalog;

    declare private _toolBar: IHabboToolbar;

    declare private _SafeStr_3750: ProductImageUtility;

    declare private _SafeStr_3784: PetImageUtility;

    declare private _roomSessionManager: IRoomSessionManager;

    declare private _habboHelp: IHabboHelp;

    declare private _freeFlowChat: IHabboFreeFlowChat;

    declare private _avatarRenderManager: IAvatarRenderManager;

    declare private _feedController: NotificationController;

    declare private _singularController: SingularNotificationController;

    declare private _SafeStr_4593: IncomingMessages;

    declare private _disabled: boolean;

    constructor(param1: IContext, param2: number = 0, param3: IAssetLibrary = null) {
        super(param1, param2, param3);
        this._disabled = false;
    }

    public get assetLibrary(): IAssetLibrary {
        return this.assets;
    }

    public get windowManager(): IHabboWindowManager {
        return this._windowManager;
    }

    public get localization(): IHabboLocalizationManager {
        return this._localization;
    }

    public get sessionDataManager(): ISessionDataManager {
        return this._sessionDataManager;
    }

    public get roomSessionManager(): IRoomSessionManager {
        return this._roomSessionManager;
    }

    public get catalog(): IHabboCatalog {
        return this._catalog;
    }

    public get toolBar(): IHabboToolbar {
        return this._toolBar;
    }

    public get habboHelp(): IHabboHelp {
        return this._habboHelp;
    }

    public get freeFlowChat(): IHabboFreeFlowChat {
        return this._freeFlowChat;
    }

    public get singularController(): SingularNotificationController {
        return this._singularController;
    }

    public get feedController(): NotificationController {
        return this._feedController;
    }

    public get disabled(): boolean {
        return this._disabled;
    }

    public set disabled(param1: boolean) {
        this._disabled = param1;
    }

    public get productImageUtility(): ProductImageUtility {
        if (this._roomEngine == null || this._inventory == null) {
            return null;
        }
        if (this._SafeStr_3750 == null) {
            this._SafeStr_3750 = new ProductImageUtility(this._roomEngine, this._inventory);
        }
        return this._SafeStr_3750;
    }

    public get petImageUtility(): PetImageUtility {
        if (this._roomEngine == null) {
            return null;
        }
        if (this._SafeStr_3784 == null) {
            this._SafeStr_3784 = new PetImageUtility(this._roomEngine);
        }
        return this._SafeStr_3784;
    }

    protected override get dependencies(): ComponentDependency[] {
        return super.dependencies.concat([new ComponentDependency(new IIDHabboInventory(), (param1: IHabboInventory): void => {
             this._inventory = param1;
         }, false), new ComponentDependency(new IIDHabboFriendList(), (param1: IHabboFriendList): void => {
             this._friendList = param1;
         }, false), new ComponentDependency(new IIDSessionDataManager(), (param1: ISessionDataManager): void => {
             this._sessionDataManager = param1;
         }), new ComponentDependency(new IIDHabboCommunicationManager(), (param1: IHabboCommunicationManager): void => {
             this._communication = param1;
         }), new ComponentDependency(new IIDRoomEngine(), (param1: IRoomEngine): void => {
             this._roomEngine = param1;
         }, false), new ComponentDependency(new IIDHabboCatalog(), (param1: IHabboCatalog): void => {
             this._catalog = param1;
         }, false, [{ "type": "CATALOG_BUILDER_MEMBERSHIP_EXPIRED", "callback": this.onBuilderMembershipExpired }, { "type": "CATALOG_BUILDER_MEMBERSHIP_IN_GRACE", "callback": this.onBuilderMembershipInGrace }, { "type": "COLLECTIBLES_CLAIM_FAIL", "callback": this.onCollectiblesClaimFail }, { "type": "COLLECTIBLE_CLAIM_SUCCESS", "callback": this.onCollectiblesClaimSuccess }, { "type": "COLLECTIBLE_CLAIM_WAIT", "callback": this.onCollectiblesClaimWait }, { "type": "COLLECTIBLES_MINT_FAIL", "callback": this.onCollectiblesMintFail }, { "type": "COLLECTIBLES_MINT_SUCCESS", "callback": this.onCollectiblesMintSuccess }]), new ComponentDependency(new IIDHabboToolbar(), (param1: IHabboToolbar): void => {
             this._toolBar = param1;
         }), new ComponentDependency(new IIDHabboLocalizationManager(), (param1: IHabboLocalizationManager): void => {
             this._localization = param1;
         }), new ComponentDependency(new IIDHabboWindowManager(), (param1: IHabboWindowManager): void => {
             this._windowManager = param1;
         }), new ComponentDependency(new IIDHabboRoomSessionManager(), (param1: IRoomSessionManager): void => {
             this._roomSessionManager = param1;
         }, false), new ComponentDependency(new IIDHabboHelp(), (param1: IHabboHelp): void => {
             this._habboHelp = param1;
         }), new ComponentDependency(new IIDHabboFreeFlowChat(), (param1: IHabboFreeFlowChat): void => {
             this._freeFlowChat = param1;
         }, false), new ComponentDependency(new IIDAvatarRenderManager(), (param1: IAvatarRenderManager): void => {
             this._avatarRenderManager = param1;
         }, false)]);
    }

    protected override initComponent(): void {
        this._singularController = new SingularNotificationController(this);
        this._SafeStr_4593 = new IncomingMessages(this, this._communication);
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        if (this._SafeStr_4593 != null) {
            this._SafeStr_4593.dispose();
            this._SafeStr_4593 = null;
        }
        if (this._feedController != null) {
            this._feedController.dispose();
            this._feedController = null;
        }
        if (this._SafeStr_3784 != null) {
            this._SafeStr_3784.dispose();
            this._SafeStr_3784 = null;
        }
        if (this._SafeStr_3750 != null) {
            this._SafeStr_3750.dispose();
            this._SafeStr_3750 = null;
        }
        super.dispose();
    }

    public activate(): void {
        if (this._feedController != null) {
            this._feedController.setFeedEnabled(true);
        }
        this._communication.connection.send(new GetMOTDMessageComposer());
    }

    public get communication(): IHabboCommunicationManager {
        return this._communication;
    }

    public addSongPlayingNotification(param1: string, param2: string): void {
        this._singularController.addSongPlayingNotification(param1, param2);
    }

    public addItem(param1: string, param2: string, param3: string = null, param4: string = null, param5: any[] = null): void {
        let _loc6_: BitmapData = null;
        if (param3 != null) {
            _loc6_ = (asInstanceOf(this.assets.getAssetByName(param3).content, BitmapData)).clone();
        }
        this.addItemWithBitmap(param1, param2, _loc6_, param4, param5);
    }

    public addItemWithBitmap(param1: string, param2: string, param3: BitmapData = null, param4: string = null, param5: any[] = null): void {
        this._singularController.addItem(param1, param2, param3, null, null, param4, param5);
    }

    public showNotification(param1: string, param2: UtilsMap = null): void {
        let _loc7_: any = null;
        let _loc9_: string = null;
        let _loc5_: string = null;
        let _loc3_: boolean = false;
        let _loc11_: string = null;
        let _loc6_: BitmapData = null;
        let _loc10_: IAsset = null;
        if (param2 == null) {
            param2 = new UtilsMap();
        }
        let _loc4_: string = "notification." + param1;
        if (this.propertyExists(_loc4_)) {
            _loc7_ = new JSONDecoder(this.getProperty(_loc4_), true).getValue();
            for (const _loc8_ of keysOf(_loc7_)) {
                param2[_loc8_] = _loc7_[_loc8_];
            }
        }
        if (param2["display"] == "BUBBLE") {
            _loc9_ = this.getNotificationPart(param2, param1, "message", true);
            _loc5_ = this.getNotificationPart(param2, param1, "linkUrl", false);
            _loc3_ = _loc5_ != null && _loc5_.substr(0, 6) == "event:";
            _loc11_ = this.getNotificationImageUrl(param2, param1);
            _loc6_ = null;
            if (_loc11_ != null && _loc11_.indexOf("${image.library.url}") == -1) {
                _loc10_ = this.assets.getAssetByName(_loc11_);
                if (_loc10_ != null) {
                    _loc6_ = (asInstanceOf(this.assets.getAssetByName(_loc11_).content, BitmapData)).clone();
                    if (_loc6_ != null) {
                        _loc11_ = null;
                    }
                }
            }
            this._singularController.addItem(_loc9_, "info", _loc6_, _loc11_, null, _loc3_ ? _loc5_.substr(6) : _loc5_);
        } else {
            new NotificationPopup(this, param1, param2);
        }
    }

    public getNotificationPart(param1: UtilsMap, param2: string, param3: string, param4: boolean): string {
        let _loc5_: string = null;
        if (param1.hasKey(param3)) {
            return stringOrNull(param1.getValue(param3));
        }
        _loc5_ = ["notification", param2, param3].join(".");
        if (this.localization.hasLocalization(_loc5_) || param4) {
            return this.localization.getLocalizationWithParamMap(_loc5_, _loc5_, param1);
        }
        return null;
    }

    public getNotificationImageUrl(param1: UtilsMap, param2: string): string {
        let _loc3_: string = stringOrNull(param1.getValue("image"));
        if (_loc3_ == null) {
            _loc3_ = "${image.library.url}notifications/" + param2.replace(/\./g, "_") + ".png";
        }
        return _loc3_;
    }

    private onBuilderMembershipInGrace(param1: CatalogEvent): void {
        this.showNotification("builders_club.membership_in_grace", null);
    }

    private onBuilderMembershipExpired(param1: CatalogEvent): void {
        this.showNotification("builders_club.membership_expired", null);
    }

    private onCollectiblesClaimFail(param1: CatalogEvent): void {
        this.addItem(this.localization.getLocalization("collectibles.claiming.failed"), "info", "icon_curator_stamp_large_png");
    }

    private onCollectiblesClaimSuccess(param1: CatalogEvent): void {
        this.addItem(this.localization.getLocalization("collectibles.claiming.success"), "info", "icon_curator_stamp_large_png");
    }

    private onCollectiblesClaimWait(param1: CatalogEvent): void {
        this.addItem(this.localization.getLocalization("collectibles.claiming.wait"), "info", "icon_curator_stamp_large_png");
    }

    private onCollectiblesMintFail(param1: CatalogEvent): void {
        this.addItem(this.localization.getLocalization("shop.minting.failed"), "info", "icon_curator_stamp_large_png");
    }

    private onCollectiblesMintSuccess(param1: CatalogEvent): void {
        this.addItem(this.localization.getLocalization("shop.minting.success"), "info", "icon_curator_stamp_large_png");
    }

    public createLinkEvent(param1: string): void {
        this.context.createLinkEvent(param1);
    }

    public get avatarRenderManager(): IAvatarRenderManager {
        return this._avatarRenderManager;
    }

    protected override initInstanceFields(): void {
        this.onBuilderMembershipInGrace = this.onBuilderMembershipInGrace.bind(this);
        this.onBuilderMembershipExpired = this.onBuilderMembershipExpired.bind(this);
        this.onCollectiblesClaimFail = this.onCollectiblesClaimFail.bind(this);
        this.onCollectiblesClaimSuccess = this.onCollectiblesClaimSuccess.bind(this);
        this.onCollectiblesClaimWait = this.onCollectiblesClaimWait.bind(this);
        this.onCollectiblesMintFail = this.onCollectiblesMintFail.bind(this);
        this.onCollectiblesMintSuccess = this.onCollectiblesMintSuccess.bind(this);
        this._disabled = false;
        super.initInstanceFields();
    }

    get [IHabboNotifications](): true {
        return true;
    }
}
