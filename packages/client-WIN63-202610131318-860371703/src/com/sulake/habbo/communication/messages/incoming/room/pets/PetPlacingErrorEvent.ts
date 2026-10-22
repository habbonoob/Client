import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { PetPlacingErrorParser } from '@/com/sulake/habbo/communication/messages/parser/room/pets/PetPlacingErrorParser';

export class PetPlacingErrorEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.pets::PetPlacingErrorEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, PetPlacingErrorParser);
    }

    public getParser(): PetPlacingErrorParser {
        return this._parser instanceof PetPlacingErrorParser ? this._parser : null;
    }
}
