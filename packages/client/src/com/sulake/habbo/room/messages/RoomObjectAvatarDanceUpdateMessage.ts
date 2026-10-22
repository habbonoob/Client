import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomObjectUpdateStateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectUpdateStateMessage';

export class RoomObjectAvatarDanceUpdateMessage extends RoomObjectUpdateStateMessage {
    static { registerClassName(this, 'com.sulake.habbo.room.messages::RoomObjectAvatarDanceUpdateMessage'); }

    constructor(param1: number = 0) {
        super();
        this._danceStyle = param1;
    }

    declare private _danceStyle: number;
    static { (this.prototype as any)._danceStyle = 0; }

    public get danceStyle(): number {
        return this._danceStyle;
    }
}
