import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { ConfirmBreedingRequestParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/pets/ConfirmBreedingRequestParser';

export class ConfirmBreedingRequestEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.inventory.pets::ConfirmBreedingRequestEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, ConfirmBreedingRequestParser);
    }

    public getParser(): ConfirmBreedingRequestParser {
        return this._parser instanceof ConfirmBreedingRequestParser ? this._parser : null;
    }
}
