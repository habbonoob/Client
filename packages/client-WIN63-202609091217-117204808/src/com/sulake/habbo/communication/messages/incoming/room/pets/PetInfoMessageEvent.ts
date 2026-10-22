import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { PetInfoMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/pets/PetInfoMessageParser';

export class PetInfoMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.pets::PetInfoMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, PetInfoMessageParser);
    }

    public getParser(): PetInfoMessageParser {
        return this._parser instanceof PetInfoMessageParser ? this._parser : null;
    }
}
