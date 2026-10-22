import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { WiredInputSourcePicker } from '@/com/sulake/habbo/roomevents/wired_setup/inputsources/WiredInputSourcePicker';
import { SelectorCodes } from '@/com/sulake/habbo/roomevents/wired_setup/selectors/SelectorCodes';
import { WithVariable } from '@/com/sulake/habbo/roomevents/wired_setup/selectors/WithVariable';

export class UsersWithVariable extends WithVariable {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.selectors::UsersWithVariable'); }

    constructor() {
        super();
    }

    public override get code(): number {
        return SelectorCodes.USERS_WITH_VARIABLE;
    }

    protected override get variableSource(): number {
        return WiredInputSourcePicker.USER_SOURCE;
    }
}
