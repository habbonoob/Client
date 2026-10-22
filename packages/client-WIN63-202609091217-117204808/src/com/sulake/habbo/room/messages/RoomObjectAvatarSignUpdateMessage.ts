import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomObjectUpdateStateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectUpdateStateMessage';

export class RoomObjectAvatarSignUpdateMessage extends RoomObjectUpdateStateMessage {
    static { registerClassName(this, 'com.sulake.habbo.room.messages::RoomObjectAvatarSignUpdateMessage'); }

    declare private _signType: number;
    static { (this.prototype as any)._signType = 0; }

    constructor(param1: number) {
        super();
        this._signType = param1;
    }

    public get signType(): number {
        return this._signType;
    }
}
