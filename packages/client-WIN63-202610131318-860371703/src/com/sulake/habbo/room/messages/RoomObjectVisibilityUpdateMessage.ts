import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomObjectUpdateMessage } from '@/com/sulake/room/messages/RoomObjectUpdateMessage';

export class RoomObjectVisibilityUpdateMessage extends RoomObjectUpdateMessage {
    static { registerClassName(this, 'com.sulake.habbo.room.messages::RoomObjectVisibilityUpdateMessage'); }

    public static readonly _SafeStr_7571: string = "ROVUM_ENABLED";
    public static readonly _SafeStr_7819: string = "ROVUM_DISABLED";

    declare private _type: string;

    constructor(param1: string) {
        super(null, null);
        this._type = param1;
    }

    public get type(): string {
        return this._type;
    }
}
