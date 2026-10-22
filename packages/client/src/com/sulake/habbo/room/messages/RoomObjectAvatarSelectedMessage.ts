import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomObjectUpdateStateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectUpdateStateMessage';

export class RoomObjectAvatarSelectedMessage extends RoomObjectUpdateStateMessage {
    static { registerClassName(this, 'com.sulake.habbo.room.messages::RoomObjectAvatarSelectedMessage'); }

    constructor(param1: boolean) {
        super();
        this._selected = param1;
    }

    declare private _selected: boolean;
    static { (this.prototype as any)._selected = false; }

    public get selected(): boolean {
        return this._selected;
    }
}
