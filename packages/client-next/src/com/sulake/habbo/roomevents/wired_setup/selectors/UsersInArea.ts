import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { InArea } from '@/com/sulake/habbo/roomevents/wired_setup/selectors/InArea';
import { SelectorCodes } from '@/com/sulake/habbo/roomevents/wired_setup/selectors/SelectorCodes';

export class UsersInArea extends InArea {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.selectors::UsersInArea'); }

    constructor() {
        super();
    }

    public override get code(): number {
        return SelectorCodes.USERS_IN_AREA;
    }
}
