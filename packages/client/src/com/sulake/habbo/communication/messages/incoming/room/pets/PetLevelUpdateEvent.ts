import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { PetLevelUpdateMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/pets/PetLevelUpdateMessageParser';

export class PetLevelUpdateEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.pets::PetLevelUpdateEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, PetLevelUpdateMessageParser);
    }

    public getParser(): PetLevelUpdateMessageParser {
        return this._parser instanceof PetLevelUpdateMessageParser ? this._parser : null;
    }
}
