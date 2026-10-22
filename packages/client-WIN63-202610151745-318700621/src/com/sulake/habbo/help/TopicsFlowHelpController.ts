import { asGuarded, castGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { valuesOf } from '@habbo-pixi/runtime/lang/iterate';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ICheckBoxWindow } from '@/com/sulake/core/window/components/ICheckBoxWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { ITextLinkWindow } from '@/com/sulake/core/window/components/ITextLinkWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { CallForHelpTopicData } from '@/com/sulake/habbo/communication/messages/incoming/callforhelp/CallForHelpTopicData';
import type { ChatRegistryItem } from '@/com/sulake/habbo/help/cfh/registry/chat/ChatRegistryItem';
import type { InstantMessageRegistryItem } from '@/com/sulake/habbo/help/cfh/registry/instantmessage/InstantMessageRegistryItem';
import type { UserRegistryItem } from '@/com/sulake/habbo/help/cfh/registry/user/UserRegistryItem';
import type { HabboHelp } from '@/com/sulake/habbo/help/HabboHelp';
import type { IModalDialog } from '@/com/sulake/habbo/window/utils/IModalDialog';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isICheckBoxWindow } from '@/com/sulake/core/window/components/ICheckBoxWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isITextLinkWindow } from '@/com/sulake/core/window/components/ITextLinkWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { CallForHelpFromForumMessageMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/help/CallForHelpFromForumMessageMessageComposer';
import { CallForHelpFromForumThreadMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/help/CallForHelpFromForumThreadMessageComposer';
import { CallForHelpFromIMMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/help/CallForHelpFromIMMessageComposer';
import { CallForHelpFromPhotoMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/help/CallForHelpFromPhotoMessageComposer';
import { CallForHelpMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/help/CallForHelpMessageComposer';
import { ChatReviewSessionCreateMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/help/ChatReviewSessionCreateMessageComposer';
import { Logger } from '@/com/sulake/habbo/Logger';
import { HabboWebTools } from '@/com/sulake/habbo/utils/HabboWebTools';
import { isIAvatarImageWidget } from '@/com/sulake/habbo/window/widgets/IAvatarImageWidget';
import { isIIlluminaInputWidget } from '@/com/sulake/habbo/window/widgets/IIlluminaInputWidget';

export class TopicsFlowHelpController implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.help::TopicsFlowHelpController'); }

    private static readonly START_CONTAINER: string = "start_container";
    private static readonly HELP_CONTAINER: string = "help_container";
    private static readonly USERS_CONTAINER: string = "users_container";
    private static readonly USER_CONTAINER: string = "user";
    private static readonly REASON_CONTAINER: string = "reason_container";
    private static readonly TOPIC_CONTAINER: string = "topic_container";
    private static readonly MESSAGE_CONTAINER: string = "message_container";
    private static readonly CHAT_CONTAINER: string = "chat_container";
    private static readonly BACK_BUTTON: string = "back_button";
    private static readonly SUMMARY_CONTAINER: string = "summary_container";
    private static readonly UNLAWFUL_MESSAGE_CONTENT: string = "unlawful_message_content";
    private static readonly HELP_MESSAGE: string = "help_message";
    private static readonly MESSAGE_CONTAINER_DESCRIPTION: string = "message_container_description";
    private static readonly _SafeStr_8365: string = "unlawful_message_confirm";
    private static readonly MESSAGE_NAME_INPUT: string = "help_message_name";
    private static readonly MESSAGE_EMAIL_INPUT: string = "help_message_email";
    private static readonly CONTINUE_BUTTON: string = "continue_button";
    private static readonly FIELD_MAX_CHARS: number = 253;
    private static readonly TOPIC_NAME_BULLYING: string = "bullying";
    private static readonly TOPIC_NAME_BAD_USER_NAME: string = "habbo_name";
    private static readonly DEFAULT_REPORT_MESSAGE_DESCRIPTION: string = "help.emergency.main.step.one.description";
    private static readonly UNLAWFUL_REPORT_MESSAGE_TITLE: string = "help.cfh.unlawful_activity.reason_description";
    private static readonly REQUIRES_CONTINUE_BUTTON: any[] = ["users_container", "message_container", "chat_container"];
    private static readonly REQUIRES_USER_DATA: any[] = ["reason_container", "message_container", "chat_container", "summary_container"];

    declare private _habboHelp: HabboHelp;

    private _disposed: boolean = false;

    declare private _SafeStr_2711: IModalDialog;

    declare private _view: IWindowContainer;

    declare private _containers: string[];

    declare private _SafeStr_3553: IItemListWindow;

    declare private _SafeStr_2543: IItemListWindow;

    declare private _SafeStr_3406: IItemListWindow;

    declare private _SafeStr_7224: IWindowContainer;

    declare private _SafeStr_5127: IWindowContainer;

    declare private _SafeStr_5695: IWindowContainer;

    private _SafeStr_2865: string = "start_container";

    declare private _SafeStr_2630: CallForHelpTopicData;

    declare private _SafeStr_3950: string;

    declare private _message: string;

    declare private _reportedUserName: string;

    private _SafeStr_2888: number = -1;
    private _SafeStr_7016: boolean = false;
    private _unlawfulCategories: any[] = ["unlawful_activity"];

    constructor(param1: HabboHelp) {
        this._habboHelp = param1;
        this._containers = new Array<string>(0).fill(null);
        this._containers.push("start_container", "help_container", "users_container", "user", "reason_container", "message_container", "chat_container", "back_button", "summary_container");
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this.closeWindow();
        this._habboHelp = null;
        this._disposed = true;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public openReportingUserName(): void {
        this._SafeStr_7016 = true;
        this.showReportingDialog(-1, false);
        this._SafeStr_2630 = this.getTopic("habbo_name");
        this._view.findChildByName("message_phase_title").caption = this._habboHelp.localization.getLocalization("generic.reason") + " " + this._habboHelp.localization.getLocalization("help.cfh.topic." + this._SafeStr_2630.id);
        this.showContainer("message_container");
    }

    public openReportingChatLineSelection(): void {
        this.showReportingDialog(-1, true);
        if (!this.userChatLinesAvailable()) {
            return;
        }
        this.showContainer("chat_container");
        this.populateChatMessage();
    }

    public openReportingContentReasonCategory(param1: number): boolean {
        this.showReportingDialog(param1, false);
        let _loc2_: boolean = this.showReasons(param1);
        if (!_loc2_) {
            this.closeWindow();
        }
        return _loc2_;
    }

    public openReportingIMSelection(): void {
        this.showReportingDialog(3, false);
        this.showContainer("chat_container");
        this.populateInstantMessages();
        if (this._SafeStr_3406.numListItems == 0) {
            this._habboHelp.windowManager.alertWithModal("${generic.alert.title}", "${help.cfh.error.no_user_data}", 0, null);
            this.closeWindow();
        }
    }

    private showReportingDialog(param1: number, param2: boolean): void {
        this._SafeStr_2888 = param1;
        if (this._SafeStr_2711 == null) {
            this.openWindow();
        }
        this._view.findChildByName("change_user").visible = param2;
    }

    private openWindow(): void {
        if (this._SafeStr_2711 == null && !this.disposed) {
            this._SafeStr_2711 = this._habboHelp.getModalXmlWindow("topics_flow_help");
            this._SafeStr_2711.rootWindow.procedure = this.windowEventProcedure;
            this._view = asGuarded(this._SafeStr_2711.rootWindow, isIWindowContainer);
            this._SafeStr_3553 = asGuarded(this._view.findChildByName("user_list"), isIItemListWindow);
            this._SafeStr_2543 = asGuarded(this._view.findChildByName("reason_list"), isIItemListWindow);
            this._SafeStr_3406 = asGuarded(this._view.findChildByName("chat_list"), isIItemListWindow);
            this._SafeStr_7224 = asGuarded(this._SafeStr_3553.getListItemAt(0), isIWindowContainer);
            this._SafeStr_5127 = asGuarded(this._SafeStr_2543.getListItemAt(0), isIWindowContainer);
            this._SafeStr_5695 = asGuarded(this._SafeStr_3406.getListItemAt(0), isIWindowContainer);
            this._SafeStr_3553.removeListItems();
            this._SafeStr_2543.removeListItems();
            this._SafeStr_3406.removeListItems();
            castGuarded(castGuarded(this._view.findChildByName("help_message"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow").widget, isIIlluminaInputWidget, "com.sulake.habbo.window.widgets.IIlluminaInputWidget").maxChars = 253;
            if (!this._habboHelp.getBoolean("my.reports.status.enabled")) {
                this._SafeStr_2711.rootWindow.findChildByName("reports_status_bitmap").visible = false;
                this._SafeStr_2711.rootWindow.findChildByName("reports_status").visible = false;
            }
            this.deselectChatEntries();
        }
    }

    public closeWindow(): void {
        if (this._SafeStr_2711 != null) {
            this._SafeStr_2711.dispose();
            this._SafeStr_2711 = null;
        }
        this._SafeStr_2865 = "start_container";
    }

    public toggleWindow(): void {
        if (this._SafeStr_2711 == null) {
            this._SafeStr_2888 = -1;
            this.openWindow();
            this.showContainer("start_container");
        } else {
            this.closeWindow();
        }
    }

    private showContainer(param1: string): void {
        let _loc3_: boolean = false;
        for (const _loc2_ of this._containers ?? []) {
            this._view.findChildByName(_loc2_).visible = false;
        }
        this._view.findChildByName("continue_button").visible = TopicsFlowHelpController.REQUIRES_CONTINUE_BUTTON.indexOf(param1) > -1;
        this._view.findChildByName("user").visible = TopicsFlowHelpController.REQUIRES_USER_DATA.indexOf(param1) > -1;
        this._SafeStr_2865 = param1;
        this.updateBackButtonVisibility();
        this._view.findChildByName(param1).visible = true;
        if (param1 == "message_container") {
            _loc3_ = this._unlawfulCategories.indexOf(this._SafeStr_3950) > -1;
            this._view.findChildByName("unlawful_message_content").visible = _loc3_;
            this._view.findChildByName("help_message").height = _loc3_ ? 120 : 220;
            this._view.findChildByName("message_container_description").caption = this._habboHelp.localization.getLocalization(_loc3_ ? "help.cfh.unlawful_activity.reason_description" : "help.emergency.main.step.one.description");
        }
        if (TopicsFlowHelpController.REQUIRES_USER_DATA.indexOf(param1) > -1) {
            this.updateUserData();
        }
    }

    private updateBackButtonVisibility(): void {
        let _loc1_: boolean = true;
        if (this._SafeStr_2865 == "start_container") {
            _loc1_ = false;
        } else if (this._SafeStr_2888 == 3) {
            _loc1_ = this._SafeStr_2865 != "chat_container";
        } else if (this._SafeStr_2888 > -1) {
            _loc1_ = this._SafeStr_2865 != "reason_container";
        } else if (this._SafeStr_7016) {
            _loc1_ = this._SafeStr_2865 != "message_container";
        }
        this._view.findChildByName("back_button").visible = _loc1_;
    }

    private verifyUserSelected(): boolean {
        if (this._habboHelp.reportedUserId == -1) {
            this._habboHelp.windowManager.alertWithModal("${generic.alert.title}", "${guide.bully.request.usermissing}", 0, null);
            return false;
        }
        return true;
    }

    private verifyMessage(): boolean {
        if (this._unlawfulCategories.indexOf(this._SafeStr_3950) > -1) {
            if (!(asGuarded(this._view.findChildByName("unlawful_message_confirm"), isICheckBoxWindow)).isSelected || castGuarded(castGuarded(this._view.findChildByName("help_message_name"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow").widget, isIIlluminaInputWidget, "com.sulake.habbo.window.widgets.IIlluminaInputWidget").message == "" || castGuarded(castGuarded(this._view.findChildByName("help_message_email"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow").widget, isIIlluminaInputWidget, "com.sulake.habbo.window.widgets.IIlluminaInputWidget").message == "") {
                this._habboHelp.windowManager.alertWithModal("${generic.alert.title}", "${help.emergency.main.step.one.description}", 0, null);
                return false;
            }
        }
        this._message = castGuarded(castGuarded(this._view.findChildByName("help_message"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow").widget, isIIlluminaInputWidget, "com.sulake.habbo.window.widgets.IIlluminaInputWidget").message;
        if (this._message == null || this._message == "") {
            this._habboHelp.windowManager.alertWithModal("${generic.alert.title}", "${help.cfh.error.nomsg}", 0, null);
            return false;
        }
        if (this._message.length < this._habboHelp.getInteger("help.cfh.length.minimum", 15)) {
            this._habboHelp.windowManager.alertWithModal("${generic.alert.title}", "${help.cfh.error.msgtooshort}", 0, null);
            return false;
        }
        return true;
    }

    private verifySelectedChatLines(): boolean {
        let _loc1_: any[] = this._habboHelp.callForHelpManager.chatReportController.collectSelectedEntries(this._SafeStr_2888, this._habboHelp.reportedUserId);
        if (_loc1_ == null || _loc1_.length == 0) {
            this._habboHelp.windowManager.alertWithModal("${generic.alert.title}", "${help.cfh.error.chatmissing}", 0, null);
            return false;
        }
        return true;
    }

    private windowEventProcedure = (param1: WindowEvent, param2: IWindow): void => {
        if (this.disposed || param1.type != "WME_CLICK") {
            return;
        }
        switch (param2.name) {
            case "header_button_close":
                this.closeWindow();
                break;
            case "back_button":
                switch (this._SafeStr_2865) {
                    case "reason_container":
                        this.showContainer("chat_container");
                        break;
                    case "topic_container":
                    case "message_container":
                        this.showContainer("reason_container");
                        this.populateReasons();
                        break;
                    case "chat_container":
                        if (this.populateUsers()) {
                            this.showContainer("users_container");
                        } else {
                            this.showContainer("start_container");
                        }
                        break;
                    case "summary_container":
                        this.showContainer("message_container");
                        break;
                    default:
                        this.showContainer("start_container");
                }
                break;
            case "continue_button":
                switch (this._SafeStr_2865) {
                    case "users_container":
                        if (this.verifyUserSelected()) {
                            this.showContainer("chat_container");
                            this.populateChatMessage();
                        }
                        break;
                    case "message_container":
                        if (this.verifyMessage()) {
                            this.showContainer("summary_container");
                        }
                        break;
                    case "chat_container":
                        if (this.verifySelectedChatLines()) {
                            this.showContainer("reason_container");
                            this.populateReasons();
                        }
                        break;
                    default:
                        this.showContainer("start_container");
                }
                break;
            case "button_habbo_help":
                this.showContainer("help_container");
                break;
            case "button_user_report":
            case "change_user":
                if (this.populateUsers()) {
                    this.showContainer("users_container");
                } else {
                    this._habboHelp.windowManager.alertWithModal("${generic.alert.title}", "${help.cfh.error.nochathistory}", 0, null);
                }
                break;
            case "button_account":
                HabboWebTools.openWebPage(this._habboHelp.getProperty("zendesk.url"), "habboMain");
                this._habboHelp.trackGoogle("helpWindow", "click_selfHelp");
                this.closeWindow();
                break;
            case "tour_button":
                this._habboHelp.guideHelpManager.createHelpRequest((this._habboHelp.newIdentity ? 0 : 2) >>> 0);
                this._habboHelp.trackGoogle("helpWindow", "click_userTour");
                this.closeWindow();
                break;
            case "bully_button":
                this.closeWindow();
                this._habboHelp.toggleNewHelpWindow();
                this._habboHelp.trackGoogle("helpWindow", "click_reportBully");
                break;
            case "instructions_button":
                this._habboHelp.guideHelpManager.createHelpRequest(1);
                this._habboHelp.trackGoogle("helpWindow", "click_instructions");
                this.closeWindow();
                break;
            case "safetybooklet_link":
                this._habboHelp.showSafetyBooklet();
                this._habboHelp.trackGoogle("helpWindow", "click_showSafetyBooklet");
                this.closeWindow();
                break;
            case "habboway_link":
                if (this._habboHelp.getBoolean("habboway.enabled")) {
                    this._habboHelp.showHabboWay();
                } else {
                    HabboWebTools.openWebPage(this._habboHelp.getProperty("habboway.url"), "habboMain");
                }
                this._habboHelp.trackGoogle("helpWindow", "click_habboWay");
                this.closeWindow();
                break;
            case "faq_link":
                this._habboHelp.openCfhFaq();
                break;
            case "sanction_info_link":
                this._habboHelp.requestSanctionInfo(false);
                this.closeWindow();
                break;
            case "reports_status":
                this._habboHelp.requestReportsStatus();
                this.closeWindow();
                break;
            case "submit_button":
                if (this._SafeStr_2630) {
                    this.submitCallForHelp(true);
                    this.closeWindow();
                } else {
                    this._habboHelp.windowManager.alertWithModal("${generic.alert.title}", "${help.cfh.error.notopic}", 0, null);
                }
        }
    };

    public submitCallForHelp(param1: boolean): void {
        if (!this._message || !this._SafeStr_2630 || !this._habboHelp) {
            return;
        }
        let _loc2_: string = "";
        let _loc3_: string = "";
        if (this._unlawfulCategories.indexOf(this._SafeStr_3950) > -1) {
            _loc2_ = castGuarded(castGuarded(this._view.findChildByName("help_message_name"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow").widget, isIIlluminaInputWidget, "com.sulake.habbo.window.widgets.IIlluminaInputWidget").message;
            _loc3_ = castGuarded(castGuarded(this._view.findChildByName("help_message_email"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow").widget, isIIlluminaInputWidget, "com.sulake.habbo.window.widgets.IIlluminaInputWidget").message;
        }
        this._habboHelp.ignoreAndUnfriendReportedUser(this._SafeStr_2630.id);
        switch (this._SafeStr_2888 - 3) {
            case 0:
                this._habboHelp.sendMessage(new CallForHelpFromIMMessageComposer(this._message, this._SafeStr_2630.id, this._habboHelp.reportedUserId, this._habboHelp.callForHelpManager.chatReportController.collectSelectedEntries(3, this._habboHelp.reportedUserId), _loc2_, _loc3_));
                break;
            case 1:
                this._habboHelp.sendMessage(new CallForHelpMessageComposer(this._message, this._SafeStr_2630.id, -1, this._habboHelp.reportedRoomId, [], _loc2_, _loc3_));
                break;
            case 4:
                this._habboHelp.sendMessage(new CallForHelpFromForumThreadMessageComposer(this._habboHelp.callForHelpManager.reportedGroupId, this._habboHelp.callForHelpManager.reportedThreadId, this._SafeStr_2630.id, this._message, _loc2_, _loc3_));
                break;
            case 5:
                this._habboHelp.sendMessage(new CallForHelpFromForumMessageMessageComposer(this._habboHelp.callForHelpManager.reportedGroupId, this._habboHelp.callForHelpManager.reportedThreadId, this._habboHelp.callForHelpManager.reportedMessageId, this._SafeStr_2630.id, this._message, _loc2_, _loc3_));
                break;
            case 6:
                this._habboHelp.sendMessage(new CallForHelpFromPhotoMessageComposer(this._habboHelp.reportedExtraDataId, this._habboHelp.reportedRoomId, this._habboHelp.reportedUserId, this._SafeStr_2630.id, this._habboHelp.reportedRoomObjectId, _loc2_, _loc3_));
                break;
            default:
                if (param1 && this._SafeStr_2630.name == "bullying" && this._habboHelp.getBoolean("guides.enabled") && this._habboHelp.guardiansEnabled) {
                    this._habboHelp.sendMessage(new ChatReviewSessionCreateMessageComposer(this._habboHelp.reportedUserId, this._habboHelp.reportedRoomId));
                    break;
                }
                this._habboHelp.sendMessage(new CallForHelpMessageComposer(this._message, this._SafeStr_2630.id, this._habboHelp.reportedUserId, this._habboHelp.reportedRoomId, this._habboHelp.callForHelpManager.chatReportController.collectSelectedEntries(1, -1), _loc2_, _loc3_));
        }
    }

    private populateUsers(): boolean {
        let _loc5_: any = undefined;
        let _loc1_: IWindowContainer = null;
        let _loc2_: boolean = false;
        this._SafeStr_3553.removeListItems();
        let _loc3_: number = 0;
        let _loc6_: boolean = false;
        for (const _loc4_ of valuesOf(this._habboHelp.userRegistry.getRegistry())) {
            _loc5_ = this._habboHelp.chatRegistry.getItemsByUser(_loc4_.userId | 0);
            if (_loc5_.length != 0) {
                _loc1_ = asGuarded(this._SafeStr_7224.clone(), isIWindowContainer);
                _loc2_ = _loc4_.userId == this._habboHelp.reportedUserId;
                _loc1_.name = stringOrNull(_loc4_.userId.toString());
                _loc1_.findChildByName("user_bg").blend = _loc2_ ? 1 : 0;
                _loc1_.procedure = this.onUserSelectEvent;
                _loc1_.findChildByName("user_name").caption = stringOrNull(_loc4_.userName);
                _loc1_.findChildByName("room_name").id = _loc4_.roomId | 0;
                if (_loc2_) {
                    this._habboHelp.reportedRoomId = _loc4_.roomId | 0;
                }
                _loc1_.findChildByName("room_name").caption = _loc4_.roomName != "" ? this._habboHelp.localization.getLocalizationWithParams("help.emergency.main.step.two.room.name", "", "room_name", _loc4_.roomName) : "";
                castGuarded(castGuarded(_loc1_.findChildByName("user_avatar"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow").widget, isIAvatarImageWidget, "com.sulake.habbo.window.widgets.IAvatarImageWidget").figure = stringOrNull(_loc4_.figure);
                this._SafeStr_3553.addListItemAt(_loc1_, _loc3_ >>> 0);
                if (_loc2_) {
                    _loc3_ = 1;
                    _loc6_ = true;
                }
            }
        }
        if (!_loc6_) {
            this._habboHelp.reportedUserId = -1;
            this._habboHelp.reportedRoomId = -1;
        }
        return this._SafeStr_3553.numListItems > 0;
    }

    private refreshUserList(): void {
        let _loc2_: number = 0;
        let _loc1_: IWindowContainer = null;
        _loc2_ = 0;
        while (_loc2_ < this._SafeStr_3553.numListItems) {
            _loc1_ = castGuarded(this._SafeStr_3553.getListItemAt(_loc2_ >>> 0), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
            _loc1_.findChildByName("user_bg").blend = (Number(_loc1_.name) | 0) == this._habboHelp.reportedUserId ? 1 : 0;
            _loc2_++;
        }
    }

    private onUserSelectEvent = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK") {
            this.selectUserToReport(isIWindowContainer(param2) ? param2 : null);
        }
    };

    private selectUserToReport(param1: IWindowContainer): void {
        let _loc2_: number = Number(param1.name) | 0;
        this._habboHelp.reportedUserId = _loc2_;
        this._habboHelp.reportedRoomId = param1.findChildByName("room_name").id;
        this.refreshUserList();
    }

    private populateRoomReportButton(): void {
        this._SafeStr_2543.destroyListItems();
        let _loc3_: number = this._SafeStr_2543.height;
        this._SafeStr_2543.height = 0;
        this._SafeStr_2543.height = _loc3_;
        let _loc2_: number = 34;
        let _loc5_: string = "inappropiate_room_group_event";
        let _loc4_: IWindowContainer = asGuarded(this._SafeStr_5127.clone(), isIWindowContainer);
        this._habboHelp.localization.registerParameter("help.cfh.topic." + _loc2_, "name", this._reportedUserName);
        let _loc1_: ITextWindow = asGuarded(_loc4_.findChildByName("name"), isITextWindow);
        _loc1_.caption = "${help.cfh.topic." + _loc2_ + "}";
        if (_loc1_.height < _loc1_.textHeight) {
            _loc1_.height = _loc1_.textHeight + 5 | 0;
        }
        if (_loc4_.height < _loc1_.height + _loc1_.y * 2 + 5) {
            _loc4_.height = _loc1_.height + _loc1_.y * 2 + 5;
        }
        _loc4_.name = _loc5_;
        _loc4_.addEventListener("WME_CLICK", this.onReportTopic);
        this._SafeStr_2543.addListItem(_loc4_);
        this._SafeStr_3950 = "room_report";
    }

    private populateReasons(): void {
        let _loc1_: IWindowContainer = null;
        this._SafeStr_2543.destroyListItems();
        for (const _loc2_ of this._habboHelp.callForHelpCategories ?? []) {
            _loc1_ = asGuarded(this._SafeStr_5127.clone(), isIWindowContainer);
            _loc1_.findChildByName("name").caption = "${help.cfh.reason." + _loc2_.name + "}";
            _loc1_.name = _loc2_.name;
            _loc1_.addEventListener("WME_CLICK", this.populateTopicsEvent);
            this._SafeStr_2543.addListItem(_loc1_);
        }
    }

    private populateTopicsEvent = (param1: WindowEvent): void => {
        let _loc2_: IWindow = param1.target;
        this.populateTopics(_loc2_.name);
        this._SafeStr_3950 = _loc2_.name;
    };

    private populateTopics(param1: string): boolean {
        let _loc5_: any = undefined;
        let _loc3_: number = 0;
        let _loc4_: IWindowContainer = null;
        let _loc2_: ITextWindow = null;
        for (const _loc7_ of this._habboHelp.callForHelpCategories ?? []) {
            if (_loc7_.name == param1) {
                _loc5_ = _loc7_.topics;
                break;
            }
        }
        if (_loc5_ && _loc5_.length > 0) {
            this._SafeStr_2543.destroyListItems();
            _loc3_ = this._SafeStr_2543.height;
            this._SafeStr_2543.height = 0;
            this._SafeStr_2543.height = _loc3_;
            for (const _loc6_ of valuesOf(_loc5_)) {
                _loc4_ = asGuarded(this._SafeStr_5127.clone(), isIWindowContainer);
                this._habboHelp.localization.registerParameter("help.cfh.topic." + _loc6_.id, "name", this._reportedUserName);
                _loc2_ = asGuarded(_loc4_.findChildByName("name"), isITextWindow);
                _loc2_.caption = "${help.cfh.topic." + _loc6_.id + "}";
                if (_loc2_.height < _loc2_.textHeight) {
                    _loc2_.height = _loc2_.textHeight + 5 | 0;
                }
                if (_loc4_.height < _loc2_.height + _loc2_.y * 2 + 5) {
                    _loc4_.height = _loc2_.height + _loc2_.y * 2 + 5;
                }
                _loc4_.name = stringOrNull(_loc6_.name);
                _loc4_.addEventListener("WME_CLICK", this.onReportTopic);
                this._SafeStr_2543.addListItem(_loc4_);
            }
            this._SafeStr_2865 = "topic_container";
            this.updateBackButtonVisibility();
            return true;
        }
        return false;
    }

    private populateChatMessage(): void {
        let _loc1_: IWindowContainer = null;
        let _loc2_: ITextLinkWindow = null;
        let _loc3_: ICheckBoxWindow = null;
        this._SafeStr_3406.removeListItems();
        this._habboHelp.chatRegistry.holdPurges = true;
        let _loc4_: ChatRegistryItem[] = this._habboHelp.reportedUserId > 0 ? this._habboHelp.chatRegistry.getItemsByUser(this._habboHelp.reportedUserId) : this._habboHelp.chatRegistry.getItems();
        Logger.log("Found chat items: " + _loc4_.length + " from user:" + this._habboHelp.reportedUserId);
        for (const _loc5_ of _loc4_ ?? []) {
            if (_loc5_.userId != this._habboHelp.ownUserId) {
                _loc1_ = asGuarded(this._SafeStr_5695.clone(), isIWindowContainer);
                _loc2_ = asGuarded(_loc1_.findChildByName("chat_text"), isITextLinkWindow);
                _loc2_.caption = _loc5_.text;
                if (_loc2_.height < _loc2_.textHeight) {
                    _loc2_.height = _loc2_.textHeight + 5 | 0;
                }
                if (_loc1_.height < _loc2_.height + _loc2_.y * 2) {
                    _loc1_.height = _loc2_.height + _loc2_.y * 2;
                }
                _loc1_.id = _loc5_.index;
                _loc1_.procedure = this.onChatEntryEvent;
                _loc3_ = asGuarded(_loc1_.findChildByName("chat_check"), isICheckBoxWindow);
                _loc3_.isSelected = _loc5_.selected;
                this._SafeStr_3406.addListItem(_loc1_);
            }
        }
    }

    private deselectChatEntries(): void {
        let _loc3_: any;
        for (const _loc2_ of valuesOf(this._habboHelp.instantMessageRegistry.getItems())) {
            for (_loc3_ of valuesOf(_loc2_)) {
                _loc3_.selected = false;
            }
        }
        for (const _loc1_ of this._habboHelp.chatRegistry.getItems() ?? []) {
            _loc1_.selected = false;
        }
    }

    private onChatEntryEvent = (param1: WindowEvent, param2: IWindow): void => {
        let _loc3_: number = 0;
        let _loc4_: ICheckBoxWindow = null;
        let _loc5_: ChatRegistryItem = null;
        if (param1.type == "WME_CLICK") {
            _loc3_ = param2.id;
            if (isITextLinkWindow(param2)) {
                _loc3_ = param2.parent.id;
                _loc4_ = asGuarded((asGuarded(param2.parent, isIWindowContainer)).findChildByName("chat_check"), isICheckBoxWindow);
            }
            if (isICheckBoxWindow(param2)) {
                _loc3_ = param2.parent.id;
                _loc4_ = isICheckBoxWindow(param2) ? param2 : null;
            }
            _loc5_ = this._habboHelp.chatRegistry.getItem(_loc3_ >>> 0);
            if (!_loc5_) {
                return;
            }
            if (!_loc5_.selected && _loc5_.roomId != this._habboHelp.reportedRoomId) {
                this._habboHelp.reportedRoomId = _loc5_.roomId;
            }
            _loc5_.selected = !_loc5_.selected;
            _loc4_.isSelected = _loc5_.selected;
        }
    };

    private populateInstantMessages(): void {
        let _loc1_: IWindowContainer = null;
        let _loc2_: ICheckBoxWindow = null;
        this._SafeStr_3406.removeListItems();
        this._habboHelp.instantMessageRegistry.holdPurges = true;
        let _loc3_: InstantMessageRegistryItem[] = this._habboHelp.instantMessageRegistry.getItemsByUser(this._habboHelp.reportedUserId);
        for (const _loc4_ of _loc3_ ?? []) {
            _loc1_ = asGuarded(this._SafeStr_5695.clone(), isIWindowContainer);
            _loc1_.findChildByName("chat_text").caption = _loc4_.text;
            _loc1_.id = _loc4_.index;
            _loc1_.procedure = this.onInstantMessageEntryEvent;
            _loc2_ = asGuarded(_loc1_.findChildByName("chat_check"), isICheckBoxWindow);
            _loc2_.isSelected = _loc4_.selected;
            this._SafeStr_3406.addListItem(_loc1_);
        }
    }

    private onInstantMessageEntryEvent = (param1: WindowEvent, param2: IWindow): void => {
        let _loc3_: number = 0;
        let _loc4_: ICheckBoxWindow = null;
        let _loc5_: InstantMessageRegistryItem = null;
        if (param1.type == "WME_CLICK") {
            _loc3_ = param2.id;
            if (isITextLinkWindow(param2)) {
                _loc3_ = param2.parent.id;
                _loc4_ = asGuarded((asGuarded(param2.parent, isIWindowContainer)).findChildByName("chat_check"), isICheckBoxWindow);
            } else if (isICheckBoxWindow(param2)) {
                _loc3_ = param2.parent.id;
                _loc4_ = isICheckBoxWindow(param2) ? param2 : null;
            }
            _loc5_ = this._habboHelp.instantMessageRegistry.getItem(this._habboHelp.reportedUserId, _loc3_ >>> 0);
            if (_loc5_) {
                _loc5_.selected = !_loc5_.selected;
                _loc4_.isSelected = _loc5_.selected;
            }
        }
    };

    private onReportTopic = (param1: WindowEvent = null): void => {
        if (this._SafeStr_2711 == null) {
            this.openWindow();
        }
        this._SafeStr_2630 = this.getTopic(param1.target.name);
        this.showContainer("message_container");
    };

    private isNotNeededToSelectUser(): boolean {
        return this._SafeStr_2888 == 4 || this._SafeStr_2888 == 7 || this._SafeStr_2888 == 8;
    }

    private showReasons(param1: number): boolean {
        if (this.isNotNeededToSelectUser() || this.verifyUserSelected()) {
            this.showContainer("reason_container");
            if (param1 == 4) {
                this.populateRoomReportButton();
            } else {
                this.populateReasons();
            }
            return true;
        }
        return false;
    }

    private userChatLinesAvailable(): boolean {
        this.populateUsers();
        if (this._habboHelp.reportedUserId <= 0) {
            this._habboHelp.windowManager.alertWithModal("${generic.alert.title}", "${help.cfh.error.no_user_data}", 0, null);
            this.closeWindow();
            return false;
        }
        return true;
    }

    private getTopic(param1: string): CallForHelpTopicData {
        let _loc2_: any;
        for (const _loc3_ of this._habboHelp.callForHelpCategories ?? []) {
            for (_loc2_ of _loc3_.topics ?? []) {
                if (_loc2_.name == param1) {
                    return _loc2_;
                }
            }
        }
        return null;
    }

    private updateUserData(): void {
        let _loc1_: UserRegistryItem = null;
        switch (this._SafeStr_2888 - 4) {
            case 0:
                this._view.findChildByName("reported_user_avatar").visible = false;
                this._view.findChildByName("user_info_title").visible = false;
                this._view.findChildByName("reported_user_name").caption = this._habboHelp.callForHelpManager.reportedRoomName;
                break;
            case 3:
            case 4:
                this._view.findChildByName("reported_user_avatar").visible = false;
                this._view.findChildByName("user_info_title").visible = false;
                this._view.findChildByName("reported_user_name").visible = false;
                break;
            default:
                if (this._habboHelp.reportedUserId > 0) {
                    _loc1_ = this._habboHelp.userRegistry.getEntry(this._habboHelp.reportedUserId);
                    if (_loc1_) {
                        this._reportedUserName = _loc1_.userName;
                        castGuarded(castGuarded(this._view.findChildByName("reported_user_avatar"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow").widget, isIAvatarImageWidget, "com.sulake.habbo.window.widgets.IAvatarImageWidget").figure = _loc1_.figure;
                    } else {
                        this._view.findChildByName("reported_user_avatar").visible = false;
                        this._reportedUserName = this._habboHelp.reportedUserName;
                    }
                    this._view.findChildByName("reported_user_name").caption = this._reportedUserName;
                }
        }
    }

    get [IDisposable](): true {
        return true;
    }
}
