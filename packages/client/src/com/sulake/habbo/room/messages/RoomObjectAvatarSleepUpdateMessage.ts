import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomObjectUpdateStateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectUpdateStateMessage';

export class RoomObjectAvatarSleepUpdateMessage extends RoomObjectUpdateStateMessage {
    static { registerClassName(this, 'com.sulake.habbo.room.messages::RoomObjectAvatarSleepUpdateMessage'); }

    constructor(param1: boolean = false) {
        super();
        this._isSleeping = param1;
    }

    declare private _isSleeping: boolean;
    static { (this.prototype as any)._isSleeping = false; }

    public get isSleeping(): boolean {
        return this._isSleeping;
    }
}
