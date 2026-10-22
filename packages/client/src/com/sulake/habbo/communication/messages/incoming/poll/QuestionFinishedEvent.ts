import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { QuestionFinishedParser } from '@/com/sulake/habbo/communication/messages/parser/poll/QuestionFinishedParser';

export class QuestionFinishedEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.poll::QuestionFinishedEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, QuestionFinishedParser);
    }

    public getParser(): QuestionFinishedParser {
        return this._parser instanceof QuestionFinishedParser ? this._parser : null;
    }
}
