import { asGuarded, castGuarded, castTo, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { IDropMenuWindow } from '@/com/sulake/core/window/components/IDropMenuWindow';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { ITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { GuildMemberData } from '@/com/sulake/habbo/communication/messages/incoming/users/GuildMemberData';
import type { MemberData } from '@/com/sulake/habbo/communication/messages/incoming/users/MemberData';
import type { GroupMembershipRequestedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/users/GroupMembershipRequestedMessageParser';
import type { HabboGroupsManager } from '@/com/sulake/habbo/groups/HabboGroupsManager';
import type { IBadgeImageWidget } from '@/com/sulake/habbo/window/widgets/IBadgeImageWidget';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIDropMenuWindow } from '@/com/sulake/core/window/components/IDropMenuWindow';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isIIconWindow } from '@/com/sulake/core/window/components/IIconWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { WindowKeyboardEvent } from '@/com/sulake/core/window/events/WindowKeyboardEvent';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { GroupMembershipRequestedMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/users/GroupMembershipRequestedMessageEvent';
import { GuildMemberMgmtFailedMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/users/GuildMemberMgmtFailedMessageEvent';
import { GuildMembershipRejectedMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/users/GuildMembershipRejectedMessageEvent';
import { GuildMembershipUpdatedMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/users/GuildMembershipUpdatedMessageEvent';
import { GuildMembersMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/users/GuildMembersMessageEvent';
import { AddAdminRightsToMemberMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/AddAdminRightsToMemberMessageComposer';
import { ApproveAllMembershipRequestsMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/ApproveAllMembershipRequestsMessageComposer';
import { ApproveMembershipRequestMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/ApproveMembershipRequestMessageComposer';
import { GetExtendedProfileMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/GetExtendedProfileMessageComposer';
import { GetGuildMembersMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/GetGuildMembersMessageComposer';
import { RejectMembershipRequestMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/RejectMembershipRequestMessageComposer';
import { RemoveAdminRightsFromMemberMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/RemoveAdminRightsFromMemberMessageComposer';
import { UnblockGroupMemberMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/UnblockGroupMemberMessageComposer';
import { InfoText } from '@/com/sulake/habbo/utils/InfoText';
import { LoadingIcon } from '@/com/sulake/habbo/utils/LoadingIcon';
import { isIAvatarImageWidget } from '@/com/sulake/habbo/window/widgets/IAvatarImageWidget';
import { isIBadgeImageWidget } from '@/com/sulake/habbo/window/widgets/IBadgeImageWidget';

export class GuildMembersWindowCtrl implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.groups::GuildMembersWindowCtrl'); }

    public static readonly REQUEST_PAGE_RATELIMIT: number = 500;
    private static readonly MEMBER_SPACING: Point = new Point(5, 5);

    declare private _manager: HabboGroupsManager;

    declare private _window: IFrameWindow;

    declare private _groupId: number;
    static { (this.prototype as any)._groupId = 0; }

    private _SafeStr_2777: Timer = new Timer(1000, 1);

    declare private _data: GuildMemberData;

    declare private _userNameFilter: InfoText;

    declare private _loadingIcon: LoadingIcon;

    private _currentPage: number = -1;
    private _SafeStr_4616: number = -1;
    private _SafeStr_5638: number = 0;

    constructor(param1: HabboGroupsManager) {
        this._manager = param1;
        this._SafeStr_2777.addEventListener("timer", this.onSearchTimer);
        this._loadingIcon = new LoadingIcon();
    }

    public dispose(): void {
        this._manager = null;
        if (this._window) {
            this._window.dispose();
            this._window = null;
        }
        if (this._userNameFilter != null) {
            this._userNameFilter.dispose();
            this._userNameFilter = null;
        }
        if (this._SafeStr_2777) {
            this._SafeStr_2777.removeEventListener("timer", this.onSearchTimer);
            this._SafeStr_2777.stop();
            this._SafeStr_2777 = null;
        }
        if (this._loadingIcon) {
            this._loadingIcon.dispose();
            this._loadingIcon = null;
        }
    }

    private setSearchingIcon(param1: boolean): void {
        if (this._window) {
            this._loadingIcon.setVisible(castGuarded(this._window.findChildByName("searching_icon"), isIIconWindow, "com.sulake.core.window.components.IIconWindow"), param1);
        }
    }

    public get disposed(): boolean {
        return this._manager == null;
    }

    public onGuildMembers = (param1: IMessageEvent): void => {
        this._data = castTo(param1, GuildMembersMessageEvent).data;
        this.show();
        this.populateSearchTypes();
        this.populateUserNameFilter();
    };

    public onGuildMembershipUpdated = (param1: IMessageEvent): void => {
        let _loc2_: GuildMembershipUpdatedMessageEvent = castTo(param1, GuildMembershipUpdatedMessageEvent);
        if (this._data != null && this._data.groupId == _loc2_.guildId) {
            this._data.update(_loc2_.data);
            this.reload();
        }
    };

    public onGuildMemberMgmtFailed = (param1: IMessageEvent): void => {
        let _loc2_: GuildMemberMgmtFailedMessageEvent = castTo(param1, GuildMemberMgmtFailedMessageEvent);
        let _loc3_: number = _loc2_.reason;
        let _loc4_: string = "group.membermgmt.fail." + _loc3_;
        let _loc5_: string = this._manager.localization.getLocalization(_loc4_, _loc4_);
        this._manager.windowManager.alert("${group.membermgmt.fail.title}", _loc5_, 0, null);
        if (this._data != null && this._data.groupId == _loc2_.guildId && this._window != null && Boolean(this._window.visible)) {
            this.doSearch(this._data.pageIndex);
        }
    };

    public onGuildMembershipRejected = (param1: IMessageEvent): void => {
        let _loc2_: GuildMembershipRejectedMessageEvent = castTo(param1, GuildMembershipRejectedMessageEvent);
        if (this._window && this._window.visible && this._data != null && this._data.groupId == _loc2_.getParser().guildId) {
            this.doSearch(this._data.pageIndex);
        }
    };

    public onMembershipRequested = (param1: IMessageEvent): void => {
        let _loc2_: GroupMembershipRequestedMessageParser = castTo(param1, GroupMembershipRequestedMessageEvent).getParser();
        if (this._window && this._window.visible && this._data != null && this._data.groupId == _loc2_.groupId) {
            this.doSearch(this._data.pageIndex);
        }
    };

    public onMembersClick(param1: number, param2: number): void {
        if (!this._manager.getBoolean("groupMembers.enabled")) {
            return;
        }
        if (this._window != null && Boolean(this._window.visible) && this._groupId == param1) {
            this.close();
        } else {
            if (this._userNameFilter) {
                this._userNameFilter.goBackToInitialState();
            }
            this._groupId = param1;
            this._manager.send(new GetGuildMembersMessageComposer(param1, 0, "", param2));
        }
    }

    public show(): void {
        this.prepareWindow();
        this.refresh();
        this._window.visible = true;
        this._window.activate();
    }

    public reload(): void {
        if (this._window != null && Boolean(this._window.visible)) {
            this.refresh();
        }
    }

    private refresh(): void {
        let _loc4_: number = 0;
        let _loc5_: string = null;
        let _loc6_: string = null;
        this._manager.localization.registerParameter("group.members.title", "groupName", this._data.groupName);
        let _loc7_: IWindowContainer = castGuarded(this._window.findChildByName("members_cont"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        let _loc8_: any[] = this._data.entries;
        _loc4_ = 0;
        while (_loc4_ < this._data.pageSize) {
            this.refreshEntry(_loc7_, _loc4_, _loc8_[_loc4_]);
            _loc4_++;
        }
        let _loc1_: IBadgeImageWidget = asGuarded(castGuarded(this._window.findChildByName("group_logo"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow").widget, isIBadgeImageWidget);
        _loc1_.badgeId = this._data.badgeCode;
        _loc1_.groupId = this._data.groupId;
        this._currentPage = this._data.pageIndex;
        if (this._data.pageIndex == this._SafeStr_4616) {
            this._SafeStr_4616 = -1;
        }
        let _loc3_: string = this._manager.localization.getLocalization("group.members.pageinfo");
        let _loc2_: any[] = _loc3_.split("%page%");
        if (_loc2_.length == 2) {
            _loc5_ = stringOrNull(_loc2_[0]);
            _loc6_ = stringOrNull(_loc2_[1]);
            this.pageTextStart.text = _loc5_.replace("%amount%", String(this._data.totalEntries));
            this.pageTextEnd.text = _loc6_.replace("%totalPages%", String(this._data.totalPages));
            this.pageNumberInput.text = this._data.pageIndex + 1 + "";
        }
        this._window.findChildByName("previous_page_button").visible = this.hasPreviousPage();
        this._window.findChildByName("next_page_button").visible = this.hasNextPage();
    }

    private onPageInputClickAway = (param1: WindowMouseEvent): void => {
        if (param1.related != null && param1.related.tags.indexOf("close") != -1) {
            return;
        }
        this.navigateToInputPage();
    };

    private onPageInputDown = (param1: WindowKeyboardEvent): void => {
        let _loc2_: WindowKeyboardEvent = param1 instanceof WindowKeyboardEvent ? param1 : null;
        if (_loc2_ == null) {
            return;
        }
        if (_loc2_.keyCode == 13) {
            this.navigateToInputPage();
        }
    };

    private navigateToInputPage(): void {
        let _loc2_: number = Number(this.pageNumberInput.text) | 0;
        let _loc1_: number = this.limitPageIndex(_loc2_ - 1) + 1;
        if (_loc1_ != _loc2_) {
            this.pageNumberInput.text = String(_loc1_);
        }
        this.doSearch(_loc1_ - 1);
    }

    private prepareWindow(): void {
        if (this._window != null) {
            return;
        }
        this._window = castGuarded(this._manager.getXmlWindow("guild_members_window"), isIFrameWindow, "com.sulake.core.window.components.IFrameWindow");
        this._window.findChildByTag("close").procedure = this.onClose;
        this._window.findChildByName("previous_page_button").procedure = this.onPreviousPage;
        this._window.findChildByName("next_page_button").procedure = this.onNextPage;
        this._userNameFilter = new InfoText(castGuarded(this._window.findChildByName("filter_members_input"), isITextFieldWindow, "com.sulake.core.window.components.ITextFieldWindow"), this._manager.localization.getLocalization("group.members.searchinfo"));
        this.pageNumberInput.restrict = "0-9";
        this.pageNumberInput.addEventListener("WKE_KEY_DOWN", this.onPageInputDown);
        this.pageNumberInput.addEventListener("WME_CLICK_AWAY", this.onPageInputClickAway);
        this._window.center();
    }

    private onClose = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        this.close();
    };

    public close(): void {
        if (this._window != null) {
            this._groupId = 0;
            this._window.visible = false;
        }
    }

    private refreshEntry(param1: IWindowContainer, param2: number, param3: MemberData): void {
        let _loc4_: IWindowContainer = castGuarded(param1.getChildAt(param2), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        if (_loc4_ == null) {
            if (param3 == null) {
                return;
            }
            _loc4_ = this.getListEntry();
            _loc4_.tags[0] = "" + param2;
            param1.addChild(_loc4_);
            _loc4_.x = (param2 % 2 == 0 ? 0 : _loc4_.width + GuildMembersWindowCtrl.MEMBER_SPACING.x) | 0;
            _loc4_.y = Math.floor(param2 / 2) * (_loc4_.height + GuildMembersWindowCtrl.MEMBER_SPACING.y) | 0;
        }
        if (param3 != null) {
            this.refreshUserEntry(_loc4_, param3);
            _loc4_.visible = true;
        } else {
            _loc4_.visible = false;
        }
    }

    public refreshUserEntry(param1: IWindowContainer, param2: MemberData): void {
        let _loc8_: boolean = false;
        param1.findChildByName("user_name_txt").caption = param2.userName;
        param1.findChildByName("icon_owner").visible = param2.owner;
        this.setAdminState(param2.member, param2.admin, param1);
        let _loc5_: IWindow = param1.findChildByName("admin_container");
        _loc5_.visible = !_loc8_ && (param2.admin || this._data.allowedToManage);
        let _loc9_: IRegionWindow = castGuarded(param1.findChildByName("bg_region"), isIRegionWindow, "com.sulake.core.window.components.IRegionWindow");
        _loc9_.id = param2.userId;
        this.setRemoveState(false, param1);
        this.setActionLinkState(false, param1);
        _loc8_ = param2.userId == this._manager.avatarId;
        let _loc11_: IRegionWindow = castGuarded(param1.findChildByName("remove_region"), isIRegionWindow, "com.sulake.core.window.components.IRegionWindow");
        _loc11_.toolTipCaption = this._manager.localization.getLocalization(param2.member ? "group.members.kick" : "group.members.reject");
        _loc11_.visible = !param2.owner && !_loc8_ && this._data.allowedToManage && !param2.blocked;
        _loc11_.id = param2.userId;
        let _loc6_: boolean = param2.member && !param2.owner && !_loc8_ && this._data.allowedToManage && this._manager.getBoolean("group.blocking.enabled") && !param2.blocked;
        let _loc3_: IRegionWindow = castGuarded(param1.findChildByName("block_region"), isIRegionWindow, "com.sulake.core.window.components.IRegionWindow");
        _loc3_.toolTipCaption = this._manager.localization.getLocalization("group.members.block");
        _loc3_.visible = _loc6_;
        _loc3_.id = param2.userId;
        let _loc4_: boolean = !_loc8_ && this._data.allowedToManage;
        let _loc10_: IRegionWindow = castGuarded(param1.findChildByName("action_link_region"), isIRegionWindow, "com.sulake.core.window.components.IRegionWindow");
        _loc10_.visible = _loc4_;
        _loc10_.id = param2.userId;
        let _loc7_: ITextWindow = castGuarded(param1.findChildByName("member_since_txt"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
        _loc7_.visible = !_loc4_ && param2.memberSince != "";
        this._manager.localization.registerParameter("group.members.since", "date", param2.memberSince);
        _loc7_.caption = this._manager.localization.getLocalization("group.members.since");
        castGuarded(castGuarded(param1.findChildByName("avatar_image"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow").widget, isIAvatarImageWidget, "com.sulake.habbo.window.widgets.IAvatarImageWidget").figure = param2.figure;
        if (param2.blocked) {
            this.setActionLink(param1, "group.members.unblock", false);
        } else if (param2.owner) {
            this.setActionLink(param1, "group.members.owner", false);
        } else if (param2.admin) {
            this.setActionLink(param1, "group.members.removerights", true);
        } else if (param2.member) {
            this.setActionLink(param1, "group.members.giverights", true);
        } else {
            this.setActionLink(param1, "group.members.accept", true);
        }
    }

    public getListEntry(): IWindowContainer {
        let _loc1_: IWindowContainer = castGuarded(this._manager.getXmlWindow("member_entry"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        let _loc3_: IRegionWindow = castGuarded(_loc1_.findChildByName("bg_region"), isIRegionWindow, "com.sulake.core.window.components.IRegionWindow");
        _loc3_.procedure = this.onBg;
        let _loc2_: IRegionWindow = castGuarded(_loc1_.findChildByName("block_region"), isIRegionWindow, "com.sulake.core.window.components.IRegionWindow");
        _loc2_.addEventListener("WME_OVER", this.onRemoveMouseOver);
        _loc2_.addEventListener("WME_OUT", this.onRemoveMouseOut);
        _loc2_.addEventListener("WME_CLICK", this.onBlockMouseClick);
        let _loc5_: IRegionWindow = castGuarded(_loc1_.findChildByName("remove_region"), isIRegionWindow, "com.sulake.core.window.components.IRegionWindow");
        _loc5_.addEventListener("WME_OVER", this.onRemoveMouseOver);
        _loc5_.addEventListener("WME_OUT", this.onRemoveMouseOut);
        _loc5_.addEventListener("WME_CLICK", this.onRemoveMouseClick);
        let _loc4_: IRegionWindow = castGuarded(_loc1_.findChildByName("action_link_region"), isIRegionWindow, "com.sulake.core.window.components.IRegionWindow");
        _loc4_.addEventListener("WME_OVER", this.onActionLinkMouseOver);
        _loc4_.addEventListener("WME_OUT", this.onActionLinkMouseOut);
        _loc4_.addEventListener("WME_CLICK", this.onActionLinkClick);
        return _loc1_;
    }

    private onRemoveMouseOver = (param1: WindowEvent): void => {
        let _loc2_: IRegionWindow = castGuarded(param1.target, isIRegionWindow, "com.sulake.core.window.components.IRegionWindow");
        this.setRemoveState(true, _loc2_);
    };

    private onRemoveMouseOut = (param1: WindowEvent): void => {
        let _loc2_: IRegionWindow = castGuarded(param1.target, isIRegionWindow, "com.sulake.core.window.components.IRegionWindow");
        this.setRemoveState(false, _loc2_);
    };

    private onRemoveMouseClick = (param1: WindowEvent): void => {
        let _loc3_: IWindow = param1.target;
        let _loc2_: MemberData = this._data.getUser(_loc3_.id);
        if (_loc2_ == null || _loc2_.owner) {
            return;
        }
        if (_loc2_.member) {
            this._manager.handleUserKick(_loc3_.id, this._data.groupId);
        } else {
            this._manager.send(new RejectMembershipRequestMessageComposer(this._data.groupId, _loc2_.userId));
        }
    };

    private onBlockMouseClick = (param1: WindowEvent): void => {
        let _loc3_: IWindow = param1.target;
        let _loc2_: MemberData = this._data.getUser(_loc3_.id);
        if (_loc2_ == null || _loc2_.owner) {
            return;
        }
        if (_loc2_.member) {
            this._manager.handleUserBlock(_loc3_.id, this._data.groupId);
        }
    };

    private setActionLink(param1: IWindowContainer, param2: string, param3: boolean): void {
        let _loc4_: ITextWindow = castGuarded(param1.findChildByName("action_link"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
        _loc4_.text = this._manager.localization.getLocalization(param2, param2);
        _loc4_.underline = param3;
    }

    private setRemoveState(param1: boolean, param2: IWindowContainer): void {
        param2.findChildByName("icon_close_off").visible = !param1;
        param2.findChildByName("icon_close_over").visible = param1;
        param2.findChildByName("icon_close_down").visible = false;
    }

    private setActionLinkState(param1: boolean, param2: IWindowContainer): void {
        let _loc3_: ITextWindow = castGuarded(param2.findChildByName("action_link"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
        _loc3_.textColor = param1 ? 4280984060 : 4285492837;
    }

    private onActionLinkMouseOver = (param1: WindowEvent): void => {
        let _loc3_: IRegionWindow = castGuarded(param1.target, isIRegionWindow, "com.sulake.core.window.components.IRegionWindow");
        let _loc2_: MemberData = this._data.getUser(param1.target.id);
        if (_loc2_ == null || _loc2_.owner) {
            return;
        }
        this.setActionLinkState(true, _loc3_);
        this.setAdminState(_loc2_.member, !_loc2_.admin, castGuarded(_loc3_.parent, isIWindowContainer, "com.sulake.core.window.IWindowContainer"));
    };

    private onActionLinkMouseOut = (param1: WindowEvent): void => {
        let _loc3_: IRegionWindow = castGuarded(param1.target, isIRegionWindow, "com.sulake.core.window.components.IRegionWindow");
        this.setActionLinkState(false, _loc3_);
        let _loc2_: MemberData = this._data.getUser(param1.target.id);
        if (_loc2_ != null) {
            this.setAdminState(_loc2_.member, _loc2_.admin, castGuarded(_loc3_.parent, isIWindowContainer, "com.sulake.core.window.IWindowContainer"));
        }
    };

    private onActionLinkClick = (param1: WindowEvent): void => {
        let _loc2_: MemberData = this._data.getUser(param1.target.id);
        if (_loc2_ == null || _loc2_.owner) {
            return;
        }
        if (_loc2_.blocked) {
            this._manager.send(new UnblockGroupMemberMessageComposer(this._data.groupId, _loc2_.userId));
        } else if (_loc2_.admin) {
            this._manager.send(new RemoveAdminRightsFromMemberMessageComposer(this._data.groupId, _loc2_.userId));
        } else if (_loc2_.member) {
            this._manager.send(new AddAdminRightsToMemberMessageComposer(this._data.groupId, _loc2_.userId));
        } else {
            this._manager.send(new ApproveMembershipRequestMessageComposer(this._data.groupId, _loc2_.userId));
        }
    };

    private setAdminState(param1: boolean, param2: boolean, param3: IWindowContainer): void {
        param3.findChildByName("icon_admin_off").visible = param1 && param2;
        param3.findChildByName("icon_admin_over").visible = param1 && !param2;
    }

    private onBg = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK") {
            this._manager.send(new GetExtendedProfileMessageComposer(param2.id));
        }
    };

    private onFilterMembers = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WE_CHANGE") {
            this._SafeStr_2777.reset();
            this._SafeStr_2777.start();
            this.setSearchingIcon(true);
        }
    };

    private onTypeDropmenu = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WE_SELECTED") {
            this.doSearch(0);
        }
    };

    private doSearch(param1: number): void {
        let _loc2_: number = getTimer();
        if (this._SafeStr_5638 > _loc2_ - 500) {
            return;
        }
        this._SafeStr_4616 = param1;
        this._SafeStr_5638 = _loc2_;
        this._SafeStr_2777.stop();
        this._SafeStr_2777.reset();
        this.setSearchingIcon(true);
        let _loc3_: GuildMemberData = this._data;
        let _loc4_: string = this._userNameFilter.getText();
        let _loc5_: number = this.getTypeDropMenu().selection;
        this._manager.send(new GetGuildMembersMessageComposer(_loc3_.groupId, param1, _loc4_, _loc5_));
    }

    private onAcceptAll(param1: WindowEvent, param2: IWindow): void {
        if (param1.type != "WME_CLICK") {
            return;
        }
        this._manager.send(new ApproveAllMembershipRequestsMessageComposer(this._data.groupId));
    }

    private getTypeDropMenu(): IDropMenuWindow {
        return castGuarded(this._window.findChildByName("type_drop_menu"), isIDropMenuWindow, "com.sulake.core.window.components.IDropMenuWindow");
    }

    private onSearchTimer = (param1: Event): void => {
        if (this._window != null && Boolean(this._window.visible)) {
            this.doSearch(0);
        }
    };

    private onNextPage = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        this.doSearch(this.limitPageIndex(this._data.pageIndex + 1));
    };

    private onPreviousPage = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        this.doSearch(this.limitPageIndex(this._data.pageIndex - 1));
    };

    private hasPreviousPage(): boolean {
        return this._data.pageIndex != this.limitPageIndex(this._data.pageIndex - 1);
    }

    private hasNextPage(): boolean {
        return this._data.pageIndex != this.limitPageIndex(this._data.pageIndex + 1);
    }

    private limitPageIndex(param1: number): number {
        let _loc2_: number = Math.ceil(this._data.totalEntries / this._data.pageSize) | 0;
        return Math.max(0, Math.min(param1, _loc2_ - 1)) | 0;
    }

    public get data(): GuildMemberData {
        return this._data;
    }

    private populateSearchTypes(): void {
        let _loc2_: any[] = [];
        _loc2_.push("${group.members.search.all}");
        _loc2_.push("${group.members.search.admins}");
        if (this._data.allowedToManage) {
            _loc2_.push("${group.members.search.pending}");
            if (this._manager.getBoolean("group.blocking.enabled")) {
                _loc2_.push("${group.members.search.blocked}");
            }
        }
        let _loc1_: IDropMenuWindow = this.getTypeDropMenu();
        _loc1_.procedure = null;
        _loc1_.populate(_loc2_);
        _loc1_.selection = (this._data.allowedToManage ? this._data.searchType : Math.min(this._data.searchType, 1)) | 0;
        _loc1_.procedure = this.onTypeDropmenu;
    }

    private populateUserNameFilter(): void {
        let _loc1_: ITextFieldWindow = this._userNameFilter.input;
        _loc1_.procedure = null;
        if (this._userNameFilter.getText() != this._data.userNameFilter) {
            this._userNameFilter.setText(this._data.userNameFilter);
        }
        _loc1_.procedure = this.onFilterMembers;
        this._SafeStr_2777.stop();
        this.setSearchingIcon(false);
    }

    private get pageTextStart(): ITextWindow {
        return asGuarded(this._window.findChildByName("pagina_text_start"), isITextWindow);
    }

    private get pageNumberInput(): ITextFieldWindow {
        return asGuarded(this._window.findChildByName("pagina_number_input"), isITextFieldWindow);
    }

    private get pageTextEnd(): ITextWindow {
        return asGuarded(this._window.findChildByName("pagina_text_end"), isITextWindow);
    }

    get [IDisposable](): true {
        return true;
    }
}
