import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { PetExperienceParser } from '@/com/sulake/habbo/communication/messages/parser/room/pets/PetExperienceParser';

export class PetExperienceEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.pets::PetExperienceEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, PetExperienceParser);
    }

    public getParser(): PetExperienceParser {
        return this._parser instanceof PetExperienceParser ? this._parser : null;
    }
}
