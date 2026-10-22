import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { NestBreedingSuccessParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/pets/NestBreedingSuccessParser';

export class NestBreedingSuccessEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.inventory.pets::NestBreedingSuccessEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, NestBreedingSuccessParser);
    }

    public getParser(): NestBreedingSuccessParser {
        return this._parser instanceof NestBreedingSuccessParser ? this._parser : null;
    }
}
