import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { PetRespectFailedParser } from '@/com/sulake/habbo/communication/messages/parser/room/pets/PetRespectFailedParser';

export class PetRespectFailedEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.pets::PetRespectFailedEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, PetRespectFailedParser);
    }

    public getParser(): PetRespectFailedParser {
        return this._parser instanceof PetRespectFailedParser ? this._parser : null;
    }
}
