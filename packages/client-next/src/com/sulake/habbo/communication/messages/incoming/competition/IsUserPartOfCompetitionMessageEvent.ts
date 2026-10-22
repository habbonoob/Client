import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { IsUserPartOfCompetitionMessageParser } from '@/com/sulake/habbo/communication/messages/parser/competition/IsUserPartOfCompetitionMessageParser';

export class IsUserPartOfCompetitionMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.competition::IsUserPartOfCompetitionMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, IsUserPartOfCompetitionMessageParser);
    }

    public getParser(): IsUserPartOfCompetitionMessageParser {
        return this._parser instanceof IsUserPartOfCompetitionMessageParser ? this._parser : null;
    }
}
