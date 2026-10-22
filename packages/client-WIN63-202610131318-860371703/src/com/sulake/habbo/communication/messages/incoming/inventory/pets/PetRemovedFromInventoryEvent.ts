import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { PetRemovedFromInventoryParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/pets/PetRemovedFromInventoryParser';

export class PetRemovedFromInventoryEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.inventory.pets::PetRemovedFromInventoryEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, PetRemovedFromInventoryParser);
    }

    public getParser(): PetRemovedFromInventoryParser {
        return this._parser instanceof PetRemovedFromInventoryParser ? this._parser : null;
    }
}
