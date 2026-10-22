import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { AddonType } from '@/com/sulake/habbo/roomevents/wired_setup/addons/AddonType';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';

export class DefaultAddonType extends DefaultElement implements AddonType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.addons::DefaultAddonType'); }

    constructor() {
        super();
    }

    public get isFilter(): boolean {
        return false;
    }
}
