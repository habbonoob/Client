import { asGuarded, castGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ICheckBoxWindow } from '@/com/sulake/core/window/components/ICheckBoxWindow';
import type { IDropMenuWindow } from '@/com/sulake/core/window/components/IDropMenuWindow';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { ITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { CallForHelpCategoryData } from '@/com/sulake/habbo/communication/messages/incoming/callforhelp/CallForHelpCategoryData';
import type { IssueMessageData } from '@/com/sulake/habbo/communication/messages/parser/moderation/IssueMessageData';
import type { IIssueHandler } from '@/com/sulake/habbo/moderation/IIssueHandler';
import type { IssueBundle } from '@/com/sulake/habbo/moderation/IssueBundle';
import type { ModerationManager } from '@/com/sulake/habbo/moderation/ModerationManager';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { IUpdateReceiver } from '@/com/sulake/core/runtime/IUpdateReceiver';
import { isICheckBoxWindow } from '@/com/sulake/core/window/components/ICheckBoxWindow';
import { isIDropMenuWindow } from '@/com/sulake/core/window/components/IDropMenuWindow';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { GetCfhChatlogMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/moderator/GetCfhChatlogMessageComposer';
import { ModToolPreferencesComposer } from '@/com/sulake/habbo/communication/messages/outgoing/moderator/ModToolPreferencesComposer';
import { Logger } from '@/com/sulake/habbo/Logger';
import { ChatlogCtrl, UserInfoCtrl } from '@/com/sulake/habbo/moderation/ChatlogCtrl.group';
import { IssueCategoryNames } from '@/com/sulake/habbo/moderation/IssueCategoryNames';
import { ITrackedWindow } from '@/com/sulake/habbo/moderation/ITrackedWindow';

export class IssueHandler implements ITrackedWindow, IIssueHandler, IUpdateReceiver {
    static { registerClassName(this, 'com.sulake.habbo.moderation::IssueHandler'); }

    private static readonly USELESS_REPORTS_TOPIC_ID: number = 27;
    private static readonly AUTO_TOPIC_ID: number = 28;
    private static readonly _SafeStr_7987: number = 1;
    private static readonly AUTO_TRIGGERED_CATEGORY_ID: number = 3;

    declare private _moderationManager: ModerationManager;

    declare private _SafeStr_2257: IssueBundle;

    declare private _SafeStr_2909: IssueMessageData;

    declare private _window: IFrameWindow;

    declare private _cfhCategories: CallForHelpCategoryData[];

    declare private _SafeStr_4755: any[];

    declare private _topicDropdown: IDropMenuWindow;

    declare private _callerUserInfo: UserInfoCtrl;

    declare private _reportedUserInfo: UserInfoCtrl;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    declare private _SafeStr_7129: number;
    static { (this.prototype as any)._SafeStr_7129 = 0; }

    declare private _SafeStr_3626: ChatlogCtrl;

    declare private _chatFrame: IWindowContainer;

    declare private _SafeStr_3406: IItemListWindow;

    private _SafeStr_4311: number = 0;

    declare private _SafeStr_3200: number;
    static { (this.prototype as any)._SafeStr_3200 = 0; }

    declare private _SafeStr_3184: number;
    static { (this.prototype as any)._SafeStr_3184 = 0; }

    declare private _lastWindowWidth: number;
    static { (this.prototype as any)._lastWindowWidth = 0; }

    declare private _SafeStr_3337: number;
    static { (this.prototype as any)._SafeStr_3337 = 0; }

    private _SafeStr_4993: number = getTimer() >>> 0;

    declare private _SafeStr_4228: IWindowContainer;

    declare private _SafeStr_3913: ITextFieldWindow;

    constructor(param1: ModerationManager, param2: IssueBundle, param3: CallForHelpCategoryData[], param4: number, param5: number, param6: number, param7: number) {
        this._moderationManager = param1;
        this._SafeStr_2257 = param2;
        this._cfhCategories = param3;
        this._SafeStr_3200 = param4;
        this._SafeStr_3184 = param5;
        this._lastWindowWidth = param6;
        this._SafeStr_3337 = param7;
    }

    public getType(): number {
        return 8;
    }

    public getId(): string {
        return "" + this._SafeStr_2257.id;
    }

    public getFrame(): IFrameWindow {
        return this._window;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._disposed = true;
        if (this._window != null) {
            this._window.dispose();
            this._window = null;
        }
        if (this._callerUserInfo != null) {
            this._callerUserInfo.dispose();
            this._callerUserInfo = null;
        }
        if (this._reportedUserInfo != null) {
            this._reportedUserInfo.dispose();
            this._reportedUserInfo = null;
        }
        if (this._SafeStr_3626 != null) {
            this._SafeStr_3626.dispose();
            this._SafeStr_3626 = null;
        }
        if (this._SafeStr_4228) {
            this._SafeStr_4228.dispose();
            this._SafeStr_4228 = null;
        }
        if (this._SafeStr_3913) {
            this._SafeStr_3913.dispose();
            this._SafeStr_3913 = null;
        }
        this._moderationManager.removeUpdateReceiver(this);
        this._moderationManager = null;
        this._SafeStr_2257 = null;
    }

    public show(): void {
        let _loc5_: IItemListWindow = null;
        let _loc6_: IWindow = null;
        if (this._window != null) {
            return;
        }
        if (this._moderationManager.windowManager == null || this._moderationManager.assets == null) {
            return;
        }
        this._window = asGuarded(this._moderationManager.getXmlWindow("issue_handler"), isIFrameWindow);
        if (this._window == null) {
            return;
        }
        let _loc3_: IItemListWindow = asGuarded(this._window.findChildByName("issues_item_list"), isIItemListWindow);
        this._SafeStr_4228 = asGuarded(_loc3_.getListItemAt(0), isIWindowContainer);
        _loc3_.removeListItems();
        let _loc2_: IItemListWindow = asGuarded(this._window.findChildByName("msg_item_list"), isIItemListWindow);
        this._SafeStr_3913 = asGuarded(_loc2_.getListItemAt(0), isITextFieldWindow);
        _loc2_.removeListItems();
        let _loc7_: IWindow = this._window.findChildByTag("close");
        if (_loc7_ != null) {
            _loc7_.addEventListener("WME_CLICK", this.onClose);
        }
        _loc7_ = this._window.findChildByName("issue_cont");
        if (_loc7_ != null) {
            _loc7_.addEventListener("WE_RELOCATED", this.onWindowRelocatedOrResized);
            _loc7_.addEventListener("WE_RESIZED", this.onWindowRelocatedOrResized);
            this._moderationManager.registerUpdateReceiver(this, 1000);
        }
        this._SafeStr_4993 = getTimer() >>> 0;
        this.setProc("close_useless", this.onCloseUseless);
        this.setProc("close_sanction", this.onCloseSanction);
        this.setProc("close_resolved", this.onCloseResolved);
        this.setProc("release", this.onRelease);
        _loc7_ = this._window.findChildByName("move_to_player_support");
        if (_loc7_ != null) {
            _loc7_.disable();
        }
        this._moderationManager.issueManager.requestSanctionData(this._SafeStr_2257.id, -1);
        this.initializeTopicDropdown();
        this._SafeStr_2909 = this._SafeStr_2257.getHighestPriorityIssue();
        this._callerUserInfo = new UserInfoCtrl(this._window, this._moderationManager, this._SafeStr_2909, this);
        this._reportedUserInfo = new UserInfoCtrl(this._window, this._moderationManager, this._SafeStr_2909, this);
        this._callerUserInfo.load(castGuarded(this._window.findChildByName("caller_user_info"), isIWindowContainer, "com.sulake.core.window.IWindowContainer"), this._SafeStr_2909.reporterUserId);
        if (this._SafeStr_2909.categoryId == 3 && this._SafeStr_2909.reportedCategoryId == 28) {
            this._topicDropdown.selection = this._SafeStr_7129;
            this._moderationManager.issueManager.requestSanctionData(this._SafeStr_2257.id, 1);
        }
        let _loc1_: IWindowContainer = castGuarded(this._window.findChildByName("reported_user_info"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        if (this._SafeStr_2257.reportedUserId > 0) {
            this._reportedUserInfo.load(_loc1_, this._SafeStr_2257.reportedUserId);
        } else {
            _loc5_ = castGuarded(this._window.findChildByName("issue_cont"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow");
            _loc6_ = this._window.findChildByName("reported_user_info_caption");
            _loc5_.removeListItem(_loc6_);
            _loc5_.removeListItem(_loc1_);
        }
        let _loc4_: ICheckBoxWindow = asGuarded(this._window.findChildByName("handle_next_checkbox"), isICheckBoxWindow);
        if (_loc4_ != null) {
            _loc4_.select();
        }
        this._chatFrame = castGuarded(this._window.findChildByName("chat_cont"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        this._SafeStr_3406 = castGuarded(this._chatFrame.findChildByName("evidence_list"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow");
        this._SafeStr_3626 = new ChatlogCtrl(new GetCfhChatlogMessageComposer(this._SafeStr_2909.issueId), this._moderationManager, 3, this._SafeStr_2909.issueId, this._SafeStr_2909, this._chatFrame, this._SafeStr_3406, true);
        this._SafeStr_3626.show();
        Logger.log("HARASSER: " + this._SafeStr_2257.reportedUserId);
        this.updateIssueList();
        this.updateMessages();
    }

    private sendWindowPreferences(): void {
        this._SafeStr_3200 = this._window.x;
        this._SafeStr_3184 = this._window.y;
        this._lastWindowWidth = this._window.width;
        this._SafeStr_3337 = this._window.height;
        this._moderationManager.issueManager.setToolPreferences(this._SafeStr_3200, this._SafeStr_3184, this._lastWindowWidth, this._SafeStr_3337);
        this._moderationManager.connection.send(new ModToolPreferencesComposer(this._SafeStr_3200, this._SafeStr_3184, this._lastWindowWidth, this._SafeStr_3337));
    }

    private windowDimensionsChanged(): boolean {
        if (this._SafeStr_3200 != this._window.x) {
            return true;
        }
        if (this._SafeStr_3184 != this._window.y) {
            return true;
        }
        if (this._lastWindowWidth != this._window.width) {
            return true;
        }
        if (this._SafeStr_3337 != this._window.height) {
            return true;
        }
        return false;
    }

    public update(param1: number): void {
        let _loc2_: number = getTimer() >>> 0;
        if (this.windowDimensionsChanged() && _loc2_ - this._SafeStr_4993 > 5000) {
            this.sendWindowPreferences();
        }
    }

    private onWindowRelocatedOrResized = (param1: WindowEvent): void => {
        let _loc4_: IItemListWindow = asGuarded(param1.window, isIItemListWindow);
        if (_loc4_ == null) {
            return;
        }
        let _loc5_: IItemListWindow = asGuarded(_loc4_.getListItemByName("issues_item_list"), isIItemListWindow);
        let _loc3_: IItemListWindow = asGuarded(_loc4_.getListItemByName("msg_item_list"), isIItemListWindow);
        if (_loc5_ == null || _loc3_ == null) {
            return;
        }
        let _loc2_: number = (_loc4_.height - _loc4_.scrollableRegion.height + _loc5_.height + _loc3_.height) * 0.5 | 0;
        _loc4_.autoArrangeItems = false;
        _loc5_.height = _loc2_;
        _loc3_.height = _loc2_;
        _loc4_.autoArrangeItems = true;
    };

    private updateIssueList(): void {
        let _loc1_: IWindowContainer = null;
        let _loc10_: IWindowContainer = null;
        let _loc2_: IWindow = null;
        let _loc4_: any = null;
        let _loc13_: string = null;
        if (this._window == null) {
            return;
        }
        let _loc6_: IItemListWindow = asGuarded(this._window.findChildByName("issues_item_list"), isIItemListWindow);
        if (_loc6_ == null) {
            return;
        }
        let _loc8_: any[] = this._SafeStr_2257.issues;
        let _loc7_: number = 0;
        let _loc12_: number = _loc6_.numListItems;
        let _loc3_: number = _loc8_.length | 0;
        if (_loc12_ < _loc3_) {
            _loc1_ = asGuarded(this._SafeStr_4228.clone(), isIWindowContainer);
            _loc6_.addListItem(_loc1_);
            _loc7_ = 1;
            while (_loc7_ < _loc3_ - _loc12_) {
                _loc10_ = asGuarded(_loc1_.clone(), isIWindowContainer);
                if (_loc10_ == null) {
                    return;
                }
                _loc6_.addListItem(_loc10_);
                _loc7_++;
            }
        } else if (_loc12_ > _loc3_) {
            _loc7_ = 0;
            while (_loc7_ < _loc12_ - _loc3_) {
                _loc2_ = _loc6_.removeListItemAt(0);
                _loc2_.dispose();
                _loc7_++;
            }
        }
        let _loc9_: IssueMessageData = this._SafeStr_2257.getHighestPriorityIssue();
        let _loc11_: number = _loc9_ == null ? 0 : _loc9_.issueId;
        let _loc5_: number = getTimer();
        _loc7_ = 0;
        for (_loc4_ of _loc8_ ?? []) {
            _loc1_ = asGuarded(_loc6_.getListItemAt(_loc7_ >>> 0), isIWindowContainer);
            if (_loc1_ == null) {
                return;
            }
            _loc1_.background = _loc7_++ % 2 == 0;
            _loc1_.id = _loc4_.issueId | 0;
            _loc1_.removeEventListener("WME_CLICK", this.onIssueClicked);
            _loc1_.addEventListener("WME_CLICK", this.onIssueClicked);
            this.setCaption(_loc1_.findChildByName("reporter"), stringOrNull(_loc4_.reporterUserName));
            this.setCaption(_loc1_.findChildByName("type"), IssueCategoryNames.getSourceName(_loc4_.categoryId | 0));
            this.setCaption(_loc1_.findChildByName("category"), IssueCategoryNames.getCategoryName(_loc4_.reportedCategoryId | 0));
            this.setCaption(_loc1_.findChildByName("time_open"), stringOrNull(_loc4_.getOpenTime(_loc5_)));
            _loc13_ = _loc4_.issueId == _loc11_ && _loc3_ > 1 ? "Volter Bold" : "Volter";
            (asGuarded(_loc1_.findChildByName("category"), isITextWindow)).fontFace = _loc13_;
        }
    }

    private updateMessages(): void {
        let _loc1_: ITextFieldWindow = null;
        let _loc6_: ITextWindow = null;
        let _loc2_: IWindow = null;
        let _loc5_: any = null;
        if (this._window == null) {
            return;
        }
        let _loc4_: IItemListWindow = asGuarded(this._window.findChildByName("msg_item_list"), isIItemListWindow);
        if (_loc4_ == null) {
            return;
        }
        let _loc8_: any[] = this._SafeStr_2257.issues;
        let _loc7_: number = 0;
        let _loc9_: number = _loc4_.numListItems;
        let _loc3_: number = _loc8_.length | 0;
        if (_loc9_ < _loc3_) {
            _loc1_ = asGuarded(this._SafeStr_3913.clone(), isITextFieldWindow);
            _loc1_.selectable = true;
            _loc1_.editable = false;
            _loc4_.addListItem(_loc1_);
            _loc7_ = 1;
            while (_loc7_ < _loc3_ - _loc9_) {
                _loc6_ = asGuarded(_loc1_.clone(), isITextWindow);
                if (_loc6_ == null) {
                    return;
                }
                _loc4_.addListItem(_loc6_);
                _loc7_++;
            }
        } else if (_loc9_ > _loc3_) {
            _loc7_ = 0;
            while (_loc7_ < _loc9_ - _loc3_) {
                _loc2_ = _loc4_.removeListItemAt(0);
                _loc2_.dispose();
                _loc7_++;
            }
        }
        _loc7_ = 0;
        for (_loc5_ of _loc8_ ?? []) {
            _loc1_ = asGuarded(_loc4_.getListItemAt(_loc7_ >>> 0), isITextFieldWindow);
            if (_loc1_ == null) {
                return;
            }
            _loc1_.width = _loc4_.width;
            _loc1_.background = _loc7_++ % 2 == 0;
            _loc1_.caption = _loc5_.reporterUserName + ": " + _loc5_.message;
            _loc1_.height = _loc1_.textHeight + 10 | 0;
        }
    }

    private setCaption(param1: IWindow, param2: string): void {
        if (param1 != null) {
            param1.caption = param2;
        }
    }

    private initializeTopicDropdown(): void {
        let _loc4_: any;
        this._topicDropdown = asGuarded(this._window.findChildByName("cfh_topics"), isIDropMenuWindow);
        let _loc1_: any = -1;
        let _loc6_: number = this._SafeStr_2257.getHighestPriorityIssue().reportedCategoryId;
        if (_loc6_ == 27) {
            this._topicDropdown.disable();
            return;
        }
        this._SafeStr_4755 = [];
        let _loc2_: any[] = [];
        let _loc3_: number = 0;
        for (const _loc5_ of this._cfhCategories ?? []) {
            for (_loc4_ of _loc5_.topics ?? []) {
                _loc2_[_loc3_] = "${help.cfh.topic." + _loc4_.id + "}";
                this._SafeStr_4755[_loc3_] = _loc4_.id;
                if (_loc4_.id == 1) {
                    this._SafeStr_7129 = _loc3_;
                }
                if (_loc4_.id == _loc6_) {
                    _loc1_ = _loc3_;
                }
                _loc3_++;
            }
        }
        this._topicDropdown.populate(_loc2_);
        if (_loc1_ >= 0) {
            this._topicDropdown.selection = _loc1_ | 0;
        }
        this._topicDropdown.addEventListener("WE_SELECTED", this.refreshSanctionDataForSelectedTopic);
    }

    private refreshSanctionDataForSelectedTopic = (param1: WindowEvent): void => {
        let _loc3_: number = this._topicDropdown.selection;
        let _loc2_: number = this._SafeStr_4755[_loc3_] | 0;
        this._moderationManager.issueManager.requestSanctionData(this._SafeStr_2257.id, _loc2_);
    };

    private setProc(param1: string, param2: (...args: any[]) => any): void {
        this._window.findChildByName(param1).addEventListener("WME_CLICK", param2);
    }

    private onClose = (param1: WindowMouseEvent): void => {
        if (this._moderationManager != null && this._moderationManager.issueManager != null && this._SafeStr_2257 != null) {
            this._moderationManager.issueManager.removeHandler(this._SafeStr_2257.id);
            this.trackAction("closeWindow");
        }
        this.dispose();
    };

    private onCloseUseless = (param1: WindowMouseEvent): void => {
        Logger.log("Close useless clicked");
        this.trackAction("closeUseless");
        this._moderationManager.trackGoogle("actionCountUseless", this._SafeStr_4311);
        this._moderationManager.issueManager.closeBundle(this._SafeStr_2257.id, 1);
        this.checkAutoHandling();
        this.dispose();
    };

    private onCloseResolved = (param1: WindowMouseEvent): void => {
        Logger.log("Close resolved clicked");
        this.trackAction("closeResolved");
        this._moderationManager.trackGoogle("actionCountResolved", this._SafeStr_4311);
        this._moderationManager.issueManager.closeBundle(this._SafeStr_2257.id, 3);
        this.checkAutoHandling();
        this.dispose();
    };

    private onCloseSanction = (param1: WindowMouseEvent): void => {
        Logger.log("Close with default sanction clicked");
        this.trackAction("closeSanction");
        this._moderationManager.trackGoogle("actionCountSanction", this._SafeStr_4311);
        let _loc2_: number = -1;
        let _loc3_: number = this._topicDropdown.selection;
        if (_loc3_ >= 0) {
            _loc2_ = this._SafeStr_4755[_loc3_] | 0;
        }
        if (_loc2_ <= 0 && this._SafeStr_2257.getHighestPriorityIssue().reportedCategoryId == 28) {
            this._moderationManager.windowManager.alert("Topic missing", "You need to select the topic first.", 0, null);
        } else {
            this._moderationManager.issueManager.closeDefaultAction(this._SafeStr_2257.id, _loc2_);
            this.checkAutoHandling();
            this.dispose();
        }
    };

    private onRelease = (param1: WindowMouseEvent): void => {
        Logger.log("Release clicked");
        this.trackAction("release");
        this._moderationManager.issueManager.releaseBundle(this._SafeStr_2257.id);
        this.checkAutoHandling();
        this.dispose();
    };

    private onIssueClicked = (param1: WindowMouseEvent): void => {
        let _loc3_: number = 0;
        for (const _loc2_ of this._SafeStr_2257.issues ?? []) {
            if (_loc2_.issueId == param1.window.id) {
                this._SafeStr_2909 = _loc2_;
                _loc3_ = _loc2_.reporterUserId | 0;
                if (_loc3_ != 0) {
                    if (this._callerUserInfo != null) {
                        this._callerUserInfo.dispose();
                    }
                    this._callerUserInfo = new UserInfoCtrl(this._window, this._moderationManager, _loc2_, this);
                    this._callerUserInfo.load(castGuarded(this._window.findChildByName("caller_user_info"), isIWindowContainer, "com.sulake.core.window.IWindowContainer"), _loc3_);
                    this._moderationManager.connection.send(new GetCfhChatlogMessageComposer(_loc2_.issueId | 0));
                    this._SafeStr_3626.setId(_loc2_.issueId | 0);
                    this._moderationManager.messageHandler.addChatlogListener(this._SafeStr_3626);
                }
                break;
            }
        }
    };

    public updateIssuesAndMessages(): void {
        this.updateIssueList();
        this.updateMessages();
    }

    public showDefaultSanction(param1: number, param2: string): void {
        if (this._window == null || this._moderationManager == null || this._moderationManager.issueManager == null || this._SafeStr_2257 == null) {
            return;
        }
        if (param1 != this._SafeStr_2257.reportedUserId) {
            return;
        }
        let _loc3_: ITextWindow = asGuarded(this._window.findChildByName("sanction_label"), isITextWindow);
        if (_loc3_ != null) {
            _loc3_.caption = param2;
        }
    }

    private checkAutoHandling(): void {
        if (this._window == null || this._moderationManager == null || this._moderationManager.issueManager == null) {
            return;
        }
        let _loc1_: ICheckBoxWindow = asGuarded(this._window.findChildByName("handle_next_checkbox"), isICheckBoxWindow);
        if (_loc1_ != null && Boolean(_loc1_.isSelected)) {
            this._moderationManager.issueManager.autoPick("issue handler pick next");
        }
    }

    public get callerUserInfo(): UserInfoCtrl {
        return this._callerUserInfo;
    }

    public get reportedUserInfo(): UserInfoCtrl {
        return this._reportedUserInfo;
    }

    public trackAction(param1: string): void {
        if (this._moderationManager == null || this._moderationManager.disposed) {
            return;
        }
        this._SafeStr_4311 = this._SafeStr_4311 + 1;
        this._moderationManager.trackGoogle("issueHandler_" + param1);
    }

    get [ITrackedWindow](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }

    get [IUpdateReceiver](): true {
        return true;
    }
}
