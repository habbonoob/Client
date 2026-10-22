import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IStuffData } from '@/com/sulake/habbo/room/IStuffData';
import { ObjectDataParser } from '@/com/sulake/habbo/communication/messages/parser/room/engine/ObjectDataParser';

export class FuseObjectData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.game.snowwar.data::FuseObjectData'); }

    constructor() {
    }

    declare private _id: number;
    static { (this.prototype as any)._id = 0; }

    declare private _SafeStr_2126: number;
    static { (this.prototype as any)._SafeStr_2126 = 0; }

    declare private _y: number;
    static { (this.prototype as any)._y = 0; }

    declare private _xDimension: number;
    static { (this.prototype as any)._xDimension = 0; }

    declare private _yDimension: number;
    static { (this.prototype as any)._yDimension = 0; }

    declare private _height: number;
    static { (this.prototype as any)._height = 0; }

    declare private _direction: number;
    static { (this.prototype as any)._direction = 0; }

    declare private _altitude: number;
    static { (this.prototype as any)._altitude = 0; }

    declare private _canStandOn: boolean;
    static { (this.prototype as any)._canStandOn = false; }

    declare private _stuffData: IStuffData;

    declare private _name: string;

    public get name(): string {
        return this._name;
    }

    public get id(): number {
        return this._id;
    }

    public get x(): number {
        return this._SafeStr_2126;
    }

    public get y(): number {
        return this._y;
    }

    public get xDimension(): number {
        return this._xDimension;
    }

    public get yDimension(): number {
        return this._yDimension;
    }

    public get height(): number {
        return this._height;
    }

    public get direction(): number {
        return this._direction;
    }

    public get altitude(): number {
        return this._altitude;
    }

    public get canStandOn(): boolean {
        return this._canStandOn;
    }

    public get stuffData(): IStuffData {
        return this._stuffData;
    }

    public parse(param1: IMessageDataWrapper): void {
        this._name = param1.readString();
        this._id = param1.readInteger();
        this._SafeStr_2126 = param1.readInteger();
        this._y = param1.readInteger();
        this._xDimension = param1.readInteger();
        this._yDimension = param1.readInteger();
        this._height = param1.readInteger();
        this._direction = param1.readInteger();
        this._altitude = param1.readInteger();
        this._canStandOn = param1.readBoolean();
        this._stuffData = ObjectDataParser.parseStuffData(param1);
    }
}
