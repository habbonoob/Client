import { asInstanceOf, castTo, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { ILocalization } from '@/com/sulake/core/localization/ILocalization';
import type { HabboNotifications } from '@/com/sulake/habbo/notifications/HabboNotifications';
import type { BadgeImageReadyEvent } from '@/com/sulake/habbo/session/events/BadgeImageReadyEvent';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { setTimeout } from '@habbo-pixi/runtime/utils/setTimeout';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { IUpdateReceiver } from '@/com/sulake/core/runtime/IUpdateReceiver';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { XMLVariableParser } from '@/com/sulake/core/utils/XMLVariableParser';
import { Logger } from '@/com/sulake/habbo/Logger';
import { ClubGiftNotification } from '@/com/sulake/habbo/notifications/singular/ClubGiftNotification';
import { HabboAlertDialogManager } from '@/com/sulake/habbo/notifications/singular/HabboAlertDialogManager';
import { HabboNotificationItem } from '@/com/sulake/habbo/notifications/singular/HabboNotificationItem';
import { HabboNotificationItemStyle } from '@/com/sulake/habbo/notifications/singular/HabboNotificationItemStyle';
import { HabboNotificationViewManager } from '@/com/sulake/habbo/notifications/singular/HabboNotificationViewManager';
import { NewFeatureNotification } from '@/com/sulake/habbo/notifications/singular/NewFeatureNotification';
import { SafetyLockedNotification } from '@/com/sulake/habbo/notifications/singular/SafetyLockedNotification';
import { RoomEnterEffect } from '@/com/sulake/room/utils/RoomEnterEffect';

export class SingularNotificationController implements IUpdateReceiver {
    static { registerClassName(this, 'com.sulake.habbo.notifications.singular::SingularNotificationController'); }

    private static readonly MODERATION_DISCLAIMER_DELAY_MS: number = 5000;
    private static readonly NEW_FEATURE_CONDITION_RETRY_DELAY_MS: number = 2000;
    private static readonly NEW_FEATURE_CONDITION_MAX_RETRIES: number = 3;
    private static readonly NEW_FEATURE_CONDITION_REWARD_TRACK_INCOMPLETE: string = "reward_track_incomplete";
    private static readonly NEW_FEATURE_CONDITION_STATE_UNAVAILABLE: number = -1;
    private static readonly NEW_FEATURE_CONDITION_STATE_HIDDEN: number = 0;
    private static readonly NEW_FEATURE_CONDITION_STATE_VISIBLE: number = 1;

    declare private _notifications: HabboNotifications;

    declare private _SafeStr_4303: any[];

    declare private _SafeStr_3988: UtilsMap;

    declare private _SafeStr_3219: HabboNotificationViewManager;

    declare private _alertDialogManager: HabboAlertDialogManager;

    declare private _SafeStr_6515: boolean;
    static { (this.prototype as any)._SafeStr_6515 = false; }

    declare private _SafeStr_3323: ClubGiftNotification;

    declare private _SafeStr_4057: NewFeatureNotification[];

    declare private _SafeStr_3130: SafetyLockedNotification;

    declare private _SafeStr_7426: Map<any, any>;

    declare private _SafeStr_2963: Timer;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    constructor(param1: HabboNotifications) {
        let _loc5_: number = 0;
        let _loc7_: UtilsMap = null;
        let _loc3_: BitmapDataAsset = null;
        let _loc4_: BitmapData = null;
        this._notifications = param1;
        this._SafeStr_4303 = [];
        this._SafeStr_3988 = new UtilsMap();
        this._SafeStr_7426 = new Dictionary();
        this._alertDialogManager = new HabboAlertDialogManager(this._notifications.windowManager, this._notifications.localization, this._notifications.habboHelp);
        let _loc8_: IAsset = this._notifications.assetLibrary.getAssetByName("habbo_notifications_config_xml");
        let _loc2_: XmlAsset = castTo(_loc8_, XmlAsset);
        if (_loc2_ != null) {
            XMLVariableParser.parseVariableList(XML.from(_loc2_.content).children(), this._SafeStr_3988);
        }
        let _loc6_: UtilsMap = this._SafeStr_3988["styles"];
        if (_loc6_ != null) {
            _loc5_ = 0;
            while (_loc5_ < _loc6_.length) {
                _loc7_ = _loc6_.getWithIndex(_loc5_);
                if (_loc7_["icon"] != null) {
                    _loc3_ = asInstanceOf(this._notifications.assetLibrary.getAssetByName(stringOrNull(_loc7_["icon"])), BitmapDataAsset);
                    _loc4_ = asInstanceOf(_loc3_.content, BitmapData);
                    _loc7_["icon"] = _loc4_;
                }
                _loc5_++;
            }
        }
        this._SafeStr_3219 = new HabboNotificationViewManager(this._notifications, this._notifications.assetLibrary, this._notifications.windowManager, this._notifications.toolBar, this._SafeStr_3988["styles"], this._SafeStr_3988);
        this._notifications.sessionDataManager.events.addEventListener("BIRE_BADGE_IMAGE_READY", this.onBadgeImage);
        this._notifications.registerUpdateReceiver(this, 2);
        setTimeout(this.maybeShowNewFeatureNotification, 2000);
    }

    public get alertDialogManager(): HabboAlertDialogManager {
        return this._alertDialogManager;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public dispose(): void {
        if (this._SafeStr_2963) {
            this._SafeStr_2963.removeEventListener("timerComplete", this.onShowModerationDisclaimer);
            this._SafeStr_2963 = null;
        }
        if (this._SafeStr_3219 != null) {
            this._SafeStr_3219.dispose();
            this._SafeStr_3219 = null;
        }
        if (this._alertDialogManager != null) {
            this._alertDialogManager.dispose();
            this._alertDialogManager = null;
        }
        if (this._SafeStr_3323 != null) {
            this._SafeStr_3323.dispose();
            this._SafeStr_3323 = null;
        }
        if (this._SafeStr_4057 != null) {
            for (const _loc1_ of this._SafeStr_4057 ?? []) {
                _loc1_.dispose();
            }
            this._SafeStr_4057 = null;
        }
        if (this._SafeStr_3130 != null) {
            this._SafeStr_3130.dispose();
            this._SafeStr_3130 = null;
        }
        if (this._notifications != null) {
            this._notifications.removeUpdateReceiver(this);
            this._notifications = null;
        }
        this._disposed = true;
    }

    public update(param1: number): void {
        let _loc2_: HabboNotificationItem = null;
        if (this._SafeStr_4303.length > 0 && this._SafeStr_3219.isSpaceAvailable()) {
            _loc2_ = this.getNextItemFromQueue();
            if (!this._SafeStr_3219.showItem(_loc2_)) {
                _loc2_.dispose();
            }
        }
    }

    public addItem(param1: string, param2: string, param3: BitmapData, param4: string = null, param5: string = null, param6: string = null, param7: any = null): number {
        if (this._notifications.disabled) {
            return 0;
        }
        let _loc9_: UtilsMap = this._SafeStr_3988["styles"];
        if (_loc9_ == null) {
            return 0;
        }
        let _loc12_: UtilsMap = _loc9_[param2];
        if (_loc12_ == null) {
            return 0;
        }
        let _loc10_: string = stringOrNull(param7 != null ? param7["id"] : null);
        if (_loc10_ != null && this.hasNotificationById(_loc10_)) {
            return this._SafeStr_4303.length | 0;
        }
        let _loc11_: HabboNotificationItemStyle = new HabboNotificationItemStyle(_loc12_, param3, param4, true, param5, param7 == null ? {} : param7, param2);
        if (param6) {
            _loc11_.internalLink = param6;
        }
        let _loc8_: HabboNotificationItem = new HabboNotificationItem(param1, _loc11_, this);
        this._SafeStr_4303.push(_loc8_);
        return this._SafeStr_4303.length | 0;
    }

    public removeNotificationById(param1: string): void {
        let _loc3_: number = 0;
        let _loc2_: HabboNotificationItem = null;
        if (param1 == null) {
            return;
        }
        _loc3_ = 0;
        while (_loc3_ < this._SafeStr_4303.length) {
            _loc2_ = asInstanceOf(this._SafeStr_4303[_loc3_], HabboNotificationItem);
            if (_loc2_ != null && _loc2_.notificationId == param1) {
                _loc2_.dispose();
                this._SafeStr_4303.splice(_loc3_, 1);
                _loc3_--;
            }
            _loc3_++;
        }
        this._SafeStr_3219.removeNotificationById(param1);
    }

    private hasNotificationById(param1: string): boolean {
        if (param1 == null) {
            return false;
        }
        for (const _loc2_ of this._SafeStr_4303 ?? []) {
            if (_loc2_.notificationId == param1) {
                return true;
            }
        }
        return this._SafeStr_3219 != null && this._SafeStr_3219.hasNotificationId(param1);
    }

    private getNextItemFromQueue(): HabboNotificationItem {
        let _loc1_: any[] = this._SafeStr_4303.splice(0, 1);
        return asInstanceOf(_loc1_[0], HabboNotificationItem);
    }

    public addSongPlayingNotification(param1: string, param2: string): void {
        this._notifications.localization.registerParameter("soundmachine.notification.playing", "songname", param1);
        this._notifications.localization.registerParameter("soundmachine.notification.playing", "songauthor", param2);
        let _loc3_: ILocalization = this._notifications.localization.getLocalizationRaw("soundmachine.notification.playing");
        if (_loc3_) {
            this.addItem(_loc3_.value, "soundmachine", null);
        }
    }

    public onInternalLink(param1: string): void {
        this._notifications.createLinkEvent(param1);
    }

    private onShowModerationDisclaimer = (param1: TimerEvent): void => {
        this._SafeStr_2963.removeEventListener("timerComplete", this.onShowModerationDisclaimer);
        this._SafeStr_2963 = null;
        this.showModerationDisclaimer();
    };

    public showModerationDisclaimer(): void {
        let _loc1_: string = null;
        if (RoomEnterEffect.isRunning()) {
            if (this._SafeStr_2963 == null) {
                this._SafeStr_2963 = new Timer(RoomEnterEffect.totalRunningTime + 5000, 1);
                this._SafeStr_2963.addEventListener("timerComplete", this.onShowModerationDisclaimer);
                this._SafeStr_2963.start();
            }
        } else if (!this._SafeStr_6515) {
            _loc1_ = this._notifications.localization.getLocalization("mod.chatdisclaimer", "NA");
            this.addItem(_loc1_, "info", null);
            this._SafeStr_6515 = true;
            Logger.log("DISPLAYED MOD INFO: " + _loc1_);
        }
    }

    public showClubGiftNotification(param1: number): void {
        if (this._SafeStr_3323 && (this._SafeStr_3323.visible || this._SafeStr_3323.isCancelled)) {
            return;
        }
        this._SafeStr_3323 = new ClubGiftNotification(param1, this._notifications.assets, this._notifications.windowManager, this._notifications.catalog, this._notifications.toolBar);
    }

    public maybeShowNewFeatureNotification = (param1: number = 0): void => {
        if (this._disposed) {
            return;
        }
        this._SafeStr_4057 = [];
        let _loc2_: any[] = this._notifications.getProperty("notifications.new_feature.active").split(",");
        for (const _loc3_ of _loc2_ ?? []) {
            if (_loc3_.length != 0) {
                this.maybeShowNewFeatureNotificationByKey(stringOrNull(_loc3_), param1);
            }
        }
    };

    private maybeShowNewFeatureNotificationByKey = (param1: string, param2: number): void => {
        if (this._disposed) {
            return;
        }
        let _loc3_: number = this.getNewFeatureConditionState(param1);
        if (_loc3_ == 0) {
            return;
        }
        if (_loc3_ == -1) {
            if (param2 < 3) {
                setTimeout(this.maybeShowNewFeatureNotificationByKey, 2000, param1, param2 + 1);
            }
            return;
        }
        this._SafeStr_4057.push(new NewFeatureNotification(this._notifications.assets, this._notifications.windowManager, this._notifications.toolBar, this._notifications.localization, this._notifications, param1));
    };

    private getNewFeatureConditionState(param1: string): number {
        let _loc2_: string = this._notifications.getProperty("notifications.new_feature.condition." + param1);
        if (_loc2_ == null || _loc2_.length == 0) {
            return 1;
        }
        let _loc3_: any[] = _loc2_.split(":");
        if (_loc3_.length < 2) {
            return 1;
        }
        if (_loc3_[0] == "reward_track_incomplete") {
            if (this._notifications.rewardTrack == null || !this._notifications.rewardTrack.hasRewardTrack(stringOrNull(_loc3_[1]))) {
                return -1;
            }
            return this._notifications.rewardTrack.isRewardTrackComplete(stringOrNull(_loc3_[1])) ? 0 : 1;
        }
        return 1;
    }

    public showSafetyLockedNotification(param1: number): void {
        if (this._SafeStr_3130 && this._SafeStr_3130.visible) {
            return;
        }
        this._SafeStr_3130 = new SafetyLockedNotification(param1, this._notifications.assets, this._notifications.windowManager, this._notifications.catalog, this._notifications.toolBar);
    }

    public hideSafetyLockedNotification(): void {
        if (!this._SafeStr_3130) {
            return;
        }
        this._SafeStr_3130.dispose();
    }

    private onBadgeImage = (param1: BadgeImageReadyEvent): void => {
        if (param1 != null && this._SafeStr_3219 != null) {
            this._SafeStr_3219.replaceIcon(param1);
        }
    };

    get [IUpdateReceiver](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
