import { asGuarded, castGuarded, castTo, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { valuesOf } from '@habbo-pixi/runtime/lang/iterate';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { ISelectableWindow } from '@/com/sulake/core/window/components/ISelectableWindow';
import type { ISelectorWindow } from '@/com/sulake/core/window/components/ISelectorWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IAlertDialog } from '@/com/sulake/core/window/utils/IAlertDialog';
import type { CallForHelpReplyMessageParser } from '@/com/sulake/habbo/communication/messages/parser/help/CallForHelpReplyMessageParser';
import type { CallForHelpResultMessageParser } from '@/com/sulake/habbo/communication/messages/parser/help/CallForHelpResultMessageParser';
import type { IssueCloseNotificationMessageParser } from '@/com/sulake/habbo/communication/messages/parser/help/IssueCloseNotificationMessageParser';
import type { HabboHelp } from '@/com/sulake/habbo/help/HabboHelp';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isISelectorWindow } from '@/com/sulake/core/window/components/ISelectorWindow';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { CallForHelpReplyMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/help/CallForHelpReplyMessageEvent';
import { CallForHelpResultMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/help/CallForHelpResultMessageEvent';
import { IssueCloseNotificationMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/help/IssueCloseNotificationMessageEvent';
import { CallForHelpFromForumMessageMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/help/CallForHelpFromForumMessageMessageComposer';
import { CallForHelpFromForumThreadMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/help/CallForHelpFromForumThreadMessageComposer';
import { CallForHelpFromIMMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/help/CallForHelpFromIMMessageComposer';
import { CallForHelpFromPhotoMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/help/CallForHelpFromPhotoMessageComposer';
import { CallForHelpFromSelfieMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/help/CallForHelpFromSelfieMessageComposer';
import { CallForHelpMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/help/CallForHelpMessageComposer';
import { ChatReviewSessionCreateMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/help/ChatReviewSessionCreateMessageComposer';
import { DeletePendingCallsForHelpMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/help/DeletePendingCallsForHelpMessageComposer';
import { IgnoreUserMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/IgnoreUserMessageComposer';
import { ChatReportController } from '@/com/sulake/habbo/help/ChatReportController';
import { isIAvatarImageWidget } from '@/com/sulake/habbo/window/widgets/IAvatarImageWidget';
import { isIIlluminaInputWidget } from '@/com/sulake/habbo/window/widgets/IIlluminaInputWidget';

export class CallForHelpManager implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.help::CallForHelpManager'); }

    private static readonly FIELD_MAX_CHARS: number = 253;
    private static readonly EMERGENCY_HELP_REQUEST_TITLE: string = "emergency_help_request";

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    declare private _habboHelp: HabboHelp;

    declare private _window: IWindowContainer;

    declare private _chatReportController: ChatReportController;

    private _reportedUserId: number = -1;
    private _reportedUserName: string = "";
    private _reportedRoomId: number = -1;

    declare private _reportedRoomName: string;

    declare private _SafeStr_5570: string;

    private _reportedGroupId: number = -1;
    private _reportedThreadId: number = -1;
    private _reportedMessageId: number = -1;

    declare private _SafeStr_6930: string;

    private _SafeStr_6527: number = -1;

    declare private _SafeStr_2429: number;
    static { (this.prototype as any)._SafeStr_2429 = 0; }

    declare private _SafeStr_7179: number;
    static { (this.prototype as any)._SafeStr_7179 = 0; }

    declare private _SafeStr_3363: number;
    static { (this.prototype as any)._SafeStr_3363 = 0; }

    declare private _message: string;

    constructor(param1: HabboHelp) {
        this._habboHelp = param1;
        this._chatReportController = new ChatReportController(this._habboHelp, this.onChatReportEvent);
        this._habboHelp.communicationManager.addHabboConnectionMessageEvent(new CallForHelpResultMessageEvent(this.onCallForHelpResult));
        this._habboHelp.communicationManager.addHabboConnectionMessageEvent(new CallForHelpReplyMessageEvent(this.onCallForHelpReply));
        this._habboHelp.communicationManager.addHabboConnectionMessageEvent(new IssueCloseNotificationMessageEvent(this.onIssueClose));
    }

    private static getCloseReasonKey(param1: number): string {
        if (param1 == 1) {
            return "useless";
        }
        if (param1 == 2) {
            return "abusive";
        }
        return "resolved";
    }

    public dispose(): void {
        if (!this._disposed) {
            this.closeWindow();
            if (this._chatReportController) {
                this._chatReportController.dispose();
                this._chatReportController = null;
            }
            this._habboHelp = null;
            this._disposed = true;
        }
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get reportedUserId(): number {
        return this._reportedUserId;
    }

    public get reportedUserName(): string {
        return this._reportedUserName;
    }

    public get reportedRoomId(): number {
        return this._reportedRoomId;
    }

    public get reportedRoomName(): string {
        return this._reportedRoomName;
    }

    public get reportedExtraDataId(): string {
        return this._SafeStr_6930;
    }

    public get reportedRoomObjectId(): number {
        return this._SafeStr_6527;
    }

    public get reportedGroupId(): number {
        return this._reportedGroupId;
    }

    public get reportedThreadId(): number {
        return this._reportedThreadId;
    }

    public get reportedMessageId(): number {
        return this._reportedMessageId;
    }

    public set reportedUserId(param1: number) {
        this._reportedUserId = param1;
    }

    public set reportedUserName(param1: string) {
        this._reportedUserName = param1;
    }

    public set reportedRoomId(param1: number) {
        this._reportedRoomId = param1;
    }

    public set reportedRoomName(param1: string) {
        this._reportedRoomName = param1;
    }

    public set reportedExtraDataId(param1: string) {
        this._SafeStr_6930 = param1;
    }

    public set reportedRoomObjectId(param1: number) {
        this._SafeStr_6527 = param1;
    }

    public set reportedGroupId(param1: number) {
        this._reportedGroupId = param1;
    }

    public set reportedThreadId(param1: number) {
        this._reportedThreadId = param1;
    }

    public set reportedMessageId(param1: number) {
        this._reportedMessageId = param1;
    }

    public reportBully(param1: number, param2: number): void {
        if (this._habboHelp.guardiansEnabled) {
            this._reportedUserId = param1;
            this._reportedRoomId = param2;
            this._habboHelp.queryForGuideReportingStatus(3);
        } else {
            this.reportUser(param1, 1, 123);
        }
    }

    public reportUser(param1: number, param2: number, param3: number): void {
        this._reportedUserId = param1;
        this._reportedRoomId = -1;
        this._SafeStr_7179 = param3;
        this._habboHelp.queryForPendingCallsForHelp(param2);
    }

    public reportRoom(param1: number, param2: string, param3: string): void {
        this._reportedRoomId = param1;
        this._reportedRoomName = param2;
        this._SafeStr_5570 = param3;
        this._reportedUserId = -1;
        this._habboHelp.queryForPendingCallsForHelp(4);
    }

    public reportThread(param1: number, param2: number): void {
        this._reportedGroupId = param1;
        this._reportedThreadId = param2;
        this._habboHelp.queryForPendingCallsForHelp(7);
    }

    public reportMessage(param1: number, param2: number, param3: number): void {
        this._reportedGroupId = param1;
        this._reportedThreadId = param2;
        this._reportedMessageId = param3;
        this._habboHelp.queryForPendingCallsForHelp(8);
    }

    public reportSelfie(param1: string, param2: string, param3: number, param4: number, param5: number): void {
        this._habboHelp.sendMessage(new CallForHelpFromSelfieMessageComposer(param1, param3, param4, param2, param5));
    }

    public reportPhoto(param1: string, param2: number, param3: number, param4: number, param5: number): void {
        this._habboHelp.setReportMessage(new CallForHelpFromPhotoMessageComposer(param1, param3, param4, param2, param5, "", ""));
        this._habboHelp.queryForPendingCallsForHelp(9);
    }

    public openEmergencyHelpRequest(): void {
        this.reportUser(0, 1, -1);
    }

    private showAbusiveNotice(): void {
        this.closeWindow();
        this._window = asGuarded(this._habboHelp.getXmlWindow("abusive_notice"), isIWindowContainer);
        this._window.center();
        this._window.findChildByName("header_button_close").visible = false;
        this._window.procedure = this.onAbusiveNoticeEvent;
    }

    public showEmergencyHelpRequest(param1: number): void {
        let _loc3_: ISelectableWindow = null;
        let _loc6_: ISelectableWindow = null;
        this.closeWindow();
        this._SafeStr_2429 = param1;
        if (this._SafeStr_2429 == 6) {
            this._window = asGuarded(this._habboHelp.getXmlWindow("bully_report"), isIWindowContainer);
            this._window.procedure = this.onBullyReportEvent;
        } else {
            this._window = asGuarded(this._habboHelp.getXmlWindow("emergency_help_request"), isIWindowContainer);
            this._window.procedure = this.onEmergencyHelpRequestEvent;
            castGuarded(castGuarded(this._window.findChildByName("help_message"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow").widget, isIIlluminaInputWidget, "com.sulake.habbo.window.widgets.IIlluminaInputWidget").maxChars = 253;
        }
        this._window.center();
        let _loc4_: IItemListWindow = asGuarded(this._window.findChildByName("user_panel"), isIItemListWindow);
        let _loc5_: IItemListWindow = asGuarded(this._window.findChildByName("room_panel"), isIItemListWindow);
        let _loc2_: ISelectorWindow = castGuarded(this._window.findChildByName("topic_selector"), isISelectorWindow, "com.sulake.core.window.components.ISelectorWindow");
        if (_loc2_ != null) {
            _loc3_ = _loc2_.getSelectableByName("" + this._SafeStr_7179);
            if (_loc3_ != null) {
                _loc2_.setSelected(_loc3_);
            }
            _loc6_ = _loc2_.getSelectableByName("123");
            if (_loc6_ != null && this._habboHelp.guardiansEnabled) {
                _loc6_.visible = false;
            }
        }
        switch (this._SafeStr_2429 - 1) {
            case 0:
                this.showPanels(true, false);
                break;
            case 2:
                this.showPanels(false, false);
                break;
            case 3:
                this.showPanels(false, true);
                break;
            case 5:
                this.populateUserList();
                break;
            case 6:
            case 7:
                this.showPanels(false, false);
        }
    }

    private showChatReportTool(): void {
        this.closeWindow();
        this._chatReportController.show(this._habboHelp.ownUserId, this._reportedUserId, this._SafeStr_2429);
    }

    private showPanels(param1: boolean, param2: boolean): void {
        let _loc3_: IItemListWindow = asGuarded(this._window.findChildByName("user_panel"), isIItemListWindow);
        let _loc5_: IItemListWindow = asGuarded(this._window.findChildByName("room_panel"), isIItemListWindow);
        let _loc4_: boolean = param1 || param2;
        this._window.findChildByName("submit_box_wide").visible = _loc4_;
        this._window.findChildByName("submit_box_narrow").visible = !_loc4_;
        this._window.findChildByName("separator").visible = _loc4_;
        _loc5_.visible = param2;
        _loc3_.visible = param1;
        if (param2) {
            _loc5_.getListItemByName("room_name").caption = this._reportedRoomName ?? "";
            _loc5_.getListItemByName("room_description").caption = this._SafeStr_5570 ?? "";
        }
        if (param1) {
            this.populateUserList();
        }
        if (!_loc4_) {
            this._window.width = 301;
        }
    }

    private populateUserList(): void {
        let _loc3_: IWindowContainer = null;
        let _loc4_: boolean = false;
        let _loc2_: IItemListWindow = asGuarded(this._window.findChildByName("user_list"), isIItemListWindow);
        let _loc1_: IWindowContainer = asGuarded(_loc2_.getListItemAt(0), isIWindowContainer);
        _loc2_.removeListItems();
        let _loc5_: number = 0;
        for (const _loc6_ of valuesOf(this._habboHelp.userRegistry.getRegistry())) {
            _loc3_ = asGuarded(_loc1_.clone(), isIWindowContainer);
            _loc4_ = _loc6_.userId == this._reportedUserId;
            _loc3_.name = stringOrNull(_loc6_.userId.toString());
            _loc3_.blend = _loc4_ ? 1 : 0;
            _loc3_.procedure = this.onUserSelectEvent;
            _loc3_.findChildByName("user_name").caption = stringOrNull(_loc6_.userName);
            _loc3_.findChildByName("room_name").id = _loc6_.roomId | 0;
            if (_loc4_) {
                this._reportedRoomId = _loc6_.roomId | 0;
            }
            _loc3_.findChildByName("room_name").caption = _loc6_.roomName != "" ? this._habboHelp.localization.getLocalizationWithParams("help.emergency.main.step.two.room.name", "", "room_name", _loc6_.roomName) : "";
            castGuarded(castGuarded(_loc3_.findChildByName("user_avatar"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow").widget, isIAvatarImageWidget, "com.sulake.habbo.window.widgets.IAvatarImageWidget").figure = stringOrNull(_loc6_.figure);
            _loc2_.addListItemAt(_loc3_, _loc5_ >>> 0);
            if (_loc4_) {
                _loc5_ = 1;
            }
        }
    }

    private refreshUserList(): void {
        let _loc3_: number = 0;
        let _loc2_: IWindowContainer = null;
        let _loc1_: IItemListWindow = asGuarded(this._window.findChildByName("user_list"), isIItemListWindow);
        _loc3_ = 0;
        while (_loc3_ < _loc1_.numListItems) {
            _loc2_ = castGuarded(_loc1_.getListItemAt(_loc3_ >>> 0), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
            _loc2_.blend = (Number(_loc2_.name) | 0) == this._reportedUserId ? 1 : 0;
            _loc3_++;
        }
    }

    public showPendingRequest(param1: string): void {
        this.closeWindow();
        this._window = asGuarded(this._habboHelp.getXmlWindow("pending_request"), isIWindowContainer);
        this._window.findChildByName("request_message").caption = param1;
        this._window.center();
        this._window.procedure = this.onPendingReuqestEvent;
    }

    private closeWindow(): void {
        if (this._window != null) {
            this._window.dispose();
            this._window = null;
        }
    }

    private onAbusiveNoticeEvent = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK") {
            let _loc3_: string = param2.name;
            if ("close_button" === _loc3_) {
                this.closeWindow();
            }
        }
    };

    private onEmergencyHelpRequestEvent = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK") {
            switch (param2.name) {
                case "submit_button":
                    if (!this.saveEmergencyHelpRequestData()) {
                        return;
                    }
                    this.basicInfoDone();
                    break;
                case "header_button_close":
                    this.closeWindow();
            }
        }
    };

    private onBullyReportEvent = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK") {
            switch (param2.name) {
                case "submit_button":
                    if (this._reportedUserId > 0) {
                        this._habboHelp.sendMessage(new IgnoreUserMessageComposer(this._reportedUserId));
                        this._habboHelp.sendMessage(new ChatReviewSessionCreateMessageComposer(this._reportedUserId, this._reportedRoomId));
                        this.closeWindow();
                    } else {
                        this._habboHelp.windowManager.alert("${generic.alert.title}", "${guide.bully.request.usermissing}", 0, null);
                    }
                    break;
                case "header_button_close":
                    this.closeWindow();
            }
        }
    };

    private onChatReportEvent = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK") {
            switch (param2.name) {
                case "submit_button":
                    if (this._chatReportController.collectSelectedEntries(this._SafeStr_2429, -1).length == 0) {
                        this._habboHelp.windowManager.alert("${generic.alert.title}", "${help.cfh.error.chatmissing}", 0, null);
                        return;
                    }
                    this.submitCallForHelp();
                    this._chatReportController.closeWindow();
                    this.closeWindow();
                    break;
                case "header_button_close":
                    this._chatReportController.closeWindow();
            }
        }
    };

    private onUserSelectEvent = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK") {
            this.selectUserToReport(isIWindowContainer(param2) ? param2 : null);
        }
    };

    private selectUserToReport(param1: IWindowContainer): void {
        if (this._window == null || this._window.name != "emergency_help_request" || param1 == null) {
            return;
        }
        let _loc2_: number = Number(param1.name) | 0;
        if (this._reportedUserId == _loc2_) {
            this._reportedUserId = 0;
            this._reportedRoomId = -1;
        } else {
            this._reportedUserId = _loc2_;
            this._reportedRoomId = param1.findChildByName("room_name").id;
        }
        this.refreshUserList();
    }

    private basicInfoDone(): void {
        let _loc1_: boolean = this.isChatSelectionRequired();
        if (this._SafeStr_2429 == 3) {
            if (!this._habboHelp.instantMessageRegistry.hasUserChatted(this._reportedUserId)) {
                this._habboHelp.windowManager.alert("${generic.alert.title}", "${help.cfh.error.nochathistory}", 0, null);
            }
        } else if (_loc1_ && !this._habboHelp.chatRegistry.hasContentWithoutChatFromUser(this._habboHelp.ownUserId) && this._habboHelp.chatRegistry.hasContentWithoutChatFromUser(this._reportedUserId)) {
            this._habboHelp.windowManager.alert("${generic.alert.title}", "${help.cfh.error.nochathistory}", 0, null);
            return;
        }
        if (_loc1_) {
            this.showChatReportTool();
        } else {
            this.submitCallForHelp();
        }
    }

    private isChatSelectionRequired(): boolean {
        if (this._SafeStr_2429 == 7 || this._SafeStr_2429 == 8 || this._SafeStr_2429 == 4) {
            return false;
        }
        return this._reportedUserId <= 0 || this._habboHelp.chatRegistry.getItemsByUser(this._reportedUserId).length > 0 || this._SafeStr_2429 == 3;
    }

    private saveEmergencyHelpRequestData(param1: boolean = true): boolean {
        if (this._window == null || this._window.name != "emergency_help_request") {
            return false;
        }
        this._message = castGuarded(castGuarded(this._window.findChildByName("help_message"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow").widget, isIIlluminaInputWidget, "com.sulake.habbo.window.widgets.IIlluminaInputWidget").message;
        if (this._message == null || this._message == "") {
            this._habboHelp.windowManager.alert("${generic.alert.title}", "${help.cfh.error.nomsg}", 0, null);
            return false;
        }
        if (this._message.length < this._habboHelp.getInteger("help.cfh.length.minimum", 15)) {
            this._habboHelp.windowManager.alert("${generic.alert.title}", "${help.cfh.error.msgtooshort}", 0, null);
            return false;
        }
        this._SafeStr_3363 = 0;
        let _loc2_: ISelectableWindow = castGuarded(this._window.findChildByName("topic_selector"), isISelectorWindow, "com.sulake.core.window.components.ISelectorWindow").getSelected();
        if (_loc2_ != null) {
            this._SafeStr_3363 = Number(_loc2_.name) | 0;
        }
        if (this._SafeStr_3363 == 0) {
            this._habboHelp.windowManager.alert("${generic.alert.title}", "${help.cfh.error.notopic}", 0, null);
            return false;
        }
        if (this._SafeStr_2429 == 8 || this._SafeStr_2429 == 7) {
            return true;
        }
        if (this._reportedUserId <= 0 && (this._SafeStr_2429 != 8 && this._SafeStr_2429 == 7) || this._SafeStr_2429 == 4 && !this._habboHelp.getBoolean("room.report.enabled")) {
            this._habboHelp.windowManager.alert("${generic.alert.title}", "${guide.bully.request.usermissing}", 0, null);
            return false;
        }
        if (this._habboHelp.friendList.getFriend(this._reportedUserId) != null) {
            this._habboHelp.windowManager.confirm("${help.cfh.unfriend.confirm.title}", "${help.cfh.unfriend.confirm.message}", (0x10 | 0x20) >>> 0, this.onFriendReportConfirmation);
            return false;
        }
        return true;
    }

    private submitCallForHelp(): void {
        let _loc1_: number = 0;
        this.closeWindow();
        switch (this._SafeStr_2429 - 1) {
            case 0:
            case 3:
                _loc1_ = this._chatReportController.reportedRoomId <= 0 ? this._reportedRoomId : this._chatReportController.reportedRoomId;
                this._habboHelp.sendMessage(new CallForHelpMessageComposer(this._message, this._SafeStr_3363, this._reportedUserId, _loc1_, this._chatReportController.collectSelectedEntries(this._SafeStr_2429, -1), "", ""));
                break;
            case 2:
                this._habboHelp.sendMessage(new CallForHelpFromIMMessageComposer(this._message, this._SafeStr_3363, this._reportedUserId, this._chatReportController.collectSelectedEntries(3, -1), "", ""));
                break;
            case 6:
                this._habboHelp.sendMessage(new CallForHelpFromForumThreadMessageComposer(this._reportedGroupId, this._reportedThreadId, this._SafeStr_3363, this._message, "", ""));
                break;
            case 7:
                this._habboHelp.sendMessage(new CallForHelpFromForumMessageMessageComposer(this._reportedGroupId, this._reportedThreadId, this._reportedMessageId, this._SafeStr_3363, this._message, "", ""));
        }
        this._habboHelp.ignoreAndUnfriendReportedUser(this._SafeStr_3363);
    }

    private onFriendReportConfirmation = (param1: IAlertDialog, param2: WindowEvent): void => {
        if (param2.type == "WE_OK") {
            this.basicInfoDone();
        }
        param1.dispose();
    };

    private onPendingReuqestEvent = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK") {
            switch (param2.name) {
                case "keep_button":
                case "header_button_close":
                    this.closeWindow();
                    break;
                case "discard_button":
                    this.deletePendingCallsForHelp();
                    this.closeWindow();
            }
        }
    };

    private onCallForHelpReply = (param1: IMessageEvent): void => {
        let _loc2_: CallForHelpReplyMessageParser = castTo(param1, CallForHelpReplyMessageEvent).getParser();
        this._habboHelp.windowManager.alert("${help.cfh.reply.title}", _loc2_.message, 0, null);
    };

    private onCallForHelpResult = (param1: IMessageEvent): void => {
        let _loc3_: CallForHelpResultMessageParser = castTo(param1, CallForHelpResultMessageEvent).getParser();
        let _loc4_: number = _loc3_.resultType;
        let _loc2_: string = _loc3_.messageText;
        if (_loc2_ == "") {
            _loc2_ = "${help.cfh.sent.text}";
        }
        this._habboHelp.windowManager.alert("${help.cfh.sent.title}", _loc2_, 0, null);
    };

    private onIssueClose = (param1: IssueCloseNotificationMessageEvent): void => {
        let _loc3_: IssueCloseNotificationMessageParser = param1.getParser();
        let _loc2_: string = _loc3_.messageText;
        if (_loc2_ == "") {
            _loc2_ = "${help.cfh.closed." + CallForHelpManager.getCloseReasonKey(_loc3_.closeReason) + "}";
        }
        this._habboHelp.windowManager.alert("${mod.alert.title}", _loc2_, 0, null);
    };

    private deletePendingCallsForHelp(): void {
        this._habboHelp.sendMessage(new DeletePendingCallsForHelpMessageComposer());
    }

    public get chatReportController(): ChatReportController {
        return this._chatReportController;
    }

    get [IDisposable](): true {
        return true;
    }
}
