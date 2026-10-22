import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { FurnitureFriendFurniLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureFriendFurniLogic';

export class FurnitureLovelockLogic extends FurnitureFriendFurniLogic {
    static { registerClassName(this, 'com.sulake.habbo.room.object.logic.furniture::FurnitureLovelockLogic'); }

    constructor() {
        super();
    }

    protected override get engravingDialogType(): number {
        return 0;
    }
}
