import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { PetFigureData } from '@/com/sulake/habbo/communication/messages/parser/inventory/pets/PetFigureData';

export class PetLevelNotificationParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.notifications::PetLevelNotificationParser'); }

    constructor() {
    }

    declare private _petId: number;
    static { (this.prototype as any)._petId = 0; }

    declare private _petName: string;

    declare private _level: number;
    static { (this.prototype as any)._level = 0; }

    declare private _figureData: PetFigureData;

    public get petId(): number {
        return this._petId;
    }

    public get petName(): string {
        return this._petName;
    }

    public get level(): number {
        return this._level;
    }

    public get figureData(): PetFigureData {
        return this._figureData;
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._petId = param1.readInteger();
        this._petName = param1.readString();
        this._level = param1.readInteger();
        this._figureData = new PetFigureData(param1);
        return true;
    }
}
