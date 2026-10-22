import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { PetFigureData } from '@/com/sulake/habbo/communication/messages/parser/inventory/pets/PetFigureData';

export class PetFigureUpdateMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.pets::PetFigureUpdateMessageParser'); }

    declare private _roomIndex: number;
    static { (this.prototype as any)._roomIndex = 0; }

    declare private _petId: number;
    static { (this.prototype as any)._petId = 0; }

    declare private _figureData: PetFigureData;

    declare private _SafeStr_6702: boolean;
    static { (this.prototype as any)._SafeStr_6702 = false; }

    declare private _isRiding: boolean;
    static { (this.prototype as any)._isRiding = false; }

    constructor() {
    }

    public get roomIndex(): number {
        return this._roomIndex;
    }

    public get petId(): number {
        return this._petId;
    }

    public get figureData(): PetFigureData {
        return this._figureData;
    }

    public get hasSaddle(): boolean {
        return this._SafeStr_6702;
    }

    public get isRiding(): boolean {
        return this._isRiding;
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._roomIndex = param1.readInteger();
        this._petId = param1.readInteger();
        this._figureData = new PetFigureData(param1);
        this._SafeStr_6702 = param1.readBoolean();
        this._isRiding = param1.readBoolean();
        return true;
    }
}
