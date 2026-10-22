import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomObjectUpdateStateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectUpdateStateMessage';

export class RoomObjectAvatarPlayerValueUpdateMessage extends RoomObjectUpdateStateMessage {
    static { registerClassName(this, 'com.sulake.habbo.room.messages::RoomObjectAvatarPlayerValueUpdateMessage'); }

    constructor(param1: number) {
        super();
        this._value = param1;
    }

    declare private _value: number;
    static { (this.prototype as any)._value = 0; }

    public get value(): number {
        return this._value;
    }
}
