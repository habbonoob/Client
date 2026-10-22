import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class PollChoice {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.poll::PollChoice'); }

    constructor(param1: string, param2: string, param3: number) {
        this._value = param1;
        this._choiceText = param2;
        this._choiceType = param3;
    }

    declare private _value: string;

    declare private _choiceText: string;

    declare private _choiceType: number;
    static { (this.prototype as any)._choiceType = 0; }

    public get value(): string {
        return this._value;
    }

    public set value(param1: string) {
        this._value = param1;
    }

    public get choiceText(): string {
        return this._choiceText;
    }

    public set choiceText(param1: string) {
        this._choiceText = param1;
    }

    public get choiceType(): number {
        return this._choiceType;
    }

    public set choiceType(param1: number) {
        this._choiceType = param1;
    }
}
