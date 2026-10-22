import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { XML } from '@habbo-pixi/runtime/xml/XML';
import { FurnitureMultiStateLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureMultiStateLogic';

export class FurnitureCustomStackHeightLogic extends FurnitureMultiStateLogic {
    static { registerClassName(this, 'com.sulake.habbo.room.object.logic.furniture::FurnitureCustomStackHeightLogic'); }

    constructor() {
        super();
    }

    public override get widget(): string {
        return "RWE_CUSTOM_STACK_HEIGHT";
    }

    public override initialize(param1: XML): void {
        super.initialize(param1);
        if (this.object != null && this.object.getModelController() != null) {
            this.object.getModelController().setNumber("furniture_always_stackable", 1);
        }
    }
}
