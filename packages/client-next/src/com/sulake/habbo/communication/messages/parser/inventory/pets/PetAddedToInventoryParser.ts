import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { PetData } from '@/com/sulake/habbo/communication/messages/parser/inventory/pets/PetData';

export class PetAddedToInventoryParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.inventory.pets::PetAddedToInventoryParser'); }

    declare private _pet: PetData;

    declare private _SafeStr_6175: boolean;
    static { (this.prototype as any)._SafeStr_6175 = false; }

    constructor() {
    }

    public flush(): boolean {
        this._pet = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._pet = new PetData(param1);
        this._SafeStr_6175 = param1.readBoolean();
        return true;
    }

    public get pet(): PetData {
        return this._pet;
    }

    public openInventory(): boolean {
        return this._SafeStr_6175;
    }
}
