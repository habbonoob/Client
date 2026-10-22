import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { DefaultTriggerConf } from '@/com/sulake/habbo/roomevents/wired_setup/triggerconfs/DefaultTriggerConf';
import { TriggerConfCodes } from '@/com/sulake/habbo/roomevents/wired_setup/triggerconfs/TriggerConfCodes';

export class _SafeCls_2056 extends DefaultTriggerConf {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.triggerconfs::_SafeCls_2056'); }

    constructor() {
        super();
    }

    public override get code(): number {
        return TriggerConfCodes._SafeStr_7473;
    }
}
