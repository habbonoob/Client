import { castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { ILinkEventTracker } from '@/com/sulake/core/runtime/events/ILinkEventTracker';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IAlertDialog } from '@/com/sulake/core/window/utils/IAlertDialog';
import type { IConfirmDialog } from '@/com/sulake/core/window/utils/IConfirmDialog';
import type { IHabboCatalog } from '@/com/sulake/habbo/catalog/IHabboCatalog';
import type { IHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import type { ExtendedProfileData } from '@/com/sulake/habbo/communication/messages/incoming/users/ExtendedProfileData';
import type { GuildCreationData } from '@/com/sulake/habbo/communication/messages/incoming/users/GuildCreationData';
import type { GuildEditData } from '@/com/sulake/habbo/communication/messages/incoming/users/GuildEditData';
import type { GuildEditorData } from '@/com/sulake/habbo/communication/messages/incoming/users/GuildEditorData';
import type { GuildMemberData } from '@/com/sulake/habbo/communication/messages/incoming/users/GuildMemberData';
import type { HabboGroupDetailsData } from '@/com/sulake/habbo/communication/messages/incoming/users/HabboGroupDetailsData';
import type { MemberData } from '@/com/sulake/habbo/communication/messages/incoming/users/MemberData';
import type { UserObjectMessageParser } from '@/com/sulake/habbo/communication/messages/parser/handshake/UserObjectMessageParser';
import type { FlatCreatedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/navigator/FlatCreatedMessageParser';
import type { GetGuestRoomResultMessageParser } from '@/com/sulake/habbo/communication/messages/parser/navigator/GetGuestRoomResultMessageParser';
import type { RoomEntryInfoMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/engine/RoomEntryInfoMessageParser';
import type { ScrSendUserInfoMessageParser } from '@/com/sulake/habbo/communication/messages/parser/users/ScrSendUserInfoMessageParser';
import type { IHabboFriendList } from '@/com/sulake/habbo/friendlist/IHabboFriendList';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IHabboNavigator } from '@/com/sulake/habbo/navigator/IHabboNavigator';
import type { IHabboNewNavigator } from '@/com/sulake/habbo/navigator/IHabboNewNavigator';
import type { ISessionDataManager } from '@/com/sulake/habbo/session/ISessionDataManager';
import type { IHabboToolbar } from '@/com/sulake/habbo/toolbar/IHabboToolbar';
import type { IHabboTracking } from '@/com/sulake/habbo/tracking/IHabboTracking';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { Component } from '@/com/sulake/core/runtime/Component.group';
import { ComponentDependency } from '@/com/sulake/core/runtime/ComponentDependency';
import { UserObjectEvent } from '@/com/sulake/habbo/communication/messages/incoming/handshake/UserObjectEvent';
import { FlatCreatedEvent } from '@/com/sulake/habbo/communication/messages/incoming/navigator/FlatCreatedEvent';
import { GetGuestRoomResultEvent } from '@/com/sulake/habbo/communication/messages/incoming/navigator/GetGuestRoomResultEvent';
import { RoomEntryInfoMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/engine/RoomEntryInfoMessageEvent';
import { CloseConnectionMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/session/CloseConnectionMessageEvent';
import { ExtendedProfileChangedMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/users/ExtendedProfileChangedMessageEvent';
import { ExtendedProfileMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/users/ExtendedProfileMessageEvent';
import { GroupDetailsChangedMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/users/GroupDetailsChangedMessageEvent';
import { GroupMembershipRequestedMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/users/GroupMembershipRequestedMessageEvent';
import { GuildCreatedMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/users/GuildCreatedMessageEvent';
import { GuildCreationInfoMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/users/GuildCreationInfoMessageEvent';
import { GuildEditFailedMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/users/GuildEditFailedMessageEvent';
import { GuildEditInfoMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/users/GuildEditInfoMessageEvent';
import { GuildEditorDataMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/users/GuildEditorDataMessageEvent';
import { GuildMemberFurniCountInHQMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/users/GuildMemberFurniCountInHQMessageEvent';
import { GuildMemberMgmtFailedMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/users/GuildMemberMgmtFailedMessageEvent';
import { GuildMembershipRejectedMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/users/GuildMembershipRejectedMessageEvent';
import { GuildMembershipUpdatedMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/users/GuildMembershipUpdatedMessageEvent';
import { GuildMembersMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/users/GuildMembersMessageEvent';
import { HabboGroupDeactivatedMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/users/HabboGroupDeactivatedMessageEvent';
import { HabboGroupDetailsMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/users/HabboGroupDetailsMessageEvent';
import { HabboGroupJoinFailedMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/users/HabboGroupJoinFailedMessageEvent';
import { HabboUserBadgesMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/users/HabboUserBadgesMessageEvent';
import { RelationshipStatusInfoEvent } from '@/com/sulake/habbo/communication/messages/incoming/users/RelationshipStatusInfoEvent';
import { ScrSendUserInfoEvent } from '@/com/sulake/habbo/communication/messages/incoming/users/ScrSendUserInfoEvent';
import { EventLogMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/tracking/EventLogMessageComposer';
import { GetExtendedProfileMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/GetExtendedProfileMessageComposer';
import { GetGuildEditorDataMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/GetGuildEditorDataMessageComposer';
import { GetHabboGroupDetailsMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/GetHabboGroupDetailsMessageComposer';
import { GetMemberGuildItemCountMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/GetMemberGuildItemCountMessageComposer';
import { KickMemberMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/KickMemberMessageComposer';
import { BadgeLeaderboardController } from '@/com/sulake/habbo/groups/badge_leaderboard/BadgeLeaderboardController';
import { DetailsWindowCtrl } from '@/com/sulake/habbo/groups/DetailsWindowCtrl';
import { HabboGroupsEditorData } from '@/com/sulake/habbo/groups/events/HabboGroupsEditorData';
import { ExtendedProfileWindowCtrl } from '@/com/sulake/habbo/groups/ExtendedProfileWindowCtrl';
import { GroupCreatedWindowCtrl } from '@/com/sulake/habbo/groups/GroupCreatedWindowCtrl';
import { GroupRoomInfoCtrl } from '@/com/sulake/habbo/groups/GroupRoomInfoCtrl';
import { GuildKickData } from '@/com/sulake/habbo/groups/GuildKickData';
import { GuildManagementWindowCtrl } from '@/com/sulake/habbo/groups/GuildManagementWindowCtrl';
import { GuildMembersWindowCtrl } from '@/com/sulake/habbo/groups/GuildMembersWindowCtrl';
import { HcRequiredWindowCtrl } from '@/com/sulake/habbo/groups/HcRequiredWindowCtrl';
import { IHabboGroupsManager } from '@/com/sulake/habbo/groups/IHabboGroupsManager';
import { Logger } from '@/com/sulake/habbo/Logger';
import { IIDHabboCatalog } from '@/com/sulake/iid/IIDHabboCatalog';
import { IIDHabboCommunicationManager } from '@/com/sulake/iid/IIDHabboCommunicationManager';
import { IIDHabboFriendList } from '@/com/sulake/iid/IIDHabboFriendList';
import { IIDHabboLocalizationManager } from '@/com/sulake/iid/IIDHabboLocalizationManager';
import { IIDHabboNavigator } from '@/com/sulake/iid/IIDHabboNavigator';
import { IIDHabboNewNavigator } from '@/com/sulake/iid/IIDHabboNewNavigator';
import { IIDHabboToolbar } from '@/com/sulake/iid/IIDHabboToolbar';
import { IIDHabboTracking } from '@/com/sulake/iid/IIDHabboTracking';
import { IIDHabboWindowManager } from '@/com/sulake/iid/IIDHabboWindowManager';
import { IIDSessionDataManager } from '@/com/sulake/iid/IIDSessionDataManager';

export class HabboGroupsManager extends Component implements IHabboGroupsManager, ILinkEventTracker {
    static { registerClassName(this, 'com.sulake.habbo.groups::HabboGroupsManager'); }

    public static readonly GROUPS_TRACKING_CATEGORY: string = "HabboGroups";

    declare private _communication: IHabboCommunicationManager;

    declare private _windowManager: IHabboWindowManager;

    declare private _localization: IHabboLocalizationManager;

    declare private _navigator: IHabboNavigator;

    declare private _newNavigator: IHabboNewNavigator;

    declare private _friendlist: IHabboFriendList;

    declare private _catalog: IHabboCatalog;

    declare private _toolbar: IHabboToolbar;

    declare private _habboTracking: IHabboTracking;

    declare private _sessionDataManager: ISessionDataManager;

    declare private _SafeStr_3109: DetailsWindowCtrl;

    declare private _SafeStr_14245: GuildMembersWindowCtrl;

    declare private _guildManagementWindowCtrl: GuildManagementWindowCtrl;

    declare private _SafeStr_2610: ExtendedProfileWindowCtrl;

    declare private _SafeStr_14246: HcRequiredWindowCtrl;

    declare private _SafeStr_3768: GroupCreatedWindowCtrl;

    declare private _groupRoomInfoCtrl: GroupRoomInfoCtrl;

    declare private _SafeStr_14247: BadgeLeaderboardController;

    declare private _guildEditorData: GuildEditorData;

    declare private _avatarId: number;

    declare private _roomId: number;

    declare private _hasVip: boolean;

    declare private _SafeStr_2812: GuildKickData;

    declare private _messageEvents: IMessageEvent[];

    constructor(param1: IContext, param2: number = 0, param3: IAssetLibrary = null) {
        super(param1, param2, param3);
        this._SafeStr_3109 = new DetailsWindowCtrl(this);
        this._SafeStr_14245 = new GuildMembersWindowCtrl(this);
        this._guildManagementWindowCtrl = new GuildManagementWindowCtrl(this);
        this._SafeStr_2610 = new ExtendedProfileWindowCtrl(this);
        this._SafeStr_14246 = new HcRequiredWindowCtrl(this);
        this._SafeStr_3768 = new GroupCreatedWindowCtrl(this);
        this._groupRoomInfoCtrl = new GroupRoomInfoCtrl(this);
        this._SafeStr_14247 = new BadgeLeaderboardController(this, param1, 0, param3);
        Logger.log("HabboGroupsManager initialized: " + param3);
    }

    protected override get dependencies(): ComponentDependency[] {
        return super.dependencies.concat([new ComponentDependency(new IIDHabboWindowManager(), (param1: IHabboWindowManager): void => {
             this._windowManager = param1;
         }), new ComponentDependency(new IIDHabboCommunicationManager(), (param1: IHabboCommunicationManager): void => {
             this._communication = param1;
         }), new ComponentDependency(new IIDHabboLocalizationManager(), (param1: IHabboLocalizationManager): void => {
             this._localization = param1;
         }), new ComponentDependency(new IIDHabboNavigator(), (param1: IHabboNavigator): void => {
             this._navigator = param1;
         }), new ComponentDependency(new IIDHabboNewNavigator(), (param1: IHabboNewNavigator): void => {
             this._newNavigator = param1;
         }), new ComponentDependency(new IIDHabboFriendList(), (param1: IHabboFriendList): void => {
             this._friendlist = param1;
         }), new ComponentDependency(new IIDHabboCatalog(), (param1: IHabboCatalog): void => {
             this._catalog = param1;
         }), new ComponentDependency(new IIDHabboToolbar(), (param1: IHabboToolbar): void => {
             this._toolbar = param1;
         }), new ComponentDependency(new IIDSessionDataManager(), (param1: ISessionDataManager): void => {
             this._sessionDataManager = param1;
         }), new ComponentDependency(new IIDHabboTracking(), (param1: IHabboTracking): void => {
             this._habboTracking = param1;
         })]);
    }

    protected override initComponent(): void {
        this._messageEvents = new Array<IMessageEvent>(0).fill(null);
        this.addMessageEvent(new ScrSendUserInfoEvent(this.onSubscriptionInfo));
        this.addMessageEvent(new FlatCreatedEvent(this.onFlatCreated));
        this.addMessageEvent(new ExtendedProfileMessageEvent(this.onExtendedProfile));
        this.addMessageEvent(new GuildEditInfoMessageEvent(this.onGuildEditInfo));
        this.addMessageEvent(new HabboUserBadgesMessageEvent(this.onUserBadgesMessage));
        this.addMessageEvent(new GroupDetailsChangedMessageEvent(this.onGroupDetailsChanged));
        this.addMessageEvent(new RelationshipStatusInfoEvent(this.onRelationshipStatusInfo));
        this.addMessageEvent(new GuildEditorDataMessageEvent(this.onGuildEditorData));
        this.addMessageEvent(new GuildMembershipRejectedMessageEvent(this._SafeStr_14245.onGuildMembershipRejected));
        this.addMessageEvent(new HabboGroupJoinFailedMessageEvent(this.onJoinFailed));
        this.addMessageEvent(new GuildMemberMgmtFailedMessageEvent(this._SafeStr_14245.onGuildMemberMgmtFailed));
        this.addMessageEvent(new GuildMembershipUpdatedMessageEvent(this._SafeStr_14245.onGuildMembershipUpdated));
        this.addMessageEvent(new UserObjectEvent(this.onUserObject));
        this.addMessageEvent(new GroupMembershipRequestedMessageEvent(this._SafeStr_14245.onMembershipRequested));
        this.addMessageEvent(new GuildCreatedMessageEvent(this.onGuildCreated));
        this.addMessageEvent(new ExtendedProfileChangedMessageEvent(this.onExtendedProfileChanged));
        this.addMessageEvent(new GuildCreationInfoMessageEvent(this.onGuildCreationInfo));
        this.addMessageEvent(new GuildEditFailedMessageEvent(this.onGuildEditFailed));
        this.addMessageEvent(new GuildMemberFurniCountInHQMessageEvent(this.onKickConfirmation));
        this.addMessageEvent(new HabboGroupDeactivatedMessageEvent(this.onGroupDeactivated));
        this.addMessageEvent(new CloseConnectionMessageEvent(this.onRoomLeave));
        this.addMessageEvent(new GetGuestRoomResultEvent(this.onRoomInfo));
        this.addMessageEvent(new HabboGroupDetailsMessageEvent(this.onGroupDetails));
        this.addMessageEvent(new RoomEntryInfoMessageEvent(this.onRoomEnter));
        this.addMessageEvent(new GuildMembersMessageEvent(this._SafeStr_14245.onGuildMembers));
        this.context.addLinkEventTracker(this);
        this.context.addLinkEventTracker(this._SafeStr_2610);
        this.context.addLinkEventTracker(this._SafeStr_14247);
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
            this._messageEvents = null;
        }
        if (this._SafeStr_3109) {
            this._SafeStr_3109.dispose();
            this._SafeStr_3109 = null;
        }
        if (this._SafeStr_14245) {
            this._SafeStr_14245.dispose();
            this._SafeStr_14245 = null;
        }
        if (this._guildManagementWindowCtrl) {
            this._guildManagementWindowCtrl.dispose();
            this._guildManagementWindowCtrl = null;
        }
        if (this._SafeStr_2610) {
            this._SafeStr_2610.dispose();
            this._SafeStr_2610 = null;
        }
        if (this._SafeStr_14246) {
            this._SafeStr_14246.dispose();
            this._SafeStr_14246 = null;
        }
        if (this._SafeStr_3768) {
            this._SafeStr_3768.dispose();
            this._SafeStr_3768 = null;
        }
        if (this._groupRoomInfoCtrl) {
            this._groupRoomInfoCtrl.dispose();
            this._groupRoomInfoCtrl = null;
        }
        if (this._SafeStr_14247) {
            this._SafeStr_14247.dispose();
            this._SafeStr_14247 = null;
        }
        super.dispose();
    }

    public get linkPattern(): string {
        return "group/";
    }

    public linkReceived(param1: string): void {
        let _loc2_: any[] = param1.split("/");
        if (_loc2_.length != 2) {
            return;
        }
        let _loc3_: number = _loc2_[1] | 0;
        this.openGroupInfo(_loc3_);
    }

    public showGroupBadgeInfo(param1: boolean, param2: number): void {
        this.openGroupInfo(param2);
        this.send(new EventLogMessageComposer("HabboGroups", "" + param2, "badge clicked"));
    }

    public showBadgeLeaderboard(param1: number, param2: number = -1, param3: number = 0): void {
        if (this._SafeStr_14247 != null) {
            this._SafeStr_14247.showBadgeLeaderboard(param1, param2, param3);
        }
    }

    public openGroupInfo(param1: number): void {
        this.send(new GetHabboGroupDetailsMessageComposer(param1, true));
    }

    public send(param1: IMessageComposer): void {
        this._communication.connection.send(param1);
    }

    public getXmlWindow(param1: string): IWindow {
        let _loc4_: IAsset = null;
        let _loc2_: XmlAsset = null;
        let _loc3_: IWindow = null;
        try {
            _loc4_ = this.assets.getAssetByName(param1);
            _loc2_ = castTo(_loc4_, XmlAsset);
            _loc3_ = this._windowManager.buildFromXML(XML.from(_loc2_.content));
        } catch (e) {
        }
        return _loc3_;
    }

    public getButtonImage(param1: string): BitmapData {
        let _loc3_: string = param1;
        let _loc6_: IAsset = this.assets.getAssetByName(_loc3_);
        let _loc4_: BitmapDataAsset = castTo(_loc6_, BitmapDataAsset);
        let _loc2_: BitmapData = castTo(_loc4_.content, BitmapData);
        let _loc5_: BitmapData = new BitmapData(_loc2_.width, _loc2_.height, true, 0);
        _loc5_.draw(_loc2_);
        return _loc5_;
    }

    public openGroupForum(param1: number): void {
        this.context.createLinkEvent("groupforum/" + param1);
    }

    private onGroupDeactivated(param1: IMessageEvent): void {
        let _loc2_: number = castTo(param1, HabboGroupDeactivatedMessageEvent).groupId;
        this._SafeStr_3109.onGroupDeactivated(_loc2_);
        this._groupRoomInfoCtrl.onGroupDeactivated(_loc2_);
    }

    private onGroupDetails(param1: IMessageEvent): void {
        let _loc2_: HabboGroupDetailsData = castTo(param1, HabboGroupDetailsMessageEvent).data;
        this._SafeStr_3109.onGroupDetails(_loc2_);
        this._SafeStr_2610.onGroupDetails(_loc2_);
        this._groupRoomInfoCtrl.onGroupDetails(_loc2_);
    }

    private onExtendedProfile(param1: IMessageEvent): void {
        let _loc2_: ExtendedProfileData = castTo(param1, ExtendedProfileMessageEvent).data;
        if (_loc2_.openProfileWindow) {
            this._SafeStr_2610.badgeUpdateExpected = true;
            this._SafeStr_2610.relationshipUpdateExpected = true;
            this._SafeStr_2610.onProfile(_loc2_);
        }
    }

    private onExtendedProfileChanged(param1: IMessageEvent): void {
        let _loc2_: number = castTo(param1, ExtendedProfileChangedMessageEvent).userId;
        this._SafeStr_2610.onProfileChanged(_loc2_);
    }

    private onGroupDetailsChanged(param1: IMessageEvent): void {
        let _loc2_: number = castTo(param1, GroupDetailsChangedMessageEvent).groupId;
        if (this._SafeStr_3109.isDisplayingGroup(_loc2_) || this._groupRoomInfoCtrl.isDisplayingGroup(_loc2_)) {
            this.send(new GetHabboGroupDetailsMessageComposer(_loc2_, false));
        }
    }

    private onJoinFailed(param1: IMessageEvent): void {
        let _loc3_: string = null;
        let _loc4_: string = null;
        let _loc2_: number = castTo(param1, HabboGroupJoinFailedMessageEvent).reason;
        if (_loc2_ == 4) {
            this._SafeStr_14246.show(false);
        } else {
            _loc3_ = "group.joinfail." + _loc2_;
            _loc4_ = this._localization.getLocalization(_loc3_, _loc3_);
            this._windowManager.alert("${group.joinfail.title}", _loc4_, 0, this.onAlertClose);
        }
    }

    private onGuildCreationInfo(param1: IMessageEvent): void {
        let _loc2_: GuildCreationData = castTo(param1, GuildCreationInfoMessageEvent).data;
        this._guildManagementWindowCtrl.onGuildCreationInfo(_loc2_);
        this.requestGuildEditorData();
    }

    private onGuildEditInfo(param1: IMessageEvent): void {
        let _loc2_: GuildEditData = castTo(param1, GuildEditInfoMessageEvent).data;
        this._guildManagementWindowCtrl.onGuildEditInfo(_loc2_);
        this.requestGuildEditorData();
    }

    private onRoomLeave(param1: IMessageEvent): void {
        this._SafeStr_3109.close();
        this._groupRoomInfoCtrl.close();
    }

    private onRoomEnter(param1: IMessageEvent): void {
        this._SafeStr_3109.close();
        this._groupRoomInfoCtrl.close();
        let _loc2_: RoomEntryInfoMessageParser = castTo(param1, RoomEntryInfoMessageEvent).getParser();
        this._roomId = _loc2_.guestRoomId;
    }

    private onAlertClose(param1: IAlertDialog, param2: WindowEvent): void {
        param1.dispose();
    }

    private onGuildEditorData(param1: IMessageEvent): void {
        this._guildEditorData = castTo(param1, GuildEditorDataMessageEvent).data;
        this.events.dispatchEvent(new HabboGroupsEditorData());
    }

    private onGuildEditFailed(param1: IMessageEvent): void {
        let _loc3_: string = null;
        let _loc4_: string = null;
        let _loc2_: number = castTo(param1, GuildEditFailedMessageEvent).reason;
        if (_loc2_ == 2) {
            this._SafeStr_14246.show(true);
        } else {
            _loc3_ = "group.edit.fail." + _loc2_;
            _loc4_ = this._localization.getLocalization(_loc3_, _loc3_);
            this._windowManager.alert("${group.edit.fail.title}", _loc4_, 0, this.onAlertClose);
        }
    }

    private onUserObject(param1: IMessageEvent): void {
        let _loc2_: UserObjectMessageParser = castTo(param1, UserObjectEvent).getParser();
        this._avatarId = _loc2_.id;
    }

    private onFlatCreated(param1: IMessageEvent): void {
        let _loc2_: FlatCreatedMessageParser = castTo(param1, FlatCreatedEvent).getParser();
        this._guildManagementWindowCtrl.onFlatCreated(_loc2_.flatId, _loc2_.flatName);
    }

    private onGuildCreated(param1: IMessageEvent): void {
        let _loc2_: GuildCreatedMessageEvent = castTo(param1, GuildCreatedMessageEvent);
        this._SafeStr_3768.show(_loc2_.groupId);
        this._guildManagementWindowCtrl.close();
        this._groupRoomInfoCtrl.expectedGroupId = _loc2_.groupId;
        if (this._roomId != _loc2_.baseRoomId) {
            this._navigator.goToPrivateRoom(_loc2_.baseRoomId);
        }
    }

    private onKickConfirmation(param1: IMessageEvent): void {
        let _loc4_: number = castTo(param1, GuildMemberFurniCountInHQMessageEvent).userId();
        let _loc6_: number = castTo(param1, GuildMemberFurniCountInHQMessageEvent).furniCount();
        let _loc5_: MemberData = null;
        let _loc2_: GuildMemberData = this._SafeStr_14245.data;
        let _loc3_: string = this._SafeStr_2812.targetBlocked ? "group.block" : "group.kick";
        if (_loc6_ > 0) {
            if (_loc4_ == this._avatarId) {
                this.localization.registerParameter("group.leaveconfirm.desc", "amount", _loc6_.toString());
                this._windowManager.confirm("${group.leaveconfirm.title}", "${group.leaveconfirm.desc}", 0, this.onKickConfirmationClose);
            } else {
                _loc5_ = _loc2_.getUser(_loc4_);
                this.localization.registerParameter(_loc3_ + "confirm.desc", "amount", _loc6_.toString());
                this.localization.registerParameter(_loc3_ + "confirm.desc", "user", _loc5_.userName);
                this._windowManager.confirm("${" + _loc3_ + "confirm.title}", "${" + _loc3_ + "confirm.desc}", 0, this.onKickConfirmationClose);
            }
        } else if (_loc4_ == this._avatarId) {
            this._windowManager.confirm("${group.leaveconfirm.title}", "${group.leaveconfirm_nofurni.desc}", 0, this.onKickConfirmationClose);
        } else if (_loc2_) {
            _loc5_ = _loc2_.getUser(_loc4_);
            this.localization.registerParameter(_loc3_ + "confirm_nofurni.desc", "user", _loc5_.userName);
            this._windowManager.confirm("${" + _loc3_ + "confirm.title}", "${" + _loc3_ + "confirm_nofurni.desc}", 0, this.onKickConfirmationClose);
        }
    }

    private onKickConfirmationClose(param1: IConfirmDialog, param2: WindowEvent): void {
        if (param1 == null || Boolean(param1.disposed) || this._SafeStr_2812 == null) {
            this._SafeStr_2812 = null;
            return;
        }
        param1.dispose();
        if (param2.type == "WE_OK") {
            this.send(new KickMemberMessageComposer(this._SafeStr_2812.kickGuildId, this._SafeStr_2812.kickTargetId, this._SafeStr_2812.targetBlocked));
        }
        this._SafeStr_2812 = null;
    }

    private onSubscriptionInfo(param1: IMessageEvent): void {
        let _loc2_: ScrSendUserInfoMessageParser = castTo(param1, ScrSendUserInfoEvent).getParser();
        this._hasVip = _loc2_.isVIP && _loc2_.minutesUntilExpiration > 0;
        this._guildManagementWindowCtrl.onSubscriptionChange();
    }

    private onRoomInfo(param1: IMessageEvent): void {
        let _loc2_: GetGuestRoomResultMessageParser = castTo(param1, GetGuestRoomResultEvent).getParser();
        if (_loc2_.enterRoom) {
            this._groupRoomInfoCtrl.onRoomInfo(_loc2_.data);
        }
    }

    private onRelationshipStatusInfo(param1: IMessageEvent): void {
        let _loc2_: RelationshipStatusInfoEvent = castTo(param1, RelationshipStatusInfoEvent);
        this._SafeStr_2610.onRelationshipStatusInfo(_loc2_.userId, _loc2_.relationshipStatusMap);
    }

    private onUserBadgesMessage(param1: HabboUserBadgesMessageEvent): void {
        this._SafeStr_2610.onUserBadges(param1.userId, param1.selectedBadges);
    }

    private requestGuildEditorData(): void {
        if (this._guildEditorData == null) {
            this.send(new GetGuildEditorDataMessageComposer());
        }
    }

    public get localization(): IHabboLocalizationManager {
        return this._localization;
    }

    public get windowManager(): IHabboWindowManager {
        return this._windowManager;
    }

    public get guildManagementWindowCtrl(): GuildManagementWindowCtrl {
        return this._guildManagementWindowCtrl;
    }

    public get groupRoomInfoCtrl(): GroupRoomInfoCtrl {
        return this._groupRoomInfoCtrl;
    }

    public get groupRoomInfoEnabled(): boolean {
        return this.getBoolean("groupRoomInfo.enabled");
    }

    public get groupDeletionEnabled(): boolean {
        return this.getBoolean("group.deletion.enabled");
    }

    public get groupRoomInfoBadgeEnabled(): boolean {
        return this.groupRoomInfoEnabled && this.getBoolean("groupRoomInfo.badge.enabled");
    }

    public get toolbarAttachEnabled(): boolean {
        return this.groupRoomInfoEnabled && this.getBoolean("groupRoomInfo.attach.enabled");
    }

    public get isActivityDisplayEnabled(): boolean {
        return this.getBoolean("activity.point.display.enabled");
    }

    public get guildEditorData(): GuildEditorData {
        return this._guildEditorData;
    }

    public get avatarId(): number {
        return this._avatarId;
    }

    public get navigator(): IHabboNavigator {
        return this._newNavigator.legacyNavigator;
    }

    public get friendlist(): IHabboFriendList {
        return this._friendlist;
    }

    public get guildMembersWindowCtrl(): GuildMembersWindowCtrl {
        return this._SafeStr_14245;
    }

    public get habboTracking(): IHabboTracking {
        return this._habboTracking;
    }

    public trackGoogle(param1: string, param2: string, param3: number = -1): void {
        if (this._habboTracking != null) {
            this._habboTracking.trackGoogle(param1, param2, param3);
        }
    }

    public get roomId(): number {
        return this._roomId;
    }

    public get toolbar(): IHabboToolbar {
        return this._toolbar;
    }

    public updateVisibleExtendedProfile(param1: number): void {
        this._SafeStr_2610.updateVisibleExtendedProfile(param1);
    }

    public showExtendedProfile(param1: number): void {
        this.send(new GetExtendedProfileMessageComposer(param1));
    }

    public openCatalog(param1: string): void {
        this._catalog.openCatalogPage(param1);
    }

    public openVipPurchase(param1: string): void {
        this._catalog.openClubCenter();
    }

    public get hasVip(): boolean {
        return this._hasVip;
    }

    public handleUserKick(param1: number, param2: number): void {
        this._SafeStr_2812 = new GuildKickData(param1, param2);
        this.send(new GetMemberGuildItemCountMessageComposer(param2, param1));
    }

    public handleUserBlock(param1: number, param2: number): void {
        this._SafeStr_2812 = new GuildKickData(param1, param2, true);
        this.send(new GetMemberGuildItemCountMessageComposer(param2, param1));
    }

    public get newNavigator(): IHabboNewNavigator {
        return this._newNavigator;
    }

    public get sessionDataManager(): ISessionDataManager {
        return this._sessionDataManager;
    }

    protected override initInstanceFields(): void {
        this.onGroupDeactivated = this.onGroupDeactivated.bind(this);
        this.onGroupDetails = this.onGroupDetails.bind(this);
        this.onExtendedProfile = this.onExtendedProfile.bind(this);
        this.onExtendedProfileChanged = this.onExtendedProfileChanged.bind(this);
        this.onGroupDetailsChanged = this.onGroupDetailsChanged.bind(this);
        this.onJoinFailed = this.onJoinFailed.bind(this);
        this.onGuildCreationInfo = this.onGuildCreationInfo.bind(this);
        this.onGuildEditInfo = this.onGuildEditInfo.bind(this);
        this.onRoomLeave = this.onRoomLeave.bind(this);
        this.onRoomEnter = this.onRoomEnter.bind(this);
        this.onAlertClose = this.onAlertClose.bind(this);
        this.onGuildEditorData = this.onGuildEditorData.bind(this);
        this.onGuildEditFailed = this.onGuildEditFailed.bind(this);
        this.onUserObject = this.onUserObject.bind(this);
        this.onFlatCreated = this.onFlatCreated.bind(this);
        this.onGuildCreated = this.onGuildCreated.bind(this);
        this.onKickConfirmation = this.onKickConfirmation.bind(this);
        this.onKickConfirmationClose = this.onKickConfirmationClose.bind(this);
        this.onSubscriptionInfo = this.onSubscriptionInfo.bind(this);
        this.onRoomInfo = this.onRoomInfo.bind(this);
        this.onRelationshipStatusInfo = this.onRelationshipStatusInfo.bind(this);
        this.onUserBadgesMessage = this.onUserBadgesMessage.bind(this);
        this._avatarId = 0;
        this._roomId = 0;
        this._hasVip = false;
        super.initInstanceFields();
    }

    get [IHabboGroupsManager](): true {
        return true;
    }
}
