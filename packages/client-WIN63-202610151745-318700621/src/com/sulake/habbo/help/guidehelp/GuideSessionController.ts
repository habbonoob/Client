import { asGuarded, asInstanceOf, castGuarded, castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { ICheckBoxWindow } from '@/com/sulake/core/window/components/ICheckBoxWindow';
import type { IDesktopWindow } from '@/com/sulake/core/window/components/IDesktopWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IConfirmDialog } from '@/com/sulake/core/window/utils/IConfirmDialog';
import type { ChatReviewSessionResultsMessageParser } from '@/com/sulake/habbo/communication/messages/parser/help/ChatReviewSessionResultsMessageParser';
import type { ChatReviewSessionStartedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/help/ChatReviewSessionStartedMessageParser';
import type { GuideOnDutyStatusMessageParser } from '@/com/sulake/habbo/communication/messages/parser/help/GuideOnDutyStatusMessageParser';
import type { GuideSessionErrorMessageParser } from '@/com/sulake/habbo/communication/messages/parser/help/GuideSessionErrorMessageParser';
import type { GuideSessionPartnerIsTypingMessageParser } from '@/com/sulake/habbo/communication/messages/parser/help/GuideSessionPartnerIsTypingMessageParser';
import type { PerkAllowancesMessageParser } from '@/com/sulake/habbo/communication/messages/parser/perk/PerkAllowancesMessageParser';
import type { GuideHelpManager } from '@/com/sulake/habbo/help/GuideHelpManager';
import type { HabboHelp } from '@/com/sulake/habbo/help/HabboHelp';
import type { ICountdownWidget } from '@/com/sulake/habbo/window/widgets/ICountdownWidget';
import type { IIlluminaChatBubbleWidget } from '@/com/sulake/habbo/window/widgets/IIlluminaChatBubbleWidget';
import type { IIlluminaInputHandler } from '@/com/sulake/habbo/window/widgets/IIlluminaInputHandler';
import type { IIlluminaInputWidget } from '@/com/sulake/habbo/window/widgets/IIlluminaInputWidget';
import type { MouseEvent } from '@habbo-pixi/runtime/events/MouseEvent';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isICheckBoxWindow } from '@/com/sulake/core/window/components/ICheckBoxWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { ChatReviewSessionDetachedMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/help/ChatReviewSessionDetachedMessageEvent';
import { ChatReviewSessionOfferedToGuideMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/help/ChatReviewSessionOfferedToGuideMessageEvent';
import { ChatReviewSessionResultsMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/help/ChatReviewSessionResultsMessageEvent';
import { ChatReviewSessionStartedMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/help/ChatReviewSessionStartedMessageEvent';
import { ChatReviewSessionVotingStatusMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/help/ChatReviewSessionVotingStatusMessageEvent';
import { GuideOnDutyStatusMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/help/GuideOnDutyStatusMessageEvent';
import { GuideSessionAttachedMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/help/GuideSessionAttachedMessageEvent';
import { GuideSessionDetachedMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/help/GuideSessionDetachedMessageEvent';
import { GuideSessionEndedMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/help/GuideSessionEndedMessageEvent';
import { GuideSessionErrorMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/help/GuideSessionErrorMessageEvent';
import { GuideSessionInvitedToGuideRoomMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/help/GuideSessionInvitedToGuideRoomMessageEvent';
import { GuideSessionMessageMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/help/GuideSessionMessageMessageEvent';
import { GuideSessionPartnerIsTypingMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/help/GuideSessionPartnerIsTypingMessageEvent';
import { GuideSessionRequesterRoomMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/help/GuideSessionRequesterRoomMessageEvent';
import { GuideSessionStartedMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/help/GuideSessionStartedMessageEvent';
import { PerkAllowancesMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/perk/PerkAllowancesMessageEvent';
import { ChatReviewGuideDecidesOnOfferMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/help/ChatReviewGuideDecidesOnOfferMessageComposer';
import { ChatReviewGuideDetachedMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/help/ChatReviewGuideDetachedMessageComposer';
import { ChatReviewGuideVoteMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/help/ChatReviewGuideVoteMessageComposer';
import { GuideSessionCreateMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/help/GuideSessionCreateMessageComposer';
import { GuideSessionFeedbackMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/help/GuideSessionFeedbackMessageComposer';
import { GuideSessionGetRequesterRoomMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/help/GuideSessionGetRequesterRoomMessageComposer';
import { GuideSessionGuideDecidesMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/help/GuideSessionGuideDecidesMessageComposer';
import { GuideSessionInviteRequesterMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/help/GuideSessionInviteRequesterMessageComposer';
import { GuideSessionIsTypingMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/help/GuideSessionIsTypingMessageComposer';
import { GuideSessionMessageMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/help/GuideSessionMessageMessageComposer';
import { GuideSessionOnDutyUpdateMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/help/GuideSessionOnDutyUpdateMessageComposer';
import { GuideSessionReportMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/help/GuideSessionReportMessageComposer';
import { GuideSessionRequesterCancelsMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/help/GuideSessionRequesterCancelsMessageComposer';
import { GuideSessionResolvedMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/help/GuideSessionResolvedMessageComposer';
import { GetTalentTrackMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/talent/GetTalentTrackMessageComposer';
import { GetExtendedProfileMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/GetExtendedProfileMessageComposer';
import { GetHabboGroupDetailsMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/GetHabboGroupDetailsMessageComposer';
import { GuideSessionAttachedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/help/GuideSessionAttachedMessageParser';
import { GuideSessionEndedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/help/GuideSessionEndedMessageParser';
import { GuideSessionInvitedToGuideRoomMessageParser } from '@/com/sulake/habbo/communication/messages/parser/help/GuideSessionInvitedToGuideRoomMessageParser';
import { GuideSessionMessageMessageParser } from '@/com/sulake/habbo/communication/messages/parser/help/GuideSessionMessageMessageParser';
import { GuideSessionRequesterRoomMessageParser } from '@/com/sulake/habbo/communication/messages/parser/help/GuideSessionRequesterRoomMessageParser';
import { GuideSessionStartedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/help/GuideSessionStartedMessageParser';
import { AnimationData } from '@/com/sulake/habbo/help/guidehelp/AnimationData';
import { GuideSessionData } from '@/com/sulake/habbo/help/guidehelp/GuideSessionData';
import { Logger } from '@/com/sulake/habbo/Logger';
import { FriendlyTime } from '@/com/sulake/habbo/utils/FriendlyTime';
import { HabboWebTools } from '@/com/sulake/habbo/utils/HabboWebTools';
import { isIAvatarImageWidget } from '@/com/sulake/habbo/window/widgets/IAvatarImageWidget';
import { isICountdownWidget } from '@/com/sulake/habbo/window/widgets/ICountdownWidget';
import { isIIlluminaChatBubbleWidget } from '@/com/sulake/habbo/window/widgets/IIlluminaChatBubbleWidget';
import { isIIlluminaInputWidget } from '@/com/sulake/habbo/window/widgets/IIlluminaInputWidget';
import { StringUtil } from '@/mx/utils/StringUtil';

export class GuideSessionController implements IDisposable, IIlluminaInputHandler {
    static { registerClassName(this, 'com.sulake.habbo.help.guidehelp::GuideSessionController'); }

    private static readonly SYSTEM_MSG_CHAT: number = 0;
    private static readonly SYSTEM_MSG_NOTIFICATION: number = 1;
    private static readonly SYSTEM_MSG_REMINDER: number = 2;
    private static readonly CHAT_MSG_DEFAULT: number = 0;
    private static readonly CHAT_MSG_INVITE: number = 1;
    private static readonly CHAT_MSG_SYSTEM: number = 2;
    private static readonly CHAT_REVIEW_VOTE_NONE: number = -1;
    private static readonly CHAT_REVIEW_VOTE_OK: number = 0;
    private static readonly CHAT_REVIEW_VOTE_BAD: number = 1;
    private static readonly CHAT_REVIEW_VOTE_VERY_BAD: number = 2;
    private static readonly _SafeStr_8261: number = 3000;
    private static readonly _SafeStr_7686: number = 500;

    private static readonly STATUS_KEY_PREFIX: string = "${guide.bully.request.guide.results.outcome.";

    private static readonly STATUS_ICON_PREFIX: string = "help_chat_review_decision_";
    private static readonly STATUS_KEYS: any[] = ["waiting", "ok", "bad", "very_bad", "refused", "searching"];
    private static readonly RESULT_KEYS: any[] = ["waiting", "ok", "bad", "very_bad", "inconclusive", "searching"];

    declare private _habboHelp: HabboHelp;

    declare private _guideHelp: GuideHelpManager;

    declare private _window: IWindowContainer;

    declare private _SafeStr_2415: IWindowContainer;

    declare private _sessionData: GuideSessionData;

    private _SafeStr_4016: Point = new Point(120, 80);
    private _onDuty: boolean = false;

    declare private _SafeStr_3424: boolean;
    static { (this.prototype as any)._SafeStr_3424 = false; }

    declare private _SafeStr_3515: boolean;
    static { (this.prototype as any)._SafeStr_3515 = false; }

    declare private _SafeStr_3382: boolean;
    static { (this.prototype as any)._SafeStr_3382 = false; }

    private _SafeStr_6354: boolean = false;

    declare private _chatMsg: IWidgetWindow;

    declare private _SafeStr_4201: IWindowContainer;

    declare private _SafeStr_6583: IWindowContainer;

    private _disposed: boolean = false;

    declare private _SafeStr_2618: Timer;

    declare private _lastMessageTypedLength: number;
    static { (this.prototype as any)._lastMessageTypedLength = 0; }

    declare private _lastTypingInfo: boolean;
    static { (this.prototype as any)._lastTypingInfo = false; }

    declare private _SafeStr_3252: Timer;

    declare private _SafeStr_2905: AnimationData[];

    declare private _SafeStr_3527: Timer;

    declare private _SafeStr_4919: number;
    static { (this.prototype as any)._SafeStr_4919 = 0; }

    constructor(param1: GuideHelpManager) {
        this._habboHelp = param1.habboHelp;
        this._guideHelp = param1;
        this._sessionData = new GuideSessionData();
        this._chatMsg = castGuarded(this._habboHelp.getXmlWindow("chat_msg"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow");
        this._SafeStr_4201 = castGuarded(this._habboHelp.getXmlWindow("chat_msg_notification"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        this._SafeStr_6583 = castGuarded(this._habboHelp.getXmlWindow("chat_msg_reminder"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        this._SafeStr_3424 = this._habboHelp.getBoolean("guidetool.handle.help_requests");
        this._SafeStr_3515 = this._habboHelp.getBoolean("guidetool.handle.chat_reviews");
        this._SafeStr_3382 = this._habboHelp.getBoolean("guidetool.handle.tour_requests");
        this._habboHelp.context.displayObjectContainer.stage.addEventListener("mouseMove", this.onStageMouseMove);
        this._SafeStr_2905 = [];
        this._SafeStr_3252 = new Timer(500);
        this._SafeStr_3252.addEventListener("timer", this.onWaitingAnimationTimer);
        this._SafeStr_3252.start();
        this._SafeStr_4919 = getTimer();
        this._SafeStr_3527 = new Timer(5000);
        this._SafeStr_3527.addEventListener("timer", this.onIdleCheckTimer);
        this._SafeStr_3527.start();
        this._habboHelp.communicationManager.addHabboConnectionMessageEvent(new GuideSessionInvitedToGuideRoomMessageEvent(this.onGuideSessionInvitedToGuideRoom));
        this._habboHelp.communicationManager.addHabboConnectionMessageEvent(new GuideSessionStartedMessageEvent(this.onGuideSessionStarted));
        this._habboHelp.communicationManager.addHabboConnectionMessageEvent(new GuideSessionErrorMessageEvent(this.onGuideSessionError));
        this._habboHelp.communicationManager.addHabboConnectionMessageEvent(new GuideSessionMessageMessageEvent(this.onGuideSessionMessage));
        this._habboHelp.communicationManager.addHabboConnectionMessageEvent(new ChatReviewSessionStartedMessageEvent(this.onChatReviewSessionStarted));
        this._habboHelp.communicationManager.addHabboConnectionMessageEvent(new GuideSessionDetachedMessageEvent(this.onGuideSessionDetached));
        this._habboHelp.communicationManager.addHabboConnectionMessageEvent(new GuideSessionPartnerIsTypingMessageEvent(this.onGuideSessionPartnerIsTyping));
        this._habboHelp.communicationManager.addHabboConnectionMessageEvent(new GuideSessionEndedMessageEvent(this.onGuideSessionEnded));
        this._habboHelp.communicationManager.addHabboConnectionMessageEvent(new ChatReviewSessionResultsMessageEvent(this.onChatReviewSessionResults));
        this._habboHelp.communicationManager.addHabboConnectionMessageEvent(new GuideOnDutyStatusMessageEvent(this.onGuideOnDutyStatus));
        this._habboHelp.communicationManager.addHabboConnectionMessageEvent(new ChatReviewSessionVotingStatusMessageEvent(this.onChatReviewSessionVotingStatus));
        this._habboHelp.communicationManager.addHabboConnectionMessageEvent(new GuideSessionRequesterRoomMessageEvent(this.onGuideSessionRequesterRoom));
        this._habboHelp.communicationManager.addHabboConnectionMessageEvent(new PerkAllowancesMessageEvent(this.onPerkAllowances));
        this._habboHelp.communicationManager.addHabboConnectionMessageEvent(new GuideSessionAttachedMessageEvent(this.onGuideSessionAttached));
        this._habboHelp.communicationManager.addHabboConnectionMessageEvent(new ChatReviewSessionOfferedToGuideMessageEvent(this.onChatReviewSessionOfferedToGuide));
        this._habboHelp.communicationManager.addHabboConnectionMessageEvent(new ChatReviewSessionDetachedMessageEvent(this.onChatReviewSessionDetached));
    }

    private static statusFromVote(param1: number): number {
        let _loc2_: number = 0;
        switch (param1 - -1) {
            case 0:
                _loc2_ = 4;
                break;
            case 1:
                _loc2_ = 1;
                break;
            case 2:
                _loc2_ = 2;
                break;
            case 3:
                _loc2_ = 3;
        }
        return _loc2_;
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        if (this._SafeStr_3527 != null) {
            this._SafeStr_3527.stop();
            this._SafeStr_3527.removeEventListener("timer", this.onIdleCheckTimer);
            this._SafeStr_3527 = null;
        }
        if (this._SafeStr_3252 != null) {
            this._SafeStr_3252.stop();
            this._SafeStr_3252.removeEventListener("timer", this.onWaitingAnimationTimer);
            this._SafeStr_3252 = null;
        }
        this._SafeStr_2905 = null;
        if (this._chatMsg) {
            this._chatMsg.dispose();
            this._chatMsg = null;
        }
        if (this._SafeStr_4201) {
            this._SafeStr_4201.dispose();
            this._SafeStr_4201 = null;
        }
        this.closeWindow();
        this._sessionData = null;
        this._SafeStr_4016 = null;
        this._guideHelp = null;
        if (this._habboHelp && this._habboHelp.context && this._habboHelp.context.displayObjectContainer) {
            this._habboHelp.context.displayObjectContainer.stage.removeEventListener("mouseMove", this.onStageMouseMove);
        }
        this._habboHelp = null;
        this._disposed = true;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public createHelpRequest(param1: number): void {
        if (this._sessionData.isActiveSession()) {
            Logger.log("Can\'t create a new help request while another help request is ongoing");
            return;
        }
        if (param1 == 0 || param1 == 2) {
            this._sessionData.role = 2;
            this._sessionData.activeWindow = "user_create";
            this._sessionData.requestType = param1;
            this._habboHelp.sendMessage(new GuideSessionCreateMessageComposer(param1 | 0, this._habboHelp.localization.getLocalization("guide.help.request.tour.description")));
        } else {
            this.setStateUserCreateRequest(param1);
        }
    }

    public showGuideTool(): void {
        this._habboHelp.sendMessage(new GuideSessionOnDutyUpdateMessageComposer(this._onDuty, this._SafeStr_3382, this._SafeStr_3424, this._SafeStr_3515));
    }

    private onGuideOnDutyStatus = (param1: GuideOnDutyStatusMessageEvent): void => {
        let _loc2_: GuideOnDutyStatusMessageParser = param1.getParser();
        this._onDuty = _loc2_.onDuty;
        this._habboHelp.localization.registerParameter("guide.help.guide.tool.guidesonduty", "amount", _loc2_.guidesOnDuty.toString());
        this._habboHelp.localization.registerParameter("guide.help.guide.tool.helpersonduty", "amount", _loc2_.helpersOnDuty.toString());
        this._habboHelp.localization.registerParameter("guide.help.guide.tool.guardiansonduty", "amount", _loc2_.guardiansOnDuty.toString());
        this.setStateGuideTool();
    };

    private onGuideSessionAttached = (param1: IMessageEvent): void => {
        Logger.log("onGuideSessionAttached");
        if (this._disposed || !this._sessionData) {
            Logger.log("_diposed or no _sessionData");
            return;
        }
        let _loc2_: GuideSessionAttachedMessageParser = asInstanceOf(param1.parser, GuideSessionAttachedMessageParser);
        if (_loc2_.asGuide) {
            if (this._sessionData.isActiveGuideSession()) {
                this.setStateError();
                return;
            }
            this.setStateGuideAccept(_loc2_.helpRequestType, _loc2_.helpRequestDescription, _loc2_.roleSpecificWaitTime);
        } else {
            if (!this._sessionData.isActiveUserSession()) {
                this.setStateError();
                return;
            }
            this.setStateUserPendingRequest(_loc2_.helpRequestType, _loc2_.helpRequestDescription, _loc2_.roleSpecificWaitTime);
        }
    };

    private onGuideSessionDetached = (param1: IMessageEvent): void => {
        let _loc2_: number = 0;
        let _loc3_: string = null;
        Logger.log("onGuideSessionDetached");
        if (this._disposed) {
            return;
        }
        if (this._SafeStr_6354) {
            _loc2_ = this._sessionData.requestType | 0;
            _loc3_ = this._sessionData.requestDescription;
            this.resetSessionData();
            this.setStateUserCreateRequest(_loc2_ >>> 0, _loc3_);
        } else if (this._sessionData.isActiveUserSession() && this._sessionData.activeWindow == "user_feedback") {
            this.setStateUserThanks();
        } else {
            this.setStateClosed(true);
        }
    };

    private onGuideSessionStarted = (param1: IMessageEvent): void => {
        Logger.log("onGuideSessionStarted");
        if (this._disposed) {
            return;
        }
        let _loc2_: GuideSessionStartedMessageParser = asInstanceOf(param1.parser, GuideSessionStartedMessageParser);
        this._sessionData.userId = _loc2_.requesterUserId >>> 0;
        this._sessionData.userName = _loc2_.requesterName;
        this._sessionData.userFigure = _loc2_.requesterFigure;
        this._sessionData.guideId = _loc2_.guideUserId >>> 0;
        this._sessionData.guideName = _loc2_.guideName;
        this._sessionData.guideFigure = _loc2_.guideFigure;
        this._lastTypingInfo = false;
        if (this._sessionData.isActiveGuideSession()) {
            this.setStateGuideOngoing();
        } else {
            this.setStateUserOngoingRequest();
        }
    };

    private onGuideSessionEnded = (param1: IMessageEvent): void => {
        Logger.log("onGuideSessionEnded");
        if (this._disposed) {
            return;
        }
        let _loc2_: GuideSessionEndedMessageParser = asInstanceOf(param1.parser, GuideSessionEndedMessageParser);
        if (this._sessionData.isActiveGuideSession()) {
            this.setStateGuideClosed(_loc2_.endReason);
        } else if (_loc2_.endReason == 0) {
            this.setStateUserGuideDisconnected();
        } else {
            this.setStateUserFeedback();
        }
    };

    private onGuideSessionError = (param1: GuideSessionErrorMessageEvent): void => {
        Logger.log("onGuideSessionError");
        if (this._disposed) {
            return;
        }
        let _loc2_: GuideSessionErrorMessageParser = param1.getParser();
        switch (_loc2_.errorCode - 1) {
            case 0:
                this.setStateRejected();
                break;
            case 1:
            case 2:
                this.setStateClosedWithNotification("guide.bully.request.error.not_enough_guardians");
                break;
            default:
                this.setStateError();
        }
    };

    private onGuideSessionMessage = (param1: IMessageEvent): void => {
        let _loc4_: string = null;
        let _loc6_: string = null;
        Logger.log("onGuideSessionMessage");
        if (this._disposed || !this._sessionData.isOnGoingSession() || this._window == null) {
            return;
        }
        let _loc5_: GuideSessionMessageMessageParser = asInstanceOf(param1.parser, GuideSessionMessageMessageParser);
        let _loc3_: number = _loc5_.senderId;
        if (_loc3_ == this._sessionData.guideId) {
            _loc4_ = this._sessionData.guideName;
            _loc6_ = this._sessionData.guideFigure;
        } else {
            _loc4_ = this._sessionData.userName;
            _loc6_ = this._sessionData.userFigure;
        }
        let _loc2_: boolean = true;
        if (this._sessionData.isActiveGuideSession() && this._sessionData.guideId == _loc3_) {
            _loc2_ = false;
        } else if (!this._sessionData.isActiveGuideSession() && this._sessionData.userId == _loc3_) {
            _loc2_ = false;
        }
        this.addChatMessage(_loc3_, _loc4_, _loc6_, _loc5_.chatMessage, _loc2_);
    };

    private onGuideSessionRequesterRoom = (param1: IMessageEvent): void => {
        Logger.log("onGuideSessionRequesterRoom");
        if (this._disposed || !this._sessionData.isOnGoingSession()) {
            return;
        }
        let _loc2_: GuideSessionRequesterRoomMessageParser = asInstanceOf(param1.parser, GuideSessionRequesterRoomMessageParser);
        if (_loc2_.getRequesterRoomId() > 0) {
            this._habboHelp.roomSessionManager.gotoRoom(_loc2_.getRequesterRoomId());
        } else {
            this.addChatMessage(this._sessionData.guideId | 0, this._sessionData.guideName, this._sessionData.guideFigure, this._habboHelp.localization.getLocalization("guide.help.request.guide.ongoing.user.not.in.room.error", ""), false, 2);
        }
    };

    private onGuideSessionInvitedToGuideRoom = (param1: IMessageEvent): void => {
        Logger.log("onGuideSessionInvitedToGuideRoom");
        if (this._disposed || this._window == null || !this._sessionData.isOnGoingSession()) {
            return;
        }
        let _loc2_: GuideSessionInvitedToGuideRoomMessageParser = asInstanceOf(param1.parser, GuideSessionInvitedToGuideRoomMessageParser);
        if (this._sessionData.isActiveGuideSession()) {
            if (_loc2_.getRoomId() > 0) {
                this.addSystemMessage(0, this._habboHelp.localization.getLocalizationWithParams("guide.help.request.guide.ongoing.error.invite.success", "", "name", this._sessionData.userName));
            } else {
                this.addSystemMessage(0, this._habboHelp.localization.getLocalization("guide.help.request.guide.ongoing.error.invite.failed", ""));
            }
        } else if (_loc2_.getRoomId() > 0) {
            this.addChatMessage(this._sessionData.guideId | 0, this._sessionData.guideName, this._sessionData.guideFigure, this._habboHelp.localization.getLocalizationWithParams("guide.help.request.user.ongoing.visit.guide.request.message", "", "name", this._sessionData.guideName, "roomname", _loc2_.getRoomName()), true, 1, _loc2_.getRoomId());
        }
    };

    private onGuideSessionPartnerIsTyping = (param1: IMessageEvent): void => {
        Logger.log("onGuideSessionPartnerIsTyping");
        let _loc2_: GuideSessionPartnerIsTypingMessageParser = castTo(param1, GuideSessionPartnerIsTypingMessageEvent).getParser();
        this.displayPartnerIsTypingMessage(_loc2_.isTyping);
    };

    private onPerkAllowances = (param1: PerkAllowancesMessageEvent): void => {
        let _loc2_: PerkAllowancesMessageParser = null;
        if (this._sessionData.activeWindow == "guide_tool") {
            _loc2_ = param1.getParser();
            if (!_loc2_.isPerkAllowed("USE_GUIDE_TOOL")) {
                if (this._onDuty) {
                    this.setOnDuty(false);
                    this._habboHelp.sendMessage(new GuideSessionOnDutyUpdateMessageComposer(false, false, false, false));
                }
                this.setStateClosed(false);
            }
        }
    };

    private onChatReviewSessionOfferedToGuide = (param1: ChatReviewSessionOfferedToGuideMessageEvent): void => {
        this.setStateGuardianChatReviewAccept(param1.getParser().acceptanceTimeout);
    };

    private onChatReviewSessionStarted = (param1: ChatReviewSessionStartedMessageEvent): void => {
        let _loc2_: ChatReviewSessionStartedMessageParser = param1.getParser();
        this.setStateGuardianChatReviewVote(_loc2_.votingTimeout, _loc2_.chatRecord);
    };

    private onChatReviewSessionVotingStatus = (param1: ChatReviewSessionVotingStatusMessageEvent): void => {
        if (this._sessionData.activeWindow != "guardian_chat_review_wait_for_results") {
            return;
        }
        this.showStatus(asGuarded(this._window.findChildByName("results"), isIItemListWindow), param1.getParser().status);
    };

    private onChatReviewSessionResults = (param1: ChatReviewSessionResultsMessageEvent): void => {
        let _loc2_: ChatReviewSessionResultsMessageParser = param1.getParser();
        this.setStateGuardianChatReviewResults(_loc2_.winningVoteCode, _loc2_.ownVoteCode, _loc2_.finalStatus);
    };

    private onChatReviewSessionDetached = (param1: IMessageEvent): void => {
        this.setStateClosed(true);
    };

    private setStateGuideTool(): void {
        let _loc2_: IItemListWindow = null;
        let _loc1_: IWindowContainer = null;
        if (this._sessionData.isActiveSession()) {
            Logger.log("Trying to set state to guide tool, but an active session exists");
            return;
        }
        this._sessionData.activeWindow = "guide_tool";
        this.openWindow(this.onGuideToolEvent, true);
        this.setOnDutyStatus(this._onDuty);
        this._window.procedure = this.onGuideToolEvent;
        this.setCheckBoxValue("handle_guardian_tickets", this._SafeStr_3515);
        this.setCheckBoxValue("handle_helper_tickets", this._SafeStr_3424);
        this.setCheckBoxValue("handle_guide_tickets", this._SafeStr_3382);
        if (!this._habboHelp.sessionDataManager.isPerkAllowed("JUDGE_CHAT_REVIEWS")) {
            _loc2_ = castGuarded(this._window.findChildByName("list"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow");
            _loc1_ = asGuarded(_loc2_.getListItemByName("handle_selection_container"), isIWindowContainer);
            _loc1_.findChildByName("handle_guardian_tickets").dispose();
            _loc1_.findChildByName("selection_separator").y = _loc1_.findChildByName("selection_separator").y - 17;
            _loc1_.height -= 17;
        }
    }

    private onGuideToolEvent = (param1: WindowEvent, param2: IWindow): void => {
        let _loc4_: string = null;
        if (this.disposed || this._window == null || this._window.name != "guide_tool") {
            return;
        }
        let _loc3_: number = 0;
        switch (param2.name) {
            case "header_button_close":
                if (param1.type == "WME_CLICK") {
                    this.setStateClosed(false);
                }
                break;
            case "helper_group_link":
                if (param1.type == "WME_CLICK") {
                    _loc3_ = this._habboHelp.getInteger("guide.help.alpha.groupid", 0);
                    if (_loc3_ > 0) {
                        this._habboHelp.sendMessage(new GetHabboGroupDetailsMessageComposer(_loc3_, true));
                        this._habboHelp.trackGoogle("guideHelp", this._window.name + "_groupProfile");
                    }
                }
                break;
            case "guide_forum_link":
                if (param1.type == "WME_CLICK") {
                    _loc3_ = this._habboHelp.getInteger("guide.help.alpha.groupid", 0);
                    if (_loc3_ > 0) {
                        _loc4_ = this._habboHelp.getProperty("group.homepage.url");
                        _loc4_ = _loc4_.replace("%groupid%", String(_loc3_));
                        HabboWebTools.openWebPage(_loc4_, "habboMain");
                        this._habboHelp.trackGoogle("guideHelp", this._window.name + "_groupForum");
                    }
                }
                break;
            case "guide_tool_duty":
                switch (param1.type) {
                    case "WE_SELECTED":
                        this.setOnDutyStatus(true);
                        this._SafeStr_3424 = (asGuarded(this._window.findChildByName("handle_helper_tickets"), isICheckBoxWindow)).isSelected;
                        this._SafeStr_3515 = this._window.findChildByName("handle_guardian_tickets") != null && Boolean((asGuarded(this._window.findChildByName("handle_guardian_tickets"), isICheckBoxWindow)).isSelected);
                        this._SafeStr_3382 = (asGuarded(this._window.findChildByName("handle_guide_tickets"), isICheckBoxWindow)).isSelected;
                        if (!this._SafeStr_3424 && !this._SafeStr_3515 && !this._SafeStr_3382) {
                            this._habboHelp.windowManager.simpleAlert("${guide.help.guide.tool.noqueueselected.caption}", "${guide.help.guide.tool.noqueueselected.subtitle}", "${guide.help.guide.tool.noqueueselected.message}");
                            this.setOnDutyStatus(false);
                            return;
                        }
                        this._habboHelp.sendMessage(new GuideSessionOnDutyUpdateMessageComposer(true, this._SafeStr_3382, this._SafeStr_3424, this._SafeStr_3515));
                        this._habboHelp.trackGoogle("guideHelp", this._window.name + "_onDuty");
                        break;
                    case "WE_UNSELECTED":
                        this.setOnDutyStatus(false);
                        this._habboHelp.sendMessage(new GuideSessionOnDutyUpdateMessageComposer(false, false, false, false));
                        this._habboHelp.trackGoogle("guideHelp", this._window.name + "_offDuty");
                }
                break;
            case "guide_tool_talent":
                if (param1.type == "WME_CLICK") {
                    if (this._habboHelp.getBoolean("talent.track.enabled")) {
                        this._habboHelp.tracking.trackTalentTrackOpen("helper", "guidetool");
                        this._habboHelp.sendMessage(new GetTalentTrackMessageComposer("helper"));
                        this._habboHelp.trackGoogle("guideHelp", this._window.name + "_talent");
                    }
                }
        }
    };

    private setStateGuideAccept(param1: number, param2: string, param3: number): void {
        let _loc9_: IWindow = null;
        let _loc5_: ITextWindow = null;
        let _loc7_: IItemListWindow = null;
        let _loc6_: number = 0;
        let _loc4_: number = 0;
        if (!this._onDuty || this._sessionData.isActiveSession()) {
            Logger.log("Trying to set state to guide accept, but not on duty or active session exists");
            return;
        }
        this._sessionData.activeWindow = "guide_accept";
        this._sessionData.role = 1;
        this._sessionData.requestDescription = param2;
        this._sessionData.requestType = param1 >>> 0;
        this.openWindow(this.onGuideAcceptEvent, false);
        this._habboHelp.soundManager.playSound("HBST_guide_request");
        if (param1 == 2 || param1 == 0) {
            this._window.findChildByName("frank_greeting").visible = true;
            this._window.findChildByName("request_title").caption = "${guide.help.request.guide.accept.tour_request.title}";
            this._window.findChildByName("request_type").dispose();
            _loc9_ = this._window.findChildByName("request_description_wrapper");
            _loc5_ = asGuarded(this._window.findChildByName("request_description"), isITextWindow);
            _loc7_ = asGuarded(this._window.findChildByName("itemlist"), isIItemListWindow);
            _loc7_.addListItemAt(_loc5_, _loc7_.getListItemIndex(_loc9_) >>> 0);
            _loc7_.removeListItem(_loc9_);
            _loc5_.x = this._window.findChildByName("request_title").x;
            _loc5_.margins.top = 10;
            _loc5_.caption = param2;
            _loc6_ = _loc7_.height;
            _loc4_ = this._window.findChildByName("skip_link").bottom;
            _loc7_.height = _loc4_;
            this._window.findChildByName("border").height = this._window.findChildByName("border").height + (_loc4_ - _loc6_);
            this._window.height += _loc4_ - _loc6_ + 40;
        } else {
            this._window.findChildByName("request_type").caption = this.getRequestTypeCaption(param1);
            this._window.findChildByName("request_description").caption = param2;
        }
        let _loc8_: ICountdownWidget = castGuarded(castGuarded(this._window.findChildByName("countdown"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow").widget, isICountdownWidget, "com.sulake.habbo.window.widgets.ICountdownWidget");
        _loc8_.seconds = param3;
        _loc8_.running = true;
    }

    private onGuideAcceptEvent = (param1: WindowEvent, param2: IWindow): void => {
        if (this.disposed || this._window == null || this._window.name != "guide_accept" || param1.type != "WME_CLICK") {
            return;
        }
        switch (param2.name) {
            case "accept_button":
                this._habboHelp.sendMessage(new GuideSessionGuideDecidesMessageComposer(true));
                this._habboHelp.trackGoogle("guideHelp", this._window.name + "_clickAccept");
                this.closeWindow();
                break;
            case "skip_link":
                this._habboHelp.sendMessage(new GuideSessionGuideDecidesMessageComposer(false));
                this._habboHelp.trackGoogle("guideHelp", this._window.name + "_clickSkip");
                this.closeWindow();
        }
    };

    private setStateGuideOngoing(): void {
        let inputWidget: IIlluminaInputWidget;
        let title: string;
        let summary: string;
        if (!this._onDuty || !this._sessionData.isActiveGuideSession()) {
            Logger.log("Trying to set state to guide ongoing, but not on duty or no active guide session");
            return;
        }
        this._sessionData.activeWindow = "guide_ongoing";
        this.openWindow(this.onGuideOngoingEvent, false);
        this.addChatMessage(this._sessionData.userId | 0, this._sessionData.userName, this._sessionData.userFigure, this._sessionData.requestDescription, true, 2);
        this._window.caption = this._habboHelp.localization.getLocalizationWithParams("guide.help.request.guide.ongoing.title", "", "name", this._sessionData.userName);
        inputWidget = castGuarded(castGuarded(this._window.findChildByName("input_widget"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow").widget, isIIlluminaInputWidget, "com.sulake.habbo.window.widgets.IIlluminaInputWidget");
        inputWidget.submitHandler = this;
        inputWidget.emptyMessage = this._habboHelp.localization.getLocalizationWithParams("guide.help.request.guide.ongoing.input.empty", "", "name", this._sessionData.userName);
        inputWidget.maxChars = this._habboHelp.getInteger("guide.help.request.max.chat.message.length", 150);
        if (this._sessionData.requestType == 2 || this._sessionData.requestType == 0) {
            title = "${guide.help.request.join.room.title}";
            summary = this._habboHelp.localization.getLocalizationWithParams("guide.help.request.join.room.summary", "", "name", this._sessionData.userName);
            this._habboHelp.windowManager.confirm(title, summary, 0, (param1: IConfirmDialog, param2: WindowEvent): void => {
                param1.dispose();
                if (param2.type == "WE_OK") {
                    this._habboHelp.sendMessage(new GuideSessionGetRequesterRoomMessageComposer());
                }
            });
        }
    }

    private onGuideOngoingEvent = (param1: WindowEvent, param2: IWindow): void => {
        if (this.disposed || this._window == null || this._window.name != "guide_ongoing" || param1.type != "WME_CLICK") {
            return;
        }
        switch (param2.name) {
            case "visit_button":
                this._habboHelp.sendMessage(new GuideSessionGetRequesterRoomMessageComposer());
                this._habboHelp.trackGoogle("guideHelp", this._window.name + "_clickVisit");
                break;
            case "invite_button":
                this._habboHelp.sendMessage(new GuideSessionInviteRequesterMessageComposer());
                this._habboHelp.trackGoogle("guideHelp", this._window.name + "_clickInvite");
                break;
            case "report_link":
                this.tryOpeningReportWindow();
                this._habboHelp.trackGoogle("guideHelp", this._window.name + "_clickReport");
                break;
            case "close_link":
                this._habboHelp.sendMessage(new GuideSessionResolvedMessageComposer());
                this._habboHelp.trackGoogle("guideHelp", this._window.name + "_clickClose");
                this.closeWindow();
        }
    };

    private setStateGuideClosed(param1: number): void {
        if (!this._onDuty || !this._sessionData.isActiveGuideSession()) {
            Logger.log("Trying to set state to guide ongoing, but not on duty or no active guide session");
            return;
        }
        this._sessionData.activeWindow = "guide_closed";
        this.openWindow(this.onGuideClosedEvent, true);
        if (param1 == 0 || param1 == 1) {
            this._window.findChildByName("close_reason").caption = this._habboHelp.localization.getLocalizationWithParams("guide.help.request.guide.closed.reason.other", "", "name", this._sessionData.userName);
        } else {
            this._window.findChildByName("close_reason").caption = this._habboHelp.localization.getLocalization("guide.help.request.guide.closed.reason.you", "");
        }
        this._window.findChildByName("report_link").caption = this._habboHelp.localization.getLocalizationWithParams("guide.help.request.guide.closed.report.link", "", "name", this._sessionData.userName);
        castGuarded(castGuarded(this._window.findChildByName("requester_avatar"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow").widget, isIAvatarImageWidget, "com.sulake.habbo.window.widgets.IAvatarImageWidget").figure = this._sessionData.userFigure;
    }

    private onGuideClosedEvent = (param1: WindowEvent, param2: IWindow): void => {
        if (this.disposed || this._window == null || this._window.name != "guide_closed" || param1.type != "WME_CLICK") {
            return;
        }
        switch (param2.name) {
            case "close_button":
            case "header_button_close":
                this._habboHelp.sendMessage(new GuideSessionFeedbackMessageComposer(true));
                this.closeWindow();
                break;
            case "report_link":
                this.tryOpeningReportWindow();
                this._habboHelp.trackGoogle("guideHelp", this._window.name + "_clickReport");
        }
    };

    private setStateUserCreateRequest(param1: number, param2: string = null): void {
        if (this._sessionData.isActiveSession()) {
            Logger.log("Trying to set state to user create, but active session exists");
            return;
        }
        this._sessionData.role = 2;
        this._sessionData.activeWindow = "user_create";
        this._sessionData.requestType = param1;
        this.openWindow(this.onUserCreateEvent, true);
        let _loc3_: IIlluminaInputWidget = castGuarded(castGuarded(this._window.findChildByName("input_widget"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow").widget, isIIlluminaInputWidget, "com.sulake.habbo.window.widgets.IIlluminaInputWidget");
        _loc3_.maxChars = this._habboHelp.getInteger("guide.help.request.max.description.length", 255);
        if (param2) {
            _loc3_.message = param2;
        }
    }

    private onUserCreateEvent = (param1: WindowEvent, param2: IWindow): void => {
        let _loc3_: string = null;
        if (this.disposed || this._window == null || this._window.name != "user_create" || param1.type != "WME_CLICK") {
            return;
        }
        switch (param2.name) {
            case "create_button":
                _loc3_ = StringUtil.trim(castGuarded(castGuarded(this._window.findChildByName("input_widget"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow").widget, isIIlluminaInputWidget, "com.sulake.habbo.window.widgets.IIlluminaInputWidget").message);
                if (_loc3_.length < this._habboHelp.getInteger("guide.help.request.min.description.length", 15)) {
                    this._window.findChildByName("create_error").visible = true;
                    castGuarded(this._window.findChildByName("list"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow").arrangeListItems();
                } else {
                    this._habboHelp.sendMessage(new GuideSessionCreateMessageComposer(this._sessionData.requestType | 0, _loc3_));
                    this._habboHelp.trackGoogle("guideHelp", this._window.name + "_clickCreate");
                    this.closeWindow();
                }
                break;
            case "header_button_close":
            case "cancel_link":
                this._habboHelp.trackGoogle("guideHelp", this._window.name + "_clickCancel");
                this.setStateClosed(true);
        }
    };

    private setStateUserPendingRequest(param1: number, param2: string, param3: number): void {
        if (!this._sessionData.isActiveUserSession()) {
            Logger.log("Trying to set state to user pending request, but no active user session");
            return;
        }
        this._sessionData.activeWindow = "user_pending";
        this._sessionData.requestType = param1 >>> 0;
        this._sessionData.requestDescription = param2;
        this.openWindow(this.onUserPendingEvent, false);
        this._window.findChildByName("request_type").caption = this.getRequestTypeCaption(param1);
        this._window.findChildByName("request_description").caption = param2;
        this._window.findChildByName("waiting_time").caption = this._habboHelp.localization.getLocalizationWithParams("guide.help.request.user.pending.info.waiting", "", "waitingtime", FriendlyTime.getFriendlyTime(this._habboHelp.localization, param3));
    }

    private onUserPendingEvent = (param1: WindowEvent, param2: IWindow): void => {
        if (this.disposed || this._window == null || this._window.name != "user_pending" || param1.type != "WME_CLICK") {
            return;
        }
        let _loc3_: string = param2.name;
        if ("cancel_button" === _loc3_) {
            this._habboHelp.sendMessage(new GuideSessionRequesterCancelsMessageComposer());
            this._habboHelp.trackGoogle("guideHelp", this._window.name + "_clickCancel");
            this.closeWindow();
        }
    };

    private setStateUserOngoingRequest(): void {
        if (!this._sessionData.isActiveUserSession()) {
            Logger.log("Trying to set state to user ongoing request, but no active user session");
            return;
        }
        this._sessionData.activeWindow = "user_ongoing";
        this.openWindow(this.onUserOngoingEvent, false);
        this.addSystemMessage(1, this._habboHelp.localization.getLocalization("guide.help.requester.disclaimer"));
        if (this._sessionData.requestType == 0 || this._sessionData.requestType == 2) {
            this.addSystemMessage(2, this._habboHelp.localization.getLocalization("guide.help.request.tour.reminder"));
        } else {
            this.addChatMessage(this._sessionData.userId | 0, this._sessionData.userName, this._sessionData.userFigure, this._sessionData.requestDescription, false, 2);
        }
        this._window.caption = this._habboHelp.localization.getLocalizationWithParams("guide.help.request.user.ongoing.title", "", "name", this._sessionData.guideName);
        this._window.findChildByName("guide_name_link").caption = this._sessionData.guideName;
        let _loc1_: IIlluminaInputWidget = castGuarded(castGuarded(this._window.findChildByName("input_widget"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow").widget, isIIlluminaInputWidget, "com.sulake.habbo.window.widgets.IIlluminaInputWidget");
        _loc1_.submitHandler = this;
        _loc1_.emptyMessage = this._habboHelp.localization.getLocalizationWithParams("guide.help.request.user.ongoing.input.help", "", "name", this._sessionData.guideName);
        _loc1_.maxChars = this._habboHelp.getInteger("guide.help.request.max.chat.message.length", 150);
    }

    private onUserOngoingEvent = (param1: WindowEvent, param2: IWindow): void => {
        if (this.disposed || this._window == null || this._window.name != "user_ongoing" || param1.type != "WME_CLICK") {
            return;
        }
        switch (param2.name) {
            case "guide_name_link":
                this._habboHelp.sendMessage(new GetExtendedProfileMessageComposer(this._sessionData.guideId | 0));
                this._habboHelp.trackGoogle("guideHelp", this._window.name + "_clickProfile");
                break;
            case "report_guide_link":
                this.tryOpeningReportWindow();
                this._habboHelp.trackGoogle("guideHelp", this._window.name + "_clickReport");
                break;
            case "close_link":
                this._habboHelp.sendMessage(new GuideSessionResolvedMessageComposer());
                this._habboHelp.trackGoogle("guideHelp", this._window.name + "_clickClose");
                this.closeWindow();
        }
    };

    private setStateUserGuideDisconnected(): void {
        if (!this._sessionData.isActiveUserSession()) {
            Logger.log("Trying to set state to user guide disconnected, but no active user session");
            return;
        }
        this._sessionData.activeWindow = "user_guide_disconnected";
        this.openWindow(this.onUserGuideDisconnected, true);
        this._window.findChildByName("guide_name_link").caption = this._sessionData.guideName;
    }

    private onUserGuideDisconnected = (param1: WindowEvent, param2: IWindow): void => {
        if (this.disposed || this._window == null || this._window.name != "user_guide_disconnected" || param1.type != "WME_CLICK") {
            return;
        }
        switch (param2.name) {
            case "header_button_close":
                this._habboHelp.sendMessage(new GuideSessionFeedbackMessageComposer(false));
                this.closeWindow();
                break;
            case "guide_name_link":
                this._habboHelp.sendMessage(new GetExtendedProfileMessageComposer(this._sessionData.guideId | 0));
                this._habboHelp.trackGoogle("guideHelp", this._window.name + "_clickProfile");
                break;
            case "report_guide_link":
                this.tryOpeningReportWindow();
                this._habboHelp.trackGoogle("guideHelp", this._window.name + "_clickReport");
                break;
            case "resubmit_button":
                this._SafeStr_6354 = true;
                this._habboHelp.sendMessage(new GuideSessionFeedbackMessageComposer(false));
                this._habboHelp.trackGoogle("guideHelp", this._window.name + "_clickResubmit");
                this.closeWindow();
        }
    };

    private setStateUserFeedback(): void {
        if (!this._sessionData.isActiveUserSession()) {
            Logger.log("Trying to set state to user feedback, but no active user session");
            return;
        }
        this._sessionData.activeWindow = "user_feedback";
        this.openWindow(this.onUserFeedbackEvent, false);
        this._window.findChildByName("guide_name_link").caption = this._sessionData.guideName;
    }

    private onUserFeedbackEvent = (param1: WindowEvent, param2: IWindow): void => {
        if (this.disposed || this._window == null || this._window.name != "user_feedback" || param1.type != "WME_CLICK") {
            return;
        }
        switch (param2.name) {
            case "guide_name_link":
                this._habboHelp.sendMessage(new GetExtendedProfileMessageComposer(this._sessionData.guideId | 0));
                this._habboHelp.trackGoogle("guideHelp", this._window.name + "_clickProfile");
                break;
            case "report_guide_link":
                this.tryOpeningReportWindow();
                this._habboHelp.trackGoogle("guideHelp", this._window.name + "_clickReport");
                break;
            case "positive_button":
                this._habboHelp.sendMessage(new GuideSessionFeedbackMessageComposer(true));
                this._habboHelp.trackGoogle("guideHelp", this._window.name + "_clickPositiveFeedback");
                this.closeWindow();
                break;
            case "negative_button":
                this._habboHelp.sendMessage(new GuideSessionFeedbackMessageComposer(false));
                this._habboHelp.trackGoogle("guideHelp", this._window.name + "_clickNegativeFeedback");
                this.closeWindow();
        }
    };

    private setStateUserThanks(): void {
        if (!this._sessionData.isActiveUserSession()) {
            Logger.log("Trying to set state to user thanks, but no active user session");
            return;
        }
        this._sessionData.activeWindow = "user_thanks";
        this.openWindow(this.onUserThanksEvent, true);
    }

    private onUserThanksEvent = (param1: WindowEvent, param2: IWindow): void => {
        if (this.disposed || this._window == null || this._window.name != "user_thanks" || param1.type != "WME_CLICK") {
            return;
        }
        switch (param2.name) {
            case "header_button_close":
            case "close_button":
                this.setStateClosed(false);
        }
    };

    private setStateGuardianChatReviewAccept(param1: number): void {
        this._sessionData.activeWindow = "guardian_chat_review_accept";
        this.openWindow(this.onGuardianChatReviewAcceptEvent, false);
        this._habboHelp.soundManager.playSound("HBST_guide_request");
        let _loc2_: ICountdownWidget = asGuarded(castGuarded(this._window.findChildByName("countdown"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow").widget, isICountdownWidget);
        _loc2_.seconds = param1;
        _loc2_.running = true;
    }

    private onGuardianChatReviewAcceptEvent = (param1: WindowEvent, param2: IWindow): void => {
        if (this.disposed || this._window == null || param1.type != "WME_CLICK") {
            return;
        }
        switch (param2.name) {
            case "skip_link":
                this._habboHelp.sendMessage(new ChatReviewGuideDecidesOnOfferMessageComposer(false));
                this.setStateClosed(true);
                break;
            case "accept_button":
                this._habboHelp.sendMessage(new ChatReviewGuideDecidesOnOfferMessageComposer(true));
                this.setStateGuardianChatReviewWaitForOtherVoters();
        }
    };

    private setStateGuardianChatReviewWaitForOtherVoters(): void {
        this._sessionData.activeWindow = "guardian_chat_review_wait_for_voters";
        this.openWindow(this.onGuardianChatReviewWaitForOtherVotersEvent, false);
        this.startWaitingAnimation(asGuarded(this._window.findChildByName("waiting_animation"), isIStaticBitmapWrapperWindow), "help_chat_review_progress_big", 4);
    }

    private onGuardianChatReviewWaitForOtherVotersEvent = (param1: WindowEvent, param2: IWindow): void => {
        if (this.disposed || this._window == null || param1.type != "WME_CLICK") {
            return;
        }
        let _loc3_: string = param2.name;
        if ("close_link" === _loc3_) {
            this._habboHelp.sendMessage(new ChatReviewGuideDetachedMessageComposer());
            this.setStateClosed(true);
        }
    };

    private setStateGuardianChatReviewVote(param1: number, param2: string): void {
        let _loc18_: Date = null;
        let _loc15_: any[] = null;
        let _loc12_: number = 0;
        let _loc10_: string = null;
        let _loc5_: boolean = false;
        let _loc11_: string = null;
        this._sessionData.activeWindow = "guardian_chat_review_vote";
        this.openWindow(this.onGuardianChatReviewVoteEvent, false);
        let _loc7_: ICountdownWidget = asGuarded(castGuarded(this._window.findChildByName("countdown"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow").widget, isICountdownWidget);
        _loc7_.seconds = param1;
        _loc7_.running = true;
        let _loc3_: any[] = param2.substr(0, param2.indexOf(";")).match(/\d+/g);
        if (_loc3_.length > 5) {
            _loc18_ = new Date(_loc3_[0], (_loc3_[1] | 0) - 1, _loc3_[2], _loc3_[3], _loc3_[4], _loc3_[5]);
        } else {
            _loc18_ = new Date();
        }
        let _loc16_: number = (new Date().getTime() - _loc18_.getTime()) / 1000;
        this._window.findChildByName("incident_time").caption = "(" + FriendlyTime.getFriendlyTime(this._habboHelp.localization, _loc16_, ".ago") + ")";
        let _loc4_: IItemListWindow = asGuarded(this._window.findChildByName("chatlog"), isIItemListWindow);
        let _loc8_: IWindow = this._window.findChildByName("reported_user_template");
        let _loc6_: IWindow = this._window.findChildByName("other_user_template");
        let _loc9_: IWindow = this._window.findChildByName("separator_template");
        _loc4_.removeListItems();
        let _loc14_: number = -1;
        let _loc13_: IWindowContainer = null;
        for (const _loc17_ of param2.split("\r") ?? []) {
            if (_loc17_ != "") {
                _loc15_ = _loc17_.split(";", 3);
                _loc12_ = 1;
                if (_loc15_.length >= 3) {
                    _loc12_ = _loc15_[1] | 0;
                    _loc10_ = String(_loc15_[2]).replace("<", "&lt;").replace(">", "&gt;");
                    if (_loc12_ == _loc14_ && _loc13_ != null) {
                        _loc13_.findChildByName("message").caption = _loc13_.findChildByName("message").caption + ("\n" + _loc10_);
                    } else {
                        _loc5_ = _loc12_ == 0;
                        _loc13_ = asGuarded((_loc5_ ? _loc8_.clone() : _loc6_.clone()), isIWindowContainer);
                        _loc11_ = _loc5_ ? this._habboHelp.localization.getLocalization("guide.bully.request.guide.vote.perpetrator", "") : this._habboHelp.localization.getLocalizationWithParams("guide.bully.request.guide.vote.anonymous", "%ID%", "id", _loc12_.toString());
                        _loc13_.findChildByName("message").caption = "<b>" + _loc11_ + ":</b> " + _loc10_;
                        _loc4_.addListItem(_loc13_);
                        _loc14_ = _loc12_;
                    }
                }
            }
        }
    }

    private onGuardianChatReviewVoteEvent = (param1: WindowEvent, param2: IWindow): void => {
        let _loc5_: string = null;
        let _loc6_: IRegionWindow = null;
        let _loc3_: string = null;
        let _loc4_: IStaticBitmapWrapperWindow = null;
        if (this.disposed || this._window == null) {
            return;
        }
        if (param1.type == "WME_CLICK") {
            switch (param2.name) {
                case "close_link":
                    this._habboHelp.sendMessage(new ChatReviewGuideDetachedMessageComposer());
                    this.setStateClosed(true);
                    break;
                case "vote_ok":
                    this._habboHelp.sendMessage(new ChatReviewGuideVoteMessageComposer(0));
                    this.setStateGuardianChatReviewWaitForResults(0);
                    break;
                case "vote_bad":
                    this._habboHelp.sendMessage(new ChatReviewGuideVoteMessageComposer(1));
                    this.setStateGuardianChatReviewWaitForResults(1);
                    break;
                case "vote_very_bad":
                    this._habboHelp.sendMessage(new ChatReviewGuideVoteMessageComposer(2));
                    this.setStateGuardianChatReviewWaitForResults(2);
            }
        } else if (param2.type == 5 && param2.name.substr(0, 5) == "vote_") {
            _loc5_ = param2.name.substr(5);
            _loc6_ = isIRegionWindow(param2) ? param2 : null;
            _loc3_ = "help_chat_review_vote_" + _loc5_;
            _loc4_ = asGuarded(_loc6_.getChildAt(0), isIStaticBitmapWrapperWindow);
            switch (param1.type) {
                case "WME_OVER":
                    _loc4_.id |= 1;
                    break;
                case "WME_OUT":
                    _loc4_.id &= -2;
                    break;
                case "WME_DOWN":
                    _loc4_.id |= 2;
                    break;
                case "WME_UP":
                case "WME_UP_OUTSIDE":
                    _loc4_.id &= -3;
            }
            switch (_loc4_.id - 1) {
                case 0:
                    _loc4_.assetUri = _loc3_ + "_over";
                    break;
                case 2:
                    _loc4_.assetUri = _loc3_ + "_down";
                    break;
                default:
                    _loc4_.assetUri = _loc3_;
            }
        }
    };

    private setStateGuardianChatReviewWaitForResults(param1: number): void {
        this._sessionData.activeWindow = "guardian_chat_review_wait_for_results";
        this.openWindow(this.onGuardianChatReviewWaitForResultsEvent, true);
        this.showOwnVote(param1);
    }

    private onGuardianChatReviewWaitForResultsEvent = (param1: WindowEvent, param2: IWindow): void => {
        if (this.disposed || this._window == null || param1.type != "WME_CLICK") {
            return;
        }
        switch (param2.name) {
            case "header_button_close":
            case "close_button":
                this._habboHelp.sendMessage(new ChatReviewGuideDetachedMessageComposer());
                this.setStateClosed(true);
        }
    };

    private setStateGuardianChatReviewResults(param1: number, param2: number, param3: any[]): void {
        this._sessionData.activeWindow = "guardian_chat_review_results";
        this.openWindow(this.onGuardianChatReviewResultsEvent, true);
        let _loc4_: number = GuideSessionController.statusFromVote(param1);
        this._window.findChildByName("result_text").caption = "${guide.bully.request.guide.results.outcome." + GuideSessionController.RESULT_KEYS[_loc4_] + "}";
        castGuarded(this._window.findChildByName("result_image"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow").assetUri = "help_chat_review_decision_" + GuideSessionController.STATUS_KEYS[_loc4_];
        this.showOwnVote(param2);
        this.showStatus(asGuarded(this._window.findChildByName("results"), isIItemListWindow), param3);
    }

    private onGuardianChatReviewResultsEvent = (param1: WindowEvent, param2: IWindow): void => {
        if (this.disposed || this._window == null || param1.type != "WME_CLICK") {
            return;
        }
        switch (param2.name) {
            case "header_button_close":
            case "close_button":
                this._habboHelp.sendMessage(new ChatReviewGuideDetachedMessageComposer());
                this.setStateClosed(true);
        }
    };

    private showOwnVote(param1: number): void {
        let _loc2_: number = GuideSessionController.statusFromVote(param1);
        this._window.findChildByName("vote_text").caption = "${guide.bully.request.guide.results.outcome." + GuideSessionController.STATUS_KEYS[_loc2_] + "}";
        castGuarded(this._window.findChildByName("vote_image"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow").assetUri = "help_chat_review_decision_" + GuideSessionController.STATUS_KEYS[_loc2_];
    }

    private showStatus(param1: IItemListWindow, param2: any[]): void {
        let _loc3_: IWindowContainer = null;
        let _loc6_: number = 0;
        let _loc4_: IWindowContainer = null;
        let _loc7_: number = 0;
        let _loc5_: IStaticBitmapWrapperWindow = null;
        if (param1.numListItems < param2.length + 1) {
            _loc4_ = asGuarded(param1.getListItemAt(0), isIWindowContainer);
            _loc6_ = 0;
            while (_loc6_ < param2.length) {
                _loc3_ = asGuarded(_loc4_.clone(), isIWindowContainer);
                param1.addListItem(_loc3_);
                _loc6_++;
            }
            _loc3_.findChildByName("vote_separator").dispose();
        }
        _loc6_ = 0;
        while (_loc6_ < param2.length) {
            _loc3_ = asGuarded(param1.getListItemAt(_loc6_ + 1 >>> 0), isIWindowContainer);
            _loc7_ = param2[_loc6_] | 0;
            _loc5_ = asGuarded(_loc3_.findChildByName("vote_image"), isIStaticBitmapWrapperWindow);
            _loc3_.findChildByName("vote_text").caption = "${guide.bully.request.guide.results.outcome." + GuideSessionController.STATUS_KEYS[_loc7_] + "}";
            this.stopWaitingAnimation(_loc5_);
            switch (_loc7_) {
                case 0:
                case 5:
                    this.startWaitingAnimation(_loc5_, "help_chat_review_decision_" + GuideSessionController.STATUS_KEYS[_loc7_], 2);
                    break;
                default:
                    _loc5_.assetUri = "help_chat_review_decision_" + GuideSessionController.STATUS_KEYS[_loc7_];
            }
            _loc6_++;
        }
    }

    private setStateClosedWithNotification(param1: string): void {
        this._habboHelp.windowManager.simpleAlert("${" + param1 + ".title}", "${" + param1 + ".heading}", "${" + param1 + ".message}");
        this.setStateClosed(true);
    }

    private setStateError(): void {
        this.setOnDuty(false);
        this._sessionData.activeWindow = "error_window";
        this.openWindow(this.onErrorWindowEvent, true);
    }

    private onErrorWindowEvent = (param1: WindowEvent, param2: IWindow): void => {
        if (this.disposed || this._window == null || this._window.name != "error_window" || param1.type != "WME_CLICK") {
            return;
        }
        switch (param2.name) {
            case "header_button_close":
            case "close_button":
                this.setStateClosed(true);
        }
    };

    private setStateRejected(): void {
        this.setOnDuty(false);
        this._sessionData.activeWindow = "rejected_window";
        this.openWindow(this.onRejectedWindowEvent, true);
        if (this._sessionData.requestType == 0 || this._sessionData.requestType == 2) {
            this._window.caption = "${guide.help.request.no_tour_guides.title}";
            this._window.findChildByName("heading").caption = "${guide.help.request.no_tour_guides.heading}";
            this._window.findChildByName("message").caption = "${guide.help.request.no_tour_guides.message}";
        }
    }

    private onRejectedWindowEvent = (param1: WindowEvent, param2: IWindow): void => {
        if (this.disposed || this._window == null || this._window.name != "rejected_window" || param1.type != "WME_CLICK") {
            return;
        }
        switch (param2.name) {
            case "header_button_close":
            case "close_button":
                this.setStateClosed(true);
        }
    };

    private setStateClosed(param1: boolean): void {
        this.resetSessionData();
        this.closeWindow();
        if (this._onDuty && !this._habboHelp.sessionDataManager.isPerkAllowed("USE_GUIDE_TOOL")) {
            this.setOnDuty(false);
        }
        if (param1 && this._onDuty) {
            this.setStateGuideTool();
        }
    }

    private openWindow(param1: (...args: any[]) => any, param2: boolean): void {
        if (this._disposed) {
            return;
        }
        if (this._window != null) {
            this.closeWindow();
        }
        Logger.log("Opening window " + this._sessionData.activeWindow);
        this._window = asGuarded(this._guideHelp.habboHelp.getXmlWindow(this._sessionData.activeWindow), isIWindowContainer);
        this._window.position = this._SafeStr_4016;
        this._window.procedure = param1;
        this._window.findChildByName("header_button_close").visible = param2;
    }

    private closeWindow(): void {
        if (this._window != null) {
            Logger.log("Closing window: " + this._window.name);
            this._SafeStr_4016.x = Math.max(0, this._window.position.x);
            this._SafeStr_4016.y = Math.max(0, this._window.position.y);
            this._window.dispose();
            this._window = null;
        }
    }

    private tryOpeningReportWindow(): void {
        this._habboHelp.queryForPendingCallsForHelp(2);
    }

    public openReportWindow(): void {
        if (this._SafeStr_2415 || this._window == null) {
            return;
        }
        let _loc1_: IDesktopWindow = this._habboHelp.windowManager.getDesktop(0);
        this._SafeStr_2415 = castGuarded(this._habboHelp.getXmlWindow("report_window"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        this._SafeStr_2415.procedure = this.onReportWindowEvent;
        this._SafeStr_2415.x = Math.max(0, Math.min(_loc1_.width - this._SafeStr_2415.width, this._window.x + this._window.width + 10)) | 0;
        this._SafeStr_2415.y = Math.max(0, this._window.y) | 0;
    }

    private closeReportWindow(): void {
        if (this._SafeStr_2415) {
            this._SafeStr_2415.dispose();
            this._SafeStr_2415 = null;
        }
    }

    private onReportWindowEvent = (param1: WindowEvent, param2: IWindow): void => {
        let _loc3_: string = null;
        if (this.disposed || !this._SafeStr_2415 || Boolean(this._SafeStr_2415.disposed) || param1.type != "WME_CLICK") {
            return;
        }
        switch (param2.name) {
            case "header_button_close":
            case "cancel_link":
                this._habboHelp.trackGoogle("guideHelp", this._SafeStr_2415.name + "_clickClose");
                this.closeReportWindow();
                break;
            case "urgent_help_link":
                break;
            case "submit_button":
                _loc3_ = castGuarded(castGuarded(this._SafeStr_2415.findChildByName("input_widget"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow").widget, isIIlluminaInputWidget, "com.sulake.habbo.window.widgets.IIlluminaInputWidget").message;
                if (_loc3_.length == 0) {
                    this._SafeStr_2415.findChildByName("report_error").visible = true;
                    castGuarded(this._SafeStr_2415.findChildByName("list"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow").arrangeListItems();
                } else {
                    this._habboHelp.sendMessage(new GuideSessionReportMessageComposer(_loc3_));
                    this._habboHelp.trackGoogle("guideHelp", this._SafeStr_2415.name + "_clickReport");
                    this.closeReportWindow();
                    this.closeWindow();
                }
        }
    };

    private resetSessionData(): void {
        this._sessionData = new GuideSessionData();
    }

    private setOnDutyStatus(param1: boolean): void {
        let _loc2_: ICheckBoxWindow = castGuarded(this._window.findChildByName("guide_tool_duty"), isICheckBoxWindow, "com.sulake.core.window.components.ICheckBoxWindow");
        this.setOnDuty(param1);
        _loc2_.isSelected = param1;
        if (param1) {
            _loc2_.caption = this._habboHelp.localization.getLocalization("guide.help.guide.tool.duty.on", "");
        } else {
            _loc2_.caption = this._habboHelp.localization.getLocalization("guide.help.guide.tool.duty.off", "");
        }
        let _loc3_: IWindow = this._window.findChildByName("disabled_screen");
        if (_loc3_) {
            _loc3_.visible = param1;
        }
    }

    private setCheckBoxValue(param1: string, param2: boolean): void {
        let _loc3_: ICheckBoxWindow = asGuarded(this._window.findChildByName(param1), isICheckBoxWindow);
        if (_loc3_ != null) {
            _loc3_.isSelected = param2;
        }
    }

    private getRequestTypeCaption(param1: number): string {
        if (param1 == 2) {
            param1 = 0;
        }
        return this._habboHelp.localization.getLocalization("guide.help.request.type." + param1, "");
    }

    private addChatMessage(param1: number, param2: string, param3: string, param4: string, param5: boolean, param6: number = 0, param7: any = null): void {
        let _loc8_: IIlluminaChatBubbleWidget = null;
        let _loc9_: IWindowContainer = null;
        let _loc10_: IWidgetWindow = this.getLastChatListItem();
        if (_loc10_ != null && null != asGuarded(_loc10_.widget, isIIlluminaChatBubbleWidget) && _loc10_.name == "chat_msg_0") {
            _loc8_ = castGuarded(_loc10_.widget, isIIlluminaChatBubbleWidget, "com.sulake.habbo.window.widgets.IIlluminaChatBubbleWidget");
        }
        if (_loc8_ && _loc8_.userId == param1 && param6 == 0) {
            _loc8_.appendMessage(param4);
            this.addItemAndUpdateChatList(null);
        } else {
            _loc10_ = castGuarded(this._chatMsg.clone(), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow");
            _loc10_.name = "chat_msg_" + param6;
            _loc8_ = castGuarded(_loc10_.widget, isIIlluminaChatBubbleWidget, "com.sulake.habbo.window.widgets.IIlluminaChatBubbleWidget");
            _loc8_.figure = param3;
            _loc8_.flipped = param5;
            _loc8_.appendMessage(param4);
            _loc8_.userName = param2;
            _loc8_.userId = param1;
            switch (param6 - 1) {
                case 0:
                    _loc9_ = castGuarded(castGuarded(_loc10_.rootWindow, isIWindowContainer, "com.sulake.core.window.IWindowContainer").findChildByName("message_region"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
                    _loc9_.procedure = this.onChatMessageEvent;
                    _loc9_.setParamFlag(1, true);
                    _loc9_.id = param7 | 0;
                    castGuarded(_loc9_.findChildByName("message"), isITextWindow, "com.sulake.core.window.components.ITextWindow").underline = true;
            }
            this.addItemAndUpdateChatList(_loc10_);
        }
    }

    private onChatMessageEvent = (param1: WindowEvent, param2: IWindow): void => {
        if (this.disposed || this._window == null || param1.type != "WME_CLICK") {
            return;
        }
        this._habboHelp.navigator.goToPrivateRoom(param2.id);
    };

    private addItemAndUpdateChatList(param1: IWindow): void {
        let _loc2_: IItemListWindow = castGuarded(this._window.findChildByName("chat_list"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow");
        if (param1) {
            _loc2_.addListItemAt(param1, _loc2_.numListItems - 1 >>> 0);
        }
        _loc2_.scrollV = 1;
        _loc2_.arrangeListItems();
        this.resetTypingTimer();
    }

    private addSystemMessage(param1: number, param2: string): void {
        let _loc3_: IWindowContainer = null;
        if (!this._sessionData.isOnGoingSession() || param2 == "") {
            return;
        }
        switch (param1 - 1) {
            case 0:
                _loc3_ = asGuarded(this._SafeStr_4201.clone(), isIWindowContainer);
                _loc3_.findChildByName("content").caption = param2;
                this.addItemAndUpdateChatList(_loc3_);
                break;
            case 1:
                _loc3_ = asGuarded(this._SafeStr_6583.clone(), isIWindowContainer);
                _loc3_.findChildByName("content").caption = param2;
                this.addItemAndUpdateChatList(_loc3_);
                break;
            default:
                if (this._sessionData.isActiveUserSession()) {
                    this.addChatMessage(this._sessionData.userId | 0, this._sessionData.userName, this._sessionData.userFigure, param2, true, 2);
                    break;
                }
                this.addChatMessage(this._sessionData.guideId | 0, this._sessionData.guideName, this._sessionData.guideFigure, param2, true, 2);
        }
    }

    private getLastChatListItem(): IWidgetWindow {
        if (this._window == null || Boolean(this._window.disposed)) {
            return null;
        }
        let _loc1_: IItemListWindow = castGuarded(this._window.findChildByName("chat_list"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow");
        if (_loc1_.numListItems > 1) {
            return asGuarded(_loc1_.getListItemAt(_loc1_.numListItems - 2 >>> 0), isIWidgetWindow);
        }
        return null;
    }

    public onInput(param1: IWidgetWindow, param2: string): void {
        if (param2.length > 0) {
            this._habboHelp.sendMessage(new GuideSessionMessageMessageComposer(param2));
            castGuarded(param1.widget, isIIlluminaInputWidget, "com.sulake.habbo.window.widgets.IIlluminaInputWidget").message = "";
            this.resetTypingTimer();
        }
    }

    private setOnDuty(param1: boolean): void {
        this._onDuty = param1;
        this._habboHelp.toolbar.onDuty = param1;
    }

    private resetTypingTimer(): void {
        if (this._SafeStr_2618 != null) {
            this._SafeStr_2618.stop();
            this._SafeStr_2618 = null;
        }
        if (this._window == null || Boolean(this._window.disposed) || this._window.name != "user_ongoing" && this._window.name != "guide_ongoing") {
            return;
        }
        this._SafeStr_2618 = new Timer(3000);
        this._SafeStr_2618.addEventListener("timer", this.onTypingTimer);
        this._SafeStr_2618.start();
        this._lastMessageTypedLength = this.messageLength;
        this.displayPartnerIsTypingMessage(false);
    }

    private get messageLength(): number {
        if (this._window == null || Boolean(this._window.disposed) || this._window.name != "user_ongoing" && this._window.name != "guide_ongoing") {
            return 0;
        }
        let _loc1_: IWidgetWindow = asGuarded(this._window.findChildByName("input_widget"), isIWidgetWindow);
        return _loc1_ != null ? castGuarded(_loc1_.widget, isIIlluminaInputWidget, "com.sulake.habbo.window.widgets.IIlluminaInputWidget").message.length : 0;
    }

    private onTypingTimer = (param1: TimerEvent): void => {
        let _loc3_: number = 0;
        if (this._window == null || Boolean(this._window.disposed) || this._window.name != "user_ongoing" && this._window.name != "guide_ongoing") {
            return;
        }
        _loc3_ = _loc3_;
        let _loc2_: boolean = this._lastMessageTypedLength != _loc3_;
        if (this._lastTypingInfo != _loc2_) {
            this._habboHelp.sendMessage(new GuideSessionIsTypingMessageComposer(_loc2_));
            this._lastTypingInfo = _loc2_;
        }
        this._lastMessageTypedLength = _loc3_;
    };

    private displayPartnerIsTypingMessage(param1: boolean): void {
        if (this._window == null || Boolean(this._window.disposed) || this._window.name != "user_ongoing" && this._window.name != "guide_ongoing") {
            return;
        }
        let _loc2_: IItemListWindow = castGuarded(this._window.findChildByName("chat_list"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow");
        _loc2_.getListItemAt(_loc2_.numListItems - 1 >>> 0).blend = param1 ? 1 : 0;
    }

    private onWaitingAnimationTimer = (param1: TimerEvent): void => {
        let data: AnimationData;
        let event: TimerEvent = param1;
        this._SafeStr_2905 = this._SafeStr_2905.filter((param1: AnimationData, param2: number, param3: AnimationData[]): boolean => {
             return param1.window != null && !param1.window.disposed;
         });
        for (data of this._SafeStr_2905 ?? []) {
            this.setAnimationFrame(data);
        }
    };

    private startWaitingAnimation(param1: IStaticBitmapWrapperWindow, param2: string, param3: number): void {
        if (this._window == null) {
            return;
        }
        let _loc4_: AnimationData = new AnimationData(param1, param2, param3);
        this.setAnimationFrame(_loc4_);
        this._SafeStr_2905.push(_loc4_);
    }

    private setAnimationFrame(param1: AnimationData): void {
        let _loc2_: number = this._SafeStr_3252.currentCount % param1.frameCount;
        param1.window.assetUri = param1.asset + "_" + (String(_loc2_ + 1));
    }

    private stopWaitingAnimation(param1: IStaticBitmapWrapperWindow): void {
        let window: IStaticBitmapWrapperWindow = param1;
        this._SafeStr_2905 = this._SafeStr_2905.filter((param1: AnimationData, param2: number, param3: AnimationData[]): boolean => {
             return param1.window != window;
         });
    }

    private onStageMouseMove = (param1: MouseEvent): void => {
        this._SafeStr_4919 = getTimer();
    };

    private onIdleCheckTimer = (param1: TimerEvent): void => {
        if (this._onDuty && getTimer() - this._SafeStr_4919 > this._habboHelp.getInteger("guidetool.idle.timeout", 300) * 1000) {
            this._habboHelp.sendMessage(new GuideSessionOnDutyUpdateMessageComposer(false, this._SafeStr_3382, this._SafeStr_3424, this._SafeStr_3515));
        }
    };

    get [IDisposable](): true {
        return true;
    }
}
