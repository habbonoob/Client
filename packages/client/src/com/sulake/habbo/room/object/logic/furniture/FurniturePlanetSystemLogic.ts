import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomObjectModelController } from '@/com/sulake/room/object/IRoomObjectModelController';
import type { XML } from '@habbo-pixi/runtime/xml/XML';
import type { XMLList } from '@habbo-pixi/runtime/xml/XMLList';
import { FurnitureLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureLogic';

export class FurniturePlanetSystemLogic extends FurnitureLogic {
    static { registerClassName(this, 'com.sulake.habbo.room.object.logic.furniture::FurniturePlanetSystemLogic'); }

    constructor() {
        super();
    }

    public override initialize(param1: XML): void {
        let _loc3_: IRoomObjectModelController = null;
        super.initialize(param1);
        if (param1 == null) {
            return;
        }
        let _loc2_: XMLList = param1.child("planetsystem");
        if (_loc2_.length() == 0) {
            return;
        }
        if (this.object != null) {
            _loc3_ = this.object.getModelController();
            if (_loc3_ != null) {
                _loc3_.setString("furniture_planetsystem_data", String(_loc2_));
            }
        }
    }
}
