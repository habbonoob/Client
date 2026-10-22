import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { PetAddedToInventoryParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/pets/PetAddedToInventoryParser';

export class PetAddedToInventoryEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.inventory.pets::PetAddedToInventoryEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, PetAddedToInventoryParser);
    }

    public getParser(): PetAddedToInventoryParser {
        return this._parser instanceof PetAddedToInventoryParser ? this._parser : null;
    }
}
