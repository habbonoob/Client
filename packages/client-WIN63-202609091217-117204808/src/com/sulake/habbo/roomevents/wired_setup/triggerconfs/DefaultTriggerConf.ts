import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { TriggerConf } from '@/com/sulake/habbo/roomevents/wired_setup/triggerconfs/TriggerConf';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';

export class DefaultTriggerConf extends DefaultElement implements TriggerConf {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.triggerconfs::DefaultTriggerConf'); }

    constructor() {
        super();
    }
}
