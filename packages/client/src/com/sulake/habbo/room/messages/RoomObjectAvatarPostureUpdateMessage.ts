import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomObjectUpdateStateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectUpdateStateMessage';

export class RoomObjectAvatarPostureUpdateMessage extends RoomObjectUpdateStateMessage {
    static { registerClassName(this, 'com.sulake.habbo.room.messages::RoomObjectAvatarPostureUpdateMessage'); }

    constructor(param1: string, param2: string = "") {
        super();
        this._postureType = param1;
        this._parameter = param2;
    }

    declare private _postureType: string;

    declare private _parameter: string;

    public get postureType(): string {
        return this._postureType;
    }

    public get parameter(): string {
        return this._parameter;
    }
}
