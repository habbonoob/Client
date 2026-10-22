import { asGuarded, asInstanceOf, castTo } from '@habbo-pixi/runtime/lang/cast';
import { valuesOf } from '@habbo-pixi/runtime/lang/iterate';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IAlertDialog } from '@/com/sulake/core/window/utils/IAlertDialog';
import type { IConfirmDialog } from '@/com/sulake/core/window/utils/IConfirmDialog';
import type { IHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import type { AvailabilityStatusMessageParser } from '@/com/sulake/habbo/communication/messages/parser/availability/AvailabilityStatusMessageParser';
import type { ChangeUserNameResultMessageParser } from '@/com/sulake/habbo/communication/messages/parser/avatar/ChangeUserNameResultMessageParser';
import type { UserObjectMessageParser } from '@/com/sulake/habbo/communication/messages/parser/handshake/UserObjectMessageParser';
import type { MysteryBoxKeysMessageParser } from '@/com/sulake/habbo/communication/messages/parser/mysterybox/MysteryBoxKeysMessageParser';
import type { RoomReadyMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/session/RoomReadyMessageParser';
import type { AccountSafetyLockStatusChangeMessageParser } from '@/com/sulake/habbo/communication/messages/parser/users/AccountSafetyLockStatusChangeMessageParser';
import type { UserNameChangedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/users/UserNameChangedMessageParser';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IHabboNotifications } from '@/com/sulake/habbo/notifications/IHabboNotifications';
import type { BadgeInfo } from '@/com/sulake/habbo/session/BadgeInfo';
import type { IFurniDataListener } from '@/com/sulake/habbo/session/furniture/IFurniDataListener';
import type { IFurnitureData } from '@/com/sulake/habbo/session/furniture/IFurnitureData';
import type { IRoomSession } from '@/com/sulake/habbo/session/IRoomSession';
import type { IRoomSessionManager } from '@/com/sulake/habbo/session/IRoomSessionManager';
import type { IProductData } from '@/com/sulake/habbo/session/product/IProductData';
import type { IProductDataListener } from '@/com/sulake/habbo/session/product/IProductDataListener';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { isIMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { Component } from '@/com/sulake/core/runtime/Component.group';
import { ComponentDependency } from '@/com/sulake/core/runtime/ComponentDependency';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { AvailabilityStatusMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/availability/AvailabilityStatusMessageEvent';
import { ChangeUserNameResultMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/avatar/ChangeUserNameResultMessageEvent';
import { FigureUpdateEvent } from '@/com/sulake/habbo/communication/messages/incoming/avatar/FigureUpdateEvent';
import { UserNftChatStylesMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/chatstyles/UserNftChatStylesMessageEvent';
import { UserPurchasableChatStyleChangedMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/chatstyles/UserPurchasableChatStyleChangedMessageEvent';
import { UserPurchasableChatStylesMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/chatstyles/UserPurchasableChatStylesMessageEvent';
import { NoobnessLevelMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/handshake/NoobnessLevelMessageEvent';
import { UserObjectEvent } from '@/com/sulake/habbo/communication/messages/incoming/handshake/UserObjectEvent';
import { UserRightsMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/handshake/UserRightsMessageEvent';
import { MysteryBoxKeysMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/mysterybox/MysteryBoxKeysMessageEvent';
import { AccountPreferencesEvent } from '@/com/sulake/habbo/communication/messages/incoming/preferences/AccountPreferencesEvent';
import { UserChangeMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/engine/UserChangeMessageEvent';
import { PetRespectFailedEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/pets/PetRespectFailedEvent';
import { RoomReadyMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/session/RoomReadyMessageEvent';
import { AccountSafetyLockStatusChangeMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/users/AccountSafetyLockStatusChangeMessageEvent';
import { EmailStatusResultEvent } from '@/com/sulake/habbo/communication/messages/incoming/users/EmailStatusResultEvent';
import { InClientLinkMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/users/InClientLinkMessageEvent';
import { UserNameChangedMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/users/UserNameChangedMessageEvent';
import { SetUIFlagsMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/preferences/SetUIFlagsMessageComposer';
import { GetDailyTasksComposer } from '@/com/sulake/habbo/communication/messages/outgoing/quest/dailytasks/GetDailyTasksComposer';
import { ChatMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/chat/ChatMessageComposer';
import { RespectPetMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/pets/RespectPetMessageComposer';
import { PerkAllowancesMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/PerkAllowancesMessageComposer';
import { ReplenishRespectMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/ReplenishRespectMessageComposer';
import { RespectUserMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/RespectUserMessageComposer';
import { CreditVaultStatusMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/vault/CreditVaultStatusMessageComposer';
import { IncomeRewardClaimMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/vault/IncomeRewardClaimMessageComposer';
import { IncomeRewardStatusMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/vault/IncomeRewardStatusMessageComposer';
import { WithdrawCreditVaultMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/vault/WithdrawCreditVaultMessageComposer';
import { AccountPreferencesParser } from '@/com/sulake/habbo/communication/messages/parser/preferences/AccountPreferencesParser';
import { EmailStatusParser } from '@/com/sulake/habbo/communication/messages/parser/users/EmailStatusParser';
import { Logger } from '@/com/sulake/habbo/Logger';
import { BadgeImageManager } from '@/com/sulake/habbo/session/BadgeImageManager';
import { BlockedUsersManager } from '@/com/sulake/habbo/session/BlockedUsersManager';
import { MysteryBoxKeysUpdateEvent } from '@/com/sulake/habbo/session/events/MysteryBoxKeysUpdateEvent';
import { SessionDataPreferencesEvent } from '@/com/sulake/habbo/session/events/SessionDataPreferencesEvent';
import { SessionDataToWidgetEvent } from '@/com/sulake/habbo/session/events/SessionDataToWidgetEvent';
import { UserNameUpdateEvent } from '@/com/sulake/habbo/session/events/UserNameUpdateEvent';
import { FurniIconImageManager } from '@/com/sulake/habbo/session/FurniIconImageManager';
import { FurnitureDataParser } from '@/com/sulake/habbo/session/furniture/FurnitureDataParser';
import { HabboClubLevelEnum } from '@/com/sulake/habbo/session/HabboClubLevelEnum';
import { HabboGroupInfoManager } from '@/com/sulake/habbo/session/HabboGroupInfoManager';
import { IgnoredUsersManager } from '@/com/sulake/habbo/session/IgnoredUsersManager';
import { ISessionDataManager } from '@/com/sulake/habbo/session/ISessionDataManager';
import { PerkManager } from '@/com/sulake/habbo/session/PerkManager';
import { ProductDataParser } from '@/com/sulake/habbo/session/product/ProductDataParser';
import { HabboWebTools } from '@/com/sulake/habbo/utils/HabboWebTools';
import { IIDHabboCommunicationManager } from '@/com/sulake/iid/IIDHabboCommunicationManager';
import { IIDHabboConfigurationManager } from '@/com/sulake/iid/IIDHabboConfigurationManager';
import { IIDHabboLocalizationManager } from '@/com/sulake/iid/IIDHabboLocalizationManager';
import { IIDHabboNotifications } from '@/com/sulake/iid/IIDHabboNotifications';
import { IIDHabboRoomSessionManager } from '@/com/sulake/iid/IIDHabboRoomSessionManager';
import { IIDHabboWindowManager } from '@/com/sulake/iid/IIDHabboWindowManager';

export class SessionDataManager extends Component implements ISessionDataManager {
    static { registerClassName(this, 'com.sulake.habbo.session::SessionDataManager'); }

    public static readonly _SafeStr_6118: number = 1;

    declare private _communication: IHabboCommunicationManager;

    declare private _windowManager: IHabboWindowManager;

    declare private _roomSessionManager: IRoomSessionManager;

    declare private _notifications: IHabboNotifications;

    declare private _SafeStr_3303: PerkManager;

    declare private _id: number;

    declare private _name: string;

    declare private _figure: string;

    declare private _gender: string;

    declare private _realName: string;

    declare private _respectTotal: number;

    declare private _respectLeft: number;

    declare private _respectReplenishesLeft: number;

    declare private _maxRespectPerDay: number;

    declare private _petRespectLeft: number;

    declare private _nameChangeAllowed: boolean;

    declare private _nftChatStyles: number[];

    declare private _purchasableChatStyles: number[];

    declare private _systemOpen: boolean;

    declare private _SafeStr_6703: boolean;

    declare private _products: Map<any, any>;

    declare private _SafeStr_2748: ProductDataParser;

    declare private _floorItems: UtilsMap;

    declare private _wallItems: UtilsMap;

    declare private _SafeStr_3075: UtilsMap;

    declare private _SafeStr_2986: UtilsMap;

    declare private _SafeStr_3277: FurnitureDataParser;

    declare private _SafeStr_2435: FurnitureDataParser;

    declare private _SafeStr_2792: BadgeImageManager;

    declare private _SafeStr_4801: FurniIconImageManager;

    declare private _SafeStr_7119: HabboGroupInfoManager;

    declare private _SafeStr_4320: IgnoredUsersManager;

    declare private _SafeStr_3142: BlockedUsersManager;

    declare private _localization: IHabboLocalizationManager;

    declare private _SafeStr_5422: boolean;

    declare private _productDataListeners: any[];

    declare private _furniDataListeners: any[];

    declare private _clubLevel: number;

    declare private _securityLevel: number;

    declare private _topSecurityLevel: number;

    declare private _noobnessLevel: number;

    declare private _isAmbassador: boolean;

    declare private _isRoomCameraFollowDisabled: boolean;

    declare private _SafeStr_5520: boolean;

    declare private _uiFlags: number;

    declare private _accountSafetyLocked: boolean;

    declare private _mysteryBoxColor: string;

    declare private _mysteryKeyColor: string;

    declare private _SafeStr_6823: boolean;

    declare private _SafeStr_4550: boolean;

    declare private _newFurniDataHash: string;

    constructor(param1: IContext, param2: number = 0, param3: IAssetLibrary = null) {
        super(param1, param2, param3);
    }

    protected override get dependencies(): ComponentDependency[] {
        return super.dependencies.concat([new ComponentDependency(new IIDHabboWindowManager(), (param1: IHabboWindowManager): void => {
             this._windowManager = param1;
         }, false), new ComponentDependency(new IIDHabboCommunicationManager(), (param1: IHabboCommunicationManager): void => {
             this._communication = param1;
         }, (this.flags & 1) == 0), new ComponentDependency(new IIDHabboConfigurationManager(), null, true, [{ "type": "complete", "callback": this.onConfigurationComplete }]), new ComponentDependency(new IIDHabboLocalizationManager(), (param1: IHabboLocalizationManager): void => {
             this._localization = param1;
         }), new ComponentDependency(new IIDHabboRoomSessionManager(), (param1: IRoomSessionManager): void => {
             this._roomSessionManager = param1;
         }, false), new ComponentDependency(new IIDHabboNotifications(), (param1: IHabboNotifications): void => {
             this._notifications = param1;
         }, false)]);
    }

    private onConfigurationComplete(param1: Event): void {
        this._products = new Dictionary();
        this._floorItems = new UtilsMap();
        this._wallItems = new UtilsMap();
        this._SafeStr_3075 = new UtilsMap();
        this._SafeStr_2986 = new UtilsMap();
        this.initFurnitureData();
        this.initProductData();
        this.initBadgeImageManager();
        this.initFurniIconImageManager();
    }

    protected override initComponent(): void {
        if (this._communication) {
            this._communication.addHabboConnectionMessageEvent(new AvailabilityStatusMessageEvent(this.onAvailabilityStatus));
            this._communication.addHabboConnectionMessageEvent(new UserPurchasableChatStylesMessageEvent(this.onPurchasableChatStyles));
            this._communication.addHabboConnectionMessageEvent(new UserNameChangedMessageEvent(this.onUserNameChange));
            this._communication.addHabboConnectionMessageEvent(new InClientLinkMessageEvent(this.onInClientLink));
            this._communication.addHabboConnectionMessageEvent(new AccountPreferencesEvent(this.onAccountPreferences));
            this._communication.addHabboConnectionMessageEvent(new ChangeUserNameResultMessageEvent(this.onChangeUserNameResult));
            this._communication.addHabboConnectionMessageEvent(new EmailStatusResultEvent(this.onEmailStatus));
            this._communication.addHabboConnectionMessageEvent(new UserObjectEvent(this.onUserObject));
            this._communication.addHabboConnectionMessageEvent(new UserRightsMessageEvent(this.onUserRights));
            this._communication.addHabboConnectionMessageEvent(asGuarded(new RoomReadyMessageEvent(this.onRoomReady), isIMessageEvent));
            this._communication.addHabboConnectionMessageEvent(new FigureUpdateEvent(this.onFigureUpdate));
            this._communication.addHabboConnectionMessageEvent(new AccountSafetyLockStatusChangeMessageEvent(this.onAccountSafetyLockStatusChanged));
            this._communication.addHabboConnectionMessageEvent(new NoobnessLevelMessageEvent(this.onNoobnessLevelEvent));
            this._communication.addHabboConnectionMessageEvent(new UserPurchasableChatStyleChangedMessageEvent(this.onPurchasableChatStyleChanged));
            this._communication.addHabboConnectionMessageEvent(new UserNftChatStylesMessageEvent(this.onNftChatStyles));
            this._communication.addHabboConnectionMessageEvent(new MysteryBoxKeysMessageEvent(this.onMysteryBoxKeys));
            this._communication.addHabboConnectionMessageEvent(new UserChangeMessageEvent(this.onUserChange));
            this._communication.addHabboConnectionMessageEvent(new PetRespectFailedEvent(this.onPetRespectFailed));
        }
        this._SafeStr_7119 = new HabboGroupInfoManager(this);
        this._SafeStr_4320 = new IgnoredUsersManager(this);
        this._SafeStr_3142 = new BlockedUsersManager(this);
        this._SafeStr_3303 = new PerkManager(this);
        this._productDataListeners = [];
        this._furniDataListeners = [];
        if (this._communication) {
            this.initSessionData();
        }
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        if (this._floorItems) {
            this._floorItems.dispose();
            this._floorItems = null;
        }
        if (this._SafeStr_3075) {
            this._SafeStr_3075.dispose();
            this._SafeStr_3075 = null;
        }
        if (this._SafeStr_2986) {
            this._SafeStr_2986.dispose();
            this._SafeStr_2986 = null;
        }
        if (this._SafeStr_3142) {
            this._SafeStr_3142.dispose();
            this._SafeStr_3142 = null;
        }
        if (this._SafeStr_3303) {
            this._SafeStr_3303.dispose();
            this._SafeStr_3303 = null;
        }
        this._furniDataListeners = null;
        if (this._SafeStr_3277) {
            this._SafeStr_3277.dispose();
            this._SafeStr_3277 = null;
        }
        if (this._SafeStr_2435) {
            this._SafeStr_2435.removeEventListener("FDP_furniture_data_ready", this.onFurnitureReady);
            this._SafeStr_2435.dispose();
            this._SafeStr_2435 = null;
        }
        if (this._SafeStr_2748) {
            this._SafeStr_2748.removeEventListener("PDP_product_data_ready", this.onProductsReady);
            this._SafeStr_2748.dispose();
            this._SafeStr_2748 = null;
        }
        super.dispose();
    }

    private initSessionData(): void {
        this._SafeStr_4320.initIgnoreList();
        this._SafeStr_3142.initBlockList();
        this.send(new PerkAllowancesMessageComposer());
        this.send(new GetDailyTasksComposer());
        this.getIncomeRewardStatus();
    }

    private initBadgeImageManager(): void {
        if (this._SafeStr_2792 != null) {
            return;
        }
        this._SafeStr_2792 = new BadgeImageManager(this.assets, this.events, this);
    }

    private initFurniIconImageManager(): void {
        if (this._SafeStr_4801 != null) {
            return;
        }
        this._SafeStr_4801 = new FurniIconImageManager(this.assets, this.events, this, this);
    }

    private initFurnitureData(param1: boolean = true): void {
        let _loc3_: string = null;
        let _loc4_: number = 0;
        let _loc2_: string = null;
        if (this._SafeStr_2435) {
            this._SafeStr_2435.dispose();
            this._SafeStr_2435 = null;
        }
        this._SafeStr_2435 = new FurnitureDataParser(this._floorItems, this._wallItems, this._SafeStr_3075, this._SafeStr_2986, this._localization, param1);
        this._SafeStr_2435.addEventListener("FDP_furniture_data_ready", this.onFurnitureReady);
        // the JSON form when the hotel offers it (the same data, read without building an XML tree of a million
        // nodes, as Habbo's web client reads it); the XML otherwise
        const _json: boolean = this.propertyExists("furnidata.json.load.url");
        if (_json || this.propertyExists("furnidata.load.url")) {
            _loc3_ = this.getProperty(_json ? "furnidata.json.load.url" : "furnidata.load.url");
            if (this._newFurniDataHash != null) {
                _loc4_ = _loc3_.lastIndexOf("/");
                _loc2_ = _loc3_.substring(0, _loc4_);
                this._SafeStr_2435.loadData(_loc2_ + "/" + this._newFurniDataHash);
            } else {
                this._SafeStr_2435.loadData(_loc3_);
            }
        }
    }

    private initProductData(): void {
        if (this._SafeStr_2748) {
            this._SafeStr_2748.dispose();
            this._SafeStr_2748 = null;
        }
        let _loc1_: string = this.getProperty("productdata.load.url");
        this._SafeStr_2748 = new ProductDataParser(_loc1_, this._products);
        this._SafeStr_2748.addEventListener("PDP_product_data_ready", this.onProductsReady);
    }

    private onFurnitureReady(param1: Event = null): void {
        this._SafeStr_2435.removeEventListener("FDP_furniture_data_ready", this.onFurnitureReady);
        if (this._SafeStr_3277) {
            this._SafeStr_3277.dispose();
            this._SafeStr_3277 = null;
        }
        this._SafeStr_3277 = this._SafeStr_2435;
        this._SafeStr_2435 = null;
        this._SafeStr_6823 = true;
        if (!this._SafeStr_4550) {
            this._SafeStr_4550 = true;
            for (const _loc2_ of this._furniDataListeners ?? []) {
                _loc2_.furniDataReady();
            }
        }
    }

    private onUserRights(param1: IMessageEvent): void {
        let _loc2_: UserRightsMessageEvent = castTo(param1, UserRightsMessageEvent);
        this._clubLevel = _loc2_.clubLevel != 0 ? 2 : 0;
        this._securityLevel = _loc2_.securityLevel;
        this._topSecurityLevel = Math.max(this._topSecurityLevel, _loc2_.securityLevel) | 0;
        this._isAmbassador = _loc2_.isAmbassador;
    }

    private onNoobnessLevelEvent(param1: NoobnessLevelMessageEvent): void {
        this._noobnessLevel = param1.noobnessLevel;
        if (this._noobnessLevel != 0) {
            this.context.configuration.setProperty("new.identity", "1");
        }
    }

    private onUserObject(param1: IMessageEvent): void {
        let _loc4_: string = null;
        let _loc2_: UserObjectEvent = param1 instanceof UserObjectEvent ? param1 : null;
        let _loc3_: UserObjectMessageParser = _loc2_.getParser();
        this._id = _loc3_.id;
        this._name = _loc3_.name;
        this._respectTotal = _loc3_.respectTotal;
        this._respectLeft = _loc3_.respectLeft;
        this._respectReplenishesLeft = _loc3_.respectReplenishesLeft;
        this._maxRespectPerDay = _loc3_.maxRespectPerDay;
        this._petRespectLeft = _loc3_.petRespectLeft;
        this._figure = _loc3_.figure;
        this._gender = _loc3_.sex;
        this._realName = _loc3_.realName;
        this._nameChangeAllowed = _loc3_.nameChangeAllowed;
        this._accountSafetyLocked = _loc3_.accountSafetyLocked;
        try {
            if (this.context.displayObjectContainer && this.propertyExists("environment.id")) {
                _loc4_ = this.getProperty("environment.id");
                _loc4_ = _loc4_.replace("pt", "br");
                _loc4_ = _loc4_.replace("en", "com");
                this.context.displayObjectContainer.stage.nativeWindow.title = "Habbo " + _loc4_.toUpperCase() + " | " + this._name;
            }
        } catch (e) {
        }
    }

    private onUserChange(param1: IMessageEvent): void {
        let _loc2_: UserChangeMessageEvent = param1 instanceof UserChangeMessageEvent ? param1 : null;
        if (_loc2_ == null) {
            return;
        }
        if (_loc2_.id == -1) {
            this._figure = _loc2_.figure;
            this._gender = _loc2_.sex;
        }
    }

    private onFigureUpdate(param1: IMessageEvent): void {
        let _loc2_: FigureUpdateEvent = param1 instanceof FigureUpdateEvent ? param1 : null;
        if (_loc2_ == null) {
            return;
        }
        this._figure = _loc2_.figure;
        this._gender = _loc2_.gender;
        HabboWebTools.updateFigure(this._figure);
    }

    private onNftChatStyles(param1: IMessageEvent): void {
        let _loc2_: UserNftChatStylesMessageEvent = param1 instanceof UserNftChatStylesMessageEvent ? param1 : null;
        if (_loc2_ == null) {
            return;
        }
        this._nftChatStyles = _loc2_.getParser().chatStyleIds;
    }

    private onPurchasableChatStyles(param1: IMessageEvent): void {
        let _loc2_: UserPurchasableChatStylesMessageEvent = param1 instanceof UserPurchasableChatStylesMessageEvent ? param1 : null;
        if (_loc2_ == null) {
            return;
        }
        this._purchasableChatStyles = _loc2_.getParser().chatStyleIds;
    }

    private onPurchasableChatStyleChanged(param1: IMessageEvent): void {
        let _loc4_: number = 0;
        let _loc2_: UserPurchasableChatStyleChangedMessageEvent = param1 instanceof UserPurchasableChatStyleChangedMessageEvent ? param1 : null;
        if (_loc2_ == null) {
            return;
        }
        if (this._purchasableChatStyles == null) {
            this._purchasableChatStyles = [];
        }
        let _loc3_: number = _loc2_.getParser().styleId;
        if (_loc2_.getParser().added) {
            this._purchasableChatStyles.push(_loc3_);
        } else {
            _loc4_ = this._purchasableChatStyles.indexOf(_loc3_);
            if (_loc4_ != -1) {
                this._purchasableChatStyles.splice(_loc4_, 1)[0];
            }
        }
        this.events.dispatchEvent(new SessionDataToWidgetEvent("SDTWE_PURCHASABLE_STYLES_UPDATED"));
    }

    private onUserNameChange(param1: IMessageEvent): void {
        let _loc2_: UserNameChangedMessageEvent = param1 instanceof UserNameChangedMessageEvent ? param1 : null;
        if (_loc2_ == null || _loc2_.getParser() == null) {
            return;
        }
        let _loc3_: UserNameChangedMessageParser = _loc2_.getParser();
        if (_loc3_.webId == this._id) {
            this._name = _loc3_.newName;
            this._nameChangeAllowed = false;
            this.events.dispatchEvent(new UserNameUpdateEvent(this._name));
        }
    }

    private onChangeUserNameResult(param1: ChangeUserNameResultMessageEvent): void {
        let _loc3_: string = null;
        let _loc2_: ChangeUserNameResultMessageParser = param1.getParser();
        if (_loc2_.resultCode == ChangeUserNameResultMessageEvent._SafeStr_4064) {
            try {
                if (this.context.displayObjectContainer && this.propertyExists("environment.id")) {
                    _loc3_ = this.getProperty("environment.id");
                    _loc3_ = _loc3_.replace("pt", "br");
                    _loc3_ = _loc3_.replace("en", "com");
                    this.context.displayObjectContainer.stage.nativeWindow.title = "Habbo " + _loc3_.toUpperCase() + " | " + _loc2_.name;
                }
            } catch (e) {
            }
            this._nameChangeAllowed = false;
            this.events.dispatchEvent(new UserNameUpdateEvent(_loc2_.name));
        }
    }

    private onMysteryBoxKeys(param1: MysteryBoxKeysMessageEvent): void {
        let _loc2_: MysteryBoxKeysMessageParser = param1.getParser();
        this._mysteryBoxColor = _loc2_.boxColor;
        this._mysteryKeyColor = _loc2_.keyColor;
        this.events.dispatchEvent(new MysteryBoxKeysUpdateEvent(this._mysteryBoxColor, this._mysteryKeyColor));
    }

    private onInClientLink(param1: InClientLinkMessageEvent): void {
        this.context.createLinkEvent(param1.link);
    }

    private onAccountPreferences(param1: AccountPreferencesEvent): void {
        let _loc2_: AccountPreferencesParser = asInstanceOf(param1.getParser(), AccountPreferencesParser);
        this._SafeStr_5520 = _loc2_.roomCameraFollowDisabled;
        this._uiFlags = _loc2_.uiFlags;
        this.events.dispatchEvent(new SessionDataPreferencesEvent(this._uiFlags));
    }

    private onEmailStatus(param1: EmailStatusResultEvent): void {
        let _loc2_: EmailStatusParser = asInstanceOf(param1.getParser(), EmailStatusParser);
        this._isRoomCameraFollowDisabled = _loc2_.isVerified;
    }

    private onAvailabilityStatus(param1: IMessageEvent): void {
        let _loc2_: AvailabilityStatusMessageParser = (param1 instanceof AvailabilityStatusMessageEvent ? param1 : null).getParser();
        if (_loc2_ == null) {
            return;
        }
        this._systemOpen = _loc2_.isOpen;
        this._SafeStr_6703 = _loc2_.onShutDown;
        if (this._SafeStr_6823 && !this._SafeStr_4550) {
            this._SafeStr_4550 = true;
            for (const _loc3_ of this._furniDataListeners ?? []) {
                _loc3_.furniDataReady();
            }
        }
    }

    private onPetRespectFailed(param1: PetRespectFailedEvent): void {
        if (param1 == null) {
            return;
        }
        this._petRespectLeft = this._petRespectLeft + 1;
    }

    private onAccountSafetyLockStatusChanged(param1: AccountSafetyLockStatusChangeMessageEvent): void {
        let _loc2_: AccountSafetyLockStatusChangeMessageParser = param1.getParser();
        this._accountSafetyLocked = _loc2_.status == 0;
    }

    public get systemOpen(): boolean {
        return this._systemOpen;
    }

    public get systemShutDown(): boolean {
        return this._SafeStr_6703;
    }

    public hasSecurity(param1: number): boolean {
        return this._securityLevel >= param1;
    }

    public get topSecurityLevel(): number {
        return this._topSecurityLevel;
    }

    public get clubLevel(): number {
        return this._clubLevel;
    }

    public get hasVip(): boolean {
        return HabboClubLevelEnum.HasVip(this._clubLevel);
    }

    public get hasClub(): boolean {
        return HabboClubLevelEnum.HasClub(this._clubLevel);
    }

    public get isNoob(): boolean {
        return this._noobnessLevel != 0;
    }

    public get isRealNoob(): boolean {
        return this._noobnessLevel == 2;
    }

    public get userId(): number {
        return this._id;
    }

    public get userName(): string {
        return this._name;
    }

    public get realName(): string {
        return this._realName;
    }

    public get figure(): string {
        return this._figure;
    }

    public get isAnyRoomController(): boolean {
        return this._securityLevel >= 5;
    }

    public get isAmbassador(): boolean {
        return this._isAmbassador;
    }

    public get isEmailVerified(): boolean {
        return this._isRoomCameraFollowDisabled;
    }

    public setRoomCameraFollowDisabled(param1: boolean): void {
        this._SafeStr_5520 = param1;
    }

    public get isRoomCameraFollowDisabled(): boolean {
        return this._SafeStr_5520;
    }

    public setFriendBarState(param1: boolean): void {
        this.setUIFlag(1, param1);
    }

    public setRoomToolsState(param1: boolean): void {
        this.setUIFlag(2, param1);
    }

    public get uiFlags(): number {
        return this._uiFlags;
    }

    private setUIFlag(param1: number, param2: boolean): void {
        if (param2) {
            if (this._uiFlags & param1) {
                return;
            }
            this._uiFlags |= param1;
        } else {
            if (!(this._uiFlags & param1)) {
                return;
            }
            this._uiFlags &= ~param1;
        }
        this._communication.connection.send(new SetUIFlagsMessageComposer(this._uiFlags));
    }

    public getBadgeImage(param1: string): BitmapData {
        return this._SafeStr_2792.getBadgeImage(param1);
    }

    public getBadgeSmallImage(param1: string): BitmapData {
        return this._SafeStr_2792.getSmallBadgeImage(param1);
    }

    public getBadgeImageAssetName(param1: string): string {
        return this._SafeStr_2792.getBadgeImageAssetName(param1);
    }

    public getBadgeImageSmallAssetName(param1: string): string {
        return this._SafeStr_2792.getSmallScaleBadgeAssetName(param1);
    }

    public requestBadgeImage(param1: string): BitmapData {
        return this._SafeStr_2792.getBadgeImage(param1, "normal_badge", false);
    }

    public getBadgeImageWithInfo(param1: string): BadgeInfo {
        return this._SafeStr_2792.getBadgeImageWithInfo(param1);
    }

    private onAlertClose(param1: IAlertDialog, param2: WindowEvent): void {
        param1.dispose();
    }

    public getGroupBadgeId(param1: number): string {
        return this._SafeStr_7119.getBadgeId(param1);
    }

    public send(param1: IMessageComposer): void {
        this._communication.connection.send(param1);
    }

    public getGroupBadgeImage(param1: string): BitmapData {
        return this._SafeStr_2792.getBadgeImage(param1, "group_badge");
    }

    public getGroupBadgeSmallImage(param1: string): BitmapData {
        return this._SafeStr_2792.getSmallBadgeImage(param1, "group_badge");
    }

    public getGroupBadgeAssetName(param1: string): string {
        return this._SafeStr_2792.getBadgeImageAssetName(param1, "group_badge");
    }

    public getGroupBadgeSmallAssetName(param1: string): string {
        return this._SafeStr_2792.getSmallScaleBadgeAssetName(param1, "group_badge");
    }

    public getFurniIconImage(param1: boolean, param2: number, param3: string): BitmapData {
        return this._SafeStr_4801.getFurniIconImage(param1, param2, param3);
    }

    public getFurniIconImageAssetName(param1: boolean, param2: number, param3: string): string {
        return this._SafeStr_4801.getFurniIconImageAssetName(param1, param2, param3);
    }

    public isAccountSafetyLocked(): boolean {
        return this._accountSafetyLocked;
    }

    public get communication(): IHabboCommunicationManager {
        return this._communication;
    }

    public isIgnored(param1: number): boolean {
        return this._SafeStr_4320.isIgnored(param1);
    }

    public ignoreUser(param1: number): void {
        this._SafeStr_4320.ignoreUser(param1);
    }

    public unignoreUser(param1: number): void {
        this._SafeStr_4320.unignoreUser(param1);
    }

    public isBlocked(param1: number): boolean {
        return this._SafeStr_3142.isBlocked(param1);
    }

    public blockUser(param1: number): void {
        this._SafeStr_3142.blockUser(param1);
    }

    public unblockUser(param1: number): void {
        this._SafeStr_3142.unblockUser(param1);
    }

    public get respectLeft(): number {
        return this._respectLeft;
    }

    public get respectReplenishesLeft(): number {
        return this._respectReplenishesLeft;
    }

    public get petRespectLeft(): number {
        return this._petRespectLeft;
    }

    public giveRespect(param1: number): void {
        if (param1 >= 0 && this._respectLeft > 0) {
            this.send(new RespectUserMessageComposer(param1));
            this._respectLeft -= 1;
        }
    }

    public replenishRespect(): void {
        this.send(new ReplenishRespectMessageComposer());
        this._respectReplenishesLeft -= 1;
        this._respectLeft = this._maxRespectPerDay;
    }

    public giveRespectFailed(): void {
        this._respectLeft += 1;
    }

    public getCreditVaultStatus(): void {
        this.send(new CreditVaultStatusMessageComposer());
    }

    public getIncomeRewardStatus(): void {
        this.send(new IncomeRewardStatusMessageComposer());
    }

    public withdrawCreditVault(): void {
        this.send(new WithdrawCreditVaultMessageComposer());
    }

    public claimReward(param1: number): void {
        this.send(new IncomeRewardClaimMessageComposer(param1));
    }

    public givePetRespect(param1: number): void {
        if (param1 >= 0 && this._petRespectLeft > 0) {
            this.send(new RespectPetMessageComposer(param1));
            this._petRespectLeft -= 1;
        }
    }

    public getProductData(param1: string): IProductData {
        if (!this._SafeStr_5422) {
            this.loadProductData();
        }
        return this._products.get(param1);
    }

    public getFloorItemData(param1: number): IFurnitureData {
        if (this._floorItems == null) {
            return null;
        }
        return this._floorItems.getValue(param1.toString());
    }

    public getFloorItemsDataByCategory(param1: number): any[] {
        let _loc2_: any[] = [];
        if (this._floorItems != null) {
            for (const _loc3_ of valuesOf(this._floorItems)) {
                if (_loc3_.category == param1) {
                    _loc2_.push(_loc3_);
                }
            }
        }
        return _loc2_;
    }

    public getWallItemData(param1: number): IFurnitureData {
        if (this._wallItems == null) {
            return null;
        }
        return this._wallItems.getValue(param1.toString());
    }

    public getFloorItemDataByName(param1: string, param2: number = 0): IFurnitureData {
        let _loc3_: number = 0;
        if (this._SafeStr_3075 == null) {
            return null;
        }
        let _loc4_: any[] = this._SafeStr_3075.getValue(param1);
        if (_loc4_ != null && param2 <= _loc4_.length - 1) {
            _loc3_ = _loc4_[param2] | 0;
            return this.getFloorItemData(_loc3_);
        }
        return null;
    }

    public getWallItemDataByName(param1: string, param2: number = 0): IFurnitureData {
        let _loc3_: number = 0;
        if (this._SafeStr_2986 == null) {
            return null;
        }
        let _loc4_: any[] = this._SafeStr_2986.getValue(param1);
        if (_loc4_ != null && param2 <= _loc4_.length - 1) {
            _loc3_ = _loc4_[param2] | 0;
            return this.getWallItemData(_loc3_);
        }
        return null;
    }

    public getAllFloorItemDatas(): any[] {
        if (this._floorItems == null) {
            return [];
        }
        return this._floorItems.getValues();
    }

    public getAllWallItemDatas(): any[] {
        if (this._wallItems == null) {
            return [];
        }
        return this._wallItems.getValues();
    }

    public openHabboHomePage(param1: number, param2: string): void {
        let _loc3_: string = null;
        if (this.propertyExists("link.format.userpage")) {
            _loc3_ = this.getProperty("link.format.userpage");
            _loc3_ = _loc3_.replace("%ID%", String(param1));
            _loc3_ = _loc3_.replace("%username%", param2);
            try {
                HabboWebTools.navigateToURL(_loc3_, "habboMain");
            } catch (e) {
                Logger.log("Error occurred!");
            }
        }
    }

    public pickAllFurniture(param1: number): void {
        let session: IRoomSession;
        let roomId: number = param1;
        if (this._roomSessionManager == null || this._windowManager == null) {
            return;
        }
        session = this._roomSessionManager.getSession(roomId);
        if (session == null) {
            return;
        }
        if (session.isRoomOwner || this.isAnyRoomController || session.roomControllerLevel >= 1) {
            this._windowManager.confirm("${generic.alert.title}", "${room.confirm.pick_all}", 0, (param1: IConfirmDialog, param2: WindowEvent): void => {
                param1.dispose();
                if (param2.type == "WE_OK") {
                    this.sendSpecialCommandMessage(":pickall");
                }
            });
        }
    }

    public resetScores(param1: number): void {
        let session: IRoomSession;
        let roomId: number = param1;
        if (this._roomSessionManager == null || this._windowManager == null) {
            return;
        }
        session = this._roomSessionManager.getSession(roomId);
        if (session == null) {
            return;
        }
        if (session.isRoomOwner || this.isAnyRoomController || session.roomControllerLevel >= 1) {
            this._windowManager.confirm("${generic.alert.title}", "${room.confirm.resetscores}", 0, (param1: IConfirmDialog, param2: WindowEvent): void => {
                param1.dispose();
                if (param2.type == "WE_OK") {
                    this.sendSpecialCommandMessage(":resetscores");
                }
            });
        }
    }

    public ejectAllFurniture(param1: number, param2: string): void {
        let session: IRoomSession;
        let roomId: number = param1;
        let message: string = param2;
        if (this._roomSessionManager == null || this._windowManager == null) {
            return;
        }
        session = this._roomSessionManager.getSession(roomId);
        if (session == null) {
            return;
        }
        if (session.isRoomOwner || this.isAnyRoomController || session.roomControllerLevel >= 1) {
            this._windowManager.confirm("${generic.alert.title}", "${room.confirm.eject_all}", 0, (param1: IConfirmDialog, param2: WindowEvent): void => {
                param1.dispose();
                if (param2.type == "WE_OK") {
                    this.sendSpecialCommandMessage(message);
                }
            });
        }
    }

    public ejectPets(param1: number): void {
        if (this._roomSessionManager == null || this._windowManager == null) {
            return;
        }
        let _loc2_: IRoomSession = this._roomSessionManager.getSession(param1);
        if (_loc2_ == null) {
            return;
        }
        if (_loc2_.isRoomOwner || this.isAnyRoomController) {
            this.sendSpecialCommandMessage(":ejectpets");
        }
    }

    public pickAllBuilderFurniture(param1: number): void {
        let session: IRoomSession;
        let roomId: number = param1;
        if (this._roomSessionManager == null || this._windowManager == null) {
            return;
        }
        session = this._roomSessionManager.getSession(roomId);
        if (session == null) {
            return;
        }
        if (session.isRoomOwner || this.isAnyRoomController || session.roomControllerLevel >= 1) {
            this._windowManager.confirm("${generic.alert.title}", "${room.confirm.pick_all_bc}", 0, (param1: IConfirmDialog, param2: WindowEvent): void => {
                param1.dispose();
                if (param2.type == "WE_OK") {
                    this.sendSpecialCommandMessage(":pickallbc");
                }
            });
        }
    }

    public loadProductData(param1: IProductDataListener = null): boolean {
        if (this._SafeStr_5422) {
            return true;
        }
        if (param1 && this._productDataListeners.indexOf(param1) == -1) {
            this._productDataListeners.push(param1);
        }
        return false;
    }

    public addProductsReadyEventListener(param1: IProductDataListener): void {
        if (this._SafeStr_5422) {
            param1.productDataReady();
            return;
        }
        if (param1 && this._productDataListeners.indexOf(param1) == -1) {
            this._productDataListeners.push(param1);
        }
    }

    private onProductsReady(param1: Event): void {
        this._SafeStr_2748.removeEventListener("PDP_product_data_ready", this.onProductsReady);
        this._SafeStr_5422 = true;
        for (const _loc2_ of this._productDataListeners ?? []) {
            if (_loc2_ != null && !_loc2_.disposed) {
                _loc2_.productDataReady();
            }
        }
        this._productDataListeners = [];
    }

    private onRoomReady(param1: IMessageEvent): void {
        let _loc3_: RoomReadyMessageEvent = param1 instanceof RoomReadyMessageEvent ? param1 : null;
        if (_loc3_ == null || _loc3_.getParser() == null || param1.connection == null) {
            return;
        }
        let _loc2_: RoomReadyMessageParser = _loc3_.getParser();
        HabboWebTools.roomVisited(_loc2_.roomId);
    }

    public sendSpecialCommandMessage(param1: string): void {
        this.send(new ChatMessageComposer(param1));
    }

    public get roomSessionManager(): IRoomSessionManager {
        return this._roomSessionManager;
    }

    public get windowManager(): IHabboWindowManager {
        return this._windowManager;
    }

    public get gender(): string {
        return this._gender;
    }

    public set newFurniDataHash(param1: string) {
        this._newFurniDataHash = param1;
    }

    public refreshFurniData(): void {
        this._floorItems = new UtilsMap();
        this._wallItems = new UtilsMap();
        this._SafeStr_3075 = new UtilsMap();
        this._SafeStr_2986 = new UtilsMap();
        this.initFurnitureData(false);
    }

    public removeFurniDataListener(param1: IFurniDataListener): void {
        if (!this._furniDataListeners) {
            return;
        }
        let _loc2_: number = this._furniDataListeners.indexOf(param1);
        if (_loc2_ > -1) {
            this._furniDataListeners.splice(_loc2_, 1);
        }
    }

    public getFurniData(param1: IFurniDataListener): IFurnitureData[] {
        if (this._floorItems == null || this._floorItems.length == 0) {
            if (this._furniDataListeners.indexOf(param1) == -1) {
                this._furniDataListeners.push(param1);
            }
            return null;
        }
        return Array.from(this._floorItems.getValues().concat(this._wallItems.getValues()));
    }

    public getXmlWindow(param1: string): IWindow {
        let _loc4_: IAsset = null;
        let _loc2_: XmlAsset = null;
        let _loc3_: IWindow = null;
        try {
            _loc4_ = this.assets.getAssetByName(param1);
            _loc2_ = castTo(_loc4_, XmlAsset);
            _loc3_ = this._windowManager.buildFromXML(XML.from(_loc2_.content));
        } catch (e) {
        }
        return _loc3_;
    }

    public get localization(): IHabboLocalizationManager {
        return this._localization;
    }

    public get nameChangeAllowed(): boolean {
        return this._nameChangeAllowed;
    }

    public get perksReady(): boolean {
        return this._SafeStr_3303 != null && this._SafeStr_3303.isReady;
    }

    public isPerkAllowed(param1: string): boolean {
        return this._SafeStr_3303.isPerkAllowed(param1);
    }

    public getPerkErrorMessage(param1: string): string {
        return this._SafeStr_3303.getPerkErrorMessage(param1);
    }

    public get currentTalentTrack(): string {
        return this.getBoolean("talent.track.citizenship.enabled") && !this.isPerkAllowed("CITIZEN") ? "citizenship" : "helper";
    }

    public get mysteryBoxColor(): string {
        return this._mysteryBoxColor;
    }

    public get mysteryKeyColor(): string {
        return this._mysteryKeyColor;
    }

    public hasNftChatStyle(param1: number): boolean {
        return this._nftChatStyles != null && this._nftChatStyles.indexOf(param1) != -1;
    }

    public hasPurchasableChatStyle(param1: number): boolean {
        return this._purchasableChatStyles != null && this._purchasableChatStyles.indexOf(param1) != -1;
    }

    public get notifications(): IHabboNotifications {
        return this._notifications;
    }

    protected override initInstanceFields(): void {
        this.onConfigurationComplete = this.onConfigurationComplete.bind(this);
        this.onFurnitureReady = this.onFurnitureReady.bind(this);
        this.onUserRights = this.onUserRights.bind(this);
        this.onNoobnessLevelEvent = this.onNoobnessLevelEvent.bind(this);
        this.onUserObject = this.onUserObject.bind(this);
        this.onUserChange = this.onUserChange.bind(this);
        this.onFigureUpdate = this.onFigureUpdate.bind(this);
        this.onNftChatStyles = this.onNftChatStyles.bind(this);
        this.onPurchasableChatStyles = this.onPurchasableChatStyles.bind(this);
        this.onPurchasableChatStyleChanged = this.onPurchasableChatStyleChanged.bind(this);
        this.onUserNameChange = this.onUserNameChange.bind(this);
        this.onChangeUserNameResult = this.onChangeUserNameResult.bind(this);
        this.onMysteryBoxKeys = this.onMysteryBoxKeys.bind(this);
        this.onInClientLink = this.onInClientLink.bind(this);
        this.onAccountPreferences = this.onAccountPreferences.bind(this);
        this.onEmailStatus = this.onEmailStatus.bind(this);
        this.onAvailabilityStatus = this.onAvailabilityStatus.bind(this);
        this.onPetRespectFailed = this.onPetRespectFailed.bind(this);
        this.onAccountSafetyLockStatusChanged = this.onAccountSafetyLockStatusChanged.bind(this);
        this.getBadgeImage = this.getBadgeImage.bind(this);
        this.getBadgeSmallImage = this.getBadgeSmallImage.bind(this);
        this.getBadgeImageAssetName = this.getBadgeImageAssetName.bind(this);
        this.getBadgeImageSmallAssetName = this.getBadgeImageSmallAssetName.bind(this);
        this.getGroupBadgeImage = this.getGroupBadgeImage.bind(this);
        this.getGroupBadgeSmallImage = this.getGroupBadgeSmallImage.bind(this);
        this.getGroupBadgeAssetName = this.getGroupBadgeAssetName.bind(this);
        this.getGroupBadgeSmallAssetName = this.getGroupBadgeSmallAssetName.bind(this);
        this.onProductsReady = this.onProductsReady.bind(this);
        this.onRoomReady = this.onRoomReady.bind(this);
        this._id = 0;
        this._respectTotal = 0;
        this._respectLeft = 0;
        this._respectReplenishesLeft = 0;
        this._maxRespectPerDay = 0;
        this._petRespectLeft = 0;
        this._nameChangeAllowed = true;
        this._systemOpen = false;
        this._SafeStr_6703 = false;
        this._SafeStr_5422 = false;
        this._clubLevel = 0;
        this._securityLevel = 0;
        this._topSecurityLevel = 0;
        this._noobnessLevel = -1;
        this._isAmbassador = false;
        this._isRoomCameraFollowDisabled = false;
        this._SafeStr_5520 = false;
        this._uiFlags = 0;
        this._accountSafetyLocked = false;
        this._SafeStr_6823 = false;
        this._SafeStr_4550 = false;
        this._newFurniDataHash = null;
        super.initInstanceFields();
    }

    get [ISessionDataManager](): true {
        return true;
    }
}
