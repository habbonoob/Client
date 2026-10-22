import { asInstanceOf, castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { ILinkEventTracker } from '@/com/sulake/core/runtime/events/ILinkEventTracker';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { _SafeCls_6006 } from '@/com/sulake/habbo/catalog/habbicons/_SafeCls_6006';
import type { IHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import type { ConsoleMessageHistoryMessageParser } from '@/com/sulake/habbo/communication/messages/parser/friendlist/ConsoleMessageHistoryMessageParser';
import type { InstantMessageErrorMessageParser } from '@/com/sulake/habbo/communication/messages/parser/friendlist/InstantMessageErrorMessageParser';
import type { NewConsoleMessageMessageParser } from '@/com/sulake/habbo/communication/messages/parser/friendlist/NewConsoleMessageMessageParser';
import type { RoomInviteMessageParser } from '@/com/sulake/habbo/communication/messages/parser/friendlist/RoomInviteMessageParser';
import type { IFriend } from '@/com/sulake/habbo/friendlist/IFriend';
import type { IHabboFriendList } from '@/com/sulake/habbo/friendlist/IHabboFriendList';
import type { IHabboHelp } from '@/com/sulake/habbo/help/IHabboHelp';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { ChatEntry } from '@/com/sulake/habbo/messenger/ChatEntry';
import type { IHabboMessenger } from '@/com/sulake/habbo/messenger/IHabboMessenger';
import type { ISessionDataManager } from '@/com/sulake/habbo/session/ISessionDataManager';
import type { IHabboSoundManager } from '@/com/sulake/habbo/sound/IHabboSoundManager';
import type { IHabboTracking } from '@/com/sulake/habbo/tracking/IHabboTracking';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { Component } from '@/com/sulake/core/runtime/Component.group';
import { ComponentDependency } from '@/com/sulake/core/runtime/ComponentDependency';
import { ConsoleMessageHistoryEvent } from '@/com/sulake/habbo/communication/messages/incoming/friendlist/ConsoleMessageHistoryEvent';
import { InstantMessageErrorEvent } from '@/com/sulake/habbo/communication/messages/incoming/friendlist/InstantMessageErrorEvent';
import { MessengerInitEvent } from '@/com/sulake/habbo/communication/messages/incoming/friendlist/MessengerInitEvent';
import { MiniMailNewMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/friendlist/MiniMailNewMessageEvent';
import { MiniMailUnreadCountEvent } from '@/com/sulake/habbo/communication/messages/incoming/friendlist/MiniMailUnreadCountEvent';
import { NewConsoleMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/friendlist/NewConsoleMessageEvent';
import { RoomInviteEvent } from '@/com/sulake/habbo/communication/messages/incoming/friendlist/RoomInviteEvent';
import { AccountPreferencesEvent } from '@/com/sulake/habbo/communication/messages/incoming/preferences/AccountPreferencesEvent';
import { HabboGroupDetailsMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/users/HabboGroupDetailsMessageEvent';
import { OpenFlatConnectionMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/session/OpenFlatConnectionMessageComposer';
import { MiniMailUnreadCountMessageParser } from '@/com/sulake/habbo/communication/messages/parser/friendlist/MiniMailUnreadCountMessageParser';
import { Logger } from '@/com/sulake/habbo/Logger';
import { DummyFriend } from '@/com/sulake/habbo/messenger/DummyFriend';
import { ActiveConversationEvent } from '@/com/sulake/habbo/messenger/events/ActiveConversationEvent';
import { MiniMailMessageEvent } from '@/com/sulake/habbo/messenger/events/MiniMailMessageEvent';
import { MainView } from '@/com/sulake/habbo/messenger/MainView';
import { IIDHabbiconController } from '@/com/sulake/iid/IIDHabbiconController';
import { IIDHabboCommunicationManager } from '@/com/sulake/iid/IIDHabboCommunicationManager';
import { IIDHabboFriendList } from '@/com/sulake/iid/IIDHabboFriendList';
import { IIDHabboHelp } from '@/com/sulake/iid/IIDHabboHelp';
import { IIDHabboLocalizationManager } from '@/com/sulake/iid/IIDHabboLocalizationManager';
import { IIDHabboSoundManager } from '@/com/sulake/iid/IIDHabboSoundManager';
import { IIDHabboTracking } from '@/com/sulake/iid/IIDHabboTracking';
import { IIDHabboWindowManager } from '@/com/sulake/iid/IIDHabboWindowManager';
import { IIDSessionDataManager } from '@/com/sulake/iid/IIDSessionDataManager';

export class HabboMessenger extends Component implements IHabboMessenger, ILinkEventTracker {
    static { registerClassName(this, 'com.sulake.habbo.messenger::HabboMessenger'); }

    declare private _windowManager: IHabboWindowManager;

    declare private _communication: IHabboCommunicationManager;

    declare private _localization: IHabboLocalizationManager;

    declare private _friendList: IHabboFriendList;

    declare private _soundManager: IHabboSoundManager;

    declare private _tracking: IHabboTracking;

    declare private _SafeStr_3762: number;

    declare private _sessionDataManager: ISessionDataManager;

    declare private _help: IHabboHelp;

    declare private _habbiconController: _SafeCls_6006;

    declare private _SafeStr_2276: MainView;

    declare private _messageEvents: IMessageEvent[];

    declare private _roomInvitesIgnored: boolean;

    declare private _onlineIndicatorPreference: number;

    declare private _followingToGroupRoom: boolean;

    constructor(param1: IContext, param2: number = 0, param3: IAssetLibrary = null) {
        super(param1, param2, param3);
    }

    protected override get dependencies(): ComponentDependency[] {
        return super.dependencies.concat([new ComponentDependency(new IIDHabboWindowManager(), (param1: IHabboWindowManager): void => {
             this._windowManager = param1;
         }), new ComponentDependency(new IIDHabboSoundManager(), (param1: IHabboSoundManager): void => {
             this._soundManager = param1;
         }), new ComponentDependency(new IIDHabboCommunicationManager(), (param1: IHabboCommunicationManager): void => {
             this._communication = param1;
         }), new ComponentDependency(new IIDHabboLocalizationManager(), (param1: IHabboLocalizationManager): void => {
             this._localization = param1;
         }), new ComponentDependency(new IIDHabboFriendList(), (param1: IHabboFriendList): void => {
             this._friendList = param1;
         }), new ComponentDependency(new IIDSessionDataManager(), (param1: ISessionDataManager): void => {
             this._sessionDataManager = param1;
         }), new ComponentDependency(new IIDHabboTracking(), (param1: IHabboTracking): void => {
             this._tracking = param1;
         }), new ComponentDependency(new IIDHabboHelp(), (param1: IHabboHelp): void => {
             this._help = param1;
         }), new ComponentDependency(new IIDHabbiconController(), (param1: _SafeCls_6006): void => {
             this._habbiconController = param1;
         }, false)]);
    }

    protected override initComponent(): void {
        this._messageEvents = new Array<IMessageEvent>(0).fill(null);
        this.addMessageEvent(new MessengerInitEvent(this.onMessengerInit));
        this.addMessageEvent(new AccountPreferencesEvent(this.onAccountPreferences));
        this.addMessageEvent(new HabboGroupDetailsMessageEvent(this.onHabboGroupDetails));
        if (this.getBoolean("client.minimail.embed.enabled")) {
            this.addMessageEvent(new MiniMailNewMessageEvent(this.onMiniMailMessage));
            this.addMessageEvent(new MiniMailUnreadCountEvent(this.onMiniMailUnreadCount));
        }
        this.context.addLinkEventTracker(this);
    }

    private addMessageEvent(param1: IMessageEvent): void {
        this._messageEvents.push(this._communication.addHabboConnectionMessageEvent(param1));
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        if (this._messageEvents != null && this._communication != null) {
            for (const _loc1_ of this._messageEvents ?? []) {
                this._communication.removeHabboConnectionMessageEvent(_loc1_);
            }
        }
        super.dispose();
    }

    private onMiniMailMessage(param1: IMessageEvent): void {
        this._SafeStr_3762 = this._SafeStr_3762 + 1;
        this.playMessageReceivedSound();
        this.events.dispatchEvent(new MiniMailMessageEvent("MMME_new", this._SafeStr_3762));
    }

    private onMiniMailUnreadCount(param1: IMessageEvent): void {
        this._SafeStr_3762 = (asInstanceOf(param1.parser, MiniMailUnreadCountMessageParser)).unreadMessageCount;
        this.events.dispatchEvent(new MiniMailMessageEvent("MMME_unread", this._SafeStr_3762));
    }

    private onAccountPreferences(param1: AccountPreferencesEvent): void {
        this._roomInvitesIgnored = param1.getParser().roomInvitesIgnored;
        this._onlineIndicatorPreference = param1.getParser().onlineIndicatorPreference;
    }

    private onHabboGroupDetails(param1: HabboGroupDetailsMessageEvent): void {
        if (this._followingToGroupRoom) {
            this._followingToGroupRoom = false;
            this.send(new OpenFlatConnectionMessageComposer(param1.data.roomId));
        }
    }

    public getRoomInvitesIgnored(): boolean {
        return this._roomInvitesIgnored;
    }

    public setRoomInvitesIgnored(param1: boolean): void {
        this._roomInvitesIgnored = param1;
    }

    public getOnlineIndicatorPreference(): number {
        return this._onlineIndicatorPreference;
    }

    public setOnlineIndicatorPreference(param1: number): void {
        this._onlineIndicatorPreference = param1;
    }

    private onMessengerInit(param1: IMessageEvent): void {
        this._SafeStr_2276 = new MainView(this);
        this.addMessageEvent(new NewConsoleMessageEvent(this.onNewConsoleMessage));
        this.addMessageEvent(new ConsoleMessageHistoryEvent(this.onConsoleHistory));
        this.addMessageEvent(new InstantMessageErrorEvent(this.onInstantMessageError));
        this.addMessageEvent(new RoomInviteEvent(this.onRoomInvite));
    }

    public startConversation(param1: number): void {
        if (this._SafeStr_2276 != null) {
            this._SafeStr_2276.startConversation(param1);
            this._SafeStr_2276.show(true);
        }
    }

    public getUnseenMiniMailMessageCount(): number {
        return this._SafeStr_3762;
    }

    public setFollowingAllowed(param1: number, param2: boolean): void {
        if (this._SafeStr_2276 != null) {
            this._SafeStr_2276.setFollowingAllowed(param1, param2);
        }
    }

    public setOnlineStatus(param1: number, param2: boolean): void {
        if (this._SafeStr_2276 != null) {
            this._SafeStr_2276.setOnlineStatus(param1, param2);
        }
    }

    public send(param1: IMessageComposer): void {
        this._communication.connection.send(param1);
    }

    public playSendSound(): void {
        if (this._soundManager != null) {
            this._soundManager.playSound("HBST_message_sent");
        }
    }

    public isOpen(): boolean {
        return this._SafeStr_2276 != null && this._SafeStr_2276.isOpen;
    }

    public toggleMessenger(): void {
        if (this._SafeStr_2276 != null) {
            this._SafeStr_2276.toggle();
        }
    }

    public hideTransientSelectors(): void {
        if (this._SafeStr_2276 != null) {
            this._SafeStr_2276.hideTransientSelectors();
        }
    }

    public getText(param1: string): string {
        return this._localization.getLocalization(param1, param1);
    }

    private onNewConsoleMessage(param1: NewConsoleMessageEvent): void {
        let _loc2_: NewConsoleMessageMessageParser = param1.getParser();
        Logger.log("Received console msg: " + _loc2_.messageText + ", " + _loc2_.chatId);
        if (this._SafeStr_2276 != null) {
            this._SafeStr_2276.addConsoleMessage(_loc2_.chatId | 0, _loc2_.messageType, _loc2_.messageText, _loc2_.habbiconId, _loc2_.secondsSinceSent, _loc2_.messageId, _loc2_.confirmationId, _loc2_.senderId | 0, _loc2_.senderName, _loc2_.senderFigure);
            if (!this._SafeStr_2276.isOpen) {
                this.playMessageReceivedSound();
            }
        }
    }

    private onConsoleHistory(param1: ConsoleMessageHistoryEvent): void {
        let _loc2_: ConsoleMessageHistoryMessageParser = param1.getParser();
        if (this._SafeStr_2276 != null) {
            this._SafeStr_2276.loadMessageHistory(_loc2_.chatId, _loc2_.historyFragment);
        }
    }

    private onRoomInvite(param1: RoomInviteEvent): void {
        let _loc2_: RoomInviteMessageParser = param1.getParser();
        if (this._SafeStr_2276 != null) {
            this._SafeStr_2276.addRoomInvite(_loc2_.senderId, _loc2_.messageText);
            if (!this._SafeStr_2276.isOpen) {
                this.playMessageReceivedSound();
            }
        }
    }

    private playMessageReceivedSound(): void {
        if (this._soundManager != null) {
            this._soundManager.playSound("HBST_message_received");
        }
    }

    private onInstantMessageError(param1: IMessageEvent): void {
        let _loc2_: InstantMessageErrorMessageParser = (param1 instanceof InstantMessageErrorEvent ? param1 : null).getParser();
        if (this._SafeStr_2276 != null) {
            this._SafeStr_2276.onInstantMessageError(_loc2_.userId, _loc2_.errorCode, _loc2_.message);
        }
    }

    public conversationCountUpdated(param1: number, param2: boolean): void {
        this.events.dispatchEvent(new ActiveConversationEvent("ACCE_changed", param1, param2));
    }

    public getXmlWindow(param1: string): IWindow {
        let _loc3_: IAsset = this.assets.getAssetByName(param1 + "_xml");
        let _loc2_: XmlAsset = castTo(_loc3_, XmlAsset);
        return this._windowManager.buildFromXML(XML.from(_loc2_.content));
    }

    public trackGoogle(param1: string, param2: string, param3: number = -1): void {
        if (this._tracking) {
            this._tracking.trackGoogle(param1, param2, param3);
        }
    }

    public getFriend(param1: number, param2: ChatEntry = null): IFriend {
        let _loc3_: IFriend = this._friendList.getFriend(param1);
        if (_loc3_ == null && param2 != null) {
            return new DummyFriend(param2.senderId, param2.senderName, param2.senderFigure);
        }
        return _loc3_;
    }

    public get sessionDataManager(): ISessionDataManager {
        return this._sessionDataManager;
    }

    public get localization(): IHabboLocalizationManager {
        return this._localization;
    }

    public get windowManager(): IHabboWindowManager {
        return this._windowManager;
    }

    public get habbiconController(): _SafeCls_6006 {
        return this._habbiconController;
    }

    public reportUser(param1: number): void {
        this._help.reportUserFromIM(param1);
    }

    public set followingToGroupRoom(param1: boolean) {
        this._followingToGroupRoom = param1;
    }

    public closeConversation(param1: number): void {
        this._SafeStr_2276.hideConversation(param1);
    }

    public get linkPattern(): string {
        return "messenger/";
    }

    public linkReceived(param1: string): void {
        let _loc2_: any[] = param1.split("/");
        if (_loc2_.length < 2) {
            return;
        }
        let _loc3_: number = _loc2_[1] | 0;
        this.startConversation(_loc3_);
    }

    protected override initInstanceFields(): void {
        this.onMiniMailMessage = this.onMiniMailMessage.bind(this);
        this.onMiniMailUnreadCount = this.onMiniMailUnreadCount.bind(this);
        this.onAccountPreferences = this.onAccountPreferences.bind(this);
        this.onHabboGroupDetails = this.onHabboGroupDetails.bind(this);
        this.onMessengerInit = this.onMessengerInit.bind(this);
        this.onNewConsoleMessage = this.onNewConsoleMessage.bind(this);
        this.onConsoleHistory = this.onConsoleHistory.bind(this);
        this.onRoomInvite = this.onRoomInvite.bind(this);
        this.onInstantMessageError = this.onInstantMessageError.bind(this);
        this._SafeStr_3762 = 0;
        this._roomInvitesIgnored = false;
        this._onlineIndicatorPreference = 0;
        this._followingToGroupRoom = false;
        super.initInstanceFields();
    }
}
