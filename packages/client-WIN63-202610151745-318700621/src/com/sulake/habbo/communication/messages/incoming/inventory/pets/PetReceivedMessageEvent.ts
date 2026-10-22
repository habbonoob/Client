import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { PetReceivedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/pets/PetReceivedMessageParser';

export class PetReceivedMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.inventory.pets::PetReceivedMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, PetReceivedMessageParser);
    }

    public getParser(): PetReceivedMessageParser {
        return this._parser instanceof PetReceivedMessageParser ? this._parser : null;
    }
}
