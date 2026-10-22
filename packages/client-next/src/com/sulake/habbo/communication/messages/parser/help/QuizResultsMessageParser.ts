import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class QuizResultsMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.help::QuizResultsMessageParser'); }

    declare private _quizCode: string;

    declare private _questionIdsForWrongAnswers: any[];

    constructor() {
    }

    public flush(): boolean {
        this._quizCode = null;
        this._questionIdsForWrongAnswers = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc2_: number = 0;
        this._quizCode = param1.readString();
        this._questionIdsForWrongAnswers = [];
        let _loc3_: number = param1.readInteger();
        _loc2_ = 0;
        while (_loc2_ < _loc3_) {
            this._questionIdsForWrongAnswers.push(param1.readInteger());
            _loc2_++;
        }
        return true;
    }

    public get quizCode(): string {
        return this._quizCode;
    }

    public get questionIdsForWrongAnswers(): any[] {
        return this._questionIdsForWrongAnswers;
    }
}
