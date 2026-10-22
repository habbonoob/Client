import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { DefaultSelectorType } from '@/com/sulake/habbo/roomevents/wired_setup/selectors/DefaultSelectorType';
import { SelectorCodes } from '@/com/sulake/habbo/roomevents/wired_setup/selectors/SelectorCodes';

export class FurniFromSignal extends DefaultSelectorType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.selectors::FurniFromSignal'); }

    constructor() {
        super();
    }

    public override get code(): number {
        return SelectorCodes.FURNI_FROM_SIGNAL;
    }
}
