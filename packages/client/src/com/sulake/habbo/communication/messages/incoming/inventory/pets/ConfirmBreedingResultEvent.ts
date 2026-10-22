import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { ConfirmBreedingResultParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/pets/ConfirmBreedingResultParser';

export class ConfirmBreedingResultEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.inventory.pets::ConfirmBreedingResultEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, ConfirmBreedingResultParser);
    }

    public getParser(): ConfirmBreedingResultParser {
        return this._parser instanceof ConfirmBreedingResultParser ? this._parser : null;
    }
}
