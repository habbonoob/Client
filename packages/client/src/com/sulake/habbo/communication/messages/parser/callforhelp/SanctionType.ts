import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class SanctionType {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.callforhelp::SanctionType'); }

    constructor() {
        this.name = "";
    }

    declare public name: string;

    declare public _SafeStr_4902: number;
    static { (this.prototype as any)._SafeStr_4902 = 0; }

    declare public _SafeStr_7466: number;
    static { (this.prototype as any)._SafeStr_7466 = 0; }
}
