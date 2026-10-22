import { asGuarded, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IContainerButtonWindow } from '@/com/sulake/core/window/components/IContainerButtonWindow';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { ILabelWindow } from '@/com/sulake/core/window/components/ILabelWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { IScrollableListWindow } from '@/com/sulake/core/window/components/IScrollableListWindow';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { ExtendedForumData } from '@/com/sulake/habbo/communication/messages/parser/groupforums/ExtendedForumData';
import type { ForumData } from '@/com/sulake/habbo/communication/messages/parser/groupforums/ForumData';
import type { MessageData } from '@/com/sulake/habbo/communication/messages/parser/groupforums/MessageData';
import type { ThreadData } from '@/com/sulake/habbo/communication/messages/parser/groupforums/ThreadData';
import type { ForumsListData } from '@/com/sulake/habbo/friendbar/groupforums/ForumsListData';
import type { GroupForumController } from '@/com/sulake/habbo/friendbar/groupforums/GroupForumController';
import type { MessagesListData } from '@/com/sulake/habbo/friendbar/groupforums/MessagesListData';
import type { ThreadsListData } from '@/com/sulake/habbo/friendbar/groupforums/ThreadsListData';
import type { IBadgeImageWidget } from '@/com/sulake/habbo/window/widgets/IBadgeImageWidget';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { isIContainerButtonWindow } from '@/com/sulake/core/window/components/IContainerButtonWindow';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isILabelWindow } from '@/com/sulake/core/window/components/ILabelWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isIScrollableListWindow } from '@/com/sulake/core/window/components/IScrollableListWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { ComposeMessageView, ForumSettingsView, ForumsListView, HabboFriendBarCom, MessageListView, ThreadListView } from '@/com/sulake/habbo/friendbar/HabboFriendBar.group';
import { FriendlyTime } from '@/com/sulake/habbo/utils/FriendlyTime';
import { isIBadgeImageWidget } from '@/com/sulake/habbo/window/widgets/IBadgeImageWidget';

export class GroupForumView {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.groupforums::GroupForumView'); }

    private static readonly _SafeStr_8174: number = 100;

    public static initTopAreaForForum(param1: IFrameWindow, param2: ForumData): IRegionWindow {
        let _loc4_: IWindowContainer = asGuarded(param1.findChildByName("top_part"), isIWindowContainer);
        let _loc6_: IWidgetWindow = castGuarded(_loc4_.findChildByName("group_icon"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow");
        _loc6_.visible = true;
        let _loc3_: IBadgeImageWidget = asGuarded(_loc6_.widget, isIBadgeImageWidget);
        _loc3_.badgeId = param2.icon;
        _loc3_.groupId = param2.groupId;
        _loc3_.type = "group";
        let _loc8_: IStaticBitmapWrapperWindow = asGuarded(_loc4_.findChildByName("header_icon"), isIStaticBitmapWrapperWindow);
        if (_loc8_ != null) {
            _loc8_.visible = false;
        }
        let _loc7_: ITextWindow = asGuarded(_loc4_.findChildByName("top_header_text"), isITextWindow);
        _loc7_.text = param2.name;
        let _loc5_: ITextWindow = asGuarded(_loc4_.findChildByName("top_text"), isITextWindow);
        _loc5_.text = param2.description;
        return asGuarded(_loc4_.findChildByName("top_click_area"), isIRegionWindow);
    }

    private static enable(param1: IWindow, param2: boolean): void {
        if (param2) {
            param1.enable();
        } else {
            param1.disable();
        }
    }

    constructor(param1: GroupForumController) {
        this._controller = param1;
        this._pageSize = 20;
    }

    declare private _controller: GroupForumController;

    declare private _SafeStr_3099: ForumsListView;

    declare private _SafeStr_2800: ThreadListView;

    declare private _SafeStr_2632: MessageListView;

    declare private _window: IFrameWindow;

    declare private _SafeStr_4118: IScrollableListWindow;

    declare private _SafeStr_5744: IWindow;

    declare private _SafeStr_5569: IWindow;

    declare private _SafeStr_5635: IWindow;

    declare private _SafeStr_5914: IWindow;

    declare private _txtElement: IWindow;

    declare private _SafeStr_3798: IContainerButtonWindow;

    declare private _SafeStr_2889: IContainerButtonWindow;

    declare private _SafeStr_6764: IWindow;

    declare private _SafeStr_5361: IWindow;

    declare private _SafeStr_5583: ITextWindow;

    declare private _SafeStr_2485: ForumsListData;

    declare private _forumData: ExtendedForumData;

    declare private _SafeStr_2897: ThreadsListData;

    declare private _SafeStr_3374: MessagesListData;

    private _currentPage: number = 1;
    private _numOfPages: number = 1;

    declare private _pageSize: number;
    static { (this.prototype as any)._pageSize = 0; }

    public get isForumsListOpened(): boolean {
        return this._SafeStr_3099 != null;
    }

    public get controller(): GroupForumController {
        return this._controller;
    }

    public dispose(): void {
        if (this._controller) {
            this._controller.closeMainView();
        }
        if (this._window != null) {
            this._window.removeEventListener("click", this.onClickButton);
            this._window.dispose();
            this._window = null;
            this._controller = null;
        }
    }

    public openForumsList(param1: ForumsListData): void {
        this.resetWindow();
        this._SafeStr_2485 = param1;
        this._forumData = null;
        this._SafeStr_2897 = null;
        this._SafeStr_3374 = null;
        this._numOfPages = this.calculateNumOfPagesAvailable(this._SafeStr_2485.totalAmount);
        this._currentPage = Math.ceil(this._SafeStr_2485.startIndex / 20) | 0;
        this._SafeStr_3099 = new ForumsListView(this, this._SafeStr_4118, this._SafeStr_2485.forums);
        this._SafeStr_3099.update();
        this._SafeStr_5361.caption = this._controller.localizationManager.getLocalization("groupforum.view.forums_list." + this._SafeStr_2485.listCode);
        let _loc3_: IWindowContainer = asGuarded(this._window.findChildByName("top_part"), isIWindowContainer);
        let _loc6_: IWidgetWindow = castGuarded(_loc3_.findChildByName("group_icon"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow");
        _loc6_.visible = false;
        let _loc8_: IStaticBitmapWrapperWindow = asGuarded(_loc3_.findChildByName("header_icon"), isIStaticBitmapWrapperWindow);
        _loc8_.visible = true;
        _loc8_.assetUri = "forum_forum_list" + this._SafeStr_2485.listCode;
        let _loc7_: ITextWindow = asGuarded(_loc3_.findChildByName("top_header_text"), isITextWindow);
        _loc7_.text = this._controller.localizationManager.getLocalization("groupforum.view.forums_header." + this._SafeStr_2485.listCode);
        let _loc4_: ITextWindow = asGuarded(_loc3_.findChildByName("top_text"), isITextWindow);
        _loc4_.text = this._controller.localizationManager.getLocalization("groupforum.view.forums_description." + this._SafeStr_2485.listCode);
        let _loc2_: IRegionWindow = asGuarded(_loc3_.findChildByName("top_click_area"), isIRegionWindow);
        _loc2_.removeEventListener("WME_CLICK", this.onTopAreaClick);
        _loc2_.disable();
        this.initCommonControls();
        let _loc5_: ITextWindow = castGuarded(this._window.findChildByName("status"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
        _loc5_.text = this._controller.localizationManager.getLocalization("groupforum.view.forums_list.status");
    }

    public openThreadList(param1: ForumsListData, param2: ExtendedForumData, param3: ThreadsListData): void {
        this.resetWindow();
        this._SafeStr_2485 = param1;
        this._forumData = param2;
        this._SafeStr_2897 = param3;
        this._SafeStr_3374 = null;
        this._numOfPages = this.calculateNumOfPagesAvailable(this._SafeStr_2897.totalThreads);
        this._currentPage = Math.ceil(this._SafeStr_2897.startIndex / 20) | 0;
        this._SafeStr_2800 = new ThreadListView(this, this._SafeStr_4118, this._forumData, this._SafeStr_2897);
        this._SafeStr_2800.update();
        this._SafeStr_5361.caption = this._controller.localizationManager.getLocalization("groupforum.view.all_threads");
        if (this._forumData.canPostThread) {
            this._SafeStr_2889.enable();
            this.setStatusTextError("post_thread", null);
        } else {
            this._SafeStr_2889.disable();
            this.setStatusTextError("post_thread", this._forumData.postThreadPermissionError);
        }
        let _loc4_: IRegionWindow = GroupForumView.initTopAreaForForum(this._window, this._forumData);
        _loc4_.removeEventListener("WME_CLICK", this.onTopAreaClick);
        _loc4_.addEventListener("WME_CLICK", this.onTopAreaClick);
        _loc4_.enable();
        this.initCommonControls();
    }

    public updateThread(param1: ThreadData): void {
        if (this._SafeStr_2800 != null) {
            this._SafeStr_2800.updateElement(param1);
        }
    }

    public updateMessage(param1: MessageData): void {
        if (this._SafeStr_2632 != null) {
            this._SafeStr_2632.updateElement(param1);
        }
    }

    public openMessagesList(param1: ForumsListData, param2: ExtendedForumData, param3: ThreadsListData, param4: MessagesListData): void {
        this.resetWindow();
        this._SafeStr_2485 = param1;
        this._forumData = param2;
        this._SafeStr_2897 = param3;
        this._SafeStr_3374 = param4;
        let _loc7_: number = param4.threadId;
        let _loc5_: ThreadData = this._SafeStr_2897.threadsById.get(_loc7_);
        this._numOfPages = this.calculateNumOfPagesAvailable(param4.totalMessages);
        let _loc8_: number = param4.startIndex;
        this._currentPage = Math.ceil(_loc8_ / 20) | 0;
        this._SafeStr_5361.caption = _loc5_.header;
        this._SafeStr_2632 = new MessageListView(this, this._SafeStr_4118, this._forumData, _loc5_, param4);
        this._SafeStr_2632.update();
        if (this._controller.getGoToMessageIndex() > 0 && this._controller.getGoToThreadId() == _loc7_) {
            this._SafeStr_2632.scrollToSpecificElement(this._controller.getGoToMessageIndex(), true);
            this._controller.resetGoTo();
        }
        if (this._forumData.canPostMessage) {
            if (this._forumData.canModerate || !_loc5_.isLocked) {
                this._SafeStr_2889.enable();
                this.setStatusTextError("post_message", null);
            } else {
                this._SafeStr_2889.disable();
                this.setStatusTextError("post_in_locked", this._forumData.moderatePermissionError);
            }
        } else {
            this._SafeStr_2889.disable();
            this.setStatusTextError("post_message", this._forumData.postMessagePermissionError);
        }
        let _loc6_: IRegionWindow = GroupForumView.initTopAreaForForum(this._window, this._forumData);
        _loc6_.removeEventListener("WME_CLICK", this.onTopAreaClick);
        _loc6_.addEventListener("WME_CLICK", this.onTopAreaClick);
        _loc6_.enable();
        this.initCommonControls();
    }

    public getAsDaysHoursMinutes(param1: number): string {
        return FriendlyTime.getFriendlyTime(this._controller.localizationManager, param1, ".ago", 1);
    }

    public openComposeMessageView(param1: ThreadData, param2: MessageData = null): void {
        if (this._controller.composeMessageView != null) {
            this._controller.composeMessageView.focus(this._forumData, param1, param2);
        } else {
            this._controller.composeMessageView = new ComposeMessageView(this, this._window.x + this._window.width, this._window.y, this._forumData, param1, param2);
        }
    }

    public openForumSettingsView(): void {
        if (this._controller.forumSettingsView != null) {
            this._controller.forumSettingsView.focus(this._forumData);
        } else {
            this._controller.forumSettingsView = new ForumSettingsView(this, this._window.x + this._window.width, this._window.y, this._forumData);
        }
    }

    public updateUnreadForumsCount(param1: number): void {
        if (param1 > 0) {
            this._SafeStr_5583.htmlText = this._controller.localizationManager.getLocalizationWithParams("groupforum.view.shortcuts.my.unread", "", "unread_count", param1);
        } else {
            this._SafeStr_5583.htmlText = this._controller.localizationManager.getLocalization("groupforum.view.shortcuts.my", "");
        }
    }

    private initCommonControls(): void {
        let _loc2_: IWindow = this._window.findChildByName("settings_button");
        if (this._forumData != null && this._forumData.canChangeSettings) {
            _loc2_.removeEventListener("WME_CLICK", this.onSettingsButtonClick);
            _loc2_.addEventListener("WME_CLICK", this.onSettingsButtonClick);
            _loc2_.visible = true;
        } else {
            _loc2_.visible = false;
        }
        let _loc1_: ILabelWindow = asGuarded(this._SafeStr_3798.findChildByName("back_button_label"), isILabelWindow);
        if (this._SafeStr_2800 != null) {
            this._SafeStr_3798.visible = true;
            _loc1_.text = this._controller.localizationManager.getLocalization("groupforum.view.mark_read");
        } else if (this._SafeStr_2632 != null) {
            this._SafeStr_3798.visible = true;
            _loc1_.text = this._controller.localizationManager.getLocalization("groupforum.view.back");
        } else if (this._SafeStr_3099 != null) {
            this._SafeStr_3798.visible = true;
            _loc1_.text = this._controller.localizationManager.getLocalization("groupforum.view.mark_read");
        } else {
            this._SafeStr_3798.visible = false;
        }
        let _loc3_: ILabelWindow = asGuarded(this._SafeStr_2889.findChildByName("post_button_label"), isILabelWindow);
        if (this._SafeStr_2800 != null) {
            this._SafeStr_2889.visible = true;
            _loc3_.text = this._controller.localizationManager.getLocalization("groupforum.view.start_thread");
        } else if (this._SafeStr_2632 != null) {
            this._SafeStr_2889.visible = true;
            _loc3_.text = this._controller.localizationManager.getLocalization("groupforum.view.reply");
        } else {
            this._SafeStr_2889.visible = false;
        }
        let _loc4_: number = this._currentPage + 1;
        this._txtElement.caption = _loc4_ + " / " + this._numOfPages;
        this._window.scaler.enable();
        this._window.scaler.visible = true;
        GroupForumView.enable(this._SafeStr_5635, this._currentPage > 0);
        GroupForumView.enable(this._SafeStr_5744, this._currentPage > 0);
        GroupForumView.enable(this._SafeStr_5569, this._currentPage < this._numOfPages - 1);
        GroupForumView.enable(this._SafeStr_5914, this._currentPage < this._numOfPages - 1);
        this.updateUnreadForumsCount(this._controller.unreadForumsCount);
    }

    private resetWindow(): void {
        if (this._window != null) {
            this._SafeStr_4118.destroyListItems();
            this._SafeStr_3099 = null;
            this._SafeStr_2800 = null;
            this._SafeStr_2632 = null;
        } else {
            this._window = asGuarded(this._controller.windowManager.buildFromXML(XML.from(new HabboFriendBarCom.groupforum_main_view_xml())), isIFrameWindow);
            this._SafeStr_4118 = asGuarded(this._window.findChildByName("scrollable_message_list"), isIScrollableListWindow);
            this._SafeStr_4118.scrollableWindow.addEventListener("WE_RESIZED", this.onResized, 100);
            this._window.center();
            this._window.y = 100;
            this._txtElement = this._window.findChildByName("page_info");
            this._SafeStr_5744 = this._window.findChildByName("show_previous");
            this._SafeStr_5744.addEventListener("WME_CLICK", this.onClickButton);
            this._SafeStr_5569 = this._window.findChildByName("show_next");
            this._SafeStr_5569.addEventListener("WME_CLICK", this.onClickButton);
            this._SafeStr_5914 = this._window.findChildByName("show_last");
            this._SafeStr_5914.addEventListener("WME_CLICK", this.onClickButton);
            this._SafeStr_5635 = this._window.findChildByName("show_first");
            this._SafeStr_5635.addEventListener("WME_CLICK", this.onClickButton);
            this._SafeStr_3798 = castGuarded(this._window.findChildByName("back_button"), isIContainerButtonWindow, "com.sulake.core.window.components.IContainerButtonWindow");
            this._SafeStr_3798.addEventListener("WME_CLICK", this.onClickButton);
            this._SafeStr_2889 = castGuarded(this._window.findChildByName("post_button"), isIContainerButtonWindow, "com.sulake.core.window.components.IContainerButtonWindow");
            this._SafeStr_2889.addEventListener("WME_CLICK", this.onClickButton);
            this._SafeStr_6764 = this._window.findChildByTag("close");
            this._SafeStr_6764.addEventListener("WME_CLICK", this.onClickButton);
            this._SafeStr_5361 = this._window.findChildByName("list_header");
            this._SafeStr_5583 = castGuarded(castGuarded(this._window.findChildByName("shortcuts"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow").getListItemByName("my"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
        }
    }

    private setStatusTextError(param1: string, param2: string): void {
        let _loc3_: ITextWindow = castGuarded(this._window.findChildByName("status"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
        if (param2 == null || param2.length == 0) {
            _loc3_.caption = "";
        } else {
            param1 = this._controller.localizationManager.getLocalization("groupforum.view.error.operation_" + param1);
            _loc3_.text = this._controller.localizationManager.getLocalizationWithParams("groupforum.view.error." + param2, "", "operation", param1);
        }
    }

    private onSettingsButtonClick = (param1: WindowMouseEvent): void => {
        this.openForumSettingsView();
    };

    private onTopAreaClick = (param1: WindowMouseEvent): void => {
        if (this._forumData != null) {
            this._controller.context.createLinkEvent("group/" + this._forumData.groupId);
        }
    };

    private calculateNumOfPagesAvailable(param1: number): number {
        return Math.ceil(param1 / this._pageSize) | 0;
    }

    private getPreviousPageData(): void {
        let _loc1_: number = this._currentPage - 1;
        if (_loc1_ >= 0) {
            this.requestNewPageData(_loc1_);
        }
    }

    private getNextPageData(): void {
        let _loc1_: number = this._currentPage + 1;
        if (_loc1_ <= this._numOfPages) {
            this.requestNewPageData(_loc1_);
        }
    }

    private getFirstPageData(): void {
        if (this._currentPage == 0) {
            return;
        }
        this.requestNewPageData(0);
    }

    private getLastPageData(): void {
        if (this._currentPage >= this._numOfPages) {
            return;
        }
        this.requestNewPageData(this._numOfPages - 1);
    }

    private requestNewPageData(param1: number): void {
        let _loc2_: number = param1 * this._pageSize;
        if (this._SafeStr_3099 != null) {
            this._controller.openForumsList(this._SafeStr_2485.listCode, _loc2_);
        } else if (this._SafeStr_2800 != null) {
            this._controller.requestThreadList(this._forumData.groupId, _loc2_);
        } else if (this._SafeStr_2632 != null) {
            this._controller.requestThreadMessageList(this._forumData.groupId, this._SafeStr_3374.threadId, _loc2_);
        }
        this._currentPage = param1;
    }

    private onResized = (param1: WindowEvent = null): void => {
        if (this._SafeStr_3099 != null) {
            this._SafeStr_3099.updateItemWidths();
        }
        if (this._SafeStr_2800 != null) {
            this._SafeStr_2800.updateItemWidths();
        }
        if (this._SafeStr_2632 != null) {
            this._SafeStr_2632.updateItemSizes();
        }
    };

    private onClickButton = (param1: WindowMouseEvent): void => {
        switch (param1.target.name) {
            case "back_button":
                if (this._SafeStr_2632 != null) {
                    this._controller.requestThreadList(this._forumData.groupId, this._SafeStr_2897.startIndex);
                    break;
                }
                if (this._SafeStr_2800 != null) {
                    this._controller.markForumAsRead(true);
                    if (this._SafeStr_2485 != null) {
                        this._controller.openForumsList(this._SafeStr_2485.listCode, this._SafeStr_2485.startIndex);
                        break;
                    }
                    this.dispose();
                    break;
                }
                if (this._SafeStr_3099 != null) {
                    this._controller.markForumsAsRead();
                    this.dispose();
                }
                break;
            case "show_previous":
                this.getPreviousPageData();
                break;
            case "show_next":
                this.getNextPageData();
                break;
            case "show_last":
                this.getLastPageData();
                break;
            case "show_first":
                this.getFirstPageData();
                break;
            case "header_button_close":
                this._window.visible = false;
                this.dispose();
                break;
            case "post_button":
                this.openComposeMessageView(this._SafeStr_3374 != null ? this._SafeStr_2897.threadsById.get(this._SafeStr_3374.threadId) : null);
        }
    };
}
