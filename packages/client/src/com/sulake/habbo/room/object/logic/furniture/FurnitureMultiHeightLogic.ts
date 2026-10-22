import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { XML } from '@habbo-pixi/runtime/xml/XML';
import { FurnitureMultiStateLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureMultiStateLogic';

export class FurnitureMultiHeightLogic extends FurnitureMultiStateLogic {
    static { registerClassName(this, 'com.sulake.habbo.room.object.logic.furniture::FurnitureMultiHeightLogic'); }

    constructor() {
        super();
    }

    public override initialize(param1: XML): void {
        super.initialize(param1);
        this.object.getModelController().setNumber("furniture_is_variable_height", 1, true);
    }
}
