import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { PollChoice } from '@/com/sulake/habbo/communication/messages/parser/poll/PollChoice';

export class PollQuestion {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.poll::PollQuestion'); }

    public static readonly _SafeStr_7985: number = 0;
    public static readonly _SafeStr_7585: number = 1;
    public static readonly _SafeStr_7982: number = 2;
    public static readonly _SafeStr_8536: number = 3;

    constructor() {
        this._children = [];
        this._questionChoices = [];
    }

    declare private _questionId: number;
    static { (this.prototype as any)._questionId = 0; }

    declare private _questionType: number;
    static { (this.prototype as any)._questionType = 0; }

    declare private _sortOrder: number;
    static { (this.prototype as any)._sortOrder = 0; }

    declare private _questionCategory: number;
    static { (this.prototype as any)._questionCategory = 0; }

    declare private _questionText: string;

    declare private _questionAnswerType: number;
    static { (this.prototype as any)._questionAnswerType = 0; }

    declare private _questionAnswerCount: number;
    static { (this.prototype as any)._questionAnswerCount = 0; }

    declare private _questionChoices: PollChoice[];

    declare private _children: PollQuestion[];

    public get children(): PollQuestion[] {
        return this._children;
    }

    public set children(param1: PollQuestion[]) {
        this._children = param1;
    }

    public get questionId(): number {
        return this._questionId;
    }

    public set questionId(param1: number) {
        this._questionId = param1;
    }

    public get questionType(): number {
        return this._questionType;
    }

    public set questionType(param1: number) {
        this._questionType = param1;
    }

    public get sortOrder(): number {
        return this._sortOrder;
    }

    public set sortOrder(param1: number) {
        this._sortOrder = param1;
    }

    public get questionText(): string {
        return this._questionText;
    }

    public set questionText(param1: string) {
        this._questionText = param1;
    }

    public get questionCategory(): number {
        return this._questionCategory;
    }

    public set questionCategory(param1: number) {
        this._questionCategory = param1;
    }

    public get questionAnswerType(): number {
        return this._questionAnswerType;
    }

    public set questionAnswerType(param1: number) {
        this._questionAnswerType = param1;
    }

    public get questionAnswerCount(): number {
        return this._questionAnswerCount;
    }

    public set questionAnswerCount(param1: number) {
        this._questionAnswerCount = param1;
    }

    public get questionChoices(): PollChoice[] {
        return this._questionChoices;
    }

    public set questionChoices(param1: PollChoice[]) {
        this._questionChoices = param1;
    }
}
