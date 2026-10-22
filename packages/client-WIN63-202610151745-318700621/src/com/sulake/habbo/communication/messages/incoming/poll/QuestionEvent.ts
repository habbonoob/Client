import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { QuestionParser } from '@/com/sulake/habbo/communication/messages/parser/poll/QuestionParser';

export class QuestionEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.poll::QuestionEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, QuestionParser);
    }

    public getParser(): QuestionParser {
        return this._parser instanceof QuestionParser ? this._parser : null;
    }
}
