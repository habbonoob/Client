import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class UnseenItemCounterElements {
    static { registerClassName(this, 'com.sulake.habbo.window.enum::UnseenItemCounterElements'); }

    public static readonly VALUE_ELEMENT_NAME: string = "count";
}
