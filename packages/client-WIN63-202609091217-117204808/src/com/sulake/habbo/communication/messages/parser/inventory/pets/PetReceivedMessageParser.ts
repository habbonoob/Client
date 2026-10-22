import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { PetData } from '@/com/sulake/habbo/communication/messages/parser/inventory/pets/PetData';

export class PetReceivedMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.inventory.pets::PetReceivedMessageParser'); }

    declare private _boughtAsGift: boolean;
    static { (this.prototype as any)._boughtAsGift = false; }

    declare private _pet: PetData;

    constructor() {
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._boughtAsGift = param1.readBoolean();
        this._pet = new PetData(param1);
        return true;
    }

    public get boughtAsGift(): boolean {
        return this._boughtAsGift;
    }

    public get pet(): PetData {
        return this._pet;
    }
}
