import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomObjectModelController } from '@/com/sulake/room/object/IRoomObjectModelController';
import { FurnitureLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureLogic';

export class FurnitureCraftingGizmoLogic extends FurnitureLogic {
    static { registerClassName(this, 'com.sulake.habbo.room.object.logic.furniture::FurnitureCraftingGizmoLogic'); }

    constructor() {
        super();
    }

    public override get widget(): string {
        return "RWE_CRAFTING";
    }

    public override useObject(): void {
        super.useObject();
    }

    public setAnimationState(param1: number): void {
        if (this.object == null) {
            return;
        }
        let _loc2_: IRoomObjectModelController = this.object.getModelController();
        if (_loc2_ != null) {
            _loc2_.setNumber("furniture_automatic_state_index", param1, false);
        }
    }
}
