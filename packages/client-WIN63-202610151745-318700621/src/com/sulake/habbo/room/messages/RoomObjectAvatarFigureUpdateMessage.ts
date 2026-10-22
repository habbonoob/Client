import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomObjectUpdateStateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectUpdateStateMessage';

export class RoomObjectAvatarFigureUpdateMessage extends RoomObjectUpdateStateMessage {
    static { registerClassName(this, 'com.sulake.habbo.room.messages::RoomObjectAvatarFigureUpdateMessage'); }

    declare private _figure: string;

    declare private _race: string;

    declare private _gender: string;

    declare private _isRiding: boolean;
    static { (this.prototype as any)._isRiding = false; }

    constructor(param1: string, param2: string = null, param3: string = null, param4: boolean = false) {
        super();
        this._figure = param1;
        this._gender = param2;
        this._race = param3;
        this._isRiding = param4;
    }

    public get figure(): string {
        return this._figure;
    }

    public get race(): string {
        return this._race;
    }

    public get gender(): string {
        return this._gender;
    }

    public get isRiding(): boolean {
        return this._isRiding;
    }
}
