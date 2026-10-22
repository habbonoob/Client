import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MovingObjectLogic } from '@/com/sulake/habbo/room/object/logic/MovingObjectLogic';

export class SnowballLogic extends MovingObjectLogic {
    static { registerClassName(this, 'com.sulake.habbo.room.object.logic.game::SnowballLogic'); }

    constructor() {
        super();
    }
}
