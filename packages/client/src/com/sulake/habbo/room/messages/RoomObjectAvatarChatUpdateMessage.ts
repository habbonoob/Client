import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomObjectUpdateStateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectUpdateStateMessage';

export class RoomObjectAvatarChatUpdateMessage extends RoomObjectUpdateStateMessage {
    static { registerClassName(this, 'com.sulake.habbo.room.messages::RoomObjectAvatarChatUpdateMessage'); }

    constructor(param1: number) {
        super();
        this._numberOfWords = param1;
    }

    declare private _numberOfWords: number;
    static { (this.prototype as any)._numberOfWords = 0; }

    public get numberOfWords(): number {
        return this._numberOfWords;
    }
}
