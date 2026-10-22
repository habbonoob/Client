import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomObjectUpdateStateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectUpdateStateMessage';

export class RoomObjectAvatarGestureUpdateMessage extends RoomObjectUpdateStateMessage {
    static { registerClassName(this, 'com.sulake.habbo.room.messages::RoomObjectAvatarGestureUpdateMessage'); }

    private _gesture: number = 0;

    constructor(param1: number) {
        super();
        this._gesture = param1;
    }

    public get gesture(): number {
        return this._gesture;
    }
}
