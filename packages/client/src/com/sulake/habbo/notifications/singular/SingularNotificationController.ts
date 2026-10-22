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
import { ClubGiftNotification } from '@/com/sulake/habbo/notifications/singular/ClubGiftNotification';
import { HabboAlertDialogManager } from '@/com/sulake/habbo/notifications/singular/HabboAlertDialogManager';
import { HabboNotificationItem } from '@/com/sulake/habbo/notifications/singular/HabboNotificationItem';
import { HabboNotificationItemStyle } from '@/com/sulake/habbo/notifications/singular/HabboNotificationItemStyle';
import { HabboNotificationViewManager } from '@/com/sulake/habbo/notifications/singular/HabboNotificationViewManager';
import { NewFeatureNotification } from '@/com/sulake/habbo/notifications/singular/NewFeatureNotification';
import { SafetyLockedNotification } from '@/com/sulake/habbo/notifications/singular/SafetyLockedNotification';
import { RoomEnterEffect } from '@/com/sulake/room/utils/RoomEnterEffect';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class SingularNotificationController implements IUpdateReceiver {
    static { registerClassName(this, 'com.sulake.habbo.notifications.singular::SingularNotificationController'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        SingularNotificationController.#initStatics();
        return SingularNotificationController._log;
    }

    private static readonly MODERATION_DISCLAIMER_DELAY_MS: number = 5000;

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

    public addItem(param1: string, param2: string, param3: BitmapData, param4: string = null, param5: string = null, param6: string = null, param7: any[] = null): number {
        if (this._notifications.disabled) {
            return 0;
        }
        let _loc9_: UtilsMap = this._SafeStr_3988["styles"];
        if (_loc9_ == null) {
            return 0;
        }
        let _loc11_: UtilsMap = _loc9_[param2];
        if (_loc11_ == null) {
            return 0;
        }
        let _loc10_: HabboNotificationItemStyle = new HabboNotificationItemStyle(_loc11_, param3, param4, true, param5, param7 == null ? [] : param7, param2);
        if (param6) {
            _loc10_.internalLink = param6;
        }
        let _loc8_: HabboNotificationItem = new HabboNotificationItem(param1, _loc10_, this);
        this._SafeStr_4303.push(_loc8_);
        return this._SafeStr_4303.length | 0;
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
            SingularNotificationController._log.info("DISPLAYED MOD INFO: " + _loc1_);
        }
    }

    public showClubGiftNotification(param1: number): void {
        if (this._SafeStr_3323 && (this._SafeStr_3323.visible || this._SafeStr_3323.isCancelled)) {
            return;
        }
        this._SafeStr_3323 = new ClubGiftNotification(param1, this._notifications.assets, this._notifications.windowManager, this._notifications.catalog, this._notifications.toolBar);
    }

    public maybeShowNewFeatureNotification = (): void => {
        this._SafeStr_4057 = [];
        let _loc1_: any[] = this._notifications.getProperty("notifications.new_feature.active").split(",");
        for (const _loc2_ of _loc1_ ?? []) {
            if (_loc2_.length != 0) {
                this._SafeStr_4057.push(new NewFeatureNotification(this._notifications.assets, this._notifications.windowManager, this._notifications.toolBar, this._notifications.localization, this._notifications, stringOrNull(_loc2_)));
            }
        }
    };

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

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (SingularNotificationController.#staticsReady) return;
        SingularNotificationController.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(SingularNotificationController, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.habbo.notifications.singular.SingularNotificationController"));
    }

    get [IUpdateReceiver](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
