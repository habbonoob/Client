import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { GuestRoomData } from '@/com/sulake/habbo/communication/messages/incoming/navigator/GuestRoomData';
import type { HabboHelp } from '@/com/sulake/habbo/help/HabboHelp';
import type { RoomSessionChatEvent } from '@/com/sulake/habbo/session/events/RoomSessionChatEvent';
import type { IUserData } from '@/com/sulake/habbo/session/IUserData';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { ChatStyle } from '@/com/sulake/habbo/freeflowchat/HabboFreeFlowChat.group';

export class ChatEventHandler implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.help.cfh.registry.chat::ChatEventHandler'); }

    constructor(param1: HabboHelp) {
        this._component = param1;
        this._component.roomSessionManager.events.addEventListener("RSCE_CHAT_EVENT", this.onRoomChat);
    }

    declare private _component: HabboHelp;

    public get disposed(): boolean {
        return this._component == null;
    }

    public dispose(): void {
        if (!this.disposed) {
            if (this._component) {
                this._component.roomSessionManager.events.removeEventListener("RSCE_CHAT_EVENT", this.onRoomChat);
                this._component = null;
            }
        }
    }

    private onRoomChat = (param1: RoomSessionChatEvent): void => {
        let _loc2_: IUserData = this._component.roomSessionManager.getSession(param1.session.roomId).userDataManager.getUserDataByIndex(param1.userId);
        let _loc3_: GuestRoomData = this._component.navigator.enteredGuestRoomData;
        if (!_loc2_ || _loc2_.type != 1 || !_loc3_) {
            return;
        }
        if (this._component.sessionDataManager.isBlocked(_loc2_.webID)) {
            return;
        }
        let _loc4_: string = _loc3_ ? _loc3_.roomName : "Unknown Room";
        let _loc5_: ChatStyle = asInstanceOf(this._component.freeFlowChat.chatStyleLibrary.getStyle(param1.style), ChatStyle);
        if (!_loc5_.isNotification) {
            this._component.chatRegistry.addItem(param1.session.roomId, _loc4_, _loc2_.webID, _loc2_.name, param1.text);
        }
    };

    get [IDisposable](): true {
        return true;
    }
}
