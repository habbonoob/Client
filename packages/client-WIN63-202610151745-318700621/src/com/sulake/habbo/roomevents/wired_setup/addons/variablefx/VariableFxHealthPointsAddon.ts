import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { AddonCodes } from '@/com/sulake/habbo/roomevents/wired_setup/addons/AddonCodes';
import { _SafeCls_6111 } from '@/com/sulake/habbo/roomevents/wired_setup/addons/variablefx/_SafeCls_6111';

export class VariableFxHealthPointsAddon extends _SafeCls_6111 {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.addons.variablefx::VariableFxHealthPointsAddon'); }

    constructor() {
        super();
    }

    public override get code(): number {
        return AddonCodes.VARIABLE_FX_HEALTH_POINTS;
    }

    protected override get categoryId(): number {
        return 0;
    }
}
