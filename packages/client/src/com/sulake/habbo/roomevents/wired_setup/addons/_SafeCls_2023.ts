import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { AddonCodes } from '@/com/sulake/habbo/roomevents/wired_setup/addons/AddonCodes';
import { DefaultAddonType } from '@/com/sulake/habbo/roomevents/wired_setup/addons/DefaultAddonType';

export class _SafeCls_2023 extends DefaultAddonType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.addons::_SafeCls_2023'); }

    public override get code(): number {
        return AddonCodes._SafeStr_7509;
    }
}
