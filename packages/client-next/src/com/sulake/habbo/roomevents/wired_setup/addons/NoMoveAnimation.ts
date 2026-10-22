import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { AddonCodes } from '@/com/sulake/habbo/roomevents/wired_setup/addons/AddonCodes';
import { DefaultAddonType } from '@/com/sulake/habbo/roomevents/wired_setup/addons/DefaultAddonType';

export class NoMoveAnimation extends DefaultAddonType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.addons::NoMoveAnimation'); }

    constructor() {
        super();
    }

    public override get code(): number {
        return AddonCodes.NO_MOVE_ANIMATION;
    }
}
