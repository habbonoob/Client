import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { FurnitureChestLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureChestLogic';

export class FurnitureCoinsChestLogic extends FurnitureChestLogic {
    static { registerClassName(this, 'com.sulake.habbo.room.object.logic.furniture::FurnitureCoinsChestLogic'); }

    constructor() {
        super();
    }
}
