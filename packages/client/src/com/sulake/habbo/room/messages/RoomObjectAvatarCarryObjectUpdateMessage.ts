import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomObjectUpdateStateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectUpdateStateMessage';

export class RoomObjectAvatarCarryObjectUpdateMessage extends RoomObjectUpdateStateMessage {
    static { registerClassName(this, 'com.sulake.habbo.room.messages::RoomObjectAvatarCarryObjectUpdateMessage'); }

    constructor(param1: number, param2: string) {
        super();
        this._itemType = param1;
        this._itemName = param2;
    }

    declare private _itemType: number;
    static { (this.prototype as any)._itemType = 0; }

    public get itemType(): number {
        return this._itemType;
    }

    declare private _itemName: string;

    public get itemName(): string {
        return this._itemName;
    }
}
