import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { DefaultSelectorType } from '@/com/sulake/habbo/roomevents/wired_setup/selectors/DefaultSelectorType';
import { SelectorCodes } from '@/com/sulake/habbo/roomevents/wired_setup/selectors/SelectorCodes';

export class UsersFromSignal extends DefaultSelectorType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.selectors::UsersFromSignal'); }

    constructor() {
        super();
    }

    public override get code(): number {
        return SelectorCodes.USERS_FROM_SIGNAL;
    }
}
