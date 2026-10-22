import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { WiredInputSourcePicker } from '@/com/sulake/habbo/roomevents/wired_setup/inputsources/WiredInputSourcePicker';
import { SelectorCodes } from '@/com/sulake/habbo/roomevents/wired_setup/selectors/SelectorCodes';
import { WithVariable } from '@/com/sulake/habbo/roomevents/wired_setup/selectors/WithVariable';

export class FurniWithVariable extends WithVariable {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.selectors::FurniWithVariable'); }

    constructor() {
        super();
    }

    public override get code(): number {
        return SelectorCodes._SafeStr_7469;
    }

    protected override get variableSource(): number {
        return WiredInputSourcePicker._SafeStr_2178;
    }
}
