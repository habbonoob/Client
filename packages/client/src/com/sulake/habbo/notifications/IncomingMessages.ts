import { asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { ILocalization } from '@/com/sulake/core/localization/ILocalization';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IAlertDialog } from '@/com/sulake/core/window/utils/IAlertDialog';
import type { IAvatarImage } from '@/com/sulake/habbo/avatar/IAvatarImage';
import type { IAvatarImageListener } from '@/com/sulake/habbo/avatar/IAvatarImageListener';
import type { IHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import type { InfoHotelClosedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/availability/InfoHotelClosedMessageParser';
import type { InfoHotelClosingMessageParser } from '@/com/sulake/habbo/communication/messages/parser/availability/InfoHotelClosingMessageParser';
import type { LoginFailedHotelClosedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/availability/LoginFailedHotelClosedMessageParser';
import type { MaintenanceStatusMessageParser } from '@/com/sulake/habbo/communication/messages/parser/availability/MaintenanceStatusMessageParser';
import type { ClubGiftSelectedParser } from '@/com/sulake/habbo/communication/messages/parser/catalog/ClubGiftSelectedParser';
import type { UserPurchasableChatStyleChangedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/chatstyles/UserPurchasableChatStyleChangedMessageParser';
import type { UserObjectMessageParser } from '@/com/sulake/habbo/communication/messages/parser/handshake/UserObjectMessageParser';
import type { BadgeReceivedParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/badges/BadgeReceivedParser';
import type { PetData } from '@/com/sulake/habbo/communication/messages/parser/inventory/pets/PetData';
import type { PetFigureData } from '@/com/sulake/habbo/communication/messages/parser/inventory/pets/PetFigureData';
import type { PetReceivedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/pets/PetReceivedMessageParser';
import type { BanInfoMessageParser } from '@/com/sulake/habbo/communication/messages/parser/moderation/BanInfoMessageParser';
import type { ModerationCautionParser } from '@/com/sulake/habbo/communication/messages/parser/moderation/ModerationCautionParser';
import type { ModeratorMessageParser } from '@/com/sulake/habbo/communication/messages/parser/moderation/ModeratorMessageParser';
import type { UserBannedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/moderation/UserBannedMessageParser';
import type { NftEmeraldConvertResultMessageParser } from '@/com/sulake/habbo/communication/messages/parser/nft/NftEmeraldConvertResultMessageParser';
import type { ClubGiftNotificationParser } from '@/com/sulake/habbo/communication/messages/parser/notifications/ClubGiftNotificationParser';
import type { HabboAchievementNotificationMessageParser } from '@/com/sulake/habbo/communication/messages/parser/notifications/HabboAchievementNotificationMessageParser';
import type { HabboBroadcastMessageParser } from '@/com/sulake/habbo/communication/messages/parser/notifications/HabboBroadcastMessageParser';
import type { NotificationDialogMessageParser } from '@/com/sulake/habbo/communication/messages/parser/notifications/NotificationDialogMessageParser';
import type { PetLevelNotificationParser } from '@/com/sulake/habbo/communication/messages/parser/notifications/PetLevelNotificationParser';
import type { ClaimProductResultParser } from '@/com/sulake/habbo/communication/messages/parser/peerservice/ClaimProductResultParser';
import type { RecyclerFinishedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/recycler/RecyclerFinishedMessageParser';
import type { RoomMessageNotificationMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/furniture/RoomMessageNotificationMessageParser';
import type { PetRespectFailedParser } from '@/com/sulake/habbo/communication/messages/parser/room/pets/PetRespectFailedParser';
import type { TreasureHuntFailMessageParser } from '@/com/sulake/habbo/communication/messages/parser/treasurehunt/TreasureHuntFailMessageParser';
import type { TreasureHuntFirstWinnerMessageParser } from '@/com/sulake/habbo/communication/messages/parser/treasurehunt/TreasureHuntFirstWinnerMessageParser';
import type { TreasureHuntUpdateMessageParser } from '@/com/sulake/habbo/communication/messages/parser/treasurehunt/TreasureHuntUpdateMessageParser';
import type { TreasureHuntWinnerInfo } from '@/com/sulake/habbo/communication/messages/parser/treasurehunt/TreasureHuntWinnerInfo';
import type { WiredTradeTransactionNotificationMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/trade/WiredTradeTransactionNotificationMessageParser';
import type { WiredTransactionFailMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/transactions/WiredTransactionFailMessageParser';
import type { WiredTransactionSuccessContents } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/transactions/WiredTransactionSuccessContents';
import type { WiredTransactionSuccessMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/transactions/WiredTransactionSuccessMessageParser';
import type { AccountSafetyLockStatusChangeMessageParser } from '@/com/sulake/habbo/communication/messages/parser/users/AccountSafetyLockStatusChangeMessageParser';
import type { HabboNotifications } from '@/com/sulake/habbo/notifications/HabboNotifications';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { InfoHotelClosedMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/availability/InfoHotelClosedMessageEvent';
import { InfoHotelClosingMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/availability/InfoHotelClosingMessageEvent';
import { LoginFailedHotelClosedMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/availability/LoginFailedHotelClosedMessageEvent';
import { MaintenanceStatusMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/availability/MaintenanceStatusMessageEvent';
import { CatalogPageMessageProductData } from '@/com/sulake/habbo/communication/messages/incoming/catalog/CatalogPageMessageProductData';
import { ClubGiftSelectedEvent } from '@/com/sulake/habbo/communication/messages/incoming/catalog/ClubGiftSelectedEvent';
import { UserPurchasableChatStyleChangedMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/chatstyles/UserPurchasableChatStyleChangedMessageEvent';
import { UserObjectEvent } from '@/com/sulake/habbo/communication/messages/incoming/handshake/UserObjectEvent';
import { BadgeReceivedEvent } from '@/com/sulake/habbo/communication/messages/incoming/inventory/badges/BadgeReceivedEvent';
import { PetReceivedMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/inventory/pets/PetReceivedMessageEvent';
import { BanInfoMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/moderation/BanInfoMessageEvent';
import { ModeratorCautionEvent } from '@/com/sulake/habbo/communication/messages/incoming/moderation/ModeratorCautionEvent';
import { ModeratorMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/moderation/ModeratorMessageEvent';
import { UserBannedMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/moderation/UserBannedMessageEvent';
import { NftEmeraldConvertResultMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/nft/NftEmeraldConvertResultMessageEvent';
import { ClubGiftNotificationEvent } from '@/com/sulake/habbo/communication/messages/incoming/notifications/ClubGiftNotificationEvent';
import { HabboAchievementNotificationMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/notifications/HabboAchievementNotificationMessageEvent';
import { HabboActivityPointNotificationMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/notifications/HabboActivityPointNotificationMessageEvent';
import { HabboBroadcastMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/notifications/HabboBroadcastMessageEvent';
import { InfoFeedEnableMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/notifications/InfoFeedEnableMessageEvent';
import { MOTDNotificationEvent } from '@/com/sulake/habbo/communication/messages/incoming/notifications/MOTDNotificationEvent';
import { NotificationDialogMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/notifications/NotificationDialogMessageEvent';
import { PetLevelNotificationEvent } from '@/com/sulake/habbo/communication/messages/incoming/notifications/PetLevelNotificationEvent';
import { RestoreClientMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/notifications/RestoreClientMessageEvent';
import { ClaimProductResultMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/peerservice/ClaimProductResultMessageEvent';
import { RecyclerFinishedMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/recycler/RecyclerFinishedMessageEvent';
import { RoomEntryInfoMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/engine/RoomEntryInfoMessageEvent';
import { RoomMessageNotificationMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/furniture/RoomMessageNotificationMessageEvent';
import { PetRespectFailedEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/pets/PetRespectFailedEvent';
import { OpenConnectionMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/session/OpenConnectionMessageEvent';
import { TreasureHuntFailMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/treasurehunt/TreasureHuntFailMessageEvent';
import { TreasureHuntFirstWinnerMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/treasurehunt/TreasureHuntFirstWinnerMessageEvent';
import { TreasureHuntUpdateMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/treasurehunt/TreasureHuntUpdateMessageEvent';
import { WiredTradeTransactionNotificationMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredtrading/trade/WiredTradeTransactionNotificationMessageEvent';
import { WiredTransactionFailMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredtrading/transactions/WiredTransactionFailMessageEvent';
import { WiredTransactionSuccessMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredtrading/transactions/WiredTransactionSuccessMessageEvent';
import { AccountSafetyLockStatusChangeMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/users/AccountSafetyLockStatusChangeMessageEvent';
import { RespectNotificationMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/users/RespectNotificationMessageEvent';
import { MOTDNotificationParser } from '@/com/sulake/habbo/communication/messages/parser/notifications/MOTDNotificationParser';
import { GenericNotificationItemData } from '@/com/sulake/habbo/notifications/feed/data/GenericNotificationItemData';
import { MOTDNotification } from '@/com/sulake/habbo/notifications/singular/MOTDNotification';
import { HabboFaceFocuser } from '@/com/sulake/habbo/utils/HabboFaceFocuser';
import { HabboWebTools } from '@/com/sulake/habbo/utils/HabboWebTools';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class IncomingMessages implements IAvatarImageListener {
    static { registerClassName(this, 'com.sulake.habbo.notifications::IncomingMessages'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        IncomingMessages.#initStatics();
        return IncomingMessages._log;
    }

    declare private _notifications: HabboNotifications;

    declare private _communication: IHabboCommunicationManager;

    declare private _messageEvents: IMessageEvent[];

    declare private _bufferedTreasureHuntWinnerInfo: TreasureHuntWinnerInfo;

    private readonly CALL_FOR_HELP_NOTIFICATION_TYPE: string = "cfh.created";

    constructor(param1: HabboNotifications, param2: IHabboCommunicationManager) {
        this._notifications = param1;
        this._communication = param2;
        this._messageEvents = new Array<IMessageEvent>(0).fill(null);
        this.addMessageEvent(new ModeratorCautionEvent(this.onModCautionEvent));
        this.addMessageEvent(new InfoHotelClosedMessageEvent(this.onHotelClosed));
        this.addMessageEvent(new MaintenanceStatusMessageEvent(this.onHotelMaintenance));
        this.addMessageEvent(new ClubGiftNotificationEvent(this.onClubGiftNotification));
        this.addMessageEvent(new WiredTradeTransactionNotificationMessageEvent(this.onWiredTradeTransactionNotification));
        this.addMessageEvent(new WiredTransactionFailMessageEvent(this.onWiredTransactionFail));
        this.addMessageEvent(new TreasureHuntFirstWinnerMessageEvent(this.onTreasureHuntFirstWinner));
        this.addMessageEvent(new WiredTransactionSuccessMessageEvent(this.onWiredTransactionSuccess));
        this.addMessageEvent(new NftEmeraldConvertResultMessageEvent(this.onNftEmeraldConvertResult));
        this.addMessageEvent(new RespectNotificationMessageEvent(this.onRespectNotification));
        this.addMessageEvent(new ClaimProductResultMessageEvent(this.onClaimProductResult));
        this.addMessageEvent(new HabboAchievementNotificationMessageEvent(this.onLevelUp));
        this.addMessageEvent(new PetLevelNotificationEvent(this.onPetLevelNotification));
        this.addMessageEvent(new ClubGiftSelectedEvent(this.onClubGiftSelected));
        this.addMessageEvent(new RoomMessageNotificationMessageEvent(this.onRoomMessagesNotification));
        this.addMessageEvent(new NotificationDialogMessageEvent(this.onNotificationDialogMessageEvent));
        this.addMessageEvent(new PetReceivedMessageEvent(this.onPetReceived));
        this.addMessageEvent(new AccountSafetyLockStatusChangeMessageEvent(this.onAccountSafetyLockStatusChanged));
        this.addMessageEvent(new LoginFailedHotelClosedMessageEvent(this.onLoginFailedHotelClosed));
        this.addMessageEvent(new BanInfoMessageEvent(this.onBanInfoMessageEvent));
        this.addMessageEvent(new UserPurchasableChatStyleChangedMessageEvent(this.onChatStyleNotification));
        this.addMessageEvent(new MOTDNotificationEvent(this.onMOTD));
        this.addMessageEvent(new InfoFeedEnableMessageEvent(this.onInfoFeedEnable));
        this.addMessageEvent(new RecyclerFinishedMessageEvent(this.onRecyclerFinished));
        this.addMessageEvent(new RestoreClientMessageEvent(this.onRestoreClientMessageEvent));
        this.addMessageEvent(new HabboBroadcastMessageEvent(this.onBroadcastMessageEvent));
        this.addMessageEvent(new UserBannedMessageEvent(this.onUserBannedMessageEvent));
        this.addMessageEvent(new PetRespectFailedEvent(this.onPetRespectFailed));
        this.addMessageEvent(new UserObjectEvent(this.onUserObject));
        this.addMessageEvent(new InfoHotelClosingMessageEvent(this.onHotelClosing));
        this.addMessageEvent(new RoomEntryInfoMessageEvent(this.onRoomEnter));
        this.addMessageEvent(new TreasureHuntFailMessageEvent(this.onTreasureHuntFail));
        this.addMessageEvent(new BadgeReceivedEvent(this.onBadgeReceived));
        this.addMessageEvent(new TreasureHuntUpdateMessageEvent(this.onTreasureHuntUpdate));
        this.addMessageEvent(new HabboActivityPointNotificationMessageEvent(this.onActivityPointNotification));
        this.addMessageEvent(new ModeratorMessageEvent(this.onModMessageEvent));
        this.addMessageEvent(new OpenConnectionMessageEvent(this.onRoomEnter));
        this._notifications.activate();
    }

    private getHuntName(param1: string): string {
        return this._notifications.localization.getLocalization("treasure_hunt." + param1 + ".name", param1);
    }

    private onTreasureHuntUpdate = (param1: TreasureHuntUpdateMessageEvent): void => {
        let _loc3_: string = null;
        let _loc2_: TreasureHuntUpdateMessageParser = param1.getParser();
        if (!_loc2_.isCompleted) {
            _loc3_ = this._notifications.localization.getLocalizationWithParams("treasure_hunt.progress.desc", "", "current", _loc2_.stepsCompleted, "total", _loc2_.totalSteps, "hunt_name", this.getHuntName(_loc2_.huntId));
        } else {
            _loc3_ = this._notifications.localization.getLocalizationWithParams("treasure_hunt.won.desc", "", "hunt_name", this.getHuntName(_loc2_.huntId));
        }
        this._notifications.addItem(_loc3_, "treasure_hunt");
    };

    private onTreasureHuntFail = (param1: TreasureHuntFailMessageEvent): void => {
        let _loc2_: TreasureHuntFailMessageParser = param1.getParser();
        let _loc3_: string = this._notifications.localization.getLocalizationWithParams("treasure_hunt.level_fail.desc", "", "level", _loc2_.requiredLevel, "level_paying", _loc2_.requiredLevelPaying);
        this._notifications.addItem(_loc3_, "treasure_hunt");
    };

    private onTreasureHuntFirstWinner = (param1: TreasureHuntFirstWinnerMessageEvent): void => {
        let _loc2_: TreasureHuntFirstWinnerMessageParser = param1.getParser();
        this._bufferedTreasureHuntWinnerInfo = _loc2_.winnerInfo;
        this.showTreasureHuntWinner();
    };

    private showTreasureHuntWinner(param1: boolean = false): void {
        let _loc5_: TreasureHuntWinnerInfo = this._bufferedTreasureHuntWinnerInfo;
        if (_loc5_ == null) {
            return;
        }
        let _loc3_: string = this._notifications.localization.getLocalizationWithParams("treasure_hunt.winner.desc", "", "user_name", _loc5_.userName, "hunt_name", this.getHuntName(_loc5_.huntId));
        let _loc4_: IAvatarImage = this._notifications.avatarRenderManager.createAvatarImage(_loc5_.userFigure, "h", _loc5_.userGender, param1 ? null : this);
        let _loc2_: BitmapData = null;
        if (_loc4_ != null && !_loc4_.isPlaceholder()) {
            _loc2_ = HabboFaceFocuser.focusUserFace(_loc4_, "head", 3, 1);
            _loc4_.dispose();
        }
        if (_loc4_ != null || param1) {
            this._notifications.addItemWithBitmap(_loc3_, "treasure_hunt", _loc2_);
        }
    }

    public avatarImageReady(param1: string): void {
        if (this._bufferedTreasureHuntWinnerInfo != null && this._bufferedTreasureHuntWinnerInfo.userFigure == param1) {
            this.showTreasureHuntWinner(true);
        }
    }

    private addMessageEvent(param1: IMessageEvent): void {
        this._messageEvents.push(this._communication.addHabboConnectionMessageEvent(param1));
    }

    public dispose(): void {
        if (this._messageEvents != null && this._communication != null) {
            for (const _loc1_ of this._messageEvents ?? []) {
                this._communication.removeHabboConnectionMessageEvent(_loc1_);
            }
        }
        this._messageEvents = null;
        this._notifications = null;
        this._communication = null;
    }

    private useNotificationFeed(): boolean {
        return this._notifications.getBoolean("notification.feed.enabled");
    }

    private useNotifications(): boolean {
        return this._notifications.getBoolean("notification.items.enabled");
    }

    public onMOTD = (param1: IMessageEvent): void => {
        let _loc4_: GenericNotificationItemData = null;
        let _loc5_: MOTDNotificationEvent = param1 instanceof MOTDNotificationEvent ? param1 : null;
        let _loc3_: MOTDNotificationParser = asInstanceOf(_loc5_.getParser(), MOTDNotificationParser);
        if (_loc3_.messages && _loc3_.messages.length > 0) {
            if (this.useNotifications()) {
                new MOTDNotification(_loc3_.messages, this._notifications.assetLibrary, this._notifications.windowManager);
            }
            if (this.useNotificationFeed()) {
                for (const _loc2_ of _loc3_.messages ?? []) {
                    _loc4_ = new GenericNotificationItemData();
                    _loc4_.title = stringOrNull(_loc2_);
                    _loc4_.timeStamp = getTimer();
                    this._notifications.feedController.addFeedItem(3, _loc4_);
                }
            }
        }
    };

    private onLevelUp = (param1: IMessageEvent): void => {
        let _loc4_: string = null;
        _loc4_ = "notification.new.achievement";
        let _loc2_: HabboAchievementNotificationMessageEvent = param1 instanceof HabboAchievementNotificationMessageEvent ? param1 : null;
        let _loc3_: HabboAchievementNotificationMessageParser = _loc2_.getParser();
        let _loc6_: string = this._notifications.localization.getBadgeName(_loc3_.data.badgeCode);
        this._notifications.localization.registerParameter("notification.new.achievement", "achievement_name", _loc6_);
        let _loc7_: string = this._notifications.localization.getLocalization("notification.new.achievement");
        let _loc5_: BitmapData = this._notifications.sessionDataManager.requestBadgeImage(_loc3_.data.badgeCode);
        this._notifications.singularController.addItem(_loc7_, "achievement", _loc5_, null, _loc3_.data.badgeCode, "questengine/achievements/" + _loc3_.data.category);
    };

    private onBadgeReceived = (param1: IMessageEvent): void => {
        let _loc5_: string = null;
        _loc5_ = "notification.new.badge";
        let _loc2_: BadgeReceivedEvent = param1 instanceof BadgeReceivedEvent ? param1 : null;
        let _loc3_: BadgeReceivedParser = _loc2_.getParser();
        let _loc4_: string = this._notifications.localization.getBadgeName(_loc3_.badgeCode);
        this._notifications.localization.registerParameter("notification.new.badge", "badge_name", _loc4_);
        let _loc7_: string = this._notifications.localization.getLocalization("notification.new.badge");
        let _loc6_: BitmapData = this._notifications.sessionDataManager.requestBadgeImage(_loc3_.badgeCode);
        this._notifications.singularController.addItem(_loc7_, "badge_received", _loc6_, null, _loc3_.badgeCode, "inventory/open/badges");
    };

    public onRespectNotification = (param1: IMessageEvent): void => {
        let _loc4_: ILocalization = null;
        let _loc2_: ILocalization = null;
        let _loc3_: RespectNotificationMessageEvent = param1 instanceof RespectNotificationMessageEvent ? param1 : null;
        if (this._notifications.sessionDataManager.userId == _loc3_.userId) {
            this._notifications.localization.registerParameter("notifications.text.respect.2", "count", String(_loc3_.respectTotal));
            _loc4_ = this._notifications.localization.getLocalizationRaw("notifications.text.respect.1");
            _loc2_ = this._notifications.localization.getLocalizationRaw("notifications.text.respect.2");
            if (_loc4_) {
                this._notifications.singularController.addItem(_loc4_.value, "respect", null);
            }
            if (_loc2_) {
                this._notifications.singularController.addItem(_loc2_.value, "respect", null);
            }
        }
    };

    private onRoomMessagesNotification = (param1: RoomMessageNotificationMessageEvent): void => {
        let _loc2_: ILocalization = null;
        let _loc3_: RoomMessageNotificationMessageParser = param1.getParser();
        let _loc5_: string = "roommessagesposted";
        this._notifications.localization.registerParameter("notifications.text.room.messages.posted", "room_name", _loc3_.roomName);
        this._notifications.localization.registerParameter("notifications.text.room.messages.posted", "messages_count", _loc3_.messageCount.toString());
        _loc2_ = this._notifications.localization.getLocalizationRaw("notifications.text.room.messages.posted");
        let _loc6_: BitmapDataAsset = asInstanceOf(this._notifications.assets.getAssetByName("if_icon_temp_png"), BitmapDataAsset);
        let _loc4_: BitmapData = asInstanceOf(_loc6_.content, BitmapData);
        if (_loc2_) {
            this._notifications.singularController.addItem(_loc2_.value, _loc5_, _loc4_.clone());
        }
    };

    private onRecyclerFinished = (param1: IMessageEvent): void => {
        let _loc3_: RecyclerFinishedMessageParser = (param1 instanceof RecyclerFinishedMessageEvent ? param1 : null).getParser();
        if (_loc3_ == null || _loc3_.recyclerFinishedStatus != 1) {
            return;
        }
        let _loc2_: ILocalization = this._notifications.localization.getLocalizationRaw("notifications.text.recycle.ok");
        if (_loc2_) {
            this._notifications.singularController.addItem(_loc2_.value, "recyclerok", null);
        }
        IncomingMessages._log.info("[HabboNotifications] recycle ok");
    };

    private onInfoFeedEnable = (param1: IMessageEvent): void => {
        let _loc2_: InfoFeedEnableMessageEvent = param1 instanceof InfoFeedEnableMessageEvent ? param1 : null;
        if (_loc2_ != null) {
            this._notifications.disabled = !_loc2_.enabled;
        }
    };

    private onModCautionEvent = (param1: IMessageEvent): void => {
        let _loc3_: GenericNotificationItemData = null;
        let _loc2_: ModerationCautionParser = (param1 instanceof ModeratorCautionEvent ? param1 : null).getParser();
        if (_loc2_ == null || this._notifications.singularController.alertDialogManager == null) {
            return;
        }
        if (this.useNotifications()) {
            this._notifications.singularController.alertDialogManager.handleModeratorCaution(_loc2_.message, _loc2_.url);
        }
        if (this.useNotificationFeed()) {
            _loc3_ = new GenericNotificationItemData();
            _loc3_.title = _loc2_.message;
            _loc3_.buttonAction = _loc2_.url;
            _loc3_.buttonCaption = _loc2_.url;
            _loc3_.timeStamp = getTimer();
            this._notifications.feedController.addFeedItem(3, _loc3_);
        }
    };

    private onModMessageEvent = (param1: IMessageEvent): void => {
        let _loc3_: GenericNotificationItemData = null;
        let _loc2_: ModeratorMessageParser = (param1 instanceof ModeratorMessageEvent ? param1 : null).getParser();
        if (_loc2_ == null || this._notifications.singularController.alertDialogManager == null) {
            return;
        }
        if (this.useNotifications()) {
            this._notifications.singularController.alertDialogManager.handleModeratorMessage(_loc2_.message, _loc2_.url);
        }
        if (this.useNotificationFeed()) {
            _loc3_ = new GenericNotificationItemData();
            _loc3_.title = _loc2_.message;
            _loc3_.buttonAction = _loc2_.url;
            _loc3_.buttonCaption = _loc2_.url;
            _loc3_.timeStamp = getTimer();
            this._notifications.feedController.addFeedItem(3, _loc3_);
        }
    };

    private onUserBannedMessageEvent = (param1: IMessageEvent): void => {
        let _loc2_: UserBannedMessageParser = (param1 instanceof UserBannedMessageEvent ? param1 : null).getParser();
        if (_loc2_ == null || this._notifications.singularController.alertDialogManager == null) {
            return;
        }
        this._notifications.singularController.alertDialogManager.handleUserBannedMessage(_loc2_.message);
    };

    private onBanInfoMessageEvent = (param1: IMessageEvent): void => {
        let _loc2_: BanInfoMessageParser = (param1 instanceof BanInfoMessageEvent ? param1 : null).getParser();
        if (_loc2_ == null || this._notifications.singularController.alertDialogManager == null) {
            return;
        }
        this._notifications.singularController.alertDialogManager.handleBanInfoMessage(_loc2_.reason, _loc2_.banExpirySeconds, _loc2_.localizedReason);
    };

    private onHotelClosing = (param1: IMessageEvent): void => {
        let _loc2_: InfoHotelClosingMessageParser = (param1 instanceof InfoHotelClosingMessageEvent ? param1 : null).getParser();
        if (_loc2_ == null || this._notifications.singularController.alertDialogManager == null) {
            return;
        }
        this._notifications.singularController.alertDialogManager.handleHotelClosingMessage(_loc2_.minutesUntilClosing);
    };

    private onHotelMaintenance = (param1: IMessageEvent): void => {
        let _loc2_: MaintenanceStatusMessageParser = (param1 instanceof MaintenanceStatusMessageEvent ? param1 : null).getParser();
        if (_loc2_ == null || this._notifications.singularController.alertDialogManager == null) {
            return;
        }
        this._notifications.singularController.alertDialogManager.handleHotelMaintenanceMessage(_loc2_.minutesUntilMaintenance, _loc2_.duration);
    };

    private onHotelClosed = (param1: IMessageEvent): void => {
        let _loc2_: InfoHotelClosedMessageParser = (param1 instanceof InfoHotelClosedMessageEvent ? param1 : null).getParser();
        if (_loc2_ == null || this._notifications.singularController.alertDialogManager == null) {
            return;
        }
        this._notifications.singularController.alertDialogManager.handleHotelClosedMessage(_loc2_.openHour, _loc2_.openMinute, _loc2_.userThrownOutAtClose);
    };

    private onLoginFailedHotelClosed = (param1: IMessageEvent): void => {
        let _loc2_: LoginFailedHotelClosedMessageParser = (param1 instanceof LoginFailedHotelClosedMessageEvent ? param1 : null).getParser();
        if (_loc2_ == null || this._notifications.singularController.alertDialogManager == null) {
            return;
        }
        this._notifications.singularController.alertDialogManager.handleLoginFailedHotelClosedMessage(_loc2_.openHour, _loc2_.openMinute);
    };

    private onRestoreClientMessageEvent = (param1: IMessageEvent): void => {
        HabboWebTools.closeWebPageAndRestoreClient();
    };

    private onPetLevelNotification = (param1: PetLevelNotificationEvent): void => {
        let _loc2_: PetFigureData = null;
        let _loc5_: BitmapData = null;
        if (param1 == null) {
            return;
        }
        let _loc4_: PetLevelNotificationParser = param1.getParser();
        this._notifications.localization.registerParameter("notifications.text.petlevel", "pet_name", _loc4_.petName);
        this._notifications.localization.registerParameter("notifications.text.petlevel", "level", _loc4_.level.toString());
        let _loc3_: ILocalization = this._notifications.localization.getLocalizationRaw("notifications.text.petlevel");
        if (_loc3_) {
            _loc2_ = _loc4_.figureData;
            _loc5_ = this._notifications.petImageUtility.getPetImage(_loc2_.typeId, _loc2_.paletteId, _loc2_.color);
            this._notifications.singularController.addItem(_loc3_.value, "petlevel", _loc5_);
        }
    };

    private onPetReceived = (param1: PetReceivedMessageEvent): void => {
        let _loc2_: ILocalization = null;
        let _loc4_: PetData = null;
        let _loc5_: BitmapData = null;
        if (param1 == null) {
            return;
        }
        let _loc3_: PetReceivedMessageParser = param1.getParser();
        if (_loc3_.boughtAsGift) {
            _loc2_ = this._notifications.localization.getLocalizationRaw("notifications.text.petbought");
        } else {
            _loc2_ = this._notifications.localization.getLocalizationRaw("notifications.text.petreceived");
        }
        if (_loc2_) {
            _loc4_ = _loc3_.pet;
            _loc5_ = this._notifications.petImageUtility.getPetImage(_loc4_.typeId, _loc4_.paletteId, _loc4_.color);
            this._notifications.singularController.addItem(_loc2_.value, "petlevel", _loc5_);
        }
    };

    private onRoomEnter = (param1: IMessageEvent): void => {
        this._notifications.singularController.showModerationDisclaimer();
    };

    private onBroadcastMessageEvent = (param1: IMessageEvent): void => {
        let _loc4_: HabboBroadcastMessageParser = (param1 instanceof HabboBroadcastMessageEvent ? param1 : null).getParser();
        let _loc2_: string = _loc4_.messageText;
        let _loc3_: RegExp = /\\r/g;
        _loc2_ = _loc2_.replace(_loc3_, "\r");
        this._notifications.windowManager.simpleAlert("${notifications.broadcast.title}", "", _loc2_, "", "", null, "illumina_alert_illustrations_frank_neutral_png");
    };

    private onNotificationDialogMessageEvent = (param1: NotificationDialogMessageEvent): void => {
        let _loc2_: NotificationDialogMessageParser = param1.getParser();
        if ("cfh.created" == _loc2_.type) {
            this.showCallCreatedNotification(stringOrNull(_loc2_.parameters["message"]), stringOrNull(_loc2_.parameters["linkUrl"]));
        } else {
            this._notifications.showNotification(_loc2_.type, _loc2_.parameters);
        }
    };

    private showCallCreatedNotification(param1: string, param2: string): void {
        let _loc3_: string = param1.replace(/\\r/g, "\r");
        if (param2 != null) {
            this._notifications.windowManager.simpleAlert("${help.cfh.sent.title}", "", _loc3_, "${help.main.faq.link.text}", param2, null, "illumina_alert_illustrations_frank_neutral_png");
        } else {
            this._notifications.windowManager.simpleAlert("${help.cfh.sent.title}", "", _loc3_, null, null, null, "illumina_alert_illustrations_frank_neutral_png");
        }
    }

    private onPetRespectFailed = (param1: IMessageEvent): void => {
        let _loc2_: PetRespectFailedParser = (param1 instanceof PetRespectFailedEvent ? param1 : null).getParser();
        this._notifications.localization.registerParameter("room.error.pets.respectfailed", "required_age", "" + _loc2_.requiredDays);
        this._notifications.localization.registerParameter("room.error.pets.respectfailed", "avatar_age", "" + _loc2_.avatarAgeInDays);
        this._notifications.windowManager.alert("${error.title}", "${room.error.pets.respectfailed}", 0, this.onAlert);
    };

    public onAlert = (param1: IAlertDialog, param2: WindowEvent): void => {
        if (param2.type == "WE_OK" || param2.type == "WE_CANCEL") {
            param1.dispose();
        }
    };

    private onClubGiftNotification = (param1: ClubGiftNotificationEvent): void => {
        if (!param1) {
            return;
        }
        let _loc2_: ClubGiftNotificationParser = param1.getParser();
        if (!_loc2_) {
            return;
        }
        if (_loc2_.numGifts < 1) {
            return;
        }
        this._notifications.singularController.showClubGiftNotification(_loc2_.numGifts);
    };

    private onUserObject = (param1: UserObjectEvent): void => {
        let _loc2_: UserObjectMessageParser = param1.getParser();
        if (_loc2_.accountSafetyLocked) {
            this._notifications.singularController.showSafetyLockedNotification(_loc2_.id);
        }
    };

    private onAccountSafetyLockStatusChanged = (param1: AccountSafetyLockStatusChangeMessageEvent): void => {
        let _loc2_: AccountSafetyLockStatusChangeMessageParser = param1.getParser();
        if (_loc2_.status == 1) {
            this._notifications.singularController.hideSafetyLockedNotification();
        }
    };

    private onClubGiftSelected = (param1: ClubGiftSelectedEvent): void => {
        if (!param1 || !this._notifications.localization) {
            return;
        }
        let _loc3_: ClubGiftSelectedParser = param1.getParser();
        if (!_loc3_) {
            return;
        }
        let _loc6_: any[] = _loc3_.products;
        if (!_loc6_ || _loc6_.length == 0) {
            return;
        }
        let _loc2_: CatalogPageMessageProductData = asInstanceOf(_loc6_[0], CatalogPageMessageProductData);
        if (!_loc2_) {
            return;
        }
        let _loc5_: string = this._notifications.localization.getLocalization("notifications.text.club_gift.received");
        let _loc4_: BitmapData = this._notifications.productImageUtility.getProductImage(_loc2_.productType, _loc2_.furniClassId, _loc2_.extraParam);
        this._notifications.singularController.addItem(_loc5_, "info", _loc4_);
    };

    private onActivityPointNotification = (param1: HabboActivityPointNotificationMessageEvent): void => {
        let _loc3_: string = null;
        let _loc2_: BitmapData = null;
        if (param1.change <= 0) {
            return;
        }
        switch (param1.type - 5) {
            case 0:
                _loc3_ = this._notifications.localization.getLocalizationWithParams("notifications.text.loyalty.received", "", "amount", param1.change);
                _loc2_ = asInstanceOf(this._notifications.assets.getAssetByName("if_icon_diamond_png").content, BitmapData);
                this._notifications.singularController.addItem(_loc3_, "info", _loc2_.clone());
                return;
            default:
                return;
        }
    };

    private onNftEmeraldConvertResult = (param1: IMessageEvent): void => {
        let _loc2_: NftEmeraldConvertResultMessageEvent = param1 instanceof NftEmeraldConvertResultMessageEvent ? param1 : null;
        let _loc3_: NftEmeraldConvertResultMessageParser = _loc2_.getParser();
        if (_loc2_ == null || _loc3_ == null) {
            return;
        }
        if (_loc3_.result == 0) {
            return;
        }
        if (_loc3_.result == 5) {
            this._notifications.addItem(this._notifications.localization.getLocalization("notification.nft.emerald_convert.not_in_collector", "To convert this Emerald furni, it needs to be in your Collector Wallet"), "info");
            return;
        }
        this._notifications.addItem(this._notifications.localization.getLocalization("notification.nft.emerald_convert_failed"), "info");
    };

    private onChatStyleNotification = (param1: UserPurchasableChatStyleChangedMessageEvent): void => {
        let _loc2_: UserPurchasableChatStyleChangedMessageParser = param1.getParser();
        let _loc4_: string = this._notifications.localization.getLocalization(_loc2_.added ? "notification.chatstyles.added" : "notification.chatstyles.removed");
        let _loc3_: BitmapData = this._notifications.freeFlowChat.chatStyleLibrary.getStyle(_loc2_.styleId).selectorPreview.clone();
        this._notifications.addItemWithBitmap(_loc4_, "info", _loc3_);
    };

    private onWiredTradeTransactionNotification = (param1: WiredTradeTransactionNotificationMessageEvent): void => {
        let _loc2_: WiredTradeTransactionNotificationMessageParser = param1.getParser();
        let _loc3_: string = this._notifications.localization.getLocalizationWithParams("wired_transactions.notification.trade_error", "", "error", this._notifications.localization.getLocalization("wired_transactions.notification.trade_error." + _loc2_.tradeTransactionNotificationId));
        this._notifications.addItem(_loc3_, "info", "chests_icon_trading_error");
    };

    private onWiredTransactionSuccess = (param1: WiredTransactionSuccessMessageEvent): void => {
        let _loc2_: WiredTransactionSuccessMessageParser = param1.getParser();
        let _loc3_: WiredTransactionSuccessContents = _loc2_.contents;
        let _loc4_: string = "wired_transactions.notification.success." + _loc3_.transactionSuccessTypeId;
        if (_loc3_.rewardContents != null && !_loc3_.openByDefault) {
            _loc4_ += ".click_to_popup";
        }
        let _loc6_: string = null;
        if (_loc3_.rewardContents != null) {
            _loc6_ = "wiredrewards/open/" + _loc3_.internalId;
        }
        let _loc5_: string = this._notifications.localization.getLocalizationWithParams(_loc4_, this._notifications.localization.getLocalization("wired_transactions.notification.success"));
        this._notifications.addItem(_loc5_, "info", "chests_icon_successful", _loc6_);
    };

    private onWiredTransactionFail = (param1: WiredTransactionFailMessageEvent): void => {
        let _loc2_: WiredTransactionFailMessageParser = param1.getParser();
        let _loc3_: string = this._notifications.localization.getLocalizationWithParams("wired_transactions.notification.fail", "", "reason", this._notifications.localization.getLocalization("wired_transactions.notification.fail." + _loc2_.transactionFailureTypeId));
        this._notifications.addItem(_loc3_, "info", "chests_icon_rejected");
    };

    private onClaimProductResult = (param1: ClaimProductResultMessageEvent): void => {
        let _loc3_: ClaimProductResultParser = param1.getParser();
        let _loc2_: string = this._notifications.localization.getLocalization("claim_product.name." + _loc3_.claimId, _loc3_.claimId);
        let _loc4_: string = this._notifications.localization.getLocalizationWithParams("claim_product.result." + _loc3_.result, "", "claim_name", _loc2_);
        this._notifications.addItem(_loc4_, "info");
    };

    public get disposed(): boolean {
        return false;
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (IncomingMessages.#staticsReady) return;
        IncomingMessages.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(IncomingMessages, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.habbo.notifications.IncomingMessages"));
    }

    get [IDisposable](): true {
        return true;
    }
}
