import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomObjectUpdateMessage } from '@/com/sulake/room/messages/RoomObjectUpdateMessage';

export class RoomObjectFurnitureTransparencyUpdateMessage extends RoomObjectUpdateMessage {
    static { registerClassName(this, 'com.sulake.habbo.room.messages::RoomObjectFurnitureTransparencyUpdateMessage'); }

    declare private _SafeStr_14813: number;
    static { (this.prototype as any)._SafeStr_14813 = 0; }

    declare private _SafeStr_14431: boolean;
    static { (this.prototype as any)._SafeStr_14431 = false; }

    declare private _easingMode: number;
    static { (this.prototype as any)._easingMode = 0; }

    declare private _SafeStr_14816: boolean;
    static { (this.prototype as any)._SafeStr_14816 = false; }

    constructor(param1: number, param2: boolean, param3: number, param4: boolean = false) {
        super(null, null);
        this._SafeStr_14813 = param1;
        this._SafeStr_14431 = param2;
        this._easingMode = param3;
        this._SafeStr_14816 = param4;
    }

    public get transparency(): number {
        return this._SafeStr_14813;
    }

    public get allowClickThrough(): boolean {
        return this._SafeStr_14431;
    }

    public get easingMode(): number {
        return this._easingMode;
    }

    public get initialize(): boolean {
        return this._SafeStr_14816;
    }
}
