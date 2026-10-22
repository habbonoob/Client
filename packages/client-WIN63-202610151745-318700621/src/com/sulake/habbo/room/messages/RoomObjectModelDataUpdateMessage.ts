import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomObjectUpdateMessage } from '@/com/sulake/room/messages/RoomObjectUpdateMessage';

export class RoomObjectModelDataUpdateMessage extends RoomObjectUpdateMessage {
    static { registerClassName(this, 'com.sulake.habbo.room.messages::RoomObjectModelDataUpdateMessage'); }

    declare private _numberKey: string;

    declare private _numberValue: number;
    static { (this.prototype as any)._numberValue = 0; }

    constructor(param1: string, param2: number) {
        super(null, null);
        this._numberKey = param1;
        this._numberValue = param2;
    }

    public get numberKey(): string {
        return this._numberKey;
    }

    public get numberValue(): number {
        return this._numberValue;
    }
}
