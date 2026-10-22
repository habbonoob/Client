import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { DefaultSelectorType } from '@/com/sulake/habbo/roomevents/wired_setup/selectors/DefaultSelectorType';
import { SelectorCodes } from '@/com/sulake/habbo/roomevents/wired_setup/selectors/SelectorCodes';

export class _SafeCls_2024 extends DefaultSelectorType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.selectors::_SafeCls_2024'); }

    constructor() {
        super();
    }

    public override get code(): number {
        return SelectorCodes._SafeStr_7520;
    }

    public override get forceFurniSelection(): boolean {
        return true;
    }
}
