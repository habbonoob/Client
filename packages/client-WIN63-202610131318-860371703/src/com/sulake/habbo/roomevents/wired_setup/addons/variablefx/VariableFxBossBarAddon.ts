import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { AddonCodes } from '@/com/sulake/habbo/roomevents/wired_setup/addons/AddonCodes';
import { _SafeCls_6111 } from '@/com/sulake/habbo/roomevents/wired_setup/addons/variablefx/_SafeCls_6111';

export class VariableFxBossBarAddon extends _SafeCls_6111 {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.addons.variablefx::VariableFxBossBarAddon'); }

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
