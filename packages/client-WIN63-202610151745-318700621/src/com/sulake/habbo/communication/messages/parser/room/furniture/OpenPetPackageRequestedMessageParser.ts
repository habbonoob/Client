import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { PetFigureData } from '@/com/sulake/habbo/communication/messages/parser/inventory/pets/PetFigureData';

export class OpenPetPackageRequestedMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.furniture::OpenPetPackageRequestedMessageParser'); }

    private _objectId: number = -1;

    declare private _figureData: PetFigureData;

    constructor() {
    }

    public get objectId(): number {
        return this._objectId;
    }

    public get figureData(): PetFigureData {
        return this._figureData;
    }

    public flush(): boolean {
        this._objectId = -1;
        this._figureData = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        if (param1 == null) {
            return false;
        }
        this._objectId = param1.readInteger();
        if (!param1.bytesAvailable) {
            return true;
        }
        this._figureData = new PetFigureData(param1);
        return true;
    }
}
