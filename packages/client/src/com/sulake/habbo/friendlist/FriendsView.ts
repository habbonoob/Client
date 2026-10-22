import { asGuarded, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IContainerButtonWindow } from '@/com/sulake/core/window/components/IContainerButtonWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { ILabelWindow } from '@/com/sulake/core/window/components/ILabelWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { ITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { Friend } from '@/com/sulake/habbo/friendlist/domain/Friend';
import type { FriendCategory } from '@/com/sulake/habbo/friendlist/domain/FriendCategory';
import type { HabboFriendList } from '@/com/sulake/habbo/friendlist/HabboFriendList';
import type { ITabView } from '@/com/sulake/habbo/friendlist/ITabView';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { ErrorReportStorage } from '@/com/sulake/core/utils/ErrorReportStorage';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIContainerButtonWindow } from '@/com/sulake/core/window/components/IContainerButtonWindow';
import { isILabelWindow } from '@/com/sulake/core/window/components/ILabelWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { WindowKeyboardEvent } from '@/com/sulake/core/window/events/WindowKeyboardEvent';
import { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { FollowFriendMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/friendlist/FollowFriendMessageComposer';
import { EventLogMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/tracking/EventLogMessageComposer';
import { GetExtendedProfileMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/GetExtendedProfileMessageComposer';
import { FriendRemoveView } from '@/com/sulake/habbo/friendlist/FriendRemoveView';
import { IFriendsView } from '@/com/sulake/habbo/friendlist/IFriendsView';
import { RelationshipStatusSelector } from '@/com/sulake/habbo/friendlist/RelationshipStatusSelector';
import { RoomInviteView } from '@/com/sulake/habbo/friendlist/RoomInviteView';
import { Util } from '@/com/sulake/habbo/friendlist/Util';
import { ExtendedProfileIcon } from '@/com/sulake/habbo/utils/ExtendedProfileIcon';
import { HabboWebTools } from '@/com/sulake/habbo/utils/HabboWebTools';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class FriendsView implements ITabView, IFriendsView {
    static { registerClassName(this, 'com.sulake.habbo.friendlist::FriendsView'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        FriendsView.#initStatics();
        return FriendsView._log;
    }

    public static readonly BG_NAME: string = "bg";
    private static readonly VIP_ICON_STYLE: number = 14;
    public static readonly ROOM_INVITATION_DELAY: number = 60000;
    private static readonly _SafeStr_7845: number = 5;

    constructor() {
    }

    declare private _friendList: HabboFriendList;

    declare private _SafeStr_7109: IContainerButtonWindow;

    declare private _SafeStr_7241: IContainerButtonWindow;

    declare private _SafeStr_7058: IContainerButtonWindow;

    declare private _SafeStr_4336: IContainerButtonWindow;

    declare private _searchInput: ITextFieldWindow;

    declare private _SafeStr_5077: IRegionWindow;

    declare private _removeButton: IContainerButtonWindow;

    declare private _SafeStr_2221: IItemListWindow;

    declare private _SafeStr_3126: RelationshipStatusSelector;

    declare private _SafeStr_6822: boolean;
    static { (this.prototype as any)._SafeStr_6822 = false; }

    public init(param1: HabboFriendList): void {
        this._friendList = param1;
        this._SafeStr_6822 = param1.getBoolean("friend_list.select_all.enabled");
    }

    public getEntryCount(): number {
        return this._friendList.categories.getFriendCount(true);
    }

    public fillFooter(param1: IWindowContainer): void {
        this._SafeStr_7109 = this.initButton("open_minimail", this.onMinimailButtonClick, param1);
        this._SafeStr_7241 = this.initButton("open_homepage", this.onHomeButtonClick, param1);
        this._SafeStr_7058 = this.initButton("room_invite", this.onInviteButtonClick, param1);
        this._SafeStr_4336 = this.initButton("search", this.onSearchButtonClick, param1);
        this._removeButton = this.initButton("remove_friend", this.onRemoveButtonClick, param1);
        this._searchInput = asGuarded(param1.findChildByName("friend_search"), isITextFieldWindow);
        this._SafeStr_5077 = asGuarded(param1.findChildByName("clear_input_region"), isIRegionWindow);
        this._searchInput.procedure = this.searchInputProcedure;
        this._SafeStr_5077.procedure = this.clearInputProcedure;
        this.refreshButtons();
    }

    public fillList(param1: IItemListWindow): void {
        this._SafeStr_2221 = param1;
        this.refreshList();
    }

    public tabClicked(param1: number): void {
        if (this._SafeStr_3126) {
            this._SafeStr_3126.disappear();
        }
    }

    public setNewMessageArrived(): void {
        this._friendList.tabs.findTab(1).setNewMessageArrived(true);
    }

    public refreshList(): void {
        let _loc2_: number = 0;
        let _loc6_: number = 0;
        let _loc4_: any = 0;
        let _loc3_: boolean = false;
        if (this._SafeStr_2221 == null) {
            return;
        }
        let _loc1_: string = this._searchInput != null && Boolean(this._searchInput.visible) ? this._searchInput.text.toLowerCase() : "";
        if (!this._SafeStr_3126) {
            this._SafeStr_3126 = new RelationshipStatusSelector(this._friendList);
        }
        this._SafeStr_3126.disappear();
        this._SafeStr_2221.autoArrangeItems = false;
        let _loc7_: number = 0;
        for (const _loc5_ of this._friendList.categories.getCategories() ?? []) {
            _loc5_.filter = _loc1_;
            this.refreshEntry(true, _loc7_, _loc5_, null);
            _loc7_++;
            if (_loc5_.open) {
                _loc2_ = _loc5_.getStartFriendIndex() | 0;
                _loc6_ = _loc5_.getEndFriendIndex() | 0;
                _loc4_ = _loc2_;
                while (_loc4_ < _loc6_) {
                    this.refreshEntry(true, _loc7_, _loc5_, _loc5_.filteredFriends[_loc4_]);
                    _loc7_++;
                    _loc4_++;
                }
            }
        }
        while (true) {
            _loc3_ = this.refreshEntry(false, _loc7_, null, null);
            if (_loc3_) {
                break;
            }
            _loc7_++;
        }
        this._SafeStr_2221.autoArrangeItems = true;
        this.refreshButtons();
    }

    public refreshed(): void {
        if (this._SafeStr_3126) {
            this._SafeStr_3126.disappear();
        }
    }

    public refreshCategoryEntry(param1: FriendCategory, param2: boolean): void {
        if (this._SafeStr_2221 == null) {
            return;
        }
        let _loc3_: IWindowContainer = param1.view;
        _loc3_.tags.splice(0, _loc3_.tags.length);
        _loc3_.tags.push(param1.id);
        this._friendList.refreshText(_loc3_, "caption", true, param1.name + " (" + param1.filteredFriends.length + ")");
        this.refreshCatIcon(_loc3_, "arrow_down_black", param1.open, param1.id, 6);
        this.refreshCatIcon(_loc3_, "arrow_right_black", !param1.open, param1.id, 9);
        let _loc4_: IWindowContainer = asGuarded(_loc3_.findChildByName("select_all_region"), isIWindowContainer);
        if (this._SafeStr_6822) {
            _loc4_.visible = param1.open && param1.filteredFriends.length >= 5 && param1.id == 0;
            if (_loc4_.visible) {
                _loc4_.getChildByName("select_all_text").caption = this.areAllFriendsSelected(param1) ? "${friendlist.unselect_all}" : "${friendlist.select_all}";
            }
            _loc4_.procedure = this.onSelectAllClick;
        } else {
            _loc4_.visible = false;
        }
        _loc3_.procedure = this.onCategoryClick;
        _loc3_.visible = false;
        this.refreshPager(param1, param2);
        _loc3_.height = Math.max(Util.getLowestPoint(_loc3_), 20) | 0;
        _loc3_.visible = true;
    }

    private initButton(param1: string, param2: (...args: any[]) => any, param3: IWindowContainer): IContainerButtonWindow {
        let _loc4_: IContainerButtonWindow = castGuarded(param3.findChildByName("button_" + param1), isIContainerButtonWindow, "com.sulake.core.window.components.IContainerButtonWindow");
        _loc4_.procedure = param2;
        let _loc5_: IBitmapWrapperWindow = castGuarded(_loc4_.findChildByName("icon"), isIBitmapWrapperWindow, "com.sulake.core.window.components.IBitmapWrapperWindow");
        _loc5_.bitmap = this._friendList.getButtonImage(param1);
        _loc5_.width = _loc5_.bitmap.width;
        _loc5_.height = _loc5_.bitmap.height;
        return _loc4_;
    }

    private refreshEntry(param1: boolean, param2: number, param3: FriendCategory, param4: Friend): boolean {
        let _loc6_: any = param2 % 2 == 1;
        let _loc5_: IWindowContainer = asGuarded(this._SafeStr_2221.getListItemAt(param2 >>> 0), isIWindowContainer);
        if (_loc5_ == null) {
            if (!param1) {
                return true;
            }
            _loc5_ = castGuarded(this._friendList.getXmlWindow("friend_entry"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
            _loc5_.findChildByName("user_info_region").procedure = this.onUserInfo;
            this._SafeStr_2221.addListItem(_loc5_);
        }
        Util.hideChildren(_loc5_);
        if (!param1) {
            _loc5_.height = 0;
            _loc5_.visible = false;
            return false;
        }
        _loc5_.height = 20;
        _loc5_.visible = true;
        _loc5_.color = this._friendList.laf.getRowShadingColor(1, _loc6_);
        if (param4 == null) {
            param3.view = _loc5_;
            this.refreshCategoryEntry(param3, _loc6_);
        } else {
            param4.view = _loc5_;
            this.refreshFriendEntry(param3, param4, _loc6_);
        }
        return false;
    }

    private areAllFriendsSelected(param1: FriendCategory): boolean {
        for (const _loc2_ of param1.friends ?? []) {
            if (!_loc2_.selected) {
                return false;
            }
        }
        return true;
    }

    private refreshFriendEntry(param1: FriendCategory, param2: Friend, param3: boolean = false): void {
        if (param1 == null || param2 == null) {
            return;
        }
        let _loc4_: IWindowContainer = param2.view;
        if (_loc4_ == null) {
            return;
        }
        _loc4_.id = param2.id;
        _loc4_.procedure = this.onFriendClick;
        _loc4_.visible = true;
        if (param2.selected) {
            _loc4_.color = this._friendList.laf.getSelectedEntryBgColor();
        } else if (param3) {
            _loc4_.color = this._friendList.laf.getRowShadingColor(1, true);
        }
        castGuarded(param2.view.findChildByName("name"), isILabelWindow, "com.sulake.core.window.components.ILabelWindow").textColor = this._friendList.laf.getFriendTextColor(param2.selected);
        let _loc5_: string = param2.name;
        if (param2.realName != null && param2.realName != "") {
            _loc5_ = _loc5_ + " (" + param2.realName + ")";
        }
        this._friendList.refreshText(_loc4_, "name", true, _loc5_);
        let _loc6_: boolean = this._friendList.isMessagesPersisted() && (param2.persistedMessageUser || param2.pocketHabboUser);
        this._friendList.refreshButton(_loc4_, "start_chat", param2.online || _loc6_, this.onChatButtonClick, param2.id);
        this._friendList.refreshButton(_loc4_, "follow_friend", param2.followingAllowed, this.onFollowButtonClick, param2.id);
        this._friendList.refreshRelationshipRegion(_loc4_, "relationship_status", param2.relationshipStatus, this.onRelationshipStatusRegion, param2.id);
        this.refreshFigure(_loc4_, param2);
        _loc4_.findChildByName("user_info_region").visible = true;
        _loc4_.findChildByName("user_info_region").id = param2.id;
        ExtendedProfileIcon.setUserInfoState(false, _loc4_);
    }

    private refreshCatIcon(param1: IWindowContainer, param2: string, param3: boolean, param4: number, param5: number): void {
        let _loc6_: ILabelWindow = null;
        let _loc7_: IWindow = null;
        this._friendList.refreshButton(param1, param2, param3, this.onCategoryClick, param4);
        if (param3) {
            _loc6_ = castGuarded(param1.findChildByName("caption"), isILabelWindow, "com.sulake.core.window.components.ILabelWindow");
            _loc7_ = param1.findChildByName(param2);
            _loc7_.x = _loc6_.textWidth + param5 | 0;
        }
    }

    private refreshFigure(param1: IWindowContainer, param2: Friend): void {
        let _loc3_: BitmapData = null;
        if (!param1) {
            ErrorReportStorage.addDebugData("FriendsView", "refreshFigure: e is null!");
        }
        if (!param2) {
            ErrorReportStorage.addDebugData("FriendsView", "refreshFigure: f is null!");
        }
        let _loc4_: IBitmapWrapperWindow = asGuarded(param1.getChildByName("face"), isIBitmapWrapperWindow);
        if (!_loc4_) {
            ErrorReportStorage.addDebugData("FriendsView", "refreshFigure: child is null!");
        }
        if (!this._friendList) {
            ErrorReportStorage.addDebugData("FriendsView", "refreshFigure: _friendList is null!");
        }
        if (param2.figure == null || param2.figure == "") {
            _loc4_.visible = false;
        } else {
            if (param2.face == null) {
                if (param2.isGroupFriend()) {
                    param2.face = this._friendList.getSmallGroupBadgeBitmap(param2.figure);
                } else {
                    param2.face = this._friendList.getAvatarFaceBitmap(param2.figure);
                }
            }
            if (_loc4_.bitmap == null) {
                _loc4_.bitmap = new BitmapData(_loc4_.width, _loc4_.height);
            }
            if (_loc4_.tags[0] != param2.figure) {
                _loc4_.tags.splice(0, _loc4_.tags.length);
                _loc4_.tags.push(param2.figure);
                _loc4_.bitmap.fillRect(_loc4_.bitmap.rect, 0);
                _loc3_ = param2.face;
                if (_loc3_) {
                    _loc4_.bitmap.copyPixels(_loc3_, _loc3_.rect, new Point(0, 0), null, null, true);
                }
            } else {
                FriendsView._log.info("Figure unchanged: " + _loc4_.tags[0]);
            }
            _loc4_.visible = true;
        }
    }

    private getBgColor(param1: boolean): number {
        return this._friendList.laf.getRowShadingColor(1, param1);
    }

    private refreshButtons(): void {
        let _loc1_: any[] = this._friendList.categories.getSelectedFriends();
        this.setEnabled(this._SafeStr_7109, this.isEnableMinimailButton(_loc1_));
        this.setEnabled(this._SafeStr_7241, this.isEnableHomeButton(_loc1_));
        this.setEnabled(this._SafeStr_7058, this.isEnableInviteButton(_loc1_));
        this.setEnabled(this._removeButton, this.isEnableRemoveButton(_loc1_));
    }

    private setEnabled(param1: IContainerButtonWindow, param2: boolean): void {
        if (param2) {
            param1.enable();
        } else {
            param1.disable();
        }
    }

    private isEnableMinimailButton(param1: any[]): boolean {
        return this._friendList.isEmbeddedMinimailEnabled() || param1.length == 1;
    }

    private isEnableHomeButton(param1: any[]): boolean {
        return param1.length == 1;
    }

    private isEnableInviteButton(param1: any[]): boolean {
        if (param1.length < 1) {
            return false;
        }
        for (const _loc2_ of param1 ?? []) {
            if (_loc2_.online) {
                return true;
            }
        }
        return true;
    }

    private isEnableRemoveButton(param1: any[]): boolean {
        return param1.length > 0;
    }

    private onSelectAllClick = (param1: WindowEvent, param2: IWindow): void => {
        let _loc5_: any = null;
        if (param1.type != "WME_CLICK") {
            return;
        }
        while (param2.tags.length == 0) {
            param2 = param2.parent;
        }
        let _loc3_: number = param2.tags[0] | 0;
        let _loc4_: FriendCategory = this._friendList.categories.findCategory(_loc3_);
        if (this.areAllFriendsSelected(_loc4_)) {
            for (_loc5_ of _loc4_.filteredFriends ?? []) {
                _loc5_.selected = false;
            }
        } else {
            for (_loc5_ of _loc4_.filteredFriends ?? []) {
                _loc5_.selected = true;
            }
        }
        this.refreshList();
        this._friendList.view.refresh("Selected/unselected all");
    };

    private onCategoryClick = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        FriendsView._log.info("Category clicked: " + param2.name + ", " + param2.tags[0]);
        if (param2.tags.length == 0) {
            param2 = param2.parent;
        }
        FriendsView._log.info("Category id: " + param2.name + ", " + param2.tags[0]);
        let _loc3_: number = param2.tags[0] | 0;
        FriendsView._log.info("Cat id: " + _loc3_);
        let _loc4_: FriendCategory = this._friendList.categories.findCategory(_loc3_);
        _loc4_.setOpen(!_loc4_.open);
        this.refreshList();
        this._friendList.view.refresh("Cat open/closed");
    };

    private onFriendClick = (param1: WindowEvent, param2: IWindow): void => {
        let _loc3_: Friend = null;
        if (param2 == null) {
            return;
        }
        if (param2.id == 0) {
            param2 = param2.parent;
            if (param2 == null) {
                return;
            }
        }
        if (param1.type == "WME_CLICK" || param1.type == "WME_DOUBLE_CLICK") {
            _loc3_ = this._friendList.categories.findFriend(param2.id);
            if (_loc3_.id > 0) {
                _loc3_.selected = _loc3_ != null && !_loc3_.selected;
                this.refreshButtons();
                this.refreshList();
            }
            if (param1.type == "WME_DOUBLE_CLICK" && _loc3_ != null && _loc3_.online) {
                this._friendList.messenger.startConversation(_loc3_.id);
            }
        }
    };

    private onChatButtonClick = (param1: WindowEvent, param2: IWindow): void => {
        this._friendList.view.showInfo(param1, "${friendlist.tip.im}");
        if (param1.type != "WME_CLICK") {
            return;
        }
        FriendsView._log.info("chat clicked: " + param2.name + ", " + param2.id);
        this._friendList.messenger.startConversation(param2.id);
    };

    private onFollowButtonClick = (param1: WindowEvent, param2: IWindow): void => {
        this._friendList.view.showInfo(param1, "${friendlist.tip.follow}");
        if (param1.type != "WME_CLICK") {
            return;
        }
        this._friendList.send(new FollowFriendMessageComposer(param2.id));
        this._friendList.send(new EventLogMessageComposer("Navigation", "Friend List", "go.friendlist"));
    };

    private onRelationshipStatusRegion = (param1: WindowEvent, param2: IWindow): void => {
        if (param2 == null) {
            return;
        }
        if (param2.id == 0) {
            param2 = param2.parent;
            if (param2 == null) {
                return;
            }
        }
        this._friendList.view.showInfo(param1, "${friendlist.tip.relationship}");
        if (param1.type == "WME_CLICK") {
            this._SafeStr_3126.friendId = param2.id;
            this._SafeStr_3126.appearAt(param2, this._friendList.view.mainWindow);
        }
    };

    private onUserInfo = (param1: WindowEvent, param2: IWindow): void => {
        this._friendList.view.showInfo(param1, "${infostand.profile.link.tooltip}");
        if (param1.type == "WME_OVER") {
            ExtendedProfileIcon.setUserInfoState(true, castGuarded(param2, isIWindowContainer, "com.sulake.core.window.IWindowContainer"));
        } else if (param1.type == "WME_OUT") {
            ExtendedProfileIcon.setUserInfoState(false, castGuarded(param2, isIWindowContainer, "com.sulake.core.window.IWindowContainer"));
        } else if (param1.type == "WME_CLICK") {
            this._friendList.trackGoogle("extendedProfile", "friendList_friendsView");
            this._friendList.send(new GetExtendedProfileMessageComposer(param2.parent.id));
        }
    };

    private onMinimailButtonClick = (param1: WindowEvent, param2: IWindow): void => {
        let _loc5_: number = 0;
        this._friendList.view.showInfo(param1, "${friendlist.tip.compose}");
        if (param1.type != "WME_CLICK") {
            return;
        }
        let _loc4_: any[] = this._friendList.categories.getSelectedFriends();
        if (_loc4_.length == 0) {
            FriendsView._log.warn("No friend found when minimail clicked");
            if (this._friendList.isEmbeddedMinimailEnabled()) {
                HabboWebTools.openMinimail("#mail/inbox/");
            }
            return;
        }
        let _loc6_: Map<any, any> = new Dictionary();
        let _loc3_: any[] = [];
        _loc5_ = 0;
        while (_loc5_ < _loc4_.length && _loc5_ < 50) {
            _loc3_.push(_loc4_[_loc5_].id);
            _loc5_++;
        }
        _loc6_.set("recipientid", _loc3_.join(","));
        _loc6_.set("random", "" + Math.round(Math.random() * 100000000));
        let _loc7_: WindowMouseEvent = param1 instanceof WindowMouseEvent ? param1 : null;
        if (this._friendList.isEmbeddedMinimailEnabled()) {
            HabboWebTools.openMinimail("#mail/compose/" + _loc6_.get("recipientid") + "/" + _loc6_.get("random") + "/");
        } else {
            this._friendList.openHabboWebPage("link.format.mail.compose", _loc6_, _loc7_.stageX | 0, _loc7_.stageY | 0);
        }
    };

    private onHomeButtonClick = (param1: WindowEvent, param2: IWindow): void => {
        this._friendList.view.showInfo(param1, "${friendlist.tip.home}");
        if (param1.type != "WME_CLICK") {
            return;
        }
        let _loc3_: Friend = this._friendList.categories.getSelectedFriend();
        if (_loc3_ == null) {
            FriendsView._log.warn("No friend found when home clicked");
            return;
        }
        let _loc4_: Map<any, any> = new Dictionary();
        _loc4_.set("ID", "" + _loc3_.id);
        _loc4_.set("username", _loc3_.name);
        let _loc5_: WindowMouseEvent = param1 instanceof WindowMouseEvent ? param1 : null;
        this._friendList.openHabboWebPage("link.format.userpage", _loc4_, _loc5_.stageX | 0, _loc5_.stageY | 0);
    };

    private onInviteButtonClick = (param1: WindowEvent, param2: IWindow): void => {
        this._friendList.view.showInfo(param1, "${friendlist.tip.invite}");
        if (param1.type != "WME_CLICK") {
            return;
        }
        if (getTimer() - this._friendList.lastRoomInvitationTime < 60000) {
            this._friendList.simpleAlert("${friendlist.invite.frequentalert.title}", "${friendlist.invite.frequentalert.text}");
            return;
        }
        new RoomInviteView(this._friendList).show();
    };

    private onSearchButtonClick = (param1: WindowEvent, param2: IWindow): void => {
        if (this._SafeStr_4336 == null) {
            return;
        }
        this._friendList.view.showInfo(param1, "${friendlist.tip.search}");
        if (param1.type != "WME_CLICK") {
            return;
        }
        this._SafeStr_4336.visible = false;
        this._searchInput.visible = true;
        this._SafeStr_5077.visible = true;
        this._searchInput.focus();
    };

    private searchInputProcedure = (param1: WindowEvent, param2: IWindow): void => {
        if (this._SafeStr_4336 == null) {
            return;
        }
        this._friendList.view.showInfo(param1, "${friendlist.tip.search}");
        let _loc5_: WindowKeyboardEvent = param1 instanceof WindowKeyboardEvent ? param1 : null;
        if (_loc5_ == null) {
            return;
        }
        let _loc4_: any = _loc5_.keyCode == 13;
        let _loc3_: any = _loc5_.keyCode == 27;
        if (_loc3_) {
            this.clearInput();
        } else if (_loc4_) {
            this.refreshList();
            this._friendList.view.refresh("Apply filter");
            this._searchInput.focus();
        }
    };

    private clearInputProcedure = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        this.clearInput();
    };

    private clearInput(): void {
        this._searchInput.text = "";
        this._SafeStr_4336.visible = true;
        this._searchInput.visible = false;
        this._SafeStr_5077.visible = false;
        this.refreshList();
        this._friendList.view.refresh("Clear filter");
    }

    private onRemoveButtonClick = (param1: WindowEvent, param2: IWindow): void => {
        this._friendList.view.showInfo(param1, "${friendlist.tip.remove}");
        if (param1.type != "WME_CLICK") {
            return;
        }
        new FriendRemoveView(this._friendList).show();
    };

    private refreshPager(param1: FriendCategory, param2: boolean): void {
        let _loc3_: number = 0;
        let _loc4_: IWindowContainer = castGuarded(param1.view.findChildByName("pager"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        if (param1.getPageCount() < 2 || !param1.open) {
            FriendsView._log.info("PAGER NOT VISIBLE: " + param1.open + ", " + param1.getPageCount());
            _loc4_.visible = false;
            return;
        }
        _loc4_.visible = true;
        Util.hideChildren(_loc4_);
        _loc3_ = 0;
        while (_loc3_ < param1.getPageCount()) {
            this.refreshPageLink(_loc4_, _loc3_, param1.pageIndex, param2);
            _loc3_++;
        }
        Util.layoutChildrenInArea(_loc4_, _loc4_.width, 15);
        _loc4_.height = Util.getLowestPoint(_loc4_);
    }

    private refreshPageLink(param1: IWindowContainer, param2: number, param3: number, param4: boolean): void {
        let _loc5_: string = "page." + param2;
        let _loc6_: ITextWindow = castGuarded(param1.getChildByName(_loc5_), isITextWindow, "com.sulake.core.window.components.ITextWindow");
        if (_loc6_ == null) {
            _loc6_ = castGuarded(this._friendList.getXmlWindow("pagelink"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
            _loc6_.name = _loc5_;
            param1.addChild(_loc6_);
        }
        _loc6_.underline = param2 != param3;
        _loc6_.text = "" + (param2 * 100 + 1) + "-" + ("" + (param2 + 1) * 100);
        _loc6_.id = param2;
        _loc6_.procedure = this.onPageLinkClick;
        _loc6_.width = _loc6_.textWidth + 5 | 0;
        _loc6_.color = this._friendList.laf.getRowShadingColor(1, param4);
        _loc6_.visible = true;
    }

    private onPageLinkClick = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        let _loc6_: ITextWindow = castGuarded(param2, isITextWindow, "com.sulake.core.window.components.ITextWindow");
        let _loc3_: number = _loc6_.parent.parent.tags[0] | 0;
        let _loc5_: number = _loc6_.id;
        FriendsView._log.info("Page link clicked: " + _loc3_ + ", " + _loc5_);
        let _loc4_: FriendCategory = this._friendList.categories.findCategory(_loc3_);
        _loc4_.pageIndex = _loc5_;
        this.refreshList();
    };

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (FriendsView.#staticsReady) return;
        FriendsView.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(FriendsView, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.habbo.friendlist.FriendsView"));
    }

    get [IFriendsView](): true {
        return true;
    }
}
