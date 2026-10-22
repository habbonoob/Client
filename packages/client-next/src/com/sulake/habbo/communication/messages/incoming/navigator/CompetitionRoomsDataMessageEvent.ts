import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { CompetitionRoomsDataMessageParser } from '@/com/sulake/habbo/communication/messages/parser/navigator/CompetitionRoomsDataMessageParser';

export class CompetitionRoomsDataMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.navigator::CompetitionRoomsDataMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, CompetitionRoomsDataMessageParser);
    }

    public getParser(): CompetitionRoomsDataMessageParser {
        return this._parser instanceof CompetitionRoomsDataMessageParser ? this._parser : null;
    }
}
