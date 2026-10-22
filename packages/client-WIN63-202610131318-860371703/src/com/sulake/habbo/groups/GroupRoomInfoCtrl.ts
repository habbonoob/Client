import { asGuarded, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { GuestRoomData } from '@/com/sulake/habbo/communication/messages/incoming/navigator/GuestRoomData';
import type { HabboGroupDetailsData } from '@/com/sulake/habbo/communication/messages/incoming/users/HabboGroupDetailsData';
import type { HabboGroupsManager } from '@/com/sulake/habbo/groups/HabboGroupsManager';
import type { IBadgeImageWidget } from '@/com/sulake/habbo/window/widgets/IBadgeImageWidget';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { EventLogMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/tracking/EventLogMessageComposer';
import { GetGuildEditInfoMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/GetGuildEditInfoMessageComposer';
import { GetHabboGroupDetailsMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/GetHabboGroupDetailsMessageComposer';
import { JoinHabboGroupMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/JoinHabboGroupMessageComposer';
import { HabboToolbarEvent } from '@/com/sulake/habbo/toolbar/events/HabboToolbarEvent';
import { isIBadgeImageWidget } from '@/com/sulake/habbo/window/widgets/IBadgeImageWidget';

export class GroupRoomInfoCtrl implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.groups::GroupRoomInfoCtrl'); }

    private static readonly TOOLBAR_EXTENSION_ID: string = "room_group_info";

    declare private _manager: HabboGroupsManager;

    declare private _window: IWindowContainer;

    private _expanded: boolean = true;

    declare private _group: HabboGroupDetailsData;

    declare private _expectedGroupId: number;
    static { (this.prototype as any)._expectedGroupId = 0; }

    constructor(param1: HabboGroupsManager) {
        this._manager = param1;
    }

    public dispose(): void {
        if (this.toolbarAttachAllowed()) {
            this._manager.toolbar.extensionView.detachExtension("room_group_info");
        }
        this._manager = null;
        if (this._window) {
            this._window.dispose();
            this._window = null;
        }
    }

    public get disposed(): boolean {
        return this._manager == null;
    }

    public onRoomInfo(param1: GuestRoomData): void {
        if (!this._manager.groupRoomInfoEnabled) {
            return;
        }
        if (param1.habboGroupId > 0) {
            this._expectedGroupId = param1.habboGroupId;
            this._manager.send(new GetHabboGroupDetailsMessageComposer(param1.habboGroupId, false));
        } else {
            this._expectedGroupId = 0;
            this.close();
        }
    }

    public onGroupDeactivated(param1: number): void {
        if (param1 == this._group.groupId || param1 == this._expectedGroupId) {
            this.expectedGroupId = 0;
            this.close();
        }
    }

    public onGroupDetails(param1: HabboGroupDetailsData): void {
        if (!this._manager.groupRoomInfoEnabled) {
            return;
        }
        if (param1.groupId == this._expectedGroupId) {
            this._expanded = true;
            this._group = param1;
            this.refresh();
        }
    }

    public isDisplayingGroup(param1: number): boolean {
        return this._window != null && this._group != null && param1 == this._group.groupId;
    }

    private refresh(): void {
        if (!this._group.isGuild) {
            return;
        }
        this.prepareWindow();
        this._window.findChildByName("bg_expanded").visible = this._expanded;
        this._window.findChildByName("bg_contracted").visible = !this._expanded;
        this._window.findChildByName("group_name_txt").visible = this._expanded;
        this._window.findChildByName("join_button").visible = this._expanded && this._group.joiningAllowed;
        this._window.findChildByName("join_button").enable();
        this._window.findChildByName("request_membership_button").visible = this._expanded && this._group.requestMembershipAllowed;
        this._window.findChildByName("manage_button").visible = this._expanded && this._group.isOwner;
        this._window.findChildByName("group_logo").visible = this._expanded;
        this._window.findChildByName("group_name_txt").caption = this._group.groupName;
        this._window.findChildByName("info_region").visible = this._expanded;
        let _loc1_: IBadgeImageWidget = asGuarded(castGuarded(this._window.findChildByName("group_logo"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow").widget, isIBadgeImageWidget);
        _loc1_.badgeId = this._group.badgeCode;
        _loc1_.groupId = this._group.groupId;
        this._window.x = 0;
        this._window.y = 0;
        this._window.height = this._expanded ? this._window.findChildByName("bg_expanded").height : this._window.findChildByName("bg_contracted").height;
        if (this.toolbarAttachAllowed()) {
            this._manager.toolbar.extensionView.attachExtension("room_group_info", this._window, -1, ["next_quest_timer", "quest_tracker", "event_info_window"]);
        }
    }

    private prepareWindow(): void {
        if (this._window != null) {
            return;
        }
        this._window = castGuarded(this._manager.getXmlWindow("group_room_info"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        this._window.findChildByName("join_button").procedure = this.onJoin;
        this._window.findChildByName("request_membership_button").procedure = this.onJoin;
        this._window.findChildByName("manage_button").procedure = this.onManage;
        this._window.findChildByName("title_region").procedure = this.onTitleClick;
        this._window.findChildByName("info_region").procedure = this.onInfoClick;
    }

    public close(): void {
        if (this._window != null) {
            if (this.toolbarAttachAllowed()) {
                this._manager.toolbar.extensionView.detachExtension("room_group_info");
            }
            this._expectedGroupId = 0;
            this._group = null;
        }
    }

    private onTitleClick = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        this._expanded = !this._expanded;
        this.refresh();
        this._manager.toolbar.events.dispatchEvent(new HabboToolbarEvent("HTE_GROUP_ROOM_INFO_CLICK"));
    };

    private onInfoClick = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK") {
            this._manager.trackGoogle("groupRoomInfo", "groupInfo");
            this._manager.send(new GetHabboGroupDetailsMessageComposer(this._group.groupId, true));
            this._manager.toolbar.events.dispatchEvent(new HabboToolbarEvent("HTE_GROUP_ROOM_INFO_CLICK"));
        }
    };

    private onManage = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK") {
            this._manager.trackGoogle("groupRoomInfo", "manageGroup");
            this._manager.send(new GetGuildEditInfoMessageComposer(this._group.groupId));
            this._manager.toolbar.events.dispatchEvent(new HabboToolbarEvent("HTE_GROUP_ROOM_INFO_CLICK"));
        }
    };

    private onJoin = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK") {
            this._manager.trackGoogle("groupRoomInfo", "joinGroup");
            this._window.findChildByName("join_button").disable();
            this._manager.send(new JoinHabboGroupMessageComposer(this._group.groupId));
            this._manager.send(new EventLogMessageComposer("HabboGroups", "" + this._group.groupId, "join"));
            this._manager.toolbar.events.dispatchEvent(new HabboToolbarEvent("HTE_GROUP_ROOM_INFO_CLICK"));
        }
    };

    public set expectedGroupId(param1: number) {
        this._expectedGroupId = param1;
    }

    private toolbarAttachAllowed(): boolean {
        return this._manager != null && this._manager.toolbar != null && this._manager.toolbar.extensionView != null && this._manager.toolbarAttachEnabled;
    }

    get [IDisposable](): true {
        return true;
    }
}
