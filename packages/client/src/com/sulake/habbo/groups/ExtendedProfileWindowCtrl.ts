import { castGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ILinkEventTracker } from '@/com/sulake/core/runtime/events/ILinkEventTracker';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IAlertDialog } from '@/com/sulake/core/window/utils/IAlertDialog';
import type { IConfirmDialog } from '@/com/sulake/core/window/utils/IConfirmDialog';
import type { ExtendedProfileData } from '@/com/sulake/habbo/communication/messages/incoming/users/ExtendedProfileData';
import type { HabboGroupDetailsData } from '@/com/sulake/habbo/communication/messages/incoming/users/HabboGroupDetailsData';
import type { HabboGroupEntryData } from '@/com/sulake/habbo/communication/messages/incoming/users/HabboGroupEntryData';
import type { RelationshipStatusInfo } from '@/com/sulake/habbo/communication/messages/incoming/users/RelationshipStatusInfo';
import type { HabboGroupsManager } from '@/com/sulake/habbo/groups/HabboGroupsManager';
import type { IAvatarImageWidget } from '@/com/sulake/habbo/window/widgets/IAvatarImageWidget';
import type { IBadgeImageWidget } from '@/com/sulake/habbo/window/widgets/IBadgeImageWidget';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { EventLogMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/tracking/EventLogMessageComposer';
import { DeselectFavouriteHabboGroupMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/DeselectFavouriteHabboGroupMessageComposer';
import { GetExtendedProfileMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/GetExtendedProfileMessageComposer';
import { GetHabboGroupDetailsMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/GetHabboGroupDetailsMessageComposer';
import { GetRelationshipStatusInfoMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/GetRelationshipStatusInfoMessageComposer';
import { GetSelectedBadgesMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/GetSelectedBadgesMessageComposer';
import { SelectFavouriteHabboGroupMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/SelectFavouriteHabboGroupMessageComposer';
import { RelationshipStatusEnum } from '@/com/sulake/habbo/friendlist/RelationshipStatusEnum';
import { GroupDetailsCtrl } from '@/com/sulake/habbo/groups/GroupDetailsCtrl';
import { FriendlyTime } from '@/com/sulake/habbo/utils/FriendlyTime';
import { isIAvatarImageWidget } from '@/com/sulake/habbo/window/widgets/IAvatarImageWidget';
import { isIBadgeImageWidget } from '@/com/sulake/habbo/window/widgets/IBadgeImageWidget';

export class ExtendedProfileWindowCtrl implements IDisposable, ILinkEventTracker {
    static { registerClassName(this, 'com.sulake.habbo.groups::ExtendedProfileWindowCtrl'); }

    constructor(param1: HabboGroupsManager) {
        this._manager = param1;
        this._SafeStr_4100 = new GroupDetailsCtrl(param1, false);
    }

    declare private _manager: HabboGroupsManager;

    declare private _window: IWindowContainer;

    declare private _SafeStr_3454: IItemListWindow;

    declare private _SafeStr_5801: IWindowContainer;

    declare private _SafeStr_2480: number;
    static { (this.prototype as any)._SafeStr_2480 = 0; }

    declare private _SafeStr_4100: GroupDetailsCtrl;

    declare private _SafeStr_3853: IWindowContainer;

    declare private _data: ExtendedProfileData;

    declare private _SafeStr_5120: boolean;
    static { (this.prototype as any)._SafeStr_5120 = false; }

    private _badgeUpdateExpected: boolean = false;
    private _relationshipStatusMap: UtilsMap = new UtilsMap();
    private _relationshipUpdateExpected: boolean = false;

    public get disposed(): boolean {
        return this._manager == null;
    }

    public get linkPattern(): string {
        return "profile/";
    }

    public get badgeUpdateExpected(): boolean {
        return this._badgeUpdateExpected;
    }

    public set badgeUpdateExpected(param1: boolean) {
        this._badgeUpdateExpected = param1;
    }

    public get relationshipUpdateExpected(): boolean {
        return this._relationshipUpdateExpected;
    }

    public set relationshipUpdateExpected(param1: boolean) {
        this._relationshipUpdateExpected = param1;
    }

    public dispose(): void {
        this._manager = null;
        this._SafeStr_3454 = null;
        this._data = null;
        if (this._relationshipStatusMap) {
            this._relationshipStatusMap.dispose();
            this._relationshipStatusMap = null;
        }
        if (this._window) {
            this._window.dispose();
            this._window = null;
        }
        if (this._SafeStr_4100) {
            this._SafeStr_4100.dispose();
            this._SafeStr_4100 = null;
        }
    }

    public onProfileChanged(param1: number): void {
        if (this._data != null && this._data.userId == param1 && this._window != null && Boolean(this._window.visible)) {
            this._manager.send(new GetExtendedProfileMessageComposer(param1));
            this._SafeStr_5120 = true;
        }
    }

    public onProfile(param1: ExtendedProfileData): void {
        this._data = param1;
        let _loc2_: HabboGroupEntryData = this.getSelectedGroup();
        if (_loc2_ == null) {
            if (this._data.guilds.length > 0) {
                this._SafeStr_2480 = this._data.guilds[0].groupId | 0;
                _loc2_ = this._data.guilds[0];
            } else {
                this._SafeStr_2480 = 0;
            }
        }
        if (this._SafeStr_2480 > 0) {
            this._manager.send(new GetHabboGroupDetailsMessageComposer(this._SafeStr_2480, false));
        }
        this.refresh();
        this._window.visible = true;
        if (!this._SafeStr_5120) {
            this._window.activate();
        }
        this._SafeStr_5120 = false;
    }

    public onGroupDetails(param1: HabboGroupDetailsData): void {
        let _loc2_: IWindowContainer = null;
        if (this._SafeStr_2480 == param1.groupId) {
            _loc2_ = castGuarded(this._window.findChildByName("group_cont"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
            _loc2_.removeChildAt(0);
            _loc2_.invalidate();
            this._SafeStr_4100.onGroupDetails(_loc2_, param1);
        }
    }

    public onRelationshipStatusInfo(param1: number, param2: UtilsMap): void {
        if (this._data && this.relationshipUpdateExpected) {
            this._relationshipStatusMap = param2.clone();
            this.refreshRelationships();
            this.relationshipUpdateExpected = false;
        }
    }

    public onUserBadges(param1: number, param2: any[]): void {
        let _loc4_: number = 0;
        let _loc3_: IBadgeImageWidget = null;
        if (this._data && this.badgeUpdateExpected && this._window != null) {
            _loc4_ = 0;
            while (_loc4_ < 5) {
                _loc3_ = castGuarded(castGuarded(this._window.findChildByName("badge_" + _loc4_), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow").widget, isIBadgeImageWidget, "com.sulake.habbo.window.widgets.IBadgeImageWidget");
                _loc3_.type = "normal";
                _loc3_.badgeId = stringOrNull(_loc4_ < param2.length ? param2[_loc4_] : "");
                _loc4_++;
            }
            this.badgeUpdateExpected = false;
        }
    }

    public linkReceived(param1: string): void {
        let _loc2_: any[] = param1.split("/");
        if (_loc2_.length != 2) {
            return;
        }
        let _loc3_: string = stringOrNull(_loc2_[1]);
        if (_loc3_ == "unblock") {
            this._manager.windowManager.confirm("${extendedprofile.unblock_player.title}", "${extendedprofile.unblock_player.desc}", 0, this.onConfirmUnblock);
        }
    }

    public close(): void {
        if (this._window != null) {
            this._window.visible = false;
        }
    }

    public updateVisibleExtendedProfile(param1: number): void {
        if (this._window != null && Boolean(this._window.visible) && this._data != null && this._data.userId != param1) {
            this._manager.send(new GetExtendedProfileMessageComposer(param1));
        }
    }

    private prepareWindow(): void {
        if (this._window != null) {
            return;
        }
        if (this._SafeStr_5801 == null) {
            this._SafeStr_5801 = castGuarded(this._manager.getXmlWindow("group_entry"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        }
        if (this._SafeStr_3853 == null) {
            this._SafeStr_3853 = castGuarded(this._manager.getXmlWindow("no_groups"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
            this._SafeStr_3853.findChildByName("view_groups_button").procedure = this.onViewGroups;
        }
        this._window = castGuarded(this._manager.getXmlWindow("new_extended_profile"), isIFrameWindow, "com.sulake.core.window.components.IFrameWindow");
        this._window.findChildByTag("close").procedure = this.onClose;
        this._window.findChildByName("addasfriend_button").procedure = this.onAddAsFriend;
        this._window.findChildByName("rooms_button").procedure = this.onRooms;
        this._SafeStr_3454 = castGuarded(this._window.findChildByName("groups_list"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow");
        this._window.center();
        this._window.findChildByName("change_looks").procedure = this.onChangeLooks;
        this._window.findChildByName("change_badges").procedure = this.onChangeBadges;
        this._window.findChildByName("user_activity_points").visible = this._manager.isActivityDisplayEnabled;
        this._window.findChildByName("block_button").procedure = this.onBlock;
        for (const _loc1_ of RelationshipStatusEnum.displayableStatuses ?? []) {
            this._window.findChildByName(RelationshipStatusEnum.statusAsString(_loc1_ | 0) + "_friend_name_link_region").procedure = this.onRelationshipLink;
        }
    }

    private getSelectedGroup(): HabboGroupEntryData {
        for (const _loc1_ of this._data.guilds ?? []) {
            if (_loc1_.groupId == this._SafeStr_2480) {
                return _loc1_;
            }
        }
        return null;
    }

    private refresh(): void {
        this._manager.send(new GetRelationshipStatusInfoMessageComposer(this._data.userId));
        this._manager.send(new GetSelectedBadgesMessageComposer(this._data.userId));
        this.prepareWindow();
        this.refreshHeader();
        this.refreshGroupList();
    }

    private refreshGroupList(): void {
        let _loc1_: IWindowContainer = null;
        let _loc2_: IBadgeImageWidget = null;
        let _loc4_: IWindowContainer = null;
        let _loc3_: any = this._data.userId == this._manager.avatarId;
        this._SafeStr_3454.visible = this._data.guilds.length > 0;
        this._SafeStr_3454.destroyListItems();
        for (const _loc5_ of this._data.guilds ?? []) {
            _loc1_ = castGuarded(this._SafeStr_5801.clone(), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
            _loc1_.id = _loc5_.groupId | 0;
            _loc1_.findChildByName("bg_region").procedure = this.onSelectGroup;
            _loc1_.findChildByName("bg_region").id = _loc5_.groupId | 0;
            _loc1_.findChildByName("clear_favourite").procedure = this.onClearFavourite;
            _loc1_.findChildByName("clear_favourite").visible = !!(_loc5_.favourite && _loc3_);
            _loc1_.findChildByName("clear_favourite").id = _loc5_.groupId | 0;
            _loc1_.findChildByName("make_favourite").procedure = this.onMakeFavourite;
            _loc1_.findChildByName("make_favourite").visible = !!(!_loc5_.favourite && _loc3_);
            _loc1_.findChildByName("make_favourite").id = _loc5_.groupId | 0;
            _loc2_ = castGuarded(castGuarded(_loc1_.findChildByName("group_pic_bitmap"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow").widget, isIBadgeImageWidget, "com.sulake.habbo.window.widgets.IBadgeImageWidget");
            _loc2_.type = "group";
            _loc2_.badgeId = stringOrNull(_loc5_.badgeCode);
            _loc2_.groupId = _loc5_.groupId | 0;
            this._SafeStr_3454.addListItem(_loc1_);
        }
        this.refreshGroupListSelection();
        this._manager.localization.registerParameter("extendedprofile.groups.count", "count", this._data.guilds.length.toString());
        if (this._data.guilds.length < 1) {
            _loc4_ = castGuarded(this._window.findChildByName("group_cont"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
            _loc4_.removeChildAt(0);
            _loc4_.addChild(this._SafeStr_3853);
            this._SafeStr_3853.findChildByName("no_groups_caption").caption = this._manager.localization.getLocalization(_loc3_ ? "extendedprofile.nogroups.me" : "extendedprofile.nogroups.user");
            this._SafeStr_3853.findChildByName("view_groups_button").visible = true;
        }
    }

    private refreshGroupListSelection(): void {
        let _loc2_: number = 0;
        let _loc1_: IWindowContainer = null;
        _loc2_ = 0;
        while (_loc2_ < this._SafeStr_3454.numListItems) {
            _loc1_ = castGuarded(this._SafeStr_3454.getListItemAt(_loc2_ >>> 0), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
            _loc1_.findChildByName("bg_selected_bitmap").visible = this._SafeStr_2480 == _loc1_.id;
            _loc1_.findChildByName("bg_unselected_bitmap").visible = this._SafeStr_2480 != _loc1_.id;
            _loc2_++;
        }
    }

    private refreshHeader(): void {
        let _loc1_: any = this._data.userId == this._manager.avatarId;
        let _loc2_: boolean = this._data.isHidden && !_loc1_;
        this._window.findChildByName("motto_txt").caption = this._data.motto;
        this._window.findChildByName("status_txt").visible = !!(this._data.isFriend || _loc1_);
        this._window.findChildByName("friend_request_sent_txt").visible = this._data.isFriendRequestSent;
        this._window.findChildByName("online_icon").visible = this._data.isOnline;
        this._window.findChildByName("offline_icon").visible = !this._data.isOnline && !this._data.isHidden;
        this._window.findChildByName("hidden_icon").visible = !this._data.isOnline && this._data.isHidden;
        this._window.findChildByName("status").invalidate();
        this._manager.localization.registerParameter("extendedprofile.username", "username", this._data.userName);
        this._manager.localization.registerParameter("extendedprofile.created", "created", this._data.creationDate);
        this._manager.localization.registerParameter("extendedprofile.activitypoints", "activitypoints", this._data.achievementScore.toString());
        this._manager.localization.registerParameter("extendedprofile.last.login", "lastlogin", this._data.lastAccessSinceInSeconds == -1 ? "-" : FriendlyTime.getFriendlyTime(this._manager.localization, this._data.lastAccessSinceInSeconds, ".ago"));
        this._manager.localization.registerParameter("extendedprofile.friends.count", "count", this._data.friendCount == -1 ? "-" : this._data.friendCount.toString());
        this._window.findChildByName("bottom").visible = !_loc2_;
        this._window.findChildByName("full_profile_hidden").visible = _loc2_;
        this.refreshAvatarImage();
        let _loc3_: boolean = !!(this._data.isFriend || _loc1_);
        this._window.findChildByName("addasfriend_button").visible = !this._data.isFriend && !this._data.isFriendRequestSent && !_loc1_ && this._manager.friendlist.canBeAskedForAFriend(this._data.userId);
        this._window.findChildByName("ok_icon").visible = _loc3_;
        this._window.findChildByName("status_txt").visible = _loc3_;
        this._window.findChildByName("status_txt").caption = this._manager.localization.getLocalization(this._data.isFriend ? "extendedprofile.friend" : "extendedprofile.me");
        this._window.findChildByName("change_own_attributes").visible = _loc1_;
        this._window.findChildByName("levelValue").caption = this._data.accountLevel.toString();
        this._window.findChildByName("starGemCount").caption = this._data.starGemCount.toString();
        this._window.findChildByName("blocked_container").visible = this._manager.sessionDataManager.isBlocked(this._data.userId);
        this._window.findChildByName("block_button").visible = !_loc1_;
    }

    private refreshRelationships(): void {
        let _loc1_: boolean = this._manager.getBoolean("relationship.status.enabled");
        if (_loc1_ && this._window) {
            this._window.findChildByName("rel_status_label_txt").visible = true;
            for (const _loc2_ of RelationshipStatusEnum.displayableStatuses ?? []) {
                this.setRelationshipDetails(_loc2_ | 0);
            }
        }
    }

    private setRelationshipDetails(param1: number): void {
        let _loc4_: RelationshipStatusInfo = this._relationshipStatusMap.getValue(param1);
        let _loc5_: string = RelationshipStatusEnum.statusAsString(param1);
        let _loc6_: IWindow = this._window.findChildByName(_loc5_ + "_txt");
        let _loc3_: IWindow = this._window.findChildByName(_loc5_ + "_friend_name_link_text");
        let _loc2_: IWidgetWindow = castGuarded(this._window.findChildByName(_loc5_ + "_head"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow");
        if (_loc4_ && _loc4_.friendCount > 0) {
            _loc3_.caption = _loc4_.randomFriendName;
            _loc2_.visible = true;
            castGuarded(_loc2_.widget, isIAvatarImageWidget, "com.sulake.habbo.window.widgets.IAvatarImageWidget").figure = _loc4_.randomFriendFigure;
            if (_loc4_.friendCount > 1) {
                _loc6_.visible = true;
                _loc6_.invalidate();
                _loc6_.caption = this._manager.localization.getLocalizationWithParams("extendedprofile.relstatus.others." + _loc5_, "", "count", "" + (_loc4_.friendCount - 1));
            } else {
                _loc6_.visible = false;
            }
        } else {
            _loc2_.visible = false;
            _loc3_.caption = "${extendedprofile.add.friends}";
            _loc6_.caption = "${extendedprofile.no.friends.in.this.category}";
            _loc6_.visible = true;
        }
    }

    private setProc(param1: string, param2: (...args: any[]) => any): void {
        let _loc3_: IWindow = this._window.findChildByName(param1);
        _loc3_.mouseThreshold = 0;
        _loc3_.procedure = param2;
    }

    private onAddAsFriend = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        this._manager.friendlist.askForAFriend(this._data.userId, this._data.userName);
        this._data.isFriendRequestSent = true;
        this.refresh();
    };

    private onRooms = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        this._manager.newNavigator.performSearch("hotel_view", "owner:" + this._data.userName);
    };

    private onBlock = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        this._manager.windowManager.confirm("${extendedprofile.block_player.title}", "${extendedprofile.block_player.desc}", 0, this.onConfirmBlock);
    };

    private onConfirmBlock = (param1: IConfirmDialog, param2: WindowEvent): void => {
        if (param1 == null || Boolean(param1.disposed)) {
            return;
        }
        param1.dispose();
        if (param2.type == "WE_OK") {
            this._manager.sessionDataManager.blockUser(this._data.userId);
            this._window.findChildByName("blocked_container").visible = true;
        }
    };

    private onConfirmUnblock = (param1: IConfirmDialog, param2: WindowEvent): void => {
        if (param1 == null || Boolean(param1.disposed)) {
            return;
        }
        param1.dispose();
        if (param2.type == "WE_OK") {
            this._manager.sessionDataManager.unblockUser(this._data.userId);
            this._window.findChildByName("blocked_container").visible = false;
        }
    };

    private onRelationshipLink = (param1: WindowEvent, param2: IWindow): void => {
        let _loc4_: string = null;
        let _loc3_: RelationshipStatusInfo = null;
        let _loc5_: number = 0;
        if (param1.type != "WME_CLICK") {
            return;
        }
        if (param1.target != null && param2.name != null && this._relationshipStatusMap != null) {
            _loc4_ = param2.name.substr(0, param2.name.indexOf("_"));
            _loc3_ = this._relationshipStatusMap.getValue(RelationshipStatusEnum.stringAsStatus(_loc4_));
            if (_loc3_ != null) {
                _loc5_ = _loc3_.randomFriendId;
                if (_loc5_) {
                    this._manager.showExtendedProfile(_loc5_);
                }
            } else {
                this._manager.windowManager.alert("${extendedprofile.add.friends.alert.title}", "${extendedprofile.add.friends.alert.body}", 0, this.addFriendsAlertCallback);
            }
        }
    };

    private onViewGroups = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        this._manager.navigator.performGuildBaseSearch();
    };

    private onSelectGroup = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        this._SafeStr_2480 = param2.id;
        this._manager.send(new GetHabboGroupDetailsMessageComposer(this._SafeStr_2480, false));
        this._manager.send(new EventLogMessageComposer("HabboGroups", "" + param2.id, "select"));
        this.refreshGroupListSelection();
    };

    private onMakeFavourite = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        this._manager.send(new SelectFavouriteHabboGroupMessageComposer(param2.id));
        this._manager.send(new EventLogMessageComposer("HabboGroups", "" + param2.parent.id, "make favourite"));
        this._SafeStr_2480 = param2.id;
    };

    private onClearFavourite = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        this._manager.send(new DeselectFavouriteHabboGroupMessageComposer(param2.id));
        this._manager.send(new EventLogMessageComposer("HabboGroups", "" + param2.parent.id, "clear favourite"));
        this._SafeStr_2480 = param2.id;
    };

    private onClose = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        this.close();
    };

    private onChangeLooks = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        this._manager.context.createLinkEvent("avatareditor/open");
    };

    private onChangeBadges = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        this._manager.context.createLinkEvent("inventory/open/badges");
    };

    private refreshAvatarImage(param1: boolean = false): void {
        let _loc2_: IWidgetWindow = castGuarded(this._window.findChildByName("avatar_image"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow");
        let _loc3_: IAvatarImageWidget = castGuarded(_loc2_.widget, isIAvatarImageWidget, "com.sulake.habbo.window.widgets.IAvatarImageWidget");
        _loc3_.figure = this._data.figure;
    }

    private addFriendsAlertCallback = (param1: IAlertDialog, param2: WindowEvent): void => {
        if (param2.type == "WE_OK") {
            this._manager.context.createLinkEvent("friendbar/findfriends");
            this.close();
        }
        param1.dispose();
    };

    get [IDisposable](): true {
        return true;
    }
}
