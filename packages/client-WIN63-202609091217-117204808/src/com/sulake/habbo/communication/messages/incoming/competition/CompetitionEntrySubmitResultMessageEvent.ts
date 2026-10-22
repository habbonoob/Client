import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { CompetitionEntrySubmitResultMessageParser } from '@/com/sulake/habbo/communication/messages/parser/competition/CompetitionEntrySubmitResultMessageParser';

export class CompetitionEntrySubmitResultMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.competition::CompetitionEntrySubmitResultMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, CompetitionEntrySubmitResultMessageParser);
    }

    public getParser(): CompetitionEntrySubmitResultMessageParser {
        return this._parser instanceof CompetitionEntrySubmitResultMessageParser ? this._parser : null;
    }
}
