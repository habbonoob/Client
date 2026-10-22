import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomObjectUpdateStateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectUpdateStateMessage';

export class RoomObjectAvatarMutedUpdateMessage extends RoomObjectUpdateStateMessage {
    static { registerClassName(this, 'com.sulake.habbo.room.messages::RoomObjectAvatarMutedUpdateMessage'); }

    constructor(param1: boolean = false) {
        super();
        this._isMuted = param1;
    }

    declare private _isMuted: boolean;
    static { (this.prototype as any)._isMuted = false; }

    public get isMuted(): boolean {
        return this._isMuted;
    }
}
