import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { InArea } from '@/com/sulake/habbo/roomevents/wired_setup/selectors/InArea';
import { SelectorCodes } from '@/com/sulake/habbo/roomevents/wired_setup/selectors/SelectorCodes';

export class FurniInArea extends InArea {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.selectors::FurniInArea'); }

    constructor() {
        super();
    }

    public override get code(): number {
        return SelectorCodes._SafeStr_7465;
    }
}
