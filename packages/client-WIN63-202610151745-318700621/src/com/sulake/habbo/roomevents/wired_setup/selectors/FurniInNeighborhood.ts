import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { InNeighborhood } from '@/com/sulake/habbo/roomevents/wired_setup/selectors/InNeighborhood';
import { SelectorCodes } from '@/com/sulake/habbo/roomevents/wired_setup/selectors/SelectorCodes';

export class FurniInNeighborhood extends InNeighborhood {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.selectors::FurniInNeighborhood'); }

    constructor() {
        super();
    }

    public override get code(): number {
        return SelectorCodes._SafeStr_7536;
    }
}
