import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { HabboFreeFlowChat } from '@/com/sulake/habbo/freeflowchat/HabboFreeFlowChat';
import type { GameChatEvent } from '@/com/sulake/habbo/game/events/GameChatEvent';
import type { IUserData } from '@/com/sulake/habbo/session/IUserData';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import type { IVector3d } from '@/com/sulake/room/utils/IVector3d';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { ChatItem } from '@/com/sulake/habbo/freeflowchat/data/ChatItem';
import { RoomSessionChatEvent } from '@/com/sulake/habbo/session/events/RoomSessionChatEvent';

export class ChatEventHandler implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.freeflowchat.data::ChatEventHandler'); }

    public static readonly CHAT_STYLE_SNOWWAR_RED: number = 120;
    public static readonly CHAT_STYLE_SNOWWAR_BLUE: number = 121;

    declare private _component: HabboFreeFlowChat;

    private _SafeStr_6863: number = 0;
    private _SafeStr_4731: number = 0;

    constructor(param1: HabboFreeFlowChat) {
        this._component = param1;
        this._component.roomSessionManager.events.addEventListener("RSCE_CHAT_EVENT", this.onRoomChat);
        if (this._component.gameManager) {
            this._component.gameManager.events.addEventListener("gce_game_chat", this.gameEventHandler);
        }
    }

    public dispose(): void {
        if (!this.disposed) {
            if (this._component) {
                this._component.roomSessionManager.events.removeEventListener("RSCE_CHAT_EVENT", this.onRoomChat);
                this._component.gameManager.events.removeEventListener("gce_game_chat", this.gameEventHandler);
                this._component = null;
            }
        }
    }

    public get disposed(): boolean {
        return this._component == null;
    }

    private onRoomChat = (param1: RoomSessionChatEvent): void => {
        let _loc3_: IUserData = this._component.roomSessionManager.getSession(param1.session.roomId).userDataManager.getUserDataByIndex(param1.userId);
        if (_loc3_ != null && this._component.sessionDataManager.isBlocked(_loc3_.webID)) {
            return;
        }
        let _loc4_: IRoomObject = this._component.roomEngine.getRoomObject(param1.session.roomId, param1.userId, 100);
        let _loc5_: IVector3d = null;
        if (_loc4_ != null) {
            _loc5_ = _loc4_.getLocation();
        }
        let _loc2_: number = getTimer() >>> 0;
        if (_loc2_ == this._SafeStr_6863) {
            this._SafeStr_4731 = this._SafeStr_4731 + 1 >>> 0;
        } else {
            this._SafeStr_4731 = 0;
        }
        this._component.insertChat(new ChatItem(param1, _loc2_ + this._SafeStr_4731, _loc5_, param1.extraParam));
        this._SafeStr_6863 = _loc2_;
    };

    private gameEventHandler = (param1: GameChatEvent): void => {
        let _loc3_: number = param1.teamId == 1 ? 121 : 120;
        let _loc2_: RoomSessionChatEvent = new RoomSessionChatEvent("RSCE_CHAT_EVENT", null, param1.userId, param1.message, 0, _loc3_);
        this._component.insertChat(new ChatItem(_loc2_, getTimer(), null, 0, param1.locX, param1.color, param1.figure, param1.name));
    };

    get [IDisposable](): true {
        return true;
    }
}
