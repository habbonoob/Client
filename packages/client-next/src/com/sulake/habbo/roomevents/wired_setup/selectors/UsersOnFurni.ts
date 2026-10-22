import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { DefaultSelectorType } from '@/com/sulake/habbo/roomevents/wired_setup/selectors/DefaultSelectorType';
import { SelectorCodes } from '@/com/sulake/habbo/roomevents/wired_setup/selectors/SelectorCodes';

export class UsersOnFurni extends DefaultSelectorType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.selectors::UsersOnFurni'); }

    constructor() {
        super();
    }

    public override get code(): number {
        return SelectorCodes.USERS_ON_FURNI;
    }
}
