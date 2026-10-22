import { castTo } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { ILinkEventTracker } from '@/com/sulake/core/runtime/events/ILinkEventTracker';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import type { ICoreConfiguration } from '@/com/sulake/core/runtime/ICoreConfiguration';
import type { IHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import type { ExtendedForumData } from '@/com/sulake/habbo/communication/messages/parser/groupforums/ExtendedForumData';
import type { ForumData } from '@/com/sulake/habbo/communication/messages/parser/groupforums/ForumData';
import type { ForumThreadsMessageParser } from '@/com/sulake/habbo/communication/messages/parser/groupforums/ForumThreadsMessageParser';
import type { GetForumsListMessageParser } from '@/com/sulake/habbo/communication/messages/parser/groupforums/GetForumsListMessageParser';
import type { PostMessageMessageParser } from '@/com/sulake/habbo/communication/messages/parser/groupforums/PostMessageMessageParser';
import type { PostThreadMessageParser } from '@/com/sulake/habbo/communication/messages/parser/groupforums/PostThreadMessageParser';
import type { ThreadData } from '@/com/sulake/habbo/communication/messages/parser/groupforums/ThreadData';
import type { ThreadMessagesMessageParser } from '@/com/sulake/habbo/communication/messages/parser/groupforums/ThreadMessagesMessageParser';
import type { UpdateMessageMessageParser } from '@/com/sulake/habbo/communication/messages/parser/groupforums/UpdateMessageMessageParser';
import type { UpdateThreadMessageParser } from '@/com/sulake/habbo/communication/messages/parser/groupforums/UpdateThreadMessageParser';
import type { ComposeMessageView } from '@/com/sulake/habbo/friendbar/groupforums/ComposeMessageView';
import type { ForumSettingsView } from '@/com/sulake/habbo/friendbar/groupforums/ForumSettingsView';
import type { IHabboGroupForumController } from '@/com/sulake/habbo/friendbar/groupforums/IHabboGroupForumController';
import type { IHabboHelp } from '@/com/sulake/habbo/help/IHabboHelp';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IHabboNotifications } from '@/com/sulake/habbo/notifications/IHabboNotifications';
import type { IHabboSoundManager } from '@/com/sulake/habbo/sound/IHabboSoundManager';
import type { IHabboTracking } from '@/com/sulake/habbo/tracking/IHabboTracking';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { Component } from '@/com/sulake/core/runtime/Component.group';
import { ComponentDependency } from '@/com/sulake/core/runtime/ComponentDependency';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { ForumDataMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/groupforums/ForumDataMessageEvent';
import { ForumsListMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/groupforums/ForumsListMessageEvent';
import { ForumThreadsMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/groupforums/ForumThreadsMessageEvent';
import { PostMessageMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/groupforums/PostMessageMessageEvent';
import { PostThreadMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/groupforums/PostThreadMessageEvent';
import { ThreadMessagesMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/groupforums/ThreadMessagesMessageEvent';
import { UnreadForumsCountMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/groupforums/UnreadForumsCountMessageEvent';
import { UpdateMessageMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/groupforums/UpdateMessageMessageEvent';
import { UpdateThreadMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/groupforums/UpdateThreadMessageEvent';
import { GetForumsListMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/groupforums/GetForumsListMessageComposer';
import { GetForumStatsMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/groupforums/GetForumStatsMessageComposer';
import { GetMessagesMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/groupforums/GetMessagesMessageComposer';
import { GetThreadMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/groupforums/GetThreadMessageComposer';
import { GetThreadsMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/groupforums/GetThreadsMessageComposer';
import { GetUnreadForumsCountMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/groupforums/GetUnreadForumsCountMessageComposer';
import { ModerateMessageMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/groupforums/ModerateMessageMessageComposer';
import { ModerateThreadMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/groupforums/ModerateThreadMessageComposer';
import { PostMessageMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/groupforums/PostMessageMessageComposer';
import { UpdateForumReadMarkerMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/groupforums/UpdateForumReadMarkerMessageComposer';
import { UpdateForumSettingsMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/groupforums/UpdateForumSettingsMessageComposer';
import { UpdateThreadMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/groupforums/UpdateThreadMessageComposer';
import { GetExtendedProfileMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/GetExtendedProfileMessageComposer';
import { MessageData } from '@/com/sulake/habbo/communication/messages/parser/groupforums/MessageData';
import { ForumsListData } from '@/com/sulake/habbo/friendbar/groupforums/ForumsListData';
import { MessagesListData } from '@/com/sulake/habbo/friendbar/groupforums/MessagesListData';
import { ThreadsListData } from '@/com/sulake/habbo/friendbar/groupforums/ThreadsListData';
import { UnseenForumsCountUpdatedEvent } from '@/com/sulake/habbo/friendbar/groupforums/UnseenForumsCountUpdatedEvent';
import { GroupForumView } from '@/com/sulake/habbo/friendbar/HabboFriendBar.group';
import { IIDHabboCommunicationManager } from '@/com/sulake/iid/IIDHabboCommunicationManager';
import { IIDHabboConfigurationManager } from '@/com/sulake/iid/IIDHabboConfigurationManager';
import { IIDHabboHelp } from '@/com/sulake/iid/IIDHabboHelp';
import { IIDHabboLocalizationManager } from '@/com/sulake/iid/IIDHabboLocalizationManager';
import { IIDHabboNotifications } from '@/com/sulake/iid/IIDHabboNotifications';
import { IIDHabboSoundManager } from '@/com/sulake/iid/IIDHabboSoundManager';
import { IIDHabboToolbar } from '@/com/sulake/iid/IIDHabboToolbar';
import { IIDHabboTracking } from '@/com/sulake/iid/IIDHabboTracking';
import { IIDHabboWindowManager } from '@/com/sulake/iid/IIDHabboWindowManager';

export class GroupForumController extends Component implements IHabboGroupForumController, ILinkEventTracker {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.groupforums::GroupForumController'); }

    public static readonly FORUMS_LIST_CODE_ACTIVE: number = 0;
    public static readonly FORUMS_LIST_CODE_POPULAR: number = 1;
    public static readonly FORUMS_LIST_CODE_MY_FORUMS: number = 2;
    public static readonly NO_ID: number = -1;

    declare private _configurationManager: ICoreConfiguration;

    declare private _communicationManager: IHabboCommunicationManager;

    declare private _windowManager: IHabboWindowManager;

    declare private _localizationManager: IHabboLocalizationManager;

    declare private _help: IHabboHelp;

    declare private _notifications: IHabboNotifications;

    declare private _soundManager: IHabboSoundManager;

    declare private _habboTracking: IHabboTracking;

    declare private _SafeStr_2276: GroupForumView;

    declare private _composeMessageView: ComposeMessageView;

    declare private _forumSettingsView: ForumSettingsView;

    declare private _requestedForumsListCode: number;

    declare private _SafeStr_3341: number;

    declare private _forumData: ExtendedForumData;

    declare private _SafeStr_4089: number;

    declare private _SafeStr_2592: number;

    declare private _SafeStr_2485: ForumsListData;

    declare private _SafeStr_2897: ThreadsListData;

    declare private _SafeStr_3374: MessagesListData;

    declare private _lastReadMessageIndexByThread: Map<any, any>;

    declare private _SafeStr_5323: number;

    declare private _SafeStr_5475: number;

    declare private _lastPostTime: number;

    declare private _unreadForumsCount: number;

    declare private _SafeStr_3694: Timer;

    constructor(param1: IContext, param2: number = 0, param3: IAssetLibrary = null) {
        super(param1, param2, param3);
    }

    public get composeMessageView(): ComposeMessageView {
        return this._composeMessageView;
    }

    public set composeMessageView(param1: ComposeMessageView) {
        this._composeMessageView = param1;
    }

    public get forumSettingsView(): ForumSettingsView {
        return this._forumSettingsView;
    }

    public set forumSettingsView(param1: ForumSettingsView) {
        this._forumSettingsView = param1;
    }

    public get notifications(): IHabboNotifications {
        return this._notifications;
    }

    public get windowManager(): IHabboWindowManager {
        return this._windowManager;
    }

    public get localizationManager(): IHabboLocalizationManager {
        return this._localizationManager;
    }

    public get lastPostTime(): number {
        return this._lastPostTime;
    }

    public get unreadForumsCount(): number {
        return this._unreadForumsCount;
    }

    public get tracking(): IHabboTracking {
        return this._habboTracking;
    }

    protected override get dependencies(): ComponentDependency[] {
        return super.dependencies.concat([new ComponentDependency(new IIDHabboConfigurationManager(), (param1: ICoreConfiguration): void => {
             this._configurationManager = param1;
         }), new ComponentDependency(new IIDHabboCommunicationManager(), (param1: IHabboCommunicationManager): void => {
             this._communicationManager = param1;
         }), new ComponentDependency(new IIDHabboLocalizationManager(), (param1: IHabboLocalizationManager): void => {
             this._localizationManager = param1;
         }), new ComponentDependency(new IIDHabboHelp(), (param1: IHabboHelp): void => {
             this._help = param1;
         }), new ComponentDependency(new IIDHabboNotifications(), (param1: IHabboNotifications): void => {
             this._notifications = param1;
         }), new ComponentDependency(new IIDHabboWindowManager(), (param1: IHabboWindowManager): void => {
             this._windowManager = param1;
         }), new ComponentDependency(new IIDHabboSoundManager(), (param1: IHabboSoundManager): void => {
             this._soundManager = param1;
         }), new ComponentDependency(new IIDHabboTracking(), (param1: IHabboTracking): void => {
             this._habboTracking = param1;
         }), new ComponentDependency(new IIDHabboToolbar(), null)]);
    }

    protected override initComponent(): void {
        this._communicationManager.addHabboConnectionMessageEvent(new UpdateThreadMessageEvent(this.onUpdateThread));
        this._communicationManager.addHabboConnectionMessageEvent(new PostMessageMessageEvent(this.onPostMessageMessage));
        this._communicationManager.addHabboConnectionMessageEvent(new UpdateMessageMessageEvent(this.onUpdateMessage));
        this._communicationManager.addHabboConnectionMessageEvent(new ForumDataMessageEvent(this.onForumData));
        this._communicationManager.addHabboConnectionMessageEvent(new ForumsListMessageEvent(this.onForumsList));
        this._communicationManager.addHabboConnectionMessageEvent(new UnreadForumsCountMessageEvent(this.onUnreadForumsCountMessage));
        this._communicationManager.addHabboConnectionMessageEvent(new PostThreadMessageEvent(this.onPostThreadMessage));
        this._communicationManager.addHabboConnectionMessageEvent(new ThreadMessagesMessageEvent(this.onThreadMessageList));
        this._communicationManager.addHabboConnectionMessageEvent(new ForumThreadsMessageEvent(this.onThreadList));
        this.context.addLinkEventTracker(this);
        this.startPollingForUnreadForumsCount();
    }

    public override dispose(): void {
        if (this._SafeStr_3694 != null) {
            this._SafeStr_3694.stop();
            this._SafeStr_3694 = null;
        }
        super.dispose();
    }

    private startPollingForUnreadForumsCount(): void {
        let _loc1_: number = this._configurationManager.getInteger("groupforum.poll.period", 300);
        this._SafeStr_3694 = new Timer(_loc1_ * 1000, 0);
        this._SafeStr_3694.addEventListener("timer", this.onUnreadForumsCountUpdateTimerEvent);
        this._SafeStr_3694.start();
        this.onUnreadForumsCountUpdateTimerEvent(null);
    }

    public openGroupForum(param1: number): void {
        if (!this._communicationManager) {
            return;
        }
        this.initForum(param1);
        this.requestThreadList(param1, 0);
    }

    public get linkPattern(): string {
        return "groupforum/";
    }

    public linkReceived(param1: string): void {
        let _loc5_: number = 0;
        let _loc6_: number = 0;
        let _loc2_: number = 0;
        let _loc4_: number = 0;
        if (!this._communicationManager) {
            return;
        }
        let _loc3_: any[] = param1.split("/");
        if (_loc3_.length < 2) {
            return;
        }
        if (_loc3_[1] == "list") {
            if (_loc3_.length == 3) {
                switch (_loc3_[2]) {
                    case "active":
                        _loc5_ = 0;
                        break;
                    case "popular":
                        _loc5_ = 1;
                        break;
                    case "my":
                        _loc5_ = 2;
                        break;
                    default:
                        return;
                }
                this.openForumsList(_loc5_);
            }
        } else {
            _loc6_ = _loc3_[1] | 0;
            if (_loc6_ == 0) {
                return;
            }
            this._SafeStr_2485 = null;
            if (_loc3_.length == 2) {
                this.openGroupForum(_loc6_);
            } else {
                _loc2_ = _loc3_[2] | 0;
                _loc4_ = 0;
                if (_loc3_.length > 3) {
                    _loc4_ = _loc3_[3] | 0;
                }
                this.initForum(_loc6_);
                this._communicationManager.connection.send(new GetThreadMessageComposer(_loc6_, _loc2_));
                this.goToMessageIndex(_loc6_, _loc2_, _loc4_);
            }
        }
    }

    public openForumsList(param1: number, param2: number = 0): void {
        this.markForumAsRead();
        this._requestedForumsListCode = param1;
        this._SafeStr_3341 = -1;
        this._communicationManager.connection.send(new GetForumsListMessageComposer(param1, param2, 20));
    }

    private onForumsList(param1: ForumsListMessageEvent): void {
        let _loc3_: GetForumsListMessageParser = param1.getParser();
        let _loc2_: ForumsListData = new ForumsListData(_loc3_);
        if (this._forumData != null && this._SafeStr_2592 > 0) {
            _loc2_.updateUnreadMessages(this._forumData, this._SafeStr_2592);
        }
        if (_loc2_.listCode == 2) {
            this.updateUnreadForumsCount(_loc2_.unreadForumsCount);
        }
        if (this._requestedForumsListCode != _loc2_.listCode) {
            return;
        }
        this._SafeStr_2485 = _loc2_;
        if (!this._SafeStr_2276) {
            this._SafeStr_2276 = new GroupForumView(this);
        }
        this._SafeStr_2276.openForumsList(this._SafeStr_2485);
    }

    private initForum(param1: number): void {
        this.markForumAsRead();
        this._requestedForumsListCode = -1;
        this._SafeStr_3341 = param1;
        this._SafeStr_2592 = 0;
        this._communicationManager.connection.send(new GetForumStatsMessageComposer(param1));
    }

    private onForumData(param1: ForumDataMessageEvent): void {
        let _loc2_: UtilsMap = null;
        let _loc3_: string = null;
        let _loc4_: ExtendedForumData = param1.getParser().forumData;
        if (this._SafeStr_3341 != _loc4_.groupId) {
            return;
        }
        if (!_loc4_.canRead) {
            if (this._SafeStr_2276 != null) {
                this._SafeStr_2276.dispose();
            }
            this._forumData = null;
            this._SafeStr_3341 = 0;
            _loc2_ = new UtilsMap();
            _loc3_ = this.localizationManager.getLocalization("groupforum.view.error.operation_read");
            _loc2_.add("message", this.localizationManager.getLocalizationWithParams("groupforum.view.error." + _loc4_.readPermissionError, "", "operation", _loc3_));
            this.notifications.showNotification("forums.error.access_denied", _loc2_);
            return;
        }
        this._forumData = _loc4_;
        this._SafeStr_2592 = _loc4_.lastReadMessageId;
    }

    public requestThreadList(param1: number, param2: number): void {
        if (this._communicationManager) {
            this._communicationManager.connection.send(new GetThreadsMessageComposer(param1, param2, 20));
        }
    }

    private onThreadList(param1: ForumThreadsMessageEvent): void {
        let _loc2_: ForumThreadsMessageParser = param1.getParser();
        if (this._forumData == null || this._forumData.groupId != _loc2_.groupId) {
            return;
        }
        this._SafeStr_2897 = new ThreadsListData(this._forumData.totalThreads, _loc2_.startIndex, _loc2_.threads);
        if (!this._SafeStr_2276) {
            this._SafeStr_2276 = new GroupForumView(this);
        }
        this._SafeStr_2276.openThreadList(this._SafeStr_2485, this._forumData, this._SafeStr_2897);
    }

    public requestThreadMessageList(param1: number, param2: number, param3: number): void {
        if (this._communicationManager) {
            this._communicationManager.connection.send(new GetMessagesMessageComposer(param1, param2, param3, 20));
        }
    }

    private onThreadMessageList(param1: ThreadMessagesMessageEvent): void {
        let _loc6_: MessageData = null;
        let _loc3_: ThreadMessagesMessageParser = param1.getParser();
        if (this._forumData == null || this._forumData.groupId != _loc3_.groupId || this._SafeStr_2897 == null) {
            return;
        }
        this._SafeStr_4089 = _loc3_.threadId;
        let _loc2_: ThreadData = this._SafeStr_2897.threadsById.get(this._SafeStr_4089);
        if (_loc2_ == null) {
            return;
        }
        let _loc4_: number = _loc3_.startIndex;
        let _loc5_: number = _loc2_.nMessages;
        this._SafeStr_3374 = new MessagesListData(this._SafeStr_4089, _loc5_, _loc4_, _loc3_.messages);
        if (!this._SafeStr_2276) {
            this._SafeStr_2276 = new GroupForumView(this);
        }
        this._SafeStr_2276.openMessagesList(this._SafeStr_2485, this._forumData, this._SafeStr_2897, this._SafeStr_3374);
        if (_loc3_.messages.length > 0) {
            _loc6_ = castTo(_loc3_.messages[_loc3_.messages.length - 1], MessageData);
            if (_loc6_) {
                this.updateUnreadMessageCounts(_loc6_.messageId, _loc6_.threadId, _loc6_.messageIndex);
            }
        }
    }

    public updateForumSettings(param1: number, param2: number, param3: number, param4: number, param5: number): void {
        if (this._communicationManager) {
            this._communicationManager.connection.send(new UpdateForumSettingsMessageComposer(param1, param2, param3, param4, param5));
        }
    }

    public postNewThread(param1: number, param2: string, param3: string): void {
        if (this._communicationManager) {
            this._communicationManager.connection.send(new PostMessageMessageComposer(param1, 0, param2, param3));
            this._lastPostTime = getTimer();
        }
    }

    private onPostThreadMessage(param1: PostThreadMessageEvent): void {
        let _loc3_: ForumData = null;
        let _loc2_: PostThreadMessageParser = param1.getParser();
        if (this._composeMessageView) {
            this._composeMessageView.dispose();
        }
        if (this._forumData != null && this._forumData.groupId == _loc2_.groupId) {
            this.updateUnreadMessageCounts(_loc2_.thread.lastMessageId, _loc2_.thread.threadId, _loc2_.thread.nMessages - 1);
        }
        if (this._SafeStr_2485 != null) {
            _loc3_ = this._SafeStr_2485.getForumData(_loc2_.groupId);
            if (_loc3_ != null) {
                _loc3_.addNewThread(_loc2_.thread);
            }
        }
        if (this._SafeStr_2276 == null) {
            return;
        }
        if (this._forumData == null || _loc2_.groupId != this._forumData.groupId) {
            return;
        }
        this.requestThreadList(this._forumData.groupId, 0);
    }

    public postNewMessage(param1: number, param2: number, param3: string): void {
        if (this._communicationManager) {
            this._communicationManager.connection.send(new PostMessageMessageComposer(param1, param2, "", param3));
            this._lastPostTime = getTimer();
        }
    }

    private onPostMessageMessage(param1: PostMessageMessageEvent): void {
        if (this._composeMessageView) {
            this._composeMessageView.dispose();
        }
        if (this._SafeStr_2276 == null) {
            return;
        }
        let _loc2_: PostMessageMessageParser = param1.getParser();
        if (this._forumData == null || _loc2_.groupId != this._forumData.groupId || _loc2_.threadId != this._SafeStr_4089) {
            return;
        }
        let _loc3_: number = _loc2_.message.messageIndex - _loc2_.message.messageIndex % 20;
        this.requestThreadMessageList(this._forumData.groupId, this._SafeStr_4089, _loc3_);
    }

    public deleteThread(param1: ExtendedForumData, param2: number): void {
        let _loc3_: number = 0;
        if (this._communicationManager) {
            if (param1.canModerate) {
                _loc3_ = 10;
            }
            if (param1.isStaff) {
                _loc3_ = 20;
            }
            this._communicationManager.connection.send(new ModerateThreadMessageComposer(param1.groupId, param2, _loc3_));
        }
    }

    public unDeleteThread(param1: ForumData, param2: number): void {
        if (this._communicationManager) {
            this._communicationManager.connection.send(new ModerateThreadMessageComposer(param1.groupId, param2, 1));
        }
    }

    public lockThread(param1: ForumData, param2: number, param3: boolean, param4: boolean): void {
        if (this._communicationManager) {
            this._communicationManager.connection.send(new UpdateThreadMessageComposer(param1.groupId, param2, param3, param4));
        }
    }

    public stickThread(param1: ForumData, param2: number, param3: boolean, param4: boolean): void {
        if (this._communicationManager) {
            this._communicationManager.connection.send(new UpdateThreadMessageComposer(param1.groupId, param2, param3, param4));
        }
    }

    public reportThread(param1: ForumData, param2: number): void {
        if (this._help) {
            this._help.reportThread(param1.groupId, param2);
        }
    }

    private onUpdateThread(param1: UpdateThreadMessageEvent): void {
        let _loc2_: UpdateThreadMessageParser = param1.getParser();
        if (this._forumData == null || this._forumData.groupId != _loc2_.groupId) {
            return;
        }
        let _loc3_: ThreadData = _loc2_.thread;
        if (this._SafeStr_2897 && this._SafeStr_2276) {
            if (this._SafeStr_2897.updateThread(_loc3_)) {
                this._SafeStr_2276.updateThread(_loc3_);
                return;
            }
        }
        this._SafeStr_2897 = new ThreadsListData(1, 0, [_loc3_]);
    }

    public deleteMessage(param1: ExtendedForumData, param2: number, param3: number): void {
        let _loc4_: number = 0;
        if (this._communicationManager) {
            _loc4_ = 10;
            if (param1.isStaff) {
                _loc4_ = 20;
            }
            this._communicationManager.connection.send(new ModerateMessageMessageComposer(this._forumData.groupId, param2, param3, _loc4_));
        }
    }

    public unDeleteMessage(param1: ForumData, param2: number, param3: number): void {
        if (this._communicationManager) {
            this._communicationManager.connection.send(new ModerateMessageMessageComposer(param1.groupId, param2, param3, 1));
        }
    }

    public reportMessage(param1: ForumData, param2: number, param3: number): void {
        if (this._help) {
            this._help.reportMessage(param1.groupId, param2, param3);
        }
    }

    private onUpdateMessage(param1: UpdateMessageMessageEvent): void {
        let _loc5_: number = 0;
        let _loc6_: MessageData = null;
        let _loc3_: UpdateMessageMessageParser = param1.getParser();
        if (this._forumData == null || this._forumData.groupId != _loc3_.groupId || this._SafeStr_4089 != _loc3_.threadId) {
            return;
        }
        let _loc2_: MessageData = _loc3_.message;
        let _loc4_: any[] = this._SafeStr_3374["messages"];
        _loc5_ = 0;
        while (_loc5_ < _loc4_.length) {
            _loc6_ = _loc4_[_loc5_];
            if (_loc6_.messageId == _loc2_.messageId) {
                _loc4_[_loc5_] = _loc2_;
                if (this._SafeStr_2276) {
                    this._SafeStr_2276.updateMessage(_loc2_);
                }
                return;
            }
            _loc5_++;
        }
    }

    public goToMessageIndex(param1: number, param2: number, param3: number): void {
        this._SafeStr_5323 = param2;
        let _loc4_: number = Math.floor(param3 / 20) | 0;
        this._SafeStr_5475 = param3 % 20;
        this.requestThreadMessageList(param1, param2, _loc4_ * 20);
    }

    public getUserInfo(param1: number): void {
        if (this._communicationManager) {
            this._communicationManager.connection.send(new GetExtendedProfileMessageComposer(param1));
        }
    }

    public closeMainView(): void {
        this.markForumAsRead();
        this._SafeStr_2276 = null;
        this._forumData = null;
        this._requestedForumsListCode = -1;
        this._SafeStr_3341 = -1;
    }

    public markForumAsRead(param1: boolean = false): void {
        let _loc2_: UpdateForumReadMarkerMessageComposer = null;
        if (this._communicationManager && this._forumData) {
            if (param1 || this._SafeStr_2592 > this._forumData.lastReadMessageId) {
                _loc2_ = new UpdateForumReadMarkerMessageComposer();
                if (param1) {
                    _loc2_.add(this._forumData.groupId, Math.max(this._forumData.totalMessages, this._SafeStr_2592) | 0, this._SafeStr_2592 == 0);
                } else {
                    _loc2_.add(this._forumData.groupId, this._SafeStr_2592, false);
                }
                this._communicationManager.connection.send(_loc2_);
            }
        }
        this._SafeStr_2592 = 0;
        this._lastReadMessageIndexByThread = new Dictionary();
    }

    public markForumsAsRead(): void {
        let _loc1_: UpdateForumReadMarkerMessageComposer = null;
        if (this._communicationManager && this._SafeStr_2485) {
            _loc1_ = new UpdateForumReadMarkerMessageComposer();
            for (const _loc2_ of this._SafeStr_2485.forums ?? []) {
                if (_loc2_.unreadMessages > 0) {
                    _loc1_.add(_loc2_.groupId | 0, _loc2_.totalMessages | 0, true);
                }
            }
            if (_loc1_.size > 0) {
                this._communicationManager.connection.send(_loc1_);
                this.updateUnreadForumsCount(0);
            }
        }
    }

    public getThreadLastReadMessageIndex(param1: number): number {
        let _loc3_: ThreadData = null;
        let _loc2_: any = this._lastReadMessageIndexByThread.get(param1);
        if (_loc2_ != null) {
            return _loc2_ | 0;
        }
        if (this._SafeStr_2897) {
            _loc3_ = this._SafeStr_2897.threadsById.get(param1);
            if (_loc3_) {
                return _loc3_.nMessages - _loc3_.nUnreadMessages - 1;
            }
        }
        return -1;
    }

    public updateUnreadMessageCounts(param1: number, param2: number, param3: number): void {
        if (param1 > this._SafeStr_2592) {
            this._SafeStr_2592 = param1;
            if (this._SafeStr_2485) {
                this._SafeStr_2485.updateUnreadMessages(this._forumData, param1);
                if (this._SafeStr_2485.listCode == 2) {
                    this.updateUnreadForumsCount(this._SafeStr_2485.unreadForumsCount);
                }
            }
        }
        this._lastReadMessageIndexByThread.set(param2, param3);
    }

    public getGoToMessageIndex(): number {
        return this._SafeStr_5475;
    }

    public getGoToThreadId(): number {
        return this._SafeStr_5323;
    }

    public resetGoTo(): void {
        this._SafeStr_5323 = -1;
        this._SafeStr_5475 = -1;
    }

    public updateUnreadForumsCount(param1: number): void {
        if (this._unreadForumsCount == param1) {
            return;
        }
        if (param1 > this._unreadForumsCount) {
            if (this._soundManager != null) {
            }
        }
        this._unreadForumsCount = param1;
        this.events.dispatchEvent(new UnseenForumsCountUpdatedEvent("UNSEEN_FORUMS_COUNT", param1));
        if (this._SafeStr_2276 != null) {
            this._SafeStr_2276.updateUnreadForumsCount(param1);
        }
    }

    private onUnreadForumsCountUpdateTimerEvent(param1: TimerEvent): void {
        if (this._SafeStr_2276 != null) {
            this._communicationManager.connection.send(new GetForumsListMessageComposer(2, 0, 20));
        } else {
            this._communicationManager.connection.send(new GetUnreadForumsCountMessageComposer());
        }
    }

    private onUnreadForumsCountMessage(param1: UnreadForumsCountMessageEvent): void {
        this.updateUnreadForumsCount(param1.getParser().unreadForumsCount);
    }

    protected override initInstanceFields(): void {
        this.onForumsList = this.onForumsList.bind(this);
        this.onForumData = this.onForumData.bind(this);
        this.onThreadList = this.onThreadList.bind(this);
        this.onThreadMessageList = this.onThreadMessageList.bind(this);
        this.onPostThreadMessage = this.onPostThreadMessage.bind(this);
        this.onPostMessageMessage = this.onPostMessageMessage.bind(this);
        this.onUpdateThread = this.onUpdateThread.bind(this);
        this.onUpdateMessage = this.onUpdateMessage.bind(this);
        this.onUnreadForumsCountUpdateTimerEvent = this.onUnreadForumsCountUpdateTimerEvent.bind(this);
        this.onUnreadForumsCountMessage = this.onUnreadForumsCountMessage.bind(this);
        this._requestedForumsListCode = -1;
        this._SafeStr_3341 = -1;
        this._SafeStr_4089 = 0;
        this._SafeStr_2592 = 0;
        this._lastReadMessageIndexByThread = new Dictionary();
        this._SafeStr_5323 = -1;
        this._SafeStr_5475 = 0;
        this._lastPostTime = -30000;
        this._unreadForumsCount = 0;
        super.initInstanceFields();
    }
}
