import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';

export class QuestionFinishedParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.poll::QuestionFinishedParser'); }

    declare private _questionId: number;
    static { (this.prototype as any)._questionId = 0; }

    declare private _answerCounts: UtilsMap;

    constructor() {
    }

    public get questionId(): number {
        return this._questionId;
    }

    public get answerCounts(): UtilsMap {
        return this._answerCounts;
    }

    public flush(): boolean {
        this._questionId = -1;
        this._answerCounts = null;
        return false;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        let _loc4_: string = null;
        let _loc2_: number = 0;
        this._questionId = param1.readInteger();
        this._answerCounts = new UtilsMap();
        let _loc5_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc5_) {
            _loc4_ = param1.readString();
            _loc2_ = param1.readInteger();
            this._answerCounts.add(_loc4_, _loc2_);
            _loc3_++;
        }
        return true;
    }
}
