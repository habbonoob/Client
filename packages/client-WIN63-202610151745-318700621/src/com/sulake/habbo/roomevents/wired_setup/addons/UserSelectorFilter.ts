import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { AddonCodes } from '@/com/sulake/habbo/roomevents/wired_setup/addons/AddonCodes';
import { SelectorFilter } from '@/com/sulake/habbo/roomevents/wired_setup/addons/SelectorFilter';

export class UserSelectorFilter extends SelectorFilter {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.addons::UserSelectorFilter'); }

    constructor() {
        super();
    }

    public override get code(): number {
        return AddonCodes.USER_SELECTOR_FILTER;
    }
}
