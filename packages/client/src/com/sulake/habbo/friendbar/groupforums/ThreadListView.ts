import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { IScrollableListWindow } from '@/com/sulake/core/window/components/IScrollableListWindow';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { ExtendedForumData } from '@/com/sulake/habbo/communication/messages/parser/groupforums/ExtendedForumData';
import type { ThreadData } from '@/com/sulake/habbo/communication/messages/parser/groupforums/ThreadData';
import type { GroupForumController } from '@/com/sulake/habbo/friendbar/groupforums/GroupForumController';
import type { GroupForumView } from '@/com/sulake/habbo/friendbar/groupforums/GroupForumView';
import type { ThreadsListData } from '@/com/sulake/habbo/friendbar/groupforums/ThreadsListData';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { HabboFriendBarCom } from '@/com/sulake/habbo/friendbar/HabboFriendBar.group';

export class ThreadListView {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.groupforums::ThreadListView'); }

    private static getThreadColor(param1: number, param2: number): number {
        switch (param1) {
            case 10:
                return 4289374890;
            case 20:
                return 4294946981;
            case 0:
            case 1:
        }
        return (param2 + 1) % 2 ? 4293852927 : 4289914618;
    }

    constructor(param1: GroupForumView, param2: IScrollableListWindow, param3: ExtendedForumData, param4: ThreadsListData) {
        this._SafeStr_2276 = param1;
        this._controller = this._SafeStr_2276.controller;
        this._SafeStr_2221 = param2;
        this._SafeStr_5708 = asGuarded(this._controller.windowManager.buildFromXML(XML.from(new HabboFriendBarCom.groupforum_thread_list_item_xml())), isIWindowContainer);
        this._forumData = param3;
        this._SafeStr_2897 = param4;
    }

    declare private _controller: GroupForumController;

    declare private _SafeStr_2276: GroupForumView;

    declare private _SafeStr_2221: IScrollableListWindow;

    declare private _SafeStr_5708: IWindowContainer;

    declare private _forumData: ExtendedForumData;

    declare private _SafeStr_2897: ThreadsListData;

    public update(): void {
        let _loc2_: number = 0;
        let _loc1_: IWindowContainer = null;
        let _loc3_: ThreadData = null;
        this._SafeStr_2221.invalidate();
        _loc2_ = 0;
        while (_loc2_ < this._SafeStr_2897.size) {
            _loc3_ = this._SafeStr_2897.threads[_loc2_];
            _loc1_ = asGuarded(this._SafeStr_5708.clone(), isIWindowContainer);
            _loc1_.name = "thread_" + _loc3_.threadId;
            this.updateListItem(_loc1_, _loc3_, _loc2_);
            this._SafeStr_2221.addListItem(_loc1_);
            _loc2_++;
        }
        this.updateItemWidths();
    }

    public updateItemWidths(): void {
        let _loc1_: number = 0;
        _loc1_ = 0;
        while (_loc1_ < this._SafeStr_2221.numListItems) {
            this._SafeStr_2221.getListItemAt(_loc1_ >>> 0).width = this._SafeStr_2221.scrollableWindow.width - 2;
            _loc1_++;
        }
    }

    public updateElement(param1: ThreadData): void {
        let _loc3_: number = param1.threadId;
        let _loc2_: IWindowContainer = asGuarded(this._SafeStr_2221.getListItemByName("thread_" + _loc3_), isIWindowContainer);
        let _loc4_: number = this._SafeStr_2221.getListItemIndex(_loc2_);
        if (_loc2_ != null) {
            this.updateListItem(_loc2_, param1, _loc4_);
        }
    }

    private updateListItem(param1: IWindowContainer, param2: ThreadData, param3: number): void {
        let _loc13_: IWindow = null;
        let _loc10_: string = null;
        let _loc7_: IWindowContainer = isIWindowContainer(param1) ? param1 : null;
        let _loc11_: number = param2.state;
        let _loc8_: boolean = this._forumData.canModerate;
        let _loc4_: boolean = this._forumData.isStaff;
        let _loc6_: boolean = param2.isSticky;
        let _loc9_: boolean = param2.isLocked;
        let _loc5_: number = param2.nMessages - this._controller.getThreadLastReadMessageIndex(param2.threadId) - 1;
        _loc13_ = _loc7_.findChildByName("texts_container");
        if (_loc13_ != null) {
            _loc13_.id = param2.threadId;
            _loc13_.color = ThreadListView.getThreadColor(_loc11_, param3);
        }
        let _loc12_: ITextWindow = asGuarded(_loc7_.findChildByName("header"), isITextWindow);
        if (_loc12_ != null) {
            _loc12_.bold = _loc5_ > 0;
            _loc10_ = param2.header;
            if (param2.header == "") {
                _loc10_ = "(No Subject)";
            }
            if (_loc11_ > 1 && !_loc8_ && !_loc4_) {
                _loc10_ = this.getModerationMessage(param2);
            }
            _loc12_.text = _loc10_;
        }
        _loc13_ = _loc7_.findChildByName("header_region");
        if (_loc13_ != null) {
            _loc13_.id = param2.threadId;
            _loc13_.removeEventListener("WME_CLICK", this.onGoToFirstUnread);
            _loc13_.addEventListener("WME_CLICK", this.onGoToFirstUnread);
        }
        _loc13_ = _loc7_.findChildByName("details");
        if (_loc13_ != null) {
            _loc13_.caption = this._controller.localizationManager.getLocalizationWithParams("groupforum.view.thread_details", "", "thread_author_id", param2.threadAuthorId, "thread_author_name", param2.threadAuthorName, "last_author_id", param2.lastMessageAuthorId, "last_author_name", param2.lastMessageAuthorName, "creation_time", this._SafeStr_2276.getAsDaysHoursMinutes(param2.creationTimeAsSecondsAgo), "update_time", this._SafeStr_2276.getAsDaysHoursMinutes(param2.lastMessageTimeAsSecondsAgo));
        }
        _loc13_ = _loc7_.findChildByName("unread_texts_container");
        if (_loc13_ != null) {
            _loc13_.id = param2.threadId;
            _loc13_.color = ThreadListView.getThreadColor(_loc11_, param3);
        }
        _loc13_ = _loc7_.findChildByName("unread_region");
        if (_loc13_ != null) {
            _loc13_.id = param2.threadId;
            _loc13_.removeEventListener("WME_CLICK", this.onGoToFirstUnread);
            _loc13_.addEventListener("WME_CLICK", this.onGoToFirstUnread);
        }
        _loc12_ = asGuarded(_loc7_.findChildByName("messages1"), isITextWindow);
        if (_loc12_ != null) {
            _loc12_.bold = _loc5_ > 0;
            _loc12_.text = this._controller.localizationManager.getLocalizationWithParams("groupforum.view.thread_details1", "", "total_messages", param2.nMessages, "new_messages", _loc5_);
        }
        _loc12_ = asGuarded(_loc7_.findChildByName("messages2"), isITextWindow);
        if (_loc12_ != null) {
            _loc12_.bold = _loc5_ > 0;
            _loc12_.text = this._controller.localizationManager.getLocalizationWithParams("groupforum.view.thread_details2", "", "total_messages", param2.nMessages, "new_messages", _loc5_);
        }
        _loc13_ = _loc7_.findChildByName("button_container");
        if (_loc13_ != null) {
            _loc13_.id = param2.threadId;
            _loc13_.color = ThreadListView.getThreadColor(_loc11_, param3);
            this.handleButtonVisibility(isIWindowContainer(_loc13_) ? _loc13_ : null, param2, _loc11_);
            _loc13_.color = ThreadListView.getThreadColor(_loc11_, param3);
        }
        _loc13_ = _loc7_.findChildByName("left_button_container");
        if (_loc13_ != null) {
            _loc13_.id = param2.threadId;
            _loc13_.color = ThreadListView.getThreadColor(_loc11_, param3);
            this.handleLeftButtonsVisibility(isIWindowContainer(_loc13_) ? _loc13_ : null, param2, _loc9_, _loc6_);
            _loc13_.color = ThreadListView.getThreadColor(_loc11_, param3);
        }
    }

    private handleButtonVisibility(param1: IWindowContainer, param2: ThreadData, param3: number): void {
        let _loc9_: IRegionWindow = null;
        let _loc7_: IStaticBitmapWrapperWindow = null;
        let _loc6_: boolean = this._forumData.canModerate;
        let _loc5_: boolean = this._forumData.isStaff;
        let _loc4_: boolean = this._forumData.canReport;
        let _loc8_: IItemListWindow = asGuarded(param1.findChildByName("mod_buttons"), isIItemListWindow);
        _loc9_ = asGuarded(_loc8_.getListItemAt(0), isIRegionWindow);
        if (_loc9_ != null) {
            _loc9_.removeEventListener("WME_CLICK", this.onDelete);
            _loc9_.removeEventListener("WME_CLICK", this.onUndelete);
            if (_loc6_ || _loc5_) {
                _loc9_.id = param2.threadId;
                _loc7_ = asGuarded(_loc9_.getChildByName("icon"), isIStaticBitmapWrapperWindow);
                switch (param3) {
                    case 0:
                    case 1:
                        _loc9_.addEventListener("WME_CLICK", this.onDelete);
                        _loc7_.assetUri = "forum_forum_hide";
                        break;
                    case 10:
                        _loc9_.addEventListener("WME_CLICK", this.onUndelete);
                        _loc7_.assetUri = "forum_forum_unhide";
                        break;
                    case 20:
                        if (_loc5_) {
                            _loc9_.addEventListener("WME_CLICK", this.onUndelete);
                            _loc7_.assetUri = "forum_forum_unhide";
                            break;
                        }
                        _loc9_.visible = false;
                }
            } else {
                _loc9_.visible = false;
            }
        }
        _loc9_ = asGuarded(_loc8_.getListItemAt(1), isIRegionWindow);
        if (_loc9_ != null) {
            _loc9_.removeEventListener("WME_CLICK", this.onReport);
            if (_loc6_ || _loc5_ || _loc4_) {
                _loc9_.id = param2.threadId;
                _loc9_.addEventListener("WME_CLICK", this.onReport);
            } else {
                _loc9_.visible = false;
            }
        }
    }

    private handleLeftButtonsVisibility(param1: IWindowContainer, param2: ThreadData, param3: boolean, param4: boolean): void {
        let _loc8_: IStaticBitmapWrapperWindow = null;
        let _loc6_: IStaticBitmapWrapperWindow = null;
        let _loc10_: boolean = this._forumData.canModerate;
        let _loc9_: boolean = this._forumData.isStaff;
        let _loc11_: IItemListWindow = asGuarded(param1.findChildByName("info_buttons"), isIItemListWindow);
        let _loc7_: IRegionWindow = asGuarded(_loc11_.getListItemByName("thread_lock"), isIRegionWindow);
        if (_loc7_ != null) {
            _loc7_.removeEventListener("WME_CLICK", this.onToggleLock);
            _loc8_ = asGuarded(_loc7_.getChildByName("icon"), isIStaticBitmapWrapperWindow);
            if (_loc10_ || _loc9_) {
                _loc7_.id = param2.threadId;
                _loc7_.addEventListener("WME_CLICK", this.onToggleLock);
                if (param3) {
                    _loc8_.assetUri = "forum_forum_locked";
                } else {
                    _loc8_.assetUri = "forum_forum_unlocked";
                }
                _loc7_.visible = true;
            } else {
                if (param3) {
                    _loc8_.assetUri = "forum_forum_locked";
                }
                _loc7_.visible = param3;
                _loc7_.disable();
            }
        }
        let _loc5_: IRegionWindow = asGuarded(_loc11_.getListItemByName("thread_pin"), isIRegionWindow);
        if (_loc5_ != null) {
            _loc5_.removeEventListener("WME_CLICK", this.onToggleSticky);
            _loc6_ = asGuarded(_loc5_.getChildByName("icon"), isIStaticBitmapWrapperWindow);
            if (_loc10_ || _loc9_) {
                _loc5_.id = param2.threadId;
                _loc5_.addEventListener("WME_CLICK", this.onToggleSticky);
                if (param4) {
                    _loc6_.assetUri = "forum_forum_pinned";
                } else {
                    _loc6_.assetUri = "forum_forum_unpinned";
                }
                _loc5_.visible = true;
            } else {
                if (param4) {
                    _loc6_.assetUri = "forum_forum_pinned";
                }
                _loc5_.visible = param4;
                _loc5_.disable();
            }
        }
    }

    private getModerationMessage(param1: ThreadData): string {
        let _loc2_: string = null;
        switch (param1.state) {
            case 0:
            case 1:
                break;
            case 10:
                _loc2_ = this._controller.localizationManager.getLocalizationWithParams("groupforum.view.thread_hidden_by_admin", "", "admin_name", param1.adminName);
                break;
            case 20:
                _loc2_ = this._controller.localizationManager.getLocalizationWithParams("groupforum.view.thread_hidden_by_staff", "", "admin_name", param1.adminName);
        }
        return _loc2_;
    }

    private onToggleLock = (param1: WindowMouseEvent): void => {
        let _loc2_: number = param1.target.id;
        let _loc3_: ThreadData = this._SafeStr_2897.threadsById.get(_loc2_);
        if (_loc3_ == null) {
            return;
        }
        this._controller.lockThread(this._forumData, _loc2_, !_loc3_.isLocked, _loc3_.isSticky);
    };

    private onToggleSticky = (param1: WindowMouseEvent): void => {
        let _loc2_: number = param1.target.id;
        let _loc3_: ThreadData = this._SafeStr_2897.threadsById.get(_loc2_);
        if (_loc3_ == null) {
            return;
        }
        this._controller.stickThread(this._forumData, _loc2_, _loc3_.isLocked, !_loc3_.isSticky);
    };

    private onReport = (param1: WindowMouseEvent): void => {
        this._controller.reportThread(this._forumData, param1.target.id);
    };

    private onDelete = (param1: WindowMouseEvent): void => {
        this._controller.deleteThread(this._forumData, param1.target.id);
    };

    private onUndelete = (param1: WindowMouseEvent): void => {
        this._controller.unDeleteThread(this._forumData, param1.target.id);
    };

    private onGoToFirstUnread = (param1: WindowMouseEvent): void => {
        let _loc3_: number = 0;
        let _loc2_: number = param1.target.id;
        let _loc4_: ThreadData = this._SafeStr_2897.threadsById.get(_loc2_);
        if (_loc4_) {
            _loc3_ = Math.min(this._controller.getThreadLastReadMessageIndex(_loc2_) + 1, _loc4_.nMessages - 1) | 0;
            this._controller.goToMessageIndex(this._forumData.groupId, _loc2_, _loc3_);
        }
    };
}
