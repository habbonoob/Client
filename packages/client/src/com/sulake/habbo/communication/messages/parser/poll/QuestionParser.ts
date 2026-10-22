import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class QuestionParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.poll::QuestionParser'); }

    constructor() {
    }

    private _SafeStr_5320: string = null;
    private _pollId: number = -1;
    private _questionId: number = -1;
    private _duration: number = -1;
    private _question: Map<any, any> = null;

    public get pollType(): string {
        return this._SafeStr_5320;
    }

    public get pollId(): number {
        return this._pollId;
    }

    public get questionId(): number {
        return this._questionId;
    }

    public get duration(): number {
        return this._duration;
    }

    public get question(): Map<any, any> {
        return this._question;
    }

    public flush(): boolean {
        this._SafeStr_5320 = null;
        this._pollId = -1;
        this._questionId = -1;
        this._duration = -1;
        this._question = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc2_: number = 0;
        let _loc3_: number = 0;
        this._SafeStr_5320 = param1.readString();
        this._pollId = param1.readInteger();
        this._questionId = param1.readInteger();
        this._duration = param1.readInteger();
        this._question = new Dictionary();
        this._question.set("id", param1.readInteger());
        this._question.set("number", param1.readInteger());
        this._question.set("type", param1.readInteger());
        this._question.set("content", param1.readString());
        if (this._question.get("type") == 1 || this._question.get("type") == 2) {
            this._question.set("selection_min", param1.readInteger());
            _loc2_ = param1.readInteger();
            let _loc4_: any[] = [];
            let _loc5_: any[] = [];
            this._question.set("selections", _loc4_);
            this._question.set("selection_values", _loc5_);
            this._question.set("selection_count", _loc2_);
            this._question.set("selection_max", _loc2_);
            _loc3_ = 0;
            while (_loc3_ < _loc2_) {
                _loc5_.push(param1.readString());
                _loc4_.push(param1.readString());
                _loc3_++;
            }
        }
        return true;
    }
}
