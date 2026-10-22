import { asGuarded, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IScrollableListWindow } from '@/com/sulake/core/window/components/IScrollableListWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { ForumData } from '@/com/sulake/habbo/communication/messages/parser/groupforums/ForumData';
import type { GroupForumController } from '@/com/sulake/habbo/friendbar/groupforums/GroupForumController';
import type { GroupForumView } from '@/com/sulake/habbo/friendbar/groupforums/GroupForumView';
import type { IBadgeImageWidget } from '@/com/sulake/habbo/window/widgets/IBadgeImageWidget';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { HabboFriendBarCom } from '@/com/sulake/habbo/friendbar/HabboFriendBar.group';
import { isIBadgeImageWidget } from '@/com/sulake/habbo/window/widgets/IBadgeImageWidget';

export class ForumsListView {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.groupforums::ForumsListView'); }

    constructor(param1: GroupForumView, param2: IScrollableListWindow, param3: any[]) {
        this._SafeStr_2276 = param1;
        this._controller = this._SafeStr_2276.controller;
        this._SafeStr_2221 = param2;
        this._SafeStr_5708 = asGuarded(this._controller.windowManager.buildFromXML(XML.from(new HabboFriendBarCom.groupforum_forum_list_item_xml())), isIWindowContainer);
        this._forums = param3;
    }

    declare private _controller: GroupForumController;

    declare private _SafeStr_2276: GroupForumView;

    declare private _SafeStr_2221: IScrollableListWindow;

    declare private _SafeStr_5708: IWindowContainer;

    declare private _forums: any[];

    public update(): void {
        let _loc3_: number = 0;
        let _loc2_: IWindowContainer = null;
        let _loc1_: ForumData = null;
        this._SafeStr_2221.invalidate();
        _loc3_ = 0;
        while (_loc3_ < this._forums.length) {
            _loc1_ = this._forums[_loc3_];
            _loc2_ = asGuarded(this._SafeStr_5708.clone(), isIWindowContainer);
            _loc2_.name = "forum_" + _loc1_.groupId;
            this.updateListItem(_loc2_, _loc1_, _loc3_);
            this._SafeStr_2221.addListItem(_loc2_);
            _loc3_++;
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

    private updateListItem(param1: IWindowContainer, param2: ForumData, param3: number): void {
        let _loc5_: IWindowContainer = isIWindowContainer(param1) ? param1 : null;
        _loc5_.color = (param3 + 1) % 2 ? 4293852927 : 4289914618;
        let _loc6_: number = param2.unreadMessages;
        let _loc9_: IWindow = _loc5_.findChildByName("texts_container");
        _loc9_.id = param2.groupId;
        let _loc8_: ITextWindow = asGuarded(_loc5_.findChildByName("header"), isITextWindow);
        _loc8_.bold = _loc6_ > 0;
        _loc8_.text = param2.name;
        _loc9_ = _loc5_.findChildByName("header_region");
        _loc9_.id = param2.groupId;
        _loc9_.removeEventListener("WME_CLICK", this.onOpenForum);
        _loc9_.addEventListener("WME_CLICK", this.onOpenForum);
        _loc9_ = _loc5_.findChildByName("details");
        _loc9_.caption = this._controller.localizationManager.getLocalizationWithParams("groupforum.view.forum_details", "", "rating", param2.leaderboardScore, "last_author_id", param2.lastMessageAuthorId, "last_author_name", param2.lastMessageAuthorName, "update_time", this._SafeStr_2276.getAsDaysHoursMinutes(param2.lastMessageTimeAsSecondsAgo));
        _loc9_ = _loc5_.findChildByName("unread_texts_container");
        _loc9_.id = param2.groupId;
        _loc9_ = _loc5_.findChildByName("unread_region");
        _loc9_.id = param2.groupId;
        _loc9_.removeEventListener("WME_CLICK", this.onOpenForum);
        _loc9_.addEventListener("WME_CLICK", this.onOpenForum);
        _loc8_ = asGuarded(_loc5_.findChildByName("messages1"), isITextWindow);
        _loc8_.bold = _loc6_ > 0;
        _loc8_.text = this._controller.localizationManager.getLocalizationWithParams("groupforum.view.thread_details1", "", "total_messages", param2.totalMessages, "new_messages", _loc6_);
        _loc8_ = asGuarded(_loc5_.findChildByName("messages2"), isITextWindow);
        _loc8_.bold = _loc6_ > 0;
        _loc8_.text = this._controller.localizationManager.getLocalizationWithParams("groupforum.view.thread_details2", "", "total_messages", param2.totalMessages, "new_messages", _loc6_);
        let _loc7_: IWidgetWindow = castGuarded(_loc5_.findChildByName("group_icon"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow");
        let _loc4_: IBadgeImageWidget = asGuarded(_loc7_.widget, isIBadgeImageWidget);
        _loc4_.badgeId = param2.icon;
        _loc4_.groupId = param2.groupId;
        _loc4_.type = "group";
    }

    private onOpenForum = (param1: WindowMouseEvent): void => {
        this._controller.openGroupForum(param1.target.id);
    };
}
