import { asGuarded, castGuarded, castTo, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { valuesOf } from '@habbo-pixi/runtime/lang/iterate';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IFriend } from '@/com/sulake/habbo/friendlist/IFriend';
import type { HabboMessenger } from '@/com/sulake/habbo/messenger/HabboMessenger';
import type { IAvatarImageWidget } from '@/com/sulake/habbo/window/widgets/IAvatarImageWidget';
import type { IBadgeImageWidget } from '@/com/sulake/habbo/window/widgets/IBadgeImageWidget';
import type { IIlluminaChatBubbleWidget } from '@/com/sulake/habbo/window/widgets/IIlluminaChatBubbleWidget';
import type { IIlluminaInputHandler } from '@/com/sulake/habbo/window/widgets/IIlluminaInputHandler';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { ErrorReportStorage } from '@/com/sulake/core/utils/ErrorReportStorage';
import { isICloseButtonWindow } from '@/com/sulake/core/window/components/ICloseButtonWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { FollowFriendMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/friendlist/FollowFriendMessageComposer';
import { GetMessengerHistoryComposer } from '@/com/sulake/habbo/communication/messages/outgoing/friendlist/GetMessengerHistoryComposer';
import { SendHabbiconMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/friendlist/SendHabbiconMessageComposer';
import { SendMsgMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/friendlist/SendMsgMessageComposer';
import { EventLogMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/tracking/EventLogMessageComposer';
import { GetExtendedProfileMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/GetExtendedProfileMessageComposer';
import { GetHabboGroupDetailsMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/GetHabboGroupDetailsMessageComposer';
import { ChatEntry } from '@/com/sulake/habbo/messenger/ChatEntry';
import { MessengerHabbiconPicker } from '@/com/sulake/habbo/messenger/habbicons/MessengerHabbiconPicker';
import { _SafeCls_6078 } from '@/com/sulake/habbo/window/widgets/_SafeCls_6078';
import { isIAvatarImageWidget } from '@/com/sulake/habbo/window/widgets/IAvatarImageWidget';
import { isIBadgeImageWidget } from '@/com/sulake/habbo/window/widgets/IBadgeImageWidget';
import { isIIlluminaChatBubbleWidget } from '@/com/sulake/habbo/window/widgets/IIlluminaChatBubbleWidget';
import { isIIlluminaInputWidget } from '@/com/sulake/habbo/window/widgets/IIlluminaInputWidget';

export class MainView implements IDisposable, IIlluminaInputHandler {
    static { registerClassName(this, 'com.sulake.habbo.messenger::MainView'); }

    static #staticsReady = false;

    private static get HIDDEN(): string {
        MainView.#initStatics();
        return MainView.HIDDEN;
    }

    private static get NO_CONVERSATION(): number {
        MainView.#initStatics();
        return MainView.NO_CONVERSATION;
    }

    private static get NOTIFICATION_ICON_WIDTH(): number {
        MainView.#initStatics();
        return MainView.NOTIFICATION_ICON_WIDTH;
    }

    private static get SCROLL_TRIGGER_HEIGHT(): number {
        MainView.#initStatics();
        return MainView.SCROLL_TRIGGER_HEIGHT;
    }

    private static get COMBINE_MESSAGING_THRESHOLD(): number {
        MainView.#initStatics();
        return MainView.COMBINE_MESSAGING_THRESHOLD;
    }

    private static get _SafeStr_14190(): number {
        MainView.#initStatics();
        return MainView._SafeStr_14190;
    }

    private static get CHAT_ITEM_RENDER_MAX_BUNDLE_SIZE(): number {
        MainView.#initStatics();
        return MainView.CHAT_ITEM_RENDER_MAX_BUNDLE_SIZE;
    }

    private static get CHAT_ITEM_RENDER_MAX_MESSAGES_SIZE(): number {
        MainView.#initStatics();
        return MainView.CHAT_ITEM_RENDER_MAX_MESSAGES_SIZE;
    }

    private static get CHAT_ITEM_INITIAL_MULTIPLIER(): number {
        MainView.#initStatics();
        return MainView.CHAT_ITEM_INITIAL_MULTIPLIER;
    }

    private static get _SafeStr_8076(): number {
        MainView.#initStatics();
        return MainView._SafeStr_8076;
    }

    private static get _SafeStr_8670(): number {
        MainView.#initStatics();
        return MainView._SafeStr_8670;
    }

    private static get ERROR_MESSAGES(): Map<any, any> {
        MainView.#initStatics();
        return MainView.ERROR_MESSAGES;
    }

    declare private _messenger: HabboMessenger;

    declare private _SafeStr_14191: IWindowContainer;

    declare private _frame: IWindowContainer;

    declare private _SafeStr_2235: IItemListWindow;

    declare private _SafeStr_2693: IWindowContainer;

    declare private _SafeStr_2830: number;
    static { (this.prototype as any)._SafeStr_2830 = 0; }

    declare private _SafeStr_4144: boolean;
    static { (this.prototype as any)._SafeStr_4144 = false; }

    private _chatEntries: Map<any, any> = new Dictionary();
    private _SafeStr_2222: number = -1;

    declare private _SafeStr_3702: IWindowContainer;

    declare private _SafeStr_3793: IWidgetWindow;

    declare private _SafeStr_3947: IWindowContainer;

    declare private _SafeStr_4235: IWindowContainer;

    declare private _SafeStr_3856: IWindowContainer;

    declare private _SafeStr_3419: boolean;
    static { (this.prototype as any)._SafeStr_3419 = false; }

    declare private _SafeStr_14192: MessengerHabbiconPicker;

    private _SafeStr_6413: boolean = false;
    private _SafeStr_5721: number = 1;
    private _awaitConfirmationEntries: Map<any, any> = new Dictionary();

    declare private _SafeStr_2550: number;
    static { (this.prototype as any)._SafeStr_2550 = 0; }

    private _historyFetchesTimestamps: Map<any, any> = new Dictionary();
    private _SafeStr_3602: Map<any, any> = new Dictionary();

    constructor(param1: HabboMessenger) {
        this._messenger = param1;
        this._SafeStr_14191 = asGuarded(this._messenger.getXmlWindow("messenger"), isIWindowContainer);
        this._frame = asGuarded(this._SafeStr_14191.getChildByName("frame"), isIWindowContainer);
        this._SafeStr_14191.visible = false;
        this._SafeStr_14191.procedure = this.messengerWindowProcedure;
        castGuarded(this._frame.findChildByName("header_button_close"), isICloseButtonWindow, "com.sulake.core.window.components.ICloseButtonWindow").style = 102;
        this._SafeStr_2693 = asGuarded(this._frame.findChildByName("avatar_list"), isIWindowContainer);
        this._SafeStr_3702 = asGuarded(this._SafeStr_2693.getChildAt(0), isIWindowContainer);
        this._SafeStr_2693.removeChild(this._SafeStr_3702);
        this._SafeStr_2830 = 0;
        this._SafeStr_2235 = asGuarded(this._frame.findChildByName("conversation"), isIItemListWindow);
        this._SafeStr_3793 = asGuarded(this._SafeStr_2235.getListItemByName("msg_normal"), isIWidgetWindow);
        this._SafeStr_3947 = asGuarded(this._SafeStr_2235.getListItemByName("msg_notification"), isIWindowContainer);
        this._SafeStr_4235 = asGuarded(this._SafeStr_2235.getListItemByName("msg_invitation"), isIWindowContainer);
        this._SafeStr_3856 = asGuarded(this._SafeStr_2235.getListItemByName("msg_info"), isIWindowContainer);
        this._SafeStr_2235.removeListItems();
        this._SafeStr_2550 = -1;
        castGuarded(castGuarded(this._frame.findChildByName("input_widget"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow").widget, isIIlluminaInputWidget, "com.sulake.habbo.window.widgets.IIlluminaInputWidget").submitHandler = this;
    }

    private static avatarVisible(param1: IWindow): boolean {
        return param1 != null && param1.tags.indexOf("HIDDEN") < 0;
    }

    private static setAvatarVisibilityTag(param1: IWindow, param2: boolean): void {
        if (param1 == null) {
            return;
        }
        let _loc3_: boolean = MainView.avatarVisible(param1);
        if (_loc3_ && !param2) {
            param1.tags.push("HIDDEN");
        } else if (!_loc3_ && param2) {
            param1.tags.splice(param1.tags.indexOf("HIDDEN"), 1);
        }
    }

    private static escapeExternalKeys(param1: string): string {
        if (param1.search("\\${") == 0) {
            return " " + param1;
        }
        return param1;
    }

    private static isWindowInTree(param1: IWindow, param2: IWindow): boolean {
        while (param1 != null) {
            if (param1 == param2) {
                return true;
            }
            param1 = param1.parent;
        }
        return false;
    }

    public dispose(): void {
        if (!this.disposed) {
            this._SafeStr_2235 = null;
            this._SafeStr_2693 = null;
            if (this._SafeStr_14192 != null) {
                this._SafeStr_14192.dispose();
                this._SafeStr_14192 = null;
            }
            if (this._SafeStr_14191 != null) {
                this._SafeStr_14191.dispose();
                this._SafeStr_14191 = null;
                this._frame = null;
            }
            if (this._SafeStr_3793 != null) {
                this._SafeStr_3793.dispose();
                this._SafeStr_3793 = null;
            }
            if (this._SafeStr_3947 != null) {
                this._SafeStr_3947.dispose();
                this._SafeStr_3947 = null;
            }
            if (this._SafeStr_4235 != null) {
                this._SafeStr_4235.dispose();
                this._SafeStr_4235 = null;
            }
            if (this._SafeStr_3856 != null) {
                this._SafeStr_3856.dispose();
                this._SafeStr_3856 = null;
            }
            if (this._SafeStr_3702 != null) {
                this._SafeStr_3702.dispose();
                this._SafeStr_3702 = null;
            }
            this._chatEntries = null;
            this._messenger = null;
            this._awaitConfirmationEntries = null;
            this._historyFetchesTimestamps = null;
            this._SafeStr_3602 = null;
        }
    }

    public get disposed(): boolean {
        return this._messenger == null;
    }

    public get isOpen(): boolean {
        return this._SafeStr_14191 != null && Boolean(this._SafeStr_14191.visible);
    }

    public toggle(): void {
        if (this.isOpen) {
            this.hide();
        } else {
            this.show();
        }
    }

    public show(param1: boolean = false): void {
        if (param1 || this.visibleAvatarCount > 0) {
            this._SafeStr_14191.visible = true;
            this._SafeStr_14191.activate();
        }
        if (this._SafeStr_2222 != -1) {
            this.setChatIndicatorVisibility(this._SafeStr_2222, false);
        }
    }

    public hide(): void {
        this.hideHabbiconPicker();
        this._SafeStr_14191.visible = false;
    }

    public hideTransientSelectors(): void {
        this.hideHabbiconPicker();
    }

    public startConversation(param1: number, param2: boolean = true, param3: ChatEntry = null): void {
        let _loc6_: IFriend = null;
        let _loc9_: IWindowContainer = null;
        let _loc5_: IWidgetWindow = null;
        let _loc8_: IWidgetWindow = null;
        let _loc7_: IAvatarImageWidget = null;
        let _loc4_: IBadgeImageWidget = null;
        if (!(this._chatEntries.has(param1))) {
            this._chatEntries.set(param1, []);
            if (!this._SafeStr_6413) {
                this.recordNotificationMessage(param1, "${messenger.moderationinfo}");
                this._SafeStr_6413 = true;
            }
            _loc6_ = this._messenger.getFriend(param1, param3);
            if (!_loc6_) {
                ErrorReportStorage.addDebugData("Messenger Mainview", "User got start conversation request from nonexistent friend, id: " + param1);
                return;
            }
            if (!_loc6_.online) {
                this.recordNotificationMessage(param1, "${messenger.notification.persisted_messages}");
            }
            _loc9_ = asGuarded(this._SafeStr_3702.clone(), isIWindowContainer);
            MainView.setAvatarVisibilityTag(_loc9_, true);
            _loc9_.blend = 0;
            _loc9_.id = param1;
            if (param1 < 0) {
                _loc9_.name = String(param1);
            }
            _loc5_ = asGuarded(_loc9_.findChildByName("avatar_image"), isIWidgetWindow);
            _loc8_ = asGuarded(_loc9_.findChildByName("group_badge_image"), isIWidgetWindow);
            if (_loc6_.id > 0) {
                _loc7_ = asGuarded(_loc5_.widget, isIAvatarImageWidget);
                if (_loc6_ != null) {
                    _loc7_.figure = _loc6_.figure;
                }
                _loc8_.visible = false;
                _loc5_.visible = true;
            } else {
                _loc4_ = asGuarded(_loc8_.widget, isIBadgeImageWidget);
                _loc4_.badgeId = _loc6_.figure;
                _loc4_.groupId = _loc6_.id;
                _loc8_.visible = true;
                _loc5_.visible = false;
            }
            castGuarded(_loc9_.findChildByName("avatar_click_region"), isIRegionWindow, "com.sulake.core.window.components.IRegionWindow").toolTipCaption = _loc6_.name;
            this._SafeStr_2693.addChild(_loc9_);
            this.refreshAvatarList();
        }
        if (param2 || !this.isOpen) {
            this.selectConversation(param1);
        }
        this.refreshChatCount(param2);
    }

    public addConsoleMessage(param1: number, param2: number, param3: string, param4: number, param5: number, param6: string, param7: number, param8: number, param9: string, param10: string): void {
        let _loc11_: _SafeCls_6078 = this.createBubbleMessage(param2, param3, param4);
        if (param7 > 0) {
            this.onConfirmOwnChatMessage(param6, _loc11_, param7);
        } else {
            this.recordChatMessage(param1, _loc11_, true, param5, param8, param9, param10, param6);
        }
    }

    public addRoomInvite(param1: number, param2: string): void {
        this.recordInvitationMessage(param1, this._messenger.getText("messenger.invitation") + " " + param2, true);
    }

    public setFollowingAllowed(param1: number, param2: boolean): void {
        if (param1 == this._SafeStr_2222) {
            this.refreshButtons();
        }
    }

    public onInstantMessageError(param1: number, param2: number, param3: string): void {
        let _loc5_: string = null;
        let _loc4_: RegExp = null;
        if (MainView.ERROR_MESSAGES.has(param2)) {
            if (param3.length > 0) {
                _loc5_ = stringOrNull(MainView.ERROR_MESSAGES.get(param2));
                _loc4_ = /[${}]/g;
                _loc5_ = _loc5_.replace(_loc4_, "");
                this.recordNotificationMessage(param1, this._messenger.getText(_loc5_) + ": " + param3);
            } else {
                this.recordNotificationMessage(param1, stringOrNull(MainView.ERROR_MESSAGES.get(param2)));
            }
        }
    }

    public setOnlineStatus(param1: number, param2: boolean): void {
        if (this._chatEntries.has(param1)) {
            this.recordInfoMessage(param1, param2 ? "${messenger.notification.online}" : "${messenger.notification.offline}");
        }
    }

    private selectConversation(param1: number): void {
        this._SafeStr_2222 = param1;
        MainView.setAvatarVisibilityTag(this.getAvatarWrapper(param1), true);
        this.setChatIndicatorVisibility(param1, false);
        this.refreshConversationList();
        this.refreshAvatarList();
        let _loc3_: IFriend = this._messenger.getFriend(this._SafeStr_2222);
        let _loc2_: string = _loc3_ != null ? _loc3_.name : "";
        this._frame.findChildByName("separator_label").visible = this._SafeStr_2222 < 0 || _loc3_ != null;
        this._messenger.localization.registerParameter("messenger.window.separator", "friend_name", _loc2_);
        this._messenger.localization.registerParameter("messenger.window.input.default", "friend_name", _loc2_);
        this._frame.invalidate();
    }

    public hideConversation(param1: number): void {
        let _loc2_: IWindow = this.getAvatarWrapper(param1);
        if (_loc2_ != null) {
            MainView.setAvatarVisibilityTag(_loc2_, false);
        }
        if (this.visibleAvatarCount == 0) {
            this.selectConversation(-1);
            this.hide();
        } else {
            for (_loc2_ of valuesOf(this._SafeStr_2693.iterator)) {
                if (MainView.avatarVisible(_loc2_)) {
                    this._SafeStr_2830 = 0;
                    this.selectConversation(_loc2_.id);
                    break;
                }
            }
        }
        this.refreshChatCount();
    }

    private refreshChatCount(param1: boolean = false): void {
        this._messenger.localization.registerParameter("messenger.window.title", "open_chat_count", this.visibleAvatarCount.toString());
        this._messenger.conversationCountUpdated(this.visibleAvatarCount, this.hasUnreadChat && !param1);
    }

    private createBubbleMessage(param1: number, param2: string, param3: number): _SafeCls_6078 {
        return param1 == 1 ? _SafeCls_6078.habbicon(param3) : _SafeCls_6078.text(param2);
    }

    private recordChatMessage(param1: number, param2: _SafeCls_6078, param3: boolean, param4: number, param5: number, param6: string, param7: string, param8: string = "", param9: number = 0): void {
        let _loc10_: ChatEntry = null;
        if (param3) {
            this.recordChatEntry(param1, new ChatEntry(2, param1, param2, param4, param5, param6, param7, param8), true);
        } else {
            _loc10_ = new ChatEntry(1, param1, param2, param4, param5, param6, param7, param8, param9);
            if (param9 > 0) {
                this._awaitConfirmationEntries.set(param9, _loc10_);
            }
            this.recordChatEntry(param1, _loc10_);
        }
    }

    private onConfirmOwnChatMessage(param1: string, param2: _SafeCls_6078, param3: number): void {
        let _loc4_: number = 0;
        let _loc8_: boolean = false;
        let _loc7_: number = 0;
        let _loc10_: IWidgetWindow = null;
        let _loc6_: IIlluminaChatBubbleWidget = null;
        let _loc9_: number = 0;
        let _loc5_: ChatEntry = this._awaitConfirmationEntries.get(param3);
        if (_loc5_ != null) {
            _loc5_.isConfirmed(param2, param1);
            this._SafeStr_3602.set(param1, true);
            _loc4_ = this._SafeStr_2235.numListItems;
            _loc8_ = false;
            _loc7_ = 0;
            while (_loc7_ < _loc4_ && !_loc8_) {
                _loc10_ = asGuarded(this._SafeStr_2235.getListItemAt(_loc7_ >>> 0), isIWidgetWindow);
                if (_loc10_ != null) {
                    _loc6_ = asGuarded(_loc10_.widget, isIIlluminaChatBubbleWidget);
                    if (_loc6_ != null) {
                        _loc9_ = 0;
                        while (_loc9_ < _loc6_.numMessages) {
                            if (_loc6_.getAwaitingConfirmationId(_loc9_) == param3) {
                                _loc6_.clearAwaitingConfirmationId(_loc9_);
                                _loc6_.setMessage(_loc9_, param2);
                                _loc8_ = true;
                                break;
                            }
                            _loc9_ += 1;
                        }
                    }
                }
                _loc7_ += 1;
            }
            this._awaitConfirmationEntries.delete(param3);
        }
    }

    private recordNotificationMessage(param1: number, param2: string): void {
        this.recordChatEntry(param1, new ChatEntry(3, 0, _SafeCls_6078.text(param2), 0));
    }

    private recordInfoMessage(param1: number, param2: string, param3: boolean = false): void {
        this.recordChatEntry(param1, new ChatEntry(4, 0, _SafeCls_6078.text(param2), 0), param3);
    }

    private recordInvitationMessage(param1: number, param2: string, param3: boolean = false): void {
        this.recordChatEntry(param1, new ChatEntry(5, 0, _SafeCls_6078.text(param2), 0), param3);
    }

    private recordChatEntry(param1: number, param2: ChatEntry, param3: boolean = false): void {
        if (this._messenger == null) {
            return;
        }
        if (param2.messageId != "") {
            if (this._SafeStr_3602.has(param2.messageId)) {
                return;
            }
            this._SafeStr_3602.set(param2.messageId, true);
        }
        if (!(this._chatEntries.has(param1))) {
            if (param1 <= 0) {
                return;
            }
            this.startConversation(param1, false, param2.type == 2 ? param2 : null);
        }
        let _loc5_: any[] = this._chatEntries.get(param1);
        let _loc6_: ChatEntry = _loc5_.length > 0 ? _loc5_[_loc5_.length - 1] : null;
        _loc5_.push(param2);
        let _loc4_: IWindowContainer = this.getAvatarWrapper(param1);
        if (_loc4_ != null) {
            MainView.setAvatarVisibilityTag(_loc4_, true);
            this.refreshAvatarList();
        }
        if (param1 == this._SafeStr_2222) {
            this.addToConversationAndCombine(param2, _loc6_);
            this._SafeStr_2235.arrangeListItems();
            this._SafeStr_2235.scrollV = 1;
            if (!this.isOpen && param3) {
                this.setChatIndicatorVisibility(param1, true);
            }
        } else {
            if (param3) {
                this.setChatIndicatorVisibility(param1, true);
            }
            if (this.visibleAvatarCount == 1) {
                this.selectConversation(param1);
            }
        }
        this.refreshChatCount();
    }

    private shouldCombineWithPreviousEntry(param1: number, param2: ChatEntry, param3: ChatEntry): boolean {
        let _loc4_: boolean = false;
        let _loc5_: boolean = false;
        let _loc6_: any[] = this._chatEntries.get(param1);
        if (_loc6_.length > 0) {
            param3.sentTimeStamp();
            if (param1 > 0) {
                if (param2.type == param3.type && (param2.type == 1 || param2.type == 2) && param2.sentTimeStamp() < param3.sentTimeStamp() + 600000) {
                    _loc5_ = true;
                }
            } else {
                _loc4_ = param2.type == 2 && param3.senderId == param2.senderId;
                if (param2.type == param3.type && (param2.type == 1 || _loc4_) && param2.sentTimeStamp() < param3.sentTimeStamp() + 600000) {
                    _loc5_ = true;
                }
            }
        }
        return _loc5_;
    }

    private getAvatarWrapper(param1: number): IWindowContainer {
        return asGuarded(this._SafeStr_2693.getChildByID(param1), isIWindowContainer);
    }

    private setChatIndicatorVisibility(param1: number, param2: boolean): void {
        let _loc3_: IWindowContainer = this.getAvatarWrapper(param1);
        if (_loc3_ != null) {
            _loc3_.findChildByName("chat_indicator").visible = param2;
        }
    }

    private createChatItem(param1: ChatEntry, param2: boolean = false): IWindow {
        let _loc9_: IWidgetWindow = null;
        let _loc5_: IIlluminaChatBubbleWidget = null;
        let _loc11_: IWindowContainer = null;
        let _loc10_: IWindow = null;
        let _loc4_: IWindowContainer = null;
        let _loc6_: IWindowContainer = null;
        let _loc3_: boolean = false;
        let _loc7_: IFriend = null;
        switch (param1.type - 1) {
            case 0:
                _loc9_ = asGuarded(this._SafeStr_3793.clone(), isIWidgetWindow);
                _loc9_.width = this.conversationItemWidth;
                _loc5_ = asGuarded(_loc9_.widget, isIIlluminaChatBubbleWidget);
                _loc5_.flipped = false;
                _loc5_.appendMessage(param1.message, false, param1.awaitConfirmationId);
                _loc5_.timeStamp = param1.sentTimeStamp();
                _loc5_.figure = this._messenger.sessionDataManager.figure;
                _loc5_.userName = this._messenger.sessionDataManager.userName;
                _loc7_ = this._messenger.getFriend(this._SafeStr_2222);
                if (!param2 && _loc7_ != null && !_loc7_.online && (_loc7_.persistedMessageUser || _loc7_.pocketHabboUser)) {
                    _loc5_.friendOnlineStatus = false;
                }
                return _loc9_;
            case 1:
                _loc9_ = asGuarded(this._SafeStr_3793.clone(), isIWidgetWindow);
                _loc9_.width = this.conversationItemWidth;
                _loc5_ = asGuarded(_loc9_.widget, isIIlluminaChatBubbleWidget);
                _loc5_.flipped = true;
                _loc5_.appendMessage(param1.message);
                _loc5_.timeStamp = param1.sentTimeStamp();
                for (const _loc8_ of valuesOf(this._SafeStr_2693.iterator)) {
                    _loc3_ = _loc8_ != null && _loc8_.id == this._SafeStr_2222;
                    if (!_loc3_ && _loc8_ != null && this._SafeStr_2222 < 0) {
                        _loc3_ = Number(_loc8_.name) == this._SafeStr_2222;
                    }
                    if (_loc3_) {
                        _loc5_.figure = param1.senderFigure;
                        _loc5_.userId = param1.senderId;
                        _loc5_.userName = param1.senderName;
                        break;
                    }
                }
                return _loc9_;
            case 2:
                _loc4_ = asGuarded(this._SafeStr_3947.clone(), isIWindowContainer);
                _loc4_.findChildByName("content").width = this.conversationItemWidth - 55;
                _loc4_.findChildByName("content").caption = param1.messageText;
                return _loc4_;
            case 3:
                _loc11_ = asGuarded(this._SafeStr_3856.clone(), isIWindowContainer);
                _loc10_ = _loc11_.findChildByName("content");
                _loc10_.limits.minWidth = this.conversationItemWidth;
                _loc10_.limits.maxWidth = this.conversationItemWidth;
                _loc10_.caption = param1.messageText;
                return _loc11_;
            case 4:
                _loc6_ = asGuarded(this._SafeStr_4235.clone(), isIWindowContainer);
                _loc6_.findChildByName("content").width = this.conversationItemWidth - 55;
                _loc6_.findChildByName("content").caption = param1.messageText;
                return _loc6_;
            default:
                return null;
        }
    }

    private appendChatEntry(param1: ChatEntry): IWindow {
        let _loc2_: IWindow = this.createChatItem(param1);
        this._SafeStr_2235.addListItem(_loc2_);
        return _loc2_;
    }

    private adjustListItemWidths(): void {
        let _loc1_: number = 0;
        let _loc2_: IWindow = null;
        let _loc3_: IWindow = null;
        _loc1_ = 0;
        while (_loc1_ < this._SafeStr_2235.numListItems) {
            _loc2_ = this._SafeStr_2235.getListItemAt(_loc1_ >>> 0);
            switch (_loc2_.name) {
                case "msg_normal":
                    break;
                case "msg_notification":
                    castGuarded(_loc2_, isIWindowContainer, "com.sulake.core.window.IWindowContainer").findChildByName("content").width = this.conversationItemWidth - 55;
                    break;
                case "msg_info":
                    _loc3_ = castGuarded(_loc2_, isIWindowContainer, "com.sulake.core.window.IWindowContainer").findChildByName("content");
                    _loc3_.limits.minWidth = this.conversationItemWidth;
                    _loc3_.limits.maxWidth = this.conversationItemWidth;
            }
            _loc2_.width = this.conversationItemWidth;
            _loc1_++;
        }
        this._SafeStr_2235.arrangeListItems();
        this._frame.invalidate();
    }

    private get conversationItemWidth(): number {
        return this._frame.width - 27;
    }

    private refreshButtons(): void {
        castGuarded(this._frame.findChildByName("button_strip"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow").arrangeListItems();
    }

    public loadMessageHistory(param1: number, param2: any[]): void {
        let _loc4_: number = 0;
        let _loc7_: ChatEntry = null;
        let _loc5_: any[] = [];
        let _loc3_: number = this._messenger.sessionDataManager.userId;
        for (const _loc6_ of param2 ?? []) {
            if (!(this._SafeStr_3602.has(_loc6_.messageId))) {
                _loc4_ = _loc6_.senderId | 0;
                _loc7_ = new ChatEntry(_loc4_ == _loc3_ ? 1 : 2, param1, this.createBubbleMessage(_loc6_.messageType | 0, stringOrNull(_loc6_.message), _loc6_.habbiconId | 0), _loc6_.secondsSinceSent | 0, _loc4_, stringOrNull(_loc6_.senderName), stringOrNull(_loc6_.senderFigure), stringOrNull(_loc6_.messageId));
                _loc5_.push(_loc7_);
            }
        }
        if (_loc5_.length == 0) {
            return;
        }
        let _loc8_: any[] = this._chatEntries.get(param1);
        if (_loc8_ == null) {
            _loc8_ = [];
            this._chatEntries.set(param1, _loc8_);
        }
        this._chatEntries.set(param1, _loc5_.concat(_loc8_));
        if (param1 == this._SafeStr_2222) {
            if (this._SafeStr_2550 != -1) {
                this._SafeStr_2550 += _loc5_.length;
            }
            this.addMissingChatEntries();
        }
    }

    private requestHistory(param1: number): void {
        let _loc4_: any = null;
        let _loc2_: any[] = this._chatEntries.get(param1);
        if (_loc2_ == null) {
            return;
        }
        let _loc5_: string = "";
        if (_loc2_.length > 0) {
            _loc5_ = stringOrNull(_loc2_[0].messageId);
        }
        let _loc3_: number = getTimer();
        if (this._historyFetchesTimestamps.has(param1)) {
            _loc4_ = this._historyFetchesTimestamps.get(param1);
            if (_loc4_.messageId == _loc5_ && _loc4_.time + 4000 > _loc3_) {
                return;
            }
        }
        this._historyFetchesTimestamps.set(param1, { "messageId": _loc5_, "time": _loc3_ });
        this._messenger.send(new GetMessengerHistoryComposer(param1, _loc5_));
    }

    private refreshConversationList(): void {
        this._SafeStr_3419 = true;
        this._SafeStr_2235.destroyListItems();
        this._SafeStr_2550 = -1;
        this.scrollBack(true);
        this._SafeStr_2235.arrangeListItems();
        this._SafeStr_2235.scrollV = 1;
        this._SafeStr_3419 = false;
    }

    private addToConversationAndCombine(param1: ChatEntry, param2: ChatEntry, param3: boolean = false): boolean {
        let _loc5_: number = 0;
        let _loc7_: IWidgetWindow = null;
        let _loc4_: IIlluminaChatBubbleWidget = null;
        let _loc6_: boolean = false;
        if (param2 != null && this.shouldCombineWithPreviousEntry(this._SafeStr_2222, param1, param2)) {
            _loc5_ = param3 ? 0 : this._SafeStr_2235.numListItems - 1;
            if (_loc5_ >= 0) {
                _loc7_ = asGuarded(this._SafeStr_2235.getListItemAt(_loc5_ >>> 0), isIWidgetWindow);
                if (_loc7_ != null) {
                    _loc4_ = asGuarded(_loc7_.widget, isIIlluminaChatBubbleWidget);
                    if (_loc4_ != null) {
                        _loc4_.appendMessage(param1.message, param3, param1.awaitConfirmationId);
                        if (!param3) {
                            _loc4_.timeStamp = param1.sentTimeStamp();
                        }
                        _loc6_ = true;
                    }
                }
            }
        }
        if (!_loc6_) {
            if (param3) {
                this._SafeStr_2235.addListItemAt(this.createChatItem(param1, true), 0);
            } else {
                this.appendChatEntry(param1);
            }
        }
        return _loc6_;
    }

    private addMissingChatEntries(): void {
        if (-this._SafeStr_2235.scrollableRegion.y > 150) {
            return;
        }
        this._SafeStr_3419 = true;
        let _loc1_: number = Number(this._SafeStr_2235.scrollV);
        let _loc2_: number = this._SafeStr_2235.scrollableRegion.height | 0;
        this.scrollBack();
        this._SafeStr_2235.arrangeListItems();
        this._SafeStr_2235.scrollV = _loc2_ <= this._SafeStr_2235.height ? 1 : 1 - _loc2_ * (1 - _loc1_) / this._SafeStr_2235.scrollableRegion.height;
        this._SafeStr_3419 = false;
    }

    private scrollBack(param1: boolean = false): void {
        let _loc7_: number = 0;
        let _loc4_: ChatEntry = null;
        let _loc2_: any[] = this._chatEntries.get(this._SafeStr_2222);
        if (_loc2_ == null) {
            this.requestHistory(this._SafeStr_2222);
            return;
        }
        let _loc10_: number = (this._SafeStr_2550 == -1 ? _loc2_.length : this._SafeStr_2550) | 0;
        let _loc3_: number = param1 ? 3 : 1;
        let _loc8_: number = 0;
        let _loc9_: boolean = false;
        let _loc6_: number = 0;
        let _loc5_: ChatEntry = this._SafeStr_2550 == -1 ? null : _loc2_[this._SafeStr_2550];
        _loc7_ = _loc10_ - 1;
        while (_loc7_ >= 0) {
            _loc4_ = _loc2_[_loc7_];
            if (_loc9_ && !this.shouldCombineWithPreviousEntry(this._SafeStr_2222, _loc4_, _loc5_)) {
                break;
            }
            if (!this.addToConversationAndCombine(_loc4_, _loc5_, true)) {
                _loc8_ += 1;
            }
            _loc5_ = _loc4_;
            _loc6_ += 1;
            this._SafeStr_2550 = _loc7_;
            if (_loc8_ >= 3 * _loc3_) {
                _loc9_ = true;
            }
            if (_loc6_ >= 7 * _loc3_) {
                break;
            }
            _loc7_--;
        }
        if (this._SafeStr_2550 < 40) {
            this.requestHistory(this._SafeStr_2222);
        }
    }

    private refreshAvatarList(): void {
        let _loc1_: boolean = false;
        let _loc2_: boolean = false;
        let _loc3_: number = 0;
        let _loc5_: number = 0;
        this._SafeStr_4144 = false;
        for (const _loc4_ of valuesOf(this._SafeStr_2693.iterator)) {
            _loc1_ = _loc4_.id == this._SafeStr_2222;
            if (!_loc1_ && _loc4_.name.length > 0) {
                _loc1_ = Number(_loc4_.name) == this._SafeStr_2222;
            }
            if (_loc1_) {
                MainView.setAvatarVisibilityTag(_loc4_, true);
            }
            _loc2_ = MainView.avatarVisible(_loc4_);
            if (_loc5_ < this._SafeStr_2830 || !_loc2_ || this._SafeStr_4144) {
                _loc4_.visible = false;
            } else if (_loc3_ + _loc4_.width > this._SafeStr_2693.width) {
                _loc4_.visible = false;
                this._SafeStr_4144 = true;
            } else {
                _loc4_.visible = true;
                _loc4_.blend = _loc1_ ? 1 : 0;
                _loc4_.x = _loc3_;
                _loc3_ = _loc3_ + _loc4_.width | 0;
            }
            if (_loc2_) {
                _loc5_++;
            }
        }
        this._frame.findChildByName("avatars_scroll_left").visible = this._SafeStr_2830 > 0;
        this._frame.findChildByName("avatars_scroll_right").visible = this._SafeStr_4144;
    }

    private get visibleAvatarCount(): number {
        let _loc1_: number = 0;
        for (const _loc2_ of valuesOf(this._SafeStr_2693.iterator)) {
            if (MainView.avatarVisible(_loc2_)) {
                _loc1_++;
            }
        }
        return _loc1_;
    }

    private get hasUnreadChat(): boolean {
        let _loc1_: IWindowContainer = null;
        for (const _loc2_ of valuesOf(this._SafeStr_2693.iterator)) {
            if (MainView.avatarVisible(_loc2_)) {
                _loc1_ = castGuarded(_loc2_, isIWindowContainer, "com.sulake.core.window.IWindowContainer");
                if (_loc1_ != null) {
                    if (_loc1_.findChildByName("chat_indicator").visible) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    private messengerWindowProcedure = (param1: WindowEvent, param2: IWindow): void => {
        let _loc3_: boolean = false;
        switch (param1.type) {
            case "WE_RESIZE":
                if (param2 == this._frame) {
                    this.adjustListItemWidths();
                    this.refreshAvatarList();
                    if (this._SafeStr_14192 != null && this._SafeStr_14192.visible) {
                        this.positionHabbiconPicker();
                    }
                }
                break;
            case "WE_RELOCATED":
                if (param2.name == "_CONTAINER" && !this._SafeStr_3419) {
                    this.addMissingChatEntries();
                }
                break;
            case "WME_CLICK":
                _loc3_ = true;
                switch (param2.name) {
                    case "avatar_click_region":
                        this.selectConversation(param2.parent.id);
                        break;
                    case "avatars_scroll_left":
                        if (this._SafeStr_2830 > 0) {
                            this._SafeStr_2830 = this._SafeStr_2830 - 1;
                            this.refreshAvatarList();
                        }
                        break;
                    case "avatars_scroll_right":
                        if (this._SafeStr_4144) {
                            this._SafeStr_2830 = this._SafeStr_2830 + 1;
                            this.refreshAvatarList();
                        }
                        break;
                    case "close_conversation_button":
                        this.hideConversation(this._SafeStr_2222);
                        break;
                    case "follow_button":
                        if (this._SafeStr_2222 > 0) {
                            this._messenger.send(new FollowFriendMessageComposer(this._SafeStr_2222));
                            this._messenger.send(new EventLogMessageComposer("Navigation", "IM", "go.im"));
                        } else {
                            this._messenger.followingToGroupRoom = true;
                            this._messenger.send(new GetHabboGroupDetailsMessageComposer(Math.abs(this._SafeStr_2222) | 0, false));
                        }
                        break;
                    case "profile_button":
                        if (this._SafeStr_2222 > 0) {
                            this._messenger.send(new GetExtendedProfileMessageComposer(this._SafeStr_2222));
                            this._messenger.trackGoogle("extendedProfile", "messenger_conversation");
                        } else {
                            this._messenger.send(new GetHabboGroupDetailsMessageComposer(Math.abs(this._SafeStr_2222) | 0, true));
                            this._messenger.trackGoogle("extendedProfile", "messenger_conversation");
                        }
                        break;
                    case "report_button":
                        this._messenger.reportUser(this._SafeStr_2222);
                        break;
                    case "habbicon_button":
                        this.toggleHabbiconPicker();
                        _loc3_ = false;
                        break;
                    case "header_button_close":
                        this.hide();
                }
                if (_loc3_) {
                    this.hideHabbiconPickerIfOutside(param2);
                }
                break;
            case "WME_CLICK_AWAY":
                this.hideHabbiconPickerIfOutside(param1.related);
        }
    };

    public onInput(param1: IWidgetWindow, param2: string): void {
        if (param2 == "") {
            return;
        }
        let _loc5_: number = this._SafeStr_5721;
        this._SafeStr_5721 += 1;
        this._messenger.send(new SendMsgMessageComposer(this._SafeStr_2222, param2, _loc5_));
        castGuarded(param1.widget, isIIlluminaInputWidget, "com.sulake.habbo.window.widgets.IIlluminaInputWidget").message = "";
        let _loc3_: any[] = this._chatEntries.get(this._SafeStr_2222);
        if (_loc3_.length == 0 || _loc3_.length == 1 && castTo(_loc3_[0], ChatEntry).type == 3) {
            this._messenger.playSendSound();
        }
        let _loc4_: string = this._messenger.sessionDataManager.figure;
        let _loc6_: string = this._messenger.sessionDataManager.userName;
        let _loc7_: number = this._messenger.sessionDataManager.userId;
        this.recordChatMessage(this._SafeStr_2222, _SafeCls_6078.text(MainView.escapeExternalKeys(param2)), false, 0, _loc7_, _loc6_, _loc4_, "", _loc5_);
    }

    private toggleHabbiconPicker(): void {
        this.ensureHabbiconPicker();
        if (this._SafeStr_14192.visible) {
            this._SafeStr_14192.hide();
            return;
        }
        this._SafeStr_14192.show();
        this.positionHabbiconPicker();
    }

    private ensureHabbiconPicker(): void {
        if (this._SafeStr_14192 != null) {
            return;
        }
        let _loc1_: IWindowContainer = asGuarded(this._messenger.getXmlWindow("messenger_habbicon_picker"), isIWindowContainer);
        this._SafeStr_14191.addChild(_loc1_);
        this._SafeStr_14192 = new MessengerHabbiconPicker(_loc1_, this._messenger.habbiconController, this._messenger.localization, this._messenger.windowManager, this.onHabbiconSelected);
    }

    private positionHabbiconPicker(): void {
        let _loc3_: Rectangle = new Rectangle();
        let _loc2_: Rectangle = new Rectangle();
        let _loc1_: Point = new Point();
        this.habbiconButton.getGlobalRectangle(_loc3_);
        this.inputWidget.getGlobalRectangle(_loc2_);
        this._SafeStr_14191.getGlobalPosition(_loc1_);
        this._SafeStr_14192.setPosition(_loc3_.x - _loc1_.x | 0, _loc2_.y - _loc1_.y - this._SafeStr_14192.window.height - 4 | 0);
    }

    private hideHabbiconPicker(): void {
        if (this._SafeStr_14192 != null) {
            this._SafeStr_14192.hide();
        }
    }

    private hideHabbiconPickerIfOutside(param1: IWindow): void {
        if (this._SafeStr_14192 != null && this._SafeStr_14192.visible && !MainView.isWindowInTree(param1, this.habbiconButton) && !this._SafeStr_14192.containsWindow(param1)) {
            this._SafeStr_14192.hide();
        }
    }

    private onHabbiconSelected = (param1: number, param2: boolean): void => {
        if (this._SafeStr_2222 == -1 || param1 <= 0) {
            return;
        }
        let _loc5_: number = this._SafeStr_5721;
        this._SafeStr_5721 += 1;
        this._messenger.send(new SendHabbiconMessageComposer(this._SafeStr_2222, param1, _loc5_));
        let _loc3_: any[] = this._chatEntries.get(this._SafeStr_2222);
        if (_loc3_.length == 0 || _loc3_.length == 1 && castTo(_loc3_[0], ChatEntry).type == 3) {
            this._messenger.playSendSound();
        }
        let _loc4_: string = this._messenger.sessionDataManager.figure;
        let _loc6_: string = this._messenger.sessionDataManager.userName;
        let _loc7_: number = this._messenger.sessionDataManager.userId;
        this.recordChatMessage(this._SafeStr_2222, _SafeCls_6078.habbicon(param1), false, 0, _loc7_, _loc6_, _loc4_, "", _loc5_);
        if (this._messenger.habbiconController != null) {
            this._messenger.habbiconController.noteHabbiconUsed(param1);
        }
    };

    private get habbiconButton(): IWindow {
        return this._frame.findChildByName("habbicon_button");
    }

    private get inputWidget(): IWindow {
        return this._frame.findChildByName("input_widget");
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (MainView.#staticsReady) return;
        MainView.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(MainView, name, { value, writable: true, configurable: true, enumerable: true });
        set("HIDDEN", null);
        set("NO_CONVERSATION", 0);
        set("NOTIFICATION_ICON_WIDTH", 0);
        set("SCROLL_TRIGGER_HEIGHT", 0);
        set("COMBINE_MESSAGING_THRESHOLD", 0);
        set("_SafeStr_14190", 0);
        set("CHAT_ITEM_RENDER_MAX_BUNDLE_SIZE", 0);
        set("CHAT_ITEM_RENDER_MAX_MESSAGES_SIZE", 0);
        set("CHAT_ITEM_INITIAL_MULTIPLIER", 0);
        set("_SafeStr_8076", 0);
        set("_SafeStr_8670", 0);
        set("ERROR_MESSAGES", null);
        set("HIDDEN", "HIDDEN");
        set("NO_CONVERSATION", -1);
        set("NOTIFICATION_ICON_WIDTH", 55);
        set("SCROLL_TRIGGER_HEIGHT", 150);
        set("COMBINE_MESSAGING_THRESHOLD", 600000);
        set("_SafeStr_14190", 4);
        set("CHAT_ITEM_RENDER_MAX_BUNDLE_SIZE", 3);
        set("CHAT_ITEM_RENDER_MAX_MESSAGES_SIZE", 7);
        set("CHAT_ITEM_INITIAL_MULTIPLIER", 3);
        set("_SafeStr_8076", 40);
        set("_SafeStr_8670", 4000);
        set("ERROR_MESSAGES", new Dictionary());
        MainView.ERROR_MESSAGES.set(3, "${messenger.error.receivermuted}");
        MainView.ERROR_MESSAGES.set(4, "${messenger.error.sendermuted}");
        MainView.ERROR_MESSAGES.set(5, "${messenger.error.offline}");
        MainView.ERROR_MESSAGES.set(6, "${messenger.error.notfriend}");
        MainView.ERROR_MESSAGES.set(7, "${messenger.error.busy}");
        MainView.ERROR_MESSAGES.set(8, "${messenger.error.receiverhasnochat}");
        MainView.ERROR_MESSAGES.set(9, "${messenger.error.senderhasnochat}");
        MainView.ERROR_MESSAGES.set(10, "${messenger.error.offline_failed}");
        MainView.ERROR_MESSAGES.set(11, "${messenger.error.not_group_member}");
        MainView.ERROR_MESSAGES.set(12, "${messenger.error.not_group_admin}");
        MainView.ERROR_MESSAGES.set(13, "${messenger.error.sender_im_unavailable}");
        MainView.ERROR_MESSAGES.set(14, "${messenger.error.recipient_im_unavailable}");
    }

    get [IDisposable](): true {
        return true;
    }
}
