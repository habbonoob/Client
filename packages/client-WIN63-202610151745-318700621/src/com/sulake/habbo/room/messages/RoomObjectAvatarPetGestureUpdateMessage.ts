import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomObjectUpdateStateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectUpdateStateMessage';

export class RoomObjectAvatarPetGestureUpdateMessage extends RoomObjectUpdateStateMessage {
    static { registerClassName(this, 'com.sulake.habbo.room.messages::RoomObjectAvatarPetGestureUpdateMessage'); }

    declare private _gesture: string;

    constructor(param1: string) {
        super();
        this._gesture = param1;
    }

    public get gesture(): string {
        return this._gesture;
    }
}
