import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class QuizDataMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.help::QuizDataMessageParser'); }

    constructor() {
    }

    declare private _questionIds: any[];

    declare private _quizCode: string;

    public get quizCode(): string {
        return this._quizCode;
    }

    public get questionIds(): any[] {
        return this._questionIds;
    }

    public flush(): boolean {
        this._quizCode = null;
        this._questionIds = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        this._quizCode = param1.readString();
        this._questionIds = [];
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._questionIds.push(param1.readInteger());
            _loc3_++;
        }
        return true;
    }
}
