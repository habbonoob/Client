import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { DefaultTriggerConf } from '@/com/sulake/habbo/roomevents/wired_setup/triggerconfs/DefaultTriggerConf';
import { TriggerConfCodes } from '@/com/sulake/habbo/roomevents/wired_setup/triggerconfs/TriggerConfCodes';

export class GameStarts extends DefaultTriggerConf {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.triggerconfs::GameStarts'); }

    constructor() {
        super();
    }

    public override get code(): number {
        return TriggerConfCodes.GAME_STARTS;
    }
}
