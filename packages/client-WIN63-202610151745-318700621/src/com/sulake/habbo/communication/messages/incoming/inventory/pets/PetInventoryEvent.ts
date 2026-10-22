import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { PetInventoryMessageParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/pets/PetInventoryMessageParser';

export class PetInventoryEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.inventory.pets::PetInventoryEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, PetInventoryMessageParser);
    }

    public getParser(): PetInventoryMessageParser {
        return this._parser instanceof PetInventoryMessageParser ? this._parser : null;
    }
}
