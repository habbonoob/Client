import { castTo, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { ILinkEventTracker } from '@/com/sulake/core/runtime/events/ILinkEventTracker';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import type { CallForHelpCategoryData } from '@/com/sulake/habbo/communication/messages/incoming/callforhelp/CallForHelpCategoryData';
import type { UserMessageData } from '@/com/sulake/habbo/communication/messages/incoming/room/engine/UserMessageData';
import type { CfhTopicsInitMessageParser } from '@/com/sulake/habbo/communication/messages/parser/callforhelp/CfhTopicsInitMessageParser';
import type { Game2StageStartingMessageParser } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/arena/Game2StageStartingMessageParser';
import type { CallForHelpPendingCallsMessageParser } from '@/com/sulake/habbo/communication/messages/parser/help/CallForHelpPendingCallsMessageParser';
import type { GuideReportingStatusMessageParser } from '@/com/sulake/habbo/communication/messages/parser/help/GuideReportingStatusMessageParser';
import type { GetGuestRoomResultMessageParser } from '@/com/sulake/habbo/communication/messages/parser/navigator/GetGuestRoomResultMessageParser';
import type { RoomEntryInfoMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/engine/RoomEntryInfoMessageParser';
import type { UsersMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/engine/UsersMessageParser';
import type { RoomReadyMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/session/RoomReadyMessageParser';
import type { IHabboFreeFlowChat } from '@/com/sulake/habbo/freeflowchat/IHabboFreeFlowChat';
import type { IHabboFriendList } from '@/com/sulake/habbo/friendlist/IHabboFriendList';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IHabboNavigator } from '@/com/sulake/habbo/navigator/IHabboNavigator';
import type { IRoomSessionManager } from '@/com/sulake/habbo/session/IRoomSessionManager';
import type { ISessionDataManager } from '@/com/sulake/habbo/session/ISessionDataManager';
import type { IHabboSoundManager } from '@/com/sulake/habbo/sound/IHabboSoundManager';
import type { HabboToolbarEvent } from '@/com/sulake/habbo/toolbar/events/HabboToolbarEvent';
import type { IHabboToolbar } from '@/com/sulake/habbo/toolbar/IHabboToolbar';
import type { IHabboTracking } from '@/com/sulake/habbo/tracking/IHabboTracking';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { IModalDialog } from '@/com/sulake/habbo/window/utils/IModalDialog';
import { navigateToURL } from '@habbo-pixi/runtime/net/navigateToURL';
import { URLRequest } from '@habbo-pixi/runtime/net/URLRequest';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { Component } from '@/com/sulake/core/runtime/Component.group';
import { ComponentDependency } from '@/com/sulake/core/runtime/ComponentDependency';
import { ErrorReportStorage } from '@/com/sulake/core/utils/ErrorReportStorage';
import { CfhTopicsInitMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/callforhelp/CfhTopicsInitMessageEvent';
import { MyCfhReportStatusMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/callforhelp/MyCfhReportStatusMessageEvent';
import { MySanctionStatusMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/callforhelp/MySanctionStatusMessageEvent';
import { Game2StageStartingMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/game/snowwar/arena/Game2StageStartingMessageEvent';
import { CallForHelpDisabledNotifyMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/help/CallForHelpDisabledNotifyMessageEvent';
import { CallForHelpPendingCallsDeletedMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/help/CallForHelpPendingCallsDeletedMessageEvent';
import { CallForHelpPendingCallsMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/help/CallForHelpPendingCallsMessageEvent';
import { GuideReportingStatusMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/help/GuideReportingStatusMessageEvent';
import { GetGuestRoomResultEvent } from '@/com/sulake/habbo/communication/messages/incoming/navigator/GetGuestRoomResultEvent';
import { RoomEntryInfoMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/engine/RoomEntryInfoMessageEvent';
import { UsersMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/engine/UsersMessageEvent';
import { RoomReadyMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/session/RoomReadyMessageEvent';
import { RemoveFriendMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/friendlist/RemoveFriendMessageComposer';
import { GetCfhMyReportStatus } from '@/com/sulake/habbo/communication/messages/outgoing/help/GetCfhMyReportStatus';
import { GetGuideReportingStatusMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/help/GetGuideReportingStatusMessageComposer';
import { GetMySanctionStatusMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/help/GetMySanctionStatusMessageComposer';
import { GetPendingCallsForHelpMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/help/GetPendingCallsForHelpMessageComposer';
import { GuideAdvertisementReadMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/talent/GuideAdvertisementReadMessageComposer';
import { IgnoreUserMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/IgnoreUserMessageComposer';
import { HumanGameObjectData } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/data/object/SnowWarGameObjectData.group';
import { CallForHelpManager } from '@/com/sulake/habbo/help/CallForHelpManager';
import { ChatEventHandler } from '@/com/sulake/habbo/help/cfh/registry/chat/ChatEventHandler';
import { ChatRegistry } from '@/com/sulake/habbo/help/cfh/registry/chat/ChatRegistry';
import { InstantMessageEventHandler } from '@/com/sulake/habbo/help/cfh/registry/instantmessage/InstantMessageEventHandler';
import { InstantMessageRegistry } from '@/com/sulake/habbo/help/cfh/registry/instantmessage/InstantMessageRegistry';
import { UserRegistry } from '@/com/sulake/habbo/help/cfh/registry/user/UserRegistry';
import { GuideHelpManager } from '@/com/sulake/habbo/help/GuideHelpManager';
import { HabboWayController } from '@/com/sulake/habbo/help/HabboWayController';
import { HabboWayQuizController } from '@/com/sulake/habbo/help/HabboWayQuizController';
import { IHabboHelp } from '@/com/sulake/habbo/help/IHabboHelp';
import { MyReportStatus } from '@/com/sulake/habbo/help/MyReportStatus.group';
import { NameChangeController } from '@/com/sulake/habbo/help/namechange/NameChangeController';
import { SafetyBookletController } from '@/com/sulake/habbo/help/SafetyBookletController';
import { SanctionInfo } from '@/com/sulake/habbo/help/SanctionInfo';
import { TopicsFlowHelpController } from '@/com/sulake/habbo/help/TopicsFlowHelpController';
import { WelcomeScreenController } from '@/com/sulake/habbo/help/WelcomeScreenController';
import { StringUtil } from '@/com/sulake/habbo/utils/StringUtil';
import { IIDHabboCommunicationManager } from '@/com/sulake/iid/IIDHabboCommunicationManager';
import { IIDHabboFreeFlowChat } from '@/com/sulake/iid/IIDHabboFreeFlowChat';
import { IIDHabboFriendList } from '@/com/sulake/iid/IIDHabboFriendList';
import { IIDHabboLocalizationManager } from '@/com/sulake/iid/IIDHabboLocalizationManager';
import { IIDHabboNavigator } from '@/com/sulake/iid/IIDHabboNavigator';
import { IIDHabboRoomSessionManager } from '@/com/sulake/iid/IIDHabboRoomSessionManager';
import { IIDHabboSoundManager } from '@/com/sulake/iid/IIDHabboSoundManager';
import { IIDHabboToolbar } from '@/com/sulake/iid/IIDHabboToolbar';
import { IIDHabboTracking } from '@/com/sulake/iid/IIDHabboTracking';
import { IIDHabboWindowManager } from '@/com/sulake/iid/IIDHabboWindowManager';
import { IIDSessionDataManager } from '@/com/sulake/iid/IIDSessionDataManager';

export class HabboHelp extends Component implements IHabboHelp, ILinkEventTracker {
    static { registerClassName(this, 'com.sulake.habbo.help::HabboHelp'); }

    public static readonly REPORT_TYPE_EMERGENCY: number = 1;
    public static readonly REPORT_TYPE_GUIDE: number = 2;
    public static readonly REPORT_TYPE_IM: number = 3;
    public static readonly REPORT_TYPE_ROOM: number = 4;
    public static readonly REPORT_TYPE_BULLY: number = 6;
    public static readonly REPORT_TYPE_THREAD: number = 7;
    public static readonly REPORT_TYPE_MESSAGE: number = 8;
    public static readonly REPORT_TYPE_PHOTO: number = 9;
    private static readonly TOPICS_WITHOUT_IGNORE_AND_UNFRIEND: any[] = [21];

    declare private _toolbar: IHabboToolbar;

    declare private _windowManager: IHabboWindowManager;

    declare private _communicationManager: IHabboCommunicationManager;

    declare private _localizationManager: IHabboLocalizationManager;

    declare private _roomSessionManager: IRoomSessionManager;

    declare private _sessionDataManager: ISessionDataManager;

    declare private _navigator: IHabboNavigator;

    declare private _tracking: IHabboTracking;

    declare private _soundManager: IHabboSoundManager;

    declare private _friendList: IHabboFriendList;

    declare private _freeFlowChat: IHabboFreeFlowChat;

    declare private _messageEvents: IMessageEvent[];

    declare private _SafeStr_3921: ChatEventHandler;

    declare private _SafeStr_7349: InstantMessageEventHandler;

    declare private _guideHelpManager: GuideHelpManager;

    declare private _userRegistry: UserRegistry;

    declare private _chatRegistry: ChatRegistry;

    declare private _instantMessageRegistry: InstantMessageRegistry;

    declare private _SafeStr_3147: NameChangeController;

    declare private _callForHelpManager: CallForHelpManager;

    declare private _SafeStr_3002: WelcomeScreenController;

    declare private _SafeStr_3194: HabboWayController;

    declare private _SafeStr_2677: HabboWayQuizController;

    declare private _SafeStr_3220: SafetyBookletController;

    declare private _outsideRoom: boolean;

    declare private _SafeStr_2429: number;

    declare private _reportMessage: IMessageComposer;

    declare private _requestType: number;

    declare private _currentRoomId: number;

    declare private _callForHelpCategories: CallForHelpCategoryData[];

    declare private _SafeStr_2613: TopicsFlowHelpController;

    declare private _sanctionInfo: SanctionInfo;

    declare private _reportStatus: MyReportStatus;

    constructor(param1: IContext, param2: number = 0, param3: IAssetLibrary = null) {
        super(param1, param2, param3);
    }

    public get localization(): IHabboLocalizationManager {
        return this._localizationManager;
    }

    public get windowManager(): IHabboWindowManager {
        return this._windowManager;
    }

    public get toolbar(): IHabboToolbar {
        return this._toolbar;
    }

    public get roomSessionManager(): IRoomSessionManager {
        return this._roomSessionManager;
    }

    public get sessionDataManager(): ISessionDataManager {
        return this._sessionDataManager;
    }

    public get communicationManager(): IHabboCommunicationManager {
        return this._communicationManager;
    }

    public get navigator(): IHabboNavigator {
        return this._navigator;
    }

    public get tracking(): IHabboTracking {
        return this._tracking;
    }

    public get soundManager(): IHabboSoundManager {
        return this._soundManager;
    }

    public get freeFlowChat(): IHabboFreeFlowChat {
        return this._freeFlowChat;
    }

    public get newUserTourEnabled(): boolean {
        return this.getBoolean("guide.help.new.user.tour.enabled");
    }

    public get newIdentity(): boolean {
        return this.getInteger("new.identity", 0) > 0;
    }

    public get citizenshipEnabled(): boolean {
        return this.getBoolean("talent.track.citizenship.enabled");
    }

    public get safetyQuizDisabled(): boolean {
        return this.getBoolean("safety_quiz.disabled");
    }

    public requestGuide(): void {
        if (this.getBoolean("guides.enabled")) {
            this._guideHelpManager.createHelpRequest(0);
        }
    }

    public reportBully(param1: number): void {
        if (this._callForHelpManager != null) {
            this._callForHelpManager.reportBully(param1, this._currentRoomId);
        }
    }

    public startPhotoReportingInNewCfhFlow(param1: number, param2: string, param3: string, param4: number): void {
        if (this._callForHelpManager != null) {
            this._callForHelpManager.reportedRoomId = this._currentRoomId;
            this._callForHelpManager.reportedUserId = param1;
            this._callForHelpManager.reportedUserName = param2;
            this._callForHelpManager.reportedRoomObjectId = param4;
            this._callForHelpManager.reportedExtraDataId = param3;
            this._SafeStr_2613.openReportingContentReasonCategory(9);
        }
    }

    public reportUser(param1: number, param2: number, param3: string): void {
        this._callForHelpManager.reportedUserId = param1;
        this._SafeStr_2613.openReportingChatLineSelection();
    }

    public reportUserName(param1: number, param2: string): void {
        this._callForHelpManager.reportedUserId = param1;
        this._callForHelpManager.reportedUserName = param2;
        this._callForHelpManager.reportedRoomId = -1;
        this._SafeStr_2613.openReportingUserName();
    }

    public reportUserFromIM(param1: number): void {
        if (this._callForHelpManager != null) {
            this._callForHelpManager.reportedUserId = param1;
            this._SafeStr_2613.openReportingIMSelection();
        }
    }

    public reportRoom(param1: number, param2: string, param3: string): void {
        if (this._callForHelpManager != null) {
            this._callForHelpManager.reportedRoomId = param1;
            this._callForHelpManager.reportedRoomName = param2;
            this._callForHelpManager.reportedUserId = -1;
            this._callForHelpManager.reportedUserName = "";
            this._SafeStr_2613.openReportingContentReasonCategory(4);
        }
    }

    public reportThread(param1: number, param2: number): void {
        if (this._callForHelpManager != null) {
            this._callForHelpManager.reportedGroupId = param1;
            this._callForHelpManager.reportedThreadId = param2;
            this._SafeStr_2613.openReportingContentReasonCategory(7);
        }
    }

    public reportSelfie(param1: string, param2: string, param3: number, param4: number, param5: number): boolean {
        if (this._callForHelpManager != null) {
            if (param2.length < this.getInteger("help.cfh.length.minimum", 15)) {
                this.windowManager.alert("${generic.alert.title}", "${help.cfh.error.msgtooshort}", 0, null);
                return false;
            }
            this._callForHelpManager.reportSelfie(param1, param2, param3, param4, param5);
            return true;
        }
        return false;
    }

    public reportPhoto(param1: string, param2: number, param3: number, param4: number, param5: number): boolean {
        if (this._callForHelpManager != null) {
            if (param2 == 0) {
                this.windowManager.alert("${generic.alert.title}", "${help.cfh.error.notopic}", 0, null);
                return false;
            }
            this._callForHelpManager.reportPhoto(param1, param2, param3, param4, param5);
            return true;
        }
        return false;
    }

    public reportMessage(param1: number, param2: number, param3: number): void {
        if (this._callForHelpManager != null) {
            this._callForHelpManager.reportedGroupId = param1;
            this._callForHelpManager.reportedThreadId = param2;
            this._callForHelpManager.reportedMessageId = param3;
            this._SafeStr_2613.openReportingContentReasonCategory(8);
        }
    }

    public startNameChange(): void {
        if (this._SafeStr_3147 != null) {
            this._SafeStr_3147.showView();
        }
    }

    public startEmergencyRequest(): void {
        if (this._callForHelpManager != null) {
            this._callForHelpManager.openEmergencyHelpRequest();
        }
    }

    public showWelcomeScreen(param1: string, param2: string, param3: number, param4: string = null): void {
        if (this._SafeStr_3002 == null || this._SafeStr_3002.disposed) {
            this._SafeStr_3002 = new WelcomeScreenController(this);
        }
        this._SafeStr_3002.showWelcomeScreen(param1, param2, param3, param4);
    }

    public showHabboWay(): void {
        if (!this._SafeStr_3194) {
            this._SafeStr_3194 = new HabboWayController(this);
        }
        this._SafeStr_3194.showHabboWay();
    }

    public closeHabboWay(): void {
        if (this._SafeStr_3194 != null) {
            this._SafeStr_3194.closeWindow();
        }
    }

    public showSafetyBooklet(): void {
        if (!this._SafeStr_3220) {
            this._SafeStr_3220 = new SafetyBookletController(this);
        }
        this._SafeStr_3220.openSafetyBooklet();
    }

    public closeSafetyBooklet(): void {
        if (this._SafeStr_3220 != null) {
            this._SafeStr_3220.closeWindow();
        }
    }

    public showHabboWayQuiz(): void {
        if (this._SafeStr_2677 == null || this._SafeStr_2677.disposed) {
            this._SafeStr_2677 = new HabboWayQuizController(this);
        }
        this._SafeStr_2677.showHabboWayQuiz();
    }

    public showSafetyQuiz(): void {
        if (this._SafeStr_2677 == null || this._SafeStr_2677.disposed) {
            this._SafeStr_2677 = new HabboWayQuizController(this);
        }
        this._SafeStr_2677.showSafetyQuiz();
    }

    public showTourPopup(): void {
        this._guideHelpManager.openTourPopup();
    }

    protected override get dependencies(): ComponentDependency[] {
        return super.dependencies.concat([new ComponentDependency(new IIDHabboWindowManager(), (param1: IHabboWindowManager): void => {
             this._windowManager = param1;
         }), new ComponentDependency(new IIDSessionDataManager(), (param1: ISessionDataManager): void => {
             this._sessionDataManager = param1;
         }, false), new ComponentDependency(new IIDHabboCommunicationManager(), (param1: IHabboCommunicationManager): void => {
             this._communicationManager = param1;
         }), new ComponentDependency(new IIDHabboToolbar(), (param1: IHabboToolbar): void => {
             this._toolbar = param1;
         }, true, [{ "type": "HTE_TOOLBAR_CLICK", "callback": this.onHabboToolbarEvent }, { "type": "HTE_GROUP_ROOM_INFO_CLICK", "callback": this.onHabboToolbarEvent }, { "type": "HTE_RESIZED", "callback": this.onHabboToolbarEvent }]), new ComponentDependency(new IIDHabboLocalizationManager(), (param1: IHabboLocalizationManager): void => {
             this._localizationManager = param1;
         }), new ComponentDependency(new IIDHabboRoomSessionManager(), (param1: IRoomSessionManager): void => {
             this._roomSessionManager = param1;
         }, true), new ComponentDependency(new IIDHabboNavigator(), (param1: IHabboNavigator): void => {
             this._navigator = param1;
         }, false), new ComponentDependency(new IIDHabboTracking(), (param1: IHabboTracking): void => {
             this._tracking = param1;
         }, false), new ComponentDependency(new IIDHabboSoundManager(), (param1: IHabboSoundManager): void => {
             this._soundManager = param1;
         }, false), new ComponentDependency(new IIDHabboFriendList(), (param1: IHabboFriendList): void => {
             this._friendList = param1;
         }, false), new ComponentDependency(new IIDHabboFreeFlowChat(), (param1: IHabboFreeFlowChat): void => {
             this._freeFlowChat = param1;
         }, false)]);
    }

    protected override initComponent(): void {
        this._messageEvents = new Array<IMessageEvent>(0).fill(null);
        this.addMessageEvent(new GetGuestRoomResultEvent(this.onGuestRoomResult));
        this.addMessageEvent(new UsersMessageEvent(this.onUsers));
        this.addMessageEvent(new CallForHelpPendingCallsMessageEvent(this.onPendingCallsForHelp));
        this.addMessageEvent(new CallForHelpPendingCallsDeletedMessageEvent(this.onPendingCallsForHelpDeleted));
        this.addMessageEvent(new MySanctionStatusMessageEvent(this.onMySanctionStatusMessageEvent));
        this.addMessageEvent(new RoomEntryInfoMessageEvent(this.onRoomEnter));
        this.addMessageEvent(new GuideReportingStatusMessageEvent(this.onGuideReportingStatus));
        this.addMessageEvent(new CfhTopicsInitMessageEvent(this.onCfhTopics));
        this.addMessageEvent(new CallForHelpDisabledNotifyMessageEvent(this.onCallForHelpDisabledNotify));
        this.addMessageEvent(new MyCfhReportStatusMessageEvent(this.onMyCfhReportStatusMessageEvent));
        this.addMessageEvent(new RoomReadyMessageEvent(this.onRoomReady));
        this.addMessageEvent(new Game2StageStartingMessageEvent(this.onGameStageStarting));
        this._SafeStr_3921 = new ChatEventHandler(this);
        this._guideHelpManager = new GuideHelpManager(this);
        this._callForHelpManager = new CallForHelpManager(this);
        this._SafeStr_3147 = new NameChangeController(this);
        this._SafeStr_7349 = new InstantMessageEventHandler(this);
        this._SafeStr_2613 = new TopicsFlowHelpController(this);
        this._sanctionInfo = new SanctionInfo(this);
        this._reportStatus = new MyReportStatus(this);
        this.context.addLinkEventTracker(this);
        if (this.getBoolean("show.sanction.info.on.login") && Math.random() < 0.2) {
            this.requestSanctionInfo(true);
        }
    }

    public addMessageEvent(param1: IMessageEvent): void {
        this._messageEvents.push(this._communicationManager.addHabboConnectionMessageEvent(param1));
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        if (this._messageEvents != null && this._communicationManager != null) {
            for (const _loc1_ of this._messageEvents ?? []) {
                this._communicationManager.removeHabboConnectionMessageEvent(_loc1_);
            }
        }
        if (this._SafeStr_3220 != null) {
            this._SafeStr_3220.dispose();
            this._SafeStr_3220 = null;
        }
        if (this._SafeStr_3194 != null) {
            this._SafeStr_3194.dispose();
            this._SafeStr_3194 = null;
        }
        if (this._SafeStr_3002 != null) {
            this._SafeStr_3002.dispose();
            this._SafeStr_3002 = null;
        }
        if (this._SafeStr_3147 != null) {
            this._SafeStr_3147.dispose();
            this._SafeStr_3147 = null;
        }
        if (this._guideHelpManager) {
            this._guideHelpManager.dispose();
            this._guideHelpManager = null;
        }
        if (this._callForHelpManager) {
            this._callForHelpManager.dispose();
            this._callForHelpManager = null;
        }
        if (this._SafeStr_2677) {
            this._SafeStr_2677.dispose();
            this._SafeStr_2677 = null;
        }
        if (this._SafeStr_2613) {
            this._SafeStr_2613.dispose();
            this._SafeStr_2613 = null;
        }
        if (this._sanctionInfo) {
            this._sanctionInfo.dispose();
            this._sanctionInfo = null;
        }
        super.dispose();
    }

    public getXmlWindow(param1: string, param2: number = 1): IWindow {
        let _loc5_: IAsset = null;
        let _loc3_: XmlAsset = null;
        let _loc4_: IWindow = null;
        try {
            _loc5_ = this.assets.getAssetByName(param1 + "_xml");
            _loc3_ = castTo(_loc5_, XmlAsset);
            _loc4_ = this._windowManager.buildFromXML(XML.from(_loc3_.content), param2);
        } catch (e) {
            ErrorReportStorage.addDebugData("HabboNavigator", "Failed to build window " + param1 + "_xml, " + _loc5_ + ", " + this._windowManager + "!");
            throw e;
        }
        return _loc4_;
    }

    public getModalXmlWindow(param1: string): IModalDialog {
        let _loc4_: IAsset = null;
        let _loc2_: XmlAsset = null;
        let _loc3_: IModalDialog = null;
        try {
            _loc4_ = this.assets.getAssetByName(param1 + "_xml");
            _loc2_ = castTo(_loc4_, XmlAsset);
            _loc3_ = this._windowManager.buildModalDialogFromXML(XML.from(_loc2_.content));
        } catch (e) {
            ErrorReportStorage.addDebugData("HabboNavigator", "Failed to build window " + param1 + "_xml, " + _loc4_ + ", " + this._windowManager + "!");
            throw e;
        }
        return _loc3_;
    }

    public trackGoogle(param1: string, param2: string, param3: number = -1): void {
        if (this._tracking) {
            this._tracking.trackGoogle(param1, param2, param3);
        }
    }

    public setReportMessage(param1: IMessageComposer): void {
        this._reportMessage = param1;
    }

    public sendMessage(param1: IMessageComposer): void {
        if (this._communicationManager != null && param1 != null) {
            this._communicationManager.connection.send(param1);
        }
    }

    public get ownUserName(): string {
        return this._SafeStr_3147.ownUserName;
    }

    public get ownUserId(): number {
        return this._SafeStr_3147.ownUserId;
    }

    public get outsideRoom(): boolean {
        return this._outsideRoom;
    }

    public set outsideRoom(param1: boolean) {
        this._outsideRoom = param1;
    }

    public queryForPendingCallsForHelp(param1: number): void {
        this._SafeStr_2429 = param1;
        this.sendMessage(new GetPendingCallsForHelpMessageComposer());
    }

    public queryForGuideReportingStatus(param1: number): void {
        this._requestType = param1;
        this.sendMessage(new GuideAdvertisementReadMessageComposer());
        this.sendMessage(new GetGuideReportingStatusMessageComposer());
    }

    private onPendingCallsForHelp(param1: IMessageEvent): void {
        let _loc4_: string = null;
        let _loc3_: number = 0;
        let _loc2_: CallForHelpPendingCallsMessageParser = castTo(param1, CallForHelpPendingCallsMessageEvent).getParser();
        if (_loc2_.callCount == 0 || this._SafeStr_2429 == 9 && _loc2_.callCount < 3) {
            this.proceedWithReporting();
        } else {
            _loc4_ = "";
            _loc3_ = 0;
            while (_loc3_ < _loc2_.callArray.length && _loc3_ < 10) {
                _loc4_ += _loc2_.callArray[_loc3_].message;
                if (_loc3_ < _loc2_.callArray.length - 1 && _loc3_ < 9) {
                    _loc4_ += "\n";
                }
                _loc3_++;
            }
            this._callForHelpManager.showPendingRequest(_loc4_);
        }
    }

    private onPendingCallsForHelpDeleted(param1: IMessageEvent): void {
        this._SafeStr_2613.submitCallForHelp(false);
    }

    private onGuideReportingStatus(param1: GuideReportingStatusMessageEvent): void {
        let _loc2_: GuideReportingStatusMessageParser = param1.getParser();
        switch (_loc2_.statusCode) {
            case 0:
                this.toggleNewHelpWindow();
                break;
            case 1:
                this._guideHelpManager.showPendingTicket(_loc2_.pendingTicket);
                break;
            default:
                this._guideHelpManager.showFeedback(_loc2_.localizationCode);
        }
    }

    private proceedWithReporting(): void {
        switch (this._SafeStr_2429 - 1) {
            case 0:
            case 2:
            case 3:
            case 6:
            case 7:
                this._callForHelpManager.showEmergencyHelpRequest(this._SafeStr_2429);
                break;
            case 1:
                this._guideHelpManager.openReportWindow();
                break;
            case 8:
                if (this._reportMessage != null) {
                    this.sendMessage(this._reportMessage);
                    this._reportMessage = null;
                }
        }
        this._SafeStr_2429 = 0;
    }

    private onCallForHelpDisabledNotify(param1: CallForHelpDisabledNotifyMessageEvent): void {
        this._windowManager.simpleAlert("${help.emergency.global_mute.caption}", "${help.emergency.global_mute.subtitle}", "${help.emergency.global_mute.message}", "${help.emergency.global_mute.link}", param1.getParser().infoUrl);
    }

    public get friendList(): IHabboFriendList {
        return this._friendList;
    }

    public ignoreAndUnfriendReportedUser(param1: number): void {
        let _loc2_: RemoveFriendMessageComposer = null;
        if (this._callForHelpManager.reportedUserId <= 0 || HabboHelp.TOPICS_WITHOUT_IGNORE_AND_UNFRIEND.indexOf(param1) >= 0) {
            return;
        }
        this.sendMessage(new IgnoreUserMessageComposer(this._callForHelpManager.reportedUserId));
        if (this._friendList.getFriend(this._callForHelpManager.reportedUserId) != null) {
            _loc2_ = new RemoveFriendMessageComposer();
            _loc2_.addRemovedFriend(this._callForHelpManager.reportedUserId);
            this.sendMessage(_loc2_);
        }
    }

    private onUsers(param1: IMessageEvent): void {
        let _loc3_: number = 0;
        let _loc4_: UserMessageData = null;
        let _loc2_: UsersMessageParser = castTo(param1, UsersMessageEvent).getParser();
        _loc3_ = 0;
        while (_loc3_ < _loc2_.getUserCount()) {
            _loc4_ = _loc2_.getUser(_loc3_);
            if (_loc4_.webID != this.ownUserId && _loc4_.userType == 1) {
                this._userRegistry.registerUser(_loc4_.webID, _loc4_.name, _loc4_.figure);
            }
            _loc3_++;
        }
    }

    private onGameStageStarting(param1: Game2StageStartingMessageEvent): void {
        let _loc6_: HumanGameObjectData = null;
        let _loc2_: Game2StageStartingMessageParser = param1.getParser();
        let _loc5_: any[] = _loc2_.gameObjects.gameObjects;
        let _loc4_: number = this._userRegistry.roomId;
        let _loc3_: string = this._userRegistry.roomName;
        this._userRegistry.registerRoom(-1, "SnowStorm");
        for (const _loc7_ of _loc5_ ?? []) {
            _loc6_ = _loc7_ instanceof HumanGameObjectData ? _loc7_ : null;
            if (_loc6_ != null && _loc6_.userId != this.ownUserId) {
                this._userRegistry.registerUser(_loc6_.userId, _loc6_.name, _loc6_.figure);
            }
        }
        this._userRegistry.registerRoom(_loc4_, _loc3_);
    }

    private onRoomReady(param1: IMessageEvent): void {
        let _loc2_: RoomReadyMessageParser = castTo(param1, RoomReadyMessageEvent).getParser();
        this._userRegistry.registerRoom(_loc2_.roomId, "");
    }

    private onGuestRoomResult(param1: IMessageEvent): void {
        let _loc2_: GetGuestRoomResultMessageParser = castTo(param1, GetGuestRoomResultEvent).getParser();
        this._userRegistry.registerRoom(_loc2_.data.flatId, _loc2_.data.roomName);
    }

    public get userRegistry(): UserRegistry {
        return this._userRegistry;
    }

    public get chatRegistry(): ChatRegistry {
        return this._chatRegistry;
    }

    public get instantMessageRegistry(): InstantMessageRegistry {
        return this._instantMessageRegistry;
    }

    private onRoomEnter(param1: RoomEntryInfoMessageEvent): void {
        let _loc2_: RoomEntryInfoMessageParser = param1.getParser();
        this._currentRoomId = _loc2_.guestRoomId;
    }

    private onCfhTopics(param1: CfhTopicsInitMessageEvent): void {
        let _loc2_: CfhTopicsInitMessageParser = param1.getParser();
        this._callForHelpCategories = _loc2_.callForHelpCategories;
    }

    public get callForHelpCategories(): CallForHelpCategoryData[] {
        return this._callForHelpCategories;
    }

    public get guardiansEnabled(): boolean {
        return this.getBoolean("guardians.enabled");
    }

    public get linkPattern(): string {
        return "help/";
    }

    public get reportedUserId(): number {
        return this._callForHelpManager.reportedUserId;
    }

    public get reportedUserName(): string {
        return this._callForHelpManager.reportedUserName;
    }

    public get reportedRoomId(): number {
        return this._callForHelpManager.reportedRoomId;
    }

    public get reportedExtraDataId(): string {
        return this._callForHelpManager.reportedExtraDataId;
    }

    public get reportedRoomObjectId(): number {
        return this._callForHelpManager.reportedRoomObjectId;
    }

    public set reportedUserId(param1: number) {
        this._callForHelpManager.reportedUserId = param1;
    }

    public set reportedRoomId(param1: number) {
        this._callForHelpManager.reportedRoomId = param1;
    }

    public linkReceived(param1: string): void {
        let _loc2_: any[] = null;
        let _loc3_: number = 0;
        let _loc4_: string = null;
        if (param1 == "help/tour") {
            this.requestGuide();
        }
        if (param1.indexOf("help/report/room/") == 0) {
            _loc2_ = param1.split("/");
            if (_loc2_.length >= 5) {
                _loc3_ = parseInt(stringOrNull(_loc2_[3])) | 0;
                _loc4_ = unescape(stringOrNull(_loc2_.splice(4).join("/")));
                this.reportRoom(_loc3_, _loc4_, "");
            }
        }
    }

    private onHabboToolbarEvent(param1: HabboToolbarEvent): void {
        if (this._SafeStr_3002 != null) {
            this._SafeStr_3002.onHabboToolbarEvent(param1);
        }
        if (this._guideHelpManager != null) {
            this._guideHelpManager.onHabboToolbarEvent(param1);
        }
    }

    public get callForHelpManager(): CallForHelpManager {
        return this._callForHelpManager;
    }

    public toggleNewHelpWindow(): void {
        this._SafeStr_2613.toggleWindow();
    }

    public requestSanctionInfo(param1: boolean): void {
        this.sendMessage(new GetMySanctionStatusMessageComposer());
    }

    public requestReportsStatus(): void {
        this.sendMessage(new GetCfhMyReportStatus());
    }

    private onMySanctionStatusMessageEvent(param1: MySanctionStatusMessageEvent): void {
        this._sanctionInfo.openWindow(param1);
    }

    private onMyCfhReportStatusMessageEvent(param1: MyCfhReportStatusMessageEvent): void {
        this._reportStatus.openWindow(param1);
    }

    public openCfhFaq(): void {
        let _loc1_: string = this.context.configuration.getProperty("cfh.faq.url");
        if (!StringUtil.isEmpty(_loc1_)) {
            navigateToURL(new URLRequest(_loc1_));
        }
    }

    public get guideHelpManager(): GuideHelpManager {
        return this._guideHelpManager;
    }

    protected override initInstanceFields(): void {
        this.onPendingCallsForHelp = this.onPendingCallsForHelp.bind(this);
        this.onPendingCallsForHelpDeleted = this.onPendingCallsForHelpDeleted.bind(this);
        this.onGuideReportingStatus = this.onGuideReportingStatus.bind(this);
        this.onCallForHelpDisabledNotify = this.onCallForHelpDisabledNotify.bind(this);
        this.onUsers = this.onUsers.bind(this);
        this.onGameStageStarting = this.onGameStageStarting.bind(this);
        this.onRoomReady = this.onRoomReady.bind(this);
        this.onGuestRoomResult = this.onGuestRoomResult.bind(this);
        this.onRoomEnter = this.onRoomEnter.bind(this);
        this.onCfhTopics = this.onCfhTopics.bind(this);
        this.onHabboToolbarEvent = this.onHabboToolbarEvent.bind(this);
        this.onMySanctionStatusMessageEvent = this.onMySanctionStatusMessageEvent.bind(this);
        this.onMyCfhReportStatusMessageEvent = this.onMyCfhReportStatusMessageEvent.bind(this);
        this._userRegistry = new UserRegistry();
        this._chatRegistry = new ChatRegistry();
        this._instantMessageRegistry = new InstantMessageRegistry();
        this._outsideRoom = false;
        this._SafeStr_2429 = 0;
        this._requestType = -1;
        this._currentRoomId = 0;
        super.initInstanceFields();
    }

    get [IHabboHelp](): true {
        return true;
    }
}
