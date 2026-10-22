import { castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IContainerButtonWindow } from '@/com/sulake/core/window/components/IContainerButtonWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { FriendRequest } from '@/com/sulake/habbo/friendlist/domain/FriendRequest';
import type { HabboFriendList } from '@/com/sulake/habbo/friendlist/HabboFriendList';
import type { ITabView } from '@/com/sulake/habbo/friendlist/ITabView';
import { isIContainerButtonWindow } from '@/com/sulake/core/window/components/IContainerButtonWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { AcceptFriendMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/friendlist/AcceptFriendMessageComposer';
import { DeclineFriendMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/friendlist/DeclineFriendMessageComposer';
import { GetExtendedProfileMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/GetExtendedProfileMessageComposer';
import { FriendRequestEvent } from '@/com/sulake/habbo/friendlist/events/FriendRequestEvent';
import { IFriendRequestsView } from '@/com/sulake/habbo/friendlist/IFriendRequestsView';
import { Util } from '@/com/sulake/habbo/friendlist/Util';
import { ExtendedProfileIcon } from '@/com/sulake/habbo/utils/ExtendedProfileIcon';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class FriendRequestsView implements ITabView, IFriendRequestsView {
    static { registerClassName(this, 'com.sulake.habbo.friendlist::FriendRequestsView'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        FriendRequestsView.#initStatics();
        return FriendRequestsView._log;
    }

    private static readonly NO_REQS_INFO: string = "no_reqs_info";

    constructor() {
    }

    declare private _friendList: HabboFriendList;

    declare private _SafeStr_2221: IItemListWindow;

    declare private _SafeStr_5534: IContainerButtonWindow;

    declare private _SafeStr_5688: IContainerButtonWindow;

    public init(param1: HabboFriendList): void {
        this._friendList = param1;
    }

    public getEntryCount(): number {
        return this._friendList.friendRequests.getCountOfOpenRequests();
    }

    public fillFooter(param1: IWindowContainer): void {
        this._SafeStr_5534 = castGuarded(param1.findChildByName("accept_all_but"), isIContainerButtonWindow, "com.sulake.core.window.components.IContainerButtonWindow");
        this._SafeStr_5688 = castGuarded(param1.findChildByName("reject_all_but"), isIContainerButtonWindow, "com.sulake.core.window.components.IContainerButtonWindow");
        this._SafeStr_5688.procedure = this.onDismissAllButtonClick;
        this._SafeStr_5534.procedure = this.onAcceptAllButtonClick;
        this.refreshButtons();
    }

    public fillList(param1: IItemListWindow): void {
        this._SafeStr_2221 = param1;
        for (const _loc2_ of this._friendList.friendRequests.requests ?? []) {
            this.getRequestEntry(_loc2_);
            this.refreshRequestEntry(_loc2_);
            param1.addListItem(_loc2_.view);
        }
        this._friendList.friendRequests.refreshShading();
    }

    public tabClicked(param1: number): void {
        if (this._SafeStr_2221 == null) {
            return;
        }
        this._friendList.friendRequests.clearAndUpdateView(true);
    }

    public refreshShading(param1: FriendRequest, param2: boolean): void {
        if (this._SafeStr_2221 == null) {
            return;
        }
        param1.view.color = this._friendList.laf.getRowShadingColor(2, param2);
        this.setButtonBg(param1.view, "reject");
        this.setButtonBg(param1.view, "accept");
    }

    public refreshRequestEntry(param1: FriendRequest): void {
        if (this._SafeStr_2221 == null) {
            return;
        }
        let _loc3_: IWindowContainer = param1.view;
        Util.hideChildren(_loc3_);
        let _loc2_: IWindow = _loc3_.findChildByName("bg_region");
        _loc2_.visible = true;
        _loc2_.procedure = this.onEntry;
        _loc2_.id = param1.requesterUserId;
        _loc3_.findChildByName("user_info_region").visible = true;
        ExtendedProfileIcon.setUserInfoState(false, _loc3_);
        this._friendList.refreshText(_loc3_, "requester_name_text", true, param1.requesterName);
        if (param1.state == 1) {
            this._friendList.refreshIcon(_loc3_, "accept", true, this.onAcceptButtonClick, param1.requestId);
            this._friendList.refreshIcon(_loc3_, "reject", true, this.onDeclineButtonClick, param1.requestId);
        } else if (param1.state == 2) {
            this._friendList.refreshText(_loc3_, "info_text", true, "${friendlist.request.accepted}");
        } else if (param1.state == 3) {
            this._friendList.refreshText(_loc3_, "info_text", true, "${friendlist.request.declined}");
        } else if (param1.state == 4) {
            this._friendList.refreshText(_loc3_, "info_text", true, "${friendlist.request.failed}");
        }
    }

    public addRequest(param1: FriendRequest): void {
        if (this._SafeStr_2221 == null) {
            return;
        }
        this.getRequestEntry(param1);
        this.refreshRequestEntry(param1);
        this._SafeStr_2221.addListItem(param1.view);
        this._friendList.friendRequests.refreshShading();
        this.refreshButtons();
    }

    public removeRequest(param1: FriendRequest): void {
        if (this._SafeStr_2221 == null) {
            return;
        }
        this._SafeStr_2221.removeListItem(param1.view);
        this.refreshButtons();
    }

    public acceptRequest(param1: number): void {
        let _loc3_: FriendRequest = this._friendList.friendRequests.getRequest(param1);
        if (!_loc3_) {
            return;
        }
        _loc3_.state = 2;
        if (this._friendList.categories.getFriendCount(false) >= this._friendList.friendRequests.limit) {
            this._friendList.showLimitReachedAlert();
            return;
        }
        let _loc2_: AcceptFriendMessageComposer = new AcceptFriendMessageComposer();
        _loc2_.addAcceptedRequest(_loc3_.requestId);
        this._friendList.send(_loc2_);
        this.refreshRequestEntry(_loc3_);
        this.refresh();
        if (this._friendList && this._friendList.events) {
            this._friendList.events.dispatchEvent(new FriendRequestEvent("FRE_ACCEPTED", param1));
        }
    }

    public acceptAllRequests(): void {
        if (this._friendList.categories.getFriendCount(false) + this._friendList.friendRequests.requests.length > this._friendList.friendRequests.limit) {
            this._friendList.showLimitReachedAlert();
            return;
        }
        let _loc1_: AcceptFriendMessageComposer = new AcceptFriendMessageComposer();
        for (const _loc2_ of this._friendList.friendRequests.requests ?? []) {
            if (_loc2_.state != 2 && _loc2_.state != 3) {
                _loc1_.addAcceptedRequest(_loc2_.requestId | 0);
                _loc2_.state = 2;
                this.refreshRequestEntry(_loc2_);
                if (this._friendList && this._friendList.events) {
                    this._friendList.events.dispatchEvent(new FriendRequestEvent("FRE_ACCEPTED", _loc2_.requestId | 0));
                }
            }
        }
        this._friendList.send(_loc1_);
        this.refresh();
    }

    public declineRequest(param1: number): void {
        let _loc3_: FriendRequest = this._friendList.friendRequests.getRequest(param1);
        if (!_loc3_) {
            return;
        }
        _loc3_.state = 3;
        let _loc2_: DeclineFriendMessageComposer = new DeclineFriendMessageComposer();
        _loc2_.addDeclinedRequest(param1);
        this._friendList.send(_loc2_);
        this.refreshRequestEntry(_loc3_);
        this.refresh();
        if (this._friendList && this._friendList.events) {
            this._friendList.events.dispatchEvent(new FriendRequestEvent("FRE_DECLINED", param1));
        }
    }

    public declineAllRequests(): void {
        let _loc1_: DeclineFriendMessageComposer = new DeclineFriendMessageComposer();
        this._friendList.send(_loc1_);
        for (const _loc2_ of this._friendList.friendRequests.requests ?? []) {
            if (_loc2_.state != 2 && _loc2_.state != 3) {
                _loc2_.state = 3;
                this.refreshRequestEntry(_loc2_);
                if (this._friendList && this._friendList.events) {
                    this._friendList.events.dispatchEvent(new FriendRequestEvent("FRE_DECLINED", _loc2_.requestId | 0));
                }
            }
        }
        this.refresh();
    }

    private setButtonBg(param1: IWindowContainer, param2: string): void {
        let _loc3_: IWindow = param1.findChildByName(param2);
        if (_loc3_ != null) {
            _loc3_.color = param1.color;
        }
    }

    private getRequestEntry(param1: FriendRequest): void {
        let _loc2_: IWindowContainer = castGuarded(this._friendList.getXmlWindow("friend_request_entry"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        param1.view = _loc2_;
    }

    private onAcceptButtonClick = (param1: WindowEvent, param2: IWindow): void => {
        this._friendList.view.showInfo(param1, "${friendlist.tip.accept}");
        if (param1.type != "WME_CLICK") {
            return;
        }
        let _loc3_: number = param2.id;
        FriendRequestsView._log.info("accept clicked: " + _loc3_);
        this.acceptRequest(_loc3_);
    };

    private onDeclineButtonClick = (param1: WindowEvent, param2: IWindow): void => {
        this._friendList.view.showInfo(param1, "${friendlist.tip.decline}");
        if (param1.type != "WME_CLICK") {
            return;
        }
        let _loc3_: number = param2.id;
        FriendRequestsView._log.info("decline clicked: " + _loc3_);
        this.declineRequest(_loc3_);
    };

    private onEntry = (param1: WindowEvent, param2: IWindow): void => {
        this._friendList.view.showInfo(param1, "${infostand.profile.link.tooltip}");
        ExtendedProfileIcon.onEntry(param1, param2);
        if (param1.type == "WME_CLICK") {
            this._friendList.trackGoogle("extendedProfile", "friendList_friendRequests");
            this._friendList.send(new GetExtendedProfileMessageComposer(param2.id));
        }
    };

    private onDismissAllButtonClick = (param1: WindowEvent, param2: IWindow): void => {
        this._friendList.view.showInfo(param1, "${friendlist.tip.declineall}");
        if (param1.type != "WME_CLICK") {
            return;
        }
        FriendRequestsView._log.info("Dismiss all clicked");
        this.declineAllRequests();
    };

    private onAcceptAllButtonClick = (param1: WindowEvent, param2: IWindow): void => {
        this._friendList.view.showInfo(param1, "${friendlist.tip.acceptall}");
        if (param1.type != "WME_CLICK") {
            return;
        }
        FriendRequestsView._log.info("Accept all clicked");
        this.acceptAllRequests();
    };

    private refresh(): void {
        this.refreshButtons();
    }

    private refreshButtons(): void {
        let _loc1_: any = this._friendList.friendRequests.getCountOfOpenRequests() > 0;
        this.setEnabled(this._SafeStr_5534, _loc1_);
        this.setEnabled(this._SafeStr_5688, _loc1_);
    }

    private setEnabled(param1: IContainerButtonWindow, param2: boolean): void {
        if (!param1) {
            return;
        }
        if (param2) {
            param1.enable();
        } else {
            param1.disable();
        }
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (FriendRequestsView.#staticsReady) return;
        FriendRequestsView.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(FriendRequestsView, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.habbo.friendlist.FriendRequestsView"));
    }

    get [IFriendRequestsView](): true {
        return true;
    }
}
