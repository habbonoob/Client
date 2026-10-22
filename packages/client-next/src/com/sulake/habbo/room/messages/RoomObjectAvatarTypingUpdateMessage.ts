import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomObjectUpdateStateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectUpdateStateMessage';

export class RoomObjectAvatarTypingUpdateMessage extends RoomObjectUpdateStateMessage {
    static { registerClassName(this, 'com.sulake.habbo.room.messages::RoomObjectAvatarTypingUpdateMessage'); }

    declare private _isTyping: boolean;
    static { (this.prototype as any)._isTyping = false; }

    constructor(param1: boolean = false) {
        super();
        this._isTyping = param1;
    }

    public get isTyping(): boolean {
        return this._isTyping;
    }
}
