import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { QuizDataMessageParser } from '@/com/sulake/habbo/communication/messages/parser/help/QuizDataMessageParser';

export class QuizDataMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.help::QuizDataMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, QuizDataMessageParser);
    }

    public getParser(): QuizDataMessageParser {
        return this._parser instanceof QuizDataMessageParser ? this._parser : null;
    }
}
