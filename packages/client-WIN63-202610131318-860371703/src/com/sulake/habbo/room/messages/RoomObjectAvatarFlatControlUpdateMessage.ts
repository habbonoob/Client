import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomObjectUpdateStateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectUpdateStateMessage';

export class RoomObjectAvatarFlatControlUpdateMessage extends RoomObjectUpdateStateMessage {
    static { registerClassName(this, 'com.sulake.habbo.room.messages::RoomObjectAvatarFlatControlUpdateMessage'); }

    private _isAdmin: boolean = false;

    declare private _rawData: string;

    constructor(param1: string) {
        super();
        this._rawData = param1;
    }

    public get isAdmin(): boolean {
        return this._isAdmin;
    }

    public get rawData(): string {
        return this._rawData;
    }
}
