import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { AddonCodes } from '@/com/sulake/habbo/roomevents/wired_setup/addons/AddonCodes';
import { _SafeCls_6105 } from '@/com/sulake/habbo/roomevents/wired_setup/addons/variablefx/_SafeCls_6105';

export class _SafeCls_6101 extends _SafeCls_6105 {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.addons.variablefx::_SafeCls_6101'); }

    constructor() {
        super();
    }

    public override get code(): number {
        return AddonCodes.VARIABLE_FX_BOSS_BAR;
    }

    protected override get categoryId(): number {
        return 4;
    }
}
