import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { ObjectLogicBase } from '@/com/sulake/room/object/logic/ObjectLogicBase';

export class SnowSplashLogic extends ObjectLogicBase {
    static { registerClassName(this, 'com.sulake.habbo.room.object.logic.game::SnowSplashLogic'); }

    constructor() {
        super();
    }
}
