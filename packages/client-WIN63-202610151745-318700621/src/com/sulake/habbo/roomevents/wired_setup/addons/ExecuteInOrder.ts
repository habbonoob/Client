import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { AddonCodes } from '@/com/sulake/habbo/roomevents/wired_setup/addons/AddonCodes';
import { DefaultAddonType } from '@/com/sulake/habbo/roomevents/wired_setup/addons/DefaultAddonType';

export class ExecuteInOrder extends DefaultAddonType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.addons::ExecuteInOrder'); }

    constructor() {
        super();
    }

    public override get code(): number {
        return AddonCodes.EXECUTE_IN_ORDER;
    }
}
