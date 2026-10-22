import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class FaqTextMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.help::FaqTextMessageParser'); }

    constructor() {
    }

    declare private _questionId: number;
    static { (this.prototype as any)._questionId = 0; }

    declare private _answerText: string;

    public get questionId(): number {
        return this._questionId;
    }

    public get answerText(): string {
        return this._answerText;
    }

    public flush(): boolean {
        this._questionId = -1;
        this._answerText = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._questionId = param1.readInteger();
        this._answerText = param1.readString();
        return true;
    }
}
