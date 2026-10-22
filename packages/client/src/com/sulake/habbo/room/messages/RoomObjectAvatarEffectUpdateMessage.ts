import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomObjectUpdateStateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectUpdateStateMessage';

export class RoomObjectAvatarEffectUpdateMessage extends RoomObjectUpdateStateMessage {
    static { registerClassName(this, 'com.sulake.habbo.room.messages::RoomObjectAvatarEffectUpdateMessage'); }

    constructor(param1: number = 0, param2: number = 0) {
        super();
        this._effect = param1;
        this._delayMilliseconds = param2;
    }

    declare private _delayMilliseconds: number;
    static { (this.prototype as any)._delayMilliseconds = 0; }

    declare private _effect: number;
    static { (this.prototype as any)._effect = 0; }

    public get effect(): number {
        return this._effect;
    }

    public get delayMilliSeconds(): number {
        return this._delayMilliseconds;
    }
}
