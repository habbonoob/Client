import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { PetStatusUpdateMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/pets/PetStatusUpdateMessageParser';

export class PetStatusUpdateEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.pets::PetStatusUpdateEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, PetStatusUpdateMessageParser);
    }

    public getParser(): PetStatusUpdateMessageParser {
        return this._parser instanceof PetStatusUpdateMessageParser ? this._parser : null;
    }
}
