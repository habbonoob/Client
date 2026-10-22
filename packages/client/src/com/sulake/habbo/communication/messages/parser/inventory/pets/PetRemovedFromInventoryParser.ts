import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class PetRemovedFromInventoryParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.inventory.pets::PetRemovedFromInventoryParser'); }

    constructor() {
    }

    declare private _petId: number;
    static { (this.prototype as any)._petId = 0; }

    public get petId(): number {
        return this._petId;
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._petId = param1.readInteger();
        return true;
    }
}
