import { asGuarded, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IDropMenuWindow } from '@/com/sulake/core/window/components/IDropMenuWindow';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { ITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IAlertDialog } from '@/com/sulake/core/window/utils/IAlertDialog';
import type { IssueMessageData } from '@/com/sulake/habbo/communication/messages/parser/moderation/IssueMessageData';
import type { ModerationManager } from '@/com/sulake/habbo/moderation/ModerationManager';
import type { UserInfoCtrl } from '@/com/sulake/habbo/moderation/UserInfoCtrl';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { isIDropMenuWindow } from '@/com/sulake/core/window/components/IDropMenuWindow';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { DefaultSanctionMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/moderator/DefaultSanctionMessageComposer';
import { ModAlertMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/moderator/ModAlertMessageComposer';
import { ModBanMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/moderator/ModBanMessageComposer';
import { ModKickMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/moderator/ModKickMessageComposer';
import { ModMessageMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/moderator/ModMessageMessageComposer';
import { ModMuteMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/moderator/ModMuteMessageComposer';
import { ModTradingLockMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/moderator/ModTradingLockMessageComposer';
import { ITrackedWindow } from '@/com/sulake/habbo/moderation/ITrackedWindow';
import { ModActionDefinition } from '@/com/sulake/habbo/moderation/ModActionDefinition';
import { StringUtil } from '@/com/sulake/habbo/utils/StringUtil';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class ModActionCtrl implements IDisposable, ITrackedWindow {
    static { registerClassName(this, 'com.sulake.habbo.moderation::ModActionCtrl'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        ModActionCtrl.#initStatics();
        return ModActionCtrl._log;
    }

    private static _SafeStr_2401: any[];
    private static _SafeStr_4517: UtilsMap;

    constructor(param1: ModerationManager, param2: number, param3: string, param4: IssueMessageData, param5: UserInfoCtrl) {
        this._main = param1;
        this._SafeStr_2815 = param2;
        this._targetUserName = param3;
        this._SafeStr_4861 = param4;
        this._SafeStr_4171 = param5;
        if (ModActionCtrl._SafeStr_2401 == null) {
            ModActionCtrl._SafeStr_2401 = [];
            ModActionCtrl._SafeStr_2401.push(new ModActionDefinition(1, "Alert", 1, 1, 0));
            ModActionCtrl._SafeStr_2401.push(new ModActionDefinition(2, "Mute 1h", 2, 2, 0));
            ModActionCtrl._SafeStr_2401.push(new ModActionDefinition(3, "Ban 18h", 3, 3, 0));
            ModActionCtrl._SafeStr_2401.push(new ModActionDefinition(4, "Ban 7 days", 3, 4, 0));
            ModActionCtrl._SafeStr_2401.push(new ModActionDefinition(5, "Ban 30 days (step 1)", 3, 5, 0));
            ModActionCtrl._SafeStr_2401.push(new ModActionDefinition(7, "Ban 30 days (step 2)", 3, 7, 0));
            ModActionCtrl._SafeStr_2401.push(new ModActionDefinition(6, "Ban 100 years", 3, 6, 0));
            ModActionCtrl._SafeStr_2401.push(new ModActionDefinition(106, "Ban avatar-only 100 years", 3, 6, 0));
            ModActionCtrl._SafeStr_2401.push(new ModActionDefinition(101, "Kick", 4, 0, 0));
            ModActionCtrl._SafeStr_2401.push(new ModActionDefinition(102, "Lock trade 1 week", 5, 0, 168));
            ModActionCtrl._SafeStr_2401.push(new ModActionDefinition(104, "Lock trade permanent", 5, 0, 876000));
            ModActionCtrl._SafeStr_2401.push(new ModActionDefinition(105, "Message", 6, 0, 0));
        }
        this._main.issueManager.addModActionView(this._SafeStr_2815, this);
    }

    declare private _main: ModerationManager;

    declare private _SafeStr_2815: number;
    static { (this.prototype as any)._SafeStr_2815 = 0; }

    declare private _targetUserName: string;

    declare private _SafeStr_4861: IssueMessageData;

    declare private _frame: IFrameWindow;

    declare private _topicDropdown: IDropMenuWindow;

    declare private _SafeStr_4755: any[];

    declare private _actionTypeDropdown: IDropMenuWindow;

    declare private _SafeStr_2861: ITextFieldWindow;

    declare private _SafeStr_4171: UserInfoCtrl;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    public get disposed(): boolean {
        return this._disposed;
    }

    public show(): void {
        this._frame = castGuarded(this._main.getXmlWindow("modact_summary"), isIFrameWindow, "com.sulake.core.window.components.IFrameWindow");
        this._frame.caption = "Mod action on: " + this._targetUserName;
        this._frame.findChildByName("custom_sanction_button").procedure = this.onCustomSanctionButton;
        this._SafeStr_2861 = castGuarded(this._frame.findChildByName("message_input"), isITextFieldWindow, "com.sulake.core.window.components.ITextFieldWindow");
        this._frame.findChildByName("default_sanction_button").procedure = this.onDefaultSanctionButton;
        this._frame.findChildByName("default_sanction_button").disable();
        this.initializeTopicToSanctionTypeMapping();
        this.initializeTopicDropdown();
        this.initializeActionTypeDropdown();
        let _loc1_: IWindow = this._frame.findChildByTag("close");
        _loc1_.procedure = this.onClose;
        this._frame.visible = true;
    }

    public getType(): number {
        return 7;
    }

    public getId(): string {
        return this._targetUserName;
    }

    public getFrame(): IFrameWindow {
        return this._frame;
    }

    public showDefaultSanction(param1: number, param2: string): void {
        if (this._frame == null || param1 != this._SafeStr_2815) {
            return;
        }
        let _loc3_: ITextWindow = asGuarded(this._frame.findChildByName("default_sanction_label"), isITextWindow);
        if (_loc3_ != null) {
            _loc3_.caption = param2;
        }
        this._frame.findChildByName("default_sanction_button").enable();
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._disposed = true;
        if (this._frame != null) {
            this._frame.destroy();
            this._frame = null;
        }
        this._topicDropdown = null;
        this._SafeStr_2861 = null;
        this._main.issueManager.removeModActionView(this._SafeStr_2815);
        this._main = null;
    }

    private logEvent(param1: string, param2: string = ""): void {
        if (this._SafeStr_4171 != null) {
            this._SafeStr_4171.logEvent(param1, param2);
        }
    }

    private trackAction(param1: string): void {
        if (this._SafeStr_4171 != null && !this._SafeStr_4171.disposed) {
            this._SafeStr_4171.trackAction("modAction_" + param1);
        }
    }

    private initializeTopicToSanctionTypeMapping(): void {
        let _loc2_: string = null;
        let _loc6_: any[] = null;
        let _loc3_: number = 0;
        let _loc4_: any[] = null;
        let _loc1_: number = 0;
        let _loc5_: number = 0;
        if (ModActionCtrl._SafeStr_4517 == null) {
            ModActionCtrl._SafeStr_4517 = new UtilsMap();
            _loc2_ = this._main.getProperty("cfh.topic_id.to.sanction_type_id");
            if (_loc2_ != null) {
                _loc6_ = _loc2_.split(",");
                _loc3_ = 0;
                while (_loc3_ < _loc6_.length) {
                    _loc4_ = _loc6_[_loc3_].split("=");
                    if (_loc4_.length == 2) {
                        _loc1_ = parseInt(String(_loc4_[0])) | 0;
                        _loc5_ = parseInt(String(_loc4_[1])) | 0;
                        ModActionCtrl._SafeStr_4517.add(_loc1_, _loc5_);
                    }
                    _loc3_++;
                }
            }
        }
    }

    private initializeTopicDropdown(): void {
        let _loc3_: any;
        this._topicDropdown = castGuarded(this._frame.findChildByName("cfh_topics"), isIDropMenuWindow, "com.sulake.core.window.components.IDropMenuWindow");
        this._topicDropdown.addEventListener("WE_SELECTED", this.refreshSanctionDataForSelectedTopic);
        this._SafeStr_4755 = [];
        let _loc1_: any[] = [];
        let _loc2_: number = 0;
        for (const _loc4_ of this._main.issueManager.getCfhTopics() ?? []) {
            for (_loc3_ of _loc4_.topics ?? []) {
                _loc1_[_loc2_] = "${help.cfh.topic." + _loc3_.id + "}";
                this._SafeStr_4755[_loc2_] = _loc3_.id;
                _loc2_++;
            }
        }
        this._topicDropdown.populate(_loc1_);
    }

    private refreshSanctionDataForSelectedTopic = (param1: WindowEvent): void => {
        let _loc4_: number = 0;
        let _loc5_: number = this._topicDropdown.selection;
        let _loc2_: number = this._SafeStr_4755[_loc5_] | 0;
        let _loc3_: number = ModActionCtrl._SafeStr_4517.getValue(_loc2_) | 0;
        if (!_loc3_) {
            _loc3_ = ModActionCtrl._SafeStr_4517.getValue(0) | 0;
        }
        if (_loc3_) {
            _loc4_ = 0;
            while (_loc4_ < ModActionCtrl._SafeStr_2401.length) {
                if (ModActionCtrl._SafeStr_2401[_loc4_].actionId == _loc3_) {
                    this._actionTypeDropdown.selection = _loc4_;
                    break;
                }
                _loc4_++;
            }
        } else {
            this._actionTypeDropdown.selection = -1;
        }
        this._main.issueManager.requestSanctionDataForAccount(this._SafeStr_2815, _loc2_);
    };

    private initializeActionTypeDropdown(): void {
        this._actionTypeDropdown = castGuarded(this._frame.findChildByName("sanction_type"), isIDropMenuWindow, "com.sulake.core.window.components.IDropMenuWindow");
        let _loc1_: any[] = [];
        for (const _loc2_ of ModActionCtrl._SafeStr_2401 ?? []) {
            _loc1_.push(_loc2_.name);
        }
        this._actionTypeDropdown.populate(_loc1_);
    }

    private onDefaultSanctionButton = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        if (this._topicDropdown.selection < 0) {
            this._main.windowManager.alert("Alert", "Please select a topic.", 0, this.onAlertClose);
            return;
        }
        ModActionCtrl._log.info("Giving default sanction...");
        this.trackAction("defaultAction");
        this.logEvent("action.default");
        let _loc3_: number = this._SafeStr_4755[this._topicDropdown.selection] | 0;
        this._main.connection.send(new DefaultSanctionMessageComposer(this._SafeStr_2815, _loc3_, this._SafeStr_2861.text, this.getIssueId()));
        this.dispose();
    };

    private onCustomSanctionButton = (param1: WindowEvent, param2: IWindow): void => {
        let _loc6_: any = false;
        let _loc3_: number = 0;
        if (param1.type != "WME_CLICK") {
            return;
        }
        if (this._topicDropdown.selection < 0) {
            this._main.windowManager.alert("Alert", "Please select a topic.", 0, this.onAlertClose);
            return;
        }
        if (this._actionTypeDropdown.selection < 0) {
            this._main.windowManager.alert("Alert", "Please select a sanction.", 0, this.onAlertClose);
            return;
        }
        let _loc4_: number = this._SafeStr_4755[this._topicDropdown.selection] | 0;
        let _loc5_: ModActionDefinition;
        switch ((_loc5_ = ModActionCtrl._SafeStr_2401[this._actionTypeDropdown.selection]).actionType - 1) {
            case 0:
                if (!this._main.initMsg.alertPermission) {
                    this._main.windowManager.alert("Alert", "You have insufficient permissions.", 0, this.onAlertClose);
                    return;
                }
                this.trackAction("sendCaution");
                this._main.connection.send(new ModAlertMessageComposer(this._SafeStr_2815, this._SafeStr_2861.text, _loc4_, this.getIssueId()));
                break;
            case 1:
                this.trackAction("mute");
                this._main.connection.send(new ModMuteMessageComposer(this._SafeStr_2815, this._SafeStr_2861.text, _loc4_, this.getIssueId()));
                break;
            case 2:
                if (!this._main.initMsg.banPermission) {
                    this._main.windowManager.alert("Alert", "You have insufficient permissions.", 0, this.onAlertClose);
                    return;
                }
                this.trackAction("ban");
                _loc6_ = _loc5_.actionId == 106;
                this._main.connection.send(new ModBanMessageComposer(this._SafeStr_2815, this._SafeStr_2861.text, _loc4_, _loc5_.sanctionTypeId, _loc6_, this.getIssueId()));
                break;
            case 3:
                if (!this._main.initMsg.kickPermission) {
                    this._main.windowManager.alert("Alert", "You have insufficient permissions.", 0, this.onAlertClose);
                    return;
                }
                this.trackAction("kick");
                this._main.connection.send(new ModKickMessageComposer(this._SafeStr_2815, this._SafeStr_2861.text, _loc4_, this.getIssueId()));
                break;
            case 4:
                this.trackAction("trading_lock");
                _loc3_ = _loc5_.actionLengthHours * 60;
                this._main.connection.send(new ModTradingLockMessageComposer(this._SafeStr_2815, this._SafeStr_2861.text, _loc3_, _loc4_, this.getIssueId()));
                break;
            case 5:
                if (StringUtil.isEmpty(this._SafeStr_2861.text)) {
                    this._main.windowManager.alert("Alert", "Please write a message to user.", 0, this.onAlertClose);
                    return;
                }
                this.trackAction("sendCaution");
                this._main.connection.send(new ModMessageMessageComposer(this._SafeStr_2815, this._SafeStr_2861.text, _loc4_, this.getIssueId()));
        }
        this.logEvent("action.custom", "unknown");
        this.dispose();
    };

    private onClose = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        this.trackAction("close");
        this.dispose();
    };

    private onAlertClose = (param1: IAlertDialog, param2: WindowEvent): void => {
        param1.dispose();
    };

    private getIssueId(): number {
        return this._SafeStr_4861 != null ? this._SafeStr_4861.issueId : -1;
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (ModActionCtrl.#staticsReady) return;
        ModActionCtrl.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(ModActionCtrl, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.habbo.moderation.ModActionCtrl"));
    }

    get [IDisposable](): true {
        return true;
    }

    get [ITrackedWindow](): true {
        return true;
    }
}
