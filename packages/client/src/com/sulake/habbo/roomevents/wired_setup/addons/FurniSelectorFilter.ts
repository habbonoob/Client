import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { AddonCodes } from '@/com/sulake/habbo/roomevents/wired_setup/addons/AddonCodes';
import { SelectorFilter } from '@/com/sulake/habbo/roomevents/wired_setup/addons/SelectorFilter';

export class FurniSelectorFilter extends SelectorFilter {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.addons::FurniSelectorFilter'); }

    constructor() {
        super();
    }

    public override get code(): number {
        return AddonCodes.FURNI_SELECTOR_FILTER;
    }
}
