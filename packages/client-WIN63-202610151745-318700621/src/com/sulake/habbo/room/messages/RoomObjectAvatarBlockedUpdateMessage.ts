import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomObjectUpdateStateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectUpdateStateMessage';

export class RoomObjectAvatarBlockedUpdateMessage extends RoomObjectUpdateStateMessage {
    static { registerClassName(this, 'com.sulake.habbo.room.messages::RoomObjectAvatarBlockedUpdateMessage'); }

    private _isBlocked: boolean = false;

    constructor(param1: boolean) {
        super();
        this._isBlocked = param1;
    }

    public get isBlocked(): boolean {
        return this._isBlocked;
    }
}
