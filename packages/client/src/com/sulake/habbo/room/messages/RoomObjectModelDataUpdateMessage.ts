import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomObjectUpdateMessage } from '@/com/sulake/room/messages/RoomObjectUpdateMessage';

export class RoomObjectModelDataUpdateMessage extends RoomObjectUpdateMessage {
    static { registerClassName(this, 'com.sulake.habbo.room.messages::RoomObjectModelDataUpdateMessage'); }

    constructor(param1: string, param2: number) {
        super(null, null);
        this._numberKey = param1;
        this._SafeStr_6050 = param2;
    }

    declare private _SafeStr_6050: number;
    static { (this.prototype as any)._SafeStr_6050 = 0; }

    declare private _numberKey: string;

    public get numberKey(): string {
        return this._numberKey;
    }

    public get numberValue(): number {
        return this._SafeStr_6050;
    }
}
