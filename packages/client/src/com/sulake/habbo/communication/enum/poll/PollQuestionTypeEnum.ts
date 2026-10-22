import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class PollQuestionTypeEnum {
    static { registerClassName(this, 'com.sulake.habbo.communication.enum.poll::PollQuestionTypeEnum'); }

    public static readonly _SafeStr_7472: number = 1;
    public static readonly CHECKBOX: number = 2;
    public static readonly _SafeStr_7754: number = 3;
    public static readonly _SafeStr_8228: number = 4;
    public static readonly RATING: number = 5;
    public static readonly BINARY: number = 6;
}
