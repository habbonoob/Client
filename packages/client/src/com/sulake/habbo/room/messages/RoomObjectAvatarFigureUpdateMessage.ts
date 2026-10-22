import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomObjectUpdateStateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectUpdateStateMessage';

export class RoomObjectAvatarFigureUpdateMessage extends RoomObjectUpdateStateMessage {
    static { registerClassName(this, 'com.sulake.habbo.room.messages::RoomObjectAvatarFigureUpdateMessage'); }

    constructor(param1: string, param2: string = null, param3: string = null, param4: boolean = false) {
        super();
        this._figure = param1;
        this._gender = param2;
        this._race = param3;
        this._isRiding = param4;
    }

    declare private _figure: string;

    public get figure(): string {
        return this._figure;
    }

    declare private _race: string;

    public get race(): string {
        return this._race;
    }

    declare private _gender: string;

    public get gender(): string {
        return this._gender;
    }

    declare private _isRiding: boolean;
    static { (this.prototype as any)._isRiding = false; }

    public get isRiding(): boolean {
        return this._isRiding;
    }
}
