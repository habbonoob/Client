import { asGuarded, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { ModeratorUserInfoData } from '@/com/sulake/habbo/communication/messages/incoming/moderation/ModeratorUserInfoData';
import type { IssueMessageData } from '@/com/sulake/habbo/communication/messages/parser/moderation/IssueMessageData';
import type { IssueHandler } from '@/com/sulake/habbo/moderation/IssueHandler';
import type { IUserInfoListener } from '@/com/sulake/habbo/moderation/IUserInfoListener';
import type { ModerationManager } from '@/com/sulake/habbo/moderation/ModerationManager';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { GetModeratorUserInfoMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/moderator/GetModeratorUserInfoMessageComposer';
import { GetUserChatlogMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/moderator/GetUserChatlogMessageComposer';
import { ChatlogCtrl, RoomVisitsCtrl } from '@/com/sulake/habbo/moderation/ChatlogCtrl.group';
import { ModActionCtrl } from '@/com/sulake/habbo/moderation/ModActionCtrl';
import { SendMsgsCtrl } from '@/com/sulake/habbo/moderation/SendMsgsCtrl';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class UserInfoCtrl implements IDisposable, IUserInfoListener {
    static { registerClassName(this, 'com.sulake.habbo.moderation::UserInfoCtrl'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        UserInfoCtrl.#initStatics();
        return UserInfoCtrl._log;
    }

    private static readonly secsInMinute: number = 60;
    private static readonly secsInHour: number = 3600;
    private static readonly secsInDay: number = 86400;
    private static readonly secsInYear: number = 31536000;

    public static formatTime(param1: number): string {
        if (param1 < 2 * 60) {
            return param1 + " secs ago";
        }
        if (param1 < 2 * 3600) {
            return Math.round(param1 / 60) + " mins ago";
        }
        if (param1 < 2 * 86400) {
            return Math.round(param1 / 3600) + " hours ago";
        }
        if (param1 < 2 * 31536000) {
            return Math.round(param1 / 86400) + " days ago";
        }
        return Math.round(param1 / 31536000) + " years ago";
    }

    constructor(param1: IFrameWindow, param2: ModerationManager, param3: IssueMessageData, param4: IssueHandler = null, param5: boolean = false) {
        this._callerFrame = param1;
        this._main = param2;
        this._SafeStr_4861 = param3;
        this._openToolsBelow = param5;
        this._SafeStr_3535 = param4;
    }

    declare private _callerFrame: IFrameWindow;

    declare private _main: ModerationManager;

    declare private _userId: number;
    static { (this.prototype as any)._userId = 0; }

    declare private _SafeStr_4861: IssueMessageData;

    declare private _data: ModeratorUserInfoData;

    declare private _SafeStr_4154: IWindowContainer;

    declare private _openToolsBelow: boolean;
    static { (this.prototype as any)._openToolsBelow = false; }

    declare private _SafeStr_3535: IssueHandler;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    public get disposed(): boolean {
        return this._disposed;
    }

    public load(param1: IWindowContainer, param2: number): void {
        this._SafeStr_4154 = param1;
        this._userId = param2;
        this._data = null;
        this.refresh();
        this._main.messageHandler.addUserInfoListener(this);
        this._main.connection.send(new GetModeratorUserInfoMessageComposer(param2));
    }

    public onUserInfo(param1: ModeratorUserInfoData): void {
        if (param1.userId != this._userId) {
            return;
        }
        this._data = param1;
        this.refresh();
    }

    public refresh(): void {
        if (this._SafeStr_4154.disposed) {
            return;
        }
        let _loc1_: IWindowContainer = this.prepare();
        if (this._data == null) {
            _loc1_.findChildByName("fields").visible = false;
            _loc1_.findChildByName("loading_txt").visible = true;
            return;
        }
        _loc1_.findChildByName("fields").visible = true;
        _loc1_.findChildByName("loading_txt").visible = false;
        this.setTxt(_loc1_, "name_txt", this._data.userName);
        this.setTxt(_loc1_, "registered_txt", UserInfoCtrl.formatTime(this._data.registrationAgeInMinutes * 60));
        this.setTxt(_loc1_, "cfh_count_txt", "" + this._data.cfhCount);
        this.setAlertTxt(_loc1_, "abusive_cfh_count_txt", this._data.abusiveCfhCount);
        this.setAlertTxt(_loc1_, "caution_count_txt", this._data.cautionCount);
        this.setAlertTxt(_loc1_, "ban_count_txt", this._data.banCount);
        this.setAlertTxt(_loc1_, "trading_lock_count_txt", this._data.tradingLockCount);
        this.setTxt(_loc1_, "trading_lock_expiry_txt", this._data.tradingExpiryDate, "No active lock");
        this.setTxt(_loc1_, "last_login_txt", UserInfoCtrl.formatTime(this._data.minutesSinceLastLogin * 60));
        this.setTxt(_loc1_, "online_txt", this._data.online ? "Yes" : "No");
        this.setTxt(_loc1_, "last_purchase_txt", this._data.lastPurchaseDate, "No purchases");
        this.setTxt(_loc1_, "email_address_txt", this._data.primaryEmailAddress, "No email found");
        this.setTxt(_loc1_, "id_bans_txt", "" + this._data.identityRelatedBanCount);
        this.setTxt(_loc1_, "user_class_txt", this._data.userClassification, "-");
        this.setTxt(_loc1_, "last_sanction_time_txt", this._data.lastSanctionTime);
        if (this._data.sanctionAgeHours <= 48) {
            (asGuarded(_loc1_.findChildByName("last_sanction_time_txt"), isITextWindow)).textColor = (255 * (48 - this._data.sanctionAgeHours) / 48 << 16) >>> 0;
        }
        if (this._data.primaryEmailAddress == "No identity") {
            _loc1_.findChildByName("modaction_but").disable();
        }
        UserInfoCtrl._log.info("USER: " + this._data.userName + ", " + this._data.banCount + ", " + this._data.cautionCount);
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._disposed = true;
        this._main.messageHandler.removeUserInfoListener(this);
        this._callerFrame = null;
        this._main = null;
        this._data = null;
        this._SafeStr_4154 = null;
    }

    public logEvent(param1: string, param2: string): void {
        if (this._main != null) {
            this._main.logEvent(param1, param2);
        }
    }

    public trackAction(param1: string): void {
        if (this._SafeStr_3535 == null || this._SafeStr_3535.disposed) {
            this._main.trackGoogle("userInfo_" + param1);
        } else if (this == this._SafeStr_3535.callerUserInfo) {
            this._SafeStr_3535.trackAction("callerUserInfo_" + param1);
        } else if (this == this._SafeStr_3535.reportedUserInfo) {
            this._SafeStr_3535.trackAction("reportedUserInfo_" + param1);
        } else {
            this._SafeStr_3535.trackAction("userInfo_" + param1);
        }
    }

    private prepare(): IWindowContainer {
        let _loc1_: IWindowContainer = castGuarded(this._SafeStr_4154.findChildByName("user_info"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        if (_loc1_ == null) {
            _loc1_ = castGuarded(this._main.getXmlWindow("user_info"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
            this._SafeStr_4154.addChild(_loc1_);
            this._main.initMsg.chatlogsPermission ? null : _loc1_.findChildByName("chatlog_but").disable();
            this._main.initMsg.alertPermission ? null : _loc1_.findChildByName("message_but").disable();
            this._main.initMsg.alertPermission || this._main.initMsg.kickPermission || this._main.initMsg.banPermission ? null : _loc1_.findChildByName("modaction_but").disable();
        }
        _loc1_.findChildByName("chatlog_but").procedure = this.onChatlogButton;
        _loc1_.findChildByName("roomvisits_but").procedure = this.onRoomVisitsButton;
        _loc1_.findChildByName("habboinfotool_but").procedure = this.onHabboInfoToolButton;
        _loc1_.findChildByName("message_but").procedure = this.onMessageButton;
        _loc1_.findChildByName("modaction_but").procedure = this.onModActionButton;
        _loc1_.findChildByName("view_caution_count_txt").procedure = this.onViewCautions;
        _loc1_.findChildByName("view_ban_count_txt").procedure = this.onViewBans;
        _loc1_.findChildByName("view_trading_lock_count_txt").procedure = this.onViewTradingLocks;
        _loc1_.findChildByName("view_id_bans_txt").procedure = this.onViewIDBans;
        return _loc1_;
    }

    private setAlertTxt(param1: IWindowContainer, param2: string, param3: number): void {
        let _loc5_: IWindow = param1.findChildByName(param2);
        let _loc4_: IWindow = param1.findChildByName("view_" + param2);
        if (_loc4_ != null) {
            _loc4_.visible = param3 > 0;
        }
        _loc5_.caption = "" + param3;
    }

    private setTxt(param1: IWindowContainer, param2: string, param3: string, param4: string = ""): void {
        let _loc5_: IWindow = castGuarded(param1.findChildByName(param2), isITextWindow, "com.sulake.core.window.components.ITextWindow");
        if (!param3 || param3.length == 0) {
            _loc5_.caption = param4;
        } else {
            _loc5_.caption = param3;
        }
    }

    private onChatlogButton = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        this.trackAction("chatLog");
        this._main.windowTracker.show(new ChatlogCtrl(new GetUserChatlogMessageComposer(this._data.userId), this._main, 5, this._data.userId), this._callerFrame, this._openToolsBelow, false, true);
    };

    private onRoomVisitsButton = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        this._main.windowTracker.show(new RoomVisitsCtrl(this._main, this._data.userId), this._callerFrame, this._openToolsBelow, false, true);
    };

    private onHabboInfoToolButton = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        this.trackAction("openInfoTool");
        this._main.openHkPage("habboinfotool.url", this._data.userName);
    };

    private onMessageButton = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        this.trackAction("openSendMessage");
        this._main.windowTracker.show(new SendMsgsCtrl(this._main, this._data.userId, this._data.userName, this._SafeStr_4861), this._callerFrame, this._openToolsBelow, false, true);
    };

    private onModActionButton = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        this.trackAction("openModAction");
        this._main.windowTracker.show(new ModActionCtrl(this._main, this._data.userId, this._data.userName, this._SafeStr_4861, this), this._callerFrame, this._openToolsBelow, false, true);
    };

    private onViewCautions = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        this.trackAction("viewCautions");
        this.showModeratorLog();
    };

    private onViewBans = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        this.trackAction("viewBans");
        this.showModeratorLog();
    };

    private onViewTradingLocks = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        this.trackAction("viewTradingLocks");
        this.showModeratorLog();
    };

    private onViewIDBans = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        this.trackAction("viewIdentityInfo");
        this.showIdentityInformation();
    };

    private showModeratorLog(): void {
        this._main.openHkPage("moderatoractionlog.url", this._data.userName);
    }

    private showIdentityInformation(): void {
        this._main.openHkPage("identityinformationtool.url", "" + this._data.identityId);
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (UserInfoCtrl.#staticsReady) return;
        UserInfoCtrl.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(UserInfoCtrl, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.habbo.moderation.UserInfoCtrl"));
    }

    get [IDisposable](): true {
        return true;
    }
}
