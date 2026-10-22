import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomObjectUpdateStateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectUpdateStateMessage';

export class RoomObjectAvatarHabbiconUpdateMessage extends RoomObjectUpdateStateMessage {
    static { registerClassName(this, 'com.sulake.habbo.room.messages::RoomObjectAvatarHabbiconUpdateMessage'); }

    declare private _SafeStr_14156: number;
    static { (this.prototype as any)._SafeStr_14156 = 0; }

    constructor(param1: number) {
        super();
        this._SafeStr_14156 = param1;
    }

    public get habbiconId(): number {
        return this._SafeStr_14156;
    }
}
