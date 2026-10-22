import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { PetBreedingResultMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/pets/PetBreedingResultMessageParser';

export class PetBreedingResultEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.pets::PetBreedingResultEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, PetBreedingResultMessageParser);
    }

    public getParser(): PetBreedingResultMessageParser {
        return this._parser instanceof PetBreedingResultMessageParser ? this._parser : null;
    }
}
