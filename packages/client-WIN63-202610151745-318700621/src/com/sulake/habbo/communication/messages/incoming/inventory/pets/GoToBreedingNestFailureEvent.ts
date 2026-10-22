import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { GoToBreedingNestFailureParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/pets/GoToBreedingNestFailureParser';

export class GoToBreedingNestFailureEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.inventory.pets::GoToBreedingNestFailureEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, GoToBreedingNestFailureParser);
    }

    public getParser(): GoToBreedingNestFailureParser {
        return this._parser instanceof GoToBreedingNestFailureParser ? this._parser : null;
    }
}
