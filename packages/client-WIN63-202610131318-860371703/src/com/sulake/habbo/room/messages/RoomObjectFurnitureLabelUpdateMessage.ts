import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomObjectUpdateMessage } from '@/com/sulake/room/messages/RoomObjectUpdateMessage';

export class RoomObjectFurnitureLabelUpdateMessage extends RoomObjectUpdateMessage {
    static { registerClassName(this, 'com.sulake.habbo.room.messages::RoomObjectFurnitureLabelUpdateMessage'); }

    declare private _text: string;

    declare private _bubbleColor: number;
    static { (this.prototype as any)._bubbleColor = 0; }

    declare private _SafeStr_14800: number;
    static { (this.prototype as any)._SafeStr_14800 = 0; }

    declare private _alwaysOpen: boolean;
    static { (this.prototype as any)._alwaysOpen = false; }

    constructor(param1: string, param2: number = 4278912, param3: number = 1, param4: boolean = false) {
        super(null, null);
        this._text = param1;
        this._bubbleColor = param2;
        this._SafeStr_14800 = param3;
        this._alwaysOpen = param4;
    }

    public get text(): string {
        return this._text;
    }

    public get bubbleColor(): number {
        return this._bubbleColor;
    }

    public get visibility(): number {
        return this._SafeStr_14800;
    }

    public get alwaysOpen(): boolean {
        return this._alwaysOpen;
    }
}
