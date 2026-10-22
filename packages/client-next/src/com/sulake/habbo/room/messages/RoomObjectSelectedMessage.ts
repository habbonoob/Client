import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomObjectUpdateStateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectUpdateStateMessage';

export class RoomObjectSelectedMessage extends RoomObjectUpdateStateMessage {
    static { registerClassName(this, 'com.sulake.habbo.room.messages::RoomObjectSelectedMessage'); }

    declare private _selected: boolean;
    static { (this.prototype as any)._selected = false; }

    constructor(param1: boolean) {
        super();
        this._selected = param1;
    }

    public get selected(): boolean {
        return this._selected;
    }
}
