import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { PollChoice } from '@/com/sulake/habbo/communication/messages/parser/poll/PollChoice';
import { PollQuestion } from '@/com/sulake/habbo/communication/messages/parser/poll/PollQuestion';

export class PollContentsParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.poll::PollContentsParser'); }

    constructor() {
    }

    private _id: number = -1;
    private _numQuestions: number = 0;
    private _npsPoll: boolean = false;
    private _startMessage: string = "";

    public get startMessage(): string {
        return this._startMessage;
    }

    private _endMessage: string = "";

    public get endMessage(): string {
        return this._endMessage;
    }

    private _questionArray: any[] = null;

    public get questionArray(): any[] {
        return this._questionArray;
    }

    public get id(): number {
        return this._id;
    }

    public get numQuestions(): number {
        return this._numQuestions;
    }

    public get npsPoll(): boolean {
        return this._npsPoll;
    }

    public flush(): boolean {
        this._id = -1;
        this._startMessage = "";
        this._endMessage = "";
        this._numQuestions = 0;
        this._questionArray = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc2_: number = 0;
        let _loc4_: PollQuestion = null;
        let _loc5_: number = 0;
        let _loc3_: number = 0;
        this._id = param1.readInteger();
        this._startMessage = param1.readString();
        this._endMessage = param1.readString();
        this._numQuestions = param1.readInteger();
        this._questionArray = [];
        _loc2_ = 0;
        while (_loc2_ < this._numQuestions) {
            _loc4_ = this.parseQuestion(param1);
            _loc5_ = param1.readInteger();
            _loc3_ = 0;
            while (_loc3_ < _loc5_) {
                _loc4_.children.push(this.parseQuestion(param1));
                _loc3_++;
            }
            this._questionArray.push(_loc4_);
            _loc2_++;
        }
        this._npsPoll = param1.readBoolean();
        return true;
    }

    private parseQuestion(param1: IMessageDataWrapper): PollQuestion {
        let _loc2_: number = 0;
        let _loc3_: PollQuestion = new PollQuestion();
        _loc3_.questionId = param1.readInteger();
        _loc3_.sortOrder = param1.readInteger();
        _loc3_.questionType = param1.readInteger();
        _loc3_.questionText = param1.readString();
        _loc3_.questionCategory = param1.readInteger();
        _loc3_.questionAnswerType = param1.readInteger();
        _loc3_.questionAnswerCount = param1.readInteger();
        if (_loc3_.questionType == 1 || _loc3_.questionType == 2) {
            _loc2_ = 0;
            while (_loc2_ < _loc3_.questionAnswerCount) {
                _loc3_.questionChoices.push(new PollChoice(param1.readString(), param1.readString(), param1.readInteger()));
                _loc2_++;
            }
        }
        return _loc3_;
    }
}
