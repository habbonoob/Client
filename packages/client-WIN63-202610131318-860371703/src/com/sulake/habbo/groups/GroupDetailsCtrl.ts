import { asGuarded, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IAlertDialog } from '@/com/sulake/core/window/utils/IAlertDialog';
import type { IConfirmDialog } from '@/com/sulake/core/window/utils/IConfirmDialog';
import type { HabboGroupDetailsData } from '@/com/sulake/habbo/communication/messages/incoming/users/HabboGroupDetailsData';
import type { HabboGroupsManager } from '@/com/sulake/habbo/groups/HabboGroupsManager';
import type { IBadgeImageWidget } from '@/com/sulake/habbo/window/widgets/IBadgeImageWidget';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { EventLogMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/tracking/EventLogMessageComposer';
import { DeactivateGuildMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/DeactivateGuildMessageComposer';
import { GetGuildEditInfoMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/GetGuildEditInfoMessageComposer';
import { JoinHabboGroupMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/JoinHabboGroupMessageComposer';
import { HabboWebTools } from '@/com/sulake/habbo/utils/HabboWebTools';
import { isIBadgeImageWidget } from '@/com/sulake/habbo/window/widgets/IBadgeImageWidget';

export class GroupDetailsCtrl implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.groups::GroupDetailsCtrl'); }

    declare private _manager: HabboGroupsManager;

    declare private _window: IWindowContainer;

    declare private _selectedGroup: HabboGroupDetailsData;

    constructor(param1: HabboGroupsManager, param2: boolean) {
        this._manager = param1;
    }

    public dispose(): void {
        this._manager = null;
        this._selectedGroup = null;
        if (this._window) {
            this._window.dispose();
            this._window = null;
        }
    }

    public get disposed(): boolean {
        return this._manager == null;
    }

    private prepareWindow(param1: IWindowContainer): void {
        if (this._window != null) {
            return;
        }
        this._window = castGuarded(this._manager.getXmlWindow("group"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        this.setProc("group_room_link_region", this.onRoomLink);
        this.setProc("manage_guild_region", this.onManageGuild);
        this.setProc("delete_guild_region", this.onDeleteGuild);
        this.setProc("members_region", this.onMembers);
        this.setProc("pending_members_region", this.onPendingMembers);
        this.setProc("show_groups_link_region", this.onShowGroups);
        this.setProc("buy_furni_link_region", this.onBuyFurni);
        this._window.findChildByName("leave_button").procedure = this.onLeave;
        this._window.findChildByName("join_button").procedure = this.onJoin;
        this._window.findChildByName("request_membership_button").procedure = this.onJoin;
    }

    private attachWindow(param1: IWindowContainer): void {
        if (param1.getChildIndex(this._window) == -1) {
            param1.addChild(this._window);
        }
    }

    public onGroupDetails(param1: IWindowContainer, param2: HabboGroupDetailsData): void {
        this._selectedGroup = param2;
        this.prepareWindow(param1);
        this.attachWindow(param1);
        let _loc10_: IWindow = this._window.findChildByName("group_decorate_icon_region");
        let _loc9_: IWindow = this._window.findChildByName("group_name");
        _loc9_.caption = param2.groupName;
        _loc10_.visible = param2.membersCanDecorate;
        _loc9_.x = param2.membersCanDecorate ? _loc10_.x + _loc10_.width : _loc10_.x;
        let _loc6_: ITextWindow = castGuarded(this._window.findChildByName("group_description"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
        _loc6_.caption = param2.description;
        _loc6_.height = _loc6_.textHeight + 5 | 0;
        this._window.findChildByName("group_description_scrollbar").visible = _loc6_.height > this._window.findChildByName("group_description_item_list").height;
        let _loc8_: boolean = this._selectedGroup.hasBoard;
        this._window.findChildByName("show_forum_link_region").visible = _loc8_;
        this._window.findChildByName("show_forum_link").visible = _loc8_;
        if (_loc8_) {
            this.setProc("show_forum_link_region", this.onForumLink);
        }
        this._manager.windowManager.registerLocalizationParameter("group.created", "date", "" + param2.creationDate);
        this._manager.windowManager.registerLocalizationParameter("group.created", "owner", "" + param2.ownerName);
        this._window.findChildByName("created_txt").caption = this._manager.localization.getLocalization("group.created");
        this._manager.windowManager.registerLocalizationParameter("group.membercount", "totalMembers", "" + param2.totalMembers);
        this._window.findChildByName("members_txt").caption = this._manager.localization.getLocalization("group.membercount");
        this._window.findChildByName("group_room_link_region").visible = param2.roomId > -1;
        this._manager.windowManager.registerLocalizationParameter("group.linktobase", "room_name", param2.roomName);
        this._window.findChildByName("group_room_link").caption = this._manager.localization.getLocalization("group.linktobase");
        let _loc4_: IBadgeImageWidget = asGuarded(castGuarded(this._window.findChildByName("group_logo"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow").widget, isIBadgeImageWidget);
        _loc4_.badgeId = this._selectedGroup.badgeCode;
        _loc4_.groupId = this._selectedGroup.groupId;
        this._window.findChildByName("join_button").visible = param2.joiningAllowed;
        this._window.findChildByName("join_button").enable();
        this._window.findChildByName("request_membership_button").visible = param2.requestMembershipAllowed;
        this._window.findChildByName("leave_button").visible = param2.leaveAllowed;
        this._window.findChildByName("membership_pending_txt").visible = param2.status == 2;
        this._window.findChildByName("youaremember_txt").visible = !this._selectedGroup.isGuild && param2.status == 1;
        this._window.findChildByName("youaremember_icon").visible = !this._selectedGroup.isGuild && param2.status == 1;
        let _loc5_: IWindow = this._window.findChildByName("pending_members_region");
        _loc5_.visible = this._selectedGroup.pendingMemberCount > 0;
        if (this._selectedGroup.pendingMemberCount > 0) {
            this._manager.windowManager.registerLocalizationParameter("group.pendingmembercount", "amount", "" + param2.pendingMemberCount);
            this._window.findChildByName("pending_members_txt").caption = this._manager.localization.getLocalization("group.pendingmembercount");
        }
        let _loc3_: IWindow = this._window.findChildByName("manage_guild_region");
        _loc3_.visible = this._selectedGroup.isOwner && this._selectedGroup.isGuild;
        _loc3_.y = _loc5_.visible ? _loc5_.y + 16 : _loc5_.y;
        let _loc7_: IWindow = this._window.findChildByName("delete_guild_region");
        _loc7_.visible = this._selectedGroup.isGuild && this._manager.groupDeletionEnabled && (this._selectedGroup.isOwner || this._manager.sessionDataManager.hasSecurity(5));
        _loc7_.y = _loc3_.visible ? _loc3_.y + 16 : _loc5_.y;
        this._window.findChildByName("you_are_owner_region").visible = this._selectedGroup.isGuild && this._selectedGroup.isOwner;
        this._window.findChildByName("you_are_admin_region").visible = this._selectedGroup.isGuild && this._selectedGroup.isAdmin && !this._selectedGroup.isOwner;
        this._window.findChildByName("you_are_member_region").visible = this._selectedGroup.isGuild && (this._selectedGroup.status == 1 && !(this._selectedGroup.isAdmin || this._selectedGroup.isOwner));
        this.getGroupTypeRegion(0).visible = false;
        this.getGroupTypeRegion(1).visible = false;
        this.getGroupTypeRegion(2).visible = false;
        if (this.getGroupTypeRegion(param2.type) != null) {
            this.getGroupTypeRegion(param2.type).visible = true;
        }
    }

    private getGroupTypeRegion(param1: number): IWindow {
        return this._window.findChildByName("grouptype_region_" + param1);
    }

    private getGroupTypeIcon(param1: number): IWindow {
        return this._window.findChildByName("grouptype_icon_" + param1);
    }

    private setProc(param1: string, param2: (...args: any[]) => any): void {
        let _loc3_: IWindow = this._window.findChildByName(param1);
        _loc3_.mouseThreshold = 0;
        _loc3_.procedure = param2;
    }

    private onLeave = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        this._manager.trackGoogle("groupDetails", "leaveGroup");
        this._manager.handleUserKick(this._manager.avatarId, this._selectedGroup.groupId);
    };

    private onJoin = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        this._manager.trackGoogle("groupDetails", "joinGroup");
        this._window.findChildByName("join_button").disable();
        this._manager.send(new JoinHabboGroupMessageComposer(this._selectedGroup.groupId));
        this._manager.send(new EventLogMessageComposer("HabboGroups", "" + this._selectedGroup.groupId, "join"));
    };

    private onRoomLink = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        this._manager.trackGoogle("groupDetails", "groupBaseRoom");
        this._manager.navigator.goToPrivateRoom(this._selectedGroup.roomId);
        this._manager.send(new EventLogMessageComposer("HabboGroups", "" + this._selectedGroup.groupId, "base"));
    };

    private onForumLink = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        this._manager.openGroupForum(this._selectedGroup.groupId);
    };

    private openExternalLink(param1: string): void {
        if (param1 != "") {
            this._manager.windowManager.alert("${catalog.alert.external.link.title}", "${catalog.alert.external.link.desc}", 0, this.onExternalLink);
            HabboWebTools.navigateToURL(param1, "_empty");
        }
    }

    private onExternalLink = (param1: IAlertDialog, param2: WindowEvent): void => {
        param1.dispose();
    };

    private onManageGuild = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        this._manager.trackGoogle("groupDetails", "groupManage");
        this._manager.send(new GetGuildEditInfoMessageComposer(this._selectedGroup.groupId));
    };

    private onDeleteGuild = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        this._manager.windowManager.confirm("${group.deleteconfirm.title}", "${group.deleteconfirm.desc}", 0, this.onDeleteGuildConfirmation);
    };

    private onDeleteGuildConfirmation = (param1: IConfirmDialog, param2: WindowEvent): void => {
        param1.dispose();
        if (param2.type == "WE_OK") {
            this._manager.trackGoogle("groupDetails", "groupDelete");
            this._manager.send(new DeactivateGuildMessageComposer(this._selectedGroup.groupId));
        }
    };

    private onMembers = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        this._manager.trackGoogle("groupDetails", "groupMembers");
        this._manager.guildMembersWindowCtrl.onMembersClick(this._selectedGroup.groupId, 0);
    };

    private onPendingMembers = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        this._manager.trackGoogle("groupDetails", "groupPendingMembers");
        this._manager.guildMembersWindowCtrl.onMembersClick(this._selectedGroup.groupId, 2);
    };

    private onShowGroups = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        this._manager.trackGoogle("groupDetails", "hottestGroups");
        this._manager.navigator.performGuildBaseSearch();
    };

    private onBuyFurni = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        this._manager.trackGoogle("groupDetails", "groupFurni");
        this._manager.openCatalog("guild_custom_furni");
    };

    get [IDisposable](): true {
        return true;
    }
}
