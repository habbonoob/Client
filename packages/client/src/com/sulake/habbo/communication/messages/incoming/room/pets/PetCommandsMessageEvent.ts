import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { PetCommandsMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/pets/PetCommandsMessageParser';

export class PetCommandsMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.pets::PetCommandsMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, PetCommandsMessageParser);
    }

    public getParser(): PetCommandsMessageParser {
        return this._parser instanceof PetCommandsMessageParser ? this._parser : null;
    }
}
