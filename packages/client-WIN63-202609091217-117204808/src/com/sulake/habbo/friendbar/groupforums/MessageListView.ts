import { asGuarded, castGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { IScrollableListWindow } from '@/com/sulake/core/window/components/IScrollableListWindow';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { ExtendedForumData } from '@/com/sulake/habbo/communication/messages/parser/groupforums/ExtendedForumData';
import type { MessageData } from '@/com/sulake/habbo/communication/messages/parser/groupforums/MessageData';
import type { ThreadData } from '@/com/sulake/habbo/communication/messages/parser/groupforums/ThreadData';
import type { GroupForumController } from '@/com/sulake/habbo/friendbar/groupforums/GroupForumController';
import type { GroupForumView } from '@/com/sulake/habbo/friendbar/groupforums/GroupForumView';
import type { MessagesListData } from '@/com/sulake/habbo/friendbar/groupforums/MessagesListData';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { StringBuffer } from '@/com/sulake/habbo/friendbar/groupforums/StringBuffer';
import { HabboFriendBarCom } from '@/com/sulake/habbo/friendbar/HabboFriendBar.group';
import { isIAvatarImageWidget } from '@/com/sulake/habbo/window/widgets/IAvatarImageWidget';

export class MessageListView {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.groupforums::MessageListView'); }

    private static readonly UNREAD_MESSAGE_STATUS: number = -1;
    private static readonly _SafeStr_7672: number = 20;
    private static readonly QUOTE_BG_COLOR: number = 4291611852;
    public static readonly LINE_PATTERN: RegExp = /\\?(?:(?:\*([^*]+)\*)|(?:_([^_]+)_)|(?:@\S+))/;
    public static readonly _SafeStr_5807: RegExp = /^>(?: ?|$)/;

    declare private _controller: GroupForumController;

    declare private _SafeStr_2276: GroupForumView;

    declare private _SafeStr_2221: IScrollableListWindow;

    declare private _SafeStr_5708: IWindowContainer;

    declare private _forumData: ExtendedForumData;

    declare private _SafeStr_3272: ThreadData;

    declare private _SafeStr_3374: MessagesListData;

    private _SafeStr_3318: boolean = true;

    constructor(param1: GroupForumView, param2: IScrollableListWindow, param3: ExtendedForumData, param4: ThreadData, param5: MessagesListData) {
        this._SafeStr_2276 = param1;
        this._controller = this._SafeStr_2276.controller;
        this._SafeStr_2221 = param2;
        this._SafeStr_5708 = asGuarded(this._controller.windowManager.buildFromXML(XML.from(new HabboFriendBarCom.groupforum_message_list_item_xml())), isIWindowContainer);
        this._forumData = param3;
        this._SafeStr_3272 = param4;
        this._SafeStr_3374 = param5;
    }

    private static getMessageColor(param1: number): any[] {
        switch (param1) {
            case 10:
                return [4293519840, 4292335567];
            case 20:
                return [4294952634, 4294959058];
            case -1:
                return [4294964441, 4291227641];
            case 0:
            case 1:
        }
        return [4294967295, 4291227641];
    }

    private static initMessageText(param1: ITextWindow, param2: string): void {
        let _loc8_: number = 0;
        let _loc5_: any = undefined;
        let _loc3_: IWindowContainer = castGuarded(param1.parent, isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        _loc3_.removeChild(param1);
        let _loc9_: any[] = param2.split("\r");
        let _loc4_: StringBuffer = new StringBuffer();
        let _loc7_: number = 0;
        for (let _loc6_ of _loc9_ ?? []) {
            _loc8_ = 0;
            _loc5_ = MessageListView._SafeStr_5807.exec(stringOrNull(_loc6_));
            if (_loc5_ != null) {
                _loc8_ = 1;
                _loc6_ = _loc6_.substr(_loc5_[0].length);
            }
            if (_loc8_ != _loc7_) {
                MessageListView.addTextBlock(_loc3_, param1, _loc4_, _loc7_);
                _loc7_ = _loc8_;
            } else if (_loc4_.length > 0) {
                _loc4_.add("\r");
            }
            MessageListView.parseMessageChunk(_loc4_, stringOrNull(_loc6_));
        }
        MessageListView.addTextBlock(_loc3_, param1, _loc4_, _loc7_);
    }

    private static parseMessageChunk(param1: StringBuffer, param2: string): void {
        let _loc3_: any = undefined;
        let _loc5_: number = NaN;
        let _loc4_: string = null;
        while (true) {
            _loc3_ = MessageListView.LINE_PATTERN.exec(param2);
            if (!_loc3_) {
                break;
            }
            if (_loc3_.index > 0) {
                param1.addEscaped(param2.substr(0, Number(_loc3_.index)));
            }
            _loc5_ = Number(_loc3_[0].length);
            switch (param2.charAt(Number(_loc3_.index))) {
                case "*":
                    param1.add(" <b>");
                    MessageListView.parseMessageChunk(param1, param2.substr(Number(_loc3_.index + 1), _loc5_ - 2));
                    param1.add("</b> ");
                    break;
                case "_":
                    param1.add(" <i>");
                    MessageListView.parseMessageChunk(param1, param2.substr(Number(_loc3_.index + 1), _loc5_ - 2));
                    param1.add("</i> ");
                    break;
                case "@":
                    if (_loc3_.index == 0 || _loc3_.index > 0 && param2.substr(_loc3_.index - 1, 1) == " ") {
                        _loc4_ = param2.substr(Number(_loc3_.index + 1), _loc5_ - 1);
                        param1.add("<u>").addEscaped(_loc4_).add("</u>");
                        break;
                    }
                    param1.add("@");
                default:
                    param1.add(param2.charAt(Number(_loc3_.index + 1)));
                    param2 = param2.substr(Number(_loc3_.index + 2));
                    continue;
            }
            param2 = param2.substr(Number(_loc3_.index + _loc5_));
        }
        param1.addEscaped(param2);
    }

    private static addTextBlock(param1: IWindowContainer, param2: ITextWindow, param3: StringBuffer, param4: number): void {
        let _loc6_: string = param3.toString();
        let _loc5_: ITextWindow = castGuarded(param2.clone(), isITextWindow, "com.sulake.core.window.components.ITextWindow");
        param1.addChild(_loc5_);
        _loc5_.htmlText = _loc6_;
        if (param4 > 0) {
            _loc5_.x += param4 * 20;
            _loc5_.width -= (param4 + 1) * 20;
            _loc5_.color = 4291611852;
            _loc5_.background = true;
        }
        param3.reset();
    }

    public update(): void {
        let _loc3_: boolean = false;
        if (this._SafeStr_2221.numListItems > 0) {
            this._SafeStr_2221.destroyListItems();
        }
        this._SafeStr_2221.invalidate();
        let _loc2_: number = this._controller.getThreadLastReadMessageIndex(this._SafeStr_3374.threadId);
        this._SafeStr_3318 = true;
        this._SafeStr_2221.autoArrangeItems = false;
        for (const _loc1_ of this._SafeStr_3374.messages ?? []) {
            _loc3_ = _loc1_.messageIndex > _loc2_;
            this._SafeStr_2221.addListItem(this.createListItem(_loc1_, _loc3_));
        }
        this._SafeStr_3318 = false;
        this.updateItemSizes();
    }

    public updateItemSizes(): void {
        if (this._SafeStr_3318) {
            return;
        }
        let _loc1_: number = Number(this._SafeStr_2221.scrollableWindow.width);
        this.updateItemSizesInternal();
        if (this._SafeStr_2221.scrollableWindow.width != _loc1_) {
            this.updateItemSizesInternal();
        }
    }

    private updateItemSizesInternal(): void {
        let _loc5_: number = 0;
        let _loc1_: IWindowContainer = null;
        let _loc3_: IWindowContainer = null;
        let _loc4_: IWindowContainer = null;
        let _loc7_: number = 0;
        let _loc6_: number = 0;
        let _loc2_: ITextWindow = null;
        this._SafeStr_2221.autoArrangeItems = false;
        _loc5_ = 0;
        while (_loc5_ < this._SafeStr_2221.numListItems) {
            _loc1_ = castGuarded(this._SafeStr_2221.getListItemAt(_loc5_ >>> 0), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
            _loc3_ = asGuarded(_loc1_.findChildByName("texts_container"), isIWindowContainer);
            _loc4_ = castGuarded(_loc1_.findChildByName("message_text_container"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
            _loc1_.width = this._SafeStr_2221.scrollableWindow.width - 2;
            _loc7_ = 2;
            _loc6_ = 0;
            while (_loc6_ < _loc4_.numChildren) {
                _loc2_ = castGuarded(_loc4_.getChildAt(_loc6_), isITextWindow, "com.sulake.core.window.components.ITextWindow");
                _loc2_.y = _loc7_;
                _loc7_ = _loc2_.bottom;
                _loc6_++;
            }
            _loc4_.height = _loc7_;
            _loc1_.height = _loc3_.height + _loc4_.bottom;
            _loc5_++;
        }
        this._SafeStr_2221.autoArrangeItems = true;
    }

    private createListItem(param1: MessageData, param2: boolean = false): IWindowContainer {
        let _loc4_: IWindowContainer = asGuarded(this._SafeStr_5708.clone(), isIWindowContainer);
        _loc4_.name = "message_" + param1.messageId;
        let _loc11_: number = param1.state;
        let _loc8_: boolean = this._forumData.canModerate;
        let _loc6_: boolean = this._forumData.isStaff;
        let _loc9_: IWindowContainer = asGuarded(_loc4_.findChildByName("texts_container"), isIWindowContainer);
        _loc9_.id = param1.messageId;
        _loc9_.findChildByName("date").caption = this._SafeStr_2276.getAsDaysHoursMinutes(param1.creationTimeAsSecondsAgo);
        _loc9_.findChildByName("reply_num").caption = "#" + (param1.messageIndex + 1);
        let _loc5_: ITextWindow = asGuarded(_loc4_.findChildByName("message_text"), isITextWindow);
        if (param2) {
            _loc11_ = -1;
        }
        if (_loc11_ == 20 && !_loc6_) {
            _loc5_.text = this.getModerationMessage(param1);
        } else if (_loc11_ > 1 && !_loc8_) {
            _loc5_.text = this.getModerationMessage(param1);
        } else {
            MessageListView.initMessageText(_loc5_, param1.messageText);
        }
        let _loc3_: IWindowContainer = asGuarded(_loc4_.findChildByName("msg_container"), isIWindowContainer);
        let _loc12_: any[] = MessageListView.getMessageColor(_loc11_);
        _loc3_.color = _loc12_[0] >>> 0;
        let _loc10_: IWindowContainer = asGuarded(_loc4_.findChildByName("avatar_image"), isIWindowContainer);
        let _loc7_: any[] = MessageListView.getMessageColor(_loc11_);
        _loc10_.color = _loc7_[1] >>> 0;
        _loc10_.id = param1.authorId;
        _loc10_.removeEventListener("WME_CLICK", this.onSelectAuthor);
        _loc10_.addEventListener("WME_CLICK", this.onSelectAuthor);
        castGuarded(castGuarded(_loc10_.findChildByName("avatar_widget"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow").widget, isIAvatarImageWidget, "com.sulake.habbo.window.widgets.IAvatarImageWidget").figure = param1.authorFigure;
        _loc10_.findChildByName("author").caption = param1.authorName;
        _loc10_.findChildByName("author_post_count").caption = param1.authorPostCount + " " + this._controller.localizationManager.getLocalization("messageboard.messages", "posts");
        this.handleButtonVisibility(_loc4_, param1, _loc11_);
        return _loc4_;
    }

    public updateElement(param1: MessageData): void {
        let _loc3_: number = param1.messageId;
        let _loc2_: IWindowContainer = asGuarded(this._SafeStr_2221.getListItemByName("message_" + _loc3_), isIWindowContainer);
        if (_loc2_ == null) {
            return;
        }
        let _loc4_: number = this._SafeStr_2221.getListItemIndex(_loc2_);
        this._SafeStr_3318 = true;
        this._SafeStr_2221.autoArrangeItems = false;
        this._SafeStr_2221.removeListItemAt(_loc4_);
        this._SafeStr_2221.addListItemAt(this.createListItem(param1), _loc4_ >>> 0);
        this._SafeStr_3318 = false;
        this.updateItemSizes();
    }

    private handleButtonVisibility(param1: IWindowContainer, param2: MessageData, param3: number): void {
        let _loc9_: IRegionWindow = null;
        let _loc8_: IStaticBitmapWrapperWindow = null;
        let _loc7_: boolean = this._forumData.canModerate;
        let _loc6_: boolean = this._forumData.isStaff;
        let _loc4_: boolean = this._forumData.canReport;
        let _loc5_: boolean = this._forumData.canPostMessage;
        _loc9_ = asGuarded(param1.findChildByName("delete_message"), isIRegionWindow);
        _loc9_.removeEventListener("WME_CLICK", this.onDelete);
        _loc9_.removeEventListener("WME_CLICK", this.onUndelete);
        if (_loc7_) {
            _loc9_.id = param2.messageId;
            _loc8_ = asGuarded(_loc9_.getChildByName("icon"), isIStaticBitmapWrapperWindow);
            switch (param3) {
                case 10:
                    _loc9_.addEventListener("WME_CLICK", this.onUndelete);
                    _loc8_.assetUri = "forum_forum_unhide";
                    break;
                case 20:
                    if (_loc6_) {
                        _loc9_.addEventListener("WME_CLICK", this.onUndelete);
                        _loc8_.assetUri = "forum_forum_unhide";
                    } else {
                        _loc9_.visible = false;
                    }
                    break;
                case 0:
                case 1:
                default:
                    _loc9_.addEventListener("WME_CLICK", this.onDelete);
                    _loc8_.assetUri = "forum_forum_hide";
            }
        } else {
            _loc9_.visible = false;
        }
        _loc9_ = asGuarded(param1.findChildByName("report_message"), isIRegionWindow);
        if (_loc4_) {
            _loc9_.id = param2.messageId;
            _loc9_.removeEventListener("WME_CLICK", this.onReport);
            _loc9_.addEventListener("WME_CLICK", this.onReport);
        } else {
            _loc9_.visible = false;
        }
        _loc9_ = asGuarded(param1.findChildByName("reply_message"), isIRegionWindow);
        if (_loc5_) {
            _loc9_.id = param2.messageId;
            _loc9_.removeEventListener("WME_CLICK", this.onReply);
            _loc9_.addEventListener("WME_CLICK", this.onReply);
        } else {
            _loc9_.visible = false;
        }
    }

    private getModerationMessage(param1: MessageData): string {
        switch (param1.state - 10) {
            case 0:
                return this._controller.localizationManager.getLocalizationWithParams("groupforum.view.message_hidden_by_admin", "", "admin_name", param1.adminName);
            case 10:
                return this._controller.localizationManager.getLocalizationWithParams("groupforum.view.message_hidden_by_staff", "", "admin_name", param1.adminName);
            default:
                return null;
        }
    }

    public scrollToSpecificElement(param1: number, param2: boolean = false): void {
        let _loc3_: IWindowContainer = null;
        if (!param2) {
            _loc3_ = asGuarded(this._SafeStr_2221.getListItemByName("message_" + param1), isIWindowContainer);
        } else {
            _loc3_ = asGuarded(this._SafeStr_2221.getListItemAt(param1 - 1 >>> 0), isIWindowContainer);
        }
        if (_loc3_ != null) {
            this._SafeStr_2221.scrollV = _loc3_.bottom / this._SafeStr_2221.maxScrollV;
        }
    }

    private onReport = (param1: WindowMouseEvent): void => {
        this._controller.reportMessage(this._forumData, this._SafeStr_3272.threadId, param1.target.id);
    };

    private onUndelete = (param1: WindowMouseEvent): void => {
        this._controller.unDeleteMessage(this._forumData, this._SafeStr_3272.threadId, param1.target.id);
    };

    private onDelete = (param1: WindowMouseEvent): void => {
        this._controller.deleteMessage(this._forumData, this._SafeStr_3272.threadId, param1.target.id);
    };

    private onSelectAuthor = (param1: WindowMouseEvent): void => {
        this._controller.getUserInfo(param1.target.id);
    };

    private onReply = (param1: WindowMouseEvent): void => {
        let _loc2_: number = param1.target.id;
        let _loc3_: MessageData = this._SafeStr_3374.messagesById.get(_loc2_);
        if (_loc3_ == null) {
            return;
        }
        this._SafeStr_2276.openComposeMessageView(this._SafeStr_3272, _loc3_);
    };
}
