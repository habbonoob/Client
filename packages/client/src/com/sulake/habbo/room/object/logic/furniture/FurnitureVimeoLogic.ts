import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { FurnitureLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureLogic';

export class FurnitureVimeoLogic extends FurnitureLogic {
    static { registerClassName(this, 'com.sulake.habbo.room.object.logic.furniture::FurnitureVimeoLogic'); }

    constructor() {
        super();
    }

    public override get widget(): string {
        return "RWE_VIMEO";
    }
}
