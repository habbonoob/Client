import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { QuizResultsMessageParser } from '@/com/sulake/habbo/communication/messages/parser/help/QuizResultsMessageParser';

export class QuizResultsMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.help::QuizResultsMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, QuizResultsMessageParser);
    }

    public getParser(): QuizResultsMessageParser {
        return this._parser instanceof QuizResultsMessageParser ? this._parser : null;
    }
}
