import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { PetFigureData } from '@/com/sulake/habbo/communication/messages/parser/inventory/pets/PetFigureData';

export class PetData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.inventory.pets::PetData'); }

    constructor(param1: IMessageDataWrapper) {
        this._id = param1.readInteger();
        this._name = param1.readString();
        this._figureData = new PetFigureData(param1);
        this._level = param1.readInteger();
    }

    declare private _id: number;
    static { (this.prototype as any)._id = 0; }

    declare private _figureData: PetFigureData;

    declare private _level: number;
    static { (this.prototype as any)._level = 0; }

    declare private _name: string;

    public get name(): string {
        return this._name;
    }

    public get id(): number {
        return this._id;
    }

    public get typeId(): number {
        return this._figureData.typeId;
    }

    public get paletteId(): number {
        return this._figureData.paletteId;
    }

    public get color(): string {
        return this._figureData.color;
    }

    public get breedId(): number {
        return this._figureData.breedId;
    }

    public get customPartCount(): number {
        return this._figureData.customPartCount;
    }

    public get figureString(): string {
        return this._figureData.figureString;
    }

    public get figureData(): PetFigureData {
        return this._figureData;
    }

    public get level(): number {
        return this._level;
    }
}
