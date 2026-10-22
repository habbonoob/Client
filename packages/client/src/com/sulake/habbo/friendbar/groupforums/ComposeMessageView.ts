import { asGuarded, castGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { ITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import type { WindowKeyboardEvent } from '@/com/sulake/core/window/events/WindowKeyboardEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { ForumData } from '@/com/sulake/habbo/communication/messages/parser/groupforums/ForumData';
import type { MessageData } from '@/com/sulake/habbo/communication/messages/parser/groupforums/MessageData';
import type { ThreadData } from '@/com/sulake/habbo/communication/messages/parser/groupforums/ThreadData';
import type { GroupForumController } from '@/com/sulake/habbo/friendbar/groupforums/GroupForumController';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import { StringBuffer } from '@/com/sulake/habbo/friendbar/groupforums/StringBuffer';
import { GroupForumView, HabboFriendBarCom, MessageListView } from '@/com/sulake/habbo/friendbar/HabboFriendBar.group';
import { FriendlyTime } from '@/com/sulake/habbo/utils/FriendlyTime';

export class ComposeMessageView {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.groupforums::ComposeMessageView'); }

    public static readonly SUBJECT_MIN_LENGTH: number = 10;
    public static readonly SUBJECT_MAX_LENGTH: number = 120;
    public static readonly MESSAGE_MIN_LENGTH: number = 10;
    public static readonly MESSAGE_MAX_LENGTH: number = 4000;
    public static readonly _SafeStr_8206: number = 30000;

    constructor(param1: GroupForumView, param2: number, param3: number, param4: ForumData, param5: ThreadData, param6: MessageData) {
        this._SafeStr_2276 = param1;
        this._controller = this._SafeStr_2276.controller;
        this._forumData = param4;
        this._SafeStr_3272 = param5;
        this._window = castGuarded(this._controller.windowManager.buildFromXML(XML.from(new HabboFriendBarCom.groupforum_compose_message_xml())), isIFrameWindow, "com.sulake.core.window.components.IFrameWindow");
        this._window.x = param2;
        let _loc7_: number = this._controller.windowManager.getDesktop(1).width;
        if (this._window.x + this._window.width > _loc7_) {
            this._window.x = _loc7_ - this._window.width;
        }
        this._window.y = param3;
        this.initControls(param6);
        if (this._status.caption.length == 0) {
            this._status.caption = this._controller.localizationManager.getLocalization("groupforum.compose.reply_hint");
        }
        this._SafeStr_2458 = new Timer(1000, 0);
        this._SafeStr_2458.addEventListener("timer", this.onTimerEvent);
        this._SafeStr_2458.start();
    }

    declare private _controller: GroupForumController;

    declare private _SafeStr_2276: GroupForumView;

    declare private _SafeStr_2458: Timer;

    declare private _window: IFrameWindow;

    declare private _SafeStr_3094: ITextFieldWindow;

    declare private _messageText: ITextFieldWindow;

    declare private _SafeStr_2889: IWindow;

    declare private _status: IWindow;

    declare private _forumData: ForumData;

    declare private _SafeStr_3272: ThreadData;

    private _hasErrors: boolean = false;
    private _SafeStr_4715: boolean = false;

    public focus(param1: ForumData, param2: ThreadData, param3: MessageData): void {
        if (!this._SafeStr_4715) {
            this._forumData = param1;
            if (this._SafeStr_3272 != null && param2 == null) {
                this._SafeStr_3094.text = "";
            }
            this._SafeStr_3272 = param2;
            this.initControls(param3);
        }
        this._window.activate();
    }

    public dispose(): void {
        this._SafeStr_2458.stop();
        this._SafeStr_2458.removeEventListener("timer", this.onTimerEvent);
        this._SafeStr_2458 = null;
        this._controller.composeMessageView = null;
        this._window.dispose();
        this._window = null;
    }

    private initControls(param1: MessageData): void {
        let _loc3_: IRegionWindow = GroupForumView.initTopAreaForForum(this._window, this._forumData);
        _loc3_.removeEventListener("WME_CLICK", this.onTopAreaClick);
        _loc3_.addEventListener("WME_CLICK", this.onTopAreaClick);
        let _loc5_: IWindow = this._window.findChildByName("thread_subject_header");
        this._SafeStr_3094 = asGuarded(this._window.findChildByName("thread_subject"), isITextFieldWindow);
        if (this._SafeStr_3272) {
            _loc5_.caption = this._controller.localizationManager.getLocalization("groupforum.compose.subject_replying_to");
            this._SafeStr_3094.text = this._SafeStr_3272.header;
            this._SafeStr_3094.disable();
        } else {
            _loc5_.caption = this._controller.localizationManager.getLocalization("groupforum.compose.subject");
            this._SafeStr_3094.addEventListener("WKE_KEY_UP", this.onHeaderKeyUpEvent);
            this._SafeStr_3094.maxChars = 120;
            this._SafeStr_3094.enable();
        }
        this._messageText = asGuarded(this._window.findChildByName("message_text"), isITextFieldWindow);
        this._messageText.removeEventListener("WKE_KEY_UP", this.onMessageKeyUpEvent);
        this._messageText.addEventListener("WKE_KEY_UP", this.onMessageKeyUpEvent);
        this._messageText.maxChars = 4000;
        if (param1 != null) {
            this.addQuote(param1);
        }
        let _loc2_: IWindow = this._window.findChildByName("cancel_btn");
        _loc2_.removeEventListener("WME_CLICK", this.onCancelButtonClick);
        _loc2_.addEventListener("WME_CLICK", this.onCancelButtonClick);
        let _loc4_: IWindow = this._window.findChildByName("header_button_close");
        _loc4_.removeEventListener("WME_CLICK", this.onCancelButtonClick);
        _loc4_.addEventListener("WME_CLICK", this.onCancelButtonClick);
        this._SafeStr_2889 = this._window.findChildByName("post_btn");
        this._SafeStr_2889.removeEventListener("WME_CLICK", this.onPostButtonClick);
        this._SafeStr_2889.addEventListener("WME_CLICK", this.onPostButtonClick);
        this._status = this._window.findChildByName("status_text");
        this.validateInputs();
    }

    private addQuote(param1: MessageData): void {
        let _loc2_: any = undefined;
        let _loc4_: StringBuffer = new StringBuffer();
        _loc4_.add(this._messageText.text);
        if (_loc4_.length > 0) {
            _loc4_.add("\r\r");
        }
        _loc4_.add(this._controller.localizationManager.getLocalizationWithParams("groupforum.compose.reply_template", "", "author_name", param1.authorName, "creation_time", this._SafeStr_2276.getAsDaysHoursMinutes(param1.creationTimeAsSecondsAgo)));
        _loc4_.add("\r");
        let _loc5_: any[] = param1.messageText.split("\r");
        let _loc6_: boolean = false;
        for (const _loc3_ of _loc5_ ?? []) {
            _loc2_ = MessageListView._SafeStr_5807.exec(stringOrNull(_loc3_));
            if (_loc2_ != null) {
                if (!_loc6_) {
                    _loc6_ = true;
                    _loc4_.add("> ").add(this._controller.localizationManager.getLocalization("groupforum.compose.skipped_quote")).add("\r");
                }
            } else {
                _loc4_.add("> ").add(stringOrNull(_loc3_)).add("\r");
                _loc6_ = false;
            }
        }
        _loc4_.add("\r");
        this._messageText.text = _loc4_.toString();
    }

    private onHeaderKeyUpEvent = (param1: WindowKeyboardEvent): void => {
        this.validateInputs();
    };

    private onMessageKeyUpEvent = (param1: WindowKeyboardEvent): void => {
        this.validateInputs();
    };

    private onTopAreaClick = (param1: WindowMouseEvent): void => {
        this._controller.context.createLinkEvent("group/" + this._forumData.groupId);
    };

    private onPostButtonClick = (param1: WindowMouseEvent): void => {
        if (this._SafeStr_4715) {
            return;
        }
        this.validateInputs();
        if (this._hasErrors) {
            return;
        }
        this._SafeStr_4715 = true;
        this._SafeStr_3094.disable();
        this._messageText.disable();
        this._SafeStr_2889.disable();
        this._status.caption = this._controller.localizationManager.getLocalization("groupforum.compose.posting");
        if (this._SafeStr_3272) {
            this._controller.postNewMessage(this._forumData.groupId, this._SafeStr_3272.threadId, this._messageText.text);
        } else {
            this._controller.postNewThread(this._forumData.groupId, this._SafeStr_3094.text, this._messageText.text);
        }
    };

    private onCancelButtonClick = (param1: WindowMouseEvent): void => {
        this.dispose();
    };

    private validateInputs(): void {
        let _loc1_: number = 0;
        this._hasErrors = false;
        if (!this._SafeStr_3272) {
            if (this._SafeStr_3094.text.length <= 10) {
                this._hasErrors = true;
                this._status.caption = this._controller.localizationManager.getLocalization("groupforum.compose.subject_too_short");
            }
        }
        if (!this._hasErrors && this._messageText.text.length <= 10) {
            this._hasErrors = true;
            this._status.caption = this._controller.localizationManager.getLocalization("groupforum.compose.message_too_short");
        }
        if (!this._hasErrors && !this._SafeStr_4715) {
            _loc1_ = getTimer() - this._controller.lastPostTime;
            if (_loc1_ < 30000) {
                this._hasErrors = true;
                this._status.caption = this._controller.localizationManager.getLocalizationWithParams("groupforum.compose.post_cooldown", "", "time_remaining", FriendlyTime.getFriendlyTime(this._controller.localizationManager, (30000 - _loc1_) / 1000 + 1, "", 1));
            }
        }
        if (!this._SafeStr_4715 && !this._hasErrors) {
            this._SafeStr_2889.enable();
            this._status.caption = "";
        } else {
            this._SafeStr_2889.disable();
        }
    }

    private onTimerEvent = (param1: TimerEvent): void => {
        this.validateInputs();
    };
}
