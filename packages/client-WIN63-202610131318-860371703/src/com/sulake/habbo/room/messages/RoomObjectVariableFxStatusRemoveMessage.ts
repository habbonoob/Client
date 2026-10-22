import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomObjectUpdateMessage } from '@/com/sulake/room/messages/RoomObjectUpdateMessage';

export class RoomObjectVariableFxStatusRemoveMessage extends RoomObjectUpdateMessage {
    static { registerClassName(this, 'com.sulake.habbo.room.messages::RoomObjectVariableFxStatusRemoveMessage'); }

    declare private _SafeStr_14649: number;
    static { (this.prototype as any)._SafeStr_14649 = 0; }

    declare private _SafeStr_7039: string;

    constructor(param1: number, param2: string) {
        super(null, null);
        this._SafeStr_14649 = param1;
        this._SafeStr_7039 = param2;
    }

    public get configId(): number {
        return this._SafeStr_14649;
    }

    public get variableId(): string {
        return this._SafeStr_7039;
    }
}
