import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { FurnitureMultiStateLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureMultiStateLogic';

export class FurnitureRandomTeleportLogic extends FurnitureMultiStateLogic {
    static { registerClassName(this, 'com.sulake.habbo.room.object.logic.furniture::FurnitureRandomTeleportLogic'); }

    constructor() {
        super();
    }

    public override get contextMenu(): string {
        return "RANDOM_TELEPORT";
    }
}
