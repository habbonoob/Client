import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomObjectUpdateMessage } from '@/com/sulake/room/messages/RoomObjectUpdateMessage';

export class RoomObjectItemDataUpdateMessage extends RoomObjectUpdateMessage {
    static { registerClassName(this, 'com.sulake.habbo.room.messages::RoomObjectItemDataUpdateMessage'); }

    constructor(param1: string) {
        super(null, null);
        this._itemData = param1;
    }

    declare private _itemData: string;

    public get itemData(): string {
        return this._itemData;
    }
}
