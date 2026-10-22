import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomObjectUpdateStateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectUpdateStateMessage';

export class RoomObjectAvatarUseObjectUpdateMessage extends RoomObjectUpdateStateMessage {
    static { registerClassName(this, 'com.sulake.habbo.room.messages::RoomObjectAvatarUseObjectUpdateMessage'); }

    declare private _itemType: number;
    static { (this.prototype as any)._itemType = 0; }

    constructor(param1: number) {
        super();
        this._itemType = param1;
    }

    public get itemType(): number {
        return this._itemType;
    }
}
