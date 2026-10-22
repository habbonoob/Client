import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { SanctionType } from '@/com/sulake/habbo/communication/messages/parser/callforhelp/SanctionType';

export class SanctionDTO {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.callforhelp::SanctionDTO'); }

    declare public _SafeStr_7471: SanctionType;

    declare public _SafeStr_5549: string;

    declare public _SafeStr_7352: boolean;
    static { (this.prototype as any)._SafeStr_7352 = false; }

    declare public _SafeStr_5613: number;
    static { (this.prototype as any)._SafeStr_5613 = 0; }

    declare public _SafeStr_5941: SanctionType;

    constructor() {
        this._SafeStr_5549 = "";
    }
}
