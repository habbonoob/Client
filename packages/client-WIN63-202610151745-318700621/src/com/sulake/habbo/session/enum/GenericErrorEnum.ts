import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class GenericErrorEnum {
    static { registerClassName(this, 'com.sulake.habbo.session.enum::GenericErrorEnum'); }

    public static readonly KICKED_BY_OWNER: number = 4008;
    public static readonly STRIP_LOCKED_FOR_TRADING: number = -13001;

    constructor() {
    }
}
