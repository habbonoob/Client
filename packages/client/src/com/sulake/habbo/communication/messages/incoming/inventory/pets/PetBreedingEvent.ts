import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { PetBreedingMessageParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/pets/PetBreedingMessageParser';

export class PetBreedingEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.inventory.pets::PetBreedingEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, PetBreedingMessageParser);
    }

    public getParser(): PetBreedingMessageParser {
        return this._parser instanceof PetBreedingMessageParser ? this._parser : null;
    }
}
