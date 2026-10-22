import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { PetFigureUpdateMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/pets/PetFigureUpdateMessageParser';

export class PetFigureUpdateEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.pets::PetFigureUpdateEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, PetFigureUpdateMessageParser);
    }

    public getParser(): PetFigureUpdateMessageParser {
        return this._parser instanceof PetFigureUpdateMessageParser ? this._parser : null;
    }
}
