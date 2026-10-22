import { castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowKeyboardEvent } from '@/com/sulake/core/window/events/WindowKeyboardEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboFriendList } from '@/com/sulake/habbo/friendlist/HabboFriendList';
import { isITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import { SendRoomInviteMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/friendlist/SendRoomInviteMessageComposer';
import { AlertView } from '@/com/sulake/habbo/friendlist/AlertView';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class RoomInviteView extends AlertView {
    static { registerClassName(this, 'com.sulake.habbo.friendlist::RoomInviteView'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        RoomInviteView.#initStatics();
        return RoomInviteView._log;
    }

    constructor(param1: HabboFriendList) {
        super(param1, "room_invite_confirm");
        this._selected = param1.categories.getSelectedFriends();
    }

    declare private _selected: any[];

    declare private _inputMessage: ITextFieldWindow;

    public override dispose(): void {
        this._selected = null;
        this._inputMessage = null;
        super.dispose();
    }

    public override setupContent(param1: IWindowContainer): void {
        this.friendList.registerParameter("friendlist.invite.summary", "count", "" + this._selected.length);
        this._inputMessage = castGuarded(param1.findChildByName("message_input"), isITextFieldWindow, "com.sulake.core.window.components.ITextFieldWindow");
        this._inputMessage.addEventListener("WKE_KEY_DOWN", this.onMessageInput);
        param1.findChildByName("cancel").procedure = this.onClose;
        param1.findChildByName("ok").procedure = this.onInvite;
    }

    private onInvite = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        RoomInviteView._log.info("Invite Ok clicked");
        this.sendMsg();
        this.dispose();
    };

    private onMessageInput = (param1: WindowKeyboardEvent): void => {
        let _loc2_: number = 0;
        let _loc3_: string = null;
        let _loc4_: IWindow = param1.target;
        RoomInviteView._log.info("Test key event " + param1 + ", " + param1.type + " " + _loc4_.name);
        if (param1.charCode == 13) {
            this.sendMsg();
        } else {
            _loc2_ = 120;
            _loc3_ = this._inputMessage.text;
            if (_loc3_.length > _loc2_) {
                this._inputMessage.text = _loc3_.substring(0, _loc2_);
            }
        }
    };

    private sendMsg(): void {
        let _loc3_: string = this._inputMessage.text;
        RoomInviteView._log.info("Send msg: " + _loc3_);
        if (_loc3_ == "") {
            this.friendList.simpleAlert("${friendlist.invite.emptyalert.title}", "${friendlist.invite.emptyalert.text}");
            return;
        }
        let _loc1_: SendRoomInviteMessageComposer = new SendRoomInviteMessageComposer(_loc3_);
        for (const _loc2_ of this._selected ?? []) {
            _loc1_.addInvitedFriend(_loc2_.id | 0);
        }
        this.friendList.resetLastRoomInvitationTime();
        this.friendList.send(_loc1_);
        this.dispose();
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (RoomInviteView.#staticsReady) return;
        RoomInviteView.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(RoomInviteView, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.habbo.friendlist.RoomInviteView"));
    }
}
